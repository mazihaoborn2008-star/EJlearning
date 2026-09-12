import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import worker,{scoreLevel} from '../src/worker.js';
const baseline=JSON.parse(JSON.stringify(vm.runInNewContext(fs.readFileSync(new URL('./fixtures/phase1-data.cjs',import.meta.url),'utf8')+';({topics,concepts,placementQuestions})')));
const base=process.env.BASE_URL||'http://127.0.0.1:8787';
async function get(p,status=200){const r=await fetch(base+p);assert.equal(r.status,status,p);assert(r.headers.get('content-type').includes('application/json'));return r.json();}
async function post(body,status=200){const r=await fetch(base+'/api/placement/score',{method:'POST',headers:{'Content-Type':'application/json'},body:typeof body==='string'?body:JSON.stringify(body)});assert.equal(r.status,status,JSON.stringify(body));return r.json();}
const submission=(lang,correct=12)=>({lang,answers:baseline.placementQuestions[lang].map((q,i)=>({questionId:lang+'-'+(i+1),optionId:i<correct?q[3]:(q[3]+1)%3}))});
test('published topics preserve Phase 1 content and order',async()=>{const {data}=await get('/api/topics');assert.deepEqual(data.map(({id,name,icon,description})=>({id,name,icon,description})),baseline.topics);});
test('all 15 Concepts exactly preserve expressions, IPA, reading tokens, grammar, chunks, comparison and independent difficulties',async()=>{
 const {data}=await get('/api/concepts');assert.equal(data.length,15);
 for(const [i,c] of data.entries()){const old=baseline.concepts[i];for(const k of ['id','topic','zh','comparison'])assert.equal(c[k],old[k]);
 for(const l of ['en','ja']){assert.equal(c[l].text,old[l]);assert.equal(c[l].difficulty,old[l+'Difficulty']);const {id,...g}=c[l].grammar;assert.deepEqual(g,old[l+'Grammar']);assert.equal(c[l].chunks.length,old[l+'Chunks'].length);for(const [j,ch] of c[l].chunks.entries()){const original=l==='en'?ch.text:ch.readings.map(r=>r.reading?`{${r.text}:${r.reading}}`:r.text).join('');assert.equal(original,old[l+'Chunks'][j]);assert.deepEqual(ch.grammar,c[l].grammar);}}
 assert.equal(c.en.ipa,old.ipa);assert.equal(c.ja.hiragana,old.hiragana);assert.equal(c.ja.readings.map(r=>r.text).join(''),old.ja);assert.equal(c.ja.readings.map(r=>r.reading||r.text).join(''),old.hiragana);
 assert.deepEqual((await get('/api/concepts/'+c.id)).data,c);
 }
});
test('filters and invalid Concepts',async()=>{for(const t of baseline.topics){assert.deepEqual((await get('/api/concepts?topic='+t.id)).data.map(c=>c.id),baseline.concepts.filter(c=>c.topic===t.id).map(c=>c.id));}assert.equal((await get('/api/concepts?topic=missing')).data.length,0);await get('/api/concepts/999',404);for(const p of ['/api/concepts/0','/api/concepts/-1','/api/concepts/abc','/api/concepts/1.5','/api/concepts/1/extra','/api/concepts?topic=%27%20OR%201=1'])assert((await get(p,400)).error.code);});
test('both question APIs preserve prompts/options but disclose no keys or explanations',async()=>{
 for(const lang of ['en','ja']){const {data}=await get('/api/placement/questions?lang='+lang);assert.equal(data.length,12);for(const [i,q] of data.entries()){assert.deepEqual(Object.keys(q).sort(),['id','language','type','prompt','targetText','difficulty','options'].sort());assert.equal(q.prompt,baseline.placementQuestions[lang][i][1]);assert.equal(q.type,baseline.placementQuestions[lang][i][0]);assert.deepEqual(q.options.map(o=>o.text),baseline.placementQuestions[lang][i][2]);for(const o of q.options)assert.deepEqual(Object.keys(o).sort(),['id','text']);}}
});
test('server scoring: every attainable score in both languages, regardless of answer order',async()=>{for(const lang of ['en','ja'])for(let correct=0;correct<=12;correct++){const body=submission(lang,correct);body.answers.reverse();const {data}=await post(body);assert.deepEqual(data,{lang,score:correct,total:12,percentage:correct/12*100,level:[1,1,1,1,2,2,3,3,4,4,5,5,6][correct]});}});
test('exact Phase 1 threshold percentages',()=>assert.deepEqual([0,25,26,45,46,65,66,80,81,92,93,100].map(n=>scoreLevel(n,100)),[1,1,2,2,3,3,4,4,5,5,6,6]));
test('malformed and forged submissions fail safely',async()=>{
 const bad=[null,[],{},'{', {lang:'xx',answers:[]},{lang:'en'}, {...submission('en'),score:12}, {...submission('en'),answers:[]}, {...submission('en'),answers:submission('ja').answers}];
 for(const mutate of [s=>s.answers.pop(),s=>s.answers.push(s.answers[0]),s=>s.answers[1]=s.answers[0],s=>s.answers[0].questionId='missing',s=>s.answers[0].optionId='0',s=>s.answers[0].optionId=true,s=>s.answers[0].optionId=1.5,s=>s.answers[0].optionId=-1,s=>s.answers[0].optionId=99,s=>s.answers[0]=null,s=>s.answers[0].score=12]){const s=submission('en');mutate(s);bad.push(s);}
 for(const body of bad){const response=await post(body,400);assert(response.error.code);assert(!JSON.stringify(response).includes('stack'));}
 for(const q of ['','?lang=zh','?lang=EN'])await get('/api/placement/questions'+q,400);
 const unsupported=await fetch(base+'/api/placement/score',{method:'POST',body:'{}'});assert.equal(unsupported.status,415);
 await post(' '.repeat(17000),413);
 for(const p of ['/api','/api/missing'])await get(p,404);
 for(const [p,method,allow] of [['/api/topics','POST','GET'],['/api/placement/score','GET','POST']]){const r=await fetch(base+p,{method});assert.equal(r.status,405);assert.equal(r.headers.get('allow'),allow);}
});
test('static assets available; source, fixtures, migrations and answer keys are not exposed',async()=>{
 for(const p of ['/','/index.html','/placement.html','/learn.html','/progress.html','/css/style.css','/js/api.js'])assert.equal((await fetch(base+p)).status,200,p);
 for(const p of ['/js/data.js','/src/worker.js','/migrations/0002_seed.sql','/tests/fixtures/phase1-data.cjs','/package.json','/wrangler.jsonc','/node_modules/wrangler/package.json'])assert.equal((await fetch(base+p)).status,404,p);
});
test('database errors never expose SQL or stacks',async()=>{const r=await worker.fetch(new Request(base+'/api/topics'),{DB:{prepare(){throw Error('sensitive SQL stack');}}});assert.equal(r.status,503);assert.deepEqual(await r.json(),{error:{code:'SERVICE_UNAVAILABLE',message:'内容服务暂时不可用，请稍后重试。'}});});
