import {estimate,nextQuestion,summaries,recommend} from './engine.js';
export class ApiError extends Error{constructor(status,message){super(message);this.status=status;}}
export const bad=m=>{throw new ApiError(400,m);};
export const rows=async(db,sql,...args)=>(await db.prepare(sql).bind(...args).all()).results;
export function exact(body,keys){if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!keys.includes(k)))bad('提交字段无效。');}
export const language=l=>{if(!['en','ja'].includes(l))bad('请选择英语或日语。');return l;};
export async function bodyJSON(request){
 if(!/^application\/json(?:\s*;|\s*$)/i.test(request.headers.get('content-type')||''))throw new ApiError(415,'请提交 JSON。');
 const reader=request.body?.getReader();if(!reader)bad('缺少提交内容。');let n=0,parts=[];
 while(true){const {done,value}=await reader.read();if(done)break;n+=value.length;if(n>16384){await reader.cancel();throw new ApiError(413,'提交内容过大。');}parts.push(value);}
 const buf=new Uint8Array(n);let i=0;for(const p of parts){buf.set(p,i);i+=p.length;}let b;try{b=JSON.parse(new TextDecoder().decode(buf));}catch{bad('JSON 格式无效。');}return b;
}
export async function catalog(db,topic=null){return (await rows(db,`SELECT c.id,c.topic_id AS topic,c.zh,c.concept_type AS conceptType,e.difficulty AS enDifficulty,j.difficulty AS jaDifficulty FROM concepts c JOIN topics t ON t.id=c.topic_id JOIN expressions e ON e.concept_id=c.id AND e.language='en' AND e.is_primary=1 JOIN expressions j ON j.concept_id=c.id AND j.language='ja' AND j.is_primary=1 WHERE c.published=1 AND t.published=1 AND (? IS NULL OR t.slug=?) ORDER BY c.sort_order,c.id`,topic,topic)).map(({enDifficulty,jaDifficulty,...c})=>({...c,en:{difficulty:enDifficulty},ja:{difficulty:jaDifficulty}}));}
export function profile(b){
 exact(b,['lang','level','mastery','recent','weak','last','topic']);language(b.lang);
 if(b.level!==undefined&&(!Number.isInteger(b.level)||b.level<1||b.level>6))bad('等级无效。');
 if(b.topic!==undefined&&b.topic!==null&&(typeof b.topic!=='string'||!/^[a-z][a-z0-9-]{0,63}$/.test(b.topic)))bad('主题无效。');
 for(const k of ['recent','weak'])if(b[k]!==undefined&&(!Array.isArray(b[k])||b[k].length>220||b[k].some(v=>!Number.isInteger(v)||v<1)))bad('学习记录无效。');
 if(b.last!==undefined&&b.last!==null&&(!Number.isInteger(b.last)||b.last<1))bad('学习位置无效。');
 if(b.mastery!==undefined){if(!b.mastery||typeof b.mastery!=='object'||Array.isArray(b.mastery)||Object.keys(b.mastery).length>220||Object.entries(b.mastery).some(([k,v])=>!/^\d{1,10}$/.test(k)||!['new','learning','learned','review'].includes(v)))bad('掌握记录无效。');}return b;
}
async function pool(db,lang,kind,topic){return rows(db,`SELECT q.id,q.type,q.prompt,q.target_text AS targetText,q.difficulty,q.concept_id AS conceptId,c.topic_id AS topic,k.correct_option FROM placement_questions q JOIN placement_answer_keys k ON k.question_id=q.id LEFT JOIN concepts c ON c.id=q.concept_id LEFT JOIN topics t ON t.id=c.topic_id WHERE q.language=? AND q.purpose=? AND q.active=1 AND (q.concept_id IS NULL OR (c.published=1 AND t.published=1)) AND (? IS NULL OR c.topic_id=?) ORDER BY q.id`,lang,kind,topic,topic);}
async function publicQuestion(db,q){return {id:q.id,type:q.type,prompt:q.prompt,targetText:q.targetText,options:await rows(db,'SELECT option_id AS id,text FROM placement_options WHERE question_id=? ORDER BY option_id',q.id)};}
async function responseFor(db,session,state,questions){
 const h=state.history,placement=session.kind==='placement',e=estimate(h),done=placement?e.done:h.length===state.queue.length;
 if(done){
  if(!placement)return {sessionId:session.id,version:session.version,complete:true,result:{lang:session.language,topic:session.topic,total:h.length,score:h.filter(a=>a.correct).length,percentage:Math.round(h.filter(a=>a.correct).length/h.length*100),weakConcepts:h.filter(a=>!a.correct).map(a=>a.conceptId)}};
  const rec=recommend(await catalog(db),{lang:session.language,level:e.level});
  return {sessionId:session.id,version:session.version,complete:true,result:{lang:session.language,level:e.level,startingDifficulty:e.level,summary:summaries[e.level-1],evidence:`根据 ${h.length} 道题、${new Set(h.map(a=>a.difficulty)).size} 个难度的表现估计；${e.confidence}。`,recommendedTopics:[...new Set(rec.items.map(c=>c.topic))].slice(0,3),answered:h.length}};
 }
 const q=placement?nextQuestion(questions,h,session.id):questions.find(q=>q.id===state.queue[h.length]);
 if(!q)throw new ApiError(503,'题目不足，请稍后重试。');state.current=q.id;
 return {sessionId:session.id,version:session.version,complete:false,answered:h.length,...(!placement?{total:state.queue.length}:{}),question:await publicQuestion(db,q)};
}
export async function assessment(request,db,kind,action){
 const b=await bodyJSON(request),now=Date.now();
 if(action==='start'){
  exact(b,kind==='placement'?['lang']:['lang','topic']);const lang=language(b.lang),topic=kind==='checkpoint'?b.topic:null;
  if(kind==='checkpoint'&&(typeof topic!=='string'||!/^[a-z][a-z0-9-]{0,63}$/.test(topic)))bad('主题无效。');
  const questions=await pool(db,lang,kind,topic);if(questions.length<(kind==='placement'?18:5))throw new ApiError(503,'测试内容暂不可用。');
  const s={id:crypto.randomUUID(),kind,language:lang,topic,version:0},state={history:[]};
  if(kind==='checkpoint'){const ordered=[...questions].sort((a,b)=>a.difficulty-b.difficulty||a.id.localeCompare(b.id)),count=Math.min(8,ordered.length);state.queue=Array.from({length:count},(_,i)=>ordered[Math.floor(i*(ordered.length-1)/(count-1))].id);}
  const response=await responseFor(db,s,state,questions);state.response=response;
  await db.batch([db.prepare('DELETE FROM assessment_sessions WHERE expires_at<?').bind(now),db.prepare('INSERT INTO assessment_sessions(id,kind,language,topic,state_json,expires_at) VALUES(?,?,?,?,?,?)').bind(s.id,kind,lang,topic,JSON.stringify(state),now+30*60*1000)]);return response;
 }
 exact(b,['sessionId','version','questionId','optionId']);if(typeof b.sessionId!=='string'||!/^[a-f0-9-]{36}$/.test(b.sessionId)||!Number.isInteger(b.version)||b.version<0||b.version>18||typeof b.questionId!=='string'||b.questionId.length>100||!Number.isInteger(b.optionId))bad('答案格式无效。');
 const s=(await rows(db,'SELECT * FROM assessment_sessions WHERE id=? AND kind=?',b.sessionId,kind))[0];if(!s||s.expires_at<now)throw new ApiError(410,'测试已过期，请重新开始。');
 const state=JSON.parse(s.state_json),fingerprint=JSON.stringify([b.version,b.questionId,b.optionId]);
 // Exact retry returns the committed response after a lost network response; never scores twice.
 if(state.lastRequest===fingerprint)return state.response;
 if(b.version!==s.version||state.response.complete||b.questionId!==state.current)throw new ApiError(409,'题目已提交或会话不匹配，请重新开始。');
 const questions=await pool(db,s.language,kind,s.topic),q=questions.find(q=>q.id===b.questionId);
 if(!q)throw new ApiError(409,'题目内容已变更，请重新开始。');
 if(!(await rows(db,'SELECT 1 FROM placement_options WHERE question_id=? AND option_id=?',q.id,b.optionId)).length)bad('选项无效。');
 state.history.push({id:q.id,difficulty:q.difficulty,topic:q.topic,conceptId:q.conceptId,correct:q.correct_option===b.optionId});
 const response=await responseFor(db,{...s,version:s.version+1},state,questions);state.response=response;state.lastRequest=fingerprint;
 if(response.complete){state.history=[];delete state.queue;delete state.current;}
 const result=await db.prepare('UPDATE assessment_sessions SET state_json=?,version=version+1 WHERE id=? AND version=? AND expires_at>=?').bind(JSON.stringify(state),s.id,s.version,now).run();
 if(result.meta.changes!==1)throw new ApiError(409,'答案已在另一请求中提交。');return response;
}
