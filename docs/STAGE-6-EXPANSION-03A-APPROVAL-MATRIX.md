# EJ Learning — Stage 6 Expansion 03A Final Relationship Approval Matrix

**Review date:** 2026-09-16

**Baseline commit:** `be8d769a8b87f7b9f48f2593d48576c62f6a7d4d`

**Current bundle:** `curriculum-stage5-expansion-02-v1`

**Current marker:** `2026-09-stage5-expansion-02-v1`

**Authority:** final human-review relationship selection; editorial production and implementation remain unauthorized

## 1. Authority and baseline

The Stage 6 design audit was committed and pushed first as `be8d769a8b87f7b9f48f2593d48576c62f6a7d4d`. `main`, `HEAD`, and `origin/main` then matched and the worktree was clean.

This review answers only whether each published canonical ID belongs in a specific proposed Stage 6 lesson, with what instructional role, and with what future editorial dependency. It does not approve or author examples, contexts, dialogues, prompt layers, scenarios, curriculum mutations, or learner-state changes. `RELATIONSHIP APPROVED` is not implementation authorization.

Definitions:

- **READY**: canonical relationship fit and existing editorial support are sufficient for later payload assembly.
- **EDITORIAL REQUIRED**: relationship fit is approved, but a lesson example, grammar examples, or strict context must be produced and separately approved.
- **REVIEW source**: an exact Stage 1–5 lesson containing the same canonical ID; intra-Stage-6 reuse is SUPPORT.
- **Safe opportunities**: three vocabulary modes, two grammar modes, plus controlled completion only where current sentence-local authority supports it. No new CC is assumed.

## 2. Six-slot decision

**APPROVED:** exactly six 15-minute Stage 6 lessons per language, approximately 90 authored minutes, comprising four existing lessons and two new proposed lessons. The sequence remains the design-audit sequence. No source contradiction requires eight lessons or a parallel branch.

English:

1. `en-s6-l1` — qualified evidence-led argument.
2. `en-s6-l2` — counterfactual consequences and counter-position.
3. `PROPOSED-EN-S6-03-SYNTHESIS` — reported information, evidence, and inference.
4. `PROPOSED-EN-S6-04-ACCOUNTABILITY` — competing demands, accountability, and mitigation.
5. `en-s6-l3` — pressure-free formal commitments.
6. `en-s6-l4` — reflective accountable next action; terminal.

Japanese:

1. `ja-s6-l1` — structured evidence and reasoning.
2. `ja-s6-l2` — qualified cautious judgment.
3. `PROPOSED-JA-S6-03-REPORTING` — embedded/reporting language and conditional decision.
4. `PROPOSED-JA-S6-04-ACCOUNTABILITY` — contingency, accountability, and formal register.
5. `ja-s6-l4` — considerate formal commitments.
6. `ja-s6-l3` — reflective accountable next action; terminal.

## 3. Starting candidate ledger and final selection

The design-audit ledger reparses exactly as expected:

| Measure | Count |
|---|---:|
| English candidate positions | 90 |
| Japanese candidate positions | 90 |
| APPROVE | 102 |
| REVIEW REQUIRED | 76 |
| BLOCKED | 2 |
| **Total** | **180** |

Final human review removes three weak or redundant positions without replacement:

| Candidate | Decision | Reason |
|---|---|---|
| EN5 `en-would-like` REVIEW | **DO NOT ADD** | Adds no unique Stage 6 transfer beyond `en-if-request`, `en-will`, commitment vocabulary, and pressure-control assets; its broad like/love/prefer model is unnecessary risk. |
| EN6 `looking-forward-en` SUPPORT | **DO NOT ADD** | “I look forward to tomorrow” is too basic and insufficiently accountable for the terminal capstone; EN6 remains healthy with three expressions. |
| JA2 `ja-c-699` NEW | **DO NOT ADD** | `仮` / `仮の予定` duplicates the clearer formal `ja-c-815` 暫定的 / 暫定的な結論 and does not sharpen cautious judgment. |

Final relationship selection: **EN 88 + JA 89 = 177 approved positions**. Final position disposition counts are **103 READY, 74 EDITORIAL REQUIRED, 0 BLOCKED, and 3 DO NOT ADD**.

## 4. Blocker review

### `en-would-like` — REMOVE FROM STAGE 6

Current model:

- title: 礼貌愿望与邀请;
- `form_name`: `would like / love / prefer`;
- formula: `would like / love / prefer + noun / to-infinitive`;
- nine examples span request, invitation, enthusiasm, and comparative preference;
- current use: SUPPORT in `en-s1-l2`, REQUIRED in `en-s6-l3`;
- form selection and typed recall require the entire slash-separated `form_name` exactly;
- no approved completion-authority row exists; legacy displayed forms vary among `I’d like`, `Would you like...`, `I'd love to...`, and `I'd prefer...`.

The examples explain the semantic differences, but the single recall authority collapses three constructions and multiple complements. That is a real model-scope concern. EN5 already has the bounded mechanisms `en-if-request` and `en-will`, plus `commit`, `intention`, `considerate`, pressure vocabulary, and four contextual expressions. Removing this relationship leaves 8 V / 2 G / 4 E, ten assessable items, and approximately 29 safe opportunities—healthy for a pragmatic transfer lesson. Decision: **C. REMOVE FROM STAGE 6 / DO NOT ADD**. No replacement and no Hotfix 04 dependency.

### `ja-kamoshirenai` — RETAIN AS-IS

Current model:

- title: 不确定的可能性;
- `form_name`: `〜かもしれない`;
- formula: `plain form + かもしれない`;
- core: 保留判断，承认某种可能;
- eight examples cover affirmative, negative, verb, noun, ability, comparison, and polite/plain endings;
- current use: REQUIRED only in current `ja-s6-l4`;
- form selection and typed recall use the single bounded authority `〜かもしれない`;
- no explicit completion-authority row exists; current sentence-link fallback is deterministic but need not be expanded.

Its function is distinct: `ja-youda` marks inference from indirect evidence; `ja-wake-dewa-nai` rejects an overstrong inference; `ja-kamoshirenai` directly marks unresolved possibility. The English phrase “plain form” in the explanatory formula is a terminology cleanup candidate, not ambiguity in the assessed answer. The bounded form, varied examples, explicit noun warning, and narrow purpose are safe for the planned relationship. Decision: **B. RETAIN AS-IS — SAFE / RELATIONSHIP APPROVED — READY**. Do not create new CC authority automatically.

## 5. Hotfix 04 decision

**HOTFIX 04 REQUIRED: NO.**

`en-would-like` is removed from the Stage 6 matrix, so this release does not depend on repairing its broad canonical model. `ja-kamoshirenai` has a bounded assessed form and is safe as-is; its formula terminology can remain ordinary non-blocking content-quality debt. No unrelated Audit 02 record is pulled into this decision.

## 6. Japanese L6 vocabulary decision

The published Japanese L6 pool remains narrow: 21 formal records, all with one collocation example. Metadata level is not selection authority.

| Record | Comparison and usefulness | Decision |
|---|---|---|
| `ja-c-859` 不測の事態 | Natural professional phrase for an unforeseen contingency; more precise than generic `問題`/`変更` and directly required by JA4. Current `不測の事態に備える` collocation is valid but insufficient as a lesson sentence. Register burden is intentional and limited to the accountability slot. | **RELATIONSHIP APPROVED — NEEDS EXAMPLE** |
| `ja-c-871` 説明責任 | Natural professional term for accountability to explain decisions/outcomes; L4/L5 responsibility language does not express this institutional concept as precisely. Current `説明責任を果たす` collocation is valid but insufficient. Use only in the formal JA4 role, not as a general synonym for blame. | **RELATIONSHIP APPROVED — NEEDS EXAMPLE** |

Both clarify the slot rather than merely making it more formal. Human review must still compare the eventual sentences against plainer L4/L5 wording before canonical approval. All other rejected specialist Japanese L6 vocabulary remains **DO NOT ADD**.

## 7. English high-level vocabulary decisions

| Record | Semantic/register decision | Final disposition |
|---|---|---|
| `en-c-817` substantiate | Precisely distinguishes supporting a claim with evidence from merely reporting it in EN3; one formal item is proportionate. | RELATIONSHIP APPROVED — NEEDS EXAMPLE |
| `en-c-857` contingency | Names the unforeseen condition around which EN4 plans; exact outcome fit. | RELATIONSHIP APPROVED — NEEDS EXAMPLE |
| `en-c-825` mitigate | Expresses reducing an adverse impact, not just changing a plan; exact accountability-transfer fit. | RELATIONSHIP APPROVED — NEEDS EXAMPLE |
| `en-c-869` accountability | Names the explanation/ownership obligation central to EN4; restrict to professional use. | RELATIONSHIP APPROVED — NEEDS EXAMPLE |

`falsifiable`, `extrapolate`, `reciprocity`, and `convergence` remain **DO NOT ADD**. No source evidence justifies reopening them for this general capstone.

## 8. Slot-1 NEW-load review

EN1 and JA1 each remain at 9 NEW / 3 REVIEW / 3 SUPPORT, or 60% NEW.

**EN1 — 60% NEW EXCEPTION APPROVED.** The three grammar forms carry distinct functions (formal emphasis, background compression, bounded comparison), while their two expression relationships instantiate rather than add separate conceptual systems. Four new vocabulary relationships supply analysis/criteria rather than academic ornament. REVIEW and SUPPORT supply the known evidence/context spine.

**JA1 — 60% NEW EXCEPTION APPROVED.** The three L6 forms are the current lesson’s genuine structured-reasoning spine, and the two expression relationships instantiate those forms. The four new L4/5 words provide evidence, criterion, substantiation, and analysis. Known `絞る`, `判断`, `範囲`, and `招く` prevent the lesson from becoming an isolated list. Both slots require one coherent short scenario before production approval.

## 9. Final English relationship matrix

| Slot | Canonical ID | Type | Role | Exact prior source | Final disposition | Editorial dependency | Semantic/register rationale |
|---:|---|---|---|---|---|---|---|
| 1 | `en-c-757` | Vocabulary | REVIEW | `en-s5-08-reporting` | READY | None | evidence (neutral) reapplies an earlier item under changed demand for evidence-led qualified argument; 证据 |
| 1 | `en-c-1093` | Vocabulary | NEW | — | READY | None | report (neutral) introduces the slot-specific mechanism for evidence-led qualified argument; 报告 |
| 1 | `en-c-729` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | analyse (formal) introduces the slot-specific mechanism for evidence-led qualified argument; 分析 |
| 1 | `en-c-709` | Vocabulary | SUPPORT | — | READY | None | accurate (neutral) scaffolds the task without adding a new target for evidence-led qualified argument; 准确的 |
| 1 | `en-c-801` | Vocabulary | SUPPORT | — | READY | None | relevant (neutral) scaffolds the task without adding a new target for evidence-led qualified argument; 相关的 |
| 1 | `en-c-733` | Vocabulary | REVIEW | `en-s5-l4` | READY | None | justify (formal) reapplies an earlier item under changed demand for evidence-led qualified argument; 说明正当理由 |
| 1 | `en-c-777` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | criterion (formal) introduces the slot-specific mechanism for evidence-led qualified argument; 判断标准 |
| 1 | `en-c-741` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | assess (formal) introduces the slot-specific mechanism for evidence-led qualified argument; 评定 |
| 1 | `en-inversion` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | Rarely + auxiliary + subject + verb (formal) introduces the slot-specific mechanism for evidence-led qualified argument; 否定副词前置倒装 |
| 1 | `en-participle-clause` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | Having + past participle, main clause (formal) introduces the slot-specific mechanism for evidence-led qualified argument; 分词补充背景 |
| 1 | `en-qualified-comparison` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | more ... in terms of X, but ... (formal) introduces the slot-specific mechanism for evidence-led qualified argument; 限制比较结论 |
| 1 | `lesson-en-inversion-ex` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | Rarely do we see such a clear result. (neutral) introduces the slot-specific mechanism for evidence-led qualified argument; 正式强调，助动词置于主语前；普通陈述不必倒装。 |
| 1 | `lesson-en-participle-clause-ex` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | Having checked the figures, we revised the report. (neutral) introduces the slot-specific mechanism for evidence-led qualified argument; 分词隐含主语应与主句一致，避免悬垂分词。 |
| 1 | `academic-approach-en` | Expression | SUPPORT | — | READY | READY CONTEXT | This approach might help, but I expect practical difficulties. (neutral) scaffolds the task without adding a new target for evidence-led qualified argument |
| 1 | `legacy-49-en` | Expression | REVIEW | `en-s5-03-consensus` | READY | SCENARIO-COVERED | I see your point, but I have a concern. (neutral) reapplies an earlier item under changed demand for evidence-led qualified argument; I see your point 表示理解理由，未必同意；日语おっしゃる是对对方说话的尊敬表达。 |
| 2 | `en-c-761` | Vocabulary | REVIEW | `en-s5-08-reporting` | READY | None | assumption (formal) reapplies an earlier item under changed demand for counterfactual reasoning and counter-position; 假定 |
| 2 | `en-c-769` | Vocabulary | SUPPORT | — | READY | None | limitation (formal) scaffolds the task without adding a new target for counterfactual reasoning and counter-position; 局限 |
| 2 | `en-c-773` | Vocabulary | SUPPORT | — | READY | None | perspective (formal) scaffolds the task without adding a new target for counterfactual reasoning and counter-position; 视角 |
| 2 | `en-c-1109` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | condition (neutral) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 条件 |
| 2 | `en-c-681` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | judgment (neutral) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 判断 |
| 2 | `en-c-645` | Vocabulary | SUPPORT | — | READY | None | alternative (neutral) scaffolds the task without adding a new target for counterfactual reasoning and counter-position; 替代选项 |
| 2 | `en-c-697` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | tentative (formal) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 暂定的 |
| 2 | `en-c-765` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | implication (formal) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 可能的影响或含义 |
| 2 | `en-mixed-conditional` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | If + past perfect, would + base verb (formal) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 过去条件影响现在 |
| 2 | `en-second-conditional` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | If + past, would + base verb (neutral) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 假设现在的不同情况 |
| 2 | `en-third-conditional` | Grammar | REVIEW | `en-s5-l1` | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | If + past perfect, would have + participle (formal) reapplies an earlier item under changed demand for counterfactual reasoning and counter-position; 假设不同的过去 |
| 2 | `lesson-en-mixed-conditional-ex` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | If I had accepted the offer, I would live abroad now. (neutral) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 过去未实现条件带来现在的假设结果；两部分时间不同。 |
| 2 | `lesson-en-second-conditional-ex` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | If I had more time, I would learn Japanese. (neutral) introduces the slot-specific mechanism for counterfactual reasoning and counter-position; 过去形式标示距离现实，不自动是过去时间。 |
| 2 | `legacy-145-en` | Expression | SUPPORT | — | READY | SCENARIO-COVERED | It's not really my thing, but I see the appeal. (neutral) scaffolds the task without adding a new target for counterfactual reasoning and counter-position; not my thing 是个人不感兴趣；see the appeal 承认吸引力，避免评价成作品不好。 |
| 2 | `legacy-108-en` | Expression | SUPPORT | — | READY | READY CONTEXT | Regardless of the forecast, we should have a backup plan. (neutral) scaffolds the task without adding a new target for counterfactual reasoning and counter-position; 例：Regardless of the forecast, we should have a backup plan.／予報にかかわらず、別の案も用意したほうがいいです。of 后接名词。 |
| 3 | `en-c-757` | Vocabulary | REVIEW | `en-s5-08-reporting` | READY | None | evidence (neutral) reapplies an earlier item under changed demand for source synthesis; 证据 |
| 3 | `en-c-1093` | Vocabulary | SUPPORT | — | READY | None | report (neutral) scaffolds the task without adding a new target for source synthesis; 报告 |
| 3 | `en-c-737` | Vocabulary | REVIEW | `en-s5-08-reporting` | READY | None | clarify (formal) reapplies an earlier item under changed demand for source synthesis; 澄清 |
| 3 | `en-c-633` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | distinguish (neutral) introduces the slot-specific mechanism for source synthesis; 区分 |
| 3 | `en-c-637` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | confirm (neutral) introduces the slot-specific mechanism for source synthesis; 确认属实 |
| 3 | `en-c-805` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | ambiguous (formal) introduces the slot-specific mechanism for source synthesis; 有歧义的 |
| 3 | `en-c-841` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | infer (formal) introduces the slot-specific mechanism for source synthesis; 推断 |
| 3 | `en-c-817` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | substantiate (formal) introduces the slot-specific mechanism for source synthesis; 用证据证实 |
| 3 | `35e1c-en-reported-statements` | Grammar | REVIEW | `en-s5-08-reporting` | READY | None | said/told + (that) clause (neutral) reapplies an earlier item under changed demand for source synthesis; 用 said 或 told 转述他人的信息，并明确接收者。 |
| 3 | `en-concessive-although` | Grammar | REVIEW | `en-s5-03-consensus` | READY | None | although + clause, main clause (neutral) reapplies an earlier item under changed demand for source synthesis; 承认事实再转折 |
| 3 | `en-hedged-claim` | Grammar | REVIEW | `en-s5-08-reporting` | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | evidence suggests that + clause (formal) reapplies an earlier item under changed demand for source synthesis; 谨慎提出论断 |
| 3 | `35e1b-en-d-group-disagree-expr` | Expression | REVIEW | `en-s5-03-consensus` | READY | DIALOGUE-COVERED | I think we should focus on the survey results. I see your point, but the interviews explain why the results changed. Are you suggesting we include both? Yes, but we could shorten the background section. That sounds reasonable. Let’s keep one paragraph of background. Great. I’ll revise the outline. (neutral) reapplies an earlier item under changed demand for source synthesis; 交际目标：表达不同意见并达成折中。 |
| 3 | `35e1b-en-d-misunderstanding-tone-expr` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | Your comment in the meeting sounded quite critical. I’m sorry. I was questioning the schedule, not your work. Thanks for explaining. I thought you were blaming me. I can see why it sounded that way. Could we talk about the schedule again tomorrow? Of course. I’ll be clearer next time. (neutral) scaffolds the task without adding a new target for source synthesis; 交际目标：解释语气并修复关系。 |
| 3 | `35e1b-en-x-clarify-in-other-words-expr` | Expression | REVIEW | `en-s5-06-repair` | READY | SCENARIO-COVERED | So, in other words, we need to start over? (neutral) reapplies an earlier item under changed demand for source synthesis; 可复用核心表达块。 |
| 3 | `35e1b-en-x-repair-tone-expr` | Expression | SUPPORT | — | READY | SCENARIO-COVERED | That came out more strongly than I intended. (neutral) scaffolds the task without adding a new target for source synthesis; 可复用核心表达块。 |
| 4 | `en-c-653` | Vocabulary | REVIEW | `en-s5-03-consensus` | READY | None | priority (neutral) reapplies an earlier item under changed demand for accountability negotiation; 优先事项 |
| 4 | `en-c-785` | Vocabulary | REVIEW | `en-s5-03-consensus` | READY | None | trade-off (formal) reapplies an earlier item under changed demand for accountability negotiation; 取舍关系 |
| 4 | `en-c-781` | Vocabulary | REVIEW | `en-s5-03-consensus` | READY | None | consensus (formal) reapplies an earlier item under changed demand for accountability negotiation; 共识 |
| 4 | `en-c-621` | Vocabulary | SUPPORT | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | commit (neutral) scaffolds the task without adding a new target for accountability negotiation; 承诺投入 |
| 4 | `35e1c-en-v086` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | take responsibility (neutral) introduces the slot-specific mechanism for accountability negotiation; 承担责任 |
| 4 | `en-c-857` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | contingency (formal) introduces the slot-specific mechanism for accountability negotiation; 意外情况 |
| 4 | `en-c-825` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | mitigate (formal) introduces the slot-specific mechanism for accountability negotiation; 减轻不利影响 |
| 4 | `en-c-869` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | accountability (formal) introduces the slot-specific mechanism for accountability negotiation; 说明责任 |
| 4 | `en-regardless` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | regardless of + noun / wh-clause (formal) introduces the slot-specific mechanism for accountability negotiation; 不受条件影响 |
| 4 | `35e1c-en-obligation-contrast` | Grammar | REVIEW | `en-s4-l5` | READY | None | must; have to; do not have to (neutral) reapplies an earlier item under changed demand for accountability negotiation; 区分说话者强调的义务、外部规定和没有必要。 |
| 4 | `en-should-have` | Grammar | REVIEW | `en-s5-l4` | READY | None | should have + past participle (neutral) reapplies an earlier item under changed demand for accountability negotiation; 回顾过去的更好选择 |
| 4 | `legacy-61-en` | Expression | REVIEW | `en-s5-03-consensus` | READY | SCENARIO-COVERED | Could we rethink how we split the chores? (neutral) reapplies an earlier item under changed demand for accountability negotiation; we 把问题放到共同安排上；見直す是重新审视，并非只是再看一眼。 |
| 4 | `legacy-63-en` | Expression | NEW | — | READY | DIALOGUE-COVERED | A: I hate to bother you, but the noise carries. B: Sorry, I didn't realize. We'll keep it down. (neutral) introduces the slot-specific mechanism for accountability negotiation; noise carries 指声音传得远；日语用響く。I hate to bother you 是礼貌铺垫，并非真的讨厌这个人。 |
| 4 | `35e1b-en-d-group-disagree-expr` | Expression | REVIEW | `en-s5-03-consensus` | READY | DIALOGUE-COVERED | I think we should focus on the survey results. I see your point, but the interviews explain why the results changed. Are you suggesting we include both? Yes, but we could shorten the background section. That sounds reasonable. Let’s keep one paragraph of background. Great. I’ll revise the outline. (neutral) reapplies an earlier item under changed demand for accountability negotiation; 交际目标：表达不同意见并达成折中。 |
| 4 | `legacy-75-en` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: Could we keep that afternoon flexible? B: Sure. Let me know once your plans firm up. (neutral) scaffolds the task without adding a new target for accountability negotiation; firm up 指安排逐渐确定；日语予定が固まる也是确定下来，不是计划变坚硬。 |
| 5 | `en-c-621` | Vocabulary | REVIEW | `en-s5-06-repair` | EDITORIAL REQUIRED | NEEDS EXAMPLE | commit (neutral) reapplies an earlier item under changed demand for pressure-free commitment; 承诺投入 |
| 5 | `en-c-617` | Vocabulary | SUPPORT | — | READY | None | adjust (neutral) scaffolds the task without adding a new target for pressure-free commitment; 调整 |
| 5 | `en-c-641` | Vocabulary | SUPPORT | — | READY | None | postpone (neutral) scaffolds the task without adding a new target for pressure-free commitment; 推迟 |
| 5 | `en-c-1085` | Vocabulary | SUPPORT | — | READY | None | up in the air (neutral) scaffolds the task without adding a new target for pressure-free commitment; 尚未确定 |
| 5 | `en-c-2247` | Vocabulary | REVIEW | `en-s4-l2` | EDITORIAL REQUIRED | NEEDS EXAMPLE | considerate (neutral) reapplies an earlier item under changed demand for pressure-free commitment; 在社交中注意分寸、为他人考虑 |
| 5 | `en-c-669` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | pressure (neutral) introduces the slot-specific mechanism for pressure-free commitment; 压力 |
| 5 | `en-c-677` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | intention (neutral) introduces the slot-specific mechanism for pressure-free commitment; 意图 |
| 5 | `en-leave` | Vocabulary | SUPPORT | — | READY | None | leave (neutral) scaffolds the task without adding a new target for pressure-free commitment; 离开 |
| 5 | `en-if-request` | Grammar | REVIEW | `en-s5-06-repair` | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | If + present clause, could you ...? (neutral) reapplies an earlier item under changed demand for pressure-free commitment; 先确认条件再请求 |
| 5 | `en-will` | Grammar | SUPPORT | — | READY | None | will + base verb (neutral) scaffolds the task without adding a new target for pressure-free commitment; 当场决定与承诺 |
| 5 | `35e1b-en-d-invitation-decline-expr` | Expression | NEW | — | READY | DIALOGUE-COVERED | Would you like to have dinner on Friday? I’d love to, but I already have plans that evening. No problem. Are you free over the weekend? Sunday afternoon should work. How about coffee at three? Perfect. I’ll see you then. (neutral) introduces the slot-specific mechanism for pressure-free commitment; 交际目标：礼貌拒绝邀请并提出另约。 |
| 5 | `legacy-159-en` | Expression | REVIEW | `en-s4-l2` | READY | DIALOGUE-COVERED | A: Come on, stay for one more. B: Tempting, but I'll call it a night. (neutral) reapplies an earlier item under changed demand for pressure-free commitment; call it a night 指结束今晚活动；tempting 先承认诱人，拒绝仍有效。日语この辺で指适可而止的时点。 |
| 5 | `legacy-75-en` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: Could we keep that afternoon flexible? B: Sure. Let me know once your plans firm up. (neutral) scaffolds the task without adding a new target for pressure-free commitment; firm up 指安排逐渐确定；日语予定が固まる也是确定下来，不是计划变坚硬。 |
| 5 | `legacy-135-en` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: I know you mean well, but I feel pressured. B: I'm sorry. I'll give you some space. (neutral) scaffolds the task without adding a new target for pressure-free commitment; mean well 是出于好意；give someone space 指给自主和情绪空间，日语用そっとしておく。 |
| 6 | `en-c-1081` | Vocabulary | REVIEW | `en-s5-l4` | READY | None | turn out (neutral) reapplies an earlier item under changed demand for reflective next action; 结果是 |
| 6 | `en-c-533` | Vocabulary | SUPPORT | — | READY | None | result (neutral) scaffolds the task without adding a new target for reflective next action; 结果 |
| 6 | `en-c-773` | Vocabulary | REVIEW | `en-s5-08-reporting` | READY | None | perspective (formal) reapplies an earlier item under changed demand for reflective next action; 视角 |
| 6 | `en-c-725` | Vocabulary | REVIEW | `en-s5-08-reporting` | READY | None | evaluate (formal) reapplies an earlier item under changed demand for reflective next action; 评估 |
| 6 | `en-c-733` | Vocabulary | SUPPORT | — | READY | None | justify (formal) scaffolds the task without adding a new target for reflective next action; 说明正当理由 |
| 6 | `en-c-621` | Vocabulary | REVIEW | `en-s5-06-repair` | EDITORIAL REQUIRED | NEEDS EXAMPLE | commit (neutral) reapplies an earlier item under changed demand for reflective next action; 承诺投入 |
| 6 | `en-plan` | Vocabulary | SUPPORT | — | READY | None | plan (neutral) scaffolds the task without adding a new target for reflective next action; 计划；打算 |
| 6 | `en-c-797` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | significant (formal) introduces the slot-specific mechanism for reflective next action; 重要的；显著的 |
| 6 | `35e1c-en-perfect-vs-past` | Grammar | REVIEW | `en-s4-l5` | READY | None | have + participle vs past form (neutral) reapplies an earlier item under changed demand for reflective next action; 现在完成时连接现在；一般过去时把事件放在已结束的过去。 |
| 6 | `en-should-have` | Grammar | REVIEW | `en-s5-l4` | READY | None | should have + past participle (neutral) reapplies an earlier item under changed demand for reflective next action; 回顾过去的更好选择 |
| 6 | `en-plan-to` | Grammar | SUPPORT | — | READY | None | plan + to-infinitive (neutral) scaffolds the task without adding a new target for reflective next action; 说明准备采取的行动。 |
| 6 | `academic-approach-en` | Expression | SUPPORT | — | READY | READY CONTEXT | This approach might help, but I expect practical difficulties. (neutral) scaffolds the task without adding a new target for reflective next action |
| 6 | `legacy-108-en` | Expression | REVIEW | `en-s5-08-reporting` | READY | READY CONTEXT | Regardless of the forecast, we should have a backup plan. (neutral) reapplies an earlier item under changed demand for reflective next action; 例：Regardless of the forecast, we should have a backup plan.／予報にかかわらず、別の案も用意したほうがいいです。of 后接名词。 |
| 6 | `35e1b-en-d-group-disagree-expr` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | I think we should focus on the survey results. I see your point, but the interviews explain why the results changed. Are you suggesting we include both? Yes, but we could shorten the background section. That sounds reasonable. Let’s keep one paragraph of background. Great. I’ll revise the outline. (neutral) scaffolds the task without adding a new target for reflective next action; 交际目标：表达不同意见并达成折中。 |

## 10. Final Japanese relationship matrix

| Slot | Canonical ID | Type | Role | Exact prior source | Final disposition | Editorial dependency | Semantic/register rationale |
|---:|---|---|---|---|---|---|---|
| 1 | `ja-c-759` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 証拠 (neutral) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 证据 |
| 1 | `ja-c-779` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 基準 (neutral) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 判断标准 |
| 1 | `ja-c-819` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 裏付ける (formal) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 用证据证实 |
| 1 | `ja-c-731` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 分析する (neutral) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 分析 |
| 1 | `ja-c-607` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 絞る (neutral) reapplies an earlier item under changed demand for structured evidence and bounded conclusion; 缩小范围 |
| 1 | `ja-c-651` | Vocabulary | SUPPORT | — | READY | None | 範囲 (neutral) scaffolds the task without adding a new target for structured evidence and bounded conclusion; 范围 |
| 1 | `ja-c-683` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 判断 (neutral) reapplies an earlier item under changed demand for structured evidence and bounded conclusion; 判断 |
| 1 | `ja-c-3205` | Vocabulary | SUPPORT | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 招く (neutral) scaffolds the task without adding a new target for structured evidence and bounded conclusion; 招致 |
| 1 | `ja-ni-hoka-naranai` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 名词 + にほかならない (formal) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 强调本质判断 |
| 1 | `ja-ni-suginai` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 名词 + にすぎない (formal) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 仅限于此 |
| 1 | `ja-wo-fumaete` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 名词 + を踏まえて (formal) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 依据背景考虑 |
| 1 | `lesson-ja-wo-fumaete-ex` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | 結果を踏まえて、計画を見直します。 (neutral) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 正式讨论中以前项为判断基础，不表示逐字照办。 |
| 1 | `lesson-ja-ni-hoka-naranai-ex` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | これは努力の結果にほかなりません。 (neutral) introduces the slot-specific mechanism for structured evidence and bounded conclusion; 正式而强烈的断定；证据不足时应避免过强结论。 |
| 1 | `35e1b-ja-d-group-disagree-expr` | Expression | REVIEW | `ja-s5-07-consensus` | READY | DIALOGUE-COVERED | アンケートの結果を中心にしたほうがいいと思います。 言いたいことはわかりますが、インタビューが変化の理由を説明しています。 両方入れるということですか。 はい。ただ、背景の部分は短くできます。 それならよさそうです。背景は一段落だけ残しましょう。 では、私が構成を直します。 (neutral) reapplies an earlier item under changed demand for structured evidence and bounded conclusion; 交际目标：表达不同意见并达成折中。 |
| 1 | `legacy-49-ja` | Expression | SUPPORT | — | READY | SCENARIO-COVERED | おっしゃることはわかりますが、一つ気になる点があります。 (neutral) scaffolds the task without adding a new target for structured evidence and bounded conclusion; I see your point 表示理解理由，未必同意；日语おっしゃる是对对方说话的尊敬表达。 |
| 2 | `ja-c-3217` | Vocabulary | REVIEW | `ja-s3-l1` | EDITORIAL REQUIRED | NEEDS EXAMPLE | とはいえ (neutral) reapplies an earlier item under changed demand for cautious qualified judgment; 承认前述事实后补充限制或转折 |
| 2 | `ja-c-527` | Vocabulary | REVIEW | `ja-s5-08-benefit` | READY | None | 懸念 (formal) reapplies an earlier item under changed demand for cautious qualified judgment; 担忧之处 |
| 2 | `ja-c-715` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 妥当 (formal) introduces the slot-specific mechanism for cautious qualified judgment; 合理的 |
| 2 | `ja-c-735` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 正当化する (formal) introduces the slot-specific mechanism for cautious qualified judgment; 说明正当理由 |
| 2 | `ja-c-683` | Vocabulary | SUPPORT | — | READY | None | 判断 (neutral) scaffolds the task without adding a new target for cautious qualified judgment; 判断 |
| 2 | `ja-c-815` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 暫定的 (formal) introduces the slot-specific mechanism for cautious qualified judgment; 临时待定的 |
| 2 | `ja-c-631` | Vocabulary | SUPPORT | — | READY | None | 誤解する (neutral) scaffolds the task without adding a new target for cautious qualified judgment; 误解 |
| 2 | `ja-wake-dewa-nai` | Grammar | REVIEW | `ja-s5-06-repair` | READY | None | 普通形 + わけではない (neutral) reapplies an earlier item under changed demand for cautious qualified judgment; 否定推断 |
| 2 | `ja-kamoshirenai` | Grammar | NEW | — | READY | None | 〜かもしれない (neutral) introduces the slot-specific mechanism for cautious qualified judgment; 保留判断，承认某种可能。 |
| 2 | `ja-youda` | Grammar | REVIEW | `ja-s5-06-repair` | READY | None | 普通形 + ようだ (neutral) reapplies an earlier item under changed demand for cautious qualified judgment; 根据间接证据推断 |
| 2 | `35e1b-ja-d-misunderstanding-tone-expr` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | 会議でのコメントが、かなり厳しく聞こえました。 すみません。仕事ではなく、日程について確認したかったんです。 説明してくれてありがとう。責められたのかと思いました。 そう聞こえた理由はわかります。 明日、もう一度日程について話せますか。 もちろんです。今度はもっとはっきり説明します。 (neutral) scaffolds the task without adding a new target for cautious qualified judgment; 交际目标：解释语气并修复关系。 |
| 2 | `35e1b-ja-x-clarify-in-other-words-expr` | Expression | REVIEW | `ja-s5-06-repair` | READY | SCENARIO-COVERED | つまり、最初からやり直すということですか。 (neutral) reapplies an earlier item under changed demand for cautious qualified judgment; 可复用核心表达块。 |
| 2 | `legacy-156-ja` | Expression | SUPPORT | — | READY | READY CONTEXT | あなたが嫌なわけではなく、ただ一人の時間がほしいんです。 (neutral) scaffolds the task without adding a new target for cautious qualified judgment; 例：It's nothing personal; I just need some time alone.／あなたが嫌なわけではなく、ただ一人の時間が必要なんです。敏感话题仍需体谅对方感受。 |
| 2 | `legacy-147-ja` | Expression | REVIEW | `ja-s5-l1` | READY | DIALOGUE-COVERED | A: 仕事にすることは考えた？ B: 少しね。でも、純粋に楽しめなくなるのは嫌かな。 (neutral) reapplies an earlier item under changed demand for cautious qualified judgment; professionally 指以此为职业；I'd hate to 委婉说不愿发生，日语かな让个人想法留有余地。 |
| 3 | `ja-c-1095` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 報告書 (neutral) introduces the slot-specific mechanism for reported conditional decision; 报告 |
| 3 | `ja-c-1111` | Vocabulary | NEW | — | READY | None | 条件 (neutral) introduces the slot-specific mechanism for reported conditional decision; 条件 |
| 3 | `ja-c-647` | Vocabulary | REVIEW | `ja-s5-l3` | READY | None | 代案 (neutral) reapplies an earlier item under changed demand for reported conditional decision; 替代选项 |
| 3 | `ja-c-619` | Vocabulary | SUPPORT | — | READY | None | 調整する (neutral) scaffolds the task without adding a new target for reported conditional decision; 调整 |
| 3 | `ja-c-643` | Vocabulary | SUPPORT | — | READY | None | 延期する (neutral) scaffolds the task without adding a new target for reported conditional decision; 推迟 |
| 3 | `ja-c-739` | Vocabulary | REVIEW | `ja-s5-06-repair` | READY | None | 明確にする (neutral) reapplies an earlier item under changed demand for reported conditional decision; 澄清 |
| 3 | `ja-c-807` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 曖昧 (neutral) introduces the slot-specific mechanism for reported conditional decision; 有歧义的 |
| 3 | `ja-c-843` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 推論する (formal) introduces the slot-specific mechanism for reported conditional decision; 推断 |
| 3 | `ja-indirect-ka` | Grammar | REVIEW | `ja-s5-06-repair` | READY | None | 普通形 + か + predicate (neutral) reapplies an earlier item under changed demand for reported conditional decision; 把疑问作为内容 |
| 3 | `ja-hearsay-sou` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 普通形 + そうだ (neutral) introduces the slot-specific mechanism for reported conditional decision; 传闻 |
| 3 | `ja-ni-kakawarazu` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 名词 + にかかわらず (formal) introduces the slot-specific mechanism for reported conditional decision; 不论条件 |
| 3 | `35e1b-ja-x-clarify-in-other-words-expr` | Expression | REVIEW | `ja-s5-06-repair` | READY | SCENARIO-COVERED | つまり、最初からやり直すということですか。 (neutral) reapplies an earlier item under changed demand for reported conditional decision; 可复用核心表达块。 |
| 3 | `legacy-108-ja` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | 予報にかかわらず、予備の案を用意したほうがいいです。 (neutral) introduces the slot-specific mechanism for reported conditional decision; 例：Regardless of the forecast, we should have a backup plan.／予報にかかわらず、別の案も用意したほうがいいです。of 后接名词。 |
| 3 | `legacy-111-ja` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: 予報がころころ変わるね。 B: 様子を見て、明日決めよう。 (neutral) scaffolds the task without adding a new target for reported conditional decision; play it by ear 是随机应变，不是用耳朵演奏的字面义；ころころ描述频繁变化，带一点无奈。 |
| 3 | `legacy-75-ja` | Expression | NEW | — | READY | DIALOGUE-COVERED | A: その日の午後は、まだ確定しないでおける？ B: いいよ。予定が固まったら教えて。 (neutral) introduces the slot-specific mechanism for reported conditional decision; firm up 指安排逐渐确定；日语予定が固まる也是确定下来，不是计划变坚硬。 |
| 4 | `ja-c-655` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 優先事項 (neutral) reapplies an earlier item under changed demand for formal contingency and accountability; 优先事项 |
| 4 | `ja-c-751` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 配分する (formal) reapplies an earlier item under changed demand for formal contingency and accountability; 分配资源 |
| 4 | `ja-c-783` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 合意 (formal) reapplies an earlier item under changed demand for formal contingency and accountability; 共识 |
| 4 | `ja-c-787` | Vocabulary | SUPPORT | — | READY | None | トレードオフ (formal) scaffolds the task without adding a new target for formal contingency and accountability; 取舍关系 |
| 4 | `ja-c-623` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 約束する (neutral) introduces the slot-specific mechanism for formal contingency and accountability; 约定；答应 |
| 4 | `ja-c-859` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 不測の事態 (formal) introduces the slot-specific mechanism for formal contingency and accountability; 意外情况 |
| 4 | `ja-c-871` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 説明責任 (formal) introduces the slot-specific mechanism for formal contingency and accountability; 说明责任 |
| 4 | `ja-c-671` | Vocabulary | SUPPORT | — | READY | None | 負担 (neutral) scaffolds the task without adding a new target for formal contingency and accountability; 负担 |
| 4 | `ja-beki` | Grammar | REVIEW | `ja-s5-07-consensus` | READY | None | 辞书形 + べきだ (formal) reapplies an earlier item under changed demand for formal contingency and accountability; 应当履行的判断 |
| 4 | `ja-zaru-wo-enai` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | Vない（去掉「ない」）+ ざるを得ない (formal) introduces the slot-specific mechanism for formal contingency and accountability; 不得不采取 |
| 4 | `ja-humble` | Grammar | REVIEW | `ja-s5-03-formal-role` | READY | None | する → いたす (neutral) reapplies an earlier item under changed demand for formal contingency and accountability; the speaker or staff member lowers their own する action through the specific bounded mapping する → いたす; this record does not authorize 伺う or an open class of humble verbs |
| 4 | `35e1b-ja-d-group-disagree-expr` | Expression | REVIEW | `ja-s5-07-consensus` | READY | DIALOGUE-COVERED | アンケートの結果を中心にしたほうがいいと思います。 言いたいことはわかりますが、インタビューが変化の理由を説明しています。 両方入れるということですか。 はい。ただ、背景の部分は短くできます。 それならよさそうです。背景は一段落だけ残しましょう。 では、私が構成を直します。 (neutral) reapplies an earlier item under changed demand for formal contingency and accountability; 交际目标：表达不同意见并达成折中。 |
| 4 | `legacy-51-ja` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: 範囲を絞る必要がありそうですね。 B: そうですね。優先度の高いものに集中しましょう。 (neutral) scaffolds the task without adding a new target for formal contingency and accountability; scope 指项目范围；絞る在此是缩小。英语 what matters most 强调重要性，日语用优先度自然回应。 |
| 4 | `legacy-61-ja` | Expression | SUPPORT | — | READY | SCENARIO-COVERED | 家事の分担を一度見直しませんか。 (neutral) scaffolds the task without adding a new target for formal contingency and accountability; we 把问题放到共同安排上；見直す是重新审视，并非只是再看一眼。 |
| 4 | `legacy-49-ja` | Expression | SUPPORT | — | READY | SCENARIO-COVERED | おっしゃることはわかりますが、一つ気になる点があります。 (neutral) scaffolds the task without adding a new target for formal contingency and accountability; I see your point 表示理解理由，未必同意；日语おっしゃる是对对方说话的尊敬表达。 |
| 5 | `ja-c-827` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 緩和する (formal) introduces the slot-specific mechanism for considerate commitment; 减轻不利影响 |
| 5 | `ja-c-835` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 両立させる (formal) introduces the slot-specific mechanism for considerate commitment; 调和冲突 |
| 5 | `ja-c-623` | Vocabulary | SUPPORT | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 約束する (neutral) scaffolds the task without adding a new target for considerate commitment; 约定；答应 |
| 5 | `ja-c-527` | Vocabulary | REVIEW | `ja-s5-08-benefit` | READY | None | 懸念 (formal) reapplies an earlier item under changed demand for considerate commitment; 担忧之处 |
| 5 | `ja-c-1123` | Vocabulary | REVIEW | `ja-s4-l3` | EDITORIAL REQUIRED | NEEDS EXAMPLE | 気遣う (neutral) reapplies an earlier item under changed demand for considerate commitment; 体谅 |
| 5 | `ja-c-295` | Vocabulary | SUPPORT | — | READY | None | 確認する (neutral) scaffolds the task without adding a new target for considerate commitment; 核对 |
| 5 | `ja-yotei` | Vocabulary | SUPPORT | — | READY | None | 予定 (neutral) scaffolds the task without adding a new target for considerate commitment; 计划；安排 |
| 5 | `ja-c-647` | Vocabulary | REVIEW | `ja-s5-l3` | READY | None | 代案 (neutral) reapplies an earlier item under changed demand for considerate commitment; 替代选项 |
| 5 | `ja-causative-request` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 使役て形 + ください (neutral) introduces the slot-specific mechanism for considerate commitment; 请求允许自己做 |
| 5 | `ja-te-oku` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | て形 + おく (neutral) introduces the slot-specific mechanism for considerate commitment; 提前准备或保留状态 |
| 5 | `ja-honorific-request` | Grammar | REVIEW | `ja-s5-03-formal-role` | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | お + Vます（去掉「ます」）+ ください (neutral) reapplies an earlier item under changed demand for considerate commitment; 尊敬形式请求 |
| 5 | `legacy-37-ja` | Expression | REVIEW | `ja-s5-03-formal-role` | READY | SCENARIO-COVERED | こちら、別のものに替えていただくことはできますか。 (neutral) reapplies an earlier item under changed demand for considerate commitment; 先说明实际问题再提出更换；英语用可能性问句，日语用いただく表达受惠，均不是要求店家必须答应。 |
| 5 | `legacy-39-ja` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: 注文と違うものが来たようなんですが。 B: 申し訳ありません。確認いたします。 (neutral) scaffolds the task without adding a new target for considerate commitment; mix-up 暗示弄错，避免先归责；日语ようなんですが委婉提出问题，店员用いたします回应。 |
| 5 | `35e1b-ja-d-invitation-condition-expr` | Expression | NEW | — | READY | DIALOGUE-COVERED | 土曜日にピクニックをするんだけど、来ない？ 行けるかも。何時から？ 十二時ごろ、リバーサイド公園で。 十一時までに仕事が終わったら行けるよ。 大丈夫。わかったらメッセージして。 そうするね。誘ってくれてありがとう。 (neutral) introduces the slot-specific mechanism for considerate commitment; 交际目标：带条件接受邀请并确认细节。 |
| 5 | `legacy-155-ja` | Expression | NEW | — | EDITORIAL REQUIRED | NEEDS CONTEXT | 少し早めに失礼するかもしれません。 (neutral) introduces the slot-specific mechanism for considerate commitment; may have to 表示可能不得不；失礼する在聚会场景是礼貌离席，不是有意失礼。 |
| 6 | `ja-c-1083` | Vocabulary | SUPPORT | — | READY | None | 結局 (neutral) scaffolds the task without adding a new target for reflective next action; 结果是 |
| 6 | `ja-c-3207` | Vocabulary | REVIEW | `ja-s5-l1` | READY | None | 甲斐 (formal) reapplies an earlier item under changed demand for reflective next action; 付出的价值 |
| 6 | `ja-c-535` | Vocabulary | SUPPORT | — | READY | None | 結果 (neutral) scaffolds the task without adding a new target for reflective next action; 结果 |
| 6 | `ja-c-683` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 判断 (neutral) reapplies an earlier item under changed demand for reflective next action; 判断 |
| 6 | `ja-c-715` | Vocabulary | SUPPORT | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 妥当 (formal) scaffolds the task without adding a new target for reflective next action; 合理的 |
| 6 | `ja-c-735` | Vocabulary | SUPPORT | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 正当化する (formal) scaffolds the task without adding a new target for reflective next action; 说明正当理由 |
| 6 | `ja-c-783` | Vocabulary | REVIEW | `ja-s5-07-consensus` | READY | None | 合意 (formal) reapplies an earlier item under changed demand for reflective next action; 共识 |
| 6 | `ja-c-803` | Vocabulary | NEW | — | EDITORIAL REQUIRED | NEEDS EXAMPLE | 関連する (neutral) introduces the slot-specific mechanism for reflective next action; 相关的 |
| 6 | `ja-kai` | Grammar | NEW | — | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | た形 + 甲斐がある (formal) introduces the slot-specific mechanism for reflective next action; 付出有所回报 |
| 6 | `ja-koto-ni-suru` | Grammar | REVIEW | `ja-s4-l2` | EDITORIAL REQUIRED | NEEDS GRAMMAR EXAMPLES (3) | 辞书形 + ことにする (neutral) reapplies an earlier item under changed demand for reflective next action; 作出决定 |
| 6 | `ja-beki` | Grammar | REVIEW | `ja-s5-07-consensus` | READY | None | 辞书形 + べきだ (formal) reapplies an earlier item under changed demand for reflective next action; 应当履行的判断 |
| 6 | `legacy-183-ja` | Expression | NEW | — | READY | DIALOGUE-COVERED | A: 結局、行った甲斐はあった？ B: 期待どおりではなかったけど、学ぶことは多かったよ。 (neutral) introduces the slot-specific mechanism for reflective next action; worth it 指投入值得；甲斐がある强调付出有意义。肯定收获不意味着否定经历中的失望。 |
| 6 | `legacy-177-ja` | Expression | REVIEW | `ja-s4-l2` | READY | DIALOGUE-COVERED | A: 週末は出かける予定のまま？ B: ううん、代わりに家で過ごすことにした。 (neutral) reapplies an earlier item under changed demand for reflective next action; instead 表示选择替代方案；ことにした说明自己作出的决定，区别于外部决定的ことになった。 |
| 6 | `legacy-179-ja` | Expression | REVIEW | `ja-s4-l2` | EDITORIAL REQUIRED | NEEDS CONTEXT | 思っていたのとは違う結果になりました。 (neutral) reapplies an earlier item under changed demand for reflective next action; turn out 描述最终结果；日语用結果になった，不强制翻译成转变方向。 |
| 6 | `legacy-147-ja` | Expression | SUPPORT | — | READY | DIALOGUE-COVERED | A: 仕事にすることは考えた？ B: 少しね。でも、純粋に楽しめなくなるのは嫌かな。 (neutral) scaffolds the task without adding a new target for reflective next action; professionally 指以此为职业；I'd hate to 委婉说不愿发生，日语かな让个人想法留有余地。 |

## 11. Final role totals

| Language | NEW | REVIEW | SUPPORT | Total | Result |
|---|---:|---:|---:|---:|---|
| EN | 32 / 36.4% | 30 / 34.1% | 26 / 29.5% | 88 | within aggregate capstone bands |
| JA | 34 / 38.2% | 31 / 34.8% | 24 / 27.0% | 89 | within aggregate capstone bands |
| Combined | 66 / 37.3% | 61 / 34.5% | 50 / 28.2% | 177 | coherent bilingual profile |

All 61 REVIEW positions resolve to a real Stage 1–5 lesson in the matrices. All reuse first introduced earlier within proposed Stage 6 is SUPPORT, not REVIEW. SUPPORT rows have a named scaffold/context purpose.

## 12. Frozen titles and objectives

Every title and objective is communicative rather than a grammar label. **Result: APPROVE for all 12.**

| Lang./slot | Chinese title | Target-language title | Frozen objective | Result |
|---|---|---|---|---|
| EN1 | 以证据构建有限定的论证 | Build a Qualified Evidence-Led Argument | 能选择相关证据、提出主张，并明确结论的适用范围。 | APPROVE |
| EN2 | 分析反事实并回应反方观点 | Reason Through Counterfactuals and Counterpositions | 能连接反事实条件与后果，承认反方依据，并说明不确定性。 | APPROVE |
| EN3 | 综合转述信息并区分证据与推断 | Synthesize Reports, Evidence, and Inference | 能综合多个来源，区分事实、证据与推断，并形成有限定的结论。 | APPROVE |
| EN4 | 协商冲突需求并承担说明责任 | Negotiate Competing Demands and Accountability | 能权衡优先事项、分配责任、提出缓解措施，并作出正式承诺。 | APPROVE |
| EN5 | 作出不施压的正式承诺 | Make Pressure-Free Formal Commitments | 能说明限制、提出替代方案，并在不给对方压力的情况下明确承诺。 | APPROVE |
| EN6 | 回顾结果并承诺后续行动 | Reflect on Outcomes and Commit to Next Steps | 能根据证据评估结果、承担相应责任，并说明下一步行动。 | APPROVE |
| JA1 | 组织依据并形成有限定的结论 | 根拠を整理し、限定した結論を述べる | 能整理相关依据、说明判断标准，并限定结论的适用范围。 | APPROVE |
| JA2 | 谨慎表达判断并承认限制 | 判断を控えめに述べ、限界を認める | 能区分依据、推断与可能性，并以保留方式表达判断。 | APPROVE |
| JA3 | 综合转述信息并进行条件判断 | 報告をまとめ、条件付きで判断する | 能区分转述、传闻与推断，并在明确条件下作出决定。 | APPROVE |
| JA4 | 正式协商突发情况与说明责任 | 不測の事態と説明責任を改まって協議する | 能在正式角色中协商突发情况、缓解措施、说明责任与后续承诺。 | APPROVE |
| JA5 | 调整安排并作出得体承诺 | 予定を調整し、配慮ある約束をする | 能说明限制、提出代案，并顾及对方作出明确承诺。 | APPROVE |
| JA6 | 回顾结果并说明责任与下一步 | 結果を振り返り、責任と次の行動を述べる | 能评估实际结果、承认相应责任，并说明下一步行动。 | APPROVE |

## 13. Japanese reorder decision

**REORDER APPROVED:** future `ja-s6-l4` becomes slot 5 and future `ja-s6-l3` becomes slot 6 terminal.

The progression is stronger: formal contingency/accountability leads into considerate commitment, then reflection closes the course. The current reflection assets (`legacy-183-ja`, `legacy-177-ja`, `legacy-179-ja`) are more suitable for terminal synthesis than a basic invitation/schedule outcome. Grandfathering is more complex than retaining order, but IDs remain stable and completion must not be revoked; this is manageable through prerequisite/recommendation compatibility rather than learner-state rewriting.

## 14. Frozen prerequisite design

**APPROVED, design only; no edge is changed.**

```text
en-s5-08-reporting
→ en-s6-l1
→ en-s6-l2
→ PROPOSED-EN-S6-03-SYNTHESIS
→ PROPOSED-EN-S6-04-ACCOUNTABILITY
→ en-s6-l3
→ en-s6-l4 (terminal)

ja-s5-08-benefit
→ ja-s6-l1
→ ja-s6-l2
→ PROPOSED-JA-S6-03-REPORTING
→ PROPOSED-JA-S6-04-ACCOUNTABILITY
→ ja-s6-l4
→ ja-s6-l3 (terminal)
```

The future implementation must replace successor edges, not add an optional branch, and must prove one root, connectedness, acyclicity, language isolation, and no bypass.

## 15. Grandfathering design

**APPROVED as a mandatory implementation gate.** A future release must:

- preserve completed current Stage 6 lessons and in-progress lesson rows;
- preserve all historical attempts/evidence and vocabulary/grammar SRS identity;
- keep `continue_lesson` authoritative for an existing learner’s active valid Stage 6 lesson;
- never revoke completion because a lesson’s sequence or prerequisite changes;
- route learners with no prior Stage 6 evidence through the new sequence;
- map the next incomplete step around preserved evidence without rewriting learner history;
- regression-test completed, partially completed, active, and new learners plus terminal-course behavior.

This document changes no learner data.

## 16. Final density and practice projection

| Lang./slot | V/G/E | Assessable | Safe opportunities | NEW/REVIEW/SUPPORT | Finding |
|---|---:|---:|---:|---:|---|
| EN1 | 8/3/4 | 11 | 33 | 9/3/3 | healthy; approved NEW-load exception |
| EN2 | 8/3/4 | 11 | 33 | 8/2/5 | healthy |
| EN3 | 8/3/4 | 11 | 31 | 5/7/3 | healthy synthesis/review |
| EN4 | 8/3/4 | 11 | 32 | 6/7/2 | healthy |
| EN5 | 8/2/4 | 10 | 29 | 3/4/7 | healthy pragmatic transfer; one below the approximate 30 target, no filler justified |
| EN6 | 8/3/3 | 11 | 33 | 1/7/6 | healthy terminal consolidation |
| JA1 | 8/3/4 | 11 | 33 | 9/3/3 | healthy; approved NEW-load exception |
| JA2 | 7/3/4 | 10 | 30 | 4/6/4 | healthy after redundant vocabulary removal |
| JA3 | 8/3/4 | 11 | 33 | 8/4/3 | healthy |
| JA4 | 8/3/4 | 11 | 33 | 4/6/5 | healthy formal transfer |
| JA5 | 8/3/4 | 11 | 33 | 6/5/4 | healthy |
| JA6 | 8/3/4 | 11 | 33 | 3/7/5 | healthy terminal consolidation |

Projected range: **10–11 assessable items and approximately 29–33 safe opportunities per lesson**. No CC is manufactured; grammar without current safe completion authority contributes only its two deterministic form modes.

## 17. Unique assessable projection

Recalculation replaces current Stage 6 composition while preserving Stages 1–5:

| Language | Current unique assessable | Final projected vocabulary | Final projected authoritative grammar | Final projected assessable | Delta |
|---|---:|---:|---:|---:|---:|
| EN | 252 | 204 | 58 | **262** | +10 |
| JA | 236 | 189 | 62 | **251** | +15 |

Removing `en-would-like` does not reduce whole-course unique grammar because it remains linked in Stage 1. Removing `looking-forward-en` does not affect assessable counts. Removing Stage-6-only `ja-c-699` reduces the Japanese projection by one. These results are consequences of semantic selection, not quota targets.

## 18. Exact future editorial workload

### Vocabulary

Exactly **40 distinct vocabulary records** need one reviewed lesson sentence: 21 EN and 19 JA. Repeated relationship positions share record-level canonical production but may still need lesson-specific placement review.

EN: `en-c-729`, `en-c-777`, `en-c-741`, `en-c-1109`, `en-c-681`, `en-c-697`, `en-c-765`, `en-c-633`, `en-c-637`, `en-c-805`, `en-c-841`, `en-c-817`, `en-c-621`, `35e1c-en-v086`, `en-c-857`, `en-c-825`, `en-c-869`, `en-c-2247`, `en-c-669`, `en-c-677`, `en-c-797`.

JA: `ja-c-759`, `ja-c-779`, `ja-c-819`, `ja-c-731`, `ja-c-3205`, `ja-c-3217`, `ja-c-715`, `ja-c-735`, `ja-c-815`, `ja-c-1095`, `ja-c-807`, `ja-c-843`, `ja-c-623`, `ja-c-859`, `ja-c-871`, `ja-c-827`, `ja-c-835`, `ja-c-1123`, `ja-c-803`.

### Grammar

Target reviewed depth is four varied examples per selected late grammar record. Exactly **60 examples** are required across 20 records:

| Language | Record | Current | Target | Required |
|---|---|---:|---:|---:|
| EN | `en-inversion` | 1 | 4 | 3 |
| EN | `en-participle-clause` | 1 | 4 | 3 |
| EN | `en-qualified-comparison` | 1 | 4 | 3 |
| EN | `en-mixed-conditional` | 1 | 4 | 3 |
| EN | `en-second-conditional` | 1 | 4 | 3 |
| EN | `en-third-conditional` | 1 | 4 | 3 |
| EN | `en-hedged-claim` | 1 | 4 | 3 |
| EN | `en-regardless` | 1 | 4 | 3 |
| EN | `en-if-request` | 1 | 4 | 3 |
| JA | `ja-ni-hoka-naranai` | 1 | 4 | 3 |
| JA | `ja-ni-suginai` | 1 | 4 | 3 |
| JA | `ja-wo-fumaete` | 1 | 4 | 3 |
| JA | `ja-hearsay-sou` | 1 | 4 | 3 |
| JA | `ja-ni-kakawarazu` | 1 | 4 | 3 |
| JA | `ja-zaru-wo-enai` | 1 | 4 | 3 |
| JA | `ja-causative-request` | 1 | 4 | 3 |
| JA | `ja-te-oku` | 1 | 4 | 3 |
| JA | `ja-honorific-request` | 1 | 4 | 3 |
| JA | `ja-kai` | 1 | 4 | 3 |
| JA | `ja-koto-ni-suru` | 1 | 4 | 3 |
|  | **Total** | 20 | 80 | **60** |

No controlled-completion count is promised. CC authority requires a separate sentence-local review.

### Expression context

Exactly **9 distinct selected expressions** need strict context: four EN (`lesson-en-inversion-ex`, `lesson-en-participle-clause-ex`, `lesson-en-mixed-conditional-ex`, `lesson-en-second-conditional-ex`) and five JA (`lesson-ja-wo-fumaete-ex`, `lesson-ja-ni-hoka-naranai-ex`, `legacy-108-ja`, `legacy-155-ja`, `legacy-179-ja`).

Final relationship-position status by language:

| Language | READY | NEEDS VOCAB EXAMPLE | NEEDS GRAMMAR EXAMPLES | NEEDS CONTEXT | Approved total |
|---|---:|---:|---:|---:|---:|
| EN | 52 | 23 | 9 | 4 | 88 |
| JA | 51 | 22 | 11 | 5 | 89 |
| **Total** | **103** | **45** | **20** | **9** | **177** |

The relationship-position count exceeds the distinct record workload where a one-example record is reused in more than one slot.

## 19. Frozen asset plan

| Slot | Asset decision | Purpose | Result |
|---|---|---|---|
| EN1 | short scenario | select evidence and bound a conclusion | APPROVE |
| EN2 | short scenario | connect past decision and present consequence while conceding a counter-position | APPROVE |
| EN3 | new dialogue | distinguish report/evidence/inference and agree on a qualified conclusion | APPROVE |
| EN4 | new dialogue | negotiate priorities, mitigation, responsibility, and follow-up | APPROVE |
| EN5 | reuse dialogue + new prompt | transform invitation/exit material into non-coercive professional commitment | APPROVE |
| EN6 | reuse dialogue + new prompt | evaluate outcome, responsibility, and next action | APPROVE |
| JA1 | short scenario | choose evidence and limit a formal conclusion | APPROVE |
| JA2 | reuse dialogue + new prompt | distinguish fact, inference, concern, and reservation | APPROVE |
| JA3 | new dialogue | distinguish report, indirect question, hearsay, and inference | APPROVE |
| JA4 | new dialogue | negotiate contingency, mitigation, accountability, and formal commitment | APPROVE |
| JA5 | reuse dialogue + new prompt | disclose constraints, offer an alternative, and commit considerately | APPROVE |
| JA6 | reuse dialogue + new prompt | evaluate result, acknowledge responsibility, and state next action | APPROVE |

Exact production workload: **four new dialogues, five reuse prompt layers, and three short scenarios**. None is authored here.

## 20. Unresolved blockers

**Zero relationship blockers remain.** Editorial work remains substantial but is not a semantic-selection blocker. A future 03B payload must still receive human approval before implementation.

## 21. Human approval checklist

- [x] Six slots and two new slots per language frozen.
- [x] Starting 180-position ledger reconciled exactly.
- [x] All 76 REVIEW REQUIRED candidates reviewed semantically.
- [x] Both prior BLOCKED grammar candidates decided.
- [x] Japanese L6 vocabulary decided explicitly.
- [x] High-level English vocabulary reviewed semantically.
- [x] Slot-1 60% NEW exceptions decided.
- [x] Every REVIEW relationship mapped to a Stage 1–5 source.
- [x] All roles, titles, objectives, order, prerequisite design, and asset types frozen.
- [x] Density, unique impact, and editorial workload recalculated after removals.
- [ ] Vocabulary examples, grammar examples, expression contexts, dialogues, prompts, and scenarios authored and approved in 03B.
- [ ] Separate Stage 6 implementation authorization granted.

## 22. Implementation authorization boundary

This matrix is **READY FOR STAGE 6 EDITORIAL PRODUCTION 03B: YES**. It is **READY FOR STAGE 6 IMPLEMENTATION: NO**.

03B may author only the approved editorial production envelope and must return its own human-review payload. Implementation remains blocked until that payload is approved and a separate task explicitly authorizes curriculum, canonical, migration, learner-compatibility, local/staging validation, and deployment work.

## Safety confirmation

After the design-audit documentation commit, this task added only `docs/STAGE-6-EXPANSION-03A-APPROVAL-MATRIX.md` locally and did not commit it. It did not modify curriculum source, canonical records, examples, expressions, lessons, relationships, roles, prerequisites, migrations, D1, staging, production, learner state, or branches.
