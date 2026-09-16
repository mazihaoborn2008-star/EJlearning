import crypto from 'node:crypto';
import fs from 'node:fs';
import {isCurrentGrammarId,isPracticeEligibleGrammarId} from '../src/content-quality-03.js';
import {loadStage5Expansion} from './stage5-expansion-02.js';

export const bundleId='curriculum-stage6-expansion-03-v1';
export const schemaVersion='CURRICULUM-STAGE6-EXPANSION-03';
export const datasetMarker='2026-09-stage6-expansion-03-v1';
export const publishedAt='2026-09-16T00:00:00Z';
export const authoritativeHashes=Object.freeze({
 matrix:'754cc5ff8cdcfdb471a53088e36a9c65c8bf8c39a1a767738602c1e724e61e29',
 payload:'04a4afa47c51787dd546e49d2d54734fbc1c591e8ad08490a9916f4743cc78de',
 editorial_approval:'bb9cc782b38122cc1b783a95c9b31ece43f11bf9e0fa720813f8357767697710'
});

export const slotLessonIds=Object.freeze({
 EN1:'en-s6-l1',EN2:'en-s6-l2',EN3:'en-s6-03-synthesis',EN4:'en-s6-04-accountability',EN5:'en-s6-l3',EN6:'en-s6-l4',
 JA1:'ja-s6-l1',JA2:'ja-s6-l2',JA3:'ja-s6-03-reporting',JA4:'ja-s6-04-accountability',JA5:'ja-s6-l4',JA6:'ja-s6-l3'
});
export const newLessonIds=Object.freeze(['EN3','EN4','JA3','JA4'].map(slot=>slotLessonIds[slot]));
export const finalStage6Ids=Object.freeze(Object.values(slotLessonIds));
export const prerequisiteChains=Object.freeze({
 en:Object.freeze(['en-s5-08-reporting',...['EN1','EN2','EN3','EN4','EN5','EN6'].map(slot=>slotLessonIds[slot])]),
 ja:Object.freeze(['ja-s5-08-benefit',...['JA1','JA2','JA3','JA4','JA5','JA6'].map(slot=>slotLessonIds[slot])])
});
export const excludedStage6Ids=Object.freeze(['en-would-like','looking-forward-en','ja-c-699']);
export const expectedDensity=Object.freeze({
 EN1:[8,3,4,11,33],EN2:[8,3,4,11,33],EN3:[8,3,4,11,31],EN4:[8,3,4,11,32],EN5:[8,2,4,10,29],EN6:[8,3,3,11,33],
 JA1:[8,3,4,11,33],JA2:[7,3,4,10,30],JA3:[8,3,4,11,33],JA4:[8,3,4,11,33],JA5:[8,3,4,11,33],JA6:[8,3,4,11,33]
});

const topicBySlot=Object.freeze({EN1:'school',EN2:'chat',EN3:'school',EN4:'plans',EN5:'social',EN6:'plans',JA1:'school',JA2:'chat',JA3:'school',JA4:'plans',JA5:'social',JA6:'plans'});
const matrixFields=['slot_id','canonical_id','content_type','instructional_role','prior_review_source','final_disposition','editorial_dependency','semantic_register_rationale'];
const key=row=>`${row.lesson_id}\0${row.content_type}\0${row.content_id}`;
const authorityKey=row=>`${row.slot_id}\0${row.content_type}\0${row.canonical_id}`;
const sha256=value=>crypto.createHash('sha256').update(value).digest('hex');

function assertAuthorization(value,path='payload'){
 if(Array.isArray(value)){value.forEach((entry,index)=>assertAuthorization(entry,`${path}[${index}]`));return;}
 if(!value||typeof value!=='object')return;
 if(Object.hasOwn(value,'implementation_authorized')&&value.implementation_authorized!==true)throw Error(`${path}.implementation_authorized is not true`);
 if(Object.hasOwn(value,'human_approval_status')&&value.human_approval_status!=='HUMAN FINAL APPROVED')throw Error(`${path}.human_approval_status is not HUMAN FINAL APPROVED`);
 for(const [name,entry] of Object.entries(value))assertAuthorization(entry,`${path}.${name}`);
}

export function parseApprovalMatrix(markdown){
 const start=markdown.indexOf('## 9. Final English relationship matrix'),end=markdown.indexOf('## 11. Final role totals');
 if(start<0||end<0||end<=start)throw Error('Stage 6 final relationship matrix section not found');
 let language='en';const relationships=[];
 for(const line of markdown.slice(start,end).split(/\r?\n/)){
  if(line.startsWith('## 10.'))language='ja';
  const cells=line.split('|').slice(1,-1).map(value=>value.trim());
  if(cells.length!==8||!/^\d$/.test(cells[0])||!/^`[^`]+`$/.test(cells[1]))continue;
  relationships.push({slot_id:`${language.toUpperCase()}${cells[0]}`,canonical_id:cells[1].slice(1,-1),content_type:cells[2].toLowerCase(),instructional_role:cells[3],prior_review_source:cells[4]==='—'?null:cells[4].replaceAll('`',''),final_disposition:cells[5],editorial_dependency:cells[6],semantic_register_rationale:cells[7]});
 }
 if(relationships.length!==177)throw Error(`03A relationship cardinality changed: ${relationships.length}`);
 if(new Set(relationships.map(authorityKey)).size!==177)throw Error('03A contains a duplicate relationship');
 return {relationships};
}

function validatePayload(payload,matrix,approvalText){
 if(payload.metadata?.authority!=='HUMAN FINAL APPROVED EDITORIAL PAYLOAD; AUTHORIZED INPUT FOR A SEPARATE STAGE 6 IMPLEMENTATION TASK')throw Error('03B payload authority is not HUMAN FINAL APPROVED');
 if(payload.metadata?.implementation_authorized!==true)throw Error('03B payload implementation is not authorized');
 if(payload.metadata?.approval_matrix_sha256!==authoritativeHashes.matrix)throw Error('03B metadata disagrees with the frozen 03A hash');
 if(!approvalText.includes('**Human approval state:** **HUMAN FINAL APPROVED**')||!approvalText.includes('`implementation_authorized: true`'))throw Error('03B approval report is not HUMAN FINAL APPROVED and authorized');
 assertAuthorization(payload);
 const expected={vocabulary_examples:40,grammar_examples:60,expression_contexts:9,new_dialogues:4,reuse_prompt_layers:5,short_scenarios:3,titles_objectives:12,relationship_authority:177};
 for(const [name,count] of Object.entries(expected))if(!Array.isArray(payload[name])||payload[name].length!==count)throw Error(`03B ${name} cardinality changed`);
 if(payload.editorial_readiness?.human_final_approval_state!=='HUMAN FINAL APPROVED'||payload.editorial_readiness?.implementation_authorized!==true)throw Error('03B editorial readiness gate failed');
 const authority=new Map(payload.relationship_authority.map(row=>[authorityKey(row),row])),matrixRows=new Map(matrix.relationships.map(row=>[authorityKey(row),row]));
 if(authority.size!==177||matrixRows.size!==177)throw Error('03A/03B relationship authority is not unique');
 for(const [relationship,row] of authority){const approved=matrixRows.get(relationship);if(!approved||matrixFields.some(field=>row[field]!==approved[field]))throw Error(`03A and 03B relationship authority disagree: ${relationship}`);}
 for(const relationship of matrixRows.keys())if(!authority.has(relationship))throw Error(`03B omits 03A relationship: ${relationship}`);
 const count=(field,value,language=null)=>payload.relationship_authority.filter(row=>row[field]===value&&(!language||row.language===language)).length;
 if(count('language','en')!==88||count('language','ja')!==89||count('instructional_role','NEW')!==66||count('instructional_role','REVIEW')!==61||count('instructional_role','SUPPORT')!==50)throw Error('03B relationship totals changed');
 if(count('instructional_role','NEW','en')!==32||count('instructional_role','REVIEW','en')!==30||count('instructional_role','SUPPORT','en')!==26||count('instructional_role','NEW','ja')!==34||count('instructional_role','REVIEW','ja')!==31||count('instructional_role','SUPPORT','ja')!==24)throw Error('03B language role totals changed');
 for(const id of excludedStage6Ids)if(payload.relationship_authority.some(row=>row.canonical_id===id))throw Error(`Excluded Stage 6 relationship reappeared: ${id}`);
 const safe=payload.grammar_examples.filter(row=>row.cc_safety==='CC SAFE'),unsafe=payload.grammar_examples.filter(row=>row.cc_safety==='NOT FOR CC');
 if(safe.length!==38||unsafe.length!==22)throw Error('03B controlled-completion totals changed');
 for(const row of payload.grammar_examples){
  if(row.cc_safety==='CC SAFE'){
   if(!row.cc_answer||!Number.isInteger(row.cc_occurrence)||row.cc_occurrence<1||!Number.isInteger(row.cc_answer_start)||row.cc_answer_start<0||row.text.slice(row.cc_answer_start,row.cc_answer_start+row.cc_answer.length)!==row.cc_answer)throw Error(`Invalid sentence-local CC authority: ${row.example_id}`);
   const starts=[];for(let at=row.text.indexOf(row.cc_answer);at>=0;at=row.text.indexOf(row.cc_answer,at+row.cc_answer.length))starts.push(at);
   if(starts[row.cc_occurrence-1]!==row.cc_answer_start)throw Error(`CC occurrence/offset mismatch: ${row.example_id}`);
  }else if(row.cc_safety==='NOT FOR CC'){
   if(row.cc_answer!==null||row.cc_occurrence!==null||row.cc_answer_start!==null)throw Error(`NOT FOR CC contains authority: ${row.example_id}`);
  }else throw Error(`Invalid CC classification: ${row.example_id}`);
 }
 const boundary=payload.grammar_examples.filter(row=>row.canonical_id==='en-if-request');if(boundary.length!==3||boundary.some(row=>row.cc_safety!=='NOT FOR CC'))throw Error('en-if-request Stage 6 boundary changed');
 for(const dialogue of payload.new_dialogues)if(dialogue.turns.length!==6)throw Error(`${dialogue.slot_id} dialogue is not six turns`);
 const ja4=payload.new_dialogues.find(row=>row.slot_id==='JA4');if(!ja4||ja4.turns[4].text.split('\n').length!==2||ja4.turns.length!==6)throw Error('JA4 turn 5 structure changed');
 const relationshipBySlot=new Map(Object.keys(slotLessonIds).map(slot=>[slot,new Set(payload.relationship_authority.filter(row=>row.slot_id===slot).map(row=>row.canonical_id))]));
 for(const dialogue of payload.new_dialogues)for(const [index,turn] of dialogue.turns.entries()){
  const familiar=new Set(turn.non_authoritative_familiar_ids||[]);
  for(const id of turn.demonstrated_canonical_ids||[])if(!familiar.has(id)&&!relationshipBySlot.get(dialogue.slot_id).has(id))throw Error(`${dialogue.slot_id} turn ${index+1} demonstrates out-of-slot authority ${id}`);
  for(const id of familiar)if(dialogue.slot_id!=='JA4'||index!==2||id!=='ja-c-827'||relationshipBySlot.get('JA4').has(id))throw Error('Invalid non-authoritative dialogue support exception');
 }
 return payload.relationship_authority;
}

function publicAssets(payload){
 const dialogues=payload.new_dialogues.map(row=>({asset_id:`${datasetMarker}-dialogue-${row.slot_id.toLowerCase()}`,lesson_id:slotLessonIds[row.slot_id],kind:'dialogue',language:row.slot_id.startsWith('EN')?'en':'ja',outcome:row.outcome,register_note:row.register_note,turns:row.turns.map((turn,index)=>({turn_number:index+1,speaker:turn.speaker,text:turn.text,translation_zh:turn.translation_zh}))}));
 const prompts=payload.reuse_prompt_layers.map(row=>({asset_id:`${datasetMarker}-prompt-${row.slot_id.toLowerCase()}`,lesson_id:slotLessonIds[row.slot_id],kind:'reuse_prompt',source_expression_ids:row.source_expression_ids,higher_stage_demand:row.higher_stage_demand,production_prompt:row.production_prompt,contrast_checks:row.contrast_checks}));
 const scenarios=payload.short_scenarios.map(row=>({asset_id:`${datasetMarker}-scenario-${row.slot_id.toLowerCase()}`,lesson_id:slotLessonIds[row.slot_id],kind:'scenario',scenario:row.scenario,learner_task:row.learner_task,success_criteria:row.success_criteria}));
 return [...dialogues,...prompts,...scenarios];
}

export function buildStage6Bundle(base,payload,matrix,approvalText){
 for(const id of newLessonIds)if(base.u.some(unit=>unit[0]===id))throw Error(`Production lesson ID collision: ${id}`);
 const authority=validatePayload(payload,matrix,approvalText),titles=new Map(payload.titles_objectives.map(row=>[row.slot_id,row])),slotByLesson=new Map(Object.entries(slotLessonIds).map(([slot,id])=>[id,slot])),baseItems=new Map(base.i.map(item=>[key({lesson_id:item[0],content_type:item[1],content_id:item[2]}),item]));
 const units=base.u.map(unit=>{const slot=slotByLesson.get(unit[0]);if(!slot)return [...unit];const title=titles.get(slot);return [unit[0],unit[1],6,topicBySlot[slot],title.title_zh,title.objective_zh,Number(slot.slice(2)),'published',15,title.title_target];});
 for(const id of newLessonIds){const slot=slotByLesson.get(id),title=titles.get(slot);units.push([id,title.language||slot.slice(0,2).toLowerCase(),6,topicBySlot[slot],title.title_zh,title.objective_zh,Number(slot.slice(2)),'published',15,title.title_target]);}
 const oldStage6Ids=new Set(base.u.filter(unit=>unit[2]===6).map(unit=>unit[0])),items=base.i.filter(item=>!oldStage6Ids.has(item[0])).map(item=>[...item]);
 for(const slot of Object.keys(slotLessonIds)){
  const sequences={vocabulary:0,grammar:0,expression:0},lessonId=slotLessonIds[slot];
  for(const row of authority.filter(entry=>entry.slot_id===slot)){
   const old=baseItems.get(key({lesson_id:lessonId,content_type:row.content_type,content_id:row.canonical_id})),sequence=++sequences[row.content_type];
   items.push([lessonId,row.content_type,row.canonical_id,old?.[3]||'support',sequence,old?.[5]||0,row.instructional_role]);
  }
 }
 const replaced=new Set(finalStage6Ids),prerequisites=base.p.filter(edge=>!replaced.has(edge[0])).map(edge=>[...edge]);
 for(const chain of Object.values(prerequisiteChains))for(let index=1;index<chain.length;index++)prerequisites.push([chain[index],chain[index-1]]);
 const priorByLanguage=Object.fromEntries(['en','ja'].map(language=>[language,base.u.filter(unit=>unit[1]===language&&unit[7]==='published').map(unit=>unit[0])]));
 const bundle={...base,v:schemaVersion,u:units,p:prerequisites,i:items,a:[...(base.a||[]),...publicAssets(payload)],g:{policy:'prior-curriculum-completion-v1',previous_bundle_id:'curriculum-stage5-expansion-02-v1',previous_lesson_ids_by_language:priorByLanguage}};
 const finalItems=items.filter(item=>finalStage6Ids.includes(item[0])),totals=(index)=>Object.fromEntries([...new Set(finalItems.map(item=>item[index]))].sort().map(value=>[value,finalItems.filter(item=>item[index]===value).length]));
 if(units.length!==76||prerequisites.length!==74||items.length!==1130||finalItems.length!==177)throw Error(`Stage 6 bundle cardinality gate failed: ${units.length}/${prerequisites.length}/${items.length}/${finalItems.length}`);
 if(JSON.stringify(totals(1))!==JSON.stringify({expression:47,grammar:35,vocabulary:95})||JSON.stringify(totals(6))!==JSON.stringify({NEW:66,REVIEW:61,SUPPORT:50}))throw Error('Stage 6 relationship totals changed');
 if(new Set(finalItems.map(item=>`${item[0]}\0${item[1]}\0${item[2]}`)).size!==177)throw Error('Duplicate Stage 6 lesson/content pair');
 for(const id of excludedStage6Ids)if(finalItems.some(item=>item[2]===id))throw Error(`Excluded Stage 6 relationship entered bundle: ${id}`);
 for(const [slot,density] of Object.entries(expectedDensity)){
  const lessonItems=finalItems.filter(item=>item[0]===slotLessonIds[slot]),actual=['vocabulary','grammar','expression'].map(type=>lessonItems.filter(item=>item[1]===type).length),assessable=lessonItems.filter(item=>item[1]!=='expression'&&(item[1]!=='grammar'||isPracticeEligibleGrammarId(item[2]))).length;
  if(JSON.stringify([...actual,assessable])!==JSON.stringify(density.slice(0,4)))throw Error(`Invalid density for ${slot}: ${actual}/${assessable}`);
 }
 const oldRaw=base.i.filter(item=>oldStage6Ids.has(item[0])),oldActive=oldRaw.filter(item=>item[1]!=='grammar'||isCurrentGrammarId(item[2])),runtime=items.filter(item=>item[1]!=='grammar'||isCurrentGrammarId(item[2]));
 if(oldRaw.length!==123||oldActive.length!==122||runtime.length!==1126||items.length-runtime.length!==4)throw Error(`Raw/runtime derivation changed: old ${oldRaw.length}/${oldActive.length}; new ${items.length}/${runtime.length}`);
 if(finalItems.some(item=>item[1]==='grammar'&&!isCurrentGrammarId(item[2])))throw Error('Stage 6 contains archived grammar authority');
 const unitMap=new Map(units.map(unit=>[unit[0],unit])),parent=new Map(prerequisites.map(edge=>edge));if(parent.size!==74)throw Error('A lesson has multiple or duplicate prerequisites');
 for(const language of ['en','ja'])for(const unit of units.filter(row=>row[1]===language)){const seen=new Set();let current=unit[0];while(parent.has(current)){if(seen.has(current))throw Error(`Prerequisite cycle at ${current}`);seen.add(current);const next=parent.get(current);if(!unitMap.has(next)||unitMap.get(next)[1]!==language)throw Error(`Invalid prerequisite ${current} <- ${next}`);current=next;}if(current!==`${language}-s1-l1`)throw Error(`Unreachable lesson ${unit[0]}`);}
 const before=new Set(oldRaw.map(item=>`${item[0]}\0${item[1]}\0${item[2]}`)),after=new Set(finalItems.map(item=>`${item[0]}\0${item[1]}\0${item[2]}`)),retained=[...after].filter(item=>before.has(item)),added=[...after].filter(item=>!before.has(item)),removed=[...before].filter(item=>!after.has(item));
 if(added.length-removed.length!==54||finalItems.length-oldRaw.length!==54)throw Error('Raw Stage 6 relationship delta changed');
 const activeBefore=new Set(oldActive.map(item=>`${item[0]}\0${item[1]}\0${item[2]}`)),activeRetained=[...after].filter(item=>activeBefore.has(item)),activeAdded=[...after].filter(item=>!activeBefore.has(item)),activeRemoved=[...activeBefore].filter(item=>!after.has(item));
 if(activeAdded.length-activeRemoved.length!==55)throw Error('Runtime-active Stage 6 relationship delta changed');
 return {bundle,authority,delta:{raw:{retained:retained.length,added:added.length,removed:removed.length,net:added.length-removed.length},runtime:{retained:activeRetained.length,added:activeAdded.length,removed:activeRemoved.length,net:activeAdded.length-activeRemoved.length}},counts:{raw:items.length,runtime_active:runtime.length,old_stage6_raw:oldRaw.length,old_stage6_active:oldActive.length},typeTotals:totals(1),roleTotals:totals(6)};
}

export function loadStage6Expansion(root=process.cwd()){
 const paths={matrix:`${root}/docs/STAGE-6-EXPANSION-03A-APPROVAL-MATRIX.md`,payload:`${root}/docs/STAGE-6-EDITORIAL-03B-PAYLOAD.json`,editorial_approval:`${root}/docs/STAGE-6-EDITORIAL-APPROVAL-03B.md`},texts=Object.fromEntries(Object.entries(paths).map(([name,path])=>[name,fs.readFileSync(path,'utf8')]));
 for(const [name,expected] of Object.entries(authoritativeHashes))if(sha256(texts[name])!==expected)throw Error(`Approved Stage 6 ${name} SHA-256 changed`);
 const payload=JSON.parse(texts.payload),matrix=parseApprovalMatrix(texts.matrix),base=loadStage5Expansion(root).bundle,built=buildStage6Bundle(base,payload,matrix,texts.editorial_approval);
 return {...built,base,payload,matrix,hashes:Object.fromEntries(Object.entries(texts).map(([name,text])=>[name,sha256(text)]))};
}
