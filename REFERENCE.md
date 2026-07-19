# REFERENCE.md — Material & Pedagogy Sources

Every lesson in this app should be **evidence-based**, not guessed. This file records
the curriculum frameworks and reputable programs each subject's content is grounded in.
When you add or change material, add the source you used here (link + one line on how
it informed the content).

> Note: some source pages are third-party analyses of proprietary programs; where a
> claim is not from a primary/official page it is marked. Verify before external use.

---

## Learning method (cross-subject) — Kumon

Basis for the planned mastery mechanics (see `TODO.md` P0): small steps, start-easy,
mastery-before-advancing, speed + accuracy, short daily practice, self-correction.

- Kumon — Self-learning method: https://www.kumongroup.com/eng/about-kumon/method/self-learning/index.html
- Kumon — Five features / small steps: https://www.kumongroup.com/eng/about-kumon/method/small-steps/explanation/index.html
- Kumon UK — why worksheets are timed (Standard Completion Time, speed+accuracy): https://www.kumon.co.uk/blog/why-does-kumon-time-my-child-as-they-complete-worksheets
- Kumon math levels 7A→A progression (third-party guide): https://blog.masterygenius.com/kumon-math-levels-the-comprehensive-guide/
- Kumon reading program (phonemic awareness → sight words → phonics → sentences → comprehension): https://www.kumon.com/reading-program

---

## Bahasa Indonesia — Reading (Calistung)

The syllable (suku kata) is the core unit; Indonesian orthography is phonetic and
regular, so the letters → syllables → words → sentences sequence maps directly.

- Kurikulum Merdeka — CP Bahasa Indonesia Fase A (kelas 1–2), official: https://guru.kemendikdasmen.go.id/kurikulum/referensi-penerapan/capaian-pembelajaran/sd-sma/bahasa-indonesia/fase-a/
- Calistung materials, kelas 1 (syllable-based reading): https://www.ikatancendikia.com/2022/10/blog-post_21.html
- Kumon Indonesia — Bahasa Indonesia reading program (6A→5A: word → phrase → sentence): https://id.kumonglobal.com/bahasa-indonesia/
- Marbel "Belajar Membaca" (dominant local kids app, syllable spelling) — competitor benchmark: https://www.educastudio.com/brand/marbel/product/marbel-belajar-membaca

Applied in: `data/bahasa/**` (vowels, syllable families ma/ba, word building, sentences).

---

## English

Current content = vocabulary + phonics + listening + spelling. Research shows the gap is
production: sentence building, speaking/pronunciation, conversation, comprehension
(CEFR Pre-A1/A1, Cambridge Young Learners). See `TODO.md` P1.

- CEFR / Cambridge Pre-A1 Starters (young learners benchmark): https://www.cambridgeenglish.org/exams-and-tests/starters/
- British Council — Primary Plus methodology (communicative, role-play): https://www.britishcouncil.org.ua/en/primary-plus
- EF Efekta "Learn–Try–Apply" loop & AI speech practice (background on premium method).
- Phonics sequence corroboration (Kumon reading program, above).
- Kurikulum Merdeka — English becomes mandatory at SD from 2027/28 (positioning): https://www.detik.com/edu/sekolah/d-7362271/perjalanan-bahasa-inggris-dalam-kurikulum-sd-di-ri-dari-pilihan-hingga-wajib

Applied in: `data/english/**`.

---

## Math

Singapore Math (CPA: Concrete–Pictorial–Abstract), number bonds, ten-frames, number
lines. National curriculum expects more real-world topics (see `TODO.md` P1).

- Kurikulum Merdeka — CP Matematika Fase A (numbers to 100, place value, +/- to 20,
  fractions ½ & ¼, "=" symbol, basic geometry & measurement), official: https://guru.kemendikdasmen.go.id/kurikulum/referensi-penerapan/capaian-pembelajaran/sd-sma/matematika/fase-a/
- Kumon early math sequence (count → subitize → write → +1/+2/+3 isolated → mental → subtraction): https://blog.masterygenius.com/kumon-math-levels-the-comprehensive-guide/
- Sempoa / mental arithmetic (planned P2 mode) — background: https://www.cmaindo.com/articles/mengenal-mental-aritmatika-beserta-manfaatnya/

Applied in: `data/math/**`.

---

## Science

Beginner concepts aligned to early-primary science (body/senses, animals & habitats,
solar system). Grounded in common K–1 science strands (life science, earth & space).

- Kurikulum Merdeka Fase A integrates science within "IPAS" (science & social studies).
  Reference the official CP portal: https://guru.kemendikdasmen.go.id/kurikulum/

Applied in: `data/science/**`.

---

## Coding (separate module — `/coding`)

Grid command-puzzle engine (Lightbot × Code.org Maze): the child sequences command
blocks to guide a robot to the goal. Chosen because it's self-teaching (unambiguous
pass/fail with no teacher), client-only/offline, and forces the target CS concepts.
Concept order follows the K-12 CS Framework: sequencing → loops → events →
conditionals → functions → variables.

- K-12 CS Framework, grade-band statements (concept progression by age): https://k12cs.org/framework-statements-by-grade-band/
- Code.org CS Fundamentals (Courses A-F structure): https://code.org/en-US/curriculum/computer-science-fundamentals
- Lightbot — how the puzzle teaches sequencing/loops/procedures/conditionals: https://lightbot.com/Lightbot_HowDoesLightbotTeachProgramming.pdf
- Blockly Games (open-source, offline-capable puzzle progression): https://blockly.games/about
- Kodable curriculum ladder (Sequence → Conditions → Loops → Functions → Variables): https://www.kodable.com/learn/curriculum-live
- CS Unplugged — Kidbots (unplugged sequencing/debugging for the youngest): https://www.csunplugged.org/en/topics/kidbots/whats-it-all-about/
- Gamification that works for solo young learners (badges/flow vs. leaderboards): https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1429452/full

Applied in: `data/coding/**`, `utils/codeRunner.ts`, `services/codingService.ts`,
`components/coding/**`. Phase plan in `TODO.md`.

## Parent motivation & positioning (marketing)

Why parents enroll kids in bimbel — informs copy and feature priorities.

- "Demam Bimbel" on young children (academic anxiety, productive screen time): https://conference.uin-suka.ac.id/index.php/aciece/article/download/1810/1293
- Calistung entrance-test ban (Permendikbud 1/2021) → frame as play-based readiness,
  not test drilling: https://bbpmpjatim.kemdikbud.go.id/main/satuan-pendidikan-sd-dilarang-wajibkan-tes-calistung-saat-ppdb/
