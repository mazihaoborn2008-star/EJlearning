# EJ Learning — Pre-Production `en-would-like` Assessment Authority Review 01

**Review date:** 2026-09-17

**Review posture:** focused, read-only authority review; no fix implemented

**Decision:** **OPTION C — MODE-SPECIFIC AUTHORITY RESTRICTION**

**Hotfix 04 required:** **YES**

**Production effect after implementation and validation:** **CONTENT READY FOR PRODUCTION: YES**

## 1. Baseline

The completed Final Whole-Course Audit was committed and pushed before this review:

- commit: `18901facd074e7e2eb52c21f94b2b82095d4013a`
- subject: `docs: add final whole-course curriculum audit`
- resulting local `main`: `18901facd074e7e2eb52c21f94b2b82095d4013a`
- resulting `origin/main`: `18901facd074e7e2eb52c21f94b2b82095d4013a`
- release under review: `curriculum-stage6-expansion-03-v1` / `CURRICULUM-STAGE6-EXPANSION-03` / `2026-09-stage6-expansion-03-v1`

The post-push tree was clean. This review reconstructs current content from the checked-in migration chain and inspects the checked-in runtime. It does not write D1, submit learner answers, deploy, create a branch, or modify canonical content.

Primary source evidence:

- `migrations-35d/0011_curriculum.sql`: original record, original example, three legacy sentence links.
- `migrations-35d/0016_request_variants.sql`: current slash-separated model plus the LOVE and PREFER examples.
- `migrations-35e1a/0001_core_grammar_curated_examples.sql`: six later curated examples.
- `migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql`: four later `I’d like` sentence links.
- `src/lesson-bundle-35d.js` and the current Stage 6 bundle/projection: current lesson relationship.
- `src/practice-4e.js`: generation, answer normalization, sealed exercise resolution, and legacy CC fallback.
- `src/progress-4b.js`: legacy tokenless grading and progress identity use.
- `src/content-quality-02.js` and `src/content-quality-03.js`: current practice-eligibility and CC policy.
- `migrations-staging-schema/0003_phase4b_learner_progress.sql` and `0004_phase4c_srs.sql`: progress/SRS identity.
- `docs/CONTENT-QUALITY-AUDIT-02.md`: overview/non-authoritative precedent.

## 2. Current canonical model

| Field | Exact current value |
|---|---|
| ID | `en-would-like` |
| Language / slug | `en` / `would-like` |
| Title | `礼貌愿望与邀请` |
| `form_name` | `would like / love / prefer` |
| Formula | `would like / love / prefer + noun / to-infinitive` |
| Level / register / state | `2` / `neutral` / `published` |
| Core explanation | `礼貌愿望与邀请` |
| Purpose | `礼貌愿望与邀请` |
| When to use | `礼貌表达愿望或偏好；like较中性，love更热切，prefer通常含与其他选择比较。` |
| Mistakes | `to后用动词原形；would rather则不用to，不要把两种结构混同。` |
| Nuance | `Would you like to用于邀请；I would prefer to用于偏好。I would love to可在语境中省略后续动作，不表示两者语气完全相同。` |
| Usage | `结合“你愿意一起吃午饭吗？”理解本用法。` |

The record has no canonical `accepted_answers` field. Answers are derived by runtime:

- `grammar_form_selection` and `grammar_form_recall`: `v2_grammar_points.form_name`, currently the entire literal `would like / love / prefer`.
- controlled completion: an explicit approved example answer if one exists; otherwise, for this record, a published sentence link’s literal `displayed_form`.
- legacy tokenless grammar submission: `form_name` directly.
- English normalization: NFC, trim, internal-whitespace collapse, and lowercase. It does not turn the slash list into alternatives or normalize punctuation variants. Therefore `would like`, `love`, or `prefer` alone is not an accepted recall answer.

Current policy facts:

- current canonical ID: **YES**
- published: **YES**
- practice eligible: **YES**; it is absent from both the retired-ID and overview-only exclusion sets.
- explicit CC review rows: **0**
- explicit CC authority rows: **0**
- published sentence-grammar links: **7**
- grammar examples: **9**

The stored title reads like one functional form, while `form_name`, formula, nuance, examples, and links describe a three-member contrast family. That mismatch is the core authority defect.

## 3. Current lesson usage

Exact active curriculum relationship count: **1**.

| Lesson | Lesson outcome | Relationship | Broad model needed? | Narrower/bounded authority preserves outcome? |
|---|---|---|---|---|
| `en-s1-l2` — `道歉、感谢并自然回应` | `能在常见社交往来中道歉、致谢并作出自然回应。` | grammar role `support`, sequence `3`, required `0`, no separate instructional role | **NO.** The lesson’s core assessed work is apology, thanks, and natural response. It also exposes `I’d love to, but I have plans.`; it does not need productive authority over the entire LIKE/LOVE/PREFER family. | **YES.** A bounded contrast-recognition item, or a narrower `would like` target, preserves the lesson outcome without changing the relationship. |

No active Stage 6 relationship exists. This review does not recommend re-adding one.

## 4. Example classification

The requested classifier is based on the actual construction in each sentence. LOVE and PREFER below are all modal `would love` / `would prefer`; there is no plain lexical LIKE example.

| # | Example ID | Current text | Construction | Function |
|---:|---|---|---|---|
| 1 | `c-ge-en-would-like` | `Would you like to have lunch together?` | WOULD LIKE | polite invitation |
| 2 | `final-love-example` | `I would love to, but I have plans.` | LOVE | enthusiastic willingness/positive invitation response, followed by refusal context |
| 3 | `final-prefer-example` | `I would prefer to stay within my budget.` | PREFER | comparative preference / boundary |
| 4 | `35e1a-ge-en-would-like-01` | `I would like a glass of water, please.` | WOULD LIKE | polite desire/request |
| 5 | `35e1a-ge-en-would-like-02` | `We would like to check in now.` | WOULD LIKE | polite desire/request |
| 6 | `35e1a-ge-en-would-like-03` | `Would you like some more rice?` | WOULD LIKE | polite offer |
| 7 | `35e1a-ge-en-would-like-04` | `I would not like to discuss that at work.` | WOULD LIKE | polite negative desire/boundary |
| 8 | `35e1a-ge-en-would-like-05` | `She would prefer a seat near the door.` | PREFER | comparative preference |
| 9 | `35e1a-ge-en-would-like-06` | `Would they like us to call a taxi?` | WOULD LIKE | reported desire / offer of action |

Construction totals:

- LIKE: **0**
- LOVE: **1**
- PREFER: **2**
- WOULD LIKE: **6**
- OTHER: **0**

The set mixes polite desire/request/offer/invitation, emphatic positive willingness, and comparative preference. It does not demonstrate plain general-preference `like`, despite the metadata’s statement that “like is relatively neutral.” These examples are valid teaching evidence for a contrast overview, but together they do not establish a single productive answer. A prompt such as “礼貌愿望与邀请” can reasonably elicit `would like`, `would love to`, or, in a choice context, `would prefer`; exact recall of the slash-separated inventory tests memorization of the database label rather than a defensible English form.

## 5. Semantic authority review

`like`, `love`, `prefer`, and `would like` are related by preference/desire, but they are not assessment-equivalent.

| Construction | Core distinction | Register/force | Freely substitutable? |
|---|---|---|---|
| `like` | general liking or preference; often habitual/stative | neutral | **NO**; it does not by itself encode the polite present desire/invitation function of `would like`. |
| `love` | strong liking; with `would`, enthusiastic willingness/desire | stronger affect | **NO**; it changes intensity and can sound inappropriate where a neutral polite request is intended. |
| `prefer` | preference relative to an alternative, explicit or recoverable | neutral to formal; comparative | **NO**; it presupposes or evokes comparison. |
| `would like` | polite present desire, offer, or invitation depending on syntax | conventionally polite/softened | **NO**; it is not a general substitute for strong liking or comparative preference. |

They differ in meaning, pragmatic force, complementation, and discourse conditions. A broad functional prompt admits multiple natural answers, yet the current grader accepts only one database string. The current record is therefore best understood as a **contrast/overview record**, not one assessable productive grammar form.

## 6. Assessment-mode behavior

The runtime uses “recognition” for `grammar_form_selection`; its public “selection” mode tries controlled completion first. The two labels should not be conflated.

| Requested mode / actual exercise | Current generated authority | Rating | Reason |
|---|---|---|---|
| recognition → `grammar_form_selection` | Chinese title `礼貌愿望与邀请` → choose exact option `would like / love / prefer` | **AMBIGUOUS** | Mechanically deterministic and closed-choice, but the title does not say this is a contrast family and the answer omits `would` before two members. It is safe only after the proposed contrast label and per-record policy. |
| selection → first tries `grammar_controlled_completion` | one of seven link-derived literal blanks; otherwise form selection | **UNSAFE** | This record currently succeeds through legacy CC fallback. It can authorize `I’d like`, or entire LOVE/PREFER/WOULD LIKE sentences, from links not reviewed for completion. |
| typed recall → `grammar_form_recall` | title → type exact `would like / love / prefer` | **UNSAFE** | Multiple meaningful constructions are collapsed into one arbitrary slash-list answer. Individual valid forms are rejected. |
| controlled completion → `grammar_controlled_completion` | linked literal `displayed_form`, exact-choice | **UNSAFE** | No explicit CC decision exists; the fallback promotes sentence-link display spans into assessment answers, including whole sentences. |

No learner answer was submitted. Deterministic generation was inspected/built only. For a fixed user/day/route, the observed form is deterministic, but different seeds may choose different links; determinism does not cure the authority problem.

## 7. Legacy fallback analysis

**Legacy grammar-link controlled completion is currently reachable: YES.**

Exact path:

1. `grammarPool()` includes the record because it is published, current, and practice eligible.
2. `requestedExerciseTypes('grammar', 'selection', ...)` asks for `grammar_controlled_completion` before `grammar_form_selection`; mixed mode also schedules CC on its CC turn.
3. `controlledCompletion()` finds no rows for this grammar in `v2_grammar_example_completion_reviews` or `v2_grammar_example_completion_authority`.
4. Because there is no explicit review policy, it queries published `v2_sentence_grammar_links` joined to published expressions.
5. It takes the link’s literal `displayed_form`, requires one textual occurrence, blanks it, and makes it the `choice_exact` answer.
6. `resolvePracticeExercise()` revalidates a legacy CC token by checking that the same `displayed_form` is still linked; it does not re-check semantic or per-mode suitability because no such policy currently exists.

The seven eligible links are:

| Expression | Literal `displayed_form` | Consequence |
|---|---|---|
| `legacy-85-en` | `I'd prefer to stay within my budget.` | entire sentence can become the exact answer; prompt can reduce to `___` |
| `legacy-150-en` | `Would you like to have lunch together?` | entire invitation can become the exact answer; prompt can reduce to `___` |
| `legacy-151-en` | `I'd love to, but I have plans.` | entire response can become the exact answer; prompt can reduce to `___` |
| `35e1b-en-d-order-unavailable-expr` | `I’d like` | short polite-request span |
| `35e1b-en-d-return-exchange-expr` | `I’d like` | short polite-request span |
| `35e1b-en-x-appt-make-expr` | `I’d like` | short polite-request span |
| `35e1b-en-x-return-wrong-size-expr` | `I’d like` | short polite-request span |

Risk answers:

- ambiguous answers: **YES semantically**. Short or empty-context blanks can permit other natural constructions, even though the grader seals one exact choice.
- full-sentence authority: **YES**. Three links use the entire sentence as `displayed_form`.
- alternate valid constructions: **YES**. Depending on context, another polite desire or preference form can be grammatical and pragmatically reasonable.
- overbroad accepted-answer behavior: **NO**. The failure is the opposite: `choice_exact` is over-narrow and arbitrary. The data feeding it is overbroad; the grader does not accept all valid alternatives.

There is a second legacy path outside session generation: tokenless grammar attempts in `src/progress-4b.js` obtain `form_name AS answer` for every eligible grammar ID. That path grades the exact slash list and must also be covered by the future restriction.

## 8. Risk statement

The exact production risk is not that learners can submit too many answers. It is that an umbrella record with three non-equivalent constructions is treated as one productive authority:

- typed recall demands a database inventory string rather than a linguistic target;
- legacy CC converts unreviewed relationship display text, including entire sentences, into exact answers;
- valid alternatives can be marked wrong;
- weakness and SRS can repeatedly schedule the same invalid productive task;
- existing sealed CC/recall tokens continue to resolve while the record/link still exists.

This is a bounded P1 content-authority defect in one active Stage 1 support record. It is not a curriculum coverage gap, a reason to add lessons, or a reason to re-add the item to Stage 6.

## 9. Option A — narrow canonical model

**Proposal:** keep the ID but make the authoritative record only `would like + noun / to + base verb` (possibly also the source-supported `would like + person + to + base verb`).

Assessment:

- learner clarity: strong; one form/function family would replace the current umbrella.
- example compatibility: six examples remain direct WOULD LIKE evidence; one LOVE and two PREFER examples no longer belong without reclassification/relinking.
- migration/editorial impact: higher than Option C because metadata, three examples, and at least the LOVE/PREFER sentence links need reassignment or retirement from this record.
- history: preserving the ID avoids a raw SRS reset, but the meaning of existing progress changes from an umbrella to a single construction.
- selection/recall: potentially safe after rewriting prompts/answers.
- CC: still unsafe unless all legacy fallback is blocked or each completion receives explicit review.

**Disposition: do not choose.** It can be made correct, but it is not the smallest complete fix and creates avoidable example/relationship work.

## 10. Option B — overview / non-authoritative

**Proposal:** apply the Hotfix 02 precedent: keep the record readable, add it to an overview-only/practice-ineligible set, and remove all practice, weakness, and SRS scheduling authority.

Assessment:

- safely removes form selection, recall, CC, tokenless grading, weakness generation, and due-review authority when enforced through the shared eligibility policy.
- preserves the canonical row and lesson rendering, and can preserve historical rows in storage.
- removes even a defensible closed-choice contrast check and prevents the existing SRS identity from receiving any future safe review.
- requires careful lesson-practice behavior because the current support relationship remains but ceases to be assessable.

**Disposition: do not choose.** It is safe and precedented, but broader than necessary. This record can retain bounded recognition authority.

## 11. Option C — mode-specific authority restriction

**Proposal:** preserve the record as a contrast overview, explicitly allow only a clearly labelled closed-choice contrast-recognition exercise, and block productive modes.

This fully resolves the P1 if the restriction is applied at every authority boundary:

- generation: only `grammar_form_selection` is allowed for `en-would-like`.
- public `selection`, `recall`, and mixed-mode scheduling: either downgrade this ID to the safe form-selection exercise or omit it; never fall through to CC or typed recall.
- resolver: re-check the current per-record exercise-type policy so previously sealed CC/recall tokens become stale.
- legacy tokenless attempt: reject this ID rather than grade `form_name`.
- weakness/SRS/recommendation entry points: may retain the ID, but any launch must generate only the allowed selection form.
- lesson practice: preserve the relationship and evidence identity; when selected, use the allowed form-selection exercise.

The canonical explanatory model can remain a contrast family. A small title/form-label clarification is needed so the one allowed exercise explicitly asks learners to recognize a contrast overview instead of pretending the members are synonyms.

**Disposition: choose.** This is the smallest option that removes every unsafe productive authority while preserving the record, lesson relationship, progress identity, and useful recognition.

## 12. Option D — split record

**Proposal:** split `would like` from `like` / `love` / `prefer`, creating new canonical IDs and migrating examples/links.

Assessment:

- semantic purity: highest if each new record receives a narrow model and examples.
- learner-state impact: new IDs fragment or duplicate history and SRS; deciding how to map umbrella attempts would be editorially arbitrary.
- curriculum impact: relationships and practice targets need migration.
- editorial/engineering cost: highest; new titles, models, examples, links, policies, migrations, and history rules are required.
- marginal safety benefit over Option C: none for the current Stage 1 outcome, which needs only bounded recognition/support.

**Disposition: do not choose.** Split only if a later curriculum plan independently needs productive mastery of the separate constructions.

## 13. Recommended fix

Choose **C. MODE-SPECIFIC AUTHORITY RESTRICTION**.

Human approval recommendation:

> Approve `en-would-like` as a contrast-recognition support record, not as one productive grammar form. Preserve ID `en-would-like`, all current lesson/history/SRS identity, and all nine examples as teaching evidence. Permit only a clearly labelled, closed-choice contrast-recognition exercise. Prohibit typed recall, controlled completion (including legacy link fallback), and tokenless exact-form grading. Revalidate exercise type at token resolution and return `STALE_EXERCISE` for already-issued unsafe tokens.

This recommendation is narrower than retirement, canonical narrowing, or a split, and it directly closes every observed unsafe route.

## 14. Exact proposed authority

This is an approval specification for a future Hotfix 04, not a change made by this review.

| Authority element | Proposed exact decision |
|---|---|
| Canonical ID | keep `en-would-like` |
| Learner-facing title | `would like / would love / would prefer：礼貌愿望、邀请与偏好（对比）` |
| Bounded model | A contrast overview of three non-equivalent **would** constructions: `would like` for polite desire/offer/invitation; `would love (to)` for enthusiastic willingness/desire; `would prefer` for preference relative to alternatives. Do not teach them as synonyms. |
| Bounded form label | `would like / would love / would prefer（对比）` |
| Structural reference | `would like + noun / to + V / person + to + V; would love + to + V; would prefer + noun / to + V` |
| Allowed practice | `grammar_form_selection` only, presented explicitly as contrast recognition; `choice_exact` against the visible bounded form label. |
| Blocked practice | `grammar_form_recall`, `grammar_controlled_completion`, every legacy CC fallback, and tokenless direct grammar-answer grading. |
| Public recognition request | allowed; must produce only `grammar_form_selection`. |
| Public selection request | for this ID, downgrade to the same safe `grammar_form_selection` or return no exercise; never generate CC. |
| Public recall request | blocked for this ID; return no exercise rather than substituting a productive task. |
| Mixed / lesson / weakness / SRS request | this ID may appear, but must resolve only to the allowed `grammar_form_selection`; never to recall or CC. |
| CC policy | `NOT FOR CC`; no approved answer and no fallback. All nine examples and all seven sentence links are non-authoritative for completion. |
| Recall policy | disabled; there is no single defensible typed canonical answer. |
| Accepted-answer policy | closed choice only: the exact visible contrast label under `choice_exact`; no typed slash list and no list of supposedly interchangeable lexical answers. |
| Current examples | **YES, compatible as teaching evidence.** Text changes are not required. |
| Example disposition | relabel/reclassify editorially as 6 WOULD LIKE, 1 WOULD LOVE, 2 WOULD PREFER; mark every example/link `NOT FOR CC` through the Hotfix 04 authority mechanism or review ledger. Do not claim a database field exists until the implementation design chooses the existing review table or a narrowly scoped policy. |

The title/form-label clarification does not narrow the row to one construction; it makes the retained overview honest and makes the sole allowed recognition task unambiguous.

## 15. Learner compatibility

| Area | Expected impact / required safeguard |
|---|---|
| Historical attempts | preserve all `learning_attempts`; do not rewrite or delete results. Past unsafe tasks remain historical facts, not evidence to replay. |
| Grammar progress | preserve the existing row keyed by `(user_id, grammar_id)`; keeping `en-would-like` keeps identity stable. Vocabulary progress is unaffected. |
| SRS | preserve `review_stage`, counts, lapses, timestamps, due date, and interval on the existing grammar row. Do not reset or clone state. Future due reviews use safe selection only. |
| Lesson completion | preserve the `en-s1-l2` relationship and existing completion/evidence. Do not recompute lesson completion. The item is support/non-required, so no lesson outcome depends on productive umbrella recall. |
| Recommendations | the record may continue to appear from current progress/recommendation logic, but launching it must route to safe selection. No unrelated ranking change is needed. |
| Weakness remediation | preserve weakness identity, but weakness generation must honor the per-ID mode policy. A recall/CC remediation request must omit or downgrade this item to safe selection. |
| Stale exercises | **required:** already-issued `grammar_form_recall` and `grammar_controlled_completion` tokens for this ID must fail resolution as `STALE_EXERCISE` (HTTP 409 through the current attempt endpoint). Existing allowed selection tokens may remain valid only if their sealed answer still matches the approved current label; otherwise stale them too. |
| Direct legacy attempt | tokenless submission for this grammar ID must no longer obtain or grade `form_name`; reject the unsupported path without mutating progress. |

The schema makes the preservation strategy straightforward: `grammar_progress` and its SRS columns are anchored to `grammar_id`, and the primary key is `(user_id, grammar_id)`. No identity replacement is justified.

## 16. Future regression test plan

Do not implement these tests in this review. Hotfix 04 validation should cover:

1. **Canonical model:** the ID remains `en-would-like`; published lesson rendering shows the approved contrast title/model and explicitly non-equivalent functions.
2. **Example inventory:** exactly nine current examples remain; classifier fixture remains 0 LIKE / 1 LOVE / 2 PREFER / 6 WOULD LIKE / 0 OTHER.
3. **Lesson identity:** exact active relationship count remains one, at `en-s1-l2`, role `support`, required false; no Stage 6 link appears.
4. **Recognition:** standalone, lesson, weakness, mixed, and due-review paths can produce only `grammar_form_selection` for this ID; prompt/label make the contrast explicit; choices contain one approved exact answer.
5. **Selection request:** `mode=selection` cannot produce `grammar_controlled_completion` for this ID and deterministically downgrades to safe form selection or omits the item according to the approved API contract.
6. **Recall block:** `mode=recall` cannot produce `grammar_form_recall` for this ID in standalone, lesson, weakness, or review contexts.
7. **CC block:** zero explicit or fallback CC can be generated from any of the seven current sentence links; test all three whole-sentence links and the four `I’d like` links.
8. **Legacy attempt block:** tokenless exact-form submission for this ID is rejected and writes no attempt/progress/SRS mutation.
9. **Stale token handling:** pre-hotfix recall and CC tokens resolve to `STALE_EXERCISE`; the attempt endpoint returns 409 and writes no attempt. Test a whole-sentence CC token and an `I’d like` CC token.
10. **Allowed-token handling:** a post-hotfix form-selection token resolves and grades through `choice_exact`; normalization stays case/whitespace-only as designed.
11. **Learner-state preservation:** seed attempts, grammar progress, SRS values, and lesson completion before migration; assert byte/value-equivalent history and scheduling fields afterward.
12. **Recommendation/weakness behavior:** the ID can remain recommended/due/weak, but every generated exercise is the allowed safe type; no queue silently loops on a blocked type.
13. **API privacy:** session payload omits the sealed answer and policy, does not leak answer material outside visible multiple-choice options, and does not expose another learner’s state; invalid/foreign tokens remain invalid.
14. **Scope guard:** no other grammar ID changes eligibility or generated mode; P2/P3 content counts and unrelated Audit 02 records remain unchanged.

## 17. Hotfix 04 decision and production-gate impact

**HOTFIX 04 REQUIRED: YES.**

Exact bounded scope:

1. one canonical record only: `en-would-like`;
2. preserve its ID, publication, current single lesson relationship, nine example texts, historical attempts, progress, and SRS rows;
3. clarify its learner-facing title/form label as a `would like` / `would love` / `would prefer` contrast overview;
4. add a per-record practice authority policy that permits only `grammar_form_selection` and declares `NOT FOR CC` / no typed recall;
5. enforce that policy in generation, lesson/mixed/weakness/review routing, sealed-token resolution, and the tokenless legacy attempt path;
6. stale previously issued unsafe recall/CC tokens;
7. add only the focused regression coverage listed above.

Hotfix 04 must not include P2 vocabulary enrichment, grammar-example enrichment, expression-context work, general terminology cleanup, a lesson change, Stage 6 re-addition, or any unrelated Audit 02 record. If an additive migration is chosen as the delivery mechanism, it must remain a one-record authority migration plus the directly required runtime/test enforcement; this review creates no migration.

After that bounded fix is implemented and validated:

- remaining P0: **0**
- remaining P1: **0**
- **CONTENT READY FOR PRODUCTION: YES**

P2/P3 editorial debt remains non-blocking. This decision authorizes neither production setup nor deployment; it closes the content gate only after the future hotfix passes validation.
