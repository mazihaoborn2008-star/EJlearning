-- Stage 5 Expansion 02: current lesson index projection from the immutable bundle.

-- Historical bundle payloads and all learner evidence remain unchanged.

PRAGMA foreign_keys=ON;

UPDATE lesson_units SET sequence=7 WHERE id='en-s5-l4' AND sequence<>7;

UPDATE lesson_units SET sequence=5 WHERE id='en-s5-l3' AND sequence<>5;

UPDATE lesson_units SET sequence=4 WHERE id='en-s5-l2' AND sequence<>4;

UPDATE lesson_units SET sequence=5 WHERE id='ja-s5-l4' AND sequence<>5;

UPDATE lesson_units SET sequence=4 WHERE id='ja-s5-l3' AND sequence<>4;

UPDATE lesson_units SET topic_id='school',title='在限制下评估工作方案',objective='能结合时间、证据和条件，评估工作方案的可行性并说明限制。',sequence=1,status='published',estimated_minutes=15 WHERE id='en-s5-l1';

UPDATE lesson_units SET topic_id='travel',title='应对行程不确定性与后备方案',objective='能解释行程延误或变化，在不确定条件下协商替代安排和后备方案。',sequence=4,status='published',estimated_minutes=15 WHERE id='en-s5-l2';

UPDATE lesson_units SET topic_id='help',title='升级服务或工作问题',objective='能提供必要背景、说明问题边界，并提出有针对性的解决请求。',sequence=5,status='published',estimated_minutes=15 WHERE id='en-s5-l3';

UPDATE lesson_units SET topic_id='plans',title='用过去结果支持当前决定',objective='能回顾原先预期和实际结果，评价过去选择并用其支持当前决定。',sequence=7,status='published',estimated_minutes=15 WHERE id='en-s5-l4';

UPDATE lesson_units SET topic_id='school',title='正式陈述判断与限制',objective='能以较正式的日语依据证据作出有限度的判断，并说明可能性和限制。',sequence=1,status='published',estimated_minutes=15 WHERE id='ja-s5-l1';

UPDATE lesson_units SET topic_id='help',title='说明背景并体谅地请求',objective='能先说明背景和理由，再以顾及对方感受的方式提出请求。',sequence=2,status='published',estimated_minutes=15 WHERE id='ja-s5-l2';

UPDATE lesson_units SET topic_id='travel',title='用条件协商日程替代方案',objective='能说明行程条件和限制，询问可行选项并协商替代安排。',sequence=4,status='published',estimated_minutes=15 WHERE id='ja-s5-l3';

UPDATE lesson_units SET topic_id='feelings',title='委婉表达负担、担忧与保留',objective='能提供背景并委婉表达负担、担忧和保留，避免把判断变成指责。',sequence=5,status='published',estimated_minutes=15 WHERE id='ja-s5-l4';

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('en-s5-02-tradeoffs','en',5,'plans','比较方案与取舍','能依据成本、人员配置和风险比较方案，说明取舍并提出有理由的选择。',2,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('en-s5-03-consensus','en',5,'school','协商优先事项并达成共识','能说明优先事项和资源冲突，礼貌表达不同意见，并协商出共同接受的分配方案。',3,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('en-s5-06-repair','en',5,'chat','澄清信息并修复误解','能区分事实、推断与意图，通过澄清、换言和不归责表达修复误解。',6,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('en-s5-08-reporting','en',5,'school','报告信息并区分观察与推断','能在报告中准确陈述观察，标明推断和假设，并说明证据限制。',8,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('ja-s5-03-formal-role','ja',5,'travel','在明确服务角色中选择敬语与谦让语','能在顾客与工作人员角色明确的场景中，用「おっしゃる」描述顾客发言，并用「いたす」描述己方行动。',3,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('ja-s5-06-repair','ja',5,'chat','不责怪对方地修复误解','能区分事实、推测和意图，以不归责的方式澄清并修复误解。',6,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('ja-s5-07-consensus','ja',5,'plans','比较优先事项与取舍并达成共识','能比较优先事项和资源取舍，提出经过缓和的规范性判断，并达成分配共识。',7,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('ja-s5-08-benefit','ja',5,'help','判断受益方向并选择授受表达','能判断行动者与受益者的方向，并依据关系和场景选择合适的授受表达。',8,'published',15);

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s5-03-consensus' WHERE lesson_id='en-s5-l2' AND prerequisite_lesson_id='en-s5-l1';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s5-06-repair' WHERE lesson_id='en-s5-l4' AND prerequisite_lesson_id='en-s5-l3';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s5-08-reporting' WHERE lesson_id='en-s6-l1' AND prerequisite_lesson_id='en-s5-l4';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s5-03-formal-role' WHERE lesson_id='ja-s5-l3' AND prerequisite_lesson_id='ja-s5-l2';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s5-08-benefit' WHERE lesson_id='ja-s6-l1' AND prerequisite_lesson_id='ja-s5-l4';

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s5-02-tradeoffs','en-s5-l1');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s5-03-consensus','en-s5-02-tradeoffs');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s5-06-repair','en-s5-l3');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s5-08-reporting','en-s5-l4');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s5-03-formal-role','ja-s5-l2');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s5-06-repair','ja-s5-l4');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s5-07-consensus','ja-s5-06-repair');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s5-08-benefit','ja-s5-07-consensus');
