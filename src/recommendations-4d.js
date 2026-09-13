import {publishedLessonCurriculum} from './lessons-35d.js';

export const recommendationPolicy=Object.freeze({
 defaultWeakLimit:5,
 maxWeakLimit:20,
 candidateMultiplier:4,
 priority:['review_due','continue_lesson','start_next_lesson','all_lessons_complete']
});

const marks=count=>Array(count).fill('?').join(',');
const number=value=>Number(value||0);

export async function getReviewSnapshot(db,userId,now){
 const sql=table=>db.prepare(`SELECT
   EXISTS(SELECT 1 FROM ${table} WHERE user_id=? LIMIT 1) AS has_learned,
   (SELECT COUNT(*) FROM ${table} WHERE user_id=? AND next_review_at IS NOT NULL) AS scheduled_count,
   (SELECT COUNT(*) FROM ${table} WHERE user_id=? AND next_review_at IS NOT NULL AND next_review_at<=?) AS due_count,
   (SELECT next_review_at FROM ${table} WHERE user_id=? AND next_review_at>? ORDER BY next_review_at LIMIT 1) AS next_upcoming_at`)
  .bind(userId,userId,userId,now,userId,now).first();
 const [vocabulary,grammar]=await Promise.all([sql('vocabulary_progress'),sql('grammar_progress')]);
 const normalize=row=>({has_learned:Boolean(row.has_learned),scheduled_count:number(row.scheduled_count),due_count:number(row.due_count),next_upcoming_at:row.next_upcoming_at==null?null:Number(row.next_upcoming_at)});
 const v=normalize(vocabulary),g=normalize(grammar),upcoming=[v.next_upcoming_at,g.next_upcoming_at].filter(value=>value!=null);
 return {server_time:now,vocabulary:v,grammar:g,total_due:v.due_count+g.due_count,has_learned:v.has_learned||g.has_learned,
  total_scheduled:v.scheduled_count+g.scheduled_count,next_review_at:upcoming.length?Math.min(...upcoming):null};
}

function recommendationQuery(url){
 if([...url.searchParams.keys()].some(key=>key!=='limit')||url.searchParams.getAll('limit').length>1)throw new Error('INVALID_QUERY');
 const limit=url.searchParams.has('limit')?Number(url.searchParams.get('limit')):recommendationPolicy.defaultWeakLimit;
 if(!Number.isInteger(limit)||limit<1||limit>recommendationPolicy.maxWeakLimit)throw new Error('INVALID_QUERY');
 return {limit};
}

const weakWhere=`user_id=? AND (review_stage=0 OR last_result=0 OR lapse_count>=2 OR (attempts>=3 AND correct_count*1.0/attempts<0.6))`;
const weakOrder=id=>`CASE WHEN review_stage=0 OR last_result=0 THEN 0 ELSE 1 END,
 lapse_count DESC,correct_count*1.0/attempts ASC,COALESCE(last_wrong_at,0) DESC,${id} ASC`;

export function classifyProgress(row){
 const attempts=number(row.attempts),accuracy=attempts?number(row.correct_count)/attempts:0,stage=row.review_stage==null?null:Number(row.review_stage);
 if(stage===0||number(row.last_result)===0)return 'relearning';
 if(number(row.lapse_count)>=2||(attempts>=3&&accuracy<0.6))return 'weak';
 if(stage===1||stage===2)return 'learning';
 if(stage!=null&&stage>=3&&accuracy>=0.8&&number(row.last_result)===1)return 'stable';
 if(stage==null)return 'unscheduled';
 return 'developing';
}

function weaknessReasons(row){
 const reasons=[];
 if(number(row.last_result)===0)reasons.push('上次回答错误');
 if(row.review_stage!=null&&Number(row.review_stage)===0)reasons.push('当前处于重新学习阶段');
 if(number(row.lapse_count)>=2)reasons.push(`已出现 ${number(row.lapse_count)} 次遗忘`);
 if(number(row.attempts)>=3&&number(row.correct_count)/number(row.attempts)<0.6)reasons.push(`累计正确率 ${Math.round(number(row.correct_count)/number(row.attempts)*100)}%`);
 return reasons;
}

async function weakItems(progressDb,contentDb,userId,type,limit){
 const vocabulary=type==='vocabulary',table=vocabulary?'vocabulary_progress':'grammar_progress',idColumn=vocabulary?'vocabulary_id':'grammar_id';
 const candidateLimit=Math.min(recommendationPolicy.maxWeakLimit*recommendationPolicy.candidateMultiplier,limit*recommendationPolicy.candidateMultiplier);
 const result=await progressDb.prepare(`SELECT ${idColumn} AS id,attempts,correct_count,wrong_count,last_result,last_wrong_at,
   review_stage,lapse_count,next_review_at FROM ${table} WHERE ${weakWhere} ORDER BY ${weakOrder(idColumn)} LIMIT ?`)
  .bind(userId,candidateLimit).all();
 const candidates=result.results||[];
 if(!candidates.length)return [];
 const ids=candidates.map(row=>row.id);
 const metadata=vocabulary
  ?await contentDb.prepare(`SELECT v.id,v.language,COALESCE((SELECT s.meaning_zh FROM v2_vocabulary_senses s WHERE s.item_id=v.id ORDER BY s.sort_order,s.id LIMIT 1),'词汇') AS label FROM v2_vocabulary_items v WHERE v.id IN (${marks(ids.length)}) AND v.publication_state='published'`).bind(...ids).all()
  :await contentDb.prepare(`SELECT g.id,g.language,g.title_zh AS label FROM v2_grammar_points g WHERE g.id IN (${marks(ids.length)}) AND g.publication_state='published'`).bind(...ids).all();
 const byId=new Map((metadata.results||[]).map(row=>[row.id,row]));
 return candidates.map(row=>{
  const item=byId.get(row.id);if(!item)return null;
  const reasons=weaknessReasons(row);
  return {id:row.id,language:item.language,label:item.label,classification:classifyProgress(row),reason:reasons[0],reasons,
   attempts:number(row.attempts),correct_count:number(row.correct_count),wrong_count:number(row.wrong_count),
   accuracy:Math.round(number(row.correct_count)/number(row.attempts)*100),lapse_count:number(row.lapse_count),
   review_stage:row.review_stage==null?null:Number(row.review_stage),last_wrong_at:row.last_wrong_at==null?null:Number(row.last_wrong_at),
   next_review_at:row.next_review_at==null?null:Number(row.next_review_at),
   target:`/${vocabulary?'vocabulary-detail':'grammar-detail'}.html?id=${encodeURIComponent(row.id)}&lang=${item.language}`};
 }).filter(Boolean).slice(0,limit);
}

const lessonTarget=lesson=>`/lesson.html?id=${encodeURIComponent(lesson.id)}&lang=${lesson.language}&stage=${lesson.stage}`;
const publicLesson=(lesson,progress=null)=>({id:lesson.id,language:lesson.language,stage:Number(lesson.stage),sequence:Number(lesson.sequence),title:lesson.title,
 target:lessonTarget(lesson),...(progress?{status:progress.status,last_activity_at:Number(progress.last_activity_at),last_section_key:progress.last_section_key}: {})});

async function lessonRecommendations(db,userId){
 const curriculum=await publishedLessonCurriculum(db),lessons=curriculum.lessons;
 if(!lessons.length)return {continue:null,next:null,paths:{en:{continue:null,next:null,complete:true},ja:{continue:null,next:null,complete:true}},all_complete:false,available:0};
 const result=await db.prepare(`SELECT lesson_id,status,last_activity_at,last_section_key FROM lesson_progress WHERE user_id=? AND lesson_id IN (${marks(lessons.length)}) ORDER BY last_activity_at DESC,lesson_id ASC LIMIT ?`)
  .bind(userId,...lessons.map(x=>x.id),lessons.length).all();
 const rows=result.results||[],byId=new Map(rows.map(row=>[row.lesson_id,row])),completed=new Set(rows.filter(row=>row.status==='completed').map(row=>row.lesson_id));
 const prerequisites=new Map();for(const link of curriculum.prerequisites){const list=prerequisites.get(link.lesson_id)||[];list.push(link.prerequisite_lesson_id);prerequisites.set(link.lesson_id,list);}
 const activeRows=rows.filter(row=>row.status==='in_progress'&&byId.has(row.lesson_id));
 const active=activeRows.length?activeRows[0]:null,activeLesson=active?lessons.find(x=>x.id===active.lesson_id):null;
 const paths={};
 for(const language of ['en','ja']){
  const path=lessons.filter(x=>x.language===language),pathActive=activeRows.find(row=>path.some(x=>x.id===row.lesson_id)),pathActiveLesson=pathActive?path.find(x=>x.id===pathActive.lesson_id):null;
  const nextLesson=path.find(x=>!completed.has(x.id)&&!byId.has(x.id)&&(prerequisites.get(x.id)||[]).every(id=>completed.has(id)))||null;
  paths[language]={continue:pathActiveLesson?publicLesson(pathActiveLesson,pathActive):null,next:nextLesson?publicLesson(nextLesson):null,complete:path.length>0&&path.every(x=>completed.has(x.id))};
 }
 const latestLanguage=rows[0]&&lessons.find(x=>x.id===rows[0].lesson_id)?.language;
 const choices=[latestLanguage,'en','ja'].filter((value,index,array)=>value&&array.indexOf(value)===index).map(language=>paths[language]?.next).filter(Boolean);
 return {continue:activeLesson?publicLesson(activeLesson,active):null,next:active?null:(choices[0]||null),paths,all_complete:lessons.every(x=>completed.has(x.id)),available:lessons.length};
}

function primaryAction(review,lesson){
 if(review.total_due>0)return {type:'review_due',reason:`你有 ${review.total_due} 个到期复习项目。`,target:'/review.html',count:review.total_due};
 if(lesson.continue)return {type:'continue_lesson',reason:`你最近学习了 Lesson ${lesson.continue.stage}.${lesson.continue.sequence}，课程尚未完成。`,target:lesson.continue.target,lesson:lesson.continue};
 if(lesson.next)return {type:'start_next_lesson',reason:lesson.next.stage===1&&lesson.next.sequence===1?`从 ${lesson.next.language==='en'?'英语':'日语'}第一课开始学习。`:`前面的课程已经完成，建议继续 Lesson ${lesson.next.stage}.${lesson.next.sequence}。`,target:lesson.next.target,lesson:lesson.next};
 if(lesson.all_complete)return {type:'all_lessons_complete',reason:'你已完成当前提供的全部英语和日语课程。',target:'/learn.html'};
 return {type:'no_content',reason:'当前没有可推荐的已发布课程。',target:'/learn.html'};
}

export async function recommendationData(url,env,userId,now){
 const {limit}=recommendationQuery(url);
 const [review,lesson,weakVocabulary,weakGrammar]=await Promise.all([
  getReviewSnapshot(env.DB,userId,now),lessonRecommendations(env.DB,userId),
  weakItems(env.DB,env.CONTENT_DB,userId,'vocabulary',limit),weakItems(env.DB,env.CONTENT_DB,userId,'grammar',limit)
 ]);
 return {primary_action:primaryAction(review,lesson),weak_vocabulary:weakVocabulary,weak_grammar:weakGrammar,lesson,review,
  generated_at:now,limits:{weak_vocabulary:limit,weak_grammar:limit,maximum:recommendationPolicy.maxWeakLimit}};
}
