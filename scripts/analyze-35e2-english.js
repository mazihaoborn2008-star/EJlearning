import fs from 'node:fs';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';

const root=path.resolve(import.meta.dirname,'..');
const csv=fs.readFileSync(path.join(root,'.cache/phase35e2/ECDICT/ecdict.csv'),'utf8');
function* records(text){
 let row=[],field='',quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else quoted=false;}else field+=c;continue;}
  if(c==='"'){quoted=true;continue;}
  if(c===','){row.push(field);field='';continue;}
  if(c==='\n'){row.push(field.replace(/\r$/,''));yield row;row=[];field='';continue;}
  field+=c;
 }
 if(field||row.length){row.push(field);yield row;}
}
const rows=records(csv),headers=rows.next().value,index=Object.fromEntries(headers.map((x,i)=>[x,i]));
const existingPath=fs.readdirSync(path.join(root,'.wrangler/phase35e1c-release-final-2/v3/d1/miniflare-D1DatabaseObject')).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite');
const db=new DatabaseSync(path.join(root,'.wrangler/phase35e1c-release-final-2/v3/d1/miniflare-D1DatabaseObject',existingPath),{readOnly:true});
const existing=new Set(db.prepare("SELECT lower(trim(lemma)) lemma FROM v2_vocabulary_items WHERE language='en' AND publication_state='published'").all().map(x=>x.lemma.normalize('NFKC')));
const n=v=>{const x=Number(v);return Number.isFinite(x)&&x>0?x:null;};
const mapPos=(raw,definition,translation)=>{
 const codes=[...String(raw||'').matchAll(/(?:^|\/)([a-z-]+)(?::\d+)?/g)].map(x=>x[1]);
 if(!codes.length){
  const text=String(definition||'')+'\n'+String(translation||'');
  for(const m of text.matchAll(/(?:^|\n)\s*(n|v|vt|vi|a|s|adj|r|adv|prep|p|conj|c|pron|art|det|num|int|aux)\./gi))codes.push(m[1].toLowerCase());
 }
 if(codes.some(x=>x==='n'))return'noun';if(codes.some(x=>x==='v'||x.startsWith('v')))return'verb';
 if(codes.some(x=>x==='a'||x.startsWith('adj')))return'adjective';if(codes.some(x=>x==='r'||x==='adv'))return'adverb';
 if(codes.some(x=>x==='p'||x==='prep'))return'preposition';if(codes.some(x=>x==='c'||x==='conj'))return'conjunction';
 if(codes.some(x=>x==='d'||x==='det'||x==='art'))return'determiner';if(codes.some(x=>x==='m'||x==='num'))return'numeral';
 if(codes.some(x=>x==='pron'))return'pronoun';if(codes.some(x=>x==='int'))return'interjection';
 if(codes.some(x=>x==='u'))return'auxiliary';return null;
};
const rejected={malformed:0,proper:0,inflected:0,missingMeaning:0,missingPos:0,duplicate:0};
const candidates=new Map();
for(const row of rows){
 const raw=String(row[index.word]||'').normalize('NFKC').trim(),word=raw.toLowerCase();
 if(!/^[a-z][a-z'-]{1,29}$/.test(word)||word.includes('--')||word.startsWith("'")||word.endsWith("'")){rejected.malformed++;continue;}
 if(raw!==word){rejected.proper++;continue;}
 const exchange=String(row[index.exchange]||''),lemma=(exchange.match(/(?:^|\/)0:([^/]+)/)||[])[1];
 if(lemma&&lemma.normalize('NFKC').trim().toLowerCase()!==word){rejected.inflected++;continue;}
 const translation=String(row[index.translation]||'').trim();if(!translation){rejected.missingMeaning++;continue;}
 const pos=mapPos(row[index.pos],row[index.definition],translation);if(!pos){rejected.missingPos++;continue;}
 const bnc=n(row[index.bnc]),frq=n(row[index.frq]),best=Math.min(bnc??999999,frq??999999);
 if(best===999999&&!row[index.oxford]&&!row[index.collins]&&!row[index.tag]){rejected.malformed++;continue;}
 let score=best;
 if(String(row[index.oxford])==='1')score-=1800;
 score-=Math.min(5,n(row[index.collins])||0)*180;
 const tags=String(row[index.tag]||'').split(/\s+/);if(tags.includes('gk'))score-=500;if(tags.includes('cet4'))score-=700;if(tags.includes('cet6'))score-=400;if(tags.includes('ielts'))score-=900;if(tags.includes('toefl'))score-=250;
 if(bnc&&frq)score-=150;
 const item={word,pos,score,bnc,frq,phonetic:row[index.phonetic],translation,exchange,tags};
 const prior=candidates.get(word);if(prior){rejected.duplicate++;if(prior.score<=score)continue;}
 candidates.set(word,item);
}
const selected=[...candidates.values()].filter(x=>!existing.has(x.word)).sort((a,b)=>a.score-b.score||a.word.localeCompare(b.word)).slice(0,10000-existing.size);
const all=[...existing,...selected.map(x=>x.word)];
console.log(JSON.stringify({source_candidates:candidates.size,existing:existing.size,selected_new:selected.length,final:all.length,rejected,cutoff:selected.at(-1),pos:Object.fromEntries([...new Set(selected.map(x=>x.pos))].sort().map(p=>[p,selected.filter(x=>x.pos===p).length])),az:Object.fromEntries('abcdefghijklmnopqrstuvwxyz'.split('').map(c=>[c,all.filter(x=>x[0]===c).length])),samples:selected.slice(0,40).map(x=>({word:x.word,pos:x.pos,score:x.score,bnc:x.bnc,frq:x.frq,translation:x.translation.slice(0,60)})),tail:selected.slice(-20).map(x=>({word:x.word,pos:x.pos,score:x.score,bnc:x.bnc,frq:x.frq,translation:x.translation.slice(0,60)}))},null,2));
