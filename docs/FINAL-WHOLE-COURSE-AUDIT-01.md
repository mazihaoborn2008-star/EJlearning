# EJ Learning — Final Whole-Course Audit 01

## Executive acceptance decision

The post-Stage-6 source is structurally sound and materially stronger than the pre-expansion course. Both languages now have a single mandatory 38-lesson path, 594 authored minutes (9.9 hours), deliberate late review, healthy practice density, and a real six-lesson capstone. English reaches the project-defined **MODERATE GUIDED COURSE** classification. Japanese is **APPROACHING MODERATE**: its path and outcomes are coherent, but its 251 unique assessable items remain below the project's approximate 260-item planning floor and its guided grammar editorial debt remains larger.

**Another lesson expansion before production: NO.** No blocking outcome hole remains. The marginal benefit of more lessons is now lower than the benefit of bounded canonical-model review and editorial enrichment.

Production handoff is **READY WITH ONE BOUNDED CONTENT CONDITION**: review the active `en-would-like` assessment model before production. There are **0 P0 blockers** and **1 P1 record-level concern**. This condition does not justify another lesson or a Stage 7 design.

## 1. Release baseline, method, and safety

Pre-flight passed before this document was created:

- branch: `main`;
- `HEAD`: `482e9d8c21493045b30a7a42740472d3ef9dedf2`;
- `origin/main`: `482e9d8c21493045b30a7a42740472d3ef9dedf2`;
- worktree: clean;
- source bundle: `curriculum-stage6-expansion-03-v1`;
- schema: `CURRICULUM-STAGE6-EXPANSION-03`;
- dataset marker: `2026-09-stage6-expansion-03-v1`;
- supplied verified staging reference: Worker `ej-learning-36`, version `dd18aced-06d8-405d-8716-6aff3514c986`.

The audit loaded the immutable pre-Expansion-01, post-Expansion-01, post-Stage-5, and post-Stage-6 bundles directly from source. Canonical metadata was evaluated in an in-memory SQLite database built from the checked-in migrations. The full vocabulary inventory totals were independently cross-checked against `config/staging-data-policy.json`; the smaller 435 EN / 450 JA in-repository snapshot is the curated example-bearing subset, not the full published library.

Definitions used throughout:

- **Runtime-active relationships** exclude the archived grammar-category IDs `en-greeting` and `ja-greeting`.
- **Authoritative grammar** excludes archived greetings and the Hotfix 02 overview-only IDs `35e1c-ja-condition-contrast` and `35e1c-ja-workplace-register`.
- **Unique assessable breadth** is unique vocabulary plus unique authoritative grammar. Expressions are not assessment authority.
- **Safe opportunities** are three vocabulary modes, two grammar modes, and one controlled-completion opportunity for each grammar item with current safe authority or a valid unreviewed sentence-local fallback.
- **Strict expression context** means canonical dialogue/scenario/context metadata or an approved versioned/detail context. A generic sentence appearance is not strict context.
- Learner time uses the established **2–3× planning multiplier** for practice, retry, and review. It is an estimate, not measured usage.

This audit did not modify curriculum, canonical content, examples, relationships, roles, prerequisites, migrations, D1, learner state, branches, or deployments.

## 2. Global integrity

| Invariant | Final result |
|---|---:|
| Lessons | **76** |
| Prerequisite edges | **74** |
| Raw relationships | **1,130** |
| Runtime-active relationships | **1,126** |
| Raw/runtime gap | **4** |
| Roots | **2** (`en-s1-l1`, `ja-s1-l1`) |
| Reachable lessons | **76/76** |
| Cycles | **0** |
| Missing prerequisites | **0** |
| Cross-language prerequisites | **0** |
| Stage 6 bypasses | **0** |
| Terminals | EN `en-s6-l4`; JA `ja-s6-l3` |

The four raw-only relationships are exact historical links to grammar-category records retired by Content Quality Hotfix 01:

| Lesson | Archived grammar | Runtime treatment |
|---|---|---|
| `en-s1-l1` | `en-greeting` | preserved raw; excluded from current grammar and practice |
| `en-s1-l2` | `en-greeting` | preserved raw; excluded from current grammar and practice |
| `ja-s1-l1` | `ja-greeting` | preserved raw; excluded from current grammar and practice |
| `ja-s1-l2` | `ja-greeting` | preserved raw; excluded from current grammar and practice |

They are compatibility evidence, not dangling or missing canonical links.

## 3. Final scale and exact mandatory paths

| Language | Lessons | Mandatory depth | Authored minutes | Authored hours | Estimated learner hours at 2–3× | 2.5× midpoint estimate |
|---|---:|---:|---:|---:|---:|---:|
| English | **38** | **38** | **594** | **9.9 h** | **19.8–29.7 h** | **24.8 h** |
| Japanese | **38** | **38** | **594** | **9.9 h** | **19.8–29.7 h** | **24.8 h** |

Every published lesson is mandatory. The exact path, grouped only for readability, is:

**English**

- S1: `en-s1-l1 → en-s1-l2 → en-s1-l3 → en-s1-l4`
- S2: `en-s2-l1 → en-s2-l2 → en-s2-l3 → en-s2-l4 → en-s2-l5`
- S3: `en-s3-l1 → en-s3-l2 → en-s3-l3 → en-s3-l4 → en-s3-l5 → en-s3-l6 → en-s3-l7 → en-s3-l8 → en-s3-l9`
- S4: `en-s4-l1 → en-s4-l2 → en-s4-l3 → en-s4-l4 → en-s4-l5 → en-s4-l6`
- S5: `en-s5-l1 → en-s5-02-tradeoffs → en-s5-03-consensus → en-s5-l2 → en-s5-l3 → en-s5-06-repair → en-s5-l4 → en-s5-08-reporting`
- S6: `en-s6-l1 → en-s6-l2 → en-s6-03-synthesis → en-s6-04-accountability → en-s6-l3 → en-s6-l4`

**Japanese**

- S1: `ja-s1-l1 → ja-s1-l2 → ja-s1-l3 → ja-s1-l4`
- S2: `ja-s2-l1 → ja-s2-l2 → ja-s2-l3 → ja-s2-l4 → ja-s2-l5 → ja-s2-l6`
- S3: `ja-s3-l1 → ja-s3-l2 → ja-s3-l3 → ja-s3-l4 → ja-s3-l5 → ja-s3-l6 → ja-s3-l7 → ja-s3-l8`
- S4: `ja-s4-l1 → ja-s4-l2 → ja-s4-l3 → ja-s4-l4 → ja-s4-l5 → ja-s4-l6`
- S5: `ja-s5-l1 → ja-s5-l2 → ja-s5-03-formal-role → ja-s5-l3 → ja-s5-l4 → ja-s5-06-repair → ja-s5-07-consensus → ja-s5-08-benefit`
- S6: `ja-s6-l1 → ja-s6-l2 → ja-s6-03-reporting → ja-s6-04-accountability → ja-s6-l4 → ja-s6-l3`

## 4. Curriculum evolution

All values below are source-confirmed. Historical role-aware editorial measures that were not encoded in the old bundles are not reconstructed.

| Checkpoint | Lessons | Minutes/language | Mandatory depth/language | Runtime relationships | EN guided V/G/E | JA guided V/G/E | EN assessable | JA assessable |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Pre-Expansion-01 | 64 | 504 | 24 | 848 | 156/50/104 | 145/50/99 | 206 | 193 |
| Post-Expansion-01 | 64 | 504 | 32 | 953 | 177/54/124 | 167/54/120 | 231 | 219 |
| Post-Stage-5 | 72 | 564 | 36 | 1,071 | 194/58/131 | 177/61/127 | 252 | 236 |
| Post-Stage-6 | **76** | **594** | **38** | **1,126** | **204/58/123** | **189/64/122** | **262** | **251** |

Expansion 01 fixed path bypass and Stage 2–4 density without adding authored minutes. Stage 5 added the largest late-course time increase and explicit review. Stage 6 added two lessons per language, replaced rather than merely appended the old capstone composition, and traded some expression breadth for stricter context, higher-level vocabulary, synthesis, accountability, and terminal consolidation. The fall from 131→123 EN and 127→122 JA unique expressions is therefore a selection change, not lost canonical inventory.

Historical guided unique assessable breadth is fully available at all four checkpoints. Historical strict-context and example-debt values are available only from the prior audit snapshots and are compared in later sections.

## 5. Final guided and assessable coverage

The post-Stage-5 baselines in `POST-STAGE5-COVERAGE-AUDIT-01.md` are verified against the immutable Stage 5 bundle: EN 194 V / 58 G / 131 E and JA 177 V / 61 G / 127 E; unique assessable breadth 252 EN / 236 JA.

| Language | Final unique V | Final linked G | Final unique E | Combined guided footprint | Change vs post-S5 V/G/E |
|---|---:|---:|---:|---:|---:|
| English | **204** | **58** | **123** | **385** | +10 / 0 / −8 |
| Japanese | **189** | **64** | **122** | **375** | +12 / +3 / −5 |

| Language | Vocabulary | Authoritative grammar | Final unique assessable | Post-S5 | Delta |
|---|---:|---:|---:|---:|---:|
| English | 204 | 58 | **262** | 252 | **+10** |
| Japanese | 189 | 62 | **251** | 236 | **+15** |

Japanese's 64 linked grammar records include two useful overview-only records; the authoritative total is therefore 62. The implemented results exactly resolve the prior design projection: EN 262 and JA 251.

### Published library utilization

| Language | Guided vocabulary / published | Guided grammar / published | Guided expressions / language-resolved pool |
|---|---:|---:|---:|
| English | 204 / 10,000 = **2.04%** | 58 / 82 = **70.7%** | 123 / 348 = **35.3%** |
| Japanese | 189 / 8,235 = **2.30%** | 64 / 97 = **66.0%** | 122 / 365 = **33.4%** |

Low vocabulary utilization is not a failure: the reference library is intentionally much larger than the guided path. Guided selection quality, progression, and assessment authority matter more than quota-like library consumption.

## 6. Stage time and guided-coverage profile

### Authored time

| EN stage | Lessons | Minutes | Share of 594 minutes |
|---|---:|---:|---:|
| 1 | 4 | 60 | 10.1% |
| 2 | 5 | 78 | 13.1% |
| 3 | 9 | 150 | 25.3% |
| 4 | 6 | 96 | 16.2% |
| 5 | 8 | 120 | 20.2% |
| 6 | **6** | **90** | **15.2%** |

| JA stage | Lessons | Minutes | Share of 594 minutes |
|---|---:|---:|---:|
| 1 | 4 | 60 | 10.1% |
| 2 | 6 | 96 | 16.2% |
| 3 | 8 | 132 | 22.2% |
| 4 | 6 | 96 | 16.2% |
| 5 | 8 | 120 | 20.2% |
| 6 | **6** | **90** | **15.2%** |

### Stage-by-stage guided coverage

`Unique` values are stage-local and therefore overlap across stages. `Relationships` are exact current runtime links.

| EN stage | Lessons | Unique V/G/E | Relationship V/G/E | Stage-local assessable breadth |
|---|---:|---:|---:|---:|
| 1 | 4 | 27/7/17 | 32/10/17 | 34 |
| 2 | 5 | 32/13/18 | 39/15/20 | 45 |
| 3 | 9 | 68/18/35 | 71/25/36 | 86 |
| 4 | 6 | 48/14/24 | 48/18/24 | 62 |
| 5 | 8 | 46/15/26 | 64/24/32 | 61 |
| 6 | 6 | 42/16/18 | 48/17/23 | 58 |

| JA stage | Lessons | Unique V/G/E | Relationship V/G/E | Stage-local assessable breadth |
|---|---:|---:|---:|---:|
| 1 | 4 | 27/7/16 | 32/10/16 | 34 |
| 2 | 6 | 41/14/22 | 45/18/23 | 55 |
| 3 | 8 | 62/18/32 | 64/23/32 | 78 |
| 4 | 6 | 45/15/24 | 48/19/24 | 58 |
| 5 | 8 | 39/21/30 | 64/24/32 | 60 |
| 6 | 6 | 39/17/20 | 47/18/24 | 56 |

The large Stage 2→3 step is explained by Stage 3's eight or nine lessons, not a per-lesson density spike. Stage 5 has more relationship repetition than Stage 3–4 because it deliberately reviews and transfers known content. Stage 6 remains dense while narrowing expressions to context-ready material. No stage is an empty or structurally thin shell, and repetition is concentrated where communicative demand changes.

## 7. Vocabulary progression

Values are `unique / relationships` in internal levels L1→L6.

| Scope | L1 | L2 | L3 | L4 | L5 | L6 |
|---|---:|---:|---:|---:|---:|---:|
| EN whole course | 34/59 | 60/85 | 53/60 | 35/60 | 18/34 | 4/4 |
| EN Stage 5 | 5/5 | 8/10 | 4/5 | 20/29 | 9/15 | 0/0 |
| EN Stage 6 | 0/0 | 2/2 | 4/5 | 16/19 | 16/18 | 4/4 |
| EN Stages 5–6 combined | 5/5 | 9/12 | 8/10 | 26/48 | 17/33 | 4/4 |
| JA whole course | 35/69 | 60/86 | 56/71 | 22/47 | 14/25 | 2/2 |
| JA Stage 5 | 6/8 | 10/17 | 5/10 | 12/21 | 6/8 | 0/0 |
| JA Stage 6 | 0/0 | 2/2 | 5/6 | 18/21 | 12/16 | 2/2 |
| JA Stages 5–6 combined | 6/8 | 11/19 | 10/16 | 19/42 | 13/24 | 2/2 |

The earlier late-stage weakness is materially corrected. English now has 22 guided L5–6 vocabulary items and Japanese 16; Stage 6 itself is dominated by L4–5 rather than falling back to L1–3. This is functional progression, not a demand for level symmetry.

Japanese L6 use is exactly:

| ID | Item | Use | Examples | Finding |
|---|---|---|---:|---|
| `ja-c-859` | 不測の事態 | only `ja-s6-04-accountability` | 2 | narrow formal contingency language |
| `ja-c-871` | 説明責任 | only `ja-s6-04-accountability` | 2 | narrow formal accountability language |

There are no other guided Japanese L6 vocabulary items. Both are formal, outcome-bound, and register-bound; no further L6 addition is justified for symmetry.

## 8. Grammar progression

`Levels` are unique internal L1→L6 counts. Example depth is current `min/mean/max`; Stage 6 editorial examples can improve a grammar also used in an earlier stage. `CC` is unique authoritative grammar with current controlled-completion availability.

| EN stage | Unique / relationships | Authoritative / overview | Levels L1→L6 | Example depth | CC |
|---|---:|---:|---|---:|---:|
| 1 | 7/10 | 7/0 | 4/2/1/0/0/0 | 1/6.43/9 | 7 |
| 2 | 13/15 | 13/0 | 7/6/0/0/0/0 | 4/6.77/7 | 12 |
| 3 | 18/25 | 18/0 | 4/5/9/0/0/0 | 1/5.83/7 | 14 |
| 4 | 14/18 | 14/0 | 3/2/5/4/0/0 | 1/4.43/7 | 11 |
| 5 | 15/24 | 15/0 | 0/3/2/7/3/0 | 1/4.40/7 | 13 |
| 6 | 16/17 | 16/0 | 0/2/2/5/3/4 | 4/4.38/7 | 12 |

| JA stage | Unique / relationships | Authoritative / overview | Levels L1→L6 | Example depth | CC |
|---|---:|---:|---|---:|---:|
| 1 | 7/10 | 7/0 | 4/3/0/0/0/0 | 8/8.00/8 | 7 |
| 2 | 14/18 | 14/0 | 5/8/0/1/0/0 | 4/7.43/8 | 14 |
| 3 | 18/23 | 16/2 | 1/4/10/2/1/0 | 1/5.50/8 | 12 |
| 4 | 15/19 | 13/2 | 1/1/6/7/0/0 | 1/3.60/8 | 10 |
| 5 | 21/24 | 21/0 | 0/1/6/9/4/1 | 1/3.29/8 | 21 |
| 6 | 17/18 | 17/0 | 0/0/3/7/3/4 | 4/4.24/8 | 17 |

Functional progression is clear:

- Stage 4 consolidates perfect/aspect, obligation/condition contrast, requests, Japanese explanatory sequencing, giving/receiving, and workplace/condition overview support.
- English Stage 5 moves into hedged judgment, concession, inference, repair, reported information, and hindsight; Stage 6 sustains this with inversion, compressed background, qualified comparison, counterfactual reasoning, evidence-led claims, accountability, and commitment.
- Japanese Stage 5 moves into concession, bounded honorific/humble selection, condition negotiation, inference, normative judgment, and benefit direction; Stage 6 sustains it with formal conclusion, evidential basis, reporting/hearsay/inference distinctions, unavoidable action, responsibility, formal requests, and decisions.

**Stage 6 now sustains progression rather than collapsing.** Both languages have four unique Level 6 grammar records in Stage 6, no overview-only assessment shortcut, and a minimum of four examples for every Stage 6 grammar. Japanese remains more formally and grammatically burdened; English has the stronger explicit counterfactual sequence.

## 9. Stage 5→6 reinforcement and role structure

Roles describe instructional function, not grading or recommendation weight.

| Scope with role metadata | Relationships | NEW | REVIEW | SUPPORT |
|---|---:|---:|---:|---:|
| Whole current course | 649 | 328 (50.5%) | 174 (26.8%) | 147 (22.7%) |
| Stage 5 | 240 | 104 (43.3%) | 82 (34.2%) | 54 (22.5%) |
| Stage 6 | 177 | **66 (37.3%)** | **61 (34.5%)** | **50 (28.2%)** |

| Late stage/language | NEW | REVIEW | SUPPORT | REVIEW share |
|---|---:|---:|---:|---:|
| EN Stage 5 | 53 | 40 | 27 | 33.3% |
| JA Stage 5 | 51 | 42 | 27 | 35.0% |
| EN Stage 6 | 32 | 30 | 26 | 34.1% |
| JA Stage 6 | 34 | 31 | 24 | 34.8% |

Stage 6 review is both deliberate and distributed: every Stage 6 lesson has 2–7 REVIEW relationships, and the combined 34.5% share is inside the project's 25–35% late-review planning band.

| Stage 6 transfer measure | English | Japanese |
|---|---:|---:|
| Relationships / unique canonical items | 88 / 76 | 89 / 76 |
| NEW / REVIEW / SUPPORT relationships | 32/30/26 | 34/31/24 |
| REVIEW sources specifically in Stage 5 | 26 | 26 |
| REVIEW sources specifically in Stages 1–4 | 4 | 5 |
| Unique S6 items seen in Stage 5 | 37 | 33 |
| Unique S6 items seen in Stages 1–4 | 10 | 13 |
| Seen in both prior scopes | 5 | 4 |
| Seen anywhere in Stages 1–5 | 42 | 42 |
| New to the guided course | 34 | 34 |

All 61 REVIEW rows have a valid prior source and an explicit changed-demand rationale. The four dialogues, five reuse-prompt layers, and three scenarios raise familiar material into evidence synthesis, pressure-free commitment, formal accountability, reporting, or terminal reflection. That is true transfer/reinforcement. SUPPORT alone is not treated as proof of transfer, and repeated links without a changed asset/outcome are not given credit merely because they recur.

## 10. Editorial depth

### Final example depth

| Guided debt | Post-S5 | Final | Net reduction |
|---|---:|---:|---:|
| EN vocabulary with exactly 1 example | 77 | **70** | **7** |
| JA vocabulary with exactly 1 example | 72 | **66** | **6** |
| EN grammar with fewer than 4 examples | 16 | **8** | **8** |
| JA grammar with fewer than 4 examples | 22 | **14** | **8** |

| Language/type | 1 example | 2 or 2–3 examples | 3+ or 4+ examples | Total |
|---|---:|---:|---:|---:|
| EN vocabulary | 70 | 79 (exactly 2) | 55 (3+) | 204 |
| JA vocabulary | 66 | 58 (exactly 2) | 65 (3+) | 189 |
| EN grammar | 8 | 0 (2–3) | 50 (4+) | 58 |
| JA grammar | 14 | 0 (2–3) | 50 (4+) | 64 |

No guided vocabulary or grammar record has zero examples. Stage 6 directly added 21 EN and 19 JA vocabulary examples and 27 EN / 33 JA grammar examples. Because it also replaced the guided Stage 6 set, the net whole-course debt reduction is smaller than the authored-example count. Crucially, every final Stage 6 grammar now has at least four examples.

Remaining semantic-field duplication is 40/58 EN and 45/64 JA grammar records with identical title/core/purpose, and 38/58 EN and 45/64 JA with identical when/mistakes/nuance. This is learner-facing depth debt, not evidence that the underlying forms are invalid.

## 11. Expression contexts and lesson assets

### Strict expression context

Stage values are stage-local unique expression sets and can overlap.

| Scope | Total | Strict | Dialogue | Scenario | Other strict context | No strict context |
|---|---:|---:|---:|---:|---:|---:|
| EN whole course | 123 | **84** | 37 | 41 | 6 | **39** |
| EN S1 | 17 | 12 | 3 | 9 | 0 | 5 |
| EN S2 | 18 | 9 | 5 | 4 | 0 | 9 |
| EN S3 | 35 | 24 | 9 | 15 | 0 | 11 |
| EN S4 | 24 | 17 | 10 | 7 | 0 | 7 |
| EN S5 | 26 | 19 | 10 | 7 | 2 | 7 |
| EN S6 | 18 | **18** | 7 | 5 | 6 | **0** |
| JA whole course | 122 | **84** | 38 | 40 | 6 | **38** |
| JA S1 | 16 | 9 | 2 | 7 | 0 | 7 |
| JA S2 | 22 | 17 | 5 | 12 | 0 | 5 |
| JA S3 | 32 | 20 | 10 | 10 | 0 | 12 |
| JA S4 | 24 | 16 | 9 | 5 | 2 | 8 |
| JA S5 | 30 | 22 | 12 | 9 | 1 | 8 |
| JA S6 | 20 | **20** | 10 | 4 | 6 | **0** |

Post-Stage-5 contextless debt was verified at 50 EN / 49 JA. The final guided set is 39 EN / 38 JA, a net reduction of **11 per language**. Stage 6 added four EN and five JA approved context-detail records; composition changes account for the rest. Generic expression appearance was never counted as context.

### Explicit lesson-asset coverage

These are bundle-level lesson assets. Stages 1–4 use canonical linked dialogue/scenario expressions rather than the later `lesson_assets` layer, so `none` below does not mean “no contextualized expressions.”

| Language/stage | New dialogue | Reused canonical asset + new prompt | Scenario | None |
|---|---:|---:|---:|---:|
| EN S1 | 0 | 0 | 0 | 4 |
| EN S2 | 0 | 0 | 0 | 5 |
| EN S3 | 0 | 0 | 0 | 9 |
| EN S4 | 0 | 0 | 0 | 6 |
| EN S5 | 1 | 1 | 2 | 4 |
| EN S6 | **2** | **2** | **2** | **0** |
| JA S1 | 0 | 0 | 0 | 4 |
| JA S2 | 0 | 0 | 0 | 6 |
| JA S3 | 0 | 0 | 0 | 8 |
| JA S4 | 0 | 0 | 0 | 6 |
| JA S5 | 2 | 2 | 0 | 4 |
| JA S6 | **2** | **3** | **1** | **0** |

All twelve Stage 6 lessons now have an explicit communicative asset, while every Stage 6 expression has strict canonical context. Late lessons therefore have sufficient communicative support without imposing an asset requirement on every earlier lesson.

## 12. Controlled completion and practice readiness

### Authority quality

- Hotfix 02 keeps the two Japanese comparison/register overviews readable but excludes them from selection, recall, CC, weakness, review, and SRS authority.
- Hotfix 03 keeps `ja-n-desu-ga`, `ja-node`, `ja-honorific`, and `ja-humble` sentence-local and bounded.
- Stage 5 authority remains 28 `CC SAFE` / 11 `NOT FOR CC` authored examples.
- Stage 6 adds exactly **38 `CC SAFE` / 22 `NOT FOR CC`** reviews. Only the 38 safe rows create authority.
- A reviewed grammar with no safe row stops before legacy fallback. Thus unsafe examples, including all three new `en-if-request` examples, cannot regain CC authority indirectly.
- Every safe row stores one literal answer occurrence and exact offset. Accepted-answer normalization and grading policy are unchanged.
- Expressions remain non-authoritative.

Remaining CC risk is bounded to legacy fallback for grammar never placed under explicit review. It is not a Stage 6 regression, but the active broad `en-would-like` model deserves the one pre-production review identified below.

### Whole-course CC distribution

| Language | Zero CC lessons | One CC lesson | Multiple CC lessons |
|---|---:|---:|---:|
| English | 0 | 4 | 34 |
| Japanese | 1 | 4 | 33 |
| **Total** | **1** | **8** | **67** |

Post-Stage-5 was 1 zero / 7 one / 64 multiple across 72 lessons. The final zero-CC lesson remains exactly `ja-s3-l8`. It has nine assessable items, five required items, and 26 safe opportunities; zero CC alone is not a defect.

### Practice-density distribution

| Language/measure | Min | Median | Mean | Max |
|---|---:|---:|---:|---:|
| EN assessable items | 10 | 11 | 10.82 | 11 |
| EN `required_items` | 5 | 5 | 5.00 | 5 |
| EN safe opportunities | 29 | 33 | 32.03 | 33 |
| JA assessable items | 9 | 11 | 10.71 | 12 |
| JA `required_items` | 5 | 5 | 5.00 | 5 |
| JA safe opportunities | 26 | 33 | 31.95 | 35 |

Bottom five lessons per language:

| Language | Lesson | Assessable / required / CC / opportunities | Judgment |
|---|---|---:|---|
| EN | `en-s2-l5` | 10/5/2/29 | HEALTHY |
| EN | `en-s3-l6` | 10/5/1/29 | HEALTHY |
| EN | `en-s3-l7` | 10/5/2/29 | HEALTHY |
| EN | `en-s6-l3` | 10/5/1/29 | HEALTHY — approved pragmatic lesson; no filler |
| EN | `en-s1-l1` | 10/5/2/30 | HEALTHY |
| JA | `ja-s3-l8` | 9/5/0/26 | WATCH — safe completion, lowest mode diversity |
| JA | `ja-s2-l2` | 9/5/3/27 | HEALTHY |
| JA | `ja-s4-l6` | 9/5/1/27 | HEALTHY |
| JA | `ja-s3-l5` | 10/5/1/29 | HEALTHY |
| JA | `ja-s3-l7` | 10/5/1/29 | HEALTHY |

No lesson needs remediation merely to normalize counts.

## 13. Stage 6 capstone acceptance

| Capability | English | Japanese | Evidence |
|---|---|---|---|
| Synthesis | STRONG | STRONG | explicit multi-source synthesis/reporting lessons |
| Transfer | STRONG | STRONG | 61 sourced REVIEW links plus changed-demand prompts/assets |
| Qualified judgment | STRONG | STRONG | criteria, bounded conclusions, inference/possibility distinctions |
| Evidence use | STRONG | STRONG | evidence selection, source comparison, reporting, limitations |
| Counterfactual/conditional reasoning | STRONG | ADEQUATE | EN has mixed/second/third conditionals; JA uses conditional decision and limitation but less explicit past counterfactual depth |
| Accountability | STRONG | STRONG | dedicated accountability dialogues and responsibility language |
| Formal commitment | STRONG | STRONG | pressure-free EN commitment; considerate/formal JA commitment |
| Reflection | STRONG | STRONG | both terminals compare intended and actual outcomes |
| Next-action planning | STRONG | STRONG | both terminals require an evidence-linked concrete next action |

Stage 6 is accepted as a capstone. Its six lessons cover synthesis, judgment, reporting, accountability, commitment, and reflection without becoming a dump of unrelated advanced forms.

### Terminal quality

| Terminal | Role mix | Decision | Reason |
|---|---:|---|---|
| EN `en-s6-l4` | 1 NEW / 7 REVIEW / 6 SUPPORT | **STRONG CAPSTONE** | little new material; evidence, result, consequence, owned responsibility, justified next action |
| JA `ja-s6-l3` | 3 NEW / 7 REVIEW / 5 SUPPORT | **STRONG CAPSTONE** | bounded new load; evidence, responsibility, justification limits, and concrete next action |

## 14. Grandfathering and path quality

Overall result: **ADEQUATE, deterministic, with a maintainability watch**.

- **Scope specificity:** the `prior-curriculum-completion-v1` payload lists exact prior lesson IDs per language and names `curriculum-stage5-expansion-02-v1`. The completion test requires every listed prior lesson.
- **Zero-write behavior:** grandfathering is derived from preserved progress rows at read time. It writes no synthetic completions and does not rewrite learner history.
- **Out-of-order evidence:** active old EN/JA Stage 6 lessons remain the continuation target; either old JA `l3` or `l4` completion is preserved; the first reachable new lesson is selected deterministically; all-old-course completion remains complete.
- **Reorder handling:** the current JA chain is unambiguous and ends at `ja-s6-l3`; the old reverse relationship is not retained as a branch.
- **Maintainability risk:** runtime logic keys on the policy string and exact prior-ID set but does not validate `previous_bundle_id` or an expiry/cutoff. The current graph normally prevents a new learner from manufacturing an old-course completion bypass, but future bundles must not copy this grandfathering payload indefinitely. Production should treat it as a versioned transition rule and explicitly replace or retire it on the next curriculum transition.

## 15. Remaining content-quality debt

### Priority ledger

| Priority | Current debt | Count/scope | Production interpretation |
|---|---|---:|---|
| P0 BLOCKER | confirmed unsafe or missing curriculum authority | **0** | none |
| P1 BEFORE PRODUCTION | `en-would-like` broad combined form/recall model remains active in `en-s1-l2` | **1 record** | review/narrow or explicitly bound its assessment modes before launch |
| P2 NICE TO IMPROVE | one-example guided vocabulary | 70 EN / 66 JA | add high-value second examples; not a practice blocker |
| P2 NICE TO IMPROVE | guided grammar under four examples | 8 EN / 14 JA | all have one example; prioritize active/frequent forms |
| P2 NICE TO IMPROVE | contextless guided expressions | 39 EN / 38 JA | prioritize reused/high-register expressions |
| P2 NICE TO IMPROVE | duplicated grammar semantic fields | 40/58 EN; 45/64 JA | learner-facing explanation depth, not invalid form evidence |
| P2 NICE TO IMPROVE | active Audit 02 review-only candidates other than `en-would-like` | 2 EN / 8 JA | candidates, not confirmed defects |
| P3 BACKLOG | unlinked `en-relative-clause` candidate and broader library-wide import prose cleanup | open library work | no current guided/practice impact |

The final active Audit 02 set is 11 records: three EN and eight JA. `en-relative-clause` is now unlinked, so it is no longer active guided debt. No old candidate is promoted to a defect merely because it was previously listed.

### Previous candidate reclassification

| Candidate | Current evidence | Classification |
|---|---|---|
| `35e1c-en-past-questions-negatives` | 2 links, 4 examples, no CC; comparison model remains readable | BACKLOG |
| `35e1c-en-some-any` | 1 link, 4 examples, no CC | BACKLOG |
| `en-would-like` | Stage 1 link, 9 examples, broad like/love/prefer recall authority and legacy completion fallback | **BEFORE PRODUCTION** |
| `en-relative-clause` | unlinked; 1 example; no current guided effect | NO ACTION |
| `35e1c-ja-obligation-contrast` | 2 links, 4 examples, no CC | BACKLOG |
| `35e1c-ja-kara-node-contrast` | 2 links, 4 examples, no CC | BACKLOG |
| `35e1c-ja-te-sequence` | 1 link, 4 examples, no CC | BACKLOG |
| `35e1c-ja-explanatory-nodesu` | 2 links, 4 examples, no CC; bounded narrow models also exist | BACKLOG |
| `ja-ba-condition` | 2 links, 1 example, legacy CC available | BACKLOG — prioritize within P2 example work |
| `ja-kamoshirenai` | Stage 6 link, 8 examples, bounded `〜かもしれない`, explicitly approved; terminology only | BACKLOG |
| `ja-te-iru` | 5 links, 8 examples, safe current authority; terminology only | BACKLOG |
| `ja-tsumori` | 2 links, 8 examples, safe current authority; terminology only | BACKLOG |

There are no candidate-level BLOCKER classifications.

## 16. Course coherence

| Dimension | English | Japanese | Evidence |
|---|---|---|---|
| Foundation | STRONG | STRONG | coherent roots; dense Stage 1–2 path; no bypass |
| Intermediate expansion | STRONG | STRONG | Expansion 01 normalized Stage 2–4 density and mandatory reach |
| Late-stage progression | STRONG | ADEQUATE | both sustain L4–6 grammar and L4–5 vocabulary; JA breadth remains below planning floor |
| Review | STRONG | STRONG | Stage 5/6 REVIEW shares consistently about 33–35% |
| Communicative transfer | STRONG | STRONG | contexts plus dialogues, scenarios, and changed-demand prompts |
| Capstone | STRONG | STRONG | evidence/accountability/reflection terminals |
| Practice | STRONG | STRONG | minima 29 EN / 26 JA; all require five items |
| Editorial support | ADEQUATE | ADEQUATE | large debt reduction, but examples/context/duplicate prose remain |

English and Japanese are not identical. English has 11 more unique assessable items (262 vs 251), stronger explicit counterfactual breadth, and four guided L6 vocabulary items. Japanese has greater formal-register burden, more unique linked grammar (64 vs 58), two tightly bounded formal L6 vocabulary items, and more low-example/duplicated grammar debt. Contextless expression debt is nearly even (39 vs 38).

## 17. Project-defined moderate-course criteria

These are internal planning criteria, not external proficiency claims.

| Criterion | English | Japanese | Evidence |
|---|---|---|---|
| Roughly 10–12 authored-hour scale | MET | MET | 9.9 hours, which rounds to the lower bound; 19.8–29.7 estimated learner hours |
| Approximately 260–300 unique assessable items | MET | **PARTIALLY MET** | 262 EN; 251 JA |
| Meaningful L4/L5 progression | MET | MET | 35/18 whole-course EN and 22/14 JA unique L4/L5 vocabulary; strong late grammar |
| Deliberate 25–35% late REVIEW | MET | MET | S5/S6 language shares 33.3–35.0% |
| Strong practice density | MET | MET | healthy distributions; one non-defective JA watch point |
| Coherent late communicative outcomes | MET | MET | synthesis, evidence, accountability, commitment, reflection |
| Improved examples/context | MET | MET | debt reduced; every S6 grammar 4+ examples and every S6 expression strict-contextualized |
| Intact prerequisite path | MET | MET | one 38-lesson acyclic path per language |

## 18. Final classifications

- **English: MODERATE GUIDED COURSE.** It reaches 262 unique assessable items, the lower end of the 10-hour planning scale, coherent L4–6 late progression, deliberate review, strong practice, and a strong evidence/accountability capstone. Remaining editorial debt does not negate the course structure.
- **Japanese: APPROACHING MODERATE.** It now has the same coherent 9.9-hour path, strong practice, deliberate review, formal/register depth, and a strong capstone, but 251 assessable items remain below the approximate 260 floor and its active grammar editorial debt is larger. Lesson count alone does not justify upgrading the label.

No CEFR or JLPT equivalence is asserted.

## 19. Is more curriculum needed?

**NO.** Another lesson expansion is not justified before production.

The previous structural reasons for expansion have been resolved: Stage 6 is 90 minutes rather than 60, contains six coherent outcomes, carries about one-third REVIEW, fully contextualizes its expression set, adds L4–6 progression, and ends in strong capstones. Remaining weaknesses are record-level examples, context, terminology, and assessment-model precision. More lessons would add maintenance, prerequisite, and editorial surface area while delivering less value than fixing those bounded issues.

## 20. Bounded pre-production content gate

Maximum scope is intentionally kept below ten tasks.

| Priority | Scope | Why it matters | Blocking? |
|---|---|---|---|
| P1 | Human review of `en-would-like`: split/narrow the combined like/love/prefer authority or explicitly restrict unsafe modes | active Stage 1 exact-recall model is broader than one defensible target | **Yes for content sign-off; not a curriculum blocker** |
| P2 | Add second examples to the highest-frequency subset of the 70 EN / 66 JA one-example guided vocabulary records | improves transfer and editorial confidence | No |
| P2 | Add examples to the 8 EN / 14 JA guided grammar records below four examples, starting with `ja-ba-condition` | reduces single-example dependence | No |
| P2 | Add strict context to a bounded high-reuse subset of the 39 EN / 38 JA contextless expressions | improves pragmatic use without adding lessons | No |
| P2 | Human-review the six active multi-system candidates with no CC (`past-questions`, `some-any`, obligation, kara/node, te-sequence, explanatory ndesu) | confirms that selection/recall wording remains defensible | No |
| P2 | Replace duplicated learner-facing grammar prose first on guided high-frequency records | fixes explanation depth, not curriculum breadth | No |
| P3 | Normalize remaining Japanese English-metalanguage terms, including the safe `ja-kamoshirenai` formula wording | terminology polish only | No |
| P3 | Retain `en-relative-clause` as unlinked backlog until a concrete use case exists | avoids speculative content work | No |

No task above proposes another lesson.

## 21. Production-readiness handoff invariants

Production must preserve all of the following:

- exact release identity: `curriculum-stage6-expansion-03-v1` / `CURRICULUM-STAGE6-EXPANSION-03` / `2026-09-stage6-expansion-03-v1`;
- exactly 76 published lessons, 74 prerequisite edges, two roots, all lessons reachable, no cycles/cross-language edges/bypasses;
- terminals `en-s6-l4` and `ja-s6-l3`;
- raw/runtime semantics: 1,130 raw, 1,126 active, with only the four Stage 1 archived greeting links filtered;
- archived relationship preservation without restoring retired grammar to practice;
- Stage 6 66/61/50 NEW/REVIEW/SUPPORT roles as instructional metadata only;
- Hotfix 02 overview exclusion and Hotfix 03 bounded Japanese models;
- 38 Stage 6 `CC SAFE` authority rows, 22 `NOT FOR CC` review rows, no unsafe fallback, sentence-local offsets, no accepted-answer broadening, and no expression authority;
- exact canonical identities and SRS continuity: content type + canonical content ID remain stable; examples and roles do not create new SRS identity;
- `prior-curriculum-completion-v1` zero-write behavior, preserved historical evidence, deterministic out-of-order handling, and explicit retirement/replacement in any future bundle;
- GET paths for lesson, recommendation, practice, dashboard, and progress remain zero-write;
- canonical totals: 10,000 EN vocabulary, 8,235 JA vocabulary; 83/98 historical and 82/97 published EN/JA grammar; 348/365 published EN/JA expressions;
- exact stage ordering, especially `ja-s6-03-reporting → ja-s6-04-accountability → ja-s6-l4 → ja-s6-l3`;
- no learner-progress, attempt, review, settings, or historical-bundle rewrite during release activation.

Subject to the one bounded P1 content review, the curriculum evidence is ready for a separately authorized production process. This audit performs no deployment work.

## Validation

Focused source-derived integrity checks passed for bundle identity, graph, relationship semantics, guided/assessable counts, examples, contexts, CC policy, role distribution, practice density, and grandfathering fixtures. Final workspace checks are recorded in the task handoff after document creation.
