const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:8799';

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),page=await browser.newPage({viewport:{width:390,height:760}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const go=async route=>{const r=await page.goto(base+route);assert.equal(r.status(),200,route);await page.locator('main h1').waitFor();assert.equal(await page.locator('#retry').count(),0,route);};
 try{
  await go('/');assert.equal(await page.locator('.nav a').nth(1).getAttribute('href'),'/learn.html');assert((await page.locator('.hero-copy .primary').getAttribute('href')).includes('/learn.html'));
  await go('/learn.html?lang=en&stage=1');assert.equal(await page.locator('.lesson-card').count(),4);assert((await page.locator('main').innerText()).includes('打招呼并开始简单交谈'));assert((await page.locator('main').innerText()).includes('Library / 自由探索'));
  await page.evaluate(()=>localStorage.setItem('kotoba.phase3.v1','{"sentinel":"unchanged"}'));
  await page.locator('.lesson-card').first().click();await page.waitForURL(/lesson\.html/);await page.locator('.lesson-hero h1').waitFor();const lessonUrl=page.url();
  assert((await page.locator('main').innerText()).includes('学完你能'));assert.equal(await page.locator('[data-step]').count(),6);assert.equal(await page.locator('.lesson-panel:not([hidden])').count(),1);
  await page.locator('[data-step="vocabulary"]').click();await page.locator('.lesson-item').first().click();await page.locator('#preview[open]').waitFor();assert.equal(page.url(),lessonUrl);await page.locator('#preview .close').click();assert.equal(await page.locator('#preview[open]').count(),0);assert.equal(page.url(),lessonUrl);
  await page.locator('[data-step="grammar"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-step="expressions"]').getAttribute('aria-selected'),'true');
  await page.locator('[data-step="scenario"]').click();assert.equal(await page.locator('.lesson-panel:not([hidden])').count(),1);await page.locator('[data-step="practice"]').click();assert(await page.locator('.practice-grid').count());
  assert.equal(await page.evaluate(()=>localStorage.getItem('kotoba.phase3.v1')),'{"sentinel":"unchanged"}');
  await go('/learn.html?lang=ja&stage=3');const jaText=await page.locator('main').innerText();assert(jaText.includes('誤解を解き、言い方を整える'));assert(!jaText.includes('讨论计划与期待'));
  await go('/ielts.html?target=6.5&tab=vocabulary');await page.locator('.exam-lessons').waitFor();assert((await page.locator('main').innerText()).includes('相关站内课程'));assert(await page.locator('.exam-lessons a[href*="lesson.html"]').count()>0);
  for(const width of [360,390,430,768,1440]){await page.setViewportSize({width,height:800});for(const route of ['/learn.html?lang=en&stage=1','/lesson.html?id=en-s1-l1&lang=en&stage=1','/lesson.html?id=ja-s3-l1&lang=ja&stage=3','/vocabulary.html?lang=en&stage=1','/grammar.html?lang=ja&level=3','/sentences.html?lang=en&topic=food','/ielts.html?target=6.5&tab=vocabulary','/jlpt.html?level=N3&tab=grammar','/legacy/placement.html','/ai.html']){await go(route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} ${route}`);}await go('/lesson.html?id=en-s1-l1&lang=en&stage=1');for(const h of await page.locator('[data-step],.lesson-controls button').evaluateAll(xs=>xs.map(x=>x.getBoundingClientRect().height)))assert(h>=44,`tap target ${width}: ${h}`);}
  assert.deepEqual(errors,[]);console.log('Phase 3.5D browser, responsive, navigation, and regression acceptance passed');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
