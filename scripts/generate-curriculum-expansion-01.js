import fs from 'node:fs';
import path from 'node:path';
import {bundleId,schemaVersion,publishedAt,loadExpansion} from './curriculum-expansion-01.js';

const root=process.cwd(),migrationDirectory=path.join(root,'migrations-curriculum-expansion-01');
const migrationFile=path.join(migrationDirectory,'0001_curriculum_expansion_01a_bundle.sql');
const {matrix,bundle}=loadExpansion(root);
const quote=value=>`'${String(value).replaceAll("'","''")}'`;
const sql=[
 '-- Curriculum Expansion 01A: immutable additive curriculum bundle.',
 '-- Adds only approved lesson relationships and replaces six prerequisite edges inside the new payload.',
 'CREATE TABLE IF NOT EXISTS lesson_bundles (id TEXT PRIMARY KEY,schema_version TEXT NOT NULL,payload_json TEXT NOT NULL,published_at TEXT NOT NULL);',
 `INSERT OR IGNORE INTO lesson_bundles(id,schema_version,payload_json,published_at) VALUES(${quote(bundleId)},${quote(schemaVersion)},${quote(JSON.stringify(bundle))},${quote(publishedAt)});`
].join('\n\n')+'\n';
fs.mkdirSync(migrationDirectory,{recursive:true});
if(fs.existsSync(migrationFile)&&fs.readFileSync(migrationFile,'utf8')!==sql&&!process.argv.includes('--refresh'))throw Error('Curriculum Expansion 01A migration is immutable and differs from generated source');
if(!fs.existsSync(migrationFile)||process.argv.includes('--refresh'))fs.writeFileSync(migrationFile,sql);
const additions=Object.fromEntries(['en','ja'].map(language=>[language,Object.fromEntries(['vocabulary','grammar','expression'].map(type=>[type,matrix.additions.filter(row=>row.lesson_id.startsWith(language+'-')&&row.content_type===type).length]))]));
console.log(JSON.stringify({bundle_id:bundleId,schema_version:schemaVersion,target_links:matrix.approved.length,added_links:matrix.additions.length,additions},null,2));
