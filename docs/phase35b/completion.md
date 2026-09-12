# Phase 3.5B — Product UI V2 completion report

Product UI V2 presents Vocabulary, Grammar and Sentences/Expressions as distinct, connected learning systems. The isolated staging root is the new UI; the original Phase 3 application remains usable at `/legacy/`.

[Open Phase 3.5B staging](https://ej-learning-35b.yanjian-language-learning.workers.dev) · [Architecture and API notes](architecture.md) · [Safe runbook](runbook.md) · [Visual review](visual-review.md)

## Requested deliverables

| # | Deliverable | Implementation / evidence |
|---|---|---|
| 1 | Product UI architecture | Chinese-first, three learning domains plus Academic, AI Preview and Progress; shared vanilla ES-module components and responsive design |
| 2 | Navigation | Five top-level destinations; mobile bottom navigation; three Learn tabs; stable query-string URLs |
| 3 | Pages created | Home, Vocabulary Library/Detail, Grammar Library/Detail, Sentence Library/Detail, Academic Hub, IELTS, JLPT, AI Preview, Progress: **12 pages** in `public-v2/`; legacy copied unchanged |
| 4 | Vocabulary Library | Independent EN/JA and Stage 1–6; meaning, IPA/reading and POS in cards; search and disclosed type/POS/register/topic filters; bounded pagination |
| 5 | Vocabulary Detail | Numbered senses, usage, examples/collocations/patterns where present, lexical confusion/relation cards, reverse expressions, academic reference and AI entry |
| 6 | Grammar Library | Independent EN/JA Level 1–6; Chinese title, target structure and communicative purpose; search |
| 7 | Grammar Detail | Core feeling, structure, when to use, examples, mistakes, nuance, suggested prerequisites/related contrasts and real expression links; no learning locks |
| 8 | Sentence Library | Life topics first; language path and Chinese search; compact optional type, vocabulary/grammar/overall difficulty filters |
| 9 | Sentence Detail | Chinese anchor/context first; independent expressions and difficulty; clickable chunks, reading/ruby, scenario variants, ordered dialogue, comparison and related expressions |
| 10 | Cross-domain navigation | Vocabulary → Sentence → Grammar → Sentence → Vocabulary, including a different Japanese Sentence; native preview links use actual V2 relationships |
| 11 | Academic Hub | Separate learning track with IELTS and JLPT entry; explicit separation from internal practical difficulty |
| 12 | IELTS | 5.0, 5.5, 6.0, 6.5, 7.0+ target navigation; Vocabulary/Grammar/Expressions; contextual Speaking/Writing/Hedging tags and valid empty targets |
| 13 | JLPT | N5–N1 reference navigation; Vocabulary/Grammar/Usage; practical Stage/Level displayed independently |
| 14 | Alignment schema | Additive 0009 adds frameworks, valid targets and one relational content-alignment table with exactly-one-domain reference and enforced language consistency |
| 15 | Provenance/editorial state | Draft/reviewed/verified support, basis/source/note/review timestamp; all eight sample references are explicitly **draft**, displayed “课程参考 · 待审” |
| 16 | AI Preview | Four functional preview modes, input task selection and fixed feedback component; clearly unconnected and ungraded |
| 17 | AI contextual entry | Vocabulary, Grammar and Sentence details pass type/ID/language; wrong-language context is rejected; no submission or external AI request |
| 18 | Progress V2 | EN/JA domain sections show 尚未独立评估; original real positioning/counts are separately labeled; existing state is only read, never migrated by V2 |
| 19 | Responsive verification | All 12 major pages tested at 360/390/430/1440; no horizontal overflow; required mobile/desktop screenshots visually reviewed |
| 20 | Accessibility-oriented checks | Headings/landmarks/labels, skip link, focus, dialog containment/return, Escape, touch dismissal, control height, loading and blocked storage; no certification claim |
| 21 | API/regression | 39 local tests and 21 staging API tests passed; V2 relationships, original placement/recommendation/checkpoint, state and browser regressions passed |
| 22 | Representative additions | Eight draft alignment rows; **one** semi-academic EN-only sentence/expression and four links to existing knowledge. No new vocabulary/grammar items or bulk content migration |
| 23 | Isolated Worker | `ej-learning-35b` |
| 24 | Isolated D1 | `ej-learning-35b-db` — `97d676a7-e4c7-4d9e-a863-17f096f5cb9c` |
| 25 | Staging URL | `https://ej-learning-35b.yanjian-language-learning.workers.dev` |
| 26 | Production integrity | `ej-learning` / `ej-learning-db`: before/after deployment, settings, schema, migrations, content/API hashes and route metadata unchanged |
| 27 | Phase 3 integrity | `ej-learning-phase3` / `ej-learning-phase3-db`: same before/after verification, unchanged |
| 28 | Phase 3.5A integrity | `ej-learning-35a` / `ej-learning-35a-db`: same before/after verification, unchanged |
| 29 | Deferred work | 3.5C editorial alignment review/bulk migration, 3.5D profiles/learning engine, Phase 4 real AI; none started |

## Database and API changes

All existing migrations 0001–0008 remain byte-identical in both their original streams and the isolated `migrations-35b/` stream. New migrations:

- `0009_academic_alignment.sql`: three small metadata tables, framework/target/language constraints, domain foreign keys, provenance and seven representative alignments.
- `0010_academic_expression_example.sql`: one cautious-opinion expression with existing vocabulary/grammar links and one alignment.

The complete database is built from scratch using all ten migrations. Migration reapplication is a no-op. D1 verifies no foreign-key violations and rejects **15 invalid writes**, including IELTS/JLPT cross-language assignment, multiple alignment targets and invalid exam targets.

Existing Vocabulary/Grammar/Sentence and reverse APIs remain compatible. Isolated 3.5B adds lightweight vocabulary meaning/pronunciation, grammar purpose and vocabulary topic filtering; all old V2 tests pass. Academic endpoints provide frameworks, V2 topics and paginated/filterable alignment data. SQL values are bound; all private sources/migrations/configs remain inaccessible.

Final sample size: **33 Vocabulary items, 19 Grammar points, 13 semantic units, 26 expressions, 38 vocabulary links, 29 grammar links, four dialogue turns, eight draft alignments**. Original **183 Concepts / 366 expressions** remain intact. The existing **51 review-required mapping items** are unchanged and unresolved.

## Verification evidence

| Scope | Evidence |
|---|---|
| Local combined schema, API, V2 and engine | [39 passing tests](local-api.txt) |
| Local new UI relationships/responsive | [Browser results](browser-local.json), [log](local-browser.txt) |
| Local accessibility | [Results](accessibility-local.json) |
| Local actual D1 | [Counts, migration tracking and negative probes](d1-local.json) |
| Staging APIs | [21 passing tests](staging-api.txt) |
| Staging new UI | [Browser results](browser-staging.json), [log](staging-browser.txt) |
| Staging keyboard/touch/accessibility | [Results](accessibility-staging.json), [log](staging-accessibility.txt) |
| Additional target/navigation audit | [All Stage/Level/target states and another-Sentence flow](navigation-audit-staging.json) |
| Staging actual D1 | [Counts, tracking, FK and 15 rejected invalid writes](d1-staging.json) |
| Original app regression | [Local browser](local-legacy-browser.txt), [staging browser](staging-legacy-browser.txt) |
| Original curriculum | [Staging audit: 183 Concepts, no errors](staging-curriculum.txt) |
| Environment protection | [Before](integrity-before.json), [after](integrity-after.json), [verified comparison and release binding](release-verification.json) |
| Deployment | [Migration log](staging-migrations.txt), [deployment log](staging-deploy.txt) |

All major UI pages have loading/error/retry handling where they depend on data. Empty filters/targets and missing IDs are checked. New UI browser checks record no page errors. Original regression includes independent EN/JA progress, legacy storage migration, adaptive placement, recommendation/checkpoint behavior, response-loss retry and unavailable storage. AI checks observe no request on input/demo submission and no external request on preview page load; CSP also restricts connections to self. No API key, model SDK or secret was introduced.

Protected-environment comparisons exclude transient assessment sessions because existing scheduled cleanup may legitimately change them. Content, schema, migration history, deployments/settings, GET APIs and route/domain metadata are compared. All pre-existing protected local files and original UI asset copies are byte-identical. No production route, custom hostname, DNS, Tunnel or rollback change was made. The new staging uses workers.dev only.

## Scope confirmations

- Vocabulary, Grammar and Sentences are visually distinct first-class learning systems.
- Practical Stage/Level and IELTS/JLPT alignment are separate dimensions.
- Exam UI does not claim official complete word/grammar lists or score guarantees.
- Vocabulary ↔ Sentence ↔ Grammar navigation works through real relationships.
- AI UI is a clearly marked preview and makes no AI calls or grading decisions.
- No learner-engine migration or curriculum bulk migration was performed.
- Production and both existing staging environments were not modified.
- Phase 3.5C, Phase 3.5D and Phase 4 were not started.

The deliberate limits are visible to learners: sparse representative content, draft academic references, unassessed domain profiles and fixed demonstration feedback. These are not hidden behind invented scores or fake live AI. Work stops after Product UI V2 and isolated staging verification.
