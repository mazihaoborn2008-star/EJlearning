# Phase 1 acceptance review

Verified locally in Chrome with Playwright-driven interactions and manual visual inspection of browser screenshots. Mobile widths are browser viewport emulation, not physical-device tests.

| Requirement | Result / evidence |
| --- | --- |
| Four complete pages | Home, Placement, Learning and Progress rendered and visually reviewed at 360, 390, 430 and 1440 px. |
| Mobile and desktop | Mobile stacks Chinese → English → Japanese → comparison; desktop places both languages side by side. Long Concept 13 inspected for wrapping. |
| Independent placement | Completed English 12/12 → Level 6 and Japanese 3/12 → Level 1; refreshed; retested English 7/12 → Level 3 while Japanese stayed Level 1. |
| Scoring | All 13 attainable scores (0–12), and exact percentage thresholds tested. |
| Test controls | Answer required before next; previous restores answer; answers can be changed; exit preserves previous results; both languages show explanations and recommended difficulty. |
| Exactly 15 required Concepts | 5 each for 日常聊天, 吃饭 and 学校; all required Chinese meanings present. |
| Pronunciation and grammar | Every Concept checked for collapsed IPA, working IPA disclosure, Japanese ruby, exact kana view and Chinese grammar explanations with additional examples. Every grammar button and chunk opens a dismissible modal. |
| English × Japanese | All 15 comparison texts checked against the data and opened at every target width. |
| Independent mastery | Concept 8 marked English learned and Japanese review; both persisted after refresh. Overall progress showed 7% vs 0%; review link returned to Concept 8. |
| Continue and navigation | Next Concept survives refresh; home continues the last Concept. Topic filters, selectors, previous/next and final-item progress link tested. All page links resolve and primary navigation clicked. |
| No horizontal overflow | All four pages, all 15 Concepts, and all placement question layouts checked at 360, 390, 430 and 1440 px. |
| Drawers and results | Mobile grammar drawers, long questions and populated results visually reviewed at all three required mobile widths. Escape, close button and confirmation button tested. |
| Storage resilience | Malformed JSON and invalid state fall back safely; blocked writes display a warning while learning remains usable. |
| Content review | Reviewed English/Japanese meaning, IPA, Japanese readings, natural collocations, grammar examples and comparisons. No romaji or audio UI. |
| Finished controls | No placeholders or dead feature buttons; untested levels and empty review lists are functional empty states. |
| Phase 2 excluded | Static files and development verification only; no application backend, APIs, accounts, audio or production infrastructure. |

## Issues found and fixed during review

- Refreshing after next/previous initially reopened the earlier URL Concept. Navigation now updates the URL and stored last Concept together.
- Japanese chunks initially separated some kanji from their grammatical units. They now group useful phrases with readings embedded inside each chunk.
- Japanese question punctuation is preserved when composing the ruby display.
- A mismatched topic and Concept query now selects the Concept's topic rather than showing an inconsistent selector.

The verification run completed with no JavaScript page errors. Screenshots and machine-readable results are stored alongside this review.
