const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://127.0.0.1:8797',label=process.env.TEST_LABEL||'local',dir='docs/phase35b/screenshots-'+label;
const routes=['/','/vocabulary.html','/vocabulary-detail.html?id=en-expect','/grammar.html','/grammar-detail.html?id=ja-te-iru','/sentences.html','/sentence.html?id=changed-plan','/academic.html','/ielts.html?target=6.5','/jlpt.html?level=N4','/ai.html?type=grammar&id=en-present-perfect&lang=en','/progress.html'];
(async()=>{
 fs.mkdirSync(dir,{recursive:true});const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const context=await browser.newContext(),page=await context.newPage(),errors=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 const go=async route=>{assert.equal((await page.goto(base+route)).status(),200);await page.locator('main h1').waitFor();assert.equal(await page.locator('#retry').count(),0,await page.locator('main').innerText());};
 try{
 for(const width of [360,390,430,1440]){
  await page.setViewportSize({width,height:950});
  for(const [i,route] of routes.entries()){
   await go(route);await page.evaluate(()=>document.fonts.ready);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),width+' '+route);
   assert.equal(await page.locator('main h1').count(),1);
   assert.equal(await page.locator('nav[aria-label="主要导航"] a').count(),5);
   assert(await page.locator('html').getAttribute('lang')==='zh-CN');
   if(width===390||width===1440&&[0,3].includes(i))await page.screenshot({path:`${dir}/${width}-${i}.png`,fullPage:true});
  }
 }checks.push('12 major pages at 360/390/430/1440; no overflow; one main heading; five primary destinations');
 await go('/vocabulary.html?lang=en&stage=3');await page.getByLabel('搜索中文或目标语言').fill('expect');await page.getByRole('button',{name:'搜索',exact:true}).click();await page.getByRole('heading',{name:'expect',exact:true}).waitFor();await page.getByRole('link').filter({has:page.getByRole('heading',{name:'expect',exact:true})}).click();await page.getByRole('heading',{name:'意思与用法'}).waitFor();assert.equal(await page.locator('.sense').count(),2);checks.push('Vocabulary stage/search/detail and distinct senses');
 await go('/vocabulary-detail.html?id=en-eat');await page.locator('.reverse-card').first().click();await page.getByRole('heading',{name:'我还没吃饭。',exact:true}).waitFor();await page.getByRole('button',{name:'现在完成时：到现在为止',exact:true}).click();await page.locator('dialog[open]').waitFor();await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);await page.getByRole('button',{name:'现在完成时：到现在为止',exact:true}).click();await page.getByRole('link',{name:'查看语法详情 →'}).click();await page.getByRole('heading',{name:'核心感觉',exact:true}).waitFor();await page.locator('.reverse-card').first().click();await page.getByRole('button',{name:'eat',exact:true}).click();await page.getByRole('link',{name:'查看词汇详情 →'}).click();await page.getByRole('heading',{name:'eat',exact:true}).waitFor();checks.push('Vocabulary → Sentence → Grammar → Sentence → Vocabulary; modal Escape');
 await go('/grammar-detail.html?id=ja-te-iru');assert((await page.locator('main').innerText()).includes('建议先了解'));await page.locator('.relation').filter({hasText:'动词て形'}).click();await page.getByRole('heading',{name:'动词て形',exact:true}).waitFor();checks.push('Prerequisite suggestion navigation is unlocked');
 await go('/sentence.html?id=help-dialogue');assert.equal(await page.locator('.turn').count(),4);await go('/sentence.html?id=apology');assert((await page.locator('main').innerText()).includes('情境'));assert((await page.locator('main').innerText()).includes('No worries.'));checks.push('Dialogue speaker turns and scenario response variants');
 await go('/ielts.html?target=6.5');await page.getByRole('link',{name:'查看词汇详情 →'}).click();await page.getByRole('heading',{name:'expect',exact:true}).waitFor();assert((await page.locator('main').innerText()).includes('Stage 3'));assert((await page.locator('main').innerText()).includes('IELTS 目标 6.5'));
 await go('/jlpt.html?level=N4');await page.getByRole('link',{name:'查看语法详情 →'}).click();await page.getByRole('heading',{name:'ている：状态与进行',exact:true}).waitFor();assert((await page.locator('main').innerText()).includes('Level 3'));assert((await page.locator('main').innerText()).includes('JLPT 目标 N4'));
 await go('/jlpt.html?level=N1');assert((await page.locator('main').innerText()).includes('目前还没有这一目标'));checks.push('IELTS → Vocabulary and JLPT → Grammar; independent difficulty; empty target');
 for(const [domain,id,route] of [['vocabulary','en-expect','vocabulary-detail'],['grammar','en-present-perfect','grammar-detail'],['sentences','not-eaten','sentence']]){
  await go('/'+route+'.html?id='+id);await page.getByRole('link',{name:/用 AI 练习/}).first().click();await page.getByRole('heading',{name:'给表达，留一个练习空间',exact:true}).waitFor();assert(page.url().includes('type='+domain));assert((await page.locator('.context-pill').innerText()).length>20);
  const requests=[];const handler=r=>requests.push(r.url());page.on('request',handler);await page.locator('#practice-input').fill('PRIVATE SAMPLE DO NOT SEND');await page.getByRole('button',{name:'查看固定反馈示例'}).click();assert(await page.locator('#feedback-content').isVisible());assert((await page.locator('#feedback').innerText()).includes('非实时反馈'));assert.deepEqual(requests,[]);page.off('request',handler);
 }checks.push('All three contextual AI entries, visible static demo, no submission network requests');
 await go('/');await page.evaluate(()=>localStorage.setItem('kotoba.phase3.v1',JSON.stringify({version:3,levels:{en:{level:4},ja:{level:2}},mastery:{en:{8:'learned'},ja:{8:'review'}}})));const before=await page.evaluate(()=>localStorage.getItem('kotoba.phase3.v1'));await go('/progress.html');assert((await page.locator('main').innerText()).includes('原版定位 Level 4'));assert((await page.locator('main').innerText()).includes('尚未独立评估'));assert.equal(await page.evaluate(()=>localStorage.getItem('kotoba.phase3.v1')),before);checks.push('Read-only original progress display; no new scores or state migration');
 await page.route('**/api/v2/vocabulary?**',r=>r.abort());await page.goto(base+'/vocabulary.html');await page.locator('#retry').waitFor();await page.unroute('**/api/v2/vocabulary?**');await page.locator('#retry').click();await page.getByRole('heading',{name:'词汇，从理解开始'}).waitFor();checks.push('API error and retry recovery');
 await go('/vocabulary.html?search=zzzzzzzz');assert(await page.locator('.empty').isVisible());await page.goto(base+'/vocabulary-detail.html?id=missing');await page.locator('#retry').waitFor();assert((await page.locator('main').innerText()).includes('没有找到'));checks.push('Empty results and missing detail handled');
 }finally{await browser.close();}
 assert.deepEqual(errors,[]);fs.writeFileSync('docs/phase35b/browser-'+label+'.json',JSON.stringify({passed:true,base,checks,errors,screenshots:dir},null,2));console.log(checks.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
