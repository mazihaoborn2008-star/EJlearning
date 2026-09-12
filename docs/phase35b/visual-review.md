# Rendered UI review

The local and isolated staging screenshots were visually inspected, in addition to automated layout tests. Screenshots live in `screenshots-local/` and `screenshots-staging/` under this directory.

| Required view | Staging image | Review |
|---|---|---|
| Mobile Home | `390-0.png` | Three prominent domain cards, calm shared identity, English/Japanese summaries clearly marked as preview, compact five-destination bottom navigation |
| Vocabulary Detail | `390-2.png` | Separate numbered expect senses, IPA, readable examples and relation cards, real reverse expression links |
| Grammar Detail | `390-4.png` | Clear section hierarchy instead of one text wall; readable Japanese ruby, unlocked prerequisite and linked expressions |
| Long Sentence Detail | `390-6.png` | Long EN/JA text wraps; independent difficulty badges; touchable vocabulary/grammar controls; comparison follows expressions |
| IELTS | `390-8.png` | Target pills wrap; internal difficulty and target reference remain separate; realistic semi-academic sample; unobtrusive reference notice |
| JLPT | `390-9.png` | N5–N1 navigation, three learning sections, Stage 2 and Level 3 remain separate from N4 reference |
| AI Preview | `390-10.png` | Four modes, visible context, labeled input, explicit unconnected/fixed-feedback wording; no chat impersonation |
| Desktop Home | `1440-0.png` | Balanced introduction/sample panel and three domain cards; coherent supporting sections |
| Desktop Grammar Library | `1440-3.png` | Language/level navigation and readable three-column cards with communicative purpose |

Full-page mobile screenshots capture the fixed bottom navigation at its original viewport position; it appears partway down the stitched image. Runtime tests verify scrollable content has bottom spacing and no horizontal overflow. This is a screenshot artifact, not a navigation bar embedded midway in the page.

Automated checks cover all 12 major pages at **360, 390, 430 and 1440 px**. Mixed Latin, Chinese, IPA and Japanese ruby are tested with expanded readings. Responsive controls are not shrunk to solve overflow. The visible palette uses subtle borders and restrained domain cues without saturated flag colors or neon AI styling.

Accessibility-oriented checks verify labeled forms, a single main heading, named navigation, skip link, visible focus, native-dialog focus wrap/return, Escape/touch dismissal, control height and live loading/feedback states. No WCAG certification is claimed.
