export const $=(s,root=document)=>root.querySelector(s);
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const names={vocabulary:'词汇',grammar:'语法',sentences:'句子与表达'};
export const detailPath={vocabulary:'vocabulary-detail',grammar:'grammar-detail',sentences:'sentence'};
export const langName=l=>l==='ja'?'日本語':'English';
export const url=(page,params={})=>'/'+page+'.html'+(Object.keys(params).length?'?'+new URLSearchParams(params):'');
export const detail=(domain,id,lang)=>url(detailPath[domain],{id,...(lang?{lang}:{})});
export const badge=(text,cls='')=>`<span class="badge ${cls}">${esc(text)}</span>`;
export const aiLink=(domain,id,lang)=>`<a class="button" href="${esc(url('ai',{type:domain,id,lang}))}">用 AI 练习 <span class="badge preview">预览</span></a>`;
export const section=(title,body,cls='')=>body?`<section class="card ${cls}"><h2>${esc(title)}</h2>${body}</section>`:'';
export const reading=(text,segments=[])=>segments.length?segments.map(r=>r.reading?`<ruby>${esc(r.text)}<rt>${esc(r.reading)}</rt></ruby>`:esc(r.text)).join(''):esc(text);
export const relationNames={prerequisite:'建议先了解',related:'相关用法',contrast:'对比理解',commonly_confused:'容易混淆',near_synonym:'近义辨析',synonym:'近义关系',antonym:'反义关系',more_formal:'更正式',more_casual:'更随意'};
export const posNames={verb:'动词',noun:'名词',adverb:'副词',adjective:'形容词','adjectival noun':'な形容词','verb phrase':'动词短语','phrasal verb':'短语动词','prepositional phrase':'介词短语','noun phrase':'名词短语','fixed expression':'固定表达','proper noun':'专有名词',counter:'量词',interjection:'感叹词','adjective phrase':'形容词短语'};
export const posTaxonomy={
 en:[['noun','名词'],['verb','动词'],['adjective','形容词'],['adverb','副词'],['noun phrase','名词短语'],['verb phrase','动词短语'],['phrasal verb','短语动词'],['adjective phrase','形容词短语'],['prepositional phrase','介词短语'],['fixed expression','固定表达'],['proper noun','专有名词'],['interjection','感叹词']],
 ja:[['noun','名詞'],['verb','動詞'],['adjective','い形容詞'],['adjectival noun','な形容詞'],['adverb','副詞'],['counter','助数詞'],['noun phrase','名詞句'],['verb phrase','動詞句'],['fixed expression','定型表現'],['proper noun','固有名詞'],['interjection','感動詞']]
};
export const compactPos=(language,pos)=>language==='en'?({'noun':'n.','verb':'v.','adjective':'adj.','adverb':'adv.','noun phrase':'n. phr.','verb phrase':'v. phr.','phrasal verb':'phr. v.','adjective phrase':'adj. phr.','prepositional phrase':'prep. phr.','fixed expression':'expr.','proper noun':'prop. n.','interjection':'int.'}[pos]||pos):(Object.fromEntries(posTaxonomy.ja)[pos]||pos);
export const fullPos=(language,pos)=>Object.fromEntries(posTaxonomy[language]||[])[pos]||posNames[pos]||pos;
export const registerNames={neutral:'日常 / 中性',formal:'正式',casual:'随意'};
export async function api(path){const c=new AbortController(),timer=setTimeout(()=>c.abort(),12000);try{const r=await fetch('/api/v2/'+path,{signal:c.signal});if(!r.ok)throw Error(r.status===404?'没有找到这个学习内容。':'内容暂时无法加载。');return await r.json();}catch(e){if(e.name==='AbortError')throw Error('连接超时，请检查网络后重试。');if(e instanceof TypeError)throw Error('无法连接内容服务，请检查网络后重试。');throw e;}finally{clearTimeout(timer);}}
export function shell(active){
 // Label compatibility destinations and carry the current V2 route back.
 const labelLegacy=()=>{for(const a of document.querySelectorAll('a[href]')){const u=new URL(a.href,location.href);if(u.origin===location.origin&&u.pathname.startsWith('/legacy/')){u.searchParams.set('return',location.pathname+location.search+location.hash);if(a.href!==u.href)a.href=u.href;if(!a.textContent.includes('旧版学习（兼容）'))a.textContent='旧版学习（兼容） · '+a.textContent;}}};
 const labelLearningPath=()=>{if(active!=='home')return;const a=document.querySelector('.hero-copy .actions .primary');if(a&&(a.getAttribute('href')!=='/learn.html'||a.textContent!=='开始逐课学习 ↗')){a.href='/learn.html';a.textContent='开始逐课学习 ↗';}}
 labelLegacy();labelLearningPath();new MutationObserver(()=>{labelLegacy();labelLearningPath();}).observe(document.body,{childList:true,subtree:true});
 $('#header').innerHTML=`<div class="top"><a class="brand" href="/"><span class="brand-mark">言</span>言间</a><span class="muted">中文理解 · 自然表达</span><nav class="nav" aria-label="主要导航">${[['首页','/','home'],['学习','/learn.html','learn'],['学术 / 考试','/academic.html','academic'],['AI 学习','/ai.html','ai'],['我的学习','/progress.html','progress']].map(([n,h,k])=>`<a href="${h}" ${active===k?'aria-current="page"':''}>${n}</a>`).join('')}</nav></div>`;
 const d=$('#preview');$('.close',d).onclick=()=>d.close();d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();});
 d.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const controls=[...d.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(x=>!x.disabled&&!x.hidden),first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
}
export function heading(kicker,title,description){return `<div class="page-heading"><div class="eyebrow">${esc(kicker)}</div><h1>${esc(title)}</h1>${description?`<p>${esc(description)}</p>`:''}</div>`;}
export function domains(active){return `<nav class="tabs" aria-label="学习领域">${Object.entries(names).map(([k,v])=>`<a class="${active===k?'active':''}" ${active===k?'aria-current="page"':''} href="${url(k)}">${v}</a>`).join('')}</nav>`;}
export function languages(params,page){return `<div class="pills" aria-label="学习语言">${['en','ja'].map(l=>`<a href="${esc(url(page,{...params,lang:l,offset:'0'}))}" class="${(params.lang||'en')===l?'active':''}">${langName(l)}</a>`).join('')}</div>`;}
export function pagination(p,page,params){if(!p)return '';return `<nav class="pagination" aria-label="分页">${p.offset>0?`<a class="button" href="${esc(url(page,{...params,offset:String(Math.max(0,p.offset-p.limit))}))}">上一页</a>`:''}<span class="muted">第 ${Math.floor(p.offset/p.limit)+1} 页</span>${p.has_more?`<a class="button" href="${esc(url(page,{...params,offset:String(p.next_offset)}))}">下一页</a>`:''}</nav>`;}
export function empty(message='这个范围暂时没有内容。试试其他筛选条件。'){return `<div class="empty"><h2>还没有匹配的内容</h2><p>${esc(message)}</p><a class="button" href="${location.pathname}">清除筛选</a></div>`;}
export async function load(render){const main=$('#main');main.innerHTML='<p class="status" role="status">正在加载学习内容…</p>';try{await render();}catch(e){main.innerHTML=`<div class="error" role="alert"><h1>暂时无法打开</h1><p>${esc(e.message)}</p><button id="retry">重新加载</button><a class="button" href="/">返回首页</a></div>`;$('#retry').onclick=()=>load(render);}}
export const preview=html=>{$('#preview-body').innerHTML=html;$('#preview').showModal();};
export function relationCards(items,domain){return items.map(r=>{const id=r.direction==='incoming'?r.source_id:r.target_id;return `<a class="relation" href="${detail(domain,id)}">${badge(relationNames[r.type]||r.type)} <strong>${esc(r.other_label)}</strong><p>${esc(r.note_zh)}</p></a>`;}).join('');}
export function reverseCards(items){return items.map(s=>`<a class="reverse-card" href="${detail('sentences',s.unit_id,s.language)}"><strong>${esc(s.anchor_zh)}</strong><span lang="${s.language}">${esc(s.text)}</span></a>`).join('');}
export function legacyState(){try{const s=JSON.parse(localStorage.getItem('kotoba.phase3.v1')||localStorage.getItem('kotoba.phase1.v1')||'{}');return s&&typeof s==='object'&&!Array.isArray(s)?s:{};}catch{return {};}}

