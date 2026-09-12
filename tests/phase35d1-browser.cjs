const assert=require('node:assert/strict');
const {chromium}=require('playwright');

const base=process.env.BASE_URL||'http://127.0.0.1:8800';
const generated=[
 {sentence:'I might cook tonight.',meaning:'我今晚可能会做饭。',note:''},
 {sentence:'She might call after work.',meaning:'她下班后可能会打电话。',note:''},
 {sentence:'We might take the bus.',meaning:'我们可能会坐公交车。',note:''},
 {sentence:'They might stay home.',meaning:'他们可能会待在家里。',note:''},
 {sentence:'He might need some help.',meaning:'他可能需要一些帮助。',note:'might 表示不太确定的可能性。'}
];

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const width of [360,390,430,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});page.on('pageerror',error=>errors.push(error.message));
  let requestBody=null;await page.route('**/api/ai/examples',async route=>{requestBody=route.request().postDataJSON();await route.fulfill({status:200,contentType:'application/json; charset=utf-8',body:JSON.stringify({data:{kind:'dynamic_examples',examples:generated},meta:{cache_hit:false,count:5}})});});
  await page.goto(`${base}/grammar-detail.html?id=en-might&lang=en`);await page.locator('[data-ai-examples]').waitFor();assert.equal(await page.getByRole('heading',{name:'正式例句'}).count(),1);assert.equal(await page.getByText('动态例句',{exact:true}).count(),1);assert.equal(await page.locator('body').textContent().then(x=>x.includes('deepseek-v4-flash')||x.includes('api.deepseek.com')||x.includes('DEEPSEEK_API_KEY')),false);
  await page.getByRole('button',{name:'✨ 更多例句'}).click();await page.locator('.dynamic-example').first().waitFor();assert.equal(await page.locator('.dynamic-example').count(),5);assert.deepEqual(requestBody,{grammar_id:'en-might',mode:'default'});assert.equal(await page.getByRole('button',{name:'换一组'}).count(),1);for(const height of await page.locator('.dynamic-examples button:visible,.dynamic-examples summary:visible').evaluateAll(elements=>elements.map(x=>x.getBoundingClientRect().height)))assert(height>=43,`small AI control at ${width}px: ${height}`);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}px`);assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:900}});await page.route('**/api/ai/examples',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:{kind:'dynamic_examples',examples:generated},meta:{cache_hit:false,count:5}})}));
 await page.goto(`${base}/lesson.html?id=en-s1-l1&lang=en&stage=1`);await page.locator('[data-step="grammar"]').click();await page.locator('[data-panel="grammar"] .lesson-item').first().click();const dialog=page.locator('#preview');await dialog.locator('[data-ai-examples]').waitFor();assert.equal(await dialog.locator('[data-ai-examples]').getAttribute('data-lesson-id'),'en-s1-l1');assert.equal(await dialog.getByRole('heading',{name:'正式例句'}).count(),1);assert.equal(await dialog.getByRole('button',{name:'✨ 更多例句'}).count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 const failurePage=await browser.newPage({viewport:{width:390,height:900}});await failurePage.route('**/api/ai/examples',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'AI_UNAVAILABLE',message:'暂时无法生成更多例句，请稍后再试。'}})}));await failurePage.goto(`${base}/grammar-detail.html?id=en-might&lang=en`);await failurePage.locator('[data-ai-examples]').waitFor();const curatedBefore=await failurePage.locator('.example').count();assert(curatedBefore>0);await failurePage.getByRole('button',{name:'✨ 更多例句'}).click();await failurePage.getByText('暂时无法生成更多例句，请稍后再试。',{exact:true}).waitFor();assert.equal(await failurePage.locator('.example').count(),curatedBefore);assert.equal(await failurePage.getByRole('heading',{name:'正式例句'}).count(),1);await failurePage.close();
 const external=[];page.on('request',request=>{if(!request.url().startsWith(base))external.push(request.url());});await page.goto(`${base}/ai.html?type=grammar&id=en-might&lang=en`);await page.getByRole('button',{name:'造句',exact:false}).first().click();await page.locator('#practice-input').fill('I might go later.');await page.getByRole('button',{name:'查看固定反馈示例'}).click();assert.deepEqual(external,[]);assert.equal(await page.locator('#feedback-content').isVisible(),true);
 await browser.close();console.log('Phase 3.5D.1 responsive Dynamic Examples UI and fixed AI Preview regression passed at 360, 390, 430, 768 and 1440px.');
})().catch(error=>{console.error(error);process.exit(1);});
