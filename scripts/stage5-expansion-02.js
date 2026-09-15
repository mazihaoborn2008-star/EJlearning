import crypto from 'node:crypto';
import fs from 'node:fs';
import {isCurrentGrammarId,isPracticeEligibleGrammarId} from '../src/content-quality-03.js';
import {loadExpansion} from './curriculum-expansion-01.js';

export const bundleId='curriculum-stage5-expansion-02-v1';
export const schemaVersion='CURRICULUM-STAGE5-EXPANSION-02';
export const datasetMarker='2026-09-stage5-expansion-02-v1';
export const publishedAt='2026-09-15T00:00:00Z';
export const approvedPayloadSha256='89b89d86bf2e7187ec437d85cd7141ef82e782cebd306c4a42a885a7e4490818';

export const slotLessonIds=Object.freeze({
 EN1:'en-s5-l1',EN2:'en-s5-02-tradeoffs',EN3:'en-s5-03-consensus',EN4:'en-s5-l2',
 EN5:'en-s5-l3',EN6:'en-s5-06-repair',EN7:'en-s5-l4',EN8:'en-s5-08-reporting',
 JA1:'ja-s5-l1',JA2:'ja-s5-l2',JA3:'ja-s5-03-formal-role',JA4:'ja-s5-l3',
 JA5:'ja-s5-l4',JA6:'ja-s5-06-repair',JA7:'ja-s5-07-consensus',JA8:'ja-s5-08-benefit'
});
export const newLessonIds=Object.freeze(['EN2','EN3','EN6','EN8','JA3','JA6','JA7','JA8'].map(slot=>slotLessonIds[slot]));
export const finalStage5Ids=Object.freeze(Object.values(slotLessonIds));
export const prerequisiteChains=Object.freeze({
 en:Object.freeze(['en-s4-l6',...Object.entries(slotLessonIds).filter(([slot])=>slot.startsWith('EN')).map(([,id])=>id),'en-s6-l1']),
 ja:Object.freeze(['ja-s4-l6',...Object.entries(slotLessonIds).filter(([slot])=>slot.startsWith('JA')).map(([,id])=>id),'ja-s6-l1'])
});
const topicBySlot=Object.freeze({EN1:'school',EN2:'plans',EN3:'school',EN4:'travel',EN5:'help',EN6:'chat',EN7:'plans',EN8:'school',JA1:'school',JA2:'help',JA3:'travel',JA4:'travel',JA5:'feelings',JA6:'chat',JA7:'plans',JA8:'help'});
const roleCode={N:'NEW',R:'REVIEW',S:'SUPPORT'},typeCode={V:'vocabulary',G:'grammar',E:'expression'};
const key=row=>`${row.lesson_id}\0${row.content_type}\0${row.content_id}`;
const payloadKey=row=>`${row.slot_id}\0${row.content_type}\0${row.canonical_id}`;
const sha256=value=>crypto.createHash('sha256').update(value).digest('hex');
export function controlledCompletionAnswerStart(row){
 if(row.cc_safety!=='CC SAFE')return null;
 const starts=[];for(let at=row.sentence.indexOf(row.cc_answer);at>=0;at=row.sentence.indexOf(row.cc_answer,at+row.cc_answer.length))starts.push(at);
 if(starts.length===1)return starts[0];
 if(row.canonical_id==='ja-indirect-ka'&&row.cc_answer==='か'){const grammatical=row.sentence.indexOf('か、');if(grammatical>=0)return grammatical;}
 throw Error(`CC answer position is ambiguous for ${row.canonical_id}/${row.example_label}`);
}

function assertAuthorization(value,path='payload'){
 if(Array.isArray(value)){value.forEach((entry,index)=>assertAuthorization(entry,`${path}[${index}]`));return;}
 if(!value||typeof value!=='object')return;
 if(Object.hasOwn(value,'implementation_authorized')&&value.implementation_authorized!==true)throw Error(`${path}.implementation_authorized is not true`);
 for(const [name,entry] of Object.entries(value))assertAuthorization(entry,`${path}.${name}`);
}

export function parseApprovalMatrix(markdown){
 const section=markdown.slice(markdown.indexOf('## 5. Exact proposed final relationship matrix'),markdown.indexOf('## 6. Vocabulary editorial-readiness matrix'));
 if(!section)throw Error('Stage 5 matrix relationship section not found');
 let language=null;const relationships=[];
 for(const line of section.split(/\r?\n/)){
  if(line==='### English')language='EN';else if(line==='### Japanese')language='JA';
  const cells=line.split('|').slice(1,-1).map(value=>value.trim());
  if(!language||!/^\d$/.test(cells[0]||'')||!typeCode[cells[1]])continue;
  for(const match of cells[2].matchAll(/`([^`]+)` ([NRS])\/(?:A|RR|B)/g))relationships.push({slot_id:`${language}${cells[0]}`,content_type:typeCode[cells[1]],canonical_id:match[1],instructional_role:roleCode[match[2]]});
 }
 const dispositionSection=markdown.slice(markdown.indexOf('### Future role and status of every current relationship'),markdown.indexOf('## 4. Approved slot structure'));
 let lessonId=null;const removals=[];
 for(const line of dispositionSection.split(/\r?\n/)){
  const cells=line.split('|').slice(1,-1).map(value=>value.trim());
  if(cells.length<3)continue;
  const declared=cells[0].match(/`((?:en|ja)-s5-l[1-4])`/);if(declared)lessonId=declared[1];
  const contentType=typeCode[cells[1]];if(!lessonId||!contentType)continue;
  for(const match of cells[2].matchAll(/`([^`]+)` [NRS]\/DNA/g))removals.push({lesson_id:lessonId,content_type:contentType,content_id:match[1]});
 }
 if(relationships.length!==240)throw Error(`Matrix relationship cardinality changed: ${relationships.length}`);
 if(removals.length!==19)throw Error(`Matrix DO NOT ADD cardinality changed: ${removals.length}`);
 if(new Set(relationships.map(payloadKey)).size!==240)throw Error('Matrix has a duplicate final relationship');
 if(new Set(removals.map(key)).size!==19)throw Error('Matrix has a duplicate DO NOT ADD disposition');
 return {relationships,removals};
}

function validatePayload(payload,matrix){
 if(payload.authority?.human_approval_status!=='HUMAN FINAL APPROVED')throw Error('Payload authority is not HUMAN FINAL APPROVED');
 if(payload.authority?.implementation_authorized!==true)throw Error('Payload implementation is not authorized');
 if(payload.authority?.bundle!=='curriculum-expansion-01a-v1')throw Error('Payload base bundle changed');
 assertAuthorization(payload);
 const expected={vocabulary_examples:40,grammar_examples:39,expression_contexts:2,new_dialogues:3,reuse_dialogues:3,short_scenarios:2,lesson_titles:16,readiness_ledger:16};
 for(const [name,count] of Object.entries(expected))if(!Array.isArray(payload[name])||payload[name].length!==count)throw Error(`Payload ${name} cardinality changed`);
 const ledger=payload.readiness_ledger.flatMap(slot=>{
  if(slot.human_approval_status!=='HUMAN FINAL APPROVED'||slot.proposed_relationship_status!=='HUMAN FINAL APPROVED'||slot.relationship_count!==15||slot.relationships.length!==15)throw Error(`Payload readiness gate failed for ${slot.slot_id}`);
  return slot.relationships;
 });
 if(ledger.length!==240||ledger.some(row=>row.human_approval_status!=='HUMAN FINAL APPROVED'||row.proposed_relationship_status!=='HUMAN FINAL APPROVED'))throw Error('Payload relationship readiness gate failed');
 const fromPayload=new Map(ledger.map(row=>[payloadKey(row),row.instructional_role])),fromMatrix=new Map(matrix.relationships.map(row=>[payloadKey(row),row.instructional_role]));
 if(fromPayload.size!==240||fromMatrix.size!==240||[...fromPayload].some(([relationship,role])=>fromMatrix.get(relationship)!==role)||[...fromMatrix].some(([relationship,role])=>fromPayload.get(relationship)!==role))throw Error('Approval matrix and payload disagree');
 const count=(field,value)=>ledger.filter(row=>row[field]===value).length;
 if(count('content_type','vocabulary')!==128||count('content_type','grammar')!==48||count('content_type','expression')!==64)throw Error('Payload V/G/E totals changed');
 if(count('instructional_role','NEW')!==104||count('instructional_role','REVIEW')!==82||count('instructional_role','SUPPORT')!==54)throw Error('Payload instructional-role totals changed');
 if(payload.grammar_examples.filter(row=>row.cc_safety==='CC SAFE').length!==28||payload.grammar_examples.filter(row=>row.cc_safety==='NOT FOR CC').length!==11)throw Error('Payload controlled-completion totals changed');
 for(const row of payload.grammar_examples){
  if(!['CC SAFE','NOT FOR CC'].includes(row.cc_safety))throw Error(`Invalid CC safety for ${row.canonical_id}/${row.example_label}`);
  if(row.cc_safety==='CC SAFE'&&(!row.cc_answer||controlledCompletionAnswerStart(row)===null))throw Error(`CC answer is not sentence-local for ${row.canonical_id}/${row.example_label}`);
  if(row.cc_safety==='NOT FOR CC'&&row.cc_answer!==null)throw Error(`NOT FOR CC has an answer for ${row.canonical_id}/${row.example_label}`);
 }
 return ledger;
}

function publicAssets(payload){
 const dialogues=payload.new_dialogues.map(row=>({asset_id:`${datasetMarker}-dialogue-${row.slot_id.toLowerCase()}`,lesson_id:slotLessonIds[row.slot_id],kind:'dialogue',language:row.language,outcome:row.outcome,register_note:row.register_note,turns:row.turns.map(turn=>({turn_number:turn.turn_number,speaker:turn.speaker,role:turn.role,text:turn.text,translation_zh:turn.translation_zh}))}));
 const prompts=payload.reuse_dialogues.map(row=>({asset_id:`${datasetMarker}-prompt-${row.slot_id.toLowerCase()}`,lesson_id:slotLessonIds[row.slot_id],kind:'reuse_prompt',canonical_ids:row.canonical_ids,decision:row.decision,adaptation_prompt_layer:row.adaptation_prompt_layer}));
 const scenarios=payload.short_scenarios.map(row=>({asset_id:`${datasetMarker}-scenario-${row.slot_id.toLowerCase()}`,lesson_id:slotLessonIds[row.slot_id],kind:'scenario',scenario:row.scenario}));
 return [...dialogues,...prompts,...scenarios];
}

export function buildStage5Bundle(base,payload,matrix){
 for(const id of newLessonIds)if(base.u.some(unit=>unit[0]===id))throw Error(`Production lesson ID collision: ${id}`);
 const ledger=validatePayload(payload,matrix),titleBySlot=new Map(payload.lesson_titles.map(row=>[row.slot_id,row])),baseItems=new Map(base.i.map(item=>[`${item[0]}\0${item[1]}\0${item[2]}`,item]));
 const stage5Set=new Set(finalStage5Ids),slotByLesson=new Map(Object.entries(slotLessonIds).map(([slot,id])=>[id,slot]));
 const units=base.u.map(unit=>{
  const slot=slotByLesson.get(unit[0]);if(!slot)return [...unit];const title=titleBySlot.get(slot);
  return [unit[0],unit[1],5,topicBySlot[slot],title.title_zh,title.objective_zh,Number(slot.slice(2)),unit[7],unit[8],title.title_target];
 });
 for(const slot of ['EN2','EN3','EN6','EN8','JA3','JA6','JA7','JA8']){const title=titleBySlot.get(slot);units.push([slotLessonIds[slot],title.language,5,topicBySlot[slot],title.title_zh,title.objective_zh,Number(slot.slice(2)),'published',15,title.title_target]);}
 const items=base.i.filter(item=>!item[0].includes('-s5-')).map(item=>[...item]);
 for(const slot of payload.readiness_ledger){
  const lessonId=slotLessonIds[slot.slot_id],sequences={vocabulary:0,grammar:0,expression:0};
  for(const row of slot.relationships){
   const old=baseItems.get(`${lessonId}\0${row.content_type}\0${row.canonical_id}`),sequence=++sequences[row.content_type];
   items.push([lessonId,row.content_type,row.canonical_id,old?.[3]||'support',sequence,old?.[5]||0,row.instructional_role]);
  }
 }
 const replacedPrerequisiteLessons=new Set([...finalStage5Ids,'en-s6-l1','ja-s6-l1']),prerequisites=base.p.filter(edge=>!replacedPrerequisiteLessons.has(edge[0])).map(edge=>[...edge]);
 for(const chain of Object.values(prerequisiteChains))for(let index=1;index<chain.length;index++)prerequisites.push([chain[index],chain[index-1]]);
 const bundle={...base,v:schemaVersion,u:units,p:prerequisites,i:items,a:publicAssets(payload)};
 const stage5Items=items.filter(item=>stage5Set.has(item[0])),typeTotals=Object.fromEntries(['vocabulary','grammar','expression'].map(type=>[type,stage5Items.filter(item=>item[1]===type).length])),roleTotals=Object.fromEntries(['NEW','REVIEW','SUPPORT'].map(role=>[role,stage5Items.filter(item=>item[6]===role).length]));
 if(units.length!==72||prerequisites.length!==70||items.length!==1076||stage5Items.length!==240)throw Error(`Bundle cardinality gate failed: ${units.length}/${prerequisites.length}/${items.length}/${stage5Items.length}`);
 if(JSON.stringify(typeTotals)!==JSON.stringify({vocabulary:128,grammar:48,expression:64})||JSON.stringify(roleTotals)!==JSON.stringify({NEW:104,REVIEW:82,SUPPORT:54}))throw Error('Bundle Stage 5 totals changed');
 if(stage5Items.some(item=>item[2]==='en-c-1001'))throw Error('en-c-1001 entered final Stage 5');
 for(const id of finalStage5Ids){const lessonItems=stage5Items.filter(item=>item[0]===id);if(lessonItems.length!==15||lessonItems.filter(item=>item[1]==='vocabulary').length!==8||lessonItems.filter(item=>item[1]==='grammar').length!==3||lessonItems.filter(item=>item[1]==='expression').length!==4)throw Error(`Invalid final composition for ${id}`);}
 const actualKeys=new Set(stage5Items.map(item=>`${slotByLesson.get(item[0])}\0${item[1]}\0${item[2]}`));for(const row of ledger)if(!actualKeys.has(payloadKey(row)))throw Error(`Missing payload relationship: ${payloadKey(row)}`);
 const baseStage5=new Set(base.i.filter(item=>item[0].includes('-s5-')).map(item=>`${item[0]}\0${item[1]}\0${item[2]}`)),finalKeys=new Set(stage5Items.map(item=>`${item[0]}\0${item[1]}\0${item[2]}`));
 const removals=[...baseStage5].filter(itemKey=>!finalKeys.has(itemKey)),additions=[...finalKeys].filter(itemKey=>!baseStage5.has(itemKey));
 if(removals.length!==19||additions.length!==137||matrix.removals.some(row=>finalKeys.has(key(row)))||matrix.removals.some(row=>!baseStage5.has(key(row))))throw Error('Stage 5 relationship delta disagrees with the 19 dispositions');
 const runtimeActive=items.filter(item=>item[1]!=='grammar'||isCurrentGrammarId(item[2]));if(runtimeActive.length!==1071||items.length-runtimeActive.length!==5)throw Error('Runtime-active relationship count is not explained by five archived grammar links');
 const unitMap=new Map(units.map(unit=>[unit[0],unit])),parent=new Map(prerequisites.map(edge=>edge));if(parent.size!==70)throw Error('A lesson has multiple or duplicate prerequisites');
 for(const language of ['en','ja'])for(const unit of units.filter(row=>row[1]===language)){const seen=new Set();let current=unit[0];while(parent.has(current)){if(seen.has(current))throw Error(`Prerequisite cycle at ${current}`);seen.add(current);const next=parent.get(current);if(!unitMap.has(next)||unitMap.get(next)[1]!==language)throw Error(`Invalid prerequisite ${current} <- ${next}`);current=next;}if(current!==`${language}-s1-l1`)throw Error(`Unreachable lesson ${unit[0]}`);}
 for(const row of stage5Items.filter(item=>item[1]==='grammar'))if(!isPracticeEligibleGrammarId(row[2]))throw Error(`Stage 5 grammar is not assessable: ${row[2]}`);
 return {bundle,ledger,delta:{additions:additions.length,removals:removals.length,net:additions.length-removals.length},typeTotals,roleTotals};
}

export function loadStage5Expansion(root=process.cwd()){
 const matrixText=fs.readFileSync(`${root}/docs/STAGE-5-EXPANSION-02A-APPROVAL-MATRIX.md`,'utf8'),payloadText=fs.readFileSync(`${root}/docs/STAGE-5-EDITORIAL-02B-PAYLOAD.json`,'utf8');
 if(sha256(payloadText)!==approvedPayloadSha256)throw Error('Approved Stage 5 editorial payload SHA-256 changed');
 const payload=JSON.parse(payloadText),matrix=parseApprovalMatrix(matrixText),base=loadExpansion(root).bundle,built=buildStage5Bundle(base,payload,matrix);
 return {...built,base,payload,matrix,hashes:{matrix:sha256(matrixText),editorial_approval:sha256(fs.readFileSync(`${root}/docs/STAGE-5-EDITORIAL-APPROVAL-02B.md`,'utf8')),payload:sha256(payloadText)}};
}
