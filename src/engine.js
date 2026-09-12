export const summaries=['能从简短的生存表达开始，练习问候与请求。','能理解简单日常互动，继续练习完整回应。','能描述日常状态和简单经历，适合连接前后信息。','能理解计划、解释和意见，适合练习语气与转折。','能分辨多数自然表达的语气，继续练习含蓄和礼貌。','能理解较细的会话区别，适合练习复杂情境中的准确表达。'];
export function estimate(history){
 const weights=Array.from({length:6},(_,i)=>history.reduce((v,h)=>{const p=.2+.78/(1+Math.exp((h.difficulty-(i+1)-.7)*1.7));return v*(h.correct?p:1-p);},1));
 const sum=weights.reduce((a,b)=>a+b,0),posterior=weights.map(w=>w/sum);
 const mean=posterior.reduce((s,p,i)=>s+p*(i+1),0),level=Math.max(1,Math.min(6,Math.round(mean)));
 const near=posterior.reduce((s,p,i)=>s+(Math.abs(i+1-level)<=1?p:0),0);
 const coverage=new Set(history.map(h=>h.difficulty)).size;
 const evidence=history.filter(h=>Math.abs(h.difficulty-level)<=1).length;
 const done=history.length>=18||(history.length>=8&&coverage>=2&&evidence>=5&&Math.max(...posterior)>=.68)||(history.length>=15&&near>=.88);
 return {level,mean,posterior,done,confidence:Math.max(...posterior)>=.68?'较稳定':'仍有不确定性'};
}
function hash(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
export function nextQuestion(pool,history,seed){
 const e=estimate(history),target=history.length?Math.max(1,Math.min(6,Math.round(e.mean)+(history.length%4===3?(e.mean<3.5?1:-1):0))):3;
 const used=new Set(history.map(h=>h.id)),counts={};for(const h of history)counts[h.topic]=(counts[h.topic]||0)+1;
 return pool.filter(q=>!used.has(q.id)).sort((a,b)=>Math.abs(a.difficulty-target)-Math.abs(b.difficulty-target)||(counts[a.topic]||0)-(counts[b.topic]||0)||hash(seed+a.id)-hash(seed+b.id))[0];
}
export function recommend(catalog,profile){
 const {lang,level=1,mastery={},recent=[],weak=[],last=null,topic=null}=profile;
 const difficulty=c=>c[lang].difficulty,learnedByTopic={},totalByTopic={};
 for(const c of catalog){totalByTopic[c.topic]=(totalByTopic[c.topic]||0)+1;if(mastery[c.id]==='learned')learnedByTopic[c.topic]=(learnedByTopic[c.topic]||0)+1;}
 const remaining=catalog.filter(c=>!topic||c.topic===topic),selected=[],topics={},types={};
 while(selected.length<6&&remaining.length){
  const target=selected.length===4?Math.max(1,level-1):selected.length===5?Math.min(6,level+1):level;
  const score=c=>{const m=mastery[c.id],delta=difficulty(c)-target;return 40-Math.abs(delta)*12+(m==='review'?22:m==='learning'?14:m==='learned'?-70:5)+(weak.includes(c.id)?28:0)+(last===c.id&&m!=='learned'?8:0)-(recent.includes(c.id)?18:0)+(learnedByTopic[c.topic]?4*(1-learnedByTopic[c.topic]/totalByTopic[c.topic]):0)-(topics[c.topic]||0)*18-(types[c.conceptType]||0)*3;};
  remaining.sort((a,b)=>score(b)-score(a)||a.id-b.id);const c=remaining.shift();topics[c.topic]=(topics[c.topic]||0)+1;types[c.conceptType]=(types[c.conceptType]||0)+1;
  selected.push({...c,reason:weak.includes(c.id)?'主题小测建议复习':mastery[c.id]==='review'?'你标记了待复习':mastery[c.id]==='learning'?'继续未完成的学习':difficulty(c)>level?'稍作挑战':difficulty(c)<level?'巩固基础':'适合当前水平'});
 }return {lang,level,items:selected};
}
