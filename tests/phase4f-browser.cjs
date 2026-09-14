const assert=require('node:assert/strict');
const {chromium}=require('playwright');

(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}),page=await browser.newPage();
 await page.route('**/api/**',async route=>{const request=route.request(),url=new URL(request.url()),path=url.pathname;
  const reply=data=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
  if(path==='/api/me')return reply({authenticated:true,user:{id:'user-a',email:'a@example.com'}});
  if(path==='/api/progress/summary')return reply({data:{today:{attempts:2,timezone:'Pacific/Auckland'},vocabulary:{studied:1,attempts:2,correct_count:1,wrong_count:1,accuracy:50},grammar:{studied:1,attempts:1,correct_count:0,wrong_count:1,accuracy:0},lessons:{studied:0,completed:0,in_progress:0}}});
  if(path==='/api/progress/recent')return reply({data:[]});
  if(path==='/api/settings')return reply({data:{preferred_learning_language:null,timezone:null,updated_at:null,changed:true}});
  if(path==='/api/recommendations')return reply({data:{primary_action:{type:'start_next_lesson',reason:'从日语第一课开始学习。',target:'/lesson.html?id=ja-s1-l1',lesson:{id:'ja-s1-l1'}},review:{total_due:0,next_review_at:null},lesson:{paths:{en:{next:null},ja:{next:null}}},weak_vocabulary:[{id:'v-a',language:'en',label:'选择',reason:'上次回答错误',target:'/vocabulary-detail.html?id=v-a&lang=en'}],weak_grammar:[{id:'g-a',language:'ja',label:'判断句',reason:'当前处于重新学习阶段',target:'/grammar-detail.html?id=g-a&lang=ja'}]}});
  if(path==='/api/practice/session')return reply({data:[{exercise_id:'opaque_exercise_token_12345678901234567890',content_type:'vocabulary',exercise_type:'vocabulary_recognition',prompt:'选择“choice”的意思。',choices:['选择','变化','机会','声音'],context:{type:'standalone'}}],meta:{source:'weakness',type:'vocabulary',limit:5,returned:1,maximum:10}});
  if(path==='/api/learning/attempt')return reply({data:{correct:false,submitted_answer:'变化',expected_answer:'选择',feedback:'答案不匹配。',content_type:'vocabulary',content_id:'v-a',remediation_token:'A'.repeat(80)}});
  return route.fulfill({status:404,contentType:'application/json',body:'{"error":{"message":"not mocked"}}'});
 });
 for(const width of [360,390,430,768,1440]){await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8816/progress.html');await page.getByRole('heading',{name:'我的学习'}).waitFor();assert(await page.getByRole('link',{name:'专项练习'}).first().isVisible());assert(await page.getByLabel('主要学习语言').isVisible());assert(await page.getByLabel('时区（IANA）').isVisible());assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,`progress overflow at ${width}`);
  await page.goto('http://127.0.0.1:8816/practice.html?source=weakness&type=vocabulary');await page.getByText('第 1 / 1 题').waitFor();await page.getByLabel('变化').check({force:true});await page.getByRole('button',{name:'提交答案'}).click();await page.getByRole('link',{name:'让 AI 解释'}).waitFor();assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,`practice overflow at ${width}`);
  await page.goto('http://127.0.0.1:8816/ai.html?remediation='+('A'.repeat(80))+'&lang=en&return=%2Fpractice.html%3Fresume%3Dresume_1234567890');await page.getByRole('heading',{name:'理解这道错题'}).waitFor();assert(await page.getByRole('button',{name:'让 AI 解释'}).isVisible());assert(await page.getByRole('link',{name:'返回专项练习'}).isVisible());assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,`AI overflow at ${width}`);}
 console.log(JSON.stringify({passed:true,widths:[360,390,430,768,1440],cases:['weakness launch','focused practice','wrong-answer AI action','settings','first-run setup','practice return','no horizontal overflow']}));await browser.close();
})().catch(error=>{console.error(error);process.exitCode=1;});
