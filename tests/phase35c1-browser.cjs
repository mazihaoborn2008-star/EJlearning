const {chromium}=require('playwright');
const assert=require('node:assert/strict');

const base=process.env.BASE_URL||'http://127.0.0.1:8799';
const forbidden=['课程参考','待审','模型辅助初审','不代表官方逐词分类','实用 Stage','实用 Level','分类依据'];

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const go=async route=>{const response=await page.goto(base+route);assert.equal(response.status(),200,route);await page.locator('main h1').waitFor();assert.equal(await page.locator('#retry').count(),0,route);};
 try{
  await go('/academic.html');
  const landing=await page.locator('main').innerText();
  assert(landing.includes('选择学习目标'));assert(landing.includes('IELTS'));assert(landing.includes('JLPT'));
  assert(!landing.includes('Stage / Level'));assert(!landing.includes('待独立审校'));

  await go('/ielts.html?target=6.5&tab=vocabulary');
  assert.equal(await page.locator('.exam-tabs [aria-selected="true"]').innerText(),'词汇');
  assert.equal(await page.locator('.exam-card:not([data-domain="vocabulary"])').count(),0);
  const vocabText=await page.locator('main').innerText();
  assert(vocabText.includes('evaluate'));assert(vocabText.includes('评估'));
  for(const text of forbidden)assert(!vocabText.includes(text),text);
  assert.equal((vocabText.match(/IELTS 6\.5/g)||[]).length,1);

  await go('/ielts.html?target=6.5&tab=grammar');
  assert.equal(await page.locator('.exam-tabs [aria-selected="true"]').innerText(),'语法');
  assert.equal(await page.locator('.exam-card:not([data-domain="grammar"])').count(),0);
  await page.locator('.exam-tabs a').nth(2).focus();await page.keyboard.press('Enter');
  await page.waitForURL(/tab=sentences/);assert.equal(await page.locator('.exam-tabs [aria-selected="true"]').innerText(),'句子与表达');

  await go('/jlpt.html?level=N3&tab=vocabulary');
  assert(await page.locator('.exam-card').count()>0);
  for(const tab of ['grammar','sentences']){await go(`/jlpt.html?level=N3&tab=${tab}`);assert(await page.locator('.exam-card').count()>0);assert.equal(await page.locator(`.exam-card:not([data-domain="${tab}"])`).count(),0);}

  await go('/ielts.html?target=6.5&tab=vocabulary&search=evaluate&part_of_speech=verb');
  assert.equal(await page.locator('.exam-card').count(),1);assert.equal(await page.locator('input[name="search"]').inputValue(),'evaluate');assert.equal(await page.locator('select[name="part_of_speech"]').inputValue(),'verb');

  await go('/vocabulary-detail.html?id=en-c-725');
  const detailText=await page.locator('main').innerText();for(const text of forbidden)assert(!detailText.includes(text),`detail ${text}`);
  await go('/sentences.html?lang=en&topic=body');assert.equal(await page.locator('select[name="topic"] option:checked').innerText(),'身体 / 身体部位');
  await go('/sentences.html?lang=en&topic=health');assert.equal(await page.locator('select[name="topic"] option:checked').innerText(),'健康 / 身体状态');

  for(const width of [360,390,430,1440]){
   await page.setViewportSize({width,height:760});
   for(const route of ['/academic.html','/ielts.html?target=6.5&tab=vocabulary','/ielts.html?target=6.5&tab=grammar','/ielts.html?target=6.5&tab=sentences','/jlpt.html?level=N3&tab=vocabulary','/vocabulary.html?lang=en&stage=3','/grammar.html?lang=ja&level=3','/sentences.html?lang=ja&topic=health']){
    await go(route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} ${route}`);
   }
   await go('/ielts.html?target=6.5&tab=vocabulary');
   for(const box of await page.locator('.exam-tabs a').evaluateAll(as=>as.map(a=>a.getBoundingClientRect().height)))assert(box>=44,`tab target ${width}`);
  }

  const scalePage=await browser.newPage({viewport:{width:390,height:600}});
  const sample={id:'mock-align',framework_id:'IELTS',target:'6.5',language:'en',vocabulary_id:'en-c-725',grammar_id:null,expression_id:null,status:'draft',title:'evaluate',content_id:'en-c-725',domain:'vocabulary',meaning_zh:'评估',ipa:'ɪˈvæljueɪt',reading:null,part_of_speech:'verb',tags:['Speaking','Writing','Usage']};
  await scalePage.route('**/api/v2/academic/alignments?*',async route=>{const u=new URL(route.request().url()),offset=Number(u.searchParams.get('offset')||0),limit=Number(u.searchParams.get('limit')||24),total=48,count=Math.max(0,Math.min(limit,total-offset));await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:Array.from({length:count},(_,i)=>({...sample,id:`mock-${offset+i}`,title:`evaluate ${offset+i+1}`})),pagination:{limit,offset,has_more:offset+count<total,next_offset:offset+count<total?offset+count:null}})});});
  await scalePage.goto(base+'/ielts.html?target=6.5&tab=vocabulary&search=scale&part_of_speech=verb');await scalePage.locator('main h1').waitFor();
  assert.equal(await scalePage.locator('.exam-card').count(),24);assert.equal(await scalePage.locator('.exam-card:not([data-domain="vocabulary"])').count(),0);
  await scalePage.getByRole('button',{name:'加载更多'}).click();await scalePage.waitForFunction(()=>document.querySelectorAll('.exam-card').length===48);assert.equal(await scalePage.locator('.exam-card').count(),48);
  await scalePage.locator('.exam-card').nth(40).scrollIntoViewIfNeeded();const before=await scalePage.evaluate(()=>scrollY);
  await scalePage.locator('.exam-card').nth(40).click();await scalePage.locator('#lesson-detail[open]').waitFor();assert((await scalePage.getByRole('button',{name:/返回词汇/}).boundingBox()).height>=44);
  assert.equal(await scalePage.locator('input[name="search"]').inputValue(),'scale');assert.equal(await scalePage.locator('select[name="part_of_speech"]').inputValue(),'verb');
  await scalePage.goBack();await scalePage.waitForFunction(()=>!document.querySelector('#lesson-detail')?.open);assert.equal(await scalePage.locator('.exam-card').count(),48);assert.equal(await scalePage.locator('.exam-tabs [aria-selected="true"]').innerText(),'词汇');assert.equal(await scalePage.locator('input[name="search"]').inputValue(),'scale');assert.equal(await scalePage.locator('select[name="part_of_speech"]').inputValue(),'verb');assert(Math.abs((await scalePage.evaluate(()=>scrollY))-before)<=2);
  await scalePage.goForward();await scalePage.locator('#lesson-detail[open]').waitFor();
  await scalePage.getByRole('button',{name:/返回词汇/}).click();await scalePage.waitForFunction(()=>!document.querySelector('#lesson-detail')?.open);
  await scalePage.close();
  assert.deepEqual(errors,[]);
  console.log('Phase 3.5C.1 learner UX browser acceptance passed');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
