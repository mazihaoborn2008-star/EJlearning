// Representative editorial fixture, not a curriculum migration. Output is migration 0007.
import fs from 'node:fs';
const statements=['-- Representative V2 content only; no legacy writes.'];
const quote=v=>v===null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
function add(table,row){statements.push(`INSERT INTO v2_${table} (${Object.keys(row).join(',')}) VALUES (${Object.values(row).map(quote).join(',')});`);}
const vocabulary={
 en:[
 ['eat','eat','verb',1,'iːt','吃；进食'],['yet','yet','adverb',2,'jet','（用于否定或疑问）还；尚'],
 ['plan','plan','verb',2,'plæn','计划；打算'],['leave','leave','verb',2,'liːv','离开'],['tomorrow','tomorrow','adverb',1,'təˈmɒrəʊ','明天'],
 ['go','go','verb',1,'ɡəʊ','去'],['come-up','come up','phrasal verb',3,'kʌm ʌp','（事情）突然发生'],
 ['expect','expect','verb',3,'ɪkˈspekt','预料；认为很可能发生'],['look-forward-to','look forward to','verb phrase',3,'lʊk ˈfɔːwəd tuː','期待令人愉快的未来事情'],
 ['intend','intend','verb',4,'ɪnˈtend','打算；意图'],['on-the-way','on the way','prepositional phrase',2,'ɒn ðə weɪ','在途中'],
 ['exhausted','exhausted','adjective',4,'ɪɡˈzɔːstɪd','筋疲力尽的'],['tired','tired','adjective',1,'ˈtaɪəd','疲倦的'],
 ['fine','fine','adjective',1,'faɪn','没问题；可以接受的'],['rain','rain','verb',1,'reɪn','下雨'],['help','help','verb',1,'help','帮助']
 ],
 ja:[
 ['taberu','食べる','verb',1,'たべる','吃'],['mada','まだ','adverb',1,'まだ','还；尚'],['yotei','予定','noun',2,'よてい','计划；安排'],
 ['iku','行く','verb',1,'いく','去'],['ashita','明日','noun',1,'あした','明天'],['kyuuni','急に','adverb',3,'きゅうに','突然'],
 ['youji','用事','noun',2,'ようじ','要办的事'],['dekiru','できる','verb',2,'できる','产生；出现（事情）'],
 ['tanoshimi','楽しみにする','verb phrase',3,'たのしみにする','期待令人愉快的事情'],['tochuu','途中','noun',2,'とちゅう','途中；中途'],
 ['kitai','期待する','verb',3,'きたいする','期待成果或表现'],['yoki','予期する','verb',5,'よきする','预料将会发生'],
 ['kutakuta','くたくた','adjectival noun',3,'くたくた','累得筋疲力尽'],['tsukareru','疲れる','verb',2,'つかれる','疲倦'],
 ['daijoubu','大丈夫','adjectival noun',1,'だいじょうぶ','没关系；不要紧'],['ame','雨','noun',1,'あめ','雨'],['tetsudau','手伝う','verb',2,'てつだう','帮忙']
 ]
};
for(const [language,items] of Object.entries(vocabulary))items.forEach(([key,lemma,pos,stage,pronunciation,meaning],i)=>{
 const id=language+'-'+key;
 add('vocabulary_items',{id,language,lemma,type:['come-up','look-forward-to','on-the-way','tanoshimi'].includes(key)?'fixed_expression':'word',stage,ipa:language==='en'?pronunciation:null,reading:language==='ja'?pronunciation:null,part_of_speech:pos,register:key==='yoki'?'formal':'neutral',publication_state:'published',sort_order:i});
 add('vocabulary_senses',{id:id+'-1',item_id:id,meaning_zh:meaning,usage_zh:key==='expect'?'可指中性或不愉快事件的预测，不等于高兴地期待。':key==='dekiru'?'本义及其他义项未在此小样本穷举；此义用于用事ができる。':'以本义项和例句界定使用范围。',semantic_label:meaning,sort_order:0});
});
add('vocabulary_senses',{id:'en-expect-2',item_id:'en-expect',meaning_zh:'要求；期望某人做到',usage_zh:'expect someone to do something 表示对行为的要求。',semantic_label:'行为要求',stage_override:4,override_reason:'涉及宾语加不定式结构与人际语气。',sort_order:1});
for(const [item,sense,kind,text,zh,note] of [
 ['en-plan','en-plan-1','pattern','plan to do something','计划做某事','to 后接动词原形。'],
 ['en-plan','en-plan-1','pattern','plan on doing something','打算做某事','on 后接动名词。'],
 ['en-plan','en-plan-1','example','I plan to leave tomorrow.','我打算明天离开。','此处 plan 是动词；have a plan 中的名词需另建词条。'],
 ['en-expect','en-expect-1','example','I expect rain.','我估计会下雨。','不表示盼望下雨。'],
 ['en-expect','en-expect-2','example','I expect you to be on time.','我要求你准时。','带有对行为的要求。'],
 ['en-look-forward-to','en-look-forward-to-1','collocation','look forward to seeing you','期待见到你','to 是介词，后接 seeing。'],
 ['ja-youji','ja-youji-1','collocation','用事ができる','临时有事','表示出现要处理的事。'],
 ['ja-tanoshimi','ja-tanoshimi-1','example','旅行を楽しみにしています。','我期待这次旅行。','表达愉快的期待。']
 ])add('vocabulary_examples',{id:'ve-'+statements.length,item_id:item,sense_id:sense,kind,text,translation_zh:zh,note_zh:note,readings_json:JSON.stringify(text==='用事ができる'?[{text:'用事',reading:'ようじ'},{text:'ができる'}]:text==='旅行を楽しみにしています。'?[{text:'旅行',reading:'りょこう'},{text:'を'},{text:'楽し',reading:'たのし'},{text:'みにしています。'}]:[])});
for(const [source,target,type,note] of [
 ['en-plan','en-intend','near_synonym','plan 通常暗示安排；intend 侧重意图，不保证已有具体安排。'],
 ['en-expect','en-look-forward-to','commonly_confused','预测或要求不等于愉快地期待。'],
 ['en-tired','en-exhausted','near_synonym','exhausted 程度更强。'],
 ['ja-kitai','ja-tanoshimi','commonly_confused','期待する常面向成果；楽しみにする强调愉快的期待。'],
 ['ja-kitai','ja-yoki','related','予期する侧重预料，未必包含希望。']
 ])add('vocabulary_relations',{source_id:source,target_id:target,language:source.slice(0,2),type,note_zh:note});
// key, level, Chinese title, form, core, purpose, formula, when, mistake, nuance, example, translation
const grammar={
 en:[
 ['simple-present',1,'一般现在时','Simple Present','把情况作为习惯或事实陈述。','描述日常或事实','subject + base verb / -s','用于习惯和稳定事实。','第三人称单数通常加 -s。','不自动表示此刻正在发生。','I eat at home.','我在家吃饭。'],
 ['simple-past',2,'一般过去时','Simple Past','把事件放在已结束的过去。','讲述过去经历','subject + past form','时间范围已结束时。','go 的过去式是 went。','与现在完成时的视角不同。','I went home.','我回家了。'],
 ['present-perfect',4,'现在完成时：到现在为止','Present Perfect','从现在看之前是否发生。','谈到现在为止的完成状态','have / has + past participle','与现在有关的经历或尚未完成的事。','不能把 eaten 换成 ate。','yet 否定句表示到现在还没有；不规定日语必须用对应时态。',"I haven't eaten yet.",'我还没吃饭。'],
 ['plan-to',2,'计划做某事','plan + to-infinitive','说明准备采取的行动。','表达计划','plan to + base verb','主体已有行动意向时。','不用 plan to leaving。','有意向不保证实行。','I plan to leave tomorrow.','我打算明天离开。'],
 ['was-going-to',4,'过去的打算','was / were going to','回看过去的意图。','解释原先计划','was / were going to + base verb','讲原先打算及后续变化。','going to 后用动词原形。','单独使用不必然意味着取消；but 提供变化。','I was going to go.','我本来打算去。'],
 ['be-adjective',1,'用形容词描述状态','be + adjective','用形容词说明主语状态。','描述状态','subject + be + adjective','表达感受或性质。','英语通常不能省略 be。','形容词强度不同不改变基本句法。','I am exhausted.','我累坏了。'],
 ['may',3,'可能性：may','may + verb','提出可能发生的情况。','表达不确定性','may + base verb','信息不完全时。','may 后不加 to。','可能性不能机械换算成百分比。','It may rain.','可能会下雨。'],
 ['might',3,'可能性：might','might + verb','以试探的语气谈可能性。','表达不确定性','might + base verb','语气较保留时。','might 后用原形。','与 may 有重叠，不总是较低概率。','It might rain.','也许会下雨。'],
 ['can-request',2,'用 can 请求帮助','Can you …?','询问对方能否帮忙。','提出请求','Can you + base verb?','日常请求。','问句不加 do。','礼貌程度依语调和关系而变。','Can you help me?','你能帮我吗？']
 ],
 ja:[
 ['te-form',2,'动词て形','て形','把动词变为连接形式。','连接动作或接续补助形式','食べる→食べて；行く→行って','后接いる等结构时。','行く的て形是行って。','て形本身不是时态。','食べてから行きます。','吃完再去。'],
 ['te-iru',3,'ている：状态与进行','〜ている','表示进行或持续状态；是否完成由语境和谓词决定。','描述进行、结果状态或到目前的完成状况','verb て形 + いる','本例与まだ及否定搭配，表示到现在尚未发生进食。','不能把所有ている都解释为正在。','まだ食べていない常相当于还没吃；不表示吃饭动作正在持续。','まだ食べていません。','我还没吃饭。'],
 ['polite-negative',2,'礼貌否定','〜ません','礼貌地否定非过去形式。','在礼貌语体中否定','ます干 + ません','与不太熟悉的人交流。','いる→いません，不是いるません。','例中いません否定补助动词いる；与て形组合。','まだ食べていません。','我还没吃饭。'],
 ['tsumori',3,'打算与过去意图','〜つもり（だった）','把行动作为自己的意图。','表达打算','dictionary form + つもりだ / つもりだった','说现在或过去的打算。','否定形式的范围会影响含义。','つもりだった并非英语结构的语法等价物。','行くつもりだった。','我本来打算去。'],
 ['n-desu-ga',4,'说明背景并转折','〜んですが','把情况作为背景提出，再接转折或铺垫。','柔和地说明缘由','plain form + んですが','说明计划变化或提出话题。','名词及な形容词接なんですが。','が可以留下未说完的余地；此例后接实际转折。','行くつもりだったんですが、急に用事ができました。','我本来打算去，但是临时有事。'],
 ['polite-past',2,'礼貌过去式','〜ました','以礼貌语体报告已发生的事。','讲述过去事件','ます干 + ました','报告事情的发生。','できる→できました。','不与所有英语过去时用法一一对应。','用事ができました。','有事要办了。'],
 ['copula',1,'名词与な形容词的礼貌陈述','〜です','礼貌地判断或说明状态。','描述状态','noun / な-adjective stem + です','中性礼貌对话。','不要把です机械接在动词原形后。','くたくたです表达很累的状态。','大丈夫です。','没关系。'],
 ['kamoshirenai',3,'不确定的可能性','〜かもしれない','保留判断，承认某种可能。','表达推测','plain form + かもしれない','没有充分把握时。','名词后不用だ再接かもしれない。','与そうだ的证据来源和接续不同。','雨かもしれません。','可能会下雨。'],
 ['sou',3,'看起来要发生','〜そうだ（样态）','根据眼前迹象判断。','表达外观上的推测','verb ます干 + そうだ','从可观察迹象推测。','不要与普通形+そうだ的传闻用法混淆。','样态并不是所有可能性的通用形式。','雨が降りそうです。','看起来要下雨。'],
 ['te-kudasai',2,'请对方做某事','〜てください','直接而礼貌地请求行动。','请求帮助','verb て形 + ください','需要明确请求时。','手伝う→手伝って。','对上级使用时可能过于直接。','手伝ってください。','请帮忙。']
 ]
};
for(const [language,points] of Object.entries(grammar))points.forEach(([key,level,title,form,core,purpose,formula,when,mistake,nuance,example,translation],i)=>{
 const id=language+'-'+key;
 add('grammar_points',{id,language,slug:key,title_zh:title,form_name:form,level,core_zh:core,purpose_zh:purpose,formula,when_zh:when,mistakes_zh:mistake,nuance_zh:nuance,publication_state:'published',sort_order:i});
 add('grammar_examples',{id:'ge-'+id,grammar_id:id,language,text:example,translation_zh:translation,explanation_zh:nuance,readings_json:JSON.stringify(language==='ja'?reading(example):[])});
});
for(const [source,target,type,note] of [
 ['en-present-perfect','en-simple-past','prerequisite','先熟悉过去事件叙述，有助于比较现在视角；仅为建议。'],
 ['en-may','en-might','contrast','语气与语境有差异，不指定固定概率。'],
 ['ja-te-iru','ja-te-form','prerequisite','先理解て形的构造；可自由浏览后续语法。'],
 ['ja-te-kudasai','ja-te-form','prerequisite','请求结构使用て形。'],
 ['ja-kamoshirenai','ja-sou','contrast','一般可能性与基于迹象的样态推测不同。']
 ])add('grammar_relations',{source_id:source,target_id:target,language:source.slice(0,2),type,note_zh:note});
const readings={
 'まだ食べていません。':[{text:'まだ'},{text:'食べ',reading:'たべ'},{text:'ていません。'}],
 '行くつもりだったんですが、急に用事ができました。':[{text:'行く',reading:'いく'},{text:'つもりだったんですが、'},{text:'急',reading:'きゅう'},{text:'に'},{text:'用事',reading:'ようじ'},{text:'ができました。'}]
};
function reading(text){
 // Structured segments, not offsets. Longest known surface first.
 const dictionary={'食べ':'たべ','行き':'いき','行く':'いく','用事':'ようじ','急':'きゅう','明日':'あした','予定':'よてい','大丈夫':'だいじょうぶ','途中':'とちゅう','雨':'あめ','降り':'ふり','手伝って':'てつだって','楽し':'たのし','疲れ':'つかれ','期待':'きたい','予期':'よき'};
 const re=new RegExp('('+Object.keys(dictionary).sort((a,b)=>b.length-a.length).join('|')+')','g');
 return text.split(re).filter(Boolean).map(text=>dictionary[text]?{text,reading:dictionary[text]}:{text});
}
for(const [i,id,name] of [[0,'food','吃饭'],[1,'plans','计划与经历'],[2,'social','社交'],[3,'body','身体状态'],[4,'travel','交通 / 出行'],[5,'weather','天气'],[6,'help','请求与帮助']])add('topics',{id,name_zh:name,sort_order:i});
add('vocabulary_topics',{item_id:'en-eat',topic_id:'food'});add('vocabulary_topics',{item_id:'ja-taberu',topic_id:'food'});
// unit key, anchor, topic, type, EN, JA, EN difficulty [v,g,o], JA difficulty
const units=[
 ['not-eaten','我还没吃饭。','food','sentence',"I haven't eaten yet.",'まだ食べていません。',[1,4,3],[1,3,2]],
 ['changed-plan','我本来打算去的，但是临时有事。','plans','sentence','I was going to go, but something came up.','行くつもりだったんですが、急に用事ができました。',[3,4,4],[3,4,5]],
 ['leave-tomorrow','我打算明天离开。','plans','sentence','I plan to leave tomorrow.','明日行くつもりです。',[2,2,2],[1,3,3]],
 ['exhausted','我累坏了。','body','sentence','I am exhausted.','くたくたです。',[4,1,3],[3,1,2]],
 ['apology','朋友向你道歉，你表示没关系。','social','scenario',"That's fine.",'大丈夫です。',[1,1,1],[1,1,1]],
 ['help-dialogue','请求帮忙并得到回应。','help','dialogue','Can you help me?\nYes, I can.','手伝ってください。\nはい、大丈夫です。',[1,2,2],[2,2,2]],
 ['on-way','我正在路上。','travel','sentence','I am on the way.','今、途中です。',[2,1,2],[2,1,2]],
 ['rain','可能会下雨。','weather','sentence','It may rain.','雨かもしれません。',[1,3,2],[1,3,3]],
 ['rain-variant','也许会下雨。','weather','sentence','It might rain.','雨が降りそうです。',[1,3,3],[2,3,3]],
 ['expect-rain','我估计会下雨。','weather','sentence','I expect rain.','雨を予期しています。',[3,1,3],[5,3,4]],
 ['looking-forward','我期待明天。','plans','sentence','I look forward to tomorrow.','明日を楽しみにしています。',[3,1,3],[3,3,3]],
 ['tired','我累了。','body','sentence','I am tired.','疲れています。',[1,1,1],[2,3,2]]
];
units.forEach(([id,anchor,topic,type,en,ja,ed,jd],i)=>{
 add('sentence_units',{id,anchor_zh:anchor,topic_id:topic,unit_type:type,context_zh:type==='scenario'?'熟悉的朋友为小事道歉，回应表示不介意。':type==='dialogue'?'向同伴请求帮助。':null,comparison_zh:id==='rain-variant'?'日语侧重眼前迹象，英语只保留可能性；两种表达的证据背景不同。':'共享交际意图不表示词汇或语法逐项等价。',publication_state:'published',sort_order:i});
 for(const [language,text,d] of [['en',en,ed],['ja',ja,jd]]){
  add('sentence_expressions',{id:id+'-'+language,unit_id:id,language,text,readings_json:JSON.stringify(language==='ja'?(readings[text]||reading(text)):[]),vocabulary_difficulty:d[0],grammar_difficulty:d[1],overall_difficulty:d[2],difficulty_note_zh:id==='changed-plan'?'整体包含转折、意图与突发事件；日语还需要背景说明和礼貌过去式。':'按词义熟悉度、结构负担及整句交际负担分别编辑评定；不是取最大值。',publication_state:'published'});
  if(type==='dialogue')text.split('\n').forEach((text,j)=>add('dialogue_turns',{id:`${id}-${language}-${j}`,expression_id:id+'-'+language,speaker:j?'B':'A',text,readings_json:JSON.stringify(language==='ja'?reading(text):[]),sort_order:j}));
 }
});
add('sentence_expressions',{id:'apology-en-casual',unit_id:'apology',language:'en',text:'No worries.',is_primary:0,register:'casual',note_zh:'轻松回应熟人的小事道歉。',vocabulary_difficulty:2,grammar_difficulty:1,overall_difficulty:2,difficulty_note_zh:'作为整体语用表达学习。',publication_state:'published'});
const links={
 'not-eaten':{en:[[['eat','eaten'],['yet','yet']],[['present-perfect',"haven't eaten"]]],ja:[[['mada','まだ'],['taberu','食べ']],[['te-iru','食べていません'],['polite-negative','いません']]]},
 'changed-plan':{en:[[['go','go',2],['come-up','came up']],[['was-going-to','was going to go'],['simple-past','came up']]],ja:[[['iku','行く'],['kyuuni','急に'],['youji','用事'],['dekiru','できました']],[['tsumori','つもりだった'],['n-desu-ga','んですが'],['polite-past','できました']]]},
 'leave-tomorrow':{en:[[['plan','plan'],['leave','leave'],['tomorrow','tomorrow']],[['plan-to','plan to leave']]],ja:[[['ashita','明日'],['iku','行く']],[['tsumori','行くつもりです']]]},
 'exhausted':{en:[[['exhausted','exhausted']],[['be-adjective','am exhausted']]],ja:[[['kutakuta','くたくた']],[['copula','くたくたです']]]},
 'apology':{en:[[['fine','fine']],[['be-adjective',"That's fine"]]],ja:[[['daijoubu','大丈夫']],[['copula','大丈夫です']]]},
 'help-dialogue':{en:[[['help','help']],[['can-request','Can you help me?']]],ja:[[['tetsudau','手伝って']],[['te-kudasai','手伝ってください']]]},
 'on-way':{en:[[['on-the-way','on the way']],[]],ja:[[['tochuu','途中']],[['copula','途中です']]]},
 'rain':{en:[[['rain','rain']],[['may','may rain']]],ja:[[['ame','雨']],[['kamoshirenai','雨かもしれません']]]},
 'rain-variant':{en:[[['rain','rain']],[['might','might rain']]],ja:[[['ame','雨']],[['sou','降りそうです']]]},
 'expect-rain':{en:[[['expect','expect']],[['simple-present','I expect rain']]],ja:[[['ame','雨'],['yoki','予期']],[['te-iru','予期しています']]]},
 'looking-forward':{en:[[['look-forward-to','look forward to'],['tomorrow','tomorrow']],[['simple-present','I look forward to tomorrow']]],ja:[[['ashita','明日'],['tanoshimi','楽しみにしています']],[['te-iru','楽しみにしています']]]},
 'tired':{en:[[['tired','tired']],[['be-adjective','am tired']]],ja:[[['tsukareru','疲れ']],[['te-iru','疲れています']]]}
};
for(const [unit,languages] of Object.entries(links))for(const [language,[vocab,gram]] of Object.entries(languages)){
 const expression_id=unit+'-'+language,turn_id=unit==='help-dialogue'?expression_id+'-0':null;
 vocab.forEach(([key,form,occurrence=1],i)=>add('sentence_vocabulary_links',{id:`vl-${expression_id}-${i}`,expression_id,language,item_id:language+'-'+key,sense_id:language+'-'+key+'-1',turn_id,displayed_form:form,occurrence,importance:3,is_new_target:i===0?1:0,sort_order:i}));
 gram.forEach(([key,form],i)=>add('sentence_grammar_links',{id:`gl-${expression_id}-${i}`,expression_id,language,grammar_id:language+'-'+key,turn_id,displayed_form:form,note_zh:unit==='not-eaten'&&language==='ja'?'まだ＋ている的否定表示到现在尚未发生；いません是いる的礼貌否定。':'此链接只说明本表达中的结构。',sort_order:i}));
}
// Link reusable grammar examples to source expressions without copying library explanations into sentences.
statements.push("UPDATE v2_grammar_examples SET source_expression_id='not-eaten-en' WHERE id='ge-en-present-perfect';");
statements.push("UPDATE v2_grammar_examples SET source_expression_id='not-eaten-ja' WHERE id IN ('ge-ja-te-iru','ge-ja-polite-negative');");
fs.writeFileSync('migrations-v2/0007_v2_representative.sql',statements.join('\n')+'\n');
console.log('Representative migration generated: 33 vocabulary items, 19 grammar points, 12 semantic units.');
