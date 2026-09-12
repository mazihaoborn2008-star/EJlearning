# Phase 3 → V2 mapping proposal

All 183 Concepts are analyzed from local immutable migrations. This report is an editorial migration proposal, not executed migration or approval. Per-language source text and proposed handling are in the JSON companion.

- Sentence: 54
- Vocabulary: 28
- Sentence scenario: 44
- Grammar + Sentence examples: 28
- Sentence dialogue: 28
- Vocabulary fixed_expression: 1

Human review: 51 items (20, 24, 26, 32, 34, 36, 38, 44, 46, 48, 56, 58, 60, 62, 64, 68, 70, 72, 74, 80, 82, 84, 89, 92, 96, 104, 108, 112, 113, 116, 118, 120, 122, 128, 130, 132, 140, 142, 144, 146, 152, 154, 156, 164, 168, 170, 172, 176, 178, 180, 182). Every pattern requires independent grammar selection and concrete examples; ambiguous lexical identity and communicative phrase boundaries are marked below. High confidence classifies the destination only, not content approval or automatic mastery transfer.

| ID | Legacy type | Chinese anchor | Destination | Language handling (EN / JA) | Confidence | Review | Editorial decision |
|---|---|---|---|---|---|---|---|
| 1 | sentence | 你在干嘛？ | Sentence | What are you doing? / 何をしているの？; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 2 | sentence | 我刚起床。 | Sentence | I just woke up. / 今起きたところ。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 3 | sentence | 我有点累。 | Sentence | I’m a little tired. / ちょっと疲れた。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 4 | sentence | 我不知道。 | Sentence | I don’t know. / わからない。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 5 | sentence | 等一下。 | Sentence | Wait a second. / ちょっと待って。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 6 | sentence | 我饿了。 | Sentence | I’m hungry. / お腹がすいた。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 7 | sentence | 你想吃什么？ | Sentence | What do you want to eat? / 何が食べたい？; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 8 | sentence | 我还没吃饭。 | Sentence | I haven’t eaten yet. / まだ食べていません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 9 | sentence | 这个辣吗？ | Sentence | Is this spicy? / これは辛いですか？; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 10 | sentence | 我吃饱了。 | Sentence | I’m full. / お腹がいっぱい。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 11 | sentence | 今天有课吗？ | Sentence | Do we have class today? / 今日は授業がありますか？; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 12 | sentence | 我迟到了。 | Sentence | I’m late. / 遅れました。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 13 | sentence | 我听不懂。 | Sentence | I don’t understand what you’re saying. / 言っていることがわかりません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 14 | sentence | 什么时候截止？ | Sentence | When is it due? / 締め切りはいつですか？; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 15 | sentence | 我还没写作业。 | Sentence | I haven’t done my homework yet. / まだ宿題をしていません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 16 | vocabulary | 名字（用于自我介绍） | Vocabulary | name / 名前; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 17 | phrase | 跟熟人说早上好 | Sentence scenario | Morning! / おはよう。; independent IDs & difficulty | high | No | 问候是完整社交回应，保留情境和礼貌变体。 |
| 18 | sentence | 告诉别人自己住在附近 | Sentence | I live nearby. / この近くに住んでいます。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 19 | scenario_response | 没听清对方的名字，请他再说一次 | Sentence scenario | Sorry, what was your name? / すみません、お名前をもう一度お願いします。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 20 | pattern | 问别人是否喜欢某种东西 | Grammar + Sentence examples | Do you like ...? / 〜は好きですか。; independent IDs & difficulty | medium | Yes | 分别从 Do you like ...? 与 〜は好きですか。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 21 | dialogue | 聊聊周末过得怎样 | Sentence dialogue | A: How was your weekend? B: Pretty quiet. I stayed home. / A: 週末はどうだった？ B: のんびりしてた。家にいたよ。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 22 | vocabulary | 闲聊而不深入讨论 | Vocabulary | small talk / 世間話; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 23 | sentence | 确认自己是否理解了对方 | Sentence | Let me make sure I understand. / 理解が合っているか確認させてください。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 24 | pattern | 表达自己并不是想要做某事 | Grammar + Sentence examples | It's not that I want to ... / 〜したいわけではありません。; independent IDs & difficulty | medium | Yes | 分别从 It's not that I want to ... 与 〜したいわけではありません。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 25 | scenario_response | 发现自己的玩笑让对方误会了 | Sentence scenario | I meant that as a joke. / 冗談のつもりだったんです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 26 | phrase | 委婉地补充一个不同看法 | Vocabulary fixed_expression | That said, ... / とはいえ、〜。; independent IDs & difficulty | medium | Yes | That said / とはいえ 是可复用话语连接表达；各自建固定表达义项和例句，核对语篇功能。 |
| 27 | dialogue | 澄清一句话听起来比本意更强硬 | Sentence dialogue | A: That sounded a bit harsh. B: You're right. Let me rephrase that. / A: ちょっときつく聞こえたよ。 B: そうだね。言い直すね。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 28 | vocabulary | 可以带走的剩饭菜 | Vocabulary | leftovers / 残り物; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 29 | phrase | 用餐时请别人递水 | Sentence scenario | Water, please. / お水をお願いします。; independent IDs & difficulty | high | No | 点单/递水请求是交际句，不把 water 与完整请求视为同一词条。 |
| 30 | sentence | 说明自己不能吃花生 | Sentence | I can't eat peanuts. / ピーナッツは食べられません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 31 | scenario_response | 服务员问要堂食还是带走，你要带走 | Sentence scenario | To go, please. / 持ち帰りでお願いします。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 32 | pattern | 想少放某种调料 | Grammar + Sentence examples | Could you go easy on the ...? / 〜は少なめでお願いします。; independent IDs & difficulty | medium | Yes | 分别从 Could you go easy on the ...? 与 〜は少なめでお願いします。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 33 | dialogue | 问餐厅还要等多久 | Sentence dialogue | A: How long is the wait? B: About twenty minutes. / A: どのくらい待ちますか。 B: 二十分ほどです。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 34 | vocabulary | 形容味道清淡而非难吃 | Vocabulary | light / あっさりした; independent IDs & difficulty | medium | Yes | 英语 light 为多义形容词；日语あっさりした需确定词头为あっさり，不能照抄修饰形式。 |
| 35 | sentence | 解释自己只想吃点简单的 | Sentence | I'm in the mood for something simple. / 今日は軽く済ませたい気分です。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 36 | pattern | 委婉说自己更喜欢另一种口味 | Grammar + Sentence examples | I'd rather have ... / どちらかというと〜がいいです。; independent IDs & difficulty | medium | Yes | 分别从 I'd rather have ... 与 どちらかというと〜がいいです。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 37 | scenario_response | 菜比描述中辣很多，礼貌询问能否更换 | Sentence scenario | Would it be possible to change this? / こちら、別のものに替えていただくことはできますか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 38 | phrase | 吃过一种食物后逐渐喜欢上它 | Sentence | It's an acquired taste. / 慣れるとおいしく感じる味です。; independent IDs & difficulty | medium | Yes | 完整判断句含 acquired taste 词汇成分；句子为主，后续可另抽取词条。 |
| 39 | dialogue | 点错菜后协商怎样处理 | Sentence dialogue | A: I think there's been a mix-up. B: I'm sorry. I'll check your order. / A: 注文と違うものが来たようなんですが。 B: 申し訳ありません。確認いたします。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 40 | vocabulary | 要按时完成工作的期限 | Vocabulary | deadline / 締め切り; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 41 | phrase | 向同事确认收到消息 | Sentence scenario | Got it, thanks. / わかりました。ありがとうございます。; independent IDs & difficulty | high | No | 确认收到并致谢，两个交际动作组成回应。 |
| 42 | sentence | 说明自己正在处理这件事 | Sentence | I'm working on it. / 今、取り組んでいます。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 43 | scenario_response | 没跟上讨论，请别人再解释一遍 | Sentence scenario | Could you explain that again? / もう一度説明してもらえますか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 44 | pattern | 说明某个任务还没完成 | Grammar + Sentence examples | I haven't ... yet. / まだ〜ていません。; independent IDs & difficulty | medium | Yes | 分别从 I haven't ... yet. 与 まだ〜ていません。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 45 | dialogue | 协调任务分工 | Sentence dialogue | A: Can you handle the slides? B: Sure. Could you check the figures? / A: スライドをお願いできる？ B: いいよ。数字を確認してもらえる？; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 46 | vocabulary | 为改进工作提出反馈 | Vocabulary | feedback / 改善のための意見; independent IDs & difficulty | low | Yes | 日语改善のための意見是说明性名词短语；需编辑选择自然词头及词义范围。 |
| 47 | sentence | 表示截止日期可能来不及 | Sentence | I'm not sure I can meet the deadline. / 締め切りに間に合うか、ちょっと自信がありません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 48 | pattern | 提出以某个条件为前提的方案 | Grammar + Sentence examples | As long as ..., we can ... / 〜なら、〜できます。; independent IDs & difficulty | medium | Yes | 分别从 As long as ..., we can ... 与 〜なら、〜できます。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 49 | scenario_response | 不同意同事方案但先肯定其出发点 | Sentence scenario | I see your point, but I have a concern. / おっしゃることはわかりますが、一つ気になる点があります。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 50 | phrase | 暂时保留对某个方案的判断 | Sentence | I'll reserve judgment for now. / 今の段階では判断を保留します。; independent IDs & difficulty | high | No | 保留判断的完整陈述；reserve judgment 可另提取词组。 |
| 51 | dialogue | 在时间不够时商量缩小任务范围 | Sentence dialogue | A: We may need to narrow the scope. B: Agreed. Let's focus on what matters most. / A: 範囲を絞る必要がありそうですね。 B: そうですね。優先度の高いものに集中しましょう。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 52 | vocabulary | 备用的钥匙 | Vocabulary | spare key / 合鍵; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 53 | phrase | 进门请客人随意坐 | Sentence scenario | Have a seat. / どうぞ座ってください。; independent IDs & difficulty | high | No | 邀请客人坐下的场景回应。 |
| 54 | sentence | 告诉家人垃圾已经倒了 | Sentence | I took out the trash. / ごみを出しました。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 55 | scenario_response | 室友音量太大，请他调小 | Sentence scenario | Could you turn it down a little? / 少し音を小さくしてもらえますか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 56 | pattern | 提醒自己离开前别忘了做某事 | Grammar + Sentence examples | Remember to ... before you leave. / 出かける前に、忘れずに〜てください。; independent IDs & difficulty | medium | Yes | 分别从 Remember to ... before you leave. 与 出かける前に、忘れずに〜てください。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 57 | dialogue | 确认洗衣机是否空着 | Sentence dialogue | A: Are you using the washing machine? B: No, go ahead. / A: 洗濯機、使ってる？ B: ううん、使っていいよ。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 58 | vocabulary | 东西堆得杂乱的状态 | Vocabulary | clutter / 散らかった物; independent IDs & difficulty | medium | Yes | 日语散らかった物是描述短语；英语 clutter 为不可数名词，需独立选词。 |
| 59 | sentence | 说明水龙头一直在漏水 | Sentence | The faucet has been dripping all night. / 一晩中、蛇口から水がぽたぽた落ちています。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 60 | pattern | 表达某件家务早就该做了 | Grammar + Sentence examples | It's about time we ... / そろそろ〜したほうがいいですね。; independent IDs & difficulty | medium | Yes | 分别从 It's about time we ... 与 そろそろ〜したほうがいいですね。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 61 | scenario_response | 不想直接责备室友，提议重新分配家务 | Sentence scenario | Could we rethink how we split the chores? / 家事の分担を一度見直しませんか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 62 | phrase | 让来访客人不必拘束 | Sentence scenario | Make yourself at home. / どうぞ気楽にしてください。; independent IDs & difficulty | medium | Yes | 待客用语，英语习语和日语自然回应不应逐词等同。 |
| 63 | dialogue | 与邻居商量夜间噪声 | Sentence dialogue | A: I hate to bother you, but the noise carries. B: Sorry, I didn't realize. We'll keep it down. / A: すみません、音がかなり響いているんですが。 B: すみません、気づきませんでした。気をつけます。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 64 | vocabulary | 约好的见面安排 | Vocabulary | appointment / 予約; independent IDs & difficulty | medium | Yes | appointment与予約范围不完全相同；区分私人见面、预约服务与约定。 |
| 65 | phrase | 请别人稍等一下 | Sentence scenario | Just a moment. / 少々お待ちください。; independent IDs & difficulty | high | No | 请求稍候的完整场景回应；日语敬语需要独立标注。 |
| 66 | sentence | 说明自己十分钟后到 | Sentence | I'll be there in ten minutes. / あと十分で着きます。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 67 | scenario_response | 朋友临时约明天，你有空 | Sentence scenario | Tomorrow works for me. / 明日なら大丈夫です。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 68 | pattern | 想把约定改到另一个时间 | Grammar + Sentence examples | Could we move it to ...? / 〜に変更できますか。; independent IDs & difficulty | medium | Yes | 分别从 Could we move it to ...? 与 〜に変更できますか。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 69 | dialogue | 确认见面地点与时间 | Sentence dialogue | A: Shall we meet outside at six? B: Six is fine. By the main entrance? / A: 六時に外で会おうか。 B: いいよ。正面玄関のところ？; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 70 | vocabulary | 时间上留一点余量 | Vocabulary | buffer / 余裕; independent IDs & difficulty | medium | Yes | buffer与余裕语义范围不同，须限制为时间余量并补搭配。 |
| 71 | sentence | 说明自己刚好赶上了末班车 | Sentence | I made it just in time for the last train. / 終電にぎりぎり間に合いました。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 72 | pattern | 表达越早做某事越好 | Grammar + Sentence examples | The sooner ..., the better. / 〜は早ければ早いほどいいです。; independent IDs & difficulty | medium | Yes | 分别从 The sooner ..., the better. 与 〜は早ければ早いほどいいです。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 73 | scenario_response | 收到过于临时的邀请，解释自己来不及安排 | Sentence scenario | That's a bit short notice for me. / ちょっと急なので、予定の調整が難しいです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 74 | phrase | 先暂定一个日期 | Sentence | Let's pencil it in. / ひとまず仮の予定にしておきましょう。; independent IDs & difficulty | medium | Yes | 暂定日期的完整建议；pencil in 可另提取词组。 |
| 75 | dialogue | 在多个时间冲突时协商优先安排 | Sentence dialogue | A: Could we keep that afternoon flexible? B: Sure. Let me know once your plans firm up. / A: その日の午後は、まだ確定しないでおける？ B: いいよ。予定が固まったら教えて。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 76 | vocabulary | 购物后保留的收据 | Vocabulary | receipt / レシート; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 77 | phrase | 逛店时告诉店员先随便看看 | Sentence scenario | Just looking, thanks. / 見ているだけです。ありがとうございます。; independent IDs & difficulty | high | No | 商店场景的自然回应。 |
| 78 | sentence | 询问有没有更小的尺码 | Sentence | Do you have this in a smaller size? / これの小さいサイズはありますか。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 79 | scenario_response | 试衣前先问可不可以试穿 | Sentence scenario | Can I try this on? / これを試着してもいいですか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 80 | pattern | 想比较两个选项再决定 | Grammar + Sentence examples | I'm choosing between ... and ... / 〜と〜で迷っています。; independent IDs & difficulty | medium | Yes | 分别从 I'm choosing between ... and ... 与 〜と〜で迷っています。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 81 | dialogue | 结账时确认能否刷卡 | Sentence dialogue | A: Do you take cards? B: Yes, except for that one. / A: カードは使えますか。 B: はい。ただ、そちらのカードは使えません。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 82 | vocabulary | 商品价格合理、物有所值 | Vocabulary | good value / 値段の割にいい; independent IDs & difficulty | low | Yes | 英语 good value 可作词汇搭配；日语値段の割にいい含可生产语法结构，建议另保留句子例证。 |
| 83 | sentence | 说明商品和网上照片看起来不一样 | Sentence | It doesn't look quite like the photo online. / ネットの写真とは少し印象が違います。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 84 | pattern | 询问退货需要满足什么条件 | Grammar + Sentence examples | What if ...? / もし〜たら、どうなりますか。; independent IDs & difficulty | medium | Yes | 分别从 What if ...? 与 もし〜たら、どうなりますか。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 85 | scenario_response | 店员推荐超预算商品，礼貌坚持预算 | Sentence scenario | I'd prefer to stay within my budget. / できれば予算内で探したいです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 86 | phrase | 价格不是唯一要考虑的因素 | Sentence | Price isn't the whole story. / 値段だけでは判断できません。; independent IDs & difficulty | high | No | 完整评价句，并非词汇短语。 |
| 87 | dialogue | 发现保修条款有例外，进一步确认 | Sentence dialogue | A: Does the warranty cover accidental damage? B: No, that would require separate coverage. / A: うっかり壊した場合も保証の対象ですか。 B: いいえ、そちらは別の補償が必要です。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 88 | vocabulary | 乘车时要付的费用 | Vocabulary | fare / 運賃; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 89 | phrase | 向路人说借过一下 | Sentence scenario | Excuse me. / すみません、通ります。; independent IDs & difficulty | medium | Yes | 通行场景回应；英语 excuse me 的其他功能必须分义。 |
| 90 | sentence | 询问车站在哪里 | Sentence | Where's the station? / 駅はどこですか。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 91 | scenario_response | 司机问你在哪下车，你指下一个路口 | Sentence scenario | At the next corner, please. / 次の角でお願いします。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 92 | pattern | 告诉别人去某地需要多久 | Grammar + Sentence examples | It takes ... to get there. / そこまで〜かかります。; independent IDs & difficulty | medium | Yes | 分别从 It takes ... to get there. 与 そこまで〜かかります。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 93 | dialogue | 询问是否需要换乘 | Sentence dialogue | A: Does this train go to the airport? B: You'll need to change at Central. / A: この電車は空港まで行きますか。 B: 中央駅で乗り換えてください。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 94 | vocabulary | 途中绕道去一个地方 | Vocabulary | detour / 回り道; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 95 | sentence | 说明自己刚刚坐过站了 | Sentence | I just missed my stop. / うっかり乗り過ごしました。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 96 | pattern | 比较路线时强调即使绕路也更快 | Grammar + Sentence examples | Even if ..., it's still ... / たとえ〜ても、〜です。; independent IDs & difficulty | medium | Yes | 分别从 Even if ..., it's still ... 与 たとえ〜ても、〜です。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 97 | scenario_response | 列车取消后询问有哪些替代方式 | Sentence scenario | What are my alternatives? / ほかにどんな行き方がありますか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 98 | phrase | 在途中顺便接上某人 | Sentence | I'll pick you up on the way. / 途中で迎えに行くよ。; independent IDs & difficulty | high | No | 完整接送承诺句；pick up 和 on the way 可另提取词组。 |
| 99 | dialogue | 转机时间紧时确认行李是否直挂 | Sentence dialogue | A: Will my bag go straight through? B: Yes, but you'll need to change terminals. / A: 荷物は最終目的地まで預けられますか。 B: はい。ただ、ターミナルの移動が必要です。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 100 | vocabulary | 下雨时用的伞 | Vocabulary | umbrella / 傘; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 101 | phrase | 随口说今天好冷 | Sentence | It's chilly! / 肌寒いね。; independent IDs & difficulty | high | No | 完整天气感叹。 |
| 102 | sentence | 说明外面正在下雨 | Sentence | It's raining outside. / 外は雨が降っています。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 103 | scenario_response | 朋友要出门，提醒带件外套 | Sentence scenario | You might want to bring a jacket. / 上着を持っていったほうがいいかも。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 104 | pattern | 根据天空推测快要下雨 | Grammar + Sentence examples | It looks like ... / 〜そうです。; independent IDs & difficulty | medium | Yes | 分别从 It looks like ... 与 〜そうです。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 日语そう的样态/传闻须分开；不能仅由中文看起来决定。 |
| 105 | dialogue | 商量下雨后把活动改到室内 | Sentence dialogue | A: Shall we still go for a walk? B: Let's stay in until it stops. / A: それでも散歩に行く？ B: 雨がやむまで中にいよう。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 106 | vocabulary | 空气又热又潮湿的感觉 | Vocabulary | muggy / 蒸し暑い; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 107 | sentence | 说明温差比预期大 | Sentence | It cools down much more than I expected. / 思った以上に冷え込みますね。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 108 | pattern | 提醒不管预报如何都要准备备用方案 | Grammar + Sentence examples | Regardless of ..., we should ... / 〜にかかわらず、〜したほうがいいです。; independent IDs & difficulty | medium | Yes | 分别从 Regardless of ..., we should ... 与 〜にかかわらず、〜したほうがいいです。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 109 | scenario_response | 天气突然转坏，建议别冒险继续出行 | Sentence scenario | I'd rather not risk it in this weather. / この天気で無理をするのはやめておきたいです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 110 | phrase | 天气终于开始放晴 | Sentence | It seems to be clearing up. / ようやく晴れてきたみたいです。; independent IDs & difficulty | high | No | 描述天气变化的完整推测句。 |
| 111 | dialogue | 在不稳定天气下保留出游决定 | Sentence dialogue | A: The forecast keeps changing. B: Let's play it by ear and decide tomorrow. / A: 予報がころころ変わるね。 B: 様子を見て、明日決めよう。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 112 | vocabulary | 口渴的身体感觉 | Vocabulary | thirsty / 喉が渇いた; independent IDs & difficulty | low | Yes | 英语 thirsty 是形容词；日语喉が渇いた是完整状态表达，可拆词汇与Sentence，不能伪造一对一词头。 |
| 113 | phrase | 对身体不舒服的人说多保重 | Sentence scenario | Take care. / お大事に。; independent IDs & difficulty | medium | Yes | 对病人的场景回应；Take care 的告别义与お大事に并非普遍等价。 |
| 114 | sentence | 说明自己有点头疼 | Sentence | I have a slight headache. / 少し頭が痛いです。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 115 | scenario_response | 别人问你是否需要休息，你想坐一会儿 | Sentence scenario | I could use a short break. / 少し休ませてもらえると助かります。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 116 | pattern | 说明某种不适从某时开始 | Grammar + Sentence examples | I've had ... since ... / 〜から、〜が続いています。; independent IDs & difficulty | medium | Yes | 分别从 I've had ... since ... 与 〜から、〜が続いています。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 117 | dialogue | 同事关心你是否好些了 | Sentence dialogue | A: Are you feeling any better? B: A little, but I'm still tired. / A: 少しはよくなった？ B: 少しね。でも、まだだるい。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 118 | vocabulary | 身体疲惫、没精神 | Vocabulary | run-down / 疲れがたまっている; independent IDs & difficulty | low | Yes | 英语 run-down 是词汇项；日语疲れがたまっている是状态句，需拆分词汇与Sentence。 |
| 119 | sentence | 描述不适时轻时重 | Sentence | The pain comes and goes. / 痛みが出たり治まったりします。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 120 | pattern | 强调并非完全恢复，只是有所好转 | Grammar + Sentence examples | Not quite ..., but ... / まだ〜わけではありませんが、〜。; independent IDs & difficulty | medium | Yes | 分别从 Not quite ..., but ... 与 まだ〜わけではありませんが、〜。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 121 | scenario_response | 需要取消活动但不想详细讲病情 | Sentence scenario | I'm not up to it today, I'm afraid. / すみません、今日は参加できる体調ではなくて。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 122 | phrase | 说明自己正在慢慢恢复状态 | Sentence | I'm getting back on my feet. / 少しずつ調子を取り戻しています。; independent IDs & difficulty | medium | Yes | 完整恢复状态陈述；get back on one’s feet 可单列义项。 |
| 123 | dialogue | 向医生描述不适而不自行下结论 | Sentence dialogue | A: Is it constant or does it come and go? B: It comes and goes, especially after meals. / A: ずっと痛みますか。それとも時々ですか。 B: 時々です。特に食後に痛みます。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 124 | vocabulary | 对某事感到高兴 | Vocabulary | glad / うれしい; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 125 | phrase | 听到好消息表示太好了 | Sentence scenario | That's great! / よかったね！; independent IDs & difficulty | high | No | 对好消息的场景反应。 |
| 126 | sentence | 告诉朋友自己今天有点紧张 | Sentence | I'm a little nervous today. / 今日は少し緊張しています。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 127 | scenario_response | 朋友担心你，你说现在没事了 | Sentence scenario | I'm okay now, thanks for checking. / もう大丈夫。気にかけてくれてありがとう。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 128 | pattern | 说某件事让自己感到某种情绪 | Grammar + Sentence examples | It makes me feel ... / 〜と、〜気持ちになります。; independent IDs & difficulty | medium | Yes | 分别从 It makes me feel ... 与 〜と、〜気持ちになります。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 129 | dialogue | 朋友发现你很安静，关心你的状态 | Sentence dialogue | A: You seem quiet today. B: Just a lot on my mind. / A: 今日は静かだね。 B: ちょっと考え事が多くて。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 130 | vocabulary | 事情太多而感到应付不过来 | Vocabulary | overwhelmed / いっぱいいっぱい; independent IDs & difficulty | medium | Yes | 日语いっぱいいっぱい口语用法与英语 overwhelmed含义范围不同。 |
| 131 | sentence | 解释自己失望但不是生气 | Sentence | I'm disappointed, not angry. / 怒っているわけではなく、残念に思っています。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 132 | pattern | 表达本来担心，结果松了口气 | Grammar + Sentence examples | I was worried ..., but ... / 〜と心配していましたが、〜。; independent IDs & difficulty | medium | Yes | 分别从 I was worried ..., but ... 与 〜と心配していましたが、〜。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 133 | scenario_response | 朋友心情低落，你愿意听但不强迫他说 | Sentence scenario | You don't have to talk, but I'm here. / 無理に話さなくていいよ。話したくなったら聞くから。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 134 | phrase | 对一件事同时有两种矛盾感受 | Sentence | I have mixed feelings about it. / 複雑な気持ちです。; independent IDs & difficulty | high | No | 完整情绪陈述；mixed feelings 可另建词汇。 |
| 135 | dialogue | 说明建议虽然出于好意却让自己有压力 | Sentence dialogue | A: I know you mean well, but I feel pressured. B: I'm sorry. I'll give you some space. / A: 心配してくれるのはわかるけど、少し負担に感じる。 B: ごめん。少しそっとしておくね。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 136 | vocabulary | 业余时间喜欢做的事 | Vocabulary | hobby / 趣味; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 137 | phrase | 朋友邀你一起试试，你说好呀 | Sentence scenario | Sounds fun! / 楽しそう！; independent IDs & difficulty | high | No | 回应邀约的场景反应。 |
| 138 | sentence | 说明自己喜欢散步 | Sentence | I enjoy going for walks. / 散歩するのが好きです。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 139 | scenario_response | 朋友问你玩得好不好，你说明刚开始学 | Sentence scenario | I'm still a beginner. / まだ始めたばかりです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 140 | pattern | 说明自己最近开始做某事 | Grammar + Sentence examples | I've started ... / 最近、〜始めました。; independent IDs & difficulty | medium | Yes | 分别从 I've started ... 与 最近、〜始めました。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 141 | dialogue | 聊最近正在看的作品 | Sentence dialogue | A: What are you watching these days? B: A cooking show. It's surprisingly relaxing. / A: 最近、何を見てる？ B: 料理番組。意外と落ち着くんだ。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 142 | vocabulary | 专注做事而暂时忘记周围 | Vocabulary | get absorbed in / 夢中になる; independent IDs & difficulty | medium | Yes | 两边均为可复用词组，但要分别处理get absorbed in的介词补足与夢中になる。 |
| 143 | sentence | 说明某个爱好能帮助自己放松 | Sentence | It helps me switch off after work. / 仕事の後の気分転換になります。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 144 | pattern | 表达自己越练越能体会乐趣 | Grammar + Sentence examples | The more I ..., the more ... / 〜ば〜ほど、〜。; independent IDs & difficulty | medium | Yes | 分别从 The more I ..., the more ... 与 〜ば〜ほど、〜。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 145 | scenario_response | 不喜欢朋友很爱的作品，但尊重他的喜好 | Sentence scenario | It's not really my thing, but I see the appeal. / 自分の好みではないけど、魅力はわかるよ。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 146 | phrase | 看过多次后才渐渐喜欢 | Sentence | It's grown on me. / だんだん好きになってきました。; independent IDs & difficulty | medium | Yes | 完整变化陈述；grow on somebody 需要单独义项，不直配日语句子。 |
| 147 | dialogue | 朋友想把爱好变成工作，你提出保留意见 | Sentence dialogue | A: Have you thought of doing it professionally? B: Maybe, but I'd hate to lose the enjoyment. / A: 仕事にすることは考えた？ B: 少しね。でも、純粋に楽しめなくなるのは嫌かな。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 148 | vocabulary | 邀请别人参加活动 | Vocabulary | invitation / 誘い; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 149 | phrase | 向帮过自己的人表示感谢 | Sentence scenario | Thanks a lot. / どうもありがとう。; independent IDs & difficulty | high | No | 完整致谢场景。 |
| 150 | sentence | 询问朋友是否愿意一起吃午饭 | Sentence | Would you like to have lunch together? / 一緒にお昼を食べませんか。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 151 | scenario_response | 收到邀请但当天已有安排 | Sentence scenario | I'd love to, but I have plans. / 行きたいんだけど、その日は予定があるんだ。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 152 | pattern | 邀请别人下次有空再一起做某事 | Grammar + Sentence examples | Let's ... sometime. / 今度、〜ましょう。; independent IDs & difficulty | medium | Yes | 分别从 Let's ... sometime. 与 今度、〜ましょう。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 153 | dialogue | 朋友介绍新朋友给你认识 | Sentence dialogue | A: This is my friend, Alex. B: Nice to meet you. I've heard a lot about you. / A: 友達のアレックスです。 B: 初めまして。お話はよく聞いています。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 154 | vocabulary | 在社交中注意分寸、为他人考虑 | Vocabulary | considerate / 気遣いができる; independent IDs & difficulty | low | Yes | 日语気遣いができる包含能力结构，优先词头気遣い并保留句子用法。 |
| 155 | sentence | 提醒大家自己可能提前离开 | Sentence | I may have to leave a little early. / 少し早めに失礼するかもしれません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 156 | pattern | 表达不是不想见面，只是需要独处 | Grammar + Sentence examples | It's nothing personal; I just ... / あなたが嫌なわけではなく、ただ〜。; independent IDs & difficulty | medium | Yes | 分别从 It's nothing personal; I just ... 与 あなたが嫌なわけではなく、ただ〜。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 157 | scenario_response | 别人问到私人问题，你想礼貌跳过 | Sentence scenario | I'd rather keep that private. / そのことは、あまり詳しく話したくないんです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 158 | phrase | 对邀请暂时不作承诺 | Sentence scenario | Can I get back to you on that? / その件は、改めて返事してもいいですか。; independent IDs & difficulty | high | No | 完整请求延后答复，保留语用条件。 |
| 159 | dialogue | 拒绝继续参加聚会又不破坏气氛 | Sentence dialogue | A: Come on, stay for one more. B: Tempting, but I'll call it a night. / A: もう少しだけいようよ。 B: そうしたいけど、今日はこの辺で帰るね。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 160 | vocabulary | 请求时需要的帮忙 | Vocabulary | help / 手伝い; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 161 | phrase | 向愿意帮忙的人说太感谢了 | Sentence scenario | Much appreciated. / 助かります。; independent IDs & difficulty | high | No | 致谢场景；助かります含受益语气，非逐词等价。 |
| 162 | sentence | 询问能否帮自己拿一下这个 | Sentence | Could you hold this for me? / これをちょっと持っていてもらえますか。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 163 | scenario_response | 看见别人搬东西，主动提供帮助 | Sentence scenario | Do you need a hand? / 手伝いましょうか。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 164 | pattern | 提出请求前先确认对方是否方便 | Grammar + Sentence examples | If you have a moment, could you ...? / お時間があれば、〜てもらえますか。; independent IDs & difficulty | medium | Yes | 分别从 If you have a moment, could you ...? 与 お時間があれば、〜てもらえますか。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 165 | dialogue | 确认对方需要怎样的帮助 | Sentence dialogue | A: Can you help me with this? B: Sure. What do you need me to do? / A: これ、手伝ってもらえる？ B: いいよ。何をすればいい？; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 166 | vocabulary | 请人帮一个具体的忙 | Vocabulary | favor / お願い事; independent IDs & difficulty | high | No | 按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。 |
| 167 | sentence | 解释自己试过了但还是不行 | Sentence | I've tried that, but it still doesn't work. / それは試したんですが、まだうまくいきません。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 168 | pattern | 询问对方是否介意帮忙做某事 | Grammar + Sentence examples | Would you mind ...ing? / 〜ていただけますか。; independent IDs & difficulty | medium | Yes | 分别从 Would you mind ...ing? 与 〜ていただけますか。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 169 | scenario_response | 对方帮不上忙，你表示理解 | Sentence scenario | No problem. Thanks anyway. / 大丈夫です。お気持ちだけでもありがたいです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 170 | phrase | 不想让请求给对方带来麻烦 | Sentence scenario | I don't want to put you out. / ご迷惑をおかけしたくないので。; independent IDs & difficulty | medium | Yes | 完整请求铺垫；日语以ので结尾依赖后续语境，需审定响应边界。 |
| 171 | dialogue | 愿意帮忙但限定自己能做的部分 | Sentence dialogue | A: Could you take care of the whole thing? B: I can help with the setup, but that's all I can commit to. / A: 全部お願いできる？ B: 準備なら手伝えるけど、約束できるのはそこまでかな。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 172 | vocabulary | 去某地或做某事的打算 | Vocabulary | plan / 予定; independent IDs & difficulty | low | Yes | legacy plan未标明名词/动词语义；日语予定是名词。代表样本en-plan为动词，不可直接复用该ID。 |
| 173 | phrase | 对朋友说下次再试 | Sentence scenario | Maybe next time. / また今度ね。; independent IDs & difficulty | high | No | 婉拒或延后邀请的场景回应，语气依情境。 |
| 174 | sentence | 告诉别人自己明天准备做饭 | Sentence | I'm going to cook tomorrow. / 明日は料理をするつもりです。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 175 | scenario_response | 朋友问你是否去过京都，你还没有 | Sentence scenario | Not yet, but I'd like to. / まだないけど、行ってみたいです。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 176 | pattern | 询问别人是否曾经有过某种经历 | Grammar + Sentence examples | Have you ever ...? / 〜たことがありますか。; independent IDs & difficulty | medium | Yes | 分别从 Have you ever ...? 与 〜たことがありますか。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 |
| 177 | dialogue | 聊计划改变后的安排 | Sentence dialogue | A: Are you still going away this weekend? B: No, we decided to stay home instead. / A: 週末は出かける予定のまま？ B: ううん、代わりに家で過ごすことにした。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
| 178 | vocabulary | 对未来某件事感到期待 | Vocabulary | look forward to / 楽しみにする; independent IDs & difficulty | medium | Yes | look forward to / 楽しみにする表示愉快期待，不等于expect或所有期待する用法。 |
| 179 | sentence | 说明结果和自己原来的设想不同 | Sentence | It turned out differently than I expected. / 思っていたのとは違う結果になりました。; independent IDs & difficulty | high | No | 保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。 |
| 180 | pattern | 表达本来会做某事但被另一件事打断 | Grammar + Sentence examples | I would have ..., but ... / 〜つもりでしたが、〜。; independent IDs & difficulty | low | Yes | 分别从 I would have ..., but ... 与 〜つもりでしたが、〜。 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。 英语would have为反事实条件/未实现结果，日语つもりでした为过去意图；二者不是语法等价，需要重审共同锚点。 |
| 181 | scenario_response | 计划尚未成熟，不想过早保证 | Sentence scenario | It's still up in the air. / まだはっきり決まっていません。; independent IDs & difficulty | high | No | 将中文交际条件放入context，保留各语言自然回应及适切性说明。 |
| 182 | phrase | 回头看才意识到当时的判断有偏差 | Sentence | In hindsight, I should have waited. / 今思えば、待てばよかったです。; independent IDs & difficulty | medium | Yes | 完整回顾后悔句；不是固定词汇短语。 |
| 183 | dialogue | 回顾一次不顺利但有收获的经历 | Sentence dialogue | A: Was the trip worth it after all? B: It wasn't what I'd hoped for, but I learned a lot. / A: 結局、行った甲斐はあった？ B: 期待どおりではなかったけど、学ぶことは多かったよ。; independent IDs & difficulty | high | No | 保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。 |
