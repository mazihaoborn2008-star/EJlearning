# Phase 3.5E.1C Final Report

Status: PASS

Execution scope: isolated local D1 copy at `.wrangler/phase35e1c-release-final-2`; no production deployment was run.

## Curriculum Expansion

- EN vocab added: 90
- JA vocab added: 100
- EN grammar added: 10
- JA grammar added: 16
- EN lessons added: 8
- JA lessons added: 8
- Existing lessons restructured: 8 (EN 5, JA 3)
- Curated vocabulary usages/examples added: 190
- Curated grammar examples added: 104
- Active lesson bundle: `phase-35e1c-v2` / schema `3.5E.1C.1`

All 16 new lessons contain at least four vocabulary items, at least two grammar items, and a linked six-turn dialogue. Required, support, and exposure roles remain distinct.

## Vocabulary UX

- Compact row: PASS. The index renders headword, compact POS, and short meaning only.
- EN example: `choice    n.    选择`
- JA example: `予定（よてい）    名詞    计划；安排`
- Detail overlay: PASS. IPA/reading, full meaning, POS, curated usage, collocations/examples/contrasts, and useful relations remain in the detail view.
- State restore: PASS. URL/query, alphabet/kana section, filters, loaded count, and scroll position are restored after closing the detail view or browser-back.
- Scalability: PASS. Search/filtering stays server-side; the API limit is bounded to 100, the UI initially renders 40 rows, and Load More adds bounded pages. A mocked 5,000-item result rendered 40 then 80 rows, not the entire result set.

## POS Filter

- IELTS Japanese POS leak: FIXED. IELTS rejects Japanese-only POS in the API and never offers them in the UI.
- JLPT taxonomy: PASS. Japanese POS remains available without English-only taxonomy leakage.
- Server-side language scope: PASS. Vocabulary and exam queries require/apply language scope; cross-language POS returns a validation error.
- Regression: PASS.

## Alphabetical Browsing

- English A-Z: PASS. A-Z plus `#`, normalized-headword grouping, keyboard-accessible 44px targets, mobile horizontal scrolling, and coexistence with search/filter.
- Japanese 五十音: PASS. Reading-based あ/か/さ/た/な/は/ま/や/ら/わ/その他 grouping and reading sort; katakana is normalized for group selection.
- Reference checks: `予定` -> や行, `サイズ` -> さ行, `確認する` -> か行.
- Missing reading handling: entries go to その他 and produce an audit warning. Current published missing-reading count is 0, so final warnings are 0.

## Lesson Samples

### English 1 — en-s2-l5 / supermarket checkout

- Vocabulary: aisle, checkout counter, receipt, out of stock
- Grammar: some/any (required), WH questions (support)
- Dialogue (6 turns):
  1. Excuse me, where can I find the oat milk?
  2. It is in aisle six, next to the cereal.
  3. Thank you. Is this brand on sale today?
  4. Yes. The discount will appear at the checkout.
  5. Great. Can I pay by card and get a receipt?
  6. Of course. Please tap your card here.

### English 2 — en-s3-l6 / clinic or pharmacy

- Vocabulary: fever, cough, dizzy, pharmacy; prescription (support)
- Grammar: should/should not (required), since/for (support)
- Dialogue (6 turns):
  1. What seems to be the problem?
  2. I’ve had a sore throat since Monday, and I had a fever last night.
  3. Are you having any trouble breathing?
  4. No, but it hurts when I swallow.
  5. All right. I’ll examine your throat first.
  6. Okay. Thank you.

### English 3 — en-s4-l5 / renting and repair

- Vocabulary: landlord, rent, maintenance, leak; repair request (support)
- Grammar: present perfect vs past (required), obligation contrast (support)
- Dialogue (6 turns):
  1. There’s water leaking under the kitchen sink.
  2. Is it a slow drip or a steady flow?
  3. It’s a steady flow, so I’ve turned the water off.
  4. Good. I’ll send someone within an hour.
  5. Do I need to stay home?
  6. Yes, please. The plumber will call before arriving.

### Japanese 1 — ja-s2-l6 / restaurant and allergy

- Vocabulary: アレルギー, 原材料, 会計, 抜き; 別々 (support)
- Grammar: counters (required), request pattern (support)
- Dialogue (6 turns):
  1. ご注文はお決まりですか。
  2. もう少しです。このカレーにピーナッツは入っていますか。
  3. ソースには入っていますが、トマトスープには入っていません。
  4. では、スープをお願いします。
  5. かしこまりました。ピーナッツアレルギーがあることも伝えます。
  6. ありがとうございます。助かります。

### Japanese 2 — ja-s3-l6 / clinic

- Vocabulary: 発熱, 咳, めまい, 薬局; 処方箋 (support)
- Grammar: から/ので (required), ほうがいい (support)
- Dialogue (6 turns):
  1. 今日はどうされましたか。
  2. 月曜日から喉が痛くて、昨夜は熱もありました。
  3. 息苦しさはありますか。
  4. いいえ。でも、飲み込むと痛いです。
  5. わかりました。まず喉を診ますね。
  6. わかりました。ありがとうございます。

### Japanese 3 — ja-s4-l5 / renting and repair

- Vocabulary: 大家, 家賃, 修理, 水漏れ; 管理会社 (support)
- Grammar: 〜んです/〜んですが (required), obligation contrast (support)
- Dialogue (6 turns):
  1. 台所の流しの下から水が漏れています。
  2. 少しずつですか。それとも、ずっと流れていますか。
  3. ずっと流れていたので、水を止めました。
  4. ありがとうございます。一時間以内に修理の者を向かわせます。
  5. 家で待っている必要がありますか。
  6. はい。到着前に担当者から電話します。

## Data and Migrations

- `0001_curriculum_gap_filling_lesson_bundle.sql`: `8fc3512f562dcac8d17a15f862af7b621e4b6797ba7d1bce1f5346ae8210ce83`
- `0002_lesson_bundle_version.sql`: `198fdf8cee851f65e629bce2b243b5f5ecd94a9d187f9847b24d85d425c33fb8`
- `0003_lesson_target_fidelity_corrective.sql`: `25a99356b78b71eb85e757ff36b17578c567c116668595476cc0ffbcfc5a35cc`
- `0004_ielts65_vocabulary_discovery_corrective.sql`: `5e4db22bf2e1335c85a598f1255261b6d89f358216e1de7d5b904e5e2c626364`
- `0005_jlpt_vocabulary_discovery_corrective.sql`: `2f01487b9489d1770bcf12831deef9b40df58b2781a4024576a75d624f096165`

The third migration is an additive correction for four lesson/dialogue target mismatches. The fourth and fifth are additive staging-acceptance discovery alignments and explicitly avoid claiming an official IELTS/JLPT word list. No applied migration was edited. Historical 3.5E.1A, 1A.1, 1A.2, and 1B hashes all match their recorded values.

## QA

- Duplicates rejected: 23
- Semantic invalid rejected: 7
- QA errors: 0
- QA warnings: 0
- Phase 3.5E.1C API tests: 4/4 passed
- Existing API regression: 24/24 passed
- Vocabulary UX/browser QA: passed at 360, 390, 430, 768, and 1440px
- Existing responsive regression: passed at 360, 390, 430, 768, and 1440px
- Worker deployment dry-run: passed
- Production deployment: not run

## Changes

- Learner engine changed: NO
- Learner progress changed: NO
- AI Dynamic Examples changed: NO
- Production changed: NO
- Phase 4 started: NO

## Final Acceptance

PHASE 3.5E.1C = YES

CURRICULUM GAP FILLING = YES

EN VOCABULARY EXPANDED = YES

JA VOCABULARY EXPANDED = YES

EN GRAMMAR EXPANDED = YES

JA GRAMMAR EXPANDED = YES

NEW LESSONS CREATED = YES

NEEDS-RESTRUCTURE LESSONS ADDRESSED = YES

IELTS POS LANGUAGE LEAK FIXED = YES

VOCABULARY COMPACT LIST = YES

ENGLISH A-Z BROWSING = YES

JAPANESE GOJUON BROWSING = YES

DETAIL STATE RESTORE = YES

LARGE VOCABULARY SCALABILITY = YES

LEARNER ENGINE CHANGED = NO

LEARNER PROGRESS CHANGED = NO

AI DYNAMIC EXAMPLES CHANGED = NO

PRODUCTION CHANGED = NO

PHASE 4 STARTED = NO
