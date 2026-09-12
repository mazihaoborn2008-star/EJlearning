const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8815';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const width of [360,390,430,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/favicon.ico'))errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(base+'/ielts.html?target=7.0%2B&tab=vocabulary&browse=A');await page.locator('.vocab-row').first().waitFor();assert.equal(await page.locator('.vocab-row').count(),24);assert.equal(await page.locator('.vocab-index-selector a').count(),27);assert.equal(await page.locator('.vocab-row .pronunciation,.vocab-row .example,.vocab-row .chips').count(),0);assert.match(await page.locator('#result-count').textContent(),/共 \d+ 项/);for(const h of await page.locator('.vocab-index-selector a').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().height)))assert(h>=44);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'overflow '+width);
  const row=page.locator('.vocab-row').nth(5),y=await row.evaluate(e=>{e.scrollIntoView();return scrollY;});await row.dispatchEvent('click');await page.locator('#lesson-detail[open] #lesson-detail-title').waitFor();assert(await page.locator('#lesson-detail .sense').count());await page.locator('#lesson-detail .sheet-close').click();await page.waitForFunction(()=>!new URL(location.href).searchParams.has('detail'));await page.waitForFunction(expected=>Math.abs(scrollY-expected)<12,y);assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:900}});
 await page.goto(base+'/ielts.html?target=6.5&tab=vocabulary');await page.locator('.vocab-row').first().waitFor();const enPos=await page.locator('select[name=part_of_speech] option').allTextContents();assert(!enPos.some(x=>/な形容|い形容|助数詞|助詞/.test(x)));assert.match(await page.locator('#result-count').textContent(),/共 7000 项/);
 for(let i=0;i<25;i++){
  const more=page.locator('#load-more');
  if(!await more.isVisible())break;
  await more.click();
  await page.waitForFunction(()=>{const b=document.querySelector('#load-more');return !b||b.hidden||!b.disabled;});
 }
 assert((await page.locator('.vocab-row').count())<=500);assert.equal(await page.locator('#load-more:not([hidden])').count(),0);
 await page.goto(base+'/jlpt.html?level=N3&tab=vocabulary');await page.locator('.vocab-row').first().waitFor();const jaPos=await page.locator('select[name=part_of_speech] option').allTextContents();assert(jaPos.includes('な形容詞')&&jaPos.includes('い形容詞')&&jaPos.includes('助詞'));assert(!jaPos.some(x=>/短语动词|介词短语|限定词/.test(x)));assert.match(await page.locator('#result-count').textContent(),/共 1749 项/);assert.equal(await page.locator('.vocab-index-selector a').count(),11);
 await page.goto(base+'/vocabulary.html?lang=ja&browse=や行&search='+encodeURIComponent('予定'));await page.locator('.vocab-row').first().waitFor();assert((await page.locator('.vocab-row').allTextContents()).some(x=>x.includes('予定')));
 await page.goto(base+'/academic-about.html');assert.match(await page.locator('main').textContent(),/ECDICT/);assert.match(await page.locator('main').textContent(),/社区资料与课程估计/);
 await browser.close();console.log('Phase 3.5E.2 large vocabulary UI passed at 360, 390, 430, 768 and 1440px.');
})().catch(e=>{console.error(e);process.exit(1);});
