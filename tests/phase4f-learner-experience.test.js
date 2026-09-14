import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {settings,startOfLocalDay,validTimeZone} from '../src/settings-4f.js';

const origin='https://ej-learning.test',now=1_789_344_000;
const migration=name=>fs.readFileSync(new URL(`../migrations-staging-schema/${name}`,import.meta.url),'utf8');
function harness(){const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');sqlite.exec(migration('0002_phase4a_email_auth.sql'));sqlite.exec(migration('0006_phase4f_learner_experience.sql'));for(const id of ['user-a','user-b'])sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')").run(id,id+'@example.com',id+'@example.com',1,1);const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async run(){const result=sqlite.prepare(sql).run(...values);return{meta:{changes:Number(result.changes)}};}});return{sqlite,env:{DB:{prepare:sql=>wrap(sql)},AUTH_SECRET:'phase4f-test-secret-longer-than-thirty-two'},services:{now:()=>now,session:async request=>request.headers.get('X-Test-User')?{user_id:request.headers.get('X-Test-User')}:null}};}
function request({method='GET',user='user-a',body,path='/api/settings'}={}){const headers=new Headers({Origin:origin});if(user)headers.set('X-Test-User',user);if(body!==undefined)headers.set('Content-Type','application/json');return new Request(origin+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});}
async function call(h,options={}){const response=await settings(request(options),h.env,h.services);return{response,body:await response.json()};}

test('settings are empty per user and strict authenticated patches are idempotent',async()=>{
 const h=harness();assert.deepEqual((await call(h)).body.data,{preferred_learning_language:null,timezone:null,updated_at:null});
 let result=await call(h,{method:'PATCH',body:{preferred_learning_language:'en',timezone:'Pacific/Auckland'}});assert.equal(result.body.data.changed,true);assert.equal(result.body.data.preferred_learning_language,'en');
 const changes=h.sqlite.prepare('SELECT total_changes() n').get().n;result=await call(h,{method:'PATCH',body:{preferred_learning_language:'en',timezone:'Pacific/Auckland'}});assert.equal(result.body.data.changed,false);assert.equal(h.sqlite.prepare('SELECT total_changes() n').get().n,changes);
 result=await call(h,{method:'PATCH',body:{preferred_learning_language:'ja',timezone:'Asia/Tokyo'}});assert.equal(result.body.data.preferred_learning_language,'ja');assert.equal((await call(h,{user:'user-b'})).body.data.preferred_learning_language,null);
 assert.equal((await call(h,{user:null})).response.status,401);
});

test('settings reject invalid timezone, forged identity, unsupported language, and unknown fields',async()=>{
 const h=harness();for(const body of [{timezone:'Pacific/Not_A_Zone'},{timezone:'+12:00'},{preferred_learning_language:'fr'},{user_id:'user-b'},{email:'new@example.com'},{theme:'dark'}])assert.equal((await call(h,{method:'PATCH',body})).response.status,400,JSON.stringify(body));
 assert.equal((await call(h,{method:'PATCH',body:{timezone:'America/Los_Angeles'}})).response.status,200);assert(validTimeZone('UTC'));assert(validTimeZone('Pacific/Auckland'));assert(!validTimeZone('UTC+12'));
});

test('local today boundaries differ while the absolute instant stays unchanged',()=>{
 const instant=Math.floor(Date.parse('2026-09-14T11:30:00Z')/1000),auckland=startOfLocalDay(instant,'Pacific/Auckland'),losAngeles=startOfLocalDay(instant,'America/Los_Angeles');
 assert.equal(new Date(auckland*1000).toISOString(),'2026-09-13T12:00:00.000Z');assert.equal(new Date(losAngeles*1000).toISOString(),'2026-09-14T07:00:00.000Z');assert.notEqual(auckland,losAngeles);assert.equal(instant,Math.floor(Date.parse('2026-09-14T11:30:00Z')/1000));
});

test('migration is minimal, nullable for existing users, and user-owned',()=>{
 const h=harness(),columns=h.sqlite.prepare("SELECT name,\"notnull\" required FROM pragma_table_info('user_settings') ORDER BY cid").all();assert.deepEqual(columns.map(x=>[x.name,x.required]),[['user_id',0],['preferred_learning_language',0],['timezone',0],['updated_at',1]]);assert.equal(h.sqlite.prepare('SELECT COUNT(*) n FROM user_settings').get().n,0);
});
