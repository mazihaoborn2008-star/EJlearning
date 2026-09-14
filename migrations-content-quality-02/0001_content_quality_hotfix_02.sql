-- Content Quality Hotfix 02: Japanese grammar modeling corrections.
-- IDs, examples, lesson links, attempts, progress, and SRS evidence are preserved.
PRAGMA foreign_keys=ON;

UPDATE v2_grammar_points SET
 form_name='数 + 助数詞',
 formula='数 + 人／本／枚／個／つ'
 WHERE id='35e1c-ja-counter-system';

UPDATE v2_grammar_points SET
 title_zh='条件の「なら・たら・ば・と」比較（概要）',
 form_name='なら・たら・ば・と（比較概要）',
 formula='普通形 + なら；た形 + ら；ば形；普通形 + と',
 usage_zh='非评测比较概览；各条件形式使用独立语法记录进行练习。'
 WHERE id='35e1c-ja-condition-contrast';

UPDATE v2_grammar_points SET
 title_zh='職場の敬体・尊敬語・謙譲語（概要）',
 form_name='敬体・尊敬語・謙譲語（使い分け概要）',
 formula='です／ます；尊敬語；謙譲語',
 usage_zh='非评测语域概览；具体形式使用独立语法记录进行练习。'
 WHERE id='35e1c-ja-workplace-register';
