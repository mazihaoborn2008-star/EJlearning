# Phase 3.5E.1B — Core Expressions & Multi-turn Dialogue Expansion

Generated: 2026-09-10T21:58:08.184Z

## Outcome

A pure additive migration expanded reusable scenario expressions and coherent multi-turn dialogues in a new isolated local D1 copy. No lesson composition was changed. Grammar links are support metadata only, never Lesson required targets.

- EN expressions: 120; dialogues: 32; average turns: 6
- JA expressions: 130; dialogues: 36; average turns: 6
- EN standalone reusable scenario expressions: 88
- JA standalone reusable scenario expressions: 94
- High-confidence existing-vocabulary support links: EN 155; JA 150
- High-confidence existing-grammar support links: EN 98; JA 127
- Duplicate drafts rejected: 7
- Semantic/communicative-invalid drafts rejected: 11
- QA errors: 0; warnings: 0

## Isolation and scope

- Data copy: .wrangler/phase35e1b-release-final
- Migration: migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql
- Migration statements: PRAGMA + INSERT only
- Historical migrations changed: NO
- Lessons changed: NO; recommendations only are recorded in curriculum-audit.json
- Production changed: NO

## English dialogue samples

### restaurant-allergy · food · Stage 2

Goal: 确认过敏原后安全点餐。  
Context: 顾客在餐厅确认菜品是否含花生，并完成替换点单。

- **A**: Hi. Are you ready to order?
- **B**: Almost. Does the curry contain peanuts?
- **A**: The sauce does, but the tomato soup doesn’t.
- **B**: Thanks. I’ll have the soup, then.
- **A**: Certainly. I’ll note that you have a peanut allergy.
- **B**: Thank you. I appreciate that.

### appointment-reschedule · time · Stage 2

Goal: 完成预约改期与最终确认。  
Context: 来电者把周二预约改到周四。

- **A**: Good morning. I need to reschedule my appointment.
- **B**: Certainly. What day is it booked for?
- **A**: It’s under Lee for Tuesday at ten.
- **B**: I have Thursday at eleven or Friday at nine.
- **A**: Thursday at eleven works for me.
- **B**: All right. Your appointment is now Thursday at eleven.

### return-defect · shopping · Stage 3

Goal: 说明故障并协商退款方式。  
Context: 顾客退回使用两天即故障的水壶。

- **A**: This kettle stopped working after two days.
- **B**: I’m sorry to hear that. Do you have the receipt?
- **A**: Yes. I’d prefer a refund rather than a replacement.
- **B**: That’s fine. The refund will go back to your card.
- **A**: How long will that take?
- **B**: Usually three to five business days.

### repair-heating · home · Stage 3

Goal: 报修暖气并确认临时方案。  
Context: 租客报告暖气不工作。

- **A**: Hello. The heater in my flat isn’t working.
- **B**: I’m sorry about that. Is it showing an error code?
- **A**: Yes, it says E3, and the room is getting cold.
- **B**: A technician can come tomorrow afternoon.
- **A**: If it can’t be fixed then, could I borrow a portable heater?
- **B**: Yes. We can leave one at reception today.

### group-disagree · school · Stage 4

Goal: 表达不同意见并达成折中。  
Context: 小组对报告重点意见不同。

- **A**: I think we should focus on the survey results.
- **B**: I see your point, but the interviews explain why the results changed.
- **A**: Are you suggesting we include both?
- **B**: Yes, but we could shorten the background section.
- **A**: That sounds reasonable. Let’s keep one paragraph of background.
- **B**: Great. I’ll revise the outline.

## Japanese dialogue samples

### restaurant-bill · food · Stage 2

Goal: 核对账单错误并完成结账。  
Context: 顾客发现账单上多了一项，服务员核对并更正。

- **A**: すみません、お会計をお願いします。
- **B**: かしこまりました。すぐにお持ちします。
- **A**: このデザートは注文していないと思います。
- **B**: 申し訳ありません。こちらの間違いです。
- **A**: これを外して、別々に払えますか。
- **B**: はい。訂正した伝票を二枚お持ちします。

### medical-symptoms · health · Stage 3

Goal: 描述症状、持续时间与严重程度。  
Context: 患者因喉咙痛和发烧看诊。

- **A**: 今日はどうされましたか。
- **B**: 月曜日から喉が痛くて、昨夜は熱もありました。
- **A**: 息苦しさはありますか。
- **B**: いいえ。でも、飲み込むと痛いです。
- **A**: わかりました。まず喉を診ますね。
- **B**: わかりました。ありがとうございます。

### hotel-room · travel · Stage 2

Goal: 报告房间问题并完成换房。  
Context: 住客因街道噪声请求换房。

- **A**: すみません、夜になると部屋がとても騒がしいです。
- **B**: 申し訳ありません。外の道路の音ですか。
- **A**: はい。もう少し静かな部屋はありますか。
- **B**: 六階にございますが、シングルベッドが二台の部屋です。
- **A**: それで大丈夫です。今夜移れますか。
- **B**: はい。新しい鍵をご用意します。

### opinion-disagree · chat · Stage 3

Goal: 礼貌表达不同意见并追问理由。  
Context: 朋友对市中心禁车提议看法不同。

- **A**: 市の中心部への車の乗り入れは禁止したほうがいいと思う。
- **B**: 私は少し違う意見かな。通勤に車が必要な人もいるよ。
- **A**: 確かに。でも、公共交通をもっと便利にできると思う。
- **B**: バスの本数が増えたら、禁止に賛成する？
- **A**: 混む時間だけなら賛成するかも。
- **B**: それなら、いい妥協案になりそうだね。

### lost-property · travel · Stage 3

Goal: 描述失物并留下联系方式。  
Context: 旅客在车站寻找遗失的包。

- **A**: 電車にかばんを忘れたかもしれません。
- **B**: どの電車に乗りましたか。
- **A**: 十時十五分発の空港行きです。
- **B**: かばんの色と形を教えてください。
- **A**: 黒い小さなリュックです。中に名前が書いてあります。
- **B**: 見つかったら、こちらの番号にご連絡します。

## Final report

PHASE 3.5E.1B = YES
EN EXPRESSIONS ADDED = 120
JA EXPRESSIONS ADDED = 130
EN DIALOGUES/SCENARIOS ADDED = 32
JA DIALOGUES/SCENARIOS ADDED = 36
AVERAGE EN DIALOGUE TURNS = 6
AVERAGE JA DIALOGUE TURNS = 6
DIALOGUES WITH 4+ TURNS EN = 32
DIALOGUES WITH 4+ TURNS JA = 36
DUPLICATES REJECTED = 7
SEMANTIC/COMMUNICATIVE INVALID REJECTED = 11
QA ERRORS = 0
QA WARNINGS = 0
NEW VOCABULARY ADDED = NO
NEW GRAMMAR ADDED = NO
LESSONS CHANGED = NO
AI DYNAMIC EXAMPLES CHANGED = NO
LEARNER PROGRESS CHANGED = NO
PRODUCTION CHANGED = NO
PHASE 3.5E.1C STARTED = NO
PHASE 4 STARTED = NO
