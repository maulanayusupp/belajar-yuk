# TODO / Roadmap

Single source of truth for planned work. Update this in the **same commit** as any
change: move finished items to **Done**, add new ideas under the right priority.
Priorities are grounded in research — see `REFERENCE.md` for the evidence behind each.

Legend: **P0** = highest impact, do next · **P1** = strong · **P2** = nice-to-have.

---

## Next up

### P0 — Kumon-style "how to learn" mechanics (cross-subject)

The biggest pedagogical differentiator from school, and the original product intent
("focus on how kids learn"). Applies to every subject. No backend (localStorage only).

- [x] **Daily assignment** ("Tugas Hari Ini") — daily checklist on the Progress page
      (learn a lesson · speed drill · clear mistakes), derived from existing signals +
      `drillService.playedToday`. `components/DailyTasks.vue`. Next: streak reward when
      all tasks done; surface it on the home page too.
- [ ] **Mastery gate = accuracy AND speed** — advance a lesson only when the child hits
      an accuracy bar _and_ beats a per-lesson target time (Standard Completion Time
      analog). Otherwise auto-serve a repeat. We already track stars → extend to mastery.
- [x] **Timed fluency drills** — "Latihan Kilat": 60s rapid arithmetic drills
      (add/sub/number-bond/mixed) with a personal best per mode. `pages/latihan.vue`,
      `services/drillService.ts`, `components/drill/SpeedDrill.vue`. Next: add
      word/syllable drills for English & Reading.
- [ ] **Self-correction step** — after submit, surface only the wrong items and let the
      child re-attempt before the set is "done".
- [ ] **Placement below ability** — extend the existing `pages/tes.vue` placement test so
      the first sessions are deliberately easy (100% win → confidence).

### P1 — English depth (close the "vocabulary-only" gap)

Research (CEFR / Cambridge Pre-A1, competitor matrix) shows we sit at the weakest,
input-only tier. Even free Duolingo ABC has speech recognition we lack.

- [ ] **Sentence building** — assemble a sentence from word tiles ("It is a ___",
      "I can ___"). Reuse the spelling/tile mechanic.
- [ ] **Reading comprehension** — short sentence → pick the matching picture.
- [ ] **Speaking / "listen & repeat"** — record-and-compare (British Council style);
      later, optional speech-recognition scoring (Web Speech API `SpeechRecognition`).
- [ ] **CEFR / Cambridge YLE alignment** — map lessons to Pre-A1/A1 can-dos; issue
      shields/certificates (parent-trust signal).

### P1 — Math real-world topics (Kurikulum Merdeka Fase A)

We only cover arithmetic ≤20. National curriculum expects more.

- [ ] Shapes / geometry, measurement (compare length/size)
- [ ] Time (o'clock), money (rupiah coins)
- [ ] Patterns, skip-counting
- [ ] Numbers to 100 & place value; simple word problems

### P2 — Differentiators & polish

- [ ] **Sempoa / mental arithmetic mode** — animate abacus beads → hide → answer.
      Strong local marketing hook; visualization translates well to screen.
- [ ] **Parent progress report** — extend certificates into a shareable report
      (parents value prestasi/achievement signals).
- [ ] **Dark Mode** — needs a dedicated refactor of SCSS tokens to CSS variables
      (many `rgba($token, a)` usages cannot take CSS vars in Sass). Large; deferred.
- [ ] **Multi-profile** — several children per device (per-profile localStorage
      namespacing + profile switcher).
- [ ] **More content** — additional Science topics (plants, weather, states of matter);
      more Bahasa Indonesia consonant families (na/pa/ta/sa…), longer words & stories.

---

## Done

- [x] Subject: **Bahasa Indonesia / Reading (Calistung)** — letters → syllables →
      words → sentences; two engines (BacaLesson, RangkaiLesson); language-aware TTS.
- [x] Subject: **Science** — five senses, animals & habitats, solar system.
- [x] **Export/Import progress** (cross-device backup, no server) + **Big Text** mode.
- [x] **Ulang Kesalahan** (review mistakes, mastery loop) + **Placement Test** +
      **Certificates**.
- [x] **Changelog** page + JSON source.
- [x] Slow-by-default speech; language-aware voice selection.
- [x] PWA, SEO/OG, sitemap, analytics (opt-in), CI, unit + E2E tests.
