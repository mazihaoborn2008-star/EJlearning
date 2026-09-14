# Content Quality Audit 02 — Japanese Grammar Modeling

Date: 2026-09-14

Baseline: pushed `main` at `6c8288bc2048d8ad7a94d018671fe269d386c470`

Hotfix branch: `hotfix/content-quality-02`

Scope: local canonical-content and practice-eligibility cleanup only. Curriculum Expansion 01 links and prerequisite changes are not implemented here.

## Outcome

- Keep `35e1c-ja-counter-system` as assessable grammar and replace its raw-English authoritative form with `数 + 助数詞`.
- Keep `35e1c-ja-condition-contrast` as a readable comparison overview, correct the malformed notation, and remove it from every authoritative practice path.
- Keep `35e1c-ja-workplace-register` as a readable register overview and remove it from every authoritative practice path.
- Preserve all three IDs, examples, sentence links, active lesson links, attempts, progress, SRS fields, and completed lesson evidence.
- Exclude the two overview IDs from standalone and lesson practice, direct legacy attempt creation, controlled completion, weakness recommendations, review counts, and review queues.
- Keep overview detail pages available, but replace their “开始练习” control with an explicit “非评测概览” notice.
- Apply the ten explicit Curriculum Expansion 01A human decisions without adding curriculum links.

## Authority path before the hotfix

Phase 4E treated every published grammar row as eligible for `grammar_form_selection` and `grammar_form_recall`. A controlled-completion exercise was additionally possible when a published sentence-grammar link supplied one unique `displayed_form`. The authoritative grader compared the sealed exercise answer against `v2_grammar_points.form_name`, or against the exact authored `displayed_form` for controlled completion.

The legacy attempt endpoint also accepted any published grammar ID and graded directly against `form_name`. Phase 4C joined due `grammar_progress` rows to published grammar, while Phase 4D separately filtered known retired IDs. Therefore a published overview needed one shared explicit practice policy; correcting page text alone would not make it safe.

## Primary canonical records

### `35e1c-ja-counter-system`

Canonical title: `助数詞：人・本・枚・個・つ`

Before:

- `form_name`: `number + counter`
- `formula`: `人: ひとり/ふたり；本・枚・個・つ`
- `core_zh`: 根据人或物的形状/类别选择助数词，并注意读音变化。
- `purpose_zh`: 在购物、餐厅和预约中准确计数。
- `when_zh`: 购买、人数、份数和物品数量。
- `mistakes_zh`: 不要对所有东西都只用個。
- `nuance_zh`: 不知道专用量词时，つ可数部分一般物品到十。

The concept is valid. All four examples instantiate real counter use: `二人`, `二本`, `三枚`, and `四つ`. Its one authored sentence occurrence is `二本` in the supermarket corrective dialogue.

Before the fix a learner could receive:

- form selection with authoritative answer `number + counter`;
- typed form recall requiring exactly `number + counter` under Japanese normalization;
- controlled completion with exact authored answer `二本`.

Final model:

- `form_name`: `数 + 助数詞`
- `formula`: `数 + 人／本／枚／個／つ`
- publication remains `published`;
- selection, recall, and safe authored controlled completion remain eligible.

This fixes canonical data, not only rendering.

### `35e1c-ja-condition-contrast`

Before:

- title: `条件の「なら・たら・ば・と」`
- `form_name`: `N/普通形なら；た形ら；ば形；辞書形と`
- `formula`: `なら/たら/ば/と + result`
- purpose: compare premise source, sequence, and result properties across four condition systems.

The four examples separately instantiate `なら`, `たら`, `ば`, and `と`. The record therefore describes a useful comparison, but not one target form. Narrow published records already exist: `ja-nara`, `ja-tara`, `ja-ba-condition`, and `ja-to-condition`.

Before the fix a learner could be asked to select or type the entire malformed multi-system string. Its corrective-dialogue occurrence `直らなければ` also made controlled completion possible, even though the record's canonical form covered four different answers.

Final model: option A, a non-assessed overview.

- title: `条件の「なら・たら・ば・と」比較（概要）`
- `form_name`: `なら・たら・ば・と（比較概要）`
- `formula`: `普通形 + なら；た形 + ら；ば形；普通形 + と`
- remains published and readable;
- has no form selection, form recall, controlled completion, weakness, or SRS review eligibility;
- narrow records remain the authority for future form practice.

The historical ID is not deleted, and this is more than changing `た形ら` to `た形 + ら`.

### `35e1c-ja-workplace-register`

Before:

- title: `職場の敬体・尊敬語・謙譲語切り替え`
- `form_name`: `です/ます；お/ご〜になる；お/ご〜する`
- `formula`: `polite / honorific / humble by actor`
- purpose: choose polite, honorific, or humble register according to actor and relationship.

Its four examples cover different systems: honorific `お帰りになりました`, humble `ご説明します`, lexical humble `確認いたします`, and polite request `お待ちください`. No sentence-grammar occurrence supplies controlled completion, but form selection and typed recall were available. A learner could not reasonably produce one target form for the title.

Specific published records already include `ja-polite-present`, `ja-honorific`, `ja-humble`, `ja-honorific-request`, and `ja-te-itadaku`.

Final model: a non-assessed overview.

- title: `職場の敬体・尊敬語・謙譲語（概要）`
- `form_name`: `敬体・尊敬語・謙譲語（使い分け概要）`
- `formula`: `です／ます；尊敬語；謙譲語`
- remains published and readable;
- has no authoritative exercise, weakness, or review eligibility.

No fake unified form is introduced.

## Active lesson impact

The seven active links are preserved exactly:

| Record | Active lessons | Existing role |
|---|---|---|
| `35e1c-ja-counter-system` | `ja-s2-l5`, `ja-s2-l6` | required in both |
| `35e1c-ja-condition-contrast` | `ja-s3-l5`, `ja-s3-l7`, `ja-s4-l6` | support in all three |
| `35e1c-ja-workplace-register` | `ja-s3-l8`, `ja-s4-l6` | required in both |

Counter remains assessable. The other five links remain visible as overview/support material but are removed from the lesson practice curriculum and completion evidence. Existing completed lessons are grandfathered and unchanged. No replacement lesson link is introduced in this hotfix.

The affected lessons still have at least five assessable vocabulary/grammar items in the current curriculum. Expansion 01A's revised plan later reaches 9–11 assessable items in each affected final configuration.

## Historical learner-data safety

There is no separate SRS table. SRS state is stored in `grammar_progress` through `review_stage`, `review_count`, `lapse_count`, `last_reviewed_at`, `next_review_at`, and `current_interval_seconds`.

Historical references are retained in:

- `learning_attempts.content_type='grammar'` plus `content_id`;
- `grammar_progress.grammar_id`;
- `lesson_progress`, including already completed lessons;
- `lesson_bundles` / historical lesson-item identities;
- grammar examples and sentence-grammar links.

The migration performs only targeted `UPDATE` statements on the three canonical rows. It does not delete or rewrite learner evidence. Recent-progress reads can still expose historical rows. New practice sessions, direct attempts, due review, review summaries, and weakness recommendations reject or omit overview-only IDs. This prevents ghost review without destroying history.

## Practice eligibility after the hotfix

| Record | Form selection | Form recall | Controlled completion | Lesson practice | Weakness / review |
|---|---:|---:|---:|---:|---:|
| counter-system | yes | yes | yes, authored `二本` | yes | yes |
| condition-contrast overview | no | no | no | no | no |
| workplace-register overview | no | no | no authored occurrence | no | no |

The Phase 4E grader, normalization, answer sealing, and accepted-answer policy are unchanged. The fix changes content classification and eligibility only.

## Same-pattern scan

The published English and Japanese grammar corpus was scanned after applying the Hotfix 01 correction overlay for:

- raw English metalanguage in Japanese learner-facing fields;
- malformed fragments such as `干` and `た形ら`;
- semicolon/slash-separated multi-system answers;
- category or prose labels that cannot reasonably be recalled as one grammar form.

No additional record was changed automatically. The following are `NEEDS CONTENT REVIEW`, not confirmed defects:

- Japanese generated comparison/system records: `35e1c-ja-movement-particles`, `35e1c-ja-adjective-tense`, `35e1c-ja-permission-prohibition`, `35e1c-ja-giving-receiving`, `35e1c-ja-obligation-contrast`, and `35e1c-ja-kara-node-contrast`.
- Japanese formulas containing English structural labels: `35e1c-ja-te-sequence`, `35e1c-ja-comparison-system`, `35e1c-ja-experience-system`, `35e1c-ja-explanatory-nodesu`, `35e1c-ja-sentence-final-softeners`, `ja-ba-condition`, `ja-kamoshirenai`, `ja-node`, `ja-te-iru`, `ja-tsumori`, and `ja-n-desu-ga`.
- English contrast or slash-separated records such as `35e1c-en-negation-short-answers`, `35e1c-en-past-questions-negatives`, `35e1c-en-some-any`, `en-would-like`, and `en-relative-clause`.

Slash or multiple forms are not inherently invalid: a clearly titled contrast record may be defensible. Changing terminology or restricting its modes requires content review of the intended teaching unit and examples. The three primary records had direct evidence and were the only high-confidence changes in this hotfix.

## Curriculum Expansion 01A decisions

The planning matrix retains the original rows and records the new decision beside each one.

Approved:

- `ja-c-663` in `ja-s3-l5`, role `SUPPORT`.
- `legacy-167-ja` in `ja-s3-l7`, role `NEW`; later use is planned as `REVIEW`.

Deferred and removed from Expansion 01A:

- `en-c-969` in `en-s2-l5`;
- `35e1c-en-v089` in `en-s3-l7`;
- `ja-c-971` in `ja-s2-l5`;
- `en-present-perfect` in `en-s3-l6`;
- `en-not-quite` in `en-s3-l8`;
- `ja-indirect-ka` in `ja-s3-l8`;
- `legacy-52-en` in `en-s4-l5`;
- `legacy-76-ja` in `ja-s2-l5`.

Revised proposal totals:

| Type | English | Japanese | Total |
|---|---:|---:|---:|
| Vocabulary additions | 22 | 24 | 46 |
| Grammar additions | 6 | 7 | 13 |
| Expression additions | 23 | 23 | 46 |
| All additions | 51 | 54 | 105 |

With 127 current links, the revised planning total is 232. Seven lessons are below the original 8/3/4 link target. `ja-s3-l8` and `ja-s4-l6` are below 10 assessable items at 9 each because overview records are intentionally non-assessed; both remain safely above the Phase 4E completion requirement.

## Files and validation contract

- Canonical delta policy: `src/content-quality-02.js`
- Additive local migration: `migrations-content-quality-02/0001_content_quality_hotfix_02.sql`
- Focused regression: `tests/content-quality-hotfix-02.test.js`
- Updated planning history: `docs/CURRICULUM-EXPANSION-01A-MATRIX.md`

The hotfix is local-only. It does not add curriculum links, alter prerequisites, create canonical records, write remote D1, or deploy a Worker.
