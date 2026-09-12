const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8787';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:360,height:800}}),page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const old={levels:{en:{score:10,level:5,date:'2026-09-08'},ja:{score:3,level:1,date:'2026-09-08'}},mastery:{en:{8:'learned'},ja:{8:'review'}},last:8};
 await context.addInitScript(old=>{if(!localStorage.getItem('kotoba.phase1.v1'))localStorage.setItem('kotoba.phase1.v1',JSON.stringify(old));},old);
 let release;const gate=new Promise(r=>release=r);await page.route('**/api/concepts',async route=>{await gate;await route.continue();});
 await page.goto(base+'/index.html');await page.getByRole('status').waitFor();assert((await page.getByRole('status').textContent()).includes('正在加载'));
 fs.mkdirSync('tests/phase2-screenshots',{recursive:true});await page.screenshot({path:'tests/phase2-screenshots/loading-360.png'});release();await page.evaluate(()=>appReady);await page.unroute('**/api/concepts');
 assert.deepEqual(await page.evaluate(()=>state.levels),old.levels);assert.equal(await page.locator('.continue-card').getAttribute('href'),'learn.html?id=8');
 await page.route('**/api/concepts',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{message:'内容服务暂时不可用，请稍后重试。'}})}));
 await page.goto(base+'/learn.html');await page.locator('#api-retry').waitFor();assert(await page.getByRole('navigation').isVisible());await page.screenshot({path:'tests/phase2-screenshots/error-360.png'});
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY))),old);
 await page.unroute('**/api/concepts');await page.locator('#api-retry').click();await page.locator('#comparison').waitFor();assert.equal(await page.locator('[data-lang="en"][data-mark="learned"]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('[data-lang="ja"][data-mark="review"]').getAttribute('aria-pressed'),'true');
 await page.route('**/api/placement/questions?lang=en',route=>route.fulfill({status:503,contentType:'application/json',body:'{"error":{"message":"题目暂不可用"}}'}));
 await page.goto(base+'/placement.html');await page.locator('.start-test[data-lang="en"]').click();await page.locator('#api-retry').waitFor();await page.unroute('**/api/placement/questions?lang=en');await page.locator('#api-retry').click();await page.locator('input[value="0"]').waitFor();
 await page.route('**/api/placement/score',route=>route.fulfill({status:503,contentType:'application/json',body:'{"error":{"message":"评分暂不可用"}}'}));
 for(let i=0;i<12;i++){await page.locator('input[value="0"]').check();await page.locator('#next-question').click();}
 await page.locator('.test-wrap [role="alert"]').waitFor();assert.equal(await page.evaluate(()=>state.levels.en.level),5);assert(await page.locator('input[value="0"]').isChecked());await page.screenshot({path:'tests/phase2-screenshots/score-retry-360.png',fullPage:true});
 await page.unroute('**/api/placement/score');await page.locator('#next-question').click();await page.locator('.start-test').first().waitFor();assert.equal(await page.evaluate(()=>state.levels.en.level),2);assert.equal(await page.evaluate(()=>state.levels.ja.level),1);
 await page.reload();await page.evaluate(()=>appReady);assert.equal(await page.evaluate(()=>state.levels.en.level),2);
 // Database-backed strings are rendered as text, not executable markup.
 await page.route('**/api/concepts',async route=>{const r=await route.fetch();const body=await r.json();body.data[0].zh='<img src=x onerror="window.injected=true">';body.data[0].en.text='<script>window.injected=true</script>';await route.fulfill({json:body});});
 await page.goto(base+'/learn.html?id=1');await page.locator('#comparison').waitFor();assert.equal(await page.locator('.meaning img').count(),0);assert.equal(await page.evaluate(()=>window.injected),undefined);assert((await page.locator('.meaning h2').textContent()).startsWith('<img'));
 assert.deepEqual(errors,[]);await browser.close();console.log('Phase 1 storage, loading, API retry, question retry, scoring retry and safe text rendering passed.');
})().catch(e=>{console.error(e);process.exit(1);});
