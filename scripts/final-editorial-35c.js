// Explicit final judgments for examples not covered by the first source-expression pass.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
const db=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations-35c').filter(f=>f<'0014').sort())db.exec(fs.readFileSync('migrations-35c/'+f,'utf8'));
const q=v=>typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
const sql=['-- Final semantic/source-type and independent difficulty review. No automatic difficulty formula remains in published new content.'];
function exec(s){db.exec(s);sql.push(s);}
function update(t,id,v){exec(`UPDATE v2_${t} SET ${Object.entries(v).map(([k,v])=>k+'='+q(v)).join(',')} WHERE id=${q(id)};`);}
for(const id of [17,29,41,53,62,65,77,89,113,125,137,149,158,161,170,173])exec(`UPDATE v2_sentence_units SET unit_type='scenario',context_zh=anchor_zh WHERE id='legacy-${id}';`);
const lexical=`16 111 111 simple-present copula
22 323 322 simple-past polite-past
28 222 222 will polite-present
34 313 313 be-adjective copula
40 313 313 be-adjective copula
46 323 343 could-request humble
52 222 313 do-question ga-existence
58 433 333 simple-present nai
64 313 222 have-possession ga-existence
70 423 323 imperative te-form
76 212 233 imperative te-oku
82 313 444 be-adjective wari-ni
88 222 313 wh-question ka-question
90 111 111 wh-question ka-question
94 423 323 simple-past polite-past
100 121 222 imperative te-form
106 413 313 be-adjective i-adjective
112 111 222 be-adjective polite-past
118 424 333 present-continuous te-iru
124 222 233 be-adjective te-kureru
130 413 413 be-adjective copula
136 232 212 gerund-subject copula
148 312 233 greeting te-kureru
153 243 333 present-perfect te-iru
154 423 434 be-adjective te-kureru
160 212 222 simple-present copula
166 323 232 could-request te-mo-ii
171 434 344 can-ability potential
172 222 222 wh-question ka-question`;
exec("INSERT INTO v2_grammar_points(id,language,slug,title_zh,form_name,level,core_zh,purpose_zh,formula,when_zh,mistakes_zh,nuance_zh,usage_zh,publication_state) VALUES('en-gerund-subject','en','gerund-subject','把活动作为主语','V-ing as subject',3,'把活动当作谈论的对象。','评价或描述一项活动','V-ing phrase + singular verb','说活动本身是什么或如何。','单个活动作主语通常用单数谓语。','Cooking在此不是进行时，没有表示正在的be。','Cooking is my hobby.表示做饭是爱好。','published');");
exec("INSERT INTO v2_grammar_examples(id,grammar_id,language,text,translation_zh,explanation_zh) VALUES('final-ge-gerund','en-gerund-subject','en','Cooking is my hobby.','做饭是我的爱好。','动名词作主语，不是现在进行时。');");
function difficulty(id,t,reason){assert(/^[1-6]{3}$/.test(t),id);update('sentence_expressions',id,{vocabulary_difficulty:+t[0],grammar_difficulty:+t[1],overall_difficulty:+t[2],difficulty_note_zh:`逐例编辑判断：词汇${t[0]}，语法${t[1]}，整体${t[2]}。${reason}；整体由本句任务判断，不取两维最大值或平均值，不对应考试等级。`});}
for(const row of lexical.split('\n')){const [id,en,ja,eg,jg]=row.split(' ');for(const [lang,t,g] of [['en',en,eg],['ja',ja,jg]]){
 const eid='legacy-'+id+'-'+lang;difficulty(eid,t,'本例围绕特定义项，分别考虑短句可记忆性、变形和语气');
 exec(`UPDATE v2_sentence_grammar_links SET grammar_id='${lang}-${g}',note_zh=(SELECT nuance_zh FROM v2_grammar_points WHERE id='${lang}-${g}') WHERE expression_id='${eid}' AND id LIKE 'c-gl-%';`);
}}
const lessons={en:`present-continuous 212;there-is 212;have-possession 212;wh-question 111;imperative 212;want-to 111;possessive 111;can-ability 222;will 222;comparative 222;let-us 122;before-after 222;indirect-question 132;make-feel 333;would-have 255;should-have 243;relative-clause 244;passive 333;second-conditional 244;third-conditional 255;concessive-although 244;shall-suggestion 122;not-have-to 132;help-infinitive 333`,ja:`wa-topic 111;ga-existence 212;wo-object 111;ni-time 112;de-place 111;no-possession 111;i-adjective 212;tai 222;te-mo-ii 232;mae-ni 333;kara-after 222;te-oku 434;tokoro 233;youda 344;hearsay-sou 243;nakute-mo-ii 333;koto-ni-suru 244;ba-yokatta 243;causative-request 343;honorific 343;humble 343;wari-ni 444;kai 454;to-wa-kagiranai 255;mono-no 255;beki 355;hodo-approx 222;indirect-ka 333;volitional 233;node 333;dake 232;te-kureru 333;ni-naru 332;ba-condition 233;greeting 111`};
for(const [lang,rows] of Object.entries(lessons))for(const row of rows.split(';')){const [slug,t]=row.split(' ');difficulty('lesson-'+lang+'-'+slug+'-ex',t,'短例用于聚焦该结构，词汇负荷与结构负荷独立；高级推断和反事实关系提高整体负荷');}
const enText='This soup is light.',jaText='あっさりしたスープです。';
for(const [lang,text,reading] of [['en',enText,'[]'],['ja',jaText,JSON.stringify([{text:jaText}])]]){
const eid='legacy-34-'+lang;update('sentence_expressions',eid,{text,readings_json:reading});exec(`UPDATE v2_sentence_grammar_links SET displayed_form=${q(text)} WHERE expression_id=${q(eid)};`);
}
const clutter='この散らかった物を片付けないといけません。';update('sentence_expressions','legacy-58-ja',{text:clutter,readings_json:JSON.stringify([{text:clutter,reading:'このちらかったものをかたづけないといけません。'}])});exec(`UPDATE v2_sentence_grammar_links SET displayed_form=${q(clutter)} WHERE expression_id='legacy-58-ja';`);
// Match noun/coplanar examples to their actual predicative use, rather than an adjective-only title.
update('grammar_points','en-be-adjective',{title_zh:'用 be 描述状态或性质',formula:'subject + be + adjective / noun / state phrase',form_name:'be + predicate',core_zh:'用be把主语与状态、性质或身份联系起来。',when_zh:'形容词、名词或介词短语作表语；根据本例分清词类。',mistakes_zh:'英语通常不能省略be；名词表语也不是形容词。',nuance_zh:'be结构可搭配不同表语，不把名词、形容词与状态短语视为同一词类。'});
assert.equal(db.prepare('SELECT * FROM v2_sentence_expressions').all().filter(e=>e.difficulty_note_zh.includes('初审判断')).length,0,'Every provisional difficulty needs an explicit final judgment');
const output=sql.join('\n')+'\n',file='migrations-35c/0014_final_editorial_judgments.sql';if(fs.existsSync(file))assert.equal(fs.readFileSync(file,'utf8'),output,'Applied migration is immutable');else fs.writeFileSync(file,output);
console.log('All remaining examples received explicit difficulty and grammatical judgments; scenario phrase destinations restored.');

