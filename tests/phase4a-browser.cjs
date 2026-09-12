const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8816';

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  for(const width of [360,390,430,768,1440]){
   const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.route('**/api/me',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({authenticated:false})}));
   await page.goto(base+'/auth.html');
   await page.getByRole('heading',{name:'登录言间'}).waitFor();
   assert(await page.getByLabel('邮箱地址').isVisible());
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`horizontal overflow at ${width}px`);
   assert.deepEqual(errors,[]);
   await page.close();
  }

  const page=await browser.newPage({viewport:{width:390,height:844}});
  let code='246810',authenticated=false;
  await page.route('**/api/me',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(authenticated?{authenticated:true,user:{id:'user-1',email:'learner@example.com'}}:{authenticated:false})}));
  await page.route('**/api/auth/email/send-code',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,message:'如果邮箱地址有效，验证码将发送到该邮箱。',resend_after:60})}));
  await page.route('**/api/auth/email/verify',async route=>{
   const body=route.request().postDataJSON();
   if(body.code!==code)return route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({error:{code:'CODE_INVALID',message:'验证码无效。'}})});
   authenticated=true;return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({authenticated:true,user:{id:'user-1',email:'learner@example.com'}})});
  });
  await page.goto(base+'/auth.html');
  await page.getByLabel('邮箱地址').fill('learner@example.com');
  await page.getByRole('button',{name:'发送验证码'}).click();
  await page.getByText('l***@example.com').waitFor();
  assert(await page.getByRole('button',{name:/秒后重新发送/}).isDisabled());
  await page.getByLabel('6 位验证码').fill('000000');
  await page.getByRole('button',{name:'登录',exact:true}).click();
  await page.getByText('验证码无效。').waitFor();
  await page.getByLabel('6 位验证码').fill(code);
  await page.getByRole('button',{name:'登录',exact:true}).click();
  await page.waitForURL('**/progress.html');
  await page.close();

  const account=await browser.newPage({viewport:{width:430,height:844}});
  await account.route('**/api/me',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({authenticated:true,user:{id:'user-1',email:'learner@example.com'}})}));
  await account.goto(base+'/auth.html');
  await account.getByRole('heading',{name:'你已登录'}).waitFor();
  assert(await account.getByRole('button',{name:'退出登录'}).isVisible());
  assert.equal(await account.locator('#account-nav').textContent(),'我的学习');
  await account.close();
  console.log(JSON.stringify({passed:true,widths:[360,390,430,768,1440],cases:['responsive login','two-step flow','invalid code','redirect after login','account state']}));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
