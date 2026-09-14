import {getAuthenticatedSession} from './auth-4a.js';
import {getReviewSnapshot,recommendationData} from './recommendations-4d.js';
import {practiceSession,resolvePracticeExercise,normalizePracticeAnswer,lessonEvidence} from './practice-4e.js';
import {createRemediationToken} from './remediation-4f.js';
import {readSettings,startOfLocalDay} from './settings-4f.js';

const SECTION_KEYS = new Set(['overview', 'vocabulary', 'grammar', 'expressions', 'scenario', 'practice']);
const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,95}$/;
const ATTEMPT_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;
const json = (body, status = 200, headers = {}) => Response.json(body, {status, headers: {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  ...headers
}});
const fail = (status, code, message, headers) => json({error: {code, message}}, status, headers);

const countChanges = result => Number(result?.meta?.changes || 0);
const stateFor = row => row && row.attempts >= 3 && row.correct_count / row.attempts >= 0.8 && row.correct_streak >= 2 ? 'familiar' : 'learning';
const publicProgress = row => row ? {
  attempts: Number(row.attempts),
  correct_count: Number(row.correct_count),
  wrong_count: Number(row.wrong_count),
  correct_streak: Number(row.correct_streak),
  last_result: Boolean(row.last_result),
  first_seen_at: Number(row.first_seen_at),
  last_seen_at: Number(row.last_seen_at),
  last_correct_at: row.last_correct_at == null ? null : Number(row.last_correct_at),
  last_wrong_at: row.last_wrong_at == null ? null : Number(row.last_wrong_at),
  review_stage: row.review_stage == null ? null : Number(row.review_stage),
  review_count: Number(row.review_count || 0),
  lapse_count: Number(row.lapse_count || 0),
  last_reviewed_at: row.last_reviewed_at == null ? null : Number(row.last_reviewed_at),
  next_review_at: row.next_review_at == null ? null : Number(row.next_review_at),
  current_interval_seconds: row.current_interval_seconds == null ? null : Number(row.current_interval_seconds),
  state: stateFor(row)
} : null;

function sameOrigin(request) {
  const expected = new URL(request.url).origin;
  const origin = request.headers.get('Origin');
  const site = request.headers.get('Sec-Fetch-Site');
  return origin === expected && (!site || ['same-origin', 'none'].includes(site));
}

async function readBody(request, allowed) {
  if (!(request.headers.get('Content-Type') || '').toLowerCase().startsWith('application/json')) throw new Error('INVALID_JSON');
  const body = await request.json();
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !allowed.has(key))) throw new Error('INVALID_BODY');
  return body;
}

const normalizeAnswer = normalizePracticeAnswer;

async function canonicalItem(db, type, id) {
  if (type === 'vocabulary') return db.prepare(`SELECT v.id,v.language,v.lemma AS answer,
    COALESCE((SELECT s.meaning_zh FROM v2_vocabulary_senses s WHERE s.item_id=v.id ORDER BY s.sort_order,s.id LIMIT 1),'词汇') AS safe_explanation
    FROM v2_vocabulary_items v WHERE v.id = ? AND v.publication_state = 'published'`).bind(id).first();
  return db.prepare(`SELECT id,language,form_name AS answer,title_zh AS safe_title,title_zh AS safe_explanation
    FROM v2_grammar_points WHERE id = ? AND publication_state = 'published'`).bind(id).first();
}

async function progressRow(db, userId, type, id) {
  const vocabulary = type === 'vocabulary';
  const table = vocabulary ? 'vocabulary_progress' : 'grammar_progress';
  const key = vocabulary ? 'vocabulary_id' : 'grammar_id';
  return db.prepare(`SELECT * FROM ${table} WHERE user_id = ? AND ${key} = ?`).bind(userId, id).first();
}

async function recordAttempt(request, env, session, now) {
  let body;
  try {
    if (!(request.headers.get('Content-Type') || '').toLowerCase().startsWith('application/json')) throw new Error('INVALID_JSON');
    body = await request.json();
    const tokenized=body&&typeof body==='object'&&!Array.isArray(body)&&Object.hasOwn(body,'exercise_token');
    const allowed=tokenized?new Set(['attempt_id','exercise_token','answer']):new Set(['attempt_id','content_type','content_id','answer']);
    if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(key=>!allowed.has(key)))throw new Error('INVALID_BODY');
  }
  catch { return fail(400, 'INVALID_REQUEST', '请提交有效的练习答案。'); }
  if (!ATTEMPT_PATTERN.test(body.attempt_id || '') || typeof body.answer !== 'string' || !body.answer.trim() || body.answer.length > 200) {
    return fail(400, 'INVALID_REQUEST', '请提交有效的练习答案。');
  }
  let spec=null;
  if(body.exercise_token){try{spec=await resolvePracticeExercise(body.exercise_token,env,session);}catch(cause){return fail(cause?.message==='STALE_EXERCISE'?409:400,cause?.message==='STALE_EXERCISE'?'STALE_EXERCISE':'INVALID_EXERCISE',cause?.message==='STALE_EXERCISE'?'练习内容已更新，请重新加载。':'练习标识无效或已被修改。');}body.content_type=spec.content_type;body.content_id=spec.content_id;}
  if(spec?.choices&&!spec.choices.some(choice=>normalizeAnswer(choice,spec.language)===normalizeAnswer(body.answer,spec.language)))return fail(400,'INVALID_EXERCISE','答案不属于这道练习，请重新加载。');
  if (!['vocabulary', 'grammar'].includes(body.content_type) || !ID_PATTERN.test(body.content_id || '')) return fail(400, 'INVALID_REQUEST', '请提交有效的练习答案。');
  const existing = spec
    ? await env.DB.prepare(`SELECT content_type,content_id,result,exercise_type,context_type,context_id FROM learning_attempts WHERE user_id = ? AND attempt_id = ?`).bind(session.user_id,body.attempt_id).first()
    : await env.DB.prepare(`SELECT content_type,content_id,result FROM learning_attempts WHERE user_id = ? AND attempt_id = ?`).bind(session.user_id, body.attempt_id).first();
  if (existing && (existing.content_type !== body.content_type || existing.content_id !== body.content_id)) {
    return fail(409, 'ATTEMPT_ID_CONFLICT', '这次练习标识已用于其他内容，请重新作答。');
  }
  if(existing&&spec&&(existing.exercise_type!==spec.exercise_type||existing.context_type!==spec.context_type||existing.context_id!==spec.context_id))return fail(409,'ATTEMPT_ID_CONFLICT','这次练习标识已用于其他题目或练习场景，请重新作答。');
  const item = await canonicalItem(env.CONTENT_DB || env.DB, body.content_type, body.content_id);
  if (!item) return fail(404, 'CONTENT_NOT_FOUND', '练习内容不存在或尚未发布。');
  if (!existing) {
    const expected=spec?.answer??item.answer,correct=normalizeAnswer(body.answer,item.language)===normalizeAnswer(expected,item.language);
    if(spec)await env.DB.prepare(`INSERT OR IGNORE INTO learning_attempts
      (user_id,attempt_id,content_type,content_id,result,created_at,exercise_type,context_type,context_id) VALUES(?,?,?,?,?,?,?,?,?)`)
      .bind(session.user_id,body.attempt_id,body.content_type,body.content_id,correct?1:0,now,spec.exercise_type,spec.context_type,spec.context_id).run();
    else await env.DB.prepare(`INSERT OR IGNORE INTO learning_attempts
      (user_id,attempt_id,content_type,content_id,result,created_at) VALUES(?,?,?,?,?,?)`)
      .bind(session.user_id, body.attempt_id, body.content_type, body.content_id, correct ? 1 : 0, now).run();
  }
  const [attempt, row] = await Promise.all([
    env.DB.prepare(`SELECT result FROM learning_attempts WHERE user_id = ? AND attempt_id = ?`)
      .bind(session.user_id, body.attempt_id).first(),
    progressRow(env.DB, session.user_id, body.content_type, body.content_id)
  ]);
  const correct=Boolean(attempt.result),expected=spec?.answer??item.answer;
  let remediationToken=null;
  if(spec&&!correct&&!existing)remediationToken=await createRemediationToken({uid:session.user_id,attempt_id:body.attempt_id,issued_at:now,expires_at:now+1800,language:item.language,content_type:spec.content_type,content_id:spec.content_id,exercise_type:spec.exercise_type,prompt:spec.prompt,submitted_answer:body.answer,canonical_answer:expected,result:'incorrect',safe_title:item.safe_title||null,safe_explanation:item.safe_explanation||null,lesson_id:spec.context_type==='lesson'?spec.context_id:null},env.PRACTICE_SECRET||env.AUTH_SECRET);
  return json({data: {correct, expected_answer: expected, submitted_answer: body.answer, ...(remediationToken?{remediation_token:remediationToken}:{}), ...(spec?{language:spec.language,content_type:spec.content_type,content_id:spec.content_id,exercise_type:spec.exercise_type,context:{type:spec.context_type,...(spec.context_id?{id:spec.context_id}:{})}}:{}), feedback:correct?'回答正确。':'答案不匹配，请对照参考答案再试一次。', progress: publicProgress(row), idempotent: Boolean(existing)}});
}

function idsFrom(url) {
  if ([...url.searchParams.keys()].some(key => !['ids', 'limit', 'offset'].includes(key))) throw new Error('INVALID_QUERY');
  if (url.searchParams.has('ids')) {
    const raw = url.searchParams.get('ids');
    if (!raw || url.searchParams.getAll('ids').length !== 1) throw new Error('INVALID_QUERY');
    const ids = [...new Set(raw.split(','))];
    if (!ids.length || ids.length > 100 || ids.some(id => !ID_PATTERN.test(id))) throw new Error('INVALID_QUERY');
    return {ids};
  }
  const limit = url.searchParams.has('limit') ? Number(url.searchParams.get('limit')) : 50;
  const offset = url.searchParams.has('offset') ? Number(url.searchParams.get('offset')) : 0;
  if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(offset) || offset < 0 || offset > 100000) throw new Error('INVALID_QUERY');
  return {limit, offset};
}

async function itemProgress(url, db, userId, type) {
  const query = idsFrom(url), vocabulary = type === 'vocabulary';
  const table = vocabulary ? 'vocabulary_progress' : 'grammar_progress';
  const key = vocabulary ? 'vocabulary_id' : 'grammar_id';
  let rows;
  if (query.ids) {
    const placeholders = query.ids.map(() => '?').join(',');
    rows = (await db.prepare(`SELECT * FROM ${table} WHERE user_id = ? AND ${key} IN (${placeholders})`)
      .bind(userId, ...query.ids).all()).results || [];
  } else {
    rows = (await db.prepare(`SELECT * FROM ${table} WHERE user_id = ? ORDER BY last_seen_at DESC LIMIT ? OFFSET ?`)
      .bind(userId, query.limit + 1, query.offset).all()).results || [];
  }
  const limit = query.ids ? rows.length : query.limit;
  return json({data: rows.slice(0, limit).map(row => ({id: row[key], ...publicProgress(row)})), pagination: query.ids ? null : {
    limit: query.limit, offset: query.offset, has_more: rows.length > query.limit,
    next_offset: rows.length > query.limit ? query.offset + query.limit : null
  }});
}

async function lessonRows(url, db, userId) {
  const query = idsFrom(url);
  let rows;
  if (query.ids) {
    const placeholders = query.ids.map(() => '?').join(',');
    rows = (await db.prepare(`SELECT * FROM lesson_progress WHERE user_id = ? AND lesson_id IN (${placeholders})`)
      .bind(userId, ...query.ids).all()).results || [];
  } else {
    rows = (await db.prepare(`SELECT * FROM lesson_progress WHERE user_id = ? ORDER BY last_activity_at DESC LIMIT ? OFFSET ?`)
      .bind(userId, query.limit + 1, query.offset).all()).results || [];
  }
  const limit = query.ids ? rows.length : query.limit;
  return json({data: rows.slice(0, limit).map(row => ({
    id: row.lesson_id, status: row.status, started_at: Number(row.started_at),
    completed_at: row.completed_at == null ? null : Number(row.completed_at),
    last_activity_at: Number(row.last_activity_at), last_section_key: row.last_section_key
  })), pagination: query.ids ? null : {limit: query.limit, offset: query.offset, has_more: rows.length > query.limit, next_offset: rows.length > query.limit ? query.offset + query.limit : null}});
}

async function summary(db, userId, now) {
  const settings=await readSettings(db,userId),todayStart=startOfLocalDay(now,settings.timezone||'UTC');
  const [vocabulary, grammar, lessons, today] = await Promise.all([
    db.prepare(`SELECT COUNT(*) AS studied,COALESCE(SUM(attempts),0) AS attempts,COALESCE(SUM(correct_count),0) AS correct_count,COALESCE(SUM(wrong_count),0) AS wrong_count FROM vocabulary_progress WHERE user_id=?`).bind(userId).first(),
    db.prepare(`SELECT COUNT(*) AS studied,COALESCE(SUM(attempts),0) AS attempts,COALESCE(SUM(correct_count),0) AS correct_count,COALESCE(SUM(wrong_count),0) AS wrong_count FROM grammar_progress WHERE user_id=?`).bind(userId).first(),
    db.prepare(`SELECT COUNT(*) AS studied,COALESCE(SUM(status='completed'),0) AS completed,COALESCE(SUM(status='in_progress'),0) AS in_progress FROM lesson_progress WHERE user_id=?`).bind(userId).first(),
    db.prepare(`SELECT COUNT(*) AS attempts FROM learning_attempts WHERE user_id=? AND created_at>=?`).bind(userId,todayStart).first()
  ]);
  const metrics = row => ({studied: Number(row.studied), attempts: Number(row.attempts), correct_count: Number(row.correct_count), wrong_count: Number(row.wrong_count), accuracy: Number(row.attempts) ? Math.round(Number(row.correct_count) / Number(row.attempts) * 100) : null});
  return json({data: {today: {attempts: Number(today.attempts),timezone:settings.timezone||'UTC',starts_at:todayStart}, vocabulary: metrics(vocabulary), grammar: metrics(grammar), lessons: {studied: Number(lessons.studied), completed: Number(lessons.completed), in_progress: Number(lessons.in_progress)}}});
}

async function recent(url, db, userId) {
  if ([...url.searchParams.keys()].some(key => key !== 'limit')) throw new Error('INVALID_QUERY');
  const limit = url.searchParams.has('limit') ? Number(url.searchParams.get('limit')) : 8;
  if (!Number.isInteger(limit) || limit < 1 || limit > 20) throw new Error('INVALID_QUERY');
  const result = await db.prepare(`SELECT * FROM (
    SELECT 'vocabulary' AS type,p.vocabulary_id AS id,v.lemma AS title,v.language AS language,p.last_seen_at AS activity_at,CASE WHEN p.last_result=1 THEN 'correct' ELSE 'wrong' END AS result,NULL AS status,NULL AS last_section_key
      FROM vocabulary_progress p JOIN v2_vocabulary_items v ON v.id=p.vocabulary_id WHERE p.user_id=?
    UNION ALL
    SELECT 'grammar',p.grammar_id,g.title_zh,g.language,p.last_seen_at,CASE WHEN p.last_result=1 THEN 'correct' ELSE 'wrong' END,NULL,NULL
      FROM grammar_progress p JOIN v2_grammar_points g ON g.id=p.grammar_id WHERE p.user_id=?
    UNION ALL
    SELECT 'lesson',p.lesson_id,l.title,l.language,p.last_activity_at,NULL,p.status,p.last_section_key
      FROM lesson_progress p JOIN lesson_units l ON l.id=p.lesson_id WHERE p.user_id=?
  ) ORDER BY activity_at DESC,type,id LIMIT ?`).bind(userId, userId, userId, limit).all();
  return json({data: (result.results || []).map(row => ({...row, activity_at: Number(row.activity_at)}))});
}

function reviewQuery(url) {
  if ([...url.searchParams.keys()].some(key => !['type', 'limit'].includes(key))) throw new Error('INVALID_QUERY');
  const type = url.searchParams.get('type') || 'all';
  const limit = url.searchParams.has('limit') ? Number(url.searchParams.get('limit')) : 20;
  if (!['all', 'vocabulary', 'grammar'].includes(type) || !Number.isInteger(limit) || limit < 1 || limit > 50 ||
      url.searchParams.getAll('type').length > 1 || url.searchParams.getAll('limit').length > 1) throw new Error('INVALID_QUERY');
  return {type, limit};
}

const reviewItem = row => ({
  type: row.type,
  id: row.id,
  language: row.language,
  prompt: row.prompt,
  next_review_at: Number(row.next_review_at),
  overdue_seconds: Number(row.overdue_seconds),
  progress: {
    attempts: Number(row.attempts),
    correct_count: Number(row.correct_count),
    wrong_count: Number(row.wrong_count),
    correct_streak: Number(row.correct_streak),
    review_stage: Number(row.review_stage),
    review_count: Number(row.review_count),
    lapse_count: Number(row.lapse_count),
    current_interval_seconds: Number(row.current_interval_seconds)
  }
});

async function reviewQueue(url, db, userId, now) {
  const {type, limit} = reviewQuery(url), reads = [];
  if (type !== 'grammar') reads.push(db.prepare(`SELECT 'vocabulary' AS type,p.vocabulary_id AS id,v.language,
      COALESCE((SELECT s.meaning_zh FROM v2_vocabulary_senses s WHERE s.item_id=p.vocabulary_id ORDER BY s.sort_order,s.id LIMIT 1),'词汇') AS prompt,
      p.next_review_at,? - p.next_review_at AS overdue_seconds,p.attempts,p.correct_count,p.wrong_count,p.correct_streak,
      p.review_stage,p.review_count,p.lapse_count,p.current_interval_seconds
    FROM vocabulary_progress p JOIN v2_vocabulary_items v ON v.id=p.vocabulary_id
    WHERE p.user_id=? AND p.next_review_at IS NOT NULL AND p.next_review_at<=? AND v.publication_state='published'
    ORDER BY p.next_review_at,p.vocabulary_id LIMIT ?`).bind(now, userId, now, limit).all());
  if (type !== 'vocabulary') reads.push(db.prepare(`SELECT 'grammar' AS type,p.grammar_id AS id,g.language,g.title_zh AS prompt,
      p.next_review_at,? - p.next_review_at AS overdue_seconds,p.attempts,p.correct_count,p.wrong_count,p.correct_streak,
      p.review_stage,p.review_count,p.lapse_count,p.current_interval_seconds
    FROM grammar_progress p JOIN v2_grammar_points g ON g.id=p.grammar_id
    WHERE p.user_id=? AND p.next_review_at IS NOT NULL AND p.next_review_at<=? AND g.publication_state='published'
    ORDER BY p.next_review_at,p.grammar_id LIMIT ?`).bind(now, userId, now, limit).all());
  const rows = (await Promise.all(reads)).flatMap(result => result.results || [])
    .sort((a, b) => Number(a.next_review_at) - Number(b.next_review_at) || a.type.localeCompare(b.type) || a.id.localeCompare(b.id))
    .slice(0, limit);
  return json({data: rows.map(reviewItem), meta: {server_time: now, type, limit, returned: rows.length}});
}

async function reviewSummary(url, db, userId, now) {
  if ([...url.searchParams.keys()].length) throw new Error('INVALID_QUERY');
  return json({data: await getReviewSnapshot(db, userId, now)});
}

async function publishedLesson(db, id) {
  return db.prepare(`SELECT id,title,language,stage FROM lesson_units WHERE id=? AND status='published'`).bind(id).first();
}

async function lessonMutation(request, env, session, id, action, now) {
  if (!ID_PATTERN.test(id)) return fail(400, 'INVALID_REQUEST', '课程编号无效。');
  const lesson = await publishedLesson(env.CONTENT_DB || env.DB, id);
  if (!lesson) return fail(404, 'LESSON_NOT_FOUND', '课程不存在或尚未发布。');
  let body = {};
  try { body = await readBody(request, new Set(action === 'position' ? ['section_key'] : [])); }
  catch { return fail(400, 'INVALID_REQUEST', '课程进度请求无效。'); }
  let changed = 0;
  if (action === 'start') {
    changed = countChanges(await env.DB.prepare(`INSERT OR IGNORE INTO lesson_progress
      (user_id,lesson_id,status,started_at,completed_at,last_activity_at,last_section_key)
      VALUES(?,?,'in_progress',?,NULL,?,'overview')`).bind(session.user_id, id, now, now).run());
  } else if (action === 'position') {
    if (!SECTION_KEYS.has(body.section_key)) return fail(400, 'INVALID_SECTION', '课程位置无效。');
    changed = countChanges(await env.DB.prepare(`UPDATE lesson_progress SET last_section_key=?,last_activity_at=?
      WHERE user_id=? AND lesson_id=? AND status='in_progress' AND last_section_key<>?`)
      .bind(body.section_key, now, session.user_id, id, body.section_key).run());
  } else {
    const prior=await env.DB.prepare('SELECT * FROM lesson_progress WHERE user_id=? AND lesson_id=?').bind(session.user_id,id).first();
    if(prior?.status==='completed')return json({data:{id,status:prior.status,started_at:Number(prior.started_at),completed_at:Number(prior.completed_at),last_activity_at:Number(prior.last_activity_at),last_section_key:prior.last_section_key,changed:false,grandfathered:true}});
    const evidence=await lessonEvidence(env.DB,session.user_id,id);
    if(!evidence)return fail(404,'LESSON_NOT_FOUND','课程不存在或尚未发布。');
    if(!evidence.eligible)return json({error:{code:'LESSON_PRACTICE_REQUIRED',message:`还需完成 ${Math.max(evidence.remaining_items,evidence.remaining_attempts)} 项本课练习后才能完成课程。`,evidence}},409);
    changed = countChanges(await env.DB.prepare(`INSERT INTO lesson_progress
      (user_id,lesson_id,status,started_at,completed_at,last_activity_at,last_section_key)
      VALUES(?,?,'completed',?,?,?,'practice')
      ON CONFLICT(user_id,lesson_id) DO UPDATE SET status='completed',completed_at=?,last_activity_at=?,last_section_key='practice'
      WHERE lesson_progress.status<>'completed'`)
      .bind(session.user_id, id, now, now, now, now, now).run());
  }
  const row = await env.DB.prepare('SELECT * FROM lesson_progress WHERE user_id=? AND lesson_id=?').bind(session.user_id, id).first();
  if (!row && action === 'position') return fail(409, 'LESSON_NOT_STARTED', '请先打开课程再保存位置。');
  return json({data: {id, status: row.status, started_at: Number(row.started_at), completed_at: row.completed_at == null ? null : Number(row.completed_at), last_activity_at: Number(row.last_activity_at), last_section_key: row.last_section_key, changed: Boolean(changed)}});
}

const defaults = {now: () => Math.floor(Date.now() / 1000), session: getAuthenticatedSession};

export async function progress(request, env, overrides = {}) {
  const services = {...defaults, ...overrides};
  if (!env.DB || !env.CONTENT_DB) return fail(503, 'PROGRESS_UNAVAILABLE', '学习记录服务暂时不可用。');
  const url = new URL(request.url);
  try {
    const session = await services.session(request, env, {touch: false});
    if (!session) return fail(401, 'AUTH_REQUIRED', '登录后才能保存和查看学习记录。');
    const isWrite = request.method === 'POST';
    if (isWrite && !sameOrigin(request)) return fail(403, 'ORIGIN_REJECTED', '请求来源无效，请刷新页面后重试。');
    if (url.pathname === '/api/learning/attempt') {
      if (!isWrite) return fail(405, 'METHOD_NOT_ALLOWED', '请使用 POST。', {Allow: 'POST'});
      return await recordAttempt(request, env, session, services.now());
    }
    if (url.pathname === '/api/practice/session') {
      if (request.method !== 'GET') return fail(405, 'METHOD_NOT_ALLOWED', '请使用 GET。', {Allow: 'GET'});
      return json(await practiceSession(url, env, session));
    }
    const lessonMatch = url.pathname.match(/^\/api\/lessons\/([^/]+)\/(start|position|complete)$/);
    if (lessonMatch) {
      if (!isWrite) return fail(405, 'METHOD_NOT_ALLOWED', '请使用 POST。', {Allow: 'POST'});
      return await lessonMutation(request, env, session, decodeURIComponent(lessonMatch[1]), lessonMatch[2], services.now());
    }
    if (request.method !== 'GET') return fail(405, 'METHOD_NOT_ALLOWED', '请使用 GET。', {Allow: 'GET'});
    if (url.pathname === '/api/review/summary') return await reviewSummary(url, env.DB, session.user_id, services.now());
    if (url.pathname === '/api/review/queue') return await reviewQueue(url, env.DB, session.user_id, services.now());
    if (url.pathname === '/api/recommendations') return json({data: await recommendationData(url, env, session.user_id, services.now())});
    if (url.pathname === '/api/progress/summary') return await summary(env.DB, session.user_id, services.now());
    if (url.pathname === '/api/progress/recent') return await recent(url, env.DB, session.user_id);
    if (url.pathname === '/api/progress/vocabulary') return await itemProgress(url, env.DB, session.user_id, 'vocabulary');
    if (url.pathname === '/api/progress/grammar') return await itemProgress(url, env.DB, session.user_id, 'grammar');
    if (url.pathname === '/api/progress/lessons') return await lessonRows(url, env.DB, session.user_id);
    return fail(404, 'NOT_FOUND', '学习记录接口不存在。');
  } catch (cause) {
    if (cause?.message === 'INVALID_QUERY') return fail(400, 'INVALID_REQUEST', '查询参数无效。');
    if (cause?.message === 'LESSON_NOT_FOUND') return fail(404, 'LESSON_NOT_FOUND', '课程不存在或尚未发布。');
    console.error('[progress] request failed', cause instanceof Error ? cause.name : 'UnknownError');
    return fail(500, 'PROGRESS_ERROR', '学习记录暂时不可用。');
  }
}

export const progressPolicy = Object.freeze({sectionKeys: [...SECTION_KEYS], maxBulkIds: 100, maxReviewQueue: 50,
  srsIntervals: [600, 86400, 259200, 604800, 1209600, 2592000, 5184000],
  state: 'familiar requires >=3 attempts, >=80% accuracy, and a correct streak >=2'});
