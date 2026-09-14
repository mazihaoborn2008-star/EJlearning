const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');

const root=path.resolve(__dirname,'..'),publicRoot=path.join(root,'public-36'),port=8821,base=`http://127.0.0.1:${port}`;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{const pathname=new URL(request.url,base).pathname,file=path.join(publicRoot,pathname==='/'?'index.html':pathname.slice(1));if(!file.startsWith(publicRoot)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){response.writeHead(404);response.end();return;}response.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(response);});
const representative=['en-s2-l5','en-s3-l9','ja-s2-l5','ja-s3-l8','ja-s4-l6'];

function lessonFixture(id,rows){
 const language=id.slice(0,2),parts=id.match(/s(\d)-l(\d)/),items=rows.filter(row=>row.lesson_id===id),make=(row,index)=>({id:row.content_id,language,instructional_role:row.instructional_role,role:index===0?'required':'support',required:index===0?1:0,sequence:index+1});
 const vocabulary=items.filter(row=>row.content_type==='vocabulary').map((row,index)=>({...make(row,index),lemma:`${language.toUpperCase()} vocabulary ${index+1}`,meaning_zh:`词义 ${index+1}`,ipa:language==='en'?'test':null,reading:language==='ja'?'よみ':null}));
 const grammar=items.filter(row=>row.content_type==='grammar').map((row,index)=>({...make(row,index),title_zh:`语法 ${index+1}`,form_name:`Form ${index+1}`}));
 const expressions=items.filter(row=>row.content_type==='expression').map((row,index)=>({...make(row,index),anchor_zh:`表达 ${index+1}`,text:`Expression ${index+1}`,readings:[],unit_id:`unit-${row.content_id}`,unit_type:index===0?'dialogue':'sentence',context_zh:'课程情境',dialogue:index===0?[{speaker:'A',text:'First turn',readings:[],sequence:0},{speaker:'B',text:'Second turn',readings:[],sequence:1}]:[]}));
 return {id,language,stage:Number(parts[1]),sequence:Number(parts[2]),title:`Expanded ${id}`,objective:'完成扩展课程目标。',topic:'扩展课程',estimated_minutes:18,vocabulary_count:vocabulary.length,grammar_count:grammar.length,expression_count:expressions.length,scenario_count:1,previous:null,next:null,prerequisites:[],vocabulary,grammar,expressions};
}

(async()=>{
 const {loadExpansion}=await import('../scripts/curriculum-expansion-01.js'),{matrix}=loadExpansion(root),fixtures=new Map(representative.map(id=>[id,lessonFixture(id,matrix.approved)]));
 await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  for(const width of [360,390,430,768,1440])for(const id of representative){
   const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.setDefaultTimeout(5000);page.on('pageerror',error=>errors.push(error.message));
   await page.route('**/api/me',route=>route.fulfill({status:200,contentType:'application/json',body:'{"data":{"authenticated":false}}'}));
   await page.route(`**/api/v2/lessons/${id}`,route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:fixtures.get(id),bounded:true})}));
   await page.goto(`${base}/lesson.html?id=${id}&lang=${id.slice(0,2)}&stage=${fixtures.get(id).stage}`);await page.getByRole('heading',{name:`Expanded ${id}`}).waitFor();
   const expected=fixtures.get(id),all=[...expected.vocabulary,...expected.grammar,...expected.expressions];
   assert.equal(new Set(all.map(item=>item.id)).size,all.length,`${id} fixture uniqueness`);
   for(const [tab,panel,count] of [['词汇','vocabulary',expected.vocabulary.length],['语法','grammar',expected.grammar.length],['表达','expressions',expected.expressions.filter(item=>item.unit_type==='sentence').length]]){await page.getByRole('tab',{name:new RegExp(tab)}).click();assert.equal(await page.locator(`[data-panel="${panel}"] .lesson-item`).count(),count,`${id} ${tab}`);}
   await page.getByRole('tab',{name:/情境/}).click();await page.getByText('First turn').waitFor();
   assert.equal(await page.locator('.lesson-new,.lesson-review,.lesson-support').count(),all.length);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id} overflow at ${width}`);assert.deepEqual(errors,[]);await page.close();
  }
  console.log(JSON.stringify({passed:true,widths:[360,390,430,768,1440],lessons:representative,cases:['all linked content rendered once','authored role labels','dialogue readability','no horizontal overflow']}));
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(async error=>{console.error(error);if(server.listening)await new Promise(resolve=>server.close(resolve));process.exitCode=1;});
