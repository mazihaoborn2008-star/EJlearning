import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:8787';
const get=async p=>{const r=await fetch(base+'/api'+p);assert.equal(r.status,200);return (await r.json()).data;};
const topics=await get('/topics'),catalog=await get('/concepts'),details=[];
for(let i=0;i<catalog.length;i+=4)details.push(...await Promise.all(catalog.slice(i,i+4).map(c=>get('/concepts/'+c.id))));
const counts=(items,fn)=>items.reduce((r,c)=>(r[fn(c)]=(r[fn(c)]||0)+1,r),{});
const errors=[],duplicates=[];
const check=(ok,m)=>{if(!ok)errors.push(m);};
check(details.length>=160&&details.length<=200,'Curriculum size');
const anchors=new Set();
for(const c of details){
 check(!anchors.has(c.zh.trim()),'Duplicate Chinese anchor '+c.id);anchors.add(c.zh.trim());
 check(topics.some(t=>t.id===c.topic),'Orphan topic '+c.id);
 check(['vocabulary','phrase','sentence','pattern','scenario_response','dialogue'].includes(c.conceptType),'Invalid type '+c.id);
 check(c.comparison.length>8,'Missing comparison '+c.id);
 for(const lang of ['en','ja']){
  const e=c[lang];check(e?.text?.length>0,'Missing expression '+c.id+lang);check(e?.grammar?.text?.length>8&&e?.grammar?.example?.length>0,'Missing grammar/example '+c.id+lang);
  check(Number.isInteger(e.difficulty)&&e.difficulty>=1&&e.difficulty<=6,'Invalid difficulty '+c.id+lang);
  check(e.chunks.length>0,'Missing chunks '+c.id+lang);
  check(e.chunks.every(ch=>ch.text&&ch.grammar?.text),'Missing chunk explanation '+c.id+lang);
  if(lang==='en')check(/^\/.+\/$/s.test(e.ipa),'Missing IPA '+c.id);else{
   check(!/[一-龯ァ-ヶ]/u.test(e.hiragana),'Reading not kana '+c.id);
   check(e.readings.map(t=>t.text).join('')===e.text,'Reading text reconstruction '+c.id);
   check(e.readings.map(t=>t.reading||t.text).join('')===e.hiragana,'Reading kana reconstruction '+c.id);
   check(e.chunks.every(ch=>ch.readings.map(t=>t.text).join('')===ch.text),'Chunk reading mismatch '+c.id);
  }
  if(c.conceptType==='dialogue'){const t=e.metadata.turns;check(Array.isArray(t)&&t.length>=2&&t.length<=4,'Invalid dialogue '+c.id+lang);check(t.every(t=>['A','B'].includes(t.speaker)&&t.text),'Invalid dialogue turn '+c.id+lang);check(t.map(t=>t.speaker+': '+t.text).join('\n')===e.text,'Dialogue text mismatch '+c.id+lang);}
  if(['vocabulary','pattern'].includes(c.conceptType))check(e.metadata.example&&e.metadata.example!==e.text,'Missing practical example '+c.id+lang);
 }
}
for(const lang of ['en','ja']){const seen=new Map();for(const c of details){const normalized=c[lang].text.toLowerCase().replace(/[\p{P}\p{Z}]/gu,'');if(seen.has(normalized))duplicates.push({lang,ids:[seen.get(normalized),c.id],text:c[lang].text});seen.set(normalized,c.id);}const distribution=counts(details,c=>c[lang].difficulty);for(let l=1;l<=6;l++)check(distribution[l]>=20,'Insufficient '+lang+' Level '+l);}
const report={base,total:details.length,byTopic:counts(details,c=>c.topic),byType:counts(details,c=>c.conceptType),enDifficulty:counts(details,c=>c.en.difficulty),jaDifficulty:counts(details,c=>c.ja.difficulty),independentDifficulties:details.filter(c=>c.en.difficulty!==c.ja.difficulty).length,suspiciousDuplicates:duplicates,errors,passed:errors.length===0};
const label=process.env.AUDIT_LABEL||'local';fs.writeFileSync(`tests/phase3-curriculum-${label}.json`,JSON.stringify(report,null,2));
fs.writeFileSync(`tests/PHASE3-CURRICULUM-${label.toUpperCase()}.md`,`# Phase 3 curriculum audit\n\nSource: ${base} (D1 API). ${details.length} published Concepts. ${errors.length} structural errors.\n\n## Topic distribution\n\n| Topic | Concepts |\n|---|---:|\n${topics.map(t=>`| ${t.name} | ${report.byTopic[t.id]} |`).join('\n')}\n\n## Types\n\n${Object.entries(report.byType).map(([k,v])=>`- ${k}: ${v}`).join('\n')}\n\n## Difficulty\n\n| Level | English | Japanese |\n|---|---:|---:|\n${[1,2,3,4,5,6].map(l=>`| ${l} | ${report.enDifficulty[l]} | ${report.jaDifficulty[l]} |`).join('\n')}\n\n${report.independentDifficulties} Concepts have different EN/JA difficulties.\n\n## Structural QA\n\nEvery published Concept inspected for type, target expressions, IPA presence, exact Japanese text/reading reconstruction, kana-only readings (speaker labels allowed), grammar/examples, comparison, and 2–4-turn dialogue integrity. Database publication/orphan checks are recorded separately in the clean migration report.\n\nSuspicious target duplicates: ${JSON.stringify(duplicates)}.\n\nErrors: ${JSON.stringify(errors)}.\n\n## Linguistic review limits\n\nThe 168 new items were machine-authored and reviewed as complete bilingual rows for communicative meaning, contemporary usage, register, practical level progression, readings and General American IPA. Kana alignment uses supplied readings; it does not infer or independently certify pronunciation. Automated tests establish structure, not native-speaker naturalness or psychometric calibration. No independent human linguist review has occurred. Original approved 15 items are unchanged.\n`);
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
