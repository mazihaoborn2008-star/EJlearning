import test from 'node:test';
import assert from 'node:assert/strict';
import {dynamicExamples,normalizeSentence,providerUrl,validateProviderPayload} from '../src/ai-examples-35d1.js';

const enGrammar={id:'en-might',language:'en',title_zh:'可能会',form_name:'might + verb',formula:'might + verb',level:3,core_zh:'不确定的可能',purpose_zh:'表达较不确定的可能性',when_zh:'谈论可能发生的事',register:'neutral'};
const jaGrammar={id:'ja-copula',language:'ja',title_zh:'礼貌判断',form_name:'〜です',formula:'名词 + です',level:1,core_zh:'礼貌判断',purpose_zh:'礼貌说明身份或状态',when_zh:'日常礼貌交流',register:'neutral'};
const curated=[{text:'It might rain later.',translation_zh:'晚些时候可能会下雨。'}],curatedJa=[{text:'これは本です。',translation_zh:'这是一本书。'}];
const vocabulary=[{id:'ja-daijoubu',lemma:'大丈夫',stage:1},{id:'ja-ashita',lemma:'明日',stage:1}];
function contentDb(grammar=enGrammar){
 return {prepare(sql){
  assert.match(sql,/^SELECT\b/i);
  return {bind(...args){return {async all(){
   if(sql.includes('FROM v2_grammar_points'))return {results:[grammar]};
   if(sql.includes('FROM v2_grammar_examples'))return {results:grammar.language==='ja'?curatedJa:curated};
   if(sql.includes('FROM v2_vocabulary_items'))return {results:vocabulary};
   throw Error('Unexpected query: '+sql+' '+args.length);
  }}}};
 }};
}
const lessonDb={prepare(sql){assert.match(sql,/^SELECT\b/i);return {async first(){return null;}};}};
const limiter={async limit(){return {success:true};}};
function environment(grammar=enGrammar,overrides={}){const base={DB:lessonDb,CONTENT_DB:contentDb(grammar),DEEPSEEK_BASE_URL:'https://api.deepseek.com',DEEPSEEK_MODEL:'deepseek-v4-flash',AI_RATE_LIMITER:limiter,AI_SHARED_RATE_LIMITER:limiter,...overrides};return new Proxy(base,{get(target,property){if(property==='DEEPSEEK_API_KEY')return property;return Reflect.get(target,property);}});}
const request=body=>new Request('https://ej-learning-35d1.example/api/ai/examples',{method:'POST',headers:{'Content-Type':'application/json','User-Agent':'phase35d1-test'},body:JSON.stringify(body)});
const examples=sentences=>sentences.map((sentence,index)=>({sentence,meaning:`含义 ${index+1}`,note:''}));
const providerResponse=sentences=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify({examples:examples(sentences)})}}],usage:{total_tokens:123}});

test('normalization removes punctuation, case and spacing for duplicate checks',()=>assert.equal(normalizeSentence('  It MIGHT rain! '),'itmightrain'));
test('provider URL is pinned to the DeepSeek HTTPS host',()=>{assert.equal(providerUrl('https://api.deepseek.com'),'https://api.deepseek.com/chat/completions');assert.throws(()=>providerUrl('http://api.deepseek.com'));assert.throws(()=>providerUrl('https://example.com'));assert.throws(()=>providerUrl('https://api.deepseek.com/anything'));});

test('library grammar request returns five structured dynamic examples without secret metadata',async()=>{
 let calls=0;
 const fetchImpl=async(url,options)=>{calls++;assert.equal(url,'https://api.deepseek.com/chat/completions');assert.equal(options.method,'POST');const sent=JSON.parse(options.body);assert.deepEqual(Object.keys(sent).sort(),['max_tokens','messages','model','response_format','stream','temperature','thinking']);assert.equal(sent.model,'deepseek-v4-flash');assert.equal(sent.response_format.type,'json_object');assert.match(sent.messages[1].content,/JSON schema/);return providerResponse(['I might cook tonight.','She might call after work.','We might take the bus.','They might stay home.','He might need some help.']);};
 const response=await dynamicExamples(request({grammar_id:'en-might'}),environment(),null,fetchImpl),body=await response.json(),text=JSON.stringify(body);
 assert.equal(response.status,200);assert.equal(calls,1);assert.equal(body.data.kind,'dynamic_examples');assert.equal(body.data.examples.length,5);assert(!text.includes('DEEPSEEK_API_KEY'));assert(!text.includes('deepseek-v4-flash'));assert(!text.includes('api.deepseek.com'));assert(!text.includes('Authorization'));
});

test('lesson grammar request is grounded with lesson vocabulary and validates language',async()=>{
 let prompt='';const fetchImpl=async(_url,options)=>{prompt=JSON.parse(options.body).messages[1].content;return providerResponse(['今日は元気です。','明日は休みです。','これは私の本です。','駅はあちらです。','この店は静かです。']);};
 const response=await dynamicExamples(request({grammar_id:'ja-copula',lesson_id:'ja-s1-l1',mode:'simpler'}),environment(jaGrammar),null,fetchImpl),body=await response.json();
 assert.equal(response.status,200);assert.equal(body.data.examples.length,5);assert.match(prompt,/ja-s1-l1/);assert.match(prompt,/明日/);assert.doesNotMatch(prompt,/It might rain/);
});

test('duplicate curated/generated sentences are filtered and retry is capped at two calls',async()=>{
 let calls=0;const fetchImpl=async()=>{calls++;return calls===1?providerResponse(['It might rain later.','I might cook tonight.','I might cook tonight.','She might call.','We might leave.']):providerResponse(['They might stay home.','He might need help.','The shop might close early.','My train might be late.','You might like this.']);};
 const response=await dynamicExamples(request({grammar_id:'en-might'}),environment(),null,fetchImpl),body=await response.json();
 assert.equal(response.status,200);assert.equal(calls,2);assert.equal(body.data.examples.length,5);assert.equal(new Set(body.data.examples.map(x=>normalizeSentence(x.sentence))).size,5);assert(!body.data.examples.some(x=>normalizeSentence(x.sentence)===normalizeSentence(curated[0].text)));
});

test('arbitrary provider controls and oversized requests are rejected before fetch',async()=>{
 let calls=0,fetchImpl=async()=>{calls++;throw Error('must not run');};
 for(const field of ['model','base_url','system_prompt','api_key']){const response=await dynamicExamples(request({grammar_id:'en-might',[field]:'attacker-controlled'}),environment(),null,fetchImpl);assert.equal(response.status,400,field);}
 const response=await dynamicExamples(request({grammar_id:'en-might',padding:'x'.repeat(1200)}),environment(),null,fetchImpl);assert.equal(response.status,413);assert.equal(calls,0);
});

test('rate limiting rejects safely without calling provider',async()=>{let calls=0;const denied={async limit(){return {success:false};}},response=await dynamicExamples(request({grammar_id:'en-might'}),environment(enGrammar,{AI_RATE_LIMITER:denied}),null,async()=>{calls++;});assert.equal(response.status,429);assert.equal(calls,0);assert.deepEqual(await response.json(),{error:{code:'RATE_LIMITED',message:'请求太频繁，请稍后再试。'}});});

test('missing secret and mismatched lesson fail safely before provider access',async()=>{
 let calls=0,fetchImpl=async()=>{calls++;throw Error('must not run');};
 const missing={...environment()};let response=await dynamicExamples(request({grammar_id:'en-might'}),missing,null,fetchImpl);assert.equal(response.status,503);assert.match(await response.text(),/暂时无法生成更多例句/);
 response=await dynamicExamples(request({grammar_id:'en-might',lesson_id:'en-s1-l1'}),environment(),null,fetchImpl);assert.equal(response.status,400);assert.equal(calls,0);
});

test('identical grounded requests use only the five-minute ephemeral cache',async()=>{
 const previous=globalThis.caches,stored=new Map();Object.defineProperty(globalThis,'caches',{configurable:true,value:{default:{async match(req){return stored.get(req.url)?.clone()||null;},async put(req,response){stored.set(req.url,response.clone());}}}});
 try{let calls=0,fetchImpl=async()=>{calls++;return providerResponse(['I might cook tonight.','She might call after work.','We might take the bus.','They might stay home.','He might need some help.']);};let response=await dynamicExamples(request({grammar_id:'en-might'}),environment(),null,fetchImpl);assert.equal((await response.json()).meta.cache_hit,false);response=await dynamicExamples(request({grammar_id:'en-might'}),environment(),null,fetchImpl);assert.equal((await response.json()).meta.cache_hit,true);assert.equal(calls,1);assert.equal(stored.size,1);}finally{if(previous===undefined)delete globalThis.caches;else Object.defineProperty(globalThis,'caches',{configurable:true,value:previous});}
});

test('provider failures, invalid JSON and SSRF config return only a sanitized error',async()=>{
 const cases=[{env:environment(),fetch:async()=>new Response('provider-internal-detail',{status:500})},{env:environment(),fetch:async()=>new Response('{broken',{status:200,headers:{'Content-Type':'application/json'}})},{env:environment(enGrammar,{DEEPSEEK_BASE_URL:'https://attacker.example'}),fetch:async()=>{throw Error('must not run');}}];
 for(const scenario of cases){const response=await dynamicExamples(request({grammar_id:'en-might'}),scenario.env,null,scenario.fetch),text=await response.text();assert.equal(response.status,503);assert.match(text,/暂时无法生成更多例句/);assert(!text.includes('provider-internal-detail'));assert(!text.includes('attacker.example'));assert(!text.includes('DEEPSEEK'));}
});

test('fewer than five valid examples after the bounded retry fails cleanly',async()=>{let calls=0;const response=await dynamicExamples(request({grammar_id:'en-might'}),environment(),null,async()=>{calls++;return providerResponse(['I might cook tonight.']);});assert.equal(response.status,503);assert.equal(calls,2);assert.match(await response.text(),/暂时无法生成更多例句/);});

test('schema, language, marker and note bounds are enforced',()=>{
 const context={grammar:enGrammar,curated:[],lesson:null,vocabulary:[],targetLevel:3,mode:'default'};
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'It will rain.','meaning':'会下雨。',note:''}]},context),[]);
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'雨かもしれない。',meaning:'可能会下雨。',note:''}]},context),[]);
 assert.throws(()=>validateProviderPayload({examples:[{sentence:'It might rain.',meaning:'可能会下雨。',note:'x'.repeat(161)}]},context));
 assert.throws(()=>validateProviderPayload({examples:[{sentence:'It might rain.',meaning:'可能会下雨。',note:'',extra:'x'}]},context));
});

test('self-admitted errors and plain verbs followed by copula are rejected',()=>{
 const context={grammar:jaGrammar,curated:[],lesson:null,vocabulary:[],targetLevel:1,mode:'default'};
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'明日、東京に行くです。',meaning:'明天去东京。',note:''}]},context),[]);
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'明日、東京に行くです。',meaning:'明天去东京。',note:'不自然，应说「行きます」。'}]},context),[]);
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'今日は休みです。',meaning:'今天休息。',note:''}]},context),[{sentence:'今日は休みです。',meaning:'今天休息。',note:''}]);
});

test('be-as-auxiliary examples are rejected for the be-predicate grammar point',()=>{
 const context={grammar:{...enGrammar,id:'en-be-adjective',form_name:'be + predicate'},curated:[],lesson:null,vocabulary:[],targetLevel:1,mode:'default'};
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'We are having dinner tomorrow.',meaning:'我们明天吃晚饭。',note:''}]},context),[]);
 assert.deepEqual(validateProviderPayload({examples:[{sentence:'The coffee is hot.',meaning:'咖啡很热。',note:''}]},context),[{sentence:'The coffee is hot.',meaning:'咖啡很热。',note:''}]);
});
