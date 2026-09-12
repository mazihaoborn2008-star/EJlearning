-- The observed surface is a verb, not the noun 話. Add the correct inflected link.
INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,displayed_form,importance,note_zh)
SELECT 'review-speech-157','legacy-157-ja','ja',id,'話したくない',3,'話す的愿望否定形式；不连接名词話。'
FROM v2_vocabulary_items WHERE language='ja' AND lemma='話す';
