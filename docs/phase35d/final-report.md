## 【Lesson Model】

tables:

| Layer | Fields / storage |
|---|---|
| Physical D1 | `lesson_bundles(id, schema_version, payload_json, published_at)` |
| Logical `lesson_units` | `id`, `language`, `stage`, `topic_id`, `title`, `objective`, `sequence`, `status`, `estimated_minutes` |
| Logical `lesson_items` | `lesson_id`, `content_type`, `content_id`, `role`, `sequence`, `required` |
| Logical `lesson_prerequisites` | `lesson_id`, `prerequisite_lesson_id` |
| Logical `lesson_exam_recommendations` | `framework_id`, `target`, `lesson_id`, `relevance` |

lesson fields: identity、language、Stage、topic、title、communicative objective、sequence、status、estimated minutes。

lesson item fields: Lesson ID、canonical content type、canonical content ID、role、sequence、required flag。没有复制 headword、grammar text 或 expression text。

required/support: `required` 是本课目标；`support` 是自然表达中出现但不要求当前掌握的内容；`exposure` 用于高于当前阶段的完整自然表达。高级内容的 required 数量为 0。

prerequisites: 同一语言按 Lesson 顺序保存建议先修关系；不用于伪造锁定或完成状态。

## 【Lesson Count】

English:
Stage 1: 4
Stage 2: 4
Stage 3: 4
Stage 4: 4
Stage 5: 4
Stage 6: 4

Japanese:
Stage 1: 4
Stage 2: 4
Stage 3: 4
Stage 4: 4
Stage 5: 4
Stage 6: 4

total: 48

## 【Lesson Examples】

| Language | title | objective | vocabulary | grammar | expressions | scenario/dialogue |
|---|---|---|---:|---:|---:|---|
| English | 打招呼并开始简单交谈 | 能用基本问候开启并结束一段简短对话。 | 8 | 3 | 4 | 跟熟人说早上好（scenario） |
| English | 描述今天的身体状态 | 能说出常见不适并回应基本健康建议。 | 8 | 3 | 4 | 休息请求、取消活动（2 scenarios） |
| English | 在限制下评估工作方案 | 能结合时间、证据和条件说明可行方案。 | 8 | 3 | 4 | 商量缩小任务范围（dialogue） |
| Japanese | お礼・謝罪・誘いに応じる | 能在感谢、道歉和简单邀请中作出合适回应。 | 8 | 3 | 4 | 道歉回应、致谢（scenarios） |
| Japanese | 誤解を解き、言い方を整える | 能回顾交流、补充不同看法并澄清误会。 | 8 | 3 | 4 | 周末交流、澄清语气（dialogues） |
| Japanese | 遠回しに配慮して依頼する | 能照顾对方感受，以较委婉方式求助。 | 8 | 3 | 4 | 限定帮助范围（dialogue）、避免添麻烦（scenario） |

## 【Coverage】

English vocab: 118 / 345 linked；227 unassigned。
English grammar: 40 / 73 linked；33 unassigned。
English expressions: 87 / 226 linked；139 unassigned。
Japanese vocab: 107 / 350 linked；243 unassigned。
Japanese grammar: 42 / 82 linked；40 unassigned。
Japanese expressions: 88 / 233 linked；145 unassigned。

unassigned: English 399 项；Japanese 428 项。

说明：V1 只编排语义连贯、10–20 分钟可完成的代表性路径；未为了 coverage 把不相关内容硬塞进 Lesson。详见 `lesson-coverage-report.json`。

## 【Lesson QA】

errors: 0
warnings: 40
advanced-content: 40；全部是 `support` / `exposure`，required 越级为 0。
duplicates: 0（80% vocabulary-overlap 阈值；已重新编排最初发现的 3 组）。
topic balance: 0 warnings；每种语言覆盖 14 个生活主题，单主题最多 3 Lessons。
size outliers: 0；每课 6–8 vocabulary、3 grammar、4 expressions。

Unknown vocabulary ratio 阈值为 0.35；超阈值 Lessons 为 0。所有 FK、语言、阶段、目标和空课检查均为 0 errors。详见 `lesson-audit.json`。

## 【Learning Path UX】

language: English / 日本語完全独立切换。
Stage: Stage 1–6；每 Stage 4 Lessons。
lesson list: 显示 title、objective、约 15 分钟及内容数量；不显示虚构进度。
lesson detail: Header + what you'll learn + Vocabulary + Grammar + Expressions + Scenario/Dialogue + Practice/Review。
lesson flow: 六步 stepper；支持前后按钮、键盘方向键、移动触控、相邻 Lesson；列表滚动与语言/Stage 返回状态保留。
Library separation: 主导航“学习”和首页主 CTA 进入 Lesson Path；Vocabulary / Grammar / Expressions Library 继续完整保留为自由探索入口。

## 【Practice】

reused existing engine: 复用 canonical 详情、例句、表达关联和现有固定 AI Preview；未改变 mastery/checkpoint engine。
new exercise engine: NO
supported activities: vocabulary meaning/recognition、grammar structure review、expression recognition、scenario/dialogue review、fixed production-preview entry。
deferred: 自动评分的 fill/production exercise 与 AI 动态例句留待后续明确阶段；未在 3.5D 实现。

## 【Exam Path】

IELTS: IELTS 5.0–7.0+ 可显示相关站内 Lessons。
JLPT: JLPT N5–N1 可显示相关站内 Lessons。
lesson reuse: 38 个目标推荐关系引用相同 Lesson IDs，不复制课程。
metadata clutter: learner UI 只显示“相关站内课程”，不声称官方 Lesson，不重新展示内部 alignment metadata。

## 【Learner State】

existing progress changed: NO
lesson-specific state: 仅使用 `sessionStorage` 保存当前 Lesson step 和列表返回位置；不声称 completed/locked。
migration: NONE；既有 localStorage、mastery、placement、checkpoint 数据未迁移或重写。

## 【Performance】

bounded queries: 列表只取当前 language + Stage 的 4 Lessons；详情只取当前 Lesson，最多解析 10 vocabulary、3 grammar、8 expressions。
lazy loading: canonical 内容按当前 Lesson IDs 批量解析；详情 overlay 仅在点击时加载。
large dataset: 5,000 条额外 synthetic vocabulary 下，20 次 bounded Lesson detail 本地共 412 ms；每次仍只返回 8 vocabulary 和 4 expressions。

## 【Regression】

3.5C.1: PASS；Library tabs、search/filter/load more、detail overlay、list-state restore、learner metadata cleanup 全部通过。
legacy: PASS；5 个 legacy 页面、返回路径、键盘和 overflow 通过。
placement: PASS
recommendation: PASS
mastery: PASS
checkpoint: PASS
AI Preview: PASS；仍为固定预览，没有连接动态生成。

## 【Responsive】

360: PASS
390: PASS
430: PASS
768: PASS
1440: PASS
overflow: none
keyboard: stepper arrow/Home/End、Enter、dialog focus/return PASS
touch: ≥44px tap targets，移动端 stepper 与 sticky controls PASS

## 【Staging】

URL: https://ej-learning-35d.yanjian-language-learning.workers.dev
D1: `ej-learning-35d-db` (`2cd594d3-cab0-4715-a154-9ea3d099c4c7`)；`phase-35d-v1` 已持久化，runtime source=`d1`；48 Lessons / 718 links；远端 payload SHA-256 与审计源完全一致。
production changed: NO
existing staging changed: NO；3.5C.1 D1 仅通过独立 `CONTENT_DB` binding 读取，没有 migration 或写入。

## 【Conclusion】

PHASE 3.5D LEARNING PATH CREATED = YES
LESSON COMPOSITION LAYER CREATED = YES
ENGLISH STAGE 1-6 LESSON PATH = YES
JAPANESE STAGE 1-6 LESSON PATH = YES
LESSONS USE EXISTING CURRICULUM CONTENT = YES
CONTENT DUPLICATED INTO LESSON TABLES = NO
LESSON REQUIRED/SUPPORT DISTINCTION = YES
LESSON QA ERRORS = 0
LIBRARY REMAINS AVAILABLE = YES
LESSON PATH IS PRIMARY LEARNING FLOW = YES
EXAM PATH REUSES LESSONS = YES
LEARNER ENGINE CHANGED = NO
LEARNER PROGRESS MIGRATED = NO
AI DYNAMIC EXAMPLES ADDED = NO
PRODUCTION CHANGED = NO
PHASE 3.5D.1 STARTED = NO
PHASE 4 STARTED = NO
