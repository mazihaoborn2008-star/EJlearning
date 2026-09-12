import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
fs.mkdirSync('migrations-35c',{recursive:true});
fs.mkdirSync('public-35c',{recursive:true});
for(const file of fs.readdirSync('migrations-35b')){
 const source=fs.readFileSync('migrations-35b/'+file),target='migrations-35c/'+file;
 if(fs.existsSync(target))assert(source.equals(fs.readFileSync(target)));else fs.writeFileSync(target,source);
}
if(!fs.existsSync('public-35c/index.html'))fs.cpSync('public-v2','public-35c',{recursive:true});
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);
const files=[...walk('public'),...walk('public-v2'),...walk('src'),...walk('migrations'),...walk('migrations-v2'),...walk('migrations-35b'),...fs.readdirSync('.').filter(f=>/^wrangler\..*jsonc$/.test(f)&&!f.includes('35c')),'package.json','package-lock.json'];
const hashes=Object.fromEntries(files.map(f=>[f,createHash('sha256').update(fs.readFileSync(f)).digest('hex')]));
if(!fs.existsSync('docs/phase35c/protected-local.json'))fs.writeFileSync('docs/phase35c/protected-local.json',JSON.stringify(hashes,null,2));
console.log('Isolated assets and immutable migration prefix prepared.');
