# EJ Learning — Stage 5 Expansion 02A Approval Matrix

Status: **READY FOR HUMAN APPROVAL; NOT AUTHORIZED FOR IMPLEMENTATION**

Evidence baseline: `main` at `d9075c38799101d65b6d144368d9584967e4ab5b`

Scope: Stage 5 only; English and Japanese; planning document only

Target: 8 lessons / 120 authored minutes per language; 16 lessons / 240 minutes total

## 1. Decision and authority boundary

This document converts the approved Stage 5 direction into a relationship-level human-approval matrix. It selects only existing published canonical vocabulary, grammar, and expression records. It does **not** create lessons, canonical records, relationship rows, prerequisite edges, migrations, learner-state changes, D1 writes, deployments, branches, or Stage 6 content.

The matrix contains exactly **240 proposed final relationships**: 128 vocabulary, 48 grammar, and 64 expression links. Their editorial states are **155 `APPROVE`**, **80 `REVIEW REQUIRED`**, and **5 `BLOCKED`**. No `DO NOT ADD` decision is silently counted in the final set. A separate disposition table records 19 current relationships that should not carry forward.

`APPROVE` means the relationship is suitable for human approval; it is not implementation authorization. All examples, contexts, titles, dialogue outlines, IDs, counts, and corrections drafted here remain **DRAFT — HUMAN APPROVAL REQUIRED**.

## 2. Evidence and method

The audit read the current Expansion 01 bundle through `loadExpansion()` in `scripts/curriculum-expansion-01.js`, the current Hotfix 02 grammar filters in `src/content-quality-02.js`, and the canonical SQLite database read-only:

`/.wrangler/phase35e2-release-final-2/v3/d1/miniflare-D1DatabaseObject/9d42ecbc065126e2e4a8ec79c247589e9635ba86277b833107d380e5a588cc70.sqlite`

The two overview records `35e1c-ja-workplace-register` and `35e1c-ja-condition-contrast` were not used as selection, recall, or controlled-completion authority. Internal level and expression-difficulty metadata are project fields, not CEFR or JLPT claims.

Notation used below:

- Roles: `N` = `NEW`, `R` = `REVIEW`, `S` = `SUPPORT`.
- Link status: `A` = `APPROVE`, `RR` = `REVIEW REQUIRED`, `B` = `BLOCKED`, `DNA` = `DO NOT ADD`.
- `exN` is the current canonical example count. Expression context counts treat a scenario or dialogue as contextualized even when `context_zh` itself is empty.

## 3. Current Stage 5 audit

### English current lessons

| Lesson | Objective and overlap finding | Current V/G/E; assessable; opportunities; CC | Levels / difficulty | Current examples and context | Prerequisite | Disposition |
|---|---|---|---|---|---|---|
| `en-s5-l1` | 能结合时间、证据和条件说明可行方案。 Sound plan-evaluation nucleus; partially overlaps `en-s6-l1`, but is narrower and should precede argument synthesis. | 8/3/4; 11; 33; 3/3 grammar CC | V L1×2,L2×2,L3×1,L4×3; G L3×1,L5×2; E D4×1,D5×3 | V ex: 3,3,2,1,1,1,2,3; G ex: 1,7,1; contextual E 1/4 | `en-s4-l6` | KEEP + explicit roles; no structural refocus |
| `en-s5-l2` | 能解释延误或变更并协商替代安排。 Repeats basic route/change material from Stage 2; retain travel core but refocus on uncertainty, alternatives, and contingencies. | 8/3/5; 11; 33; 3/3 CC | V L1×1,L2×4,L3×1,L4×2; G L2×2,L4×1; E D3×3,D4×2 | V ex: 1,3,3,1,3,1,3,3; G ex: 1,7,7; contextual E 2/5 | `en-s5-l1` | REFOCUS; final 8/3/4 |
| `en-s5-l3` | 能提供足够背景并提出有针对性的请求。 Overlaps earlier help/request lessons; preserve the core but raise the demand to bounded service/workplace escalation. | 8/3/4; 11; 33; 3/3 CC | V L1×3,L2×3,L4×2; G L2×1,L3×1,L4×1; E D3×1,D4×3 | V ex: 3,3,1,3,3,1,3,3; G ex: 7,1,1; contextual E 2/4 | `en-s5-l2` | KEEP + replace one generic request with advanced boundary review |
| `en-s5-l4` | 能比较方案、表达条件并说明打算。 Substantial overlap with `en-s3-l1` and `en-s6-l4`; refocus on using past outcomes to make a current decision. | 8/3/4; 11; 33; 3/3 CC | V L1×2,L2×2,L3×2,L4×2; G L1×1,L2×1,L4×1; E D4×3,D5×1 | V ex: 3,3,2,3,2,1,1,2; G ex: 7,7,1; contextual E 2/4 | `en-s5-l3` | REFOCUS; remove basic duplication |

### Japanese current lessons

| Lesson | Objective and overlap finding | Current V/G/E; assessable; opportunities; CC | Levels / difficulty | Current examples and context | Prerequisite | Disposition |
|---|---|---|---|---|---|---|
| `ja-s5-l1` | 能用较正式结构说明可能性、限制和一般判断。 Sound formal-judgment nucleus; distinguish it from `ja-s6-l1` by keeping Stage 5 on bounded judgment and limitation. | 8/3/4; 11; 33; 3/3 CC | V L1×2,L2×1,L4×4,L5×1; G L5×2,L6×1; E D5×4 | V ex: 2,3,1,3,1,1,1,1; G ex: 1,1,1; contextual E 0/4 | `ja-s4-l6` | KEEP + replace one grammar-mismatched expression with advanced review |
| `ja-s5-l2` | 能照顾对方感受，以较委婉方式求助。 Overlaps `ja-s3-l3`, but background and face-management justify retention. Expanded reliance is blocked by two grammar models. | 8/3/4; 11; 33; 3/3 CC | V L1×2,L2×4,L3×2; G L2×1,L3×1,L4×1; E D4×4 | V ex: 3,3,3,3,3,3,3,3; G ex: 1,1,8; contextual E 2/4 | `ja-s5-l1` | KEEP; `ja-n-desu-ga` and `ja-node` blocked |
| `ja-s5-l3` | 能用条件表达协商行程变化和替代方案。 The title promises conditional negotiation, but all current grammar is L1–2; refocus with specific records, never the overview. | 8/3/5; 11; 33; 3/3 CC | V L1×1,L2×4,L3×3; G L1×2,L2×1; E D3×4,D4×1 | V ex: 2,2,3,1,3,2,3,3; G ex: 8,8,8; contextual E 3/5 | `ja-s5-l2` | REFOCUS; final 8/3/4 |
| `ja-s5-l4` | 能细致表达感受强度及其背景。 Overlaps Stage 4 boundary language, but burden/concern/reservation creates a valid higher pragmatic demand. | 8/3/4; 11; 33; 3/3 CC | V L1×3,L2×2,L3×1,L4×2; G L3×2,L4×1; E D3×1,D4×3 | V ex: 3,2,3,3,3,3,1,1; G ex: 1,1,1; contextual E 2/4 | `ja-s5-l3` | KEEP; `ja-node` blocked |

### Future role and status of every current relationship

Every current relationship has a proposed instructional role independently of its current transport flags. Items marked `DNA` remain published canonical records; only the future Stage 5 relationship is rejected.

One high-confidence current relationship defect is explicit: `en-c-1001` canonically means “take care / 保重”, while `legacy-171-en` uses the different phrasal verb sense “take care of the whole thing / 处理整件事”. The canonical record itself is not declared wrong; the lesson-to-vocabulary relationship is semantically mismatched. Its future status is `DO NOT ADD`, and EN5 uses the already published `en-c-1029` (`mean well / 出于好意`) as a review item instead.

| Current lesson | Type | Every current relationship → future role/status |
|---|---|---|
| `en-s5-l1` | V | `en-c-153` R/A; `en-c-313` R/A; `en-c-445` R/A; `en-c-605` N/A; `en-c-649` N/RR; `en-c-757` N/RR; `en-c-work-verb` S/A; `en-leave` R/A |
|  | G | `en-hedged-claim` N/A; `en-may` S/A; `en-third-conditional` N/A |
|  | E | `lesson-en-would-have-ex` N/A; `lesson-en-third-conditional-ex` N/A; `lesson-en-hedged-claim-ex` N/A; `legacy-51-en` S/A |
| `en-s5-l2` | V | `en-c-1869` N/A; `en-c-289` S/A; `en-c-313` S/DNA; `en-c-985` N/A; `en-go` S/DNA; `en-c-645` R/RR; `en-on-the-way` S/A; `en-c-385` S/A |
|  | G | `en-even-if` R/RR; `en-simple-past` S/A; `en-will` S/A |
|  | E | `legacy-99-en` S/A; `legacy-96-en` N/A; `legacy-94-en` S/DNA; `legacy-95-en` S/DNA; `35e1b-en-d-flight-delay-expr` N/A |
| `en-s5-l3` | V | `en-c-073` R/A; `en-c-1001` S/DNA; `en-c-1073` N/A; `en-c-2285` R/A; `en-c-293` R/A; `en-c-621` N/A; `en-c-953` R/A; `en-help` S/A |
|  | G | `en-can-ability` S/A; `en-if-request` N/A; `en-mind-ing` N/A |
|  | E | `legacy-171-en` S/A; `legacy-170-en` N/A; `legacy-168-en` N/A; `legacy-164-en` S/DNA |
| `en-s5-l4` | V | `en-go` S/DNA; `en-come-up` R/A; `en-c-277` S/DNA; `en-c-369` S/A; `en-c-work-verb` S/DNA; `en-c-1081` N/RR; `en-c-1085` R/RR; `en-expect` S/A |
|  | G | `en-present-continuous` S/DNA; `en-simple-past` S/A; `en-was-going-to` N/A |
|  | E | `legacy-180-en` N/A; `legacy-177-en` R/A; `legacy-183-en` S/A; `changed-plan-en` N/A |
| `ja-s5-l1` | V | `ja-c-1115` S/A; `ja-c-235` S/A; `ja-c-3205` N/A; `ja-mada` S/A; `ja-c-3207` N/RR; `ja-c-607` N/RR; `ja-c-651` N/RR; `ja-c-683` N/RR |
|  | G | `ja-mono-no` N/A; `ja-to-wa-kagiranai` N/A; `ja-kanenai` N/A |
|  | E | `lesson-ja-ni-suginai-ex` S/DNA; `lesson-ja-to-wa-kagiranai-ex` N/A; `lesson-ja-kanenai-ex` N/A; `lesson-ja-mono-no-ex` N/A |
| `ja-s5-l2` | V | `ja-c-075` S/A; `ja-c-1075` R/A; `ja-dekiru` R/A; `ja-mada` S/A; `ja-c-1067` R/A; `ja-tetsudau` R/A; `ja-c-295` R/A; `ja-c-315` S/A |
|  | G | `ja-n-desu-ga` R/B; `ja-node` N/B; `ja-potential` R/A |
|  | E | `legacy-171-ja` S/A; `legacy-170-ja` N/A; `legacy-167-ja` N/A; `legacy-168-ja` N/A |
| `ja-s5-l3` | V | `ja-c-1837` S/A; `ja-c-1875` N/A; `ja-c-315` S/DNA; `ja-c-3191` N/A; `ja-iku` S/DNA; `ja-c-987` S/DNA; `ja-tochuu` S/A; `ja-c-387` S/A |
|  | G | `ja-ga-existence` S/DNA; `ja-ka-question` S/DNA; `ja-polite-past` S/DNA |
|  | E | `legacy-99-ja` S/A; `legacy-97-ja` N/A; `legacy-88-ja` S/DNA; `legacy-94-ja` S/DNA; `35e1b-ja-d-flight-delay-expr` N/A |
| `ja-s5-l4` | V | `ja-c-123` S/A; `ja-c-319` R/A; `ja-c-3193` S/A; `ja-c-327` S/A; `ja-c-363` S/A; `ja-c-591` S/A; `ja-c-671` N/RR; `ja-c-2101` N/A |
|  | G | `ja-node` R/B; `ja-te-kureru` R/A; `ja-to-shinpai` N/A |
|  | E | `legacy-135-ja` S/A; `legacy-131-ja` N/A; `legacy-132-ja` N/A; `legacy-129-ja` S/A |

## 4. Approved slot structure and draft titles

All titles and placeholder IDs are **DRAFT — HUMAN APPROVAL REQUIRED**. `PROPOSED-ID` strings are planning labels, not canonical IDs.

| Lang | Slot | Existing / placeholder | Chinese title | Target-language title | Function and disposition |
|---|---:|---|---|---|---|
| EN | 1 | `en-s5-l1` | 在限制下评估工作方案 | Evaluate a plan under constraints | Keep: plan/evidence/constraints |
| EN | 2 | `PROPOSED-ID:en-s5-02-tradeoffs` | 比较方案与取舍 | Compare alternatives and trade-offs | New |
| EN | 3 | `PROPOSED-ID:en-s5-03-consensus` | 协商优先事项并达成共识 | Negotiate priorities and reach consensus | New |
| EN | 4 | `en-s5-l2` | 应对行程不确定性与后备方案 | Handle itinerary uncertainty and contingencies | Refocus |
| EN | 5 | `en-s5-l3` | 升级服务或工作问题 | Escalate a service or workplace problem | Keep + advanced review |
| EN | 6 | `PROPOSED-ID:en-s5-06-repair` | 澄清信息并修复误解 | Clarify information and repair a misunderstanding | New |
| EN | 7 | `en-s5-l4` | 用过去结果支持当前决定 | Relate past outcomes to current decisions | Refocus |
| EN | 8 | `PROPOSED-ID:en-s5-08-reporting` | 报告信息并区分观察与推断 | Report information and distinguish observation from inference | New |
| JA | 1 | `ja-s5-l1` | 正式陈述判断与限制 | 限界を示して改まった判断を述べる | Keep + advanced review |
| JA | 2 | `ja-s5-l2` | 说明背景并体谅地请求 | 背景に配慮して依頼する | Keep; blockers retained visibly |
| JA | 3 | `PROPOSED-ID:ja-s5-03-formal-role` | 在明确服务角色中选择敬语与谦让语 | 接客場面で尊敬語と謙譲語を選ぶ | New; blocked pending exact models |
| JA | 4 | `ja-s5-l3` | 用条件协商日程替代方案 | 条件を示して予定の代案を相談する | Refocus |
| JA | 5 | `ja-s5-l4` | 委婉表达负担、担忧与保留 | 負担・懸念・遠慮をやわらかく伝える | Keep; one blocker retained visibly |
| JA | 6 | `PROPOSED-ID:ja-s5-06-repair` | 不责怪对方地修复误解 | 相手を責めずに誤解を解く | New |
| JA | 7 | `PROPOSED-ID:ja-s5-07-consensus` | 比较优先事项与取舍并达成共识 | 優先事項とトレードオフを比べて合意する | New |
| JA | 8 | `PROPOSED-ID:ja-s5-08-benefit` | 判断受益方向并选择授受表达 | 恩恵の向きを捉えて授受表現を選ぶ | New; specific records only |

## 5. Exact proposed final relationship matrix

Each slot has exactly 8 vocabulary, 3 assessable grammar, and 4 expressions. Every relationship has an explicit role and editorial status.

### English

| Slot | Type | Exact canonical relationships: `ID` role/status | Role count N/R/S | Status A/RR/B |
|---:|---|---|---:|---:|
| 1 | V | `en-c-153` R/A; `en-c-313` R/A; `en-c-445` R/A; `en-c-605` N/A; `en-c-649` N/RR; `en-c-757` N/RR; `en-c-work-verb` S/A; `en-leave` R/A | 3/4/1 | 6/2/0 |
| 1 | G | `en-hedged-claim` N/A; `en-may` S/A; `en-third-conditional` N/A | 2/0/1 | 3/0/0 |
| 1 | E | `lesson-en-would-have-ex` N/A; `lesson-en-third-conditional-ex` N/A; `lesson-en-hedged-claim-ex` N/A; `legacy-51-en` S/A | 3/0/1 | 4/0/0 |
| 2 | V | `en-c-645` S/RR; `en-c-613` N/RR; `en-c-705` S/RR; `en-c-725` N/RR; `en-c-769` N/RR; `en-c-785` N/RR; `en-c-793` N/RR; `en-c-757` R/RR | 5/1/2 | 0/8/0 |
| 2 | G | `en-concessive-although` N/RR; `en-seem-to` N/RR; `en-hedged-claim` R/A | 2/1/0 | 1/2/0 |
| 2 | E | `academic-approach-en` N/A; `legacy-49-en` N/A; `legacy-145-en` R/A; `lesson-en-hedged-claim-ex` R/A | 2/2/0 | 4/0/0 |
| 3 | V | `en-c-653` N/RR; `en-c-781` N/RR; `en-c-785` R/RR; `en-c-793` R/RR; `en-c-649` R/RR; `en-c-757` R/RR; `en-c-621` S/A; `en-c-313` S/A | 2/4/2 | 2/6/0 |
| 3 | G | `en-even-if` N/RR; `en-concessive-although` R/RR; `en-may` R/A | 1/2/0 | 1/2/0 |
| 3 | E | `35e1b-en-d-group-disagree-expr` N/A; `legacy-61-en` N/A; `legacy-49-en` R/A; `legacy-51-en` R/A | 2/2/0 | 4/0/0 |
| 4 | V | `en-c-1869` N/A; `en-c-289` S/A; `en-c-985` N/A; `en-c-645` R/RR; `en-on-the-way` S/A; `en-c-385` S/A; `en-c-617` N/RR; `en-c-641` N/RR | 4/1/3 | 5/3/0 |
| 4 | G | `en-even-if` R/RR; `en-simple-past` S/A; `en-will` S/A | 0/1/2 | 2/1/0 |
| 4 | E | `legacy-99-en` S/A; `legacy-96-en` N/A; `35e1b-en-d-flight-delay-expr` N/A; `legacy-75-en` N/A | 3/0/1 | 4/0/0 |
| 5 | V | `en-c-073` R/A; `en-c-1029` R/A; `en-c-1073` N/A; `en-c-2285` R/A; `en-c-293` R/A; `en-c-621` N/A; `en-c-953` R/A; `en-help` S/A | 2/5/1 | 8/0/0 |
| 5 | G | `en-can-ability` S/A; `en-if-request` N/A; `en-mind-ing` N/A | 2/0/1 | 3/0/0 |
| 5 | E | `legacy-171-en` S/A; `legacy-170-en` N/A; `legacy-168-en` N/A; `legacy-135-en` R/A | 2/1/1 | 4/0/0 |
| 6 | V | `en-c-629` N/RR; `en-c-737` N/RR; `en-c-609` N/RR; `en-c-685` S/RR; `en-c-1073` R/A; `en-c-293` S/A; `en-c-621` R/A; `en-c-445` S/A | 3/2/3 | 4/4/0 |
| 6 | G | `en-not-that` N/RR; `en-if-request` R/A; `en-mind-ing` R/A | 1/2/0 | 2/1/0 |
| 6 | E | `35e1b-en-x-clarify-in-other-words-expr` N/A; `35e1b-en-x-repair-not-blaming-expr` N/A; `35e1b-en-x-repair-tone-expr` N/A; `35e1b-en-d-misunderstanding-tone-expr` N/A | 4/0/0 | 4/0/0 |
| 7 | V | `en-come-up` R/A; `en-c-369` S/A; `en-c-1081` N/RR; `en-c-1085` R/RR; `en-expect` S/A; `en-c-733` N/RR; `en-c-769` R/RR; `en-c-757` S/RR | 2/3/3 | 3/5/0 |
| 7 | G | `en-simple-past` S/A; `en-was-going-to` N/A; `en-should-have` N/RR | 2/0/1 | 2/1/0 |
| 7 | E | `legacy-180-en` N/A; `legacy-177-en` R/A; `legacy-183-en` S/A; `changed-plan-en` N/A | 2/1/1 | 4/0/0 |
| 8 | V | `en-c-725` R/RR; `en-c-757` S/RR; `en-c-737` R/RR; `en-c-769` R/RR; `en-c-773` N/RR; `en-c-709` S/RR; `en-c-801` S/RR; `en-c-761` N/RR | 2/3/3 | 0/8/0 |
| 8 | G | `35e1c-en-reported-statements` N/A; `en-seem-to` R/RR; `en-hedged-claim` R/A | 1/2/0 | 2/1/0 |
| 8 | E | `academic-approach-en` R/A; `35e1b-en-d-misunderstanding-tone-expr` R/A; `legacy-108-en` N/RR; `legacy-145-en` R/A | 1/3/0 | 3/1/0 |

English totals: **64 V / 24 G / 32 E = 120 links**; roles **53 N / 40 R / 27 S**; status **75 A / 45 RR / 0 B**.

### Japanese

| Slot | Type | Exact canonical relationships: `ID` role/status | Role count N/R/S | Status A/RR/B |
|---:|---|---|---:|---:|
| 1 | V | `ja-c-1115` S/A; `ja-c-235` S/A; `ja-c-3205` N/A; `ja-mada` S/A; `ja-c-3207` N/RR; `ja-c-607` N/RR; `ja-c-651` N/RR; `ja-c-683` N/RR | 5/0/3 | 4/4/0 |
| 1 | G | `ja-mono-no` N/A; `ja-to-wa-kagiranai` N/A; `ja-kanenai` N/A | 3/0/0 | 3/0/0 |
| 1 | E | `lesson-ja-to-wa-kagiranai-ex` N/A; `lesson-ja-kanenai-ex` N/A; `lesson-ja-mono-no-ex` N/A; `legacy-147-ja` R/A | 3/1/0 | 4/0/0 |
| 2 | V | `ja-c-075` S/A; `ja-c-1075` R/A; `ja-dekiru` R/A; `ja-mada` S/A; `ja-c-1067` R/A; `ja-tetsudau` R/A; `ja-c-295` R/A; `ja-c-315` S/A | 0/5/3 | 8/0/0 |
| 2 | G | `ja-n-desu-ga` R/B; `ja-node` N/B; `ja-potential` R/A | 1/2/0 | 1/0/2 |
| 2 | E | `legacy-171-ja` S/A; `legacy-170-ja` N/A; `legacy-167-ja` N/A; `legacy-168-ja` N/A | 3/0/1 | 4/0/0 |
| 3 | V | `ja-c-295` R/A; `ja-c-315` S/A; `ja-c-1067` R/A; `ja-c-1075` S/A; `ja-c-527` N/RR; `ja-c-655` N/RR; `ja-c-651` R/RR; `ja-c-683` R/RR | 2/4/2 | 4/4/0 |
| 3 | G | `ja-honorific` N/B; `ja-humble` N/B; `ja-honorific-request` R/A | 2/1/0 | 1/0/2 |
| 3 | E | `legacy-37-ja` N/A; `legacy-39-ja` N/A; `legacy-49-ja` N/A; `35e1b-ja-x-hotel-quiet-room-expr` R/A | 3/1/0 | 4/0/0 |
| 4 | V | `ja-c-1837` S/A; `ja-c-1875` N/A; `ja-c-3191` N/A; `ja-tochuu` S/A; `ja-c-387` S/A; `ja-c-619` N/RR; `ja-c-643` N/RR; `ja-c-647` N/RR | 5/0/3 | 5/3/0 |
| 4 | G | `ja-nara` R/A; `ja-ba-condition` R/A; `ja-indirect-ka` N/RR | 1/2/0 | 2/1/0 |
| 4 | E | `legacy-99-ja` S/A; `legacy-97-ja` N/A; `35e1b-ja-d-flight-delay-expr` N/A; `legacy-109-ja` R/A | 2/1/1 | 4/0/0 |
| 5 | V | `ja-c-123` S/A; `ja-c-319` R/A; `ja-c-3193` S/A; `ja-c-327` S/A; `ja-c-363` S/A; `ja-c-591` S/A; `ja-c-671` N/RR; `ja-c-2101` N/A | 2/1/5 | 7/1/0 |
| 5 | G | `ja-node` R/B; `ja-te-kureru` R/A; `ja-to-shinpai` N/A | 1/2/0 | 2/0/1 |
| 5 | E | `legacy-135-ja` S/A; `legacy-131-ja` N/A; `legacy-132-ja` N/A; `legacy-129-ja` S/A | 2/0/2 | 4/0/0 |
| 6 | V | `ja-c-631` N/RR; `ja-c-739` N/RR; `ja-c-295` R/A; `ja-c-319` S/A; `ja-c-1075` S/A; `ja-c-527` R/RR; `ja-c-683` R/RR; `ja-c-671` R/RR | 2/4/2 | 3/5/0 |
| 6 | G | `ja-wake-dewa-nai` N/RR; `ja-youda` N/RR; `ja-indirect-ka` R/RR | 2/1/0 | 0/3/0 |
| 6 | E | `35e1b-ja-x-clarify-in-other-words-expr` N/A; `35e1b-ja-d-misunderstanding-tone-expr` N/A; `legacy-156-ja` R/RR; `legacy-63-ja` N/A | 3/1/0 | 3/1/0 |
| 7 | V | `ja-c-655` R/RR; `ja-c-787` S/RR; `ja-c-783` N/RR; `ja-c-751` N/RR; `ja-c-795` N/RR; `ja-c-607` R/RR; `ja-c-651` R/RR; `ja-c-683` S/RR | 3/3/2 | 0/8/0 |
| 7 | G | `ja-wari-ni` N/RR; `ja-ba-hodo` N/RR; `ja-beki` N/RR | 3/0/0 | 0/3/0 |
| 7 | E | `35e1b-ja-d-group-disagree-expr` N/A; `legacy-51-ja` N/A; `legacy-61-ja` N/A; `legacy-49-ja` R/A | 3/1/0 | 4/0/0 |
| 8 | V | `ja-tetsudau` R/A; `ja-c-1067` R/A; `ja-c-1075` S/A; `ja-c-295` R/A; `ja-c-315` S/A; `ja-dekiru` S/A; `ja-c-671` R/RR; `ja-c-527` R/RR | 0/5/3 | 6/2/0 |
| 8 | G | `ja-te-morau` R/A; `ja-te-kureru` R/A; `ja-te-itadaku` R/A | 0/3/0 | 3/0/0 |
| 8 | E | `legacy-165-ja` R/A; `legacy-164-ja` R/A; `35e1b-ja-x-alternative-repair-expr` R/A; `35e1b-ja-x-hotel-quiet-room-expr` R/A | 0/4/0 | 4/0/0 |

Japanese totals: **64 V / 24 G / 32 E = 120 links**; roles **51 N / 42 R / 27 S**; status **80 A / 35 RR / 5 B**.

## 6. Vocabulary editorial-readiness matrix

The 40 rows below are the selected vocabulary records that still need a lesson-specific sentence. The existing canonical examples are one short example/collocation each. `NEEDS LESSON EXAMPLE` means the relationship stays `REVIEW REQUIRED` until the sentence and its use are approved. Draft sentences are not canonical content.

### English — 24 draft examples

| ID; form; Chinese; level; examples | Proposed slot(s); role | Usage, semantic/register fit | Readiness | DRAFT — HUMAN APPROVAL REQUIRED: candidate sentence / Chinese / context note |
|---|---|---|---|---|
| `en-c-649`; scope; 范围; L4; ex1 | 1 N, 3 R | Bound the work included; neutral workplace fit | NEEDS LESSON EXAMPLE | “Let’s reduce the scope to the two urgent tasks.” / “我们把范围缩小到两项紧急任务吧。” / Team-planning proposal; neutral |
| `en-c-757`; evidence; 证据; L4; ex1 | 1 N, 2 R, 3 R, 7 S, 8 S | Support a claim, not merely mention information; neutral/formal fit | NEEDS LESSON EXAMPLE | “The evidence supports delaying the launch by one week.” / “证据支持把发布推迟一周。” / Decision meeting; neutral-formal |
| `en-c-645`; alternative; 替代选项; L4; ex1 | 2 S, 4 R | A concrete replacement option; neutral fit | NEEDS LESSON EXAMPLE | “If the venue is unavailable, the library is a feasible alternative.” / “如果场地不可用，图书馆是一个可行的替代选择。” / Contingency planning |
| `en-c-613`; rethink; 重新考虑; L4; ex1 | 2 N | Reconsider after new evidence; neutral fit | NEEDS LESSON EXAMPLE | “We should rethink the plan if the safety check fails.” / “如果安全检查不通过，我们应该重新考虑这个方案。” / Work-plan evaluation |
| `en-c-705`; efficient; 高效的; L4; ex1 | 2 S | Evaluate resource use, not general praise; neutral fit | NEEDS LESSON EXAMPLE | “Sharing one vehicle would be more efficient than making two trips.” / “共用一辆车会比跑两趟更高效。” / Option comparison |
| `en-c-725`; evaluate; 评估; L5; ex1 | 2 N, 8 R | Deliberate assessment against criteria; formal fit | NEEDS LESSON EXAMPLE | “We need to evaluate each option against cost, time, and risk.” / “我们需要按成本、时间和风险评估每个方案。” / Formal planning |
| `en-c-769`; limitation; 局限; L5; ex1 | 2 N, 7 R, 8 R | State a bounded weakness; formal fit | NEEDS LESSON EXAMPLE | “The main limitation is that the estimate excludes training time.” / “主要局限是该估算没有计入培训时间。” / Qualified evaluation |
| `en-c-785`; trade-off; 取舍关系; L5; ex1 | 2 N, 3 R | Explicit benefit/cost relationship; formal fit | NEEDS LESSON EXAMPLE | “The trade-off is faster delivery but less time for testing.” / “取舍在于交付更快，但测试时间更少。” / Alternatives meeting |
| `en-c-793`; feasible; 可行的; L5; ex1 | 2 N, 3 R | Practically possible under constraints; formal fit | NEEDS LESSON EXAMPLE | “The second option is feasible if we borrow one staff member.” / “如果能借调一名员工，第二个方案是可行的。” / Resource constraint |
| `en-c-653`; priority; 优先事项; L4; ex1 | 3 N | Rank a work need; neutral workplace fit | NEEDS LESSON EXAMPLE | “Safety is the first priority, so the cosmetic changes can wait.” / “安全是首要事项，因此外观调整可以稍后。” / Priority negotiation |
| `en-c-781`; consensus; 共识; L5; ex1 | 3 N | Shared agreement after discussion; formal fit | NEEDS LESSON EXAMPLE | “We reached a consensus on the budget, but not the deadline.” / “我们在预算上达成了共识，但截止日期还没有。” / Team decision |
| `en-c-617`; adjust; 调整; L4; ex1 | 4 N | Make a bounded schedule change; neutral fit | NEEDS LESSON EXAMPLE | “We can adjust the connection time without changing the destination.” / “我们可以调整转机时间，而不改变目的地。” / Travel contingency |
| `en-c-641`; postpone; 推迟; L4; ex1 | 4 N | Move an event to a later time; neutral fit | NEEDS LESSON EXAMPLE | “They postponed the departure until the weather improved.” / “他们把出发时间推迟到天气好转以后。” / Itinerary change |
| `en-c-629`; misunderstand; 误解; L4; ex1 | 6 N | Misread intended meaning, not lack vocabulary; neutral fit | NEEDS LESSON EXAMPLE | “I may have misunderstood which deadline you meant.” / “我可能误解了你指的是哪个截止日期。” / Non-blaming repair |
| `en-c-737`; clarify; 澄清; L5; ex1 | 6 N, 8 R | Make information more precise; formal fit | NEEDS LESSON EXAMPLE | “Could you clarify whether that figure is observed or estimated?” / “你能澄清一下那个数字是观察值还是估算值吗？” / Reporting repair |
| `en-c-609`; rephrase; 换个说法; L4; ex1 | 6 N | Restate meaning, not merely repeat words; neutral fit | NEEDS LESSON EXAMPLE | “Let me rephrase that so it does not sound like blame.” / “我换个说法，以免听起来像是在责怪。” / Tone repair |
| `en-c-685`; harsh; 言语刺耳的; L4; ex1 | 6 S | Describe tone rather than speaker character; neutral fit | NEEDS LESSON EXAMPLE | “My message sounded harsher than I intended.” / “我的信息听起来比我本意更刺耳。” / Workplace repair |
| `en-c-1081`; turn out; 结果是; L4; ex1 | 7 N | Report an actual outcome discovered later; neutral fit | NEEDS LESSON EXAMPLE | “The cheaper option turned out to require more staff time.” / “结果是，较便宜的方案需要更多员工时间。” / Past outcome |
| `en-c-1085`; up in the air; 尚未确定; L4; ex1 | 7 R | Informal uncertainty; suitable only in spoken/team context | NEEDS LESSON EXAMPLE | “The final date is still up in the air because approval is pending.” / “最终日期仍未确定，因为审批还在等待中。” / Spoken planning; neutral-informal |
| `en-c-733`; justify; 说明正当理由; L5; ex1 | 7 N | Give a defensible reason, not excuse-making; formal fit | NEEDS LESSON EXAMPLE | “The results do not justify increasing the budget yet.” / “这些结果尚不足以证明增加预算是合理的。” / Decision review |
| `en-c-773`; perspective; 视角; L5; ex1 | 8 N | Identify an interpretive position; formal fit | NEEDS LESSON EXAMPLE | “From the customer’s perspective, the delay looked unexplained.” / “从客户的视角看，这次延误似乎没有得到解释。” / Observation versus interpretation |
| `en-c-709`; accurate; 准确的; L4; ex1 | 8 S | Factual precision; neutral fit | NEEDS LESSON EXAMPLE | “The time is accurate, but the reason is still an assumption.” / “时间是准确的，但原因仍然只是假定。” / Evidence report |
| `en-c-801`; relevant; 相关的; L4; ex1 | 8 S | Directly bears on the decision; neutral/formal fit | NEEDS LESSON EXAMPLE | “Only include details that are relevant to the final decision.” / “只加入与最终决定相关的细节。” / Report editing |
| `en-c-761`; assumption; 假定; L5; ex1 | 8 N | Unverified premise, explicitly distinct from observation; formal fit | NEEDS LESSON EXAMPLE | “That conclusion depends on an assumption we have not checked.” / “那个结论依赖于一个我们尚未核实的假定。” / Inference audit |

### Japanese — 16 draft examples

| ID; form; Chinese; level; examples | Proposed slot(s); role | Usage, semantic/register fit | Readiness | DRAFT — HUMAN APPROVAL REQUIRED: candidate sentence / Chinese / context note |
|---|---|---|---|---|
| `ja-c-3207`; 甲斐; 付出的价值; L5; ex1 | 1 N | `Vた + 甲斐がある`; formal-neutral judgment | NEEDS LESSON EXAMPLE | 「見直した甲斐があり、無理のない計画になりました。」 / “重新审视是值得的，计划变得切实可行了。” / Work-plan judgment |
| `ja-c-607`; 絞る; 缩小范围; L4; ex1 | 1 N, 7 R | Narrow candidates or focus; neutral workplace fit | NEEDS LESSON EXAMPLE | 「候補を二つに絞ってから、条件を比べましょう。」 / “把候选缩小到两个以后，再比较条件吧。” / Decision meeting |
| `ja-c-651`; 範囲; 范围; L4; ex1 | 1 N, 3 R, 7 R | Bounded task scope; neutral/formal fit | NEEDS LESSON EXAMPLE | 「今回は調査の範囲を国内市場に限ります。」 / “这次把调查范围限定在国内市场。” / Formal planning |
| `ja-c-683`; 判断; 判断; L4; ex1 | 1 N, 3 R, 6 R, 7 S | Evidence-based decision; neutral/formal fit | NEEDS LESSON EXAMPLE | 「証拠が足りないため、今は判断を保留します。」 / “由于证据不足，现在暂缓判断。” / Cautious judgment |
| `ja-c-527`; 懸念; 担忧之处; L5; ex1 | 3 N, 6 R, 8 R | Specific concern, stronger/more formal than simple worry | NEEDS LESSON EXAMPLE | 「一点懸念があり、担当者の負担が大きすぎます。」 / “有一点担忧，负责人承担的负担过大。” / Formal service/work discussion |
| `ja-c-655`; 優先事項; 优先事项; L4; ex1 | 3 N, 7 R | Ranked work priority; neutral workplace fit | NEEDS LESSON EXAMPLE | 「安全を最優先事項として、人員を配分しましょう。」 / “把安全作为首要事项来分配人员吧。” / Resource negotiation |
| `ja-c-619`; 調整する; 调整; L4; ex1 | 4 N | Coordinate a schedule/resource change; neutral fit | NEEDS LESSON EXAMPLE | 「乗り継ぎ時間を調整できるか確認します。」 / “我确认一下能否调整转机时间。” / Travel service |
| `ja-c-643`; 延期する; 推迟; L4; ex1 | 4 N | Formally move an event later; neutral/formal fit | NEEDS LESSON EXAMPLE | 「悪天候のため、出発を明日の朝まで延期します。」 / “因天气恶劣，出发推迟到明早。” / Schedule notice |
| `ja-c-647`; 代案; 替代选项; L4; ex1 | 4 N | Concrete alternative plan; neutral/formal fit | NEEDS LESSON EXAMPLE | 「直行便がなければ、鉄道を使う代案があります。」 / “如果没有直达航班，还有乘铁路的替代方案。” / Itinerary negotiation |
| `ja-c-671`; 負担; 负担; L4; ex1 | 5 N, 6 R, 8 R | Burden on a person; avoid generic ‘stress’ substitution | NEEDS LESSON EXAMPLE | 「急な変更は担当者の負担になるかもしれません。」 / “突然变更可能会给负责人造成负担。” / Considerate reservation |
| `ja-c-631`; 誤解する; 误解; L4; ex1 | 6 N | Misinterpret intended content; neutral fit | NEEDS LESSON EXAMPLE | 「私が期限を誤解していたようです。」 / “看来是我误解了截止日期。” / Non-blaming repair |
| `ja-c-739`; 明確にする; 澄清; L4; ex1 | 6 N | Make a distinction explicit; neutral/formal fit | NEEDS LESSON EXAMPLE | 「事実と推測の違いを明確にしてください。」 / “请明确事实与推测的区别。” / Information repair |
| `ja-c-787`; トレードオフ; 取舍关系; L5; ex1 | 7 S | Workplace loanword; human register check required | NEEDS LESSON EXAMPLE | 「速さと正確さの間にはトレードオフがあります。」 / “速度与准确性之间存在取舍关系。” / Workplace discussion; loanword review |
| `ja-c-783`; 合意; 共识; L5; ex1 | 7 N | Formal shared agreement; formal fit | NEEDS LESSON EXAMPLE | 「期限については合意しましたが、配分は未定です。」 / “截止日期已达成共识，但分配仍未确定。” / Formal negotiation |
| `ja-c-751`; 配分する; 分配资源; L5; ex1 | 7 N | Allocate finite resources; formal workplace fit | NEEDS LESSON EXAMPLE | 「優先度に応じて、時間と人員を配分します。」 / “根据优先级分配时间和人员。” / Resource meeting |
| `ja-c-795`; 実行可能; 可行的; L5; ex1 | 7 N | Predicate/noun-modifying collocation needs naturalness review | NEEDS LESSON EXAMPLE | 「この案は、追加予算があれば実行可能です。」 / “这个方案如果有追加预算就可行。” / Formal feasibility judgment |

### All other selected vocabulary — READY AS-IS

These 45 unique records already have acceptable examples or are directly modeled by retained contextual expressions. Their lesson-specific semantic/register fit is stated below; no unstated sense extension is authorized.

| ID; form; Chinese; level; examples | Proposed slot(s); role | Usage and semantic/register fit | Readiness |
|---|---|---|---|
| `en-c-153`; train; 列车; L1; ex3 | EN1 R | Concrete planning constraint; neutral transport support | READY AS-IS |
| `en-c-313`; need; 需要; L2; ex3 | EN1 R, EN3 S | Necessity only; neutral planning support | READY AS-IS |
| `en-c-445`; focus; 集中注意力; L3; ex2 | EN1 R, EN6 S | Direct attention/scope management; neutral fit | READY AS-IS |
| `en-c-605`; narrow; 缩小范围; L4; ex1 | EN1 N | “narrow the scope” is modeled by `legacy-51-en`; neutral workplace fit | READY AS-IS |
| `en-c-work-verb`; work; 工作；从事工作; L1; ex2 | EN1 S | Work setting only; neutral scaffolding | READY AS-IS |
| `en-leave`; leave; 离开; L2; ex3 | EN1 R | Earlier departure as a plan constraint; neutral fit | READY AS-IS |
| `en-c-621`; commit; 承诺投入; L4; ex1 | EN3 S, EN5 N, EN6 R | Bounded resource commitment, modeled by `legacy-171-en`; neutral workplace fit | READY AS-IS |
| `en-c-1869`; detour; 途中绕道去一个地方; L4; ex1 | EN4 N | Route deviation, modeled by `legacy-96-en`; neutral travel fit | READY AS-IS |
| `en-c-289`; change; 改变; L2; ex3 | EN4 S | Schedule/terminal change; neutral support | READY AS-IS |
| `en-c-985`; miss; 错过; L3; ex1 | EN4 N | Miss a stop/connection, modeled by retained flight dialogue; neutral travel fit | READY AS-IS |
| `en-on-the-way`; on the way; 在途中; L2; ex3 | EN4 S | Route-progress support; neutral fit | READY AS-IS |
| `en-c-385`; airport; 机场; L2; ex3 | EN4 S | Travel setting support; neutral fit | READY AS-IS |
| `en-c-073`; window; 窗户; L1; ex3 | EN5 R | Concrete request object; neutral support | READY AS-IS |
| `en-c-1029`; mean well; 出于好意; L4; ex1 | EN5 R | Benign intent in a pressure/boundary exchange, explicitly modeled by `legacy-135-en` | READY AS-IS |
| `en-c-1073`; put out; 给某人添麻烦; L4; ex1 | EN5 N, EN6 R | Interpersonal inconvenience, modeled by `legacy-170-en`; neutral-informal fit | READY AS-IS |
| `en-c-2285`; help; 请求时需要的帮忙; L1; ex3 | EN5 R | Request noun; neutral scaffolding | READY AS-IS |
| `en-c-293`; check; 核对; L2; ex3 | EN5 R, EN6 S | Verify a concrete item; neutral fit | READY AS-IS |
| `en-c-953`; moment; 片刻; L2; ex3 | EN5 R | Soft request time frame; neutral support | READY AS-IS |
| `en-help`; help; 帮助; L1; ex3 | EN5 S | General assistance verb; neutral scaffolding | READY AS-IS |
| `en-come-up`; come up; （事情）突然发生; L3; ex3 | EN7 R | Unplanned event, modeled by `changed-plan-en`; neutral conversational fit | READY AS-IS |
| `en-c-369`; weekend; 周末; L2; ex3 | EN7 S | Time setting only; neutral support | READY AS-IS |
| `en-expect`; expect; 预料；认为很可能发生; L3; ex2 | EN7 S | Prior expectation contrasted with outcome; neutral fit | READY AS-IS |
| `ja-c-1115`; 例; 例子; L2; ex2 | JA1 S | Marks a bounded example, not proof; neutral support | READY AS-IS |
| `ja-c-235`; いい; 好的; L1; ex3 | JA1 S | Basic evaluative scaffolding; neutral fit | READY AS-IS |
| `ja-c-3205`; 招く; 招致; L4; ex1 | JA1 N | Negative consequence collocation, modeled by `lesson-ja-kanenai-ex`; formal-neutral fit | READY AS-IS |
| `ja-mada`; まだ; 还；尚; L1; ex3 | JA1 S, JA2 S | Incomplete state only; neutral support | READY AS-IS |
| `ja-c-075`; 窓; 窗户; L1; ex3 | JA2 S | Concrete request object; neutral support | READY AS-IS |
| `ja-c-1075`; 迷惑; 给某人添麻烦; L3; ex3 | JA2 R, JA3 S, JA6 S, JA8 S | Interpersonal imposition; neutral pragmatic support | READY AS-IS |
| `ja-dekiru`; できる; 产生；出现（事情）; L2; ex3 | JA2 R, JA8 S | Event occurrence in context; do not generalize this sense to all potential forms | READY AS-IS |
| `ja-c-1067`; 助かる; 感激; L3; ex3 | JA2 R, JA3 R, JA8 R | Speaker benefit/gratitude; neutral fit | READY AS-IS |
| `ja-tetsudau`; 手伝う; 帮忙; L2; ex3 | JA2 R, JA8 R | Concrete assistance; neutral fit | READY AS-IS |
| `ja-c-295`; 確認する; 核对; L2; ex3 | JA2 R, JA3 R, JA6 R, JA8 R | Verify information/action; neutral workplace/service fit | READY AS-IS |
| `ja-c-315`; 必要; 需要; L2; ex3 | JA2 S, JA3 S, JA8 S | Necessity only; neutral support | READY AS-IS |
| `ja-c-1837`; 運賃; 乘车时要付的费用; L3; ex2 | JA4 S | Transport fare; neutral travel fit | READY AS-IS |
| `ja-c-1875`; 回り道; 途中绕道去一个地方; L3; ex2 | JA4 N | Route detour; neutral travel fit | READY AS-IS |
| `ja-c-3191`; 行き方; 前往的方法; L2; ex1 | JA4 N | Route option, directly modeled by `legacy-97-ja`; neutral fit | READY AS-IS |
| `ja-tochuu`; 途中; 途中；中途; L2; ex3 | JA4 S | Route-progress support; neutral fit | READY AS-IS |
| `ja-c-387`; 空港; 机场; L2; ex3 | JA4 S | Travel setting support; neutral fit | READY AS-IS |
| `ja-c-123`; 今日; 今天; L1; ex3 | JA5 S | Time anchor only; neutral support | READY AS-IS |
| `ja-c-319`; わかる; 理解; L1; ex2 | JA5 R, JA6 S | Acknowledge another view; neutral fit | READY AS-IS |
| `ja-c-3193`; 間に合う; 来得及; L3; ex3 | JA5 S | Timeliness background; neutral support | READY AS-IS |
| `ja-c-327`; 静か; 安静的; L1; ex3 | JA5 S | Observable state; neutral support | READY AS-IS |
| `ja-c-363`; 遅れる; 迟到的; L2; ex3 | JA5 S | Delay background; neutral support | READY AS-IS |
| `ja-c-591`; 怒る; 生气的; L2; ex3 | JA5 S | Emotion contrast; neutral support | READY AS-IS |
| `ja-c-2101`; いっぱいいっぱい; 事情太多而感到应付不过来; L4; ex1 | JA5 N | Spoken overload state, modeled by the lesson objective; conversational register | READY AS-IS |

Vocabulary debt is therefore exact: **40 unique lesson-example approvals** (24 EN, 16 JA). Japanese adds no level-6 vocabulary.

## 7. Grammar selection, examples, and Hotfix 03 blockers

### Selected new or newly relied-on grammar

All rows are current, published, practice-eligible canonical records. Except for reported statements, each has one canonical example and a controlled-completion target. The 13 one-example records below require three varied examples each before implementation: **39 new grammar examples**. One seed is supplied per record; the remaining 26 are not drafted here.

| ID | Slot(s); level; current ex; CC | Status | DRAFT — HUMAN APPROVAL REQUIRED: seed example / Chinese / focus |
|---|---|---|---|
| `en-concessive-although` | EN2 N, EN3 R; L4; ex1; yes | RR | “Although the cheaper plan saves money, it creates a staffing risk.” / “虽然较便宜的方案省钱，但会带来人员风险。” / concession before trade-off |
| `en-seem-to` | EN2 N, EN8 R; L4; ex1; yes | RR | “The figures seem to show a delay, but the cause is unclear.” / “这些数字似乎显示有延误，但原因不清楚。” / inference, not certainty |
| `en-even-if` | EN3 N, EN4 R; L4; ex1; yes | RR | “Even if we postpone the meeting, we still need a decision today.” / “即使推迟会议，我们今天仍需作出决定。” / concession under negotiation |
| `en-not-that` | EN6 N; L5; ex1; yes | RR | “It’s not that I disagree; I may have misunderstood the scope.” / “并不是我不同意；我可能误解了范围。” / non-blaming repair |
| `en-should-have` | EN7 N; L4; ex1; yes | RR | “We should have checked the connection before booking.” / “我们订票前本应该确认转机。” / past evaluation |
| `35e1c-en-reported-statements` | EN8 N; L4; ex4; no | A | No new seed required. Selection/recall remains assessable; controlled completion is not required. |
| `ja-indirect-ka` | JA4 N, JA6 R; L3; ex1; yes | RR | 「どの便に変更できるか、確認していただけますか。」 / “能请您确认可以改到哪趟航班吗？” / embedded question |
| `ja-wake-dewa-nai` | JA6 N; L4; ex1; yes | RR | 「責めたいわけではなく、確認したいだけです。」 / “并不是想责怪，只是想确认。” / intent repair |
| `ja-youda` | JA6 N; L4; ex1; yes | RR | 「説明の受け取り方に違いがあったようです。」 / “看来双方对说明的理解有所不同。” / cautious inference |
| `ja-wari-ni` | JA7 N; L4; ex1; yes | RR | 「費用の割に、得られる効果が小さいです。」 / “相对于费用，获得的效果较小。” / qualified comparison |
| `ja-ba-hodo` | JA7 N; L5; ex1; yes | RR | 「急げば急ぐほど、確認の時間が減ります。」 / “越着急，确认时间越少。” / degree relationship |
| `ja-beki` | JA7 N; L5; ex1; yes | RR | 「まず安全条件を確認するべきだと思います。」 / “我认为首先应该确认安全条件。” / soften normative force |
| `ja-honorific` | JA3 N; L4; ex1; yes | B | After the bounded model below: 「お客様がおっしゃった内容を確認します。」 / “我来确认客人所说的内容。” / customer action |
| `ja-humble` | JA3 N; L4; ex1; yes | B | After the bounded model below: 「私が予約を確認いたします。」 / “由我来确认预订。” / staff action |

`ja-nara` is approved review from `ja-s3-l5`; `ja-ba-condition` is approved review from `ja-s3-l3`. Unlinked foundational `ja-tara`, `ja-to-condition`, and `ja-temo` are **DO NOT ADD** as Stage 5 `NEW`; they need an earlier-stage placement decision first.

### Focused modeling audit: exact Hotfix 03 proposal

No correction is applied here. The following is the smallest proposed authoritative change set.

| Record | Current canonical form / answer and example | Eligibility and current use | Ambiguity / unsafe model | Safest proposed final model | Stage 5 decision |
|---|---|---|---|---|---|
| `ja-n-desu-ga` | Form `〜んですが`; formula `plain form + んですが`; ex1 `行くつもりだったんですが、急に用事ができました。` | current=yes; practice-eligible=yes; `ja-s4-l4`, `ja-s5-l2` | English metalanguage; noun/な-adjective joining is only in mistakes; broad unfinished-discourse function makes a wide recall answer unsafe | Form `普通形 + んですが（N・ナ形 + なんですが）`; keep selection/recall; CC only for a full authored clause with one local blank. For the current example the exact answer is `んですが`, not the whole pattern. | **BLOCKED** until corrected and human-reviewed |
| `ja-node` | Form/formula `普通形 + ので / て-form`; ex1 `急なので、調整が難しいです。` | current=yes; practice-eligible=yes; `ja-s5-l2`, `ja-s5-l4` | Conflates `ので` with a separate て-form reason strategy; the slash creates multiple structures and weakens recall/CC | Form `普通形 + ので（N・ナ形 + なので）`; remove `/ て-form` from this record. Keep selection/recall; CC uses an authored sentence-specific answer (`なので` in the current example). | **BLOCKED** in two links until corrected |
| `ja-honorific` | Form/formula `おっしゃる / なさる 等`; ex1 `おっしゃることはわかります。` | current=yes; practice-eligible=yes; unlinked | `等` denotes an open lexical class; a broad recall answer cannot identify which respectful verb is required | Narrow this record to one tested mapping: form/formula `言う → おっしゃる`; usage explicitly says the subject is the respected customer/other party. Keep selection/recall and CC only where the blank uniquely requires `おっしゃる`. | **BLOCKED** until narrowed |
| `ja-humble` | Form/formula `いたす / 伺う 等`; ex1 `確認いたします。` | current=yes; practice-eligible=yes; unlinked | Mixes unrelated humble lexemes and roles; `等` creates a fake broad answer | Narrow this record to one tested mapping: form/formula `する → いたす`; usage explicitly says the staff/speaker lowers their own action. Keep selection/recall and CC only where the blank uniquely requires `いたします`. | **BLOCKED** until narrowed |

`ja-honorific-request` remains the approved specific review record for `お + Vます-stem + ください`. The two overview records remain readable, practice-ineligible overviews and are not part of this Hotfix 03 proposal.

The other selected Stage 5 grammar was checked for the same class of high-confidence answer-model defect. No fifth grammar blocker was confirmed. `ja-beki` still requires interpersonal-force review, and the one-example candidates still need examples, but those are bounded editorial dependencies rather than defective canonical answer models.

## 8. Expression readiness and contexts

All 64 expression links are exact in the relationship matrix. The design intentionally reuses earlier expressions only when the discourse demand changes:

| Expression | Source → Stage 5 target | Advanced demand | Status |
|---|---|---|---|
| `legacy-145-en` | `en-s4-l4` → EN2 and EN8 | Preference becomes reasoned option comparison/report qualification | A |
| `legacy-135-en` | `en-s4-l1` → EN5 | Personal pressure becomes a bounded workplace/service escalation | A |
| `legacy-109-ja` | `ja-s4-l1` → JA4 | Weather risk avoidance becomes justified itinerary contingency | A |
| `legacy-147-ja` | `ja-s4-l4` → JA1 | Preference/reservation becomes formal qualified judgment | A |
| `legacy-156-ja` | `ja-s4-l3` → JA6 | Personal boundary language becomes explicit no-blame repair | RR: context required |

`legacy-135-en`, `legacy-156-en`, `legacy-159-en`, `legacy-111-ja`, and the other audited review candidates not present in the exact matrix are not implementation-ready links for this release. They remain optional future candidates, not silent additions.

Exactly two selected canonical expression units need standalone context:

| Expression | DRAFT — HUMAN APPROVAL REQUIRED context | Status |
|---|---|---|
| `legacy-108-en` | “A team has received a concerning forecast but must separate the observed forecast from the contingency decision. The sentence is a qualified next-step statement, not a weather-vocabulary exercise.” | RR / NEEDS CONTEXT |
| `legacy-156-ja` | 「依頼を断るためではなく、誤解された意図を説明して関係を修復する場面。話者は相手を責めず、自分の境界と理由を明確にする。」 | RR / NEEDS CONTEXT |

Expression-context debt: **2 unique context additions**. Every context remains a draft.

## 9. REVIEW source map

Every `REVIEW` relationship has an earlier source in the existing course or an earlier proposed Stage 5 slot. Repeated IDs in different target slots are listed separately through their target slot.

### English

| Target | REVIEW relationships → earlier source |
|---|---|
| EN1 | `en-c-153`→`en-s2-l3`; `en-c-313`→`en-s1-l4`; `en-c-445`→`en-s3-l4`; `en-leave`→`en-s2-l1` |
| EN2 | `en-c-757`, `en-hedged-claim`, `lesson-en-hedged-claim-ex`→EN1; `legacy-145-en`→`en-s4-l4` |
| EN3 | `en-c-785`,`en-c-793`,`en-concessive-although`,`legacy-49-en`→EN2; `en-c-649`,`en-c-757`,`en-may`,`legacy-51-en`→EN1 |
| EN4 | `en-c-645`→EN2; `en-even-if`→EN3 |
| EN5 | `en-c-073`,`en-c-2285`→`en-s1-l4`; `en-c-293`→`en-s3-l4`; `en-c-953`→`en-s2-l1`; `en-c-1029`,`legacy-135-en`→`en-s4-l1` |
| EN6 | `en-c-1073`,`en-c-621`,`en-if-request`,`en-mind-ing`→EN5 |
| EN7 | `en-come-up`,`en-c-1085`,`legacy-177-en`→`en-s3-l1`; `en-c-769`→EN2 |
| EN8 | `en-c-725`,`en-c-769`,`en-seem-to`,`academic-approach-en`,`legacy-145-en`→EN2; `en-hedged-claim`→EN1; `en-c-737`,`35e1b-en-d-misunderstanding-tone-expr`→EN6 |

### Japanese

| Target | REVIEW relationships → earlier source |
|---|---|
| JA1 | `legacy-147-ja`→`ja-s4-l4` |
| JA2 | `ja-c-1075`,`ja-dekiru`,`ja-c-1067`,`ja-tetsudau`,`ja-c-295`→`ja-s3-l3`; `ja-n-desu-ga`→`ja-s4-l4`; `ja-potential`→`ja-s2-l4` |
| JA3 | `ja-c-295`,`ja-c-1067`→JA2/`ja-s3-l3`; `ja-c-651`,`ja-c-683`→JA1; `ja-honorific-request`→`ja-s2-l3`; `35e1b-ja-x-hotel-quiet-room-expr`→`ja-s4-l6` |
| JA4 | `ja-nara`→`ja-s3-l5`; `ja-ba-condition`→`ja-s3-l3`; `legacy-109-ja`→`ja-s4-l1` |
| JA5 | `ja-c-319`→`ja-s1-l1`; `ja-node`→JA2; `ja-te-kureru`→`ja-s4-l3` |
| JA6 | `ja-c-295`→JA2; `ja-c-527`→JA3; `ja-c-683`→JA1; `ja-c-671`→JA5; `ja-indirect-ka`→JA4; `legacy-156-ja`→`ja-s4-l3` |
| JA7 | `ja-c-655`→JA3; `ja-c-607`,`ja-c-651`→JA1; `legacy-49-ja`→JA3 |
| JA8 | `ja-tetsudau`,`ja-c-1067`,`ja-c-295`→JA2/`ja-s3-l3`; `ja-c-671`→JA5; `ja-c-527`→JA3; `ja-te-morau`→`ja-s3-l3`; `ja-te-kureru`→`ja-s4-l3`; `ja-te-itadaku`→`ja-s4-l5`; `legacy-165-ja`,`legacy-164-ja`→`ja-s3-l3`; `35e1b-ja-x-alternative-repair-expr`→`ja-s4-l5`; `35e1b-ja-x-hotel-quiet-room-expr`→`ja-s4-l6` |

## 10. Dialogue and scenario readiness

| New slot | Requirement | DRAFT — HUMAN APPROVAL REQUIRED outline |
|---|---|---|
| EN2 | Short scenario sufficient | Two colleagues compare two delivery plans against cost, staffing, and risk; each concedes one benefit and states one limitation. |
| EN3 | New dialogue required | Six turns: state priorities → identify resource conflict → disagree politely → propose allocation → test feasibility → confirm consensus. |
| EN6 | Existing dialogue reusable | Reuse `35e1b-en-d-misunderstanding-tone-expr`; add controlled prompts distinguishing clarification, rephrasing, and non-blaming intent. |
| EN8 | Short scenario sufficient | A staff member reports a delay, labels two observations, and identifies one inference that still needs evidence. |
| JA3 | New dialogue required | Six turns in a hotel/service role: customer statement → staff acknowledges with `おっしゃる` → staff states own action with `いたす` → confirmation → correction → close. Must wait for Hotfix 03. |
| JA6 | Existing dialogue reusable | Reuse `35e1b-ja-d-misunderstanding-tone-expr`; prompt learners to separate fact, inference, and intent without blame. |
| JA7 | New dialogue required | Six turns: name priority → state concern → compare trade-off → propose resource allocation → soften normative judgment → reach agreement. |
| JA8 | Existing dialogue reusable | Reuse the two Stage 3 request expressions and two Stage 4 service expressions; contrast who benefits and who performs the action. |

Totals for eight new slots: **3 new dialogues, 3 existing dialogues/expression sets reusable, 2 short scenarios sufficient**.

## 11. Practice readiness and density

Opportunity estimate follows the established planning model: 3 per vocabulary link, 2 per practice-eligible grammar link, plus 1 where controlled completion is safe. Required-items remains capped at 5. Blocked grammar still exists canonically and is currently eligible, but is excluded from the unblocked figure.

| Slot | V/G/E | Assessable design / unblocked | Safe CC design / unblocked | Opportunities after approval / currently unblocked | Required items | Readiness |
|---|---:|---:|---:|---:|---:|---|
| EN1 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR vocabulary examples |
| EN2 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples |
| EN3 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples |
| EN4 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples |
| EN5 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | Ready after relationship approval |
| EN6 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples |
| EN7 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples |
| EN8 | 8/3/4 | 11/11 | 2/2 | 32/32 | 5 | Reported statements intentionally has no CC |
| JA1 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR vocabulary examples |
| JA2 | 8/3/4 | 11/9 | 3/1 | 33/27 | 5 | BLOCKED: two grammar links |
| JA3 | 8/3/4 | 11/9 | 3/1 | 33/27 | 5 | BLOCKED: two grammar links |
| JA4 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples |
| JA5 | 8/3/4 | 11/10 | 3/2 | 33/30 | 5 | BLOCKED: one grammar link |
| JA6 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples/context |
| JA7 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | RR examples/register |
| JA8 | 8/3/4 | 11/11 | 3/3 | 33/33 | 5 | Review-consolidation lesson |

Practice range after all approvals is **32–33 opportunities per lesson**. Before Hotfix 03, JA2 and JA3 remain below 30 unblocked opportunities and therefore cannot ship; JA5 is exactly 30 but still cannot ship with a blocked link.

## 12. Projected Stage 5 profile

| Measure | English final | Japanese final | Decision |
|---|---:|---:|---|
| Lessons / authored minutes | 8 / 120 | 8 / 120 | Meets fixed target |
| Relationship-level vocabulary levels L1/L2/L3/L4/L5/L6 | 5/10/5/29/15/0 | 8/17/10/21/8/0 | L4–5 rises to 68.8% EN and 45.3% JA; no JA L6 vocabulary |
| Relationship-level grammar levels L1/L2/L3/L4/L5/L6 | 0/4/4/11/5/0 | 0/1/9/9/4/1 | Foundational forms are explicit review/support; existing `ja-kanenai` is the single L6 grammar |
| Expression difficulty D1/D2/D3/D4/D5/D6 | 0/0/1/25/6/0 | 0/2/6/21/3/0 | Concentrated at D4–5 without relabeling |
| Unique V/G/E in proposed Stage 5 | 46/15/26 | 39/21/30 | Relationship count is not misreported as unique coverage |
| Roles N/R/S | 53/40/27 | 51/42/27 | Both languages individually remain near the approved bands |

Combined role mix is **104 NEW (43.3%) / 82 REVIEW (34.2%) / 54 SUPPORT (22.5%)**, within the requested 40–55 / 25–35 / 15–25 percent bands. REVIEW is distributed across all slots and is not concentrated only at the end.

Combined link-status mix is **155 APPROVE / 80 REVIEW REQUIRED / 5 BLOCKED / 0 DO NOT ADD in the final set**. The disposition ledger contains **19 additional DO NOT ADD current relationships**, so the complete decision ledger covers 259 decisions.

### Vocabulary-band comparison

The reviewed bands exclude L1/L2 from their named targets but do not forbid foundational review. The exact matrix does **not** silently claim to meet every band:

| Language | Band | Projected relationship share | Result |
|---|---|---:|---|
| EN | L3 20–30% | 5/64 = 7.8% | BELOW BAND |
| EN | L4 40–50% | 29/64 = 45.3% | WITHIN BAND |
| EN | L5 20–30% | 15/64 = 23.4% | WITHIN BAND |
| EN | L6 0–5% | 0/64 = 0% | WITHIN BAND |
| JA | L3 25–35% | 10/64 = 15.6% | BELOW BAND |
| JA | L4 40–50% | 21/64 = 32.8% | BELOW BAND |
| JA | L5 15–25% | 8/64 = 12.5% | BELOW BAND |
| JA | L6 0–5% | 0/64 = 0% | WITHIN BAND |

The miss comes from retained lesson cores and the semantically necessary lower-level vocabulary in the Japanese request and giving/receiving lessons. Replacing those with unrelated high-level words merely to hit a percentage would violate semantic fit. Human approval must explicitly choose either this semantic-first exception or another relationship-level revision; the matrix is approval-ready, not pre-approved.

## 13. Bilingual parity

| Dimension | English | Japanese | Parity decision |
|---|---:|---:|---|
| Lessons / authored minutes | 8 / 120 | 8 / 120 | Exact parity |
| Communicative outcomes | 8 | 8 | Exact count; language-specific functions retained |
| Assessable relationship breadth | 88 | 88 | Exact parity after approval |
| Roles N/R/S | 53/40/27 | 51/42/27 | Comparable and within combined bands |
| Vocabulary sentence debt | 24 unique | 16 unique | EN carries more lexical authoring |
| Grammar example debt | 5 records / 15 examples | 8 records / 24 examples | JA carries more grammar authoring and all blockers |
| Expression context debt | 1 | 1 | Exact parity |
| Final practice range | 32–33 | 33 | Comparable; JA currently 27–33 before blocker fixes |
| Dialogues/scenarios for new slots | 1 new / 1 reuse / 2 scenarios | 2 new / 2 reuse / 0 scenarios | More multi-turn register work is justified in JA |

Parity is therefore equivalent in time and assessable breadth, not literal topic or grammar symmetry.

## 14. Prerequisite design

No edge is changed here. The only proposed future mandatory order is linear:

`en-s4-l6 → EN1 → EN2 → EN3 → EN4 → EN5 → EN6 → EN7 → EN8 → current en-s6-l1`

`ja-s4-l6 → JA1 → JA2 → JA3 → JA4 → JA5 → JA6 → JA7 → JA8 → current ja-s6-l1`

This is a reorder/edge-replacement proposal only. New successor edges would replace the bypassing edge rather than create optional branches. Future implementation must prove connectedness, acyclicity, one root per language, language isolation, and no Stage 5 bypass. No Stage 6 design or Stage 6 content change is authorized.

## 15. Exact implementation envelope if approved later

Current Stage 5 has 61 links per language. The final design has 120 per language.

| Delta | English | Japanese | Combined |
|---|---:|---:|---:|
| Current relationships retained | 51 | 52 | 103 |
| Current relationships removed (`DNA`) | 10 | 9 | 19 |
| Proposed relationships added | 69 | 68 | 137 |
| Net relationship growth | +59 | +59 | +118 |
| Added V/G/E | 38/13/18 | 35/15/18 | 73/28/36 |
| New-slot relationships | 60 | 60 | 120 |
| Existing-lesson additions | 9 | 8 | 17 |
| New lessons | 4 | 4 | 8 |

Content workload is also bounded:

- 40 vocabulary lesson-example approvals: 24 EN + 16 JA.
- 39 grammar examples across 13 selected one-example records: 13 seed drafts here + 26 additional examples to author.
- 2 expression-context additions.
- 3 new six-turn dialogues; 3 existing dialogue/expression sets reused; 2 short scenarios.
- 4 canonical grammar corrections in Hotfix 03, affecting 5 Stage 5 links.
- 8 draft lesson titles/objectives/IDs plus refocused objectives for 4 existing lessons.
- One later prerequisite replacement chain per language, subject to graph validation.

No implementation batch is ready while any `RR` or `B` item is unresolved. The strictly relationship-ready subset is 155/240, but even those links require whole-matrix human approval before coding.

## 16. Human approval checklist

- [ ] Approve all 16 slot outcomes and bilingual titles.
- [ ] Approve the exact 240-link final set and the 19 `DO NOT ADD` dispositions.
- [ ] Approve every relationship role and the 104/82/54 role mix.
- [ ] Approve the 40 vocabulary sentence drafts, meanings, lesson placement, and register.
- [ ] Approve the 13 grammar seed drafts and authorize authoring the remaining 26 examples.
- [ ] Approve the two expression context drafts.
- [ ] Approve the three new dialogue outlines and five reuse/scenario decisions.
- [ ] Approve the exact `ja-n-desu-ga` learner-facing model.
- [ ] Approve removing `/ て-form` from the `ja-node` model.
- [ ] Approve narrowing `ja-honorific` to `言う → おっしゃる`.
- [ ] Approve narrowing `ja-humble` to `する → いたす`.
- [ ] Confirm `35e1c-ja-workplace-register` and `35e1c-ja-condition-contrast` remain overview-only and practice-ineligible.
- [ ] Approve the projected 32–33 opportunity range and controlled-completion exceptions.
- [ ] Approve the linear Stage 5 order; prerequisite mutation remains separately authorized work.
- [ ] Confirm no Stage 6 design/content change is included.
- [ ] Authorize a separate Hotfix 03 implementation only after the four blocker decisions are approved.
- [ ] Authorize a separate Stage 5 implementation only after Hotfix 03 and all `RR` items are resolved.

## 17. Final report

1. Stage 5–6 audit docs commit: `d9075c38799101d65b6d144368d9584967e4ab5b`.
2. Resulting synchronized `main` hash: `d9075c38799101d65b6d144368d9584967e4ab5b`.
3. EN Stage 5 final slot count: 8.
4. JA Stage 5 final slot count: 8.
5. New lesson slots proposed: 8 total, 4 EN + 4 JA.
6. Exact proposed vocabulary-link count: 128.
7. Exact proposed grammar-link count: 48.
8. Exact proposed expression-link count: 64.
9. `APPROVE` count: 155 final-set links.
10. `REVIEW REQUIRED` count: 80 final-set links.
11. `BLOCKED` count: 5 final-set links.
12. `DO NOT ADD` count: 19 disposition-only current relationships; 0 in the final 240-link set.
13. Vocabulary needing new examples: 40 unique records, 24 EN + 16 JA; 40 draft sentences supplied.
14. Expressions needing context: 2 unique records; 2 draft contexts supplied.
15. Exact Hotfix 03 grammar blockers: `ja-n-desu-ga`, `ja-node`, `ja-honorific`, `ja-humble`; `ja-node` accounts for two of the five blocked links.
16. Projected role mix: 104 NEW / 82 REVIEW / 54 SUPPORT = 43.3% / 34.2% / 22.5%.
17. Projected internal-level profile: EN V L1–6 = 5/10/5/29/15/0; JA V = 8/17/10/21/8/0; no new JA L6 vocabulary. EN meets the L4/L5/L6 bands but is below L3; JA is below L3/L4/L5 and meets L6. The semantic-first exception requires explicit human approval; full grammar/expression profiles are in Section 12.
18. Projected assessable/opportunity range: 11 assessable and required-items 5 in every slot; 32–33 opportunities after approval. Current unblocked range is 27–33 because JA2/JA3/JA5 contain blockers.
19. Prerequisite design: linear Stage 4 terminal → Stage 5 slots 1–8 → current Stage 6 entry; proposal only, no edge mutation.
20. New dialogue/scenario requirement: 3 new six-turn dialogues / 3 reusable dialogue sets / 2 short scenarios.
21. Bounded implementation delta: +137 relationships, −19 relationships, net +118; added V/G/E 73/28/36; 8 new lessons.
22. Document path: `docs/STAGE-5-EXPANSION-02A-APPROVAL-MATRIX.md`.
23. Curriculum/D1/deploy confirmation: no curriculum, canonical data, lesson, relationship, role, prerequisite, migration, learner-state, D1, deployment, branch, or remote runtime change was made.
24. **READY FOR HUMAN APPROVAL: YES. READY FOR IMPLEMENTATION: NO.**

## Safety confirmation

Only this planning document was added after the baseline docs-only commit. No curriculum bundle, canonical vocabulary/grammar/expression data, lesson record, relationship, prerequisite, migration, application code, learner evidence, D1 database, deployment configuration, branch, or remote runtime state was changed. All SQLite access was read-only.
