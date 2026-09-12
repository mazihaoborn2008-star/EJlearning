-- Phase 3.5E.1B: core expressions and multi-turn dialogue expansion.

-- Additive canonical content only. No lesson, vocabulary, grammar, learner, Dynamic AI, or production mutation.

PRAGMA foreign_keys=ON;

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-en-x-clarify-mean','你那句话是什么意思？','chat','scenario','没有听懂对方刚才的意思，请对方解释。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2673'),
('35e1b-en-x-clarify-specific','你能说得具体一点吗？','chat','scenario','需要对方补充具体信息。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2674'),
('35e1b-en-x-clarify-say-again','可以请你再说一遍吗？','help','scenario','在服务场景中没有听清。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2675'),
('35e1b-en-x-clarify-slower','你可以说慢一点吗？','help','scenario','请对方降低语速。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2676'),
('35e1b-en-x-clarify-spell','那个怎么拼？','help','scenario','确认姓名或生词的拼写。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2677'),
('35e1b-en-x-clarify-last-part','我没听清最后一部分。','chat','scenario','指出具体没有听清的位置。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2678'),
('35e1b-en-x-clarify-confirm-heard','你说的是十五还是五十？','chat','scenario','核对容易听错的数字。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2679'),
('35e1b-en-x-clarify-refer','你指的是哪一个？','chat','scenario','指代不清时要求明确。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2680'),
('35e1b-en-x-clarify-example','你能举个例子吗？','school','scenario','在课堂或讨论中请求例子。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2681'),
('35e1b-en-x-clarify-understand','我确认一下自己是否理解正确。','school','scenario','复述前先标明确认意图。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2682'),
('35e1b-en-x-clarify-in-other-words','也就是说，我们需要重新开始吗？','chat','scenario','用改述检查理解。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2683'),
('35e1b-en-x-clarify-correct-me','如果我理解错了，请纠正我。','school','scenario','在提出暂定理解前邀请纠正。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2684'),
('35e1b-en-x-follow-what-next','我们下一步该做什么？','chat','scenario','完成一步后询问下一步。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2685'),
('35e1b-en-x-follow-anything-else','你还需要别的吗？','shopping','scenario','服务人员确认是否还有需求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2686'),
('35e1b-en-x-follow-how-long','那需要多长时间？','time','scenario','追问预计耗时。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2687'),
('35e1b-en-x-follow-when-hear','我大概什么时候能收到回复？','time','scenario','正式跟进回复时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2688'),
('35e1b-en-x-follow-what-happened','后来发生了什么？','chat','scenario','听故事时自然追问。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2689'),
('35e1b-en-x-follow-how-go','事情进行得怎么样？','plans','scenario','跟进之前提过的活动。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2690'),
('35e1b-en-x-follow-need-bring','我需要带什么东西吗？','travel','scenario','预约或活动前确认准备事项。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2691'),
('35e1b-en-x-follow-who-contact','这件事我应该联系谁？','help','scenario','找到正确负责人。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2692'),
('35e1b-en-x-follow-other-options','我还有哪些其他选择？','shopping','scenario','当前方案不可行时追问替代方案。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2693'),
('35e1b-en-x-follow-check-later','我今天晚些时候再来确认可以吗？','time','scenario','约定稍后再次联系。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2694'),
('35e1b-en-x-confirm-right','对，就是这样。','chat','scenario','确认对方的理解。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2695'),
('35e1b-en-x-confirm-understood','明白了，谢谢你的解释。','chat','scenario','表示已经理解并结束澄清。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2696'),
('35e1b-en-x-confirm-plan','所以我们六点见，对吧？','plans','scenario','复核时间安排。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2697'),
('35e1b-en-x-confirm-booked','可以确认一下已经预约成功了吗？','time','scenario','要求服务方确认预约状态。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2698'),
('35e1b-en-x-confirm-email','可以给我发一封确认邮件吗？','school','scenario','请求书面确认。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2699'),
('35e1b-en-x-confirm-repeat-order','我来复述一下您的订单。','food','scenario','服务人员核对点单内容。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2700'),
('35e1b-en-x-confirm-if-changes','如果有变化，我会告诉你。','plans','scenario','确认后说明变更沟通方式。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2701'),
('35e1b-en-x-confirm-works','那个时间我可以。','time','scenario','接受提议的时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2702'),
('35e1b-en-x-confirm-agreed','好，我们有方案了。','school','scenario','讨论结束时总结达成一致。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2703'),
('35e1b-en-x-confirm-double-check','出发前我会再确认一次。','travel','scenario','说明最终核对动作。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2704'),
('35e1b-en-x-refuse-sorry-cant','抱歉，我去不了。','social','scenario','礼貌拒绝邀请。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2705'),
('35e1b-en-x-refuse-not-today','我可以帮忙，但今天不行。','help','scenario','带条件地接受请求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2706'),
('35e1b-en-x-refuse-not-comfortable','我对此不太自在。','social','scenario','明确但不过度强硬地设界限。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2707'),
('35e1b-en-x-refuse-appreciate-offer','谢谢你的好意，不过这次不用了。','social','scenario','礼貌拒绝提议。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2708'),
('35e1b-en-x-refuse-unable-refund','很抱歉，我们不能提供现金退款。','shopping','scenario','服务方说明限制。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2709'),
('35e1b-en-x-alternative-tomorrow','改成明天怎么样？','time','scenario','原时间不可行时提出替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2710'),
('35e1b-en-x-alternative-different-table','室外的桌子可以吗？','food','scenario','餐厅无原座位时提供替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2711'),
('35e1b-en-x-alternative-store-credit','我们可以改为提供店内余额。','shopping','scenario','退款不可行时提供替代方案。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2712');

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-en-x-alternative-split-work','我们分工怎么样？','school','scenario','小组任务中提出分工。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2713'),
('35e1b-en-x-alternative-call','如果现在不方便，我可以再打来。','help','scenario','发现时机不合适时提供替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2714'),
('35e1b-en-x-alternative-route','还有一条路线，不过时间更长。','travel','scenario','说明替代路线及代价。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2715'),
('35e1b-en-x-alternative-repair','如果今天修不好，可以借我一台暖气吗？','home','scenario','维修延迟时请求临时方案。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2716'),
('35e1b-en-x-alternative-online','我们可以改为线上进行吗？','time','scenario','改变会面方式。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2717'),
('35e1b-en-x-repair-wrong-word','抱歉，我不是那个意思。','chat','scenario','发现表达造成误解时修正。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2718'),
('35e1b-en-x-repair-start-again','我重新说一遍。','chat','scenario','表达混乱后重新组织。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2719'),
('35e1b-en-x-repair-rephrase','我换一种说法。','chat','scenario','用不同措辞修复理解。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2720'),
('35e1b-en-x-repair-correction','其实我说的是星期四，不是星期二。','chat','scenario','更正关键信息。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2721'),
('35e1b-en-x-repair-misunderstanding','我想这里有些误会。','social','scenario','温和指出双方理解不一致。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2722'),
('35e1b-en-x-repair-not-blaming','我不是在责怪你，我只是想弄清发生了什么。','social','scenario','缓和可能被听成指责的话。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2723'),
('35e1b-en-x-repair-tone','刚才的语气比我本意更强烈。','school','scenario','意识到语气过重后修复。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2724'),
('35e1b-en-x-repair-name','抱歉，我把你的名字叫错了。','social','scenario','纠正称呼错误。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2725'),
('35e1b-en-x-repair-order','不好意思，我点的是汤，不是沙拉。','food','scenario','餐厅中纠正上错的餐点。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2726'),
('35e1b-en-x-repair-which-bus','抱歉，我指的是十五路公交车。','travel','scenario','更正交通信息。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2727'),
('35e1b-en-x-food-ready-order','我们可以点餐了。','food','scenario','向服务员表示可以点单。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2728'),
('35e1b-en-x-food-recommend','你有什么推荐吗？','food','scenario','请服务员推荐菜品。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2729'),
('35e1b-en-x-food-allergy','我对花生过敏。','food','scenario','明确说明食物过敏。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2730'),
('35e1b-en-x-food-contain','这个含乳制品吗？','food','scenario','确认饮食限制。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2731'),
('35e1b-en-x-food-without','这个可以不放洋葱吗？','food','scenario','请求调整菜品。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2732'),
('35e1b-en-x-food-side','酱汁可以另外放吗？','food','scenario','请求酱汁分开放。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2733'),
('35e1b-en-x-food-bill','请给我们账单。','food','scenario','用餐结束后结账。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2734'),
('35e1b-en-x-food-split-bill','我们可以分开结账吗？','food','scenario','询问能否分账。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2735'),
('35e1b-en-x-appt-make','我想预约。','time','scenario','开始预约流程。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2736'),
('35e1b-en-x-appt-available','星期五有空档吗？','time','scenario','询问可预约时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2737'),
('35e1b-en-x-appt-reschedule','我需要改期。','time','scenario','主动提出更改预约。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2738'),
('35e1b-en-x-appt-cancel','我打电话来取消预约。','time','scenario','说明来电目的。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2739'),
('35e1b-en-x-appt-earlier','有更早的时间吗？','time','scenario','追问更早空档。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2740'),
('35e1b-en-x-appt-name','预约登记的名字是 Lee。','time','scenario','提供预约姓名。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2741'),
('35e1b-en-x-appt-arrive','我应该提前多久到？','time','scenario','询问到场时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2742'),
('35e1b-en-x-appt-confirm-day','再确认一下，是下周一。','time','scenario','复核日期。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2743'),
('35e1b-en-x-return-wrong-size','我想换一个尺码。','shopping','scenario','说明换货需求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2744'),
('35e1b-en-x-return-receipt','需要收据吗？','shopping','scenario','确认退换货材料。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2745'),
('35e1b-en-x-return-defective','用了两天后它就坏了。','shopping','scenario','说明商品故障。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2746'),
('35e1b-en-x-return-refund-card','退款会退回我的卡吗？','shopping','scenario','确认退款方式。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2747'),
('35e1b-en-x-return-policy','你们的退货政策是什么？','shopping','scenario','购买前或退货时询问规则。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2748'),
('35e1b-en-x-return-original','它还在原包装里。','shopping','scenario','说明商品状态。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2749'),
('35e1b-en-x-direction-get-station','去车站怎么走？','travel','scenario','问路。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2750'),
('35e1b-en-x-direction-right-way','我走对方向了吗？','travel','scenario','途中确认方向。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2751'),
('35e1b-en-x-direction-stop','我应该在哪一站下车？','travel','scenario','确认下车站。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2752');

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-en-x-direction-transfer','我需要换乘吗？','travel','scenario','确认交通换乘。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2753'),
('35e1b-en-x-direction-platform','它从哪个站台出发？','travel','scenario','确认出发站台。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2754'),
('35e1b-en-x-direction-delay','火车准点吗？','travel','scenario','确认交通延误。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2755'),
('35e1b-en-x-medical-symptom','我从昨天开始喉咙痛。','health','scenario','向医护人员描述症状和持续时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2756'),
('35e1b-en-x-medical-worse','晚上会更严重。','health','scenario','补充症状变化。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2757'),
('35e1b-en-x-hotel-quiet-room','可以给我一间更安静的房间吗？','travel','scenario','住宿中请求换房。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2758'),
('35e1b-en-x-hotel-checkout','几点退房？','travel','scenario','确认住宿退房时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2759'),
('35e1b-en-x-direction-show-map','可以在地图上给我指出来吗？','travel','scenario','听完路线后请求视觉确认。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2760'),
('35e1b-en-d-restaurant-allergy','确认过敏原后安全点餐。','food','dialogue','顾客在餐厅确认菜品是否含花生，并完成替换点单。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2761'),
('35e1b-en-d-restaurant-bill','核对账单错误并完成结账。','food','dialogue','顾客发现账单上多了一项，服务员核对并更正。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2762'),
('35e1b-en-d-appointment-reschedule','完成预约改期与最终确认。','time','dialogue','来电者把周二预约改到周四。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2763'),
('35e1b-en-d-appointment-cancel','取消预约并确认是否收费。','time','dialogue','来电者因生病取消预约。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2764'),
('35e1b-en-d-help-alternative','拒绝部分请求并提供可行替代。','help','dialogue','同学请求当晚帮忙搬家。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2765'),
('35e1b-en-d-return-exchange','凭收据完成尺码换货。','shopping','dialogue','顾客退回尺码不合适且未穿过的鞋。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2766'),
('35e1b-en-d-return-defect','说明故障并协商退款方式。','shopping','dialogue','顾客退回使用两天即故障的水壶。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2767'),
('35e1b-en-d-directions-repair','在误解目的地后修正问路。','travel','dialogue','旅客问去中央车站的路，对方先听成公交总站。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2768'),
('35e1b-en-d-train-transfer','确认换乘、站台与时间。','travel','dialogue','旅客询问前往机场的列车。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2769'),
('35e1b-en-d-group-work','分工并确认交付时间。','school','dialogue','学生为小组展示分配工作。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2770'),
('35e1b-en-d-group-disagree','表达不同意见并达成折中。','school','dialogue','小组对报告重点意见不同。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2771'),
('35e1b-en-d-repair-heating','报修暖气并确认临时方案。','home','dialogue','租客报告暖气不工作。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2772'),
('35e1b-en-d-repair-leak','报告漏水并说明紧急程度。','home','dialogue','租客发现水槽下漏水。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2773'),
('35e1b-en-d-medical-symptoms','描述症状、持续时间与严重程度。','health','dialogue','患者因喉咙痛和发烧看诊。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2774'),
('35e1b-en-d-pharmacy-medicine','确认药物用法和注意事项。','health','dialogue','顾客向药师询问止痛药。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2775'),
('35e1b-en-d-invitation-decline','礼貌拒绝邀请并提出另约。','social','dialogue','朋友邀请周五吃饭。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2776'),
('35e1b-en-d-invitation-condition','带条件接受邀请并确认细节。','social','dialogue','朋友邀请参加野餐。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2777'),
('35e1b-en-d-misunderstanding-time','修正时间误会并重新确认。','time','dialogue','两人对会议时间理解不同。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2778'),
('35e1b-en-d-misunderstanding-tone','解释语气并修复关系。','social','dialogue','同事觉得一句反馈太尖锐。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2779'),
('35e1b-en-d-hotel-room','报告房间问题并完成换房。','travel','dialogue','住客因街道噪声请求换房。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2780'),
('35e1b-en-d-hotel-booking','查找预订并确认早餐。','travel','dialogue','住客办理入住时预订记录不易找到。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2781'),
('35e1b-en-d-taxi-destination','确认目的地、路线和支付方式。','travel','dialogue','乘客乘出租车去酒店。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2782'),
('35e1b-en-d-bus-wrong-stop','发现坐错方向后获得补救路线。','travel','dialogue','乘客担心错过下车站。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2783'),
('35e1b-en-d-order-unavailable','菜品售罄后选择替代。','food','dialogue','餐厅告知顾客所点菜品卖完。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2784'),
('35e1b-en-d-dietary-clarify','澄清素食需求并确认配料。','food','dialogue','顾客确认汤是否真正适合素食者。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2785'),
('35e1b-en-d-school-deadline','请求延期并协商新截止时间。','school','dialogue','学生因生病请求作业延期。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2786'),
('35e1b-en-d-work-clarification','澄清任务范围并确认优先级。','school','dialogue','同事收到含糊的资料整理请求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2787'),
('35e1b-en-d-neighbour-noise','提出噪声问题并协商解决。','home','dialogue','邻居深夜音乐过大。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2788'),
('35e1b-en-d-wrong-delivery','说明送错商品并安排补发。','shopping','dialogue','网购顾客收到错误颜色。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2789'),
('35e1b-en-d-opinion-disagree','礼貌表达不同意见并追问理由。','chat','dialogue','朋友对城市禁车提议看法不同。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2790'),
('35e1b-en-d-lost-reservation','预订未显示时提供证据并取得替代安排。','time','dialogue','餐厅找不到顾客预订。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2791'),
('35e1b-en-d-flight-delay','航班延误后确认转机替代方案。','travel','dialogue','旅客因延误可能错过转机。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2792');

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-ja-x-clarify-mean','那是什么意思？','chat','scenario','没有理解对方刚才的意思，请对方解释。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2793'),
('35e1b-ja-x-clarify-specific','可以再具体说明一点吗？','chat','scenario','礼貌请求补充具体信息。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2794'),
('35e1b-ja-x-clarify-say-again','可以请您再说一遍吗？','help','scenario','在服务场景中没有听清。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2795'),
('35e1b-ja-x-clarify-slower','可以请您说慢一点吗？','help','scenario','礼貌请求降低语速。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2796'),
('35e1b-ja-x-clarify-reading','这个怎么读？','help','scenario','询问汉字或词语读法。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2797'),
('35e1b-ja-x-clarify-last-part','最后那部分我没听清。','chat','scenario','指出具体没有听清的位置。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2798'),
('35e1b-ja-x-clarify-confirm-heard','是十五天还是五十天？','chat','scenario','核对容易听错的数字。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2799'),
('35e1b-ja-x-clarify-refer','你指的是哪一个？','chat','scenario','指代不清时要求明确。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2800'),
('35e1b-ja-x-clarify-example','可以举个例子吗？','school','scenario','在课堂或讨论中请求例子。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2801'),
('35e1b-ja-x-clarify-understand','请让我确认一下自己的理解。','school','scenario','复述前先标明确认意图。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2802'),
('35e1b-ja-x-clarify-in-other-words','也就是说，要从头再来吗？','chat','scenario','用改述检查理解。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2803'),
('35e1b-ja-x-clarify-correct-me','如果我理解错了，请纠正我。','school','scenario','在提出暂定理解前邀请纠正。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2804'),
('35e1b-ja-x-follow-what-next','下一步该做什么？','chat','scenario','完成一步后询问下一步。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2805'),
('35e1b-ja-x-follow-anything-else','您还需要别的吗？','shopping','scenario','服务人员确认是否还有需求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2806'),
('35e1b-ja-x-follow-how-long','需要多长时间？','time','scenario','追问预计耗时。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2807'),
('35e1b-ja-x-follow-when-hear','大概什么时候能收到回复？','time','scenario','正式跟进回复时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2808'),
('35e1b-ja-x-follow-what-happened','后来怎么样了？','chat','scenario','听故事时自然追问。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2809'),
('35e1b-ja-x-follow-how-go','事情怎么样？','plans','scenario','跟进之前提过的活动。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2810'),
('35e1b-ja-x-follow-need-bring','需要带什么东西吗？','travel','scenario','预约或活动前确认准备事项。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2811'),
('35e1b-ja-x-follow-who-contact','这件事该联系哪位？','help','scenario','找到正确负责人。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2812'),
('35e1b-ja-x-follow-other-options','还有什么其他办法？','shopping','scenario','当前方案不可行时追问替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2813'),
('35e1b-ja-x-follow-check-later','今天晚些时候再确认可以吗？','time','scenario','约定稍后再次联系。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2814'),
('35e1b-ja-x-confirm-right','对，就是这样。','chat','scenario','确认对方的理解。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2815'),
('35e1b-ja-x-confirm-understood','明白了，谢谢你的解释。','chat','scenario','表示理解并结束澄清。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2816'),
('35e1b-ja-x-confirm-plan','那么，六点见对吧？','plans','scenario','复核时间安排。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2817'),
('35e1b-ja-x-confirm-booked','可以确认一下预约成功了吗？','time','scenario','要求服务方确认预约状态。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2818'),
('35e1b-ja-x-confirm-email','可以发一封确认邮件吗？','school','scenario','请求书面确认。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2819'),
('35e1b-ja-x-confirm-repeat-order','我确认一下您的点单。','food','scenario','服务人员核对点单内容。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2820'),
('35e1b-ja-x-confirm-if-changes','如果有变化，我会联系你。','plans','scenario','确认后说明变更沟通方式。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2821'),
('35e1b-ja-x-confirm-works','那个时间可以。','time','scenario','接受提议的时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2822'),
('35e1b-ja-x-confirm-agreed','那么，就按这个方案进行吧。','school','scenario','讨论结束时总结一致。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2823'),
('35e1b-ja-x-confirm-double-check','出发前我会再确认一次。','travel','scenario','说明最终核对动作。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2824'),
('35e1b-ja-x-refuse-sorry-cant','抱歉，这次去不了。','social','scenario','礼貌拒绝邀请。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2825'),
('35e1b-ja-x-refuse-not-today','可以帮忙，不过今天不行。','help','scenario','带条件地接受请求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2826'),
('35e1b-ja-x-refuse-not-comfortable','那样我有点为难。','social','scenario','委婉但明确地设界限。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2827'),
('35e1b-ja-x-refuse-appreciate-offer','谢谢您的好意，不过这次不用了。','social','scenario','正式礼貌拒绝。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2828'),
('35e1b-ja-x-refuse-unable-refund','很抱歉，不能现金退款。','shopping','scenario','服务方说明限制。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2829'),
('35e1b-ja-x-alternative-tomorrow','改成明天怎么样？','time','scenario','原时间不可行时提出替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2830'),
('35e1b-ja-x-alternative-different-table','室外座位可以吗？','food','scenario','餐厅无原座位时提供替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2831'),
('35e1b-ja-x-alternative-store-credit','可以改为提供店内使用的商品券。','shopping','scenario','退款不可行时提供替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2832');

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-ja-x-alternative-split-work','我们分工怎么样？','school','scenario','小组任务中提出分工。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2833'),
('35e1b-ja-x-alternative-call','如果现在忙，我稍后再打。','help','scenario','发现时机不合适时提供替代。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2834'),
('35e1b-ja-x-alternative-route','还有别的路线，不过更费时间。','travel','scenario','说明替代路线及代价。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2835'),
('35e1b-ja-x-alternative-repair','如果今天修不好，可以借我取暖设备吗？','home','scenario','维修延迟时请求临时方案。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2836'),
('35e1b-ja-x-alternative-online','改为线上可以吗？','time','scenario','改变会面方式。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2837'),
('35e1b-ja-x-repair-wrong-word','抱歉，我不是那个意思。','chat','scenario','发现表达造成误解时修正。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2838'),
('35e1b-ja-x-repair-start-again','我从头再说一遍。','chat','scenario','表达混乱后重新组织。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2839'),
('35e1b-ja-x-repair-rephrase','我换一种说法。','chat','scenario','用不同措辞修复理解。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2840'),
('35e1b-ja-x-repair-correction','抱歉，不是星期二，是星期四。','chat','scenario','更正关键信息。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2841'),
('35e1b-ja-x-repair-misunderstanding','好像有些误会。','social','scenario','温和指出理解不一致。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2842'),
('35e1b-ja-x-repair-not-blaming','我不是在责怪你，只是想知道发生了什么。','social','scenario','缓和可能被听成指责的话。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2843'),
('35e1b-ja-x-repair-tone','刚才说得有点重了。','school','scenario','意识到语气过重后修复。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2844'),
('35e1b-ja-x-repair-name','抱歉，我把您的名字叫错了。','social','scenario','纠正称呼错误。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2845'),
('35e1b-ja-x-repair-order','不好意思，我点的不是沙拉，是汤。','food','scenario','纠正上错的餐点。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2846'),
('35e1b-ja-x-repair-which-bus','抱歉，我指的是十五路公交车。','travel','scenario','更正交通信息。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2847'),
('35e1b-ja-x-food-ready-order','请帮我们点餐。','food','scenario','向服务员表示可以点单。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2848'),
('35e1b-ja-x-food-recommend','有什么推荐？','food','scenario','请服务员推荐菜品。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2849'),
('35e1b-ja-x-food-allergy','我对花生过敏。','food','scenario','明确说明食物过敏。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2850'),
('35e1b-ja-x-food-contain','这个含乳制品吗？','food','scenario','确认饮食限制。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2851'),
('35e1b-ja-x-food-without','可以不放洋葱吗？','food','scenario','请求调整菜品。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2852'),
('35e1b-ja-x-food-side','酱汁可以另外放吗？','food','scenario','请求酱汁分开放。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2853'),
('35e1b-ja-x-food-bill','请结账。','food','scenario','用餐结束后结账。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2854'),
('35e1b-ja-x-food-split-bill','可以分开付款吗？','food','scenario','询问能否分账。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2855'),
('35e1b-ja-x-appt-make','我想预约。','time','scenario','开始预约流程。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2856'),
('35e1b-ja-x-appt-available','星期五有空档吗？','time','scenario','询问可预约时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2857'),
('35e1b-ja-x-appt-reschedule','我想更改预约日期。','time','scenario','主动提出改期。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2858'),
('35e1b-ja-x-appt-cancel','我打电话来取消预约。','time','scenario','说明来电目的。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2859'),
('35e1b-ja-x-appt-earlier','有更早的时间吗？','time','scenario','追问更早空档。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2860'),
('35e1b-ja-x-appt-name','预约登记的是李。','time','scenario','提供预约姓名。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2861'),
('35e1b-ja-x-appt-arrive','应该提前几分钟到？','time','scenario','询问到场时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2862'),
('35e1b-ja-x-appt-confirm-day','确认一下，是下周一。','time','scenario','复核日期。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2863'),
('35e1b-ja-x-return-wrong-size','我想换一个尺码。','shopping','scenario','说明换货需求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2864'),
('35e1b-ja-x-return-receipt','需要收据吗？','shopping','scenario','确认退换货材料。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2865'),
('35e1b-ja-x-return-defective','用了两天后就不工作了。','shopping','scenario','说明商品故障。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2866'),
('35e1b-ja-x-return-refund-card','退款会退回卡里吗？','shopping','scenario','确认退款方式。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2867'),
('35e1b-ja-x-return-policy','请告诉我退货条件。','shopping','scenario','询问退货规则。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2868'),
('35e1b-ja-x-return-original','还在原来的盒子里。','shopping','scenario','说明商品状态。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2869'),
('35e1b-ja-x-direction-get-station','去车站怎么走？','travel','scenario','问路。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2870'),
('35e1b-ja-x-direction-right-way','走这条路对吗？','travel','scenario','途中确认方向。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2871'),
('35e1b-ja-x-direction-stop','应该在哪一站下车？','travel','scenario','确认下车站。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2872');

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-ja-x-direction-transfer','需要换乘吗？','travel','scenario','确认交通换乘。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2873'),
('35e1b-ja-x-direction-platform','从几号站台出发？','travel','scenario','确认出发站台。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2874'),
('35e1b-ja-x-direction-delay','电车准点运行吗？','travel','scenario','确认交通延误。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2875'),
('35e1b-ja-x-medical-symptom','从昨天开始喉咙痛。','health','scenario','向医护人员描述症状和持续时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2876'),
('35e1b-ja-x-medical-worse','到晚上会更严重。','health','scenario','补充症状变化。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2877'),
('35e1b-ja-x-hotel-quiet-room','可以换到更安静的房间吗？','travel','scenario','住宿中请求换房。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2878'),
('35e1b-ja-x-hotel-checkout','几点退房？','travel','scenario','确认退房时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2879'),
('35e1b-ja-x-service-onegaishimasu','请用这个。','shopping','scenario','付款或选择时指明对象。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2880'),
('35e1b-ja-x-service-kekkou','不用袋子。','shopping','scenario','在商店礼貌拒绝购物袋。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2881'),
('35e1b-ja-x-service-mochikaeri','这个请做成外带。','food','scenario','点餐时说明外带。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2882'),
('35e1b-ja-x-service-ryoushuusho','可以给我收据吗？','shopping','scenario','正式请求收据。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2883'),
('35e1b-ja-x-home-tachiai','维修时需要在场吗？','home','scenario','确认维修到访条件。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2884'),
('35e1b-ja-x-medical-kusuri','这个药饭后吃就可以吗？','health','scenario','向药师确认服药时间。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2885'),
('35e1b-ja-x-direction-show-map','可以在地图上指出位置吗？','travel','scenario','听完路线后请求视觉确认。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2886'),
('35e1b-ja-d-restaurant-allergy','确认过敏原后安全点餐。','food','dialogue','顾客在餐厅确认菜品是否含花生，并完成替换点单。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2887'),
('35e1b-ja-d-restaurant-bill','核对账单错误并完成结账。','food','dialogue','顾客发现账单上多了一项，服务员核对并更正。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2888'),
('35e1b-ja-d-appointment-reschedule','完成预约改期与最终确认。','time','dialogue','来电者把周二预约改到周四。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2889'),
('35e1b-ja-d-appointment-cancel','取消预约并确认是否收费。','time','dialogue','来电者因病取消预约。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2890'),
('35e1b-ja-d-help-alternative','拒绝部分请求并提供可行替代。','help','dialogue','同学请求当晚帮忙搬家。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2891'),
('35e1b-ja-d-return-exchange','凭收据完成尺码换货。','shopping','dialogue','顾客退回尺码不合适且未穿过的鞋。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2892'),
('35e1b-ja-d-return-defect','说明故障并协商退款方式。','shopping','dialogue','顾客退回使用两天即故障的水壶。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2893'),
('35e1b-ja-d-directions-repair','在误解目的地后修正问路。','travel','dialogue','旅客问去中央车站的路，对方先听成公交总站。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2894'),
('35e1b-ja-d-train-transfer','确认换乘、站台与时间。','travel','dialogue','旅客询问前往机场的电车。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2895'),
('35e1b-ja-d-group-work','分工并确认交付时间。','school','dialogue','学生为小组展示分配工作。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2896'),
('35e1b-ja-d-group-disagree','表达不同意见并达成折中。','school','dialogue','小组对报告重点意见不同。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2897'),
('35e1b-ja-d-repair-heating','报修暖气并确认临时方案。','home','dialogue','租客报告暖气不工作。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2898'),
('35e1b-ja-d-repair-leak','报告漏水并说明紧急程度。','home','dialogue','租客发现水槽下漏水。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2899'),
('35e1b-ja-d-medical-symptoms','描述症状、持续时间与严重程度。','health','dialogue','患者因喉咙痛和发烧看诊。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2900'),
('35e1b-ja-d-pharmacy-medicine','确认药物用法和注意事项。','health','dialogue','顾客向药师询问止痛药。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2901'),
('35e1b-ja-d-invitation-decline','礼貌拒绝邀请并提出另约。','social','dialogue','朋友邀请周五吃饭。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2902'),
('35e1b-ja-d-invitation-condition','带条件接受邀请并确认细节。','social','dialogue','朋友邀请参加野餐。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2903'),
('35e1b-ja-d-misunderstanding-time','修正时间误会并重新确认。','time','dialogue','两人对会议时间理解不同。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2904'),
('35e1b-ja-d-misunderstanding-tone','解释语气并修复关系。','social','dialogue','同事觉得一句反馈太尖锐。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2905'),
('35e1b-ja-d-hotel-room','报告房间问题并完成换房。','travel','dialogue','住客因街道噪声请求换房。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2906'),
('35e1b-ja-d-hotel-booking','查找预订并确认早餐。','travel','dialogue','住客办理入住时预订记录不易找到。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2907'),
('35e1b-ja-d-taxi-destination','确认目的地、路线和支付方式。','travel','dialogue','乘客乘出租车去酒店。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2908'),
('35e1b-ja-d-bus-wrong-stop','发现坐错方向后获得补救路线。','travel','dialogue','乘客担心错过下车站。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2909'),
('35e1b-ja-d-order-unavailable','菜品售罄后选择替代。','food','dialogue','餐厅告知顾客所点菜品卖完。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2910'),
('35e1b-ja-d-dietary-clarify','澄清素食需求并确认配料。','food','dialogue','顾客确认汤是否真正适合素食者。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2911'),
('35e1b-ja-d-school-deadline','请求延期并协商新截止时间。','school','dialogue','学生因病请求作业延期。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2912');

INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order) VALUES
('35e1b-ja-d-work-clarification','澄清任务范围并确认优先级。','school','dialogue','同事收到含糊的资料整理请求。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2913'),
('35e1b-ja-d-neighbour-noise','提出噪声问题并协商解决。','home','dialogue','邻居深夜音乐过大。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2914'),
('35e1b-ja-d-wrong-delivery','说明送错商品并安排补发。','shopping','dialogue','网购顾客收到错误颜色。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2915'),
('35e1b-ja-d-opinion-disagree','礼貌表达不同意见并追问理由。','chat','dialogue','朋友对市中心禁车提议看法不同。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2916'),
('35e1b-ja-d-lost-reservation','预订未显示时提供证据并取得替代安排。','time','dialogue','餐厅找不到顾客预订。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2917'),
('35e1b-ja-d-flight-delay','航班延误后确认转机替代方案。','travel','dialogue','旅客因延误可能错过转机。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2918'),
('35e1b-ja-d-counter-service','在柜台确认包装与收据。','shopping','dialogue','顾客购买礼物并请求包装。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2919'),
('35e1b-ja-d-clinic-reception','在诊所前台确认就诊与候诊。','health','dialogue','患者没有预约但症状加重。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2920'),
('35e1b-ja-d-delivery-time','协调送货时间并确认在场。','home','dialogue','配送人员提出工作日下午送货。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2921'),
('35e1b-ja-d-lost-property','描述失物并留下联系方式。','travel','dialogue','旅客在车站寻找遗失的包。','本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。','published','2922');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-en-x-clarify-mean-expr','35e1b-en-x-clarify-mean','en','What do you mean by that?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2673'),
('35e1b-en-x-clarify-specific-expr','35e1b-en-x-clarify-specific','en','Could you be more specific?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2674'),
('35e1b-en-x-clarify-say-again-expr','35e1b-en-x-clarify-say-again','en','Could you say that again, please?','1','polite','可复用核心表达块。',NULL,'[]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2675'),
('35e1b-en-x-clarify-slower-expr','35e1b-en-x-clarify-slower','en','Could you speak a little more slowly?','1','polite','可复用核心表达块。',NULL,'[]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2676'),
('35e1b-en-x-clarify-spell-expr','35e1b-en-x-clarify-spell','en','How do you spell that?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2677'),
('35e1b-en-x-clarify-last-part-expr','35e1b-en-x-clarify-last-part','en','I didn’t catch the last part.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2678'),
('35e1b-en-x-clarify-confirm-heard-expr','35e1b-en-x-clarify-confirm-heard','en','Did you say fifteen or fifty?','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2679'),
('35e1b-en-x-clarify-refer-expr','35e1b-en-x-clarify-refer','en','Which one are you referring to?','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2680'),
('35e1b-en-x-clarify-example-expr','35e1b-en-x-clarify-example','en','Could you give me an example?','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2681'),
('35e1b-en-x-clarify-understand-expr','35e1b-en-x-clarify-understand','en','Let me check that I understand correctly.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2682'),
('35e1b-en-x-clarify-in-other-words-expr','35e1b-en-x-clarify-in-other-words','en','So, in other words, we need to start over?','1','neutral','可复用核心表达块。',NULL,'[]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2683'),
('35e1b-en-x-clarify-correct-me-expr','35e1b-en-x-clarify-correct-me','en','Please correct me if I’m wrong.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2684'),
('35e1b-en-x-follow-what-next-expr','35e1b-en-x-follow-what-next','en','What should we do next?','1','neutral','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2685'),
('35e1b-en-x-follow-anything-else-expr','35e1b-en-x-follow-anything-else','en','Is there anything else you need?','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2686'),
('35e1b-en-x-follow-how-long-expr','35e1b-en-x-follow-how-long','en','How long will that take?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2687'),
('35e1b-en-x-follow-when-hear-expr','35e1b-en-x-follow-when-hear','en','When can I expect to hear back?','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2688'),
('35e1b-en-x-follow-what-happened-expr','35e1b-en-x-follow-what-happened','en','What happened after that?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2689'),
('35e1b-en-x-follow-how-go-expr','35e1b-en-x-follow-how-go','en','How did it go?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2690'),
('35e1b-en-x-follow-need-bring-expr','35e1b-en-x-follow-need-bring','en','Do I need to bring anything?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2691'),
('35e1b-en-x-follow-who-contact-expr','35e1b-en-x-follow-who-contact','en','Who should I contact about this?','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2692'),
('35e1b-en-x-follow-other-options-expr','35e1b-en-x-follow-other-options','en','What other options do I have?','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2693'),
('35e1b-en-x-follow-check-later-expr','35e1b-en-x-follow-check-later','en','Can I check back later today?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2694'),
('35e1b-en-x-confirm-right-expr','35e1b-en-x-confirm-right','en','That’s right.','1','neutral','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2695'),
('35e1b-en-x-confirm-understood-expr','35e1b-en-x-confirm-understood','en','Got it. Thanks for explaining.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2696'),
('35e1b-en-x-confirm-plan-expr','35e1b-en-x-confirm-plan','en','So we’re meeting at six, right?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2697'),
('35e1b-en-x-confirm-booked-expr','35e1b-en-x-confirm-booked','en','Could you confirm that it’s booked?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2698'),
('35e1b-en-x-confirm-email-expr','35e1b-en-x-confirm-email','en','Could you send me a confirmation email?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2699'),
('35e1b-en-x-confirm-repeat-order-expr','35e1b-en-x-confirm-repeat-order','en','Let me repeat your order.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2700'),
('35e1b-en-x-confirm-if-changes-expr','35e1b-en-x-confirm-if-changes','en','I’ll let you know if anything changes.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2701'),
('35e1b-en-x-confirm-works-expr','35e1b-en-x-confirm-works','en','That time works for me.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2702'),
('35e1b-en-x-confirm-agreed-expr','35e1b-en-x-confirm-agreed','en','All right, we have a plan.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2703'),
('35e1b-en-x-confirm-double-check-expr','35e1b-en-x-confirm-double-check','en','I’ll double-check before we leave.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2704'),
('35e1b-en-x-refuse-sorry-cant-expr','35e1b-en-x-refuse-sorry-cant','en','I’m sorry, but I can’t make it.','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2705'),
('35e1b-en-x-refuse-not-today-expr','35e1b-en-x-refuse-not-today','en','I can help, but not today.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2706'),
('35e1b-en-x-refuse-not-comfortable-expr','35e1b-en-x-refuse-not-comfortable','en','I’m not comfortable with that.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2707'),
('35e1b-en-x-refuse-appreciate-offer-expr','35e1b-en-x-refuse-appreciate-offer','en','I appreciate the offer, but I’ll pass.','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2708'),
('35e1b-en-x-refuse-unable-refund-expr','35e1b-en-x-refuse-unable-refund','en','I’m afraid we can’t offer a cash refund.','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2709'),
('35e1b-en-x-alternative-tomorrow-expr','35e1b-en-x-alternative-tomorrow','en','How about tomorrow instead?','1','neutral','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2710'),
('35e1b-en-x-alternative-different-table-expr','35e1b-en-x-alternative-different-table','en','Would a table outside be okay?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2711'),
('35e1b-en-x-alternative-store-credit-expr','35e1b-en-x-alternative-store-credit','en','We can offer store credit instead.','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2712');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-en-x-alternative-split-work-expr','35e1b-en-x-alternative-split-work','en','Why don’t we split the work?','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2713'),
('35e1b-en-x-alternative-call-expr','35e1b-en-x-alternative-call','en','If now isn’t a good time, I can call back.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2714'),
('35e1b-en-x-alternative-route-expr','35e1b-en-x-alternative-route','en','There’s another route, but it takes longer.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2715'),
('35e1b-en-x-alternative-repair-expr','35e1b-en-x-alternative-repair','en','If it can’t be fixed today, could you lend me a heater?','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2716'),
('35e1b-en-x-alternative-online-expr','35e1b-en-x-alternative-online','en','Could we do it online instead?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2717'),
('35e1b-en-x-repair-wrong-word-expr','35e1b-en-x-repair-wrong-word','en','Sorry, that’s not what I meant.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2718'),
('35e1b-en-x-repair-start-again-expr','35e1b-en-x-repair-start-again','en','Let me start again.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2719'),
('35e1b-en-x-repair-rephrase-expr','35e1b-en-x-repair-rephrase','en','Let me put that another way.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2720'),
('35e1b-en-x-repair-correction-expr','35e1b-en-x-repair-correction','en','Actually, I meant Thursday, not Tuesday.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2721'),
('35e1b-en-x-repair-misunderstanding-expr','35e1b-en-x-repair-misunderstanding','en','I think there’s been a misunderstanding.','1','neutral','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2722'),
('35e1b-en-x-repair-not-blaming-expr','35e1b-en-x-repair-not-blaming','en','I’m not blaming you; I’m trying to understand what happened.','1','neutral','可复用核心表达块。',NULL,'[]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2723'),
('35e1b-en-x-repair-tone-expr','35e1b-en-x-repair-tone','en','That came out more strongly than I intended.','1','neutral','可复用核心表达块。',NULL,'[]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2724'),
('35e1b-en-x-repair-name-expr','35e1b-en-x-repair-name','en','Sorry, I got your name wrong.','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2725'),
('35e1b-en-x-repair-order-expr','35e1b-en-x-repair-order','en','Sorry, I ordered the soup, not the salad.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2726'),
('35e1b-en-x-repair-which-bus-expr','35e1b-en-x-repair-which-bus','en','Sorry, I meant the number fifteen bus.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2727'),
('35e1b-en-x-food-ready-order-expr','35e1b-en-x-food-ready-order','en','We’re ready to order.','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2728'),
('35e1b-en-x-food-recommend-expr','35e1b-en-x-food-recommend','en','What would you recommend?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2729'),
('35e1b-en-x-food-allergy-expr','35e1b-en-x-food-allergy','en','I’m allergic to peanuts.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2730'),
('35e1b-en-x-food-contain-expr','35e1b-en-x-food-contain','en','Does this contain dairy?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2731'),
('35e1b-en-x-food-without-expr','35e1b-en-x-food-without','en','Could I have this without onions?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2732'),
('35e1b-en-x-food-side-expr','35e1b-en-x-food-side','en','Could we get the sauce on the side?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2733'),
('35e1b-en-x-food-bill-expr','35e1b-en-x-food-bill','en','Could we have the bill, please?','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2734'),
('35e1b-en-x-food-split-bill-expr','35e1b-en-x-food-split-bill','en','Could we split the bill?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2735'),
('35e1b-en-x-appt-make-expr','35e1b-en-x-appt-make','en','I’d like to make an appointment.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2736'),
('35e1b-en-x-appt-available-expr','35e1b-en-x-appt-available','en','Do you have anything available on Friday?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2737'),
('35e1b-en-x-appt-reschedule-expr','35e1b-en-x-appt-reschedule','en','I need to reschedule my appointment.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2738'),
('35e1b-en-x-appt-cancel-expr','35e1b-en-x-appt-cancel','en','I’m calling to cancel my appointment.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2739'),
('35e1b-en-x-appt-earlier-expr','35e1b-en-x-appt-earlier','en','Is there anything earlier?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2740'),
('35e1b-en-x-appt-name-expr','35e1b-en-x-appt-name','en','The appointment is under Lee.','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2741'),
('35e1b-en-x-appt-arrive-expr','35e1b-en-x-appt-arrive','en','How early should I arrive?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2742'),
('35e1b-en-x-appt-confirm-day-expr','35e1b-en-x-appt-confirm-day','en','Just to confirm, that’s next Monday.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2743'),
('35e1b-en-x-return-wrong-size-expr','35e1b-en-x-return-wrong-size','en','I’d like to exchange this for a different size.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2744'),
('35e1b-en-x-return-receipt-expr','35e1b-en-x-return-receipt','en','Do you need the receipt?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2745'),
('35e1b-en-x-return-defective-expr','35e1b-en-x-return-defective','en','It stopped working after two days.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2746'),
('35e1b-en-x-return-refund-card-expr','35e1b-en-x-return-refund-card','en','Will the refund go back to my card?','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2747'),
('35e1b-en-x-return-policy-expr','35e1b-en-x-return-policy','en','What is your return policy?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2748'),
('35e1b-en-x-return-original-expr','35e1b-en-x-return-original','en','It’s still in the original packaging.','1','polite','可复用核心表达块。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2749'),
('35e1b-en-x-direction-get-station-expr','35e1b-en-x-direction-get-station','en','How do I get to the station?','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2750'),
('35e1b-en-x-direction-right-way-expr','35e1b-en-x-direction-right-way','en','Am I going the right way?','1','neutral','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2751'),
('35e1b-en-x-direction-stop-expr','35e1b-en-x-direction-stop','en','Which stop should I get off at?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2752');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-en-x-direction-transfer-expr','35e1b-en-x-direction-transfer','en','Do I need to change trains?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2753'),
('35e1b-en-x-direction-platform-expr','35e1b-en-x-direction-platform','en','Which platform does it leave from?','1','polite','可复用核心表达块。',NULL,'[]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2754'),
('35e1b-en-x-direction-delay-expr','35e1b-en-x-direction-delay','en','Is the train running on time?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2755'),
('35e1b-en-x-medical-symptom-expr','35e1b-en-x-medical-symptom','en','I’ve had a sore throat since yesterday.','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2756'),
('35e1b-en-x-medical-worse-expr','35e1b-en-x-medical-worse','en','It gets worse at night.','1','neutral','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2757'),
('35e1b-en-x-hotel-quiet-room-expr','35e1b-en-x-hotel-quiet-room','en','Could I have a quieter room?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2758'),
('35e1b-en-x-hotel-checkout-expr','35e1b-en-x-hotel-checkout','en','What time is check-out?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2759'),
('35e1b-en-x-direction-show-map-expr','35e1b-en-x-direction-show-map','en','Could you show me where that is on the map?','1','polite','可复用核心表达块。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2760'),
('35e1b-en-d-restaurant-allergy-expr','35e1b-en-d-restaurant-allergy','en','Hi. Are you ready to order?
Almost. Does the curry contain peanuts?
The sauce does, but the tomato soup doesn’t.
Thanks. I’ll have the soup, then.
Certainly. I’ll note that you have a peanut allergy.
Thank you. I appreciate that.','1','polite','交际目标：确认过敏原后安全点餐。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2761'),
('35e1b-en-d-restaurant-bill-expr','35e1b-en-d-restaurant-bill','en','Excuse me, could we have the bill?
Of course. I’ll bring it over.
I think there’s an extra dessert on here.
You’re right. I’m sorry about that.
Could you remove it and let us pay separately?
Certainly. I’ll bring two corrected bills.','1','polite','交际目标：核对账单错误并完成结账。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2762'),
('35e1b-en-d-appointment-reschedule-expr','35e1b-en-d-appointment-reschedule','en','Good morning. I need to reschedule my appointment.
Certainly. What day is it booked for?
It’s under Lee for Tuesday at ten.
I have Thursday at eleven or Friday at nine.
Thursday at eleven works for me.
All right. Your appointment is now Thursday at eleven.','1','polite','交际目标：完成预约改期与最终确认。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2763'),
('35e1b-en-d-appointment-cancel-expr','35e1b-en-d-appointment-cancel','en','I’m calling to cancel my appointment tomorrow.
May I have the name on the booking?
It’s Morgan Chen.
Thank you. There’s no cancellation fee this time.
Great. Could you email me a confirmation?
Yes, I’ll send it right away.','1','polite','交际目标：取消预约并确认是否收费。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2764'),
('35e1b-en-d-help-alternative-expr','35e1b-en-d-help-alternative','en','Could you help me move tonight?
I can’t tonight, but I’m free tomorrow morning.
Would nine o’clock work?
I have class at nine. How about ten thirty?
Ten thirty is perfect. Thanks for offering another time.
No problem. Send me the address.','1','neutral','交际目标：拒绝部分请求并提供可行替代。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2765'),
('35e1b-en-d-return-exchange-expr','35e1b-en-d-return-exchange','en','Hi. I’d like to exchange these shoes.
Is there anything wrong with them?
No, they’re just too small. I haven’t worn them outside.
Do you have the receipt?
Yes. Could I try the next size up?
Of course. I’ll get that for you.','1','polite','交际目标：凭收据完成尺码换货。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2766'),
('35e1b-en-d-return-defect-expr','35e1b-en-d-return-defect','en','This kettle stopped working after two days.
I’m sorry to hear that. Do you have the receipt?
Yes. I’d prefer a refund rather than a replacement.
That’s fine. The refund will go back to your card.
How long will that take?
Usually three to five business days.','1','polite','交际目标：说明故障并协商退款方式。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2767'),
('35e1b-en-d-directions-repair-expr','35e1b-en-d-directions-repair','en','Excuse me, how do I get to Central Station?
The bus terminal is two blocks that way.
Sorry, I meant the train station.
Oh, I see. Take the next left and walk past the bank.
Is it far from there?
No, it’s about a five-minute walk.','1','polite','交际目标：在误解目的地后修正问路。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2768'),
('35e1b-en-d-train-transfer-expr','35e1b-en-d-train-transfer','en','Excuse me, is this the right train for the airport?
Not directly. You need to change at Central.
Which platform do I need there?
Platform six. The signs are easy to follow.
Will I have enough time to change?
Yes. You’ll have about twelve minutes.','1','polite','交际目标：确认换乘、站台与时间。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2769'),
('35e1b-en-d-group-work-expr','35e1b-en-d-group-work','en','How should we split the presentation?
I can do the introduction and the first two slides.
Could you also find one example for slide two?
Sure. Can you check the figures in the last section?
Yes. Let’s send everything to each other by Friday.
Agreed. Then we can practise on Monday.','1','neutral','交际目标：分工并确认交付时间。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2770'),
('35e1b-en-d-group-disagree-expr','35e1b-en-d-group-disagree','en','I think we should focus on the survey results.
I see your point, but the interviews explain why the results changed.
Are you suggesting we include both?
Yes, but we could shorten the background section.
That sounds reasonable. Let’s keep one paragraph of background.
Great. I’ll revise the outline.','1','neutral','交际目标：表达不同意见并达成折中。',NULL,'[]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2771'),
('35e1b-en-d-repair-heating-expr','35e1b-en-d-repair-heating','en','Hello. The heater in my flat isn’t working.
I’m sorry about that. Is it showing an error code?
Yes, it says E3, and the room is getting cold.
A technician can come tomorrow afternoon.
If it can’t be fixed then, could I borrow a portable heater?
Yes. We can leave one at reception today.','1','polite','交际目标：报修暖气并确认临时方案。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2772'),
('35e1b-en-d-repair-leak-expr','35e1b-en-d-repair-leak','en','There’s water leaking under the kitchen sink.
Is it a slow drip or a steady flow?
It’s a steady flow, so I’ve turned the water off.
Good. I’ll send someone within an hour.
Do I need to stay home?
Yes, please. The plumber will call before arriving.','1','polite','交际目标：报告漏水并说明紧急程度。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2773'),
('35e1b-en-d-medical-symptoms-expr','35e1b-en-d-medical-symptoms','en','What seems to be the problem?
I’ve had a sore throat since Monday, and I had a fever last night.
Are you having any trouble breathing?
No, but it hurts when I swallow.
All right. I’ll examine your throat first.
Okay. Thank you.','1','polite','交际目标：描述症状、持续时间与严重程度。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2774'),
('35e1b-en-d-pharmacy-medicine-expr','35e1b-en-d-pharmacy-medicine','en','Could you tell me how to take this medicine?
Take one tablet after food, up to three times a day.
Can I take it with my allergy medicine?
Let me check. What’s the name of that medicine?
It’s written on this box.
Thanks. These two are safe to take together.','1','polite','交际目标：确认药物用法和注意事项。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2775'),
('35e1b-en-d-invitation-decline-expr','35e1b-en-d-invitation-decline','en','Would you like to have dinner on Friday?
I’d love to, but I already have plans that evening.
No problem. Are you free over the weekend?
Sunday afternoon should work.
How about coffee at three?
Perfect. I’ll see you then.','1','neutral','交际目标：礼貌拒绝邀请并提出另约。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2776'),
('35e1b-en-d-invitation-condition-expr','35e1b-en-d-invitation-condition','en','We’re having a picnic on Saturday. Want to come?
Maybe. What time are you starting?
Around noon, at Riverside Park.
I can come if I finish work by eleven.
That’s fine. Just text me when you know.
Will do. Thanks for inviting me.','1','neutral','交际目标：带条件接受邀请并确认细节。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2777'),
('35e1b-en-d-misunderstanding-time-expr','35e1b-en-d-misunderstanding-time','en','I thought the meeting started at two.
It was moved to three yesterday.
Oh, I must have missed that message.
No worries. Can you still make it?
Yes. Just to confirm, it’s in Room 4 at three.
That’s right. See you there.','1','neutral','交际目标：修正时间误会并重新确认。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2778'),
('35e1b-en-d-misunderstanding-tone-expr','35e1b-en-d-misunderstanding-tone','en','Your comment in the meeting sounded quite critical.
I’m sorry. I was questioning the schedule, not your work.
Thanks for explaining. I thought you were blaming me.
I can see why it sounded that way.
Could we talk about the schedule again tomorrow?
Of course. I’ll be clearer next time.','1','neutral','交际目标：解释语气并修复关系。',NULL,'[]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2779'),
('35e1b-en-d-hotel-room-expr','35e1b-en-d-hotel-room','en','Hello. My room is very noisy at night.
I’m sorry. Is the noise coming from the street?
Yes. Do you have a quieter room available?
We have one on the sixth floor, but it has two single beds.
That’s fine. Can I move tonight?
Certainly. I’ll prepare the new key.','1','polite','交际目标：报告房间问题并完成换房。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2780'),
('35e1b-en-d-hotel-booking-expr','35e1b-en-d-hotel-booking','en','Hi. I have a booking under Patel.
I’m not seeing it yet. Could it be under another name?
Try Priya Patel. I booked it online last month.
Found it. You’re staying for three nights, correct?
Yes. Is breakfast included?
It is. Breakfast starts at seven.','1','polite','交际目标：查找预订并确认早餐。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2781'),
('35e1b-en-d-taxi-destination-expr','35e1b-en-d-taxi-destination','en','Could you take me to the Riverside Hotel, please?
Certainly. Do you mean the one on King Street?
Yes, that’s the one. How long will it take?
About twenty minutes if traffic is light.
Can I pay by card?
Yes, you can.','1','polite','交际目标：确认目的地、路线和支付方式。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2782'),
('35e1b-en-d-bus-wrong-stop-expr','35e1b-en-d-bus-wrong-stop','en','Does this bus stop near City Hospital?
No, this bus is going in the other direction.
Oh no. Where should I get off?
Get off at the next stop and take the 24 back.
Does the 24 stop outside the hospital?
Yes, right by the main entrance.','1','neutral','交际目标：发现坐错方向后获得补救路线。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2783'),
('35e1b-en-d-order-unavailable-expr','35e1b-en-d-order-unavailable','en','I’d like the grilled fish, please.
I’m sorry, we’ve sold out of the fish.
What would you recommend instead?
The chicken is similar, or we have a vegetable pasta.
I’ll try the pasta. Could I have it without cheese?
Of course.','1','polite','交际目标：菜品售罄后选择替代。',NULL,'[]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2784'),
('35e1b-en-d-dietary-clarify-expr','35e1b-en-d-dietary-clarify','en','Is the vegetable soup suitable for vegetarians?
Yes, it doesn’t contain any meat.
What about the stock? Is that vegetable stock too?
Let me check with the kitchen.
Thanks. I need to avoid chicken stock as well.
Understood. I’ll make sure before you order.','1','polite','交际目标：澄清素食需求并确认配料。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2785'),
('35e1b-en-d-school-deadline-expr','35e1b-en-d-school-deadline','en','Could I ask about the assignment deadline?
Of course. What’s the issue?
I’ve been ill, and I’m not going to finish by Thursday.
I can give you until Monday, but no later.
Monday would really help. Do I need to provide a medical note?
Not this time. Please email me the work by noon.','1','polite','交际目标：请求延期并协商新截止时间。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2786'),
('35e1b-en-d-work-clarification-expr','35e1b-en-d-work-clarification','en','Could you update the client file today?
Which part would you like me to update?
The contact details and the notes from yesterday’s call.
Should I leave the payment section unchanged?
Yes. Please focus on the contact information first.
Got it. I’ll send it to you by four.','1','neutral','交际目标：澄清任务范围并确认优先级。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2787'),
('35e1b-en-d-neighbour-noise-expr','35e1b-en-d-neighbour-noise','en','Hi. I’m sorry to bother you, but the music is coming through the wall.
Oh, I didn’t realize it was that loud.
Would you mind turning it down after ten?
Of course. We’re finishing soon anyway.
Thanks. I really appreciate it.
No problem, and sorry again.','1','polite','交际目标：提出噪声问题并协商解决。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2788'),
('35e1b-en-d-wrong-delivery-expr','35e1b-en-d-wrong-delivery','en','I received the wrong item in my order.
I’m sorry about that. What did you order?
A black jacket, but this one is blue.
I can send the correct one today.
Do I need to return this one first?
No. We’ll include a prepaid return label.','1','polite','交际目标：说明送错商品并安排补发。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2789'),
('35e1b-en-d-opinion-disagree-expr','35e1b-en-d-opinion-disagree','en','I think cars should be banned from the city centre.
I’m not sure I agree. Some people need to drive to work.
That’s true, but public transport could be improved.
Would you support a ban if buses ran more often?
Maybe during the busiest hours.
That sounds like a reasonable compromise.','1','neutral','交际目标：礼貌表达不同意见并追问理由。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2790'),
('35e1b-en-d-lost-reservation-expr','35e1b-en-d-lost-reservation','en','Hi. We have a reservation for four at seven.
I’m sorry, I can’t find it. What name is it under?
Taylor. I have the confirmation email here.
Thank you. It looks like it was entered for tomorrow.
We need a table tonight. Is anything available?
Yes, but there’ll be a fifteen-minute wait.','1','polite','交际目标：预订未显示时提供证据并取得替代安排。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2791'),
('35e1b-en-d-flight-delay-expr','35e1b-en-d-flight-delay','en','My flight is delayed, and I may miss my connection.
What is your final destination?
Wellington, via Sydney.
There’s a later flight from Sydney at eight.
Could you move me to that flight now?
Yes. I’ll rebook you and print a new boarding pass.','1','polite','交际目标：航班延误后确认转机替代方案。',NULL,'[]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2792');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-ja-x-clarify-mean-expr','35e1b-ja-x-clarify-mean','ja','それはどういう意味ですか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"それはどういう意味ですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2793'),
('35e1b-ja-x-clarify-specific-expr','35e1b-ja-x-clarify-specific','ja','もう少し具体的に教えていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"もう少し具体的に教えていただけますか。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2794'),
('35e1b-ja-x-clarify-say-again-expr','35e1b-ja-x-clarify-say-again','ja','もう一度言っていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"もう一度言っていただけますか。"}]','1','1','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2795'),
('35e1b-ja-x-clarify-slower-expr','35e1b-ja-x-clarify-slower','ja','もう少しゆっくり話していただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"もう少しゆっくり話していただけますか。"}]','1','1','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2796'),
('35e1b-ja-x-clarify-reading-expr','35e1b-ja-x-clarify-reading','ja','これは何と読みますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"これは何と読みますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2797'),
('35e1b-ja-x-clarify-last-part-expr','35e1b-ja-x-clarify-last-part','ja','最後のところが聞き取れませんでした。','1','neutral','可复用核心表达块。',NULL,'[{"text":"最後のところが聞き取れませんでした。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2798'),
('35e1b-ja-x-clarify-confirm-heard-expr','35e1b-ja-x-clarify-confirm-heard','ja','十五日ですか、五十日ですか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"十五日ですか、五十日ですか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2799'),
('35e1b-ja-x-clarify-refer-expr','35e1b-ja-x-clarify-refer','ja','どちらのことを言っていますか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"どちらのことを言っていますか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2800'),
('35e1b-ja-x-clarify-example-expr','35e1b-ja-x-clarify-example','ja','例を挙げていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"例を挙げていただけますか。"}]','3','3','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2801'),
('35e1b-ja-x-clarify-understand-expr','35e1b-ja-x-clarify-understand','ja','念のため、私の理解を確認させてください。','1','neutral','可复用核心表达块。',NULL,'[{"text":"念のため、私の理解を確認させてください。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2802'),
('35e1b-ja-x-clarify-in-other-words-expr','35e1b-ja-x-clarify-in-other-words','ja','つまり、最初からやり直すということですか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"つまり、最初からやり直すということですか。"}]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2803'),
('35e1b-ja-x-clarify-correct-me-expr','35e1b-ja-x-clarify-correct-me','ja','間違っていたら、直してください。','1','neutral','可复用核心表达块。',NULL,'[{"text":"間違っていたら、直してください。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2804'),
('35e1b-ja-x-follow-what-next-expr','35e1b-ja-x-follow-what-next','ja','次は何をすればいいですか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"次は何をすればいいですか。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2805'),
('35e1b-ja-x-follow-anything-else-expr','35e1b-ja-x-follow-anything-else','ja','ほかに何かございますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"ほかに何かございますか。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2806'),
('35e1b-ja-x-follow-how-long-expr','35e1b-ja-x-follow-how-long','ja','どのくらいかかりますか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"どのくらいかかりますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2807'),
('35e1b-ja-x-follow-when-hear-expr','35e1b-ja-x-follow-when-hear','ja','いつごろお返事をいただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"いつごろお返事をいただけますか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2808'),
('35e1b-ja-x-follow-what-happened-expr','35e1b-ja-x-follow-what-happened','ja','それから、どうなったの？','1','neutral','可复用核心表达块。',NULL,'[{"text":"それから、どうなったの？"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2809'),
('35e1b-ja-x-follow-how-go-expr','35e1b-ja-x-follow-how-go','ja','どうだった？','1','neutral','可复用核心表达块。',NULL,'[{"text":"どうだった？"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2810'),
('35e1b-ja-x-follow-need-bring-expr','35e1b-ja-x-follow-need-bring','ja','何か持っていくものはありますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"何か持っていくものはありますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2811'),
('35e1b-ja-x-follow-who-contact-expr','35e1b-ja-x-follow-who-contact','ja','この件は、どなたに連絡すればいいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"この件は、どなたに連絡すればいいですか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2812'),
('35e1b-ja-x-follow-other-options-expr','35e1b-ja-x-follow-other-options','ja','ほかにどんな方法がありますか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"ほかにどんな方法がありますか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2813'),
('35e1b-ja-x-follow-check-later-expr','35e1b-ja-x-follow-check-later','ja','今日、また後で確認してもいいですか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"今日、また後で確認してもいいですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2814'),
('35e1b-ja-x-confirm-right-expr','35e1b-ja-x-confirm-right','ja','はい、そのとおりです。','1','neutral','可复用核心表达块。',NULL,'[{"text":"はい、そのとおりです。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2815'),
('35e1b-ja-x-confirm-understood-expr','35e1b-ja-x-confirm-understood','ja','わかりました。説明してくれてありがとう。','1','neutral','可复用核心表达块。',NULL,'[{"text":"わかりました。説明してくれてありがとう。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2816'),
('35e1b-ja-x-confirm-plan-expr','35e1b-ja-x-confirm-plan','ja','では、六時に会うということでいいですね。','1','neutral','可复用核心表达块。',NULL,'[{"text":"では、六時に会うということでいいですね。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2817'),
('35e1b-ja-x-confirm-booked-expr','35e1b-ja-x-confirm-booked','ja','予約できているか確認していただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"予約できているか確認していただけますか。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2818'),
('35e1b-ja-x-confirm-email-expr','35e1b-ja-x-confirm-email','ja','確認のメールを送っていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"確認のメールを送っていただけますか。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2819'),
('35e1b-ja-x-confirm-repeat-order-expr','35e1b-ja-x-confirm-repeat-order','ja','ご注文を確認いたします。','1','polite','可复用核心表达块。',NULL,'[{"text":"ご注文を確認いたします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2820'),
('35e1b-ja-x-confirm-if-changes-expr','35e1b-ja-x-confirm-if-changes','ja','何か変わったら連絡します。','1','neutral','可复用核心表达块。',NULL,'[{"text":"何か変わったら連絡します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2821'),
('35e1b-ja-x-confirm-works-expr','35e1b-ja-x-confirm-works','ja','その時間で大丈夫です。','1','neutral','可复用核心表达块。',NULL,'[{"text":"その時間で大丈夫です。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2822'),
('35e1b-ja-x-confirm-agreed-expr','35e1b-ja-x-confirm-agreed','ja','では、この方針で進めましょう。','1','neutral','可复用核心表达块。',NULL,'[{"text":"では、この方針で進めましょう。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2823'),
('35e1b-ja-x-confirm-double-check-expr','35e1b-ja-x-confirm-double-check','ja','出発する前に、もう一度確認します。','1','neutral','可复用核心表达块。',NULL,'[{"text":"出発する前に、もう一度確認します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2824'),
('35e1b-ja-x-refuse-sorry-cant-expr','35e1b-ja-x-refuse-sorry-cant','ja','すみませんが、今回は行けません。','1','polite','可复用核心表达块。',NULL,'[{"text":"すみませんが、今回は行けません。"}]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2825'),
('35e1b-ja-x-refuse-not-today-expr','35e1b-ja-x-refuse-not-today','ja','手伝えるけど、今日は難しい。','1','neutral','可复用核心表达块。',NULL,'[{"text":"手伝えるけど、今日は難しい。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2826'),
('35e1b-ja-x-refuse-not-comfortable-expr','35e1b-ja-x-refuse-not-comfortable','ja','それはちょっと困ります。','1','neutral','可复用核心表达块。',NULL,'[{"text":"それはちょっと困ります。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2827'),
('35e1b-ja-x-refuse-appreciate-offer-expr','35e1b-ja-x-refuse-appreciate-offer','ja','お心遣いはありがたいのですが、今回は遠慮します。','1','polite','可复用核心表达块。',NULL,'[{"text":"お心遣いはありがたいのですが、今回は遠慮します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2828'),
('35e1b-ja-x-refuse-unable-refund-expr','35e1b-ja-x-refuse-unable-refund','ja','申し訳ありませんが、現金での返金はできません。','1','polite','可复用核心表达块。',NULL,'[{"text":"申し訳ありませんが、現金での返金はできません。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2829'),
('35e1b-ja-x-alternative-tomorrow-expr','35e1b-ja-x-alternative-tomorrow','ja','代わりに、明日はどうですか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"代わりに、明日はどうですか。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2830'),
('35e1b-ja-x-alternative-different-table-expr','35e1b-ja-x-alternative-different-table','ja','外の席でもよろしいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"外の席でもよろしいですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2831'),
('35e1b-ja-x-alternative-store-credit-expr','35e1b-ja-x-alternative-store-credit','ja','代わりに、店内で使える商品券をお渡しできます。','1','polite','可复用核心表达块。',NULL,'[{"text":"代わりに、店内で使える商品券をお渡しできます。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2832');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-ja-x-alternative-split-work-expr','35e1b-ja-x-alternative-split-work','ja','作業を分担しませんか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"作業を分担しませんか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2833'),
('35e1b-ja-x-alternative-call-expr','35e1b-ja-x-alternative-call','ja','今お忙しければ、後でかけ直します。','1','neutral','可复用核心表达块。',NULL,'[{"text":"今お忙しければ、後でかけ直します。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2834'),
('35e1b-ja-x-alternative-route-expr','35e1b-ja-x-alternative-route','ja','別の行き方もありますが、少し時間がかかります。','1','neutral','可复用核心表达块。',NULL,'[{"text":"別の行き方もありますが、少し時間がかかります。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2835'),
('35e1b-ja-x-alternative-repair-expr','35e1b-ja-x-alternative-repair','ja','今日直らない場合は、暖房器具を貸していただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"今日直らない場合は、暖房器具を貸していただけますか。"}]','3','3','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2836'),
('35e1b-ja-x-alternative-online-expr','35e1b-ja-x-alternative-online','ja','代わりに、オンラインでもよろしいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"代わりに、オンラインでもよろしいですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2837'),
('35e1b-ja-x-repair-wrong-word-expr','35e1b-ja-x-repair-wrong-word','ja','すみません、そういう意味ではありません。','1','neutral','可复用核心表达块。',NULL,'[{"text":"すみません、そういう意味ではありません。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2838'),
('35e1b-ja-x-repair-start-again-expr','35e1b-ja-x-repair-start-again','ja','最初から言い直します。','1','neutral','可复用核心表达块。',NULL,'[{"text":"最初から言い直します。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2839'),
('35e1b-ja-x-repair-rephrase-expr','35e1b-ja-x-repair-rephrase','ja','別の言い方をしますね。','1','neutral','可复用核心表达块。',NULL,'[{"text":"別の言い方をしますね。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2840'),
('35e1b-ja-x-repair-correction-expr','35e1b-ja-x-repair-correction','ja','すみません、火曜日ではなく木曜日です。','1','neutral','可复用核心表达块。',NULL,'[{"text":"すみません、火曜日ではなく木曜日です。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2841'),
('35e1b-ja-x-repair-misunderstanding-expr','35e1b-ja-x-repair-misunderstanding','ja','何か誤解があるようです。','1','neutral','可复用核心表达块。',NULL,'[{"text":"何か誤解があるようです。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2842'),
('35e1b-ja-x-repair-not-blaming-expr','35e1b-ja-x-repair-not-blaming','ja','責めているのではなく、何があったのか知りたいんです。','1','neutral','可复用核心表达块。',NULL,'[{"text":"責めているのではなく、何があったのか知りたいんです。"}]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2843'),
('35e1b-ja-x-repair-tone-expr','35e1b-ja-x-repair-tone','ja','少し強い言い方になってしまいました。','1','neutral','可复用核心表达块。',NULL,'[{"text":"少し強い言い方になってしまいました。"}]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2844'),
('35e1b-ja-x-repair-name-expr','35e1b-ja-x-repair-name','ja','すみません、お名前を間違えました。','1','polite','可复用核心表达块。',NULL,'[{"text":"すみません、お名前を間違えました。"}]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2845'),
('35e1b-ja-x-repair-order-expr','35e1b-ja-x-repair-order','ja','すみません、注文したのはサラダではなくスープです。','1','polite','可复用核心表达块。',NULL,'[{"text":"すみません、注文したのはサラダではなくスープです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2846'),
('35e1b-ja-x-repair-which-bus-expr','35e1b-ja-x-repair-which-bus','ja','すみません、十五番のバスのことです。','1','neutral','可复用核心表达块。',NULL,'[{"text":"すみません、十五番のバスのことです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2847'),
('35e1b-ja-x-food-ready-order-expr','35e1b-ja-x-food-ready-order','ja','注文をお願いします。','1','polite','可复用核心表达块。',NULL,'[{"text":"注文をお願いします。"}]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2848'),
('35e1b-ja-x-food-recommend-expr','35e1b-ja-x-food-recommend','ja','おすすめは何ですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"おすすめは何ですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2849'),
('35e1b-ja-x-food-allergy-expr','35e1b-ja-x-food-allergy','ja','ピーナッツアレルギーがあります。','1','polite','可复用核心表达块。',NULL,'[{"text":"ピーナッツアレルギーがあります。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2850'),
('35e1b-ja-x-food-contain-expr','35e1b-ja-x-food-contain','ja','これは乳製品が入っていますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"これは乳製品が入っていますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2851'),
('35e1b-ja-x-food-without-expr','35e1b-ja-x-food-without','ja','玉ねぎ抜きにできますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"玉ねぎ抜きにできますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2852'),
('35e1b-ja-x-food-side-expr','35e1b-ja-x-food-side','ja','ソースは別にしていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"ソースは別にしていただけますか。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2853'),
('35e1b-ja-x-food-bill-expr','35e1b-ja-x-food-bill','ja','お会計をお願いします。','1','polite','可复用核心表达块。',NULL,'[{"text":"お会計をお願いします。"}]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2854'),
('35e1b-ja-x-food-split-bill-expr','35e1b-ja-x-food-split-bill','ja','別々に払えますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"別々に払えますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2855'),
('35e1b-ja-x-appt-make-expr','35e1b-ja-x-appt-make','ja','予約を取りたいのですが。','1','polite','可复用核心表达块。',NULL,'[{"text":"予約を取りたいのですが。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2856'),
('35e1b-ja-x-appt-available-expr','35e1b-ja-x-appt-available','ja','金曜日に空いている時間はありますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"金曜日に空いている時間はありますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2857'),
('35e1b-ja-x-appt-reschedule-expr','35e1b-ja-x-appt-reschedule','ja','予約の日を変更したいのですが。','1','polite','可复用核心表达块。',NULL,'[{"text":"予約の日を変更したいのですが。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2858'),
('35e1b-ja-x-appt-cancel-expr','35e1b-ja-x-appt-cancel','ja','予約をキャンセルしたくて、お電話しました。','1','polite','可复用核心表达块。',NULL,'[{"text":"予約をキャンセルしたくて、お電話しました。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2859'),
('35e1b-ja-x-appt-earlier-expr','35e1b-ja-x-appt-earlier','ja','もう少し早い時間はありますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"もう少し早い時間はありますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2860'),
('35e1b-ja-x-appt-name-expr','35e1b-ja-x-appt-name','ja','李の名前で予約しています。','1','polite','可复用核心表达块。',NULL,'[{"text":"李の名前で予約しています。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2861'),
('35e1b-ja-x-appt-arrive-expr','35e1b-ja-x-appt-arrive','ja','何分前に行けばいいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"何分前に行けばいいですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2862'),
('35e1b-ja-x-appt-confirm-day-expr','35e1b-ja-x-appt-confirm-day','ja','確認ですが、来週の月曜日ですね。','1','neutral','可复用核心表达块。',NULL,'[{"text":"確認ですが、来週の月曜日ですね。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2863'),
('35e1b-ja-x-return-wrong-size-expr','35e1b-ja-x-return-wrong-size','ja','違うサイズに交換したいのですが。','1','polite','可复用核心表达块。',NULL,'[{"text":"違うサイズに交換したいのですが。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2864'),
('35e1b-ja-x-return-receipt-expr','35e1b-ja-x-return-receipt','ja','レシートは必要ですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"レシートは必要ですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2865'),
('35e1b-ja-x-return-defective-expr','35e1b-ja-x-return-defective','ja','二日使ったら動かなくなりました。','1','polite','可复用核心表达块。',NULL,'[{"text":"二日使ったら動かなくなりました。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2866'),
('35e1b-ja-x-return-refund-card-expr','35e1b-ja-x-return-refund-card','ja','返金はカードに戻りますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"返金はカードに戻りますか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2867'),
('35e1b-ja-x-return-policy-expr','35e1b-ja-x-return-policy','ja','返品の条件を教えてください。','1','polite','可复用核心表达块。',NULL,'[{"text":"返品の条件を教えてください。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2868'),
('35e1b-ja-x-return-original-expr','35e1b-ja-x-return-original','ja','まだ元の箱に入っています。','1','polite','可复用核心表达块。',NULL,'[{"text":"まだ元の箱に入っています。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2869'),
('35e1b-ja-x-direction-get-station-expr','35e1b-ja-x-direction-get-station','ja','駅へはどう行けばいいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"駅へはどう行けばいいですか。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2870'),
('35e1b-ja-x-direction-right-way-expr','35e1b-ja-x-direction-right-way','ja','この道で合っていますか。','1','neutral','可复用核心表达块。',NULL,'[{"text":"この道で合っていますか。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2871'),
('35e1b-ja-x-direction-stop-expr','35e1b-ja-x-direction-stop','ja','どの停留所で降りればいいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"どの停留所で降りればいいですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2872');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-ja-x-direction-transfer-expr','35e1b-ja-x-direction-transfer','ja','乗り換えは必要ですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"乗り換えは必要ですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2873'),
('35e1b-ja-x-direction-platform-expr','35e1b-ja-x-direction-platform','ja','何番線から出ますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"何番線から出ますか。"}]','1','1','1','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2874'),
('35e1b-ja-x-direction-delay-expr','35e1b-ja-x-direction-delay','ja','電車は時間どおりに動いていますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"電車は時間どおりに動いていますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2875'),
('35e1b-ja-x-medical-symptom-expr','35e1b-ja-x-medical-symptom','ja','昨日から喉が痛いです。','1','polite','可复用核心表达块。',NULL,'[{"text":"昨日から喉が痛いです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2876'),
('35e1b-ja-x-medical-worse-expr','35e1b-ja-x-medical-worse','ja','夜になると、もっとひどくなります。','1','neutral','可复用核心表达块。',NULL,'[{"text":"夜になると、もっとひどくなります。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2877'),
('35e1b-ja-x-hotel-quiet-room-expr','35e1b-ja-x-hotel-quiet-room','ja','もう少し静かな部屋に替えていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"もう少し静かな部屋に替えていただけますか。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2878'),
('35e1b-ja-x-hotel-checkout-expr','35e1b-ja-x-hotel-checkout','ja','チェックアウトは何時ですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"チェックアウトは何時ですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2879'),
('35e1b-ja-x-service-onegaishimasu-expr','35e1b-ja-x-service-onegaishimasu','ja','こちらでお願いします。','1','polite','可复用核心表达块。',NULL,'[{"text":"こちらでお願いします。"}]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2880'),
('35e1b-ja-x-service-kekkou-expr','35e1b-ja-x-service-kekkou','ja','袋は結構です。','1','polite','可复用核心表达块。',NULL,'[{"text":"袋は結構です。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2881'),
('35e1b-ja-x-service-mochikaeri-expr','35e1b-ja-x-service-mochikaeri','ja','こちらは持ち帰りでお願いします。','1','polite','可复用核心表达块。',NULL,'[{"text":"こちらは持ち帰りでお願いします。"}]','1','1','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2882'),
('35e1b-ja-x-service-ryoushuusho-expr','35e1b-ja-x-service-ryoushuusho','ja','領収書をいただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"領収書をいただけますか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2883'),
('35e1b-ja-x-home-tachiai-expr','35e1b-ja-x-home-tachiai','ja','修理のときは立ち会いが必要ですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"修理のときは立ち会いが必要ですか。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2884'),
('35e1b-ja-x-medical-kusuri-expr','35e1b-ja-x-medical-kusuri','ja','この薬は食後に飲めばいいですか。','1','polite','可复用核心表达块。',NULL,'[{"text":"この薬は食後に飲めばいいですか。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2885'),
('35e1b-ja-x-direction-show-map-expr','35e1b-ja-x-direction-show-map','ja','地図で場所を教えていただけますか。','1','polite','可复用核心表达块。',NULL,'[{"text":"地図で場所を教えていただけますか。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2886'),
('35e1b-ja-d-restaurant-allergy-expr','35e1b-ja-d-restaurant-allergy','ja','ご注文はお決まりですか。
もう少しです。このカレーにピーナッツは入っていますか。
ソースには入っていますが、トマトスープには入っていません。
では、スープをお願いします。
かしこまりました。ピーナッツアレルギーがあることも伝えます。
ありがとうございます。助かります。','1','polite','交际目标：确认过敏原后安全点餐。',NULL,'[{"text":"ご注文はお決まりですか。\nもう少しです。このカレーにピーナッツは入っていますか。\nソースには入っていますが、トマトスープには入っていません。\nでは、スープをお願いします。\nかしこまりました。ピーナッツアレルギーがあることも伝えます。\nありがとうございます。助かります。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2887'),
('35e1b-ja-d-restaurant-bill-expr','35e1b-ja-d-restaurant-bill','ja','すみません、お会計をお願いします。
かしこまりました。すぐにお持ちします。
このデザートは注文していないと思います。
申し訳ありません。こちらの間違いです。
これを外して、別々に払えますか。
はい。訂正した伝票を二枚お持ちします。','1','polite','交际目标：核对账单错误并完成结账。',NULL,'[{"text":"すみません、お会計をお願いします。\nかしこまりました。すぐにお持ちします。\nこのデザートは注文していないと思います。\n申し訳ありません。こちらの間違いです。\nこれを外して、別々に払えますか。\nはい。訂正した伝票を二枚お持ちします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2888'),
('35e1b-ja-d-appointment-reschedule-expr','35e1b-ja-d-appointment-reschedule','ja','予約の日を変更したいのですが。
かしこまりました。現在は何曜日のご予約ですか。
李の名前で、火曜日の十時です。
木曜日の十一時か、金曜日の九時が空いています。
木曜日の十一時でお願いします。
では、木曜日の十一時に変更いたします。','1','polite','交际目标：完成预约改期与最终确认。',NULL,'[{"text":"予約の日を変更したいのですが。\nかしこまりました。現在は何曜日のご予約ですか。\n李の名前で、火曜日の十時です。\n木曜日の十一時か、金曜日の九時が空いています。\n木曜日の十一時でお願いします。\nでは、木曜日の十一時に変更いたします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2889'),
('35e1b-ja-d-appointment-cancel-expr','35e1b-ja-d-appointment-cancel','ja','明日の予約をキャンセルしたいのですが。
ご予約のお名前をお願いします。
モーガン・チェンです。
ありがとうございます。今回はキャンセル料はかかりません。
確認のメールを送っていただけますか。
はい、すぐにお送りします。','1','polite','交际目标：取消预约并确认是否收费。',NULL,'[{"text":"明日の予約をキャンセルしたいのですが。\nご予約のお名前をお願いします。\nモーガン・チェンです。\nありがとうございます。今回はキャンセル料はかかりません。\n確認のメールを送っていただけますか。\nはい、すぐにお送りします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2890'),
('35e1b-ja-d-help-alternative-expr','35e1b-ja-d-help-alternative','ja','今夜、引っ越しを手伝ってくれない？
今夜は無理だけど、明日の朝なら空いてるよ。
九時はどう？
九時は授業があるんだ。十時半ならどう？
十時半で大丈夫。別の時間を考えてくれてありがとう。
うん。住所を送って。','1','neutral','交际目标：拒绝部分请求并提供可行替代。',NULL,'[{"text":"今夜、引っ越しを手伝ってくれない？\n今夜は無理だけど、明日の朝なら空いてるよ。\n九時はどう？\n九時は授業があるんだ。十時半ならどう？\n十時半で大丈夫。別の時間を考えてくれてありがとう。\nうん。住所を送って。"}]','2','2','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2891'),
('35e1b-ja-d-return-exchange-expr','35e1b-ja-d-return-exchange','ja','この靴を交換したいのですが。
何か問題がございましたか。
いいえ、少し小さいだけです。外では履いていません。
レシートはお持ちですか。
はい。一つ上のサイズを試せますか。
もちろんです。お持ちします。','1','polite','交际目标：凭收据完成尺码换货。',NULL,'[{"text":"この靴を交換したいのですが。\n何か問題がございましたか。\nいいえ、少し小さいだけです。外では履いていません。\nレシートはお持ちですか。\nはい。一つ上のサイズを試せますか。\nもちろんです。お持ちします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2892'),
('35e1b-ja-d-return-defect-expr','35e1b-ja-d-return-defect','ja','この電気ケトルが、二日で動かなくなりました。
申し訳ありません。レシートはお持ちですか。
はい。交換ではなく、返金をお願いします。
かしこまりました。カードに返金いたします。
返金までどのくらいかかりますか。
通常は三日から五営業日です。','1','polite','交际目标：说明故障并协商退款方式。',NULL,'[{"text":"この電気ケトルが、二日で動かなくなりました。\n申し訳ありません。レシートはお持ちですか。\nはい。交換ではなく、返金をお願いします。\nかしこまりました。カードに返金いたします。\n返金までどのくらいかかりますか。\n通常は三日から五営業日です。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2893'),
('35e1b-ja-d-directions-repair-expr','35e1b-ja-d-directions-repair','ja','すみません、中央駅へはどう行けばいいですか。
バスターミナルなら、あちらへ二ブロックです。
すみません、バスではなく電車の駅です。
ああ、わかりました。次の角を左に曲がって、銀行を通り過ぎてください。
そこから遠いですか。
いいえ、歩いて五分くらいです。','1','polite','交际目标：在误解目的地后修正问路。',NULL,'[{"text":"すみません、中央駅へはどう行けばいいですか。\nバスターミナルなら、あちらへ二ブロックです。\nすみません、バスではなく電車の駅です。\nああ、わかりました。次の角を左に曲がって、銀行を通り過ぎてください。\nそこから遠いですか。\nいいえ、歩いて五分くらいです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2894'),
('35e1b-ja-d-train-transfer-expr','35e1b-ja-d-train-transfer','ja','すみません、空港へ行くならこの電車で合っていますか。
直接は行きません。中央駅で乗り換えてください。
中央駅では何番線ですか。
六番線です。案内表示があります。
乗り換える時間は十分ありますか。
はい、十二分ほどあります。','1','polite','交际目标：确认换乘、站台与时间。',NULL,'[{"text":"すみません、空港へ行くならこの電車で合っていますか。\n直接は行きません。中央駅で乗り換えてください。\n中央駅では何番線ですか。\n六番線です。案内表示があります。\n乗り換える時間は十分ありますか。\nはい、十二分ほどあります。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2895'),
('35e1b-ja-d-group-work-expr','35e1b-ja-d-group-work','ja','発表の作業をどう分けようか。
私は導入と最初の二枚のスライドを担当するよ。
二枚目に入れる例も一つ探してくれる？
いいよ。最後の数字を確認してもらえる？
うん。金曜日までにお互いに送ろう。
わかった。月曜日に練習できるね。','1','neutral','交际目标：分工并确认交付时间。',NULL,'[{"text":"発表の作業をどう分けようか。\n私は導入と最初の二枚のスライドを担当するよ。\n二枚目に入れる例も一つ探してくれる？\nいいよ。最後の数字を確認してもらえる？\nうん。金曜日までにお互いに送ろう。\nわかった。月曜日に練習できるね。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2896'),
('35e1b-ja-d-group-disagree-expr','35e1b-ja-d-group-disagree','ja','アンケートの結果を中心にしたほうがいいと思います。
言いたいことはわかりますが、インタビューが変化の理由を説明しています。
両方入れるということですか。
はい。ただ、背景の部分は短くできます。
それならよさそうです。背景は一段落だけ残しましょう。
では、私が構成を直します。','1','neutral','交际目标：表达不同意见并达成折中。',NULL,'[{"text":"アンケートの結果を中心にしたほうがいいと思います。\n言いたいことはわかりますが、インタビューが変化の理由を説明しています。\n両方入れるということですか。\nはい。ただ、背景の部分は短くできます。\nそれならよさそうです。背景は一段落だけ残しましょう。\nでは、私が構成を直します。"}]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2897'),
('35e1b-ja-d-repair-heating-expr','35e1b-ja-d-repair-heating','ja','部屋の暖房が動かないのですが。
申し訳ありません。エラー番号は出ていますか。
はい、E3と出ています。部屋も寒くなってきました。
明日の午後なら修理の者が伺えます。
明日直らなかった場合、暖房器具を借りられますか。
はい。今日、受付にご用意します。','1','polite','交际目标：报修暖气并确认临时方案。',NULL,'[{"text":"部屋の暖房が動かないのですが。\n申し訳ありません。エラー番号は出ていますか。\nはい、E3と出ています。部屋も寒くなってきました。\n明日の午後なら修理の者が伺えます。\n明日直らなかった場合、暖房器具を借りられますか。\nはい。今日、受付にご用意します。"}]','3','3','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2898'),
('35e1b-ja-d-repair-leak-expr','35e1b-ja-d-repair-leak','ja','台所の流しの下から水が漏れています。
少しずつですか。それとも、ずっと流れていますか。
ずっと流れていたので、水を止めました。
ありがとうございます。一時間以内に修理の者を向かわせます。
家で待っている必要がありますか。
はい。到着前に担当者から電話します。','1','polite','交际目标：报告漏水并说明紧急程度。',NULL,'[{"text":"台所の流しの下から水が漏れています。\n少しずつですか。それとも、ずっと流れていますか。\nずっと流れていたので、水を止めました。\nありがとうございます。一時間以内に修理の者を向かわせます。\n家で待っている必要がありますか。\nはい。到着前に担当者から電話します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2899'),
('35e1b-ja-d-medical-symptoms-expr','35e1b-ja-d-medical-symptoms','ja','今日はどうされましたか。
月曜日から喉が痛くて、昨夜は熱もありました。
息苦しさはありますか。
いいえ。でも、飲み込むと痛いです。
わかりました。まず喉を診ますね。
わかりました。ありがとうございます。','1','polite','交际目标：描述症状、持续时间与严重程度。',NULL,'[{"text":"今日はどうされましたか。\n月曜日から喉が痛くて、昨夜は熱もありました。\n息苦しさはありますか。\nいいえ。でも、飲み込むと痛いです。\nわかりました。まず喉を診ますね。\nわかりました。ありがとうございます。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2900'),
('35e1b-ja-d-pharmacy-medicine-expr','35e1b-ja-d-pharmacy-medicine','ja','この薬の飲み方を教えていただけますか。
食後に一錠、一日三回まで飲んでください。
アレルギーの薬と一緒に飲んでも大丈夫ですか。
確認します。その薬の名前は何ですか。
この箱に書いてあります。
ありがとうございます。この二つは一緒に飲んでも大丈夫です。','1','polite','交际目标：确认药物用法和注意事项。',NULL,'[{"text":"この薬の飲み方を教えていただけますか。\n食後に一錠、一日三回まで飲んでください。\nアレルギーの薬と一緒に飲んでも大丈夫ですか。\n確認します。その薬の名前は何ですか。\nこの箱に書いてあります。\nありがとうございます。この二つは一緒に飲んでも大丈夫です。"}]','2','2','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2901'),
('35e1b-ja-d-invitation-decline-expr','35e1b-ja-d-invitation-decline','ja','金曜日、一緒に夕飯を食べない？
行きたいけど、その夜はもう予定があるんだ。
そっか。週末は空いてる？
日曜日の午後なら大丈夫だよ。
三時にコーヒーはどう？
いいね。じゃあ、そのときに。','1','neutral','交际目标：礼貌拒绝邀请并提出另约。',NULL,'[{"text":"金曜日、一緒に夕飯を食べない？\n行きたいけど、その夜はもう予定があるんだ。\nそっか。週末は空いてる？\n日曜日の午後なら大丈夫だよ。\n三時にコーヒーはどう？\nいいね。じゃあ、そのときに。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2902'),
('35e1b-ja-d-invitation-condition-expr','35e1b-ja-d-invitation-condition','ja','土曜日にピクニックをするんだけど、来ない？
行けるかも。何時から？
十二時ごろ、リバーサイド公園で。
十一時までに仕事が終わったら行けるよ。
大丈夫。わかったらメッセージして。
そうするね。誘ってくれてありがとう。','1','neutral','交际目标：带条件接受邀请并确认细节。',NULL,'[{"text":"土曜日にピクニックをするんだけど、来ない？\n行けるかも。何時から？\n十二時ごろ、リバーサイド公園で。\n十一時までに仕事が終わったら行けるよ。\n大丈夫。わかったらメッセージして。\nそうするね。誘ってくれてありがとう。"}]','2','2','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2903'),
('35e1b-ja-d-misunderstanding-time-expr','35e1b-ja-d-misunderstanding-time','ja','会議は二時からだと思っていました。
昨日、三時に変更になりました。
そのメッセージを見落としたようです。
大丈夫です。三時でも来られますか。
はい。確認ですが、三時に四号室ですね。
そのとおりです。では、後で。','1','neutral','交际目标：修正时间误会并重新确认。',NULL,'[{"text":"会議は二時からだと思っていました。\n昨日、三時に変更になりました。\nそのメッセージを見落としたようです。\n大丈夫です。三時でも来られますか。\nはい。確認ですが、三時に四号室ですね。\nそのとおりです。では、後で。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2904'),
('35e1b-ja-d-misunderstanding-tone-expr','35e1b-ja-d-misunderstanding-tone','ja','会議でのコメントが、かなり厳しく聞こえました。
すみません。仕事ではなく、日程について確認したかったんです。
説明してくれてありがとう。責められたのかと思いました。
そう聞こえた理由はわかります。
明日、もう一度日程について話せますか。
もちろんです。今度はもっとはっきり説明します。','1','neutral','交际目标：解释语气并修复关系。',NULL,'[{"text":"会議でのコメントが、かなり厳しく聞こえました。\nすみません。仕事ではなく、日程について確認したかったんです。\n説明してくれてありがとう。責められたのかと思いました。\nそう聞こえた理由はわかります。\n明日、もう一度日程について話せますか。\nもちろんです。今度はもっとはっきり説明します。"}]','4','4','4','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2905'),
('35e1b-ja-d-hotel-room-expr','35e1b-ja-d-hotel-room','ja','すみません、夜になると部屋がとても騒がしいです。
申し訳ありません。外の道路の音ですか。
はい。もう少し静かな部屋はありますか。
六階にございますが、シングルベッドが二台の部屋です。
それで大丈夫です。今夜移れますか。
はい。新しい鍵をご用意します。','1','polite','交际目标：报告房间问题并完成换房。',NULL,'[{"text":"すみません、夜になると部屋がとても騒がしいです。\n申し訳ありません。外の道路の音ですか。\nはい。もう少し静かな部屋はありますか。\n六階にございますが、シングルベッドが二台の部屋です。\nそれで大丈夫です。今夜移れますか。\nはい。新しい鍵をご用意します。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2906'),
('35e1b-ja-d-hotel-booking-expr','35e1b-ja-d-hotel-booking','ja','パテルの名前で予約しています。
まだ見つかりません。別のお名前でしょうか。
プリヤ・パテルで探してください。先月、オンラインで予約しました。
ございました。三泊のご予定ですね。
はい。朝食は含まれていますか。
はい。朝食は七時からです。','1','polite','交际目标：查找预订并确认早餐。',NULL,'[{"text":"パテルの名前で予約しています。\nまだ見つかりません。別のお名前でしょうか。\nプリヤ・パテルで探してください。先月、オンラインで予約しました。\nございました。三泊のご予定ですね。\nはい。朝食は含まれていますか。\nはい。朝食は七時からです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2907'),
('35e1b-ja-d-taxi-destination-expr','35e1b-ja-d-taxi-destination','ja','リバーサイドホテルまでお願いします。
かしこまりました。キング通りのホテルですね。
はい、そこです。どのくらいかかりますか。
道が空いていれば、二十分くらいです。
カードで払えますか。
はい、使えます。','1','polite','交际目标：确认目的地、路线和支付方式。',NULL,'[{"text":"リバーサイドホテルまでお願いします。\nかしこまりました。キング通りのホテルですね。\nはい、そこです。どのくらいかかりますか。\n道が空いていれば、二十分くらいです。\nカードで払えますか。\nはい、使えます。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2908'),
('35e1b-ja-d-bus-wrong-stop-expr','35e1b-ja-d-bus-wrong-stop','ja','このバスは市立病院の近くに止まりますか。
いいえ、このバスは反対方向に向かっています。
そうですか。どこで降りればいいですか。
次で降りて、反対側から二十四番に乗ってください。
二十四番は病院の前に止まりますか。
はい、正面入口のすぐ前です。','1','neutral','交际目标：发现坐错方向后获得补救路线。',NULL,'[{"text":"このバスは市立病院の近くに止まりますか。\nいいえ、このバスは反対方向に向かっています。\nそうですか。どこで降りればいいですか。\n次で降りて、反対側から二十四番に乗ってください。\n二十四番は病院の前に止まりますか。\nはい、正面入口のすぐ前です。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2909'),
('35e1b-ja-d-order-unavailable-expr','35e1b-ja-d-order-unavailable','ja','焼き魚をお願いします。
申し訳ありません。焼き魚は売り切れております。
代わりに、何がおすすめですか。
鶏肉料理が似ています。野菜のパスタもございます。
では、パスタにします。チーズ抜きにできますか。
もちろんです。','1','polite','交际目标：菜品售罄后选择替代。',NULL,'[{"text":"焼き魚をお願いします。\n申し訳ありません。焼き魚は売り切れております。\n代わりに、何がおすすめですか。\n鶏肉料理が似ています。野菜のパスタもございます。\nでは、パスタにします。チーズ抜きにできますか。\nもちろんです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2910'),
('35e1b-ja-d-dietary-clarify-expr','35e1b-ja-d-dietary-clarify','ja','野菜スープはベジタリアン向けですか。
はい、肉は入っていません。
だしも野菜だけですか。
厨房に確認してまいります。
ありがとうございます。鶏のだしも避けたいんです。
承知しました。ご注文の前に必ず確認します。','1','polite','交际目标：澄清素食需求并确认配料。',NULL,'[{"text":"野菜スープはベジタリアン向けですか。\nはい、肉は入っていません。\nだしも野菜だけですか。\n厨房に確認してまいります。\nありがとうございます。鶏のだしも避けたいんです。\n承知しました。ご注文の前に必ず確認します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2911'),
('35e1b-ja-d-school-deadline-expr','35e1b-ja-d-school-deadline','ja','課題の締め切りについて相談してもいいですか。
もちろんです。どうしましたか。
体調を崩して、木曜日までに終わりそうにありません。
月曜日までなら延ばせますが、それより後は難しいです。
月曜日なら助かります。診断書は必要ですか。
今回は必要ありません。正午までにメールで送ってください。','1','polite','交际目标：请求延期并协商新截止时间。',NULL,'[{"text":"課題の締め切りについて相談してもいいですか。\nもちろんです。どうしましたか。\n体調を崩して、木曜日までに終わりそうにありません。\n月曜日までなら延ばせますが、それより後は難しいです。\n月曜日なら助かります。診断書は必要ですか。\n今回は必要ありません。正午までにメールで送ってください。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2912');

INSERT INTO v2_sentence_expressions(id,unit_id,language,text,is_primary,register,note_zh,ipa,readings_json,overall_difficulty,vocabulary_difficulty,grammar_difficulty,difficulty_note_zh,publication_state,sort_order) VALUES
('35e1b-ja-d-work-clarification-expr','35e1b-ja-d-work-clarification','ja','今日中に顧客ファイルを更新してもらえますか。
どの部分を更新すればいいですか。
連絡先と昨日の電話のメモです。
支払いの部分はそのままでいいですか。
はい。まず連絡先を優先してください。
わかりました。四時までに送ります。','1','neutral','交际目标：澄清任务范围并确认优先级。',NULL,'[{"text":"今日中に顧客ファイルを更新してもらえますか。\nどの部分を更新すればいいですか。\n連絡先と昨日の電話のメモです。\n支払いの部分はそのままでいいですか。\nはい。まず連絡先を優先してください。\nわかりました。四時までに送ります。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2913'),
('35e1b-ja-d-neighbour-noise-expr','35e1b-ja-d-neighbour-noise','ja','すみません。音楽が壁越しにかなり聞こえるのですが。
そんなに大きいとは気づきませんでした。
十時を過ぎたら、音を小さくしてもらえますか。
もちろんです。もうすぐ終わるところです。
ありがとうございます。本当に助かります。
こちらこそ、すみませんでした。','1','polite','交际目标：提出噪声问题并协商解决。',NULL,'[{"text":"すみません。音楽が壁越しにかなり聞こえるのですが。\nそんなに大きいとは気づきませんでした。\n十時を過ぎたら、音を小さくしてもらえますか。\nもちろんです。もうすぐ終わるところです。\nありがとうございます。本当に助かります。\nこちらこそ、すみませんでした。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2914'),
('35e1b-ja-d-wrong-delivery-expr','35e1b-ja-d-wrong-delivery','ja','注文と違う商品が届きました。
申し訳ありません。何をご注文になりましたか。
黒いジャケットを注文しましたが、青いものが届きました。
本日、正しい商品を発送できます。
先にこちらを返す必要がありますか。
いいえ。返送用の伝票を同封します。','1','polite','交际目标：说明送错商品并安排补发。',NULL,'[{"text":"注文と違う商品が届きました。\n申し訳ありません。何をご注文になりましたか。\n黒いジャケットを注文しましたが、青いものが届きました。\n本日、正しい商品を発送できます。\n先にこちらを返す必要がありますか。\nいいえ。返送用の伝票を同封します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2915'),
('35e1b-ja-d-opinion-disagree-expr','35e1b-ja-d-opinion-disagree','ja','市の中心部への車の乗り入れは禁止したほうがいいと思う。
私は少し違う意見かな。通勤に車が必要な人もいるよ。
確かに。でも、公共交通をもっと便利にできると思う。
バスの本数が増えたら、禁止に賛成する？
混む時間だけなら賛成するかも。
それなら、いい妥協案になりそうだね。','1','neutral','交际目标：礼貌表达不同意见并追问理由。',NULL,'[{"text":"市の中心部への車の乗り入れは禁止したほうがいいと思う。\n私は少し違う意見かな。通勤に車が必要な人もいるよ。\n確かに。でも、公共交通をもっと便利にできると思う。\nバスの本数が増えたら、禁止に賛成する？\n混む時間だけなら賛成するかも。\nそれなら、いい妥協案になりそうだね。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2916'),
('35e1b-ja-d-lost-reservation-expr','35e1b-ja-d-lost-reservation','ja','七時に四名で予約しています。
申し訳ありません。お名前を教えていただけますか。
テイラーです。確認メールもあります。
ありがとうございます。明日の予約として入っています。
今夜、席が必要なのですが、空いていませんか。
十五分ほどお待ちいただければ、ご用意できます。','1','polite','交际目标：预订未显示时提供证据并取得替代安排。',NULL,'[{"text":"七時に四名で予約しています。\n申し訳ありません。お名前を教えていただけますか。\nテイラーです。確認メールもあります。\nありがとうございます。明日の予約として入っています。\n今夜、席が必要なのですが、空いていませんか。\n十五分ほどお待ちいただければ、ご用意できます。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2917'),
('35e1b-ja-d-flight-delay-expr','35e1b-ja-d-flight-delay','ja','飛行機が遅れて、乗り継ぎに間に合わないかもしれません。
最終目的地はどちらですか。
シドニー経由でウェリントンです。
シドニーを八時に出る便ならあります。
今、その便に変更できますか。
はい。予約を変更して、新しい搭乗券をお渡しします。','1','polite','交际目标：航班延误后确认转机替代方案。',NULL,'[{"text":"飛行機が遅れて、乗り継ぎに間に合わないかもしれません。\n最終目的地はどちらですか。\nシドニー経由でウェリントンです。\nシドニーを八時に出る便ならあります。\n今、その便に変更できますか。\nはい。予約を変更して、新しい搭乗券をお渡しします。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2918'),
('35e1b-ja-d-counter-service-expr','35e1b-ja-d-counter-service','ja','こちらを贈り物にしたいのですが。
無料の包装と有料の箱がございます。
無料の包装でお願いします。
かしこまりました。値札は外しますか。
はい。領収書もいただけますか。
もちろんです。商品とは別にお渡しします。','1','polite','交际目标：在柜台确认包装与收据。',NULL,'[{"text":"こちらを贈り物にしたいのですが。\n無料の包装と有料の箱がございます。\n無料の包装でお願いします。\nかしこまりました。値札は外しますか。\nはい。領収書もいただけますか。\nもちろんです。商品とは別にお渡しします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2919'),
('35e1b-ja-d-clinic-reception-expr','35e1b-ja-d-clinic-reception','ja','予約はないのですが、診てもらえますか。
症状を簡単に教えてください。
昨日から熱があり、今朝ひどくなりました。
少しお待ちいただければ、医師に確認します。
待ち時間はどのくらいですか。
今のところ、三十分ほどです。','1','polite','交际目标：在诊所前台确认就诊与候诊。',NULL,'[{"text":"予約はないのですが、診てもらえますか。\n症状を簡単に教えてください。\n昨日から熱があり、今朝ひどくなりました。\n少しお待ちいただければ、医師に確認します。\n待ち時間はどのくらいですか。\n今のところ、三十分ほどです。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2920'),
('35e1b-ja-d-delivery-time-expr','35e1b-ja-d-delivery-time','ja','家具のお届け時間についてご連絡しました。
ありがとうございます。何時ごろになりますか。
木曜日の二時から四時の間です。
その時間は不在です。金曜日の午前中はどうですか。
金曜日なら九時から十一時が空いています。
では、その時間でお願いします。','1','polite','交际目标：协调送货时间并确认在场。',NULL,'[{"text":"家具のお届け時間についてご連絡しました。\nありがとうございます。何時ごろになりますか。\n木曜日の二時から四時の間です。\nその時間は不在です。金曜日の午前中はどうですか。\n金曜日なら九時から十一時が空いています。\nでは、その時間でお願いします。"}]','2','2','2','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2921'),
('35e1b-ja-d-lost-property-expr','35e1b-ja-d-lost-property','ja','電車にかばんを忘れたかもしれません。
どの電車に乗りましたか。
十時十五分発の空港行きです。
かばんの色と形を教えてください。
黒い小さなリュックです。中に名前が書いてあります。
見つかったら、こちらの番号にご連絡します。','1','polite','交际目标：描述失物并留下联系方式。',NULL,'[{"text":"電車にかばんを忘れたかもしれません。\nどの電車に乗りましたか。\n十時十五分発の空港行きです。\nかばんの色と形を教えてください。\n黒い小さなリュックです。中に名前が書いてあります。\n見つかったら、こちらの番号にご連絡します。"}]','3','3','3','按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。','published','2922');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-en-d-restaurant-allergy-t01','35e1b-en-d-restaurant-allergy-expr','A','Hi. Are you ready to order?','[]','0'),
('35e1b-en-d-restaurant-allergy-t02','35e1b-en-d-restaurant-allergy-expr','B','Almost. Does the curry contain peanuts?','[]','1'),
('35e1b-en-d-restaurant-allergy-t03','35e1b-en-d-restaurant-allergy-expr','A','The sauce does, but the tomato soup doesn’t.','[]','2'),
('35e1b-en-d-restaurant-allergy-t04','35e1b-en-d-restaurant-allergy-expr','B','Thanks. I’ll have the soup, then.','[]','3'),
('35e1b-en-d-restaurant-allergy-t05','35e1b-en-d-restaurant-allergy-expr','A','Certainly. I’ll note that you have a peanut allergy.','[]','4'),
('35e1b-en-d-restaurant-allergy-t06','35e1b-en-d-restaurant-allergy-expr','B','Thank you. I appreciate that.','[]','5'),
('35e1b-en-d-restaurant-bill-t01','35e1b-en-d-restaurant-bill-expr','A','Excuse me, could we have the bill?','[]','0'),
('35e1b-en-d-restaurant-bill-t02','35e1b-en-d-restaurant-bill-expr','B','Of course. I’ll bring it over.','[]','1'),
('35e1b-en-d-restaurant-bill-t03','35e1b-en-d-restaurant-bill-expr','A','I think there’s an extra dessert on here.','[]','2'),
('35e1b-en-d-restaurant-bill-t04','35e1b-en-d-restaurant-bill-expr','B','You’re right. I’m sorry about that.','[]','3'),
('35e1b-en-d-restaurant-bill-t05','35e1b-en-d-restaurant-bill-expr','A','Could you remove it and let us pay separately?','[]','4'),
('35e1b-en-d-restaurant-bill-t06','35e1b-en-d-restaurant-bill-expr','B','Certainly. I’ll bring two corrected bills.','[]','5'),
('35e1b-en-d-appointment-reschedule-t01','35e1b-en-d-appointment-reschedule-expr','A','Good morning. I need to reschedule my appointment.','[]','0'),
('35e1b-en-d-appointment-reschedule-t02','35e1b-en-d-appointment-reschedule-expr','B','Certainly. What day is it booked for?','[]','1'),
('35e1b-en-d-appointment-reschedule-t03','35e1b-en-d-appointment-reschedule-expr','A','It’s under Lee for Tuesday at ten.','[]','2'),
('35e1b-en-d-appointment-reschedule-t04','35e1b-en-d-appointment-reschedule-expr','B','I have Thursday at eleven or Friday at nine.','[]','3'),
('35e1b-en-d-appointment-reschedule-t05','35e1b-en-d-appointment-reschedule-expr','A','Thursday at eleven works for me.','[]','4'),
('35e1b-en-d-appointment-reschedule-t06','35e1b-en-d-appointment-reschedule-expr','B','All right. Your appointment is now Thursday at eleven.','[]','5'),
('35e1b-en-d-appointment-cancel-t01','35e1b-en-d-appointment-cancel-expr','A','I’m calling to cancel my appointment tomorrow.','[]','0'),
('35e1b-en-d-appointment-cancel-t02','35e1b-en-d-appointment-cancel-expr','B','May I have the name on the booking?','[]','1'),
('35e1b-en-d-appointment-cancel-t03','35e1b-en-d-appointment-cancel-expr','A','It’s Morgan Chen.','[]','2'),
('35e1b-en-d-appointment-cancel-t04','35e1b-en-d-appointment-cancel-expr','B','Thank you. There’s no cancellation fee this time.','[]','3'),
('35e1b-en-d-appointment-cancel-t05','35e1b-en-d-appointment-cancel-expr','A','Great. Could you email me a confirmation?','[]','4'),
('35e1b-en-d-appointment-cancel-t06','35e1b-en-d-appointment-cancel-expr','B','Yes, I’ll send it right away.','[]','5'),
('35e1b-en-d-help-alternative-t01','35e1b-en-d-help-alternative-expr','A','Could you help me move tonight?','[]','0'),
('35e1b-en-d-help-alternative-t02','35e1b-en-d-help-alternative-expr','B','I can’t tonight, but I’m free tomorrow morning.','[]','1'),
('35e1b-en-d-help-alternative-t03','35e1b-en-d-help-alternative-expr','A','Would nine o’clock work?','[]','2'),
('35e1b-en-d-help-alternative-t04','35e1b-en-d-help-alternative-expr','B','I have class at nine. How about ten thirty?','[]','3'),
('35e1b-en-d-help-alternative-t05','35e1b-en-d-help-alternative-expr','A','Ten thirty is perfect. Thanks for offering another time.','[]','4'),
('35e1b-en-d-help-alternative-t06','35e1b-en-d-help-alternative-expr','B','No problem. Send me the address.','[]','5'),
('35e1b-en-d-return-exchange-t01','35e1b-en-d-return-exchange-expr','A','Hi. I’d like to exchange these shoes.','[]','0'),
('35e1b-en-d-return-exchange-t02','35e1b-en-d-return-exchange-expr','B','Is there anything wrong with them?','[]','1'),
('35e1b-en-d-return-exchange-t03','35e1b-en-d-return-exchange-expr','A','No, they’re just too small. I haven’t worn them outside.','[]','2'),
('35e1b-en-d-return-exchange-t04','35e1b-en-d-return-exchange-expr','B','Do you have the receipt?','[]','3'),
('35e1b-en-d-return-exchange-t05','35e1b-en-d-return-exchange-expr','A','Yes. Could I try the next size up?','[]','4'),
('35e1b-en-d-return-exchange-t06','35e1b-en-d-return-exchange-expr','B','Of course. I’ll get that for you.','[]','5'),
('35e1b-en-d-return-defect-t01','35e1b-en-d-return-defect-expr','A','This kettle stopped working after two days.','[]','0'),
('35e1b-en-d-return-defect-t02','35e1b-en-d-return-defect-expr','B','I’m sorry to hear that. Do you have the receipt?','[]','1'),
('35e1b-en-d-return-defect-t03','35e1b-en-d-return-defect-expr','A','Yes. I’d prefer a refund rather than a replacement.','[]','2'),
('35e1b-en-d-return-defect-t04','35e1b-en-d-return-defect-expr','B','That’s fine. The refund will go back to your card.','[]','3');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-en-d-return-defect-t05','35e1b-en-d-return-defect-expr','A','How long will that take?','[]','4'),
('35e1b-en-d-return-defect-t06','35e1b-en-d-return-defect-expr','B','Usually three to five business days.','[]','5'),
('35e1b-en-d-directions-repair-t01','35e1b-en-d-directions-repair-expr','A','Excuse me, how do I get to Central Station?','[]','0'),
('35e1b-en-d-directions-repair-t02','35e1b-en-d-directions-repair-expr','B','The bus terminal is two blocks that way.','[]','1'),
('35e1b-en-d-directions-repair-t03','35e1b-en-d-directions-repair-expr','A','Sorry, I meant the train station.','[]','2'),
('35e1b-en-d-directions-repair-t04','35e1b-en-d-directions-repair-expr','B','Oh, I see. Take the next left and walk past the bank.','[]','3'),
('35e1b-en-d-directions-repair-t05','35e1b-en-d-directions-repair-expr','A','Is it far from there?','[]','4'),
('35e1b-en-d-directions-repair-t06','35e1b-en-d-directions-repair-expr','B','No, it’s about a five-minute walk.','[]','5'),
('35e1b-en-d-train-transfer-t01','35e1b-en-d-train-transfer-expr','A','Excuse me, is this the right train for the airport?','[]','0'),
('35e1b-en-d-train-transfer-t02','35e1b-en-d-train-transfer-expr','B','Not directly. You need to change at Central.','[]','1'),
('35e1b-en-d-train-transfer-t03','35e1b-en-d-train-transfer-expr','A','Which platform do I need there?','[]','2'),
('35e1b-en-d-train-transfer-t04','35e1b-en-d-train-transfer-expr','B','Platform six. The signs are easy to follow.','[]','3'),
('35e1b-en-d-train-transfer-t05','35e1b-en-d-train-transfer-expr','A','Will I have enough time to change?','[]','4'),
('35e1b-en-d-train-transfer-t06','35e1b-en-d-train-transfer-expr','B','Yes. You’ll have about twelve minutes.','[]','5'),
('35e1b-en-d-group-work-t01','35e1b-en-d-group-work-expr','A','How should we split the presentation?','[]','0'),
('35e1b-en-d-group-work-t02','35e1b-en-d-group-work-expr','B','I can do the introduction and the first two slides.','[]','1'),
('35e1b-en-d-group-work-t03','35e1b-en-d-group-work-expr','A','Could you also find one example for slide two?','[]','2'),
('35e1b-en-d-group-work-t04','35e1b-en-d-group-work-expr','B','Sure. Can you check the figures in the last section?','[]','3'),
('35e1b-en-d-group-work-t05','35e1b-en-d-group-work-expr','A','Yes. Let’s send everything to each other by Friday.','[]','4'),
('35e1b-en-d-group-work-t06','35e1b-en-d-group-work-expr','B','Agreed. Then we can practise on Monday.','[]','5'),
('35e1b-en-d-group-disagree-t01','35e1b-en-d-group-disagree-expr','A','I think we should focus on the survey results.','[]','0'),
('35e1b-en-d-group-disagree-t02','35e1b-en-d-group-disagree-expr','B','I see your point, but the interviews explain why the results changed.','[]','1'),
('35e1b-en-d-group-disagree-t03','35e1b-en-d-group-disagree-expr','A','Are you suggesting we include both?','[]','2'),
('35e1b-en-d-group-disagree-t04','35e1b-en-d-group-disagree-expr','B','Yes, but we could shorten the background section.','[]','3'),
('35e1b-en-d-group-disagree-t05','35e1b-en-d-group-disagree-expr','A','That sounds reasonable. Let’s keep one paragraph of background.','[]','4'),
('35e1b-en-d-group-disagree-t06','35e1b-en-d-group-disagree-expr','B','Great. I’ll revise the outline.','[]','5'),
('35e1b-en-d-repair-heating-t01','35e1b-en-d-repair-heating-expr','A','Hello. The heater in my flat isn’t working.','[]','0'),
('35e1b-en-d-repair-heating-t02','35e1b-en-d-repair-heating-expr','B','I’m sorry about that. Is it showing an error code?','[]','1'),
('35e1b-en-d-repair-heating-t03','35e1b-en-d-repair-heating-expr','A','Yes, it says E3, and the room is getting cold.','[]','2'),
('35e1b-en-d-repair-heating-t04','35e1b-en-d-repair-heating-expr','B','A technician can come tomorrow afternoon.','[]','3'),
('35e1b-en-d-repair-heating-t05','35e1b-en-d-repair-heating-expr','A','If it can’t be fixed then, could I borrow a portable heater?','[]','4'),
('35e1b-en-d-repair-heating-t06','35e1b-en-d-repair-heating-expr','B','Yes. We can leave one at reception today.','[]','5'),
('35e1b-en-d-repair-leak-t01','35e1b-en-d-repair-leak-expr','A','There’s water leaking under the kitchen sink.','[]','0'),
('35e1b-en-d-repair-leak-t02','35e1b-en-d-repair-leak-expr','B','Is it a slow drip or a steady flow?','[]','1'),
('35e1b-en-d-repair-leak-t03','35e1b-en-d-repair-leak-expr','A','It’s a steady flow, so I’ve turned the water off.','[]','2'),
('35e1b-en-d-repair-leak-t04','35e1b-en-d-repair-leak-expr','B','Good. I’ll send someone within an hour.','[]','3'),
('35e1b-en-d-repair-leak-t05','35e1b-en-d-repair-leak-expr','A','Do I need to stay home?','[]','4'),
('35e1b-en-d-repair-leak-t06','35e1b-en-d-repair-leak-expr','B','Yes, please. The plumber will call before arriving.','[]','5'),
('35e1b-en-d-medical-symptoms-t01','35e1b-en-d-medical-symptoms-expr','A','What seems to be the problem?','[]','0'),
('35e1b-en-d-medical-symptoms-t02','35e1b-en-d-medical-symptoms-expr','B','I’ve had a sore throat since Monday, and I had a fever last night.','[]','1');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-en-d-medical-symptoms-t03','35e1b-en-d-medical-symptoms-expr','A','Are you having any trouble breathing?','[]','2'),
('35e1b-en-d-medical-symptoms-t04','35e1b-en-d-medical-symptoms-expr','B','No, but it hurts when I swallow.','[]','3'),
('35e1b-en-d-medical-symptoms-t05','35e1b-en-d-medical-symptoms-expr','A','All right. I’ll examine your throat first.','[]','4'),
('35e1b-en-d-medical-symptoms-t06','35e1b-en-d-medical-symptoms-expr','B','Okay. Thank you.','[]','5'),
('35e1b-en-d-pharmacy-medicine-t01','35e1b-en-d-pharmacy-medicine-expr','A','Could you tell me how to take this medicine?','[]','0'),
('35e1b-en-d-pharmacy-medicine-t02','35e1b-en-d-pharmacy-medicine-expr','B','Take one tablet after food, up to three times a day.','[]','1'),
('35e1b-en-d-pharmacy-medicine-t03','35e1b-en-d-pharmacy-medicine-expr','A','Can I take it with my allergy medicine?','[]','2'),
('35e1b-en-d-pharmacy-medicine-t04','35e1b-en-d-pharmacy-medicine-expr','B','Let me check. What’s the name of that medicine?','[]','3'),
('35e1b-en-d-pharmacy-medicine-t05','35e1b-en-d-pharmacy-medicine-expr','A','It’s written on this box.','[]','4'),
('35e1b-en-d-pharmacy-medicine-t06','35e1b-en-d-pharmacy-medicine-expr','B','Thanks. These two are safe to take together.','[]','5'),
('35e1b-en-d-invitation-decline-t01','35e1b-en-d-invitation-decline-expr','A','Would you like to have dinner on Friday?','[]','0'),
('35e1b-en-d-invitation-decline-t02','35e1b-en-d-invitation-decline-expr','B','I’d love to, but I already have plans that evening.','[]','1'),
('35e1b-en-d-invitation-decline-t03','35e1b-en-d-invitation-decline-expr','A','No problem. Are you free over the weekend?','[]','2'),
('35e1b-en-d-invitation-decline-t04','35e1b-en-d-invitation-decline-expr','B','Sunday afternoon should work.','[]','3'),
('35e1b-en-d-invitation-decline-t05','35e1b-en-d-invitation-decline-expr','A','How about coffee at three?','[]','4'),
('35e1b-en-d-invitation-decline-t06','35e1b-en-d-invitation-decline-expr','B','Perfect. I’ll see you then.','[]','5'),
('35e1b-en-d-invitation-condition-t01','35e1b-en-d-invitation-condition-expr','A','We’re having a picnic on Saturday. Want to come?','[]','0'),
('35e1b-en-d-invitation-condition-t02','35e1b-en-d-invitation-condition-expr','B','Maybe. What time are you starting?','[]','1'),
('35e1b-en-d-invitation-condition-t03','35e1b-en-d-invitation-condition-expr','A','Around noon, at Riverside Park.','[]','2'),
('35e1b-en-d-invitation-condition-t04','35e1b-en-d-invitation-condition-expr','B','I can come if I finish work by eleven.','[]','3'),
('35e1b-en-d-invitation-condition-t05','35e1b-en-d-invitation-condition-expr','A','That’s fine. Just text me when you know.','[]','4'),
('35e1b-en-d-invitation-condition-t06','35e1b-en-d-invitation-condition-expr','B','Will do. Thanks for inviting me.','[]','5'),
('35e1b-en-d-misunderstanding-time-t01','35e1b-en-d-misunderstanding-time-expr','A','I thought the meeting started at two.','[]','0'),
('35e1b-en-d-misunderstanding-time-t02','35e1b-en-d-misunderstanding-time-expr','B','It was moved to three yesterday.','[]','1'),
('35e1b-en-d-misunderstanding-time-t03','35e1b-en-d-misunderstanding-time-expr','A','Oh, I must have missed that message.','[]','2'),
('35e1b-en-d-misunderstanding-time-t04','35e1b-en-d-misunderstanding-time-expr','B','No worries. Can you still make it?','[]','3'),
('35e1b-en-d-misunderstanding-time-t05','35e1b-en-d-misunderstanding-time-expr','A','Yes. Just to confirm, it’s in Room 4 at three.','[]','4'),
('35e1b-en-d-misunderstanding-time-t06','35e1b-en-d-misunderstanding-time-expr','B','That’s right. See you there.','[]','5'),
('35e1b-en-d-misunderstanding-tone-t01','35e1b-en-d-misunderstanding-tone-expr','A','Your comment in the meeting sounded quite critical.','[]','0'),
('35e1b-en-d-misunderstanding-tone-t02','35e1b-en-d-misunderstanding-tone-expr','B','I’m sorry. I was questioning the schedule, not your work.','[]','1'),
('35e1b-en-d-misunderstanding-tone-t03','35e1b-en-d-misunderstanding-tone-expr','A','Thanks for explaining. I thought you were blaming me.','[]','2'),
('35e1b-en-d-misunderstanding-tone-t04','35e1b-en-d-misunderstanding-tone-expr','B','I can see why it sounded that way.','[]','3'),
('35e1b-en-d-misunderstanding-tone-t05','35e1b-en-d-misunderstanding-tone-expr','A','Could we talk about the schedule again tomorrow?','[]','4'),
('35e1b-en-d-misunderstanding-tone-t06','35e1b-en-d-misunderstanding-tone-expr','B','Of course. I’ll be clearer next time.','[]','5'),
('35e1b-en-d-hotel-room-t01','35e1b-en-d-hotel-room-expr','A','Hello. My room is very noisy at night.','[]','0'),
('35e1b-en-d-hotel-room-t02','35e1b-en-d-hotel-room-expr','B','I’m sorry. Is the noise coming from the street?','[]','1'),
('35e1b-en-d-hotel-room-t03','35e1b-en-d-hotel-room-expr','A','Yes. Do you have a quieter room available?','[]','2'),
('35e1b-en-d-hotel-room-t04','35e1b-en-d-hotel-room-expr','B','We have one on the sixth floor, but it has two single beds.','[]','3'),
('35e1b-en-d-hotel-room-t05','35e1b-en-d-hotel-room-expr','A','That’s fine. Can I move tonight?','[]','4'),
('35e1b-en-d-hotel-room-t06','35e1b-en-d-hotel-room-expr','B','Certainly. I’ll prepare the new key.','[]','5');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-en-d-hotel-booking-t01','35e1b-en-d-hotel-booking-expr','A','Hi. I have a booking under Patel.','[]','0'),
('35e1b-en-d-hotel-booking-t02','35e1b-en-d-hotel-booking-expr','B','I’m not seeing it yet. Could it be under another name?','[]','1'),
('35e1b-en-d-hotel-booking-t03','35e1b-en-d-hotel-booking-expr','A','Try Priya Patel. I booked it online last month.','[]','2'),
('35e1b-en-d-hotel-booking-t04','35e1b-en-d-hotel-booking-expr','B','Found it. You’re staying for three nights, correct?','[]','3'),
('35e1b-en-d-hotel-booking-t05','35e1b-en-d-hotel-booking-expr','A','Yes. Is breakfast included?','[]','4'),
('35e1b-en-d-hotel-booking-t06','35e1b-en-d-hotel-booking-expr','B','It is. Breakfast starts at seven.','[]','5'),
('35e1b-en-d-taxi-destination-t01','35e1b-en-d-taxi-destination-expr','A','Could you take me to the Riverside Hotel, please?','[]','0'),
('35e1b-en-d-taxi-destination-t02','35e1b-en-d-taxi-destination-expr','B','Certainly. Do you mean the one on King Street?','[]','1'),
('35e1b-en-d-taxi-destination-t03','35e1b-en-d-taxi-destination-expr','A','Yes, that’s the one. How long will it take?','[]','2'),
('35e1b-en-d-taxi-destination-t04','35e1b-en-d-taxi-destination-expr','B','About twenty minutes if traffic is light.','[]','3'),
('35e1b-en-d-taxi-destination-t05','35e1b-en-d-taxi-destination-expr','A','Can I pay by card?','[]','4'),
('35e1b-en-d-taxi-destination-t06','35e1b-en-d-taxi-destination-expr','B','Yes, you can.','[]','5'),
('35e1b-en-d-bus-wrong-stop-t01','35e1b-en-d-bus-wrong-stop-expr','A','Does this bus stop near City Hospital?','[]','0'),
('35e1b-en-d-bus-wrong-stop-t02','35e1b-en-d-bus-wrong-stop-expr','B','No, this bus is going in the other direction.','[]','1'),
('35e1b-en-d-bus-wrong-stop-t03','35e1b-en-d-bus-wrong-stop-expr','A','Oh no. Where should I get off?','[]','2'),
('35e1b-en-d-bus-wrong-stop-t04','35e1b-en-d-bus-wrong-stop-expr','B','Get off at the next stop and take the 24 back.','[]','3'),
('35e1b-en-d-bus-wrong-stop-t05','35e1b-en-d-bus-wrong-stop-expr','A','Does the 24 stop outside the hospital?','[]','4'),
('35e1b-en-d-bus-wrong-stop-t06','35e1b-en-d-bus-wrong-stop-expr','B','Yes, right by the main entrance.','[]','5'),
('35e1b-en-d-order-unavailable-t01','35e1b-en-d-order-unavailable-expr','A','I’d like the grilled fish, please.','[]','0'),
('35e1b-en-d-order-unavailable-t02','35e1b-en-d-order-unavailable-expr','B','I’m sorry, we’ve sold out of the fish.','[]','1'),
('35e1b-en-d-order-unavailable-t03','35e1b-en-d-order-unavailable-expr','A','What would you recommend instead?','[]','2'),
('35e1b-en-d-order-unavailable-t04','35e1b-en-d-order-unavailable-expr','B','The chicken is similar, or we have a vegetable pasta.','[]','3'),
('35e1b-en-d-order-unavailable-t05','35e1b-en-d-order-unavailable-expr','A','I’ll try the pasta. Could I have it without cheese?','[]','4'),
('35e1b-en-d-order-unavailable-t06','35e1b-en-d-order-unavailable-expr','B','Of course.','[]','5'),
('35e1b-en-d-dietary-clarify-t01','35e1b-en-d-dietary-clarify-expr','A','Is the vegetable soup suitable for vegetarians?','[]','0'),
('35e1b-en-d-dietary-clarify-t02','35e1b-en-d-dietary-clarify-expr','B','Yes, it doesn’t contain any meat.','[]','1'),
('35e1b-en-d-dietary-clarify-t03','35e1b-en-d-dietary-clarify-expr','A','What about the stock? Is that vegetable stock too?','[]','2'),
('35e1b-en-d-dietary-clarify-t04','35e1b-en-d-dietary-clarify-expr','B','Let me check with the kitchen.','[]','3'),
('35e1b-en-d-dietary-clarify-t05','35e1b-en-d-dietary-clarify-expr','A','Thanks. I need to avoid chicken stock as well.','[]','4'),
('35e1b-en-d-dietary-clarify-t06','35e1b-en-d-dietary-clarify-expr','B','Understood. I’ll make sure before you order.','[]','5'),
('35e1b-en-d-school-deadline-t01','35e1b-en-d-school-deadline-expr','A','Could I ask about the assignment deadline?','[]','0'),
('35e1b-en-d-school-deadline-t02','35e1b-en-d-school-deadline-expr','B','Of course. What’s the issue?','[]','1'),
('35e1b-en-d-school-deadline-t03','35e1b-en-d-school-deadline-expr','A','I’ve been ill, and I’m not going to finish by Thursday.','[]','2'),
('35e1b-en-d-school-deadline-t04','35e1b-en-d-school-deadline-expr','B','I can give you until Monday, but no later.','[]','3'),
('35e1b-en-d-school-deadline-t05','35e1b-en-d-school-deadline-expr','A','Monday would really help. Do I need to provide a medical note?','[]','4'),
('35e1b-en-d-school-deadline-t06','35e1b-en-d-school-deadline-expr','B','Not this time. Please email me the work by noon.','[]','5'),
('35e1b-en-d-work-clarification-t01','35e1b-en-d-work-clarification-expr','A','Could you update the client file today?','[]','0'),
('35e1b-en-d-work-clarification-t02','35e1b-en-d-work-clarification-expr','B','Which part would you like me to update?','[]','1'),
('35e1b-en-d-work-clarification-t03','35e1b-en-d-work-clarification-expr','A','The contact details and the notes from yesterday’s call.','[]','2'),
('35e1b-en-d-work-clarification-t04','35e1b-en-d-work-clarification-expr','B','Should I leave the payment section unchanged?','[]','3');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-en-d-work-clarification-t05','35e1b-en-d-work-clarification-expr','A','Yes. Please focus on the contact information first.','[]','4'),
('35e1b-en-d-work-clarification-t06','35e1b-en-d-work-clarification-expr','B','Got it. I’ll send it to you by four.','[]','5'),
('35e1b-en-d-neighbour-noise-t01','35e1b-en-d-neighbour-noise-expr','A','Hi. I’m sorry to bother you, but the music is coming through the wall.','[]','0'),
('35e1b-en-d-neighbour-noise-t02','35e1b-en-d-neighbour-noise-expr','B','Oh, I didn’t realize it was that loud.','[]','1'),
('35e1b-en-d-neighbour-noise-t03','35e1b-en-d-neighbour-noise-expr','A','Would you mind turning it down after ten?','[]','2'),
('35e1b-en-d-neighbour-noise-t04','35e1b-en-d-neighbour-noise-expr','B','Of course. We’re finishing soon anyway.','[]','3'),
('35e1b-en-d-neighbour-noise-t05','35e1b-en-d-neighbour-noise-expr','A','Thanks. I really appreciate it.','[]','4'),
('35e1b-en-d-neighbour-noise-t06','35e1b-en-d-neighbour-noise-expr','B','No problem, and sorry again.','[]','5'),
('35e1b-en-d-wrong-delivery-t01','35e1b-en-d-wrong-delivery-expr','A','I received the wrong item in my order.','[]','0'),
('35e1b-en-d-wrong-delivery-t02','35e1b-en-d-wrong-delivery-expr','B','I’m sorry about that. What did you order?','[]','1'),
('35e1b-en-d-wrong-delivery-t03','35e1b-en-d-wrong-delivery-expr','A','A black jacket, but this one is blue.','[]','2'),
('35e1b-en-d-wrong-delivery-t04','35e1b-en-d-wrong-delivery-expr','B','I can send the correct one today.','[]','3'),
('35e1b-en-d-wrong-delivery-t05','35e1b-en-d-wrong-delivery-expr','A','Do I need to return this one first?','[]','4'),
('35e1b-en-d-wrong-delivery-t06','35e1b-en-d-wrong-delivery-expr','B','No. We’ll include a prepaid return label.','[]','5'),
('35e1b-en-d-opinion-disagree-t01','35e1b-en-d-opinion-disagree-expr','A','I think cars should be banned from the city centre.','[]','0'),
('35e1b-en-d-opinion-disagree-t02','35e1b-en-d-opinion-disagree-expr','B','I’m not sure I agree. Some people need to drive to work.','[]','1'),
('35e1b-en-d-opinion-disagree-t03','35e1b-en-d-opinion-disagree-expr','A','That’s true, but public transport could be improved.','[]','2'),
('35e1b-en-d-opinion-disagree-t04','35e1b-en-d-opinion-disagree-expr','B','Would you support a ban if buses ran more often?','[]','3'),
('35e1b-en-d-opinion-disagree-t05','35e1b-en-d-opinion-disagree-expr','A','Maybe during the busiest hours.','[]','4'),
('35e1b-en-d-opinion-disagree-t06','35e1b-en-d-opinion-disagree-expr','B','That sounds like a reasonable compromise.','[]','5'),
('35e1b-en-d-lost-reservation-t01','35e1b-en-d-lost-reservation-expr','A','Hi. We have a reservation for four at seven.','[]','0'),
('35e1b-en-d-lost-reservation-t02','35e1b-en-d-lost-reservation-expr','B','I’m sorry, I can’t find it. What name is it under?','[]','1'),
('35e1b-en-d-lost-reservation-t03','35e1b-en-d-lost-reservation-expr','A','Taylor. I have the confirmation email here.','[]','2'),
('35e1b-en-d-lost-reservation-t04','35e1b-en-d-lost-reservation-expr','B','Thank you. It looks like it was entered for tomorrow.','[]','3'),
('35e1b-en-d-lost-reservation-t05','35e1b-en-d-lost-reservation-expr','A','We need a table tonight. Is anything available?','[]','4'),
('35e1b-en-d-lost-reservation-t06','35e1b-en-d-lost-reservation-expr','B','Yes, but there’ll be a fifteen-minute wait.','[]','5'),
('35e1b-en-d-flight-delay-t01','35e1b-en-d-flight-delay-expr','A','My flight is delayed, and I may miss my connection.','[]','0'),
('35e1b-en-d-flight-delay-t02','35e1b-en-d-flight-delay-expr','B','What is your final destination?','[]','1'),
('35e1b-en-d-flight-delay-t03','35e1b-en-d-flight-delay-expr','A','Wellington, via Sydney.','[]','2'),
('35e1b-en-d-flight-delay-t04','35e1b-en-d-flight-delay-expr','B','There’s a later flight from Sydney at eight.','[]','3'),
('35e1b-en-d-flight-delay-t05','35e1b-en-d-flight-delay-expr','A','Could you move me to that flight now?','[]','4'),
('35e1b-en-d-flight-delay-t06','35e1b-en-d-flight-delay-expr','B','Yes. I’ll rebook you and print a new boarding pass.','[]','5'),
('35e1b-ja-d-restaurant-allergy-t01','35e1b-ja-d-restaurant-allergy-expr','A','ご注文はお決まりですか。','[{"text":"ご注文はお決まりですか。"}]','0'),
('35e1b-ja-d-restaurant-allergy-t02','35e1b-ja-d-restaurant-allergy-expr','B','もう少しです。このカレーにピーナッツは入っていますか。','[{"text":"もう少しです。このカレーにピーナッツは入っていますか。"}]','1'),
('35e1b-ja-d-restaurant-allergy-t03','35e1b-ja-d-restaurant-allergy-expr','A','ソースには入っていますが、トマトスープには入っていません。','[{"text":"ソースには入っていますが、トマトスープには入っていません。"}]','2'),
('35e1b-ja-d-restaurant-allergy-t04','35e1b-ja-d-restaurant-allergy-expr','B','では、スープをお願いします。','[{"text":"では、スープをお願いします。"}]','3'),
('35e1b-ja-d-restaurant-allergy-t05','35e1b-ja-d-restaurant-allergy-expr','A','かしこまりました。ピーナッツアレルギーがあることも伝えます。','[{"text":"かしこまりました。ピーナッツアレルギーがあることも伝えます。"}]','4'),
('35e1b-ja-d-restaurant-allergy-t06','35e1b-ja-d-restaurant-allergy-expr','B','ありがとうございます。助かります。','[{"text":"ありがとうございます。助かります。"}]','5'),
('35e1b-ja-d-restaurant-bill-t01','35e1b-ja-d-restaurant-bill-expr','A','すみません、お会計をお願いします。','[{"text":"すみません、お会計をお願いします。"}]','0'),
('35e1b-ja-d-restaurant-bill-t02','35e1b-ja-d-restaurant-bill-expr','B','かしこまりました。すぐにお持ちします。','[{"text":"かしこまりました。すぐにお持ちします。"}]','1');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-ja-d-restaurant-bill-t03','35e1b-ja-d-restaurant-bill-expr','A','このデザートは注文していないと思います。','[{"text":"このデザートは注文していないと思います。"}]','2'),
('35e1b-ja-d-restaurant-bill-t04','35e1b-ja-d-restaurant-bill-expr','B','申し訳ありません。こちらの間違いです。','[{"text":"申し訳ありません。こちらの間違いです。"}]','3'),
('35e1b-ja-d-restaurant-bill-t05','35e1b-ja-d-restaurant-bill-expr','A','これを外して、別々に払えますか。','[{"text":"これを外して、別々に払えますか。"}]','4'),
('35e1b-ja-d-restaurant-bill-t06','35e1b-ja-d-restaurant-bill-expr','B','はい。訂正した伝票を二枚お持ちします。','[{"text":"はい。訂正した伝票を二枚お持ちします。"}]','5'),
('35e1b-ja-d-appointment-reschedule-t01','35e1b-ja-d-appointment-reschedule-expr','A','予約の日を変更したいのですが。','[{"text":"予約の日を変更したいのですが。"}]','0'),
('35e1b-ja-d-appointment-reschedule-t02','35e1b-ja-d-appointment-reschedule-expr','B','かしこまりました。現在は何曜日のご予約ですか。','[{"text":"かしこまりました。現在は何曜日のご予約ですか。"}]','1'),
('35e1b-ja-d-appointment-reschedule-t03','35e1b-ja-d-appointment-reschedule-expr','A','李の名前で、火曜日の十時です。','[{"text":"李の名前で、火曜日の十時です。"}]','2'),
('35e1b-ja-d-appointment-reschedule-t04','35e1b-ja-d-appointment-reschedule-expr','B','木曜日の十一時か、金曜日の九時が空いています。','[{"text":"木曜日の十一時か、金曜日の九時が空いています。"}]','3'),
('35e1b-ja-d-appointment-reschedule-t05','35e1b-ja-d-appointment-reschedule-expr','A','木曜日の十一時でお願いします。','[{"text":"木曜日の十一時でお願いします。"}]','4'),
('35e1b-ja-d-appointment-reschedule-t06','35e1b-ja-d-appointment-reschedule-expr','B','では、木曜日の十一時に変更いたします。','[{"text":"では、木曜日の十一時に変更いたします。"}]','5'),
('35e1b-ja-d-appointment-cancel-t01','35e1b-ja-d-appointment-cancel-expr','A','明日の予約をキャンセルしたいのですが。','[{"text":"明日の予約をキャンセルしたいのですが。"}]','0'),
('35e1b-ja-d-appointment-cancel-t02','35e1b-ja-d-appointment-cancel-expr','B','ご予約のお名前をお願いします。','[{"text":"ご予約のお名前をお願いします。"}]','1'),
('35e1b-ja-d-appointment-cancel-t03','35e1b-ja-d-appointment-cancel-expr','A','モーガン・チェンです。','[{"text":"モーガン・チェンです。"}]','2'),
('35e1b-ja-d-appointment-cancel-t04','35e1b-ja-d-appointment-cancel-expr','B','ありがとうございます。今回はキャンセル料はかかりません。','[{"text":"ありがとうございます。今回はキャンセル料はかかりません。"}]','3'),
('35e1b-ja-d-appointment-cancel-t05','35e1b-ja-d-appointment-cancel-expr','A','確認のメールを送っていただけますか。','[{"text":"確認のメールを送っていただけますか。"}]','4'),
('35e1b-ja-d-appointment-cancel-t06','35e1b-ja-d-appointment-cancel-expr','B','はい、すぐにお送りします。','[{"text":"はい、すぐにお送りします。"}]','5'),
('35e1b-ja-d-help-alternative-t01','35e1b-ja-d-help-alternative-expr','A','今夜、引っ越しを手伝ってくれない？','[{"text":"今夜、引っ越しを手伝ってくれない？"}]','0'),
('35e1b-ja-d-help-alternative-t02','35e1b-ja-d-help-alternative-expr','B','今夜は無理だけど、明日の朝なら空いてるよ。','[{"text":"今夜は無理だけど、明日の朝なら空いてるよ。"}]','1'),
('35e1b-ja-d-help-alternative-t03','35e1b-ja-d-help-alternative-expr','A','九時はどう？','[{"text":"九時はどう？"}]','2'),
('35e1b-ja-d-help-alternative-t04','35e1b-ja-d-help-alternative-expr','B','九時は授業があるんだ。十時半ならどう？','[{"text":"九時は授業があるんだ。十時半ならどう？"}]','3'),
('35e1b-ja-d-help-alternative-t05','35e1b-ja-d-help-alternative-expr','A','十時半で大丈夫。別の時間を考えてくれてありがとう。','[{"text":"十時半で大丈夫。別の時間を考えてくれてありがとう。"}]','4'),
('35e1b-ja-d-help-alternative-t06','35e1b-ja-d-help-alternative-expr','B','うん。住所を送って。','[{"text":"うん。住所を送って。"}]','5'),
('35e1b-ja-d-return-exchange-t01','35e1b-ja-d-return-exchange-expr','A','この靴を交換したいのですが。','[{"text":"この靴を交換したいのですが。"}]','0'),
('35e1b-ja-d-return-exchange-t02','35e1b-ja-d-return-exchange-expr','B','何か問題がございましたか。','[{"text":"何か問題がございましたか。"}]','1'),
('35e1b-ja-d-return-exchange-t03','35e1b-ja-d-return-exchange-expr','A','いいえ、少し小さいだけです。外では履いていません。','[{"text":"いいえ、少し小さいだけです。外では履いていません。"}]','2'),
('35e1b-ja-d-return-exchange-t04','35e1b-ja-d-return-exchange-expr','B','レシートはお持ちですか。','[{"text":"レシートはお持ちですか。"}]','3'),
('35e1b-ja-d-return-exchange-t05','35e1b-ja-d-return-exchange-expr','A','はい。一つ上のサイズを試せますか。','[{"text":"はい。一つ上のサイズを試せますか。"}]','4'),
('35e1b-ja-d-return-exchange-t06','35e1b-ja-d-return-exchange-expr','B','もちろんです。お持ちします。','[{"text":"もちろんです。お持ちします。"}]','5'),
('35e1b-ja-d-return-defect-t01','35e1b-ja-d-return-defect-expr','A','この電気ケトルが、二日で動かなくなりました。','[{"text":"この電気ケトルが、二日で動かなくなりました。"}]','0'),
('35e1b-ja-d-return-defect-t02','35e1b-ja-d-return-defect-expr','B','申し訳ありません。レシートはお持ちですか。','[{"text":"申し訳ありません。レシートはお持ちですか。"}]','1'),
('35e1b-ja-d-return-defect-t03','35e1b-ja-d-return-defect-expr','A','はい。交換ではなく、返金をお願いします。','[{"text":"はい。交換ではなく、返金をお願いします。"}]','2'),
('35e1b-ja-d-return-defect-t04','35e1b-ja-d-return-defect-expr','B','かしこまりました。カードに返金いたします。','[{"text":"かしこまりました。カードに返金いたします。"}]','3'),
('35e1b-ja-d-return-defect-t05','35e1b-ja-d-return-defect-expr','A','返金までどのくらいかかりますか。','[{"text":"返金までどのくらいかかりますか。"}]','4'),
('35e1b-ja-d-return-defect-t06','35e1b-ja-d-return-defect-expr','B','通常は三日から五営業日です。','[{"text":"通常は三日から五営業日です。"}]','5'),
('35e1b-ja-d-directions-repair-t01','35e1b-ja-d-directions-repair-expr','A','すみません、中央駅へはどう行けばいいですか。','[{"text":"すみません、中央駅へはどう行けばいいですか。"}]','0'),
('35e1b-ja-d-directions-repair-t02','35e1b-ja-d-directions-repair-expr','B','バスターミナルなら、あちらへ二ブロックです。','[{"text":"バスターミナルなら、あちらへ二ブロックです。"}]','1'),
('35e1b-ja-d-directions-repair-t03','35e1b-ja-d-directions-repair-expr','A','すみません、バスではなく電車の駅です。','[{"text":"すみません、バスではなく電車の駅です。"}]','2'),
('35e1b-ja-d-directions-repair-t04','35e1b-ja-d-directions-repair-expr','B','ああ、わかりました。次の角を左に曲がって、銀行を通り過ぎてください。','[{"text":"ああ、わかりました。次の角を左に曲がって、銀行を通り過ぎてください。"}]','3'),
('35e1b-ja-d-directions-repair-t05','35e1b-ja-d-directions-repair-expr','A','そこから遠いですか。','[{"text":"そこから遠いですか。"}]','4'),
('35e1b-ja-d-directions-repair-t06','35e1b-ja-d-directions-repair-expr','B','いいえ、歩いて五分くらいです。','[{"text":"いいえ、歩いて五分くらいです。"}]','5');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-ja-d-train-transfer-t01','35e1b-ja-d-train-transfer-expr','A','すみません、空港へ行くならこの電車で合っていますか。','[{"text":"すみません、空港へ行くならこの電車で合っていますか。"}]','0'),
('35e1b-ja-d-train-transfer-t02','35e1b-ja-d-train-transfer-expr','B','直接は行きません。中央駅で乗り換えてください。','[{"text":"直接は行きません。中央駅で乗り換えてください。"}]','1'),
('35e1b-ja-d-train-transfer-t03','35e1b-ja-d-train-transfer-expr','A','中央駅では何番線ですか。','[{"text":"中央駅では何番線ですか。"}]','2'),
('35e1b-ja-d-train-transfer-t04','35e1b-ja-d-train-transfer-expr','B','六番線です。案内表示があります。','[{"text":"六番線です。案内表示があります。"}]','3'),
('35e1b-ja-d-train-transfer-t05','35e1b-ja-d-train-transfer-expr','A','乗り換える時間は十分ありますか。','[{"text":"乗り換える時間は十分ありますか。"}]','4'),
('35e1b-ja-d-train-transfer-t06','35e1b-ja-d-train-transfer-expr','B','はい、十二分ほどあります。','[{"text":"はい、十二分ほどあります。"}]','5'),
('35e1b-ja-d-group-work-t01','35e1b-ja-d-group-work-expr','A','発表の作業をどう分けようか。','[{"text":"発表の作業をどう分けようか。"}]','0'),
('35e1b-ja-d-group-work-t02','35e1b-ja-d-group-work-expr','B','私は導入と最初の二枚のスライドを担当するよ。','[{"text":"私は導入と最初の二枚のスライドを担当するよ。"}]','1'),
('35e1b-ja-d-group-work-t03','35e1b-ja-d-group-work-expr','A','二枚目に入れる例も一つ探してくれる？','[{"text":"二枚目に入れる例も一つ探してくれる？"}]','2'),
('35e1b-ja-d-group-work-t04','35e1b-ja-d-group-work-expr','B','いいよ。最後の数字を確認してもらえる？','[{"text":"いいよ。最後の数字を確認してもらえる？"}]','3'),
('35e1b-ja-d-group-work-t05','35e1b-ja-d-group-work-expr','A','うん。金曜日までにお互いに送ろう。','[{"text":"うん。金曜日までにお互いに送ろう。"}]','4'),
('35e1b-ja-d-group-work-t06','35e1b-ja-d-group-work-expr','B','わかった。月曜日に練習できるね。','[{"text":"わかった。月曜日に練習できるね。"}]','5'),
('35e1b-ja-d-group-disagree-t01','35e1b-ja-d-group-disagree-expr','A','アンケートの結果を中心にしたほうがいいと思います。','[{"text":"アンケートの結果を中心にしたほうがいいと思います。"}]','0'),
('35e1b-ja-d-group-disagree-t02','35e1b-ja-d-group-disagree-expr','B','言いたいことはわかりますが、インタビューが変化の理由を説明しています。','[{"text":"言いたいことはわかりますが、インタビューが変化の理由を説明しています。"}]','1'),
('35e1b-ja-d-group-disagree-t03','35e1b-ja-d-group-disagree-expr','A','両方入れるということですか。','[{"text":"両方入れるということですか。"}]','2'),
('35e1b-ja-d-group-disagree-t04','35e1b-ja-d-group-disagree-expr','B','はい。ただ、背景の部分は短くできます。','[{"text":"はい。ただ、背景の部分は短くできます。"}]','3'),
('35e1b-ja-d-group-disagree-t05','35e1b-ja-d-group-disagree-expr','A','それならよさそうです。背景は一段落だけ残しましょう。','[{"text":"それならよさそうです。背景は一段落だけ残しましょう。"}]','4'),
('35e1b-ja-d-group-disagree-t06','35e1b-ja-d-group-disagree-expr','B','では、私が構成を直します。','[{"text":"では、私が構成を直します。"}]','5'),
('35e1b-ja-d-repair-heating-t01','35e1b-ja-d-repair-heating-expr','A','部屋の暖房が動かないのですが。','[{"text":"部屋の暖房が動かないのですが。"}]','0'),
('35e1b-ja-d-repair-heating-t02','35e1b-ja-d-repair-heating-expr','B','申し訳ありません。エラー番号は出ていますか。','[{"text":"申し訳ありません。エラー番号は出ていますか。"}]','1'),
('35e1b-ja-d-repair-heating-t03','35e1b-ja-d-repair-heating-expr','A','はい、E3と出ています。部屋も寒くなってきました。','[{"text":"はい、E3と出ています。部屋も寒くなってきました。"}]','2'),
('35e1b-ja-d-repair-heating-t04','35e1b-ja-d-repair-heating-expr','B','明日の午後なら修理の者が伺えます。','[{"text":"明日の午後なら修理の者が伺えます。"}]','3'),
('35e1b-ja-d-repair-heating-t05','35e1b-ja-d-repair-heating-expr','A','明日直らなかった場合、暖房器具を借りられますか。','[{"text":"明日直らなかった場合、暖房器具を借りられますか。"}]','4'),
('35e1b-ja-d-repair-heating-t06','35e1b-ja-d-repair-heating-expr','B','はい。今日、受付にご用意します。','[{"text":"はい。今日、受付にご用意します。"}]','5'),
('35e1b-ja-d-repair-leak-t01','35e1b-ja-d-repair-leak-expr','A','台所の流しの下から水が漏れています。','[{"text":"台所の流しの下から水が漏れています。"}]','0'),
('35e1b-ja-d-repair-leak-t02','35e1b-ja-d-repair-leak-expr','B','少しずつですか。それとも、ずっと流れていますか。','[{"text":"少しずつですか。それとも、ずっと流れていますか。"}]','1'),
('35e1b-ja-d-repair-leak-t03','35e1b-ja-d-repair-leak-expr','A','ずっと流れていたので、水を止めました。','[{"text":"ずっと流れていたので、水を止めました。"}]','2'),
('35e1b-ja-d-repair-leak-t04','35e1b-ja-d-repair-leak-expr','B','ありがとうございます。一時間以内に修理の者を向かわせます。','[{"text":"ありがとうございます。一時間以内に修理の者を向かわせます。"}]','3'),
('35e1b-ja-d-repair-leak-t05','35e1b-ja-d-repair-leak-expr','A','家で待っている必要がありますか。','[{"text":"家で待っている必要がありますか。"}]','4'),
('35e1b-ja-d-repair-leak-t06','35e1b-ja-d-repair-leak-expr','B','はい。到着前に担当者から電話します。','[{"text":"はい。到着前に担当者から電話します。"}]','5'),
('35e1b-ja-d-medical-symptoms-t01','35e1b-ja-d-medical-symptoms-expr','A','今日はどうされましたか。','[{"text":"今日はどうされましたか。"}]','0'),
('35e1b-ja-d-medical-symptoms-t02','35e1b-ja-d-medical-symptoms-expr','B','月曜日から喉が痛くて、昨夜は熱もありました。','[{"text":"月曜日から喉が痛くて、昨夜は熱もありました。"}]','1'),
('35e1b-ja-d-medical-symptoms-t03','35e1b-ja-d-medical-symptoms-expr','A','息苦しさはありますか。','[{"text":"息苦しさはありますか。"}]','2'),
('35e1b-ja-d-medical-symptoms-t04','35e1b-ja-d-medical-symptoms-expr','B','いいえ。でも、飲み込むと痛いです。','[{"text":"いいえ。でも、飲み込むと痛いです。"}]','3'),
('35e1b-ja-d-medical-symptoms-t05','35e1b-ja-d-medical-symptoms-expr','A','わかりました。まず喉を診ますね。','[{"text":"わかりました。まず喉を診ますね。"}]','4'),
('35e1b-ja-d-medical-symptoms-t06','35e1b-ja-d-medical-symptoms-expr','B','わかりました。ありがとうございます。','[{"text":"わかりました。ありがとうございます。"}]','5'),
('35e1b-ja-d-pharmacy-medicine-t01','35e1b-ja-d-pharmacy-medicine-expr','A','この薬の飲み方を教えていただけますか。','[{"text":"この薬の飲み方を教えていただけますか。"}]','0'),
('35e1b-ja-d-pharmacy-medicine-t02','35e1b-ja-d-pharmacy-medicine-expr','B','食後に一錠、一日三回まで飲んでください。','[{"text":"食後に一錠、一日三回まで飲んでください。"}]','1'),
('35e1b-ja-d-pharmacy-medicine-t03','35e1b-ja-d-pharmacy-medicine-expr','A','アレルギーの薬と一緒に飲んでも大丈夫ですか。','[{"text":"アレルギーの薬と一緒に飲んでも大丈夫ですか。"}]','2'),
('35e1b-ja-d-pharmacy-medicine-t04','35e1b-ja-d-pharmacy-medicine-expr','B','確認します。その薬の名前は何ですか。','[{"text":"確認します。その薬の名前は何ですか。"}]','3');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-ja-d-pharmacy-medicine-t05','35e1b-ja-d-pharmacy-medicine-expr','A','この箱に書いてあります。','[{"text":"この箱に書いてあります。"}]','4'),
('35e1b-ja-d-pharmacy-medicine-t06','35e1b-ja-d-pharmacy-medicine-expr','B','ありがとうございます。この二つは一緒に飲んでも大丈夫です。','[{"text":"ありがとうございます。この二つは一緒に飲んでも大丈夫です。"}]','5'),
('35e1b-ja-d-invitation-decline-t01','35e1b-ja-d-invitation-decline-expr','A','金曜日、一緒に夕飯を食べない？','[{"text":"金曜日、一緒に夕飯を食べない？"}]','0'),
('35e1b-ja-d-invitation-decline-t02','35e1b-ja-d-invitation-decline-expr','B','行きたいけど、その夜はもう予定があるんだ。','[{"text":"行きたいけど、その夜はもう予定があるんだ。"}]','1'),
('35e1b-ja-d-invitation-decline-t03','35e1b-ja-d-invitation-decline-expr','A','そっか。週末は空いてる？','[{"text":"そっか。週末は空いてる？"}]','2'),
('35e1b-ja-d-invitation-decline-t04','35e1b-ja-d-invitation-decline-expr','B','日曜日の午後なら大丈夫だよ。','[{"text":"日曜日の午後なら大丈夫だよ。"}]','3'),
('35e1b-ja-d-invitation-decline-t05','35e1b-ja-d-invitation-decline-expr','A','三時にコーヒーはどう？','[{"text":"三時にコーヒーはどう？"}]','4'),
('35e1b-ja-d-invitation-decline-t06','35e1b-ja-d-invitation-decline-expr','B','いいね。じゃあ、そのときに。','[{"text":"いいね。じゃあ、そのときに。"}]','5'),
('35e1b-ja-d-invitation-condition-t01','35e1b-ja-d-invitation-condition-expr','A','土曜日にピクニックをするんだけど、来ない？','[{"text":"土曜日にピクニックをするんだけど、来ない？"}]','0'),
('35e1b-ja-d-invitation-condition-t02','35e1b-ja-d-invitation-condition-expr','B','行けるかも。何時から？','[{"text":"行けるかも。何時から？"}]','1'),
('35e1b-ja-d-invitation-condition-t03','35e1b-ja-d-invitation-condition-expr','A','十二時ごろ、リバーサイド公園で。','[{"text":"十二時ごろ、リバーサイド公園で。"}]','2'),
('35e1b-ja-d-invitation-condition-t04','35e1b-ja-d-invitation-condition-expr','B','十一時までに仕事が終わったら行けるよ。','[{"text":"十一時までに仕事が終わったら行けるよ。"}]','3'),
('35e1b-ja-d-invitation-condition-t05','35e1b-ja-d-invitation-condition-expr','A','大丈夫。わかったらメッセージして。','[{"text":"大丈夫。わかったらメッセージして。"}]','4'),
('35e1b-ja-d-invitation-condition-t06','35e1b-ja-d-invitation-condition-expr','B','そうするね。誘ってくれてありがとう。','[{"text":"そうするね。誘ってくれてありがとう。"}]','5'),
('35e1b-ja-d-misunderstanding-time-t01','35e1b-ja-d-misunderstanding-time-expr','A','会議は二時からだと思っていました。','[{"text":"会議は二時からだと思っていました。"}]','0'),
('35e1b-ja-d-misunderstanding-time-t02','35e1b-ja-d-misunderstanding-time-expr','B','昨日、三時に変更になりました。','[{"text":"昨日、三時に変更になりました。"}]','1'),
('35e1b-ja-d-misunderstanding-time-t03','35e1b-ja-d-misunderstanding-time-expr','A','そのメッセージを見落としたようです。','[{"text":"そのメッセージを見落としたようです。"}]','2'),
('35e1b-ja-d-misunderstanding-time-t04','35e1b-ja-d-misunderstanding-time-expr','B','大丈夫です。三時でも来られますか。','[{"text":"大丈夫です。三時でも来られますか。"}]','3'),
('35e1b-ja-d-misunderstanding-time-t05','35e1b-ja-d-misunderstanding-time-expr','A','はい。確認ですが、三時に四号室ですね。','[{"text":"はい。確認ですが、三時に四号室ですね。"}]','4'),
('35e1b-ja-d-misunderstanding-time-t06','35e1b-ja-d-misunderstanding-time-expr','B','そのとおりです。では、後で。','[{"text":"そのとおりです。では、後で。"}]','5'),
('35e1b-ja-d-misunderstanding-tone-t01','35e1b-ja-d-misunderstanding-tone-expr','A','会議でのコメントが、かなり厳しく聞こえました。','[{"text":"会議でのコメントが、かなり厳しく聞こえました。"}]','0'),
('35e1b-ja-d-misunderstanding-tone-t02','35e1b-ja-d-misunderstanding-tone-expr','B','すみません。仕事ではなく、日程について確認したかったんです。','[{"text":"すみません。仕事ではなく、日程について確認したかったんです。"}]','1'),
('35e1b-ja-d-misunderstanding-tone-t03','35e1b-ja-d-misunderstanding-tone-expr','A','説明してくれてありがとう。責められたのかと思いました。','[{"text":"説明してくれてありがとう。責められたのかと思いました。"}]','2'),
('35e1b-ja-d-misunderstanding-tone-t04','35e1b-ja-d-misunderstanding-tone-expr','B','そう聞こえた理由はわかります。','[{"text":"そう聞こえた理由はわかります。"}]','3'),
('35e1b-ja-d-misunderstanding-tone-t05','35e1b-ja-d-misunderstanding-tone-expr','A','明日、もう一度日程について話せますか。','[{"text":"明日、もう一度日程について話せますか。"}]','4'),
('35e1b-ja-d-misunderstanding-tone-t06','35e1b-ja-d-misunderstanding-tone-expr','B','もちろんです。今度はもっとはっきり説明します。','[{"text":"もちろんです。今度はもっとはっきり説明します。"}]','5'),
('35e1b-ja-d-hotel-room-t01','35e1b-ja-d-hotel-room-expr','A','すみません、夜になると部屋がとても騒がしいです。','[{"text":"すみません、夜になると部屋がとても騒がしいです。"}]','0'),
('35e1b-ja-d-hotel-room-t02','35e1b-ja-d-hotel-room-expr','B','申し訳ありません。外の道路の音ですか。','[{"text":"申し訳ありません。外の道路の音ですか。"}]','1'),
('35e1b-ja-d-hotel-room-t03','35e1b-ja-d-hotel-room-expr','A','はい。もう少し静かな部屋はありますか。','[{"text":"はい。もう少し静かな部屋はありますか。"}]','2'),
('35e1b-ja-d-hotel-room-t04','35e1b-ja-d-hotel-room-expr','B','六階にございますが、シングルベッドが二台の部屋です。','[{"text":"六階にございますが、シングルベッドが二台の部屋です。"}]','3'),
('35e1b-ja-d-hotel-room-t05','35e1b-ja-d-hotel-room-expr','A','それで大丈夫です。今夜移れますか。','[{"text":"それで大丈夫です。今夜移れますか。"}]','4'),
('35e1b-ja-d-hotel-room-t06','35e1b-ja-d-hotel-room-expr','B','はい。新しい鍵をご用意します。','[{"text":"はい。新しい鍵をご用意します。"}]','5'),
('35e1b-ja-d-hotel-booking-t01','35e1b-ja-d-hotel-booking-expr','A','パテルの名前で予約しています。','[{"text":"パテルの名前で予約しています。"}]','0'),
('35e1b-ja-d-hotel-booking-t02','35e1b-ja-d-hotel-booking-expr','B','まだ見つかりません。別のお名前でしょうか。','[{"text":"まだ見つかりません。別のお名前でしょうか。"}]','1'),
('35e1b-ja-d-hotel-booking-t03','35e1b-ja-d-hotel-booking-expr','A','プリヤ・パテルで探してください。先月、オンラインで予約しました。','[{"text":"プリヤ・パテルで探してください。先月、オンラインで予約しました。"}]','2'),
('35e1b-ja-d-hotel-booking-t04','35e1b-ja-d-hotel-booking-expr','B','ございました。三泊のご予定ですね。','[{"text":"ございました。三泊のご予定ですね。"}]','3'),
('35e1b-ja-d-hotel-booking-t05','35e1b-ja-d-hotel-booking-expr','A','はい。朝食は含まれていますか。','[{"text":"はい。朝食は含まれていますか。"}]','4'),
('35e1b-ja-d-hotel-booking-t06','35e1b-ja-d-hotel-booking-expr','B','はい。朝食は七時からです。','[{"text":"はい。朝食は七時からです。"}]','5'),
('35e1b-ja-d-taxi-destination-t01','35e1b-ja-d-taxi-destination-expr','A','リバーサイドホテルまでお願いします。','[{"text":"リバーサイドホテルまでお願いします。"}]','0'),
('35e1b-ja-d-taxi-destination-t02','35e1b-ja-d-taxi-destination-expr','B','かしこまりました。キング通りのホテルですね。','[{"text":"かしこまりました。キング通りのホテルですね。"}]','1');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-ja-d-taxi-destination-t03','35e1b-ja-d-taxi-destination-expr','A','はい、そこです。どのくらいかかりますか。','[{"text":"はい、そこです。どのくらいかかりますか。"}]','2'),
('35e1b-ja-d-taxi-destination-t04','35e1b-ja-d-taxi-destination-expr','B','道が空いていれば、二十分くらいです。','[{"text":"道が空いていれば、二十分くらいです。"}]','3'),
('35e1b-ja-d-taxi-destination-t05','35e1b-ja-d-taxi-destination-expr','A','カードで払えますか。','[{"text":"カードで払えますか。"}]','4'),
('35e1b-ja-d-taxi-destination-t06','35e1b-ja-d-taxi-destination-expr','B','はい、使えます。','[{"text":"はい、使えます。"}]','5'),
('35e1b-ja-d-bus-wrong-stop-t01','35e1b-ja-d-bus-wrong-stop-expr','A','このバスは市立病院の近くに止まりますか。','[{"text":"このバスは市立病院の近くに止まりますか。"}]','0'),
('35e1b-ja-d-bus-wrong-stop-t02','35e1b-ja-d-bus-wrong-stop-expr','B','いいえ、このバスは反対方向に向かっています。','[{"text":"いいえ、このバスは反対方向に向かっています。"}]','1'),
('35e1b-ja-d-bus-wrong-stop-t03','35e1b-ja-d-bus-wrong-stop-expr','A','そうですか。どこで降りればいいですか。','[{"text":"そうですか。どこで降りればいいですか。"}]','2'),
('35e1b-ja-d-bus-wrong-stop-t04','35e1b-ja-d-bus-wrong-stop-expr','B','次で降りて、反対側から二十四番に乗ってください。','[{"text":"次で降りて、反対側から二十四番に乗ってください。"}]','3'),
('35e1b-ja-d-bus-wrong-stop-t05','35e1b-ja-d-bus-wrong-stop-expr','A','二十四番は病院の前に止まりますか。','[{"text":"二十四番は病院の前に止まりますか。"}]','4'),
('35e1b-ja-d-bus-wrong-stop-t06','35e1b-ja-d-bus-wrong-stop-expr','B','はい、正面入口のすぐ前です。','[{"text":"はい、正面入口のすぐ前です。"}]','5'),
('35e1b-ja-d-order-unavailable-t01','35e1b-ja-d-order-unavailable-expr','A','焼き魚をお願いします。','[{"text":"焼き魚をお願いします。"}]','0'),
('35e1b-ja-d-order-unavailable-t02','35e1b-ja-d-order-unavailable-expr','B','申し訳ありません。焼き魚は売り切れております。','[{"text":"申し訳ありません。焼き魚は売り切れております。"}]','1'),
('35e1b-ja-d-order-unavailable-t03','35e1b-ja-d-order-unavailable-expr','A','代わりに、何がおすすめですか。','[{"text":"代わりに、何がおすすめですか。"}]','2'),
('35e1b-ja-d-order-unavailable-t04','35e1b-ja-d-order-unavailable-expr','B','鶏肉料理が似ています。野菜のパスタもございます。','[{"text":"鶏肉料理が似ています。野菜のパスタもございます。"}]','3'),
('35e1b-ja-d-order-unavailable-t05','35e1b-ja-d-order-unavailable-expr','A','では、パスタにします。チーズ抜きにできますか。','[{"text":"では、パスタにします。チーズ抜きにできますか。"}]','4'),
('35e1b-ja-d-order-unavailable-t06','35e1b-ja-d-order-unavailable-expr','B','もちろんです。','[{"text":"もちろんです。"}]','5'),
('35e1b-ja-d-dietary-clarify-t01','35e1b-ja-d-dietary-clarify-expr','A','野菜スープはベジタリアン向けですか。','[{"text":"野菜スープはベジタリアン向けですか。"}]','0'),
('35e1b-ja-d-dietary-clarify-t02','35e1b-ja-d-dietary-clarify-expr','B','はい、肉は入っていません。','[{"text":"はい、肉は入っていません。"}]','1'),
('35e1b-ja-d-dietary-clarify-t03','35e1b-ja-d-dietary-clarify-expr','A','だしも野菜だけですか。','[{"text":"だしも野菜だけですか。"}]','2'),
('35e1b-ja-d-dietary-clarify-t04','35e1b-ja-d-dietary-clarify-expr','B','厨房に確認してまいります。','[{"text":"厨房に確認してまいります。"}]','3'),
('35e1b-ja-d-dietary-clarify-t05','35e1b-ja-d-dietary-clarify-expr','A','ありがとうございます。鶏のだしも避けたいんです。','[{"text":"ありがとうございます。鶏のだしも避けたいんです。"}]','4'),
('35e1b-ja-d-dietary-clarify-t06','35e1b-ja-d-dietary-clarify-expr','B','承知しました。ご注文の前に必ず確認します。','[{"text":"承知しました。ご注文の前に必ず確認します。"}]','5'),
('35e1b-ja-d-school-deadline-t01','35e1b-ja-d-school-deadline-expr','A','課題の締め切りについて相談してもいいですか。','[{"text":"課題の締め切りについて相談してもいいですか。"}]','0'),
('35e1b-ja-d-school-deadline-t02','35e1b-ja-d-school-deadline-expr','B','もちろんです。どうしましたか。','[{"text":"もちろんです。どうしましたか。"}]','1'),
('35e1b-ja-d-school-deadline-t03','35e1b-ja-d-school-deadline-expr','A','体調を崩して、木曜日までに終わりそうにありません。','[{"text":"体調を崩して、木曜日までに終わりそうにありません。"}]','2'),
('35e1b-ja-d-school-deadline-t04','35e1b-ja-d-school-deadline-expr','B','月曜日までなら延ばせますが、それより後は難しいです。','[{"text":"月曜日までなら延ばせますが、それより後は難しいです。"}]','3'),
('35e1b-ja-d-school-deadline-t05','35e1b-ja-d-school-deadline-expr','A','月曜日なら助かります。診断書は必要ですか。','[{"text":"月曜日なら助かります。診断書は必要ですか。"}]','4'),
('35e1b-ja-d-school-deadline-t06','35e1b-ja-d-school-deadline-expr','B','今回は必要ありません。正午までにメールで送ってください。','[{"text":"今回は必要ありません。正午までにメールで送ってください。"}]','5'),
('35e1b-ja-d-work-clarification-t01','35e1b-ja-d-work-clarification-expr','A','今日中に顧客ファイルを更新してもらえますか。','[{"text":"今日中に顧客ファイルを更新してもらえますか。"}]','0'),
('35e1b-ja-d-work-clarification-t02','35e1b-ja-d-work-clarification-expr','B','どの部分を更新すればいいですか。','[{"text":"どの部分を更新すればいいですか。"}]','1'),
('35e1b-ja-d-work-clarification-t03','35e1b-ja-d-work-clarification-expr','A','連絡先と昨日の電話のメモです。','[{"text":"連絡先と昨日の電話のメモです。"}]','2'),
('35e1b-ja-d-work-clarification-t04','35e1b-ja-d-work-clarification-expr','B','支払いの部分はそのままでいいですか。','[{"text":"支払いの部分はそのままでいいですか。"}]','3'),
('35e1b-ja-d-work-clarification-t05','35e1b-ja-d-work-clarification-expr','A','はい。まず連絡先を優先してください。','[{"text":"はい。まず連絡先を優先してください。"}]','4'),
('35e1b-ja-d-work-clarification-t06','35e1b-ja-d-work-clarification-expr','B','わかりました。四時までに送ります。','[{"text":"わかりました。四時までに送ります。"}]','5'),
('35e1b-ja-d-neighbour-noise-t01','35e1b-ja-d-neighbour-noise-expr','A','すみません。音楽が壁越しにかなり聞こえるのですが。','[{"text":"すみません。音楽が壁越しにかなり聞こえるのですが。"}]','0'),
('35e1b-ja-d-neighbour-noise-t02','35e1b-ja-d-neighbour-noise-expr','B','そんなに大きいとは気づきませんでした。','[{"text":"そんなに大きいとは気づきませんでした。"}]','1'),
('35e1b-ja-d-neighbour-noise-t03','35e1b-ja-d-neighbour-noise-expr','A','十時を過ぎたら、音を小さくしてもらえますか。','[{"text":"十時を過ぎたら、音を小さくしてもらえますか。"}]','2'),
('35e1b-ja-d-neighbour-noise-t04','35e1b-ja-d-neighbour-noise-expr','B','もちろんです。もうすぐ終わるところです。','[{"text":"もちろんです。もうすぐ終わるところです。"}]','3'),
('35e1b-ja-d-neighbour-noise-t05','35e1b-ja-d-neighbour-noise-expr','A','ありがとうございます。本当に助かります。','[{"text":"ありがとうございます。本当に助かります。"}]','4'),
('35e1b-ja-d-neighbour-noise-t06','35e1b-ja-d-neighbour-noise-expr','B','こちらこそ、すみませんでした。','[{"text":"こちらこそ、すみませんでした。"}]','5');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-ja-d-wrong-delivery-t01','35e1b-ja-d-wrong-delivery-expr','A','注文と違う商品が届きました。','[{"text":"注文と違う商品が届きました。"}]','0'),
('35e1b-ja-d-wrong-delivery-t02','35e1b-ja-d-wrong-delivery-expr','B','申し訳ありません。何をご注文になりましたか。','[{"text":"申し訳ありません。何をご注文になりましたか。"}]','1'),
('35e1b-ja-d-wrong-delivery-t03','35e1b-ja-d-wrong-delivery-expr','A','黒いジャケットを注文しましたが、青いものが届きました。','[{"text":"黒いジャケットを注文しましたが、青いものが届きました。"}]','2'),
('35e1b-ja-d-wrong-delivery-t04','35e1b-ja-d-wrong-delivery-expr','B','本日、正しい商品を発送できます。','[{"text":"本日、正しい商品を発送できます。"}]','3'),
('35e1b-ja-d-wrong-delivery-t05','35e1b-ja-d-wrong-delivery-expr','A','先にこちらを返す必要がありますか。','[{"text":"先にこちらを返す必要がありますか。"}]','4'),
('35e1b-ja-d-wrong-delivery-t06','35e1b-ja-d-wrong-delivery-expr','B','いいえ。返送用の伝票を同封します。','[{"text":"いいえ。返送用の伝票を同封します。"}]','5'),
('35e1b-ja-d-opinion-disagree-t01','35e1b-ja-d-opinion-disagree-expr','A','市の中心部への車の乗り入れは禁止したほうがいいと思う。','[{"text":"市の中心部への車の乗り入れは禁止したほうがいいと思う。"}]','0'),
('35e1b-ja-d-opinion-disagree-t02','35e1b-ja-d-opinion-disagree-expr','B','私は少し違う意見かな。通勤に車が必要な人もいるよ。','[{"text":"私は少し違う意見かな。通勤に車が必要な人もいるよ。"}]','1'),
('35e1b-ja-d-opinion-disagree-t03','35e1b-ja-d-opinion-disagree-expr','A','確かに。でも、公共交通をもっと便利にできると思う。','[{"text":"確かに。でも、公共交通をもっと便利にできると思う。"}]','2'),
('35e1b-ja-d-opinion-disagree-t04','35e1b-ja-d-opinion-disagree-expr','B','バスの本数が増えたら、禁止に賛成する？','[{"text":"バスの本数が増えたら、禁止に賛成する？"}]','3'),
('35e1b-ja-d-opinion-disagree-t05','35e1b-ja-d-opinion-disagree-expr','A','混む時間だけなら賛成するかも。','[{"text":"混む時間だけなら賛成するかも。"}]','4'),
('35e1b-ja-d-opinion-disagree-t06','35e1b-ja-d-opinion-disagree-expr','B','それなら、いい妥協案になりそうだね。','[{"text":"それなら、いい妥協案になりそうだね。"}]','5'),
('35e1b-ja-d-lost-reservation-t01','35e1b-ja-d-lost-reservation-expr','A','七時に四名で予約しています。','[{"text":"七時に四名で予約しています。"}]','0'),
('35e1b-ja-d-lost-reservation-t02','35e1b-ja-d-lost-reservation-expr','B','申し訳ありません。お名前を教えていただけますか。','[{"text":"申し訳ありません。お名前を教えていただけますか。"}]','1'),
('35e1b-ja-d-lost-reservation-t03','35e1b-ja-d-lost-reservation-expr','A','テイラーです。確認メールもあります。','[{"text":"テイラーです。確認メールもあります。"}]','2'),
('35e1b-ja-d-lost-reservation-t04','35e1b-ja-d-lost-reservation-expr','B','ありがとうございます。明日の予約として入っています。','[{"text":"ありがとうございます。明日の予約として入っています。"}]','3'),
('35e1b-ja-d-lost-reservation-t05','35e1b-ja-d-lost-reservation-expr','A','今夜、席が必要なのですが、空いていませんか。','[{"text":"今夜、席が必要なのですが、空いていませんか。"}]','4'),
('35e1b-ja-d-lost-reservation-t06','35e1b-ja-d-lost-reservation-expr','B','十五分ほどお待ちいただければ、ご用意できます。','[{"text":"十五分ほどお待ちいただければ、ご用意できます。"}]','5'),
('35e1b-ja-d-flight-delay-t01','35e1b-ja-d-flight-delay-expr','A','飛行機が遅れて、乗り継ぎに間に合わないかもしれません。','[{"text":"飛行機が遅れて、乗り継ぎに間に合わないかもしれません。"}]','0'),
('35e1b-ja-d-flight-delay-t02','35e1b-ja-d-flight-delay-expr','B','最終目的地はどちらですか。','[{"text":"最終目的地はどちらですか。"}]','1'),
('35e1b-ja-d-flight-delay-t03','35e1b-ja-d-flight-delay-expr','A','シドニー経由でウェリントンです。','[{"text":"シドニー経由でウェリントンです。"}]','2'),
('35e1b-ja-d-flight-delay-t04','35e1b-ja-d-flight-delay-expr','B','シドニーを八時に出る便ならあります。','[{"text":"シドニーを八時に出る便ならあります。"}]','3'),
('35e1b-ja-d-flight-delay-t05','35e1b-ja-d-flight-delay-expr','A','今、その便に変更できますか。','[{"text":"今、その便に変更できますか。"}]','4'),
('35e1b-ja-d-flight-delay-t06','35e1b-ja-d-flight-delay-expr','B','はい。予約を変更して、新しい搭乗券をお渡しします。','[{"text":"はい。予約を変更して、新しい搭乗券をお渡しします。"}]','5'),
('35e1b-ja-d-counter-service-t01','35e1b-ja-d-counter-service-expr','A','こちらを贈り物にしたいのですが。','[{"text":"こちらを贈り物にしたいのですが。"}]','0'),
('35e1b-ja-d-counter-service-t02','35e1b-ja-d-counter-service-expr','B','無料の包装と有料の箱がございます。','[{"text":"無料の包装と有料の箱がございます。"}]','1'),
('35e1b-ja-d-counter-service-t03','35e1b-ja-d-counter-service-expr','A','無料の包装でお願いします。','[{"text":"無料の包装でお願いします。"}]','2'),
('35e1b-ja-d-counter-service-t04','35e1b-ja-d-counter-service-expr','B','かしこまりました。値札は外しますか。','[{"text":"かしこまりました。値札は外しますか。"}]','3'),
('35e1b-ja-d-counter-service-t05','35e1b-ja-d-counter-service-expr','A','はい。領収書もいただけますか。','[{"text":"はい。領収書もいただけますか。"}]','4'),
('35e1b-ja-d-counter-service-t06','35e1b-ja-d-counter-service-expr','B','もちろんです。商品とは別にお渡しします。','[{"text":"もちろんです。商品とは別にお渡しします。"}]','5'),
('35e1b-ja-d-clinic-reception-t01','35e1b-ja-d-clinic-reception-expr','A','予約はないのですが、診てもらえますか。','[{"text":"予約はないのですが、診てもらえますか。"}]','0'),
('35e1b-ja-d-clinic-reception-t02','35e1b-ja-d-clinic-reception-expr','B','症状を簡単に教えてください。','[{"text":"症状を簡単に教えてください。"}]','1'),
('35e1b-ja-d-clinic-reception-t03','35e1b-ja-d-clinic-reception-expr','A','昨日から熱があり、今朝ひどくなりました。','[{"text":"昨日から熱があり、今朝ひどくなりました。"}]','2'),
('35e1b-ja-d-clinic-reception-t04','35e1b-ja-d-clinic-reception-expr','B','少しお待ちいただければ、医師に確認します。','[{"text":"少しお待ちいただければ、医師に確認します。"}]','3'),
('35e1b-ja-d-clinic-reception-t05','35e1b-ja-d-clinic-reception-expr','A','待ち時間はどのくらいですか。','[{"text":"待ち時間はどのくらいですか。"}]','4'),
('35e1b-ja-d-clinic-reception-t06','35e1b-ja-d-clinic-reception-expr','B','今のところ、三十分ほどです。','[{"text":"今のところ、三十分ほどです。"}]','5'),
('35e1b-ja-d-delivery-time-t01','35e1b-ja-d-delivery-time-expr','A','家具のお届け時間についてご連絡しました。','[{"text":"家具のお届け時間についてご連絡しました。"}]','0'),
('35e1b-ja-d-delivery-time-t02','35e1b-ja-d-delivery-time-expr','B','ありがとうございます。何時ごろになりますか。','[{"text":"ありがとうございます。何時ごろになりますか。"}]','1'),
('35e1b-ja-d-delivery-time-t03','35e1b-ja-d-delivery-time-expr','A','木曜日の二時から四時の間です。','[{"text":"木曜日の二時から四時の間です。"}]','2'),
('35e1b-ja-d-delivery-time-t04','35e1b-ja-d-delivery-time-expr','B','その時間は不在です。金曜日の午前中はどうですか。','[{"text":"その時間は不在です。金曜日の午前中はどうですか。"}]','3');

INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,readings_json,sort_order) VALUES
('35e1b-ja-d-delivery-time-t05','35e1b-ja-d-delivery-time-expr','A','金曜日なら九時から十一時が空いています。','[{"text":"金曜日なら九時から十一時が空いています。"}]','4'),
('35e1b-ja-d-delivery-time-t06','35e1b-ja-d-delivery-time-expr','B','では、その時間でお願いします。','[{"text":"では、その時間でお願いします。"}]','5'),
('35e1b-ja-d-lost-property-t01','35e1b-ja-d-lost-property-expr','A','電車にかばんを忘れたかもしれません。','[{"text":"電車にかばんを忘れたかもしれません。"}]','0'),
('35e1b-ja-d-lost-property-t02','35e1b-ja-d-lost-property-expr','B','どの電車に乗りましたか。','[{"text":"どの電車に乗りましたか。"}]','1'),
('35e1b-ja-d-lost-property-t03','35e1b-ja-d-lost-property-expr','A','十時十五分発の空港行きです。','[{"text":"十時十五分発の空港行きです。"}]','2'),
('35e1b-ja-d-lost-property-t04','35e1b-ja-d-lost-property-expr','B','かばんの色と形を教えてください。','[{"text":"かばんの色と形を教えてください。"}]','3'),
('35e1b-ja-d-lost-property-t05','35e1b-ja-d-lost-property-expr','A','黒い小さなリュックです。中に名前が書いてあります。','[{"text":"黒い小さなリュックです。中に名前が書いてあります。"}]','4'),
('35e1b-ja-d-lost-property-t06','35e1b-ja-d-lost-property-expr','B','見つかったら、こちらの番号にご連絡します。','[{"text":"見つかったら、こちらの番号にご連絡します。"}]','5');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-en-x-clarify-mean-vl1','35e1b-en-x-clarify-mean-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-clarify-slower-vl2','35e1b-en-x-clarify-slower-expr','en','en-c-181',NULL,NULL,'speak','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-clarify-spell-vl3','35e1b-en-x-clarify-spell-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-clarify-example-vl4','35e1b-en-x-clarify-example-expr','en','en-c-1113',NULL,NULL,'example','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-clarify-understand-vl5','35e1b-en-x-clarify-understand-expr','en','en-c-293',NULL,NULL,'check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-clarify-understand-vl6','35e1b-en-x-clarify-understand-expr','en','en-c-317',NULL,NULL,'understand','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-clarify-in-other-words-vl7','35e1b-en-x-clarify-in-other-words-expr','en','en-c-313',NULL,NULL,'need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-clarify-in-other-words-vl8','35e1b-en-x-clarify-in-other-words-expr','en','en-c-305',NULL,NULL,'start','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-follow-what-next-vl9','35e1b-en-x-follow-what-next-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-follow-when-hear-vl10','35e1b-en-x-follow-when-hear-expr','en','en-expect',NULL,NULL,'expect','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-follow-how-go-vl11','35e1b-en-x-follow-how-go-expr','en','en-go',NULL,NULL,'go','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-follow-need-bring-vl12','35e1b-en-x-follow-need-bring-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-follow-need-bring-vl13','35e1b-en-x-follow-need-bring-expr','en','en-c-313',NULL,NULL,'need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-follow-need-bring-vl14','35e1b-en-x-follow-need-bring-expr','en','en-c-253',NULL,NULL,'bring','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-x-follow-other-options-vl15','35e1b-en-x-follow-other-options-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-follow-check-later-vl16','35e1b-en-x-follow-check-later-expr','en','en-c-293',NULL,NULL,'check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-follow-check-later-vl17','35e1b-en-x-follow-check-later-expr','en','en-c-121',NULL,NULL,'today','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-confirm-understood-vl18','35e1b-en-x-confirm-understood-expr','en','en-c-3176',NULL,NULL,'thanks','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-confirm-repeat-order-vl19','35e1b-en-x-confirm-repeat-order-expr','en','en-c-401',NULL,NULL,'order','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-confirm-if-changes-vl20','35e1b-en-x-confirm-if-changes-expr','en','en-c-897',NULL,NULL,'know','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-confirm-works-vl21','35e1b-en-x-confirm-works-expr','en','en-c-137',NULL,NULL,'time','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-confirm-agreed-vl22','35e1b-en-x-confirm-agreed-expr','en','en-c-2361',NULL,NULL,'plan','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-confirm-double-check-vl23','35e1b-en-x-confirm-double-check-expr','en','en-c-293',NULL,NULL,'check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-confirm-double-check-vl24','35e1b-en-x-confirm-double-check-expr','en','en-leave',NULL,NULL,'leave','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-refuse-not-today-vl25','35e1b-en-x-refuse-not-today-expr','en','en-c-2285',NULL,NULL,'help','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-refuse-not-today-vl26','35e1b-en-x-refuse-not-today-expr','en','en-c-121',NULL,NULL,'today','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-refuse-not-comfortable-vl27','35e1b-en-x-refuse-not-comfortable-expr','en','en-c-565',NULL,NULL,'comfortable','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-refuse-appreciate-offer-vl28','35e1b-en-x-refuse-appreciate-offer-expr','en','en-c-1065',NULL,NULL,'appreciate','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-refuse-appreciate-offer-vl29','35e1b-en-x-refuse-appreciate-offer-expr','en','en-c-1101',NULL,NULL,'offer','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-refuse-unable-refund-vl30','35e1b-en-x-refuse-unable-refund-expr','en','en-c-1101',NULL,NULL,'offer','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-tomorrow-vl31','35e1b-en-x-alternative-tomorrow-expr','en','en-tomorrow',NULL,NULL,'tomorrow','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-different-table-vl32','35e1b-en-x-alternative-different-table-expr','en','en-c-077',NULL,NULL,'table','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-different-table-vl33','35e1b-en-x-alternative-different-table-expr','en','en-c-3182',NULL,NULL,'okay','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-alternative-store-credit-vl34','35e1b-en-x-alternative-store-credit-expr','en','en-c-1101',NULL,NULL,'offer','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-split-work-vl35','35e1b-en-x-alternative-split-work-expr','en','en-c-117',NULL,NULL,'work','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-call-vl36','35e1b-en-x-alternative-call-expr','en','en-c-233',NULL,NULL,'good','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-call-vl37','35e1b-en-x-alternative-call-expr','en','en-c-137',NULL,NULL,'time','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-alternative-repair-vl38','35e1b-en-x-alternative-repair-expr','en','en-c-121',NULL,NULL,'today','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-alternative-online-vl39','35e1b-en-x-alternative-online-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-repair-start-again-vl40','35e1b-en-x-repair-start-again-expr','en','en-c-305',NULL,NULL,'start','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-en-x-repair-not-blaming-vl41','35e1b-en-x-repair-not-blaming-expr','en','en-c-317',NULL,NULL,'understand','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-repair-name-vl42','35e1b-en-x-repair-name-expr','en','en-c-1378',NULL,NULL,'name','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-appt-available-vl43','35e1b-en-x-appt-available-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-appt-reschedule-vl44','35e1b-en-x-appt-reschedule-expr','en','en-c-313',NULL,NULL,'need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-appt-arrive-vl45','35e1b-en-x-appt-arrive-expr','en','en-c-365',NULL,NULL,'early','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-appt-arrive-vl46','35e1b-en-x-appt-arrive-expr','en','en-c-261',NULL,NULL,'arrive','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-return-wrong-size-vl47','35e1b-en-x-return-wrong-size-expr','en','en-c-393',NULL,NULL,'size','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-return-receipt-vl48','35e1b-en-x-return-receipt-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-return-receipt-vl49','35e1b-en-x-return-receipt-expr','en','en-c-313',NULL,NULL,'need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-return-receipt-vl50','35e1b-en-x-return-receipt-expr','en','en-c-1755',NULL,NULL,'receipt','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-x-return-refund-card-vl51','35e1b-en-x-return-refund-card-expr','en','en-go',NULL,NULL,'go','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-return-refund-card-vl52','35e1b-en-x-return-refund-card-expr','en','en-c-969',NULL,NULL,'card','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-return-policy-vl53','35e1b-en-x-return-policy-expr','en','en-c-265',NULL,NULL,'return','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-direction-get-station-vl54','35e1b-en-x-direction-get-station-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-direction-get-station-vl55','35e1b-en-x-direction-get-station-expr','en','en-c-157',NULL,NULL,'station','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-direction-transfer-vl56','35e1b-en-x-direction-transfer-expr','en','en-c-3172',NULL,NULL,'do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-direction-transfer-vl57','35e1b-en-x-direction-transfer-expr','en','en-c-313',NULL,NULL,'need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-direction-transfer-vl58','35e1b-en-x-direction-transfer-expr','en','en-c-289',NULL,NULL,'change','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-x-direction-delay-vl59','35e1b-en-x-direction-delay-expr','en','en-c-153',NULL,NULL,'train','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-direction-delay-vl60','35e1b-en-x-direction-delay-expr','en','en-c-137',NULL,NULL,'time','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-x-medical-symptom-vl61','35e1b-en-x-medical-symptom-expr','en','en-c-125',NULL,NULL,'yesterday','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-medical-worse-vl62','35e1b-en-x-medical-worse-expr','en','en-c-133',NULL,NULL,'night','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-hotel-quiet-room-vl63','35e1b-en-x-hotel-quiet-room-expr','en','en-c-065',NULL,NULL,'room','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-hotel-checkout-vl64','35e1b-en-x-hotel-checkout-expr','en','en-c-137',NULL,NULL,'time','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-x-hotel-checkout-vl65','35e1b-en-x-hotel-checkout-expr','en','en-c-293',NULL,NULL,'check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-restaurant-allergy-vl66','35e1b-en-d-restaurant-allergy-expr','en','en-c-401',NULL,'35e1b-en-d-restaurant-allergy-t01','order','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-restaurant-allergy-vl67','35e1b-en-d-restaurant-allergy-expr','en','en-c-3176',NULL,'35e1b-en-d-restaurant-allergy-t04','thanks','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-restaurant-allergy-vl68','35e1b-en-d-restaurant-allergy-expr','en','en-c-917',NULL,'35e1b-en-d-restaurant-allergy-t05','peanut','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-restaurant-bill-vl69','35e1b-en-d-restaurant-bill-expr','en','en-c-981',NULL,'35e1b-en-d-restaurant-bill-t01','excuse me','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-restaurant-bill-vl70','35e1b-en-d-restaurant-bill-expr','en','en-c-253',NULL,'35e1b-en-d-restaurant-bill-t02','bring','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-appointment-reschedule-vl71','35e1b-en-d-appointment-reschedule-expr','en','en-c-233',NULL,'35e1b-en-d-appointment-reschedule-t01','good','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-appointment-reschedule-vl72','35e1b-en-d-appointment-reschedule-expr','en','en-c-129',NULL,'35e1b-en-d-appointment-reschedule-t01','morning','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-appointment-reschedule-vl73','35e1b-en-d-appointment-reschedule-expr','en','en-c-313',NULL,'35e1b-en-d-appointment-reschedule-t01','need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-appointment-cancel-vl74','35e1b-en-d-appointment-cancel-expr','en','en-tomorrow',NULL,'35e1b-en-d-appointment-cancel-t01','tomorrow','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-appointment-cancel-vl75','35e1b-en-d-appointment-cancel-expr','en','en-c-1378',NULL,'35e1b-en-d-appointment-cancel-t02','name','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-appointment-cancel-vl76','35e1b-en-d-appointment-cancel-expr','en','en-c-137',NULL,'35e1b-en-d-appointment-cancel-t04','time','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-help-alternative-vl77','35e1b-en-d-help-alternative-expr','en','en-c-2285',NULL,'35e1b-en-d-help-alternative-t01','help','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-help-alternative-vl78','35e1b-en-d-help-alternative-expr','en','en-c-961',NULL,'35e1b-en-d-help-alternative-t01','move','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-help-alternative-vl79','35e1b-en-d-help-alternative-expr','en','en-tomorrow',NULL,'35e1b-en-d-help-alternative-t02','tomorrow','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-return-exchange-vl80','35e1b-en-d-return-exchange-expr','en','en-c-221',NULL,'35e1b-en-d-return-exchange-t03','small','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-en-d-return-exchange-vl81','35e1b-en-d-return-exchange-expr','en','en-c-3172',NULL,'35e1b-en-d-return-exchange-t04','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-return-exchange-vl82','35e1b-en-d-return-exchange-expr','en','en-c-1755',NULL,'35e1b-en-d-return-exchange-t04','receipt','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-return-defect-vl83','35e1b-en-d-return-defect-expr','en','en-c-3172',NULL,'35e1b-en-d-return-defect-t02','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-return-defect-vl84','35e1b-en-d-return-defect-expr','en','en-c-1755',NULL,'35e1b-en-d-return-defect-t02','receipt','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-return-defect-vl85','35e1b-en-d-return-defect-expr','en','en-c-501',NULL,'35e1b-en-d-return-defect-t03','prefer','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-directions-repair-vl86','35e1b-en-d-directions-repair-expr','en','en-c-981',NULL,'35e1b-en-d-directions-repair-t01','excuse me','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-directions-repair-vl87','35e1b-en-d-directions-repair-expr','en','en-c-3172',NULL,'35e1b-en-d-directions-repair-t01','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-directions-repair-vl88','35e1b-en-d-directions-repair-expr','en','en-c-157',NULL,'35e1b-en-d-directions-repair-t01','station','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-train-transfer-vl89','35e1b-en-d-train-transfer-expr','en','en-c-981',NULL,'35e1b-en-d-train-transfer-t01','excuse me','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-train-transfer-vl90','35e1b-en-d-train-transfer-expr','en','en-c-153',NULL,'35e1b-en-d-train-transfer-t01','train','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-train-transfer-vl91','35e1b-en-d-train-transfer-expr','en','en-c-385',NULL,'35e1b-en-d-train-transfer-t01','airport','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-group-work-vl92','35e1b-en-d-group-work-expr','en','en-c-3172',NULL,'35e1b-en-d-group-work-t02','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-group-work-vl93','35e1b-en-d-group-work-expr','en','en-c-1113',NULL,'35e1b-en-d-group-work-t03','example','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-group-work-vl94','35e1b-en-d-group-work-expr','en','en-c-293',NULL,'35e1b-en-d-group-work-t04','check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-group-disagree-vl95','35e1b-en-d-group-disagree-expr','en','en-c-445',NULL,'35e1b-en-d-group-disagree-t01','focus','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-group-disagree-vl96','35e1b-en-d-group-disagree-expr','en','en-c-297',NULL,'35e1b-en-d-group-disagree-t02','explain','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-group-disagree-vl97','35e1b-en-d-group-disagree-expr','en','en-c-713',NULL,'35e1b-en-d-group-disagree-t05','reasonable','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-repair-heating-vl98','35e1b-en-d-repair-heating-expr','en','en-c-065',NULL,'35e1b-en-d-repair-heating-t03','room','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-repair-heating-vl99','35e1b-en-d-repair-heating-expr','en','en-c-213',NULL,'35e1b-en-d-repair-heating-t03','cold','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-repair-heating-vl100','35e1b-en-d-repair-heating-expr','en','en-tomorrow',NULL,'35e1b-en-d-repair-heating-t04','tomorrow','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-repair-leak-vl101','35e1b-en-d-repair-leak-expr','en','en-c-001',NULL,'35e1b-en-d-repair-leak-t01','water','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-repair-leak-vl102','35e1b-en-d-repair-leak-expr','en','en-c-233',NULL,'35e1b-en-d-repair-leak-t04','good','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-repair-leak-vl103','35e1b-en-d-repair-leak-expr','en','en-c-3172',NULL,'35e1b-en-d-repair-leak-t05','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-medical-symptoms-vl104','35e1b-en-d-medical-symptoms-expr','en','en-c-133',NULL,'35e1b-en-d-medical-symptoms-t02','night','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-medical-symptoms-vl105','35e1b-en-d-medical-symptoms-expr','en','en-c-3182',NULL,'35e1b-en-d-medical-symptoms-t06','okay','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-pharmacy-medicine-vl106','35e1b-en-d-pharmacy-medicine-expr','en','en-c-141',NULL,'35e1b-en-d-pharmacy-medicine-t02','day','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-pharmacy-medicine-vl107','35e1b-en-d-pharmacy-medicine-expr','en','en-c-293',NULL,'35e1b-en-d-pharmacy-medicine-t04','check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-pharmacy-medicine-vl108','35e1b-en-d-pharmacy-medicine-expr','en','en-c-1378',NULL,'35e1b-en-d-pharmacy-medicine-t04','name','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-invitation-decline-vl109','35e1b-en-d-invitation-decline-expr','en','en-c-057',NULL,'35e1b-en-d-invitation-decline-t01','dinner','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-invitation-decline-vl110','35e1b-en-d-invitation-decline-expr','en','en-c-369',NULL,'35e1b-en-d-invitation-decline-t03','weekend','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-invitation-decline-vl111','35e1b-en-d-invitation-decline-expr','en','en-c-117',NULL,'35e1b-en-d-invitation-decline-t04','work','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-invitation-condition-vl112','35e1b-en-d-invitation-condition-expr','en','en-c-137',NULL,'35e1b-en-d-invitation-condition-t02','time','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-invitation-condition-vl113','35e1b-en-d-invitation-condition-expr','en','en-c-301',NULL,'35e1b-en-d-invitation-condition-t04','finish','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-invitation-condition-vl114','35e1b-en-d-invitation-condition-expr','en','en-c-117',NULL,'35e1b-en-d-invitation-condition-t04','work','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-misunderstanding-time-vl115','35e1b-en-d-misunderstanding-time-expr','en','en-c-125',NULL,'35e1b-en-d-misunderstanding-time-t02','yesterday','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-misunderstanding-time-vl116','35e1b-en-d-misunderstanding-time-expr','en','en-c-3180',NULL,'35e1b-en-d-misunderstanding-time-t04','no worries','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-misunderstanding-time-vl117','35e1b-en-d-misunderstanding-time-expr','en','en-c-065',NULL,'35e1b-en-d-misunderstanding-time-t05','room','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-misunderstanding-tone-vl118','35e1b-en-d-misunderstanding-tone-expr','en','en-c-117',NULL,'35e1b-en-d-misunderstanding-tone-t02','work','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-misunderstanding-tone-vl119','35e1b-en-d-misunderstanding-tone-expr','en','en-c-3176',NULL,'35e1b-en-d-misunderstanding-tone-t03','thanks','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-misunderstanding-tone-vl120','35e1b-en-d-misunderstanding-tone-expr','en','en-c-1021',NULL,'35e1b-en-d-misunderstanding-tone-t05','talk','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-en-d-hotel-room-vl121','35e1b-en-d-hotel-room-expr','en','en-c-065',NULL,'35e1b-en-d-hotel-room-t01','room','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-hotel-room-vl122','35e1b-en-d-hotel-room-expr','en','en-c-133',NULL,'35e1b-en-d-hotel-room-t01','night','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-hotel-room-vl123','35e1b-en-d-hotel-room-expr','en','en-c-3172',NULL,'35e1b-en-d-hotel-room-t03','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-hotel-booking-vl124','35e1b-en-d-hotel-booking-expr','en','en-yet',NULL,'35e1b-en-d-hotel-booking-t02','yet','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-hotel-booking-vl125','35e1b-en-d-hotel-booking-expr','en','en-c-1378',NULL,'35e1b-en-d-hotel-booking-t02','name','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-hotel-booking-vl126','35e1b-en-d-hotel-booking-expr','en','en-c-309',NULL,'35e1b-en-d-hotel-booking-t03','try','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-taxi-destination-vl127','35e1b-en-d-taxi-destination-expr','en','en-c-3172',NULL,'35e1b-en-d-taxi-destination-t02','do','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-taxi-destination-vl128','35e1b-en-d-taxi-destination-expr','en','en-c-969',NULL,'35e1b-en-d-taxi-destination-t05','card','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-order-unavailable-vl129','35e1b-en-d-order-unavailable-expr','en','en-c-045',NULL,'35e1b-en-d-order-unavailable-t01','fish','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-order-unavailable-vl130','35e1b-en-d-order-unavailable-expr','en','en-c-037',NULL,'35e1b-en-d-order-unavailable-t04','vegetable','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-order-unavailable-vl131','35e1b-en-d-order-unavailable-expr','en','en-c-309',NULL,'35e1b-en-d-order-unavailable-t05','try','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-dietary-clarify-vl132','35e1b-en-d-dietary-clarify-expr','en','en-c-037',NULL,'35e1b-en-d-dietary-clarify-t01','vegetable','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-dietary-clarify-vl133','35e1b-en-d-dietary-clarify-expr','en','en-c-041',NULL,'35e1b-en-d-dietary-clarify-t02','meat','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-dietary-clarify-vl134','35e1b-en-d-dietary-clarify-expr','en','en-c-293',NULL,'35e1b-en-d-dietary-clarify-t04','check','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-school-deadline-vl135','35e1b-en-d-school-deadline-expr','en','en-c-1530',NULL,'35e1b-en-d-school-deadline-t01','deadline','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-school-deadline-vl136','35e1b-en-d-school-deadline-expr','en','en-c-301',NULL,'35e1b-en-d-school-deadline-t03','finish','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-school-deadline-vl137','35e1b-en-d-school-deadline-expr','en','en-c-2285',NULL,'35e1b-en-d-school-deadline-t05','help','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-work-clarification-vl138','35e1b-en-d-work-clarification-expr','en','en-c-121',NULL,'35e1b-en-d-work-clarification-t01','today','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-work-clarification-vl139','35e1b-en-d-work-clarification-expr','en','en-c-125',NULL,'35e1b-en-d-work-clarification-t03','yesterday','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-work-clarification-vl140','35e1b-en-d-work-clarification-expr','en','en-leave',NULL,'35e1b-en-d-work-clarification-t04','leave','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-neighbour-noise-vl141','35e1b-en-d-neighbour-noise-expr','en','en-c-421',NULL,'35e1b-en-d-neighbour-noise-t01','music','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-neighbour-noise-vl142','35e1b-en-d-neighbour-noise-expr','en','en-c-477',NULL,'35e1b-en-d-neighbour-noise-t02','realize','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-neighbour-noise-vl143','35e1b-en-d-neighbour-noise-expr','en','en-c-3176',NULL,'35e1b-en-d-neighbour-noise-t05','thanks','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-wrong-delivery-vl144','35e1b-en-d-wrong-delivery-expr','en','en-c-401',NULL,'35e1b-en-d-wrong-delivery-t01','order','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-wrong-delivery-vl145','35e1b-en-d-wrong-delivery-expr','en','en-c-437',NULL,'35e1b-en-d-wrong-delivery-t03','jacket','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-wrong-delivery-vl146','35e1b-en-d-wrong-delivery-expr','en','en-c-121',NULL,'35e1b-en-d-wrong-delivery-t04','today','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-opinion-disagree-vl147','35e1b-en-d-opinion-disagree-expr','en','en-c-489',NULL,'35e1b-en-d-opinion-disagree-t02','agree','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-opinion-disagree-vl148','35e1b-en-d-opinion-disagree-expr','en','en-c-313',NULL,'35e1b-en-d-opinion-disagree-t02','need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-opinion-disagree-vl149','35e1b-en-d-opinion-disagree-expr','en','en-c-117',NULL,'35e1b-en-d-opinion-disagree-t02','work','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-lost-reservation-vl150','35e1b-en-d-lost-reservation-expr','en','en-c-1378',NULL,'35e1b-en-d-lost-reservation-t02','name','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-lost-reservation-vl151','35e1b-en-d-lost-reservation-expr','en','en-tomorrow',NULL,'35e1b-en-d-lost-reservation-t04','tomorrow','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-lost-reservation-vl152','35e1b-en-d-lost-reservation-expr','en','en-c-313',NULL,'35e1b-en-d-lost-reservation-t05','need','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-en-d-flight-delay-vl153','35e1b-en-d-flight-delay-expr','en','en-c-985',NULL,'35e1b-en-d-flight-delay-t01','miss','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-en-d-flight-delay-vl154','35e1b-en-d-flight-delay-expr','en','en-c-961',NULL,'35e1b-en-d-flight-delay-t05','move','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-en-d-flight-delay-vl155','35e1b-en-d-flight-delay-expr','en','en-c-225',NULL,'35e1b-en-d-flight-delay-t06','new','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-x-clarify-understand-vl156','35e1b-ja-x-clarify-understand-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-follow-what-next-vl157','35e1b-ja-x-follow-what-next-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-follow-when-hear-vl158','35e1b-ja-x-follow-when-hear-expr','ja','ja-c-1063',NULL,NULL,'返事','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-follow-who-contact-vl159','35e1b-ja-x-follow-who-contact-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-follow-check-later-vl160','35e1b-ja-x-follow-check-later-expr','ja','ja-c-123',NULL,NULL,'今日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-ja-x-follow-check-later-vl161','35e1b-ja-x-follow-check-later-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-follow-check-later-vl162','35e1b-ja-x-follow-check-later-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-x-confirm-understood-vl163','35e1b-ja-x-confirm-understood-expr','ja','ja-c-299',NULL,NULL,'説明','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-understood-vl164','35e1b-ja-x-confirm-understood-expr','ja','ja-c-3187',NULL,NULL,'ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-confirm-plan-vl165','35e1b-ja-x-confirm-plan-expr','ja','ja-c-195',NULL,NULL,'会う','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-plan-vl166','35e1b-ja-x-confirm-plan-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-confirm-booked-vl167','35e1b-ja-x-confirm-booked-expr','ja','ja-c-463',NULL,NULL,'予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-booked-vl168','35e1b-ja-x-confirm-booked-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-confirm-email-vl169','35e1b-ja-x-confirm-email-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-repeat-order-vl170','35e1b-ja-x-confirm-repeat-order-expr','ja','ja-c-403',NULL,NULL,'注文','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-repeat-order-vl171','35e1b-ja-x-confirm-repeat-order-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-confirm-works-vl172','35e1b-ja-x-confirm-works-expr','ja','ja-c-139',NULL,NULL,'時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-works-vl173','35e1b-ja-x-confirm-works-expr','ja','ja-daijoubu',NULL,NULL,'大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-confirm-double-check-vl174','35e1b-ja-x-confirm-double-check-expr','ja','ja-c-3189',NULL,NULL,'する','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-confirm-double-check-vl175','35e1b-ja-x-confirm-double-check-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-refuse-not-today-vl176','35e1b-ja-x-refuse-not-today-expr','ja','ja-c-123',NULL,NULL,'今日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-refuse-not-today-vl177','35e1b-ja-x-refuse-not-today-expr','ja','ja-c-335',NULL,NULL,'難しい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-alternative-tomorrow-vl178','35e1b-ja-x-alternative-tomorrow-expr','ja','ja-ashita',NULL,NULL,'明日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-alternative-route-vl179','35e1b-ja-x-alternative-route-expr','ja','ja-c-3191',NULL,NULL,'行き方','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-alternative-route-vl180','35e1b-ja-x-alternative-route-expr','ja','ja-c-139',NULL,NULL,'時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-alternative-repair-vl181','35e1b-ja-x-alternative-repair-expr','ja','ja-c-123',NULL,NULL,'今日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-repair-name-vl182','35e1b-ja-x-repair-name-expr','ja','ja-c-1384',NULL,NULL,'名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-repair-order-vl183','35e1b-ja-x-repair-order-expr','ja','ja-c-403',NULL,NULL,'注文','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-food-allergy-vl184','35e1b-ja-x-food-allergy-expr','ja','ja-c-919',NULL,NULL,'ピーナッツ','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-make-vl185','35e1b-ja-x-appt-make-expr','ja','ja-c-463',NULL,NULL,'予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-available-vl186','35e1b-ja-x-appt-available-expr','ja','ja-c-139',NULL,NULL,'時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-reschedule-vl187','35e1b-ja-x-appt-reschedule-expr','ja','ja-c-463',NULL,NULL,'予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-cancel-vl188','35e1b-ja-x-appt-cancel-expr','ja','ja-c-463',NULL,NULL,'予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-cancel-vl189','35e1b-ja-x-appt-cancel-expr','ja','ja-c-091',NULL,NULL,'電話','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-appt-earlier-vl190','35e1b-ja-x-appt-earlier-expr','ja','ja-c-139',NULL,NULL,'時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-name-vl191','35e1b-ja-x-appt-name-expr','ja','ja-c-1384',NULL,NULL,'名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-arrive-vl192','35e1b-ja-x-appt-arrive-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-appt-confirm-day-vl193','35e1b-ja-x-appt-confirm-day-expr','ja','ja-c-295',NULL,NULL,'確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-return-wrong-size-vl194','35e1b-ja-x-return-wrong-size-expr','ja','ja-c-395',NULL,NULL,'サイズ','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-return-receipt-vl195','35e1b-ja-x-return-receipt-expr','ja','ja-c-1761',NULL,NULL,'レシート','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-return-receipt-vl196','35e1b-ja-x-return-receipt-expr','ja','ja-c-315',NULL,NULL,'必要','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-return-refund-card-vl197','35e1b-ja-x-return-refund-card-expr','ja','ja-c-971',NULL,NULL,'カード','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-return-original-vl198','35e1b-ja-x-return-original-expr','ja','ja-mada',NULL,NULL,'まだ','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-direction-get-station-vl199','35e1b-ja-x-direction-get-station-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-direction-stop-vl200','35e1b-ja-x-direction-stop-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-ja-x-direction-transfer-vl201','35e1b-ja-x-direction-transfer-expr','ja','ja-c-315',NULL,NULL,'必要','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-direction-delay-vl202','35e1b-ja-x-direction-delay-expr','ja','ja-c-155',NULL,NULL,'電車','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-direction-delay-vl203','35e1b-ja-x-direction-delay-expr','ja','ja-c-139',NULL,NULL,'時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-medical-symptom-vl204','35e1b-ja-x-medical-symptom-expr','ja','ja-c-127',NULL,NULL,'昨日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-hotel-quiet-room-vl205','35e1b-ja-x-hotel-quiet-room-expr','ja','ja-c-327',NULL,NULL,'静か','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-hotel-quiet-room-vl206','35e1b-ja-x-hotel-quiet-room-expr','ja','ja-c-067',NULL,NULL,'部屋','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-home-tachiai-vl207','35e1b-ja-x-home-tachiai-expr','ja','ja-c-471',NULL,NULL,'修理','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-x-home-tachiai-vl208','35e1b-ja-x-home-tachiai-expr','ja','ja-c-315',NULL,NULL,'必要','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-x-medical-kusuri-vl209','35e1b-ja-x-medical-kusuri-expr','ja','ja-c-235',NULL,NULL,'いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-restaurant-allergy-vl210','35e1b-ja-d-restaurant-allergy-expr','ja','ja-c-403',NULL,'35e1b-ja-d-restaurant-allergy-t01','注文','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-restaurant-allergy-vl211','35e1b-ja-d-restaurant-allergy-expr','ja','ja-c-919',NULL,'35e1b-ja-d-restaurant-allergy-t02','ピーナッツ','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-restaurant-allergy-vl212','35e1b-ja-d-restaurant-allergy-expr','ja','ja-c-3187',NULL,'35e1b-ja-d-restaurant-allergy-t06','ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-restaurant-bill-vl213','35e1b-ja-d-restaurant-bill-expr','ja','ja-c-403',NULL,'35e1b-ja-d-restaurant-bill-t03','注文','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-restaurant-bill-vl214','35e1b-ja-d-restaurant-bill-expr','ja','ja-c-539',NULL,'35e1b-ja-d-restaurant-bill-t04','間違い','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-appointment-reschedule-vl215','35e1b-ja-d-appointment-reschedule-expr','ja','ja-c-463',NULL,'35e1b-ja-d-appointment-reschedule-t01','予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-appointment-reschedule-vl216','35e1b-ja-d-appointment-reschedule-expr','ja','ja-c-1384',NULL,'35e1b-ja-d-appointment-reschedule-t03','名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-appointment-cancel-vl217','35e1b-ja-d-appointment-cancel-expr','ja','ja-ashita',NULL,'35e1b-ja-d-appointment-cancel-t01','明日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-appointment-cancel-vl218','35e1b-ja-d-appointment-cancel-expr','ja','ja-c-463',NULL,'35e1b-ja-d-appointment-cancel-t01','予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-appointment-cancel-vl219','35e1b-ja-d-appointment-cancel-expr','ja','ja-c-1384',NULL,'35e1b-ja-d-appointment-cancel-t02','名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-help-alternative-vl220','35e1b-ja-d-help-alternative-expr','ja','ja-ashita',NULL,'35e1b-ja-d-help-alternative-t02','明日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-help-alternative-vl221','35e1b-ja-d-help-alternative-expr','ja','ja-c-379',NULL,'35e1b-ja-d-help-alternative-t04','授業','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-help-alternative-vl222','35e1b-ja-d-help-alternative-expr','ja','ja-daijoubu',NULL,'35e1b-ja-d-help-alternative-t05','大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-return-exchange-vl223','35e1b-ja-d-return-exchange-expr','ja','ja-c-235',NULL,'35e1b-ja-d-return-exchange-t03','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-return-exchange-vl224','35e1b-ja-d-return-exchange-expr','ja','ja-c-223',NULL,'35e1b-ja-d-return-exchange-t03','小さい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-return-exchange-vl225','35e1b-ja-d-return-exchange-expr','ja','ja-c-1761',NULL,'35e1b-ja-d-return-exchange-t04','レシート','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-return-defect-vl226','35e1b-ja-d-return-defect-expr','ja','ja-c-1761',NULL,'35e1b-ja-d-return-defect-t02','レシート','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-return-defect-vl227','35e1b-ja-d-return-defect-expr','ja','ja-c-971',NULL,'35e1b-ja-d-return-defect-t04','カード','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-directions-repair-vl228','35e1b-ja-d-directions-repair-expr','ja','ja-c-235',NULL,'35e1b-ja-d-directions-repair-t01','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-directions-repair-vl229','35e1b-ja-d-directions-repair-expr','ja','ja-c-155',NULL,'35e1b-ja-d-directions-repair-t03','電車','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-train-transfer-vl230','35e1b-ja-d-train-transfer-expr','ja','ja-c-387',NULL,'35e1b-ja-d-train-transfer-t01','空港','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-train-transfer-vl231','35e1b-ja-d-train-transfer-expr','ja','ja-iku',NULL,'35e1b-ja-d-train-transfer-t01','行く','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-train-transfer-vl232','35e1b-ja-d-train-transfer-expr','ja','ja-c-155',NULL,'35e1b-ja-d-train-transfer-t01','電車','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-group-work-vl233','35e1b-ja-d-group-work-expr','ja','ja-c-3189',NULL,'35e1b-ja-d-group-work-t02','する','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-group-work-vl234','35e1b-ja-d-group-work-expr','ja','ja-c-235',NULL,'35e1b-ja-d-group-work-t04','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-group-work-vl235','35e1b-ja-d-group-work-expr','ja','ja-c-1091',NULL,'35e1b-ja-d-group-work-t04','数字','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-group-disagree-vl236','35e1b-ja-d-group-disagree-expr','ja','ja-c-535',NULL,'35e1b-ja-d-group-disagree-t01','結果','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-group-disagree-vl237','35e1b-ja-d-group-disagree-expr','ja','ja-c-235',NULL,'35e1b-ja-d-group-disagree-t01','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-group-disagree-vl238','35e1b-ja-d-group-disagree-expr','ja','ja-c-531',NULL,'35e1b-ja-d-group-disagree-t02','理由','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-repair-heating-vl239','35e1b-ja-d-repair-heating-expr','ja','ja-c-067',NULL,'35e1b-ja-d-repair-heating-t01','部屋','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-repair-heating-vl240','35e1b-ja-d-repair-heating-expr','ja','ja-ashita',NULL,'35e1b-ja-d-repair-heating-t04','明日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-ja-d-repair-heating-vl241','35e1b-ja-d-repair-heating-expr','ja','ja-c-471',NULL,'35e1b-ja-d-repair-heating-t04','修理','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-repair-leak-vl242','35e1b-ja-d-repair-leak-expr','ja','ja-c-3187',NULL,'35e1b-ja-d-repair-leak-t04','ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-repair-leak-vl243','35e1b-ja-d-repair-leak-expr','ja','ja-c-139',NULL,'35e1b-ja-d-repair-leak-t04','時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-repair-leak-vl244','35e1b-ja-d-repair-leak-expr','ja','ja-c-471',NULL,'35e1b-ja-d-repair-leak-t04','修理','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-medical-symptoms-vl245','35e1b-ja-d-medical-symptoms-expr','ja','ja-c-123',NULL,'35e1b-ja-d-medical-symptoms-t01','今日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-medical-symptoms-vl246','35e1b-ja-d-medical-symptoms-expr','ja','ja-c-235',NULL,'35e1b-ja-d-medical-symptoms-t04','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-medical-symptoms-vl247','35e1b-ja-d-medical-symptoms-expr','ja','ja-c-3187',NULL,'35e1b-ja-d-medical-symptoms-t06','ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-pharmacy-medicine-vl248','35e1b-ja-d-pharmacy-medicine-expr','ja','ja-daijoubu',NULL,'35e1b-ja-d-pharmacy-medicine-t03','大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-pharmacy-medicine-vl249','35e1b-ja-d-pharmacy-medicine-expr','ja','ja-c-295',NULL,'35e1b-ja-d-pharmacy-medicine-t04','確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-pharmacy-medicine-vl250','35e1b-ja-d-pharmacy-medicine-expr','ja','ja-c-1384',NULL,'35e1b-ja-d-pharmacy-medicine-t04','名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-invitation-decline-vl251','35e1b-ja-d-invitation-decline-expr','ja','ja-yotei',NULL,'35e1b-ja-d-invitation-decline-t02','予定','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-invitation-decline-vl252','35e1b-ja-d-invitation-decline-expr','ja','ja-c-371',NULL,'35e1b-ja-d-invitation-decline-t03','週末','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-invitation-decline-vl253','35e1b-ja-d-invitation-decline-expr','ja','ja-daijoubu',NULL,'35e1b-ja-d-invitation-decline-t04','大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-invitation-condition-vl254','35e1b-ja-d-invitation-condition-expr','ja','ja-c-3189',NULL,'35e1b-ja-d-invitation-condition-t01','する','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-invitation-condition-vl255','35e1b-ja-d-invitation-condition-expr','ja','ja-c-119',NULL,'35e1b-ja-d-invitation-condition-t04','仕事','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-invitation-condition-vl256','35e1b-ja-d-invitation-condition-expr','ja','ja-daijoubu',NULL,'35e1b-ja-d-invitation-condition-t05','大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-misunderstanding-time-vl257','35e1b-ja-d-misunderstanding-time-expr','ja','ja-c-127',NULL,'35e1b-ja-d-misunderstanding-time-t02','昨日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-misunderstanding-time-vl258','35e1b-ja-d-misunderstanding-time-expr','ja','ja-daijoubu',NULL,'35e1b-ja-d-misunderstanding-time-t04','大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-misunderstanding-time-vl259','35e1b-ja-d-misunderstanding-time-expr','ja','ja-c-295',NULL,'35e1b-ja-d-misunderstanding-time-t05','確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-misunderstanding-tone-vl260','35e1b-ja-d-misunderstanding-tone-expr','ja','ja-c-119',NULL,'35e1b-ja-d-misunderstanding-tone-t02','仕事','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-misunderstanding-tone-vl261','35e1b-ja-d-misunderstanding-tone-expr','ja','ja-c-295',NULL,'35e1b-ja-d-misunderstanding-tone-t02','確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-misunderstanding-tone-vl262','35e1b-ja-d-misunderstanding-tone-expr','ja','ja-c-299',NULL,'35e1b-ja-d-misunderstanding-tone-t03','説明','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-hotel-room-vl263','35e1b-ja-d-hotel-room-expr','ja','ja-c-067',NULL,'35e1b-ja-d-hotel-room-t01','部屋','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-hotel-room-vl264','35e1b-ja-d-hotel-room-expr','ja','ja-c-327',NULL,'35e1b-ja-d-hotel-room-t03','静か','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-hotel-room-vl265','35e1b-ja-d-hotel-room-expr','ja','ja-daijoubu',NULL,'35e1b-ja-d-hotel-room-t05','大丈夫','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-hotel-booking-vl266','35e1b-ja-d-hotel-booking-expr','ja','ja-c-1384',NULL,'35e1b-ja-d-hotel-booking-t01','名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-hotel-booking-vl267','35e1b-ja-d-hotel-booking-expr','ja','ja-c-463',NULL,'35e1b-ja-d-hotel-booking-t01','予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-hotel-booking-vl268','35e1b-ja-d-hotel-booking-expr','ja','ja-mada',NULL,'35e1b-ja-d-hotel-booking-t02','まだ','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-taxi-destination-vl269','35e1b-ja-d-taxi-destination-expr','ja','ja-c-971',NULL,'35e1b-ja-d-taxi-destination-t05','カード','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-bus-wrong-stop-vl270','35e1b-ja-d-bus-wrong-stop-expr','ja','ja-c-323',NULL,'35e1b-ja-d-bus-wrong-stop-t01','近く','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-bus-wrong-stop-vl271','35e1b-ja-d-bus-wrong-stop-expr','ja','ja-c-235',NULL,'35e1b-ja-d-bus-wrong-stop-t02','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-order-unavailable-vl272','35e1b-ja-d-order-unavailable-expr','ja','ja-c-243',NULL,'35e1b-ja-d-order-unavailable-t04','料理','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-order-unavailable-vl273','35e1b-ja-d-order-unavailable-expr','ja','ja-c-039',NULL,'35e1b-ja-d-order-unavailable-t04','野菜','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-dietary-clarify-vl274','35e1b-ja-d-dietary-clarify-expr','ja','ja-c-039',NULL,'35e1b-ja-d-dietary-clarify-t01','野菜','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-dietary-clarify-vl275','35e1b-ja-d-dietary-clarify-expr','ja','ja-c-295',NULL,'35e1b-ja-d-dietary-clarify-t04','確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-dietary-clarify-vl276','35e1b-ja-d-dietary-clarify-expr','ja','ja-c-3187',NULL,'35e1b-ja-d-dietary-clarify-t05','ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-school-deadline-vl277','35e1b-ja-d-school-deadline-expr','ja','ja-c-1536',NULL,'35e1b-ja-d-school-deadline-t01','締め切り','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-school-deadline-vl278','35e1b-ja-d-school-deadline-expr','ja','ja-c-235',NULL,'35e1b-ja-d-school-deadline-t01','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-school-deadline-vl279','35e1b-ja-d-school-deadline-expr','ja','ja-c-335',NULL,'35e1b-ja-d-school-deadline-t04','難しい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-work-clarification-vl280','35e1b-ja-d-work-clarification-expr','ja','ja-c-123',NULL,'35e1b-ja-d-work-clarification-t01','今日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1');

INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order) VALUES
('35e1b-ja-d-work-clarification-vl281','35e1b-ja-d-work-clarification-expr','ja','ja-c-235',NULL,'35e1b-ja-d-work-clarification-t02','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-work-clarification-vl282','35e1b-ja-d-work-clarification-expr','ja','ja-c-127',NULL,'35e1b-ja-d-work-clarification-t03','昨日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-neighbour-noise-vl283','35e1b-ja-d-neighbour-noise-expr','ja','ja-c-423',NULL,'35e1b-ja-d-neighbour-noise-t01','音楽','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-neighbour-noise-vl284','35e1b-ja-d-neighbour-noise-expr','ja','ja-c-219',NULL,'35e1b-ja-d-neighbour-noise-t02','大きい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-neighbour-noise-vl285','35e1b-ja-d-neighbour-noise-expr','ja','ja-c-3187',NULL,'35e1b-ja-d-neighbour-noise-t05','ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-wrong-delivery-vl286','35e1b-ja-d-wrong-delivery-expr','ja','ja-c-403',NULL,'35e1b-ja-d-wrong-delivery-t01','注文','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-wrong-delivery-vl287','35e1b-ja-d-wrong-delivery-expr','ja','ja-c-315',NULL,'35e1b-ja-d-wrong-delivery-t05','必要','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-wrong-delivery-vl288','35e1b-ja-d-wrong-delivery-expr','ja','ja-c-235',NULL,'35e1b-ja-d-wrong-delivery-t06','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-opinion-disagree-vl289','35e1b-ja-d-opinion-disagree-expr','ja','ja-c-235',NULL,'35e1b-ja-d-opinion-disagree-t01','いい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-opinion-disagree-vl290','35e1b-ja-d-opinion-disagree-expr','ja','ja-c-551',NULL,'35e1b-ja-d-opinion-disagree-t02','意見','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-opinion-disagree-vl291','35e1b-ja-d-opinion-disagree-expr','ja','ja-c-315',NULL,'35e1b-ja-d-opinion-disagree-t02','必要','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-lost-reservation-vl292','35e1b-ja-d-lost-reservation-expr','ja','ja-c-463',NULL,'35e1b-ja-d-lost-reservation-t01','予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-lost-reservation-vl293','35e1b-ja-d-lost-reservation-expr','ja','ja-c-1384',NULL,'35e1b-ja-d-lost-reservation-t02','名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-lost-reservation-vl294','35e1b-ja-d-lost-reservation-expr','ja','ja-c-295',NULL,'35e1b-ja-d-lost-reservation-t03','確認','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-flight-delay-vl295','35e1b-ja-d-flight-delay-expr','ja','ja-c-963',NULL,'35e1b-ja-d-flight-delay-t05','変更','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-flight-delay-vl296','35e1b-ja-d-flight-delay-expr','ja','ja-c-463',NULL,'35e1b-ja-d-flight-delay-t06','予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-flight-delay-vl297','35e1b-ja-d-flight-delay-expr','ja','ja-c-227',NULL,'35e1b-ja-d-flight-delay-t06','新しい','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-clinic-reception-vl298','35e1b-ja-d-clinic-reception-expr','ja','ja-c-463',NULL,'35e1b-ja-d-clinic-reception-t01','予約','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-clinic-reception-vl299','35e1b-ja-d-clinic-reception-expr','ja','ja-c-331',NULL,'35e1b-ja-d-clinic-reception-t02','簡単','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-clinic-reception-vl300','35e1b-ja-d-clinic-reception-expr','ja','ja-c-127',NULL,'35e1b-ja-d-clinic-reception-t03','昨日','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3'),
('35e1b-ja-d-delivery-time-vl301','35e1b-ja-d-delivery-time-expr','ja','ja-c-139',NULL,'35e1b-ja-d-delivery-time-t01','時間','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-delivery-time-vl302','35e1b-ja-d-delivery-time-expr','ja','ja-c-3187',NULL,'35e1b-ja-d-delivery-time-t02','ありがとう','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-lost-property-vl303','35e1b-ja-d-lost-property-expr','ja','ja-c-155',NULL,'35e1b-ja-d-lost-property-t01','電車','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','1'),
('35e1b-ja-d-lost-property-vl304','35e1b-ja-d-lost-property-expr','ja','ja-c-387',NULL,'35e1b-ja-d-lost-property-t03','空港','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','2'),
('35e1b-ja-d-lost-property-vl305','35e1b-ja-d-lost-property-expr','ja','ja-c-1384',NULL,'35e1b-ja-d-lost-property-t05','名前','1','1','0','复用当前或更低 Stage 的现有 canonical vocabulary。','3');

INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order) VALUES
('35e1b-en-x-clarify-mean-gl1','35e1b-en-x-clarify-mean-expr','en','en-wh-question',NULL,'What do you mean by that?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-specific-gl1','35e1b-en-x-clarify-specific-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-say-again-gl1','35e1b-en-x-clarify-say-again-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-slower-gl1','35e1b-en-x-clarify-slower-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-spell-gl1','35e1b-en-x-clarify-spell-expr','en','en-wh-question',NULL,'How do you spell that?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-confirm-heard-gl1','35e1b-en-x-clarify-confirm-heard-expr','en','en-simple-past',NULL,'Did','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-refer-gl1','35e1b-en-x-clarify-refer-expr','en','en-wh-question',NULL,'Which one are you referring to?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-example-gl1','35e1b-en-x-clarify-example-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-in-other-words-gl1','35e1b-en-x-clarify-in-other-words-expr','en','en-simple-present',NULL,'need','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-clarify-correct-me-gl1','35e1b-en-x-clarify-correct-me-expr','en','en-be-adjective',NULL,'’m wrong','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-what-next-gl1','35e1b-en-x-follow-what-next-expr','en','en-wh-question',NULL,'What should we do next?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-anything-else-gl1','35e1b-en-x-follow-anything-else-expr','en','en-simple-present',NULL,'need','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-how-long-gl1','35e1b-en-x-follow-how-long-expr','en','en-will',NULL,'will','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-when-hear-gl1','35e1b-en-x-follow-when-hear-expr','en','en-wh-question',NULL,'When can I expect to hear back?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-what-happened-gl1','35e1b-en-x-follow-what-happened-expr','en','en-wh-question',NULL,'What happened after that?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-how-go-gl1','35e1b-en-x-follow-how-go-expr','en','en-wh-question',NULL,'How did it go?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-need-bring-gl1','35e1b-en-x-follow-need-bring-expr','en','en-do-question',NULL,'Do I','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-who-contact-gl1','35e1b-en-x-follow-who-contact-expr','en','en-wh-question',NULL,'Who should I contact about this?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-follow-other-options-gl1','35e1b-en-x-follow-other-options-expr','en','en-wh-question',NULL,'What other options do I have?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-confirm-booked-gl1','35e1b-en-x-confirm-booked-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-confirm-email-gl1','35e1b-en-x-confirm-email-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-confirm-if-changes-gl1','35e1b-en-x-confirm-if-changes-expr','en','en-simple-present',NULL,'know','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-confirm-works-gl1','35e1b-en-x-confirm-works-expr','en','en-simple-present',NULL,'works','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-confirm-agreed-gl1','35e1b-en-x-confirm-agreed-expr','en','en-simple-present',NULL,'have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-confirm-double-check-gl1','35e1b-en-x-confirm-double-check-expr','en','en-simple-present',NULL,'leave','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-refuse-sorry-cant-gl1','35e1b-en-x-refuse-sorry-cant-expr','en','en-be-adjective',NULL,'’m sorry','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-refuse-not-today-gl1','35e1b-en-x-refuse-not-today-expr','en','en-can-ability',NULL,'I can','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-refuse-not-comfortable-gl1','35e1b-en-x-refuse-not-comfortable-expr','en','en-be-adjective',NULL,'’m not comfortable','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-alternative-tomorrow-gl1','35e1b-en-x-alternative-tomorrow-expr','en','en-wh-question',NULL,'How about tomorrow instead?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-alternative-store-credit-gl1','35e1b-en-x-alternative-store-credit-expr','en','en-can-ability',NULL,'We can','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-alternative-split-work-gl1','35e1b-en-x-alternative-split-work-expr','en','en-wh-question',NULL,'Why don’t we split the work?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-alternative-call-gl1','35e1b-en-x-alternative-call-expr','en','en-can-ability',NULL,'I can','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-alternative-route-gl1','35e1b-en-x-alternative-route-expr','en','en-simple-present',NULL,'takes','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-alternative-repair-gl1','35e1b-en-x-alternative-repair-expr','en','en-could-request',NULL,'could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-repair-wrong-word-gl1','35e1b-en-x-repair-wrong-word-expr','en','en-simple-past',NULL,'meant','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-repair-start-again-gl1','35e1b-en-x-repair-start-again-expr','en','en-simple-present',NULL,'start','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-repair-correction-gl1','35e1b-en-x-repair-correction-expr','en','en-simple-past',NULL,'meant','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-repair-misunderstanding-gl1','35e1b-en-x-repair-misunderstanding-expr','en','en-simple-present',NULL,'think','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-repair-tone-gl1','35e1b-en-x-repair-tone-expr','en','en-simple-past',NULL,'came','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-repair-order-gl1','35e1b-en-x-repair-order-expr','en','en-simple-past',NULL,'ordered','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1');

INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order) VALUES
('35e1b-en-x-repair-which-bus-gl1','35e1b-en-x-repair-which-bus-expr','en','en-simple-past',NULL,'meant','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-ready-order-gl1','35e1b-en-x-food-ready-order-expr','en','en-be-adjective',NULL,'’re ready','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-recommend-gl1','35e1b-en-x-food-recommend-expr','en','en-wh-question',NULL,'What would you recommend?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-allergy-gl1','35e1b-en-x-food-allergy-expr','en','en-be-adjective',NULL,'’m allergic','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-contain-gl1','35e1b-en-x-food-contain-expr','en','en-do-question',NULL,'Does this','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-without-gl1','35e1b-en-x-food-without-expr','en','en-simple-present',NULL,'have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-side-gl1','35e1b-en-x-food-side-expr','en','en-simple-present',NULL,'get','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-food-bill-gl1','35e1b-en-x-food-bill-expr','en','en-noun-please',NULL,'please','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-appt-make-gl1','35e1b-en-x-appt-make-expr','en','en-would-like',NULL,'I’d like','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-appt-available-gl1','35e1b-en-x-appt-available-expr','en','en-do-question',NULL,'Do you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-appt-reschedule-gl1','35e1b-en-x-appt-reschedule-expr','en','en-simple-present',NULL,'need','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-appt-arrive-gl1','35e1b-en-x-appt-arrive-expr','en','en-wh-question',NULL,'How early should I arrive?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-return-wrong-size-gl1','35e1b-en-x-return-wrong-size-expr','en','en-would-like',NULL,'I’d like','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-return-receipt-gl1','35e1b-en-x-return-receipt-expr','en','en-do-question',NULL,'Do you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-return-defective-gl1','35e1b-en-x-return-defective-expr','en','en-simple-past',NULL,'stopped','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-return-refund-card-gl1','35e1b-en-x-return-refund-card-expr','en','en-will',NULL,'Will','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-return-policy-gl1','35e1b-en-x-return-policy-expr','en','en-wh-question',NULL,'What is your return policy?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-direction-get-station-gl1','35e1b-en-x-direction-get-station-expr','en','en-wh-question',NULL,'How do I get to the station?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-direction-stop-gl1','35e1b-en-x-direction-stop-expr','en','en-wh-question',NULL,'Which stop should I get off at?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-direction-transfer-gl1','35e1b-en-x-direction-transfer-expr','en','en-do-question',NULL,'Do I','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-direction-platform-gl1','35e1b-en-x-direction-platform-expr','en','en-wh-question',NULL,'Which platform does it leave from?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-medical-symptom-gl1','35e1b-en-x-medical-symptom-expr','en','en-simple-past',NULL,'had','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-medical-worse-gl1','35e1b-en-x-medical-worse-expr','en','en-simple-present',NULL,'gets','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-hotel-quiet-room-gl1','35e1b-en-x-hotel-quiet-room-expr','en','en-simple-present',NULL,'have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-hotel-checkout-gl1','35e1b-en-x-hotel-checkout-expr','en','en-wh-question',NULL,'What time is check-out?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-x-direction-show-map-gl1','35e1b-en-x-direction-show-map-expr','en','en-could-request',NULL,'Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-restaurant-allergy-gl1','35e1b-en-d-restaurant-allergy-expr','en','en-simple-present','35e1b-en-d-restaurant-allergy-t02','contain','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-restaurant-bill-gl1','35e1b-en-d-restaurant-bill-expr','en','en-simple-present','35e1b-en-d-restaurant-bill-t01','have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-appointment-reschedule-gl1','35e1b-en-d-appointment-reschedule-expr','en','en-simple-present','35e1b-en-d-appointment-reschedule-t01','need','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-appointment-cancel-gl1','35e1b-en-d-appointment-cancel-expr','en','en-simple-present','35e1b-en-d-appointment-cancel-t02','have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-help-alternative-gl1','35e1b-en-d-help-alternative-expr','en','en-could-request','35e1b-en-d-help-alternative-t01','Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-return-exchange-gl1','35e1b-en-d-return-exchange-expr','en','en-would-like','35e1b-en-d-return-exchange-t01','I’d like','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-return-defect-gl1','35e1b-en-d-return-defect-expr','en','en-simple-past','35e1b-en-d-return-defect-t01','stopped','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-directions-repair-gl1','35e1b-en-d-directions-repair-expr','en','en-wh-question','35e1b-en-d-directions-repair-t01','how do I get to Central Station?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-train-transfer-gl1','35e1b-en-d-train-transfer-expr','en','en-simple-present','35e1b-en-d-train-transfer-t02','need','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-group-work-gl1','35e1b-en-d-group-work-expr','en','en-wh-question','35e1b-en-d-group-work-t01','How should we split the presentation?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-group-disagree-gl1','35e1b-en-d-group-disagree-expr','en','en-simple-present','35e1b-en-d-group-disagree-t01','think','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-repair-heating-gl1','35e1b-en-d-repair-heating-expr','en','en-be-adjective','35e1b-en-d-repair-heating-t02','’m sorry','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-repair-leak-gl1','35e1b-en-d-repair-leak-expr','en','en-do-question','35e1b-en-d-repair-leak-t05','Do I','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-medical-symptoms-gl1','35e1b-en-d-medical-symptoms-expr','en','en-wh-question','35e1b-en-d-medical-symptoms-t01','What seems to be the problem?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1');

INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order) VALUES
('35e1b-en-d-pharmacy-medicine-gl1','35e1b-en-d-pharmacy-medicine-expr','en','en-could-request','35e1b-en-d-pharmacy-medicine-t01','Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-invitation-decline-gl1','35e1b-en-d-invitation-decline-expr','en','en-simple-present','35e1b-en-d-invitation-decline-t01','have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-invitation-condition-gl1','35e1b-en-d-invitation-condition-expr','en','en-simple-present','35e1b-en-d-invitation-condition-t01','Want','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-misunderstanding-time-gl1','35e1b-en-d-misunderstanding-time-expr','en','en-simple-past','35e1b-en-d-misunderstanding-time-t01','thought','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-misunderstanding-tone-gl1','35e1b-en-d-misunderstanding-tone-expr','en','en-simple-past','35e1b-en-d-misunderstanding-tone-t01','sounded','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-hotel-room-gl1','35e1b-en-d-hotel-room-expr','en','en-be-adjective','35e1b-en-d-hotel-room-t02','’m sorry','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-hotel-booking-gl1','35e1b-en-d-hotel-booking-expr','en','en-simple-present','35e1b-en-d-hotel-booking-t01','have','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-taxi-destination-gl1','35e1b-en-d-taxi-destination-expr','en','en-could-request','35e1b-en-d-taxi-destination-t01','Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-bus-wrong-stop-gl1','35e1b-en-d-bus-wrong-stop-expr','en','en-do-question','35e1b-en-d-bus-wrong-stop-t01','Does this','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-order-unavailable-gl1','35e1b-en-d-order-unavailable-expr','en','en-would-like','35e1b-en-d-order-unavailable-t01','I’d like','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-dietary-clarify-gl1','35e1b-en-d-dietary-clarify-expr','en','en-simple-present','35e1b-en-d-dietary-clarify-t02','contain','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-school-deadline-gl1','35e1b-en-d-school-deadline-expr','en','en-wh-question','35e1b-en-d-school-deadline-t02','What’s the issue?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-work-clarification-gl1','35e1b-en-d-work-clarification-expr','en','en-could-request','35e1b-en-d-work-clarification-t01','Could you','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-neighbour-noise-gl1','35e1b-en-d-neighbour-noise-expr','en','en-be-adjective','35e1b-en-d-neighbour-noise-t01','’m sorry','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-wrong-delivery-gl1','35e1b-en-d-wrong-delivery-expr','en','en-simple-past','35e1b-en-d-wrong-delivery-t01','received','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-opinion-disagree-gl1','35e1b-en-d-opinion-disagree-expr','en','en-simple-present','35e1b-en-d-opinion-disagree-t01','think','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-lost-reservation-gl1','35e1b-en-d-lost-reservation-expr','en','en-since-for','35e1b-en-d-lost-reservation-t01','have a reservation for','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-en-d-flight-delay-gl1','35e1b-en-d-flight-delay-expr','en','en-wh-question','35e1b-en-d-flight-delay-t02','What is your final destination?','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-mean-gl1','35e1b-ja-x-clarify-mean-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-specific-gl1','35e1b-ja-x-clarify-specific-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-say-again-gl1','35e1b-ja-x-clarify-say-again-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-slower-gl1','35e1b-ja-x-clarify-slower-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-reading-gl1','35e1b-ja-x-clarify-reading-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-last-part-gl1','35e1b-ja-x-clarify-last-part-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-confirm-heard-gl1','35e1b-ja-x-clarify-confirm-heard-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-refer-gl1','35e1b-ja-x-clarify-refer-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-example-gl1','35e1b-ja-x-clarify-example-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-understand-gl1','35e1b-ja-x-clarify-understand-expr','ja','ja-te-kudasai',NULL,'てください','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-in-other-words-gl1','35e1b-ja-x-clarify-in-other-words-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-clarify-correct-me-gl1','35e1b-ja-x-clarify-correct-me-expr','ja','ja-te-kudasai',NULL,'てください','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-what-next-gl1','35e1b-ja-x-follow-what-next-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-anything-else-gl1','35e1b-ja-x-follow-anything-else-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-how-long-gl1','35e1b-ja-x-follow-how-long-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-when-hear-gl1','35e1b-ja-x-follow-when-hear-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-need-bring-gl1','35e1b-ja-x-follow-need-bring-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-who-contact-gl1','35e1b-ja-x-follow-who-contact-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-other-options-gl1','35e1b-ja-x-follow-other-options-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-follow-check-later-gl1','35e1b-ja-x-follow-check-later-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-right-gl1','35e1b-ja-x-confirm-right-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-understood-gl1','35e1b-ja-x-confirm-understood-expr','ja','ja-polite-past',NULL,'ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1');

INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order) VALUES
('35e1b-ja-x-confirm-plan-gl1','35e1b-ja-x-confirm-plan-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-booked-gl1','35e1b-ja-x-confirm-booked-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-email-gl1','35e1b-ja-x-confirm-email-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-repeat-order-gl1','35e1b-ja-x-confirm-repeat-order-expr','ja','ja-polite-present',NULL,'いたします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-if-changes-gl1','35e1b-ja-x-confirm-if-changes-expr','ja','ja-tara',NULL,'たら','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-works-gl1','35e1b-ja-x-confirm-works-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-agreed-gl1','35e1b-ja-x-confirm-agreed-expr','ja','ja-mashou',NULL,'ましょう','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-confirm-double-check-gl1','35e1b-ja-x-confirm-double-check-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-refuse-sorry-cant-gl1','35e1b-ja-x-refuse-sorry-cant-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-refuse-not-comfortable-gl1','35e1b-ja-x-refuse-not-comfortable-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-refuse-appreciate-offer-gl1','35e1b-ja-x-refuse-appreciate-offer-expr','ja','ja-tai',NULL,'たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-refuse-unable-refund-gl1','35e1b-ja-x-refuse-unable-refund-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-tomorrow-gl1','35e1b-ja-x-alternative-tomorrow-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-different-table-gl1','35e1b-ja-x-alternative-different-table-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-store-credit-gl1','35e1b-ja-x-alternative-store-credit-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-split-work-gl1','35e1b-ja-x-alternative-split-work-expr','ja','ja-masen-ka',NULL,'ませんか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-call-gl1','35e1b-ja-x-alternative-call-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-route-gl1','35e1b-ja-x-alternative-route-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-repair-gl1','35e1b-ja-x-alternative-repair-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-alternative-online-gl1','35e1b-ja-x-alternative-online-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-wrong-word-gl1','35e1b-ja-x-repair-wrong-word-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-start-again-gl1','35e1b-ja-x-repair-start-again-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-rephrase-gl1','35e1b-ja-x-repair-rephrase-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-correction-gl1','35e1b-ja-x-repair-correction-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-misunderstanding-gl1','35e1b-ja-x-repair-misunderstanding-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-not-blaming-gl1','35e1b-ja-x-repair-not-blaming-expr','ja','ja-tai',NULL,'たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-tone-gl1','35e1b-ja-x-repair-tone-expr','ja','ja-polite-past',NULL,'ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-name-gl1','35e1b-ja-x-repair-name-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-order-gl1','35e1b-ja-x-repair-order-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-repair-which-bus-gl1','35e1b-ja-x-repair-which-bus-expr','ja','ja-polite-negative',NULL,'ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-ready-order-gl1','35e1b-ja-x-food-ready-order-expr','ja','ja-request-onegai',NULL,'をお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-recommend-gl1','35e1b-ja-x-food-recommend-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-allergy-gl1','35e1b-ja-x-food-allergy-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-contain-gl1','35e1b-ja-x-food-contain-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-without-gl1','35e1b-ja-x-food-without-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-side-gl1','35e1b-ja-x-food-side-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-bill-gl1','35e1b-ja-x-food-bill-expr','ja','ja-request-onegai',NULL,'をお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-food-split-bill-gl1','35e1b-ja-x-food-split-bill-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-make-gl1','35e1b-ja-x-appt-make-expr','ja','ja-tai',NULL,'たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-available-gl1','35e1b-ja-x-appt-available-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1');

INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order) VALUES
('35e1b-ja-x-appt-reschedule-gl1','35e1b-ja-x-appt-reschedule-expr','ja','ja-tai',NULL,'たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-cancel-gl1','35e1b-ja-x-appt-cancel-expr','ja','ja-tai',NULL,'たくて','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-earlier-gl1','35e1b-ja-x-appt-earlier-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-name-gl1','35e1b-ja-x-appt-name-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-arrive-gl1','35e1b-ja-x-appt-arrive-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-appt-confirm-day-gl1','35e1b-ja-x-appt-confirm-day-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-return-wrong-size-gl1','35e1b-ja-x-return-wrong-size-expr','ja','ja-tai',NULL,'たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-return-receipt-gl1','35e1b-ja-x-return-receipt-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-return-defective-gl1','35e1b-ja-x-return-defective-expr','ja','ja-polite-past',NULL,'ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-return-refund-card-gl1','35e1b-ja-x-return-refund-card-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-return-policy-gl1','35e1b-ja-x-return-policy-expr','ja','ja-te-kudasai',NULL,'てください','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-return-original-gl1','35e1b-ja-x-return-original-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-get-station-gl1','35e1b-ja-x-direction-get-station-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-right-way-gl1','35e1b-ja-x-direction-right-way-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-stop-gl1','35e1b-ja-x-direction-stop-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-transfer-gl1','35e1b-ja-x-direction-transfer-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-platform-gl1','35e1b-ja-x-direction-platform-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-delay-gl1','35e1b-ja-x-direction-delay-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-medical-symptom-gl1','35e1b-ja-x-medical-symptom-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-medical-worse-gl1','35e1b-ja-x-medical-worse-expr','ja','ja-polite-present',NULL,'ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-hotel-quiet-room-gl1','35e1b-ja-x-hotel-quiet-room-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-hotel-checkout-gl1','35e1b-ja-x-hotel-checkout-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-service-onegaishimasu-gl1','35e1b-ja-x-service-onegaishimasu-expr','ja','ja-request-onegai',NULL,'でお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-service-kekkou-gl1','35e1b-ja-x-service-kekkou-expr','ja','ja-copula',NULL,'です','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-service-mochikaeri-gl1','35e1b-ja-x-service-mochikaeri-expr','ja','ja-request-onegai',NULL,'でお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-service-ryoushuusho-gl1','35e1b-ja-x-service-ryoushuusho-expr','ja','ja-ka-question',NULL,'ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-home-tachiai-gl1','35e1b-ja-x-home-tachiai-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-medical-kusuri-gl1','35e1b-ja-x-medical-kusuri-expr','ja','ja-ka-question',NULL,'ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-x-direction-show-map-gl1','35e1b-ja-x-direction-show-map-expr','ja','ja-te-itadaku',NULL,'ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-restaurant-allergy-gl1','35e1b-ja-d-restaurant-allergy-expr','ja','ja-ka-question','35e1b-ja-d-restaurant-allergy-t01','ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-restaurant-bill-gl1','35e1b-ja-d-restaurant-bill-expr','ja','ja-request-onegai','35e1b-ja-d-restaurant-bill-t01','をお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-appointment-reschedule-gl1','35e1b-ja-d-appointment-reschedule-expr','ja','ja-tai','35e1b-ja-d-appointment-reschedule-t01','たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-appointment-cancel-gl1','35e1b-ja-d-appointment-cancel-expr','ja','ja-tai','35e1b-ja-d-appointment-cancel-t01','たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-help-alternative-gl1','35e1b-ja-d-help-alternative-expr','ja','ja-nara','35e1b-ja-d-help-alternative-t02','なら','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-return-exchange-gl1','35e1b-ja-d-return-exchange-expr','ja','ja-tai','35e1b-ja-d-return-exchange-t01','たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-return-defect-gl1','35e1b-ja-d-return-defect-expr','ja','ja-polite-past','35e1b-ja-d-return-defect-t01','ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-directions-repair-gl1','35e1b-ja-d-directions-repair-expr','ja','ja-polite-negative','35e1b-ja-d-directions-repair-t01','ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-train-transfer-gl1','35e1b-ja-d-train-transfer-expr','ja','ja-polite-negative','35e1b-ja-d-train-transfer-t01','ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-group-work-gl1','35e1b-ja-d-group-work-expr','ja','ja-plain-nonpast','35e1b-ja-d-group-work-t02','るよ','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-group-disagree-gl1','35e1b-ja-d-group-disagree-expr','ja','ja-polite-present','35e1b-ja-d-group-disagree-t01','ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1');

INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order) VALUES
('35e1b-ja-d-repair-heating-gl1','35e1b-ja-d-repair-heating-expr','ja','ja-n-desu-ga','35e1b-ja-d-repair-heating-t01','のですが','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-repair-leak-gl1','35e1b-ja-d-repair-leak-expr','ja','ja-polite-present','35e1b-ja-d-repair-leak-t01','ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-medical-symptoms-gl1','35e1b-ja-d-medical-symptoms-expr','ja','ja-polite-past','35e1b-ja-d-medical-symptoms-t01','ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-pharmacy-medicine-gl1','35e1b-ja-d-pharmacy-medicine-expr','ja','ja-te-itadaku','35e1b-ja-d-pharmacy-medicine-t01','ていただけますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-invitation-decline-gl1','35e1b-ja-d-invitation-decline-expr','ja','ja-tai','35e1b-ja-d-invitation-decline-t02','たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-invitation-condition-gl1','35e1b-ja-d-invitation-condition-expr','ja','ja-tara','35e1b-ja-d-invitation-condition-t04','たら','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-misunderstanding-time-gl1','35e1b-ja-d-misunderstanding-time-expr','ja','ja-polite-past','35e1b-ja-d-misunderstanding-time-t01','ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-misunderstanding-tone-gl1','35e1b-ja-d-misunderstanding-tone-expr','ja','ja-polite-past','35e1b-ja-d-misunderstanding-tone-t01','ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-hotel-room-gl1','35e1b-ja-d-hotel-room-expr','ja','ja-polite-negative','35e1b-ja-d-hotel-room-t01','ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-hotel-booking-gl1','35e1b-ja-d-hotel-booking-expr','ja','ja-polite-present','35e1b-ja-d-hotel-booking-t01','ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-taxi-destination-gl1','35e1b-ja-d-taxi-destination-expr','ja','ja-request-onegai','35e1b-ja-d-taxi-destination-t01','でお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-bus-wrong-stop-gl1','35e1b-ja-d-bus-wrong-stop-expr','ja','ja-ka-question','35e1b-ja-d-bus-wrong-stop-t01','ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-order-unavailable-gl1','35e1b-ja-d-order-unavailable-expr','ja','ja-request-onegai','35e1b-ja-d-order-unavailable-t01','をお願いします','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-dietary-clarify-gl1','35e1b-ja-d-dietary-clarify-expr','ja','ja-ka-question','35e1b-ja-d-dietary-clarify-t01','ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-school-deadline-gl1','35e1b-ja-d-school-deadline-expr','ja','ja-ka-question','35e1b-ja-d-school-deadline-t01','ですか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-work-clarification-gl1','35e1b-ja-d-work-clarification-expr','ja','ja-ka-question','35e1b-ja-d-work-clarification-t01','ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-neighbour-noise-gl1','35e1b-ja-d-neighbour-noise-expr','ja','ja-polite-negative','35e1b-ja-d-neighbour-noise-t01','ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-wrong-delivery-gl1','35e1b-ja-d-wrong-delivery-expr','ja','ja-polite-past','35e1b-ja-d-wrong-delivery-t01','ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-opinion-disagree-gl1','35e1b-ja-d-opinion-disagree-expr','ja','ja-plain-nonpast','35e1b-ja-d-opinion-disagree-t01','う。','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-lost-reservation-gl1','35e1b-ja-d-lost-reservation-expr','ja','ja-polite-present','35e1b-ja-d-lost-reservation-t01','ます','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-flight-delay-gl1','35e1b-ja-d-flight-delay-expr','ja','ja-polite-negative','35e1b-ja-d-flight-delay-t01','ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-counter-service-gl1','35e1b-ja-d-counter-service-expr','ja','ja-tai','35e1b-ja-d-counter-service-t01','たい','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-clinic-reception-gl1','35e1b-ja-d-clinic-reception-expr','ja','ja-ka-question','35e1b-ja-d-clinic-reception-t01','ますか','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-delivery-time-gl1','35e1b-ja-d-delivery-time-expr','ja','ja-polite-past','35e1b-ja-d-delivery-time-t01','ました','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1'),
('35e1b-ja-d-lost-property-gl1','35e1b-ja-d-lost-property-expr','ja','ja-polite-negative','35e1b-ja-d-lost-property-t01','ません','1','复用现有 canonical grammar；仅作 support，不标为 Lesson required。','1');
