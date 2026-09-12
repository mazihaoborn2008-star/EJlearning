const json=(data,status=200,headers={})=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
class ApiError extends Error {constructor(status,code,message){super(message);this.status=status;this.code=code;}}
const bad=(message)=>{throw new ApiError(400,'INVALID_REQUEST',message);};
const language=lang=>{if(!['en','ja'].includes(lang))bad('lang 必须为 en 或 ja。');return lang;};
export function scoreLevel(score,total){const p=score/total*100;return p<=25?1:p<=45?2:p<=65?3:p<=80?4:p<=92?5:6;}
async function rows(db,sql,...args){return (await db.prepare(sql).bind(...args).all()).results;}
async function getTopics(db){return rows(db,'SELECT id,slug,name,description,icon,sort_order AS sortOrder FROM topics WHERE published=1 ORDER BY sort_order,id');}
async function getConcepts(db,{topic=null,id=null}={}){
 // Select only published Concepts belonging to published topics and primary expressions.
 const concepts=await rows(db,`SELECT c.id,c.slug,c.topic_id AS topic,c.zh,c.sort_order AS sortOrder
 FROM concepts c JOIN topics t ON t.id=c.topic_id
 WHERE c.published=1 AND t.published=1 AND (? IS NULL OR t.slug=?) AND (? IS NULL OR c.id=?) ORDER BY c.sort_order,c.id`,topic,topic,id,id);
 if(!concepts.length)return [];
 const [expressions,grammar,chunks,readings,comparisons]=await Promise.all([
 rows(db,'SELECT id,concept_id,language,text,ipa,hiragana,difficulty,register,grammar_point_id FROM expressions WHERE is_primary=1 ORDER BY sort_order,id'),
 rows(db,'SELECT id,language,title,explanation AS text,example FROM grammar_points'),
 rows(db,'SELECT id,expression_id,text,readings_json,grammar_point_id FROM expression_chunks ORDER BY expression_id,sort_order'),
 rows(db,'SELECT expression_id,text,reading FROM expression_readings ORDER BY expression_id,sort_order'),
 rows(db,'SELECT concept_id,explanation FROM comparisons')]);
 const grammarMap=new Map(grammar.map(g=>[g.id,{id:g.id,title:g.title,text:g.text,example:g.example}]));
 return concepts.map(c=>{
  const result={...c,comparison:comparisons.find(x=>x.concept_id===c.id)?.explanation||''};
  for(const lang of ['en','ja']){const e=expressions.find(x=>x.concept_id===c.id&&x.language===lang);if(!e)throw new Error('Missing primary expression');
   result[lang]={id:e.id,text:e.text,difficulty:e.difficulty,register:e.register,grammar:grammarMap.get(e.grammar_point_id),chunks:chunks.filter(x=>x.expression_id===e.id).map(x=>({id:x.id,text:x.text,readings:JSON.parse(x.readings_json),grammar:x.grammar_point_id?grammarMap.get(x.grammar_point_id):null}))};
   if(lang==='en')result.en.ipa=e.ipa;else {result.ja.hiragana=e.hiragana;result.ja.readings=readings.filter(r=>r.expression_id===e.id).map(r=>r.reading?{text:r.text,reading:r.reading}:{text:r.text});}
  }return result;
 });
}
async function getQuestions(db,lang){
 const questions=await rows(db,'SELECT id,language,type,prompt,target_text AS targetText,difficulty FROM placement_questions WHERE language=? AND active=1 ORDER BY sort_order,id',lang);
 const options=await rows(db,'SELECT o.question_id,o.option_id AS id,o.text FROM placement_options o JOIN placement_questions q ON q.id=o.question_id WHERE q.language=? AND q.active=1 ORDER BY o.option_id',lang);
 return questions.map(q=>({...q,options:options.filter(o=>o.question_id===q.id).map(({id,text})=>({id,text}))}));
}
async function score(request,db){
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))throw new ApiError(415,'UNSUPPORTED_MEDIA_TYPE','请提交 JSON 格式的答案。');
 if(Number(request.headers.get('content-length'))>16384)throw new ApiError(413,'BODY_TOO_LARGE','提交内容过大。');
 // Read a bounded body even if Content-Length is missing or dishonest.
 const reader=request.body?.getReader();if(!reader)bad('缺少答案。');let size=0,parts=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();throw new ApiError(413,'BODY_TOO_LARGE','提交内容过大。');}parts.push(value);}
 const buffer=new Uint8Array(size);let offset=0;for(const part of parts){buffer.set(part,offset);offset+=part.length;}
 let body;try{body=JSON.parse(new TextDecoder().decode(buffer));}catch{bad('JSON 格式无效。');}
 if(!body||typeof body!=='object'||Array.isArray(body))bad('提交内容必须为对象。');
 if(Object.keys(body).some(k=>!['lang','answers'].includes(k)))bad('提交内容只能包含 lang 和 answers。');
 const lang=language(body.lang);if(!Array.isArray(body.answers))bad('answers 必须为数组。');
 const questions=await rows(db,'SELECT q.id,k.correct_option FROM placement_questions q JOIN placement_answer_keys k ON k.question_id=q.id WHERE q.language=? AND q.active=1 ORDER BY q.sort_order,q.id',lang);
 if(!questions.length)throw new ApiError(503,'CONTENT_UNAVAILABLE','测试内容暂不可用。');
 if(body.answers.length!==questions.length)bad('请提交本语言测试的全部答案。');
 const options=await rows(db,'SELECT o.question_id,o.option_id FROM placement_options o JOIN placement_questions q ON q.id=o.question_id WHERE q.language=? AND q.active=1',lang);
 const keys=new Map(questions.map(q=>[q.id,q.correct_option]));const seen=new Set();let correct=0;
 for(const a of body.answers){
  if(!a||typeof a!=='object'||Array.isArray(a)||Object.keys(a).some(k=>!['questionId','optionId'].includes(k))||typeof a.questionId!=='string'||!Number.isInteger(a.optionId))bad('每个答案需要有效的 questionId 和整数 optionId。');
  if(!keys.has(a.questionId)||seen.has(a.questionId))bad('题目不存在、重复或不属于本语言测试。');
  if(!options.some(o=>o.question_id===a.questionId&&o.option_id===a.optionId))bad('答案选项无效。');
  seen.add(a.questionId);if(keys.get(a.questionId)===a.optionId)correct++;
 }
 return {lang,score:correct,total:questions.length,percentage:correct/questions.length*100,level:scoreLevel(correct,questions.length)};
}
export default {
 async fetch(request,env){
  const url=new URL(request.url),p=url.pathname;
  if(p==='/'){url.pathname='/index.html';return env.ASSETS.fetch(new Request(url,request));}
  if(p!=='/api'&&!p.startsWith('/api/'))return env.ASSETS.fetch(request);
  try {
   const known=p==='/api/topics'||p==='/api/concepts'||p.startsWith('/api/concepts/')||p==='/api/placement/questions'||p==='/api/placement/score';
   if(!known)throw new ApiError(404,'NOT_FOUND','API 不存在。');
   const method=p==='/api/placement/score'?'POST':'GET';if(request.method!==method)return json({error:{code:'METHOD_NOT_ALLOWED',message:'请求方法不受支持。'}},405,{Allow:method});
   if(p==='/api/topics')return json({data:await getTopics(env.DB)});
   if(p==='/api/concepts'){
    const topic=url.searchParams.get('topic');if(topic!==null&&!/^[a-z][a-z0-9-]{0,63}$/.test(topic))bad('主题格式无效。');
    return json({data:await getConcepts(env.DB,{topic})});
   }
   if(p.startsWith('/api/concepts/')){const value=p.slice('/api/concepts/'.length);if(!/^[1-9]\d{0,9}$/.test(value))bad('Concept ID 必须为正整数。');const data=await getConcepts(env.DB,{id:Number(value)});if(!data.length)throw new ApiError(404,'NOT_FOUND','未找到这个情境。');return json({data:data[0]});}
   if(p==='/api/placement/questions')return json({data:await getQuestions(env.DB,language(url.searchParams.get('lang')))});
   return json({data:await score(request,env.DB)});
  }catch(error){if(error instanceof ApiError)return json({error:{code:error.code,message:error.message}},error.status);console.error('Content API failed');return json({error:{code:'SERVICE_UNAVAILABLE',message:'内容服务暂时不可用，请稍后重试。'}},503);}
 }
};
