# Phase 3.5E.1A.1 — Curated Grammar Example Target-Fidelity Audit

Generated: 2026-09-10T09:50:46.187Z

## Outcome

Audited exactly the 490 curated examples added in Phase 3.5E.1A. Every row now has an explicit target-fidelity role in an additive companion audit table. No curated example text was changed, removed, or replaced.

- DIRECT: 463
- CONTRAST: 24
- SUPPORT: 3
- INVALID: 0
- Grammar with all-direct examples: 57
- Grammar with contrast/support: 18
- English examples final: 210
- Japanese examples final: 280
- QA errors: 0
- QA warnings: 0

DIRECT remains the majority across the curated set for every selected Grammar. For en-will, the six Phase examples split 3 DIRECT / 3 CONTRAST, while its existing canonical curated example is DIRECT, yielding a 4 / 3 direct majority across its curated set.

The requested edge cases are explicit: en-since-for question 03 is SUPPORT because it elicits a since/for answer but contains neither marker; ja-te-kudasai example 04 is CONTRAST because 〜ないでください is not verb て-form + ください.

## Migration and isolation

- Corrective migration: migrations-35e1a1/0001_curated_grammar_example_target_roles.sql
- Change type: additive companion metadata table only
- Historical Phase 3.5E.1A migration modified: NO
- Dynamic AI Examples changed: NO
- Learner progress changed: NO
- Lessons changed: NO
- Production changed: NO

## English samples

### en-simple-present · Simple Present

- Role counts: DIRECT 6 / CONTRAST 0 / SUPPORT 0 / INVALID 0
- DIRECT: She walks to work every day. — 她每天步行上班。
- DIRECT: We usually eat dinner at seven. — 我们通常七点吃晚饭。
- DIRECT: My brother does not drink coffee. — 我哥哥不喝咖啡。
- DIRECT: The shop closes at six. — 这家店六点关门。
- DIRECT: Do they live near the station? — 他们住在车站附近吗？
- DIRECT: Water boils at one hundred degrees Celsius. — 水在一百摄氏度时沸腾。

### en-wh-question · wh-word + auxiliary + subject + verb?

- Role counts: DIRECT 5 / CONTRAST 1 / SUPPORT 0 / INVALID 0
- DIRECT: What time does the library open? — 图书馆几点开门？
- DIRECT: Where can I charge my phone? — 我可以在哪里给手机充电？
- DIRECT: Why did you change the plan? — 你为什么改变了计划？
- DIRECT: How much does this ticket cost? — 这张票多少钱？
- DIRECT: When are they arriving? — 他们什么时候到？
- CONTRAST: Which train goes to the city centre? — 哪趟火车去市中心？

### en-will · will + base verb

- Role counts: DIRECT 3 / CONTRAST 3 / SUPPORT 0 / INVALID 0
- DIRECT: I will carry that bag for you. — 我来帮你拿那个包。
- DIRECT: We will not be late. — 我们不会迟到。
- CONTRAST: Will you be home this evening? — 你今晚会在家吗？
- CONTRAST: The meeting will start at ten. — 会议将在十点开始。
- CONTRAST: I think the weather will improve tomorrow. — 我想明天天气会好转。
- DIRECT: Do not worry; I will call the landlord. — 别担心，我会给房东打电话。

### en-since-for · present perfect + since / for

- Role counts: DIRECT 5 / CONTRAST 0 / SUPPORT 1 / INVALID 0
- DIRECT: We have lived here for three years. — 我们在这里住了三年。
- DIRECT: She has not eaten since breakfast. — 她从早餐后一直没吃东西。
- SUPPORT: How long have you worked at this school? — 你在这所学校工作多久了？
- DIRECT: I have known him since university. — 我从大学起就认识他。
- DIRECT: The lift has been out of order for two days. — 电梯已经坏了两天。
- DIRECT: Have you been waiting since nine o'clock? — 你从九点起一直在等吗？

### en-would-rather · would rather + base verb

- Role counts: DIRECT 5 / CONTRAST 1 / SUPPORT 0 / INVALID 0
- DIRECT: I would rather take the train than drive. — 我宁愿坐火车也不愿开车。
- DIRECT: She would rather not talk about it now. — 她现在宁愿不谈这件事。
- DIRECT: Would you rather eat inside or outside? — 你更愿意在室内还是室外吃？
- DIRECT: We would rather wait for a quieter room. — 我们宁愿等一个更安静的房间。
- DIRECT: He said he would rather leave early. — 他说他宁愿早点离开。
- CONTRAST: I would rather you called before visiting. — 我希望你来访前先打电话。

## Japanese samples

### ja-copula · 〜です

- Role counts: DIRECT 5 / CONTRAST 2 / SUPPORT 0 / INVALID 0
- DIRECT: こちらが受付です。 — 这里是接待处。
- CONTRAST: 今日は休みではありません。 — 今天不是休息日。
- DIRECT: この部屋は静かですか。 — 这个房间安静吗？
- DIRECT: 予約は明日の三時です。 — 预约是明天下午三点。
- DIRECT: 妹は大学生です。 — 妹妹是大学生。
- DIRECT: 駅はあの建物の隣です。 — 车站在那栋楼旁边。
- CONTRAST: 昨日の担当は田中さんでした。 — 昨天的负责人是田中。

### ja-ga-existence · 名词 + がある / いる

- Role counts: DIRECT 4 / CONTRAST 2 / SUPPORT 1 / INVALID 0
- DIRECT: 机の上に鍵があります。 — 桌上有钥匙。
- DIRECT: 公園に子どもがいます。 — 公园里有孩子。
- CONTRAST: この近くに薬局はありません。 — 这附近没有药房。
- DIRECT: 部屋に冷蔵庫がありますか。 — 房间里有冰箱吗？
- SUPPORT: 駅の前に新しい店ができました。 — 车站前开了一家新店。
- CONTRAST: 会議室には誰もいません。 — 会议室里没有人。
- DIRECT: 明日の午後、予約があります。 — 明天下午有预约。

### ja-te-kudasai · 〜てください

- Role counts: DIRECT 6 / CONTRAST 1 / SUPPORT 0 / INVALID 0
- DIRECT: 荷物はここに置いてください。 — 请把行李放在这里。
- DIRECT: 次の角を右に曲がってください。 — 请在下一个路口右转。
- DIRECT: 少しゆっくり話してください。 — 请说慢一点。
- CONTRAST: ここでは写真を撮らないでください。 — 请不要在这里拍照。
- DIRECT: 名前と電話番号を書いてください。 — 请写下姓名和电话号码。
- DIRECT: 準備ができたら知らせてください。 — 准备好后请告诉我。
- DIRECT: わからない言葉は先生に聞いてください。 — 不懂的词请问老师。

### ja-ni-naru · 名词 / な形容词 + になる

- Role counts: DIRECT 5 / CONTRAST 1 / SUPPORT 1 / INVALID 0
- DIRECT: 来月、大学生になります。 — 下个月就成为大学生了。
- DIRECT: 夜になると、この道は静かになります。 — 到了晚上，这条路会变安静。
- DIRECT: 部屋がきれいになりました。 — 房间变干净了。
- SUPPORT: 会議は午後三時からになります。 — 会议改为下午三点开始。
- CONTRAST: この薬を飲むと眠くなることがあります。 — 吃这种药有时会犯困。
- DIRECT: 練習すれば、もっと上手になります。 — 练习的话会变得更熟练。
- DIRECT: 予定は来週に変更になりました。 — 日程改到下周了。

### ja-te-iru · 〜ている

- Role counts: DIRECT 7 / CONTRAST 0 / SUPPORT 0 / INVALID 0
- DIRECT: 今、駅で電車を待っています。 — 现在正在车站等电车。
- DIRECT: 姉は東京に住んでいます。 — 姐姐住在东京。
- DIRECT: 窓が開いています。 — 窗户开着。
- DIRECT: 今日は車を使っていません。 — 今天没有在用车。
- DIRECT: 何を読んでいますか。 — 你在读什么？
- DIRECT: この店は十年前から営業しています。 — 这家店从十年前起一直营业。
- DIRECT: 父は今、夕食を作っています。 — 爸爸现在正在做晚饭。

## Final metrics

DIRECT = 463
CONTRAST = 24
SUPPORT = 3
INVALID = 0

Grammar with all-direct examples = 57
Grammar with contrast/support = 18
Examples corrected = 0
Examples removed = 0
Examples added as replacement = 0

EN examples final = 210
JA examples final = 280
QA errors = 0
QA warnings = 0
