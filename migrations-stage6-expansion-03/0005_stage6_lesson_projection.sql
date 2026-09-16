-- Stage 6 Expansion 03: current lesson index projection from the immutable bundle.

-- Historical bundles and all learner/SRS evidence remain unchanged.

PRAGMA foreign_keys=ON;

UPDATE lesson_units SET sequence=6 WHERE id='en-s6-l4' AND sequence=4;

UPDATE lesson_units SET sequence=5 WHERE id='en-s6-l3' AND sequence=3;

UPDATE lesson_units SET sequence=6 WHERE id='ja-s6-l3' AND sequence=3;

UPDATE lesson_units SET sequence=5 WHERE id='ja-s6-l4' AND sequence=4;

UPDATE lesson_units SET topic_id='school',title='以证据构建有限定的论证',objective='能选择相关证据、提出主张，并明确结论的适用范围。',sequence=1,status='published',estimated_minutes=15 WHERE id='en-s6-l1';

UPDATE lesson_units SET topic_id='chat',title='分析反事实并回应反方观点',objective='能连接反事实条件与后果，承认反方依据，并说明不确定性。',sequence=2,status='published',estimated_minutes=15 WHERE id='en-s6-l2';

UPDATE lesson_units SET topic_id='social',title='作出不施压的正式承诺',objective='能说明限制、提出替代方案，并在不给对方压力的情况下明确承诺。',sequence=5,status='published',estimated_minutes=15 WHERE id='en-s6-l3';

UPDATE lesson_units SET topic_id='plans',title='回顾结果并承诺后续行动',objective='能根据证据评估结果、承担相应责任，并说明下一步行动。',sequence=6,status='published',estimated_minutes=15 WHERE id='en-s6-l4';

UPDATE lesson_units SET topic_id='school',title='组织依据并形成有限定的结论',objective='能整理相关依据、说明判断标准，并限定结论的适用范围。',sequence=1,status='published',estimated_minutes=15 WHERE id='ja-s6-l1';

UPDATE lesson_units SET topic_id='chat',title='谨慎表达判断并承认限制',objective='能区分依据、推断与可能性，并以保留方式表达判断。',sequence=2,status='published',estimated_minutes=15 WHERE id='ja-s6-l2';

UPDATE lesson_units SET topic_id='social',title='调整安排并作出得体承诺',objective='能说明限制、提出代案，并顾及对方作出明确承诺。',sequence=5,status='published',estimated_minutes=15 WHERE id='ja-s6-l4';

UPDATE lesson_units SET topic_id='plans',title='回顾结果并说明责任与下一步',objective='能评估实际结果、承认相应责任，并说明下一步行动。',sequence=6,status='published',estimated_minutes=15 WHERE id='ja-s6-l3';

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('en-s6-03-synthesis','en',6,'school','综合转述信息并区分证据与推断','能综合多个来源，区分事实、证据与推断，并形成有限定的结论。',3,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('en-s6-04-accountability','en',6,'plans','协商冲突需求并承担说明责任','能权衡优先事项、分配责任、提出缓解措施，并作出正式承诺。',4,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('ja-s6-03-reporting','ja',6,'school','综合转述信息并进行条件判断','能区分转述、传闻与推断，并在明确条件下作出决定。',3,'published',15);

INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES('ja-s6-04-accountability','ja',6,'plans','正式协商突发情况与说明责任','能在正式角色中协商突发情况、缓解措施、说明责任与后续承诺。',4,'published',15);

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s6-04-accountability' WHERE lesson_id='en-s6-l3' AND prerequisite_lesson_id='en-s6-l2';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s6-l4' WHERE lesson_id='ja-s6-l3' AND prerequisite_lesson_id='ja-s6-l2';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s6-04-accountability' WHERE lesson_id='ja-s6-l4' AND prerequisite_lesson_id='ja-s6-l3';

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s6-03-synthesis','en-s6-l2');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s6-04-accountability','en-s6-03-synthesis');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s6-03-reporting','ja-s6-l2');

INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s6-04-accountability','ja-s6-03-reporting');
