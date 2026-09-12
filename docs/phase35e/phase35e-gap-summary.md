# Phase 3.5E — Content Gap Analysis & Curriculum Expansion Planning

Audit time: 2026-09-10T06:35:26.438Z  
Source: local read-only Phase 3.5D.1-compatible canonical D1 clone. Dynamic AI examples are excluded from curated coverage. No Worker or D1 was created or deployed.

## 【Current Curriculum Health】

English: 345 vocabulary (119 linked, 34.5%), 73 grammar (42 linked, 57.5%), 226 expressions (92 linked, 40.7%), 24 lessons.

Japanese: 350 vocabulary (107 linked, 30.6%), 82 grammar (43 linked, 52.4%), 233 expressions (89 linked, 38.2%), 24 lessons.

overall strengths: complete bilingual Stage 1–6 skeleton; canonical lesson references are valid; all vocabulary/grammar has at least one curated example; scenarios, dialogues and draft exam support exist.

overall weaknesses: coverage is shallow—154/155 grammar points have only 1–2 examples, 687/695 vocabulary items have exactly one, all dialogues stop at two turns, semantic relations are sparse, and several high-value daily tasks are absent.

## 【Vocabulary Gaps】

English: Stage totals 88/83/69/51/22/32. Linked 119/345; 153 have no curated-expression use; 341 have exactly one vocabulary example.

Japanese: Stage totals 97/79/80/48/25/21. Linked 107/350; 183 have no curated-expression use; 346 have exactly one vocabulary example.

missing high-value: restaurant safety/payment, supermarket/returns, clinic/pharmacy, appointments, renting/maintenance, banking/payment, connectivity, accommodation, driving and workplace terms. 92 representative candidates are fully specified in vocabulary-gap-report.json; they are not inserts.

underused: 336 items have no expression use. library-only: retain advanced/long-tail items until a coherent task needs them. duplicate/review candidates: four English normalized-lemma groups (help, plan, rain, work); no automatic merge.

## 【Grammar Gaps】

English: missing an explicit negation/short-answer spine, past questions/negatives, advice/obligation, first conditional, and tense contrast. 31/73 points are unassigned.

Japanese: particles, adjective/plain-form conjugation, counters, obligation, giving/receiving, register transition and condition contrasts need deliberate sequencing. 39/82 points are unassigned.

missing progression: high-level structures exist before foundational communicative contrasts are securely in the path. underused grammar: 70 points are library-only in lessons even though all have at least one expression. possible merge/review: teach related families contrastively; do not mechanically merge them.

## 【Curated Example Gaps】

grammar 0 examples: 0.  
grammar 1–2: 154.  
grammar 3–5: 1.  
grammar 6+: 0.

vocabulary example gaps: 0 with none; 687 with one; 8 with 2–3; 0 with 4+. One example cannot demonstrate polarity, questions, tense/register variation, collocation range or usage conditions.

## 【Expression / Sentence Gaps】

English: 151 sentences, 46 scenario expressions, 29 dialogue expressions / 58 turns.

Japanese: 159 sentences, 45 scenario expressions, 29 dialogue expressions / 58 turns.

sentence: 310/459 expressions are isolated sentence units. scenario: contexts exist but generally lack follow-up. dialogue: every one of 58 dialogue expressions is exactly two turns; none models repair plus final confirmation.

## 【Lesson Health】

strong (18): en-s2-l1, en-s2-l2, en-s2-l3, en-s3-l3, en-s4-l1, en-s4-l2, en-s4-l4, en-s5-l1, ja-s2-l2, ja-s2-l4, ja-s3-l1, ja-s3-l3, ja-s3-l4, ja-s4-l2, ja-s4-l3, ja-s4-l4, ja-s5-l2, ja-s5-l4.

needs enrichment (22): en-s1-l1, en-s1-l2, en-s1-l3, en-s2-l4, en-s3-l1, en-s3-l2, en-s3-l4, en-s5-l3, en-s5-l4, en-s6-l1, en-s6-l2, ja-s1-l1, ja-s1-l2, ja-s1-l3, ja-s1-l4, ja-s2-l1, ja-s2-l3, ja-s3-l2, ja-s5-l1, ja-s6-l1, ja-s6-l2, ja-s6-l3.

needs restructure (8): en-s1-l4, en-s4-l3, en-s5-l2, en-s6-l3, en-s6-l4, ja-s4-l1, ja-s5-l3, ja-s6-l4.

new lesson candidates: 8 English and 8 Japanese candidates covering clinic, restaurant/supermarket/returns, appointment/connectivity/workplace, renting and accommodation. Every lesson’s score, content counts, diagnosis and recommendation is in lesson-gap-report.json.

## 【Unassigned Content】

English: 391 published items across vocabulary/grammar/expressions. Japanese: 426.

SHOULD_ASSIGN_EXISTING_LESSON: 200.  
SHOULD_FORM_NEW_LESSON: 7.  
LIBRARY_ONLY_VALID: 110.  
SUPPORT_ONLY: 225.  
POSSIBLE_DUPLICATE: 1.  
NEEDS_EDITORIAL_REVIEW: 274.  
POSSIBLE_REMOVE/MERGE: 4 overlapping proposals; no deletion.

## 【Topic Coverage】

overrepresented: chat is a catch-all (EN 39, JA 48 expressions); school is also large (EN 25, JA 26) but mixes work and academic discourse.

underrepresented: body has 2 expressions per language and no lesson; health/home/shopping/time/hobbies have one lesson per language; Japanese food has one lesson.

missing functions: cooking/supermarket, returns, medical service, renting, banking/payment, connectivity, accommodation, driving and workplace operations. Database taxonomy warning: 15 topic IDs exist because body and health share the label 身体状态.

## 【Communicative Function Coverage】

Stage 1: greet/thank/apologize/request/want; gaps in full introductions, follow-up, closing and negative correction.  
Stage 2: ask/answer/confirm/choose/directions/permission; gaps in clarification, rescheduling, counters and refusal response.  
Stage 3: describe/plan/suggest/request; gaps in advice, past-experience Q&A, returns and multi-step problem solving.  
Stage 4: feelings/boundaries/preferences; gaps in complaint, remedy, negotiation and register movement.  
Stage 5: conditions/evidence/indirect requests; gaps in sustained disagreement and agreement-building.  
Stage 6: hypothesis/formal framing/hedging fragments; gaps in paragraph narration, challenge-response and advanced social negotiation.

## 【Progression】

English: expression averages rise to Stage 5 then fall at Stage 6; Stage 6 average vocabulary/grammar levels are only 2.38/3.42 in the unweighted lesson audit.

Japanese: expression difficulty rises more steadily, but Stage 5 travel and Stage 6 social lessons regress sharply; Stage 6 average vocabulary/grammar levels remain 2.75/3.92.

difficulty inversions: en-s5-l2, en-s6-l3, en-s6-l4, ja-s4-l1, ja-s5-l3, ja-s6-l4. stage jumps: early exposure/support items jump above stage, while later stages reuse low-level material without sufficient interaction depth.

## 【Exam Supporting Coverage】

IELTS: useful draft anchors for opinion/evidence/comparison exist, but speaking sequences, qualification and examples are sparse. JLPT: N5→N1 draft anchors exist, but this is not official word-by-word classification and internal grammar/register progression is incomplete. alignment changed: NO.

## 【Top 30 Curriculum Gaps】

1. **P0 · EN · Stage 1 · grammar** — Basic negation/short-answer system is not a taught grammar point in the path Why: Without correction and negative answers, Stage 1 interaction is brittle Solution: Add be/do negation with affirmative/negative/question variants Estimate: 2 grammar concepts + 16–20 examples + 8 expressions.
2. **P0 · JA · Stage 1 · grammar** — Core particle progression is not explicit in lessons Why: に/へ/で and から/まで are essential for travel and time Solution: Teach particles through route and appointment tasks Estimate: 2–3 grammar concepts + 18–24 examples + 10 expressions.
3. **P0 · EN · Stage 1 · curated_examples** — 72/73 grammar points have only one curated example Why: A single form cannot show polarity, question, tense or usage conditions Solution: Prioritize 35 core grammar points at 6–10 examples Estimate: +210–280 examples first wave.
4. **P0 · JA · Stage 1 · curated_examples** — 82/82 grammar points have only one curated example Why: Japanese needs form, politeness, register and particle variation Solution: Prioritize 40 core grammar points at 6–10 examples Estimate: +260–340 examples first wave.
5. **P0 · EN · Stage 2 · dialogue** — All 29 English dialogues are only two turns Why: Learners never practice follow-up, repair or final confirmation Solution: Extend high-value service and planning tasks to 3–5 turns Estimate: +14–18 dialogues/scenarios.
6. **P0 · JA · Stage 2 · dialogue** — All 29 Japanese dialogues are only two turns Why: Politeness and response choice require sustained context Solution: Extend service, requests and register tasks to 3–5 turns Estimate: +16–20 dialogues/scenarios.
7. **P0 · EN · Stage 3 · topic** — Clinic/pharmacy interaction is absent Why: Four isolated health expressions do not support safe symptom communication Solution: Create clinic lesson and symptom/advice set Estimate: 10–14 vocab + 10–12 expressions + 2 contexts.
8. **P0 · JA · Stage 2 · topic** — Restaurant ordering workflow is absent Why: The single food lesson cannot cover ordering, restrictions, substitution and payment Solution: Create restaurant lesson with service responses Estimate: 10–14 vocab + 10–12 expressions + 2 contexts.
9. **P0 · EN · Stage 3 · function** — Booking, canceling and rescheduling are not a complete task Why: Time lesson confirms a meeting but does not handle change Solution: Create appointment lesson with alternative negotiation Estimate: 8–12 vocab + 10 expressions + 2 dialogues.
10. **P0 · JA · Stage 2 · grammar** — 助数詞 progression is absent from the shopping path Why: Quantity cannot be handled naturally with generic number words alone Solution: Teach 人/本/枚/個/つ through supermarket tasks Estimate: 1 grammar family + 20–30 examples/expressions.
11. **P0 · EN · Stage 5 · lesson** — en-s5-l2 has Stage 5 objective but average grammar Level 2.67 Why: The path labels simple travel statements as advanced negotiation Solution: Restructure around conditions, alternatives and confirmation Estimate: +8 expressions + 1 dialogue; replace/re-role grammar.
12. **P0 · JA · Stage 5 · lesson** — ja-s5-l3 has average grammar Level 1.33 Why: The lesson does not realize its condition/negotiation objective Solution: Use なら/ても/場合 and multi-turn travel disruption Estimate: +8 expressions + 1 dialogue; grammar re-composition later.
13. **P0 · EN · Stage 6 · lesson** — en-s6-l3 regresses to Stage 1–2 invitation language Why: Stage 6 independence is broken by a basic social lesson Solution: Move down or rebuild as tactful negotiation and repair Estimate: +8 advanced expressions + 1 dialogue.
14. **P0 · JA · Stage 6 · lesson** — ja-s6-l4 regresses to Level 1–3 invitation language Why: Late-stage progression is not demonstrably harder Solution: Move down or rebuild around conditional acceptance and rescheduling Estimate: +8 advanced expressions + 1 dialogue.
15. **P0 · JA · Stage 2 · progression** — Polite/plain forms are present as fragments, not a deliberate transition Why: Register errors affect naturalness and social appropriateness Solution: Add explicit plain/polite conversion and relationship conditions Estimate: 3 grammar contrasts + 24–30 examples.
16. **P1 · EN · Stage 1 · vocabulary_examples** — 341/345 English vocabulary items have exactly one curated usage Why: Core words lack collocation, context and sense contrast Solution: Add stable usage to 120 highest-use/core items Estimate: +180–240 vocab examples/collocations.
17. **P1 · JA · Stage 1 · vocabulary_examples** — 346/350 Japanese vocabulary items have exactly one curated usage Why: Reading alone does not show particles, conjugation or collocation Solution: Add stable usage to 130 core items Estimate: +200–260 vocab examples/collocations.
18. **P1 · BOTH · Stage 1 · semantic_relations** — Only 11 vocabulary relations cover a 695-item lexicon Why: Synonym, contrast, register and collocation navigation is almost absent Solution: Author reviewed relations for high-confusion clusters Estimate: +90–130 relation edges.
19. **P1 · EN · Stage 4 · lesson** — en-s4-l3 claims full restaurant ordering but covers mainly order correction Why: Learners cannot complete the full service encounter Solution: Add seating/order/restriction/check/bill sequence Estimate: +6–8 vocab + 8 expressions + 1 dialogue.
20. **P1 · JA · Stage 4 · lesson** — ja-s4-l1 uses low-level grammar and unnatural daily wording for weather planning Why: Form difficulty and communicative naturalness are misaligned Solution: Use そう/かもしれない/ので and natural forecast language Estimate: +6 expressions + 6 examples.
21. **P1 · EN · Stage 3 · topic** — Digital phone/network troubleshooting is absent Why: A common daily help task has no vocabulary or scenario Solution: Create connectivity lesson or module Estimate: 8–12 vocab + 10 expressions + 1 dialogue.
22. **P1 · JA · Stage 3 · topic** — 報告・連絡・相談 and workplace register are absent Why: Existing honorific/humble grammar remains library-only Solution: Create workplace lesson with register ladder Estimate: 10–14 vocab + 12 expressions + 2 dialogues.
23. **P1 · EN · Stage 4 · topic** — Renting and maintenance communication is absent Why: Home content only covers chores and shared equipment Solution: Create renting/repair lesson Estimate: 10–14 vocab + 10 expressions + 2 contexts.
24. **P1 · JA · Stage 4 · topic** — 賃貸・修理 interaction is absent Why: Housing problems require role and politeness choices Solution: Create landlord/management repair lesson Estimate: 10–14 vocab + 10 expressions + 2 contexts.
25. **P1 · BOTH · Stage 3 · topic** — Shopping lacks returns/refunds/exchanges Why: Buying without after-sales repair leaves the task incomplete Solution: Add a returns lesson per language Estimate: 8–12 vocab + 10 expressions + 1 dialogue each.
26. **P1 · BOTH · Stage 4 · topic** — Travel is transport-heavy and lacks accommodation Why: Check-in, facilities and room problems are common travel tasks Solution: Add accommodation lesson per language Estimate: 8–12 vocab + 10 expressions + 1 dialogue each.
27. **P1 · EN · Stage 3 · grammar** — Advice, obligation and first conditional are missing as a coherent progression Why: Health, school and plans lack reusable functional grammar Solution: Add should, must/have to and first conditional Estimate: 3 concepts + 24–30 examples.
28. **P1 · JA · Stage 3 · grammar** — Experience, comparison and condition contrasts exist only partially or unassigned Why: Core communicative functions are not sequenced Solution: Assign たことがある and add comparison/condition contrast Estimate: 3–4 concepts + 28–36 examples.
29. **P2 · BOTH · Stage 5 · exam_support** — IELTS/JLPT alignments are sparse draft mappings Why: They support discovery but cannot evidence broad target coverage Solution: Keep draft; expand only after communicative core is repaired Estimate: review 78 mappings; no official-list claim.
30. **P2 · BOTH · Stage 1 · taxonomy** — `body` and `health` duplicate the same Chinese topic label Why: Two IDs split tiny body content and distort the stated 14-topic baseline Solution: Editorially merge, rename or define distinct scopes Estimate: review 4 expressions + 4 vocab links; no automatic merge.

## 【Expansion Recommendation】

MINIMUM: EN vocab 45–60; JA vocab 50–65; EN grammar 6–8; JA grammar 8–10; EN curated grammar examples 260–320; JA 300–360; EN expressions 60–80; JA 70–90; EN dialogues/scenarios 16–20; JA 18–22; EN lessons 4–5; JA 5–6. Close P0 path breaks: foundational grammar, clinic/appointment/restaurant/counters, and multi-turn interaction.

RECOMMENDED: EN vocab 90–110; JA vocab 100–125; EN grammar 10–14; JA grammar 14–18; EN curated grammar examples 390–470; JA 450–540; EN expressions 110–140; JA 120–150; EN dialogues/scenarios 28–36; JA 32–40; EN lessons 6–8; JA 7–9. A coherent V1: cover the eight proposed daily-life task families, deepen core grammar to a differentiated 6–10 examples, and add interaction chains without forcing all library items into lessons.

EXTENDED: EN vocab 150–190; JA vocab 165–210; EN grammar 18–24; JA grammar 22–30; EN curated grammar examples 620–760; JA 700–860; EN expressions 220–280; JA 240–300; EN dialogues/scenarios 50–70; JA 55–75; EN lessons 10–12; JA 11–14. Future depth: workplace, driving, banking, accommodation and advanced discourse variants after V1 validation.

具体推荐（Phase 3.5E.1 review baseline）: EN vocab 90–110; JA vocab 100–125; EN grammar 10–14; JA grammar 14–18; EN curated grammar examples 390–470; JA 450–540; EN expressions 110–140; JA 120–150; EN dialogues/scenarios 28–36; JA 32–40; EN new lessons 6–8; JA 7–9.

## 【Content Creation Strategy】

Vocabulary: AI-assisted + editorial/native review. Grammar: editorially authored. Curated Examples: AI-assisted drafting + editorial/native review. Expressions: derive from canonical items first, otherwise AI-assisted + review. Dialogues: editorial task design + AI-assisted drafting + native review. Dynamic AI Examples: DeepSeek runtime only; ephemeral and never counted as curated curriculum.

## 【QA】

errors: 0. warnings: categorized in phase35e-gap-report.json (baseline deltas, topic taxonomy, example depth, dialogue depth, sparse relations, progression, heuristic limits). duplicate candidates: 0. invalid references: 0. count consistency: PASS.

## 【Changes】

curriculum changed: NO. D1 changed: NO. lessons changed: NO. learner progress changed: NO. AI Dynamic Examples changed: NO. production changed: NO.

## 【Conclusion】

PHASE 3.5E CONTENT GAP ANALYSIS = YES
CURRICULUM DATABASE MODIFIED = NO
LESSON COMPOSITION MODIFIED = NO
LEARNER PROGRESS MODIFIED = NO
AI DYNAMIC EXAMPLES MODIFIED = NO
CONTENT GAPS IDENTIFIED = YES
UNASSIGNED CONTENT CLASSIFIED = YES
TOP 30 CURRICULUM GAPS PRODUCED = YES
EXPANSION COUNTS RECOMMENDED = YES
CURATED EXAMPLE GAPS AUDITED = YES
VOCABULARY GAPS AUDITED = YES
GRAMMAR GAPS AUDITED = YES
LESSON GAPS AUDITED = YES
PHASE 3.5E.1 STARTED = NO
PHASE 4 STARTED = NO
PRODUCTION CHANGED = NO
