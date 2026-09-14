import fs from 'node:fs';

export const bundleId='curriculum-expansion-01a-v1';
export const schemaVersion='CURRICULUM-EXPANSION-01A';
export const publishedAt='2026-09-14T00:00:00Z';
export const targetLessons=[
 'en-s2-l5','en-s3-l5','en-s3-l6','en-s3-l7','en-s3-l8','en-s3-l9','en-s4-l5','en-s4-l6',
 'ja-s2-l5','ja-s2-l6','ja-s3-l5','ja-s3-l6','ja-s3-l7','ja-s3-l8','ja-s4-l5','ja-s4-l6'
];
export const prerequisiteReplacements=[
 ['en-s3-l1','en-s2-l4','en-s2-l5'],['en-s4-l1','en-s3-l4','en-s3-l9'],['en-s5-l1','en-s4-l4','en-s4-l6'],
 ['ja-s3-l1','ja-s2-l4','ja-s2-l6'],['ja-s4-l1','ja-s3-l4','ja-s3-l8'],['ja-s5-l1','ja-s4-l4','ja-s4-l6']
];
export const deferredPairs=[
 ['en-s2-l5','en-c-969'],['en-s3-l7','35e1c-en-v089'],['ja-s2-l5','ja-c-971'],
 ['en-s3-l6','en-present-perfect'],['en-s3-l8','en-not-quite'],['ja-s3-l8','ja-indirect-ka'],
 ['en-s4-l5','legacy-52-en'],['ja-s2-l5','legacy-76-ja']
];

const targetSet=new Set(targetLessons);
const contentTypes={V:'vocabulary',G:'grammar',E:'expression'};

export function parseExpansionMatrix(markdown){
 let lessonId=null;
 const history=[];
 for(const line of markdown.split(/\r?\n/)){
  const heading=line.match(/^### `([^`]+)`/);
  if(heading)lessonId=targetSet.has(heading[1])?heading[1]:null;
  if(!lessonId||!/^\| (?:CURRENT|ADD) \|/.test(line))continue;
  const cells=line.split('|').slice(1,-1).map(value=>value.trim());
  const contentId=cells[2].match(/`([^`]+)`/)?.[1];
  const row={lesson_id:lessonId,state:cells[0],content_type:contentTypes[cells[1]],content_id:contentId,instructional_role:cells[4],evidence:cells[6],status:cells[8]};
  if(!contentId||!contentTypes[cells[1]]||!['NEW','REVIEW','SUPPORT'].includes(row.instructional_role))throw Error(`Invalid matrix row: ${line}`);
  history.push(row);
 }
 const approved=history.filter(row=>!row.status.includes('DEFERRED'));
 if(history.length!==240||approved.length!==232)throw Error(`Matrix gate failed: ${history.length} reviewed / ${approved.length} approved rows`);
 if(new Set(approved.map(row=>`${row.lesson_id}\0${row.content_type}\0${row.content_id}`)).size!==approved.length)throw Error('Matrix contains a duplicate approved lesson-item relationship');
 return {history,approved,additions:approved.filter(row=>row.state==='ADD'),current:approved.filter(row=>row.state==='CURRENT')};
}

export function readSqlBundle(sql,id='phase-35e1c-v2'){
 const token=`VALUES('${id}',`;
 const start=sql.indexOf(token);
 if(start<0)throw Error(`Bundle ${id} not found`);
 const schemaEnd=sql.indexOf("','",start);
 const payloadStart=sql.indexOf("','",schemaEnd+3)+3;
 const payloadEnd=sql.indexOf("','2026-",payloadStart);
 if(payloadEnd<0)throw Error(`Bundle ${id} payload terminator not found`);
 return JSON.parse(sql.slice(payloadStart,payloadEnd).replaceAll("''","'"));
}

const key=row=>`${row.lesson_id}\0${row.content_type}\0${row.content_id}`;
export function buildExpansionBundle(base,matrix){
 const approvedByKey=new Map(matrix.approved.map(row=>[key(row),row]));
 const currentKeys=new Set(matrix.current.map(key));
 const seenCurrent=new Set();
 const items=base.i.map(item=>{
  const itemKey=`${item[0]}\0${item[1]}\0${item[2]}`,approved=approvedByKey.get(itemKey);
  if(approved){seenCurrent.add(itemKey);return [...item.slice(0,6),approved.instructional_role];}
  return [...item.slice(0,6),null];
 });
 const missing=[...currentKeys].filter(itemKey=>!seenCurrent.has(itemKey));
 if(missing.length)throw Error(`Approved CURRENT rows missing from base bundle: ${missing.join(', ')}`);
 const maxSequence=new Map();
 for(const item of items){const sequenceKey=`${item[0]}\0${item[1]}`;maxSequence.set(sequenceKey,Math.max(maxSequence.get(sequenceKey)||0,Number(item[4])||0));}
 for(const row of matrix.additions){
  const sequenceKey=`${row.lesson_id}\0${row.content_type}`,sequence=(maxSequence.get(sequenceKey)||0)+1;
  maxSequence.set(sequenceKey,sequence);
  items.push([row.lesson_id,row.content_type,row.content_id,'support',sequence,0,row.instructional_role]);
 }
 const prerequisites=base.p.map(edge=>{
  const replacement=prerequisiteReplacements.find(([lesson,old])=>edge[0]===lesson&&edge[1]===old);
  return replacement?[replacement[0],replacement[2]]:[...edge];
 });
 for(const [lesson,old] of prerequisiteReplacements)if(!base.p.some(edge=>edge[0]===lesson&&edge[1]===old))throw Error(`Prerequisite edge missing: ${lesson} <- ${old}`);
 const targetItems=items.filter(item=>targetSet.has(item[0]));
 if(targetItems.length!==232||items.length-base.i.length!==105)throw Error(`Link-count gate failed: ${targetItems.length} target / ${items.length-base.i.length} added`);
 if(targetItems.some(item=>!item[6]))throw Error('A target link is missing its authored instructional role');
 for(const [lesson,id] of deferredPairs)if(items.some(item=>item[0]===lesson&&item[2]===id))throw Error(`Deferred relationship was added: ${id} -> ${lesson}`);
 return {...base,v:schemaVersion,i:items,p:prerequisites};
}

export function loadExpansion(root=process.cwd()){
 const markdown=fs.readFileSync(`${root}/docs/CURRICULUM-EXPANSION-01A-MATRIX.md`,'utf8');
 const sql=fs.readFileSync(`${root}/migrations-35e1c/0003_lesson_target_fidelity_corrective.sql`,'utf8');
 const matrix=parseExpansionMatrix(markdown),base=readSqlBundle(sql),bundle=buildExpansionBundle(base,matrix);
 return {matrix,base,bundle};
}
