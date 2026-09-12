// Structured editorial pass, executed before the additive migration is frozen/applied.
export function review({db,add,sql,q,readings,vocab}){
 const all=t=>db.prepare('SELECT * FROM v2_'+t).all();let n=0;
 const update=(t,id,values)=>{const s=`UPDATE v2_${t} SET ${Object.entries(values).map(([k,v])=>k+'='+q(v)).join(',')} WHERE id=${q(id)};`;db.exec(s);sql.push(s);};
 const extra={en:[['do','duː','verb',1,'做','What are you doing?','你在做什么？'],['live','lɪv','verb',1,'居住','I live nearby.','我住在附近。'],['thanks','θæŋks','interjection',1,'谢谢','Thanks a lot.','非常感谢。'],['look','lʊk','verb',1,'看','Just looking, thanks.','只是看看，谢谢。'],['no worries','noʊ ˈwɜːriz','fixed expression',2,'没关系','No worries.','没关系。'],['okay','oʊˈkeɪ','adjective',1,'没事的','I am okay now.','我现在没事了。']],ja:[['わかる','わかる','verb',1,'理解；明白','わかりました。','明白了。'],['おはよう','おはよう','interjection',1,'早上好','おはようございます。','早上好。'],['ありがとう','ありがとう','interjection',1,'谢谢','ありがとうございます。','谢谢。'],['する','する','verb',1,'做','何をしていますか。','你在做什么？'],['行き方','いきかた','noun',2,'前往的方法','行き方を教えてください。','请告诉我怎么去。'],['間に合う','まにあう','verb',3,'来得及','電車に間に合いました。','赶上了电车。'],['鍵','かぎ','noun',1,'钥匙','鍵をかけます。','锁门。'],['迷う','まよう','verb',3,'犹豫；拿不定主意','色で迷っています。','在颜色上拿不定主意。'],['見る','みる','verb',1,'看','見ているだけです。','只是看看。'],['頭','あたま','noun',1,'头','頭が痛いです。','头疼。'],['今度','こんど','noun',2,'下次；这次（依语境）','また今度ね。','下次吧。'],['招く','まねく','verb',4,'招致','誤解を招く。','招致误解。'],['甲斐','かい','noun',5,'付出的价值','行った甲斐があった。','去得值得。'],['気にかける','きにかける','verb phrase',3,'关心；挂念','気にかけてくれてありがとう。','谢谢你关心我。']]};
 for(const [lang,rows] of Object.entries(extra))for(const [head,pron,pos,stage,meaning,example,zh] of rows)vocab(lang,head,pron,pos,stage,meaning,example,zh,'本例限定此义，不从中文字面推断其他用法。');
 vocab('en','Kyoto','kiˈoʊtoʊ','proper noun',2,'京都','been to Kyoto','去过京都','地名，用于旅行经历语境。');
 vocab('ja','京都','きょうと','proper noun',2,'京都','京都に行く','去京都','地名，用于旅行经历语境。');
 // Correct lexical asymmetries and domain-specific senses discovered in the full pass.
 const senseNotes={
 'ja:暑い':['天气炎热','用于气温热；物体烫常用熱い。'], 'ja:悟る':['领悟；察觉真相','比日常気づく更强调领悟，不是realize所有用法的替代。'],
 'ja:査定する':['核定价值或金额','多见财产、费用或绩效核定，不用于所有教育评价。'], 'ja:気遣い':['体贴；关照','名词；気遣いができる含能力结构，另见句例。'],
 'ja:慣れる':['习惯；适应','动词，不是acquired taste的对应名词；味に慣れる说明适应过程。'],
 'ja:座る':['坐下；坐','动词，不是seat的名词义。'], 'ja:音':['声音','音を小さくする表达调低音量，不是英语短语的逐词等价。'],
 'ja:少々':['少许；稍微','较礼貌，少々お待ちください用于请求稍候。'], 'ja:純粋':['纯粹；不掺杂','不是enjoyment的同义词；純粋に楽しむ可描述纯粹地享受。'],
 'ja:気持ち':['心情；心意','相手の気持ち表示对方感受或心意，不必然指好意。'],
 'ja:約束する':['约定；答应','commit to还可强调长期投入；本词条限定承诺的共同部分。'],
 'ja:差別化する':['使具有区别性','侧重产品等的差异化，不等于所有辨别两个对象的用法。'],
 'ja:堅牢':['牢固；系统稳健','多用于物体或系统的坚固可靠，不宜机械搭配所有证据。'],
 'ja:負担':['负担','比一般心理压力范围更具体；負担に感じる强调感到负担。'],
 'ja:よかった':['太好了；幸好','いい的过去形式作为反应语，范围不同于所有great用法。'],
 'ja:通る':['经过；通行','通ります在此构成借过提示。'], 'ja:乗り過ごす':['乘车坐过站','不包括miss错过机会或想念。'],
 'ja:分':['分钟（量词）','读音依前接数字变化：一分いっぷん、二分にふん、十分じゅっぷん。'],
 'ja:合鍵':['配制的钥匙；备用钥匙','本课程用于备用钥匙语境，读あいかぎ。'],
 'en:differentiate':['区分；使具有区别','differentiate A from B区分两者；differentiate a product使产品有别于其他产品。'],
 'en:significant':['重要的；显著的','日常重要性与统计显著性应分开；本义不自动表示统计检验结果。']};
 for(const [key,[meaning,note]] of Object.entries(senseNotes)){const [language,lemma]=key.split(':');const v=db.prepare('SELECT id FROM v2_vocabulary_items WHERE language=? AND lemma=?').get(language,lemma);if(v){const s=db.prepare('SELECT id FROM v2_vocabulary_senses WHERE item_id=? ORDER BY sort_order LIMIT 1').get(v.id);update('vocabulary_senses',s.id,{meaning_zh:meaning,usage_zh:note,semantic_label:meaning});}}
 // Morphological surfaces are explicitly listed; they are not inferred from a stem substring.
 const forms={en:{'do':['doing'],'wake up':['woke up'],'work on':['working on'],'turn down':['turn it down'],'pencil in':['pencil it in'],'minute':['minutes'],'card':['cards'],'take':['takes'],'miss':['missed'],'alternative':['alternatives'],'cool down':['cools down'],'expect':['expected'],'clear up':['clearing up'],"get back on one's feet":['getting back on my feet'],'grow on':['grown on me'],'appreciate':['appreciated'],'put out':['put you out'],'turn out':['turned out'],'look forward to':['looking forward to'],'walk':['walks'],'figure':['figures'],'live':['live'],'look':['looking'],'thanks':['Thanks'],'okay':['okay']},ja:{'する':['している','してい'],'起きる':['起きた'],'疲れる':['疲れた'],'わかる':['わからない','わかりません','わかりました','わかります'],'待つ':['待って','待ち'],'お腹がすく':['お腹がすいた'],'食べる':['食べたい','食べません','食べて','食べられ'],'遅れる':['遅れました'],'確認する':['確認させて','確認して','確認いたし'],'言い争う':['言い争い'],'取り替える':['替えて'],'取り組む':['取り組んで'],'説明する':['説明して'],'座る':['座って'],'着く':['着き'],'間に合う':['間に合い'],'通る':['通ります'],'乗り過ごす':['乗り過ごし'],'冷え込む':['冷え込み'],'晴れる':['晴れて'],'喉が渇く':['喉が渇き'],'休む':['休ませ'],'疲れがたまる':['疲れがたまって'],'怒る':['怒って'],'楽しい':['楽しそう'],'夢中になる':['夢中になり'],'練習する':['練習すれば'],'好きになる':['好きになって'],'誘う':['誘って'],'気遣う':['気遣って'],'助かる':['助かり'],'持つ':['持って'],'楽しみにする':['楽しみにして'],'会う':['会います','会おう','会える'],'行く':['行った','行き'],'迷う':['迷って'],'見る':['見て'],'招く':['招き'],'気にかける':['気にかけて']}};
 for(const lang of ['en','ja'])for(const v of all('vocabulary_items').filter(v=>v.language===lang))forms[lang][v.lemma]=[v.lemma,...(forms[lang][v.lemma]||[])];
 for(const e of all('sentence_expressions').filter(e=>e.id.startsWith('legacy-')||e.id.startsWith('lesson-')))for(const [head,variants] of Object.entries(forms[e.language])){
 const v=db.prepare('SELECT id FROM v2_vocabulary_items WHERE language=? AND lemma=? ORDER BY id LIMIT 1').get(e.language,head);if(!v)continue;
 const form=variants.find(s=>e.language==='en'?new RegExp('(?<![a-z])'+s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![a-z])','i').test(e.text):e.text.includes(s));if(!form)continue;
 const actual=e.text.match(new RegExp(form.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'))[0];
 if(!db.prepare('SELECT 1 FROM v2_sentence_vocabulary_links WHERE expression_id=? AND item_id=?').get(e.id,v.id))add('sentence_vocabulary_links',{id:'review-vl-'+(++n),expression_id:e.id,language:e.language,item_id:v.id,displayed_form:actual,importance:2,note_zh:'已检查本句变形与词头关系；义项以本语境为限。'});
 }
 // A past/nonpast distinction and causal construction must not be mislabeled as polite morphology.
 function grammar(id,language,level,title,formula,note,example,zh,kana){add('grammar_points',{id,language,slug:id.slice(3),level,title_zh:title,form_name:formula,core_zh:title,purpose_zh:title,formula,when_zh:note,mistakes_zh:note,nuance_zh:note,usage_zh:note,publication_state:'published'});add('grammar_examples',{id:'review-ge-'+id,grammar_id:id,language,text:example,translation_zh:zh,explanation_zh:note,readings_json:language==='ja'?readings(example,kana):'[]'});}
 grammar('ja-plain-past','ja',2,'普通体过去与完成','た形','普通体不带ました；过去叙述及状态变化需依动词判断。','ちょっと疲れた。','有点累了。','ちょっとつかれた。');
 grammar('ja-plain-nonpast','ja',1,'普通体非过去','辞书形','用于习惯或将来，不能仅由形式判断正在进行。','明日行く。','明天去。','あしたいく。');
 const replaceGrammar=(eid,gid)=>{const e=db.prepare('SELECT * FROM v2_sentence_expressions WHERE id=?').get(eid);if(!e)return;const links=db.prepare("SELECT id FROM v2_sentence_grammar_links WHERE expression_id=? AND id LIKE 'c-gl-%'").all(eid);for(const l of links)update('sentence_grammar_links',l.id,{grammar_id:gid,note_zh:db.prepare('SELECT nuance_zh FROM v2_grammar_points WHERE id=?').get(gid).nuance_zh});};
 for(const id of [3,6,21])replaceGrammar('legacy-'+id+'-ja','ja-plain-past');
 replaceGrammar('legacy-27-ja','ja-plain-past');replaceGrammar('legacy-98-ja','ja-plain-nonpast');
 replaceGrammar('legacy-35-en','en-be-adjective'); // be in the mood is a predicative phrase; point is expanded below.
 update('grammar_points','en-be-adjective',{formula:'subject + be + adjective / state phrase',form_name:'be + adjective / state phrase',when_zh:'用形容词或状态短语描述主语；in the mood等短语不是形容词本身。'});
 replaceGrammar('legacy-26-en','en-simple-present');
 // Explicit editorial difficulty triples: Vocabulary / Grammar / Overall; neither legacy rank nor a max/mean formula.
 const difficulty=`1 121 232;2 222 232;3 111 222;4 111 121;5 121 122;6 111 222;7 121 122;9 211 121;10 211 221;11 121 121;12 211 121;13 232 343;14 311 211;15 143 232;
17 111 111;18 212 232;19 222 232;20 111 111;21 323 323;23 333 344;24 354 444;25 323 333;26 433 453;27 424 333;29 111 121;30 222 222;31 221 322;32 333 333;33 222 222;35 333 333;36 333 333;37 343 344;38 514 434;39 344 444;41 121 121;42 323 333;43 222 333;44 343 333;45 323 333;47 333 333;48 333 333;49 334 444;50 434 414;51 434 444;53 121 121;54 222 222;55 323 333;56 333 333;57 222 232;59 444 434;60 354 333;61 434 434;62 323 333;63 424 444;65 211 342;66 222 212;67 212 132;68 222 322;69 222 333;71 423 333;72 344 354;73 413 333;74 424 434;75 424 444;77 211 232;78 222 212;79 222 232;80 222 333;81 222 222;83 313 333;84 232 333;85 333 333;86 313 333;87 424 434;89 121 212;91 211 222;92 222 222;93 222 222;95 323 323;96 344 343;97 411 333;98 323 333;99 324 344;101 311 211;102 212 232;103 333 333;104 333 333;105 223 333;107 434 414;108 455 555;109 333 334;110 343 444;111 434 434;113 221 221;114 221 211;115 333 344;116 333 333;117 212 222;119 313 333;120 333 444;121 313 334;122 434 434;123 424 333;125 111 111;126 311 333;127 222 333;128 333 333;129 313 333;131 313 444;132 333 444;133 333 343;134 434 313;135 434 434;137 211 131;138 222 232;139 211 232;140 232 333;141 313 333;142 434 333;143 433 323;144 354 354;145 414 333;146 444 344;147 434 444;149 111 111;150 222 222;151 222 333;152 222 222;155 333 333;156 354 444;157 333 333;158 323 333;159 424 333;161 331 311;162 222 333;163 222 222;164 333 333;165 222 333;167 343 344;168 344 344;169 211 212;170 434 444;173 221 221;174 222 233;175 222 333;176 232 333;177 324 344;178 343 333;179 424 444;180 455 444;181 413 333;182 444 444;183 424 545`;
 const applyDifficulty=(e,triplet,note)=>update('sentence_expressions',e.id,{vocabulary_difficulty:+triplet[0],grammar_difficulty:+triplet[1],overall_difficulty:+triplet[2],difficulty_note_zh:`编辑判断：词汇${triplet[0]}（常用度、义项与搭配）；语法${triplet[1]}（本句组合）；整体${triplet[2]}（${note}）。三个维度分别判断，不从旧等级或考试目标换算。`});
 for(const entry of difficulty.replace(/\n/g,'').split(';').filter(Boolean)){const [id,en,ja]=entry.trim().split(' ');for(const [lang,t] of [['en',en],['ja',ja]]){const e=db.prepare('SELECT * FROM v2_sentence_expressions WHERE id=?').get('legacy-'+id+'-'+lang);if(e)applyDifficulty(e,t,e.text.includes('\n')?'轮流应答、指代与协商负荷':'语境推断、句长与语气选择');}}
 const advanced={'en-inversion':'466','en-participle-clause':'466','en-cleft':'364','en-qualified-comparison':'566','en-mixed-conditional':'466','en-hedged-claim':'555','ja-zaru-wo-enai':'466','ja-ni-suginai':'465','ja-wo-fumaete':'566','ja-kanenai':'465','ja-ni-hoka-naranai':'566'};
 for(const [gid,t] of Object.entries(advanced)){const e=db.prepare('SELECT e.* FROM v2_sentence_expressions e JOIN v2_sentence_grammar_links l ON l.expression_id=e.id WHERE l.grammar_id=? ORDER BY e.id LIMIT 1').get(gid);if(e)applyDifficulty(e,t,'正式论述的限定、时间视角或强断定，需要结合语境控制');}
 // Prerequisites support browsing only, never learner eligibility.
 const relations=[['en-present-continuous','en-be-adjective'],['en-do-question','en-simple-present'],['en-ever-perfect','en-present-perfect'],['en-since-for','en-present-perfect'],['en-present-perfect-continuous','en-present-perfect'],['en-third-conditional','en-second-conditional'],['en-mixed-conditional','en-third-conditional'],['en-participle-clause','en-simple-past'],['ja-te-mo-ii','ja-te-form'],['ja-te-morau','ja-te-form'],['ja-te-itadaku','ja-te-morau'],['ja-te-oku','ja-te-form'],['ja-koto-ga-aru','ja-plain-past'],['ja-ba-hodo','ja-ba-condition'],['ja-ni-hoka-naranai','ja-copula']];
 for(const [source,target] of relations)add('grammar_relations',{source_id:source,target_id:target,language:source.slice(0,2),type:'prerequisite',note_zh:'先熟悉基础形式有助于比较；只作学习建议，不限制浏览或改变推荐引擎。'});
 for(const [source,target,note] of [['ja-sou','ja-hearsay-sou','样态由迹象判断，传闻转述信息；动词接续不同。'],['en-would-have','en-was-going-to','未实现结果与过去意图不同，不能仅凭中文本来就互换。'],['en-remember-to','en-ever-perfect','将要执行的提醒与做过的经历，不是同一种时间视角。']])add('grammar_relations',{source_id:source,target_id:target,language:source.slice(0,2),type:'contrast',note_zh:note});
 for(const [lang,a,b,note] of [['en','say','speak',''],['en','light','spicy','清淡/轻盈与辣度不是相反维度，可同时成立。'],['en','appointment','plan','appointment强调约定会面，plan范围更广。'],['en','robust','plausible','看似合理不等于经得起检验。'],['ja','保証','補償','保証偏保证或保修；補償偏弥补损失。'],['ja','暑い','寒い','两者都描述天气或环境温度。'],['ja','悟る','気づく','悟る常强调领悟，気づく用于普通察觉。']]){const arow=db.prepare('SELECT id FROM v2_vocabulary_items WHERE language=? AND lemma=?').get(lang,a),brow=db.prepare('SELECT id FROM v2_vocabulary_items WHERE language=? AND lemma=?').get(lang,b);if(arow&&brow)add('vocabulary_relations',{source_id:arow.id,target_id:brow.id,language:lang,type:'commonly_confused',note_zh:note});}
 // Remove false candidates inside Japanese compounds and disambiguate noun/verb plan.
 const rejected=[];
 for(const l of all('sentence_vocabulary_links')){
 const e=db.prepare('SELECT * FROM v2_sentence_expressions WHERE id=?').get(l.expression_id),v=db.prepare('SELECT * FROM v2_vocabulary_items WHERE id=?').get(l.item_id);let reason;
 if(l.language==='ja'&&/^[一-龯]$/.test(l.displayed_form)){
 const i=e.text.indexOf(l.displayed_form),before=e.text[i-1]||'',after=e.text[i+1]||'';
 if(/[一-龯]/.test(before+after)&&!(v.lemma==='分'&&/[一二三四五六七八九十]/.test(before)))reason='单字落在复合词内，不能把子串当作词义使用。';
 }
 if(v.lemma==='plan'&&v.part_of_speech==='noun'&&/\bplan to\b/.test(e.text))reason='本句plan为动词，不连名词义。';
 if(v.lemma==='話'&&/話[さしすせそ]/.test(e.text))reason='动词話す的变形不连接名词話。';
 if(v.lemma==='する'&&all('sentence_vocabulary_links').some(x=>x.expression_id===e.id&&x.id!==l.id))reason='不为已有实义目标的句子重复标普通する。';
 if(reason){const s=`DELETE FROM v2_sentence_vocabulary_links WHERE id=${q(l.id)};`;db.exec(s);sql.push(s);rejected.push({id:l.id,reason});}
 }
 update('sentence_expressions','on-way-ja',{readings_json:readings('今、途中です。','いま、とちゅうです。')});
 for(const [eid,gid] of [['on-way-en','en-be-adjective'],['apology-en-casual','en-greeting']]){const e=db.prepare('SELECT * FROM v2_sentence_expressions WHERE id=?').get(eid);add('sentence_grammar_links',{id:'review-gl-'+(++n),expression_id:eid,language:e.language,grammar_id:gid,displayed_form:e.text,note_zh:'完整状态短语/程式回应，依上下文理解。'});}
 const nw=db.prepare("SELECT id FROM v2_vocabulary_items WHERE lemma='no worries'").get();add('sentence_vocabulary_links',{id:'review-vl-'+(++n),expression_id:'apology-en-casual',language:'en',item_id:nw.id,displayed_form:'No worries',importance:3,note_zh:'轻松语气接受道歉。'});
 for(const [lang,head,pron,example,zh] of [['en','that said','ðæt sed',"It's expensive. That said, it's useful.",'很贵。不过很有用。'],['ja','とはいえ','とはいえ','高いです。とはいえ、便利です。','很贵。不过很方便。']]){
 const id=vocab(lang,head,pron,'fixed expression',4,'承认前述事实后补充限制或转折',example,zh,'话语连接成分；完整句另存Sentence，不能机械替换所有但是。');
 const source=db.prepare('SELECT id FROM expressions WHERE concept_id=26 AND language=? AND is_primary=1').get(lang);
 add('legacy_crosswalk',{id:'review-x-'+(++n),concept_id:26,legacy_expression_id:source.id,language:lang,vocabulary_id:id,role:'primary',note_zh:'独立可复用连接表达，完成句与语法另外保留。'});
 const e=db.prepare('SELECT * FROM v2_sentence_expressions WHERE id=?').get('legacy-26-'+lang);add('sentence_vocabulary_links',{id:'review-vl-'+(++n),expression_id:e.id,language:lang,item_id:id,displayed_form:lang==='en'?'That said':'とはいえ',importance:3});
 }
 const planSource=db.prepare("SELECT id FROM expressions WHERE concept_id=172 AND language='en' AND is_primary=1").get();add('legacy_crosswalk',{id:'review-x-plan-verb',concept_id:172,legacy_expression_id:planSource.id,language:'en',vocabulary_id:'en-plan',role:'extracted',note_zh:'名词为源项主映射；常用动词plan另教plan to / plan on。'});
 const examples={'en-intend':['I intend to leave tomorrow.','我打算明天离开。'], 'ja-kyuuni':['急に雨が降りました。','突然下雨了。','きゅうにあめがふりました。'],'ja-dekiru':['用事ができました。','临时有事了。','ようじができました。'],'ja-kitai':['成功を期待しています。','期待成功。','せいこうをきたいしています。'],'ja-yoki':['雨を予期しています。','预料会下雨。','あめをよきしています。']};
 for(const v of all('vocabulary_items'))if(!all('vocabulary_examples').some(x=>x.item_id===v.id)){
 const e=db.prepare('SELECT e.*,u.anchor_zh FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id JOIN v2_sentence_vocabulary_links l ON l.expression_id=e.id WHERE l.item_id=? ORDER BY e.id LIMIT 1').get(v.id);
 const x=examples[v.id];if(e||x)add('vocabulary_examples',{id:'review-ve-'+(++n),item_id:v.id,kind:'example',text:x?.[0]||e.text,translation_zh:x?.[1]||e.anchor_zh,readings_json:v.language==='ja'?(x?readings(x[0],x[2]):e.readings_json):'[]',note_zh:'本例展示当前义项，其他意义不自动迁移。'});
 }
 const refresh=vocab('ja','気分転換','きぶんてんかん','noun',3,'转换心情','散歩で気分転換をする','通过散步转换心情','指转换心情的活动或效果。');
 for(const [eid,head,form] of [['legacy-61-ja','見直す','見直し'],['legacy-68-ja','変更する','変更でき'],['lesson-ja-ni-naru-ex','気分転換','気分転換']]){
 const v=db.prepare("SELECT id FROM v2_vocabulary_items WHERE language='ja' AND lemma=?").get(head);add('sentence_vocabulary_links',{id:'review-vl-'+(++n),expression_id:eid,language:'ja',item_id:v.id,displayed_form:form,importance:3,note_zh:'已复核词头与本句变形。'});
 }
 // Every new plain form is linked to a real matching sentence.
 for(const [gid,eid] of [['ja-plain-past','legacy-3-ja'],['ja-plain-nonpast','legacy-98-ja']]){if(!db.prepare('SELECT 1 FROM v2_sentence_grammar_links WHERE expression_id=? AND grammar_id=?').get(eid,gid))throw Error('Missing plain-form relationship');}
 // Record the official scope references without claiming those sources certify any item-level mapping.
 for(const a of all('content_alignments').filter(x=>x.id.startsWith('c-align-')))update('content_alignments',a.id,{source_reference:a.language==='en'?'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking':'https://www.jlpt.jp/e/faq/index.html',basis_zh:a.basis_zh+' 官方页面仅说明考试能力维度/不公布完整项目清单，不支持本条的具体分数组归属。'});
 return {pass:'model-assisted structured review',certification:false};
}
