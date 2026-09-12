# Product UI V2 — Phase 3.5B

## Product structure

The Chinese-first product treats Vocabulary, Grammar and Sentences as three separate learning systems, connected by the actual V2 knowledge relationships. Navigation has five destinations: 首页、学习、学术 / 考试、AI 学习、我的学习. Desktop uses a header navigation; mobile uses five bottom destinations. 学习 contains 词汇、语法、句子与表达 tabs. All pages share a calm green/neutral palette, typography, spacing, borders, badges, cards and dialogs; small domain cues distinguish vocabulary, grammar and expressions.

The staging root showcases the new Home. The entire original static application is copied unchanged to `/legacy/`, retaining original relative navigation and same-origin `/api` calls. Original files under `public/`, original Worker modules, learner state, engine, V2 schema and all old deployment configs are preserved. Product UI V2 does not load the legacy state writer: it only reads existing keys defensively for clearly labeled summaries.

## Pages and behavior

| Page | Learning experience |
|---|---|
| `/` / `index.html` | Chinese-first introduction, API-backed bilingual sample, three prominent learning-domain cards, separate English/Japanese summaries, original continue link, Academic and AI entries |
| `vocabulary.html?lang=en&stage=3` | Independent language and Stage 1–6, meaning/pronunciation/POS in cards, search, optional type/POS/register/topic filters, pagination |
| `vocabulary-detail.html?id=en-expect` | Distinct senses with usage/override rationale, examples, collocations/patterns where present, lexical relation cards, reverse expressions, alignment and AI entry |
| `grammar.html?lang=ja&level=3` | Independent language library, Level 1–6, Chinese title, target form and communicative purpose, search |
| `grammar-detail.html?id=ja-te-iru` | Structured core/form/use/examples/mistakes/nuance, suggested prerequisites and related/contrast cards, reverse real expressions, academic and AI entries |
| `sentences.html` | Life topics first, language availability, search, progressively disclosed type and all three difficulty filters |
| `sentence.html?id=not-eaten` | Chinese semantic anchor first, independent EN/JA expressions, compact difficulty dimensions, optional reading/IPA, clickable visible chunks and vocabulary/grammar chips, comparison and same-topic expressions |
| `academic.html` | Separate IELTS and JLPT track entry; practical progression is explained independently |
| `ielts.html?target=6.5` | 5.0/5.5/6.0/6.5/7.0+ target navigation with Vocabulary/Grammar/Expression sections |
| `jlpt.html?level=N4` | N5/N4/N3/N2/N1 navigation with Vocabulary/Grammar/Usage sections |
| `ai.html?type=grammar&id=en-present-perfect&lang=en` | Context-aware preview, four practice modes, local textarea and visibly fixed feedback example; no model, grading or submission |
| `progress.html` | Independent EN/JA domain sections marked unassessed; original real level/count labeled separately; links to original progress/placement/learning |

Empty higher Stage/Level and exam targets show honest empty states. No placeholder score or implied mastery is fabricated. URL parameters preserve library selections and pagination. Library responses remain bounded; vocabulary summary now includes its first Chinese meaning and pronunciation, and grammar summary includes its communicative purpose. Full detail is not fetched for every card. Reverse previews use the 3.5A compact endpoints and can load additional pages.

## Frontend and Worker organization

- `public-v2/shared.js`: navigation, safe text escaping, API transport with timeout, state read, badges, relationships, alignment display, reading renderer and accessible modal utilities.
- `public-v2/app.js`: page-specific views and local preview interactions, using the shared utilities.
- `public-v2/ui.css`: coherent responsive design, mixed-script typography, focus indicators and minimum form control hit areas.
- `scripts/pages-35b.js`: reproducible semantic HTML shells with Chinese page titles, skip link, main landmark and native dialog.
- `scripts/prepare-35b.js`: exact copy checks for 3.5A migration stream and original asset copies. Do not use it to overwrite custom V2 pages.
- `src/worker-35b.js`: isolated routing and CSP. Original API/engine requests delegate to the unchanged original Worker; original assets are served under `/legacy/`.
- `src/v2-35b.js`: a phase-owned copy of the V2 read handler with additive lightweight list fields and vocabulary topic filtering. Its relationship/detail behavior retains the original V2 contract. Keep this compatibility copy covered by the existing V2 API tests; a future shared refactor needs its own regression review.
- `src/academic-35b.js`: bounded read-only academic reference endpoints. No write or learner-profile API exists.

Vanilla ES modules continue the existing frontend approach; no framework, package dependency, external font, image service, AI SDK or secret is added. Only the new public asset directory is deployed. UI CSP restricts network connections and scripts to self. The original legacy pages retain same-origin inline **styles** for their existing progress bar rendering; inline scripts remain disallowed.

## Relationship interaction

Sentence links use the existing literal chunk + occurrence metadata. Overlapping vocabulary/grammar spans are merged into one clickable visible region; its preview lists the actual matched knowledge links with Chinese meaning or sentence-specific grammar note. Each preview offers a full Vocabulary/Grammar detail link. Separate labeled knowledge chips remain available, making dense Japanese chunks easy to access by touch.

Native dialogs have a named heading, explicit close control, Escape dismissal, keyboard focus wrapping/return and inert background via `showModal`. No hover-only action exists. Japanese reading sections render ordered ruby segments without offset manipulation. Dialogues use ordered speaker rows, not an AI-chat simulation; the current sample has two turns per language and the renderer supports additional ordered turns. Scenario context appears before response variants. Grammar lessons stay authoritative in the library; Sentence previews never copy full independent lessons.

## Academic alignment metadata

`migrations-35b/0009_academic_alignment.sql` adds three small tables:

1. `v2_alignment_frameworks`: IELTS/en and JLPT/ja with the learner-facing reference notice.
2. `v2_alignment_targets`: five valid targets for each framework and ordering.
3. `v2_content_alignments`: one reference to a Vocabulary item, Grammar point **or language expression**, framework+target, language, relevance, context tags, editorial status, basis/source fields and optional review timestamp.

A single table serves all domains using three nullable foreign-key columns and an exactly-one-target CHECK. Composite foreign keys enforce target language and framework language. The shared Sentence unit is not the target: an alignment attaches to the actual expression, preventing an IELTS reference on an English expression from appearing on the Japanese expression. Uniqueness prevents duplicate target references. Browse and reverse-owner indexes support the actual queries.

`draft`, `reviewed` and `verified` are supported; reviewed/verified require a timestamp. Every seeded alignment is **draft**, with an explicit internal editorial-demo basis and note. UI wording is “课程参考 · 待审”; nothing claims official review, a complete official word/grammar list or guaranteed score. Source basis stays in a small expandable section. Stage/Level remains visible separately.

Read endpoints:

- `/api/v2/academic/frameworks` — framework notices and available target rows.
- `/api/v2/academic/topics` — existing V2 topics for library filters.
- `/api/v2/academic/alignments?framework=IELTS&target=6.5` — bounded reference cards; supports domain, id, limit (1–100), offset. `domain=sentences&id=...` finds alignments of that unit's published expressions.

Publication filtering excludes unpublished target records/expressions/units. Unknown/mismatched targets return 400; valid targets with no alignment return an empty data array. Internal difficulty fields are read from authoritative domain records, never rewritten by alignment metadata.

## Representative additions

0009 adds seven alignment rows and no learning content. `0010_academic_expression_example.sql` adds **one** semi-academic EN-only semantic unit/expression with two existing Vocabulary links (help, expect) and two existing Grammar links (might, simple present), plus one alignment:

> 这个方法可能有帮助，但我预计会有实际困难。  
> This approach might help, but I expect practical difficulties.

The situation is discussion of a proposed approach; the target reference is IELTS-oriented 6.5, draft. Difficulty is vocabulary 4 / grammar 3 / overall 4. No Japanese counterpart is fabricated. This demonstrates realistic cautious opinion with bidirectional knowledge navigation. There are now 13 semantic units, 26 expressions, 33 vocabulary items, 19 grammar points and eight draft alignment rows. The original 183 Concepts and all 51 review-required mapping decisions are unchanged.

## AI preview and learner state boundary

Four modes are 自由造句、情境回答、表达优化、词汇 / 语法问答. Context can originate from Vocabulary, Grammar or Sentence, with independent language validation. Context-specific prompt buttons change the input task. Submitting only reveals fixed demonstration feedback with Meaning/Grammar/Naturalness/Register/Vocabulary/Suggested revision/Explanation. It makes no fetch, scoring decision, timer pretending to think, persistence or network request. The fixed feedback explicitly says it is unrelated to the input and remains an English teaching example even when the current context is Japanese; it demonstrates component shape, not contextual feedback generation.

Home/Progress defensively read the existing `kotoba.phase3.v1` or recovery key, never write either key. New domain fields are marked 尚未独立评估. The original app remains responsible for its existing migrations and progress updates. No new goals are saved, no domain mastery is inferred, and no placement, recommendation or checkpoint algorithm changes exist.

## Deliberate limitations and future phases

This is a representative UI, not a finished exam curriculum. Unfilled targets and levels remain empty. Academic classifications need editorial review in 3.5C; the existing 51 flagged Concepts remain unresolved. Profile calculations/transfer and learning-engine adaptation belong to 3.5D. Real AI requests, grading, contextual feedback and model infrastructure belong to Phase 4 and have not been started. Accessibility-oriented checks cover practical keyboard/touch/structure behavior, not WCAG certification or exhaustive assistive-technology support.
