# Persistent staging D1 policy

## Root cause and boundary

`wrangler deploy` did not seed curriculum data. The write spike came from creating a phase-specific D1 and manually replaying the complete historical migration chain into every new database. That chain contains the original curriculum plus later vocabulary, grammar, example, and lesson imports.

The configuration history confirms separate `DB` identities for 3.5A, 3.5B, 3.5C, 3.5C.1, 3.5D, 3.5E.1C, 3.5E.2, and 3.6. There is no CI directory, `postdeploy` hook, database-create command, or automatic seed call in the normal deployment script. Reapplying a migration directory to the same database is already skipped by Wrangler; the expensive behavior occurred when the target database changed.

The exact 3.6 bootstrap chain has 56 files and 12,876 INSERT statements (including four `INSERT OR IGNORE` statements), 53 DELETE statements, no `INSERT OR REPLACE`, no UPSERT, and no `DROP TABLE`. Executing that chain in an in-memory SQLite database records 89,508 logical row changes. The large-vocabulary segment accounts for 70,300 of them. D1's billed `Rows written` may be higher because this measurement intentionally excludes Wrangler's migration ledger and D1 internal/index accounting.

Staging now has one persistent data identity:

- D1 name: `ej-learning-36-db`
- D1 ID: `fcd78cc9-5f99-4677-9764-3713e3d1226b`
- AI session KV ID: `3a4a888f427d4d419ee6f56368338e71`

Worker names and URLs may change. The D1 and KV identities must not. `scripts/staging-db-policy.js` rejects a staging Worker config that points either `DB` or `CONTENT_DB` at a phase-derived replacement database.

## Normal deployment

Run:

```text
npm run deploy:36:staging
```

This performs only:

1. pending migrations from `migrations-staging-schema`;
2. Worker deployment using the existing D1 and KV bindings.

It never invokes a curriculum bootstrap or import. With no pending schema migration, an unchanged deployment performs zero D1 writes. A new schema migration may write only its intended schema/migration metadata; it must not contain curriculum data.

## Dataset versions

`curriculum_dataset_versions` records `dataset_name`, `dataset_version`, application time, row count, and checksum. The manifest is `config/staging-data-policy.json`.

The comparison is an exact gate: version, row count, and checksum must all match. An exact match skips the entire importer before any curriculum rows are visited. It does not run row-by-row UPSERTs.

The current database predates this metadata table. After the schema migration is available, inspect it with:

```text
npm run curriculum:staging:status
```

To adopt the already-validated rows without reseeding, run this once:

```text
npm run curriculum:staging:adopt -- --confirm-existing-data
```

Adoption first validates the five baseline counts, then writes only the missing version markers.

## Deliberate dataset updates

Curriculum updates are separate from deployment. For a real update:

1. prepare and review a forward-only delta migration;
2. bump that dataset's version, expected count, checksum, and `update_migration_config` in the manifest;
3. check `npm run curriculum:staging:status`;
4. run `npm run curriculum:staging:update -- <dataset_name> --confirm-dataset-update`;
5. run status and application regression tests again.

If the requested dataset already matches, the update command exits without applying a migration or writing a marker. If no reviewed delta migration is registered, it refuses the update instead of falling back to a bulk replacement.

Full bootstrap is an exceptional empty-database recovery action, not a deploy step. It requires `--confirm-empty-staging`, refuses any D1 with user tables, applies the historical chain once, validates counts, and records versions. It never creates a database. Do not use it on the existing staging D1.

## Schema rules

- Put schema-only, forward migrations in `migrations-staging-schema`.
- Do not put seed data, curriculum DELETEs, bulk replacement, or table rebuilds there.
- Never create a new D1 merely because the Worker name changes.
- Do not mutate learner progress, AI sessions, production, or old staging environments through this workflow.
