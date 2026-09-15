-- Content Quality Hotfix 03: bounded Japanese grammar models.
-- IDs, publication state, examples, lesson links, attempts, progress, and SRS evidence are preserved.
PRAGMA foreign_keys=ON;

UPDATE v2_grammar_points SET
 title_zh='んですが：说明背景并连接后续',
 form_name='普通形 + んですが（N・ナ形 + なんですが）',
 formula='普通形 + んですが（N・ナ形 + なんですが）',
 core_zh='用「んですが」先交代背景，再连接后续说明、转折或请求；名词和ナ形容词接「なんですが」。',
 purpose_zh='柔和地提出背景，再连接后续内容。',
 when_zh='在同一句或明确语境中先说明情况，再继续说明、转折或提出请求。',
 mistakes_zh='名词和ナ形容词不用「だんですが」，要接「なんですが」；句中填空只填写该句实际缺少的形式。',
 nuance_zh='「が」可以缓和语气或给后续留出空间；具体含义由同句和语境决定。',
 usage_zh='动词、イ形容词接普通形 + んですが；名词、ナ形容词接なんですが。'
 WHERE id='ja-n-desu-ga';

UPDATE v2_grammar_points SET
 title_zh='ので：说明原因',
 form_name='普通形 + ので（N・ナ形 + なので）',
 formula='普通形 + ので（N・ナ形 + なので）',
 core_zh='用「ので」说明原因或背景；名词和ナ形容词接「なので」。',
 purpose_zh='说明原因，并自然连接结果、判断或请求。',
 when_zh='需要把原因作为背景，再说明结果、判断或请求时使用。',
 mistakes_zh='名词和ナ形容词不用「だので」，要接「なので」；「て形」表达原因属于另一种结构。',
 nuance_zh='「ので」通常把原因作为客观背景提出，语气往往比直接断言更柔和。',
 usage_zh='动词、イ形容词接普通形 + ので；名词、ナ形容词接なので。'
 WHERE id='ja-node';

UPDATE v2_grammar_points SET
 title_zh='「言う」的尊敬语：おっしゃる',
 form_name='言う → おっしゃる',
 formula='言う → おっしゃる',
 core_zh='把受尊敬者的「言う」换成尊敬语「おっしゃる」。',
 purpose_zh='尊敬地描述对方说话这一动作。',
 when_zh='描述客户、上级或其他需要尊敬的对象所说的内容时使用。',
 mistakes_zh='不要用「おっしゃる」描述自己的动作，也不要把它当作所有尊敬语动词的统一形式。',
 nuance_zh='这是「言う」的一项明确尊敬语映射；具体时态和礼貌形式随句子变化。',
 usage_zh='主语是受尊敬的客户或对方；本记录只练习「言う → おっしゃる」。'
 WHERE id='ja-honorific';

UPDATE v2_grammar_points SET
 title_zh='「する」的自谦语：いたす',
 form_name='する → いたす',
 formula='する → いたす',
 core_zh='把说话者或己方的「する」换成自谦语「いたす」。',
 purpose_zh='通过降低己方动作来向对方表示尊重。',
 when_zh='工作人员或说话者礼貌地说明自己将做某事时使用。',
 mistakes_zh='不要用「いたす」抬高客户或对方的动作，也不要与「伺う」等其他自谦语混作一个答案。',
 nuance_zh='「いたす」是「する」的一项明确自谦语映射；礼貌表达中常用「いたします」。',
 usage_zh='说话者或工作人员降低自己的动作；本记录只练习「する → いたす」。'
 WHERE id='ja-humble';
