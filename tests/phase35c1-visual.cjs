const {chromium}=require('playwright');
const fs=require('node:fs');
const base=process.env.BASE_URL||'http://127.0.0.1:8799';
const label=process.env.TEST_LABEL||'local';

(async()=>{
 fs.mkdirSync(`docs/phase35c1/screenshots-${label}`,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 try{
  for(const width of [360,390,430,1440]){
   const page=await browser.newPage({viewport:{width,height:900}});
   for(const [name,route] of [['academic','/academic.html'],['ielts-vocabulary','/ielts.html?target=6.5&tab=vocabulary'],['jlpt-expressions','/jlpt.html?level=N3&tab=sentences']]){
    await page.goto(base+route);await page.locator('main h1').waitFor();await page.screenshot({path:`docs/phase35c1/screenshots-${label}/${width}-${name}.png`,fullPage:true});
   }
   await page.goto(base+'/ielts.html?target=6.5&tab=vocabulary');await page.locator('main h1').waitFor();await page.locator('.exam-card').first().click();await page.locator('#lesson-detail[open] h2').first().waitFor();await page.screenshot({path:`docs/phase35c1/screenshots-${label}/${width}-detail.png`,fullPage:false});
   await page.close();
  }
 }finally{await browser.close();}
 console.log('Phase 3.5C.1 visual captures complete');
})().catch(e=>{console.error(e);process.exit(1);});
