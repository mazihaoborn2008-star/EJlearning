## 【Learner UI Cleanup】

removed learner-facing metadata: repeated IELTS/JLPT target badges, Stage/Level badges on exam cards, draft/review state, model-review copy, provenance, classification basis, per-item course-reference explanations, and Stage/Level methodology copy
remaining learner-facing metadata: headword/form/expression, pronunciation or reading, Chinese meaning/function, part of speech, and limited learning-use tags such as Speaking/Writing when useful; Stage/Level remains visible in the ordinary daily-learning path
exam disclaimer location: separate `/academic-about.html` page reached through the small “关于考试目标” link

## 【Academic Landing】

IELTS: direct 5.0 / 5.5 / 6.0 / 6.5 / 7.0+ selection
JLPT: direct N5 / N4 / N3 / N2 / N1 selection
removed methodology copy: YES
target selection: learner-first target buttons with no prerequisite explanation block

## 【Content Navigation】

Vocabulary tab: URL-addressable, keyboard-accessible, current-tab-only rendering
Grammar tab: URL-addressable, keyboard-accessible, current-tab-only rendering
Sentences/Expressions tab: URL-addressable, keyboard-accessible, current-tab-only rendering
all types stacked vertically: NO

## 【Scalability】

pagination/load more: 24-item initial batch and 24-item Load More batches; loaded count is retained in the URL state
search: server-side search within the selected exam target and current content type
filters: vocabulary part of speech; expression topic and type; no synthetic grammar category filter
lazy/current-tab rendering: only the selected content type is requested and rendered
large dataset behavior: bounded API requests and incremental DOM growth; mocked 48-record acceptance confirms 24 records initially and 48 only after Load More

## 【Vocabulary Card】

visible fields: headword, IPA/reading, first meaning, part of speech, and limited meaningful usage tags
removed fields: repeated exam target, Stage, course-reference/review badges, alignment explanation, provenance and classification details
first-screen learner focus: first real vocabulary card is visible immediately after compact target/tabs/search controls

## 【Detail UX】

detail type: native modal learner detail sheet over the exam list
explicit back/close: “← 返回词汇/语法/句子与表达” 44px control
Back: closes the detail and leaves the exact list DOM and scroll position intact
Forward: restores the same detail through History state
scroll restoration: exact (browser acceptance tolerance ≤2px)
search restoration: YES
filter restoration: YES
tab restoration: YES

## 【Grammar / Expressions】

Grammar: form, meaning/function, structure, usage conditions, examples and related grammar; searchable current-tab list
Expressions: complete expression/dialogue, meaning, context, linked vocabulary and grammar; searchable and filterable by real topic/type fields
detail behavior: same modal sheet and History behavior as vocabulary

## 【Theme Cleanup】

duplicate 身体状态 display labels: NO
resolution: `body` displays as “身体 / 身体部位”; `health` displays as “健康 / 身体状态”; stored topic data is unchanged

## 【Regression】

legacy content: PASS; byte-identical legacy assets and V2 curriculum/API regression
learner engine: unchanged; engine tests PASS
placement: unchanged; regression PASS
recommendation: unchanged; regression PASS
mastery: unchanged; regression PASS
checkpoint: unchanged; regression PASS
learning state: unchanged; no migration and browser storage compatibility PASS
AI Preview: unchanged; no-external-request regression PASS

## 【Responsive】

360: PASS
390: PASS
430: PASS
1440: PASS
overflow: none in tested learner routes and detail sheet
touch: 44px+ primary controls/tabs; native scrollable mobile sheet
keyboard: tab links, focus visibility, Enter navigation, native modal containment, Escape/Back/Forward behavior PASS

## 【Data】

migrations changed: NO; 16 files byte-identical to Phase 3.5C
curriculum content changed: NO; local and remote D1 match clean migration replay exactly across 29 tables
alignment status changed: NO; draft remains draft
learner progress migrated: NO

## 【Staging】

URL: https://ej-learning-35c1.yanjian-language-learning.workers.dev
D1: `ej-learning-35c1-db` / `3bf1fc19-e5ce-4521-b051-94f91fedfd82`
production changed: NO
existing staging changed: NO; Phase 3 / 3.5A / 3.5B / 3.5C deployment versions remain their recorded versions

## 【Conclusion】

PHASE 3.5C.1 LEARNER UX CLEANUP = YES
LEARNER UI METADATA CLUTTER REMOVED = YES
EXAM TARGET DUPLICATION REMOVED = YES
VOCABULARY / GRAMMAR / EXPRESSIONS SPLIT INTO NAVIGABLE SECTIONS = YES
VOCABULARY DETAIL RETURNS TO EXACT LIST STATE = YES
DETAIL HAS EXPLICIT BACK/CLOSE = YES
LARGE CONTENT SCALABILITY ADDRESSED = YES
EDITORIAL/AUDIT METADATA REMAINS AVAILABLE INTERNALLY = YES
CURRICULUM DATA CHANGED = NO
LEARNER ENGINE CHANGED = NO
LEARNER PROGRESS MIGRATED = NO
PRODUCTION CHANGED = NO
PHASE 3.5D STARTED = NO
PHASE 4 STARTED = NO
