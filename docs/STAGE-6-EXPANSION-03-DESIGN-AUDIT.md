# EJ Learning — Stage 6 Expansion 03 Design Audit

**Audit date:** 2026-09-16

**Scope:** read-only six-slot curriculum design and human-approval audit

**Audited revision:** `8db29b0fd6d0eea0570786e984e94a4488ce3861` on `main`

**Current bundle:** `curriculum-stage5-expansion-02-v1`

**Dataset marker:** `2026-09-stage5-expansion-02-v1`

**Authority:** planning candidates only; no relationship in this document is implementation-authorized

## Executive decision

The evidence still supports **exactly six Stage 6 lessons / approximately 90 authored minutes per language**: refocus or densify all four current lessons and add exactly two new slots. It does not support eight lessons. The proposed design changes Stage 6 from a short collection of uneven capstone islands into one linear synthesis path with deliberate review, substantially stronger context, and a genuine reflective ending.

The exact planning matrix contains, per language, 48 vocabulary, 18 authoritative grammar, and 24 expression relationships: 90 relationships across six 15-minute lessons. Each slot is 8/3/4 V/G/E, 11 assessable items, and an estimated 30–33 safe deterministic opportunities. The aggregate role mix is EN **32 NEW / 31 REVIEW / 27 SUPPORT** and JA **35 / 31 / 24**, within the requested capstone bands.

Two selected grammar dependencies are blocking: `en-would-like` and `ja-kamoshirenai`. They may remain readable in the current course, but a future implementation must not claim reviewed Stage 6 assessment authority until Content Quality Audit 02 review closes. `en-relative-clause` is not selected for the final matrix and therefore is review debt, not a blocker for this design.

## 1. Baseline, method, and safety

The Post-Stage-5 audit was committed and pushed first as the docs-only commit `8db29b0fd6d0eea0570786e984e94a4488ce3861`. After that commit, `main`, `HEAD`, and `origin/main` matched and the worktree was clean.

This audit reads the current Stage 5 bundle source, canonical metadata, the approved Stage 5 relationship matrix/editorial payload, the two progression and content-quality audits, and the current local canonical snapshot. It does not query or mutate remote D1. Definitions follow the Post-Stage-5 audit:

- assessable = unique vocabulary plus authoritative grammar; expressions are excluded;
- safe opportunities = three vocabulary modes, two grammar modes, plus controlled completion only where sentence-local authority is valid;
- strict expression context = canonical dialogue/scenario/context metadata or an approved versioned context;
- NEW/REVIEW/SUPPORT are instructional roles, not grading weights;
- a REVIEW row names a specific source in Stages 1–5; intra-Stage-6 repetition is SUPPORT, not REVIEW;
- `APPROVE` approves a planning relationship for later editorial preparation only; it is not implementation authorization.

Current whole-course baseline:

| Language | Lessons | Authored minutes | Unique assessable | Current internal classification |
|---|---:|---:|---:|---|
| English | 36 | 564 / 9.4 h | 252 | APPROACHING MODERATE |
| Japanese | 36 | 564 / 9.4 h | 236 | APPROACHING MODERATE |

Current Stage 6 is four lessons/60 minutes per language, has no explicit instructional roles, and has only 4/17 strictly contextual expressions in each language. Its basic practice density is adequate; its weak points are synthesis, deliberate review, discourse context, late vocabulary consistency, and formal accountability/commitment endings.

## 2. Current Stage 6 inventory

All links below are current runtime-active links. `V`, `G`, and `E` list canonical IDs with internal vocabulary/grammar level or expression difficulty. The source has no Stage-6-authored NEW/REVIEW/SUPPORT value, so the role field is currently absent rather than implicitly NEW.

### English

| Lesson | Current title / objective | Min.; prerequisite | Current links | Unique / assessable / opportunities | CC; strict context/assets | Overlap |
|---|---|---|---|---|---|---|
| `en-s6-l1` | 陈述观点并用依据支持 / 能在较正式讨论中提出主张和理由。 | 15; `en-s5-08-reporting` | V: `en-c-1089` L3, `en-c-1093` L3, `en-c-1101` L3, `en-c-1105` L3, `en-c-137` L1, `en-c-3172` L1, `en-c-3174` L1, `en-c-533` L3. G: `en-inversion` L6, `en-mixed-conditional` L6, `en-participle-clause` L6. E: `lesson-en-inversion-ex` D6, `lesson-en-participle-clause-ex` D6, `lesson-en-qualified-comparison-ex` D6, `lesson-en-mixed-conditional-ex` D6. | 8/3/4; 11; 33 | 3 CC grammar; 0/4 context; no dialogue/scenario | no S5 overlap; `en-c-137` also in S6.2 |
| `en-s6-l2` | 澄清语气并讨论假设 / 能修正过强语气，并用假设说明不同可能。 | 15; `en-s6-l1` | V: `en-c-085` L1, `en-c-137` L1, `en-c-277` L2, `en-c-609` L4, `en-c-685` L4, `en-c-909` L3, `en-c-3215` L4, `en-c-481` L3. G: `en-not-that` L5, `en-relative-clause` L4, `en-second-conditional` L4. E: `legacy-27-en` D4, `legacy-24-en` D4, `lesson-en-relative-clause-ex` D4, `lesson-en-second-conditional-ex` D4. | 8/3/4; 11; 33 | 3 CC grammar; 1/4 context; one canonical dialogue | S5: `en-not-that`, `en-c-609`, `en-c-685`; S6.1: `en-c-137` |
| `en-s6-l3` | 发出邀请并照顾对方选择 / 能提出活动邀请并给对方自然接受或拒绝的空间。 | 15; `en-s6-l2` | V: `en-c-3180` L2, `en-c-053` L1, `en-c-2209` L3, `en-c-3176` L1, `en-c-417` L2, `en-go` L1, `en-c-2247` L4, `en-c-597` L3. G: `en-let-us` L2, `en-would-like` L2. E: `apology-en-casual` D2, `legacy-148-en` D2, `legacy-150-en` D2, `legacy-152-en` D2, `35e1b-en-d-invitation-decline-expr` D2. | 8/2/5; 10; 30 | 2 CC grammar; 2/5 context; one scenario + one six-turn dialogue | no S5 or other-S6 overlap |
| `en-s6-l4` | 回顾经历并展望目标 / 能连接过去经验、当前判断与未来目标。 | 15; `en-s6-l3` | V: `en-look-forward-to` L2, `en-plan` L2, `en-leave` L2, `en-tomorrow` L1, `en-c-3178` L1, `en-yet` L2, `en-c-1081` L4, `en-c-1085` L4. G: `en-ellipsis` L2, `en-plan-to` L2, `en-simple-present` L1, `35e1c-en-perfect-vs-past` L4. E: `looking-forward-en` D3, `legacy-178-en` D3, `legacy-175-en` D4, `leave-tomorrow-en` D2. | 8/4/4; 12; 35 | 3 CC grammar; 1/4 context; one contextual asset | S5: `en-c-1081`, `en-c-1085`, `en-leave`; no other-S6 overlap |

English current total: 31 unique V, 12 unique authoritative G, 17 unique E, 43 unique assessable, and 4/17 strict-context expressions.

### Japanese

| Lesson | Current title / objective | Min.; prerequisite | Current links | Unique / assessable / opportunities | CC; strict context/assets | Overlap |
|---|---|---|---|---|---|---|
| `ja-s6-l1` | 根拠を整理して説明する / 能以较正式的日语组织观点、依据和结论。 | 15; `ja-s5-08-benefit` | V: `ja-c-1115` L3, `ja-c-535` L3, `ja-yotei` L2, `ja-c-3207` L5, `ja-c-607` L4, `ja-c-651` L4, `ja-c-683` L4, `ja-c-3205` L4. G: `ja-ni-hoka-naranai` L6, `ja-ni-suginai` L6, `ja-wo-fumaete` L6. E: `lesson-ja-zaru-wo-enai-ex` D6, `lesson-ja-wo-fumaete-ex` D6, `lesson-ja-ni-hoka-naranai-ex` D6, `lesson-ja-ni-suginai-ex` D6. | 8/3/4; 11; 33 | 3 CC grammar; 0/4 context; no dialogue/scenario | S5: `ja-c-1115`, `ja-c-3207`, `ja-c-607`, `ja-c-651`, `ja-c-683`, `ja-c-3205`; S6: `ja-yotei`, `ja-c-3207` recur |
| `ja-s6-l2` | 確認しながら控えめに意見を述べる / 能确认理解，并以保留或缓和方式表达判断。 | 15; `ja-s6-l1` | V: `ja-c-295` L2, `ja-c-403` L2, `ja-c-699` L4, `ja-c-911` L3, `ja-yotei` L2, `ja-c-1799` L3, `ja-c-3217` L4, `ja-c-611` L3. G: `ja-causative-request` L4, `ja-te-oku` L3, `ja-wake-dewa-nai` L4. E: `legacy-23-ja` D4, `legacy-24-ja` D4, `lesson-ja-te-oku-ex` D4, `lesson-ja-youda-ex` D4. | 8/3/4; 11; 33 | 3 CC grammar; 0/4 context; none | S5: `ja-wake-dewa-nai`, `ja-c-295`; S6: `ja-yotei` |
| `ja-s6-l3` | 経験を振り返り判断を伝える / 能连接经历、反思和当前判断。 | 15; `ja-s6-l2` | V: `ja-iku` L1, `ja-kyuuni` L2, `ja-youji` L2, `ja-dekiru` L1, `ja-c-063` L1, `ja-c-1083` L3, `ja-c-3207` L5, `ja-c-371` L2. G: `ja-kai` L5, `ja-koto-ni-suru` L4, `ja-no-nominalizer` L3. E: `legacy-183-ja` D5, `changed-plan-ja` D5, `legacy-177-ja` D4, `legacy-179-ja` D4. | 8/3/4; 11; 33 | 3 CC grammar; 2/4 context; two dialogues | S5: `ja-c-3207`; S6.1: `ja-c-3207` |
| `ja-s6-l4` | 誘いに応じ、予定変更を伝える / 能回应邀请，并得体说明自己可能提前离场。 | 15; `ja-s6-l3` | V: `ja-daijoubu` L1, `ja-c-3203` L2, `ja-c-367` L2, `ja-c-419` L2, `ja-taberu` L1, `ja-c-1123` L4, `ja-yotei` L2, `ja-c-1023` L3. G: `ja-copula` L1, `ja-kamoshirenai` L3, `ja-masen-ka` L2. E: `legacy-155-ja` D3, `legacy-150-ja` D2, `legacy-152-ja` D2, `apology-ja` D1, `35e1b-ja-d-invitation-condition-expr` D2. | 8/3/5; 11; 33 | 3 CC grammar; 2/5 context; one scenario + one six-turn dialogue | earlier stages: `ja-copula`, `ja-masen-ka`, `ja-c-1123`, `ja-yotei`; S6.1/2: `ja-yotei` |

Japanese current total: 29 unique V, 12 unique authoritative G, 17 unique E, 41 unique assessable, and 4/17 strict-context expressions.

## 3. Existing lesson dispositions and outcome mapping

No lesson is deleted or split. `REORDER` below is a proposal only.

### English

| Current lesson | Alignment / disposition | Retain | REVIEW / SUPPORT | Too basic or earlier | Advanced / debt / refocus |
|---|---|---|---|---|---|
| `en-s6-l1` | PARTIALLY ALIGNED; **KEEP + DENSIFY** | evidence-led claim, inversion, participle clause | evidence/justification from S5 as REVIEW; accuracy/relevance as SUPPORT | basic general nouns and unrelated offer/abroad vocabulary | Advanced L6 grammar is isolated from discourse. Refocus title/objective around a qualified evidence-led argument and add a short scenario. |
| `en-s6-l2` | PARTIALLY ALIGNED; **REFOCUS** | second/mixed/third-conditional reasoning and counter-position | assumption from S5 as REVIEW; limitation/perspective as SUPPORT | basic book/time/learn; relative clause belongs earlier if its model is approved | `en-relative-clause` is CQ review debt. Refocus from tone repair plus miscellaneous grammar to counterfactual reasoning with concession. |
| `en-s6-l3` | MISALIGNED as NEW; **REFOCUS** | pressure-free choice and invitation-decline dialogue | `en-would-like` as blocked REVIEW; schedule language as SUPPORT | `Let's`, lunch/go/walk/thanks and basic invitation mechanics belong earlier | Preserve the pragmatic value but raise the demand to formal commitments, scope, and non-coercive negotiation. Add no basic grammar as NEW. |
| `en-s6-l4` | PARTIALLY ALIGNED; **REFOCUS** | retrospective result, current judgment, future direction | perfect-vs-past and should-have as REVIEW; plan language as SUPPORT | simple present, ellipsis, tomorrow/yet as Stage-6 NEW | Make this the terminal capstone. It should synthesize evidence, consequences, accountability, and a future commitment, not introduce a new grammar cluster. |

### Japanese

| Current lesson | Alignment / disposition | Retain | REVIEW / SUPPORT | Too basic or earlier | Advanced / debt / refocus |
|---|---|---|---|---|---|
| `ja-s6-l1` | WELL ALIGNED; **KEEP + DENSIFY** | `にほかならない`, `にすぎない`, `を踏まえて`; structured reasoning | `絞る`/`判断` as REVIEW; scope/consequence vocabulary as SUPPORT | `予定` is background only | Strong L6 grammar, but all four expressions lack strict context. Add practical evidence vocabulary and a short decision scenario. |
| `ja-s6-l2` | PARTIALLY ALIGNED; **REFOCUS** | cautious judgment, partial denial, inference | `わけではない`/`ようだ` as REVIEW; repair vocabulary as SUPPORT | schedule/request preparation does not form one outcome | Refocus on qualification, evidence versus inference, and concession. `かもしれない` remains a blocking candidate if assessed. |
| `ja-s6-l3` | WELL ALIGNED; **REORDER + REFOCUS** | reflection, `甲斐`, decision language, outcome dialogue | `べき`, prior results/judgment as REVIEW; basic experience vocabulary as SUPPORT | nominalization and basic movement/ability are not Stage-6 NEW | Move to slot 6 so the course ends in reflective transfer and accountable next action. |
| `ja-s6-l4` | MISALIGNED as NEW; **REORDER + REFOCUS** | considerate schedule change and conditional invitation asset | formal request/register as REVIEW; basic schedule language as SUPPORT | copula, `ませんか`, food/invitation mechanics belong earlier | Move before reflection and refocus on formal commitments, constraint disclosure, and pressure control. |

## 4. Final six outcomes and sequence

### English

1. Build a qualified, evidence-led argument and state a bounded conclusion.
2. Reason through counterfactual consequences, concede a counter-position, and qualify uncertainty.
3. **NEW synthesis slot:** combine reported information, evidence, and inference without presenting assumptions as facts.
4. **NEW transfer slot:** reconcile competing demands, assign accountability, propose mitigation, and make a formal commitment.
5. Turn the current invitation material into pressure-free professional commitments and schedule negotiation.
6. End with reflective synthesis: relate evidence and outcomes, accept responsibility, and commit to a next step.

### Japanese

1. Organize evidence and reasoning into a qualified formal conclusion.
2. Distinguish evidence, inference, and concession while expressing a cautious judgment.
3. **NEW synthesis slot:** embed/report information and make a qualified conditional decision.
4. **NEW transfer slot:** negotiate a contingency and accountability in an appropriate formal register.
5. Refocus the current invitation/schedule material into considerate formal commitments and constraint disclosure.
6. End with reflective synthesis: evaluate the result, acknowledge responsibility, and state the next action.

## 5. Exact relationship-level candidate matrix

Legend: `N/R/S` = NEW/REVIEW/SUPPORT. Status suffixes are `A` = APPROVE, `RR` = REVIEW REQUIRED, `B` = BLOCKED. Approval is design approval only. REVIEW sources are given after each table; repeated content introduced inside Stage 6 is SUPPORT rather than REVIEW.

### English — 90 relationships

| Slot | Type | Exact candidate relationships | N/R/S |
|---:|---|---|---:|
| 1 | V | `en-c-757` R/A; `en-c-1093` N/A; `en-c-729` N/RR; `en-c-709` S/A; `en-c-801` S/A; `en-c-733` R/A; `en-c-777` N/RR; `en-c-741` N/RR | 4/2/2 |
| 1 | G | `en-inversion` N/RR; `en-participle-clause` N/RR; `en-qualified-comparison` N/RR | 3/0/0 |
| 1 | E | `lesson-en-inversion-ex` N/RR; `lesson-en-participle-clause-ex` N/RR; `academic-approach-en` S/A; `legacy-49-en` R/A | 2/1/1 |
| 2 | V | `en-c-761` R/A; `en-c-769` S/A; `en-c-773` S/A; `en-c-1109` N/RR; `en-c-681` N/RR; `en-c-645` S/A; `en-c-697` N/RR; `en-c-765` N/RR | 4/1/3 |
| 2 | G | `en-mixed-conditional` N/RR; `en-second-conditional` N/RR; `en-third-conditional` R/RR | 2/1/0 |
| 2 | E | `lesson-en-mixed-conditional-ex` N/RR; `lesson-en-second-conditional-ex` N/RR; `legacy-145-en` S/A; `legacy-108-en` S/A | 2/0/2 |
| 3 | V | `en-c-757` R/A; `en-c-1093` S/A; `en-c-737` R/A; `en-c-633` N/RR; `en-c-637` N/RR; `en-c-805` N/RR; `en-c-841` N/RR; `en-c-817` N/RR | 5/2/1 |
| 3 | G | `35e1c-en-reported-statements` R/A; `en-concessive-although` R/A; `en-hedged-claim` R/RR | 0/3/0 |
| 3 | E | `35e1b-en-d-group-disagree-expr` R/A; `35e1b-en-d-misunderstanding-tone-expr` S/A; `35e1b-en-x-clarify-in-other-words-expr` R/A; `35e1b-en-x-repair-tone-expr` S/A | 0/2/2 |
| 4 | V | `en-c-653` R/A; `en-c-785` R/A; `en-c-781` R/A; `en-c-621` S/RR; `35e1c-en-v086` N/RR; `en-c-857` N/RR; `en-c-825` N/RR; `en-c-869` N/RR | 4/3/1 |
| 4 | G | `en-regardless` N/RR; `35e1c-en-obligation-contrast` R/A; `en-should-have` R/A | 1/2/0 |
| 4 | E | `legacy-61-en` R/A; `legacy-63-en` N/A; `35e1b-en-d-group-disagree-expr` R/A; `legacy-75-en` S/A | 1/2/1 |
| 5 | V | `en-c-621` R/RR; `en-c-617` S/A; `en-c-641` S/A; `en-c-1085` S/A; `en-c-2247` R/RR; `en-c-669` N/RR; `en-c-677` N/RR; `en-leave` S/A | 2/2/4 |
| 5 | G | `en-would-like` R/B; `en-if-request` R/RR; `en-will` S/A | 0/2/1 |
| 5 | E | `35e1b-en-d-invitation-decline-expr` N/A; `legacy-159-en` R/A; `legacy-75-en` S/A; `legacy-135-en` S/A | 1/1/2 |
| 6 | V | `en-c-1081` R/A; `en-c-533` S/A; `en-c-773` R/A; `en-c-725` R/A; `en-c-733` S/A; `en-c-621` R/RR; `en-plan` S/A; `en-c-797` N/RR | 1/4/3 |
| 6 | G | `35e1c-en-perfect-vs-past` R/A; `en-should-have` R/A; `en-plan-to` S/A | 0/2/1 |
| 6 | E | `academic-approach-en` S/A; `legacy-108-en` R/A; `35e1b-en-d-group-disagree-expr` S/A; `looking-forward-en` S/RR | 0/1/3 |

English REVIEW source map: slot 1 evidence/justify/concern come from S5; slot 2 assumption and third conditional from S5; slot 3 evidence/clarify/reporting/concession/hedging/repair from S5; slot 4 priority/trade-off/consensus/obligation/retrospective evaluation from S3–5; slot 5 commitment/request/will/consideration/exit from S1–5; slot 6 result/perspective/evaluation/retrospection/contextual reporting from S3–5.

### Japanese — 90 relationships

| Slot | Type | Exact candidate relationships | N/R/S |
|---:|---|---|---:|
| 1 | V | `ja-c-759` N/RR; `ja-c-779` N/RR; `ja-c-819` N/RR; `ja-c-731` N/RR; `ja-c-607` R/A; `ja-c-651` S/A; `ja-c-683` R/A; `ja-c-3205` S/RR | 4/2/2 |
| 1 | G | `ja-ni-hoka-naranai` N/RR; `ja-ni-suginai` N/RR; `ja-wo-fumaete` N/RR | 3/0/0 |
| 1 | E | `lesson-ja-wo-fumaete-ex` N/RR; `lesson-ja-ni-hoka-naranai-ex` N/RR; `35e1b-ja-d-group-disagree-expr` R/A; `legacy-49-ja` S/A | 2/1/1 |
| 2 | V | `ja-c-3217` R/RR; `ja-c-527` R/A; `ja-c-715` N/RR; `ja-c-735` N/RR; `ja-c-683` S/A; `ja-c-699` N/RR; `ja-c-815` N/RR; `ja-c-631` S/A | 4/2/2 |
| 2 | G | `ja-wake-dewa-nai` R/A; `ja-kamoshirenai` N/B; `ja-youda` R/A | 1/2/0 |
| 2 | E | `35e1b-ja-d-misunderstanding-tone-expr` S/A; `35e1b-ja-x-clarify-in-other-words-expr` R/A; `legacy-156-ja` S/A; `legacy-147-ja` R/A | 0/2/2 |
| 3 | V | `ja-c-1095` N/RR; `ja-c-1111` N/A; `ja-c-647` R/A; `ja-c-619` S/A; `ja-c-643` S/A; `ja-c-739` R/A; `ja-c-807` N/RR; `ja-c-843` N/RR | 4/2/2 |
| 3 | G | `ja-indirect-ka` R/A; `ja-hearsay-sou` N/RR; `ja-ni-kakawarazu` N/RR | 2/1/0 |
| 3 | E | `35e1b-ja-x-clarify-in-other-words-expr` R/A; `legacy-108-ja` N/RR; `legacy-111-ja` S/A; `legacy-75-ja` N/A | 2/1/1 |
| 4 | V | `ja-c-655` R/A; `ja-c-751` R/A; `ja-c-783` R/A; `ja-c-787` S/A; `ja-c-623` N/RR; `ja-c-859` N/RR; `ja-c-871` N/RR; `ja-c-671` S/A | 3/3/2 |
| 4 | G | `ja-beki` R/A; `ja-zaru-wo-enai` N/RR; `ja-humble` R/A | 1/2/0 |
| 4 | E | `35e1b-ja-d-group-disagree-expr` R/A; `legacy-51-ja` S/A; `legacy-61-ja` S/A; `legacy-49-ja` S/A | 0/1/3 |
| 5 | V | `ja-c-827` N/RR; `ja-c-835` N/RR; `ja-c-623` S/RR; `ja-c-527` R/A; `ja-c-1123` R/RR; `ja-c-295` S/A; `ja-yotei` S/A; `ja-c-647` R/A | 2/3/3 |
| 5 | G | `ja-causative-request` N/RR; `ja-te-oku` N/RR; `ja-honorific-request` R/RR | 2/1/0 |
| 5 | E | `legacy-37-ja` R/A; `legacy-39-ja` S/A; `35e1b-ja-d-invitation-condition-expr` N/A; `legacy-155-ja` N/RR | 2/1/1 |
| 6 | V | `ja-c-1083` S/A; `ja-c-3207` R/A; `ja-c-535` S/A; `ja-c-683` R/A; `ja-c-715` S/RR; `ja-c-735` S/RR; `ja-c-783` R/A; `ja-c-803` N/RR | 1/3/4 |
| 6 | G | `ja-kai` N/RR; `ja-koto-ni-suru` R/RR; `ja-beki` R/A | 1/2/0 |
| 6 | E | `legacy-183-ja` N/A; `legacy-177-ja` R/A; `legacy-179-ja` R/RR; `legacy-147-ja` S/A | 1/2/1 |

Japanese REVIEW source map: slot 1 scope/judgment/disagreement come from S5; slot 2 concern/partial denial/inference and reflection come from S4–5; slot 3 alternatives/adjustment/clarification/embedded questions come from S4–5; slot 4 priority/allocation/consensus/normative judgment/humble role transfer come from S5; slot 5 concern/consideration/alternative/formal request come from S2–5; slot 6 value/judgment/consensus/decision/reflection come from S4–5.

## 6. Vocabulary candidate audit

`Guided` is relationship count followed by current stage use. Repeated proposed slots are comma-separated. All records are published. One-example rows need a reviewed lesson-level sentence before implementation, even when the existing collocation is semantically correct.

### English vocabulary — 42 distinct selected candidates

| ID | Target / Chinese | L; register; examples | Guided; current stage | Proposed slot/role | Fit | Editorial readiness / human status |
|---|---|---|---|---|---|---|
| `en-c-757` | evidence / 证据 | L4; neutral; 2 | 5; S5 | 1R, 3R | claim support | READY / APPROVE |
| `en-c-1093` | report / 报告 | L3; neutral; 2 | 1; S6 | 1N, 3S | reporting spine | READY / APPROVE |
| `en-c-729` | analyse / 分析 | L5; formal; 1 | 0; unlinked | 1N | evidence processing | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-709` | accurate / 准确的 | L4; neutral; 2 | 1; S5 | 1S | evidence quality | READY / APPROVE |
| `en-c-801` | relevant / 相关的 | L4; neutral; 2 | 1; S5 | 1S | evidence selection | READY / APPROVE |
| `en-c-733` | justify / 说明正当理由 | L5; formal; 2 | 1; S5 | 1R, 6S | argument/retrospection | READY / APPROVE |
| `en-c-777` | criterion / 判断标准 | L5; formal; 1 | 0; unlinked | 1N | bounded evaluation | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-741` | assess / 评定 | L5; formal; 1 | 0; unlinked | 1N | evaluate evidence | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-761` | assumption / 假定 | L5; formal; 2 | 1; S5 | 2R | hypothetical premise | READY / APPROVE |
| `en-c-769` | limitation / 局限 | L5; formal; 2 | 3; S5 | 2S | qualify claim | READY / APPROVE |
| `en-c-773` | perspective / 视角 | L5; formal; 2 | 1; S5 | 2S, 6R | counter-position/reflection | READY / APPROVE |
| `en-c-1109` | condition / 条件 | L3; neutral; 1 | 0; unlinked | 2N | conditional frame | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-681` | judgment / 判断 | L4; neutral; 1 | 0; unlinked | 2N | qualified judgment | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-645` | alternative / 替代选项 | L4; neutral; 2 | 2; S5 | 2S | compare outcomes | READY / APPROVE |
| `en-c-697` | tentative / 暂定的 | L5; formal; 1 | 0; unlinked | 2N | uncertainty | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-765` | implication / 可能的影响或含义 | L5; formal; 1 | 0; unlinked | 2N | consequence reasoning | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-737` | clarify / 澄清 | L5; formal; 2 | 2; S5 | 3R | source clarification | READY / APPROVE |
| `en-c-633` | distinguish / 区分 | L4; neutral; 1 | 0; unlinked | 3N | evidence/inference distinction | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-637` | confirm / 确认属实 | L4; neutral; 1 | 0; unlinked | 3N | source verification | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-805` | ambiguous / 有歧义的 | L5; formal; 1 | 0; unlinked | 3N | information quality | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-841` | infer / 推断 | L5; formal; 1 | 0; unlinked | 3N | evidence-to-inference | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-817` | substantiate / 用证据证实 | L6; formal; 1 | 0; unlinked | 3N | exact evidence outcome; limited formal use | REVIEW REQUIRED + NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-653` | priority / 优先事项 | L4; neutral; 2 | 1; S5 | 4R | competing demands | READY / APPROVE |
| `en-c-785` | trade-off / 取舍关系 | L5; formal; 2 | 2; S5 | 4R | negotiation | READY / APPROVE |
| `en-c-781` | consensus / 共识 | L5; formal; 2 | 1; S5 | 4R | decision closure | READY / APPROVE |
| `en-c-621` | commit / 承诺投入 | L4; neutral; 1 | 3; S5 | 4S, 5R, 6R | commitment/accountability | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `35e1c-en-v086` | take responsibility / 承担责任 | L3; neutral; 1 | 0; unlinked | 4N | practical accountability | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-857` | contingency / 意外情况 | L6; formal; 1 | 0; unlinked | 4N | exact contingency outcome | REVIEW REQUIRED + NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-825` | mitigate / 减轻不利影响 | L6; formal; 1 | 0; unlinked | 4N | mitigation | REVIEW REQUIRED + NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-869` | accountability / 说明责任 | L6; formal; 1 | 0; unlinked | 4N | exact accountability outcome | REVIEW REQUIRED + NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-617` | adjust / 调整 | L4; neutral; 2 | 1; S5 | 5S | schedule adjustment | READY / APPROVE |
| `en-c-641` | postpone / 推迟 | L4; neutral; 2 | 1; S5 | 5S | constraint response | READY / APPROVE |
| `en-c-1085` | up in the air / 尚未确定 | L4; neutral; 2 | 3; S3/S5/S6 | 5S | uncertainty; avoid overuse | READY / APPROVE |
| `en-c-2247` | considerate / 注意分寸、为他人考虑 | L4; neutral; 1 | 2; S4/S6 | 5R | pressure control | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-669` | pressure / 压力 | L4; neutral; 1 | 0; unlinked | 5N | pragmatic stakes | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-c-677` | intention / 意图 | L4; neutral; 1 | 0; unlinked | 5N | distinguish intent/effect | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `en-leave` | leave / 离开 | L2; neutral; 3 | 4; S2/S5/S6 | 5S | basic schedule scaffold | READY / APPROVE |
| `en-c-1081` | turn out / 结果是 | L4; neutral; 2 | 2; S5/S6 | 6R | retrospective result | READY / APPROVE |
| `en-c-533` | result / 结果 | L3; neutral; 2 | 1; S6 | 6S | capstone scaffold | READY / APPROVE |
| `en-c-725` | evaluate / 评估 | L5; formal; 2 | 2; S5 | 6R | reflective evaluation | READY / APPROVE |
| `en-plan` | plan / 计划；打算 | L2; neutral; 3 | 3; S1/S2/S6 | 6S | future-action scaffold | READY / APPROVE |
| `en-c-797` | significant / 重要的；显著的 | L5; formal; 1 | 0; unlinked | 6N | evaluate outcome significance | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |

Rejected English high-level vocabulary: `en-c-1165` falsifiable, `en-c-1129` extrapolate, `en-c-1149` reciprocity, and `en-c-1153` convergence are **DO NOT USE / DO NOT ADD** for this general capstone. They would turn the outcome into academic-jargon practice.

### Japanese vocabulary — 40 distinct selected candidates

| ID | Target / Chinese | L; register; examples | Guided; current stage | Proposed slot/role | Fit | Editorial readiness / human status |
|---|---|---|---|---|---|---|
| `ja-c-759` | 証拠 / 证据 | L4; neutral; 1 | 0; unlinked | 1N | evidence | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-779` | 基準 / 判断标准 | L4; neutral; 1 | 0; unlinked | 1N | bounded decision | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-819` | 裏付ける / 用证据证实 | L5; formal; 1 | 0; unlinked | 1N | evidence support | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-731` | 分析する / 分析 | L4; neutral; 1 | 0; unlinked | 1N | evidence processing | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-607` | 絞る / 缩小范围 | L4; neutral; 2 | 3; S5/S6 | 1R | constrain conclusion | READY / APPROVE |
| `ja-c-651` | 範囲 / 范围 | L4; neutral; 2 | 4; S5/S6 | 1S | scope scaffold | READY / APPROVE |
| `ja-c-683` | 判断 / 判断 | L4; neutral; 2 | 5; S5/S6 | 1R, 2S, 6R | qualified judgment; deliberate reuse | READY / APPROVE |
| `ja-c-3205` | 招く / 招致 | L4; neutral; 1 | 2; S5/S6 | 1S | consequence scaffold | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-3217` | とはいえ / 承认后补充限制 | L4; neutral; 1 | 2; S3/S6 | 2R | concession | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-527` | 懸念 / 担忧之处 | L5; formal; 2 | 3; S5 | 2R, 5R | qualified concern | READY / APPROVE |
| `ja-c-715` | 妥当 / 合理的 | L5; formal; 1 | 0; unlinked | 2N, 6S | judgment/evaluation | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-735` | 正当化する / 说明正当理由 | L5; formal; 1 | 0; unlinked | 2N, 6S | justification | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-699` | 仮 / 暂定的 | L4; neutral; 1 | 1; S6 | 2N | uncertainty | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-815` | 暫定的 / 临时待定的 | L5; formal; 1 | 0; unlinked | 2N | formal qualification | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-631` | 誤解する / 误解 | L4; neutral; 2 | 1; S5 | 2S | interpretation scaffold | READY / APPROVE |
| `ja-c-1095` | 報告書 / 报告 | L3; neutral; 1 | 0; unlinked | 3N | practical report source | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-1111` | 条件 / 条件 | L3; neutral; 2 | 0; unlinked | 3N | conditional decision | READY / APPROVE |
| `ja-c-647` | 代案 / 替代选项 | L4; neutral; 2 | 1; S5 | 3R, 5R | conditional alternative | READY / APPROVE |
| `ja-c-619` | 調整する / 调整 | L4; neutral; 2 | 1; S5 | 3S | schedule scaffold | READY / APPROVE |
| `ja-c-643` | 延期する / 推迟 | L4; neutral; 2 | 1; S5 | 3S | conditional consequence | READY / APPROVE |
| `ja-c-739` | 明確にする / 澄清 | L4; neutral; 2 | 1; S5 | 3R | source clarification | READY / APPROVE |
| `ja-c-807` | 曖昧 / 有歧义的 | L4; neutral; 1 | 0; unlinked | 3N | information quality | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-843` | 推論する / 推断 | L5; formal; 1 | 0; unlinked | 3N | evidence/inference distinction | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-655` | 優先事項 / 优先事项 | L4; neutral; 2 | 2; S5 | 4R | competing demands | READY / APPROVE |
| `ja-c-751` | 配分する / 分配资源 | L5; formal; 2 | 1; S5 | 4R | resource negotiation | READY / APPROVE |
| `ja-c-783` | 合意 / 共识 | L5; formal; 2 | 1; S5 | 4R, 6R | decision closure | READY / APPROVE |
| `ja-c-787` | トレードオフ / 取舍关系 | L5; formal; 2 | 1; S5 | 4S | trade-off; loanword is support only | READY / APPROVE |
| `ja-c-623` | 約束する / 约定；答应 | L3; neutral; 1 | 0; unlinked | 4N, 5S | practical commitment | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-859` | 不測の事態 / 意外情况 | L6; formal; 1 | 0; unlinked | 4N | exact contingency outcome | REVIEW REQUIRED + NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-871` | 説明責任 / 说明责任 | L6; formal; 1 | 0; unlinked | 4N | exact accountability outcome | REVIEW REQUIRED + NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-671` | 負担 / 负担 | L4; neutral; 2 | 3; S5 | 4S | competing-demand scaffold | READY / APPROVE |
| `ja-c-827` | 緩和する / 减轻不利影响 | L5; formal; 1 | 0; unlinked | 5N | mitigation | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-835` | 両立させる / 调和冲突 | L5; formal; 1 | 0; unlinked | 5N | reconcile commitments | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-1123` | 気遣う / 体谅 | L4; neutral; 1 | 2; S4/S6 | 5R | pressure control | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |
| `ja-c-295` | 確認する / 核对 | L2; neutral; 3 | 6; S3/S5/S6 | 5S | confirmation scaffold | READY / APPROVE |
| `ja-yotei` | 予定 / 计划；安排 | L2; neutral; 3 | 6; S2/S4/S6 | 5S | schedule scaffold | READY / APPROVE |
| `ja-c-1083` | 結局 / 结果是 | L3; neutral; 3 | 2; S3/S6 | 6S | retrospective scaffold | READY / APPROVE |
| `ja-c-3207` | 甲斐 / 付出的价值 | L5; formal; 2 | 3; S5/S6 | 6R | evaluate effort/outcome | READY / APPROVE |
| `ja-c-535` | 結果 / 结果 | L3; neutral; 3 | 3; S3/S4/S6 | 6S | result scaffold | READY / APPROVE |
| `ja-c-803` | 関連する / 相关的 | L4; neutral; 1 | 0; unlinked | 6N | connect evidence and outcome | NEEDS LESSON EXAMPLE / REVIEW REQUIRED |

Japanese L6 policy is reconfirmed: the published pool is exactly 21 records, all formal, all with one example, and narrowly formal/academic. Only `ja-c-859` and `ja-c-871` are proposed, because slot 4 specifically requires contingency and accountability. Both are isolated for explicit human review, need lesson examples, and must be rejected if L4/5 wording proves more natural. `ja-c-1127` 齟齬 and specialist items such as 反証可能, 外挿する, 互恵性, and 収束 are **DO NOT USE / DO NOT ADD**.

## 7. Grammar audit

### Existing and selected English grammar

| Grammar | Current lesson/use | L; examples; CC | Current function | Proposed role/slot | Final fit / human status |
|---|---|---|---|---|---|
| `en-inversion` | S6.1 | L6; 1; yes | formal emphasis | 1N | genuine capstone; needs examples / REVIEW REQUIRED |
| `en-participle-clause` | S6.1 | L6; 1; yes | compress background | 1N | genuine capstone but context-isolated / REVIEW REQUIRED |
| `en-mixed-conditional` | S6.1 | L6; 1; yes | past condition → present result | 2N | genuine capstone / REVIEW REQUIRED |
| `en-not-that` | S6.2 + S5 | L5; 4; yes | reject an inference | omitted | function covered by other repair assets; DO NOT ADD to final matrix |
| `en-relative-clause` | S6.2 | L4; 1; yes | information packaging | omitted | CQ02 model review; earlier-placement candidate / REVIEW REQUIRED, DO NOT ADD |
| `en-second-conditional` | S6.2 | L4; 1; yes | unreal present | 2N | useful in conditional sequence; needs examples / REVIEW REQUIRED |
| `en-let-us` | S6.3 + S3 | L2; 7; yes | basic joint suggestion | omitted | foundational support belongs earlier / DO NOT ADD |
| `en-would-like` | S6.3 + S1 | L2; 9; yes | polite preference/invitation | 5R | useful pragmatic transfer but CQ02 answer scope blocks authority / BLOCKED |
| `en-ellipsis` | S6.4 | L2; 7; no | recoverable short response | omitted | too basic and nonessential / DO NOT ADD |
| `en-plan-to` | S6.4 | L2; 7; yes | future plan | 6S | scaffold only / APPROVE |
| `en-simple-present` | S6.4 + earlier | L1; 7; yes | facts/habits | omitted | earlier-stage support; not needed in exact matrix / DO NOT ADD |
| `35e1c-en-perfect-vs-past` | S6.4 + S4 | L4; 4; yes | experience vs dated event | 6R | strong retrospective review / APPROVE |
| `en-qualified-comparison` | unlinked | L6; 1; yes | constrain comparison | 1N | legitimate new capstone form / REVIEW REQUIRED |
| `en-third-conditional` | S5 | L5; 1; yes | unreal past | 2R | deliberate changed-demand review / REVIEW REQUIRED |
| `35e1c-en-reported-statements` | S5 | L4; 4; no | report information | 3R | authoritative without CC; synthesis review / APPROVE |
| `en-concessive-although` | S5 | L4; 4; yes | concede/contrast | 3R | strong changed-demand review / APPROVE |
| `en-hedged-claim` | S5 | L5; 1; no | qualify evidence claim | 3R | exact fit; add examples, no forced CC / REVIEW REQUIRED |
| `en-regardless` | unlinked | L5; 1; yes | independence from condition | 4N | exact contingency fit / REVIEW REQUIRED |
| `35e1c-en-obligation-contrast` | S3/S4 | L3; 4; no | obligation vs option | 4R | accountability transfer / APPROVE |
| `en-should-have` | S5 | L4; 4; yes | retrospective evaluation | 4R, 6R | accountability then reflection / APPROVE |
| `en-if-request` | S5 | L3; 1; no | conditional request | 5R | formal commitment negotiation; add examples / REVIEW REQUIRED |
| `en-will` | S4/S5 | L2; 7; yes | decision/commitment | 5S | basic support only / APPROVE |

### Existing and selected Japanese grammar

| Grammar | Current lesson/use | L; examples; CC | Current function | Proposed role/slot | Final fit / human status |
|---|---|---|---|---|---|
| `ja-ni-hoka-naranai` | S6.1 | L6; 1; yes | emphasize essence | 1N | genuine capstone; needs examples/context / REVIEW REQUIRED |
| `ja-ni-suginai` | S6.1 | L6; 1; yes | limit a claim | 1N | genuine capstone / REVIEW REQUIRED |
| `ja-wo-fumaete` | S6.1 | L6; 1; yes | reason from evidence | 1N | genuine capstone / REVIEW REQUIRED |
| `ja-causative-request` | S6.2 | L4; 1; yes | request permission | 5N | useful formal commitment transfer; needs examples / REVIEW REQUIRED |
| `ja-te-oku` | S6.2 | L3; 1; yes | prepare/leave state | 5N | useful planning transfer; needs examples / REVIEW REQUIRED |
| `ja-wake-dewa-nai` | S6.2 + S5 | L4; 4; yes | reject inference | 2R | strong qualification review / APPROVE |
| `ja-kai` | S6.3 | L5; 1; yes | value of effort | 6N | reflective capstone; needs examples / REVIEW REQUIRED |
| `ja-koto-ni-suru` | S6.3 + S4 | L4; 1; yes | make a decision | 6R | changed-demand review; needs examples / REVIEW REQUIRED |
| `ja-no-nominalizer` | S6.3 + S4 | L3; 1; yes | nominalize action | omitted | foundational and redundant here / DO NOT ADD |
| `ja-copula` | S6.4 + S1/S2 | L1; 8; yes | basic state | omitted | earlier-stage support / DO NOT ADD |
| `ja-kamoshirenai` | S6.4 | L3; 8; yes | uncertainty | 2N | useful but CQ02 model review blocks authority / BLOCKED |
| `ja-masen-ka` | S6.4 + S1 | L2; 8; yes | basic invitation | omitted | earlier-stage review, not a capstone target / DO NOT ADD |
| `ja-youda` | S5 | L4; 4; yes | infer from indirect evidence | 2R | exact qualification review / APPROVE |
| `ja-indirect-ka` | S5 | L3; 4; yes | embed a question | 3R | reporting transfer / APPROVE |
| `ja-hearsay-sou` | unlinked | L4; 1; yes | report sourced information | 3N | legitimate new synthesis form / REVIEW REQUIRED |
| `ja-ni-kakawarazu` | unlinked | L5; 1; yes | disregard a condition | 3N | conditional nuance / REVIEW REQUIRED |
| `ja-beki` | S5 | L5; 4; yes | normative judgment | 4R, 6R | accountability then reflection; monitor interpersonal force / APPROVE |
| `ja-zaru-wo-enai` | unlinked | L6; 1; yes | unavoidable action | 4N | exact contingency fit / REVIEW REQUIRED |
| `ja-humble` | S5 | L4; 4; yes | bounded humble self-action | 4R | Hotfix 03 model is safe; role-specific transfer / APPROVE |
| `ja-honorific-request` | S2/S5 | L4; 1; yes | respectful request | 5R | formal-role transfer; needs examples / REVIEW REQUIRED |

Hotfix 03 authority is bounded to its reviewed models. It makes `ja-humble` safe; it does not authorize overview-only grammar or broaden the honorific system.

### Unlinked grammar and foundational boundary

| Candidate/group | Classification | Decision / status |
|---|---|---|
| `en-qualified-comparison`, `en-regardless` | STAGE 6 NEW | selected; examples/context required / REVIEW REQUIRED |
| `en-seem-to`, `en-the-more`, `en-would-have` | REFERENCE ONLY | Stage 5 already covers their functions; DO NOT ADD |
| `en-cleft` | NEEDS CONTENT REVIEW | no demonstrated outcome need; DO NOT ADD |
| `en-possessive`, `en-going-to`, `en-before-after`, `en-enjoy-ing`, `en-between-and`, unlinked L3 basics | EARLIER-STAGE GAP | earlier cleanup only; DO NOT ADD |
| `35e1c-en-negation-short-answers`, `35e1c-en-article-system` | EARLIER-STAGE GAP + NEEDS CONTENT REVIEW | not Stage 6 authority; DO NOT ADD |
| `ja-hearsay-sou`, `ja-ni-kakawarazu`, `ja-zaru-wo-enai` | STAGE 6 NEW | selected for exact outcomes; examples/context required / REVIEW REQUIRED |
| `ja-wari-ni`, `ja-ba-hodo` | REFERENCE ONLY | covered by current qualification/conditional design; DO NOT ADD |
| `ja-plain-nonpast`, topic/object/time/possession particles, `ja-i-adjective`, `ja-te-form`, `ja-nai`, time/duration basics | EARLIER-STAGE GAP | earlier cleanup only; DO NOT ADD |
| generated movement/range/adjective/plain-tense and permission/prohibition systems | EARLIER-STAGE GAP + NEEDS CONTENT REVIEW | review models and place earlier if approved; DO NOT ADD |
| `ja-tara`, `ja-temo`, `ja-koto-ga-aru` and other specific L3 forms | EARLIER-STAGE GAP or Stage 3–4 REVIEW | do not introduce as Stage 6 NEW; DO NOT ADD |

## 8. Content Quality Audit 02 dependencies

These are review candidates, not automatically confirmed defects. Only two are selected dependencies.

| Record | Stage 6 decision | Dependency status / human status |
|---|---|---|
| `35e1c-en-past-questions-negatives` | not selected; earlier-stage issue | DO NOT ADD |
| `35e1c-en-some-any` | not selected; earlier-stage issue | DO NOT ADD |
| `en-would-like` | selected as slot 5 REVIEW | broad like/love/prefer answer scope; **BLOCKING / BLOCKED** |
| `en-relative-clause` | current S6.2 link not selected for final matrix | model and placement review required; **REVIEW REQUIRED / DO NOT ADD** |
| `35e1c-ja-obligation-contrast` | overview/system candidate not selected | specific `ja-beki` used instead; DO NOT ADD |
| `35e1c-ja-kara-node-contrast` | not selected | specific reviewed forms only; DO NOT ADD |
| `35e1c-ja-te-sequence` | not selected | earlier-stage review; DO NOT ADD |
| `35e1c-ja-explanatory-nodesu` | not selected | overview/model review; DO NOT ADD |
| `ja-ba-condition` | not selected | earlier-stage conditional review; DO NOT ADD |
| `ja-kamoshirenai` | selected as slot 2 NEW | answer-model/formula review; **BLOCKING / BLOCKED** |
| `ja-te-iru` | not selected | earlier-stage review; DO NOT ADD |
| `ja-tsumori` | not selected | earlier-stage review; DO NOT ADD |

`ja-n-desu-ga`, `ja-node`, `ja-honorific`, and `ja-humble` were bounded by Hotfix 03. They are SAFE within that exact authority; only `ja-humble` is selected here. The two overview rows remain non-authoritative.

## 9. Expression and reuse audit

### English — 19 distinct candidates / 24 relationships

| Expression | Current context; guided use | Slot/role | Changed demand | Requirement / status |
|---|---|---|---|---|
| `lesson-en-inversion-ex` | none; S6 | 1N | sentence → evidence-led claim | add scenario context / REVIEW REQUIRED |
| `lesson-en-participle-clause-ex` | none; S6 | 1N | sentence → evidence background | add scenario context / REVIEW REQUIRED |
| `academic-approach-en` | context; S5 | 1S, 6S | option caveat → argument/reflection | ready reuse / APPROVE |
| `legacy-49-en` | scenario; S5 | 1R | concern → counter-position | ready review / APPROVE |
| `lesson-en-mixed-conditional-ex` | none; S6 | 2N | isolated sentence → consequence chain | add scenario context / REVIEW REQUIRED |
| `lesson-en-second-conditional-ex` | none; S6 | 2N | personal hypothetical → decision case | add scenario context / REVIEW REQUIRED |
| `legacy-145-en` | scenario; S4/S5 | 2S | preference → respectful concession | ready reuse / APPROVE |
| `legacy-108-en` | versioned context; S5 | 2S, 6R | weather backup → decision/accountability | ready changed-demand reuse / APPROVE |
| `35e1b-en-d-group-disagree-expr` | dialogue; S5 | 3R, 4R, 6S | report disagreement → evidence synthesis/accountability/reflection | reuse with distinct prompts / APPROVE |
| `35e1b-en-d-misunderstanding-tone-expr` | dialogue; S5 | 3S | tone repair → fact/inference separation | ready reuse / APPROVE |
| `35e1b-en-x-clarify-in-other-words-expr` | scenario; S5 | 3R | repair → source checking | ready review / APPROVE |
| `35e1b-en-x-repair-tone-expr` | scenario; S5 | 3S | interpersonal repair → reporting caution | ready reuse / APPROVE |
| `legacy-61-en` | scenario; S5 | 4R | chores → resource responsibility | ready review / APPROVE |
| `legacy-63-en` | dialogue; unlinked | 4N | service/neighbour repair → accountable resolution | ready contextual candidate / APPROVE |
| `legacy-75-en` | dialogue; S5 | 4S, 5S | flexible plan → contingency/commitment | ready reuse / APPROVE |
| `35e1b-en-d-invitation-decline-expr` | dialogue; S6 | 5N | casual invitation → pressure-free formal scheduling | reuse with new prompt / APPROVE |
| `legacy-159-en` | dialogue; S4 | 5R | social exit → professional boundary | ready review / APPROVE |
| `legacy-135-en` | dialogue; S4/S5 | 5S | personal pressure → commitment without coercion | ready reuse / APPROVE |
| `looking-forward-en` | none; S3/S6 | 6S | simple anticipation → evidence-based next step | add context or replace / REVIEW REQUIRED |

Projection: 14/19 distinct candidates are context-ready and 19/24 relationships are contextual, versus current 4/17. Ten relationship uses are dialogue-covered, five are scenario-covered, four use canonical/versioned context, and five need context.

### Japanese — 20 distinct candidates / 24 relationships

| Expression | Current context; guided use | Slot/role | Changed demand | Requirement / status |
|---|---|---|---|---|
| `lesson-ja-wo-fumaete-ex` | none; S6 | 1N | sentence → evidence-led decision | add scenario context / REVIEW REQUIRED |
| `lesson-ja-ni-hoka-naranai-ex` | none; S6 | 1N | sentence → bounded formal conclusion | add scenario context / REVIEW REQUIRED |
| `35e1b-ja-d-group-disagree-expr` | dialogue; S5 | 1R, 4R | report disagreement → evidence/accountability | reuse with distinct prompts / APPROVE |
| `legacy-49-ja` | scenario; S5 | 1S, 4S | polite concern → evidence/accountability | ready reuse / APPROVE |
| `35e1b-ja-d-misunderstanding-tone-expr` | dialogue; S5 | 2S | tone repair → fact/inference distinction | ready reuse / APPROVE |
| `35e1b-ja-x-clarify-in-other-words-expr` | scenario; S5 | 2R, 3R | repair → qualified reporting | ready review / APPROVE |
| `legacy-156-ja` | versioned context; S4/S5 | 2S | boundary → partial denial/qualification | ready reuse / APPROVE |
| `legacy-147-ja` | dialogue; S4/S5 | 2R, 6S | reservation → qualification/reflection | ready reuse / APPROVE |
| `legacy-108-ja` | none; unlinked | 3N | backup-plan sentence → conditional report | add context / REVIEW REQUIRED |
| `legacy-111-ja` | dialogue; S4 | 3S | forecast uncertainty → source uncertainty | ready reuse / APPROVE |
| `legacy-75-ja` | dialogue; unlinked | 3N | flexible plan → conditional decision | ready contextual candidate / APPROVE |
| `legacy-51-ja` | dialogue; S5 | 4S | prioritization → accountable allocation | ready reuse / APPROVE |
| `legacy-61-ja` | scenario; S5 | 4S | chores → formal responsibility negotiation | ready reuse / APPROVE |
| `legacy-37-ja` | scenario; S5 | 5R | exchange request → constrained professional request | ready review / APPROVE |
| `legacy-39-ja` | dialogue; S5 | 5S | service repair → formal commitment | ready reuse / APPROVE |
| `35e1b-ja-d-invitation-condition-expr` | dialogue; S6 | 5N | casual invitation → considerate conditional commitment | reuse with new prompt / APPROVE |
| `legacy-155-ja` | none; S6 | 5N | isolated early-exit sentence → formal constraint disclosure | add context / REVIEW REQUIRED |
| `legacy-183-ja` | dialogue; S6 | 6N | experience value → accountable reflection | ready capstone asset / APPROVE |
| `legacy-177-ja` | dialogue; S4/S6 | 6R | changed plan → justified future action | ready review / APPROVE |
| `legacy-179-ja` | none; S4/S6 | 6R | result statement → evidence-based evaluation | add context / REVIEW REQUIRED |

Projection: 15/20 distinct candidates are context-ready and 19/24 relationships are contextual, versus current 4/17. Twelve relationship uses are dialogue-covered, six are scenario-covered, one uses other canonical/versioned context, and five need context.

## 10. Dialogue/scenario layer

No production dialogue is authored here. The current linked canonical assets are reusable, but there is no Stage-6-specific prompt/asset layer.

| Language/slot | Classification | Review outline only |
|---|---|---|
| EN1 | SHORT SCENARIO SUFFICIENT | A team must select relevant evidence, state a claim, and limit the conclusion. |
| EN2 | SHORT SCENARIO SUFFICIENT | A past decision has present consequences; the learner concedes a counter-position and evaluates alternatives. |
| EN3 | NEW DIALOGUE REQUIRED | Two sources conflict; speakers identify report/evidence/inference, clarify uncertainty, concede a limitation, and agree on a qualified conclusion. |
| EN4 | NEW DIALOGUE REQUIRED | Competing deadlines require prioritization, contingency planning, responsibility allocation, mitigation, and a formal follow-up commitment. |
| EN5 | REUSE DIALOGUE + NEW PROMPT | Reuse invitation/exit assets; prompt for scope, non-coercive alternatives, and a clear professional commitment. |
| EN6 | REUSE DIALOGUE + NEW PROMPT | Reuse disagreement/result assets; prompt for evidence, consequence, responsibility, and next action. |
| JA1 | SHORT SCENARIO SUFFICIENT | 根拠を選び、判断の範囲を限定して結論を述べる。 |
| JA2 | REUSE DIALOGUE + NEW PROMPT | 誤解修復の会話で、事実・推論・懸念・留保を分ける。 |
| JA3 | NEW DIALOGUE REQUIRED | 報告内容、間接疑問、伝聞、推論を区別し、条件付きの結論を出す。 |
| JA4 | NEW DIALOGUE REQUIRED | 不測の事態に対して役割に合う敬語・謙譲語を使い、緩和策、説明責任、約束を合意する。 |
| JA5 | REUSE DIALOGUE + NEW PROMPT | 誘い・依頼の素材を、制約説明、代案、相手への配慮、正式な約束へ転換する。 |
| JA6 | REUSE DIALOGUE + NEW PROMPT | 結果と期待の差を評価し、責任を認め、次の行動を述べる。 |

Exact asset workload: four new dialogues (two per language), five reuse prompt layers (EN two, JA three), and three short scenarios (EN two, JA one).

## 11. English six-slot planning matrix

| Slot | Existing / proposed ID | Chinese title | English title | Communicative outcome | Disposition | V/G/E; roles N/R/S | Min. | Asset | Dependencies |
|---:|---|---|---|---|---|---|---:|---|---|
| 1 | `en-s6-l1` | 以证据构建有限定的论证 | Build a Qualified Evidence-Led Argument | select evidence, state a claim, and bound the conclusion | KEEP + DENSIFY | 8/3/4; 9/3/3 | 15 | short scenario | six example-debt records; 2 expression contexts |
| 2 | `en-s6-l2` | 分析反事实并回应反方观点 | Reason Through Counterfactuals and Counterpositions | connect hypothetical consequences, concede, and qualify uncertainty | REFOCUS | 8/3/4; 8/2/5 | 15 | short scenario | 7 example additions; 2 expression contexts; relative clause omitted |
| 3 | `PROPOSED-EN-S6-03-SYNTHESIS` | 综合转述信息并区分证据与推断 | Synthesize Reports, Evidence, and Inference | combine sources without presenting inference as fact | NEW | 8/3/4; 5/7/3 | 15 | new dialogue | vocabulary/hedging examples; dialogue review |
| 4 | `PROPOSED-EN-S6-04-ACCOUNTABILITY` | 协商冲突需求并承担说明责任 | Negotiate Competing Demands and Accountability | prioritize, mitigate, allocate responsibility, and commit | NEW | 8/3/4; 6/7/2 | 15 | new dialogue | formal-register review; dialogue review |
| 5 | `en-s6-l3` | 作出不施压的正式承诺 | Make Pressure-Free Formal Commitments | disclose constraints, offer alternatives, and make a non-coercive commitment | REFOCUS | 8/3/4; 3/5/7 | 15 | reuse + prompt | `en-would-like` BLOCKED; examples/prompt |
| 6 | `en-s6-l4` | 回顾结果并承诺后续行动 | Reflect on Outcomes and Commit to Next Steps | evaluate evidence/outcome, accept responsibility, and state next action | REFOCUS; terminal | 8/3/4; 1/7/7 | 15 | reuse + prompt | one vocabulary example; one expression context |

The per-slot role counts above include all 15 relationships. Review is present in every slot and is not concentrated in the final lesson.

## 12. Japanese six-slot planning matrix

| Slot | Existing / proposed ID | Chinese title | Japanese title | Communicative outcome | Disposition | V/G/E; roles N/R/S | Min. | Asset | Dependencies |
|---:|---|---|---|---|---|---|---:|---|---|
| 1 | `ja-s6-l1` | 组织依据并形成有限定的结论 | 根拠を整理し、限定した結論を述べる | organize evidence and state a bounded formal conclusion | KEEP + DENSIFY | 8/3/4; 9/3/3 | 15 | short scenario | examples; 2 expression contexts |
| 2 | `ja-s6-l2` | 谨慎表达判断并承认限制 | 判断を控えめに述べ、限界を認める | distinguish evidence/inference and state a cautious judgment | REFOCUS | 8/3/4; 5/6/4 | 15 | reuse + prompt | `ja-kamoshirenai` BLOCKED; examples/prompt |
| 3 | `PROPOSED-JA-S6-03-REPORTING` | 综合转述信息并进行条件判断 | 報告をまとめ、条件付きで判断する | embed/report information and reach a qualified conditional decision | NEW | 8/3/4; 8/4/3 | 15 | new dialogue | examples; 1 expression context; dialogue review |
| 4 | `PROPOSED-JA-S6-04-ACCOUNTABILITY` | 正式协商突发情况与说明责任 | 不測の事態と説明責任を改まって協議する | negotiate contingency, mitigation, accountability, and formal commitment | NEW | 8/3/4; 4/6/5 | 15 | new dialogue | L6 vocabulary explicit review; examples/dialogue |
| 5 | `ja-s6-l4` | 调整安排并作出得体承诺 | 予定を調整し、配慮ある約束をする | disclose constraints, offer alternatives, and make a considerate formal commitment | REORDER + REFOCUS | 8/3/4; 6/5/4 | 15 | reuse + prompt | examples; 1 expression context |
| 6 | `ja-s6-l3` | 回顾结果并说明责任与下一步 | 結果を振り返り、責任と次の行動を述べる | evaluate outcome, acknowledge responsibility, and state next action | REORDER + REFOCUS; terminal | 8/3/4; 3/7/5 | 15 | reuse + prompt | examples; 1 expression context |

This is a **REORDER PROPOSAL**: `ja-s6-l4` moves before `ja-s6-l3`. The current invitation/schedule lesson becomes a formal commitment transfer before the course closes on reflection. No edge is changed in this audit.

## 13. Role, review, density, and practice design

| Language | NEW | REVIEW | SUPPORT | Result |
|---|---:|---:|---:|---|
| EN | 32/90 = 35.6% | 31/90 = 34.4% | 27/90 = 30.0% | within 35–50 / 25–35 / 20–30 |
| JA | 35/90 = 38.9% | 31/90 = 34.4% | 24/90 = 26.7% | within all bands |

Each language has exactly 48 V, 18 G, and 24 E relationships. Every lesson has 8/3/4, 11 assessable items, and an estimated 30–33 safe opportunities. The low end assumes no controlled-completion opportunity for grammar without safe local authority; no filler is added to reach a count.

Distinct candidate breadth is EN 42 V / 17 G / 19 E and JA 40 V / 17 G / 20 E. Excluding the one blocked grammar dependency in each language, the usable shortlist is EN 42 vocabulary, 16 grammar, 19 expressions and JA 40 vocabulary, 16 grammar, 20 expressions. Context-ready expressions are 14 EN and 15 JA before editorial additions.

## 14. Prerequisite and grandfathering proposal

One linear path per language:

```text
EN: en-s5-08-reporting
    → en-s6-l1
    → en-s6-l2
    → PROPOSED-EN-S6-03-SYNTHESIS
    → PROPOSED-EN-S6-04-ACCOUNTABILITY
    → en-s6-l3
    → en-s6-l4 (course terminal)

JA: ja-s5-08-benefit
    → ja-s6-l1
    → ja-s6-l2
    → PROPOSED-JA-S6-03-REPORTING
    → PROPOSED-JA-S6-04-ACCOUNTABILITY
    → ja-s6-l4
    → ja-s6-l3 (course terminal)
```

A future implementation must replace successor edges, not create a parallel optional branch, and must prove connectedness, acyclicity, one root per language, language isolation, and no bypass.

Grandfathering is a hard implementation requirement. Preserve existing lesson IDs and content IDs; never rewrite learner progress or SRS identity. Completed current Stage 6 lessons must remain completed and historical attempts/evidence queryable. For learners in progress, recommendation logic must continue the current lesson where valid and map the next incomplete step onto the new linear sequence without revoking completion. Any prerequisite migration needs explicit regression tests for completed learners, partially completed learners, `continue_lesson`, terminal-course behavior, historical bundles, and SRS continuity.

## 15. Editorial workload and approval gates

Near-exact debt implied by the selected matrix:

| Work item | EN | JA | Total | Gate |
|---|---:|---:|---:|---|
| Vocabulary records needing one additional lesson example | 21 | 20 | 41 | NEEDS EXAMPLE |
| Grammar records below four examples | 9 records / about 27 examples | 11 records / about 33 examples | 20 records / about 60 examples | NEEDS EXAMPLE + grammar review |
| Selected expressions needing strict context | 5 | 5 | 10 | NEEDS CONTEXT |
| New production dialogues | 2 | 2 | 4 | BLOCKED until human-authored/reviewed |
| Reuse prompt layers | 2 | 3 | 5 | NEEDS CONTEXT/prompt review |
| Short scenarios | 2 | 1 | 3 | NEEDS CONTEXT/scenario review |
| Content-quality blockers | 1 | 1 | 2 | BLOCKED |

The grammar-example estimate assumes raising every selected one-example grammar record to four varied examples; it does not force controlled completion. Exact authoring may be lower only if human review approves a different minimum for a specific SUPPORT relationship.

Gate summary:

- **READY:** all two-plus-example vocabulary marked APPROVE, all four-plus-example grammar marked APPROVE, and the 29 context-ready distinct expressions.
- **NEEDS EXAMPLE:** 41 vocabulary records and 20 grammar records as counted above.
- **NEEDS CONTEXT:** ten distinct expression records plus asset/prompt review.
- **NEEDS GRAMMAR REVIEW:** all one-example late grammar, interpersonal-force decisions, and the two CQ02 candidates.
- **BLOCKED:** `en-would-like`, `ja-kamoshirenai`, and the four production dialogues until human-authored and approved.

No example or production dialogue in this document is canonical content. The short asset outlines are review briefs only.

## 16. Course-impact estimate

The exact candidate set, modeled as replacing current Stage 6 composition while keeping all earlier stages, projects:

| Measure | English | Japanese |
|---|---:|---:|
| Final lessons | 38 | 38 |
| Final authored minutes | 594 / 9.9 h | 594 / 9.9 h |
| Planning learner time at 2–3× | 19.8–29.7 h | 19.8–29.7 h |
| Stage 6 authored / planning learner time | 90 min / 3.0–4.5 h | 90 min / 3.0–4.5 h |
| Projected unique vocabulary | 204 | 190 |
| Projected authoritative grammar | 58 | 61–62 |
| Projected unique assessable | **262** | **251–252** |

The Japanese range is 252 if the blocked `ja-kamoshirenai` relationship is reviewed and retained; it is 251 if that Stage-6-only authority is omitted. These are source-based candidate projections, not measured post-implementation results.

English would plausibly move to **LIKELY MODERATE**, because it reaches the 260 lower breadth bound, Stage 6 reaches 90 coherent minutes, review is explicit, and 19/24 expression relationships are designed to be contextual. This remains conditional on editorial completion and a post-implementation audit showing that the 9.9-hour path provides comparable outcome breadth to the project's roughly 10–12-hour allowance.

Japanese would remain **APPROACHING MODERATE**, though materially closer: it gains 15–16 assessable records, a coherent formal/accountability path, and the same context improvement, but remains below 260 and has larger example/model debt. Neither statement claims CEFR or JLPT equivalence.

## 17. Course-end quality

The proposed final lessons are genuine capstones rather than new-form dumps:

- reflection: compare intended and actual outcomes;
- evidence: identify what supports the judgment;
- accountability: name responsibility without overclaiming blame;
- commitment: state a bounded next action;
- register: use professional/formal language appropriate to role and relationship;
- transfer: apply the same reasoning pattern to work, service, planning, and interpersonal contexts.

EN6 introduces only one new vocabulary relationship and no new grammar relationship. JA6 introduces one new vocabulary, one new grammar, and one new expression relationship; the rest is review/support. This protects the terminal lesson from a large new grammar cluster.

## 18. Human approval ledger

The exact relationship tables are the authoritative candidate ledger for this audit: every one of the 180 proposed relationships ends in APPROVE, REVIEW REQUIRED, or BLOCKED. Omitted/rejected records in the vocabulary, grammar, and CQ sections end in DO NOT ADD. No status means implementation authorization.

Before implementation authorization, humans must:

1. approve or replace all `RR` relationships after example/context/register review;
2. resolve or remove both `B` grammar relationships;
3. explicitly approve the two Japanese L6 vocabulary candidates against L4/5 alternatives;
4. author and review four production dialogues, five reuse prompt layers, and three scenarios;
5. approve the final titles/objectives, JA reorder, and grandfathering plan;
6. rerun density, graph, practice-authority, recommendation, historical-evidence, and learner-state gates against a staged implementation.

## 19. Recommendation

**YES — six lessons / approximately 90 minutes remains justified.** It is the smallest design that adds the two missing synthesis/transfer outcomes while preserving and refocusing all four existing lessons. The candidate density is already sufficient, the role mix is deliberate, and context rises from 4/17 to a planned 19/24 expression relationships without adding filler.

Recommended next step: a human editorial approval pass on this document, beginning with the two blockers, the Japanese L6 decision, and the 41 vocabulary/60 grammar example briefs. Only after every selected relationship has an approved disposition should a separately authorized Stage 6 editorial payload and implementation plan be produced.

## Safety confirmation

After the initial Post-Stage-5 documentation commit, this task added only `docs/STAGE-6-EXPANSION-03-DESIGN-AUDIT.md` locally and did not commit it. It did not change curriculum, canonical content, examples, lessons, links, runtime roles, prerequisites, migrations, D1, learner state, branches, or deployments. Stage 6 was not implemented.
