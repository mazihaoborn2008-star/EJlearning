const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://127.0.0.1:8797',label=process.env.TEST_LABEL||'local';
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),p=await browser.newPage(),errors=[],checks=[];p.on('pageerror',e=>errors.push(e.message));
try{
 for(const width of [360,390,430,1440]){
  await p.setViewportSize({width,height:900});
  await p.goto(base+'/');await p.locator('.hero').waitFor();assert.equal(await p.locator('.hero a[href*="legacy"]').count(),0);assert.equal(await p.getByRole('link',{name:'探索词汇库',exact:true}).count(),1);
  await p.goto(base+'/vocabulary.html?lang=ja&stage=2');await p.locator('main h1').waitFor();await p.locator('footer a').click();await p.locator('#return-v2[data-ready]').waitFor();assert.equal(await p.locator('#return-v2').getAttribute('href'),'/vocabulary.html?lang=ja&stage=2');await p.locator('#return-v2').click();await p.locator('main h1').waitFor();assert(p.url().endsWith('/vocabulary.html?lang=ja&stage=2'));
  for(const name of ['index','learn','progress','placement','checkpoint']){
   // Explicit V2 referrer verifies no stale return target is reused on fresh entry.
   await p.goto(base+'/');await p.locator('.hero').waitFor();
   await p.goto(base+'/legacy/'+name+'.html');await p.locator('#return-v2[data-ready]').waitFor();
   assert.equal(await p.locator('#return-v2').getAttribute('href'),'/');assert(await p.locator('#return-v2').isVisible());
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),width+' '+name);
   assert((await p.locator('#return-v2').boundingBox()).height>=44);
   await p.locator('#return-v2').focus();await p.keyboard.press('Enter');await p.locator('.hero').waitFor();assert.equal(new URL(p.url()).pathname,'/');
  }
  await p.goto(base+'/legacy/?return='+encodeURIComponent('/progress.html'));await p.locator('.site-header nav a').first().waitFor();await p.locator('.site-header nav a').filter({hasText:'学习进度'}).click();await p.locator('#return-v2[data-ready]').waitFor();assert.equal(await p.locator('#return-v2').getAttribute('href'),'/progress.html');await p.locator('#return-v2').click();await p.getByRole('heading',{name:'我的学习',exact:true}).waitFor();
  fs.mkdirSync('docs/phase35c1',{recursive:true});await p.screenshot({path:'docs/phase35c1/'+label+'-'+width+'-v2.png',fullPage:false});
  await p.goto(base+'/legacy/learn.html?return=%2Fsentences.html');await p.locator('#return-v2[data-ready]').waitFor();await p.screenshot({path:'docs/phase35c1/'+label+'-'+width+'-legacy.png',fullPage:false});
  checks.push(width+'px: Home CTA, context return, all 5 legacy pages default return, internal legacy navigation, keyboard and no overflow');
 }
 for(const target of ['https://example.com/','//example.com/','javascript:alert(1)','/legacy/','/api/concepts']){await p.goto(base+'/legacy/?return='+encodeURIComponent(target));await p.locator('#return-v2[data-ready]').waitFor();assert.equal(await p.locator('#return-v2').getAttribute('href'),'/');}
 await p.goto(base+'/progress.html');await p.locator('main h1').waitFor();const labels=await p.locator('a[href*="/legacy/"]').allTextContents();assert(labels.length>=3);assert(labels.every(x=>x.includes('旧版学习（兼容）')));
 // JS-driven legacy transitions have no query copying; the compatibility tab state supplies it.
 await p.goto(base+'/legacy/learn.html?return=%2Fgrammar.html');await p.locator('#return-v2[data-ready]').waitFor();await p.evaluate(()=>location.href='progress.html');await p.waitForURL('**/legacy/progress.html');await p.waitForLoadState('load');await p.locator('#return-v2[data-ready]').waitFor();assert.equal(await p.locator('#return-v2').getAttribute('href'),'/grammar.html',JSON.stringify(await p.evaluate(()=>({href:location.href,ref:document.referrer,key:sessionStorage.getItem('yanjian.legacyReturn.v1')}))));
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('blocked')};Storage.prototype.getItem=function(){throw Error('blocked')};});const b=await blocked.newPage();await b.goto(base+'/legacy/?return=%2Fsentences.html');await b.locator('#return-v2[data-ready]').waitFor();assert.equal(await b.locator('#return-v2').getAttribute('href'),'/sentences.html');await blocked.close();
 assert.deepEqual(errors,[]);checks.push('Unsafe return targets fall back Home; compatibility labels; JS transition; unavailable storage');fs.writeFileSync('docs/phase35c1/'+label+'-navigation.json',JSON.stringify({passed:true,base,checks,errors},null,2));console.log(checks.join('\n'));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});

