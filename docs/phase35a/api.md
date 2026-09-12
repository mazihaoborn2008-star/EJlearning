# V2 read API contract

Base: `/api/v2`. GET only; other methods on recognized routes return 405 with `Allow: GET`. Existing `/api/*` routes remain unchanged. Responses are JSON with `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`. No auth, mutations or learner computations are added.

| Route | Filters / result |
|---|---|
| `/vocabulary` | language=en/ja, stage=1–6, type=word/fixed_expression, search, part_of_speech, register; compact identity fields |
| `/vocabulary/:id` | item metadata, senses, typed examples/collocations/patterns, lexical relations, optional topics, first 10 reverse expressions |
| `/vocabulary/:id/sentences` | paginated compact reverse expressions |
| `/grammar` | language=en/ja, level=1–6, search; compact identity fields |
| `/grammar/:id` | named explanation fields, examples/readings, outgoing prerequisites, other relations, incoming prerequisite `recommended_for`, first 10 reverse expressions |
| `/grammar/:id/sentences` | paginated compact reverse expressions |
| `/sentences` | topic (V2 topic ID), language availability, unit_type, overall_difficulty, vocabulary_difficulty, grammar_difficulty, search over Chinese anchor; compact semantic units |
| `/sentences/:id` | semantic anchor/context/comparison, all published language expressions and variants, readings, vocabulary/sense links, grammar links and ordered turns |

All list and reverse routes accept `limit` (default 20, 1–100) and `offset` (default 0, 0–100000). No total count query is performed. Fetching one extra row determines `has_more`. Ordering is stable: lists use sort_order then ID; reverse lists use unit ID then expression ID. Reverse detail previews use limit=10. `next_offset` is null at the end. Under concurrent editorial changes, offset pagination does not promise snapshot consistency; this phase has no write API.

```json
{
  "data": [{"id":"en-eat","language":"en","lemma":"eat","type":"word","stage":1,"part_of_speech":"verb","register":"neutral","sort_order":0}],
  "pagination": {"limit":1,"offset":0,"has_more":true,"next_offset":1}
}
```

Detail envelope: `{"data": {...}}`. Reverse data contains `unit_id`, `anchor_zh`, `unit_type`, `expression_id`, `language`, `text`, `overall_difficulty`. It never recursively embeds complete units. Vocabulary detail examples are one collection distinguished by `kind`; consumers can render collocations and patterns separately. Relation rows include `source_id`, `target_id`, `type`, `note_zh`, `other_label` and `direction`. IDs are language-specific stable keys, not pairs; e.g. `en-present-perfect` and `ja-te-iru`.

Sentence detail vocabulary rows include `expression_id`, `language`, `item_id`, optional `sense_id`, `meaning_zh`, `lemma`, optional `turn_id`, `displayed_form`, `occurrence`, `importance` (1–3), `is_new_target` (0/1), note and ordering. A 0 new-target flag denotes supporting vocabulary; importance is editorial weight only. Grammar rows include `grammar_id`, title/form, displayed form/occurrence and local note, without copying library explanations. Readings return parsed arrays rather than JSON strings.

All supplied Sentence language and difficulty filters match **one published expression** in the same EXISTS clause. `language=ja&grammar_difficulty=4` cannot be satisfied by Japanese availability plus English difficulty. Variant expressions may satisfy filters; primary status controls future display preference, not availability. The list does not include full expressions.

Only published parent entities and published expression/link targets are returned. Draft/archived records return 404 on detail; reverse lists exclude unpublished units/expressions. Unpublished lexical/grammar relation targets are omitted. A grammar example remains reusable text when its source expression is unpublished, but `source_expression_id` is returned as null. Invalid requests never expose SQL details.

Chinese and target-language vocabulary search covers lemma and Chinese sense meaning/usage. Grammar search covers Chinese title/core and target form name. Search is literal substring matching: `%`, `_` and backslash are escaped before parameter binding. Empty/over-100-character text, unknown or repeated filters, invalid enums/ranges and malformed IDs produce 400 `INVALID_REQUEST`. Missing IDs/routes produce 404 `NOT_FOUND`. Unavailable database errors produce sanitized 503 `SERVICE_UNAVAILABLE`. Well-formed unknown free-text POS/register/topic filters return an empty list. Detail routes accept no query filters.

Example requests:

```text
/api/v2/vocabulary?language=en&stage=3&search=期待
/api/v2/vocabulary/en-expect
/api/v2/vocabulary/en-eat/sentences?limit=10
/api/v2/grammar/ja-te-iru
/api/v2/grammar/en-present-perfect/sentences
/api/v2/sentences?language=en&vocabulary_difficulty=1&grammar_difficulty=4
/api/v2/sentences/not-eaten
/api/v2/sentences/changed-plan
/api/v2/sentences/help-dialogue
```
