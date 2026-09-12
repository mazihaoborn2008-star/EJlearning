import fs from 'node:fs';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';

const root=path.resolve(import.meta.dirname,'..');
const jlpt=JSON.parse(fs.readFileSync(path.join(root,'.cache/phase35e2/JapaneseLanguageData/data/enrichment/jlpt-classifications.json'),'utf8')).classifications.filter(x=>x.kind==='vocab');
const tomoshi=new DatabaseSync(path.join(root,'.cache/phase35e2/tomoshi-dict-open.db'),{readOnly:true});
const existingPath=fs.readdirSync(path.join(root,'.wrangler/phase35e1c-release-final-2/v3/d1/miniflare-D1DatabaseObject')).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite');
const existing=new DatabaseSync(path.join(root,'.wrangler/phase35e1c-release-final-2/v3/d1/miniflare-D1DatabaseObject',existingPath),{readOnly:true});
const existingJa=existing.prepare("SELECT lemma,reading,part_of_speech FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published'").all();
const norm=s=>String(s||'').normalize('NFKC').trim();
const byLemma=new Map();
let duplicateLemma=0,missingSeq=0,missingEntry=0,missingZh=0,missingPos=0,missingReading=0;
const entry=tomoshi.prepare('SELECT data FROM entries WHERE id=?');
const zh=tomoshi.prepare("SELECT data FROM zh_defs WHERE entry_id=? AND locale='zh-CN'");
for(const x of jlpt){
 const key=norm(x.text);
 if(byLemma.has(key)){duplicateLemma++;continue;}
 byLemma.set(key,x);
 if(!x.jmdict_seq){missingSeq++;continue;}
 const e=entry.get(String(x.jmdict_seq));
 if(!e){missingEntry++;continue;}
 const data=JSON.parse(e.data);
 if(!data.senses?.some(s=>s.pos?.length))missingPos++;
 if(!zh.get(String(x.jmdict_seq)))missingZh++;
 let reading=norm(x.reading);
 if(!reading&&/^[\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u.test(key))reading=key;
 if(!reading)missingReading++;
}
const existingSet=new Set(existingJa.map(x=>norm(x.lemma)));
const overlap=[...byLemma.keys()].filter(x=>existingSet.has(x)).length;
console.log(JSON.stringify({
 source_rows:jlpt.length,
 by_level:Object.fromEntries(['N5','N4','N3','N2','N1'].map(l=>[l,jlpt.filter(x=>x.level===l).length])),
 unique_lemma:byLemma.size,duplicate_lemma:duplicateLemma,existing_ja:existingJa.length,existing_overlap:overlap,
 union_count:existingSet.size+[...byLemma.keys()].filter(x=>!existingSet.has(x)).length,
 missing_seq:missingSeq,missing_entry:missingEntry,missing_zh:missingZh,missing_pos:missingPos,missing_reading:missingReading
},null,2));
