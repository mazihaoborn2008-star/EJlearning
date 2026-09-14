# EJ Learning — Curriculum Coverage Audit 01

**Audit date:** 2026-09-14

**Scope:** read-only audit of the current guided curriculum and its published reference libraries
**Audited revision:** `2bf2ef50d65d42d6940390afeb464dcb583d8a94` on `main`

## Executive conclusion

The current English and Japanese Stage 1–6 paths are **light introductory courses**, not yet substantial guided curricula. Each language has 32 lessons and 504 authored minutes (8.4 hours). The guided English course reaches 206 unique assessable items (156 vocabulary + 50 grammar); Japanese reaches 195 (145 + 50). Applying a transparent 2–3× allowance for practice and review gives roughly 16.8–25.2 learner hours per language, with 21 hours as a useful midpoint—not a measurement.

The principal constraint is not the size of the reference library. The published libraries contain 10,000 English and 8,235 Japanese vocabulary items, but only 1.6% and 1.8% respectively enter an active lesson. Grammar and expression coverage are also partial. Every current lesson can satisfy Phase 4E's five-unique-item completion requirement, but 16 supplemental lessons are structurally much thinner than the 48 established lessons. Those 16 contain useful six-turn dialogues, so they are not empty; they simply offer substantially less assessable breadth and mode diversity.

The recommended next move is a **hybrid expansion**: first densify and integrate the 16 sparse Stage 2–4 supplemental lessons, then add approximately 40–60 well-scoped lessons per language. Curriculum choices and canonical examples should be human reviewed; deterministic tooling should validate coverage, links, examples, prerequisites, and exercise safety.

## 1. Safety and evidence basis

At audit start:

- branch: `main`
- `HEAD`: `2bf2ef50d65d42d6940390afeb464dcb583d8a94`
- `origin/main`: `2bf2ef50d65d42d6940390afeb464dcb583d8a94`
- worktree: clean

The audit used the current local Phase 3.5E.2 reference snapshot read-only. That snapshot predates the remote Hotfix 01 activation, so active-current calculations explicitly exclude the archived `en-greeting` and `ja-greeting` records and their five stale bundle links. No curriculum or application code was changed, no D1 write was made, no deployment ran, and no lesson content was generated.

Definitions used throughout:

- **Published:** currently publishable canonical content; archived greeting grammar is excluded.
- **Raw links:** active lesson-to-item links, including repeated use of the same item.
- **Unique:** distinct item IDs in the stated scope.
- **Assessable:** vocabulary plus active grammar. Expressions are learning content but are not authoritative Phase 4E assessed items.
- **Sentence/example unit:** vocabulary example rows, grammar example rows, published sentence/scenario/dialogue records, or dialogue turns, as explicitly labelled. These measures are not added together as though they represented one uniform object.
- **Density flags:** `VERY SPARSE` at 8 or fewer total links, `SPARSE` at 9–11, `NORMAL` at 12 or more. These thresholds reflect the observed two-cohort distribution; they are structural signals, not pedagogical truth.

## 2. Current canonical totals

| Content | English | Japanese | Total | Notes |
|---|---:|---:|---:|---|
| Published vocabulary | 10,000 | 8,235 | 18,235 | Reference library, not guided-course coverage |
| Historical grammar | 83 | 98 | 181 | Includes the two now-archived greeting records |
| **Currently published grammar** | **82** | **97** | **179** | Excludes `en-greeting` and `ja-greeting` |
| Published expressions | 348 | 365 | 713 | Includes sentence, scenario, and dialogue content |
| Active lessons | 32 | 32 | 64 | Six stages per language |
| Published sentence/scenario/dialogue records | — | — | 519 | 191 sentence, 227 scenario, 101 dialogue records |
| Vocabulary example rows | — | — | 1,274 | 435 EN + 450 JA vocabulary items have at least one |
| Grammar example rows | — | — | 751 | Every currently published grammar item has at least one |
| Dialogue turns | — | — | 548 | Dialogue records only |
| Raw active lesson-item links | 426 | 422 | 848 | Five archived greeting links excluded from the raw bundle total of 853 |

The 519 published expression records and their 548 dialogue turns are different units. A dialogue is one expression record containing multiple turns.

## 3. Stage overview

### A. English Stage 1–6

Counts in the three content columns are unique within the stage. Raw link counts are shown separately so repetition remains visible.

| Stage | Lessons | Unique vocab | Unique grammar | Unique expressions | Assessable items | Raw links | Lesson minutes |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 4 | 27 | 7 | 17 | 34 | 59 | 60 |
| 2 | 5 | 30 | 12 | 17 | 42 | 67 | 78 |
| 3 | 9 | 55 | 15 | 21 | 70 | 101 | 150 |
| 4 | 6 | 42 | 13 | 19 | 55 | 77 | 96 |
| 5 | 4 | 29 | 11 | 17 | 40 | 61 | 60 |
| 6 | 4 | 31 | 12 | 17 | 43 | 61 | 60 |

### B. Japanese Stage 1–6

| Stage | Lessons | Unique vocab | Unique grammar | Unique expressions | Assessable items | Raw links | Lesson minutes |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 4 | 27 | 7 | 16 | 34 | 58 | 60 |
| 2 | 6 | 36 | 12 | 18 | 48 | 73 | 96 |
| 3 | 8 | 50 | 17 | 20 | 67 | 92 | 132 |
| 4 | 6 | 39 | 14 | 18 | 53 | 77 | 96 |
| 5 | 4 | 30 | 11 | 17 | 41 | 61 | 60 |
| 6 | 4 | 29 | 12 | 17 | 41 | 61 | 60 |

### Authored and realistic study-time estimate

| Language | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 | Stage 6 | Total authored | Rough total with practice/review |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| English | 60 min | 78 min | 150 min | 96 min | 60 min | 60 min | **504 min / 8.4 h** | **16.8–25.2 h** |
| Japanese | 60 min | 96 min | 132 min | 96 min | 60 min | 60 min | **504 min / 8.4 h** | **16.8–25.2 h** |

The 2–3× range allows for the product's recognition, recall, controlled practice, retry, and review loop. It is a planning assumption, not logged learner-time evidence. At the 2.5× midpoint, either course represents about 21 learner hours.

## 4. Lesson inventory, density, and practice readiness

`V/G/E` means vocabulary/grammar/expression links. `A` is unique assessable vocabulary plus grammar. `CC` is grammar with valid authored controlled-completion support. `Opp.` is the approximate number of safe deterministic mode-item opportunities, calculated as up to three modes per vocabulary item, two per grammar item, and one additional controlled-completion opportunity only where authored metadata supports it. It is a coverage ceiling for distinct item/mode pairings—not a promised question count and not a multiplication of arbitrary templates.

All 64 lessons expose at least five unique assessable items; consequently every lesson's current Phase 4E `required_items` is 5. No lesson is flagged for `required_items < 5`.

### English lessons

| Stage / lesson | Title | Min | V/G/E | Total | A | Required | CC | Opp. | Density |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| S1 `en-s1-l1` | 打招呼并开始简单交谈 | 15 | 8/2/4 | 14 | 10 | 5 | 2 | 30 | NORMAL |
| S1 `en-s1-l2` | 道歉、感谢并自然回应 | 15 | 8/2/4 | 14 | 10 | 5 | 2 | 30 | NORMAL |
| S1 `en-s1-l3` | 说出想吃喝的东西 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S1 `en-s1-l4` | 提出一个简单请求 | 15 | 8/3/5 | 16 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `en-s2-l1` | 约定见面的时间 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `en-s2-l2` | 询问价格并做选择 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `en-s2-l3` | 问路并确认方向 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `en-s2-l4` | 描述日常生活安排 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `en-s2-l5` | 在超市找货并结账 | 18 | 4/2/1 | 7 | 6 | 5 | 1 | 17 | **VERY SPARSE** |
| S3 `en-s3-l1` | 讨论计划与期待 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `en-s3-l2` | 描述今天的身体状态 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `en-s3-l3` | 根据天气调整计划 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `en-s3-l4` | 说明学习或工作任务 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `en-s3-l5` | 退货与换货 | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S3 `en-s3-l6` | 在药房或诊所说明症状 | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S3 `en-s3-l7` | 预约、取消与改期 | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S3 `en-s3-l8` | 处理手机与网络问题 | 18 | 6/2/1 | 9 | 8 | 5 | 2 | 24 | **SPARSE** |
| S3 `en-s3-l9` | 职场任务、排班与反馈 | 18 | 5/2/1 | 8 | 7 | 5 | 0 | 19 | **VERY SPARSE** |
| S4 `en-s4-l1` | 解释感受和原因 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `en-s4-l2` | 在社交中表达界限 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `en-s4-l3` | 在餐厅完成点餐 | 15 | 8/3/5 | 16 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `en-s4-l4` | 分享兴趣与偏好 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `en-s4-l5` | 租房、报修与房东沟通 | 18 | 5/2/1 | 8 | 7 | 5 | 0 | 19 | **VERY SPARSE** |
| S4 `en-s4-l6` | 入住酒店并处理住宿问题 | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S5 `en-s5-l1` | 在限制下评估工作方案 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S5 `en-s5-l2` | 处理行程变化 | 15 | 8/3/5 | 16 | 11 | 5 | 3 | 33 | NORMAL |
| S5 `en-s5-l3` | 清楚说明问题并寻求解决 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S5 `en-s5-l4` | 讨论选择与未来安排 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `en-s6-l1` | 陈述观点并用依据支持 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `en-s6-l2` | 澄清语气并讨论假设 | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `en-s6-l3` | 发出邀请并照顾对方选择 | 15 | 8/2/5 | 15 | 10 | 5 | 2 | 30 | NORMAL |
| S6 `en-s6-l4` | 回顾经历并展望目标 | 15 | 8/4/4 | 16 | 12 | 5 | 3 | 35 | NORMAL |

### Japanese lessons

| Stage / lesson | Title | Min | V/G/E | Total | A | Required | CC | Opp. | Density |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| S1 `ja-s1-l1` | 基本のあいさつを交わす | 15 | 8/2/4 | 14 | 10 | 5 | 2 | 30 | NORMAL |
| S1 `ja-s1-l2` | お礼・謝罪・誘いに応じる | 15 | 8/2/4 | 14 | 10 | 5 | 2 | 30 | NORMAL |
| S1 `ja-s1-l3` | 食べたい物を伝える | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S1 `ja-s1-l4` | 短いお願いをする | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `ja-s2-l1` | 助詞を使って行き先を伝える | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `ja-s2-l2` | 家の中で頼み事を伝える | 15 | 6/3/4 | 13 | 9 | 5 | 3 | 27 | NORMAL |
| S2 `ja-s2-l3` | 時間を聞いて約束する | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `ja-s2-l4` | 数と量を確認して買う | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S2 `ja-s2-l5` | スーパーで商品を探して会計する | 18 | 4/2/1 | 7 | 6 | 5 | 2 | 18 | **VERY SPARSE** |
| S2 `ja-s2-l6` | 店で注文し、希望を伝える | 18 | 5/2/1 | 8 | 7 | 5 | 2 | 21 | **VERY SPARSE** |
| S3 `ja-s3-l1` | 誤解を解き、言い方を整える | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `ja-s3-l2` | 経験とこれからの予定を話す | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `ja-s3-l3` | てくださいで具体的に頼む | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `ja-s3-l4` | 体調と症状を説明する | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S3 `ja-s3-l5` | 返品・交換を相談する | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S3 `ja-s3-l6` | 薬局・病院で症状を説明する | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S3 `ja-s3-l7` | スマホ・通信の問題を伝える | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S3 `ja-s3-l8` | 職場で報告・連絡・相談する | 18 | 5/2/1 | 8 | 7 | 5 | 0 | 19 | **VERY SPARSE** |
| S4 `ja-s4-l1` | 理由を添えて予定を変える | 15 | 8/4/4 | 16 | 12 | 5 | 3 | 35 | NORMAL |
| S4 `ja-s4-l2` | 予定と予想のずれを説明する | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `ja-s4-l3` | 距離感に配慮して境界を伝える | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `ja-s4-l4` | 好みを比べて会話を続ける | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S4 `ja-s4-l5` | 賃貸・修理について相談する | 18 | 5/2/1 | 8 | 7 | 5 | 0 | 19 | **VERY SPARSE** |
| S4 `ja-s4-l6` | 宿泊手続きと部屋の問題に対応する | 18 | 5/2/1 | 8 | 7 | 5 | 1 | 20 | **VERY SPARSE** |
| S5 `ja-s5-l1` | 改まった形で判断を述べる | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S5 `ja-s5-l2` | 遠回しに配慮して依頼する | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S5 `ja-s5-l3` | 条件を示して変更を相談する | 15 | 8/3/5 | 16 | 11 | 5 | 3 | 33 | NORMAL |
| S5 `ja-s5-l4` | 気持ちの度合いと背景を話す | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `ja-s6-l1` | 根拠を整理して説明する | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `ja-s6-l2` | 確認しながら控えめに意見を述べる | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `ja-s6-l3` | 経験を振り返り判断を伝える | 15 | 8/3/4 | 15 | 11 | 5 | 3 | 33 | NORMAL |
| S6 `ja-s6-l4` | 誘いに応じ、予定変更を伝える | 15 | 8/3/5 | 16 | 11 | 5 | 3 | 33 | NORMAL |

### D. Density flags and practice-diversity risk

| Stage / lesson | Reason |
|---|---|
| EN S2 `en-s2-l5` | 7 links, 6 assessable items, 17 opportunities; very sparse |
| EN S3 `en-s3-l5` | 8 links, 7 assessable, 20 opportunities; very sparse |
| EN S3 `en-s3-l6` | 8 links, 7 assessable, 20 opportunities; very sparse |
| EN S3 `en-s3-l7` | 8 links, 7 assessable, 20 opportunities; very sparse |
| EN S3 `en-s3-l8` | 9 links, 8 assessable, 24 opportunities; sparse |
| EN S3 `en-s3-l9` | 8 links, 7 assessable, 19 opportunities; no controlled-completion support |
| EN S4 `en-s4-l5` | 8 links, 7 assessable, 19 opportunities; no controlled-completion support |
| EN S4 `en-s4-l6` | 8 links, 7 assessable, 20 opportunities; very sparse |
| JA S2 `ja-s2-l5` | 7 links, 6 assessable, 18 opportunities; very sparse |
| JA S2 `ja-s2-l6` | 8 links, 7 assessable, 21 opportunities; very sparse |
| JA S3 `ja-s3-l5` | 8 links, 7 assessable, 20 opportunities; very sparse |
| JA S3 `ja-s3-l6` | 8 links, 7 assessable, 20 opportunities; very sparse |
| JA S3 `ja-s3-l7` | 8 links, 7 assessable, 20 opportunities; very sparse |
| JA S3 `ja-s3-l8` | 8 links, 7 assessable, 19 opportunities; no controlled-completion support |
| JA S4 `ja-s4-l5` | 8 links, 7 assessable, 19 opportunities; no controlled-completion support |
| JA S4 `ja-s4-l6` | 8 links, 7 assessable, 20 opportunities; very sparse |

Distribution: 48 `NORMAL`, 15 `VERY SPARSE`, and 1 `SPARSE`. Every flagged supplemental lesson has one authored six-turn dialogue, so the flag describes link and assessment density rather than absence of practical context. English lessons range from 6 to 12 assessable items (average 9.9) and approximately 17–35 opportunities (average 29.5); Japanese ranges from 6 to 12 (average 9.9) and 18–35 (average 29.3). The four zero-CC lessons are the clearest practice-diversity weakness.

## 5. Repetition and reinforcement

### Repetition within stages

| Language | Stage | Unique V/G/E combined | Raw links | Repeated links | Repetition |
|---|---:|---:|---:|---:|---:|
| EN | 1 | 51 | 59 | 8 | 13.6% |
| EN | 2 | 59 | 67 | 8 | 11.9% |
| EN | 3 | 91 | 101 | 10 | 9.9% |
| EN | 4 | 74 | 77 | 3 | 3.9% |
| EN | 5 | 57 | 61 | 4 | 6.6% |
| EN | 6 | 60 | 61 | 1 | 1.6% |
| JA | 1 | 50 | 58 | 8 | 13.8% |
| JA | 2 | 66 | 73 | 7 | 9.6% |
| JA | 3 | 87 | 92 | 5 | 5.4% |
| JA | 4 | 71 | 77 | 6 | 7.8% |
| JA | 5 | 58 | 61 | 3 | 4.9% |
| JA | 6 | 58 | 61 | 3 | 4.9% |

Across the whole path, English has 426 raw links to 310 unique content IDs (27.2% repeated-link share); Japanese has 422 to 294 (30.3%). By type:

| Language | Type | Raw | Unique | Repeated links | Repeat share | IDs used in 2+ lessons | IDs used in 3+ lessons |
|---|---|---:|---:|---:|---:|---:|---:|
| EN | Vocabulary | 232 | 156 | 76 | 32.8% | 45 | 16 |
| EN | Grammar | 86 | 50 | 36 | 41.9% | 18 | 6 |
| EN | Expressions | 108 | 104 | 4 | 3.7% | 4 | 0 |
| JA | Vocabulary | 229 | 145 | 84 | 36.7% | 48 | 21 |
| JA | Grammar | 87 | 50 | 37 | 42.5% | 23 | 8 |
| JA | Expressions | 106 | 99 | 7 | 6.6% | 7 | 0 |

Most-reused English vocabulary includes `go` (8 lessons), `do` (7), `need` (6), and `leave`, `tomorrow`, and `yet` (4 each). English grammar leaders are `be adjective` (9), `simple present` (6), `present continuous` (5), and `first conditional` (4). Japanese vocabulary leaders include `行く` and `予定` (6), `まだ` (5), and several four-use items. Japanese grammar leaders include `copula` (6), `polite-present` (5), and `te-iru` (4).

These high-frequency foundations are plausible intentional reinforcement, and repetition is not inherently a defect. However, the current link model does not explicitly label **new**, **review**, or **support** roles, and many highly reused items remain marked required. With 32 English and 47 Japanese published grammar items unused, some concentration may represent over-use rather than a deliberate spaced syllabus. Conversely, expressions almost never recur, which provides little evidence of authored expression reinforcement.

## 6. Reference library versus guided course

### C. Library coverage

| Language | Content type | Published | Lesson-linked unique | Unlinked | Coverage |
|---|---|---:|---:|---:|---:|
| English | Vocabulary | 10,000 | 156 | 9,844 | **1.6%** |
| English | Grammar | 82 | 50 | 32 | **61.0%** |
| English | Expressions | 348 | 104 | 244 | **29.9%** |
| Japanese | Vocabulary | 8,235 | 145 | 8,090 | **1.8%** |
| Japanese | Grammar | 97 | 50 | 47 | **51.5%** |
| Japanese | Expressions | 365 | 99 | 266 | **27.1%** |

The true unique guided-course footprint is 310 content records for English (206 assessable) and 294 for Japanese (195 assessable). The 10,000/8,235 vocabulary totals describe reference and self-study capacity; they must not be presented as lesson-taught vocabulary.

## 7. Authored level metadata: availability versus lesson use

The project stores an internal 1–6 stage/level for vocabulary and grammar and a 1–6 difficulty for expressions. The `used` column below means unique course-linked items carrying that metadata value anywhere in the course; it does not imply that they are used in the correspondingly numbered course stage.

### English metadata levels

| Level | Vocab available / used | Grammar available / used | Expressions available / used |
|---:|---:|---:|---:|
| 1 | 1,153 / 36 | 13 / 9 | 56 / 13 |
| 2 | 1,619 / 55 | 19 / 15 | 129 / 30 |
| 3 | 2,117 / 44 | 24 / 12 | 105 / 30 |
| 4 | 2,057 / 20 | 14 / 8 | 49 / 23 |
| 5 | 1,522 / 1 | 7 / 3 | 5 / 4 |
| 6 | 1,532 / 0 | 5 / 3 | 4 / 4 |

### Japanese metadata levels

| Level | Vocab available / used | Grammar available / used | Expressions available / used |
|---:|---:|---:|---:|
| 1 | 671 / 35 | 14 / 5 | 43 / 11 |
| 2 | 716 / 54 | 23 / 13 | 132 / 24 |
| 3 | 1,738 / 41 | 32 / 14 | 127 / 30 |
| 4 | 1,833 / 13 | 16 / 10 | 52 / 25 |
| 5 | 3,256 / 2 | 7 / 4 | 8 / 6 |
| 6 | 21 / 0 | 5 / 4 | 3 / 3 |

The library does not collapse at late vocabulary levels: English has 1,522 level-5 and 1,532 level-6 vocabulary records, while Japanese has 3,256 level-5 records. The guided paths barely use them. Japanese level 6 has only 21 authored vocabulary records, but none enters lessons; this is both an availability and selection constraint.

## 8. Vocabulary coverage quality

Raw and unique vocabulary by stage are:

| Language | Stage | Unique / raw | Lessons | Unique per lesson | Unique per authored hour |
|---|---:|---:|---:|---:|---:|
| EN | 1 | 27 / 32 | 4 | 6.8 | 27.0 |
| EN | 2 | 30 / 36 | 5 | 6.0 | 23.1 |
| EN | 3 | 55 / 58 | 9 | 6.1 | 22.0 |
| EN | 4 | 42 / 42 | 6 | 7.0 | 26.3 |
| EN | 5 | 29 / 32 | 4 | 7.3 | 29.0 |
| EN | 6 | 31 / 32 | 4 | 7.8 | 31.0 |
| JA | 1 | 27 / 32 | 4 | 6.8 | 27.0 |
| JA | 2 | 36 / 39 | 6 | 6.0 | 22.5 |
| JA | 3 | 50 / 52 | 8 | 6.3 | 22.7 |
| JA | 4 | 39 / 42 | 6 | 6.5 | 24.4 |
| JA | 5 | 30 / 32 | 4 | 7.5 | 30.0 |
| JA | 6 | 29 / 32 | 4 | 7.3 | 29.0 |

There is no severe English/Japanese imbalance in per-lesson density. The major imbalance is between the guided footprint and the library, and between late course stage labels and the vocabulary metadata actually chosen. The apparent rise in vocabulary per authored hour at Stages 5–6 occurs because those stages shrink to four 15-minute lessons, not because they deliver a broad advanced syllabus.

Average authored metadata level of vocabulary used in each course stage:

| Language | S1 | S2 | S3 | S4 | S5 | S6 |
|---|---:|---:|---:|---:|---:|---:|
| EN | 1.22 | 1.70 | 2.38 | 2.48 | 2.55 | 2.42 |
| JA | 1.37 | 1.64 | 2.38 | 2.28 | 2.47 | 2.72 |

Only one English and two Japanese lesson-linked vocabulary items are authored at internal level 5; none is authored at level 6. This is a data-supported late-stage alignment gap.

## 9. Grammar coverage quality

Stage grammar coverage is shown in the main stage tables: English ranges from 7–15 unique grammar records per stage and Japanese from 7–17. No stage is grammar-empty, but Stage 1 is light and later stages remain small relative to an advanced-course claim. Average grammar metadata does rise overall:

| Language | S1 | S2 | S3 | S4 | S5 | S6 |
|---|---:|---:|---:|---:|---:|---:|
| EN | 1.57 | 1.50 | 2.20 | 2.62 | 3.18 | 3.67 |
| JA | 1.43 | 1.83 | 2.88 | 3.21 | 3.27 | 3.92 |

That supports increasing complexity, but even course Stage 6 averages below internal grammar level 4. The stage number therefore must not be interpreted as mastery of all library grammar at that level.

**Data-supported unlinked grammar:** 32 English and 47 Japanese published grammar records never enter an active lesson. Foundational-looking level-1 authored IDs among them are:

- English: `35e1c-en-article-system`, `35e1c-en-negation-short-answers`, `en-possessive`, `en-there-is`.
- Japanese: `35e1c-ja-kara-made-range`, `35e1c-ja-movement-particles`, `ja-de-place`, `ja-i-adjective`, `ja-ni-time`, `ja-no-possession`, `ja-plain-nonpast`, `ja-wa-topic`, `ja-wo-object`.

These are candidates for a human syllabus review because their own authored metadata marks them as level 1 while they remain unlinked. Calling each one a mandatory omission would be a **possible pedagogical gap**, not a proven defect: the data does not encode a complete required syllabus or dependency rationale. Archived `en-greeting` and `ja-greeting` are intentionally excluded and are not grammar gaps; social formula content appropriately belongs in expressions.

## 10. Expression coverage quality

Unique expressions by stage remain in a narrow range—17–21 English and 16–20 Japanese—because the normal lessons use four or five each and the 16 supplemental lessons use only one each. Across the complete paths, 104/348 English expressions and 99/365 Japanese expressions are used. Only four English and seven Japanese expression IDs recur; none appears in three or more lessons. This supports broad sampling, but not much deliberate spaced reinforcement.

Each published expression has authored target-language text and can function as its own example. A stricter contextualization test—having authored context, scenario, or dialogue—finds:

| Scope | English | Japanese |
|---|---:|---:|
| Full expression library contextualized | 198 / 348 (56.9%) | 206 / 365 (56.4%) |
| Lesson-linked expressions contextualized | 55 / 104 (52.9%) | 51 / 99 (51.5%) |

The sparse lessons do contain a dialogue record with six turns, so their practical scenario content is meaningful. Their weakness is that one linked expression cannot offer the same breadth or revisitation as four or five expression records.

Average expression difficulty rises to Stage 5 but is not perfectly monotonic:

| Language | S1 | S2 | S3 | S4 | S5 | S6 |
|---|---:|---:|---:|---:|---:|---:|
| EN | 1.29 | 1.94 | 3.00 | 3.42 | 4.00 | 3.53 |
| JA | 1.38 | 2.00 | 2.95 | 3.67 | 3.94 | 3.94 |

The English Stage 5→6 decline is a progression anomaly worth reviewing.

## 11. Authored example coverage

The definition differs by content type because the schema differs. Vocabulary requires a separate example row; grammar requires a grammar example row; an expression's authored target-language record is counted as its base example, with contextualization separately reported above.

| Language / type | Full library with example | Without | Coverage | Lesson-linked with example | Without | Coverage |
|---|---:|---:|---:|---:|---:|---:|
| EN vocabulary | 435 / 10,000 | 9,565 | 4.3% | 156 / 156 | 0 | **100%** |
| JA vocabulary | 450 / 8,235 | 7,785 | 5.5% | 145 / 145 | 0 | **100%** |
| EN grammar | 82 / 82 | 0 | 100% | 50 / 50 | 0 | **100%** |
| JA grammar | 97 / 97 | 0 | 100% | 50 / 50 | 0 | **100%** |
| EN expressions (base text) | 348 / 348 | 0 | 100% | 104 / 104 | 0 | **100%** |
| JA expressions (base text) | 365 / 365 | 0 | 100% | 99 / 99 | 0 | **100%** |

Current lesson-linked content is example-ready. The large example deficit lies in reference vocabulary not yet selected for lessons. Any expansion that draws from those 17,350 currently unexampled vocabulary records must budget human-reviewed examples rather than assuming the library is instruction-ready.

## 12. Japanese JLPT findings

The project does **not** contain a reviewed, comprehensive JLPT alignment for grammar or expressions. Ten draft grammar and ten draft expression alignment rows exist, but draft model/editorial output is not reliable enough to report as canonical coverage. The official JLPT also does not publish a complete canonical vocabulary list, so stored vocabulary ranks should be described as community estimates.

All 145 lesson-linked Japanese vocabulary records have an estimated JLPT band:

| Estimated band | Published vocabulary | Lesson-linked | Library coverage |
|---|---:|---:|---:|
| N5 | 680 | 37 | 5.4% |
| N4 | 675 | 33 | 4.9% |
| N3 | 1,749 | 49 | 2.8% |
| N2 | 1,833 | 18 | 1.0% |
| N1 | 3,298 | 8 | 0.2% |

Stage distribution of linked vocabulary estimates:

| Course stage | N5 | N4 | N3 | N2 | N1 |
|---:|---:|---:|---:|---:|---:|
| 1 | 18 | 4 | 3 | 2 | 0 |
| 2 | 14 | 11 | 7 | 2 | 2 |
| 3 | 9 | 10 | 24 | 6 | 1 |
| 4 | 13 | 7 | 14 | 3 | 2 |
| 5 | 7 | 9 | 7 | 4 | 3 |
| 6 | 6 | 6 | 10 | 6 | 1 |

The mix is not monotonic: N1/N2 estimates appear early, N5/N4 persist late, and Stage 4 falls back relative to Stage 3. Without reviewed grammar/expression alignment and explicit stage targets, the current Japanese course cannot be claimed as a coherent N5→N1 or other JLPT progression.

## 13. English CEFR and other level findings

No reliable authored CEFR A1–C2 framework or comprehensive CEFR alignment exists in the audited data. Internal level 1–6 values are not CEFR and must not be renamed A1–C2. The only defensible level coverage is the internal metadata table in section 7.

IELTS vocabulary course ranks use cumulative estimated pools (3,000/4,000/5,500/7,000/10,000 for 5.0/5.5/6.0/6.5/7.0+), not official CEFR mapping. Per-item IELTS rows store rank but no populated `estimated_target`. Only 20 reviewed curriculum-editorial vocabulary alignments exist and there is no reviewed comprehensive grammar or expression alignment. The current course therefore cannot support a full IELTS or CEFR progression claim.

## 14. Progression continuity

The main anomalies are:

1. **Late-stage path length contracts.** Stage 3 is the largest stage (150 minutes EN, 132 JA), while Stages 5 and 6 contain only four lessons/60 minutes each. A learner can reach a high stage label without a correspondingly broad late-stage syllabus.
2. **Vocabulary metadata does not advance with stage labels.** English vocabulary averages peak at 2.55 in Stage 5 then fall to 2.42; Japanese reaches only 2.72 in Stage 6. Level-5/6 library vocabulary is almost entirely absent.
3. **Grammar complexity rises, but modestly.** Stage 6 averages 3.67 EN and 3.92 JA on the internal six-level scale.
4. **English expression difficulty falls from 4.00 to 3.53 at Stage 6.** Japanese holds at 3.94.
5. **Stage 2–4 mix two authoring cohorts.** Forty-eight lessons have roughly 13–16 links; 16 supplemental scenario lessons have 7–9 links. This creates abrupt within-stage density changes even where duration increases from 15 to 18 minutes.

These are data-supported continuity issues. They do not prove that individual lesson topics are ordered incorrectly.

## 15. Prerequisite findings

The active bundle contains 62 prerequisite edges for 64 lessons, with one root per language (`en-s1-l1`, `ja-s1-l1`). There are no missing references, cross-language dependencies, impossible targets, or cycles. Both language graphs are connected.

Fifty-six of 62 edges (90.3%) simply point to the immediately preceding lesson in the sorted current path. Six stage-transition edges bypass supplemental branches:

- `en-s3-l1` depends on `en-s2-l4`, bypassing `en-s2-l5`.
- `en-s4-l1` depends on `en-s3-l4`, bypassing `en-s3-l5`–`en-s3-l9`.
- `en-s5-l1` depends on `en-s4-l4`, bypassing `en-s4-l5`–`en-s4-l6`.
- `ja-s3-l1` depends on `ja-s2-l4`, bypassing `ja-s2-l5`–`ja-s2-l6`.
- `ja-s4-l1` depends on `ja-s3-l4`, bypassing `ja-s3-l5`–`ja-s3-l8`.
- `ja-s5-l1` depends on `ja-s4-l4`, bypassing `ja-s4-l5`–`ja-s4-l6`.

The supplemental lessons form their own chains and are reachable, but the next main stage does not require completion of them. Recommendation ordering may still surface them; prerequisite metadata itself does not enforce continuity. This is a P2 ambiguity to resolve during densification.

Because edges contain no authored dependency rationale and 90.3% mirror linear order, the current graph mainly expresses sequencing rather than auditable pedagogical dependency. Product endpoints should not be described as hard curricular locks without separate enforcement evidence.

## 16. Are the current stages deep enough?

### English

**Conclusion: light introductory course.** The course has useful topical breadth, complete example support for linked items, and safe practice in every lesson. It is deeper than a bare prototype. It is not a moderate or substantial Stage 1–6 curriculum: 32 lessons, 8.4 authored hours, 206 unique assessable items, and library coverage of 1.6% vocabulary, 61.0% grammar, and 29.9% expressions are too small for that claim. Stage 5/6 vocabulary also remains mostly at internal levels 1–3.

### Japanese

**Conclusion: light introductory course.** As in English, every lesson is practice-completable and scenario content is useful. However, 32 lessons, 8.4 authored hours, 195 unique assessable items, and coverage of 1.8% vocabulary, 51.5% grammar, and 27.1% expressions do not constitute a substantial path. The non-monotonic community JLPT vocabulary mix and absent reviewed grammar/expression JLPT mapping mean it is not currently a coherent JLPT course.

The user's concern is therefore valid. The stages are functional and teachable, but their labels and large reference libraries visually promise more depth than the guided paths presently deliver.

## 17. Ranked curriculum/product gaps

### P1

1. **Overall guided depth is small:** 8.4 authored hours and only 206 EN / 195 JA unique assessable items across six stages.
2. **Sixteen supplemental lessons are structurally under-dense:** 7–9 links versus the established 13–16, with four lessons lacking controlled-completion support. They have strong dialogues, so the remedy is to add curated instructional breadth around the scenarios.
3. **Progression and external alignment are insufficient:** late course stages use almost no internal level-5/6 vocabulary; CEFR is absent; JLPT grammar/expression alignment is not reviewed or comprehensive.

### P2

1. **Published grammar is unevenly integrated:** 32 EN and 47 JA grammar records are unlinked, including authored level-1 candidates, while a small foundation set repeats heavily.
2. **Prerequisite branches are ambiguous:** stage transitions permit supplemental Stage 2–4 chains to be bypassed.
3. **Expression reinforcement and context are limited:** expression reuse is 3.7% EN / 6.6% JA by repeated-link share, and only about 53% of linked expressions have separate context/scenario/dialogue fields.

### P3

1. **Reference vocabulary is not expansion-ready at scale:** only 4.3% EN and 5.5% JA have authored examples, although current linked vocabulary is fully covered.
2. **Grammar semantic-field duplication is editorial debt:** many records repeat the same text across fields intended to explain different teaching dimensions.
3. **Stale Phase 3.5E.1C test assertions assume the former 435/450 vocabulary dataset shape and can create false failures during expansion work.

## 18. Recommended target lesson density

For future 15–20 minute lessons, use these as review ranges rather than automatic pass/fail rules:

| Dimension | Recommended target |
|---|---:|
| New vocabulary | 6–8 |
| Explicit review vocabulary | 2–4 |
| Total vocabulary links | 8–12 |
| Grammar | 2–3: usually 1–2 focus plus 0–1 support/review |
| Expressions | 3–5, including contextual/scenario use and reusable standalone language |
| Total links | 13–20 |
| Unique assessable items | 10–15 |
| Phase 4E completion requirement | 5 unique assessed items |
| Approximate safe deterministic opportunities | 25–40 item/mode pairings |
| Authored examples for newly introduced vocabulary | At least 2 per item |
| Authored examples for newly introduced grammar | About 4–6 per item, including controlled use where suitable |
| Duration | 15–20 minutes authored lesson time |

The key schema improvement is an explicit `new` / `review` / `support` instructional role. `required` versus `support` is not enough to infer a spaced syllabus. Ranges allow dialogue-heavy lessons to trade some item breadth for deeper interaction without becoming content dumps.

## 19. Expansion workload estimate

### First: normalize the 16 sparse lessons

Bringing those lessons to the established 8 vocabulary / 3 grammar / 4 expression pattern requires approximately:

| Language | Additional vocab links | Additional grammar links | Additional expression links | Total links |
|---|---:|---:|---:|---:|
| English (8 lessons) | 24 | 8 | 24 | 56 |
| Japanese (8 lessons) | 25 | 8 | 24 | 57 |
| **Total** | **49** | **16** | **48** | **113** |

This improves consistency but leaves each path at only 8.4 authored hours.

### Then: build a substantial guided path

A planning target of roughly 20–25 authored lesson hours per language would correspond to about 40–75 learner hours at the same 2–3× practice/review assumption. At an average of 17 minutes, this means approximately **40–60 additional lessons per language** after the current 32.

Including sparse-lesson normalization, a broad workload envelope per language is:

| Language | Additional vocab links | Additional grammar links | Additional expression links | Additional lessons |
|---|---:|---:|---:|---:|
| English | about 344–744 | about 88–188 | about 144–324 | about 40–60 |
| Japanese | about 345–745 | about 88–188 | about 144–324 | about 40–60 |

Those are links, not necessarily new canonical records. With 6–8 newly introduced vocabulary items per added lesson, a reasonable unique-introduction envelope is approximately **240–480 vocabulary items per language**, with remaining links used for explicit review. Integrate existing unlinked grammar first where the human syllabus approves it—up to 32 EN and 47 JA records—before proposing new canonical grammar.

If selected vocabulary currently lacks examples, 240–480 new introductions imply at least **480–960 human-reviewed vocabulary example sentences per language** at the proposed minimum. Plan roughly **80–240 new or newly contextualized expression records per language**, depending on reuse, plus lesson-specific controlled-completion/context work for grammar. These estimates are budgeting aids, not production quotas.

## 20. Expand existing lessons or add lessons?

**Recommendation: C, hybrid.**

- Densifying all 64 existing lessons alone would turn otherwise well-sized 15-minute lessons into content dumps and would not add enough study time.
- Adding lessons alone would leave the glaring 7–9-link supplemental cohort inconsistent with adjacent lessons.
- First densify the 16 sparse supplemental lessons to the current normal range and make their prerequisite role explicit. Then add 40–60 short, focused lessons per language to provide real progression, spaced reinforcement, and late-stage depth.

## 21. Content authoring and validation strategy

Use a human-owned syllabus matrix with, at minimum: stage objective, lesson communicative outcome, new/review/support role for every link, target internal level, prerequisite rationale, exercise modes, example ownership, and external-framework evidence where applicable.

Recommended workflow:

1. A curriculum editor defines stage outcomes and approves item selection from existing canonical libraries.
2. A language specialist reviews forms, meanings, distractors, examples, register, and cultural/context suitability.
3. AI may draft candidate examples, distractors, or dialogue variants in a sandbox, but a human must choose and approve canonical answers and examples.
4. Deterministic validation checks IDs, publication status, duplicate links, density ranges, `new/review/support` balance, example presence, Phase 4E mode safety, five-item completion readiness, graph connectivity/cycles, and alignment provenance.
5. Only reviewed content is promoted through staging and then production under the existing data-safety process.

Do not bulk-generate directly into production curriculum.

## 22. Editorial quality implications

Hotfix 01 correctly archived greeting concepts that were expression-like rather than grammar. It also exposed broader editorial-depth debt. Among 179 current active grammar records:

- 132 have identical `title_zh`, `core_zh`, and `purpose_zh` text.
- 130 have identical `when_zh`, `mistakes_zh`, and `nuance_zh` text.

This duplication does not make the records unusable, but it weakens explanation depth. When a grammar record is selected for a new or expanded lesson, improve it through human review at the same time: distinguish core feeling, communicative purpose, when to use it, common mistakes, nuance/register, and varied examples. Apply this incrementally to syllabus-selected records, not as an unreviewed bulk rewrite.

## 23. Test debt recommendation

Two known Phase 3.5E.1C remote assertions assume the older 435/450-word dataset and arbitrary first-row example behavior. Repair them **before curriculum expansion** so legitimate library/example growth cannot produce misleading failures. Scope assertions to an explicit fixture or dataset version and test current Phase 3.6 invariants deterministically. This audit does not modify those tests.

## 24. Single recommended next curriculum task

**Curriculum Expansion 01 — human-reviewed densification and prerequisite integration for the 16 sparse Stage 2–4 supplemental lessons.**

Approve a bilingual lesson matrix with explicit new/review/support roles; target roughly 8 vocabulary, 3 grammar, and 4 expressions per lesson; add approximately 49 vocabulary, 16 grammar, and 48 expression links across both languages using existing canonical items first; add controlled-completion support where editorially valid; and resolve whether the supplemental chains are optional or required before stage advancement. Gate the work with deterministic coverage, publication, example, practice-readiness, and prerequisite validation. Repair the stale Phase 3.5E.1C assertions as a technical prerequisite, but keep that repair separate from curriculum authoring.

No curriculum expansion should begin until that matrix is human approved.
