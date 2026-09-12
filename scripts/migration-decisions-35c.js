// Each primary structure is chosen from the actual target expression, not the legacy grammar label.
export const primaryGrammar=`1 present-continuous te-iru
2 simple-past tokoro
3 be-adjective polite-past
4 simple-present nai
5 imperative te-form
6 be-adjective polite-past
7 want-to tai
8 present-perfect te-iru
9 be-adjective ka-question
10 be-adjective copula
11 do-question ga-existence
12 be-adjective polite-past
13 indirect-question no-nominalizer
14 wh-question ka-question
15 present-perfect te-iru
17 greeting greeting
18 simple-present te-iru
19 simple-past request-onegai
20 do-question suki
21 simple-past polite-past
23 let-object causative-request
24 not-that wake-dewa-nai
25 simple-past tsumori
26 concessive-although tohaie
27 simple-past te-iru
29 noun-please request-onegai
30 can-ability potential
31 noun-please request-onegai
32 could-request sukuname
33 wh-question hodo-approx
35 be-adjective tai
36 would-rather dochiraka
37 possible-request te-itadaku
38 be-adjective to-condition
39 present-perfect youda
41 simple-past polite-past
42 present-continuous te-iru
43 could-request te-morau
44 present-perfect te-iru
45 can-request te-morau
47 indirect-question indirect-ka
48 as-long-as nara
49 simple-present honorific
50 will polite-present
51 may sou
53 imperative te-kudasai
54 simple-past polite-past
55 could-request te-morau
56 remember-to mae-ni
57 present-continuous te-mo-ii
59 present-perfect-continuous te-iru
60 about-time hou-ga-ii
61 could-request masen-ka
62 imperative te-kudasai
63 simple-past n-desu-ga
65 noun-please honorific-request
66 will polite-present
67 simple-present nara
68 could-request potential
69 shall-suggestion volitional
71 simple-past polite-past
72 sooner-better ba-hodo
73 be-adjective node
74 let-us te-oku
75 could-request tara
77 present-continuous dake
78 comparative ga-existence
79 can-request te-mo-ii
80 between-and te-iru
81 do-question potential
83 simple-present copula
84 what-if tara
85 would-like tai
86 be-adjective dake
87 do-question potential
89 imperative polite-present
90 wh-question ka-question
91 noun-please request-onegai
92 take-time duration
93 do-question te-kudasai
95 simple-past polite-past
96 even-if temo
97 wh-question ga-existence
98 will polite-present
99 will potential
101 be-adjective i-adjective
102 present-continuous te-iru
103 might hou-ga-ii
104 look-like sou
105 let-us volitional
107 comparative polite-present
108 regardless ni-kakawarazu
109 would-rather tai
110 seem-to te-kuru
111 simple-present volitional
113 imperative greeting
114 have-possession i-adjective
115 could-use te-morau
116 since-for te-iru
117 present-continuous i-adjective
119 simple-present tari
120 not-quite wake-dewa-nai
121 be-adjective node
122 present-continuous te-iru
123 do-question polite-present
125 be-adjective i-adjective
126 be-adjective te-iru
127 be-adjective te-kureru
128 make-feel to-condition
129 simple-present node
131 be-adjective wake-dewa-nai
132 worried-that to-shinpai
133 not-have-to nakute-mo-ii
134 have-possession copula
135 simple-present te-kureru
137 simple-present sou
138 enjoy-ing no-nominalizer
139 be-adjective bakari
140 start-ing hajimeru
141 present-continuous n-desu-ga
143 help-infinitive ni-naru
144 the-more ba-hodo
145 be-adjective copula
146 present-perfect te-kuru
147 ever-perfect no-nominalizer
149 greeting greeting
150 would-like masen-ka
151 would-like ga-existence
152 let-us mashou
153 present-perfect te-iru
155 may kamoshirenai
156 not-that wake-dewa-nai
157 would-rather tai
158 can-request te-mo-ii
159 will tai
161 passive polite-present
162 could-request te-morau
163 do-question mashou
164 if-request te-morau
165 can-request ba-condition
167 present-perfect n-desu-ga
168 mind-ing te-itadaku
169 noun-please copula
170 want-to node
171 can-ability potential
173 ellipsis greeting
174 going-to tsumori
175 ellipsis tai
176 ever-perfect koto-ga-aru
177 present-continuous koto-ni-suru
179 simple-past no-nominalizer
180 would-have tsumori
181 be-adjective te-iru
182 should-have ba-yokatta
183 simple-past kai`;
// Supplemental structures required by migrated language forms. Keep library under 80 points per language.
export const supplementalGrammar={en:`greeting|1|程式化社交回应|greeting / thanks formula|完整社交行为可用固定短语完成；需看问候、感谢或祝愿语境。|Thanks a lot.|非常感谢。
noun-please|1|简短礼貌回应|noun / short response + please / thanks|语境补足省略信息；please用于请求，thanks用于感谢。|Water, please.|请给我水。
possible-request|4|询问请求是否可行|Would it be possible to + verb?|试探可行性以减弱强迫；不是假装对方必须同意。|Would it be possible to change this?|能换一下这个吗？
shall-suggestion|2|共同提议问句|Shall we + base verb?|提出共同方案；不表示预测未来。|Shall we meet outside at six?|我们六点在外面见好吗？
seem-to|4|保留判断|seem to + base verb|表示表象推断而非直接保证；可接进行或完成形式。|It seems to be clearing up.|好像开始放晴了。
could-use|3|委婉表示需要|could use + noun|表达此刻很需要，不是过去能使用。|I could use a short break.|我很想短暂休息一下。
not-have-to|3|没有必要|do not have to + verb|不是禁止；must not才常表示禁止。|You don't have to talk.|你不必说。
help-infinitive|3|帮助实现|help + object + (to) verb|help后to可省略；不要误写为help someone doing。|It helps me relax.|这有助于我放松。
ellipsis|2|语境中的省略回应|short answer with recoverable content|上下文必须让省略的信息清楚；不能独立推断所有含义。|Not yet, but I'd like to.|还没有，但我想去。`,ja:`polite-present|1|动词礼貌非过去|ます干 + ます|可以说习惯或将来安排，不一定是正在做。|あと十分で着きます。|再过十分钟到。|あとじゅっぷんでつきます。
request-onegai|2|提出所需内容|名词 + を / でお願いします|を标记所求内容；で可以表示选择的方式。|お水をお願いします。|请给我水。|おみずをおねがいします。
sukuname|3|要求少一些|名词 + は少なめでお願いします|め表示偏向某程度；少なめ是份量偏少。|塩は少なめでお願いします。|请少放盐。|しおはすくなめでおねがいします。
dochiraka|3|柔和地表达偏好|どちらかというと + preference|承认比较有余地，不一定只有两个候选项。|どちらかというと甘さ控えめがいいです。|我更喜欢不那么甜的。|どちらかというとあまさひかえめがいいです。
hodo-approx|2|大约的数量|数量 + ほど|此处表示约数；不要与比例比较ほど混同。|二十分ほどです。|大约二十分钟。|にじゅっぷんほどです。
indirect-ka|3|把疑问作为内容|普通形 + か + predicate|间接疑问，不以问句结尾；可接わからない等。|間に合うか自信がありません。|没有把握能赶上。|まにあうかじしんがありません。
honorific-request|4|尊敬形式请求|お + ます干 + ください|礼貌服务语体；并非所有动词都能机械这样构造。|少々お待ちください。|请稍等。|しょうしょうおまちください。
volitional|3|普通体共同建议|意志形 + か / よ|朋友间商量；行く→行こう。|六時に会おうか。|六点见好吗？|ろくじにあおうか。
node|3|说明理由和请求铺垫|普通形 + ので / て-form|表达背景原因；句尾省略需由语境补足后续。|急なので、調整が難しいです。|因为很突然，难以调整。|きゅうなので、ちょうせいがむずかしいです。
dake|2|限定范围|普通形 / 名词 + だけ|表示仅限于此；与否定组合时注意否定范围。|見ているだけです。|只是看看。|みているだけです。
duration|2|所需时间|时间 + かかる|表示花费的时间，不是到达时刻。|そこまで二十分かかります。|到那里要二十分钟。|そこまでにじゅっぷんかかります。
te-kureru|3|别人为己方做|て形 + くれる|表达对己方受惠的视角；不等同于单纯动作发生。|気にかけてくれてありがとう。|谢谢你关心我。|きにかけてくれてありがとう。
ni-naru|2|变成某种状态|名词 / な形容词 + になる|い形容词用くなる；表示变化而不是存在。|気分転換になります。|能转换心情。|きぶんてんかんになります。
ba-condition|3|条件与适当行动|ば形 + clause|本例问做什么才合适；与たら等结构依语境区别。|何をすればいいですか。|我做什么好？|なにをすればいいですか。
greeting|1|程式化社交回应|固定问候 / 感谢 / 祝愿|根据关系及场景选用；お大事に用于关心身体，不是通用告别。|おはようございます。|早上好。|おはようございます。`};
export const patternReadings={20:'こーひーはすきですか。',24:'いいあらそいたいわけではありません。',26:'たかいです。とはいえ、べんりです。',32:'しおはすくなめでおねがいします。',36:'どちらかというとあまさひかえめがいいです。',44:'まだほうこくしょをかきおえていません。',48:'はやめにはじめるなら、きょうじゅうにおえられます。',56:'でかけるまえに、わすれずにかぎをかけてください。',60:'そろそろだいどころをそうじしたほうがいいですね。',68:'らいしゅうのげつようびにへんこうできますか。',72:'よやくははやければはやいほどいいです。',80:'あおとくろでまよっています。',84:'もしさいずがあわなかったら、どうなりますか。',92:'そこまでにじゅっぷんかかります。',96:'たとえまわりみちをしても、こちらのほうがはやいです。',104:'あめがふりそうです。',108:'よほうにかかわらず、よびのあんをよういしたほうがいいです。',116:'げつようびから、ずつうがつづいています。',120:'まだかんぜんになおったわけではありませんが、すこしよくなりました。',128:'このきょくをきくと、おだやかなきもちになります。',132:'おくれるとしんぱいしていましたが、まにあいました。',140:'さいきん、ぎたーをならいはじめました。',144:'れんしゅうすればするほど、たのしくなります。',152:'こんど、いっしょにさんぽしましょう。',156:'あなたがいやなわけではなく、ただひとりのじかんがほしいんです。',164:'おじかんがあれば、これをかくにんしてもらえますか。',168:'まどをあけていただけますか。',176:'きょうとにいったことがありますか。',180:'さんかするつもりでしたが、しごとがはいってしまいました。'};
export const patternTexts={26:["It's expensive. That said, it's useful.",'高いです。とはいえ、便利です。'],56:['Remember to lock the door before you leave.','出かける前に、忘れずに鍵をかけてください。'],60:["It's about time we cleaned the kitchen.",'そろそろ台所を掃除したほうがいいですね。'],68:['Could we move it to next Monday?','来週の月曜日に変更できますか。'],72:['The sooner we book, the better.','予約は早ければ早いほどいいです。'],80:["I'm choosing between the blue one and the black one.",'青と黒で迷っています。'],84:["What if it doesn't fit?",'もしサイズが合わなかったら、どうなりますか。'],96:["Even if we take a detour, it's still faster.",'たとえ回り道をしても、こちらのほうが早いです。'],108:['Regardless of the forecast, we should have a backup plan.','予報にかかわらず、予備の案を用意したほうがいいです。'],116:["I've had a headache since Monday.",'月曜日から、頭痛が続いています。'],120:["I'm not quite well, but I'm better.",'まだ完全に治ったわけではありませんが、少しよくなりました。'],128:['This song makes me feel calm.','この曲を聞くと、穏やかな気持ちになります。'],132:["I was worried we'd be late, but we arrived on time.",'遅れると心配していましたが、間に合いました。'],140:["I've started learning guitar.",'最近、ギターを習い始めました。'],144:['The more I practise, the more I enjoy it.','練習すればするほど、楽しくなります。'],152:["Let's go for a walk sometime.",'今度、一緒に散歩しましょう。'],156:["It's nothing personal; I just need some time alone.",'あなたが嫌なわけではなく、ただ一人の時間がほしいんです。'],164:['If you have a moment, could you check this?','お時間があれば、これを確認してもらえますか。'],170:["I don't want to put you out. Please say if it's inconvenient.",'ご迷惑をおかけしたくないので、都合が悪ければ言ってください。'],180:['I would have joined you, but I had to work.','参加するつもりでしたが、仕事が入ってしまいました。']};
Object.assign(patternTexts,{20:['Do you like coffee?','コーヒーは好きですか。'],24:["It's not that I want to argue.",'言い争いたいわけではありません。'],32:['Could you go easy on the salt?','塩は少なめでお願いします。'],36:["I'd rather have something less sweet.",'どちらかというと甘さ控えめがいいです。'],44:["I haven't finished the report yet.",'まだ報告書を書き終えていません。'],48:['As long as we start early, we can finish today.','早めに始めるなら、今日中に終えられます。'],92:['It takes twenty minutes to get there.','そこまで二十分かかります。'],104:["It looks like it's going to rain.",'雨が降りそうです。'],168:['Would you mind opening the window?','窓を開けていただけますか。'],176:['Have you ever been to Kyoto?','京都に行ったことがありますか。']});
export const legacyLexical={
16:['name','noun',1,'名前','なまえ','noun',1],22:['small talk','noun',3,'世間話','せけんばなし','noun',3],28:['leftovers','noun',2,'残り物','のこりもの','noun',2],34:['light','adjective',3,'あっさり','あっさり','adverb',3],40:['deadline','noun',3,'締め切り','しめきり','noun',3],46:['feedback','noun',3,'意見','いけん','noun',3],52:['spare key','noun phrase',2,'合鍵','あいかぎ','noun',3],58:['clutter','noun',4,'散らかった物','ちらかったもの','noun phrase',3],64:['appointment','noun',3,'予約','よやく','noun',2],70:['buffer','noun',4,'余裕','よゆう','noun',3],76:['receipt','noun',2,'レシート','れしーと','noun',2],82:['good value','noun phrase',3,'値段の割にいい','ねだんのわりにいい','fixed expression',4],88:['fare','noun',2,'運賃','うんちん','noun',3],94:['detour','noun',4,'回り道','まわりみち','noun',3],100:['umbrella','noun',1,'傘','かさ','noun',1],106:['muggy','adjective',4,'蒸し暑い','むしあつい','adjective',3],112:['thirsty','adjective',1,'喉が渇く','のどがかわく','verb phrase',2],118:['run-down','adjective',4,'疲れがたまる','つかれがたまる','verb phrase',3],124:['glad','adjective',2,'うれしい','うれしい','adjective',1],130:['overwhelmed','adjective',4,'いっぱいいっぱい','いっぱいいっぱい','adjectival noun',4],136:['hobby','noun',1,'趣味','しゅみ','noun',2],142:['get absorbed in','verb phrase',4,'夢中になる','むちゅうになる','verb phrase',3],148:['invitation','noun',3,'誘い','さそい','noun',3],154:['considerate','adjective',4,'気遣い','きづかい','noun',4],160:['help','noun',1,'手伝い','てつだい','noun',2],166:['favor','noun',3,'お願い事','おねがいごと','noun',3],172:['plan','noun',2,'予定','よてい','noun',2],178:['look forward to','verb phrase',3,'楽しみにする','たのしみにする','verb phrase',3]};
