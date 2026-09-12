# Phase 3.5E.1A — Core Grammar Curated Example Expansion

Generated: 2026-09-10T09:18:38.396Z

## Outcome

Selected 35 English and 40 Japanese core Grammar points by Phase 3.5E P0/P1 priority, progression level, lesson utility and communicative usefulness. Added 210 English and 280 Japanese curated examples to a new isolated local D1 staging data copy. No Dynamic DeepSeek example was copied or counted.

Selection profile: EN Level 1/2/3 = 12/15/8 (25/35 lesson-used; all 35 expression-used); JA Level 1/2/3 = 13/18/9 (22/40 lesson-used; all 40 expression-used). This favors the P0 foundation, then lesson-linked P1 forms and high-utility Level 3 contrasts rather than ID order.

## Coverage before → after

- English: 0=0, 1–2=72, 3–5=1, 6–8=0, 9+=0 → 0=0, 1–2=38, 3–5=0, 6–8=34, 9+=1
- Japanese: 0=0, 1–2=82, 3–5=0, 6–8=0, 9+=0 → 0=0, 1–2=42, 3–5=0, 6–8=40, 9+=0

Every selected English Grammar received 6 new examples; every selected Japanese Grammar received 7. The English 9+ bucket is en-would-like, which had 3 examples before and received 6.

## Rejections and QA

- Normalized duplicate rejected: 0
- Existing-example collision rejected: 0
- Grammar-invalid rejected: 0
- Editorial-review rejected: 0
- QA errors: 0
- QA warnings: 0

Schema, FK, source/database identity, normalized collision, language agreement, additive-only migration policy, Japanese reading, grammar marker and editorial checks passed. Regression: PASS.

## Migration and isolation

- Additive migration: migrations-35e1a/0001_core_grammar_curated_examples.sql
- Clean local staging copy: .wrangler/phase35e1a-release
- Applied and recorded: YES
- Remote staging: not created; current Wrangler OAuth returned Cloudflare API error 10000. No existing remote was reused.
- Production changed: NO

## English samples

### en-simple-present · Simple Present · Level 1

- She walks to work every day. — 她每天步行上班。
- We usually eat dinner at seven. — 我们通常七点吃晚饭。
- My brother does not drink coffee. — 我哥哥不喝咖啡。

### en-there-is · there is / are + noun · Level 1

- There is a pharmacy across the street. — 街对面有一家药房。
- There are two clean cups in the cupboard. — 橱柜里有两个干净的杯子。
- There is not enough milk for breakfast. — 早餐的牛奶不够。

### en-simple-past · Simple Past · Level 2

- We arrived ten minutes early. — 我们提前十分钟到了。
- She did not feel well yesterday. — 她昨天感觉不舒服。
- Did you call the hotel? — 你给酒店打电话了吗？

### en-indirect-question · verb + wh-word + subject + verb · Level 3

- Could you tell me when the shop closes? — 你能告诉我商店几点关门吗？
- Do you know whether this seat is free? — 你知道这个座位是否空着吗？
- I cannot remember where I put the key. — 我想不起把钥匙放在哪里了。

### en-since-for · present perfect + since / for · Level 3

- We have lived here for three years. — 我们在这里住了三年。
- She has not eaten since breakfast. — 她从早餐后一直没吃东西。
- How long have you worked at this school? — 你在这所学校工作多久了？

## Japanese samples

### ja-copula · 〜です · Level 1

- こちらが受付です。（こちらがうけつけです。） — 这里是接待处。
- 今日は休みではありません。（きょうはやすみではありません。） — 今天不是休息日。
- この部屋は静かですか。（このへやはしずかですか。） — 这个房间安静吗？

### ja-i-adjective · い形容词 + です · Level 1

- このかばんは軽いです。（このかばんはかるいです。） — 这个包很轻。
- 今日はあまり寒くないです。（きょうはあまりさむくないです。） — 今天不太冷。
- その部屋は広いですか。（そのへやはひろいですか。） — 那个房间宽敞吗？

### ja-te-kudasai · 〜てください · Level 2

- 荷物はここに置いてください。（にもつはここにおいてください。） — 请把行李放在这里。
- 次の角を右に曲がってください。（つぎのかどをみぎにまがってください。） — 请在下一个路口右转。
- 少しゆっくり話してください。（すこしゆっくりはなしてください。） — 请说慢一点。

### ja-te-iru · 〜ている · Level 3

- 今、駅で電車を待っています。（いま、えきででんしゃをまっています。） — 现在正在车站等电车。
- 姉は東京に住んでいます。（あねはとうきょうにすんでいます。） — 姐姐住在东京。
- 窓が開いています。（まどがあいています。） — 窗户开着。

### ja-nara · 普通形 + なら · Level 3

- 電車で行くなら、この駅で乗り換えてください。（でんしゃでいくなら、このえきでのりかえてください。） — 如果坐电车去，请在这个车站换乘。
- 辛い物が苦手なら、こちらの料理がおすすめです。（からいものがにがてなら、こちらのりょうりがおすすめです。） — 如果不喜欢辣的，推荐这道菜。
- 明日が無理なら、金曜日はどうですか。（あすがむりなら、きんようびはどうですか。） — 如果明天不行，星期五怎么样？

## Final checklist

PHASE 3.5E.1A = YES
CORE EN GRAMMAR EXPANDED = YES
CORE JA GRAMMAR EXPANDED = YES
CURATED EXAMPLES ADDED EN = 210
CURATED EXAMPLES ADDED JA = 280
NEW GRAMMAR ADDED = NO
NEW VOCABULARY ADDED = NO
LESSONS CHANGED = NO
AI DYNAMIC EXAMPLES CHANGED = NO
LEARNER PROGRESS CHANGED = NO
QA ERRORS = 0
PRODUCTION CHANGED = NO
PHASE 3.5E.1B STARTED = NO
PHASE 3.5E.1C STARTED = NO
PHASE 4 STARTED = NO
