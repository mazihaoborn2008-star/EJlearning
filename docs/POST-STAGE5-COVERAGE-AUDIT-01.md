# EJ Learning — Post-Stage-5 Coverage Audit 01

**Audit date:** 2026-09-16  
**Scope:** read-only whole-course impact audit after Stage 5 Expansion 02  
**Audited revision:** `94247bf20d519932b028a92ccd523ac04e753044` on `main`  
**Current bundle:** `curriculum-stage5-expansion-02-v1`  
**Schema:** `CURRICULUM-STAGE5-EXPANSION-02`  
**Dataset marker:** `2026-09-stage5-expansion-02-v1`

## Executive conclusion

Stage 5 Expansion 02 materially improved both guided courses. It added eight lessons, made Stage 5 an eight-lesson/120-minute stage in each language, raised unique assessable coverage from 231 to **252 English** and from 219 to **236 Japanese**, established an explicit and well-distributed Stage 5 review structure, and meaningfully increased Level 4/5 vocabulary use. The expansion did not merely add links: the 137 added and 19 removed Stage 5 relationships produce 118 net links but only 52 genuinely new whole-course unique records (28 EN, 24 JA), of which 38 are assessable.

Both languages can now reasonably be classified as **APPROACHING MODERATE** under the project's internal benchmark. Neither yet meets `MODERATE GUIDED COURSE`: the courses have 9.4 authored hours rather than roughly 12; English is eight and Japanese 24 unique assessable items below the 260 lower planning bound; review authoring stops at the Stage 5 boundary; and Stage 6 remains only four lessons/60 minutes with weak contextualization and uneven outcomes.

Stage 6 is still the clearest structural bottleneck, but Stage 5 has absorbed several outcomes that the earlier design audit proposed for Stage 6. The justified response is therefore **ADD 2**: expand Stage 6 to approximately six lessons/90 authored minutes per language and densify/refocus the four current lessons. An automatic four-lesson symmetric expansion to 120 minutes is not yet justified. The next curriculum task should be a bounded bilingual Stage 6 six-slot design/approval audit, not implementation in this task.

## 1. Revision, source, method, and safety

Pre-flight passed before the document was added:

- branch: `main`;
- `HEAD`: `94247bf20d519932b028a92ccd523ac04e753044`;
- `origin/main`: `94247bf20d519932b028a92ccd523ac04e753044`;
- tracked/untracked worktree: clean;
- no feature branch was created.

The current source resolves `curriculum-stage5-expansion-02-v1`, `CURRICULUM-STAGE5-EXPANSION-02`, and `2026-09-stage5-expansion-02-v1` from `scripts/stage5-expansion-02.js`. The lesson dataset policy independently expects 72 rows and the same bundle/marker.

The audit loaded the immutable pre-Stage-5 bundle and current bundle directly from source and evaluated canonical metadata in independent in-memory SQLite databases before and after the Stage 5 editorial migration. No Wrangler/D1 command was run. The 10,000/8,235 full vocabulary totals were cross-checked against `config/staging-data-policy.json` and the existing Phase 3.5E.2 source-import audit; the curated in-repository example snapshot contains the 435 EN/450 JA records with authored examples and is not mistaken for the full reference-library size.

Definitions:

- **Raw relationships** preserve historical links, including archived greeting grammar.
- **Runtime-active relationships** exclude `en-greeting` and `ja-greeting` through the current grammar policy.
- **Authoritative/assessable grammar** excludes both archived greetings and the Hotfix 02 overview-only records `35e1c-ja-condition-contrast` and `35e1c-ja-workplace-register`.
- **Unique assessable items** are unique vocabulary plus authoritative grammar. Expressions are excluded.
- **Safe deterministic opportunities** are three vocabulary modes, two grammar modes, plus one controlled-completion opportunity for each authoritative grammar item with a valid authored occurrence or explicit `CC SAFE` authority.
- **Strict expression context** means canonical scenario/dialogue/context metadata or an approved versioned context. A bare sentence is not counted.
- The 2–3× learner-time multiplier is the previously adopted planning allowance for practice, retry, and review. It is not measured learner time.

## 2. Global integrity and Stage 5 delta

| Measure | Before Stage 5 Expansion 02 | Current | Delta |
|---|---:|---:|---:|
| Lessons | 64 | **72** | +8 |
| Prerequisite edges | 62 | **70** | +8 |
| Raw relationships | 958 | **1,076** | +118 |
| Runtime-active relationships | 953 | **1,071** | +118 |

The exact five-link raw/runtime difference is unchanged:

| Lesson | Archived grammar link |
|---|---|
| `en-s1-l1` | `en-greeting` |
| `en-s1-l2` | `en-greeting` |
| `en-s6-l3` | `en-greeting` |
| `ja-s1-l1` | `ja-greeting` |
| `ja-s1-l2` | `ja-greeting` |

These are preserved historical raw relationships, not broken current links.

Canonical identity totals remain unchanged:

| Library | English | Japanese | Total |
|---|---:|---:|---:|
| Vocabulary, published | 10,000 | 8,235 | 18,235 |
| Grammar, historical | 83 | 98 | 181 |
| Grammar, published | 82 | 97 | 179 |
| Expressions, published | 348 | 365 | 713 |

### Exact Stage 5 relationship composition change

| Language/type | Before | Retained | Added | Removed from new composition | Current | Net |
|---|---:|---:|---:|---:|---:|---:|
| EN vocabulary | 32 | 26 | 38 | 6 | 64 | +32 |
| EN grammar | 12 | 11 | 13 | 1 | 24 | +12 |
| EN expression | 17 | 14 | 18 | 3 | 32 | +15 |
| JA vocabulary | 32 | 29 | 35 | 3 | 64 | +32 |
| JA grammar | 12 | 9 | 15 | 3 | 24 | +12 |
| JA expression | 17 | 14 | 18 | 3 | 32 | +15 |
| **Total** | **122** | **103** | **137** | **19** | **240** | **+118** |

The 137 additions comprise 73 vocabulary, 28 grammar, and 36 expression relationships. The 19 removed relationships are omissions from the current Stage 5 composition; their canonical records and historical bundle evidence were not deleted.

Link growth is not unique-content growth. Current Stage 5's 120 EN links collapse to 87 unique Stage 5 records, and its 120 JA links collapse to 90. Across the whole course, Stage 5 adds only **28 EN** and **24 JA** genuinely new guided unique records. Reuse and deliberate review account for the remainder.

## 3. Global guided and assessable coverage

The requested baseline values are verified in the immutable `curriculum-expansion-01a-v1` source and agree with `POST-EXPANSION-COVERAGE-AUDIT-01.md`.

| Language/type | Before Stage 5 | Current | Absolute delta | Current share of published library |
|---|---:|---:|---:|---:|
| EN vocabulary | 177 | **194** | +17 | 1.94% of 10,000 |
| EN grammar, linked published | 54 | **58** | +4 | 70.7% of 82 |
| EN expressions | 124 | **131** | +7 | 37.6% of 348 |
| JA vocabulary | 167 | **177** | +10 | 2.15% of 8,235 |
| JA grammar, linked published | 54 | **61** | +7 | 62.9% of 97 |
| JA expressions | 120 | **127** | +7 | 34.8% of 365 |

Japanese's 61 linked grammar records include two overview-only records. They remain readable but are not authoritative assessment items.

| Language | Unique vocabulary | Authoritative grammar | Combined unique assessable | Position against 260–300 planning benchmark |
|---|---:|---:|---:|---|
| English | 194 | 58 | **252** | 8 below lower bound; close, not met |
| Japanese | 177 | 59 | **236** | 24 below lower bound; approaching, not met |

Compared with the prior 231 EN/219 JA assessable totals, Stage 5 adds 21 and 17 respectively. Expressions are deliberately absent from this measure.

## 4. Authored time and mandatory path

### English time profile

| Stage | Lessons | Authored minutes | Share of 564 minutes |
|---|---:|---:|---:|
| 1 | 4 | 60 | 10.6% |
| 2 | 5 | 78 | 13.8% |
| 3 | 9 | 150 | 26.6% |
| 4 | 6 | 96 | 17.0% |
| 5 | 8 | 120 | 21.3% |
| 6 | 4 | 60 | 10.6% |
| **Total** | **36** | **564 / 9.4 h** | **100%** |

### Japanese time profile

| Stage | Lessons | Authored minutes | Share of 564 minutes |
|---|---:|---:|---:|
| 1 | 4 | 60 | 10.6% |
| 2 | 6 | 96 | 17.0% |
| 3 | 8 | 132 | 23.4% |
| 4 | 6 | 96 | 17.0% |
| 5 | 8 | 120 | 21.3% |
| 6 | 4 | 60 | 10.6% |
| **Total** | **36** | **564 / 9.4 h** | **100%** |

The pre-Stage-5 authored total was 504 minutes/8.4 hours per language. The current total is +60 minutes/+1 hour. Stage 5 is exactly eight lessons/120 minutes and Stage 6 remains four/60 in both languages.

Stage 3 is a broad middle-course segment, Stage 4 consolidates, and Stage 5 is now a substantive late stage. The sequence is coherent through Stage 5. The immediate 120→60 minute fall into Stage 6 is the remaining structural discontinuity.

### Root-to-course-end mandatory path

The graph has two roots, one per language, and one linear 36-lesson path from each root to its Stage 6 terminal lesson. It is connected, acyclic, language-isolated, and contains no missing prerequisite or bypass.

| State | Required lessons per language | Required authored minutes | Planning learner time at 2–3× |
|---|---:|---:|---:|
| Before Expansion 01 | 24 | 360 / 6.0 h | 12–18 h |
| After Expansion 01 | 32 | 504 / 8.4 h | 16.8–25.2 h |
| **After Stage 5 Expansion 02** | **36** | **564 / 9.4 h** | **18.8–28.2 h** |

The current whole catalog is mandatory, so the English and Japanese authored-course totals equal the mandatory-path totals. The 2.5× midpoint is approximately 23.5 learner hours.

## 5. Final Stage 5 lesson density

Every Stage 5 lesson has the approved 8 vocabulary/3 authoritative grammar/4 expression composition, 11 assessable items, and `required_items = 5`.

### English

| Lesson | V/G/E | Assessable | Required | Safe opportunities | NEW/REVIEW/SUPPORT |
|---|---:|---:|---:|---:|---:|
| `en-s5-l1` | 8/3/4 | 11 | 5 | 33 | 8/4/3 |
| `en-s5-02-tradeoffs` | 8/3/4 | 11 | 5 | 33 | 9/4/2 |
| `en-s5-03-consensus` | 8/3/4 | 11 | 5 | 33 | 5/8/2 |
| `en-s5-l2` | 8/3/4 | 11 | 5 | 33 | 7/2/6 |
| `en-s5-l3` | 8/3/4 | 11 | 5 | 33 | 6/6/3 |
| `en-s5-06-repair` | 8/3/4 | 11 | 5 | 33 | 8/4/3 |
| `en-s5-l4` | 8/3/4 | 11 | 5 | 33 | 6/4/5 |
| `en-s5-08-reporting` | 8/3/4 | 11 | 5 | **32** | 4/8/3 |

EN8 has 32 opportunities because reported statements intentionally has no safe controlled-completion authority; this is a sound ambiguity decision, not a practice defect.

### Japanese

| Lesson | V/G/E | Assessable | Required | Safe opportunities | NEW/REVIEW/SUPPORT |
|---|---:|---:|---:|---:|---:|
| `ja-s5-l1` | 8/3/4 | 11 | 5 | 33 | 11/1/3 |
| `ja-s5-l2` | 8/3/4 | 11 | 5 | 33 | 4/7/4 |
| `ja-s5-03-formal-role` | 8/3/4 | 11 | 5 | 33 | 7/6/2 |
| `ja-s5-l3` | 8/3/4 | 11 | 5 | 33 | 8/3/4 |
| `ja-s5-l4` | 8/3/4 | 11 | 5 | 33 | 5/3/7 |
| `ja-s5-06-repair` | 8/3/4 | 11 | 5 | 33 | 7/6/2 |
| `ja-s5-07-consensus` | 8/3/4 | 11 | 5 | 33 | 9/4/2 |
| `ja-s5-08-benefit` | 8/3/4 | 11 | 5 | 33 | 0/12/3 |

## 6. Stage 5 roles and reinforcement

| Language | NEW | REVIEW | SUPPORT | Planning-band result |
|---|---:|---:|---:|---|
| English | 53/120 = **44.2%** | 40/120 = **33.3%** | 27/120 = **22.5%** | All within 40–55 / 25–35 / 15–25 |
| Japanese | 51/120 = **42.5%** | 42/120 = **35.0%** | 27/120 = **22.5%** | All within or exactly on the bands |
| Combined | 104/240 = **43.3%** | 82/240 = **34.2%** | 54/240 = **22.5%** | Within all bands |

REVIEW appears in every Stage 5 lesson; it is not deferred to the final slot. The strongest planning-band exceptions at lesson level are intentional signals for review, not automatic defects:

- NEW-heavy: EN2 60.0%, JA1 73.3%, and JA7 60.0%. JA1 is the clearest introduction-heavy lesson.
- Support-heavy: EN4 40.0%, EN7 33.3%, and JA5 46.7%. JA5 is the clearest support-heavy lesson.
- Review-consolidation: JA8 has 0 NEW/80.0% REVIEW and EN8 has 26.7% NEW/53.3% REVIEW. Those end-of-stage profiles are coherent consolidation choices.

### Reinforcement evidence by content type

`First introduced in Stage 5` below means absent from Stages 1–4. It can include a record that was already linked in Stage 6, so it must not be confused with the smaller whole-course unique delta.

| Language/type | Stage 5 rel./unique | First introduced in S5 | Reviewed from S1–4 | Unique IDs repeated within S5 | Excess duplicate links | Explicit REVIEW links |
|---|---:|---:|---:|---:|---:|---:|
| EN vocabulary | 64/46 | 29 | 17 | 13 | 18 | 23 |
| EN grammar | 24/15 | 14 | 1 | 8 | 9 | 8 |
| EN expression | 32/26 | 23 | 3 | 6 | 6 | 9 |
| JA vocabulary | 64/39 | 26 | 13 | 14 | 25 | 22 |
| JA grammar | 24/21 | 13 | 8 | 3 | 3 | 11 |
| JA expression | 32/30 | 22 | 8 | 2 | 2 | 9 |

This is real instructional reinforcement because roles were human-approved, REVIEW is spread across every slot, source relationships are mapped, and repeated expressions/forms appear in changed communicative outcomes. Duplicate linking alone remains insufficient evidence: the 18 EN/25 JA excess Stage 5 vocabulary links, for example, are only reinforcement when their authored role and changed use support that interpretation.

## 7. Vocabulary-level progression

### Final Stage 5 profile

| Language/measure | L1 | L2 | L3 | L4 | L5 | L6 |
|---|---:|---:|---:|---:|---:|---:|
| EN relationships | 5 (7.8%) | 10 (15.6%) | 5 (7.8%) | 29 (45.3%) | 15 (23.4%) | 0 |
| EN unique | 5 (10.9%) | 8 (17.4%) | 4 (8.7%) | 20 (43.5%) | 9 (19.6%) | 0 |
| JA relationships | 8 (12.5%) | 17 (26.6%) | 10 (15.6%) | 21 (32.8%) | 8 (12.5%) | 0 |
| JA unique | 6 (15.4%) | 10 (25.6%) | 5 (12.8%) | 12 (30.8%) | 6 (15.4%) | 0 |

English meets the approved relationship bands at L4, L5, and L6 but is below the L3 band because lower-level review/support is retained. Japanese remains below the earlier L3/L4/L5 percentage targets. That exception was explicitly approved on semantic-first grounds: replacing request, service, or giving/receiving vocabulary with unrelated high-level words would harm the outcome.

The role cross-check supports that interpretation. All 15 EN L1/2 links are REVIEW or SUPPORT. Of 25 JA L1/2 links, 24 are REVIEW or SUPPORT; only one is NEW. Lower-level late-stage links therefore mostly scaffold harder discourse rather than masquerade as advanced introductions.

### Course-wide Level 4–6 use

| Scope | Unique L4/L5/L6 | Unique late share | Relationship L4/L5/L6 | Late relationship share |
|---|---:|---:|---:|---:|
| EN whole course | 31/10/0 | 41/194 = **21.1%** | 47/16/0 | 63/286 = **22.0%** |
| EN Stages 5–6 | 22/9/0 | 31/72 = **43.1%** | 35/15/0 | 50/96 = **52.1%** |
| JA whole course | 20/7/0 | 27/177 = **15.3%** | 35/11/0 | 46/285 = **16.1%** |
| JA Stages 5–6 | 17/6/0 | 23/60 = **38.3%** | 30/10/0 | 40/96 = **41.7%** |

Before Stage 5, English used 23 unique L4, one L5, and no L6 vocabulary; Japanese used 14 L4, two L5, and no L6. Current use is 31/10/0 EN and 20/7/0 JA. Stage 5 therefore meaningfully corrects the earlier late-level problem, especially at L4/5, while leaving the absence of vocabulary L6 unchanged. The new weakness is concentration: Stage 6 itself falls back to only six unique EN L4 items and no L5/6, and nine JA L4 plus one L5.

### Japanese Level 6 boundary

The published Japanese Level 6 vocabulary pool remains exactly **21 records**. All 21 are marked `formal`, all 21 have exactly one authored collocation/example, and the set is narrowly formal/academic: examples include `齟齬`, `外挿する`, `恣意的`, `反証する`, `互恵性`, `反証可能`, `実証的`, and `相互排他的`. No Japanese Level 6 vocabulary is currently guided.

It remains correct not to force Level 6 words into Stage 6 merely because the stage number is six. Reviewed L4/5 vocabulary plus advanced grammar, register, and pragmatics is the sound default; a small number such as `不測の事態` or `説明責任` is justified only when a specific outcome needs it and its example depth is improved.

## 8. Grammar and pragmatic progression

| Language/stage | Unique grammar | Authoritative | Overview-only | Internal L1–6 distribution | Explicit REVIEW links | CC-capable authoritative unique | Example depth min/mean/max |
|---|---:|---:|---:|---|---:|---:|---:|
| EN S4 | 14 | 14 | 0 | 3/2/5/4/0/0 | 4 | 11 | 1/4.43/7 |
| EN S5 | 15 | 15 | 0 | 0/3/2/7/3/0 | 8 | 14 | 1/3.80/7 |
| EN S6 | 12 | 12 | 0 | 1/4/0/3/1/3 | 0 | 11 | 1/4.17/9 |
| JA S4 | 15 | 13 | 2 | 1/1/6/7/0/0 | 5 | 10 | 1/3.40/8 |
| JA S5 | 21 | 21 | 0 | 0/1/6/9/4/1 | 11 | 21 | 1/3.14/8 |
| JA S6 | 12 | 12 | 0 | 1/1/3/3/1/3 | 0 | 12 | 1/3.00/8 |

Stage 5 now demonstrates real grammar/pragmatics progression:

- English moves from an average internal grammar level of 2.71 in Stage 4 to 3.67 in Stage 5 and adds concession, hedged judgment, inference, misunderstanding repair, hindsight, and reported-information functions.
- Japanese moves from 3.27 to 3.90 and adds bounded honorific/humble selection, conditional negotiation, indirect questions, evidential inference, partial denial, comparison, normative judgment, and benefit direction.
- The two overview-only Japanese records remain excluded from authority. Stage 5 does not rely on them as assessable shortcuts.

Stage 6 does not simply become easier grammatically: both languages contain three Level 6 grammar records and average 3.67 EN/3.92 JA. The problem is discontinuity. Those advanced forms sit beside L1/2 grammar and low-difficulty invitation/commitment material; unique grammar breadth drops, explicit review roles disappear, and most advanced Stage 5 outcomes are not synthesized. Stage 6 therefore contains genuine capstone islands but does not sustain the full progression.

## 9. Editorial quality and controlled completion

Stage 5 added exactly:

- 40 vocabulary examples: 24 EN and 16 JA;
- 39 grammar examples across 13 records: 15 EN across five records and 24 JA across eight;
- two versioned expression contexts: one per language;
- three new six-turn dialogues, three reuse prompt layers, and two short scenarios.

On the same final guided record set, those additions reduce debt as follows:

| Debt on final guided set | Before Stage 5 editorial additions | Current | Fixed directly |
|---|---:|---:|---:|
| EN vocabulary with one example | 101 | 77 | 24 |
| JA vocabulary with one example | 88 | 72 | 16 |
| EN grammar with fewer than four examples | 21 | 16 | 5 |
| JA grammar with fewer than four examples | 30 | 22 | 8 |
| EN expressions without strict context | 51 | 50 | 1 |
| JA expressions without strict context | 50 | 49 | 1 |

Because Stage 5 also changed the guided set, the net whole-course debt versus the old guided course is 84→77 EN and 77→72 JA one-example vocabulary; 18→16 EN and 23→22 JA under-four-example grammar; and 53→50 EN and 52→49 JA contextless expressions.

### Remaining global debt

| Current unique guided debt | English | Japanese |
|---|---:|---:|
| Vocabulary with exactly one example | **77/194** | **72/177** |
| Grammar with fewer than four examples | **16/58** | **22/61** |
| Expressions lacking strict context | **50/131** | **49/127** |
| Grammar with identical title/core/purpose | **40/58** | **42/61** |
| Grammar with identical when/mistakes/nuance | **38/58** | **43/61** |

Hotfix 03 resolved the four Stage 5 blocking models `ja-n-desu-ga`, `ja-node`, `ja-honorific`, and `ja-humble`. After removing the two resolved Audit 02 candidates from the unresolved list, the linked review-only candidate debt is:

- English, four: `35e1c-en-past-questions-negatives`, `35e1c-en-some-any`, `en-would-like`, `en-relative-clause`.
- Japanese, eight: `35e1c-ja-obligation-contrast`, `35e1c-ja-kara-node-contrast`, `35e1c-ja-te-sequence`, `35e1c-ja-explanatory-nodesu`, `ja-ba-condition`, `ja-kamoshirenai`, `ja-te-iru`, `ja-tsumori`.

These are review candidates, not automatically confirmed defects.

### Controlled-completion quality

The Stage 5 authority set contains **28 new `CC SAFE`** and **11 new `NOT FOR CC`** grammar examples. The 28 safe examples cover 12 grammar records and use varied sentences rather than one universal template. Safe authority depth is one to three examples per record (most have two or three); other existing canonical occurrences remain available only where the runtime's locality checks also validate them.

The `NOT FOR CC` decisions are valuable. They prevent synonym ambiguity, non-unique Japanese particle spans, contractions, and plausible alternative forms from being turned into false one-answer questions. More CC would not be an improvement if it weakened answer authority.

The new canonical examples also improve safe example diversity for two older Stage 6 lessons without changing their link composition: `en-s6-l2` gains approved `en-not-that` examples, and `ja-s6-l2` gains approved `ja-wake-dewa-nai` examples.

## 10. Whole-course controlled completion and practice readiness

### Lesson-level CC coverage across all 72 lessons

| Language | Zero CC | One CC | Multiple CC |
|---|---:|---:|---:|
| English | 0 | 3 | 33 |
| Japanese | 1 | 4 | 31 |
| **Total** | **1** | **7** | **64** |

This compares with 1/7/56 across 64 lessons after Expansion 01. All eight new lessons are in the multiple-CC category, so the prior lone zero-CC lesson remains exactly `ja-s3-l8`. It still has nine assessable items, `required_items = 5`, and 26 opportunities. It is a relative diversity low point, but it is not unsafe solely because CC is zero.

### Practice-density distribution

| Language/measure | Min | Median | Mean | Max |
|---|---:|---:|---:|---:|
| EN assessable items | 10 | 11 | 10.83 | 12 |
| EN `required_items` | 5 | 5 | 5.00 | 5 |
| EN safe opportunities | 29 | 33 | 32.19 | 35 |
| JA assessable items | 9 | 11 | 10.72 | 12 |
| JA `required_items` | 5 | 5 | 5.00 | 5 |
| JA safe opportunities | 26 | 33 | 31.97 | 35 |

There is no English low point below 29 opportunities. The real Japanese low point remains `ja-s3-l8` at 26/zero CC. `ja-s2-l2` and `ja-s4-l6` are at 27 opportunities, but the former has three CC-capable items and the latter has one; both remain completion-safe. No Stage 5 lesson is a practice-density concern.

## 11. Current Stage 6 inventory

### English Stage 6

| Dimension | Current evidence |
|---|---|
| Size | 4 lessons / 60 authored minutes |
| Links; unique | V 32/31; G 12/12; E 17/17 |
| Unique assessable breadth | 43 |
| Safe opportunities | 131 total; 32.75 per lesson |
| Vocabulary levels, unique | L1–6 = 9/6/10/6/0/0 |
| Vocabulary levels, relationships | 10/6/10/6/0/0 |
| Grammar levels | 1/4/0/3/1/3 |
| Expression difficulty | D1–6 = 0/7/2/4/0/4 |
| Explicit REVIEW | 0; none of 61 links has a role tag |
| CC | all 4 lessons multiple-CC; 11 CC-capable grammar links |
| Strict expression context | 4/17 (23.5%); two dialogue and two scenario expressions |
| Lesson assets | no Stage 6-specific dialogue/scenario/reuse assets |

The evidence-led argument and hypothetical lessons contain genuine late grammar. The invitation and reflection end are much easier lexically and functionally. No Level 5/6 vocabulary appears, no role-authored review exists, and dialogue/context richness is thin.

### Japanese Stage 6

| Dimension | Current evidence |
|---|---|
| Size | 4 lessons / 60 authored minutes |
| Links; unique | V 32/29; G 12/12; E 17/17 |
| Unique assessable breadth | 41 |
| Safe opportunities | 132 total; 33.0 per lesson |
| Vocabulary levels, unique | L1–6 = 4/11/4/9/1/0 |
| Vocabulary levels, relationships | 4/13/4/9/2/0 |
| Grammar levels | 1/1/3/3/1/3 |
| Expression difficulty | D1–6 = 1/3/1/6/3/3 |
| Explicit REVIEW | 0; none of 61 links has a role tag |
| CC | all 4 lessons multiple-CC; 12 CC-capable grammar links |
| Strict expression context | 4/17 (23.5%); three dialogue and one scenario expressions |
| Lesson assets | no Stage 6-specific dialogue/scenario/reuse assets |

Japanese has a slightly better L4/5 vocabulary profile than English and genuine formal-reasoning grammar, but its invitation/commitment ending also falls back to basic material. It does not use the narrow Level 6 vocabulary pool, which is an appropriate choice.

## 12. Stage 5 versus Stage 6

| Dimension | EN Stage 5 → Stage 6 | JA Stage 5 → Stage 6 |
|---|---|---|
| Lessons / minutes | 8/120 → 4/60 | 8/120 → 4/60 |
| Unique V/G/E | 46/15/26 → 31/12/17 | 39/21/30 → 29/12/17 |
| Unique assessable | 61 → 43 | 60 → 41 |
| Explicit REVIEW | 40 links/33.3% → 0 | 42 links/35.0% → 0 |
| Unique L4+5 vocabulary | 29 → 6 | 18 → 10 |
| Grammar profile | coherent L4/5 concentration → three L6 islands mixed with five L1/2 records | broad L3–5 + one L6 → three L6 islands in a narrower mixed set |
| Strict contextual expressions | 19/26 (73.1%) → 4/17 (23.5%) | 22/30 (73.3%) → 4/17 (23.5%) |
| Dialogue/scenario layer | new dialogue, reuse, and scenarios | new dialogues and reuse layers | 

Stage 6 has healthy per-lesson practice density and some authentic capstone grammar. It is not empty. At whole-stage level, however, halving time, losing role-authored review, sharply reducing context, and retreating in late vocabulary make it a **structurally underbuilt short capstone—closer to structural collapse than sustained progression**.

## 13. Course-end outcome mapping

The earlier proposals are used as design evidence, not as mandatory external standards. Current Stage 5 prerequisite coverage is noted where it reduces the need for a separate Stage 6 introduction, but Stage 6 must still synthesize or review an outcome to count as fully covered.

### English

| Prior proposed outcome | Current evidence | Classification |
|---|---|---|
| Evidence-led argument | Strong `en-s6-l1` claim/evidence/advanced grammar | **WELL COVERED** |
| Hedging and concession | Hedging/repair in S6; concession now taught in S5 but not systematically synthesized | **PARTIALLY COVERED** |
| Reported-information synthesis | Reporting/observation versus inference introduced in EN8; no Stage 6 synthesis | **PARTIALLY COVERED** |
| Complex hypotheticals | Mixed and second conditional coverage in Stage 6 | **WELL COVERED** |
| Competing-demand negotiation/accountability | Consensus/trade-offs now in S5; mitigation/accountability remain absent in S6 | **PARTIALLY COVERED** |
| Reflective synthesis | `en-s6-l4` fits, but vocabulary and expression depth are mostly early-level | **PARTIALLY COVERED** |
| Formal commitments | Invitation/choice function exists, but register and complexity are too light | **PARTIALLY COVERED** |

### Japanese

| Prior proposed outcome | Current evidence | Classification |
|---|---|---|
| Structured reasoning | Strong `ja-s6-l1` evidence/reason/conclusion profile | **WELL COVERED** |
| Qualified claims | `ja-s6-l2` plus partial-denial/inference learned in S5 | **PARTIALLY COVERED** |
| Specific honorific/humble usage | Bounded specific forms and a service dialogue now exist in S5; Stage 6 does not extend them | **PARTIALLY COVERED** |
| Embedded/reporting language | Indirect question and inference now exist in S5; no coherent Stage 6 synthesis | **PARTIALLY COVERED** |
| Conditional nuance | Specific `なら`/`ば` work appears in S5; Stage 6 has no focused application | **PARTIALLY COVERED** |
| Contingency/accountability negotiation | S5 consensus/trade-off work helps, but contingency and accountability remain thin | **PARTIALLY COVERED** |
| Reflection | `ja-s6-l3` is a good functional fit | **WELL COVERED** |
| Formal commitments | Invitation/schedule-change function exists, but much of the selected material is basic | **PARTIALLY COVERED** |

Stage 5 has changed the Stage 6 design problem: several items formerly `NOT COVERED` are now upstream prerequisites. Stage 6 needs synthesis, transfer, accountability, and formal commitment depth more than four entirely new topic introductions.

## 14. Project-specific moderate-course criteria

| Criterion | English | Japanese | Evidence |
|---|---|---|---|
| Coherent roughly 12-hour-scale breadth | **PARTIALLY MET** | **PARTIALLY MET** | 9.4 authored hours; 18.8–28.2 planning learner hours; coherent through S5, short S6 |
| Reviewed late-stage outcomes | **PARTIALLY MET** | **PARTIALLY MET** | S5 is reviewed and broad; S6 outcome synthesis and role authoring are incomplete |
| Roughly 260–300 unique assessable items | **PARTIALLY MET** | **PARTIALLY MET** | 252 EN and 236 JA |
| Meaningful Level 4/5 progression | **PARTIALLY MET** | **PARTIALLY MET** | Stage 5 corrects the problem; Stage 6 retreats, especially EN |
| Deliberate 25–35% review structure | **PARTIALLY MET** | **PARTIALLY MET** | S5 = 33.3%/35.0%; S6 = 0 explicit roles |
| Improved example/context quality | **PARTIALLY MET** | **PARTIALLY MET** | 40 V examples, 39 G examples, two contexts and assets; substantial global/S6 debt remains |
| Strong prerequisite/path integrity | **MET** | **MET** | One connected, acyclic, 36-lesson language-isolated path each |
| Safe lesson-level practice | **MET** | **MET** | Minimum 29 EN/26 JA opportunities; all required counts five |

Neither language meets every internal criterion. No CEFR or JLPT equivalence is claimed or needed for this classification.

## 15. Current course classification

- **English: APPROACHING MODERATE.** It has 36 mandatory lessons, 9.4 authored hours, 252 unique assessable items, strong practice density, a coherent eight-lesson Stage 5, and meaningful L4/5 improvement. It is very close to the assessable lower bound, but Stage 6 is half-sized, has no explicit review structure, no L5/6 vocabulary, and poor expression contextualization.
- **Japanese: APPROACHING MODERATE.** It has the same time/path integrity, 236 unique assessable items, a pragmatically strong Stage 5, deliberate review, and improved L4/5 coverage. It is farther from the assessable target and retains more grammar/editorial debt; Stage 6 also fails to synthesize the new register/conditional/reporting outcomes.

The upgrade from `STRONGER LIGHT INTRODUCTORY` is justified by the combined time, assessable breadth, Stage 5 outcome breadth, role-authored reinforcement, and late-level change—not by lesson count alone. `MODERATE GUIDED COURSE` is not yet justified.

## 16. Stage 6 size options

| Option | Learner impact and coherence | Likely unique/review effect | Cost and risk | Padding risk | Assessment |
|---|---|---|---|---|---|
| **A — keep/densify: 4 lessons/~60 min** | Improves the existing capstone islands but leaves a 120→60 minute cliff and forces too many synthesis outcomes into four slots | Small unique gain; roles/context can improve but no added outcome capacity | Lowest authoring/editorial cost; lowest prerequisite risk | Low padding, high overload/omission risk | Better than current, but insufficient for the demonstrated gaps |
| **B — small expansion: 6 lessons/~90 min** | Adds two focused transfer/synthesis outcomes while retaining a legitimately shorter capstone | Approximately +8–13 unique assessable items; enough room for 25–35% S6 review and richer expression reuse | Medium authoring/editorial cost; low–medium linear-chain risk | **Lowest balanced risk** if slots are outcome-led | **Recommended** |
| **C — symmetric expansion: 8 lessons/~120 min** | Removes time asymmetry and offers maximum outcome separation | Approximately +14–22 unique assessable items and more review/context capacity | Highest authoring/editorial cost; medium prerequisite/change risk | Medium–high until four non-duplicative outcomes are demonstrated | Plausible future ceiling, not currently justified |

Option A would preserve a short capstone but does not repair the observed breadth/context/review collapse. Option C was reasonable before Stage 5 implementation, when several now-covered outcomes were still missing. After Stage 5, symmetry alone is not evidence. Option B targets the remaining synthesis gap without padding Stage 6 to match Stage 5 mechanically.

## 17. Recommended Stage 6 target and expected impact

**Recommendation: ADD 2 per language. Target six Stage 6 lessons and approximately 90 authored Stage 6 minutes per language.** Densify/refocus the four existing lessons as part of the design; do not create slots until a reviewed matrix exists.

The two added outcomes should be selected for maximum transfer rather than as generic advanced-topic containers. A defensible direction is:

- English: reported/evidence synthesis with concession, and competing-demand negotiation with accountability/formal commitments.
- Japanese: embedded/reporting plus qualified conditional reasoning, and contingency/accountability negotiation with formal register/commitments.

These are design directions, not approved lesson titles or relationship selections.

Estimated impact if two 15-minute lessons per language are added and all six Stage 6 lessons are role-authored:

| Measure | Current | Expected range |
|---|---:|---:|
| Total lessons, both languages | 72 | **76** |
| Lessons per language | 36 | **38** |
| Authored minutes per language | 564 | **594 / 9.9 h** |
| Planning learner time per language | 18.8–28.2 h | **19.8–29.7 h** |
| EN unique assessable | 252 | **260–265** |
| JA unique assessable | 236 | **244–249** |
| Added unique L4/5 vocabulary | — | approximately **6–10 per language** |
| Stage 6 explicit review | none | approximately **23–32 of ~91 links** if all six lessons meet 25–35% |
| Added expression breadth | — | approximately **6–8 unique per language**, with deliberate reuse |
| New dialogue/scenario depth | none at S6 asset layer | at least one dialogue and one scenario/reuse layer per language, subject to editorial review |

The ranges are estimates. Exact unique growth depends on the final balance of NEW versus REVIEW/SUPPORT and must not be claimed in advance. This option would likely bring English into the assessable planning band while leaving Japanese somewhat below it; that is preferable to padding Stage 6 with unrelated content. Japanese's remaining gap can be addressed through properly placed foundational grammar and later editorial/syllabus work.

## 18. Recommended next curriculum task

| Candidate | Learner impact | Course coherence | Scope/risk | Dependency order |
|---|---|---|---|---|
| A. Stage 6 progression expansion | High | Highest: repairs the only remaining time/outcome cliff | Medium, bounded if limited to two slots plus refocus | **Next** |
| B. Remaining foundational grammar placement | Medium–high | Important, but forcing it into Stage 6 would weaken progression | Medium; low–medium graph risk | Audit after/alongside S6 dependencies, place earlier where justified |
| C. Global editorial debt cleanup | Medium | Improves clarity but does not repair the Stage 6 structure | Very broad and human-intensive | Target only dependencies during S6 design; global pass later |
| D. Production-readiness/deployment architecture | Product-important, not a curriculum expansion | Does not resolve course progression | Separate operational scope and risk | Not the next curriculum task |

The one recommended next curriculum task is **a bounded bilingual Stage 6 Expansion 03 design/approval audit for six total lessons/90 minutes per language**. It should define two additional outcomes, refocus the four existing lessons, author roles across all Stage 6 relationships, select L4/5 vocabulary semantically, budget examples/contexts/dialogues, and propose a linear prerequisite delta. It must remain a design review until separately approved.

## Safety confirmation

This task added only `docs/POST-STAGE5-COVERAGE-AUDIT-01.md`. It did not modify curriculum source, canonical content, examples, lesson links, roles, prerequisites, application code, migrations, local or remote D1, learner state, branches, or deployments. No commit was created and Stage 6 implementation was not started.
