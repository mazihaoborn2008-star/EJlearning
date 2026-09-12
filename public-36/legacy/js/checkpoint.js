let checkpointTopic=new URLSearchParams(location.search).get('topic');
appReady.then(ready=>{if(ready)checkpointLanding();}).catch(e=>contentError(e));
function checkpointLanding(){
 if(!topics.some(t=>t.id===checkpointTopic))checkpointTopic=topics[0].id;
 testLang=['en','ja'].includes(new URLSearchParams(location.search).get('lang'))?new URLSearchParams(location.search).get('lang'):'en';
 document.querySelector('main').innerHTML=`<section class="page-intro"><span class="eyebrow">把学过的表达用起来</span><h1>主题小测</h1><p>8 道客观选择题，找出需要再熟悉的学习项。答对不会自动把整个主题标为已掌握。</p></section><section class="panel"><label>学习主题<select id="checkpoint-topic">${topics.map(t=>`<option value="${t.id}" ${checkpointTopic===t.id?'selected':''}>${escapeHtml(t.name)}</option>`).join('')}</select></label><label>测试语言<select id="checkpoint-lang"><option value="en" ${testLang==='en'?'selected':''}>English</option><option value="ja" ${testLang==='ja'?'selected':''}>日本語</option></select></label><button class="primary" id="start-checkpoint">开始主题小测 →</button></section>`;
 document.querySelector('#start-checkpoint').onclick=async()=>{checkpointTopic=document.querySelector('#checkpoint-topic').value;testLang=document.querySelector('#checkpoint-lang').value;loading('正在准备主题小测…');try{session=await post('/checkpoint/start',{lang:testLang,topic:checkpointTopic});selected=null;renderAssessment('checkpoint');}catch(e){contentError(e,checkpointLanding);}};
}
function finishCheckpoint(r){
 const previous=state.checkpoints[testLang][r.topic]?.weakConcepts||[];
 state.weak[testLang]=[...new Set([...state.weak[testLang].filter(id=>!previous.includes(id)),...r.weakConcepts])];
 for(const id of r.weakConcepts)state.mastery[testLang][id]='review';
 state.checkpoints[testLang][r.topic]={...r,date:new Date().toISOString()};save();
 document.querySelector('main').innerHTML=`<section class="panel"><span class="eyebrow">${escapeHtml(topicName(r.topic))} · ${testLang==='en'?'English':'日本語'}</span><h1>小测完成</h1><strong class="big-number">${r.percentage}<small>%</small></strong><p>${r.score} / ${r.total} 题正确。这是本次小测结果，不是整个主题的永久掌握认证。</p><h2>建议再熟悉</h2><div class="review-list">${r.weakConcepts.map(id=>`<a href="learn.html?id=${id}&lang=${testLang}">${escapeHtml(concepts.find(c=>c.id===id)?.zh||'学习项')} →</a>`).join('')||'<p>本次没有发现薄弱项，可以选择更有挑战的内容。</p>'}</div><p>仅更新${testLang==='en'?'英语':'日语'}的复习记录；另一种语言保持原有进度。</p><a class="primary link-button" href="index.html">查看更新后的推荐 →</a><a class="text-link" href="progress.html">查看主题进度 →</a></section>`;
}
