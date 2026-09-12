import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
import {lexicalRows} from './lexicon-35c.js';
import {extraRows} from './lexicon-extra-35c.js';
import {grammarText} from './grammar-35c.js';
import {primaryGrammar,supplementalGrammar,patternTexts,patternReadings,legacyLexical} from './migration-decisions-35c.js';
import {readingTokens} from './japanese-tokens.js';
import {review} from './review-35c.js';
const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');
const vocabularySource=lexicalRows+'\n'+extraRows;
for(const f of fs.readdirSync('migrations-35b').sort())db.exec(fs.readFileSync('migrations-35b/'+f,'utf8'));
const sql=['-- Phase 3.5C additive curriculum. No legacy mutation. Model-assisted editorial decisions; no professional certification.'];
const q=v=>v==null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
function add(table,row){const s=`INSERT INTO v2_${table} (${Object.keys(row).join(',')}) VALUES (${Object.values(row).map(q).join(',')});`;try{db.exec(s)}catch(e){throw Error(s+'\n'+e.message)}sql.push(s);return row.id;}
const schema=`CREATE TABLE v2_editorial_decisions (
 concept_id INTEGER PRIMARY KEY REFERENCES concepts(id), source_sha256 TEXT NOT NULL, source_json TEXT NOT NULL CHECK(json_valid(source_json)),
 prior_review_flag INTEGER NOT NULL CHECK(prior_review_flag IN(0,1)), status TEXT NOT NULL CHECK(status IN('resolved','unresolved')),
 decision_zh TEXT NOT NULL, reviewer_type TEXT NOT NULL CHECK(reviewer_type='model_assisted'), revision TEXT NOT NULL, reviewed_at TEXT NOT NULL);
CREATE TABLE v2_legacy_crosswalk (
 id TEXT PRIMARY KEY, concept_id INTEGER NOT NULL REFERENCES v2_editorial_decisions(concept_id), legacy_expression_id INTEGER NOT NULL REFERENCES expressions(id),
 language TEXT NOT NULL CHECK(language IN('en','ja')), vocabulary_id TEXT, grammar_id TEXT, expression_id TEXT,
 role TEXT NOT NULL CHECK(role IN('primary','extracted','example')), note_zh TEXT NOT NULL,
 FOREIGN KEY(vocabulary_id,language) REFERENCES v2_vocabulary_items(id,language),
 FOREIGN KEY(grammar_id,language) REFERENCES v2_grammar_points(id,language),
 FOREIGN KEY(expression_id,language) REFERENCES v2_sentence_expressions(id,language),
 CHECK((vocabulary_id IS NOT NULL)+(grammar_id IS NOT NULL)+(expression_id IS NOT NULL)=1));
CREATE TRIGGER v2_crosswalk_source_insert BEFORE INSERT ON v2_legacy_crosswalk BEGIN
 SELECT RAISE(ABORT,'crosswalk source mismatch') WHERE NOT EXISTS(SELECT 1 FROM expressions WHERE id=NEW.legacy_expression_id AND concept_id=NEW.concept_id AND language=NEW.language);
END;
CREATE TRIGGER v2_crosswalk_source_update BEFORE UPDATE ON v2_legacy_crosswalk BEGIN
 SELECT RAISE(ABORT,'crosswalk source mismatch') WHERE NOT EXISTS(SELECT 1 FROM expressions WHERE id=NEW.legacy_expression_id AND concept_id=NEW.concept_id AND language=NEW.language);
END;
CREATE INDEX v2_crosswalk_concept ON v2_legacy_crosswalk(concept_id,language);`;
db.exec(schema);sql.push(schema);
const all=table=>db.prepare('SELECT * FROM v2_'+table).all();
const normalize=s=>s.replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().replace(/[。.!?？！]+$/,'').toLowerCase();
const kanji=/[一-龯々]/u, dictionary=new Map(),missing=new Set();
function learn(text,reading){try{for(const p of readingTokens(text,reading))if(p.reading&&kanji.test(p.text)&&!dictionary.has(p.text))dictionary.set(p.text,p.reading);}catch{ /* source alignment issues remain audited through explicit readings */ }}
for(const e of db.prepare("SELECT * FROM expressions WHERE language='ja'").all())if(e.hiragana)learn(e.text,e.hiragana);
for(const line of vocabularySource.split('\n')){const a=line.split('|');learn(a[5],a[6]);}
for(const line of (grammarText.ja+'\n'+supplementalGrammar.ja).split('\n')){const a=line.split('|');learn(a[5],a[7]);}
for(const [k,v] of Object.entries(legacyLexical))learn(v[3],v[4]);
const extras={'私':'わたし','温かい':'あたたかい','新鮮':'しんせん','毎朝':'まいあさ','来週':'らいしゅう','今週末':'こんしゅうまつ','自由':'じゆう','貯':'た','炊':'た','加':'くわ','減':'へ','育':'そだ','焼':'や','丸':'まる','座':'すわ','大学':'だいがく','英語':'えいご','日本語':'にほんご','手紙':'てがみ','質問':'しつもん','箱':'はこ','強':'つよ','大雪':'おおゆき','真実':'しんじつ','案':'あん','品質':'ひんしつ','資源':'しげん','有力':'ゆうりょく','実践的':'じっせんてき','開発':'かいはつ','製品':'せいひん','証言':'しょうげん','相反':'あいはん','要求':'ようきゅう','原因':'げんいん','返答':'へんとう','危険':'きけん','選択肢':'せんたくし','結論':'けつろん','役立':'やくだ','証拠':'しょうこ','検証':'けんしょう','優先事項':'ゆうせんじこう','偶然':'ぐうぜん','正当性':'せいとうせい','価値':'かち','助言':'じょげん','騒音':'そうおん','詳細':'しょうさい','部品':'ぶひん','会議':'かいぎ','席':'せき','情報':'じょうほう','目的':'もくてき','問題':'もんだい','影響':'えいきょう','主張':'しゅちょう','相手':'あいて','検討':'けんとう','微妙':'びみょう','果':'は','差':'さ','都合':'つごう','悪':'わる','言':'い','備':'そな','昼':'ひる','夜':'よる','日':'ひ','後':'あと','物':'もの','定':'さだ','事':'こと'};
for(const [a,b] of Object.entries(extras))dictionary.set(a,b);
if(fs.existsSync('scripts/readings-35c.json'))for(const [a,b] of Object.entries(JSON.parse(fs.readFileSync('scripts/readings-35c.json'))))dictionary.set(a,b);
function readings(text,explicit){if(explicit){learn(text,explicit);try{return JSON.stringify(readingTokens(text,explicit));}catch{return JSON.stringify([{text,reading:explicit}]);}}
 const keys=[...dictionary.keys()].sort((a,b)=>b.length-a.length);const out=[];let rest=text;
 while(rest){const key=keys.find(k=>rest.startsWith(k));if(key){out.push({text:key,reading:dictionary.get(key)});rest=rest.slice(key.length);}else{const char=[...rest][0];if(kanji.test(char))missing.add(char);out.push({text:char});rest=rest.slice(char.length);}}
 return JSON.stringify(out);
}
let serial=0;
function vocab(language,head,pron,pos,stage,meaning,example,translation,note,exampleReading){
 let item=db.prepare('SELECT * FROM v2_vocabulary_items WHERE language=? AND lemma=? AND part_of_speech=?').get(language,head,pos);
 if(!item){const id=language+'-c-'+String(++serial).padStart(3,'0');add('vocabulary_items',{id,language,lemma:head,type:pos.includes('phrase')||pos==='fixed expression'||head.includes(' ')?'fixed_expression':'word',stage,ipa:language==='en'?pron:null,reading:language==='ja'?pron:null,part_of_speech:pos,register:stage>=5?'formal':'neutral',publication_state:'published',sort_order:100+serial});item={id};add('vocabulary_senses',{id:id+'-1',item_id:id,meaning_zh:meaning,usage_zh:note||`本义为“${meaning}”；结合搭配理解适用范围，不自动延伸到其他义项。`,semantic_label:meaning});}
 if(example&&!all('vocabulary_examples').some(e=>e.item_id===item.id&&e.text===example))add('vocabulary_examples',{id:'c-ve-'+(++serial),item_id:item.id,sense_id:db.prepare('SELECT id FROM v2_vocabulary_senses WHERE item_id=? ORDER BY sort_order LIMIT 1').get(item.id).id,kind:example.includes('.')||example.includes('。')||example.includes('?')?'example':'collocation',text:example,translation_zh:translation,note_zh:note||'本搭配展示此义项的自然接续；其他义项需另行区分。',readings_json:language==='ja'?readings(example,exampleReading):'[]'});
 return item.id;
}
for(const line of vocabularySource.split('\n')){const [en,ipa,ep,es,zh,ja,kana,jp,js,ee,je,ez]=line.split('|');assert(ez,line);vocab('en',en,ipa,ep,+es,zh,ee,ez);vocab('ja',ja,kana,jp,+js,zh,je,ez);}
const grammarExamples=[];
for(const language of ['en','ja'])for(const line of (grammarText[language]+'\n'+supplementalGrammar[language]).split('\n')){
 const [slug,level,title,formula,note,example,translation,kana]=line.split('|'),id=language+'-'+slug;
 add('grammar_points',{id,language,slug,title_zh:title,form_name:formula,level:+level,core_zh:title,purpose_zh:title,formula,when_zh:note,mistakes_zh:note,nuance_zh:note,usage_zh:`结合“${translation}”理解本用法。`,register:+level>=5?'formal':'neutral',publication_state:'published',sort_order:100+(++serial)});
 const row={id:'c-ge-'+id,grammar_id:id,language,text:example,translation_zh:translation,explanation_zh:note,readings_json:language==='ja'?readings(example,kana):'[]'};add('grammar_examples',row);grammarExamples.push({...row,level:+level});
}
const points=new Map(all('grammar_points').map(g=>[g.id,g]));
const primary=new Map(primaryGrammar.split('\n').map(l=>{const [id,en,ja]=l.split(' ');return [+id,{en:'en-'+en,ja:'ja-'+ja}]}));
const proposal=JSON.parse(fs.readFileSync('docs/phase35a/legacy-mapping.json'));const flagged=new Set(proposal.summary.human_review_ids);
const topics=db.prepare('SELECT * FROM topics').all();for(const t of topics)if(!db.prepare('SELECT 1 FROM v2_topics WHERE id=?').get(t.id))add('topics',{id:t.id,name_zh:t.name_zh||t.name||t.id,sort_order:t.sort_order||0});
const decisions=[];
function cross(c,e,domain,id,role,note){add('legacy_crosswalk',{id:'c-x-'+(++serial),concept_id:c.id,legacy_expression_id:e.id,language:e.language,[domain+'_id']:id,role,note_zh:note});}
function linkGrammar(eid,lang,gid,text){assert(points.has(gid),gid);if(!db.prepare('SELECT 1 FROM v2_sentence_grammar_links WHERE expression_id=? AND grammar_id=?').get(eid,gid))add('sentence_grammar_links',{id:'c-gl-'+(++serial),expression_id:eid,language:lang,grammar_id:gid,displayed_form:text,occurrence:1,note_zh:points.get(gid).nuance_zh});}
function sentence(id,anchor,topic,type,texts,notes){
 add('sentence_units',{id,anchor_zh:anchor,topic_id:topic,unit_type:type,context_zh:type==='scenario'?anchor:null,comparison_zh:notes,publication_state:'published',sort_order:100+(++serial)});
 return id;
}
function expression(id,unit,language,text,gid,reading,ipa,note){
 const g=points.get(gid),gl=g?.level||1;const words=all('vocabulary_items').filter(v=>v.language===language&&text.toLowerCase().includes(v.lemma.toLowerCase()));
 const vd=words.length?Math.max(...words.map(v=>v.stage)):2;const length=language==='en'?text.split(/\s+/).length:text.length/2;
 const overall=Math.min(6,Math.max(1,Math.round((vd+gl)/2)+(length>22?1:0)));
 add('sentence_expressions',{id,unit_id:unit,language,text,ipa:language==='en'?ipa||null:null,readings_json:language==='ja'?readings(text,reading):'[]',overall_difficulty:overall,vocabulary_difficulty:vd,grammar_difficulty:gl,difficulty_note_zh:`词汇${vd}：按本例关键意义与搭配；语法${gl}：${g?.title_zh||'语境回应'}；整体${overall}：结合句长、语境省略与交际任务的初审判断，非考试换算。`,note_zh:note,publication_state:'published'});
 if(gid)linkGrammar(id,language,gid,text);
 return id;
}
for(const c of db.prepare('SELECT * FROM concepts ORDER BY id').all()){
 const sources=db.prepare('SELECT * FROM expressions WHERE concept_id=? AND is_primary=1 ORDER BY language').all(c.id);
 let note=c.usage_note||'按中文交际意义保留自然目标语言表达；词汇与语法分别组织。';
 const special={46:'日语以意見为词头，限定为改进反馈；不把说明性短语当作唯一词头。',58:'散らかった物作为可理解的描述性名词短语保留，并非与clutter完全等价的单词。',64:'限定预约服务/约好的会面；予約不覆盖英语appointment的所有任命义。',70:'buffer仅取时间余量义，余裕不泛化为所有技术缓冲区。',82:'英语good value为搭配；日语价格比较表达同时保留完整句例。',112:'英语thirsty为形容词，日语喉が渇く为自然状态表达；独立保存完整句。',118:'英语run-down为形容词；日语疲れがたまる为状态表达，保留变化与持续语境。',130:'限任务太多而应付不过来，不扩展到被美景感动等overwhelmed其他义。',154:'英语形容词considerate；日语抽取名词気遣い，句例另教能力表达。',172:'英语名词plan独立于已有动词en-plan；日语复用予定，不强制词性对应。',178:'愉快期待与expect预测/要求明确分开。',180:'补全被工作打断的参加语境；英语表达未实现结果，日语表达原有意图，不宣称结构等价。',170:'补全日语ので后的请求，让独立展示时意图完整。',104:'根据天空迹象用降りそう，独立于普通形接そう的传闻。'};
 note=(special[c.id]?special[c.id]+' ':'')+note;
 const sourceJson=JSON.stringify({concept:c,expressions:sources});add('editorial_decisions',{concept_id:c.id,source_sha256:createHash('sha256').update(sourceJson).digest('hex'),source_json:sourceJson,prior_review_flag:+flagged.has(c.id),status:'resolved',decision_zh:note,reviewer_type:'model_assisted',revision:'35c-editorial-1',reviewed_at:'2026-09-09T00:00:00Z'});
 const lexical=legacyLexical[c.id];let unit;
 for(const e of sources){
 const lang=e.language,m=JSON.parse(e.metadata_json||'{}');
 if(lexical){const [en,ep,es,ja,jr,jp,js]=lexical;const example=m.example?.trim();const id=vocab(lang,lang==='en'?en:ja,lang==='en'?e.ipa:jr,lang==='en'?ep:jp,lang==='en'?es:js,c.zh,example,c.zh,note);cross(c,e,'vocabulary',id,'primary',note);}
 let text=patternTexts[c.id]?.[lang==='en'?0:1]||((c.concept_type==='pattern'||lexical)&&m.example?m.example:e.text);if(lang==='ja'&&!/[。！？？]$/.test(text)&&c.concept_type!=='dialogue')text+='。';
 if(lexical&&!m.example)continue;
 // Reuse representative expressions only after exact surface normalization, preserving their independent metadata.
 const existing=all('sentence_expressions').find(x=>x.language===lang&&normalize(x.text)===normalize(text));
 if(existing){cross(c,e,'expression',existing.id,lexical?'example':'primary',note);continue;}
 if(!unit){unit='legacy-'+c.id;sentence(unit,c.zh,c.topic_id,c.concept_type==='dialogue'?'dialogue':c.concept_type==='scenario_response'?'scenario':'sentence',null,note);}
 let gid=primary.get(c.id)?.[lang];if(!gid&&lexical)gid=lang==='en'?(text.includes('?')?'en-could-request':'en-simple-present'):'ja-polite-present';
 let read=lang==='ja'?(patternReadings[c.id]||(!patternTexts[c.id]&&c.concept_type!=='pattern'&&!lexical?e.hiragana:null)):null;
 if(c.id===170&&lang==='ja')read='ごめいわくをおかけしたくないので、つごうがわるければいってください。';
 const eid=unit+'-'+lang;expression(eid,unit,lang,text,gid,read,text===e.text?e.ipa:null,note);
 if(c.concept_type==='dialogue')for(const [i,line] of text.split('\n').entries()){const match=line.match(/^([^:：]+)[:：]\s*(.*)$/);assert(match,text);const lineRead=read?.split('\n')[i]?.replace(/^[^:：]+[:：]\s*/,'');add('dialogue_turns',{id:eid+'-'+i,expression_id:eid,speaker:match[1],text:match[2],readings_json:lang==='ja'?readings(match[2],lineRead):'[]',sort_order:i});}
 cross(c,e,'expression',eid,lexical?'example':'primary',note);if(c.concept_type==='pattern')cross(c,e,'grammar',gid,'primary',note);
 }
 decisions.push({id:c.id,flagged:flagged.has(c.id),note});
}
// Every new grammar point has a concrete browsable example, including higher-level coverage.
for(const ge of grammarExamples){let e=all('sentence_expressions').find(e=>e.language===ge.language&&normalize(e.text)===normalize(ge.text));if(!e){const id='lesson-'+ge.grammar_id;sentence(id,ge.translation_zh,ge.level>=5?'school':'chat','sentence',null,'独立目标语言语法例句，不强配另一语言结构。');expression(id+'-ex',id,ge.language,ge.text,ge.grammar_id,null,null,ge.explanation_zh);if(ge.language==='ja'){const s=`UPDATE v2_sentence_expressions SET readings_json=${q(ge.readings_json)} WHERE id=${q(id+'-ex')};`;db.exec(s);sql.push(s);}e={id:id+'-ex',text:ge.text};}linkGrammar(e.id,ge.language,ge.grammar_id,ge.text);}
// Initial candidate links use boundary-aware exact lexical heads. Inflections are added through explicit reviewed overrides.
const inflections={eat:['eaten'],go:['went'],leave:['left'],come:['came'],feel:['feeling'],get:['getting','got'],grow:['grown'],learn:['learned'],write:['written'],take:['took'],make:['made'],plan:['plans'],try:['tried'],choose:['choosing'],rain:['raining'],wait:['waited'],cook:['cooking']};
for(const e of all('sentence_expressions')){
 const candidates=all('vocabulary_items').filter(v=>v.language===e.language).flatMap(v=>{const forms=[v.lemma,...(e.language==='en'?inflections[v.lemma]||[]:[])];const form=forms.find(f=>e.language==='en'?new RegExp('(?<![a-z])'+f.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![a-z])','i').test(e.text):e.text.includes(f));return form?[{v,form:e.text.match(new RegExp(form.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'))?.[0]||form}]:[];}).sort((a,b)=>b.form.length-a.form.length).slice(0,4);
 for(const {v,form} of candidates)if(!db.prepare('SELECT 1 FROM v2_sentence_vocabulary_links WHERE expression_id=? AND item_id=?').get(e.id,v.id))add('sentence_vocabulary_links',{id:'c-vl-'+(++serial),expression_id:e.id,language:e.language,item_id:v.id,sense_id:null,displayed_form:form,importance:2,note_zh:'以本句实际出现形式连接；词义范围见词条与句子语境。'});
}
// Academic metadata is deliberately explicit and independent of internal Stage/Level.
const aligned={en:{'5.0':['en-do-question','en-simple-past'],'5.5':['en-would-like','en-since-for'],'6.0':['en-passive','en-relative-clause'],'6.5':['en-hedged-claim','en-concessive-although'],'7.0+':['en-qualified-comparison','en-participle-clause']},ja:{N5:['ja-wa-topic','ja-ka-question'],N4:['ja-tai','ja-te-mo-ii'],N3:['ja-to-wa-kagiranai','ja-youda'],N2:['ja-mono-no','ja-zaru-wo-enai'],N1:['ja-ni-hoka-naranai','ja-wo-fumaete']}};
function align(language,target,domain,id,note){if(db.prepare('SELECT 1 FROM v2_content_alignments WHERE language=? AND target=? AND '+domain+'_id=?').get(language,target,id))return;add('content_alignments',{id:'c-align-'+(++serial),framework_id:language==='en'?'IELTS':'JLPT',target,language,[domain+'_id']:id,relevance_zh:note,tags_json:JSON.stringify(language==='en'?['Speaking','Writing',target==='7.0+'?'Academic':'Usage']:['语法','用法']),status:'draft',basis_zh:'按结构功能与典型学习用途逐项选取；不是内部等级换算，目标组允许基础复习。',source_type:'model_editorial',source_title:'Phase 3.5C 模型辅助课程初审',editorial_note_zh:'待独立审校；非官方完整词汇或语法清单，不承诺成绩或等级。'});}
for(const [lang,targets] of Object.entries(aligned))for(const [target,ids] of Object.entries(targets))for(const id of ids){align(lang,target,'grammar',id,points.get(id).purpose_zh);const e=db.prepare('SELECT expression_id FROM v2_sentence_grammar_links WHERE grammar_id=? ORDER BY id LIMIT 1').get(id);if(e)align(lang,target,'expression',e.expression_id,'在具体语境练习该结构。');}
const vocabAlignment={en:{'5.0':['friend','work','food'],'5.5':['choice','experience','opinion'],'6.0':['evidence','reliable','budget'],'6.5':['evaluate','limitation','perspective'],'7.0+':['substantiate','empirical','mitigate']},ja:{N5:['水','学校','食べる'],N4:['予定','習う','選ぶ'],N3:['確認する','経験','判断'],N2:['曖昧','評価する','維持する'],N1:['精査する','含意','説明責任']}};
for(const [lang,targets] of Object.entries(vocabAlignment))for(const [target,heads] of Object.entries(targets))for(const head of heads){const v=db.prepare('SELECT id FROM v2_vocabulary_items WHERE language=? AND lemma=? LIMIT 1').get(lang,head);if(v)align(lang,target,'vocabulary',v.id,'在目标学习中练习此词的准确用法，不表示此词专属该目标。');}
review({db,add,sql,q,readings,vocab});
const migrationFile='migrations-35c/0011_curriculum.sql',migrationText=sql.join('\n')+'\n';
if(fs.existsSync(migrationFile))assert.equal(fs.readFileSync(migrationFile,'utf8'),migrationText,'Applied migration 0011 is immutable. Write a new additive migration for changes.');else fs.writeFileSync(migrationFile,migrationText);
fs.writeFileSync('docs/phase35c/editorial-decisions.json',JSON.stringify(decisions,null,2));
fs.writeFileSync('docs/phase35c/missing-reading-characters.json',JSON.stringify([...missing].sort(),null,2));
const tables=Object.fromEntries(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'v2_%'").all().map(({name})=>[name,db.prepare('SELECT * FROM '+name).all()]));
fs.writeFileSync('docs/phase35c/curriculum.json',JSON.stringify(tables,null,2));
console.log(JSON.stringify({vocabulary:all('vocabulary_items').length,grammar:all('grammar_points').length,units:all('sentence_units').length,expressions:all('sentence_expressions').length,decisions:decisions.length,missingReadingCharacters:[...missing]}));

