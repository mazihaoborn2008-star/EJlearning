import assert from 'node:assert/strict';

const base=process.env.BASE_URL||'https://ej-learning-36.yanjian-language-learning.workers.dev';
const session=label=>`${label}_${crypto.randomUUID().replaceAll('-','')}`;
async function get(path){const response=await fetch(base+path);const body=await response.json();assert.equal(response.status,200,`${path}: ${JSON.stringify(body)}`);return body.data;}
async function tutor(payload,expected=200){const response=await fetch(base+'/api/ai/tutor',{method:'POST',headers:{'Content-Type':'application/json','User-Agent':'phase36-real-acceptance'},body:JSON.stringify(payload)});const body=await response.json();assert.equal(response.status,expected,JSON.stringify(body));return body;}
const zh=text=>/[㐀-鿿]/u.test(text);

const englishSession=session('english');
const english=(await tutor({message:'I very like this book.',language:'en',session_id:englishSession})).data.message;
assert.match(english,/I really like this book/i);assert(zh(english));assert.match(english,/(very|副词|搭配|程度)/iu);
const followup=(await tutor({message:'接着刚才的纠错，为什么这里不能用 very？请简短回答。',language:'en',session_id:englishSession})).data.message;
assert.match(followup,/(very|like|really)/iu);assert(zh(followup));

const japanese=(await tutor({message:'私は学校に勉強します。',language:'ja',session_id:session('japanese')})).data.message;
assert.match(japanese,/学校で勉強します/u);assert(zh(japanese));assert.match(japanese,/(助词|助詞|动作地点|動作場所|「で」|で)/u);
const romajiTokens=(japanese.match(/\b[a-z]{3,}\b/giu)||[]).filter(x=>!['Tutor'].includes(x));assert(romajiTokens.length<=2,`Unexpected romaji-heavy answer: ${japanese}`);

const lesson=await get('/api/v2/lessons/en-s1-l1');
const lessonChecks=[];
for(const [focusType,item,needle] of [
 ['grammar',lesson.grammar[0],lesson.grammar[0].form_name],
 ['vocabulary',lesson.vocabulary[0],lesson.vocabulary[0].lemma],
 ['expression',lesson.expressions[0],lesson.expressions[0].text]
]){
 const message=(await tutor({message:'当前学习重点是什么？请直接结合当前内容给一个简短例子，不要让我重复说明。',language:'en',session_id:session('lesson_'+focusType),context:{type:'lesson',id:lesson.id,focus_type:focusType,focus_id:item.id}})).data.message;
 const shortNeedle=needle.split(/[\s/（(]/u).filter(Boolean)[0];assert(message.toLocaleLowerCase().includes(shortNeedle.toLocaleLowerCase()),`${focusType} missing ${shortNeedle}: ${message}`);lessonChecks.push({focus:focusType,target:needle,response:message});
}

const vocabulary=(await tutor({message:'这个词怎么用？请使用已有用法给例子。',language:'en',session_id:session('library_vocab'),context:{type:'vocabulary',id:'en-c-541'}})).data.message;
assert.match(vocabulary,/choice/i);
const grammar=(await tutor({message:'给我几个当前语法的简短例子。',language:'en',session_id:session('library_grammar'),context:{type:'grammar',id:'en-might'}})).data.message;
assert.match(grammar,/might/i);

for(const field of ['system_prompt','model','base_url']){const rejected=await tutor({message:'test',language:'en',session_id:session('attack'),[field]:'attacker-controlled'},400);assert.equal(rejected.error.code,'INVALID_REQUEST');}
const cross=await tutor({message:'test',language:'ja',session_id:session('cross_language'),context:{type:'grammar',id:'en-might'}},400);assert.equal(cross.error.code,'CONTEXT_LANGUAGE_MISMATCH');

console.log(JSON.stringify({passed:true,english,followup,japanese,lesson:lessonChecks,library:{vocabulary,grammar},security:{arbitrary_fields:'rejected',cross_language:'rejected'}},null,2));
