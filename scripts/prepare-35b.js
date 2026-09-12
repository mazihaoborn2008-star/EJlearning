import fs from 'node:fs';
for(const name of fs.readdirSync('migrations-v2')){
 const source=fs.readFileSync('migrations-v2/'+name),target='migrations-35b/'+name;
 if(fs.existsSync(target)&&!source.equals(fs.readFileSync(target)))throw Error('Immutable migration mismatch '+name);
 fs.writeFileSync(target,source);
}
fs.cpSync('public','public-v2/legacy',{recursive:true});
// Compatibility shell only; original assets and learning scripts stay unchanged.
for(const name of fs.readdirSync('public-v2/legacy').filter(n=>n.endsWith('.html'))){
 const path='public-v2/legacy/'+name;
 let html=fs.readFileSync(path,'utf8');
 html=html.replace('<head>','<head><link rel="stylesheet" href="/legacy-navigation.css"><script src="/legacy-navigation.js" defer></script>');
 html=html.replace(/(<body[^>]*>)/,'$1\n<div class="compat-navigation" role="navigation" aria-label="版本导航"><span>旧版学习（兼容）</span><a id="return-v2" href="/">返回新版学习 →</a></div>');
 fs.writeFileSync(path,html);
}
