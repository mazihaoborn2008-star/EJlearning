import {ApiError,bad,language,rows,bodyJSON,catalog,profile,assessment} from './assessments.js';
import {recommend} from './engine.js';
const json=(data,status=200,headers={})=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
export function scoreLevel(score,total){const p=score/total*100;return p<=25?1:p<=45?2:p<=65?3:p<=80?4:p<=92?5:6;}
async function getTopics(db){return rows(db,'SELECT id,slug,name,description,icon,sort_order AS sortOrder FROM topics WHERE published=1 ORDER BY sort_order,id');}
async function getConcepts(db,{topic=null,id=null}={}){
 // Select only published Concepts belonging to published topics and primary expressions.
 const concepts=await rows(db,`SELECT c.id,c.slug,c.topic_id AS topic,c.zh,c.concept_type AS conceptType,c.usage_note AS usageNote,c.sort_order AS sortOrder
 FROM concepts c JOIN topics t ON t.id=c.topic_id
 WHERE c.published=1 AND t.published=1 AND (? IS NULL OR t.slug=?) AND (? IS NULL OR c.id=?) ORDER BY c.sort_order,c.id`,topic,topic,id,id);
 if(!concepts.length)return [];
 const ids=concepts.map(c=>c.id),marks=ids.map(()=>'?').join(',');
 const [expressions,grammar,chunks,readings,comparisons]=await Promise.all([
 rows(db,`SELECT id,concept_id,language,text,ipa,hiragana,difficulty,register,metadata_json,grammar_point_id FROM expressions WHERE is_primary=1 AND concept_id IN (${marks}) ORDER BY sort_order,id`,...ids),
 rows(db,`SELECT id,language,title,explanation AS text,example FROM grammar_points WHERE id IN (SELECT grammar_point_id FROM expressions WHERE concept_id IN (${marks}) UNION SELECT ch.grammar_point_id FROM expression_chunks ch JOIN expressions e ON ch.expression_id=e.id WHERE e.concept_id IN (${marks}))`,...ids,...ids),
 rows(db,`SELECT id,expression_id,text,readings_json,grammar_point_id FROM expression_chunks WHERE expression_id IN (SELECT id FROM expressions WHERE concept_id IN (${marks})) ORDER BY expression_id,sort_order`,...ids),
 rows(db,`SELECT expression_id,text,reading FROM expression_readings WHERE expression_id IN (SELECT id FROM expressions WHERE concept_id IN (${marks})) ORDER BY expression_id,sort_order`,...ids),
 rows(db,`SELECT concept_id,explanation FROM comparisons WHERE concept_id IN (${marks})`,...ids)]);
 const grammarMap=new Map(grammar.map(g=>[g.id,{id:g.id,title:g.title,text:g.text,example:g.example}]));
 return concepts.map(c=>{
  const result={...c,comparison:comparisons.find(x=>x.concept_id===c.id)?.explanation||''};
  for(const lang of ['en','ja']){const e=expressions.find(x=>x.concept_id===c.id&&x.language===lang);if(!e)throw new Error('Missing primary expression');
   result[lang]={id:e.id,text:e.text,difficulty:e.difficulty,register:e.register,metadata:JSON.parse(e.metadata_json),grammar:grammarMap.get(e.grammar_point_id),chunks:chunks.filter(x=>x.expression_id===e.id).map(x=>({id:x.id,text:x.text,readings:JSON.parse(x.readings_json),grammar:x.grammar_point_id?grammarMap.get(x.grammar_point_id):null}))};
   if(lang==='en')result.en.ipa=e.ipa;else {result.ja.hiragana=e.hiragana;result.ja.readings=readings.filter(r=>r.expression_id===e.id).map(r=>r.reading?{text:r.text,reading:r.reading}:{text:r.text});}
  }return result;
 });
}
export default {
 async scheduled(_event,env){await env.DB.prepare('DELETE FROM assessment_sessions WHERE expires_at<?').bind(Date.now()).run();},
 async fetch(request,env){
  const url=new URL(request.url),p=url.pathname;
  if(p==='/'){url.pathname='/index.html';return env.ASSETS.fetch(new Request(url,request));}
  if(p!=='/api'&&!p.startsWith('/api/'))return env.ASSETS.fetch(request);
  try{
   const assessmentRoute=p.match(/^\/api\/(placement|checkpoint)\/(start|answer)$/);
   const isPost=!!assessmentRoute||p==='/api/recommendations';
   const known=isPost||['/api/topics','/api/concepts'].includes(p)||p.startsWith('/api/concepts/');
   if(['/api/placement/questions','/api/placement/score'].includes(p))throw new ApiError(410,'旧版定位已更新，请刷新页面使用自适应定位。');
   if(!known)throw new ApiError(404,'API 不存在。');
   const method=isPost?'POST':'GET';if(request.method!==method)return json({error:{code:'METHOD_NOT_ALLOWED',message:'请求方法不受支持。'}},405,{Allow:method});
   if(assessmentRoute)return json({data:await assessment(request,env.DB,assessmentRoute[1],assessmentRoute[2])});
   if(p==='/api/recommendations'){const b=profile(await bodyJSON(request));return json({data:recommend(await catalog(env.DB),b)});}
   const headers={'Cache-Control':'public, max-age=60'};
   if(p==='/api/topics')return json({data:await getTopics(env.DB)},200,headers);
   if(p==='/api/concepts'){
    const topic=url.searchParams.get('topic');if(topic!==null&&!/^[a-z][a-z0-9-]{0,63}$/.test(topic))bad('主题格式无效。');
    return json({data:await catalog(env.DB,topic)},200,headers);
   }
   const value=p.slice('/api/concepts/'.length);if(!/^[1-9]\d{0,9}$/.test(value))bad('Concept ID 必须为正整数。');
   const data=await getConcepts(env.DB,{id:Number(value)});if(!data.length)throw new ApiError(404,'未找到这个学习项。');return json({data:data[0]},200,headers);
  }catch(error){if(error instanceof ApiError)return json({error:{code:error.status===400?'INVALID_REQUEST':'API_ERROR',message:error.message}},error.status);console.error('Content API failed');return json({error:{code:'SERVICE_UNAVAILABLE',message:'内容服务暂时不可用，请稍后重试。'}},503);}
 }
};
