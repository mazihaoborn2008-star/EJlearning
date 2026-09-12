import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
export function audit(data){
 const t=name=>data['v2_'+name]||[],errors=[],warnings=[];
 const error=(code,id,detail)=>errors.push({code,id,detail}),warn=(code,id,detail)=>warnings.push({code,id,detail});
 const vocab=new Map(t('vocabulary_items').map(v=>[v.id,v])),grammar=new Map(t('grammar_points').map(v=>[v.id,v])),expressions=new Map(t('sentence_expressions').map(v=>[v.id,v]));
 const norm=s=>s.toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！]+/g,'');
 const duplicates=(rows,key,code)=>{const seen=new Map();for(const r of rows){const k=key(r);if(seen.has(k))warn(code,r.id,seen.get(k));else seen.set(k,r.id);}};
 const group=(rows,keys)=>{const out={};for(const r of rows){const k=keys.map(k=>r[k]).join('/');out[k]=(out[k]||0)+1;}return out;};
 for(const v of vocab.values()){
 if(v.language==='en'&&!v.ipa?.trim())error('missing_ipa',v.id,v.lemma);
 if(v.language==='ja'&&(!v.reading?.trim()||/[一-龯]/u.test(v.reading)))error('missing_japanese_reading',v.id,v.lemma);
 if(!t('vocabulary_senses').some(s=>s.item_id===v.id))error('missing_sense',v.id,v.lemma);
 if(!t('vocabulary_examples').some(s=>s.item_id===v.id))warn('no_local_example',v.id,v.lemma);
 if(!t('sentence_vocabulary_links').some(s=>s.item_id===v.id))warn('orphan_vocabulary',v.id,'无反向句子；词条内搭配仍可用，非全量知识图谱。');
 }
 duplicates(t('vocabulary_items'),v=>v.language+'|'+norm(v.lemma)+'|'+v.part_of_speech,'duplicate_lexical_head');
 duplicates(t('vocabulary_senses'),s=>s.item_id+'|'+norm(s.meaning_zh),'duplicate_sense');
 duplicates(t('sentence_expressions'),s=>s.language+'|'+norm(s.text),'duplicate_expression');
 function reading(row,language){if(language!=='ja')return;let segments;try{segments=JSON.parse(row.readings_json);}catch{error('invalid_reading_json',row.id);return;}
 if(segments.map(s=>s.text).join('')!==row.text)error('furigana_reconstruction',row.id,row.text);
 for(const s of segments)if(/[一-龯々]/u.test(s.text)&&(!s.reading||/[一-龯々]/u.test(s.reading)))error('unread_kanji',row.id,s.text);
 }
 for(const e of expressions.values()){
 reading(e,e.language);if(e.language==='en'&&!e.ipa)warn('optional_sentence_ipa',e.id,'句子IPA可选；词汇IPA必需。');
 if(/〜|\.\.\./.test(e.text))error('unfilled_pattern',e.id,e.text);
 if(!t('sentence_vocabulary_links').some(l=>l.expression_id===e.id))error('missing_key_vocabulary_links',e.id,e.text);
 if(!t('sentence_grammar_links').some(l=>l.expression_id===e.id))error('missing_grammar_links',e.id,e.text);
 if(!e.difficulty_note_zh)error('missing_difficulty_rationale',e.id);
 if(e.difficulty_note_zh.includes('初审判断'))error('provisional_difficulty',e.id,'最终发布需要逐例的独立难度判断。');
 }
 for(const x of t('vocabulary_examples'))reading(x,vocab.get(x.item_id)?.language);
 for(const x of t('grammar_examples'))reading(x,x.language);
 for(const x of t('dialogue_turns'))reading(x,expressions.get(x.expression_id)?.language);
 for(const g of grammar.values()){
 if(!t('grammar_examples').some(e=>e.grammar_id===g.id))error('missing_grammar_example',g.id);
 if(!t('sentence_grammar_links').some(e=>e.grammar_id===g.id))warn('orphan_grammar',g.id,g.title_zh);
 }
 for(const domain of ['vocabulary','grammar'])for(const l of t('sentence_'+domain+'_links')){
 const e=expressions.get(l.expression_id),target=(domain==='vocabulary'?vocab:grammar).get(l.item_id||l.grammar_id);
 if(!e||!target){error('invalid_target',l.id);continue;}
 if(l.language!==e.language||l.language!==target.language)error('cross_language_link',l.id);
 const surface=l.turn_id?t('dialogue_turns').find(x=>x.id===l.turn_id&&x.expression_id===e.id)?.text:e.text;
 if(!surface||surface.split(l.displayed_form).length-1<l.occurrence)error('invalid_span',l.id,l.displayed_form);
 if(domain==='vocabulary'&&l.sense_id&&!t('vocabulary_senses').some(s=>s.id===l.sense_id&&s.item_id===l.item_id))error('sense_owner',l.id);
 if(domain==='vocabulary'&&l.language==='ja'&&/^[一-龯]$/.test(l.displayed_form))warn('suspicious_short_japanese_link',l.id,l.displayed_form+' in '+e.text);
 if(domain==='vocabulary'&&target.part_of_speech==='noun'&&target.lemma==='plan'&&/\bplan to\b/.test(e.text))warn('suspicious_pos_mapping',l.id,e.text);
 }
 for(const a of t('content_alignments')){
 const owner=vocab.get(a.vocabulary_id)||grammar.get(a.grammar_id)||expressions.get(a.expression_id);
 if(!owner||a.language!==owner.language||a.language!==(a.framework_id==='IELTS'?'en':'ja'))error('academic_owner',a.id);
 if(!t('alignment_targets').some(t=>t.framework_id===a.framework_id&&t.target===a.target))error('academic_target',a.id);
 if(a.source_type==='model_editorial'&&a.status!=='draft')error('unverified_model_alignment',a.id);
 if(!a.basis_zh||!a.source_title||!a.editorial_note_zh)error('academic_provenance',a.id);
 }
 for(const d of t('editorial_decisions')){if(d.status!=='resolved')error('unresolved_editorial',d.concept_id);if(createHash('sha256').update(d.source_json).digest('hex')!==d.source_sha256)error('source_hash',d.concept_id);for(const lang of ['en','ja'])if(!t('legacy_crosswalk').some(x=>x.concept_id===d.concept_id&&x.language===lang))error('unmapped_language',d.concept_id,lang);}
 for(const d of t('editorial_decisions')){
 const c=JSON.parse(d.source_json).concept,links=t('legacy_crosswalk').filter(l=>l.concept_id===d.concept_id);
 const expected=c.concept_type==='dialogue'?'dialogue':c.concept_type==='scenario_response'||[17,29,41,53,62,65,77,89,113,125,137,149,158,161,170,173].includes(c.id)?'scenario':null;
 if(expected)for(const l of links.filter(l=>l.expression_id)){const e=expressions.get(l.expression_id),u=t('sentence_units').find(u=>u.id===e?.unit_id);if(u?.unit_type!==expected)error('suspicious_migration_type',c.id,expected);}
 if(c.concept_type==='pattern')for(const lang of ['en','ja'])if(!links.some(l=>l.language===lang&&l.grammar_id))error('unmapped_pattern_grammar',c.id,lang);
 }
 if(t('editorial_decisions').length!==183)error('legacy_count',null,t('editorial_decisions').length);
 const vocabularyCounts=group(t('vocabulary_items'),['language','stage']),grammarCounts=group(t('grammar_points'),['language','level']),difficultyCounts=group(t('sentence_expressions'),['language','overall_difficulty']);
 for(const lang of ['en','ja'])for(let level=1;level<=6;level++){
 if((vocabularyCounts[lang+'/'+level]||0)<10)error('uneven_vocabulary_coverage',lang+'/'+level);
 if((grammarCounts[lang+'/'+level]||0)<4)error('uneven_grammar_coverage',lang+'/'+level);
 if(!(difficultyCounts[lang+'/'+level]>0))error('missing_sentence_level',lang+'/'+level);
 }
 return {passed:errors.length===0,review:'Model-assisted editorial QA; not independent professional linguistic certification.',counts:{legacy:t('editorial_decisions').length,previouslyFlagged:t('editorial_decisions').filter(x=>x.prior_review_flag).length,unresolved:t('editorial_decisions').filter(x=>x.status!=='resolved').length,vocabulary:vocabularyCounts,grammar:grammarCounts,sentencesByTopic:group(t('sentence_units'),['topic_id']),sentencesByType:group(t('sentence_units'),['unit_type']),difficulty:difficultyCounts,independentDifficulty:group(t('sentence_expressions'),['language','vocabulary_difficulty','grammar_difficulty','overall_difficulty']),alignments:group(t('content_alignments'),['framework_id','target','status']),vocabularyLinks:t('sentence_vocabulary_links').length,grammarLinks:t('sentence_grammar_links').length,crosswalk:t('legacy_crosswalk').length,publication:group([...t('vocabulary_items'),...t('grammar_points'),...t('sentence_units'),...t('sentence_expressions')],['publication_state'])},errors,warnings,warningCounts:group(warnings,['code'])};
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/audit-35c.js')){
 const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');for(const f of fs.readdirSync('migrations-35c').sort())db.exec(fs.readFileSync('migrations-35c/'+f,'utf8'));
 assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),[]);
 const data=Object.fromEntries(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'v2_%'").all().map(({name})=>[name,db.prepare('SELECT * FROM '+name).all()]));
 const report=audit(data);fs.writeFileSync('docs/phase35c/audit-local.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,counts:report.counts,errors:report.errors,warningCounts:report.warningCounts},null,2));if(!report.passed)process.exitCode=1;
}
