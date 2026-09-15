# EJ Learning — Stage 5–6 Progression Design Audit 01

**Audit date:** 2026-09-15

**Audited main:** `86c544b7b033397ab72b1875e8ad66e0eaceabad`

**Current bundle:** `curriculum-expansion-01a-v1`

**Scope:** bilingual, read-only curriculum design audit. All outcomes, lesson slots, links, roles, and prerequisite positions in this document are human-review proposals, not implementation authorization.

## Executive recommendation

Stage 5 and Stage 6 should become the part of each course where learners combine earlier language to justify decisions, qualify claims, negotiate constraints, repair misunderstandings, and operate with greater register awareness. They should not merely contain harder grammar labels or repeat everyday Stage 2–4 situations with basic item selections.

The recommended strategy is **C: hybrid**. Preserve all eight current Stage 5–6 lessons per language, refocus four weakly aligned lessons, densify/rebalance the others, and design four additional focused slots per stage. This produces a planning target of eight lessons / 120 authored minutes in each of Stage 5 and Stage 6, or 240 Stage 5–6 minutes per language. Implement Stage 5 first, validate its reviewed content and mandatory linear path, and only then implement Stage 6.

This is not Expansion 02. No lesson, link, role, prerequisite, canonical record, migration, D1 data, or deployment is changed here.

## 1. Baseline and evidence boundary

The completed post-expansion coverage audit was committed and pushed first:

- documentation commit and resulting clean main: `86c544b7b033397ab72b1875e8ad66e0eaceabad`
- branch: `main`
- local `main` equals remote `main`
- current guided source: `curriculum-expansion-01a-v1`

The design audit reads the current bundle and the existing published canonical library. Internal levels and expression difficulty are project metadata only. They are not CEFR or JLPT equivalents. Candidate status means:

- **HIGH CONFIDENCE:** strong communicative fit, but still requires human approval and any stated editorial dependency.
- **REVIEW REQUIRED:** plausible, but register, scope, example depth, or modeling must be reviewed.
- **DO NOT USE:** unsuitable for this bounded general Stage 5–6 design; the canonical record is not being condemned globally.
- **READY / NEEDS EXAMPLE / NEEDS CONTEXT / NEEDS GRAMMAR EDIT / BLOCKED:** implementation-readiness labels, not publication-state changes.

## 2. Current Stage 5–6 inventory

Every current stage contains exactly four lessons / 60 authored minutes. None of these 16 lessons has an authored `NEW`, `REVIEW`, or `SUPPORT` role because role authoring was limited to the Expansion 01 target set.

### Stage-level inventory

| Stage | Lesson IDs and titles | Unique V; level distribution; average | Grammar; assessable; level distribution; average | Expressions; difficulty distribution; average | Assessable | Opportunities | CC coverage | Expression context / reuse / REVIEW |
|---|---|---|---|---|---:|---:|---|---|
| EN S5 | `en-s5-l1` 在限制下评估工作方案; `en-s5-l2` 处理行程变化; `en-s5-l3` 清楚说明问题并寻求解决; `en-s5-l4` 讨论选择与未来安排 | 29; L1–6 6/10/4/9/0/0; 2.55 | 11; 11; L1–6 1/3/2/3/2/0; 3.18 | 17; D1–6 0/0/4/9/4/0; 4.00 | 40 | 132 | 4/4 lessons; 12 CC-capable links | 7/17 contextual; 0 repeat; 0 REVIEW |
| EN S6 | `en-s6-l1` 陈述观点并用依据支持; `en-s6-l2` 澄清语气并讨论假设; `en-s6-l3` 发出邀请并照顾对方选择; `en-s6-l4` 回顾经历并展望目标 | 31; L1–6 9/6/10/6/0/0; 2.42 | 12; 12; L1–6 1/4/0/3/1/3; 3.67 | 17; D1–6 0/7/2/4/0/4; 3.53 | 43 | 131 | 4/4 lessons; 11 CC-capable links | 4/17 contextual; 0 repeat; 0 REVIEW |
| JA S5 | `ja-s5-l1` 改まった形で判断を述べる; `ja-s5-l2` 遠回しに配慮して依頼する; `ja-s5-l3` 条件を示して変更を相談する; `ja-s5-l4` 気持ちの度合いと背景を話す | 30; L1–6 7/10/6/6/1/0; 2.47 | 11; 11; L1–6 2/2/2/2/2/1; 3.27 | 17; D1–6 0/0/5/8/4/0; 3.94 | 41 | 132 | 4/4 lessons; 12 CC-capable links | 7/17 contextual; 0 repeat; 0 REVIEW |
| JA S6 | `ja-s6-l1` 根拠を整理して説明する; `ja-s6-l2` 確認しながら控えめに意見を述べる; `ja-s6-l3` 経験を振り返り判断を伝える; `ja-s6-l4` 誘いに応じ、予定変更を伝える | 29; L1–6 4/11/4/9/1/0; 2.72 | 12; 12; L1–6 1/1/3/3/1/3; 3.92 | 17; D1–6 1/3/1/6/3/3; 3.94 | 41 | 132 | 4/4 lessons; 12 CC-capable links | 4/17 contextual; 0 within-stage repeat; 0 REVIEW |

Across the two Japanese stages, one expression is reused; the per-stage rows themselves contain no duplicate expression. English has no Stage 5–6 expression reuse. Current practice density is healthy, but the content profile is not consistently late-stage:

- English Stage 6 vocabulary is easier on average than Stage 5 and contains no level-5/6 vocabulary.
- Japanese Stage 5/6 contains one unique level-5 item per stage, both uses of `ja-c-3207` (`甲斐`); no level-6 vocabulary is linked.
- English Stage 6 mixes three genuine level-6 grammar items with an invitation lesson whose expressions are mostly difficulty 2 and grammar is level 2.
- Japanese Stage 5 travel-change content uses level 1/2 grammar despite a title promising conditional negotiation.
- Stage 6 expression contextualization is only 23.5% in both languages.

Combined Stage 5–6 unique V/G/E is **55/23/34 English** and **50/23/33 Japanese**. That yields 78 unique assessable English items and 73 Japanese items across the late stages; all eight lessons per language have at least one controlled-completion-capable grammar item.

## 3. Proposed stage exit outcomes and current coverage

These are proposed human-review outcomes. `WELL COVERED`, `PARTIALLY COVERED`, and `NOT COVERED` describe the current four-lesson stage, not learner mastery.

### English Stage 5 outcomes

| Code | Proposed exit outcome | Current evidence | Coverage |
|---|---|---|---|
| E5.1 | Evaluate feasibility using constraints and evidence | `en-s5-l1`; hedged claim and third conditional | WELL COVERED |
| E5.2 | Compare alternatives, explain trade-offs, and work toward agreement | `en-s5-l2`, `en-s5-l4`; alternatives exist but consensus/trade-off language does not | PARTIALLY COVERED |
| E5.3 | Escalate a service or workplace problem with targeted requests and boundaries | `en-s5-l3`; request language is useful but mostly interpersonal and basic | PARTIALLY COVERED |
| E5.4 | Handle uncertainty, changed plans, and contingencies | `en-s5-l2`, `en-s5-l4`; delay/change content exists, contingency planning is absent | PARTIALLY COVERED |
| E5.5 | Report, clarify, and repair misunderstood information | `en-s5-l3`; clarification objective is present but repair dialogue breadth is thin | PARTIALLY COVERED |
| E5.6 | Relate past outcomes to current choices and future commitments | `en-s5-l4`; useful reflection but overlaps `en-s6-l4` | PARTIALLY COVERED |
| E5.7 | Negotiate priorities or resources and state a reasoned compromise | No focused lesson | NOT COVERED |

### English Stage 6 outcomes

| Code | Proposed exit outcome | Current evidence | Coverage |
|---|---|---|---|
| E6.1 | Build a structured claim with evidence and a conclusion | `en-s6-l1`; strong level-6 grammar/examples | WELL COVERED |
| E6.2 | Hedge, concede, qualify, and answer a counter-position respectfully | `en-s6-l2`; hedging/repair exists, concession and counterargument are thin | PARTIALLY COVERED |
| E6.3 | Synthesize reported or embedded information and distinguish source from inference | No reported-information grammar in the current stage | NOT COVERED |
| E6.4 | Explain interacting past and present hypothetical consequences | `en-s6-l1`, `en-s6-l2`; mixed/second conditionals | WELL COVERED |
| E6.5 | Reconcile competing demands, negotiate accountability, and propose mitigation | No focused lesson | NOT COVERED |
| E6.6 | Summarize experience, qualify the result, and articulate a future direction | `en-s6-l4`; objective fits, item selection remains mostly level 1–2 | PARTIALLY COVERED |
| E6.7 | Manage formal interpersonal choice without pressure | `en-s6-l3`; function is useful but current language is difficulty 2 and fits earlier stages | PARTIALLY COVERED |

### Japanese Stage 5 outcomes

| Code | Proposed exit outcome | Current evidence | Coverage |
|---|---|---|---|
| J5.1 | State a formal judgment with limitations and consequences | `ja-s5-l1`; strong level-5/6 grammar | WELL COVERED |
| J5.2 | Make considerate requests while explaining background and burden | `ja-s5-l2`; function is present, but three grammar records require Audit 02 review | PARTIALLY COVERED |
| J5.3 | Negotiate alternatives and schedule changes using explicit conditional reasoning | `ja-s5-l3`; title fits, but linked grammar is existence/question/polite past | PARTIALLY COVERED |
| J5.4 | Repair a misunderstanding and soften a potentially blaming interpretation | `ja-s5-l2`, `ja-s5-l4`; partial discourse support | PARTIALLY COVERED |
| J5.5 | Compare priorities, resources, and trade-offs to reach agreement | No focused lesson | NOT COVERED |
| J5.6 | Track who benefits from help and choose appropriately polite giving/receiving language | `てくれる` appears; systematic contrast/review is absent | PARTIALLY COVERED |
| J5.7 | Express concern, uncertainty, and reservation without overclaiming | `ja-s5-l1`, `ja-s5-l4`; useful pieces but no coherent outcome | PARTIALLY COVERED |

### Japanese Stage 6 outcomes

| Code | Proposed exit outcome | Current evidence | Coverage |
|---|---|---|---|
| J6.1 | Organize evidence, reasoning, and conclusion in a formal explanation | `ja-s6-l1`; strong level-6 grammar | WELL COVERED |
| J6.2 | Hedge, concede, qualify, and distinguish a limited claim | `ja-s6-l2`; partial qualification, one Audit 02 dependency | PARTIALLY COVERED |
| J6.3 | Use specific honorific and humble forms in defined service/workplace roles | Only an overview exists elsewhere; specific records are unlinked | NOT COVERED |
| J6.4 | Embed a question or report information while marking uncertainty/source | No coherent current lesson | NOT COVERED |
| J6.5 | Distinguish conditional/concessive nuance in a practical decision | Current condition overview remains non-assessed; specific coverage is absent here | NOT COVERED |
| J6.6 | Negotiate contingencies and accountability without creating interpersonal pressure | No focused lesson | NOT COVERED |
| J6.7 | Reflect on an experience and state a qualified present judgment | `ja-s6-l3`; good functional fit | WELL COVERED |
| J6.8 | Respond to invitations or commitments with late-stage register control | `ja-s6-l4`; current language is mostly level/difficulty 1–3 | PARTIALLY COVERED |

## 4. Current lesson-to-outcome mapping and disposition

| Lesson | Primary outcome mapping | Disposition | Reason |
|---|---|---|---|
| `en-s5-l1` | E5.1 well; E5.2 partial | KEEP + DENSIFY | Strong late grammar; add level-5 decision vocabulary and explicit review |
| `en-s5-l2` | E5.4 partial; E5.2 partial | REFOCUS | Travel change is useful, but simple past/will and much of the vocabulary feel Stage 3/4; make contingency negotiation explicit |
| `en-s5-l3` | E5.3/E5.5 partial | KEEP + DENSIFY | Preserve problem-resolution core; add escalation, clarification, and boundary language |
| `en-s5-l4` | E5.6 partial; E5.2 partial | REFOCUS | Overlaps `en-s6-l4`; basic grammar weakens its Stage 5 claim |
| `en-s6-l1` | E6.1/E6.4 well | KEEP + DENSIFY | Genuine level-6 grammar; vocabulary and discourse linkage need strengthening |
| `en-s6-l2` | E6.2 partial; E6.4 well | KEEP + DENSIFY | Good hypothetical/repair base; add concession and qualified counterargument |
| `en-s6-l3` | E6.7 partial | POSSIBLE REORDER | Current invitation language is substantially earlier-stage; retain only if refocused toward pressure-free formal commitments |
| `en-s6-l4` | E6.6 partial | REFOCUS | Title promises synthesis, but most vocabulary/grammar is level 1–2 and it duplicates Stage 5 planning/reflection |
| `ja-s5-l1` | J5.1 well; J5.7 partial | KEEP + DENSIFY | Strong formal-judgment core; add evidence/trade-off review |
| `ja-s5-l2` | J5.2/J5.4 partial | KEEP + DENSIFY | Important pragmatic outcome; block new reliance on flagged grammar until reviewed |
| `ja-s5-l3` | J5.3 partial | REFOCUS | Existing grammar does not realize conditional negotiation promised by the title |
| `ja-s5-l4` | J5.4/J5.7 partial | KEEP + DENSIFY | Useful nuance and burden language; add explicit softening/review |
| `ja-s6-l1` | J6.1 well | KEEP + DENSIFY | Genuine advanced reasoning grammar; add reviewed evidence vocabulary and context |
| `ja-s6-l2` | J6.2 partial | KEEP + DENSIFY | Good cautious-opinion base; strengthen concession/source distinction |
| `ja-s6-l3` | J6.7 well | KEEP + DENSIFY | Coherent reflection function; add late-level vocabulary and explicit review |
| `ja-s6-l4` | J6.8 partial | POSSIBLE REORDER | Invitation expressions are mainly difficulty 1–3; keep only after late-register refocus or move the function earlier |

No deletion or reorder is authorized. `POSSIBLE REORDER` means reviewers should decide whether the function belongs earlier before refocusing it as late-stage work.

## 5. Vocabulary progression and quality-gated shortlist

### Library reality

The full published library contains substantial English level-5/6 inventory (1,522 / 1,532 records), but almost all imported records lack curated examples. Only 22 English level-5 and 32 English level-6 records have an existing example row, and every one has exactly one short collocation-style example. Japanese has 3,256 level-5 records but only 25 with an example. Its entire published level-6 pool is exactly **21 records**; all 21 have one short example and most are formal/academic rather than broad daily vocabulary.

Therefore metadata level alone is not an instruction-readiness signal. The shortlist below is deliberately small. `Example fit: limited` means the existing collocation is semantically useful but not a sufficient sentence-level teaching example.

### English vocabulary candidates

| ID | Form / Chinese meaning | Level; domain | Examples / fit | Current link/use; heavy reuse | Likely stage / role | Review status / readiness |
|---|---|---|---|---|---|---|
| `en-c-757` | evidence / 证据 | L4; argument/work | 1; limited | linked; 1; no | S5–6 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-649` | scope / 范围 | L4; work | 1; limited | linked; 1; no | S5 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-1081` | turn out / 结果是 | L4; outcomes | 1; limited | linked; 2; no | S5–6 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-1085` | up in the air / 尚未确定 | L4; uncertainty | 1; limited | linked; 3; **yes** | S5 REVIEW | HIGH CONFIDENCE; use selectively; NEEDS EXAMPLE |
| `en-c-613` | rethink / 重新考虑 | L4; negotiation | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-617` | adjust / 调整 | L4; schedules | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-629` | misunderstand / 误解 | L4; repair | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-641` | postpone / 推迟 | L4; schedules | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-653` | priority / 优先事项 | L4; work/negotiation | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-705` | efficient / 高效的 | L4; evaluation | 1; limited | unlinked; 0 | S5 SUPPORT | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-725` | evaluate / 评估 | L5; evidence | 1; limited | unlinked; 0 | S5 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |
| `en-c-733` | justify / 说明正当理由 | L5; argument | 1; limited | unlinked; 0 | S5–6 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |
| `en-c-737` | clarify / 澄清 | L5; repair | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-769` | limitation / 局限 | L5; qualification | 1; limited | unlinked; 0 | S5–6 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |
| `en-c-773` | perspective / 视角 | L5; discussion | 1; limited | unlinked; 0 | S6 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |
| `en-c-781` | consensus / 共识 | L5; negotiation | 1; limited | unlinked; 0 | S5–6 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-785` | trade-off / 取舍关系 | L5; evaluation | 1; limited | unlinked; 0 | S5–6 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-793` | feasible / 可行的 | L5; evaluation | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `en-c-817` | substantiate / 用证据证实 | L6; formal argument | 1; limited | unlinked; 0 | S6 NEW | REVIEW REQUIRED; register-limited; NEEDS EXAMPLE |
| `en-c-857` | contingency / 意外情况 | L6; risk/planning | 1; limited | unlinked; 0 | S6 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |

Examples of high-level records marked `DO NOT USE` for this bounded general path are `en-c-1165` (`falsifiable`), `en-c-1129` (`extrapolate`), `en-c-1149` (`reciprocity`), and `en-c-1153` (`convergence`). They are legitimate reference vocabulary but would make the course narrowly academic without an authored domain outcome.

### Japanese vocabulary candidates

| ID | Form / Chinese meaning | Level; domain | Examples / fit | Current link/use; heavy reuse | Likely stage / role | Review status / readiness |
|---|---|---|---|---|---|---|
| `ja-c-607` | 絞る / 缩小范围 | L4; work | 1; limited | linked; 2; no | S5–6 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-651` | 範囲 / 范围 | L4; work | 1; limited | linked; 2; no | S5 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-683` | 判断 / 判断 | L4; decision | 1; limited | linked; 2; no | S5–6 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-3217` | とはいえ / 承认后补充限制 | L4; qualification | 1; limited | linked; 2; no | S6 REVIEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-615` | 見直す / 重新考虑 | L4; negotiation | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-619` | 調整する / 调整 | L4; schedules | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-631` | 誤解する / 误解 | L4; repair | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-643` | 延期する / 推迟 | L4; schedules | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-647` | 代案 / 替代选项 | L4; negotiation | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-655` | 優先事項 / 优先事项 | L4; work | 1; limited | unlinked; 0 | S5 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-527` | 懸念 / 担忧之处 | L5; qualification | 1; limited | unlinked; 0 | S5–6 NEW | REVIEW REQUIRED; register review; NEEDS EXAMPLE |
| `ja-c-715` | 妥当 / 合理的 | L5; evaluation | 1; limited | unlinked; 0 | S5 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |
| `ja-c-735` | 正当化する / 说明正当理由 | L5; argument | 1; limited | unlinked; 0 | S6 NEW | REVIEW REQUIRED; NEEDS EXAMPLE |
| `ja-c-751` | 配分する / 分配资源 | L5; work | 1; limited | unlinked; 0 | S5 NEW | REVIEW REQUIRED; domain review; NEEDS EXAMPLE |
| `ja-c-783` | 合意 / 共识 | L5; negotiation | 1; limited | unlinked; 0 | S5–6 NEW | HIGH CONFIDENCE; NEEDS EXAMPLE |
| `ja-c-787` | トレードオフ / 取舍关系 | L5; evaluation | 1; limited | unlinked; 0 | S5–6 SUPPORT | REVIEW REQUIRED; loanword/register review; NEEDS EXAMPLE |
| `ja-c-795` | 実行可能 / 可行的 | L5; evaluation | 1; limited | unlinked; 0 | S5 NEW | REVIEW REQUIRED; natural-collocation review; NEEDS EXAMPLE |
| `ja-c-859` | 不測の事態 / 意外情况 | L6; contingencies | 1; limited | unlinked; 0 | S6 NEW | REVIEW REQUIRED; formal register; NEEDS EXAMPLE |
| `ja-c-871` | 説明責任 / 说明责任 | L6; workplace | 1; limited | unlinked; 0 | S6 NEW | REVIEW REQUIRED; domain-limited; NEEDS EXAMPLE |
| `ja-c-1127` | 齟齬 / 前后不一致 | L6; repair/formal | 1; limited | unlinked; 0 | S6 SUPPORT | REVIEW REQUIRED; written/formal register; NEEDS EXAMPLE |

Examples marked `DO NOT USE` for this general path are `ja-c-1167` (`反証可能`), `ja-c-1131` (`外挿する`), `ja-c-1151` (`互恵性`), and `ja-c-1155` (`収束`). They require a specialized academic outcome absent from the proposed syllabus.

The usable vocabulary shortlist is 40 records (20 per language), including eight deliberate-review candidates. All 40 require example review; the 32 proposed new/support records should not be linked until they have a reviewed sentence-level example in the intended lesson context.

## 6. Grammar progression, placement, and quality dependencies

### Current grammar findings

English grammar complexity rises from an average of 3.18 in Stage 5 to 3.67 in Stage 6, but the distribution is uneven. `en-inversion`, `en-mixed-conditional`, and `en-participle-clause` are genuinely late; `en-hedged-claim`, `en-third-conditional`, and `en-not-that` are plausible upper-stage forms. By contrast, Stage 5 uses simple past, will, can, and present continuous, while Stage 6 invitation content relies on `Let's` and `would like`. Foundational review is legitimate, but it needs an explicit `REVIEW` role rather than standing in for late-stage progression.

Japanese grammar rises from 3.27 to 3.92. `ものの`, `とは限らない`, `かねない`, `にほかならない`, `にすぎない`, `を踏まえて`, and `甲斐がある` provide a real late-stage spine. However, Stage 5 travel negotiation uses level-1/2 forms, and Stage 6 invitation content again uses mostly foundational grammar. Specific honorific/humble forms and practical conditional nuance are absent.

### Usable unlinked late-stage grammar candidates

All rows below are currently published, unlinked, and eligible for selection and recall. `CC yes/no` reports existing controlled-completion support; CC is useful but not a mandatory selection gate.

| Language | ID | Function / level | Examples | CC | Placement | Quality / dependency |
|---|---|---|---:|---|---|---|
| EN | `en-seem-to` | reserve a judgment; L4 | 1 | yes | Stage 5 NEW | NEEDS EXAMPLE |
| EN | `35e1c-en-reported-statements` | report information; L4 | 4 | no | Stage 5–6 NEW | READY; no CC required |
| EN | `en-concessive-although` | concede then contrast; L4 | 1 | yes | Stage 5 NEW | NEEDS EXAMPLE |
| EN | `en-should-have` | evaluate a past choice; L4 | 1 | yes | Stage 5 REVIEW/NEW | NEEDS EXAMPLE |
| EN | `en-regardless` | state independence from a condition; L5 | 1 | yes | Stage 5–6 NEW | NEEDS EXAMPLE |
| EN | `en-the-more` | relate changing degrees; L5 | 1 | yes | Stage 5 REVIEW | NEEDS EXAMPLE |
| EN | `en-would-have` | unrealized past result; L5 | 1 | yes | Stage 5–6 NEW | NEEDS EXAMPLE |
| EN | `en-qualified-comparison` | constrain a comparison; L6 | 1 | yes | Stage 6 NEW | NEEDS EXAMPLE |
| EN | `en-cleft` | focus a specific element; L6 | 1 | yes | Stage 6 SUPPORT | REVIEW REQUIRED; ensure communicative need |
| JA | `ja-indirect-ka` | embed a question; L3 | 1 | yes | Stage 5 REVIEW/NEW | NEEDS EXAMPLE; previously deferred only for lesson mismatch |
| JA | `ja-hearsay-sou` | report sourced information; L4 | 1 | yes | Stage 5–6 NEW | NEEDS EXAMPLE |
| JA | `ja-youda` | infer from indirect evidence; L4 | 1 | yes | Stage 5 NEW | NEEDS EXAMPLE |
| JA | `ja-honorific` | specific respect lexemes; L4 | 1 | yes | Stage 5–6 NEW | **BLOCKED: NEEDS GRAMMAR EDIT** to bound the answer set |
| JA | `ja-humble` | specific humble lexemes; L4 | 1 | yes | Stage 5–6 NEW | **BLOCKED: NEEDS GRAMMAR EDIT** to bound the answer set |
| JA | `ja-wari-ni` | qualify against an expected standard; L4 | 1 | yes | Stage 5 NEW | NEEDS EXAMPLE |
| JA | `ja-ba-hodo` | relate degrees; L5 | 1 | yes | Stage 5–6 NEW | NEEDS EXAMPLE |
| JA | `ja-ni-kakawarazu` | regardless of condition; L5 | 1 | yes | Stage 6 NEW | NEEDS EXAMPLE |
| JA | `ja-beki` | make a normative judgment; L5 | 1 | yes | Stage 5–6 NEW | REVIEW REQUIRED for interpersonal force; NEEDS EXAMPLE |
| JA | `ja-zaru-wo-enai` | state unavoidable action; L6 | 1 | yes | Stage 6 NEW | HIGH CONFIDENCE fit; NEEDS EXAMPLE |

There are 19 usable late-stage grammar candidates: nine English and ten Japanese. Eighteen have only one example; `35e1c-en-reported-statements` has four. Two Japanese candidates are blocked pending bounded canonical modeling.

### Foundational unlinked grammar belongs earlier

| Language | Record/group | Classification | Stage 5–6 decision |
|---|---|---|---|
| EN | `en-possessive` | EARLIER-STAGE GAP | Integrate through earlier cleanup/remediation, not late stages |
| EN | `35e1c-en-negation-short-answers` | EARLIER-STAGE GAP + NEEDS CONTENT REVIEW | Audit 02 review-only; block any authoritative use until reviewed |
| EN | `35e1c-en-article-system` | EARLIER-STAGE GAP + NEEDS CONTENT REVIEW | Multi-system overview-like scope needs a placement/modeling decision |
| EN | `en-going-to`, `en-before-after`, `en-enjoy-ing`, `en-between-and` | EARLIER-STAGE GAP | Ignore for new Stage 5–6 content; optionally reuse only if already taught later |
| EN | `en-as-long-as`, `en-look-like`, `en-worried-that`, other unlinked L3 forms | EARLIER-STAGE GAP or Stage 3–4 cleanup | Do not treat as late-stage introductions |
| JA | `ja-plain-nonpast`, `ja-wa-topic`, `ja-wo-object`, `ja-ni-time`, `ja-no-possession`, `ja-i-adjective` | EARLIER-STAGE GAP | Must not be dumped into Stage 5–6 |
| JA | `35e1c-ja-movement-particles`, `35e1c-ja-kara-made-range` | EARLIER-STAGE GAP + NEEDS CONTENT REVIEW | Review system modeling, then place early if approved |
| JA | `ja-te-form`, `ja-nai`, `ja-mae-ni`, `ja-kara-after`, `ja-duration`, `ja-ni-naru` | EARLIER-STAGE GAP | Earlier cleanup/remediation only |
| JA | adjective/plain-tense and permission/prohibition system records | EARLIER-STAGE GAP + NEEDS CONTENT REVIEW | Audit 02-style modeling review before use |
| JA | `ja-tara`, `ja-temo`, `ja-koto-ga-aru`, other specific L3 forms | EARLIER-STAGE GAP or Stage 3–4 review | May return as `REVIEW`, not be introduced as late simply to raise coverage |

The previously cited `en-there-is` and `ja-de-place` are already lesson-linked in the current bundle and are not unlinked gaps.

### Content Quality Audit 02 dependencies

Five current Stage 5–6 grammar records are on the Audit 02 review-only list:

| Record | Current relevance | Remaining risk | Block future Stage 5–6 reliance? |
|---|---|---|---|
| `en-relative-clause` | EN S6 qualification | Slash-separated multi-form answer scope | **Yes** if retained as assessed late-stage authority; review examples/form scope first |
| `en-would-like` | EN S6 invitation | One record combines like/love/prefer | **Yes** for refocused assessment; can remain readable meanwhile |
| `ja-n-desu-ga` | JA S5 background/softening | English structural shorthand and broad discourse function | **Yes** before expanding assessed reliance |
| `ja-node` | JA S5 reasons/requests | Mixed formula (`普通形 + ので / て-form`) and broad scope | **Yes** before expanding assessed reliance |
| `ja-kamoshirenai` | JA S6 uncertainty | English structural label in formula; answer-model review | **Yes** before expanding assessed reliance |

The unlinked `35e1c-en-negation-short-answers` and several Japanese generated comparison/system records are also review-only, but they are classified as earlier-stage gaps rather than Stage 5–6 candidates. `35e1c-ja-workplace-register` and `35e1c-ja-condition-contrast` remain readable overviews only and must not be resurrected as practice authority.

Including the two proposed specific honorific/humble records that need bounded answer modeling, **seven records directly implicated in the design are editorially blocked**. Existing lessons are not being unpublished; the block applies to a future expansion claiming reviewed late-stage authority.

### Japanese register and pragmatics direction

Japanese should deepen pragmatics through specific records, not through the overview rows:

- review `ja-te-morau` (currently `ja-s3-l3`), `ja-honorific-request` (`ja-s2-l3`), and `ja-te-itadaku` (`ja-s4-l5`, `ja-s4-l6`) in more formal contexts;
- clean and then consider `ja-honorific` and `ja-humble` for defined speaker-role contrasts;
- use `ja-indirect-ka`, `ja-hearsay-sou`, `ja-youda`, and `ja-wari-ni` for indirectness, source, inference, and qualification;
- use specific `ja-ba-hodo`, `ja-ni-kakawarazu`, `ja-beki`, and `ja-zaru-wo-enai` only where the communicative outcome warrants their force/register;
- retain the giving/receiving system overview as review-only until a human modeling decision; use existing specific records for practice.

### English late-stage function audit

| Function | Current evidence | Finding |
|---|---|---|
| Hedging | `en-hedged-claim`, `en-may`, `en-not-that` | Partial; add concession/source distinction |
| Indirect questions | Conditional request exists, but no coherent indirect-question outcome | Gap |
| Conditionals | second, third, mixed, even-if | Strongest current late-stage area |
| Modal nuance | may/can/will | Present but basic-heavy and not systematically contrasted |
| Reported/embedded information | No current late-stage record | Gap; reported-statements candidate is ready except CC |
| Relative structures | `en-relative-clause` in S6 | Present but Audit 02 review-only |
| Present/past/perfect distinctions | basic tense review plus perfect-vs-past | Partial; uneven and perfect contrast lacks CC, which is acceptable |
| Argument/support language | S5 L1 and S6 L1 | Good nucleus, insufficient breadth in concession, synthesis, and accountability |

## 7. Expression progression and candidate set

Current Stage 5–6 expression breadth is 34 unique English and 33 unique Japanese expressions. English has no reuse across these stages; Japanese has one reused expression. No Stage 5–6 expression carries an explicit `REVIEW` role. Contextualized share is 32.4% in English (11/34) and 33.3% in Japanese (11/33), and Stage 6 alone is only 4/17 for each.

### Existing expression candidates

| Language | Candidate IDs | Functions | Current state | Readiness |
|---|---|---|---|---|
| EN | `academic-approach-en`, `legacy-49-en` | qualify an approach; polite disagreement | unlinked; D4 | READY |
| EN | `legacy-61-en`, `legacy-63-en`, `legacy-75-en` | renegotiate duties; repair service/neighbour issue; hold plans open | unlinked; contextual D4 | READY |
| EN | `legacy-108-en` | contingency despite forecast | unlinked; D5 sentence | NEEDS CONTEXT |
| EN | `35e1b-en-x-clarify-in-other-words-expr` | clarification by reformulation | unlinked scenario | READY |
| EN | `35e1b-en-x-repair-not-blaming-expr`, `35e1b-en-x-repair-tone-expr` | repair blame/tone | unlinked scenarios | READY |
| EN | `35e1b-en-d-group-disagree-expr`, `35e1b-en-d-misunderstanding-tone-expr` | negotiate disagreement; repair workplace misunderstanding | unlinked six-turn dialogues | READY |
| EN | `legacy-135-en`, `legacy-145-en`, `legacy-156-en`, `legacy-159-en` | pressure/boundaries; respectful preference; personal boundary; polite exit | linked Stage 4; proposed reuse | three READY; `legacy-156-en` NEEDS CONTEXT under strict test |
| JA | `legacy-37-ja`, `legacy-39-ja`, `legacy-49-ja` | formal service replacement; order repair; polite disagreement | unlinked contextual D4 | READY |
| JA | `legacy-51-ja`, `legacy-61-ja`, `legacy-63-ja`, `legacy-75-ja` | prioritize scope; renegotiate duties; soften complaint; keep plans open | unlinked contextual D4 | READY |
| JA | `legacy-108-ja` | contingency regardless of forecast | unlinked D5 sentence | NEEDS CONTEXT |
| JA | `35e1b-ja-x-clarify-in-other-words-expr` | clarification by reformulation | unlinked scenario | READY |
| JA | `35e1b-ja-d-group-disagree-expr`, `35e1b-ja-d-misunderstanding-tone-expr` | negotiate disagreement; repair workplace misunderstanding | unlinked six-turn dialogues | READY |
| JA | `legacy-109-ja`, `legacy-111-ja`, `legacy-147-ja`, `legacy-156-ja` | avoid risk; defer uncertain decision; qualify career advice; personal boundary | linked Stage 4; proposed reuse | three READY; `legacy-156-ja` NEEDS CONTEXT under strict test |

This is a usable shortlist of **30 expressions** (15 per language): 26 context-ready and four requiring explicit standalone context. The list supports disagreement, uncertainty, clarification, negotiation, formality, reasoning, qualification, and misunderstanding repair without creating new canonical expressions.

### Deliberate Stage 2–4 expression reuse

| Expression | Original lesson | Proposed later use | Why repetition is useful |
|---|---|---|---|
| `legacy-135-en` | `en-s4-l1` | EN S5 problem negotiation | Reuses boundary/pressure language with higher-stakes reasoning |
| `legacy-145-en` | `en-s4-l4` | EN S6 qualified disagreement | Moves respectful preference from hobbies to argument |
| `legacy-156-en` | `en-s4-l2` | EN S5 service/workplace boundary | Revisits non-rejection framing; add context first |
| `legacy-159-en` | `en-s4-l2` | EN S6 pressure-free commitment | Extends polite exit from social to formal scheduling |
| `legacy-109-ja` | `ja-s4-l1` | JA S5 contingency negotiation | Reuses risk avoidance with more explicit justification |
| `legacy-111-ja` | `ja-s4-l1` | JA S6 uncertainty/conditional decision | Revisits deferred decision-making in a formal setting |
| `legacy-147-ja` | `ja-s4-l4` | JA S6 qualified recommendation | Moves reservation language from hobbies to a reasoned choice |
| `legacy-156-ja` | `ja-s4-l3` | JA S5 boundary/repair | Reuses `わけではなく` pragmatically; add standalone context |

## 8. Review and reinforcement strategy

Expansion 01 targets are 68.1% `NEW`, 13.4% `REVIEW`, and 18.5% `SUPPORT`. Future Stage 5–6 lessons should be less introduction-heavy. A flexible starting range per lesson is:

- `NEW`: approximately **40–55%** of relationships;
- `REVIEW`: approximately **25–35%**;
- `SUPPORT`: approximately **15–25%**.

These are planning bands, not quotas. A lesson should normally revisit two to four earlier high-value assessable items and one earlier expression when the scenario naturally supports them. Reuse should change discourse demand—such as moving a Stage 4 boundary phrase into a workplace negotiation—not merely repeat the same prompt. Foundational grammar used in Stage 5–6 must be explicitly `REVIEW` or `SUPPORT`, while genuinely new late forms require reviewed examples and a clear outcome.

This mix can preserve the current 30+ opportunity density with roughly 7–9 vocabulary links and 2–3 practice-eligible grammar links per lesson. Controlled completion should be used where safe authored occurrences exist, not manufactured as a universal requirement.

## 9. Editorial readiness and cost

### Shortlist readiness

| Candidate group | READY | NEEDS EXAMPLE | NEEDS CONTEXT | NEEDS GRAMMAR EDIT | BLOCKED |
|---|---:|---:|---:|---:|---:|
| Vocabulary shortlist (40) | 0 as full lesson-ready records | 40 | 0 | 0 | 0 |
| Unlinked grammar shortlist (19) | 1 | 18 | 0 | 2 of the 18 | 2 |
| Expression shortlist (30) | 26 | 0 | 4 | 0 | 0 |
| Current late-stage Audit 02 dependencies (5) | 0 | varies | 0 | 5 | 5 |

`READY` here is strict: a one-example vocabulary record is not declared lesson-ready even when its semantic fit is high. The existing example strings are generally useful collocations rather than full situational sentences.

If the whole shortlist proceeded to review, the minimum human workload would be:

- 40 vocabulary selection decisions and at least 40 new sentence-level contextual examples; if only the 32 new/support candidates proceed, at least 32 examples;
- 19 grammar decisions; 18 one-example records would need about three additional varied examples each to reach four (up to 54 examples), plus bounded answer/model edits for `ja-honorific` and `ja-humble`;
- five current Audit 02 grammar decisions before expanded assessed reliance;
- 30 expression decisions and four standalone-context additions;
- lesson-level review of accepted answers, register, role, sequence, and distractor/CC safety after final candidates are selected.

The strict editorial-blocked count is **seven grammar records** directly implicated in the proposed design. Example/context work is substantial but is treated as actionable dependency rather than a hard conceptual block.

## 10. Design options and authored-time target

| Option | Stage 5–6 lessons per language | Authored time | Strength | Main limitation |
|---|---:|---:|---|---|
| A. Keep eight and densify/refocus only | 8 | 120–150 min | Lowest scope and prerequisite risk | Cannot cover the 13–15 proposed outcomes without overloaded lessons; tail remains collapsed |
| B. Add a small set without systematic refocus | 12–14 | 180–210 min | Adds missing functions | Leaves current misaligned invitation/travel/planning lessons and role debt unresolved |
| C. Hybrid: retain/refocus plus bounded new slots | 14–16 | 210–240 min | Repairs alignment, adds outcomes, and authors review structure | Highest editorial workload of the bounded options |

The language-specific result is the same choice for different reasons: English needs reported-information, concession, and negotiation breadth, while Japanese needs specific register, conditional nuance, and formal-pragmatic breadth. Option A leaves those gaps in both languages; Option B adds breadth without correcting the current weakly aligned lessons.

| Candidate time per language | Interpretation |
|---:|---|
| 180 min | Six additional 15-minute lessons; viable minimum, but likely forces outcome combinations |
| **240 min** | Eight additional lessons; enough for the proposed focused slots and review structure |
| 300 min | Twelve additional lessons; not yet justified by the bounded evidence |
| 360 min | Sixteen additional lessons; excessive before candidate/editorial validation |

**Recommended target: 240 authored Stage 5–6 minutes per language**, split as 120 minutes per stage. This is not the largest examined target. At eight focused 15-minute lessons per stage, it matches the breadth of current English Stage 3 without requiring Stage 5 or 6 individually to exceed it.

A coherent authored-time profile would become:

| Language | S1 | S2 | S3 | S4 | Proposed S5 | Proposed S6 | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| English | 60 | 78 | 150 | 96 | **120** | **120** | **624 min / 10.4 h** |
| Japanese | 60 | 96 | 132 | 96 | **120** | **120** | **624 min / 10.4 h** |

This removes the 60-minute collapsed tail while preserving Stage 3 as a broad middle-course consolidation stage.

## 11. Internal metadata targets

These are composition bands for selected unique items in a stage, not requirements that every item match the stage number.

| Stage | Vocabulary L3 / L4 / L5 / L6 | Grammar L3 / L4 / L5 / L6 | Rationale |
|---|---|---|---|
| EN S5 | 20–30% / 40–50% / 20–30% / 0–5% | 20–30% / 35–45% / 25–35% / 0–10% | Build from familiar language toward evaluation/negotiation |
| EN S6 | 10–20% / 35–45% / 30–40% / 10–20% | 10–20% / 25–35% / 25–35% / 20–30% | Add selective formal precision without turning the stage into an academic word list |
| JA S5 | 25–35% / 40–50% / 15–25% / 0–5% | 25–35% / 35–45% / 20–30% / 0–10% | Pragmatic/register depth can advance even with moderate vocabulary |
| JA S6 | 15–25% / 40–50% / 25–35% / 0–10% | 10–20% / 30–40% / 25–35% / 20–30% | Prefer L4/5 vocabulary plus advanced grammar/pragmatics; use L6 only when natural |

Japanese Stage 6 cannot responsibly be built around its 21-record level-6 vocabulary pool. Those records are narrow, often formal/academic, and each has only one collocation example. Stage 6 should rely primarily on well-reviewed level-4/5 vocabulary and advanced grammar/pragmatics, with a small number of level-6 items such as `不測の事態` or `説明責任` only where the outcome warrants them.

## 12. Proposed Stage 5 planning matrices

All slots target approximately 7–9 vocabulary, 2–3 grammar, and 4 expressions; 13–16 total links; 10 or more assessable items; and 30+ safe opportunities where naturally supported. Role bands are approximate.

### English Stage 5

| Slot | Proposed outcome | Existing/new | Current ID | Target V/G/E | Roles N/R/S | Minutes | Editorial dependencies |
|---|---|---|---|---:|---|---:|---|
| 1 | Evaluate a work plan under evidence and constraints | existing | `en-s5-l1` | 8/3/4 | 45/35/20 | 15 | examples for evaluation vocabulary; preserve late grammar |
| 2 | Compare alternatives and explain trade-offs | new | — | 8/3/4 | 50/30/20 | 15 | `trade-off`, `feasible`, qualified comparison candidates |
| 3 | Negotiate priorities/resources toward consensus | new | — | 8/3/4 | 45/35/20 | 15 | priority/consensus examples; contextual dialogue |
| 4 | Handle itinerary uncertainty and contingencies | existing, refocus | `en-s5-l2` | 8/3/4 | 40/35/25 | 15 | reuse schedule language; add contingency context |
| 5 | Escalate a service/workplace problem appropriately | existing | `en-s5-l3` | 8/3/4 | 45/30/25 | 15 | repair expressions; request-form review |
| 6 | Clarify information and repair misunderstanding | new | — | 8/3/4 | 45/35/20 | 15 | use ready repair dialogues; `clarify` example |
| 7 | Relate past outcomes to current decisions | existing, refocus | `en-s5-l4` | 8/3/4 | 40/35/25 | 15 | remove objective overlap with S6 synthesis |
| 8 | Report information and distinguish observation from interpretation | new | — | 8/3/4 | 50/30/20 | 15 | reported-statements examples ready; no CC requirement |

### Japanese Stage 5

| Slot | Proposed outcome | Existing/new | Current ID | Target V/G/E | Roles N/R/S | Minutes | Editorial dependencies |
|---|---|---|---|---:|---|---:|---|
| 1 | State a formal judgment with limitations | existing | `ja-s5-l1` | 8/3/4 | 45/35/20 | 15 | add L4/5 evidence vocabulary and context |
| 2 | Make considerate requests with background | existing | `ja-s5-l2` | 8/3/4 | 40/35/25 | 15 | block on `んですが`/`ので` review for expanded assessment |
| 3 | Use specific honorific/humble choices in a defined service role | new | — | 8/3/4 | 50/30/20 | 15 | blocked until specific answer models are bounded |
| 4 | Negotiate schedule alternatives with conditions | existing, refocus | `ja-s5-l3` | 8/3/4 | 40/35/25 | 15 | replace basic-only progression with reviewed specific condition forms |
| 5 | Express burden, concern, and reservation softly | existing | `ja-s5-l4` | 8/3/4 | 45/35/20 | 15 | review softening grammar and examples |
| 6 | Repair misunderstanding without assigning blame | new | — | 8/3/4 | 45/35/20 | 15 | ready workplace-repair dialogue |
| 7 | Compare priorities/trade-offs and reach agreement | new | — | 8/3/4 | 50/30/20 | 15 | L4/5 vocabulary examples; dialogue context |
| 8 | Track benefit and choose giving/receiving language | new | — | 8/3/4 | 40/40/20 | 15 | review specific earlier records; do not use overview as authority |

## 13. Proposed Stage 6 planning matrices

### English Stage 6

| Slot | Proposed outcome | Existing/new | Current ID | Target V/G/E | Roles N/R/S | Minutes | Editorial dependencies |
|---|---|---|---|---:|---|---:|---|
| 1 | Build an evidence-led argument | existing | `en-s6-l1` | 8/3/4 | 45/35/20 | 15 | add reviewed L5/6 vocabulary without academic overload |
| 2 | Hedge, concede, and answer a counter-position | existing, densify | `en-s6-l2` | 8/3/4 | 45/35/20 | 15 | Audit 02 review for relative-clause reliance |
| 3 | Qualify a comparison and state limitations | new | — | 8/3/4 | 50/30/20 | 15 | qualified-comparison examples/context |
| 4 | Synthesize reported/embedded information | new | — | 8/3/4 | 50/30/20 | 15 | reported-statements; inspect indirect-question gap |
| 5 | Explain interacting past/present hypothetical consequences | new | — | 8/3/4 | 45/35/20 | 15 | reuse second/third/mixed conditionals, few new forms |
| 6 | Reconcile competing demands and accountability | new | — | 8/3/4 | 50/30/20 | 15 | contingency/accountability vocabulary and negotiation dialogue |
| 7 | Manage pressure-free commitments/invitations | existing, refocus | `en-s6-l3` | 8/3/4 | 35/40/25 | 15 | review or reorder; block `would like` expansion pending audit |
| 8 | Synthesize experience, result, and future direction | existing, refocus | `en-s6-l4` | 8/3/4 | 40/40/20 | 15 | increase level and distinguish from EN S5 slot 7 |

### Japanese Stage 6

| Slot | Proposed outcome | Existing/new | Current ID | Target V/G/E | Roles N/R/S | Minutes | Editorial dependencies |
|---|---|---|---|---:|---|---:|---|
| 1 | Organize evidence, reasoning, and conclusion | existing | `ja-s6-l1` | 8/3/4 | 45/35/20 | 15 | L5/selected L6 examples and contextual expression |
| 2 | Hedge, concede, and limit a claim | existing, densify | `ja-s6-l2` | 8/3/4 | 45/35/20 | 15 | Audit 02 review for `かもしれない`; add concession |
| 3 | Report formally with specific honorific/humble roles | new | — | 8/3/4 | 50/30/20 | 15 | blocked on bounded specific grammar models |
| 4 | Embed questions and distinguish report from inference | new | — | 8/3/4 | 50/30/20 | 15 | `か`, hearsay, `ようだ`; examples required |
| 5 | Apply conditional/concessive nuance to decisions | new | — | 8/3/4 | 45/35/20 | 15 | specific records only; overview remains non-assessed |
| 6 | Negotiate contingencies and accountability politely | new | — | 8/3/4 | 50/30/20 | 15 | selected formal vocabulary; contextual dialogue |
| 7 | Reflect on experience and state a qualified judgment | existing | `ja-s6-l3` | 8/3/4 | 40/40/20 | 15 | deliberate Stage 4/5 reuse; add L4/5 vocabulary |
| 8 | Manage formal commitments and schedule changes | existing, refocus | `ja-s6-l4` | 8/3/4 | 35/40/25 | 15 | review/reorder basic invitation material; do not inflate level labels |

## 14. Bilingual parity and prerequisite design

The designs intentionally share time, breadth, and review expectations without forcing literal content matching:

| Measure | English target | Japanese target |
|---|---:|---:|
| Stage 5 outcomes | 7 | 7 |
| Stage 6 outcomes | 7 | 8 |
| Stage 5–6 lessons | 16 | 16 |
| Stage 5–6 authored time | 240 min | 240 min |
| Typical assessable breadth per lesson | 10+ | 10+ |
| Typical REVIEW share | 25–35% | 25–35% |
| Progression emphasis | qualification, reported information, argument/negotiation | register, indirectness, qualification, formal reasoning |

Possible future prerequisite placement should be a single linear mandatory sequence per language:

1. current Stage 4 terminal lesson;
2. all reviewed Stage 5 slots in approved order;
3. all reviewed Stage 6 slots in approved order;
4. any later stage/terminal node.

New slots should be inserted between named predecessor/successor lessons, with the successor edge replaced rather than creating parallel optional branches. A graph gate must prove connectedness, acyclicity, one root, language isolation, and no bypass. This document proposes no actual edge.

## 15. Bounded implementation envelope

Option C has this planning envelope per language:

- six to eight possible additional lessons; the recommended full matrix uses eight;
- approximately 56–64 vocabulary links, 16–24 grammar links, and 32 expression links for eight new slots;
- across both languages, approximately **112–128 vocabulary**, **32–48 grammar**, and **64 expression** relationships, or **208–240 added relationships**;
- approximately 20–32 unique vocabulary introductions per language (40–64 total), with the rest deliberate review/support;
- approximately 6–9 unique grammar integrations and 18–26 unique expression integrations per language, subject to review and reuse choices;
- at least 32–40 vocabulary sentence examples, up to 54 grammar examples for the full shortlist, four expression contexts, seven blocking grammar decisions, and lesson-level bilingual/register/answer review.

These ranges are estimates, not an approved matrix of production links. Refocusing current lessons may replace rather than add relationships, so net totals cannot be exact before human selection.

## 16. Estimated course impact

If the recommended 240-minute Stage 5–6 design were implemented and made mandatory:

- authored time would rise from 504 to about **624 minutes / 10.4 hours per language**;
- the transparent 2–3× learner-time planning range would rise from 16.8–25.2 to about **20.8–31.2 hours** per language (26 hours at the midpoint);
- guided unique vocabulary could rise approximately from 177 to 197–209 EN and 167 to 187–199 JA;
- linked grammar could plausibly rise by 6–9 unique records per language, taking EN from 54 to roughly 60–63 (about 73–77% of 82) and JA from 54 to roughly 60–63 (about 62–65% of 97), with overview exclusions preserved;
- unique expressions could plausibly rise by 18–26 per language, taking EN to roughly 142–150 and JA to 138–146;
- late-stage vocabulary would shift materially toward levels 4/5, with selective level 6 only where reviewed and justified;
- explicit review relationships and expression reuse would become part of the authored design rather than accidental repetition.

These are bounded estimates. Exact coverage and unique counts depend on final approved reuse and cannot be claimed before implementation.

## 17. Exit criteria for a moderate guided course

Moving from `stronger light introductory` toward `moderate guided course` should require all of the following project-specific evidence, not a stage label or external-framework claim:

1. **Authored path:** roughly 12 or more coherent authored hours per language, or equivalent evidence that 10–12 hours provides comparable outcome breadth; every stage has an explicit role in the progression.
2. **Late-stage breadth:** Stage 5 and Stage 6 each provide about 90–120 focused minutes and cover their reviewed exit outcomes without overloaded lessons.
3. **Assessable breadth:** approximately 260–300 unique assessable items per language, with no lesson below safe completion/practice thresholds.
4. **Internal progression:** Stage 5–6 vocabulary is materially concentrated in levels 4/5 with selective reviewed level 6; grammar/pragmatic demand increases even when foundational forms return as review.
5. **Reinforcement:** new late-stage relationships are role-authored, typical REVIEW share is about 25–35%, and high-value expressions recur in meaningfully changed contexts.
6. **Editorial readiness:** all linked vocabulary has a suitable sentence example; new late-stage introductions normally have at least two reviewed examples; newly relied-on late grammar has varied examples and bounded answers; at least 70% of Stage 5–6 expressions pass the strict contextualization test.
7. **Path integrity:** one connected, acyclic, language-isolated mandatory path with no accidental optional-branch bypass.
8. **Claim discipline:** internal outcomes are stated directly; no CEFR/JLPT equivalence is inferred without separate reviewed alignment evidence.

The proposed 10.4-hour design would move both courses closer to moderate, but would not by authored time alone guarantee reclassification. A post-implementation audit must test all exit criteria.

## Final strategy decision

Choose **C: hybrid**, implemented **Stage 5 first, then Stage 6** as separate reviewed releases.

Stage 5 first is the safer dependency order: it can resolve foundational-review placement, author the new role/repetition model, clean the relevant Audit 02 records, and establish a mandatory linear transition before Stage 6 relies on those outcomes. Stage 6 can then be designed as genuine synthesis and register/argument progression rather than another independent content batch.

## Safety confirmation

After the initial documentation-only commit, this audit added only `docs/STAGE-5-6-PROGRESSION-DESIGN-AUDIT-01.md`. It did not create or edit lessons, curriculum links, prerequisites, instructional roles, canonical records, migrations, D1 data, learner state, branches, or deployments. Expansion 02 was not started.
