// Authoring source only. Runtime content is read exclusively from migrated D1.
// Fields: Chinese anchor | English | IPA (General American) | Japanese | reading | usage/comparison.
export const topicSpecs=[
 ['chat','日常聊天','问候、接话与澄清'],['food','吃饭','点餐、口味与用餐沟通'],['school','学校 / 工作','协作、安排与反馈'],
 ['home','家里','一起生活的小事'],['time','时间与约会','安排时间并协调变动'],['shopping','购物','选择商品与售后沟通'],
 ['travel','交通 / 出行','问路、乘车与旅途安排'],['weather','天气','谈天气与调整活动'],['health','身体状态','描述感受与照顾自己'],
 ['feelings','情绪','表达心情并理解他人'],['hobbies','兴趣爱好','分享兴趣与休闲体验'],['social','社交','邀请、回应与礼貌边界'],
 ['help','请求与帮助','提出请求并确认需要'],['plans','计划与经历','谈打算、变化与经历']
];
export const blocks={
chat:String.raw`名字（用于自我介绍）|name|neɪm|名前|なまえ|name 是名词；名前也可指全名。例：My name is Mei.／名前はメイです。
跟熟人说早上好|Morning!|ˈmɔrnɪŋ|おはよう。|おはよう。|英语省略 Good 很常见；日语对熟人用おはよう，对不熟的人加ございます。
告诉别人自己住在附近|I live nearby.|aɪ lɪv ˌnɪrˈbaɪ|この近くに住んでいます。|このちかくにすんでいます。|nearby 不再加 here；住んでいます表示居住状态，不是此刻正在搬家。
没听清对方的名字，请他再说一次|Sorry, what was your name?|ˈsɑri wʌt wəz jʊr neɪm|すみません、お名前をもう一度お願いします。|すみません、おなまえをもういちどおねがいします。|英语过去式 was 在这里是礼貌地回问；日语直接请求再说一次，不必逐字翻译。
问别人是否喜欢某种东西|Do you like ...?|du ju laɪk|〜は好きですか。|〜はすきですか。|询问喜好。例：Do you like coffee?／コーヒーは好きですか。日语喜欢的对象可用は提出。
聊聊周末过得怎样|A: How was your weekend?\nB: Pretty quiet. I stayed home.|eɪ haʊ wəz jʊr ˈwiːkɛnd\nbi ˈprɪti ˈkwaɪət aɪ steɪd hoʊm|A: 週末はどうだった？\nB: のんびりしてた。家にいたよ。|A: しゅうまつはどうだった？\nB: のんびりしてた。いえにいたよ。|quiet 指没安排很多活动，不是周围没有声音；のんびり强调悠闲。朋友间的简短问答。
闲聊而不深入讨论|small talk|smɔl tɔk|世間話|せけんばなし|small talk 是轻松寒暄，不是小声说话；世間話偏日常闲谈。例：We made small talk.／世間話をしました。
确认自己是否理解了对方|Let me make sure I understand.|lɛt mi meɪk ʃʊr aɪ ˌʌndərˈstænd|理解が合っているか確認させてください。|りかいがあっているかかくにんさせてください。|Let me 引出确认；日语用させてください礼貌请求允许自己确认，适合认真讨论。
表达自己并不是想要做某事|It's not that I want to ...|ɪts nɑt ðæt aɪ wɑnt tə|〜したいわけではありません。|〜したいわけではありません。|否定别人可能的推断。例：It's not that I want to argue.／言い争いたいわけではありません。并非否定所有相关事实。
发现自己的玩笑让对方误会了|I meant that as a joke.|aɪ mɛnt ðæt æz ə dʒoʊk|冗談のつもりだったんです。|じょうだんのつもりだったんです。|说明原本意图；这句话本身不等于道歉，若伤害对方仍应另说对不起。つもり描述主观意图。
委婉地补充一个不同看法|That said, ...|ðæt sɛd|とはいえ、〜。|とはいえ、〜。|承接前面的事实再转折。例：It's expensive. That said, it's useful.／高いです。とはいえ、便利です。不能机械用于任何但是。
澄清一句话听起来比本意更强硬|A: That sounded a bit harsh.\nB: You're right. Let me rephrase that.|eɪ ðæt ˈsaʊndɪd ə bɪt hɑrʃ\nbi jʊr raɪt lɛt mi ˌriˈfreɪz ðæt|A: ちょっときつく聞こえたよ。\nB: そうだね。言い直すね。|A: ちょっときつくきこえたよ。\nB: そうだね。いいなおすね。|harsh 指语气刺耳；きつい也可形容说法严厉。回应先承认效果，再改说法，避免只辩解本意。`,
food:String.raw`可以带走的剩饭菜|leftovers|ˈlɛftˌoʊvərz|残り物|のこりもの|leftovers 通常用复数指剩下的饭菜；残り物范围更广。例：I'll eat the leftovers.／残り物を食べます。
用餐时请别人递水|Water, please.|ˈwɔtər pliːz|お水をお願いします。|おみずをおねがいします。|英语点单可用名词加 please；日语お願いします让短请求保持礼貌。
说明自己不能吃花生|I can't eat peanuts.|aɪ kænt iːt ˈpiˌnʌts|ピーナッツは食べられません。|ぴーなっつはたべられません。|can't eat 只说明不能吃，并未明确原因。若为过敏应明确补充 allergy／アレルギー，不能把不喜欢当过敏。
服务员问要堂食还是带走，你要带走|To go, please.|tə ɡoʊ pliːz|持ち帰りでお願いします。|もちかえりでおねがいします。|to go 是美式常见点餐说法；日语用持ち帰り，で标明选定方式。
想少放某种调料|Could you go easy on the ...?|kʊd ju ɡoʊ ˈiːzi ɑn ðə|〜は少なめでお願いします。|〜はすくなめでおねがいします。|例：Could you go easy on the salt?／塩は少なめでお願いします。go easy on 在此是少用，不是让盐放松。
问餐厅还要等多久|A: How long is the wait?\nB: About twenty minutes.|eɪ haʊ lɔŋ ɪz ðə weɪt\nbi əˈbaʊt ˈtwɛnti ˈmɪnɪts|A: どのくらい待ちますか。\nB: 二十分ほどです。|A: どのくらいまちますか。\nB: にじゅっぷんほどです。|the wait 指等位时间；ほど表示大约。英语用名词问等待，日语用动词待つ。
形容味道清淡而非难吃|light|laɪt|あっさりした|あっさりした|light 随食物可指不厚重、不油腻；不总等于低热量。例：a light soup／あっさりしたスープ。bland 才常带寡淡评价。
解释自己只想吃点简单的|I'm in the mood for something simple.|aɪm ɪn ðə muːd fər ˈsʌmθɪŋ ˈsɪmpəl|今日は軽く済ませたい気分です。|きょうはかるくすませたいきぶんです。|in the mood for 说当前想要；日语这里自然地强调简单吃点、解决一餐，不是逐字翻译 simple。
委婉说自己更喜欢另一种口味|I'd rather have ...|aɪd ˈræðər hæv|どちらかというと〜がいいです。|どちらかというと〜がいいです。|例：I'd rather have something less sweet.／どちらかというと甘さ控えめがいいです。rather 后接动词原形；日语说得较柔和。
菜比描述中辣很多，礼貌询问能否更换|Would it be possible to change this?|wʊd ɪt bi ˈpɑsəbəl tə tʃeɪndʒ ðɪs|こちら、別のものに替えていただくことはできますか。|こちら、べつのものにかえていただくことはできますか。|先说明实际问题再提出更换；英语用可能性问句，日语用いただく表达受惠，均不是要求店家必须答应。
吃过一种食物后逐渐喜欢上它|It's an acquired taste.|ɪts ən əˈkwaɪərd teɪst|慣れるとおいしく感じる味です。|なれるとおいしくかんじるあじです。|acquired taste 指需要适应才欣赏的味道，也可用于音乐等；日语这里展开意思，不把它说成大家都会喜欢。
点错菜后协商怎样处理|A: I think there's been a mix-up.\nB: I'm sorry. I'll check your order.|eɪ aɪ θɪŋk ðɛrz bɪn ə ˈmɪksˌʌp\nbi aɪm ˈsɑri aɪl tʃɛk jʊr ˈɔrdər|A: 注文と違うものが来たようなんですが。\nB: 申し訳ありません。確認いたします。|A: ちゅうもんとちがうものがきたようなんですが。\nB: もうしわけありません。かくにんいたします。|mix-up 暗示弄错，避免先归责；日语ようなんですが委婉提出问题，店员用いたします回应。`,
school:String.raw`要按时完成工作的期限|deadline|ˈdɛdˌlaɪn|締め切り|しめきり|deadline 是最后期限，不等于整个工作周期。例：The deadline is Friday.／締め切りは金曜日です。
向同事确认收到消息|Got it, thanks.|ɡɑt ɪt θæŋks|わかりました。ありがとうございます。|わかりました。ありがとうございます。|Got it 表示理解或收到；日语わかりました语气中性礼貌，对正式客户可再调整。
说明自己正在处理这件事|I'm working on it.|aɪm ˈwɜrkɪŋ ɑn ɪt|今、取り組んでいます。|いま、とりくんでいます。|work on 后接任务；取り組む强调着手努力，不表示已经完成。
没跟上讨论，请别人再解释一遍|Could you explain that again?|kʊd ju ɪkˈspleɪn ðæt əˈɡɛn|もう一度説明してもらえますか。|もういちどせつめいしてもらえますか。|explain 后直接接内容，不说 explain me；もらえますか是向对方请求帮助。
说明某个任务还没完成|I haven't ... yet.|aɪ ˈhævənt jɛt|まだ〜ていません。|まだ〜ていません。|例：I haven't finished the report yet.／まだ報告書を書き終えていません。英语用过去分词；日语根据动词接て形。
协调任务分工|A: Can you handle the slides?\nB: Sure. Could you check the figures?|eɪ kæn ju ˈhændəl ðə slaɪdz\nbi ʃʊr kʊd ju tʃɛk ðə ˈfɪɡjərz|A: スライドをお願いできる？\nB: いいよ。数字を確認してもらえる？|A: すらいどをおねがいできる？\nB: いいよ。すうじをかくにんしてもらえる？|handle 指负责处理；figures 此处为数值。日语用お願い自然分工，适合熟悉的同事。
为改进工作提出反馈|feedback|ˈfiːdˌbæk|改善のための意見|かいぜんのためのいけん|feedback 通常不可数，不说 a feedback；日语用意见表达此处含义。例：Could I get some feedback?／ご意見をいただけますか。
表示截止日期可能来不及|I'm not sure I can meet the deadline.|aɪm nɑt ʃʊr aɪ kæn miːt ðə ˈdɛdˌlaɪn|締め切りに間に合うか、ちょっと自信がありません。|しめきりにまにあうか、ちょっとじしんがありません。|meet a deadline 指如期完成；日语说没有把握。用于尽早报告风险，最好接解决方案。
提出以某个条件为前提的方案|As long as ..., we can ...|æz lɔŋ æz wi kæn|〜なら、〜できます。|〜なら、〜できます。|例：As long as we start early, we can finish today.／早めに始めるなら、今日中に終えられます。as long as 此处表示条件，不是时间长度。
不同意同事方案但先肯定其出发点|I see your point, but I have a concern.|aɪ si jʊr pɔɪnt bət aɪ hæv ə kənˈsɜrn|おっしゃることはわかりますが、一つ気になる点があります。|おっしゃることはわかりますが、ひとつきになるてんがあります。|I see your point 表示理解理由，未必同意；日语おっしゃる是对对方说话的尊敬表达。
暂时保留对某个方案的判断|I'll reserve judgment for now.|aɪl rɪˈzɜrv ˈdʒʌdʒmənt fər naʊ|今の段階では判断を保留します。|いまのだんかいでははんだんをほりゅうします。|reserve judgment 指证据不足先不下结论；不是预订评价。日语判断を保留する较正式，适合会议讨论。
在时间不够时商量缩小任务范围|A: We may need to narrow the scope.\nB: Agreed. Let's focus on what matters most.|eɪ wi meɪ niːd tə ˈnæroʊ ðə skoʊp\nbi əˈɡriːd lɛts ˈfoʊkəs ɑn wʌt ˈmætərz moʊst|A: 範囲を絞る必要がありそうですね。\nB: そうですね。優先度の高いものに集中しましょう。|A: はんいをしぼるひつようがありそうですね。\nB: そうですね。ゆうせんどのたかいものにしゅうちゅうしましょう。|scope 指项目范围；絞る在此是缩小。英语 what matters most 强调重要性，日语用优先度自然回应。`,
home:String.raw`备用的钥匙|spare key|spɛr kiː|合鍵|あいかぎ|spare 强调备用，合鍵强调复制的钥匙。例：Do you have a spare key?／合鍵はありますか。
进门请客人随意坐|Have a seat.|hæv ə siːt|どうぞ座ってください。|どうぞすわってください。|have a seat 是自然邀请，不是拥有椅子；日语どうぞ使邀请更柔和。
告诉家人垃圾已经倒了|I took out the trash.|aɪ tʊk aʊt ðə træʃ|ごみを出しました。|ごみをだしました。|take out the trash 是把垃圾拿到收集处；日语ごみを出す表达同一日常行为。
室友音量太大，请他调小|Could you turn it down a little?|kʊd ju tɜrn ɪt daʊn ə ˈlɪtəl|少し音を小さくしてもらえますか。|すこしおとをちいさくしてもらえますか。|turn down 指降低音量等；日语直接说让声音变小，少し缓和请求。
提醒自己离开前别忘了做某事|Remember to ... before you leave.|rɪˈmɛmbər tə bɪˈfɔr ju liːv|出かける前に、忘れずに〜てください。|でかけるまえに、わすれずに〜てください。|例：Remember to lock up before you leave.／出かける前に、忘れずに鍵をかけてください。remember to 指记得去做。
确认洗衣机是否空着|A: Are you using the washing machine?\nB: No, go ahead.|eɪ ɑr ju ˈjuːzɪŋ ðə ˈwɑʃɪŋ məˈʃiːn\nbi noʊ ɡoʊ əˈhɛd|A: 洗濯機、使ってる？\nB: ううん、使っていいよ。|A: せんたくき、つかってる？\nB: ううん、つかっていいよ。|go ahead 在此是请用，不是请往前走；日语用许可表达回应。
东西堆得杂乱的状态|clutter|ˈklʌtər|散らかった物|ちらかったもの|clutter 通常不可数，指杂乱堆放的东西。例：I need to clear this clutter.／この散らかった物を片付けないと。
说明水龙头一直在漏水|The faucet has been dripping all night.|ðə ˈfɔsət hæz bɪn ˈdrɪpɪŋ ɔl naɪt|一晩中、蛇口から水がぽたぽた落ちています。|ひとばんじゅう、じゃぐちからみずがぽたぽたおちています。|has been dripping 强调持续到现在；ぽたぽた描写滴水，不是大量流水。
表达某件家务早就该做了|It's about time we ...|ɪts əˈbaʊt taɪm wi|そろそろ〜したほうがいいですね。|そろそろ〜したほうがいいですね。|例：It's about time we cleaned the fridge.／そろそろ冷蔵庫を掃除したほうがいいですね。英语常用过去式指该做的现在之事，语气可带催促。
不想直接责备室友，提议重新分配家务|Could we rethink how we split the chores?|kʊd wi ˌriˈθɪŋk haʊ wi splɪt ðə tʃɔrz|家事の分担を一度見直しませんか。|かじのぶんたんをいちどみなおしませんか。|we 把问题放到共同安排上；見直す是重新审视，并非只是再看一眼。
让来访客人不必拘束|Make yourself at home.|meɪk jʊrˈsɛlf æt hoʊm|どうぞ気楽にしてください。|どうぞきらくにしてください。|英语是让客人自在的惯用语，不表示可随意动用所有东西；日语以気楽に传达放松。
与邻居商量夜间噪声|A: I hate to bother you, but the noise carries.\nB: Sorry, I didn't realize. We'll keep it down.|eɪ aɪ heɪt tə ˈbɑðər ju bət ðə nɔɪz ˈkæriz\nbi ˈsɑri aɪ ˈdɪdənt ˈriəlaɪz wil kiːp ɪt daʊn|A: すみません、音がかなり響いているんですが。\nB: すみません、気づきませんでした。気をつけます。|A: すみません、おとがかなりひびいているんですが。\nB: すみません、きづきませんでした。きをつけます。|noise carries 指声音传得远；日语用響く。I hate to bother you 是礼貌铺垫，并非真的讨厌这个人。`,
time:String.raw`约好的见面安排|appointment|əˈpɔɪntmənt|予約|よやく|appointment 常指医生、业务等约定；朋友聚会多用 plans。例：I have a dental appointment.／歯医者の予約があります。
请别人稍等一下|Just a moment.|dʒʌst ə ˈmoʊmənt|少々お待ちください。|しょうしょうおまちください。|英语短句适用多种场景；日语少々お待ちください偏礼貌服务用语，朋友间可说ちょっと待って。
说明自己十分钟后到|I'll be there in ten minutes.|aɪl bi ðɛr ɪn tɛn ˈmɪnɪts|あと十分で着きます。|あとじゅっぷんでつきます。|in ten minutes 指从现在起十分钟后；あと十分で也以剩余时间说明到达。
朋友临时约明天，你有空|Tomorrow works for me.|təˈmɑroʊ wɜrks fər mi|明日なら大丈夫です。|あしたならだいじょうぶです。|works for me 指安排适合自己，不是替自己工作；なら把明天作为可行条件。
想把约定改到另一个时间|Could we move it to ...?|kʊd wi muːv ɪt tə|〜に変更できますか。|〜にへんこうできますか。|例：Could we move it to Friday?／金曜日に変更できますか。move 指改期，日语不用表示搬家的引っ越す。
确认见面地点与时间|A: Shall we meet outside at six?\nB: Six is fine. By the main entrance?|eɪ ʃæl wi miːt ˌaʊtˈsaɪd æt sɪks\nbi sɪks ɪz faɪn baɪ ðə meɪn ˈɛntrəns|A: 六時に外で会おうか。\nB: いいよ。正面玄関のところ？|A: ろくじにそとであおうか。\nB: いいよ。しょうめんげんかんのところ？|shall we 提建议；by 指靠近地点。日语省略已知信息，用ところ确认具体位置。
时间上留一点余量|buffer|ˈbʌfər|余裕|よゆう|buffer 此处指额外预留的时间，不是电脑缓存。例：Leave a ten-minute buffer.／十分くらい余裕を持って。
说明自己刚好赶上了末班车|I made it just in time for the last train.|aɪ meɪd ɪt dʒʌst ɪn taɪm fər ðə læst treɪn|終電にぎりぎり間に合いました。|しゅうでんにぎりぎりまにあいました。|make it 指成功赶到；in time for 后接要赶上的事。ぎりぎり说明差一点就来不及。
表达越早做某事越好|The sooner ..., the better.|ðə ˈsuːnər ðə ˈbɛtər|〜は早ければ早いほどいいです。|〜ははやければはやいほどいいです。|例：The sooner we book, the better.／予約は早ければ早いほどいいです。英语成对比较级；日语重复形容词表达变化关系。
收到过于临时的邀请，解释自己来不及安排|That's a bit short notice for me.|ðæts ə bɪt ʃɔrt ˈnoʊtɪs fər mi|ちょっと急なので、予定の調整が難しいです。|ちょっときゅうなので、よていのちょうせいがむずかしいです。|short notice 指提前通知时间短；日语说明突然、难调整，避免把 notice 翻成公告。
先暂定一个日期|Let's pencil it in.|lɛts ˈpɛnsəl ɪt ɪn|ひとまず仮の予定にしておきましょう。|ひとまずかりのよていにしておきましょう。|pencil in 表示暂记安排，可再改；ておく是预先处理，仮の明确未最终确定。
在多个时间冲突时协商优先安排|A: Could we keep that afternoon flexible?\nB: Sure. Let me know once your plans firm up.|eɪ kʊd wi kiːp ðæt ˌæftərˈnuːn ˈflɛksəbəl\nbi ʃʊr lɛt mi noʊ wʌns jʊr plænz fɜrm ʌp|A: その日の午後は、まだ確定しないでおける？\nB: いいよ。予定が固まったら教えて。|A: そのひのごごは、まだかくていしないでおける？\nB: いいよ。よていがかたまったらおしえて。|firm up 指安排逐渐确定；日语予定が固まる也是确定下来，不是计划变坚硬。`,
shopping:String.raw`购物后保留的收据|receipt|rɪˈsiːt|レシート|れしーと|receipt 中 p 不发音；日语レシート是常见小票，正式报销收据也常说領収書。例：Keep the receipt.／レシートを取っておいて。
逛店时告诉店员先随便看看|Just looking, thanks.|dʒʌst ˈlʊkɪŋ θæŋks|見ているだけです。ありがとうございます。|みているだけです。ありがとうございます。|英语省略主语很自然；だけ表示只是，感谢能避免回应显得生硬。
询问有没有更小的尺码|Do you have this in a smaller size?|du ju hæv ðɪs ɪn ə ˈsmɔlər saɪz|これの小さいサイズはありますか。|これのちいさいさいずはありますか。|in a size 指某尺码的款式；日语用これの限定同款。
试衣前先问可不可以试穿|Can I try this on?|kæn aɪ traɪ ðɪs ɑn|これを試着してもいいですか。|これをしちゃくしてもいいですか。|try on 用于穿戴；日语试穿用試着する，てもいいですか询问许可。
想比较两个选项再决定|I'm choosing between ... and ...|aɪm ˈtʃuːzɪŋ bɪˈtwiːn ænd|〜と〜で迷っています。|〜と〜でまよっています。|例：I'm choosing between the blue one and the black one.／青と黒で迷っています。日语迷う在这里是拿不定主意，不是迷路。
结账时确认能否刷卡|A: Do you take cards?\nB: Yes, except for that one.|eɪ du ju teɪk kɑrdz\nbi jɛs ɪkˈsɛpt fər ðæt wʌn|A: カードは使えますか。\nB: はい。ただ、そちらのカードは使えません。|A: かーどはつかえますか。\nB: はい。ただ、そちらのかーどはつかえません。|take cards 指接受银行卡支付；日语问能否使用。except for 说明一个例外。
商品价格合理、物有所值|good value|ɡʊd ˈvæljuː|値段の割にいい|ねだんのわりにいい|good value 不一定便宜，而是品质对得起价格。例：This bag is good value.／このかばんは値段の割にいいです。
说明商品和网上照片看起来不一样|It doesn't look quite like the photo online.|ɪt ˈdʌzənt lʊk kwaɪt laɪk ðə ˈfoʊtoʊ ˌɑnˈlaɪn|ネットの写真とは少し印象が違います。|ねっとのしゃしんとはすこしいんしょうがちがいます。|not quite 缓和差异程度；日语用印象が違う避免直接断言商品有问题。
询问退货需要满足什么条件|What if ...?|wʌt ɪf|もし〜たら、どうなりますか。|もし〜たら、どうなりますか。|例：What if it doesn't fit?／もしサイズが合わなかったら、どうなりますか。以假设了解处理方式，必要时明确问退货。
店员推荐超预算商品，礼貌坚持预算|I'd prefer to stay within my budget.|aɪd prɪˈfɜr tə steɪ wɪˈðɪn maɪ ˈbʌdʒɪt|できれば予算内で探したいです。|できればよさんないでさがしたいです。|would prefer 以偏好表达边界；できれば是柔和铺垫，不是同意超支。
价格不是唯一要考虑的因素|Price isn't the whole story.|praɪs ˈɪzənt ðə hoʊl ˈstɔri|値段だけでは判断できません。|ねだんだけでははんだんできません。|the whole story 指全部情况；日语直接表达不能仅看价格，避免把 story 理解成故事。
发现保修条款有例外，进一步确认|A: Does the warranty cover accidental damage?\nB: No, that would require separate coverage.|eɪ dʌz ðə ˈwɔrənti ˈkʌvər ˌæksɪˈdɛntəl ˈdæmɪdʒ\nbi noʊ ðæt wʊd rɪˈkwaɪr ˈsɛpərət ˈkʌvərɪdʒ|A: うっかり壊した場合も保証の対象ですか。\nB: いいえ、そちらは別の補償が必要です。|A: うっかりこわしたばあいもほしょうのたいしょうですか。\nB: いいえ、そちらはべつのほしょうがひつようです。|cover 在此指保障范围；保証和補償在日语此场景分别指产品保证与损失保障。这是条款询问示例，不代表实际店铺政策。`
};
Object.assign(blocks,{
travel:String.raw`乘车时要付的费用|fare|fɛr|運賃|うんちん|fare 指交通费用，不是所有价格。例：How much is the bus fare?／バスの運賃はいくらですか。
向路人说借过一下|Excuse me.|ɪkˈskjuːz mi|すみません、通ります。|すみません、とおります。|Excuse me 随场景可引起注意或借过；日语补充通ります明确想通过，不代表道歉认错。
询问车站在哪里|Where's the station?|wɛrz ðə ˈsteɪʃən|駅はどこですか。|えきはどこですか。|the station 指语境中相关车站；日语把駅作为主题，用どこ问位置。
司机问你在哪下车，你指下一个路口|At the next corner, please.|æt ðə nɛkst ˈkɔrnər pliːz|次の角でお願いします。|つぎのかどでおねがいします。|at 指下车地点；角是街角，不等于交叉口的所有道路范围。
告诉别人去某地需要多久|It takes ... to get there.|ɪt teɪks tə ɡɛt ðɛr|そこまで〜かかります。|そこまで〜かかります。|例：It takes half an hour to get there.／そこまで三十分かかります。英语 it 是形式主语；日语用かかる表示所需时间。
询问是否需要换乘|A: Does this train go to the airport?\nB: You'll need to change at Central.|eɪ dʌz ðɪs treɪn ɡoʊ tə ði ˈɛrˌpɔrt\nbi jul niːd tə tʃeɪndʒ æt ˈsɛntrəl|A: この電車は空港まで行きますか。\nB: 中央駅で乗り換えてください。|A: このでんしゃはくうこうまでいきますか。\nB: ちゅうおうえきでのりかえてください。|change 在交通场景指换乘；日语乗り換える明确换交通工具。此处站名为练习用地点。
途中绕道去一个地方|detour|ˈdiːtʊr|回り道|まわりみち|detour 可因封路或顺路绕行；回り道也可指较远路线。例：We took a detour.／回り道をしました。
说明自己刚刚坐过站了|I just missed my stop.|aɪ dʒʌst mɪst maɪ stɑp|うっかり乗り過ごしました。|うっかりのりすごしました。|miss my stop 是未在目标站下车，不是错过上车；日语乗り過ごす对应坐过站。
比较路线时强调即使绕路也更快|Even if ..., it's still ...|ˈiːvən ɪf ɪts stɪl|たとえ〜ても、〜です。|たとえ〜ても、〜です。|例：Even if it's farther, it's still faster.／たとえ遠回りでも、そのほうが早いです。even if 表示让步假设，不是单纯如果。
列车取消后询问有哪些替代方式|What are my alternatives?|wʌt ɑr maɪ ɔlˈtɜrnətɪvz|ほかにどんな行き方がありますか。|ほかにどんないきかたがありますか。|alternatives 指可替代选项；日语直接问其他去法，服务场景更明确。
在途中顺便接上某人|I'll pick you up on the way.|aɪl pɪk ju ʌp ɑn ðə weɪ|途中で迎えに行くよ。|とちゅうでむかえにいくよ。|pick someone up 在这里是接人，不是捡起来；on the way 表示顺路，但不保证完全不绕路。
转机时间紧时确认行李是否直挂|A: Will my bag go straight through?\nB: Yes, but you'll need to change terminals.|eɪ wɪl maɪ bæɡ ɡoʊ streɪt θruː\nbi jɛs bət jul niːd tə tʃeɪndʒ ˈtɜrmənəlz|A: 荷物は最終目的地まで預けられますか。\nB: はい。ただ、ターミナルの移動が必要です。|A: にもつはさいしゅうもくてきちまであずけられますか。\nB: はい。ただ、たーみなるのいどうがひつようです。|go straight through 在行李语境指无需中途提取；日语明确最终目的地。示例不代替航空公司实际确认。`,
weather:String.raw`下雨时用的伞|umbrella|ʌmˈbrɛlə|傘|かさ|英语单数可数名词需限定词：an umbrella；日语不靠冠词。例：Take an umbrella.／傘を持っていって。
随口说今天好冷|It's chilly!|ɪts ˈtʃɪli|肌寒いね。|はださむいね。|chilly 偏凉得有点不舒服，不是极寒；肌寒い强调身体感觉微冷。
说明外面正在下雨|It's raining outside.|ɪts ˈreɪnɪŋ ˌaʊtˈsaɪd|外は雨が降っています。|そとはあめがふっています。|英语天气句用 it；日语以雨为降る的主语，外は提出范围。
朋友要出门，提醒带件外套|You might want to bring a jacket.|ju maɪt wɑnt tə brɪŋ ə ˈdʒækɪt|上着を持っていったほうがいいかも。|うわぎをもっていったほうがいいかも。|might want to 是柔和建议，不是猜测对方欲望；日语かも也让建议不显得命令。
根据天空推测快要下雨|It looks like ...|ɪt lʊks laɪk|〜そうです。|〜そうです。|例：It looks like rain.／雨が降りそうです。这里そう描述从迹象得出的判断，接动词ます形词干。
商量下雨后把活动改到室内|A: Shall we still go for a walk?\nB: Let's stay in until it stops.|eɪ ʃæl wi stɪl ɡoʊ fər ə wɔk\nbi lɛts steɪ ɪn ənˈtɪl ɪt stɑps|A: それでも散歩に行く？\nB: 雨がやむまで中にいよう。|A: それでもさんぽにいく？\nB: あめがやむまでなかにいよう。|stay in 指待在室内；日语雨がやむ是雨停，不能用止める表示自然停雨。
空气又热又潮湿的感觉|muggy|ˈmʌɡi|蒸し暑い|むしあつい|muggy 包含潮湿闷热，不只是温度高。例：It's muggy today.／今日は蒸し暑いです。
说明温差比预期大|It cools down much more than I expected.|ɪt kuːlz daʊn mʌtʃ mɔr ðæn aɪ ɪkˈspɛktɪd|思った以上に冷え込みますね。|おもったいじょうにひえこみますね。|cool down 表示变凉；冷え込む常用于气温明显下降。much 修饰比较级。
提醒不管预报如何都要准备备用方案|Regardless of ..., we should ...|rɪˈɡɑrdləs əv wi ʃʊd|〜にかかわらず、〜したほうがいいです。|〜にかかわらず、〜したほうがいいです。|例：Regardless of the forecast, we should have a backup plan.／予報にかかわらず、別の案も用意したほうがいいです。of 后接名词。
天气突然转坏，建议别冒险继续出行|I'd rather not risk it in this weather.|aɪd ˈræðər nɑt rɪsk ɪt ɪn ðɪs ˈwɛðər|この天気で無理をするのはやめておきたいです。|このてんきでむりをするのはやめておきたいです。|rather not 后接动词原形；やめておく表示考虑后暂且不做。这是表达偏好，不是具体气象安全建议。
天气终于开始放晴|It seems to be clearing up.|ɪt siːmz tə bi ˈklɪrɪŋ ʌp|ようやく晴れてきたみたいです。|ようやくはれてきたみたいです。|clear up 可指天气转好，也可指解释清楚；てきた表现到现在的变化，みたい表示观察判断。
在不稳定天气下保留出游决定|A: The forecast keeps changing.\nB: Let's play it by ear and decide tomorrow.|eɪ ðə ˈfɔrˌkæst kiːps ˈtʃeɪndʒɪŋ\nbi lɛts pleɪ ɪt baɪ ɪr ænd dɪˈsaɪd təˈmɑroʊ|A: 予報がころころ変わるね。\nB: 様子を見て、明日決めよう。|A: よほうがころころかわるね。\nB: ようすをみて、あしたきめよう。|play it by ear 是随机应变，不是用耳朵演奏的字面义；ころころ描述频繁变化，带一点无奈。`,
health:String.raw`口渴的身体感觉|thirsty|ˈθɜrsti|喉が渇いた|のどがかわいた|thirsty 是形容词；日语用喉が渇く描述变化。例：I'm thirsty.／喉が渇きました。
对身体不舒服的人说多保重|Take care.|teɪk kɛr|お大事に。|おだいじに。|Take care 也可作一般道别；お大事に主要用于身体不适，不宜机械用于所有告别。
说明自己有点头疼|I have a slight headache.|aɪ hæv ə slaɪt ˈhɛdˌeɪk|少し頭が痛いです。|すこしあたまがいたいです。|英语用 have a headache；日语直接说头疼。slight 说明程度轻，不推断病因。
别人问你是否需要休息，你想坐一会儿|I could use a short break.|aɪ kʊd juːz ə ʃɔrt breɪk|少し休ませてもらえると助かります。|すこしやすませてもらえるとたすかります。|could use 指现在很需要、用得上；不是过去能够使用。日语用助かります表达请求的帮助意义。
说明某种不适从某时开始|I've had ... since ...|aɪv hæd sɪns|〜から、〜が続いています。|〜から、〜がつづいています。|例：I've had a cough since Monday.／月曜日から、せきが続いています。since 接开始时间，for 才接时长。
同事关心你是否好些了|A: Are you feeling any better?\nB: A little, but I'm still tired.|eɪ ɑr ju ˈfiːlɪŋ ˈɛni ˈbɛtər\nbi ə ˈlɪtəl bət aɪm stɪl ˈtaɪərd|A: 少しはよくなった？\nB: 少しね。でも、まだだるい。|A: すこしはよくなった？\nB: すこしね。でも、まだだるい。|any better 问有没有好转；だるい强调身体乏力，不等同于想睡觉。
身体疲惫、没精神|run-down|ˌrʌnˈdaʊn|疲れがたまっている|つかれがたまっている|run-down 可形容人疲惫，也可形容建筑破旧。例：I'm feeling run-down.／疲れがたまっています。这里不作病名。
描述不适时轻时重|The pain comes and goes.|ðə peɪn kʌmz ænd ɡoʊz|痛みが出たり治まったりします。|いたみがでたりおさまったりします。|comes and goes 指间歇出现；たり…たり列举反复状态，便于说明症状变化，不是诊断。
强调并非完全恢复，只是有所好转|Not quite ..., but ...|nɑt kwaɪt bət|まだ〜わけではありませんが、〜。|まだ〜わけではありませんが、〜。|例：Not quite back to normal, but better.／まだ本調子というわけではありませんが、よくなりました。not quite 是还没完全，不是完全没有。
需要取消活动但不想详细讲病情|I'm not up to it today, I'm afraid.|aɪm nɑt ʌp tə ɪt təˈdeɪ aɪm əˈfreɪd|すみません、今日は参加できる体調ではなくて。|すみません、きょうはさんかできるたいちょうではなくて。|not up to it 可指身体或精神不足以应付；I'm afraid 在此缓和坏消息，不是害怕。
说明自己正在慢慢恢复状态|I'm getting back on my feet.|aɪm ˈɡɛtɪŋ bæk ɑn maɪ fiːt|少しずつ調子を取り戻しています。|すこしずつちょうしをとりもどしています。|back on my feet 可指病后、困难后恢复；日语調子を取り戻す强调状态，不一定真的重新站立。
向医生描述不适而不自行下结论|A: Is it constant or does it come and go?\nB: It comes and goes, especially after meals.|eɪ ɪz ɪt ˈkɑnstənt ɔr dʌz ɪt kʌm ænd ɡoʊ\nbi ɪt kʌmz ænd ɡoʊz ɪˈspɛʃəli ˈæftər miːlz|A: ずっと痛みますか。それとも時々ですか。\nB: 時々です。特に食後に痛みます。|A: ずっといたみますか。それともときどきですか。\nB: ときどきです。とくにしょくごにいたみます。|constant 对比间歇；日语食後表达饭后。本单元练习描述现象，不提供医疗判断。`,
feelings:String.raw`对某事感到高兴|glad|ɡlæd|うれしい|うれしい|glad 常作表语并说明原因。例：I'm glad you're here.／来てくれてうれしいです。不要把所有 happy 都换成 glad。
听到好消息表示太好了|That's great!|ðæts ɡreɪt|よかったね！|よかったね！|That's great 可赞赏消息；よかったね常替对方感到开心或放心，语境决定含义。
告诉朋友自己今天有点紧张|I'm a little nervous today.|aɪm ə ˈlɪtəl ˈnɜrvəs təˈdeɪ|今日は少し緊張しています。|きょうはすこしきんちょうしています。|nervous 指不安紧张，不等于性格神经质；緊張している描述当前状态。
朋友担心你，你说现在没事了|I'm okay now, thanks for checking.|aɪm oʊˈkeɪ naʊ θæŋks fər ˈtʃɛkɪŋ|もう大丈夫。気にかけてくれてありがとう。|もうだいじょうぶ。きにかけてくれてありがとう。|checking 在此是问候确认状况；気にかける表示关心，不是调查检查。
说某件事让自己感到某种情绪|It makes me feel ...|ɪt meɪks mi fiːl|〜と、〜気持ちになります。|〜と、〜きもちになります。|例：It makes me feel calm.／それを見ると、穏やかな気持ちになります。make 后接动词原形 feel；日语通常说明触发情境。
朋友发现你很安静，关心你的状态|A: You seem quiet today.\nB: Just a lot on my mind.|eɪ ju siːm ˈkwaɪət təˈdeɪ\nbi dʒʌst ə lɑt ɑn maɪ maɪnd|A: 今日は静かだね。\nB: ちょっと考え事が多くて。|A: きょうはしずかだね。\nB: ちょっとかんがえごとがおおくて。|on my mind 指挂念或思考；日语以て结尾留余地，朋友间自然，无需硬补完整主句。
事情太多而感到应付不过来|overwhelmed|ˌoʊvərˈwɛlmd|いっぱいいっぱい|いっぱいいっぱい|overwhelmed 可因压力或强烈正面情绪；这里是忙到余力不足。例：I feel overwhelmed.／今はいっぱいいっぱいです。
解释自己失望但不是生气|I'm disappointed, not angry.|aɪm ˌdɪsəˈpɔɪntɪd nɑt ˈæŋɡri|怒っているわけではなく、残念に思っています。|おこっているわけではなく、ざんねんにおもっています。|disappointed 是期待落空；日语用わけではなく澄清误解，再说明真正感受。
表达本来担心，结果松了口气|I was worried ..., but ...|aɪ wəz ˈwɜrid bət|〜と心配していましたが、〜。|〜としんぱいしていましたが、〜。|例：I was worried I'd be late, but I made it.／遅れるかと心配していましたが、間に合いました。英语间接叙述保留过去视角。
朋友心情低落，你愿意听但不强迫他说|You don't have to talk, but I'm here.|ju doʊnt hæv tə tɔk bət aɪm hɪr|無理に話さなくていいよ。話したくなったら聞くから。|むりにはなさなくていいよ。はなしたくなったらきくから。|don't have to 表示不必，并非禁止；日语明确愿意倾听，避免把 I'm here 仅翻成地点。
对一件事同时有两种矛盾感受|I have mixed feelings about it.|aɪ hæv mɪkst ˈfiːlɪŋz əˈbaʊt ɪt|複雑な気持ちです。|ふくざつなきもちです。|mixed feelings 不是想法杂乱，而是同时有正负感受；日语複雑な気持ち保留这种矛盾。
说明建议虽然出于好意却让自己有压力|A: I know you mean well, but I feel pressured.\nB: I'm sorry. I'll give you some space.|eɪ aɪ noʊ ju miːn wɛl bət aɪ fiːl ˈprɛʃərd\nbi aɪm ˈsɑri aɪl ɡɪv ju səm speɪs|A: 心配してくれるのはわかるけど、少し負担に感じる。\nB: ごめん。少しそっとしておくね。|A: しんぱいしてくれるのはわかるけど、すこしふたんにかんじる。\nB: ごめん。すこしそっとしておくね。|mean well 是出于好意；give someone space 指给自主和情绪空间，日语用そっとしておく。`,
hobbies:String.raw`业余时间喜欢做的事|hobby|ˈhɑbi|趣味|しゅみ|hobby 常指持续爱好；趣味也可指审美品味。例：Cooking is my hobby.／趣味は料理です。
朋友邀你一起试试，你说好呀|Sounds fun!|saʊndz fʌn|楽しそう！|たのしそう！|sounds fun 根据描述判断有趣；楽しそう基于所见所闻，不是已经实际体验的感想。
说明自己喜欢散步|I enjoy going for walks.|aɪ ɪnˈdʒɔɪ ˈɡoʊɪŋ fər wɔks|散歩するのが好きです。|さんぽするのがすきです。|enjoy 后接动名词，不接 to go；日语用の把散步这个动作名词化。
朋友问你玩得好不好，你说明刚开始学|I'm still a beginner.|aɪm stɪl ə bɪˈɡɪnər|まだ始めたばかりです。|まだはじめたばかりです。|英语用身份名词 beginner；日语以始めたばかり强调才开始，避免过度自贬。
说明自己最近开始做某事|I've started ...|aɪv ˈstɑrtɪd|最近、〜始めました。|さいきん、〜はじめました。|例：I've started running.／最近、走り始めました。英语可接动名词；日语动词ます形词干接始める。
聊最近正在看的作品|A: What are you watching these days?\nB: A cooking show. It's surprisingly relaxing.|eɪ wʌt ɑr ju ˈwɑtʃɪŋ ðiːz deɪz\nbi ə ˈkʊkɪŋ ʃoʊ ɪts sərˈpraɪzɪŋli rɪˈlæksɪŋ|A: 最近、何を見てる？\nB: 料理番組。意外と落ち着くんだ。|A: さいきん、なにをみてる？\nB: りょうりばんぐみ。いがいとおちつくんだ。|these days 指最近一段时期；落ち着く描述看节目后的感受，不把 relaxing 机械写成放松的物体。
专注做事而暂时忘记周围|get absorbed in|ɡɛt əbˈzɔrbd ɪn|夢中になる|むちゅうになる|get absorbed in 后接名词或动名词。例：I get absorbed in drawing.／絵を描くのに夢中になります。不是被物理吸收。
说明某个爱好能帮助自己放松|It helps me switch off after work.|ɪt hɛlps mi swɪtʃ ɔf ˈæftər wɜrk|仕事の後の気分転換になります。|しごとのあとのきぶんてんかんになります。|switch off 在此是暂时不再挂念工作；日语気分転換表达换心情，而非关机。
表达自己越练越能体会乐趣|The more I ..., the more ...|ðə mɔr aɪ ðə mɔr|〜ば〜ほど、〜。|〜ば〜ほど、〜。|例：The more I practice, the more I enjoy it.／練習すればするほど、楽しくなります。两种语言都表达随程度增长的变化。
不喜欢朋友很爱的作品，但尊重他的喜好|It's not really my thing, but I see the appeal.|ɪts nɑt ˈriəli maɪ θɪŋ bət aɪ si ði əˈpiːl|自分の好みではないけど、魅力はわかるよ。|じぶんのこのみではないけど、みりょくはわかるよ。|not my thing 是个人不感兴趣；see the appeal 承认吸引力，避免评价成作品不好。
看过多次后才渐渐喜欢|It's grown on me.|ɪts ɡroʊn ɑn mi|だんだん好きになってきました。|だんだんすきになってきました。|grow on someone 指逐渐获得好感；日语てきた体现到现在的变化，并非喜欢突然增加。
朋友想把爱好变成工作，你提出保留意见|A: Have you thought of doing it professionally?\nB: Maybe, but I'd hate to lose the enjoyment.|eɪ hæv ju θɔt əv ˈduːɪŋ ɪt prəˈfɛʃənəli\nbi ˈmeɪbi bət aɪd heɪt tə luːz ði ɪnˈdʒɔɪmənt|A: 仕事にすることは考えた？\nB: 少しね。でも、純粋に楽しめなくなるのは嫌かな。|A: しごとにすることはかんがえた？\nB: すこしね。でも、じゅんすいにたのしめなくなるのはいやかな。|professionally 指以此为职业；I'd hate to 委婉说不愿发生，日语かな让个人想法留有余地。`,
social:String.raw`邀请别人参加活动|invitation|ˌɪnvɪˈteɪʃən|誘い|さそい|invitation 可指邀请行为或邀请函；誘い更常指邀约。例：Thanks for the invitation.／誘ってくれてありがとう。
向帮过自己的人表示感谢|Thanks a lot.|θæŋks ə lɑt|どうもありがとう。|どうもありがとう。|真诚语调下表达感谢；英语带讽刺语调时含义可变，不能只靠字面判断。
询问朋友是否愿意一起吃午饭|Would you like to have lunch together?|wʊd ju laɪk tə hæv lʌntʃ təˈɡɛðər|一緒にお昼を食べませんか。|いっしょにおひるをたべませんか。|would you like to 礼貌邀请；日语否定疑问食べませんか不是期待对方不吃。
收到邀请但当天已有安排|I'd love to, but I have plans.|aɪd lʌv tə bət aɪ hæv plænz|行きたいんだけど、その日は予定があるんだ。|いきたいんだけど、そのひはよていがあるんだ。|先肯定邀请再拒绝；plans 指既有安排，不必交代所有私人细节。
邀请别人下次有空再一起做某事|Let's ... sometime.|lɛts ˈsʌmtaɪm|今度、〜ましょう。|こんど、〜ましょう。|例：Let's get coffee sometime.／今度、コーヒーでも飲みましょう。sometime 和今度都未确定时间，真要落实应再约。
朋友介绍新朋友给你认识|A: This is my friend, Alex.\nB: Nice to meet you. I've heard a lot about you.|eɪ ðɪs ɪz maɪ frɛnd ˈælɪks\nbi naɪs tə miːt ju aɪv hɜrd ə lɑt əˈbaʊt ju|A: 友達のアレックスです。\nB: 初めまして。お話はよく聞いています。|A: ともだちのあれっくすです。\nB: はじめまして。おはなしはよくきいています。|I've heard a lot about you 是常见初见寒暄；お話はよく聞いています自然说明早有耳闻。
在社交中注意分寸、为他人考虑|considerate|kənˈsɪdərət|気遣いができる|きづかいができる|considerate 指体贴，不是考虑很多而犹豫。例：That was considerate of you.／気遣ってくれたんですね。
提醒大家自己可能提前离开|I may have to leave a little early.|aɪ meɪ hæv tə liːv ə ˈlɪtəl ˈɜrli|少し早めに失礼するかもしれません。|すこしはやめにしつれいするかもしれません。|may have to 表示可能不得不；失礼する在聚会场景是礼貌离席，不是有意失礼。
表达不是不想见面，只是需要独处|It's nothing personal; I just ...|ɪts ˈnʌθɪŋ ˈpɜrsənəl aɪ dʒʌst|あなたが嫌なわけではなく、ただ〜。|あなたがいやなわけではなく、ただ〜。|例：It's nothing personal; I just need some time alone.／あなたが嫌なわけではなく、ただ一人の時間が必要なんです。敏感话题仍需体谅对方感受。
别人问到私人问题，你想礼貌跳过|I'd rather keep that private.|aɪd ˈræðər kiːp ðæt ˈpraɪvət|そのことは、あまり詳しく話したくないんです。|そのことは、あまりくわしくはなしたくないんです。|表达自己的界限，无需编理由；日语あまり和んです使说明较柔和，但仍清楚拒绝细说。
对邀请暂时不作承诺|Can I get back to you on that?|kæn aɪ ɡɛt bæk tə ju ɑn ðæt|その件は、改めて返事してもいいですか。|そのけんは、あらためてへんじしてもいいですか。|get back to someone 是稍后回复；不是返回对方身边。最好另约回复时间，避免让人一直等。
拒绝继续参加聚会又不破坏气氛|A: Come on, stay for one more.\nB: Tempting, but I'll call it a night.|eɪ kʌm ɑn steɪ fər wʌn mɔr\nbi ˈtɛmptɪŋ bət aɪl kɔl ɪt ə naɪt|A: もう少しだけいようよ。\nB: そうしたいけど、今日はこの辺で帰るね。|A: もうすこしだけいようよ。\nB: そうしたいけど、きょうはこのへんでかえるね。|call it a night 指结束今晚活动；tempting 先承认诱人，拒绝仍有效。日语この辺で指适可而止的时点。`,
help:String.raw`请求时需要的帮忙|help|hɛlp|手伝い|てつだい|help 作名词通常不可数；手伝い常指具体协助。例：I need some help.／少し手伝いが必要です。
向愿意帮忙的人说太感谢了|Much appreciated.|mʌtʃ əˈpriːʃiˌeɪtɪd|助かります。|たすかります。|英语是省略的感谢表达；助かります强调帮助解决了自己的需要，不是字面获救。
询问能否帮自己拿一下这个|Could you hold this for me?|kʊd ju hoʊld ðɪs fər mi|これをちょっと持っていてもらえますか。|これをちょっともっていてもらえますか。|hold 是暂时拿着；持っていて请求持续保持拿着，不是交给自己。
看见别人搬东西，主动提供帮助|Do you need a hand?|du ju niːd ə hænd|手伝いましょうか。|てつだいましょうか。|a hand 在此指帮忙；ましょうか是主动提议，不是要求对方帮助自己。
提出请求前先确认对方是否方便|If you have a moment, could you ...?|ɪf ju hæv ə ˈmoʊmənt kʊd ju|お時間があれば、〜てもらえますか。|おじかんがあれば、〜てもらえますか。|例：If you have a moment, could you check this?／お時間があれば、これを確認してもらえますか。条件为对方留出拒绝空间。
确认对方需要怎样的帮助|A: Can you help me with this?\nB: Sure. What do you need me to do?|eɪ kæn ju hɛlp mi wɪð ðɪs\nbi ʃʊr wʌt du ju niːd mi tə duː|A: これ、手伝ってもらえる？\nB: いいよ。何をすればいい？|A: これ、てつだってもらえる？\nB: いいよ。なにをすればいい？|need me to do 表达需要我做什么；すればいい问适合采取的行动，而不是只答可以。
请人帮一个具体的忙|favor|ˈfeɪvər|お願い事|おねがいごと|a favor 是一次具体帮忙；favor 也有支持偏爱等义。例：Could you do me a favor?／一つお願いしてもいいですか。
解释自己试过了但还是不行|I've tried that, but it still doesn't work.|aɪv traɪd ðæt bət ɪt stɪl ˈdʌzənt wɜrk|それは試したんですが、まだうまくいきません。|それはためしたんですが、まだうまくいきません。|work 在此是方法奏效或设备运行；日语うまくいく强调顺利达到效果。
询问对方是否介意帮忙做某事|Would you mind ...ing?|wʊd ju maɪnd ɪŋ|〜ていただけますか。|〜ていただけますか。|例：Would you mind opening the window?／窓を開けていただけますか。英语 mind 后接动名词；回答 No 表示不介意，日语直接请求更清楚。
对方帮不上忙，你表示理解|No problem. Thanks anyway.|noʊ ˈprɑbləm θæŋks ˈɛniˌweɪ|大丈夫です。お気持ちだけでもありがたいです。|だいじょうぶです。おきもちだけでもありがたいです。|anyway 在此感谢对方愿意考虑；日语感谢心意，避免生硬责怪没有实际帮到。
不想让请求给对方带来麻烦|I don't want to put you out.|aɪ doʊnt wɑnt tə pʊt ju aʊt|ご迷惑をおかけしたくないので。|ごめいわくをおかけしたくないので。|put someone out 在这里是给人添麻烦；日语ので结尾可柔和解释顾虑，需结合上下文。
愿意帮忙但限定自己能做的部分|A: Could you take care of the whole thing?\nB: I can help with the setup, but that's all I can commit to.|eɪ kʊd ju teɪk kɛr əv ðə hoʊl θɪŋ\nbi aɪ kæn hɛlp wɪð ðə ˈsɛtˌʌp bət ðæts ɔl aɪ kæn kəˈmɪt tuː|A: 全部お願いできる？\nB: 準備なら手伝えるけど、約束できるのはそこまでかな。|A: ぜんぶおねがいできる？\nB: じゅんびならてつだえるけど、やくそくできるのはそこまでかな。|commit to 指承诺承担；なら限定可提供帮助的范围，那里不是物理地点而是任务界限。`,
plans:String.raw`去某地或做某事的打算|plan|plæn|予定|よてい|plan 可指较具体计划；予定也可指已排定事项。例：What's the plan?／どういう予定ですか。
对朋友说下次再试|Maybe next time.|ˈmeɪbi nɛkst taɪm|また今度ね。|またこんどね。|可能是真要下次，也可能是柔和拒绝；不能把这句话当作确定承诺。
告诉别人自己明天准备做饭|I'm going to cook tomorrow.|aɪm ˈɡoʊɪŋ tə kʊk təˈmɑroʊ|明日は料理をするつもりです。|あしたはりょうりをするつもりです。|be going to 表示已有打算；つもり也指主观意图，并不保证一定发生。
朋友问你是否去过京都，你还没有|Not yet, but I'd like to.|nɑt jɛt bət aɪd laɪk tuː|まだないけど、行ってみたいです。|まだないけど、いってみたいです。|I'd like to 省略已知动词；行ってみたい含尝试体验意味，不必逐字对应 see。
询问别人是否曾经有过某种经历|Have you ever ...?|hæv ju ˈɛvər|〜たことがありますか。|〜たことがありますか。|例：Have you ever camped?／キャンプをしたことがありますか。英语用过去分词；日语用た形加ことがある。
聊计划改变后的安排|A: Are you still going away this weekend?\nB: No, we decided to stay home instead.|eɪ ɑr ju stɪl ˈɡoʊɪŋ əˈweɪ ðɪs ˈwiːkɛnd\nbi noʊ wi dɪˈsaɪdɪd tə steɪ hoʊm ɪnˈstɛd|A: 週末は出かける予定のまま？\nB: ううん、代わりに家で過ごすことにした。|A: しゅうまつはでかけるよていのまま？\nB: ううん、かわりにいえですごすことにした。|instead 表示选择替代方案；ことにした说明自己作出的决定，区别于外部决定的ことになった。
对未来某件事感到期待|look forward to|lʊk ˈfɔrwərd tuː|楽しみにする|たのしみにする|to 后接名词或动名词。例：I'm looking forward to seeing you.／会えるのを楽しみにしています。expect 主要指预期，不总含开心期待。
说明结果和自己原来的设想不同|It turned out differently than I expected.|ɪt tɜrnd aʊt ˈdɪfərəntli ðæn aɪ ɪkˈspɛktɪd|思っていたのとは違う結果になりました。|おもっていたのとはちがうけっかになりました。|turn out 描述最终结果；日语用結果になった，不强制翻译成转变方向。
表达本来会做某事但被另一件事打断|I would have ..., but ...|aɪ wʊd hæv bət|〜つもりでしたが、〜。|〜つもりでしたが、〜。|例：I would have joined you, but I had to work.／参加するつもりでしたが、仕事が入ってしまいました。英语反事实结构比日语意图表达更明确，不是所有场景可互换。
计划尚未成熟，不想过早保证|It's still up in the air.|ɪts stɪl ʌp ɪn ði ɛr|まだはっきり決まっていません。|まだはっきりきまっていません。|up in the air 指未确定，不是事情真的在空中；日语直接说明尚未决定。
回头看才意识到当时的判断有偏差|In hindsight, I should have waited.|ɪn ˈhaɪndˌsaɪt aɪ ʃʊd hæv ˈweɪtɪd|今思えば、待てばよかったです。|いまおもえば、まてばよかったです。|in hindsight 是事后回顾；should have 指过去没做的较好选择，日语ばよかった表达后悔。
回顾一次不顺利但有收获的经历|A: Was the trip worth it after all?\nB: It wasn't what I'd hoped for, but I learned a lot.|eɪ wəz ðə trɪp wɜrθ ɪt ˈæftər ɔl\nbi ɪt ˈwɑzənt wʌt aɪd hoʊpt fər bət aɪ lɜrnd ə lɑt|A: 結局、行った甲斐はあった？\nB: 期待どおりではなかったけど、学ぶことは多かったよ。|A: けっきょく、いったかいはあった？\nB: きたいどおりではなかったけど、まなぶことはおおかったよ。|worth it 指投入值得；甲斐がある强调付出有意义。肯定收获不意味着否定经历中的失望。`
});
