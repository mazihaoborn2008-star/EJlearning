// Compatibility navigation only. Does not read or write learner progress.
const key='yanjian.legacyReturn.v1';
const pages=new Set(['/','/index.html','/vocabulary.html','/vocabulary-detail.html','/grammar.html','/grammar-detail.html','/sentences.html','/sentence.html','/academic.html','/ielts.html','/jlpt.html','/ai.html','/progress.html']);
function safeReturn(value){
 try{const u=new URL(value,location.origin);return u.origin===location.origin&&pages.has(u.pathname)&&!u.username&&!u.password?u.pathname+u.search+u.hash:'/';}catch{return '/';}
}
const query=new URLSearchParams(location.search);
let target='/';
if(query.has('return'))target=safeReturn(query.get('return'));
else {
 try{const previous=new URL(document.referrer);if(previous.origin===location.origin&&previous.pathname.startsWith('/legacy/'))target=safeReturn(sessionStorage.getItem(key)||'/');}catch{}
}
try{sessionStorage.setItem(key,target);}catch{}
document.querySelector('#return-v2').href=target;
document.querySelector('#return-v2').dataset.ready='true';
// Preserve the return route through normal navigation; JS-driven legacy flows
// retain the same tab's route via the same-origin legacy referrer above.
function decorate(){for(const a of document.querySelectorAll('a[href]')){const u=new URL(a.href,location.href);if(u.origin===location.origin&&u.pathname.startsWith('/legacy/')){u.searchParams.set('return',target);if(a.href!==u.href)a.href=u.href;}}}
decorate();new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
