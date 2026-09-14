# EJ Learning — Curriculum Expansion 01A Densification Matrix

**Status:** planning candidate; not human-approved production curriculum

**Source revision:** `2bf2ef50d65d42d6940390afeb464dcb583d8a94`

**Reference:** `docs/CURRICULUM-COVERAGE-AUDIT-01.md`
**Scope:** 16 sparse supplemental lessons only

## 1. Executive recommendation

Adopt the matrix as a **human-review queue**, not as an implementation payload. It uses only existing published canonical content and brings every target lesson to 8 vocabulary, 3 grammar, and 4 expression links: 15 total links, 11 assessable items, and approximately 31–33 safe Phase 4E item/mode opportunities. The proposal adds exactly 49 vocabulary, 16 grammar, and 48 expression links (113 total), matching the audit planning estimate without creating content.

Of the 113 candidate additions, 103 are `HIGH CONFIDENCE` and 10 are `REVIEW REQUIRED`. Across the complete proposed 240-link matrix, including 127 existing links, 223 are `HIGH CONFIDENCE` and 17 are `REVIEW REQUIRED`. No `REVIEW REQUIRED` candidate should be promoted automatically.

Recommend design A, **REQUIRED SUPPLEMENTAL CHAIN**, after densification. The lessons are numbered as part of their stages, will have normal density, and introduce content that should not remain invisible to stage completion. This requires six explicit prerequisite-edge replacements; no edge should change during 01A.

## 2. Reading the matrix

- `CURRENT` is an existing active link. `ADD` is a planning-only candidate.
- Role is a proposed instructional role independent of the current `required/support` transport field:
  - `NEW`: deliberately introduced here.
  - `REVIEW`: introduced in an earlier lesson, or intentionally moved earlier by this proposal and subsequently revisited.
  - `SUPPORT`: necessary for the task but not a primary objective.
- `Ex/CC`: vocabulary example count; grammar example count plus controlled-completion availability; or expression unit/context status.
- `Use` is current active-lesson usage count before this proposal. A first lesson is named for review items.
- `†` means the candidate has one authored vocabulary example and should receive a second lesson-specific human-reviewed example before implementation.
- `HIGH CONFIDENCE` means the existing item, level, scenario fit, and practice evidence are clear. It still requires the human approval checklist.
- `REVIEW REQUIRED` identifies remaining level, register, scope, or editorial uncertainty.

Safe opportunity estimate: 3 modes per vocabulary item, 2 modes per grammar item, plus one controlled-completion item/mode pairing for each grammar with a safe authored occurrence. Expressions are not counted as Phase 4E assessed items.

## 3. Target set and current baseline

| Language | Target lessons | Current links | Current V/G/E | Proposed links | Proposed V/G/E |
|---|---:|---:|---:|---:|---:|
| English | 8 | 64 | 40 / 16 / 8 | 120 | 64 / 24 / 32 |
| Japanese | 8 | 63 | 39 / 16 / 8 | 120 | 64 / 24 / 32 |
| **Total** | **16** | **127** | **79 / 32 / 16** | **240** | **128 / 48 / 64** |

Every current lesson has one six-turn canonical dialogue. The low-density finding therefore concerns link breadth and practice diversity, not absence of scenario content.

## 4. English lesson matrices

### `en-s2-l5` — 在超市找货并结账

- Objective: 能询问商品位置、确认数量价格并完成支付。
- Stage/duration: Stage 2 / 18 minutes.
- Current prerequisite/outgoing: `en-s2-l4` / none. Proposed outgoing under required-chain design: `en-s3-l1`.
- Current dialogue: `35e1c-en-d-supermarket-expr`, “在超市找到商品并完成结账”, polite, difficulty 2, six turns. It covers locating oat milk, sale price, card payment, and receipt.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v009` | aisle — 货架通道 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core locating task |
| CURRENT | V | `35e1c-en-v010` | checkout counter — 结账台 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core payment location |
| CURRENT | V | `en-c-1755` | receipt — 收据 | REVIEW | 2 | 2 | 3; first `en-s2-l2` | HIGH CONFIDENCE | Deliberate shopping review |
| CURRENT | V | `35e1c-en-v016` | out of stock — 缺货 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Availability problem |
| CURRENT | G | `35e1c-en-some-any` | some / any + plural or non-count noun — some/any 与可数性 | NEW | 2 | 4; CC no | 1 | HIGH CONFIDENCE | Quantity/inventory language |
| CURRENT | G | `en-wh-question` | wh-word + auxiliary + subject + verb? — 询问信息 | SUPPORT | 1 | 7; CC yes | 1 | HIGH CONFIDENCE | Location and price questions; duplicated semantic fields need editing |
| CURRENT | E | `35e1c-en-d-supermarket-expr` | six-turn supermarket dialogue | NEW | 2 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `en-c-969` | card — 卡片 | REVIEW | 1 | 2 | 1; first `en-s2-l2` | **REVIEW REQUIRED** | Dialogue uses payment card, but the stored Chinese sense is generic |
| ADD | V | `en-c-397` | price — 价格 | REVIEW | 2 | 2 | 1; first `en-s2-l2` | HIGH CONFIDENCE | Explicit objective and dialogue price check |
| ADD | V | `35e1c-en-v011` | contactless payment — 非接触式支付 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | “tap your card” payment step |
| ADD | V | `en-c-1793` | good value — 物有所值 | SUPPORT | 3 | 1† | 0 | HIGH CONFIDENCE | Extends price evaluation without advanced terminology |
| ADD | G | `en-there-is` | there is / are + noun — 说明存在 | NEW | 1 | 7; CC yes | 0 | HIGH CONFIDENCE | Natural for stock/location; unlinked foundational grammar |
| ADD | E | `35e1b-en-x-follow-anything-else-expr` | Is there anything else you need? — 你还需要别的吗？ | SUPPORT | 1 | scenario/context | 0 | HIGH CONFIDENCE | Reusable checkout closing move |
| ADD | E | `legacy-76-en` | Keep the receipt. — 保留收据 | REVIEW | 2 | sentence/no context | 1; first `en-s2-l2` | HIGH CONFIDENCE | Reinforces a practical post-payment action |
| ADD | E | `legacy-81-en` | Do you take cards? / Yes, except for that one. — 确认刷卡 | REVIEW | 2 | 2-turn dialogue | 1; first `en-s2-l2` | HIGH CONFIDENCE | Direct payment-function rehearsal |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `en-s3-l5` — 退货与换货

- Objective: 能说明商品问题、提出退款或换货并确认处理条件。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `en-s3-l4` / `en-s3-l6`.
- Current dialogue: `35e1b-en-d-return-defect-expr`, “说明故障并协商退款方式”, polite, difficulty 3, six turns; it covers fault, receipt, refund/replacement, card refund, and timing.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v007` | refund — 退款 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Core outcome |
| CURRENT | V | `35e1c-en-v008` | exchange — 换货 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Core outcome |
| CURRENT | V | `35e1c-en-v012` | faulty — 有故障的 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Product-problem description |
| CURRENT | V | `35e1c-en-v013` | return policy — 退货政策 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Processing conditions |
| CURRENT | V | `en-c-1755` | receipt — 收据 | REVIEW | 2 | 2 | 3; first `en-s2-l2` | HIGH CONFIDENCE | Required evidence in dialogue |
| CURRENT | G | `35e1c-en-past-questions-negatives` | Did…? / did not + base verb — 过去问句与否定 | NEW | 2 | 4; CC no | 2 | HIGH CONFIDENCE | Explaining what happened |
| CURRENT | G | `35e1c-en-first-conditional` | If + present, will/can/imperative — 第一条件句 | SUPPORT | 3 | 4; CC yes | 4 | HIGH CONFIDENCE | Policy consequences |
| CURRENT | E | `35e1b-en-d-return-defect-expr` | six-turn defective-kettle dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `en-c-665` | damage — 损坏 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Broadens defect description |
| ADD | V | `35e1c-en-v014` | original packaging — 原包装 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Common return condition |
| ADD | V | `35e1c-en-v015` | store credit — 商店代金余额 | SUPPORT | 4 | 1† | 0 | HIGH CONFIDENCE | Existing canonical alternative to cash refund |
| ADD | G | `en-what-if` | What if + clause? — 提出假设问题 | NEW | 3 | 7; CC yes | 0 | HIGH CONFIDENCE | Authored shopping example asks about fit/return consequences |
| ADD | E | `35e1b-en-x-return-policy-expr` | What is your return policy? — 退货政策是什么？ | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Directly realizes the condition objective |
| ADD | E | `35e1b-en-x-return-original-expr` | It’s still in the original packaging. — 仍在原包装中 | NEW | 3 | scenario/context | 0 | HIGH CONFIDENCE | Supports return evidence |
| ADD | E | `35e1b-en-x-return-refund-card-expr` | Will the refund go back to my card? — 确认退款方式 | SUPPORT | 3 | scenario/context | 0 | HIGH CONFIDENCE | Extends dialogue's refund follow-up |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `en-s3-l6` — 在药房或诊所说明症状

- Objective: 能描述症状、持续时间和严重度并理解基本建议。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `en-s3-l5` / `en-s3-l7`.
- Current dialogue: `35e1b-en-d-medical-symptoms-expr`, “描述症状、持续时间与严重程度”, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v017` | fever — 发烧 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core symptom |
| CURRENT | V | `35e1c-en-v018` | cough — 咳嗽 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core symptom |
| CURRENT | V | `35e1c-en-v019` | dizzy — 头晕的 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Severity/condition |
| CURRENT | V | `35e1c-en-v020` | pharmacy — 药房 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Task setting |
| CURRENT | V | `35e1c-en-v021` | prescription — 处方 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Treatment context |
| CURRENT | G | `35e1c-en-should-advice` | should (not) + base verb — 建议 | NEW | 2 | 4; CC no | 1 | HIGH CONFIDENCE | Understanding advice |
| CURRENT | G | `en-since-for` | present perfect + since/for — 起点与时长 | SUPPORT | 3 | 7; CC yes | 1 | HIGH CONFIDENCE | Duration objective; duplicate semantic fields need editing |
| CURRENT | E | `35e1b-en-d-medical-symptoms-expr` | six-turn clinic dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-en-v022` | symptom — 症状 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Names the communicative category |
| ADD | V | `35e1c-en-v023` | sore throat — 喉咙痛 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Appears in current dialogue |
| ADD | V | `35e1c-en-v025` | dosage — 剂量 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Supports pharmacy instructions |
| ADD | G | `en-present-perfect` | Present Perfect — 到现在为止 | NEW | 4 | 1; CC yes | 2; currently first `en-s4-l2` | **REVIEW REQUIRED** | Conceptually precedes since/for, but moving level 4 into Stage 3 and its single generic example need syllabus review |
| ADD | E | `35e1b-en-x-medical-symptom-expr` | I’ve had a sore throat since yesterday. — 从昨天开始喉咙痛 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Exact duration model |
| ADD | E | `35e1b-en-x-medical-worse-expr` | It gets worse at night. — 晚上更严重 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Severity/change follow-up |
| ADD | E | `35e1b-en-d-pharmacy-medicine-expr` | six-turn medicine/dosage dialogue — 确认药物用法 | SUPPORT | 2 | dialogue/context | 0 | HIGH CONFIDENCE | Adds pharmacy half of stated lesson scope |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `en-s3-l7` — 预约、取消与改期

- Objective: 能预约、确认、取消并协商替代时间。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `en-s3-l6` / `en-s3-l8`.
- Current dialogue: `35e1b-en-d-appointment-reschedule-expr`, “完成预约改期与最终确认”, polite, difficulty 2, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `en-c-557` | appointment — 预约 | NEW | 3 | 2 | 1 | HIGH CONFIDENCE | Core task noun |
| CURRENT | V | `35e1c-en-v030` | reschedule — 改期 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Core action |
| CURRENT | V | `35e1c-en-v029` | time slot — 可预约时段 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Availability negotiation |
| CURRENT | V | `35e1c-en-v031` | availability — 可用时间 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Availability negotiation |
| CURRENT | V | `35e1c-en-v032` | confirmation — 确认信息 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Closing step |
| CURRENT | G | `35e1c-en-future-arrangements` | be + V-ing + future time — 已安排的将来 | NEW | 3 | 4; CC no | 2 | HIGH CONFIDENCE | Confirming scheduled plans |
| CURRENT | G | `35e1c-en-first-conditional` | If + present… — 第一条件句 | REVIEW | 3 | 4; CC yes | 4; first `en-s3-l5` | HIGH CONFIDENCE | Conditions/alternatives |
| CURRENT | E | `35e1b-en-d-appointment-reschedule-expr` | six-turn rescheduling dialogue | NEW | 2 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-en-v033` | fully booked — 预约已满 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Triggers alternative-time negotiation |
| ADD | V | `en-c-577` | flexible — 灵活的 | SUPPORT | 3 | 1† | 0 | HIGH CONFIDENCE | Describes scheduling flexibility |
| ADD | V | `35e1c-en-v089` | follow-up appointment — 复诊预约 | SUPPORT | 3 | 1† | 0 | **REVIEW REQUIRED** | Strong appointment fit, but narrows a general lesson toward healthcare |
| ADD | G | `en-indirect-question` | verb + wh-word + subject + verb — 嵌入式疑问 | NEW | 3 | 7; CC yes | 0 | HIGH CONFIDENCE | Polite availability enquiries; unlinked grammar |
| ADD | E | `35e1b-en-x-appt-make-expr` | I’d like to make an appointment. — 我想预约 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Covers opening the process |
| ADD | E | `35e1b-en-x-appt-cancel-expr` | I’m calling to cancel my appointment. — 取消预约 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Covers cancellation objective |
| ADD | E | `35e1b-en-x-confirm-booked-expr` | Could you confirm that it’s booked? — 确认预约成功 | SUPPORT | 2 | scenario/context | 0 | HIGH CONFIDENCE | Covers confirmation objective |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `en-s3-l8` — 处理手机与网络问题

- Objective: 能描述连接问题并执行、确认排障步骤。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `en-s3-l7` / `en-s3-l9`.
- Current dialogue: `35e1c-en-d-connectivity-expr`, “说明网络故障并完成基本排障”, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v051` | Wi-Fi — 无线网络 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core object |
| CURRENT | V | `35e1c-en-v052` | password — 密码 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Authentication issue |
| CURRENT | V | `35e1c-en-v053` | signal — 信号 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Problem description |
| CURRENT | V | `35e1c-en-v054` | connection — 连接 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Problem description |
| CURRENT | V | `35e1c-en-v055` | restart — 重启 | SUPPORT | 2 | 1 | 1 | HIGH CONFIDENCE | Troubleshooting action |
| CURRENT | V | `35e1c-en-v056` | router — 路由器 | SUPPORT | 2 | 1 | 1 | HIGH CONFIDENCE | Troubleshooting object |
| CURRENT | G | `35e1c-en-first-conditional` | If + present… — 第一条件句 | REVIEW | 3 | 4; CC yes | 4; first `en-s3-l5` | HIGH CONFIDENCE | Branching troubleshooting |
| CURRENT | G | `en-imperative` | base verb + object — 行动指示 | REVIEW | 1 | 7; CC yes | 2; first `en-s2-l4` | HIGH CONFIDENCE | Step instructions; duplicated fields need editing |
| CURRENT | E | `35e1c-en-d-connectivity-expr` | six-turn Wi-Fi troubleshooting dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-en-v057` | mobile data — 移动数据 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Alternative connection path |
| ADD | V | `35e1c-en-v058` | airplane mode — 飞行模式 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Common diagnostic state |
| ADD | G | `en-not-quite` | not quite + adjective — 尚未完全达到 | NEW | 3 | 1; CC yes | 0 | **REVIEW REQUIRED** | Useful for partial recovery, but only one generic example and no current-dialogue occurrence |
| ADD | E | `legacy-160-en` | I need some help. — 我需要帮助 | SUPPORT | 2 | sentence/no context | 0 | HIGH CONFIDENCE | Reusable support opening |
| ADD | E | `legacy-167-en` | I’ve tried that, but it still doesn’t work. — 试过但仍不工作 | NEW | 3 | sentence/no context | 0 | HIGH CONFIDENCE | Exact troubleshooting follow-up |
| ADD | E | `35e1b-en-x-follow-who-contact-expr` | Who should I contact about this? — 应联系谁 | SUPPORT | 3 | scenario/context | 0 | HIGH CONFIDENCE | Escalation after failed steps |

Final: **8/3/4; 11 assessable; 33 opportunities; 18 minutes retained.**

### `en-s3-l9` — 职场任务、排班与反馈

- Objective: 能汇报进展、协调班次并回应反馈。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `en-s3-l8` / none. Proposed outgoing: `en-s4-l1`.
- Current dialogue: `35e1b-en-d-work-clarification-expr`, “澄清任务范围并确认优先级”, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v075` | colleague — 同事 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Workplace participant |
| CURRENT | V | `35e1c-en-v076` | shift — 班次 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Shift objective |
| CURRENT | V | `en-c-1530` | deadline — 截止期限 | REVIEW | 3 | 2 | 2; first `en-s3-l4` | HIGH CONFIDENCE | Progress reporting |
| CURRENT | V | `en-c-1568` | feedback — 反馈 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Feedback objective |
| CURRENT | V | `35e1c-en-v082` | supervisor — 主管 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Workplace role |
| CURRENT | G | `35e1c-en-obligation-contrast` | must / have to / do not have to — 义务对比 | NEW | 3 | 4; CC no | 2 | HIGH CONFIDENCE | Task requirements |
| CURRENT | G | `35e1c-en-future-arrangements` | be + V-ing + future time — 已安排的将来 | REVIEW | 3 | 4; CC no | 2; first `en-s3-l7` | HIGH CONFIDENCE | Shift arrangements |
| CURRENT | E | `35e1b-en-d-work-clarification-expr` | six-turn task-clarification dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-en-v079` | performance review — 绩效评估 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Feedback setting |
| ADD | V | `35e1c-en-v084` | cover a shift — 替班 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Direct shift-coordination action |
| ADD | V | `35e1c-en-v085` | follow up — 跟进 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Progress/accountability action |
| ADD | G | `en-could-request` | Could you + base verb? — 委婉请求 | REVIEW | 2 | 7; CC yes | 1; first `en-s2-l1` | HIGH CONFIDENCE | Current dialogue begins with this form; restores CC safely |
| ADD | E | `legacy-42-en` | I’m working on it. — 正在处理 | REVIEW | 3 | sentence/no context | 1; first `en-s3-l4` | HIGH CONFIDENCE | Deliberate progress-report review |
| ADD | E | `legacy-46-en` | Could I get some feedback? — 请求反馈 | NEW | 3 | sentence/no context | 0 | HIGH CONFIDENCE | Direct objective coverage |
| ADD | E | `35e1b-en-x-clarify-understand-expr` | Let me check that I understand correctly. — 确认理解 | NEW | 3 | scenario/context | 0 | HIGH CONFIDENCE | Task clarification move |

Final: **8/3/4; 11 assessable; 31 opportunities; 18 minutes retained.** Existing zero-CC risk is resolved by a naturally occurring reviewed grammar item.

### `en-s4-l5` — 租房、报修与房东沟通

- Objective: 能说明住房问题、请求维修并确认费用和时间。
- Stage/duration: Stage 4 / 18 minutes.
- Current prerequisite/outgoing: `en-s4-l4` / `en-s4-l6`.
- Current dialogue: `35e1b-en-d-repair-leak-expr`, “报告漏水并说明紧急程度”, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v034` | landlord — 房东 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Communication counterpart |
| CURRENT | V | `35e1c-en-v036` | rent — 房租 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Housing/fee scope |
| CURRENT | V | `35e1c-en-v039` | maintenance — 维修保养 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Core repair domain |
| CURRENT | V | `35e1c-en-v040` | leak — 漏水 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Current incident |
| CURRENT | V | `35e1c-en-v042` | repair request — 报修申请 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Task label |
| CURRENT | G | `35e1c-en-perfect-vs-past` | have + participle vs past — 完成时/过去时对比 | NEW | 4 | 4; CC no | 2 | HIGH CONFIDENCE | Reporting current consequence versus event |
| CURRENT | G | `35e1c-en-obligation-contrast` | must / have to / do not have to — 义务对比 | REVIEW | 3 | 4; CC no | 2; first `en-s3-l9` | HIGH CONFIDENCE | Access/attendance duties |
| CURRENT | E | `35e1b-en-d-repair-leak-expr` | six-turn leak-report dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-en-v041` | heating — 供暖 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Existing repair scenario |
| ADD | V | `35e1c-en-v043` | inspection — 房屋检查 | NEW | 4 | 1† | 0 | HIGH CONFIDENCE | Repair visit and condition check |
| ADD | V | `35e1c-en-v044` | utility bill — 水电燃气账单 | SUPPORT | 3 | 1† | 0 | HIGH CONFIDENCE | Fee clarification without overloading tenancy law |
| ADD | G | `en-present-perfect-continuous` | have/has been + V-ing — 持续到现在 | NEW | 4 | 1; CC yes | 0 | HIGH CONFIDENCE | Same-topic authored expression: faucet has been dripping all night |
| ADD | E | `legacy-59-en` | The faucet has been dripping all night. — 水龙头整夜漏水 | NEW | 4 | sentence/no context | 0 | HIGH CONFIDENCE | Exact problem/duration statement and CC evidence |
| ADD | E | `35e1b-en-x-alternative-repair-expr` | If it can’t be fixed today, could you lend me a heater? — 请求临时方案 | SUPPORT | 3 | scenario/context | 0 | HIGH CONFIDENCE | Contingency repair request |
| ADD | E | `legacy-52-en` | Do you have a spare key? — 询问备用钥匙 | SUPPORT | 2 | sentence/no context | 1; first `en-s2-l4` | **REVIEW REQUIRED** | Housing fit is clear, but it is peripheral to the repair/fee objective |

Final: **8/3/4; 11 assessable; 31 opportunities; 18 minutes retained.** Existing zero-CC risk is resolved without inventing content.

### `en-s4-l6` — 入住酒店并处理住宿问题

- Objective: 能办理入住、询问设施并处理房间问题。
- Stage/duration: Stage 4 / 18 minutes.
- Current prerequisite/outgoing: `en-s4-l5` / none. Proposed outgoing: `en-s5-l1`.
- Current dialogue: `35e1b-en-d-hotel-room-expr`, “报告房间问题并完成换房”, polite, difficulty 2, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-en-v067` | check-in — 入住登记 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Check-in objective |
| CURRENT | V | `35e1c-en-v068` | key card — 房卡 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Hotel operation |
| CURRENT | V | `35e1c-en-v070` | reservation — 预订 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Booking/check-in |
| CURRENT | V | `35e1c-en-v073` | room rate — 房价 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Lodging information |
| CURRENT | V | `35e1c-en-v074` | late checkout — 延迟退房 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Service request |
| CURRENT | G | `35e1c-en-past-questions-negatives` | Did…? / did not… — 过去问句与否定 | REVIEW | 2 | 4; CC no | 2; first `en-s3-l5` | HIGH CONFIDENCE | Booking/problem history |
| CURRENT | G | `35e1c-en-first-conditional` | If + present… — 第一条件句 | REVIEW | 3 | 4; CC yes | 4; first `en-s3-l5` | HIGH CONFIDENCE | Alternative room conditions |
| CURRENT | E | `35e1b-en-d-hotel-room-expr` | six-turn room-change dialogue | NEW | 2 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-en-v071` | reception desk — 前台 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Service location |
| ADD | V | `35e1c-en-v072` | vacancy — 空房 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Room availability |
| ADD | V | `35e1c-en-v069` | accommodation — 住宿 | NEW | 4 | 1† | 0 | HIGH CONFIDENCE | Stage-appropriate category term |
| ADD | G | `en-possible-request` | Would it be possible to + verb? — 询问请求是否可行 | REVIEW | 4 | 1; CC yes | 1; first `en-s4-l3` | HIGH CONFIDENCE | Polite room/service negotiation |
| ADD | E | `35e1b-en-x-hotel-quiet-room-expr` | Could I have a quieter room? — 请求安静房间 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Exact room-problem move |
| ADD | E | `35e1b-en-x-hotel-checkout-expr` | What time is check-out? — 询问退房时间 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Covers service information |
| ADD | E | `35e1b-en-d-hotel-booking-expr` | six-turn booking lookup/breakfast dialogue | SUPPORT | 2 | dialogue/context | 0 | HIGH CONFIDENCE | Covers check-in half of the objective |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

## 5. Japanese lesson matrices

### `ja-s2-l5` — スーパーで商品を探して会計する

- Objective: 能询问位置、数量、价格并完成超市支付。
- Stage/duration: Stage 2 / 18 minutes.
- Current prerequisite/outgoing: `ja-s2-l4` / `ja-s2-l6`.
- Current dialogue: `35e1c-ja-d-supermarket-expr`, supermarket location/discount/payment/receipt, polite, difficulty 2, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v012` | 通路 — 通道 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Locating items |
| CURRENT | V | `35e1c-ja-v013` | レジ — 收银台 | NEW | 1 | 1 | 1 | HIGH CONFIDENCE | Payment location |
| CURRENT | V | `ja-c-1761` | レシート — 收据 | NEW | 2 | 1 | 2 | HIGH CONFIDENCE | Checkout evidence |
| CURRENT | V | `35e1c-ja-v017` | 在庫 — 库存 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Availability |
| CURRENT | G | `35e1c-ja-counter-system` | number + counter — 助数詞系统 | NEW | 2 | 4; CC yes | 2 | **REVIEW REQUIRED** | Correct task fit, but raw English learner-facing form needs human editorial correction |
| CURRENT | G | `ja-ka-question` | 礼貌句 + か — 礼貌疑问 | REVIEW | 1 | 8; CC yes | 3; first `ja-s1-l3` | HIGH CONFIDENCE | Location/payment questions |
| CURRENT | E | `35e1c-ja-d-supermarket-expr` | six-turn supermarket dialogue | NEW | 2 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `ja-c-971` | カード — 卡片 | REVIEW | 1 | 3 | 1; first `ja-s2-l4` | **REVIEW REQUIRED** | Payment-card occurrence is clear, but the stored Chinese sense is generic |
| ADD | V | `ja-c-399` | 値段 — 价格 | REVIEW | 2 | 3 | 1; first `ja-s2-l4` | HIGH CONFIDENCE | Explicit objective |
| ADD | V | `35e1c-ja-v014` | タッチ決済 — 非接触式支付 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Existing checkout action |
| ADD | V | `35e1c-ja-v051` | 暗証番号 — 密码/PIN | SUPPORT | 2 | 1† | 0 | HIGH CONFIDENCE | Payment troubleshooting |
| ADD | G | `ja-de-place` | 场所 + で + 动词 — 动作场所 | NEW | 1 | 8; CC yes | 0 | HIGH CONFIDENCE | レジで払う; unlinked foundational grammar |
| ADD | E | `35e1b-ja-x-follow-anything-else-expr` | ほかに何かございますか。— 还需要别的吗？ | SUPPORT | 1 | scenario/context | 0 | HIGH CONFIDENCE | Checkout closing move |
| ADD | E | `legacy-76-ja` | レシートを取っておいて。— 保留收据 | NEW | 3 | sentence/no context | 0 | **REVIEW REQUIRED** | Practical fit, but informal register conflicts with the polite service dialogue |
| ADD | E | `legacy-81-ja` | カードは使えますか。— 确认刷卡 | REVIEW | 2 | 2-turn dialogue | 1; first `ja-s2-l4` | HIGH CONFIDENCE | Deliberate payment review |

Final: **8/3/4; 11 assessable; 33 opportunities; 18 minutes retained.**

### `ja-s2-l6` — 店で注文し、希望を伝える

- Objective: 能点餐、说明饮食限制并结账。
- Stage/duration: Stage 2 / 18 minutes.
- Current prerequisite/outgoing: `ja-s2-l5` / none. Proposed outgoing: `ja-s3-l1`.
- Current dialogue: `35e1b-ja-d-restaurant-allergy-expr`, peanut-allergy ordering, polite, difficulty 2, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v001` | アレルギー — 过敏 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core safety need |
| CURRENT | V | `35e1c-ja-v003` | 原材料 — 配料 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Ingredient check |
| CURRENT | V | `35e1c-ja-v005` | 会計 — 结账 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Payment objective |
| CURRENT | V | `35e1c-ja-v008` | 抜き — 不加/去掉 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Modification request |
| CURRENT | V | `35e1c-ja-v009` | 別々 — 分别 | SUPPORT | 2 | 1 | 1 | HIGH CONFIDENCE | Split payment/service option |
| CURRENT | G | `35e1c-ja-counter-system` | number + counter — 助数詞系统 | REVIEW | 2 | 4; CC yes | 2; first `ja-s2-l5` | **REVIEW REQUIRED** | Relevant to quantities, but learner-facing English form needs editing |
| CURRENT | G | `ja-request-onegai` | 名词 + を/でお願いします — 提出所需内容 | REVIEW | 2 | 8; CC yes | 2; first `ja-s2-l1` | HIGH CONFIDENCE | Ordering request |
| CURRENT | E | `35e1b-ja-d-restaurant-allergy-expr` | six-turn allergy-ordering dialogue | NEW | 2 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-ja-v002` | 食事制限 — 饮食限制 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Names broader requirement |
| ADD | V | `35e1c-ja-v007` | 乳製品 — 乳制品 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Existing allergen check |
| ADD | V | `35e1c-ja-v004` | ベジタリアン — 素食者/素食 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Existing canonical dietary scenario |
| ADD | G | `ja-polite-negative` | 〜ません; current formula Vます → Vません — 礼貌否定 | NEW | 2 | 8; CC yes | 0 | HIGH CONFIDENCE | Dialogue states an ingredient is not included; foundational and unlinked |
| ADD | E | `35e1b-ja-x-food-allergy-expr` | ピーナッツアレルギーがあります。— 花生过敏 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Direct safety statement |
| ADD | E | `35e1b-ja-x-food-without-expr` | 玉ねぎ抜きにできますか。— 请求不放洋葱 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Modification pattern |
| ADD | E | `35e1b-ja-x-food-bill-expr` | お会計をお願いします。— 请结账 | SUPPORT | 1 | scenario/context | 0 | HIGH CONFIDENCE | Completes stated objective |

Final: **8/3/4; 11 assessable; 33 opportunities; 18 minutes retained.**

### `ja-s3-l5` — 返品・交換を相談する

- Objective: 能说明商品问题并协商退换条件。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `ja-s3-l4` / `ja-s3-l6`.
- Current dialogue: `35e1b-ja-d-return-defect-expr`, defect/refund/card timing, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v010` | 返品 — 退货 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Core outcome |
| CURRENT | V | `35e1c-ja-v011` | 交換 — 换货 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Core outcome |
| CURRENT | V | `ja-c-1761` | レシート — 收据 | REVIEW | 2 | 1 | 2; first `ja-s2-l5` | HIGH CONFIDENCE | Return evidence |
| CURRENT | V | `35e1c-ja-v015` | 不良品 — 故障品 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Product problem |
| CURRENT | V | `35e1c-ja-v016` | 返金 — 退款 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Resolution option |
| CURRENT | G | `35e1c-ja-explanatory-nodesu` | plain + んです/んですが — 说明与铺垫 | NEW | 3 | 4; CC no | 2 | HIGH CONFIDENCE | Explaining problem politely |
| CURRENT | G | `35e1c-ja-condition-contrast` | なら/たら/ば/と 条件系统 | SUPPORT | 4 | 4; CC yes | 3 | **REVIEW REQUIRED** | Pedagogical fit exists, but stored `た形ら` is malformed and four-way scope needs review |
| CURRENT | E | `35e1b-ja-d-return-defect-expr` | six-turn return dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `ja-c-971` | カード — 卡片 | REVIEW | 1 | 3 | 1; first `ja-s2-l4` | HIGH CONFIDENCE | Deliberate payment/refund review |
| ADD | V | `ja-c-663` | 保証 — 产品保修 | SUPPORT | 4 | 1† | 0 | **REVIEW REQUIRED** | Strong return-policy fit, but level 4 and warranty scope may exceed the 18-minute task |
| ADD | V | `35e1c-ja-v050` | 手数料 — 手续费 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Refund/cancellation cost condition |
| ADD | G | `ja-nara` | 普通形 + なら — 承接条件 | NEW | 3 | 8; CC yes | 0 | HIGH CONFIDENCE | A narrower, safer condition focus than the broad support record |
| ADD | E | `35e1b-ja-x-return-policy-expr` | 返品の条件を教えてください。— 询问退货条件 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Direct objective coverage |
| ADD | E | `35e1b-ja-x-return-original-expr` | まだ元の箱に入っています。— 仍在原盒中 | NEW | 3 | scenario/context | 0 | HIGH CONFIDENCE | Item-condition evidence |
| ADD | E | `35e1b-ja-x-return-refund-card-expr` | 返金はカードに戻りますか。— 确认退款方式 | SUPPORT | 3 | scenario/context | 0 | HIGH CONFIDENCE | Resolution follow-up |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `ja-s3-l6` — 薬局・病院で症状を説明する

- Objective: 能说明症状、程度与持续时间并理解建议。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `ja-s3-l5` / `ja-s3-l7`.
- Current dialogue: `35e1b-ja-d-medical-symptoms-expr`, clinic symptoms, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v018` | 発熱 — 发烧 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core symptom |
| CURRENT | V | `35e1c-ja-v019` | 咳 — 咳嗽 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core symptom |
| CURRENT | V | `35e1c-ja-v020` | めまい — 头晕 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Severity/condition |
| CURRENT | V | `35e1c-ja-v021` | 薬局 — 药房 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Task setting |
| CURRENT | V | `35e1c-ja-v022` | 処方箋 — 处方 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Treatment context |
| CURRENT | G | `35e1c-ja-kara-node-contrast` | clause + から/ので — 理由对比 | NEW | 3 | 4; CC no | 2 | HIGH CONFIDENCE | Giving symptom reason/background |
| CURRENT | G | `ja-hou-ga-ii` | た形/ない形 + ほうがいい — 建议 | SUPPORT | 3 | 8; CC yes | 1 | HIGH CONFIDENCE | Understanding advice; duplicated fields need editing |
| CURRENT | E | `35e1b-ja-d-medical-symptoms-expr` | six-turn clinic dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-ja-v024` | 症状 — 症状 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Names the category |
| ADD | V | `35e1c-ja-v025` | 喉の痛み — 喉咙痛 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Current dialogue content |
| ADD | V | `35e1c-ja-v027` | 用量 — 用量 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Pharmacy instructions |
| ADD | G | `ja-te-iru` | 〜ている — 状态与进行 | REVIEW | 3 | 8; CC yes | 4; first `ja-s3-l2` | HIGH CONFIDENCE | Explicit state/duration review; reused deliberately despite high existing frequency |
| ADD | E | `35e1b-ja-x-medical-symptom-expr` | 昨日から喉が痛いです。— 从昨天开始喉咙痛 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Duration model |
| ADD | E | `35e1b-ja-x-medical-worse-expr` | 夜になると、もっとひどくなります。— 晚上加重 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Severity change |
| ADD | E | `35e1b-ja-d-pharmacy-medicine-expr` | six-turn medicine/use dialogue | SUPPORT | 2 | dialogue/context | 0 | HIGH CONFIDENCE | Adds pharmacy half of scope |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `ja-s3-l7` — スマホ・通信の問題を伝える

- Objective: 能描述连接问题并确认排障步骤。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `ja-s3-l6` / `ja-s3-l8`.
- Current dialogue: `35e1c-ja-d-connectivity-expr`, Wi-Fi troubleshooting, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v053` | Wi-Fi — 无线网络 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core object |
| CURRENT | V | `35e1c-ja-v054` | パスワード — 密码 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Authentication issue |
| CURRENT | V | `35e1c-ja-v055` | 電波 — 信号 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Problem description |
| CURRENT | V | `35e1c-ja-v056` | 接続 — 连接 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Problem description |
| CURRENT | V | `35e1c-ja-v057` | 再起動 — 重启 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Troubleshooting action |
| CURRENT | G | `35e1c-ja-te-sequence` | Vて、V — 动作连接 | NEW | 2 | 4; CC no | 1 | HIGH CONFIDENCE | Ordered troubleshooting |
| CURRENT | G | `35e1c-ja-condition-contrast` | なら/たら/ば/と 条件系统 | REVIEW | 4 | 4; CC yes | 3; first `ja-s3-l5` | **REVIEW REQUIRED** | Conditional troubleshooting fits, but malformed stored form and four-way scope remain |
| CURRENT | E | `35e1c-ja-d-connectivity-expr` | six-turn Wi-Fi dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-ja-v058` | ルーター — 路由器 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Current dialogue object |
| ADD | V | `35e1c-ja-v059` | モバイルデータ — 移动数据 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Alternative connection |
| ADD | V | `35e1c-ja-v060` | 機内モード — 飞行模式 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Diagnostic state |
| ADD | G | `ja-te-kudasai` | 〜てください — 请求对方行动 | REVIEW | 2 | 8; CC yes | 2; first `ja-s2-l2` | HIGH CONFIDENCE | Exact troubleshooting instructions; register is suitable for service guidance |
| ADD | E | `legacy-160-ja` | 少し手伝いが必要です。— 需要帮助 | SUPPORT | 2 | sentence/no context | 0 | HIGH CONFIDENCE | Reusable support opening |
| ADD | E | `legacy-167-ja` | それは試したんですが、まだうまくいきません。— 试过但仍不行 | NEW | 4 | sentence/no context | 1; currently first `ja-s5-l2` | **REVIEW REQUIRED** | Exact fit, but moving a difficulty-4 record before its current Stage-5 use needs review |
| ADD | E | `35e1b-ja-x-follow-who-contact-expr` | この件は、どなたに連絡すればいいですか。— 应联系谁 | SUPPORT | 3 | scenario/context | 0 | HIGH CONFIDENCE | Escalation after failed steps |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

### `ja-s3-l8` — 職場で報告・連絡・相談する

- Objective: 能汇报、联络和商量并保持合适礼貌度。
- Stage/duration: Stage 3 / 18 minutes.
- Current prerequisite/outgoing: `ja-s3-l7` / none. Proposed outgoing: `ja-s4-l1`.
- Current dialogue: `35e1b-ja-d-work-clarification-expr`, task scope/priority, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v077` | 同僚 — 同事 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Workplace participant |
| CURRENT | V | `35e1c-ja-v078` | シフト — 班次 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Shift coordination |
| CURRENT | V | `35e1c-ja-v085` | 進捗 — 进展 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Reporting objective |
| CURRENT | V | `35e1c-ja-v087` | 報告 — 汇报 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Reporting objective |
| CURRENT | V | `35e1c-ja-v089` | 相談 — 商量/咨询 | SUPPORT | 2 | 1 | 1 | HIGH CONFIDENCE | Consultation objective |
| CURRENT | G | `35e1c-ja-workplace-register` | です/ます; 尊敬/谦让切换 — 职场语域 | NEW | 4 | 4; CC no | 2 | **REVIEW REQUIRED** | Scenario fit is strong, but one record aggregates three register systems |
| CURRENT | G | `35e1c-ja-obligation-contrast` | Vなければならない / Vなくてもいい — 义务对比 | NEW | 3 | 4; CC no | 2 | HIGH CONFIDENCE | Task requirements |
| CURRENT | E | `35e1b-ja-d-work-clarification-expr` | six-turn task-clarification dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-ja-v084` | 上司 — 上司 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Register-sensitive counterpart |
| ADD | V | `35e1c-ja-v081` | フィードバック — 反馈 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Feedback objective |
| ADD | V | `35e1c-ja-v100` | 勤務表 — 排班表 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Shift coordination artifact |
| ADD | G | `ja-indirect-ka` | 普通形 + か + predicate — 把疑问作为内容 | NEW | 3 | 1; CC yes | 0 | **REVIEW REQUIRED** | Clarification fit is plausible, but the current dialogue uses a direct question and the sole example is generic |
| ADD | E | `legacy-44-ja` | まだ報告書を書き終えていません。— 报告尚未完成 | NEW | 3 | sentence/no context | 0 | HIGH CONFIDENCE | Progress report |
| ADD | E | `legacy-46-ja` | ご意見をいただけますか。— 请求反馈 | NEW | 3 | sentence/no context | 0 | HIGH CONFIDENCE | Feedback move |
| ADD | E | `35e1b-ja-x-clarify-understand-expr` | 念のため、私の理解を確認させてください。— 确认理解 | NEW | 3 | scenario/context | 0 | HIGH CONFIDENCE | Clarification move |

Final: **8/3/4; 11 assessable; 31 opportunities; 18 minutes retained.** Existing zero-CC risk is resolved by an existing authored occurrence, subject to review.

### `ja-s4-l5` — 賃貸・修理について相談する

- Objective: 能向房东或管理方报修并确认费用与时间。
- Stage/duration: Stage 4 / 18 minutes.
- Current prerequisite/outgoing: `ja-s4-l4` / `ja-s4-l6`.
- Current dialogue: `35e1b-ja-d-repair-leak-expr`, leak urgency/attendance, polite, difficulty 3, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v036` | 大家 — 房东 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Communication counterpart |
| CURRENT | V | `35e1c-ja-v038` | 家賃 — 房租 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Fee scope |
| CURRENT | V | `35e1c-ja-v041` | 修理 — 维修 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Core action |
| CURRENT | V | `35e1c-ja-v042` | 水漏れ — 漏水 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Current incident |
| CURRENT | V | `35e1c-ja-v044` | 管理会社 — 物业管理公司 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Service counterpart |
| CURRENT | G | `35e1c-ja-explanatory-nodesu` | plain + んです/んですが — 说明与铺垫 | REVIEW | 3 | 4; CC no | 2; first `ja-s3-l5` | HIGH CONFIDENCE | Polite problem report |
| CURRENT | G | `35e1c-ja-obligation-contrast` | Vなければならない / Vなくてもいい — 义务对比 | REVIEW | 3 | 4; CC no | 2; first `ja-s3-l8` | HIGH CONFIDENCE | Attendance/fee requirements |
| CURRENT | E | `35e1b-ja-d-repair-leak-expr` | six-turn leak-report dialogue | NEW | 3 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-ja-v043` | 暖房 — 暖气 | NEW | 2 | 1† | 0 | HIGH CONFIDENCE | Existing repair scenario |
| ADD | V | `35e1c-ja-v045` | 点検 — 检查 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Repair visit |
| ADD | V | `35e1c-ja-v046` | 光熱費 — 水电燃气费 | SUPPORT | 3 | 1† | 0 | HIGH CONFIDENCE | Cost clarification |
| ADD | G | `ja-te-itadaku` | て形 + いただけますか — 谦敬请求受惠 | NEW | 4 | 1; CC yes | 0 | HIGH CONFIDENCE | Exact repair-alternative expression uses this form |
| ADD | E | `legacy-59-ja` | 一晩中、蛇口から水がぽたぽた落ちています。— 整夜漏水 | NEW | 4 | sentence/no context | 0 | HIGH CONFIDENCE | Duration/severity statement |
| ADD | E | `35e1b-ja-x-alternative-repair-expr` | 今日直らない場合は、暖房器具を貸していただけますか。— 临时方案 | SUPPORT | 3 | scenario/context | 0 | HIGH CONFIDENCE | Repair contingency and CC evidence |
| ADD | E | `35e1b-ja-x-home-tachiai-expr` | 修理のときは立ち会いが必要ですか。— 是否需在场 | NEW | 3 | scenario/context | 0 | HIGH CONFIDENCE | Directly realizes conditions objective |

Final: **8/3/4; 11 assessable; 31 opportunities; 18 minutes retained.** Existing zero-CC risk is resolved naturally.

### `ja-s4-l6` — 宿泊手続きと部屋の問題に対応する

- Objective: 能办理入住、询问设施并处理房间问题。
- Stage/duration: Stage 4 / 18 minutes.
- Current prerequisite/outgoing: `ja-s4-l5` / none. Proposed outgoing: `ja-s5-l1`.
- Current dialogue: `35e1b-ja-d-hotel-room-expr`, room problem/change, polite, difficulty 2, six turns.

| State | Type | ID | Visible form/text — Chinese | Role | Level | Ex/CC | Use | Status | Exact fit rationale |
|---|---|---|---|---|---:|---|---|---|---|
| CURRENT | V | `35e1c-ja-v069` | チェックイン — 入住登记 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Check-in objective |
| CURRENT | V | `35e1c-ja-v070` | カードキー — 房卡 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Hotel operation |
| CURRENT | V | `35e1c-ja-v072` | 宿泊予約 — 住宿预订 | NEW | 3 | 1 | 1 | HIGH CONFIDENCE | Booking/check-in |
| CURRENT | V | `35e1c-ja-v073` | フロント — 前台 | NEW | 2 | 1 | 1 | HIGH CONFIDENCE | Service location |
| CURRENT | V | `35e1c-ja-v075` | 宿泊料金 — 住宿费 | SUPPORT | 3 | 1 | 1 | HIGH CONFIDENCE | Lodging information |
| CURRENT | G | `35e1c-ja-workplace-register` | です/ます; 尊敬/谦让切换 — 服务语域 | REVIEW | 4 | 4; CC no | 2; first `ja-s3-l8` | **REVIEW REQUIRED** | Service-register fit, but aggregated grammar scope remains broad |
| CURRENT | G | `35e1c-ja-condition-contrast` | なら/たら/ば/と 条件系统 | REVIEW | 4 | 4; CC yes | 3; first `ja-s3-l5` | **REVIEW REQUIRED** | Hotel alternatives fit, but malformed stored form and scope remain |
| CURRENT | E | `35e1b-ja-d-hotel-room-expr` | six-turn room-change dialogue | NEW | 2 | dialogue/context | 1 | HIGH CONFIDENCE | Existing task spine |
| ADD | V | `35e1c-ja-v071` | 宿泊 — 住宿 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Category term |
| ADD | V | `35e1c-ja-v074` | 空室 — 空房 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Room availability |
| ADD | V | `35e1c-ja-v076` | 延長 — 延长 | NEW | 3 | 1† | 0 | HIGH CONFIDENCE | Checkout/service extension |
| ADD | G | `ja-te-itadaku` | て形 + いただけますか — 谦敬请求受惠 | REVIEW | 4 | 1; CC yes | 0 current; proposed first `ja-s4-l5` | HIGH CONFIDENCE | Intentional immediate review in a second service setting |
| ADD | E | `35e1b-ja-x-hotel-quiet-room-expr` | もう少し静かな部屋に替えていただけますか。— 请求换房 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Exact room problem move |
| ADD | E | `35e1b-ja-x-hotel-checkout-expr` | チェックアウトは何時ですか。— 询问退房时间 | NEW | 2 | scenario/context | 0 | HIGH CONFIDENCE | Service information |
| ADD | E | `35e1b-ja-d-hotel-booking-expr` | six-turn booking lookup/breakfast dialogue | SUPPORT | 2 | dialogue/context | 0 | HIGH CONFIDENCE | Covers check-in half of objective |

Final: **8/3/4; 11 assessable; 32 opportunities; 18 minutes retained.**

## 6. Difficulty continuity

Internal levels are not CEFR or JLPT. Japanese JLPT estimates, where present, were not used as selection targets.

| Lesson | V average current → proposed | G average current → proposed | Result |
|---|---:|---:|---|
| `en-s2-l5` | 2.00 → 2.13 | 1.50 → 1.33 | Stable; adds foundational existence grammar |
| `en-s3-l5` | 2.80 → 3.00 | 2.50 → 2.67 | Gentle advance |
| `en-s3-l6` | 2.40 → 2.38 | 2.50 → 3.00 | Vocabulary stable; grammar move needs review |
| `en-s3-l7` | 2.80 → 2.75 | 3.00 → 3.00 | Stable |
| `en-s3-l8` | 2.33 → 2.38 | 2.00 → 2.33 | Stable; one candidate needs contextual review |
| `en-s3-l9` | 2.80 → 2.88 | 3.00 → 2.67 | Stable; adds reviewed request form |
| `en-s4-l5` | 2.80 → 2.88 | 3.50 → 3.67 | Stable |
| `en-s4-l6` | 2.60 → 2.75 | 2.50 → 3.00 | Controlled Stage-4 advance |
| `ja-s2-l5` | 1.75 → 1.88 | 1.50 → 1.33 | Stable |
| `ja-s2-l6` | 2.20 → 2.38 | 2.00 → 2.00 | Stable |
| `ja-s3-l5` | 2.80 → 2.75 | 3.50 → 3.33 | Stable; warranty candidate requires review |
| `ja-s3-l6` | 2.40 → 2.38 | 3.00 → 3.00 | Stable |
| `ja-s3-l7` | 2.60 → 2.50 | 3.00 → 2.67 | Vocabulary/grammar stable; one difficulty-4 expression needs review |
| `ja-s3-l8` | 2.60 → 2.63 | 3.50 → 3.33 | Stable |
| `ja-s4-l5` | 2.60 → 2.63 | 3.00 → 3.33 | Gentle service-register advance |
| `ja-s4-l6` | 2.60 → 2.75 | 4.00 → 4.00 | Stable; intentional review |

No proposed vocabulary average jumps by more than 0.20. The only notable grammar movement is `en-s3-l6`, where `en-present-perfect` would move earlier than its current lesson use. That link remains `REVIEW REQUIRED`.

## 7. Practice readiness

| Lesson group | Final assessable | V modes | G base modes | Grammar with CC | Approx. opportunities | Phase 4E requirement |
|---|---:|---:|---:|---:|---:|---:|
| EN S2 L5; EN S3 L5/L6/L7; EN S4 L6 | 11 each | 24 | 6 | 2 | 32 | 5 |
| EN S3 L8 | 11 | 24 | 6 | 3 | 33 | 5 |
| EN S3 L9; EN S4 L5 | 11 each | 24 | 6 | 1 | 31 | 5 |
| JA S2 L5/L6 | 11 each | 24 | 6 | 3 | 33 | 5 |
| JA S3 L5/L6/L7; JA S4 L6 | 11 each | 24 | 6 | 2 | 32 | 5 |
| JA S3 L8; JA S4 L5 | 11 each | 24 | 6 | 1 | 31 | 5 |

All 16 configurations fall in the recommended 10–15 assessable and 25–40 opportunity ranges. No lesson remains numerically below target.

### Four current zero-controlled-completion lessons

| Lesson | Natural existing candidate | Recommendation |
|---|---|---|
| `en-s3-l9` | `en-could-request`; 7 examples, safe authored occurrences | Add as `REVIEW`; current dialogue already uses “Could you…” |
| `en-s4-l5` | `en-present-perfect-continuous`; expression `legacy-59-en` supplies the exact repair context | Add as `NEW`; no forced authoring needed |
| `ja-s3-l8` | `ja-indirect-ka`; safe authored occurrence exists | Keep `REVIEW REQUIRED` until a reviewer confirms it is a focus rather than a direct-question mismatch |
| `ja-s4-l5` | `ja-te-itadaku`; added repair expression uses the form | Add as `NEW`; no forced authoring needed |

All four gain at least one controlled-completion-capable grammar link. No exercise mode is manufactured.

## 8. Prerequisite integration proposal

### A. Required supplemental chain — recommended

Replace only these six edges in a later versioned bundle:

| Language/stage transition | Current edge | Proposed edge |
|---|---|---|
| EN 2→3 | `en-s3-l1 ← en-s2-l4` | `en-s3-l1 ← en-s2-l5` |
| EN 3→4 | `en-s4-l1 ← en-s3-l4` | `en-s4-l1 ← en-s3-l9` |
| EN 4→5 | `en-s5-l1 ← en-s4-l4` | `en-s5-l1 ← en-s4-l6` |
| JA 2→3 | `ja-s3-l1 ← ja-s2-l4` | `ja-s3-l1 ← ja-s2-l6` |
| JA 3→4 | `ja-s4-l1 ← ja-s3-l4` | `ja-s4-l1 ← ja-s3-l8` |
| JA 4→5 | `ja-s5-l1 ← ja-s4-l4` | `ja-s5-l1 ← ja-s4-l6` |

The internal supplemental chains already connect correctly. These replacements create one clear required path per language without cycles or cross-language edges.

### B. Optional branch — viable only with explicit product semantics

Keeping current edges is defensible if these lessons are explicitly labelled optional application practice. In that design, items marked `NEW` here must not become assumed prerequisites later, stage completion must visibly distinguish core from optional completion, and recommendations must surface the branch. The current UI/data semantics do not make that contract clear. For this reason A is recommended once human reviewers accept the matrix.

## 9. Bilingual coherence

| Theme | English final | Japanese final | Finding |
|---|---|---|---|
| Supermarket | 8/3/4, 32 opp. | 8/3/4, 33 opp. | Comparable; both cover location, price, payment, receipt |
| Returns | 8/3/4, 32 | 8/3/4, 32 | Comparable; JA warranty candidate needs review |
| Medical/pharmacy | 8/3/4, 32 | 8/3/4, 32 | Comparable; both add symptom duration and medicine dialogue |
| Appointments | EN-only sparse target | No paired sparse JA target | No forced translation or artificial JA addition |
| Mobile/network | 8/3/4, 33 | 8/3/4, 32 | Comparable; JA exact failure expression is harder and flagged |
| Workplace | 8/3/4, 31 | 8/3/4, 31 | Comparable; both cover reporting, feedback, coordination, clarification |
| Rent/repairs | 8/3/4, 31 | 8/3/4, 31 | Closely aligned without literal translation |
| Hotel | 8/3/4, 32 | 8/3/4, 32 | Closely aligned: booking, room issue, checkout |

No large final depth mismatch remains. Language-specific grammar and register choices remain independent.

## 10. Candidate totals and review queues

| Candidate additions | English | Japanese | Total |
|---|---:|---:|---:|
| Vocabulary | 24 | 25 | **49** |
| Grammar | 8 | 8 | **16** |
| Expressions | 24 | 24 | **48** |
| **All links** | **56** | **57** | **113** |

### HIGH CONFIDENCE

- Additions: **103**.
- Complete final matrix including existing links: **223**.
- These may advance to human line review; they are not pre-approved production rows.

### REVIEW REQUIRED

Ten proposed additions:

1. `en-c-969` in `en-s2-l5`: generic “卡片” sense versus payment-card use.
2. `35e1c-en-v089` in `en-s3-l7`: medical follow-up narrows a general appointment lesson.
3. `ja-c-971` in `ja-s2-l5`: generic “卡片” sense versus payment-card use.
4. `ja-c-663` in `ja-s3-l5`: level-4 warranty scope may be too broad.
5. `en-present-perfect` in `en-s3-l6`: would move a level-4 grammar earlier and has one example.
6. `en-not-quite` in `en-s3-l8`: exact task use needs a lesson-specific model.
7. `ja-indirect-ka` in `ja-s3-l8`: current dialogue contains direct clarification; focus boundary needs review.
8. `legacy-52-en` in `en-s4-l5`: housing fit but peripheral to repair/cost.
9. `legacy-76-ja` in `ja-s2-l5`: informal register beside a polite service dialogue.
10. `legacy-167-ja` in `ja-s3-l7`: exact fit but difficulty 4 is currently first used in Stage 5.

Seven existing links also remain `REVIEW REQUIRED`: two uses of `35e1c-ja-counter-system`, three uses of `35e1c-ja-condition-contrast`, and two uses of `35e1c-ja-workplace-register`.

### DO NOT ADD candidates

These existing records were considered but intentionally excluded from this matrix:

| Candidate | Lesson considered | Reason not to add |
|---|---|---|
| `en-c-3172` / do | `en-s2-l5` | Already used in 7 lessons and adds little scenario specificity |
| `en-c-661` / warranty | `en-s3-l5` | Wider consumer-policy scope than the selected concrete return language |
| `35e1c-en-negation-short-answers` | `en-s3-l8` | Foundational but less task-specific than partial-recovery language; avoid late token coverage |
| `35e1c-en-v035`, `v037`, `v038` | `en-s4-l5` | Tenant/deposit/lease would shift the repair lesson toward a second tenancy-law subtopic |
| `ja-c-235` / いい | `ja-s2-l5` | Already used in 4 lessons; no need to concentrate it further |
| `ja-koto-ga-aru` | `ja-s3-l6` | Experience grammar is not required for the symptom/advice task |
| `ja-te-itadaku` | `ja-s3-l8` | Polite request is plausible, but indirect clarification offers better task differentiation |
| `ja-honorific-request` | `ja-s4-l6` | More narrowly honorific and less reusable for the guest-side request than reviewing `ja-te-itadaku` |

`DO NOT ADD` applies to this matrix, not to the validity of the canonical records elsewhere.

## 11. Editorial improvement flags

### Vocabulary

- All 49 candidate vocabulary items already have at least one authored example.
- **44** have exactly one example and are marked `†`; add a second lesson-specific, human-reviewed example before or with implementation.
- The five candidates with 2–3 examples do not need an example solely to qualify: `en-c-969`, `en-c-397`, `ja-c-971` in two lessons, and `ja-c-399`.

### Grammar

- Eleven distinct proposed grammar records repeat semantic fields intended for different teaching purposes: `en-there-is`, `en-what-if`, `en-indirect-question`, `en-not-quite`, `en-could-request`, `en-present-perfect-continuous`, `en-possible-request`, `ja-de-place`, `ja-nara`, `ja-indirect-ka`, and `ja-te-itadaku`.
- Six proposed grammar records have only one example: `en-present-perfect`, `en-not-quite`, `en-present-perfect-continuous`, `en-possible-request`, `ja-indirect-ka`, and `ja-te-itadaku`. Their selection may still be valid, but lesson-specific examples need human review.
- `35e1c-ja-counter-system` exposes raw English `number + counter` in a Japanese learner-facing form.
- `35e1c-ja-condition-contrast` contains the malformed stored segment `た形ら` and combines four conditions in one focus.
- `35e1c-ja-workplace-register` aggregates polite, honorific, and humble systems. Review whether it is a contrast overview or an over-broad assessable form.
- All 16 proposed grammar links have selection/recall eligibility and at least one safe controlled-completion occurrence. No new answer key or accepted variant is proposed here.

### Expressions

- Fifteen selected legacy expression records have canonical text and an anchor but no separate context field. Add lesson-placement context during human review if the implementation requires it; do not rewrite the canonical expression automatically.
- Two-dialogue configurations in the medical/pharmacy and hotel lessons should be checked against the 18-minute duration. The second dialogue is `SUPPORT`, not a second mandatory mastery block.

## 12. Exact later implementation changes

If and only if the matrix is human approved, a later implementation would need to:

1. Create a new versioned lesson bundle or equivalent additive source change containing 113 new links: 49 vocabulary, 16 grammar, 48 expressions. Do not rewrite the historical bundle.
2. Preserve completion policy (`required_items = 5`) separately from instructional role. Add an explicit authored `NEW/REVIEW/SUPPORT` field; do not infer it from current `required/support` flags.
3. Apply the six prerequisite-edge replacements in section 8 and validate a single connected acyclic path per language.
4. Keep all 179 currently published grammar eligibility rules, including Hotfix 01 exclusion of `en-greeting` and `ja-greeting`.
5. Add only human-approved editorial improvements: up to 44 second vocabulary examples, grammar field/example corrections, and missing expression context. These are separate canonical-content changes from the link bundle.
6. Recalculate deterministic item counts, duplicate links, publication state, language match, level averages, CC safety, and Phase 4E five-item completion.
7. Run affected lesson, Phase 4E/4D/4C/4B/4F, content-quality, graph, responsive, and data-safety regressions in local and staging gates.
8. Perform the normal staged D1 migration/recovery process only in that later authorized task. This matrix itself is not executable data.

## 13. Human approval checklist

- [ ] A curriculum editor approves all 16 objectives and the 8/3/4 density for an 18-minute lesson.
- [ ] Every `NEW`, `REVIEW`, and `SUPPORT` role is explicitly accepted; it is not copied from current transport metadata.
- [ ] All ten addition-level `REVIEW REQUIRED` decisions are resolved or removed.
- [ ] The seven existing-link review flags are resolved, including `number + counter`, `た形ら`, and the broad workplace-register record.
- [ ] A language specialist verifies each grammar form, register, distractor safety, controlled-completion occurrence, and accepted answer policy.
- [ ] The 44 one-example vocabulary candidates receive a decision on a second lesson-specific example.
- [ ] The 15 legacy expressions without separate context receive a context decision.
- [ ] Reviewers confirm two dialogues fit within the medical and hotel lessons' 18-minute budgets.
- [ ] English/Japanese thematic parity is approved without forcing literal translation.
- [ ] Design A (required chain) is approved, or design B receives explicit optional-branch product semantics.
- [ ] The six prerequisite changes pass missing-edge, cycle, language, and reachability validation.
- [ ] JLPT community estimates are treated only as supplemental evidence; internal levels are not labelled JLPT or CEFR.
- [ ] No new canonical record, generated example, answer key, or accepted variant enters production without human approval.

## 14. Test-maintenance prerequisite completed separately

The two unstable Phase 3.5E.1C browser samples were repaired before matrix authoring. The generic C-list test now searches for and opens explicit fixture `35e1c-en-v010`; the IELTS A-list example test opens explicit fixture `35e1c-en-v069`. Neither depends on the historical 435/450 vocabulary size or arbitrary first-row placement.

Dedicated commit: `2d54ab9` — `test: remove stale curriculum dataset assumptions`.

Regression: `npm run test:35e1c` passed API 4/4 and browser checks at 360, 390, 430, 768, and 1440 px.

No curriculum source, lesson bundle, canonical record, migration, D1 database, Worker, or deployment was changed by this planning task.
