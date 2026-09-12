import test from 'node:test';
import assert from 'node:assert/strict';
import {aiTutor,ENGLISH_SYSTEM_PROMPT,JAPANESE_SYSTEM_PROMPT,providerUrl} from '../src/ai-tutor-36.js';

const records={
 vocabulary:{id:'en-choice',language:'en',lemma:'choice',stage:2,part_of_speech:'noun',register:'neutral',ipa:'tʃɔɪs',reading:null},
 grammar:{id:'ja-copula',language:'ja',title_zh:'判断句',form_name:'〜です / 〜だ',level:1,register:'neutral',formula:'名词 + です',core_zh:'作出判断',purpose_zh:'说明是什么',when_zh:'介绍或判断',mistakes_zh:'不要接在普通形动词后',nuance_zh:'です礼貌，だ普通'}
};
function db(){
 return {prepare(sql){
  return {bind(...args){
   return {async all(){
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
function kv(){const map=new Map();return{map,async get(key,type){const value=map.get(key);return type==='json'&&value?JSON.parse(value):value??null;},async put(key,value){map.set(key,value);}};}
const limiter={limit:async()=>({success:true})};
function environment(overrides={}){return{DB:db(),CONTENT_DB:db(),DEEPSEEK_API_KEY:'test-secret',DEEPSEEK_BASE_URL:'https://api.deepseek.com',DEEPSEEK_MODEL:'deepseek-v4-flash',AI_RATE_LIMITER:limiter,AI_SHARED_RATE_LIMITER:limiter,AI_SESSIONS:kv(),...overrides};}
const request=body=>new Request('https://ej-learning-36.example/api/ai/tutor',{method:'POST',headers:{'Content-Type':'application/json','User-Agent':'phase36-test'},body:JSON.stringify(body)});
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
