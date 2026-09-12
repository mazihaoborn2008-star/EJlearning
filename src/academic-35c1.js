import {rows} from './assessments.js';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function academic(request,db){
 try{
  const u=new URL(request.url);
  if(request.method!=='GET')return json({error:{message:'请使用 GET。'}},405);
  if(u.pathname==='/api/v2/academic/frameworks')return json({data:await rows(db,'SELECT f.*,t.target FROM v2_alignment_frameworks f JOIN v2_alignment_targets t ON t.framework_id=f.id ORDER BY f.id,t.sort_order')});
  if(u.pathname==='/api/v2/academic/topics')return json({data:await rows(db,'SELECT * FROM v2_topics ORDER BY sort_order,id')});
  if(u.pathname!=='/api/v2/academic/alignments')return json({error:{message:'没有这个接口。'}},404);
  const allowed=['framework','target','domain','id','limit','offset','search','part_of_speech','topic','unit_type','browse'];
  for(const [k,v] of u.searchParams)if(!allowed.includes(k)||u.searchParams.getAll(k).length!==1||!v||v.length>100)return json({error:{message:'筛选条件无效。'}},400);
  const p=Object.fromEntries(u.searchParams),limit=p.limit===undefined?20:Number(p.limit),offset=p.offset===undefined?0:Number(p.offset);
  if(!Number.isInteger(limit)||limit<1||limit>100||!Number.isInteger(offset)||offset<0||offset>100000)return json({error:{message:'分页无效。'}},400);
  const targets={IELTS:['5.0','5.5','6.0','6.5','7.0+'],JLPT:['N5','N4','N3','N2','N1']};
  if(p.framework&&!targets[p.framework]||p.target&&(!p.framework||!targets[p.framework].includes(p.target)))return json({error:{message:'考试目标无效。'}},400);
  if(p.domain&&!['vocabulary','grammar','sentences'].includes(p.domain)||p.id&&!p.domain)return json({error:{message:'内容类型无效。'}},400);
  if((p.search||p.part_of_speech||p.topic||p.unit_type)&&!p.domain)return json({error:{message:'学习筛选需要指定内容类型。'}},400);
  const frameworkLanguage=p.framework==='IELTS'?'en':p.framework==='JLPT'?'ja':null;
  const pos={en:new Set(['adjective','adjective phrase','adverb','fixed expression','interjection','noun','noun phrase','phrasal verb','prepositional phrase','proper noun','verb','verb phrase']),ja:new Set(['adjectival noun','adjective','adverb','counter','fixed expression','interjection','noun','noun phrase','proper noun','verb','verb phrase'])};
  if(p.part_of_speech&&(p.domain!=='vocabulary'||!frameworkLanguage||!pos[frameworkLanguage].has(p.part_of_speech)))return json({error:{message:'词性不属于当前考试语言。'}},400);
  const browseGroups={en:'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split(''),ja:['あ行','か行','さ行','た行','な行','は行','ま行','や行','ら行','わ行','その他']};
  if(p.browse&&(p.domain!=='vocabulary'||!frameworkLanguage||!browseGroups[frameworkLanguage].includes(p.browse)))return json({error:{message:'浏览分组不属于当前考试语言。'}},400);
  if(p.topic&&(p.domain!=='vocabulary'&&p.domain!=='sentences'||!/^[a-z][a-z0-9-]{0,63}$/.test(p.topic)))return json({error:{message:'主题筛选无效。'}},400);
  if(p.unit_type&&(p.domain!=='sentences'||!['sentence','scenario','dialogue'].includes(p.unit_type)))return json({error:{message:'表达类型筛选无效。'}},400);
  const where=["((v.publication_state='published') OR (g.publication_state='published') OR (e.publication_state='published' AND s.publication_state='published'))"],args=[];
  for(const key of ['framework','target'])if(p[key]){where.push(`a.${key==='framework'?'framework_id':'target'}=?`);args.push(p[key]);}
  if(frameworkLanguage){where.push('a.language=?');args.push(frameworkLanguage);}
  const column={vocabulary:'vocabulary_id',grammar:'grammar_id',sentences:'expression_id'};
  if(p.domain)where.push(`a.${column[p.domain]} IS NOT NULL`);
  if(p.id){where.push(p.domain==='sentences'?'s.id=?':`a.${column[p.domain]}=?`);args.push(p.id);}
  if(p.search){
   const q='%'+p.search.replace(/[\\%_]/g,'\\$&')+'%';
   if(p.domain==='vocabulary'){where.push("(v.lemma LIKE ? ESCAPE '\\' OR EXISTS (SELECT 1 FROM v2_vocabulary_senses vs WHERE vs.item_id=v.id AND (vs.meaning_zh LIKE ? ESCAPE '\\' OR vs.usage_zh LIKE ? ESCAPE '\\')))");args.push(q,q,q);}
   else if(p.domain==='grammar'){where.push("(g.title_zh LIKE ? ESCAPE '\\' OR g.form_name LIKE ? ESCAPE '\\' OR g.core_zh LIKE ? ESCAPE '\\' OR g.purpose_zh LIKE ? ESCAPE '\\')");args.push(q,q,q,q);}
   else {where.push("(s.anchor_zh LIKE ? ESCAPE '\\' OR s.context_zh LIKE ? ESCAPE '\\' OR e.text LIKE ? ESCAPE '\\')");args.push(q,q,q);}
  }
  if(p.part_of_speech){where.push('v.part_of_speech=?');args.push(p.part_of_speech);}
  if(p.browse&&!p.search){
   if(frameworkLanguage==='en'){
    if(p.browse==='#')where.push("upper(substr(trim(v.lemma),1,1)) NOT BETWEEN 'A' AND 'Z'");
    else {where.push('upper(substr(trim(v.lemma),1,1))=?');args.push(p.browse);}
   }else{
    const groups={'あ行':'あいうえおぁぃぅぇぉアイウエオァィゥェォヴ','か行':'かきくけこがぎぐげごカキクケコガギグゲゴ','さ行':'さしすせそざじずぜぞサシスセソザジズゼゾ','た行':'たちつてとだぢづでどっタチツテトダヂヅデドッ','な行':'なにぬねのナニヌネノ','は行':'はひふへほばびぶべぼぱぴぷぺぽハヒフヘホバビブベボパピプペポ','ま行':'まみむめもマミムメモ','や行':'やゆよゃゅょヤユヨャュョ','ら行':'らりるれろラリルレロ','わ行':'わをんゎワヲンヮ'};
    if(p.browse==='その他'){where.push("v.reading IS NULL OR trim(v.reading)='' OR instr(?,substr(trim(v.reading),1,1))=0");args.push(Object.values(groups).join(''));}
    else {where.push('v.reading IS NOT NULL AND instr(?,substr(trim(v.reading),1,1))>0');args.push(groups[p.browse]);}
   }
  }
  if(p.topic){if(p.domain==='vocabulary')where.push('EXISTS (SELECT 1 FROM v2_vocabulary_topics vt WHERE vt.item_id=v.id AND vt.topic_id=?)');else where.push('s.topic_id=?');args.push(p.topic);}
  if(p.unit_type){where.push('s.unit_type=?');args.push(p.unit_type);}
  const order=p.domain==='vocabulary'?(frameworkLanguage==='ja'?"coalesce(nullif(trim(v.reading),''),'￿'),v.lemma,a.id":"lower(trim(v.lemma)),a.id"):'a.id';
  const data=await rows(db,`SELECT a.*,coalesce(v.lemma,g.title_zh,s.anchor_zh) AS title,coalesce(v.id,g.id,s.id) AS content_id,v.stage,v.ipa,v.reading,v.part_of_speech,v.register AS vocabulary_register,(SELECT meaning_zh FROM v2_vocabulary_senses vs WHERE vs.item_id=v.id ORDER BY vs.sort_order,vs.id LIMIT 1) AS meaning_zh,g.level,g.form_name,g.purpose_zh,g.register AS grammar_register,e.text,e.overall_difficulty,s.context_zh,s.unit_type,s.topic_id,CASE WHEN v.id IS NOT NULL THEN 'vocabulary' WHEN g.id IS NOT NULL THEN 'grammar' ELSE 'sentences' END AS domain FROM v2_content_alignments a LEFT JOIN v2_vocabulary_items v ON v.id=a.vocabulary_id LEFT JOIN v2_grammar_points g ON g.id=a.grammar_id LEFT JOIN v2_sentence_expressions e ON e.id=a.expression_id LEFT JOIN v2_sentence_units s ON s.id=e.unit_id WHERE ${where.join(' AND ')} ORDER BY ${order} LIMIT ? OFFSET ?`,...args,limit+1,offset);
  return json({data:data.slice(0,limit).map(({tags_json,...r})=>({...r,tags:JSON.parse(tags_json)})),pagination:{limit,offset,has_more:data.length>limit,next_offset:data.length>limit?offset+limit:null}});
 }catch{ return json({error:{message:'课程参考暂时无法加载，请重试。'}},503); }
}
