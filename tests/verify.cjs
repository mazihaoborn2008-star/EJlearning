// Development-only browser verification; no dependency is loaded by the website.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
let chromium;
try { ({chromium}=require('playwright')); } catch { ({chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const vm=require('node:vm');
const fixture=vm.runInNewContext(fs.readFileSync(path.join(__dirname,'fixtures/phase1-data.cjs'),'utf8')+';({concepts,placementQuestions})');
const root = process.env.BASE_URL || 'http://127.0.0.1:8787';
const output = path.join(__dirname,'phase2-screenshots');
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext();const page=await context.newPage();const errors=[];const checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 const go=async(p)=>{const response=await page.goto(root+'/'+p);assert.equal(response.status(),200);assert(await page.evaluate(()=>appReady));};
 const overflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow: '+page.url());
 await go('placement.html');
 checks.push('API-backed page initialization');
 async function complete(lang,correct){await page.locator(`.start-test[data-lang="${lang}"]`).click();assert(await page.locator('#next-question').isDisabled());for(let i=0;i<12;i++){const key=fixture.placementQuestions[lang][i][3];await page.locator(`input[value="${i<correct?key:(key+1)%3}"]`).check();if(i===0){await page.locator('#next-question').click();await page.locator('#back-question').click();assert(await page.locator(`input[value="${i<correct?key:(key+1)%3}"]`).isChecked());}await page.locator('#next-question').click();}}
 await complete('en',12);await page.locator('.start-test').first().waitFor();await complete('ja',3);await page.locator('.start-test').first().waitFor();await page.reload();assert(await page.evaluate(()=>appReady));
 let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY)));
 assert.equal(saved.levels.en.level,6);assert.equal(saved.levels.ja.level,1);
 await complete('en',7);await page.locator('.start-test').first().waitFor();saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY)));assert.equal(saved.levels.en.level,3);assert.equal(saved.levels.ja.level,1);
 await page.locator('.start-test[data-lang="ja"]').click();await page.locator('input[value="0"]').check();await page.locator('#exit-test').click();assert.equal(await page.evaluate(()=>state.levels.ja.level),1);
 await page.locator('.start-test').first().waitFor();
 checks.push('24-question completion, back/change answer, independent retest, exit preserves results, refresh');
 await go('learn.html?id=8');await page.locator('[data-lang="en"][data-mark="learned"]').click();await page.locator('[data-lang="ja"][data-mark="review"]').click();await page.reload();
 assert.equal(await page.locator('[data-lang="en"][data-mark="learned"]').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('[data-lang="ja"][data-mark="review"]').getAttribute('aria-pressed'),'true');
 await page.locator('#next').click();await page.reload();assert.equal(await page.locator('#concept-select').inputValue(),'9');
 await go('index.html');await page.locator('.continue-card').click();assert.equal(await page.locator('#concept-select').inputValue(),'9');
 await go('progress.html');assert.deepEqual(await page.locator('.big-number').allTextContents(),['7%','0%']);assert.equal(await page.locator('.review-list a').first().getAttribute('href'),'learn.html?id=8');
 checks.push('Independent mastery and topic/overall percentages; review link; refresh and continue resume');
 await go('learn.html');const data=await page.evaluate(()=>concepts);
 assert.equal(data.length,15);assert.equal(new Set(data.map(c=>c.id)).size,15);
 for(const t of ['chat','food','school'])assert.equal(data.filter(c=>c.topic===t).length,5);
 for(const c of data){for(const field of ['zh','en','ipa','ja','hiragana','comparison'])assert(c[field]);assert(c.enGrammar.example&&c.jaGrammar.example);assert(c.enChunks.length&&c.jaChunks.length);assert(!/[A-Za-z\u4e00-\u9fff]/.test(c.hiragana));}
 checks.push('Exactly 15 complete Concepts, 5 per topic, kana-only readings, grammar examples');
 for(const width of [360,390,430,1440]){
  await page.setViewportSize({width,height:900});
  for(const file of ['index','placement','learn','progress']){await go(file+'.html');await overflow();await page.screenshot({path:path.join(output,`${file}-${width}.png`),fullPage:true});}
  for(const c of data){await go('learn.html?id='+c.id);await overflow();assert.equal(await page.locator('.ipa').getAttribute('open'),null);await page.locator('.ipa summary').click();assert(await page.locator('.ipa p').isVisible());await page.locator('#hiragana-toggle').check();assert.equal(await page.locator('#hiragana-view').textContent(),c.hiragana);assert(!(await page.locator('#ruby-view').isVisible()));await overflow();await page.locator('#hiragana-toggle').uncheck();assert.equal(await page.locator('#ruby-view').evaluate(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('rt').forEach(x=>x.remove());return copy.textContent;}),c.ja);
   if(width===360){for(const button of await page.locator('.grammar,.chunk').all()){await button.click();assert(await page.locator('dialog').isVisible());assert((await page.locator('.drawer-text').textContent()).length>10);await page.keyboard.press('Escape');assert(!(await page.locator('dialog').isVisible()));}}
   await page.locator('#comparison').click();assert.equal(await page.locator('.drawer-text').textContent(),c.comparison);await overflow();await page.locator('.close-bottom').click();
  }
  await go('learn.html?id=8');await page.locator('.grammar[data-lang="en"]').click();await page.screenshot({path:path.join(output,`grammar-${width}.png`)});await page.locator('.close-dialog').click();
  await go('placement.html');await page.locator('.start-test[data-lang="en"]').click();for(let i=0;i<12;i++){await overflow();if(i===10)await page.screenshot({path:path.join(output,`question-${width}.png`),fullPage:true});await page.locator('input[value="0"]').check();await page.locator('#next-question').click();}await page.locator('.start-test').first().waitFor();await page.screenshot({path:path.join(output,`results-${width}.png`),fullPage:true});
 }
 checks.push('All pages and all 15 Concepts at 360/390/430/1440; IPA, hiragana, every grammar chunk, modal close/Escape, comparison, 12 question layouts: no overflow');
 await go('learn.html?topic=food');assert.equal(await page.locator('#concept-select option').count(),5);assert.equal(await page.locator('#concept-select').inputValue(),'6');assert(await page.locator('#previous').isDisabled());await page.locator('#concept-select').selectOption('10');await page.locator('#previous').click();assert.equal(await page.locator('#concept-select').inputValue(),'9');await page.locator('#next').click();await page.locator('#next').click();assert(page.url().endsWith('progress.html'));
 await go('learn.html?id=8&topic=chat');assert.equal(await page.locator('#concept-select').inputValue(),'8');await page.locator('#topic-select').selectOption('school');assert.equal(await page.locator('#concept-select').inputValue(),'11');await page.locator('#topic-select').selectOption('all');assert.equal(await page.locator('#concept-select option').count(),15);
 for(const file of ['index','placement','learn','progress']){await go(file+'.html');const links=await page.locator('a[href]:not(.skip-link)').evaluateAll(els=>els.map(a=>a.href));for(const href of links){assert.equal(new URL(href).origin,root);assert.equal((await page.request.get(href)).status(),200);}}
 for(const [label,file] of [['首页','index'],['能力定位','placement'],['学习','learn'],['学习进度','progress']]){await page.getByRole('navigation').getByRole('link',{name:label,exact:true}).click();assert(page.url().includes(file+'.html'));await page.waitForLoadState();assert(await page.evaluate(()=>appReady));}
 checks.push('Every page link responds; primary navigation clicks; topic filtering, selector, previous/next, final Concept route');
 await page.evaluate(()=>localStorage.setItem(KEY,'broken json'));await go('index.html');assert(await page.locator('.placement-prompt').isVisible());
 await page.evaluate(()=>localStorage.setItem(KEY,JSON.stringify({levels:null,mastery:{en:null},last:999})));await go('learn.html');assert.equal(await page.locator('#concept-select').inputValue(),'1');
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Blocked','SecurityError');};});const bp=await blocked.newPage();await bp.goto(root+'/learn.html');await bp.evaluate(()=>appReady);assert(await bp.locator('#storage-warning').isVisible());await bp.locator('[data-lang="en"][data-mark="learned"]').click();await blocked.close();
 checks.push('Malformed saved state and blocked storage handled without breaking learning');
 assert.deepEqual(errors,[]);checks.push('No JavaScript page errors');
 fs.writeFileSync(path.join(__dirname,'phase2-browser-results.json'),JSON.stringify({passed:true,widths:[360,390,430,1440],checks},null,2));
 console.log(JSON.stringify({passed:true,checks},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});

