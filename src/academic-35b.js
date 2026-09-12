import {rows} from './assessments.js';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function academic(request,db){
 try{
  const u=new URL(request.url);
  if(request.method!=='GET')return json({error:{message:'请使用 GET。'}},405);
  if(u.pathname==='/api/v2/academic/frameworks')return json({data:await rows(db,'SELECT f.*,t.target FROM v2_alignment_frameworks f JOIN v2_alignment_targets t ON t.framework_id=f.id ORDER BY f.id,t.sort_order')});
  if(u.pathname==='/api/v2/academic/topics')return json({data:await rows(db,'SELECT * FROM v2_topics ORDER BY sort_order,id')});
  if(u.pathname!=='/api/v2/academic/alignments')return json({error:{message:'没有这个接口。'}},404);
  const allowed=['framework','target','domain','id','limit','offset'];
  for(const [k,v] of u.searchParams)if(!allowed.includes(k)||u.searchParams.getAll(k).length!==1||!v||v.length>100)return json({error:{message:'筛选条件无效。'}},400);
  const p=Object.fromEntries(u.searchParams),limit=p.limit===undefined?20:Number(p.limit),offset=p.offset===undefined?0:Number(p.offset);
  if(!Number.isInteger(limit)||limit<1||limit>100||!Number.isInteger(offset)||offset<0||offset>100000)return json({error:{message:'分页无效。'}},400);
  const targets={IELTS:['5.0','5.5','6.0','6.5','7.0+'],JLPT:['N5','N4','N3','N2','N1']};
  if(p.framework&&!targets[p.framework]||p.target&&(!p.framework||!targets[p.framework].includes(p.target)))return json({error:{message:'考试目标无效。'}},400);
  if(p.domain&&!['vocabulary','grammar','sentences'].includes(p.domain)||p.id&&!p.domain)return json({error:{message:'内容类型无效。'}},400);
  const where=["((v.publication_state='published') OR (g.publication_state='published') OR (e.publication_state='published' AND s.publication_state='published'))"],args=[];
  for(const key of ['framework','target'])if(p[key]){where.push(`a.${key==='framework'?'framework_id':'target'}=?`);args.push(p[key]);}
  const column={vocabulary:'vocabulary_id',grammar:'grammar_id',sentences:'expression_id'};
  if(p.domain)where.push(`a.${column[p.domain]} IS NOT NULL`);
  if(p.id){where.push(p.domain==='sentences'?'s.id=?':`a.${column[p.domain]}=?`);args.push(p.id);}
  const data=await rows(db,`SELECT a.*,coalesce(v.lemma,g.title_zh,s.anchor_zh) AS title,coalesce(v.id,g.id,s.id) AS content_id,v.stage,g.level,e.text,e.overall_difficulty,CASE WHEN v.id IS NOT NULL THEN 'vocabulary' WHEN g.id IS NOT NULL THEN 'grammar' ELSE 'sentences' END AS domain FROM v2_content_alignments a LEFT JOIN v2_vocabulary_items v ON v.id=a.vocabulary_id LEFT JOIN v2_grammar_points g ON g.id=a.grammar_id LEFT JOIN v2_sentence_expressions e ON e.id=a.expression_id LEFT JOIN v2_sentence_units s ON s.id=e.unit_id WHERE ${where.join(' AND ')} ORDER BY a.id LIMIT ? OFFSET ?`,...args,limit+1,offset);
  return json({data:data.slice(0,limit).map(({tags_json,...r})=>({...r,tags:JSON.parse(tags_json)})),pagination:{limit,offset,has_more:data.length>limit,next_offset:data.length>limit?offset+limit:null}});
 }catch{ return json({error:{message:'课程参考暂时无法加载，请重试。'}},503); }
}
