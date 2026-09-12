// Read-only V2 contract. SQL identifiers come exclusively from fixed maps below.
import {ApiError, rows} from './assessments.js';
const reply=(data,status=200,headers={})=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const invalid=message=>{throw new ApiError(400,message);};
const definitions={
 vocabulary:{table:'v2_vocabulary_items',fields:'id,language,lemma,type,stage,ipa,reading,part_of_speech,register,sort_order',filters:{language:'language',stage:'stage',type:'type',part_of_speech:'part_of_speech',register:'register'}},
 grammar:{table:'v2_grammar_points',fields:'id,language,slug,title_zh,form_name,level,register,sort_order',filters:{language:'language',level:'level'}},
 sentences:{table:'v2_sentence_units',fields:'id,anchor_zh,topic_id,unit_type,sort_order',filters:{topic:'topic_id',unit_type:'unit_type'}}
};
function params(url,kind,reverse=false){
 const allowed=new Set(reverse?['limit','offset']:['limit','offset','search',...Object.keys(definitions[kind].filters),...(kind==='vocabulary'?['browse']:[]),...(kind==='sentences'?['language','overall_difficulty','vocabulary_difficulty','grammar_difficulty']:[])]);
 const p={limit:20,offset:0};
 for(const [key,value] of url.searchParams){
  if(!allowed.has(key)||url.searchParams.getAll(key).length!==1)invalid('Unknown or repeated filter: '+key);
  if(['limit','offset','stage','level','overall_difficulty','vocabulary_difficulty','grammar_difficulty'].includes(key)){
   if(!/^\d+$/.test(value))invalid('Invalid integer: '+key);
   const n=Number(value),min=key==='offset'?0:1,max=key==='limit'?100:key==='offset'?100000:6;
   if(!Number.isSafeInteger(n)||n<min||n>max)invalid('Out of range: '+key);p[key]=n;
  }else {if(!value.trim()||value.length>100)invalid('Invalid filter: '+key);p[key]=value.trim();}
 }
 if(p.language&&!['en','ja'].includes(p.language))invalid('Invalid language');
 if(p.part_of_speech&&!p.language)invalid('Vocabulary POS requires a language scope');
 const pos={en:new Set(['adjective','adjective phrase','adverb','fixed expression','interjection','noun','noun phrase','phrasal verb','prepositional phrase','proper noun','verb','verb phrase']),ja:new Set(['adjectival noun','adjective','adverb','counter','fixed expression','interjection','noun','noun phrase','proper noun','verb','verb phrase'])};
 if(p.part_of_speech&&!pos[p.language]?.has(p.part_of_speech))invalid('POS is outside the selected language taxonomy');
 if(p.type&&!['word','fixed_expression'].includes(p.type))invalid('Invalid vocabulary type');
 if(p.unit_type&&!['sentence','scenario','dialogue'].includes(p.unit_type))invalid('Invalid unit type');
 if(p.browse){if(!p.language)invalid('Browse group requires a language scope');const ok=p.language==='en'?/^[A-Z#]$/.test(p.browse):['あ行','か行','さ行','た行','な行','は行','ま行','や行','ら行','わ行','その他'].includes(p.browse);if(!ok)invalid('Invalid browse group');}
 return p;
}
const decode=row=>{
 const result={...row};
 if('readings_json' in result){result.readings=JSON.parse(result.readings_json);delete result.readings_json;}
 return result;
};
async function page(db,select,where,args,p,order){
 const data=await rows(db,`${select} WHERE ${where} ORDER BY ${order} LIMIT ? OFFSET ?`,...args,p.limit+1,p.offset);
 const has_more=data.length>p.limit;
 return {data:data.slice(0,p.limit).map(decode),pagination:{limit:p.limit,offset:p.offset,has_more,next_offset:has_more?p.offset+p.limit:null}};
}
async function list(db,url,kind){
 const p=params(url,kind),d=definitions[kind],conditions=["t.publication_state='published'"],args=[];
 for(const [key,column] of Object.entries(d.filters))if(p[key]!==undefined){conditions.push(`t.${column}=?`);args.push(p[key]);}
 if(p.search){
  const q='%'+p.search.replace(/[\\%_]/g,'\\$&')+'%';
  if(kind==='vocabulary'){conditions.push("(t.lemma LIKE ? ESCAPE '\\' OR EXISTS (SELECT 1 FROM v2_vocabulary_senses s WHERE s.item_id=t.id AND (s.meaning_zh LIKE ? ESCAPE '\\' OR s.usage_zh LIKE ? ESCAPE '\\')))");args.push(q,q,q);}
  else if(kind==='grammar'){conditions.push("(t.title_zh LIKE ? ESCAPE '\\' OR t.form_name LIKE ? ESCAPE '\\' OR t.core_zh LIKE ? ESCAPE '\\')");args.push(q,q,q);}
  else {conditions.push("t.anchor_zh LIKE ? ESCAPE '\\'");args.push(q);}
 }
 if(kind==='vocabulary'&&p.browse&&!p.search){
  if(p.language==='en'){
   if(p.browse==='#')conditions.push("upper(substr(trim(t.lemma),1,1)) NOT BETWEEN 'A' AND 'Z'");
   else {conditions.push('upper(substr(trim(t.lemma),1,1))=?');args.push(p.browse);}
  }else{
   const groups={'あ行':'あいうえおぁぃぅぇぉアイウエオァィゥェォヴ','か行':'かきくけこがぎぐげごカキクケコガギグゲゴ','さ行':'さしすせそざじずぜぞサシスセソザジズゼゾ','た行':'たちつてとだぢづでどっタチツテトダヂヅデドッ','な行':'なにぬねのナニヌネノ','は行':'はひふへほばびぶべぼぱぴぷぺぽハヒフヘホバビブベボパピプペポ','ま行':'まみむめもマミムメモ','や行':'やゆよゃゅょヤユヨャュョ','ら行':'らりるれろラリルレロ','わ行':'わをんゎワヲンヮ'};
   if(p.browse==='その他')conditions.push(`(t.reading IS NULL OR trim(t.reading)='' OR instr(?,substr(trim(t.reading),1,1))=0)`),args.push(Object.values(groups).join(''));
   else conditions.push('t.reading IS NOT NULL AND instr(?,substr(trim(t.reading),1,1))>0'),args.push(groups[p.browse]);
  }
 }
 if(kind==='sentences'){
  const filters=["e.unit_id=t.id","e.publication_state='published'"];
  for(const key of ['language','overall_difficulty','vocabulary_difficulty','grammar_difficulty'])if(p[key]!==undefined){filters.push(`e.${key}=?`);args.push(p[key]);}
  conditions.push(`EXISTS (SELECT 1 FROM v2_sentence_expressions e WHERE ${filters.join(' AND ')})`);
 }
 const fields=d.fields.split(',').map(f=>'t.'+f).join(',')+(kind==='vocabulary' ? ",(SELECT meaning_zh FROM v2_vocabulary_senses s WHERE s.item_id=t.id ORDER BY s.sort_order,s.id LIMIT 1) AS meaning_zh" : '');
 const order=kind==='vocabulary'&&!p.search?(p.language==='ja'?"CASE WHEN t.reading IS NULL OR trim(t.reading)='' THEN 1 ELSE 0 END,t.reading,t.lemma,t.id":"lower(t.lemma),t.id"):'t.sort_order,t.id';
 return page(db,`SELECT ${fields} FROM ${d.table} t`,conditions.join(' AND '),args,p,order);
}
async function published(db,kind,id){
 const result=await rows(db,`SELECT * FROM ${definitions[kind].table} WHERE id=? AND publication_state='published'`,id);
 if(!result.length)throw new ApiError(404,'Learning unit not found');return result[0];
}
async function reverse(db,kind,id,p){
 const vocab=kind==='vocabulary',table=vocab?'v2_sentence_vocabulary_links':'v2_sentence_grammar_links',key=vocab?'item_id':'grammar_id';
 return page(db,`SELECT DISTINCT u.id AS unit_id,u.anchor_zh,u.unit_type,e.id AS expression_id,e.language,e.text,e.overall_difficulty FROM ${table} l JOIN v2_sentence_expressions e ON e.id=l.expression_id JOIN v2_sentence_units u ON u.id=e.unit_id`,
  `l.${key}=? AND e.publication_state='published' AND u.publication_state='published'`,[id],p,'u.id,e.id');
}
async function relations(db,kind,id){
 const vocab=kind==='vocabulary',table=vocab?'v2_vocabulary_relations':'v2_grammar_relations',target=vocab?'v2_vocabulary_items':'v2_grammar_points',label=vocab?'lemma':'title_zh';
 return rows(db,`SELECT r.*,t.${label} AS other_label,CASE WHEN r.source_id=? THEN 'outgoing' ELSE 'incoming' END AS direction FROM ${table} r JOIN ${target} t ON t.id=CASE WHEN r.source_id=? THEN r.target_id ELSE r.source_id END WHERE (r.source_id=? OR r.target_id=?) AND t.publication_state='published' ORDER BY r.type,r.source_id,r.target_id`,id,id,id,id);
}
async function detail(db,kind,id){
 const item=await published(db,kind,id);
 if(kind==='vocabulary'){
  const [senses,examples,related,sentences,topics]=await Promise.all([
   rows(db,'SELECT * FROM v2_vocabulary_senses WHERE item_id=? ORDER BY sort_order,id',id),
   rows(db,'SELECT * FROM v2_vocabulary_examples WHERE item_id=? ORDER BY sort_order,id',id),relations(db,kind,id),reverse(db,kind,id,{limit:10,offset:0}),
   rows(db,'SELECT t.* FROM v2_topics t JOIN v2_vocabulary_topics vt ON vt.topic_id=t.id WHERE vt.item_id=? ORDER BY t.sort_order,t.id',id)]);
  return {...item,senses,examples:examples.map(decode),relations:related,topics,sentences};
 }
 if(kind==='grammar'){
  const [examples,related,sentences]=await Promise.all([
   rows(db,"SELECT g.id,g.grammar_id,g.language,g.text,g.translation_zh,g.explanation_zh,g.ipa,g.readings_json,g.sort_order,CASE WHEN e.publication_state='published' AND u.publication_state='published' THEN g.source_expression_id ELSE NULL END AS source_expression_id FROM v2_grammar_examples g LEFT JOIN v2_sentence_expressions e ON e.id=g.source_expression_id LEFT JOIN v2_sentence_units u ON u.id=e.unit_id WHERE g.grammar_id=? ORDER BY g.sort_order,g.id",id),relations(db,kind,id),reverse(db,kind,id,{limit:10,offset:0})]);
  return {...item,examples:examples.map(decode),prerequisites:related.filter(r=>r.type==='prerequisite'&&r.direction==='outgoing'),relations:related.filter(r=>r.type!=='prerequisite'),recommended_for:related.filter(r=>r.type==='prerequisite'&&r.direction==='incoming'),sentences};
 }
 const expressions=await rows(db,"SELECT * FROM v2_sentence_expressions WHERE unit_id=? AND publication_state='published' ORDER BY language,sort_order,id",id);
 return {...item,expressions:await Promise.all(expressions.map(async expression=>{
  const [vocabulary_links,grammar_links,turns]=await Promise.all([
   rows(db,"SELECT l.*,v.lemma,s.meaning_zh FROM v2_sentence_vocabulary_links l JOIN v2_vocabulary_items v ON v.id=l.item_id LEFT JOIN v2_vocabulary_senses s ON s.id=l.sense_id WHERE l.expression_id=? AND v.publication_state='published' ORDER BY l.sort_order,l.id",expression.id),
   rows(db,"SELECT l.*,g.title_zh,g.form_name FROM v2_sentence_grammar_links l JOIN v2_grammar_points g ON g.id=l.grammar_id WHERE l.expression_id=? AND g.publication_state='published' ORDER BY l.sort_order,l.id",expression.id),
   rows(db,'SELECT * FROM v2_dialogue_turns WHERE expression_id=? ORDER BY sort_order,id',expression.id)]);
  return {...decode(expression),vocabulary_links,grammar_links,turns:turns.map(decode)};
 }))};
}
export async function v2(request,db){
 try{
  const url=new URL(request.url),match=url.pathname.match(/^\/api\/v2\/(vocabulary|grammar|sentences)(?:\/([^/]+)(?:\/(sentences))?)?$/);
  if(!match)throw new ApiError(404,'V2 API not found');
  if(request.method!=='GET')return reply({error:{code:'METHOD_NOT_ALLOWED',message:'Use GET'}},405,{Allow:'GET'});
  const [,kind,id,relationship]=match;
  if(id&&!/^[a-z0-9][a-z0-9-]{0,95}$/.test(id))invalid('Invalid ID');
  if(relationship){if(kind==='sentences')throw new ApiError(404,'Relationship not found');const p=params(url,kind,true);await published(db,kind,id);return reply(await reverse(db,kind,id,p));}
  if(id){if(url.search)invalid('Detail does not accept filters');return reply({data:await detail(db,kind,id)});}
  return reply(await list(db,url,kind));
 }catch(error){
  if(error instanceof ApiError)return reply({error:{code:error.status===400?'INVALID_REQUEST':'NOT_FOUND',message:error.message}},error.status);
  console.error('V2 content unavailable');return reply({error:{code:'SERVICE_UNAVAILABLE',message:'Content temporarily unavailable'}},503);
 }
}
