# Phase 3.5E.1C Remote Staging Report

Status: PASS

## Isolated staging

- Worker: `ej-learning-35e1c`
- Final URL: `https://ej-learning-35e1c.yanjian-language-learning.workers.dev`
- Current Worker version: `4caa1251-b715-4195-87a9-c3534f358e04`
- Remote D1: `ej-learning-35e1c-db`
- Remote D1 ID: `cc71642a-13e5-4a94-92c9-34372d8cbf3b`
- D1 region: OC; verification served from AKL
- Active lesson bundle: `phase-35e1c-v2` / `3.5E.1C.1`
- Production deployment: not run

## Remote/local data parity

| Metric | Local final | Remote staging | Match |
| --- | ---: | ---: | --- |
| English vocabulary | 435 | 435 | YES |
| Japanese vocabulary | 450 | 450 | YES |
| English grammar | 83 | 83 | YES |
| Japanese grammar | 98 | 98 | YES |
| Lessons | 64 | 64 | YES |
| Active bundle lessons | 64 | 64 | YES |
| Active bundle links | 853 | 853 | YES |

The 16 new lessons are visible in Learning Path. All 16 return canonical content remotely; each has 4–6 vocabulary items, 2 grammar items, and a six-turn dialogue.

## Migration chain

The fresh remote D1 received the 20-migration 3.5D base, then the complete additive sequence below. Every configured migration directory now reports `No migrations to apply`.

- 3.5E.1A: `087723731ca86087105927d966361fa2ba49b7256a85da2bec0b8ec3f4d485f4`
- 3.5E.1A.1: `2ee0234fd8d80768aa8d72d705ad7caddfaaae2fc314b923f9a0af6c0f8e179b`
- 3.5E.1A.2: `6dc32d01505953187bff5159eb1bc0105d364e61fd4ba139ceb67059a2ef4ef2`
- 3.5E.1B: `599ab3d439fb32c7db1ddaf07701dbd5cf6a69c4258d5d5b057842567fc41520`
- 3.5E.1C 0001: `8fc3512f562dcac8d17a15f862af7b621e4b6797ba7d1bce1f5346ae8210ce83`
- 3.5E.1C 0002: `198fdf8cee851f65e629bce2b243b5f5ecd94a9d187f9847b24d85d425c33fb8`
- 3.5E.1C 0003 target-fidelity corrective: `25a99356b78b71eb85e757ff36b17578c567c116668595476cc0ffbcfc5a35cc`
- 3.5E.1C 0004 IELTS discovery corrective: `5e4db22bf2e1335c85a598f1255261b6d89f358216e1de7d5b904e5e2c626364`
- 3.5E.1C 0005 JLPT discovery corrective: `2f01487b9489d1770bcf12831deef9b40df58b2781a4024576a75d624f096165`

The two staging-acceptance corrections are additive editorial discovery alignments and explicitly state that they are curriculum recommendations, not official IELTS/JLPT word lists. No historical migration was edited.

## Vocabulary acceptance

- IELTS 6.5 Vocabulary: 24 remotely browsable entries, increased from the old staging's 4.
- IELTS rows: compact headword / POS / short meaning; no IPA or examples in the outer list.
- IELTS POS: no Japanese-only POS; cross-language POS is rejected server-side.
- IELTS A–Z: 27 keyboard-accessible A–Z/# controls; `A` filtering verified remotely.
- JLPT rows: compact `headword（reading） / POS / short meaning`.
- JLPT POS: Japanese taxonomy with no English-only leakage.
- JLPT 五十音: 11 controls; remote UI and API verified.
- `予定（よてい）` -> N4 / や行: PASS.
- `サイズ（さいず）` -> N4 / さ行: PASS.
- `確認する（かくにんする）` -> N3 / か行: PASS.
- Detail overlay: IPA/reading, meanings/usages and examples appear only after opening a row.
- Back/Close: URL group, filter, loaded count, focus, and scroll restoration passed.
- Bounded pagination and mocked 5,000-item rendering passed.

## Learning Path samples

### English

- `en-s2-l5` — 在超市找货并结账: aisle / checkout counter / receipt / out of stock; some/any plus WH-question support; 6 turns.
- `en-s3-l6` — 在药房或诊所说明症状: fever / cough / dizzy / pharmacy / prescription; should plus since/for support; 6 turns.
- `en-s4-l5` — 租房、报修与房东沟通: landlord / rent / maintenance / leak / repair request; perfect-vs-past plus obligation support; 6 turns.

### Japanese

- `ja-s2-l6` — 店で注文し、希望を伝える: アレルギー / 原材料 / 会計 / 抜き / 別々; counters plus request support; 6 turns.
- `ja-s3-l6` — 薬局・病院で症状を説明する: 発熱 / 咳 / めまい / 薬局 / 処方箋; から/ので plus advice support; 6 turns.
- `ja-s4-l5` — 賃貸・修理について相談する: 大家 / 家賃 / 修理 / 水漏れ / 管理会社; 〜んです/〜んですが plus obligation support; 6 turns.

## Dynamic Examples and regression

- New Worker has its own `DEEPSEEK_API_KEY` secret; only the secret name was inspected.
- A real remote English request returned five examples with HTTP 200.
- A real remote Japanese request returned five examples with HTTP 200.
- Phase 3.5E.1C remote API: 4/4 PASS.
- Phase 3.5E.1C remote browser: PASS at 360, 390, 430, 768 and 1440 px.
- Remote pre-existing API regression: 10/10 PASS.
- Local full regression including Dynamic Examples guards: 24/24 PASS.
- Phase 3.5D.1 remote responsive/Dynamic Examples UI regression: PASS at all five widths.
- Final curriculum audit: 0 errors, 0 warnings.

## Isolation evidence

- `ej-learning-35d1` remains on version `3538ae36-0efa-42ed-9d1c-2f3a25f8cd6b`, created 2026-09-10; no new deployment was created.
- Production `ej-learning` remains on version `19a090dc-4321-46af-a7cc-33995746dc10`, created 2026-09-08; no new deployment was created.
- No old D1 binding or route was used by the new Worker.

## Final

REMOTE 3.5E.1C STAGING CREATED = YES

URL = https://ej-learning-35e1c.yanjian-language-learning.workers.dev

REMOTE D1 = ej-learning-35e1c-db / cc71642a-13e5-4a94-92c9-34372d8cbf3b

REMOTE DATA MATCHES LOCAL 3.5E.1C = YES

COMPACT VOCABULARY LIST LIVE = YES

IELTS POS LEAK FIX LIVE = YES

ENGLISH A-Z LIVE = YES

JAPANESE GOJUON LIVE = YES

NEW VOCABULARY LIVE = YES

NEW GRAMMAR LIVE = YES

NEW LESSONS LIVE = YES

OLD STAGING CHANGED = NO

PRODUCTION CHANGED = NO

PHASE 4 STARTED = NO
