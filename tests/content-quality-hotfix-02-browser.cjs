const assert=require('node:assert/strict');
const {chromium}=require('playwright');

const base=process.env.CONTENT_QUALITY_BASE_URL||'http://127.0.0.1:8817';
const fulfill=(route,body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  const page=await browser.newPage({viewport:{width:430,height:900}}),errors=[];
  page.setDefaultTimeout(5000);page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/api/me',route=>fulfill(route,{data:{authenticated:false}}));

  await page.goto(`${base}/grammar-detail.html?id=35e1c-ja-counter-system&lang=ja`);
  await page.getByRole('heading',{name:'助数詞：人・本・枚・個・つ'}).waitFor();
  assert.equal(await page.getByText('数 + 助数詞',{exact:true}).count(),1);
  assert.equal((await page.locator('body').innerText()).includes('number + counter'),false);
  await page.getByRole('link',{name:'开始练习'}).waitFor();

  await page.goto(`${base}/grammar-detail.html?id=35e1c-ja-condition-contrast&lang=ja`);
  await page.getByRole('heading',{name:'条件の「なら・たら・ば・と」比較（概要）'}).waitFor();
  await page.getByRole('heading',{name:'非评测概览'}).waitFor();
  assert.equal(await page.getByRole('link',{name:'开始练习'}).count(),0);
  const conditionText=await page.locator('body').innerText();
  assert(conditionText.includes('普通形 + なら；た形 + ら；ば形；普通形 + と'));
  assert.equal(conditionText.includes('た形ら'),false);

  await page.goto(`${base}/grammar-detail.html?id=35e1c-ja-workplace-register&lang=ja`);
  await page.getByRole('heading',{name:'職場の敬体・尊敬語・謙譲語（概要）'}).waitFor();
  await page.getByRole('heading',{name:'非评测概览'}).waitFor();
  assert.equal(await page.getByRole('link',{name:'开始练习'}).count(),0);
  const registerText=await page.locator('body').innerText();
  assert(registerText.includes('です／ます；尊敬語；謙譲語'));
  assert.equal(registerText.includes('polite / honorific / humble by actor'),false);

  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.deepEqual(errors,[]);
  console.log('Content Quality Hotfix 02 grammar detail pages passed.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
