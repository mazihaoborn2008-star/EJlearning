# Phase 3.5E.2 vocabulary data attribution

This staging curriculum combines the existing JIJI curated vocabulary with transformed subsets of the following open datasets. The software and the imported data remain separable; the transformed Japanese dataset is distributed under CC BY-SA 4.0.

## English

- **ECDICT**, © Linwei / skywind3000, MIT License: <https://github.com/skywind3000/ECDICT>
- Pinned commit: `bc015ed2e24a7abef49fc6dbbb7fe32c1dadaf8b`
- Source CSV SHA-256: `1a6947e04785db63613a92e14903cdae7954f7e84860b10e68e5c7cbb3f9c3cf`
- Modifications: lower-case canonical lemma selection; normalized duplicate and existing-entry collision checks; removal of proper names, malformed/noisy rows, and entries explicitly mapped to another lemma; concise Chinese meanings derived from source translations; course ranking derived from source frequency and usefulness markers.

## Japanese

- **Japanese Language Data**, CC BY-SA 4.0: <https://github.com/jkindrix/japanese-language-data>
- Community JLPT assignments adapted from **Jonathan Waller's JLPT Resources**. These are community/course estimates, not official JLPT lists.
- Pinned commit: `04014e06019fc9d4af76e6dbb64ec709fe863c4d`
- Classification SHA-256: `1dc9e9c168b5cb2754efd766b3d4c69f6eb2d51cb90bcade011b3e4f0fd1ae83`
- **JMdict / EDICT**, © Electronic Dictionary Research and Development Group (EDRDG): <https://www.edrdg.org/>
- **Tomoshi Dictionary Open Data Layer**, derived Chinese glosses © Tomoshi (Y1Z), CC BY-SA 4.0: <https://github.com/tomoshi-app/tomoshi-dict-data>
- Tomoshi release: `v2026-09-02`; compressed database SHA-256: `7153dfd7a8e42e2d920308370eac90cf9f2e4b4cfe67fb9a86e9aa1c89494073`
- License: <https://creativecommons.org/licenses/by-sa/4.0/>
- Modifications: normalized headword deduplication; reading normalization to hiragana for indexing; POS normalization into the JIJI taxonomy; concise Simplified Chinese gloss selection; no imported example sentences.

## Exam/course statements

IELTS does not provide an official word-by-word vocabulary list. The IELTS pools in this release are internal cumulative JIJI course targets based on frequency, general usefulness, academic usefulness, and existing editorial relevance.

The JLPT organization does not publish complete official N5–N1 vocabulary lists. All JLPT labels in this release are explicitly presented as community/course estimates.
