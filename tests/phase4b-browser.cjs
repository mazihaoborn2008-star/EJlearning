const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8816';

const account={authenticated:true,user:{id:'user-browser',email:'learner@example.com'}};
const summary={data:{today:{attempts:2},vocabulary:{studied:1,attempts:2,correct_count:1,wrong_count:1,accuracy:50},grammar:{studied:1,attempts:3,correct_count:3,wrong_count:0,accuracy:100},lessons:{studied:2,completed:1,in_progress:1}}};
const recent={data:[{type:'lesson',id:'en-s1-l1',title:'打招呼并开始简单交谈',language:'en',activity_at:2_000_000_000,result:null,status:'in_progress',last_section_key:'grammar'},{type:'vocabulary',id:'en-c-541',title:'choice',language:'en',activity_at:1_999_999_990,result:'correct',status:null,last_section_key:null}]};
const reviewSummary={data:{server_time:2_000_000_000,vocabulary:{has_learned:true,scheduled_count:1,due_count:1,next_upcoming_at:null},grammar:{has_learned:true,scheduled_count:1,due_count:0,next_upcoming_at:2_000_086_400},total_due:1,has_learned:true,total_scheduled:2,next_review_at:2_000_086_400}};
const recommendations={data:{primary_action:{type:'review_due',reason:'你有 1 个到期复习项目。',target:'/review.html',count:1},weak_vocabulary:[],weak_grammar:[],lesson:{continue:{id:'en-s1-l1',language:'en',stage:1,sequence:1,title:'打招呼并开始简单交谈',target:'/lesson.html?id=en-s1-l1&lang=en&stage=1'},next:null,paths:{en:{continue:null,next:null,complete:false},ja:{continue:null,next:null,complete:false}},all_complete:false,available:64},review:reviewSummary.data,generated_at:2_000_000_000,limits:{weak_vocabulary:5,weak_grammar:5,maximum:20}}};
const fulfillJson=(route,body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  for(const width of [360,390,430,768,1440]){
   const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',error=>errors.push(error.message));
   await page.route('**/api/me',route=>fulfillJson(route,account));
   await page.route('**/api/progress/summary',route=>fulfillJson(route,summary));
   await page.route('**/api/progress/recent?limit=8',route=>fulfillJson(route,recent));
   await page.route('**/api/recommendations',route=>fulfillJson(route,recommendations));
   await page.goto(base+'/progress.html');await page.getByRole('heading',{name:'我的学习'}).waitFor();
   await page.getByText('50%').waitFor();assert(await page.getByRole('link',{name:/开始复习/}).isVisible());
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`dashboard overflow at ${width}px`);assert.deepEqual(errors,[]);await page.close();
  }

  const check=await browser.newPage({viewport:{width:390,height:844}});
  await check.route('**/api/me',route=>fulfillJson(route,account));
  await check.route('**/api/v2/vocabulary/en-c-541',route=>fulfillJson(route,{data:{id:'en-c-541',language:'en',lemma:'choice',stage:2,part_of_speech:'noun',register:'neutral',ipa:'tʃɔɪs',reading:null,senses:[{meaning_zh:'选择',usage_zh:'用于表达选择。',register_note:null}],examples:[],relations:[],sentences:{data:[],pagination:{has_more:false,next_offset:null}}}}));
  await check.goto(base+'/vocabulary-detail.html?id=en-c-541&lang=en');await check.getByRole('heading',{name:'确定性练习'}).waitFor();
  const practiceLink=check.getByRole('link',{name:'开始练习'});assert.match(await practiceLink.getAttribute('href'),/practice\.html.*content_id=en-c-541/);assert.equal(await check.getByLabel('你的答案').count(),0);await check.close();

  const library=await browser.newPage({viewport:{width:430,height:844}});let requestedIds=[];
  await library.route('**/api/me',route=>fulfillJson(route,account));
  await library.route('**/api/v2/academic/topics',route=>fulfillJson(route,{data:[]}));
  await library.route('**/api/v2/vocabulary?*',route=>fulfillJson(route,{data:[{id:'en-choice',language:'en',lemma:'choice',stage:2,part_of_speech:'noun',register:'neutral',ipa:'tʃɔɪs',reading:null,meaning_zh:'选择'},{id:'en-chat',language:'en',lemma:'chat',stage:1,part_of_speech:'verb',register:'neutral',ipa:'tʃæt',reading:null,meaning_zh:'聊天'}],pagination:{limit:40,offset:0,has_more:false,next_offset:null}}));
  await library.route('**/api/progress/vocabulary?*',route=>{requestedIds=new URL(route.request().url()).searchParams.get('ids').split(',');return fulfillJson(route,{data:[],pagination:null});});
  await library.goto(base+'/vocabulary.html?lang=en&browse=C');await library.locator('.vocab-row').first().waitFor();await library.waitForTimeout(100);
  assert(requestedIds.length>0&&requestedIds.length<=40);assert.equal(new Set(requestedIds).size,requestedIds.length);await library.close();

  const lesson=await browser.newPage({viewport:{width:768,height:900}});const mutations=[];let completed=false;
  await lesson.route('**/api/me',route=>fulfillJson(route,account));
  await lesson.route('**/api/v2/lessons/en-s1-l1',route=>fulfillJson(route,{data:{id:'en-s1-l1',language:'en',stage:1,sequence:1,title:'打招呼并开始简单交谈',objective:'能用基本问候开始交流。',topic:'聊天',estimated_minutes:15,vocabulary_count:1,grammar_count:1,expression_count:1,scenario_count:0,previous:null,next:null,vocabulary:[{id:'en-choice',language:'en',lemma:'choice',ipa:'tʃɔɪs',reading:null,meaning_zh:'选择',role:'required'}],grammar:[{id:'en-present-perfect',language:'en',title_zh:'现在完成时',form_name:'have + past participle',role:'required'}],expressions:[{id:'expr-1',unit_id:'unit-1',unit_type:'sentence',anchor_zh:'你好',text:'Hello.',readings:[],role:'required'}]}}));
  await lesson.route('**/api/lessons/en-s1-l1/*',route=>{const action=new URL(route.request().url()).pathname.split('/').at(-1);mutations.push({action,body:route.request().postDataJSON()});if(action==='complete')completed=true;return fulfillJson(route,{data:{id:'en-s1-l1',status:completed?'completed':'in_progress',started_at:1,completed_at:completed?2:null,last_activity_at:2,last_section_key:action==='position'?route.request().postDataJSON().section_key:completed?'practice':'overview',changed:true}});});
  await lesson.goto(base+'/lesson.html?id=en-s1-l1&lang=en&stage=1');await lesson.getByRole('tab',{name:/语法/}).click();await lesson.getByRole('tab',{name:/练习/}).click();await lesson.getByRole('button',{name:'完成课程 ✓'}).click();await lesson.getByText('课程已完成，学习记录已保存。').waitFor();
  assert.equal(mutations.filter(x=>x.action==='start').length,1);assert(mutations.some(x=>x.action==='position'&&x.body.section_key==='grammar'));assert.equal(mutations.filter(x=>x.action==='complete').length,1);await lesson.close();

  console.log(JSON.stringify({passed:true,widths:[360,390,430,768,1440],cases:['responsive dashboard','tokenized practice handoff','bounded library progress lookup','lesson start/position/complete']}));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
