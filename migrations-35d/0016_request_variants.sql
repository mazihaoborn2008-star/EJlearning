-- Review of shortened requests and desire verbs occurring in the migrated expressions.
UPDATE v2_grammar_points SET
 form_name='would like / love / prefer',
 formula='would like / love / prefer + noun / to-infinitive',
 when_zh='礼貌表达愿望或偏好；like较中性，love更热切，prefer通常含与其他选择比较。',
 mistakes_zh='to后用动词原形；would rather则不用to，不要把两种结构混同。',
 nuance_zh='Would you like to用于邀请；I would prefer to用于偏好。I would love to可在语境中省略后续动作，不表示两者语气完全相同。'
WHERE id='en-would-like';
INSERT INTO v2_grammar_examples(id,grammar_id,language,text,translation_zh,explanation_zh) VALUES
 ('final-prefer-example','en-would-like','en','I would prefer to stay within my budget.','我更愿意控制在预算内。','prefer说明相对于其他选择的偏好。'),
 ('final-love-example','en-would-like','en','I would love to, but I have plans.','我很想去，但已有安排。','love to后省略由邀约语境恢复的动作；先肯定再解释。');
UPDATE v2_grammar_points SET
 title_zh='语境中的简短名词回应',
 formula='noun / short response (optionally + please / thanks)',
 when_zh='语境补足省略信息；please可用于请求，thanks可用于感谢，也可只说Just a moment。',
 nuance_zh='简短回应依赖场景。省略please不必然无礼，语调与交往关系也有作用。'
WHERE id='en-noun-please';
UPDATE v2_grammar_points SET
 nuance_zh='焦点在动作承受者。Much appreciated等程式回应可以省略It is；这类省略不代表任意被动句都能删去be。'
WHERE id='en-passive';
