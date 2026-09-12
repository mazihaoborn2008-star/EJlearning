import baseline from './worker-35d.js';
import {dynamicExamples} from './ai-examples-35d1.js';

export default {
 async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(url.pathname==='/api/ai/examples')return dynamicExamples(request,env,ctx);
  return baseline.fetch(request,env,ctx);
 }
};
