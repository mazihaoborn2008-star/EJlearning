import test from 'node:test';
import assert from 'node:assert/strict';
import {aiTutor,ENGLISH_SYSTEM_PROMPT,JAPANESE_SYSTEM_PROMPT,providerUrl} from '../src/ai-tutor-36.js';
import {createRemediationToken} from '../src/remediation-4f.js';

const records={
 vocabulary:{id:'en-choice',language:'en',lemma:'choice',stage:2,part_of_speech:'noun',register:'neutral',ipa:'tʃɔɪs',reading:null},
 grammar:{id:'ja-copula',language:'ja',title_zh:'判断句',form_name:'〜です / 〜だ',level:1,register:'neutral',formula:'名词 + です',core_zh:'作出判断',purpose_zh:'说明是什么',when_zh:'介绍或判断',mistakes_zh:'不要接在普通形动词后',nuance_zh:'です礼貌，だ普通'}
};
const authSecret='phase36-test-secret-that-is-longer-than-thirty-two-characters';
function db(){
 return {prepare(sql){
  return {bind(...args){
   return {async first(){
    if(sql.includes('FROM auth_sessions'))return{token_hash:args[0],user_id:'phase36-user',expires_at:Math.floor(Date.now()/1000)+3600,last_seen_at:Math.floor(Date.now()/1000),email_display:'phase36@example.com'};
    return null;
   },async all(){
    if(sql.includes('FROM v2_vocabulary_items'))return{results:args[0]===records.vocabulary.id?[records.vocabulary]:[]};
    if(sql.includes('FROM v2_vocabulary_senses'))return{results:[{meaning_zh:'选择',usage_zh:'常和 make 搭配',register_note:null}]};
    if(sql.includes('FROM v2_vocabulary_examples'))return{results:[{kind:'collocation',text:'make a choice',translation_zh:'做出选择',note_zh:'自然搭配',readings_json:'[]'}]};
    if(sql.includes('FROM v2_grammar_points'))return{results:args[0]===records.grammar.id?[records.grammar]:[]};
    if(sql.includes('FROM v2_grammar_examples'))return{results:[{text:'学生です。',translation_zh:'是学生。',explanation_zh:'礼貌判断',readings_json:'[]'}]};
    return{results:[]};
   }};
  }};
 }};
}
function kv(){const map=new Map();return{map,async get(key,type){const value=map.get(key);return type==='json'&&value?JSON.parse(value):value??null;},async put(key,value){map.set(key,value);},async delete(key){map.delete(key);}};}
const limiter={limit:async()=>({success:true})};
function environment(overrides={}){return{DB:db(),CONTENT_DB:db(),AUTH_SECRET:authSecret,DEEPSEEK_API_KEY:'test-secret',DEEPSEEK_BASE_URL:'https://api.deepseek.com',DEEPSEEK_MODEL:'deepseek-v4-flash',AI_RATE_LIMITER:limiter,AI_SHARED_RATE_LIMITER:limiter,AI_SESSIONS:kv(),...overrides};}
const request=body=>new Request('https://ej-learning-36.example/api/ai/tutor',{method:'POST',headers:{'Content-Type':'application/json','Cookie':'ej_session=phase36-session','User-Agent':'phase36-test'},body:JSON.stringify(body)});
const provider=answer=>async(url,options)=>new Response(JSON.stringify({choices:[{message:{content:answer},finish_reason:'stop'}]}),{status:200,headers:{'Content-Type':'application/json'}});
const base=(language='en',extra={})=>({message:language==='en'?'I very like this book.':'私は学校に勉強します。',language,session_id:'session_1234567890',...extra});

test('English and Japanese prompts are independently authored and policy-specific',()=>{
 assert.notEqual(ENGLISH_SYSTEM_PROMPT,JAPANESE_SYSTEM_PROMPT);assert.match(ENGLISH_SYSTEM_PROMPT,/articles/);assert.match(ENGLISH_SYSTEM_PROMPT,/collocations/);assert.match(JAPANESE_SYSTEM_PROMPT,/助詞/);assert.match(JAPANESE_SYSTEM_PROMPT,/ローマ字/);assert(!ENGLISH_SYSTEM_PROMPT.includes('{language}'));assert(!JAPANESE_SYSTEM_PROMPT.includes('{language}'));
});

test('standalone tutors select distinct server prompts and hide provider internals',async()=>{
 for(const language of ['en','ja']){let sent;const fetchImpl=async(url,options)=>{sent={url,body:JSON.parse(options.body),authorization:options.headers.Authorization};return provider(language==='en'?'更自然：I really like this book.\nvery 不能直接修饰 like。':'自然な日本語：私は学校で勉強します。\n动作地点使用「で」。')(url,options);};const response=await aiTutor(request(base(language)),environment(),null,fetchImpl),body=await response.json();assert.equal(response.status,200);assert.equal(sent.body.messages[0].content,language==='en'?ENGLISH_SYSTEM_PROMPT:JAPANESE_SYSTEM_PROMPT);assert.equal(sent.body.max_tokens,700);assert.equal(body.data.kind,'tutor_message');const exposed=JSON.stringify(body);assert(!exposed.includes('test-secret'));assert(!exposed.includes('deepseek-v4-flash'));assert(!exposed.includes('api.deepseek.com'));}
});

test('multi-turn history is server-side and bounded',async()=>{
 const session=kv(),env=environment({AI_SESSIONS:session});let last;
 for(let i=0;i<7;i++){const fetchImpl=async(url,options)=>{last=JSON.parse(options.body);return provider('回答 '+i)(url,options);};const response=await aiTutor(request({...base('en'),message:'问题 '+i}),env,null,fetchImpl);assert.equal(response.status,200);}
 assert(last.messages.some(x=>x.content==='问题 5'));assert(last.messages.length<=10);const stored=JSON.parse(session.map.values().next().value);assert.equal(stored.messages.length,8);assert.equal(stored.messages.at(-1).content,'回答 6');
});

test('canonical vocabulary and grammar contexts are loaded and language checked',async()=>{
 let sent;const capture=async(url,options)=>{sent=JSON.parse(options.body);return provider('好的。')(url,options);};
 let response=await aiTutor(request(base('en',{context:{type:'vocabulary',id:'en-choice'}})),environment(),null,capture);assert.equal(response.status,200);assert.match(sent.messages[1].content,/make a choice/);assert.match(sent.messages[1].content,/常和 make 搭配/);
 response=await aiTutor(request(base('ja',{context:{type:'grammar',id:'ja-copula'}})),environment(),null,capture);assert.equal(response.status,200);assert.match(sent.messages[1].content,/名词 \+ です/);
 response=await aiTutor(request(base('ja',{context:{type:'vocabulary',id:'en-choice'}})),environment(),null,capture);assert.equal(response.status,400);assert.equal((await response.json()).error.code,'CONTEXT_LANGUAGE_MISMATCH');
});

test('policy override fields and foreign lesson focus are rejected before provider calls',async()=>{
 for(const field of ['system_prompt','model','base_url','api_key','messages']){let calls=0;const response=await aiTutor(request({...base(),[field]:'attacker-controlled'}),environment(),null,async()=>{calls++;return provider('bad')();});assert.equal(response.status,400,field);assert.equal(calls,0,field);}
 const badNested=await aiTutor(request(base('en',{context:{type:'vocabulary',id:'en-choice',system_prompt:'bad'}})),environment(),null,provider('bad'));assert.equal(badNested.status,400);
 const badFocus=await aiTutor(request(base('en',{context:{type:'lesson',id:'en-s1-l1',focus_type:'grammar',focus_id:'ja-copula'}})),environment(),null,provider('bad'));assert.notEqual(badFocus.status,200);
});

test('provider config is pinned and failures use the safe UI message',async()=>{
 assert.equal(providerUrl('https://api.deepseek.com'),'https://api.deepseek.com/chat/completions');assert.throws(()=>providerUrl('https://attacker.example'));
 for(const responseFactory of [async()=>new Response('busy',{status:429}),async()=>new Response('oops',{status:500}),async()=>{throw Error('network detail');}]){const response=await aiTutor(request(base()),environment(),null,responseFactory);assert.equal(response.status,503);const text=await response.text();assert.match(text,/AI 暂时不可用，请稍后再试/);assert(!text.includes('busy'));assert(!text.includes('network detail'));}
});

test('server-trusted wrong-answer remediation is explicit, bounded, user-bound, and advisory',async()=>{
 const secret='phase4f-remediation-secret-longer-than-thirty-two',issued=Math.floor(Date.now()/1000),context={uid:'user-a',attempt_id:'wrong_attempt_0001',issued_at:issued,expires_at:issued+1800,language:'en',content_type:'vocabulary',content_id:'en-choice',exercise_type:'vocabulary_typed_recall',prompt:'根据中文“选择”，写出英语词汇。',submitted_answer:'choose',canonical_answer:'choice',result:'incorrect',safe_title:null,safe_explanation:'选择',lesson_id:null},token=await createRemediationToken(context,secret);
 const remediationDb=userId=>({prepare(sql){return{bind(...args){return{async first(){if(sql.includes('FROM auth_sessions'))return{token_hash:'hash',user_id:userId,expires_at:issued+3600,last_seen_at:issued,email_display:userId+'@example.com'};if(sql.includes('FROM learning_attempts')&&args[0]==='user-a')return{content_type:'vocabulary',content_id:'en-choice',result:0,exercise_type:'vocabulary_typed_recall',context_type:'standalone',context_id:null};return null;}};}};}});
 const requestFor=value=>new Request('https://ej-learning-36.example/api/ai/tutor',{method:'POST',headers:{'Content-Type':'application/json','Cookie':'ej_session=test-session','User-Agent':'phase4f-test'},body:JSON.stringify({remediation_token:value,session_id:'remediation_session_01'})});
 let sent;const env=environment({DB:remediationDb('user-a'),AUTH_SECRET:secret,PRACTICE_SECRET:secret});const response=await aiTutor(requestFor(token),env,null,async(url,options)=>{sent=JSON.parse(options.body);return provider('“choose”是动词；这里需要名词“choice”。')(url,options);});assert.equal(response.status,200);const serialized=JSON.stringify(sent.messages);assert.match(serialized,/learner_submitted_answer/);assert.match(serialized,/canonical_answer/);assert.match(serialized,/deterministic_result/);assert(!serialized.includes('user-a'));assert(!serialized.includes('@example.com'));assert(!serialized.includes('review_stage'));assert(!serialized.includes('next_review_at'));
 const at=Math.floor(token.length/2),modified=token.slice(0,at)+(token[at]==='A'?'B':'A')+token.slice(at+1);assert.equal((await aiTutor(requestFor(modified),env,null,provider('bad'))).status,400);assert.equal((await aiTutor(requestFor(token),environment({DB:remediationDb('user-b'),AUTH_SECRET:secret,PRACTICE_SECRET:secret}),null,provider('bad'))).status,403);assert.equal((await aiTutor(requestFor('fabricated_context_token'),env,null,provider('bad'))).status,400);
});

test('delete conversation removes the current KV record instead of only clearing local UI',async()=>{
 const store=kv(),env=environment({AI_SESSIONS:store});assert.equal((await aiTutor(request(base()),env,null,provider('private history'))).status,200);assert.equal(store.map.size,1);const response=await aiTutor(new Request('https://ej-learning-36.example/api/ai/tutor',{method:'DELETE',headers:{'Content-Type':'application/json','Cookie':'ej_session=phase36-session','Origin':'https://ej-learning-36.example'},body:JSON.stringify({session_id:'session_1234567890'})}),env);assert.equal(response.status,200);assert.equal(store.map.size,0);
});
