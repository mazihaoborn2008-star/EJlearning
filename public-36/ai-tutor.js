import {$,esc,url,langName,badge,heading} from './shared.js';

const makeSessionId=()=>{const bytes=new Uint8Array(18);crypto.getRandomValues(bytes);return [...bytes].map(x=>x.toString(16).padStart(2,'0')).join('');};
const quickActions={en:[['Explain','请简洁解释当前内容。'],['Correct me','请纠正这句话，并说明关键错误：'],['More examples','请结合当前内容再给我几个简短例句。'],['Make it natural','请把这句话改得更自然：']],ja:[['解説','请简洁讲解当前内容。'],['添削','请帮我添削这句话，并说明助词、活用或语体问题：'],['例文','请结合当前内容再给我几个自然例句。'],['もっと自然に','请把这句话改成更自然的日语：']]};

export function renderTutor({language,context=null,label='',returnHref=''}){
 localStorage.setItem('yanjian.ai.language.v1',language);
 const signature=context?JSON.stringify(context):'standalone',sessionKey='yanjian.ai.session.v1:'+language+':'+signature;
 let sessionId=sessionStorage.getItem(sessionKey);if(!sessionId){sessionId=makeSessionId();sessionStorage.setItem(sessionKey,sessionId);}
 const switcher=`<nav class="ai-language" aria-label="Tutor 学习语言"><a class="${language==='en'?'active':''}" ${language==='en'?'aria-current="page"':''} href="${url('ai',{lang:'en'})}">English</a><a class="${language==='ja'?'active':''}" ${language==='ja'?'aria-current="page"':''} href="${url('ai',{lang:'ja'})}">日本語</a></nav>`;
 const contextChip=context?`<div class="tutor-context">${badge(langName(language))}<span>${esc(label)}</span>${returnHref?`<a href="${esc(returnHref)}">返回学习内容</a>`:''}</div>`:`<div class="tutor-context">${badge(langName(language))}<span>自由语言学习问答</span></div>`;
 $('#main').innerHTML=heading('AI Tutor','把问题留在当前语言里',language==='en'?'自然英文、语法、搭配与表达纠错；默认用简体中文解释。':'助词、活用、敬体 / 普通体与自然表达；默认用简体中文解释。')+switcher+contextChip+`<section class="tutor-shell"><div id="tutor-messages" class="tutor-messages" aria-live="polite" aria-label="对话"><div class="tutor-empty"><h2>${language==='en'?'English Tutor':'日本語 Tutor'}</h2><p>${context?'我已经知道当前学习内容，可以直接问“给我几个例子”或“这个怎么用？”。':language==='en'?'可以问：这句话自然吗？为什么这里用 for？':'可以问：这里为什么用 に？普通体怎么说？'}</p></div></div><div class="tutor-shortcuts" aria-label="快捷操作">${quickActions[language].map(([name,text])=>`<button type="button" data-quick="${esc(text)}">${esc(name)}</button>`).join('')}</div><form id="tutor-form" class="tutor-composer"><label class="sr-only" for="tutor-input">输入语言学习问题</label><textarea id="tutor-input" maxlength="2000" rows="3" placeholder="${language==='en'?'输入英文句子或英语学习问题…':'输入日语句子或日语学习问题…'}" required></textarea><div class="tutor-compose-actions"><span id="tutor-status" role="status"></span><button id="new-conversation" type="button">新对话</button><button id="tutor-send" class="primary" type="submit">发送</button></div></form></section><p class="tutor-boundary">AI 仅用于语言学习问答，不会修改课程、掌握状态或学习进度。</p>`;
 const messages=$('#tutor-messages'),input=$('#tutor-input'),form=$('#tutor-form'),send=$('#tutor-send'),status=$('#tutor-status');let busy=false;
 const removeEmpty=()=>$('.tutor-empty',messages)?.remove();
 const addMessage=(role,text,failed=false)=>{removeEmpty();const article=document.createElement('article');article.className='tutor-message '+role+(failed?' failed':'');article.innerHTML=`<div class="tutor-message-role">${role==='user'?'你':language==='en'?'English Tutor':'日本語 Tutor'}</div><p>${esc(text)}</p>${failed?'<button class="retry-message" type="button">重试</button>':''}`;messages.append(article);messages.scrollTop=messages.scrollHeight;if(failed)$('.retry-message',article).onclick=()=>submitMessage(text,true,article);return article;};
 async function submitMessage(text,retry=false,failedNode=null){
  if(busy)return;const message=text.trim();if(!message)return;if(!retry)addMessage('user',message);failedNode?.remove();input.value='';busy=true;send.disabled=true;input.disabled=true;status.textContent='Tutor 正在回复…';
  try{const response=await fetch('/api/ai/tutor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,language,session_id:sessionId,...(context?{context}:{})})});let body;try{body=await response.json();}catch{throw Error('AI 暂时不可用，请稍后再试。');}if(!response.ok)throw Error(body.error?.message||'AI 暂时不可用，请稍后再试。');addMessage('assistant',body.data.message);
  }catch(error){addMessage('assistant',error.message||'AI 暂时不可用，请稍后再试。',true);}finally{busy=false;send.disabled=false;input.disabled=false;status.textContent='';input.focus();}
 }
 form.onsubmit=e=>{e.preventDefault();submitMessage(input.value);};
 input.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();form.requestSubmit();}};
 document.querySelectorAll('[data-quick]').forEach(button=>button.onclick=()=>{input.value=button.dataset.quick;input.focus();input.setSelectionRange(input.value.length,input.value.length);});
 $('#new-conversation').onclick=()=>{sessionId=makeSessionId();sessionStorage.setItem(sessionKey,sessionId);messages.innerHTML='<div class="tutor-empty"><h2>新对话</h2><p>已清除当前画面，可以开始新的语言学习问题。</p></div>';input.value='';input.focus();};
}
