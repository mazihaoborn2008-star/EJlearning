const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8816';
const account={authenticated:true,user:{id:'browser-user',email:'learner@example.com'}};
const summary={data:{today:{attempts:12345},vocabulary:{studied:9999,attempts:12000,correct_count:6000,wrong_count:6000,accuracy:50},grammar:{studied:8888,attempts:10000,correct_count:5000,wrong_count:5000,accuracy:50},lessons:{studied:18,completed:17,in_progress:1}}};
const recent={data:[{type:'lesson',id:'ja-s6-l4',title:'関係に合わせて、とても長い课程标题在狭窄屏幕上也必须自然换行并保持按钮可用',language:'ja',activity_at:2_000_000_000,status:'in_progress',last_section_key:'grammar'}]};
const weak=(type,index)=>({id:`${type}-${index}`,language:index%2?'ja':'en',label:`${type==='v'?'一个很长的薄弱词汇中文释义':'一条很长的薄弱语法中文标题'} ${index}`,classification:index<2?'relearning':'weak',reason:index<2?'上次回答错误':`已出现 ${index+1} 次遗忘`,reasons:[],attempts:5,correct_count:2,wrong_count:3,accuracy:40,lapse_count:index+1,review_stage:index<2?0:2,last_wrong_at:1_999_999_000,next_review_at:2_000_000_600,target:type==='v'?`/vocabulary-detail.html?id=v-${index}&lang=en`:`/grammar-detail.html?id=g-${index}&lang=en`});
const recommendation={data:{primary_action:{type:'review_due',reason:'你有 999999 个到期复习项目。',target:'/review.html',count:999999},weak_vocabulary:Array.from({length:5},(_,i)=>weak('v',i)),weak_grammar:Array.from({length:5},(_,i)=>weak('g',i)),lesson:{continue:{id:'ja-s6-l4',language:'ja',stage:6,sequence:4,title:recent.data[0].title,target:'/lesson.html?id=ja-s6-l4&lang=ja&stage=6'},next:null,paths:{en:{continue:null,next:null,complete:false},ja:{continue:null,next:null,complete:false}},all_complete:false,available:48},review:{server_time:2_000_000_000,vocabulary:{due_count:999998},grammar:{due_count:1},total_due:999999,total_scheduled:999999,next_review_at:null},generated_at:2_000_000_000,limits:{weak_vocabulary:5,weak_grammar:5,maximum:20}}};
const emptySummary={data:{today:{attempts:0},vocabulary:{studied:0,attempts:0,correct_count:0,wrong_count:0,accuracy:null},grammar:{studied:0,attempts:0,correct_count:0,wrong_count:0,accuracy:null},lessons:{studied:0,completed:0,in_progress:0}}};
const first={id:'en-s1-l1',language:'en',stage:1,sequence:1,title:'打招呼并开始简单交谈',target:'/lesson.html?id=en-s1-l1&lang=en&stage=1'};
const emptyRecommendation={data:{primary_action:{type:'start_next_lesson',reason:'从 英语第一课开始学习。',target:first.target,lesson:first},weak_vocabulary:[],weak_grammar:[],lesson:{continue:null,next:first,paths:{en:{continue:null,next:first,complete:false},ja:{continue:null,next:{...first,id:'ja-s1-l1',language:'ja',title:'基本のあいさつを交わす',target:'/lesson.html?id=ja-s1-l1&lang=ja&stage=1'},complete:false}},all_complete:false,available:48},review:{server_time:2_000_000_000,vocabulary:{due_count:0},grammar:{due_count:0},total_due:0,total_scheduled:0,next_review_at:null},generated_at:2_000_000_000,limits:{weak_vocabulary:5,weak_grammar:5,maximum:20}}};
const fulfill=(route,body)=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(body)});

async function routes(page,{empty=false}={}){
 await page.route('**/api/me',route=>fulfill(route,account));
 await page.route('**/api/progress/summary',route=>fulfill(route,empty?emptySummary:summary));
 await page.route('**/api/progress/recent?limit=8',route=>fulfill(route,empty?{data:[]}:recent));
 await page.route('**/api/recommendations',route=>fulfill(route,empty?emptyRecommendation:recommendation));
}

(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});try{
 for(const width of [360,390,430,768,1440]){const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];page.on('pageerror',error=>errors.push(error.message));await routes(page);await page.goto(base+'/progress.html');await page.getByRole('heading',{name:/999999/}).waitFor();await page.getByRole('heading',{name:'薄弱词汇'}).waitFor();await page.getByRole('heading',{name:'薄弱语法'}).waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`dashboard overflow at ${width}px`);assert.deepEqual(errors,[]);await page.close();}
 const empty=await browser.newPage({viewport:{width:390,height:844}});await routes(empty,{empty:true});await empty.goto(base+'/progress.html');await empty.getByRole('heading',{name:/英语第一课/}).waitFor();await empty.getByText(/尚无答题记录/).waitFor();assert.equal(await empty.getByText(/暂无基于真实答题记录识别出的薄弱项/).count(),2);assert.equal(await empty.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await empty.close();
 console.log(JSON.stringify({passed:true,widths:[360,390,430,768,1440],cases:['next-action card','large counts','long labels','weak vocabulary','weak grammar','new-account empty state','no horizontal overflow']}));
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
