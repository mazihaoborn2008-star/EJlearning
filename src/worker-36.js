import legacy from './worker.js';
import {v2} from './v2-35e2.js';
import {academic} from './academic-35e2.js';
import {lessons} from './lessons-35d.js';
import {dynamicExamples} from './ai-examples-35d1.js';
import {aiTutor} from './ai-tutor-36.js';

export default {
 scheduled:legacy.scheduled,
 async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(url.pathname==='/api/ai/tutor')return aiTutor(request,env,ctx);
  if(url.pathname==='/api/ai/examples')return dynamicExamples(request,env,ctx);
  if(url.pathname.startsWith('/api/v2/lessons'))return lessons(request,env.DB,env.CONTENT_DB);
  if(url.pathname.startsWith('/api/v2/academic'))return academic(request,env.CONTENT_DB);
  if(url.pathname.startsWith('/api/v2/'))return v2(request,env.CONTENT_DB);
  const legacyEnv={...env,DB:env.CONTENT_DB};
  if(url.pathname.startsWith('/api/'))return legacy.fetch(request,legacyEnv);
  if(url.pathname.startsWith('/legacy/api/')){url.pathname=url.pathname.slice(7);return legacy.fetch(new Request(url,request),legacyEnv);}
  if(url.pathname==='/'||url.pathname==='/legacy/')url.pathname+='index.html';
  const response=await env.ASSETS.fetch(new Request(url,request));
  const headers=new Headers(response.headers);
  headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'"+(url.pathname.startsWith('/legacy/')?" 'unsafe-inline'":"")+"; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  headers.set('X-Content-Type-Options','nosniff');
  return new Response(response.body,{status:response.status,headers});
 }
};
