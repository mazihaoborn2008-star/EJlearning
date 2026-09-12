# Legacy transition plan — proposal only

Phase 3.5A leaves all 183 Concepts and 366 primary expressions in place. The current UI, localStorage format, APIs, placement, recommendations and checkpoints continue to use those identities. No mapping row has been executed as a curriculum or learner-state migration.

## Inventory and classification

[`legacy-mapping.json`](legacy-mapping.json) contains one record per Concept: ID, legacy type, Chinese anchor, proposed destination, English/Japanese source text and handling, confidence, decision notes and human-review flag. [`legacy-mapping.md`](legacy-mapping.md) is the human-readable equivalent. `node scripts/map-35a.js` reproducibly analyzes immutable local migrations 0001–0005, including the original 15 Concepts; it makes no remote requests or persistent database changes.

| Primary future destination | Concepts |
|---|---:|
| Vocabulary | 28 |
| Vocabulary fixed_expression | 1 |
| Sentence | 54 |
| Sentence scenario | 44 |
| Sentence dialogue | 28 |
| Grammar + concrete Sentence examples | 28 |
| Total | 183 |

These are Concept classifications, not counts of future V2 records. One Concept can create different quantities of EN and JA records; deduplication can merge several source Concepts into one lexical sense or grammar point. Grammar classifications explicitly require additional Sentence examples. Sentence classifications may also yield reusable vocabulary or grammar after separate editorial extraction.

There are 132 high-, 44 medium- and 7 low-confidence destination proposals. **51 need human review.** Confidence describes the proposed destination, not linguistic certification. Review IDs are enumerated in both reports. All 28 patterns need independent grammar identification and completed, natural examples. Phrase decisions inspect utterance function instead of assuming every legacy phrase is vocabulary: Concept 26 is a reusable discourse connector; Concept 98 is a full promise about collecting someone on the way; Concept 113 is a response to illness.

Highest-priority unresolved items:

| IDs | Resolution required before future migration |
|---|---|
| 46, 58, 82, 112, 118, 154 | Some JA “vocabulary” is an explanatory phrase or complete state expression. Select actual lexical heads and senses; preserve useful full expressions separately. Do not store an English word and Japanese sentence as paired words. |
| 172 | Clarify noun versus verb `plan`. The representative `en-plan` is a verb; legacy 予定 does not authorize mapping to it. |
| 180 | Distinguish English counterfactual `would have` from Japanese past intention つもりでした. Recheck Chinese semantic anchor before sharing a Sentence unit. |
| 64, 70, 130, 178 | Restrict meaning overlap: appointment/予約, buffer/余裕, overwhelmed/いっぱいいっぱい, pleasant anticipation versus prediction/requirement. |
| 26, 38, 62, 74, 89, 113, 122, 146, 170, 182 | Decide lexical versus communicative boundaries, idiom extraction, response context or incomplete trailing clause. |
| 104 | Separate Japanese appearance そう from hearsay そう; do not infer a grammar point solely from Chinese wording. |

## Phase 3.5B: future UI adoption

1. Design Vocabulary, Grammar and Sentence screens against the documented V2 contract in a separate phase and isolated environment.
2. Make their use explicit through new navigation or a feature flag; existing pages continue consuming legacy endpoints until approved.
3. Do not silently render empty representative data as a complete curriculum. Carry publication and representative-content scope into future product decisions.
4. Keep old endpoints available throughout parallel UI verification. No redirect, automatic API alias or Concept deletion is part of this phase.

No Phase 3.5B implementation has been started.

## Phase 3.5C: future content migration

1. Freeze a source inventory revision/hash and complete all flagged reviews. Record approver, decision date, target-language forms and scope. Resolve further issues found during language review even on high-confidence rows.
2. Add a **future**, many-to-many provenance crosswalk containing legacy Concept/expression ID, target domain, target ID, language, optional sense ID, mapping role (primary/extracted/example), decision revision and approval. It must support splits/merges and cannot assume one EN record equals one JA record. This table is not implemented in 3.5A.
3. Deduplicate each language independently. Vocabulary key candidates are lemma+POS+meaning; grammar candidates are language+structure+function, not matching labels. Keep homographs and senses distinct. Match representative IDs only after sense/form review. One Chinese anchor may need splitting if the source translations express different intentions.
4. Convert vocabulary into independent items/senses and examples. Convert reusable phrase meanings into fixed expressions only where warranted. Preserve complete pragmatic utterances as Sentence/scenario units. Turn pattern slots into grammar entries plus specific Sentence examples. Parse dialogues into actual ordered turns. Retain original source text in provenance for review; don't rewrite legacy records.
5. Re-edit independent Stage/Level and three Sentence difficulty dimensions. Legacy single difficulty is only historical context, never copied indiscriminately into all three fields. Add actual vocabulary/sense and grammar links with validated visible chunks; link coverage must be documented before any learner coverage metric uses it.
6. Generate **new additive migrations** with stable IDs and reviewed crosswalk rows. Do not regenerate applied seed migrations. Apply in a clean isolated D1 first; validate foreign keys, draft/publication visibility, duplicates, reading reconstruction, span occurrences, prerequisite acyclicity, bilingual semantic equivalence and counts against the approved crosswalk.
7. Run legacy and V2 regression suites in separate staging. Review diff and coverage. Production migration/cutover needs a later explicit deployment request; this plan does not authorize it.
8. Retain legacy APIs/tables until usage has actually moved and rollback has been exercised. Later deprecation should announce a versioned contract, define a support window and require a separate removal migration. Roll back UI/API selection to legacy without dropping V2 data. Additive data can remain dormant.

## Phase 3.5D: later learner-state and engine design

Current localStorage and server-side temporary assessment sessions are unchanged. Do not auto-award Vocabulary or Grammar mastery from a learned legacy Sentence. Knowing an expression does not prove knowledge of all words, senses or grammatical forms inside it.

A later design should version separate vocabulary (including sense where justified), grammar and expression profiles per language, retaining the untouched legacy snapshot and migration revision for recovery. Only an approved, unambiguous crosswalk plus an explicit transfer policy can justify progress transfer. Split mappings start as unknown/review-required unless there is direct evidence; merged targets must not double-count activity. Conflicting states and retries need idempotent handling. Unknown source IDs remain recoverable instead of being discarded. Progress migration must be reversible and separately tested against existing browser data.

Placement, recommendations and checkpoints should later draw on separate evidence for vocabulary recognition/use, grammar understanding/use and expression communication. Prerequisites remain suggestions. Important-vocabulary coverage could use link importance weights and sense-aware profile evidence, but only after link completeness is reviewed; the 3.5A fixture is not adequate for a percentage calculation. No SRS, scoring or recommendation implementation is introduced now.

Phase 4 AI work is outside this transition and has not been started.

## Isolation and reproducibility

`migrations/0001…0005` and all old Wrangler configs remain byte-identical. `migrations-v2/` contains exact legacy copies plus 0006 domain tables, 0007 representative content, and 0008 editorial integrity triggers. `scripts/prepare-35a.js` refuses a legacy-copy mismatch. This separate stream prevents old Phase 3 migration commands from picking up V2 files.

Local config: `wrangler.35a.local.jsonc`, persistence `.wrangler/35a-local`, port 8795. Remote config: `wrangler.35a.jsonc`, Worker `ej-learning-35a`, D1 `ej-learning-35a-db` (`c5476d39-27ab-4899-b212-671e893971ee`). Both have empty routes and no custom domain. Separate local/remote binding IDs keep local testing stable after remote resource creation.

```powershell
node scripts/prepare-35a.js
node node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --local --config wrangler.35a.local.jsonc --persist-to .wrangler/35a-local
node node_modules/wrangler/bin/wrangler.js dev --config wrangler.35a.local.jsonc --port 8795 --persist-to .wrangler/35a-local
# In a second terminal:
$env:BASE_URL='http://127.0.0.1:8795'
node --test tests/phase35a-db.test.js tests/phase35a-api.test.js tests/phase3-api.test.js tests/phase3-engine.test.js
node scripts/verify-35a-d1.js
$env:TEST_LABEL='35a-local'
node tests/phase3-browser.cjs
```

The seed/guard generators document migration provenance; do not edit or regenerate an applied migration to change content. Add another numbered migration instead. `node scripts/verify-35a-clean.js` creates a fresh local persistence directory, applies all eight migrations and runs schema, D1, API, engine, browser and curriculum checks. It never deletes prior databases. Only `scripts/release-35a.js migrate|deploy|dry-run` is the guarded dedicated release path. Do not use old deploy/migrate scripts for 3.5A.

Protected-environment snapshots use only read-only calls: deployment/settings, SQL schema/migration/content hashes, existing GET APIs, routes and available domain/DNS metadata. Transient assessment sessions are excluded because existing scheduled expiry can legitimately change them. No protected environment assessment test is run: tests that write anonymous sessions target only local or the new 35a staging.
