import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';

const root=path.resolve(import.meta.dirname,'..');
const dbFile=dir=>path.join(dir,fs.readdirSync(dir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite'));
const baseDir=path.join(root,'.wrangler/phase35e1c-release-final-2/v3/d1/miniflare-D1DatabaseObject');
const finalDir=path.join(root,'.wrangler/phase35e2-release-final-2/v3/d1/miniflare-D1DatabaseObject');
const before=new DatabaseSync(dbFile(baseDir),{readOnly:true}),after=new DatabaseSync(dbFile(finalDir),{readOnly:true});
const all=(db,q,...args)=>db.prepare(q).all(...args),one=(db,q,...args)=>db.prepare(q).get(...args);
const errors=[],warnings=[];
const check=(ok,code,detail)=>{if(!ok)errors.push({code,detail});};
const stable=(db,table)=>JSON.stringify(all(db,`SELECT * FROM ${table} ORDER BY 1`));

const en=one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE language='en' AND publication_state='published'").n;
const ja=one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published'").n;
check(en===10000,'en_total',{en});check(ja>=8000&&ja<=8500,'ja_total',{ja});
check(one(after,"SELECT count(*) n FROM v2_vocabulary_items v WHERE publication_state='published' AND NOT EXISTS(SELECT 1 FROM v2_vocabulary_senses s WHERE s.item_id=v.id AND length(trim(s.meaning_zh))>0)").n===0,'missing_meaning');
check(one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE publication_state='published' AND length(trim(part_of_speech))=0").n===0,'missing_pos');
check(one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published' AND length(trim(coalesce(reading,'')))=0").n===0,'missing_ja_reading');
check(one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE id LIKE '35e2-en-%' AND (lemma<>lower(lemma) OR length(lemma)<2)").n===0,'malformed_en_import');
check(one(after,"SELECT count(*) n FROM v2_vocabulary_examples WHERE id LIKE '35e2-%'").n===0,'bulk_examples_created');
check(one(after,"SELECT count(*) n FROM (SELECT language,lower(trim(lemma)) lemma,part_of_speech,count(*) c FROM v2_vocabulary_items GROUP BY language,lower(trim(lemma)),part_of_speech HAVING c>1)").n===0,'canonical_pos_duplicate');

for(const table of ['v2_vocabulary_items','v2_vocabulary_senses','v2_vocabulary_examples']){
 const ids=table==='v2_vocabulary_items'?'id NOT LIKE \'35e2-%\'':table==='v2_vocabulary_senses'?"item_id NOT LIKE '35e2-%'":"item_id NOT LIKE '35e2-%'";
 const beforeRows=JSON.stringify(all(before,`SELECT * FROM ${table} ORDER BY 1`)),afterRows=JSON.stringify(all(after,`SELECT * FROM ${table} WHERE ${ids} ORDER BY 1`));
 check(beforeRows===afterRows,'curated_changed',{table});
}
check(one(before,'SELECT count(*) n FROM v2_vocabulary_examples').n===one(after,'SELECT count(*) n FROM v2_vocabulary_examples').n,'curated_example_count');

const ielts={};
for(const [target,size] of [['5.0',3000],['5.5',4000],['6.0',5500],['6.5',7000],['7.0+',10000]]){
 const n=one(after,"SELECT count(*) n FROM v2_vocabulary_course_ranks r JOIN v2_vocabulary_items v ON v.id=r.item_id WHERE r.framework_id='IELTS' AND r.course_rank<=? AND v.publication_state='published'",size).n;
 ielts[target]=n;check(n===size,'ielts_pool',{target,n,size});
}
const jlpt={};for(const target of ['N5','N4','N3','N2','N1'])jlpt[target]=one(after,"SELECT count(*) n FROM v2_vocabulary_course_ranks r JOIN v2_vocabulary_items v ON v.id=r.item_id WHERE r.framework_id='JLPT' AND r.estimated_target=? AND v.publication_state='published'",target).n;

const alphabet={};for(const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')alphabet[letter]=one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE language='en' AND publication_state='published' AND upper(substr(trim(lemma),1,1))=?",letter).n;
check(Object.values(alphabet).every(Boolean),'empty_alphabet_group',{alphabet});
const gojuonChars={'あ行':'あいうえおぁぃぅぇぉ','か行':'かきくけこがぎぐげご','さ行':'さしすせそざじずぜぞ','た行':'たちつてとだぢづでどっ','な行':'なにぬねの','は行':'はひふへほばびぶべぼぱぴぷぺぽ','ま行':'まみむめも','や行':'やゆよゃゅょ','ら行':'らりるれろ','わ行':'わをんゎ'};
const gojuon={};for(const [group,chars] of Object.entries(gojuonChars))gojuon[group]=one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published' AND instr(?,substr(reading,1,1))>0",chars).n;
gojuon['その他']=ja-Object.values(gojuon).reduce((a,b)=>a+b,0);check(gojuon['その他']===0,'unexpected_gojuon_other',{gojuon});

const missingIpa=one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE id LIKE '35e2-en-%' AND length(trim(coalesce(ipa,'')))=0").n;
if(missingIpa)warnings.push({code:'source_missing_ipa',count:missingIpa,note:'ECDICT rows kept because lemma/POS/meaning/frequency passed; detail omits IPA.'});
const homographs=all(after,"SELECT language,lower(trim(lemma)) lemma,count(*) n FROM v2_vocabulary_items WHERE publication_state='published' GROUP BY language,lower(trim(lemma)) HAVING n>1");
if(homographs.length)warnings.push({code:'preexisting_multi_pos_homographs',count:homographs.length,items:homographs});

const hashes=Object.fromEntries(fs.readdirSync(path.join(root,'migrations-35e2')).filter(x=>x.endsWith('.sql')).sort().map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'migrations-35e2',file))).digest('hex')]));
const sourceAudit=JSON.parse(fs.readFileSync(path.join(root,'docs/phase35e2/source-import-audit.json'),'utf8'));
const result={
 status:errors.length?'FAIL':'PASS',qa_errors:errors.length,qa_warnings:warnings.length,errors,warnings,
 counts:{en_vocabulary_total:en,ja_vocabulary_total:ja,en_imported:one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE id LIKE '35e2-en-%'").n,ja_imported:one(after,"SELECT count(*) n FROM v2_vocabulary_items WHERE id LIKE '35e2-ja-%'").n,curated_examples:one(after,'SELECT count(*) n FROM v2_vocabulary_examples').n},
 ielts,jlpt,alphabet,gojuon,
 pos:{en:all(after,"SELECT part_of_speech,count(*) n FROM v2_vocabulary_items WHERE language='en' AND publication_state='published' GROUP BY part_of_speech ORDER BY part_of_speech"),ja:all(after,"SELECT part_of_speech,count(*) n FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published' GROUP BY part_of_speech ORDER BY part_of_speech")},
 duplicate_rejected:{en:sourceAudit.english.rejected.inflected+sourceAudit.english.rejected.existing_collision+sourceAudit.english.rejected.source_duplicate,ja:sourceAudit.japanese.rejected.normalized_duplicate+sourceAudit.japanese.rejected.existing_collision},
 malformed_rejected:sourceAudit.english.rejected.malformed+sourceAudit.english.rejected.missing_meaning+sourceAudit.english.rejected.missing_pos+sourceAudit.japanese.rejected.missing_jmdict+sourceAudit.japanese.rejected.missing_reading+sourceAudit.japanese.rejected.missing_meaning+sourceAudit.japanese.rejected.missing_pos,
 curated_preserved:errors.every(x=>!x.code.startsWith('curated_')),
 samples:{en:all(after,"SELECT v.lemma,v.ipa,v.part_of_speech,s.meaning_zh,r.course_rank FROM v2_vocabulary_course_ranks r JOIN v2_vocabulary_items v ON v.id=r.item_id JOIN v2_vocabulary_senses s ON s.item_id=v.id AND s.sort_order=0 WHERE r.framework_id='IELTS' AND v.id LIKE '35e2-en-%' AND r.course_rank IN (500,1500,3000,5000,7000,9000,9999) ORDER BY r.course_rank"),ja:all(after,"SELECT v.lemma,v.reading,v.part_of_speech,s.meaning_zh,r.estimated_target,r.course_rank FROM v2_vocabulary_course_ranks r JOIN v2_vocabulary_items v ON v.id=r.item_id JOIN v2_vocabulary_senses s ON s.item_id=v.id AND s.sort_order=0 WHERE r.framework_id='JLPT' AND v.id LIKE '35e2-ja-%' AND r.course_rank IN (100,500,1000,1700,3000) ORDER BY CASE r.estimated_target WHEN 'N5' THEN 0 WHEN 'N4' THEN 1 WHEN 'N3' THEN 2 WHEN 'N2' THEN 3 ELSE 4 END,r.course_rank LIMIT 20")},
 migration_hashes:hashes
};
fs.writeFileSync(path.join(root,'docs/phase35e2/local-audit.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;
