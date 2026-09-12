# Phase 3.5D completion

Phase 3.5D introduces a 48-lesson, language-independent learning path over the existing canonical vocabulary, grammar, and expression content. The primary navigation now opens the learning path; the three searchable libraries remain available for exploration.

The composition is deterministic and auditable. Lessons store identity, stage, topic, objective, sequence, prerequisites, canonical content IDs, item role, item order, and required/support state. They do not copy headwords, grammar text, or expressions.

The dedicated `ej-learning-35d-db` D1 was created, migrated, bound, and runtime-verified. Its `phase-35d-v1` composition bundle contains 48 lesson units, 718 canonical ID links, and 38 exam recommendations. The remote payload SHA-256 exactly matches the audited source bundle. The worker reports `source: d1` and `persisted: true`; an immutable byte-equivalent fallback remains compiled for resilience. Canonical content is resolved through a separate `CONTENT_DB` binding to the unchanged Phase 3.5C.1 database.

Local and staging API/browser suites passed, including a staging assertion that requires the D1 runtime source. Responsive coverage includes 360, 390, 430, 768, and 1440 pixels. Phase 3.5C.1 library, legacy navigation, placement, recommendations, mastery/checkpoint engine, local storage behavior, and AI Preview regression suites passed.

See `lesson-coverage-report.json`, `lesson-audit.json`, `release-verification.json`, and `screenshots-staging/` in this directory.
