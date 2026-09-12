import fs from 'node:fs';
import assert from 'node:assert/strict';
const before=JSON.parse(fs.readFileSync('docs/phase35b1/integrity-before.json')),after=JSON.parse(fs.readFileSync('docs/phase35b1/integrity-after.json'));
for(const name of ['ej-learning','ej-learning-phase3','ej-learning-35a'])assert.deepEqual(after[name],before[name],name);
for(const key of ['schema','migrations','tableHashes'])assert.deepEqual(after['ej-learning-35b'][key],before['ej-learning-35b'][key],key);
for(const key of ['domains','routes','dns','localHashes'])assert.deepEqual(after[key],before[key],key);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);}
for(const original of walk('public')){
 const copy=original.replace(/^public\//,'public-v2/legacy/');let text=fs.readFileSync(copy,'utf8');
 if(original.endsWith('.html'))text=text.replace('<link rel="stylesheet" href="/legacy-navigation.css"><script src="/legacy-navigation.js" defer></script>','').replace('\n<div class="compat-navigation" role="navigation" aria-label="版本导航"><span>旧版学习（兼容）</span><a id="return-v2" href="/">返回新版学习 →</a></div>','');
 assert.equal(text,fs.readFileSync(original,'utf8'),original);
}
fs.writeFileSync('docs/phase35b1/integrity-verification.json',JSON.stringify({passed:true,protectedEnvironmentsUnchanged:true,staging35bDatabaseUnchanged:true,protectedLocalSourcesUnchanged:true,legacyChanges:'Only additive navigation markup, stylesheet and script; original learning assets unchanged',checkedAt:new Date().toISOString()},null,2));
console.log('Protected environments, 35b D1 and all original learning assets unchanged.');
