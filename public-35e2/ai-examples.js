import {esc} from './shared.js';

export function dynamicExamplesPanel(grammarId,lessonId=''){
 return `<section class="card dynamic-examples" data-ai-examples data-grammar-id="${esc(grammarId)}" ${lessonId?`data-lesson-id="${esc(lessonId)}"`:''}><div class="dynamic-head"><div><span class="ai-example-label">动态例句</span><h2>想再看几个自然用法？</h2><p class="muted">临时生成的学习辅助，不会写入正式课程。</p></div><button class="primary" type="button" data-ai-mode="default">✨ 更多例句</button></div><div class="dynamic-status" data-ai-status aria-live="polite"></div><div data-ai-results hidden></div><div class="dynamic-actions" data-ai-actions hidden><button type="button" data-ai-mode="refresh">换一组</button><details><summary>调整难度</summary><div class="actions"><button type="button" data-ai-mode="simpler">简单一点</button><button type="button" data-ai-mode="harder">难一点</button></div></details></div></section>`;
}

const skeleton=()=>`<div class="dynamic-skeleton" aria-hidden="true">${Array.from({length:5},()=>'<span></span>').join('')}</div>`;
const renderExamples=(root,examples)=>{const results=root.querySelector('[data-ai-results]');results.innerHTML=examples.map(x=>`<article class="dynamic-example"><p lang="${root.dataset.grammarId.startsWith('ja-')?'ja':'en'}">${esc(x.sentence)}</p><p>${esc(x.meaning)}</p>${x.note?`<small>${esc(x.note)}</small>`:''}</article>`).join('');results.hidden=false;root.querySelector('[data-ai-actions]').hidden=false;};
async function generate(root,mode,button){
 const status=root.querySelector('[data-ai-status]'),results=root.querySelector('[data-ai-results]'),buttons=[...root.querySelectorAll('button[data-ai-mode]')];buttons.forEach(x=>x.disabled=true);results.hidden=false;results.innerHTML=skeleton();status.textContent='正在生成 5 条动态例句…';
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),22000);
 try{
  const body={grammar_id:root.dataset.grammarId,mode};if(root.dataset.lessonId)body.lesson_id=root.dataset.lessonId;
  const response=await fetch('/api/ai/examples',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});
  const payload=await response.json().catch(()=>null);if(!response.ok||!payload?.data?.examples?.length)throw Error('unavailable');renderExamples(root,payload.data.examples);status.textContent=`已生成 ${payload.data.examples.length} 条动态例句。`;
 }catch{results.hidden=true;results.innerHTML='';status.innerHTML='<span class="dynamic-error">暂时无法生成更多例句，请稍后再试。</span>';}
 finally{clearTimeout(timer);buttons.forEach(x=>x.disabled=false);button?.focus();}
}
export function bindDynamicExamples(scope=document){for(const root of scope.querySelectorAll('[data-ai-examples]')){if(root.dataset.bound)return;root.dataset.bound='true';root.addEventListener('click',event=>{const button=event.target.closest('button[data-ai-mode]');if(button)generate(root,button.dataset.aiMode,button);});}}
