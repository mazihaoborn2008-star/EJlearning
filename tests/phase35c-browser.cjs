const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://127.0.0.1:8798',label=process.env.TEST_LABEL||'local',dir='docs/phase35c/screenshots-'+label;
(async()=>{
 fs.mkdirSync(dir,{recursive:true});const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),page=await browser.newPage(),errors=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 const go=async route=>{assert.equal((await page.goto(base+route)).status(),200);await page.locator('main h1').waitFor();assert.equal(await page.locator('#retry').count(),0,route);await page.evaluate(()=>document.fonts.ready);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route);};
 try{
 for(const width of [360,390,430,1440]){
 await page.setViewportSize({width,height:950});
 for(const route of ['/','/sentences.html?topic=food','/sentence.html?id=legacy-180','/sentence.html?id=legacy-183','/ielts.html?target=7.0%2B','/jlpt.html?level=N1','/legacy/']){await go(route);if(!route.startsWith('/legacy/'))assert.equal(await page.locator('nav[aria-label="主要导航"] a').count(),5);}
 for(const lang of ['en','ja'])for(let level=1;level<=6;level++)for(const [domain,key] of [['vocabulary','stage'],['grammar','level']]){await go(`/${domain}.html?lang=${lang}&${key}=${level}`);assert.equal(await page.locator('.empty').count(),0);assert(await page.locator('main .card').count()>0);}
 await go('/sentence.html?id=legacy-180');await page.screenshot({path:`${dir}/${width}-migration.png`,fullPage:true});
 await go('/vocabulary.html?lang=ja&stage=6');await page.screenshot({path:`${dir}/${width}-stage6.png`,fullPage:true});
 }checks.push('All six Vocabulary Stages and Grammar Levels in both languages at 360/390/430/1440, no empty bands or horizontal overflow');
 await go('/sentence.html?id=legacy-180');await page.getByRole('button',{name:'未实现的过去结果',exact:true}).click();await page.locator('dialog[open]').waitFor();await page.getByRole('link',{name:'查看语法详情 →'}).click();await page.getByRole('heading',{name:'核心感觉',exact:true}).waitFor();await page.locator('.reverse-card').first().click();await page.getByRole('heading',{name:'表达本来会做某事但被另一件事打断',exact:true}).waitFor();
 const chips=page.locator('button[data-vocab]');if(await chips.count())await chips.first().click();else{const buttons=page.locator('button.knowledge');if(await buttons.count())await buttons.first().click();}
 checks.push('Migrated Sentence → Grammar → real Sentence navigation');
 await go('/vocabulary-detail.html?id=en-eat');await page.locator('.reverse-card').first().click();await page.getByRole('button',{name:'eat',exact:true}).click();await page.locator('dialog[open]').waitFor();await page.getByRole('link',{name:'查看词汇详情 →'}).click();await page.getByRole('heading',{name:'eat',exact:true}).waitFor();checks.push('Vocabulary → Sentence → Vocabulary with modal links');
 for(const [pageName,key,targets] of [['ielts','target',['5.0','5.5','6.0','6.5','7.0+']],['jlpt','level',['N5','N4','N3','N2','N1']]])for(const target of targets){await go(`/${pageName}.html?${key}=${encodeURIComponent(target)}`);assert.equal(await page.locator('.empty').count(),0);assert((await page.locator('main').innerText()).includes('待'));}
 await go('/vocabulary.html?lang=en&search=zzzzzzzz');assert(await page.locator('.empty').isVisible());checks.push('All exam targets show draft references; intentional search empty state works');
 await go('/');await page.evaluate(()=>localStorage.setItem('kotoba.phase3.v1',JSON.stringify({version:3,levels:{en:{level:4},ja:{level:2}},mastery:{en:{8:'learned'},ja:{8:'review'}}})));const before=await page.evaluate(()=>localStorage.getItem('kotoba.phase3.v1'));await go('/progress.html');assert((await page.locator('main').innerText()).includes('尚未独立评估'));assert.equal(await page.evaluate(()=>localStorage.getItem('kotoba.phase3.v1')),before);checks.push('Learner storage remains unchanged with expanded curriculum');
 }finally{await browser.close();}
 assert.deepEqual(errors,[]);fs.writeFileSync('docs/phase35c/browser-'+label+'.json',JSON.stringify({passed:true,base,checks,errors},null,2));console.log(checks.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
