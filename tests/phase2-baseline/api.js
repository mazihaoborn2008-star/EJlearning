// API content lives in memory only; there is intentionally no offline dataset fallback.
let topics=[],concepts=[],placementQuestions={};
const levelDescriptions=['从简短的日常表达开始，建立开口的信心。','能认出常用表达，可以练习简单的生活对话。','能理解更多情境，适合练习时间与动作的表达。','有较好的日常理解力，可以关注语气和表达习惯。','能理解多数测试情境，可以细看两种语言的差异。','本次测试表现熟练，可以用这些情境巩固自然表达。'];
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function api(path,options={}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
 try {const response=await fetch('/api'+path,{...options,signal:controller.signal});let body;try{body=await response.json();}catch{throw Error('内容服务返回异常，请重试。');}if(!response.ok)throw Error(body.error?.message||'内容加载失败，请重试。');return body.data;}
 catch(error){if(error.name==='AbortError')throw Error('连接超时，请检查网络后重试。');if(error instanceof TypeError)throw Error('无法连接内容服务，请检查网络后重试。');throw error;}
 finally{clearTimeout(timer);}
}
async function loadContent(){
 const [ts,cs]=await Promise.all([api('/topics'),api('/concepts')]);
 if(!Array.isArray(ts)||!ts.length||!Array.isArray(cs)||!cs.length||cs.some(c=>!c.en||!c.ja))throw Error('学习内容暂不可用，请稍后重试。');
 topics=ts;concepts=cs.map(c=>({id:c.id,topic:c.topic,zh:c.zh,en:c.en.text,ipa:c.en.ipa,enDifficulty:c.en.difficulty,enChunks:c.en.chunks,enGrammar:c.en.grammar,ja:c.ja.text,hiragana:c.ja.hiragana,jaReadings:c.ja.readings,jaDifficulty:c.ja.difficulty,jaChunks:c.ja.chunks,jaGrammar:c.ja.grammar,comparison:c.comparison}));
}
function loading(message='正在加载学习内容…'){document.querySelector('main').innerHTML=`<section class="panel" role="status"><p>${escapeHtml(message)}</p></section>`;}
function contentError(error,retry=()=>location.reload()){
 document.querySelector('main').innerHTML='<section class="panel" role="alert"><h1>暂时无法加载</h1><p id="api-error-message"></p><button id="api-retry" class="primary">重试</button></section>';
 document.querySelector('#api-error-message').textContent=error.message;document.querySelector('#api-retry').onclick=retry;
}
