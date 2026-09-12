const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8816';

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  for(const width of [360,390,430,768,1440]){
   const responsive=await browser.newPage({viewport:{width,height:900}}),errors=[];responsive.on('pageerror',error=>errors.push(error.message));
   await responsive.goto(base+'/ai.html?lang=ja');await responsive.locator('.tutor-shell').waitFor();assert.equal(await responsive.getByRole('link',{name:'日本語',exact:true}).getAttribute('aria-current'),'page');assert.equal(await responsive.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`horizontal overflow at ${width}px`);assert.deepEqual(errors,[]);await responsive.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});let calls=0;
  await page.addInitScript(()=>localStorage.setItem('kotoba.phase3.v1',JSON.stringify({sentinel:'phase36-progress-preserved'})));
  await page.route('**/api/ai/tutor',async route=>{calls++;const body=route.request().postDataJSON();assert.deepEqual(Object.keys(body).sort(),['language','message','session_id']);assert.equal(body.language,'en');if(calls===1)await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'AI_UNAVAILABLE',message:'AI 暂时不可用，请稍后再试。'}})});else await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:{kind:'tutor_message',message:'更自然：I really like this book.\nvery 不能直接修饰 like。'}})});});
  await page.goto(base+'/ai.html?lang=en');assert.equal(await page.getByRole('link',{name:'English',exact:true}).getAttribute('aria-current'),'page');assert(await page.getByRole('link',{name:'日本語',exact:true}).isVisible());assert(await page.getByRole('button',{name:'Make it natural'}).isVisible());
  await page.locator('#tutor-input').fill('I very like this book.');await page.getByRole('button',{name:'发送'}).click();await page.getByText('AI 暂时不可用，请稍后再试。').waitFor();await page.getByRole('button',{name:'重试'}).click();await page.getByText(/I really like this book/).waitFor();await page.getByRole('button',{name:'新对话'}).click();await page.getByText('已清除当前画面').waitFor();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kotoba.phase3.v1')).sentinel),'phase36-progress-preserved');await page.close();

  const contextPage=await browser.newPage({viewport:{width:390,height:844}});let sent;
  await contextPage.route('**/api/v2/vocabulary/en-choice',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:{id:'en-choice',language:'en',lemma:'choice'}})}));
  await contextPage.route('**/api/ai/tutor',route=>{sent=route.request().postDataJSON();return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:{kind:'tutor_message',message:'choice 常与 make 搭配。'}})});});
  await contextPage.goto(base+'/ai.html?type=vocabulary&id=en-choice&lang=en');await contextPage.getByText('Vocabulary: choice').waitFor();await contextPage.locator('#tutor-input').fill('这个词怎么用？');await contextPage.getByRole('button',{name:'发送'}).click();await contextPage.getByText(/make 搭配/).waitFor();assert.deepEqual(sent.context,{type:'vocabulary',id:'en-choice'});assert.deepEqual(Object.keys(sent).sort(),['context','language','message','session_id']);await contextPage.close();

  const journey=await browser.newPage({viewport:{width:768,height:900}});
  await journey.goto(base+'/lesson.html?id=en-s1-l1&lang=en&stage=1');await journey.locator('.lesson-ask-ai').first().waitFor({state:'attached'});const lessonLinks=await journey.locator('.lesson-ask-ai').evaluateAll(links=>links.map(link=>link.getAttribute('href')));assert(lessonLinks.some(link=>link.includes('focus_type=vocabulary')));assert(lessonLinks.some(link=>link.includes('focus_type=grammar')));assert(lessonLinks.some(link=>link.includes('focus_type=expression')));
  await journey.goto(base+'/vocabulary-detail.html?id=en-c-541&lang=en');const vocabularyLink=await journey.getByRole('link',{name:'问 AI'}).getAttribute('href');assert.match(vocabularyLink,/type=vocabulary&id=en-c-541&lang=en/);
  await journey.goto(base+'/grammar-detail.html?id=en-might&lang=en');const grammarLink=await journey.getByRole('link',{name:'问 AI'}).getAttribute('href');assert.match(grammarLink,/type=grammar&id=en-might&lang=en/);await journey.close();
  console.log(JSON.stringify({passed:true,widths:[360,390,430,768,1440],cases:['responsive Tutor shell','mobile standalone language and failure controls','canonical context request shape','lesson focus links','library Ask AI links','learner progress preserved']}));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
