const KEY='kotoba.phase3.v1',LEGACY_KEY='kotoba.phase1.v1';
const fresh=()=>({version:3,levels:{en:null,ja:null},mastery:{en:{},ja:{}},last:1,lastByLang:{en:null,ja:null},recent:{en:[],ja:[]},weak:{en:[],ja:[]},queues:{en:[],ja:[]},checkpoints:{en:{},ja:{}},activity:{}});
let state=fresh();
function restoreState(){
 let s,migrate=false;try{const raw=localStorage.getItem(KEY);if(raw){s=JSON.parse(raw);}else{s=JSON.parse(localStorage.getItem(LEGACY_KEY));migrate=!!s;}}catch{return;}
 if(!s||typeof s!=='object'||Array.isArray(s))return;
 const ids=new Set(concepts.map(c=>c.id));
 const idList=a=>Array.isArray(a)?[...new Set(a.filter(id=>Number.isInteger(id)&&ids.has(id)))].slice(0,220):[];
 for(const l of ['en','ja']){
  const r=s.levels?.[l];if(Number.isInteger(r?.level)&&r.level>=1&&r.level<=6){state.levels[l]={level:r.level,date:typeof r.date==='string'?r.date:'',...(Number.isInteger(r.score)&&r.score>=0&&r.score<=18?{score:r.score}:{}),summary:typeof r.summary==='string'?r.summary:levelDescriptions[r.level-1],evidence:typeof r.evidence==='string'?r.evidence:'沿用之前保存的能力定位；可以重新定位获得更多依据。',startingDifficulty:r.level,recommendedTopics:Array.isArray(r.recommendedTopics)?r.recommendedTopics.filter(t=>topics.some(x=>x.id===t)):[]};}
  for(const [id,v] of Object.entries(s.mastery?.[l]||{}))if(/^\d+$/.test(id)&&ids.has(Number(id))&&['new','learning','learned','review'].includes(v))state.mastery[l][id]=v;
  for(const k of ['recent','weak','queues'])state[k][l]=idList(s[k]?.[l]);
  state.lastByLang[l]=ids.has(s.lastByLang?.[l])?s.lastByLang[l]:ids.has(s.last)?s.last:null;
  for(const t of topics){const cp=s.checkpoints?.[l]?.[t.id];if(cp&&Number.isInteger(cp.percentage)&&cp.percentage>=0&&cp.percentage<=100)state.checkpoints[l][t.id]={percentage:cp.percentage,weakConcepts:idList(cp.weakConcepts),date:typeof cp.date==='string'?cp.date:''};}
 }
 if(ids.has(s.last))state.last=s.last;
 if(s.activity&&typeof s.activity==='object'&&!Array.isArray(s.activity))state.activity=s.activity;
 if(migrate)save(); // Original Phase 1/2 key remains untouched as a recovery copy.
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{document.querySelector('#storage-warning').hidden=false;}}
function mark(lang,id,value){state.mastery[lang][id]=value;state.lastByLang[lang]=id;state.recent[lang]=[id,...state.recent[lang].filter(x=>x!==id)].slice(0,20);if(value==='learned')state.weak[lang]=state.weak[lang].filter(x=>x!==id);save();}
function learnerProfile(lang){return {lang,level:state.levels[lang]?.level||1,mastery:state.mastery[lang],recent:state.recent[lang],weak:state.weak[lang],last:state.lastByLang[lang]};}
