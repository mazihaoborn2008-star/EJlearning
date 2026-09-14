import {getAuthenticatedSession} from './auth-4a.js';

const LANGUAGES=new Set(['en','ja']);
const json=(body,status=200,headers={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const fail=(status,code,message,headers)=>json({error:{code,message}},status,headers);

function sameOrigin(request){
 const url=new URL(request.url),origin=request.headers.get('origin'),site=request.headers.get('sec-fetch-site');
 return origin===url.origin&&(!site||['same-origin','none'].includes(site));
}

export function validTimeZone(value){
 if(typeof value!=='string'||!value||value.length>64||/^(?:[+-]\d|(?:UTC|GMT)[+-]|Etc\/GMT[+-])/i.test(value))return false;
 try{new Intl.DateTimeFormat('en-US',{timeZone:value}).format(0);return true;}catch{return false;}
}

export function startOfLocalDay(nowSeconds,timeZone='UTC'){
 const instant=new Date(nowSeconds*1000),parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(instant).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));
 const localMidnight=Date.UTC(parts.year,parts.month-1,parts.day)/1000;
 const offsetAt=value=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(value*1000)).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));return Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)/1000-value;};
 let guess=localMidnight-offsetAt(nowSeconds);guess=localMidnight-offsetAt(guess);return Math.floor(guess);
}

export async function readSettings(db,userId){
 try{const row=await db.prepare('SELECT preferred_learning_language,timezone,updated_at FROM user_settings WHERE user_id=?').bind(userId).first();return {preferred_learning_language:row?.preferred_learning_language||null,timezone:row?.timezone||null,updated_at:row?.updated_at==null?null:Number(row.updated_at)};}
 catch{return {preferred_learning_language:null,timezone:null,updated_at:null};}
}

async function patchSettings(request,env,session,now){
 if(!sameOrigin(request))return fail(403,'ORIGIN_REJECTED','请求来源无效，请刷新页面后重试。');
 if(!/^application\/json(?:\s*;|\s*$)/i.test(request.headers.get('content-type')||''))return fail(415,'UNSUPPORTED_MEDIA_TYPE','请提交 JSON。');
 let body;try{body=await request.json();}catch{return fail(400,'INVALID_REQUEST','设置请求无效。');}
 const allowed=new Set(['preferred_learning_language','timezone']);
 if(!body||typeof body!=='object'||Array.isArray(body)||!Object.keys(body).length||Object.keys(body).some(k=>!allowed.has(k)))return fail(400,'INVALID_REQUEST','设置字段无效。');
 if(Object.hasOwn(body,'preferred_learning_language')&&body.preferred_learning_language!==null&&!LANGUAGES.has(body.preferred_learning_language))return fail(400,'INVALID_LANGUAGE','学习语言无效。');
 if(Object.hasOwn(body,'timezone')&&body.timezone!==null&&!validTimeZone(body.timezone))return fail(400,'INVALID_TIMEZONE','请选择有效的 IANA 时区。');
 const current=await readSettings(env.DB,session.user_id),next={...current,...body};
 if(next.preferred_learning_language===current.preferred_learning_language&&next.timezone===current.timezone)return json({data:{...current,changed:false}});
 await env.DB.prepare(`INSERT INTO user_settings(user_id,preferred_learning_language,timezone,updated_at) VALUES(?,?,?,?)
   ON CONFLICT(user_id) DO UPDATE SET preferred_learning_language=excluded.preferred_learning_language,timezone=excluded.timezone,updated_at=excluded.updated_at`)
  .bind(session.user_id,next.preferred_learning_language,next.timezone,now).run();
 return json({data:{preferred_learning_language:next.preferred_learning_language,timezone:next.timezone,updated_at:now,changed:true}});
}

export async function settings(request,env,overrides={}){
 const now=(overrides.now||(()=>Math.floor(Date.now()/1000)))(),session=await (overrides.session||getAuthenticatedSession)(request,env,{touch:false});
 if(!session)return fail(401,'AUTH_REQUIRED','登录后才能查看或保存学习设置。');
 const url=new URL(request.url);if(url.search)return fail(400,'INVALID_REQUEST','设置接口不接受查询参数。');
 try{
  if(request.method==='GET')return json({data:await readSettings(env.DB,session.user_id)});
  if(request.method==='PATCH')return patchSettings(request,env,session,now);
  return fail(405,'METHOD_NOT_ALLOWED','请使用 GET 或 PATCH。',{Allow:'GET, PATCH'});
 }catch(cause){console.error('[settings] request failed',cause instanceof Error?cause.name:'UnknownError');return fail(500,'SETTINGS_ERROR','学习设置暂时不可用。');}
}
