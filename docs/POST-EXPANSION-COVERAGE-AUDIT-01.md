# EJ Learning — Post-Expansion Coverage Audit 01

**Audit date:** 2026-09-15
**Scope:** read-only impact audit after Curriculum Expansion 01
**Audited revision:** `415ed275ef19426bf8d9b42e2621f4e66d8dce23` on `main`
**Current guided-course bundle:** `curriculum-expansion-01a-v1`

## Executive conclusion

Curriculum Expansion 01 achieved its bounded goal. All 16 Stage 2–4 supplemental lessons moved to the unchanged historical `NORMAL` density threshold: the distribution changed from 48 `NORMAL`, 1 `SPARSE`, and 15 `VERY SPARSE` to 64 `NORMAL`, 0 `SPARSE`, and 0 `VERY SPARSE`. Stage 2–4 link, assessable-item, expression, and practice-opportunity variance all fell sharply. The six prerequisite replacements also changed the effective required path from 24 lessons / 360 authored minutes to all 32 lessons / 504 authored minutes per language.

The 105 added relationships do not equal 105 newly guided items. English gained 45 unique guided records (21 vocabulary, 4 grammar, 20 expressions), and Japanese gained 47 (22 vocabulary, 4 grammar, 21 expressions). Explicit instructional intent is now visible in the 232 target relationships: 158 `NEW`, 31 `REVIEW`, and 43 `SUPPORT`. This is a material improvement in auditable design, but reinforcement remains introduction-heavy: only four expression relationships are explicitly `REVIEW`, and no expression appears in three or more lessons.

Both courses are best classified as **stronger light introductory courses**, not moderate guided courses. Each still has only 32 lessons and 8.4 authored hours. Stage 5 and Stage 6 together contain only eight lessons / two authored hours per language; they use one English and two Japanese internal level-5 vocabulary items and no level-6 vocabulary. External CEFR/JLPT evidence boundaries are unchanged.

The next curriculum task should be a **bounded, human-reviewed Stage 5–6 progression design audit**, not an automatic Expansion 02 implementation. It should define late-stage outcomes, identify which unlinked foundational grammar belongs earlier, select genuinely later-level vocabulary, and budget the required example/context review before any lesson or prerequisite change is authorized.

## 1. Baseline, method, and safety

Pre-flight passed:

- branch: `main`
- `HEAD`: `415ed275ef19426bf8d9b42e2621f4e66d8dce23`
- `origin/main`: `415ed275ef19426bf8d9b42e2621f4e66d8dce23`
- tracked worktree at audit start: clean

The immutable `phase-35e1c-v2` payload is the pre-expansion baseline; `curriculum-expansion-01a-v1` is the current bundle. Canonical metadata was read from the existing local Phase 3.5E.2 content snapshot. No local or remote D1 command was run.

Definitions remain those of Curriculum Coverage Audit 01:

- **Raw bundle links** include immutable historical relationships: 853 before, 958 after.
- **Runtime active links** exclude five archived `en-greeting` / `ja-greeting` grammar relationships: 848 before, 953 after. The five-link difference is expected history, not corruption.
- **Published linked grammar** includes the two readable Japanese comparison/system overviews.
- **Assessable grammar** follows Content Quality Hotfix 02 and excludes `35e1c-ja-condition-contrast` and `35e1c-ja-workplace-register` as well as archived greetings.
- **Assessable items** are unique vocabulary plus practice-eligible grammar. Expressions are instructional content but not authoritative Phase 4E assessment items.
- **Safe opportunities** use three deterministic vocabulary modes, two grammar modes, and one additional opportunity for each practice-eligible grammar item with an authored controlled-completion occurrence.
- Density thresholds are unchanged: `VERY SPARSE` at 8 or fewer active links, `SPARSE` at 9–11, and `NORMAL` at 12 or more.

Curriculum Coverage Audit 01 predated Hotfix 02 and counted the two Japanese overviews as assessable. Where assessment figures are compared statistically, this audit recalculates the pre-expansion bundle under the current policy. The original historical figures are preserved where relevant rather than silently rewritten.

## 2. Expansion 01 delta and global coverage

### Current published inventory

| Content | English | Japanese | Total |
|---|---:|---:|---:|
| Published vocabulary | 10,000 | 8,235 | 18,235 |
| Published grammar | 82 | 97 | 179 |
| Published expressions | 348 | 365 | 713 |
| Published lessons | 32 | 32 | 64 |

These canonical and lesson totals are unchanged from Audit 01; Expansion 01 changed bundle relationships and prerequisites, not the libraries or lesson inventory.

### Relationship growth versus unique growth

| Language | Type | Added links | Unique before | Unique after | Actual unique gain |
|---|---|---:|---:|---:|---:|
| English | Vocabulary | 22 | 156 | 177 | **21** |
| English | Grammar | 6 | 50 | 54 | **4** |
| English | Expressions | 23 | 104 | 124 | **20** |
| Japanese | Vocabulary | 24 | 145 | 167 | **22** |
| Japanese | Grammar | 7 | 50 | 54 | **4** |
| Japanese | Expressions | 23 | 99 | 120 | **21** |

The current guided footprint is 355 unique records in English and 341 in Japanese. English has 231 unique assessable items (177 vocabulary + 54 grammar). Japanese has 219 (167 vocabulary + 52 practice-eligible grammar); its other two linked grammar records are non-assessed overviews.

### Reference-library coverage

| Language | Type | Published | Before linked / coverage | After linked / coverage | Still unlinked |
|---|---|---:|---:|---:|---:|
| English | Vocabulary | 10,000 | 156 / 1.6% | 177 / **1.8%** | 9,823 |
| English | Grammar | 82 | 50 / 61.0% | 54 / **65.9%** | 28 |
| English | Expressions | 348 | 104 / 29.9% | 124 / **35.6%** | 224 |
| Japanese | Vocabulary | 8,235 | 145 / 1.8% | 167 / **2.0%** | 8,068 |
| Japanese | Grammar | 97 | 50 / 51.5% | 54 / **55.7%** | 43 |
| Japanese | Expressions | 365 | 99 / 27.1% | 120 / **32.9%** | 245 |

Vocabulary coverage remains a very small guided subset of the reference libraries. Expression coverage made the largest percentage-point gain; grammar coverage improved modestly.

## 3. Density before and after

| Classification | Before | After | Change |
|---|---:|---:|---:|
| `NORMAL` (12+) | 48 | **64** | +16 |
| `SPARSE` (9–11) | 1 | **0** | -1 |
| `VERY SPARSE` (≤8) | 15 | **0** | -15 |

All 16 targeted lessons normalized. `en-s3-l8` moved from `SPARSE` to `NORMAL`; the other 15 moved from `VERY SPARSE` to `NORMAL`. No lesson remains below the historical `NORMAL` threshold.

## 4. The 16 target lessons

`Roles` shows count and share within the lesson as `NEW / REVIEW / SUPPORT`. `CC` is the count of practice-eligible linked grammar items with controlled-completion support.

| Lesson | V/G/E | Links / assessable / required / opportunities | CC | Roles: NEW / REVIEW / SUPPORT | Current prerequisite | Density transition |
|---|---:|---:|---:|---|---|---|
| `en-s2-l5` | 7/3/4 | 14 / 10 / 5 / 29 | 2 | 7 (50.0%) / 4 (28.6%) / 3 (21.4%) | `en-s2-l4` | VERY SPARSE → NORMAL |
| `en-s3-l5` | 8/3/4 | 15 / 11 / 5 / 32 | 2 | 11 (73.3%) / 1 (6.7%) / 3 (20.0%) | `en-s3-l4` | VERY SPARSE → NORMAL |
| `en-s3-l6` | 8/2/4 | 14 / 10 / 5 / 29 | 1 | 11 (78.6%) / 0 (0.0%) / 3 (21.4%) | `en-s3-l5` | VERY SPARSE → NORMAL |
| `en-s3-l7` | 7/3/4 | 14 / 10 / 5 / 29 | 2 | 10 (71.4%) / 1 (7.1%) / 3 (21.4%) | `en-s3-l6` | VERY SPARSE → NORMAL |
| `en-s3-l8` | 8/2/4 | 14 / 10 / 5 / 30 | 2 | 8 (57.1%) / 2 (14.3%) / 4 (28.6%) | `en-s3-l7` | SPARSE → NORMAL |
| `en-s3-l9` | 8/3/4 | 15 / 11 / 5 / 31 | 1 | 10 (66.7%) / 4 (26.7%) / 1 (6.7%) | `en-s3-l8` | VERY SPARSE → NORMAL |
| `en-s4-l5` | 8/3/3 | 14 / 11 / 5 / 31 | 1 | 10 (71.4%) / 1 (7.1%) / 3 (21.4%) | `en-s4-l4` | VERY SPARSE → NORMAL |
| `en-s4-l6` | 8/3/4 | 15 / 11 / 5 / 32 | 2 | 10 (66.7%) / 3 (20.0%) / 2 (13.3%) | `en-s4-l5` | VERY SPARSE → NORMAL |
| `ja-s2-l5` | 7/3/3 | 13 / 10 / 5 / 30 | 3 | 8 (61.5%) / 3 (23.1%) / 2 (15.4%) | `ja-s2-l4` | VERY SPARSE → NORMAL |
| `ja-s2-l6` | 8/3/4 | 15 / 11 / 5 / 33 | 3 | 11 (73.3%) / 2 (13.3%) / 2 (13.3%) | `ja-s2-l5` | VERY SPARSE → NORMAL |
| `ja-s3-l5` | 8/3/4 | 15 / 10 / 5 / 29 | 1 | 9 (60.0%) / 2 (13.3%) / 4 (26.7%) | `ja-s3-l4` | VERY SPARSE → NORMAL |
| `ja-s3-l6` | 8/3/4 | 15 / 11 / 5 / 32 | 2 | 11 (73.3%) / 1 (6.7%) / 3 (20.0%) | `ja-s3-l5` | VERY SPARSE → NORMAL |
| `ja-s3-l7` | 8/3/4 | 15 / 10 / 5 / 29 | 1 | 10 (66.7%) / 2 (13.3%) / 3 (20.0%) | `ja-s3-l6` | VERY SPARSE → NORMAL |
| `ja-s3-l8` | 8/2/4 | 14 / 9 / 5 / 26 | 0 | 12 (85.7%) / 0 (0.0%) / 2 (14.3%) | `ja-s3-l7` | VERY SPARSE → NORMAL |
| `ja-s4-l5` | 8/3/4 | 15 / 11 / 5 / 31 | 1 | 10 (66.7%) / 2 (13.3%) / 3 (20.0%) | `ja-s4-l4` | VERY SPARSE → NORMAL |
| `ja-s4-l6` | 8/3/4 | 15 / 9 / 5 / 27 | 1 | 10 (66.7%) / 3 (20.0%) / 2 (13.3%) | `ja-s4-l5` | VERY SPARSE → NORMAL |

`ja-s3-l8` and `ja-s4-l6` have nine assessable items because readable overview grammar is intentionally excluded. Both still have 5 required items and 26–27 deterministic opportunities. Only `ja-s3-l8` remains the relative practice-diversity low point because it also has zero controlled-completion-capable grammar; the nine-item count alone is not the reason.

## 5. Current stage tables and pre-expansion comparison

### English Stage 1–6 after Expansion 01

| Stage | Lessons | Unique vocab | Unique grammar | Unique expressions | Assessable items | Raw active links | Authored minutes |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 4 | 27 | 7 | 17 | 34 | 59 | 60 |
| 2 | 5 | 32 | 13 | 18 | 45 | 74 | 78 |
| 3 | 9 | 68 | 18 | 35 | 86 | 132 | 150 |
| 4 | 6 | 48 | 14 | 24 | 62 | 90 | 96 |
| 5 | 4 | 29 | 11 | 17 | 40 | 61 | 60 |
| 6 | 4 | 31 | 12 | 17 | 43 | 61 | 60 |

### Japanese Stage 1–6 after Expansion 01

| Stage | Lessons | Unique vocab | Unique grammar | Unique expressions | Assessable items | Raw active links | Authored minutes |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 4 | 27 | 7 | 16 | 34 | 58 | 60 |
| 2 | 6 | 41 | 14 | 22 | 55 | 86 | 96 |
| 3 | 8 | 62 | 18 | 32 | 78 | 119 | 132 |
| 4 | 6 | 45 | 15 | 24 | 58 | 91 | 96 |
| 5 | 4 | 30 | 11 | 17 | 41 | 61 | 60 |
| 6 | 4 | 29 | 12 | 17 | 41 | 61 | 60 |

Japanese Stage 3 has 16 practice-eligible grammar records among 18 linked; Stage 4 has 13 among 15. The two-record difference in each stage is the same pair of overviews, reused across lessons.

### Change in targeted stages

| Language / stage | Unique V | Unique G | Unique E | Assessable items | Active links |
|---|---:|---:|---:|---:|---:|
| EN S2 | 30 → 32 | 12 → 13 | 17 → 18 | 42 → 45 | 67 → 74 |
| EN S3 | 55 → 68 | 15 → 18 | 21 → 35 | 70 → 86 | 101 → 132 |
| EN S4 | 42 → 48 | 13 → 14 | 19 → 24 | 55 → 62 | 77 → 90 |
| JA S2 | 36 → 41 | 12 → 14 | 18 → 22 | 48 → 55 | 73 → 86 |
| JA S3 | 50 → 62 | 17 → 18 | 20 → 32 | 65 → 78 | 92 → 119 |
| JA S4 | 39 → 45 | 14 → 15 | 18 → 24 | 51 → 58 | 77 → 91 |

The Japanese before-assessable values above are the policy-adjusted comparable baseline. Audit 01 historically reported 67 for Stage 3 and 53 for Stage 4 because Hotfix 02 had not yet excluded the two overviews. Lesson counts and authored minutes did not change; Stages 1, 5, and 6 are composition-identical before and after.

## 6. Stage 2–4 consistency

Cells are `min–max (average; coefficient of variation)` across lessons in that language-stage. Lower range and CV mean greater within-stage consistency.

### English

| Stage | Measure | Before | After |
|---|---|---|---|
| S2 | Active links | 7–15 (13.4; .239) | **14–15 (14.8; .027)** |
| S2 | Assessable items | 6–11 (10.0; .200) | **10–11 (10.8; .037)** |
| S2 | Expressions | 1–4 (3.4; .353) | **4–4 (4.0; .000)** |
| S2 | Opportunities | 17–33 (29.8; .215) | **29–33 (32.2; .050)** |
| S3 | Active links | 8–15 (11.2; .302) | **14–15 (14.7; .032)** |
| S3 | Assessable items | 7–11 (8.9; .215) | **10–11 (10.7; .044)** |
| S3 | Expressions | 1–4 (2.3; .639) | **4–4 (4.0; .000)** |
| S3 | Opportunities | 19–33 (26.1; .241) | **29–33 (31.4; .052)** |
| S4 | Active links | 8–16 (12.8; .268) | **14–16 (15.0; .038)** |
| S4 | Assessable items | 7–11 (9.7; .195) | **11–11 (11.0; .000)** |
| S4 | Expressions | 1–5 (3.2; .497) | **3–5 (4.0; .144)** |
| S4 | Opportunities | 19–33 (28.5; .224) | **31–33 (32.5; .024)** |

### Japanese

| Stage | Measure | Before | After |
|---|---|---|---|
| S2 | Active links | 7–15 (12.2; .278) | **13–15 (14.3; .066)** |
| S2 | Assessable items | 6–11 (9.2; .222) | **9–11 (10.5; .073)** |
| S2 | Expressions | 1–4 (3.0; .471) | **3–4 (3.8; .097)** |
| S2 | Opportunities | 18–33 (27.5; .222) | **27–33 (31.5; .073)** |
| S3 | Active links | 8–15 (11.5; .304) | **14–15 (14.9; .022)** |
| S3 | Assessable items | 6–11 (8.6; .278) | **9–11 (10.5; .067)** |
| S3 | Expressions | 1–4 (2.5; .600) | **4–4 (4.0; .000)** |
| S3 | Opportunities | 17–33 (25.4; .303) | **26–33 (31.0; .081)** |
| S4 | Active links | 8–16 (12.8; .268) | **15–16 (15.2; .025)** |
| S4 | Assessable items | 5–12 (9.5; .270) | **9–12 (10.8; .083)** |
| S4 | Expressions | 1–4 (3.0; .471) | **4–4 (4.0; .000)** |
| S4 | Opportunities | 15–35 (28.0; .282) | **27–35 (32.0; .079)** |

Every requested consistency measure improved. The remaining Japanese opportunity ranges are explained by assessment-safe overview exclusions and CC availability, not renewed density sparsity.

## 7. Mandatory path and prerequisite validation

The current graph has 64 lessons and 62 edges: 32 lessons / 31 edges per language, one root (`en-s1-l1` or `ja-s1-l1`) per language, full connectivity, no cycles, no missing prerequisite, and no cross-language edge.

### Required-path impact

| Language | Required lessons before → after | Required minutes by stage before | Required minutes by stage after | Total authored required path | Approx. learner time at 2–3× |
|---|---:|---|---|---:|---:|
| English | 24 → **32** | 60 / 60 / 60 / 60 / 60 / 60 | 60 / 78 / 150 / 96 / 60 / 60 | 360 → **504 min** | 12–18 h → **16.8–25.2 h** |
| Japanese | 24 → **32** | 60 / 60 / 60 / 60 / 60 / 60 | 60 / 96 / 132 / 96 / 60 / 60 | 360 → **504 min** | 12–18 h → **16.8–25.2 h** |

The authored catalog did not gain minutes, but the required chain gained eight lessons and 144 authored minutes per language: +33.3% lessons and +40% authored required-path time. At the transparent 2.5× midpoint, the effective planning estimate rose from 15 to 21 learner hours, a six-hour increase.

### Actual required Stage 2–4 sequences

- English: `en-s2-l1` → `en-s2-l2` → `en-s2-l3` → `en-s2-l4` → `en-s2-l5` → `en-s3-l1` → `en-s3-l2` → `en-s3-l3` → `en-s3-l4` → `en-s3-l5` → `en-s3-l6` → `en-s3-l7` → `en-s3-l8` → `en-s3-l9` → `en-s4-l1` → `en-s4-l2` → `en-s4-l3` → `en-s4-l4` → `en-s4-l5` → `en-s4-l6`.
- Japanese: `ja-s2-l1` → `ja-s2-l2` → `ja-s2-l3` → `ja-s2-l4` → `ja-s2-l5` → `ja-s2-l6` → `ja-s3-l1` → `ja-s3-l2` → `ja-s3-l3` → `ja-s3-l4` → `ja-s3-l5` → `ja-s3-l6` → `ja-s3-l7` → `ja-s3-l8` → `ja-s4-l1` → `ja-s4-l2` → `ja-s4-l3` → `ja-s4-l4` → `ja-s4-l5` → `ja-s4-l6`.

The graph still represents authored sequencing metadata; whether the product enforces every edge as a hard lock is a separate runtime/product-semantic question. The curriculum no longer contains the six stage-transition bypasses.

## 8. Instructional-role audit

Across the 232 target relationships, role totals exactly match the approved matrix: `NEW` 158 (68.1%), `REVIEW` 31 (13.4%), and `SUPPORT` 43 (18.5%). English contributes 77 / 16 / 22 across 115 links; Japanese contributes 81 / 15 / 21 across 117.

### Roles by target stage

| Language / stage | Target links | NEW | REVIEW | SUPPORT |
|---|---:|---:|---:|---:|
| EN S2 | 14 | 7 (50.0%) | 4 (28.6%) | 3 (21.4%) |
| EN S3 | 72 | 50 (69.4%) | 8 (11.1%) | 14 (19.4%) |
| EN S4 | 29 | 20 (69.0%) | 4 (13.8%) | 5 (17.2%) |
| JA S2 | 28 | 19 (67.9%) | 5 (17.9%) | 4 (14.3%) |
| JA S3 | 59 | 42 (71.2%) | 5 (8.5%) | 12 (20.3%) |
| JA S4 | 30 | 20 (66.7%) | 5 (16.7%) | 5 (16.7%) |

`en-s3-l6` and `ja-s3-l8` have no explicit `REVIEW` relationship. Review share is also below 10% in `en-s3-l5`, `en-s3-l7`, `en-s4-l5`, and `ja-s3-l6`. Support is highest in `en-s3-l8` (28.6%) and `ja-s3-l5` (26.7%). These are planning signals, not findings that the lesson design is automatically wrong; topic-specific scaffolding may justify the distributions.

## 9. Repetition and reinforcement

| Language | Type | Raw / unique before | Raw / unique after | Repeated links before → after | IDs in 2+ lessons before → after | Explicit REVIEW links after |
|---|---|---:|---:|---:|---:|---:|
| EN | Vocabulary | 232 / 156 | 254 / 177 | 76 → 77 | 45 → 46 | 4 |
| EN | Grammar | 86 / 50 | 92 / 54 | 36 → 38 | 18 → 20 | 9 |
| EN | Expressions | 108 / 104 | 131 / 124 | 4 → 7 | 4 → 7 | 3 |
| JA | Vocabulary | 229 / 145 | 253 / 167 | 84 → 86 | 48 → 50 | 3 |
| JA | Grammar | 87 / 50 | 94 / 54 | 37 → 40 | 23 → 24 | 11 |
| JA | Expressions | 106 / 99 | 129 / 120 | 7 → 9 | 7 → 9 | 1 |

Expression contextualization also improved:

| Language | Contextualized unique expressions before | After | Share before → after |
|---|---:|---:|---:|
| English | 55 / 104 | 71 / 124 | 52.9% → **57.3%** |
| Japanese | 51 / 99 | 68 / 120 | 51.5% → **56.7%** |

Expansion 01 materially improved deliberate reinforcement **within its bounded target set** by adding an explicit role model and increasing repeated expression relationships. It did not yet establish broad spaced expression review: only four of 260 current expression links are explicitly `REVIEW`, expression repeated-link counts remain 7 EN / 9 JA, and no expression is used in three or more lessons. The overall design remains primarily new-content expansion rather than a course-wide review lattice.

## 10. Unique guided vocabulary and level progression

| Language | Internal level | Before | After | Gain |
|---|---:|---:|---:|---:|
| English | 1 | 36 | 36 | 0 |
| English | 2 | 55 | 61 | +6 |
| English | 3 | 44 | 56 | +12 |
| English | 4 | 20 | 23 | +3 |
| English | 5 | 1 | 1 | 0 |
| English | 6 | 0 | 0 | 0 |
| Japanese | 1 | 35 | 35 | 0 |
| Japanese | 2 | 54 | 62 | +8 |
| Japanese | 3 | 41 | 54 | +13 |
| Japanese | 4 | 13 | 14 | +1 |
| Japanese | 5 | 2 | 2 | 0 |
| Japanese | 6 | 0 | 0 | 0 |

Total unique guided vocabulary rose from 156 to 177 in English and 145 to 167 in Japanese. The gain is concentrated at internal levels 2–4 and therefore does what the project intended—improves Stage 2–4 density—but does not strengthen late-level coverage. English still uses only one level-5 item and no level-6 item; Japanese still uses two level-5 items and no level-6 item. Stage labels continue to overstate late vocabulary progression.

## 11. Grammar and expression coverage

### Grammar

| Language | Published | Linked before → after | Unlinked after | Coverage before → after | Assessable after | Linked non-assessed overviews |
|---|---:|---:|---:|---:|---:|---:|
| English | 82 | 50 → **54** | 28 | 61.0% → **65.9%** | 54 | 0 |
| Japanese | 97 | 50 → **54** | 43 | 51.5% → **55.7%** | 52 | 2 |

Expansion 01 integrates four additional unique grammar records per language. The two Japanese overviews remain useful readable content but are not form-selection, form-recall, controlled-completion, weakness, or SRS authority. They are not counted among the 52 assessable Japanese grammar records.

### Expressions

| Language | Unique before → after | Unique gain | Coverage before → after | Repeated links before → after | Explicit REVIEW links | Context share after |
|---|---:|---:|---:|---:|---:|---:|
| English | 104 → **124** | +20 | 29.9% → **35.6%** | 4 → 7 | 3 | 57.3% |
| Japanese | 99 → **120** | +21 | 27.1% → **32.9%** | 7 → 9 | 1 | 56.7% |

The expression gain is mainly breadth, with a modest reinforcement improvement. Contextualized share rises rather than being diluted, but nearly half the guided expression set still lacks a scenario/dialogue/context field under the strict historical test.

## 12. Practice readiness and controlled completion

### All 64 lessons after Expansion 01

| Language | Assessable min / median / average / max | Required min / median / average / max | Opportunities min / median / average / max |
|---|---|---|---|
| English | 10 / 11 / 10.81 / 12 | 5 / 5 / 5 / 5 | 29 / 33 / 32.13 / 35 |
| Japanese | 9 / 11 / 10.69 / 12 | 5 / 5 / 5 / 5 | 26 / 33 / 31.84 / 35 |

Audit 01 reported opportunity ranges/averages of 17–35 / 29.5 EN and 18–35 / 29.3 JA. The post-expansion minima and averages are substantially stronger even with the stricter current grammar policy. All lessons remain safely above the five-unique-item completion gate.

The three lessons at 27 or fewer opportunities are `ja-s2-l2` (9 assessable, 27 opportunities, 3 CC), `ja-s3-l8` (9, 26, 0 CC), and `ja-s4-l6` (9, 27, 1 CC). This comparison shows why nine assessable items alone is not a sufficient risk flag. `ja-s3-l8` is the only remaining relative low-diversity candidate because both its opportunity count and CC count are lowest; `ja-s4-l6` is completion-safe and has authored CC support.

### Controlled-completion-capable grammar by lesson

| Language | Audit 01: zero / one / multiple | After: zero / one / multiple |
|---|---:|---:|
| English | 2 / 5 / 25 | **0 / 3 / 29** |
| Japanese | 2 / 4 / 26 | **1 / 4 / 27** |
| Total | 4 / 9 / 51 | **1 / 7 / 56** |

Expansion 01 eliminated three of the four previously flagged zero-CC supplemental lessons: `en-s3-l9`, `en-s4-l5`, and `ja-s4-l5`. It intentionally did not manufacture support for `ja-s3-l8`, which remains the only zero-CC lesson. Historical Audit 01 counted controlled completion associated with the condition overview in three other Japanese lessons; under Hotfix 02 that overview is no longer authoritative, but Expansion 01 added separate eligible CC grammar so those lessons remain in the one-or-more categories legitimately.

## 13. Stage 5–6 audit

`Grammar` is published linked grammar, followed by practice-eligible count in parentheses. Opportunities are the sum across lessons, followed by per-lesson average.

| Language / stage | Lessons | Minutes | Unique V / avg level | Grammar / eligible / avg level | Expressions / avg difficulty | Unique assessable | Opportunities total / avg |
|---|---:|---:|---:|---:|---:|---:|---:|
| EN S3 | 9 | 150 | 68 / 2.46 | 18 / 18 / 2.28 | 35 / 2.77 | 86 | 283 / 31.4 |
| EN S4 | 6 | 96 | 48 / 2.54 | 14 / 14 / 2.71 | 24 / 3.25 | 62 | 195 / 32.5 |
| EN S5 | 4 | 60 | 29 / 2.55 | 11 / 11 / 3.18 | 17 / 4.00 | 40 | 132 / 33.0 |
| EN S6 | 4 | 60 | 31 / 2.42 | 12 / 12 / 3.67 | 17 / 3.53 | 43 | 131 / 32.8 |
| JA S3 | 8 | 132 | 62 / 2.40 | 18 / 16 / 2.89 | 32 / 2.84 | 78 | 248 / 31.0 |
| JA S4 | 6 | 96 | 45 / 2.36 | 15 / 13 / 3.27 | 24 / 3.42 | 58 | 192 / 32.0 |
| JA S5 | 4 | 60 | 30 / 2.47 | 11 / 11 / 3.27 | 17 / 3.94 | 41 | 132 / 33.0 |
| JA S6 | 4 | 60 | 29 / 2.72 | 12 / 12 / 3.92 | 17 / 3.94 | 41 | 132 / 33.0 |

Combined Stage 3–4 versus Stage 5–6:

| Language / stages | Lessons / minutes | Unique V / avg level | Grammar / eligible / avg level | Expressions / avg difficulty | Unique assessable | Opportunities total / avg |
|---|---:|---:|---:|---:|---:|---:|
| EN S3–4 | 15 / 246 | 112 / 2.52 | 26 / 26 / 2.54 | 59 / 2.97 | 138 | 478 / 31.9 |
| EN S5–6 | 8 / 120 | 55 / 2.47 | 23 / 23 / 3.43 | 34 / 3.76 | 78 | 263 / 32.9 |
| JA S3–4 | 14 / 228 | 100 / 2.41 | 25 / 23 / 3.12 | 56 / 3.09 | 123 | 440 / 31.4 |
| JA S5–6 | 8 / 120 | 50 / 2.50 | 23 / 23 / 3.61 | 33 / 3.91 | 73 | 264 / 33.0 |

Stage 5–6 lessons are individually dense and their grammar/expression metadata is generally harder. Their weakness is path breadth and vocabulary progression: only two authored hours, roughly half the unique vocabulary and expressions of Stages 3–4, English vocabulary difficulty falling at Stage 6, and essentially no internal level-5/6 vocabulary. After Stage 2–4 normalization, Stage 5–6 is now the clearest curriculum-structure bottleneck. That finding supports a design audit, not an automatic decision to add a predetermined number of lessons.

## 14. External-level evidence boundary

Expansion 01 did not add or review a comprehensive external alignment.

- **Japanese:** there is still no reviewed, comprehensive JLPT grammar/expression alignment. Community-estimated vocabulary bands cannot establish an N5→N1 course progression.
- **English:** there is still no reliable CEFR A1–C2 alignment. Internal levels 1–6 are not CEFR and must not be renamed as CEFR bands.

No new JLPT, CEFR, or other external mastery claim is supported.

## 15. Remaining editorial debt

This section counts the **current unique lesson-linked set**, not the entire library and not just the Expansion 01 additions.

| Current linked-content debt | English | Japanese | Interpretation |
|---|---:|---:|---|
| Vocabulary with exactly one example | 84 / 177 | 77 / 167 | No linked item has zero examples; second, lesson-specific examples remain review work |
| Grammar with identical title/core/purpose | 37 / 54 | 38 / 54 | Semantic-field differentiation debt |
| Grammar with identical when/mistakes/nuance | 35 / 54 | 39 / 54 | Explanation-depth debt |
| Grammar with fewer than four examples | 18 / 54 | 23 / 54 | All of these have exactly one example |
| Linked expressions without strict standalone context | 53 / 124 | 52 / 120 | Includes sentence-style records without scenario/dialogue/context |
| Legacy expressions without strict standalone context | 38 | 38 | Human contextual enrichment candidates |
| Linked Content Quality Audit 02 review-only candidates | 4 | 10 | Candidates, not confirmed defects |

The 43 one-example vocabulary candidates called out in the Expansion 01 matrix are a target-set subset; the whole current guided course contains 161 one-example vocabulary records. The linked Audit 02 review-only candidates are:

- English: `35e1c-en-past-questions-negatives`, `35e1c-en-some-any`, `en-would-like`, `en-relative-clause`.
- Japanese: `35e1c-ja-obligation-contrast`, `35e1c-ja-kara-node-contrast`, `35e1c-ja-te-sequence`, `35e1c-ja-explanatory-nodesu`, `ja-ba-condition`, `ja-kamoshirenai`, `ja-node`, `ja-te-iru`, `ja-tsumori`, `ja-n-desu-ga`.

The Stage 2–4 **curriculum-density debt** is resolved under the established threshold. The **canonical content-quality debt** is not: examples, semantic differentiation, context, and review-only grammar decisions require human editorial work. Expansion 01 intentionally made no canonical edit.

## 16. Course classification and next priority

### Current classification

- **English: stronger light introductory course.** The required path now includes all 32 lessons, all lessons are normally dense, and the course has 231 unique assessable items. It remains only 8.4 authored hours, with two hours across Stages 5–6, 1.8% vocabulary coverage, one level-5 vocabulary item, no level-6 vocabulary, and no CEFR evidence.
- **Japanese: stronger light introductory course.** The required path and density improvements are equally material, and the course has 219 unique assessable items. It remains 8.4 authored hours, uses two non-assessed overviews, has only two level-5 and zero level-6 vocabulary items, and lacks reviewed comprehensive JLPT grammar/expression alignment.

Neither course has enough authored time, unique assessable breadth, late-stage progression, or external-alignment evidence to justify `moderate guided course` yet.

### Next-priority comparison

| Candidate | Learner impact | Curriculum coherence | Implementation scope | Prerequisite risk | Content-review workload |
|---|---|---|---|---|---|
| A. Stage 5–6 expansion | High: fixes the shortest and weakest progression segment | High if outcomes and level targets are designed first | Potentially high; unknown until audited | Medium–high if path edges or new lessons follow | High: later-level selection, examples, contexts, modes |
| B. Integrate remaining foundational grammar | Medium–high: fills plausible early-system gaps | Medium–high, but placement must be syllabus-led | Medium; can often reuse canonical records | Low–medium | Medium–high because many candidate records have semantic/example debt |
| C. Editorial examples/context enrichment | Medium: improves clarity and transfer for current content | Medium; does not by itself repair late-stage progression | Medium–high across 161 one-example vocabulary records and other debt | Low | Very high and human-intensive |

### One recommended next task

Run a **bounded bilingual Stage 5–6 progression design audit**. Do not create lessons, migrations, or prerequisites during that audit. It should:

1. define communicative and internal-level exit outcomes for each of Stages 5 and 6;
2. map current Stage 5–6 vocabulary, grammar, expressions, examples, and practice modes against those outcomes;
3. decide whether the unlinked foundational grammar candidates belong in earlier remediation rather than late stages;
4. identify a reviewed shortlist of genuinely level-appropriate vocabulary and expressions, with example/context debt costed;
5. propose a bounded lesson/prerequisite plan only after the evidence is reviewed.

This task addresses the now-clearest bottleneck while allowing grammar integration and editorial enrichment to be scoped as dependencies instead of competing, uncoordinated bulk work. It is a design audit, not the start of Expansion 02 and not a commitment to add 40–60 lessons.

## Safety confirmation

This audit added only `docs/POST-EXPANSION-COVERAGE-AUDIT-01.md`. It did not modify curriculum, roles, prerequisites, canonical content, application code, migrations, local or remote D1, learner state, branches, or deployments. Expansion 02 was not started.
