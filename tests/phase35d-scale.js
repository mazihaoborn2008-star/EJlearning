import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const wrangler=sql=>{const r=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','wrangler.35d.local.jsonc','--persist-to','.wrangler/phase35d-clean','--command',sql,'--json'],{encoding:'utf8',maxBuffer:5*1024*1024});if(r.status)throw Error(r.stderr||r.stdout);return r.stdout;};
const base=process.env.BASE_URL||'http://127.0.0.1:8799';
try{
 wrangler(`WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x<5000) INSERT OR IGNORE INTO v2_vocabulary_items(id,language,lemma,type,stage,ipa,reading,part_of_speech,register,publication_state,sort_order) SELECT 'perf-35d-'||x,'en','perfword'||x,'word',6,'pɜːf',NULL,'noun','neutral','draft',900000+x FROM n`);
 const started=performance.now();for(let i=0;i<20;i++){const r=await fetch(base+'/api/v2/lessons/en-s1-l1');assert.equal(r.status,200);const body=await r.json();assert.equal(body.data.vocabulary.length,8);assert.equal(body.data.expressions.length,4);}const elapsed=Math.round(performance.now()-started);
 const raw=wrangler("SELECT COUNT(*) n FROM v2_vocabulary_items WHERE id LIKE 'perf-35d-%'"),count=JSON.parse(raw.slice(raw.indexOf('[')))[0].results[0].n;assert.equal(count,5000);console.log(`Phase 3.5D scale test passed: ${count} synthetic vocabulary rows; 20 bounded lesson details in ${elapsed}ms.`);
}finally{wrangler("DELETE FROM v2_vocabulary_items WHERE id LIKE 'perf-35d-%'");}
