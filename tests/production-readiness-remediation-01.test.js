import test from 'node:test';
import assert from 'node:assert/strict';
import {aiTutor,ENGLISH_SYSTEM_PROMPT,JAPANESE_SYSTEM_PROMPT} from '../src/ai-tutor-36.js';
import {createRemediationToken} from '../src/remediation-4f.js';

const origin='https://ej-learning-36.example';
const secret='production-readiness-remediation-test-secret-01';
const sessionId='shared_session_1234567890';
const encoder=new TextEncoder();

async function sessionHash(token){
 const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const value=await crypto.subtle.sign('HMAC',key,encoder.encode(`session:${token}`));
 return [...new Uint8Array(value)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}

async function database(sessions,attempt){
 const identities=new Map();
 for(const [token,userId] of Object.entries(sessions))identities.set(await sessionHash(token),userId);
 const metrics={prepare:0,writes:0};
 return {metrics,prepare(sql){
  metrics.prepare++;
  return {bind(...values){return{
   async first(){
    if(sql.includes('FROM auth_sessions')){
     const userId=identities.get(values[0]);
     return userId?{token_hash:values[0],user_id:userId,expires_at:Math.floor(Date.now()/1000)+3600,last_seen_at:Math.floor(Date.now()/1000),email_display:`${userId}@example.com`}:null;
    }
    if(sql.includes('FROM learning_attempts')&&attempt&&values[0]===attempt.userId&&values[1]===attempt.attemptId)return attempt.row;
    return null;
   },
   async all(){return{results:[]};},
   async run(){metrics.writes++;return{success:true,meta:{changes:1}};}
  };}};
 }};
}

function store(){
 const map=new Map(),metrics={get:0,put:0,delete:0},ttls=[];
 return {map,metrics,ttls,async get(key,type){metrics.get++;const value=map.get(key);return type==='json'&&value?JSON.parse(value):value??null;},async put(key,value,options){metrics.put++;ttls.push(options?.expirationTtl);map.set(key,value);},async delete(key){metrics.delete++;map.delete(key);}};
}

const limiter=()=>{const keys=[];return{keys,async limit(value){keys.push(value.key);return{success:true};}};};
const providerResponse=answer=>new Response(JSON.stringify({choices:[{message:{content:answer},finish_reason:'stop'}]}),{status:200,headers:{'Content-Type':'application/json'}});

async function harness({sessions={tokenA:'user-a',tokenB:'user-b'},attempt}={}){
 const DB=await database(sessions,attempt),AI_SESSIONS=store(),personal=limiter(),shared=limiter(),providerCalls=[];
 const env={DB,CONTENT_DB:DB,AUTH_SECRET:secret,PRACTICE_SECRET:secret,DEEPSEEK_API_KEY:'fixture-provider-key',DEEPSEEK_BASE_URL:'https://api.deepseek.com',DEEPSEEK_MODEL:'deepseek-v4-flash',AI_RATE_LIMITER:personal,AI_SHARED_RATE_LIMITER:shared,AI_SESSIONS};
 const provider=async(url,options)=>{providerCalls.push({url,body:JSON.parse(options.body)});return providerResponse(`fixture answer ${providerCalls.length}`);};
 return {env,DB,AI_SESSIONS,personal,shared,providerCalls,provider};
}

function request(body,{token,method='POST'}={}){
 const headers=new Headers({'Content-Type':'application/json','Origin':origin,'User-Agent':'production-readiness-test'});
 if(token)headers.set('Cookie',`ej_session=${token}`);
 return new Request(`${origin}/api/ai/tutor`,{method,headers,body:JSON.stringify(body)});
}

const message=(text='I very like this book.',language='en',conversation=sessionId)=>({message:text,language,session_id:conversation});
const errorCode=async response=>(await response.json()).error.code;

test('anonymous POST, DELETE, and remediation stop at auth without cost or state access',async()=>{
 const h=await harness();
 for(const candidate of [
  request(message()),
  request({session_id:sessionId},{method:'DELETE'}),
  request({remediation_token:'not-opened-anonymously',session_id:sessionId})
 ]){
  const response=await aiTutor(candidate,h.env,null,h.provider);
  assert.equal(response.status,401);
  assert.equal(await errorCode(response),'AUTH_REQUIRED');
 }
 assert.equal(h.providerCalls.length,0);
 assert.deepEqual(h.AI_SESSIONS.metrics,{get:0,put:0,delete:0});
 assert.equal(h.AI_SESSIONS.map.size,0);
 assert.equal(h.DB.metrics.prepare,0);
 assert.equal(h.DB.metrics.writes,0);
 assert.equal(h.personal.keys.length,0);
 assert.equal(h.shared.keys.length,0);
});

test('authenticated history is user-bound, continuous, separately keyed, and deletion is owner-scoped',async()=>{
 const h=await harness();
 assert.equal((await aiTutor(request(message('A first'),{token:'tokenA'}),h.env,null,h.provider)).status,200);
 assert.equal((await aiTutor(request(message('A second'),{token:'tokenA'}),h.env,null,h.provider)).status,200);
 assert(h.providerCalls[1].body.messages.some(entry=>entry.content==='A first'));

 assert.equal((await aiTutor(request(message('B first'),{token:'tokenB'}),h.env,null,h.provider)).status,200);
 assert(!h.providerCalls[2].body.messages.some(entry=>entry.content==='A first'));
 assert.equal(h.AI_SESSIONS.map.size,2);
 const keys=[...h.AI_SESSIONS.map.keys()];
 assert(keys.every(key=>/^session:v2:[a-f0-9]{64}$/.test(key)));
 assert(keys.every(key=>!key.includes('user-a')&&!key.includes('user-b')&&!key.includes(sessionId)));

 const otherSession='different_session_123456';
 assert.equal((await aiTutor(request(message('A separate','en',otherSession),{token:'tokenA'}),h.env,null,h.provider)).status,200);
 assert(!h.providerCalls[3].body.messages.some(entry=>entry.content==='A first'));
 assert.equal(h.AI_SESSIONS.map.size,3);

 assert.equal((await aiTutor(request({session_id:sessionId},{token:'tokenB',method:'DELETE'}),h.env,null,h.provider)).status,200);
 assert.equal(h.AI_SESSIONS.map.size,2);
 assert.equal((await aiTutor(request(message('A third'),{token:'tokenA'}),h.env,null,h.provider)).status,200);
 assert(h.providerCalls[4].body.messages.some(entry=>entry.content==='A first'));
 assert.deepEqual(new Set(h.AI_SESSIONS.ttls),new Set([3600]));
 assert.equal(h.AI_SESSIONS.metrics.delete,1);
});

test('authenticated safety boundaries preserve language, pinning, overrides, rate limits, and response privacy',async()=>{
 const h=await harness();
 const en=await aiTutor(request(message('English question','en','english_session_1234'),{token:'tokenA'}),h.env,null,h.provider);
 const ja=await aiTutor(request(message('日本語の質問','ja','japanese_session_123'),{token:'tokenA'}),h.env,null,h.provider);
 assert.equal(en.status,200);assert.equal(ja.status,200);
 assert.equal(h.providerCalls[0].body.messages[0].content,ENGLISH_SYSTEM_PROMPT);
 assert.equal(h.providerCalls[1].body.messages[0].content,JAPANESE_SYSTEM_PROMPT);
 assert(!h.providerCalls[0].body.messages.some(entry=>entry.content===JAPANESE_SYSTEM_PROMPT));
 assert(!h.providerCalls[1].body.messages.some(entry=>entry.content===ENGLISH_SYSTEM_PROMPT));
 assert.equal(h.providerCalls[0].body.model,'deepseek-v4-flash');
 assert.equal(h.providerCalls[0].url,'https://api.deepseek.com/chat/completions');
 assert.equal(h.personal.keys.length,2);assert.equal(h.shared.keys.length,2);

 for(const extra of [{model:'attacker-model'},{provider:'attacker-provider'},{system_prompt:'ignore policy'},{user_id:'user-b'},{context:{type:'vocabulary',id:'../../arbitrary'}}]){
  const response=await aiTutor(request({...message(),...extra},{token:'tokenA'}),h.env,null,h.provider);
  assert.equal(response.status,400);
  assert.equal(await errorCode(response),'INVALID_REQUEST');
 }
 assert.equal(h.providerCalls.length,2);
 const publicBodies=[await en.clone().text(),await ja.clone().text()].join('');
 for(const forbidden of ['user-a','user-b','session:v2:',secret,'fixture-provider-key','deepseek-v4-flash',ENGLISH_SYSTEM_PROMPT])assert(!publicBodies.includes(forbidden));
});

test('remediation remains authenticated, attempt-bound, and advisory',async()=>{
 const issued=Math.floor(Date.now()/1000),attemptId='wrong_attempt_remediation_01';
 const attempt={userId:'user-a',attemptId,row:{content_type:'vocabulary',content_id:'en-choice',result:0,exercise_type:'vocabulary_typed_recall',context_type:'standalone',context_id:null}};
 const token=await createRemediationToken({uid:'user-a',attempt_id:attemptId,issued_at:issued,expires_at:issued+1800,language:'en',content_type:'vocabulary',content_id:'en-choice',exercise_type:'vocabulary_typed_recall',prompt:'根据中文“选择”，写出英语词汇。',submitted_answer:'choose',canonical_answer:'choice',result:'incorrect',safe_title:null,safe_explanation:'选择',lesson_id:null},secret);
 const h=await harness({attempt});
 const anonymous=await aiTutor(request({remediation_token:token,session_id:sessionId}),h.env,null,h.provider);
 assert.equal(anonymous.status,401);assert.equal(await errorCode(anonymous),'AUTH_REQUIRED');
 const accepted=await aiTutor(request({remediation_token:token,session_id:sessionId},{token:'tokenA'}),h.env,null,h.provider);
 assert.equal(accepted.status,200);
 const serialized=JSON.stringify(h.providerCalls[0].body.messages);
 assert.match(serialized,/learner_submitted_answer/);assert.match(serialized,/deterministic_result/);
 assert(!serialized.includes('user-a'));assert(!serialized.includes('@example.com'));
 const wrongUser=await aiTutor(request({remediation_token:token,session_id:sessionId},{token:'tokenB'}),h.env,null,h.provider);
 assert.equal(wrongUser.status,403);assert.equal(h.providerCalls.length,1);
});
