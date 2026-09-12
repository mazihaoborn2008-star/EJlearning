# Phase 3.5E.2 remote staging acceptance

- Worker: `ej-learning-35e2`
- URL: <https://ej-learning-35e2.yanjian-language-learning.workers.dev>
- Remote D1: `ej-learning-35e2-db` (`8788e336-dc89-4ad9-b0fc-c58ae577d777`)
- Worker version: `c31c6c7b-12bd-4915-b3cb-34732da7e3d7`
- Migration model: complete historical chain plus 27 additive Phase 3.5E.2 migrations

## Remote counts

- English vocabulary: 10,000 (9,565 imported; 435 existing)
- Japanese vocabulary: 8,235 (7,785 imported; 450 existing)
- English grammar: 83
- Japanese grammar: 98
- Published lessons: 64
- Existing curated vocabulary examples: 1,274
- Imported Phase 3.5E.2 examples: 0

IELTS cumulative course pools: 5.0 = 3,000; 5.5 = 4,000; 6.0 = 5,500; 6.5 = 7,000; 7.0+ = 10,000.

JLPT community/course estimate pools: N5 = 680; N4 = 675; N3 = 1,749; N2 = 1,833; N1 = 3,298.

## Remote data QA

- Missing meaning: 0
- Missing POS: 0
- Missing Japanese reading: 0
- Duplicate normalized language + lemma + POS rows: 0
- Imported example rows: 0
- Missing imported English IPA: 217 (source-data warning; IPA is omitted in detail rather than invented)
- Pre-existing multi-POS homographs: 4 (`help`, `plan`, `rain`, `work`)

English A-Z counts: A 704; B 506; C 1,011; D 605; E 470; F 444; G 295; H 341; I 444; J 105; K 61; L 330; M 509; N 208; O 240; P 806; Q 37; R 598; S 1,095; T 505; U 202; V 169; W 271; X 1; Y 33; Z 10.

Japanese gojuon counts: あ行 1,131; か行 1,718; さ行 1,644; た行 1,205; な行 379; は行 1,070; ま行 547; や行 296; ら行 178; わ行 67; その他 0.

## Remote functional QA

- API test: 4/4 passed against the public Worker.
- Browser QA: passed at 360, 390, 430, 768, and 1440 px.
- Compact list: passed; row contains only headword/reading, compact POS, and short meaning.
- Detail: passed; senses and optional pronunciation/examples load only after opening a row.
- Pagination: server-side, 24 initial rows, bounded at 500 rendered rows.
- IELTS/JLPT POS language scoping: passed.
- A-Z and gojuon navigation: passed, including `予定` → や行, `サイズ` → さ行, `確認する` → か行.
- Dynamic Examples route: retained; GET correctly returns 405 and the new Worker has its own `DEEPSEEK_API_KEY` binding.
- Old Phase 3.5E.1C D1 remains at 435 English / 450 Japanese entries and 1,274 curated examples.

## Rejection and preservation audit

- English duplicate/inflected collisions rejected: 54,969.
- Japanese normalized/existing collisions rejected: 494.
- Malformed or required-field-invalid source rows rejected: 640,798.
- Existing curated item, sense, and example snapshots matched before/after locally; remote curated example count remains 1,274.
- No learner-engine, learner-progress, production, or Phase 4 changes.

See `ATTRIBUTION.md` and `source-import-audit.json` in this directory for pinned sources, licenses, hashes, transformations, and detailed distributions.
