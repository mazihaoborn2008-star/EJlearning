-- Content Quality Hotfix 01: reviewed canonical data delta.
-- Preserve IDs and all dependent examples, links, attempts, progress, and SRS rows.
PRAGMA foreign_keys=ON;

UPDATE v2_grammar_points SET formula='Vます → Vません' WHERE id='ja-polite-negative';
UPDATE v2_grammar_points SET formula='Vます → Vました' WHERE id='ja-polite-past';
UPDATE v2_grammar_points SET formula='名词 / な形容词 + です' WHERE id='ja-copula';
UPDATE v2_grammar_points SET formula='Vます → Vそうだ' WHERE id='ja-sou';
UPDATE v2_grammar_points SET form_name='Vます → Vたい',formula='Vます → Vたい' WHERE id='ja-tai';
UPDATE v2_grammar_points SET form_name='Vます → Vましょう',formula='Vます → Vましょう' WHERE id='ja-mashou';
UPDATE v2_grammar_points SET
 form_name='Vます → Vませんか',
 formula='Vます → Vませんか',
 core_zh='把动词ます形中的「ます」替换为「ませんか」，用于礼貌地邀请对方。',
 purpose_zh='礼貌地邀请对方一起做某事。'
 WHERE id='ja-masen-ka';
UPDATE v2_grammar_points SET form_name='Vます → V始める',formula='Vます → V始める' WHERE id='ja-hajimeru';
UPDATE v2_grammar_points SET
 when_zh='转述所得信息；动词辞书形接「そうだ」，不使用去掉「ます」后的形式。',
 mistakes_zh='不要把传闻的「普通形 + そうだ」与样态的「Vます → Vそうだ」混淆。',
 nuance_zh='这里转述听到的信息，不是根据眼前迹象作判断。'
 WHERE id='ja-hearsay-sou';
UPDATE v2_grammar_points SET form_name='Vない（去掉「ない」）+ ざるを得ない',formula='Vない（去掉「ない」）+ ざるを得ない' WHERE id='ja-zaru-wo-enai';
UPDATE v2_grammar_points SET form_name='Vます → Vかねない',formula='Vます → Vかねない' WHERE id='ja-kanenai';
UPDATE v2_grammar_points SET form_name='Vます',formula='动词ます形（如「行きます」）' WHERE id='ja-polite-present';
UPDATE v2_grammar_points SET form_name='お + Vます（去掉「ます」）+ ください',formula='お + Vます（去掉「ます」）+ ください' WHERE id='ja-honorific-request';

-- Retire the category records as grammar without deleting their historical identities.
UPDATE v2_grammar_points SET publication_state='archived' WHERE id IN ('en-greeting','ja-greeting');

-- Clean learner/editor-facing metadata copied from the former malformed labels.
UPDATE v2_grammar_example_target_audits
 SET rationale_zh=replace(replace(rationale_zh,'ます干','Vます（去掉「ます」）'),'ない干','Vない（去掉「ない」）')
 WHERE rationale_zh LIKE '%干%';
UPDATE v2_grammar_examples
 SET explanation_zh='转述所得信息；动词辞书形接「そうだ」，不使用去掉「ます」后的形式。'
 WHERE grammar_id='ja-hearsay-sou' AND explanation_zh LIKE '%ます干%';
UPDATE v2_sentence_grammar_links
 SET note_zh='转述所得信息；动词辞书形接「そうだ」，不使用去掉「ます」后的形式。'
 WHERE grammar_id='ja-hearsay-sou' AND note_zh LIKE '%ます干%';
UPDATE v2_sentence_expressions
 SET note_zh='转述所得信息；动词辞书形接「そうだ」，不使用去掉「ます」后的形式。'
 WHERE id='lesson-ja-hearsay-sou-ex' AND note_zh LIKE '%ます干%';
