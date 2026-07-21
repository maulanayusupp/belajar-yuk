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

### P1 — Coding module (separate area, `/coding`)

Lightbot/Code.org-style grid command-puzzles. Client-only, evidence-based (see
`REFERENCE.md`). Phase 1 shipped; expand per the K-12 CS concept order.

- [x] **Phase 1 — Sequencing** — engine (`utils/codeRunner.ts` interpreter,
      `CodingPuzzleGrid`, `CodingLevelRunner`), `services/codingService.ts` (own
      progress store + unlock), `pages/coding/` map + play, 6 levels, star ratings by
      efficiency, landing band. World "Urutan Perintah".
- [x] **Phase 1b — Loops** — world "Perulangan" (5 levels) with a custom
      `CodingLoopRunner` (insertion-mode `Ulangi ×N` block, no nesting). Interpreter is
      now a step tree (`CodingStep`); `countBlocks` rewards loops. Runner chosen by
      `level.concept` in `pages/coding/[id].vue`. Next: nested loops + more levels.
- [x] **Collectibles world "Berburu Permata"** — new win condition (collect all
      gems 'C' then reach goal); interpreter tracks collected per-frame, PuzzleGrid
      renders/animates gems. 6 levels. Reuses the sequencing runner.
- [x] **Phase 2 — Conditionals & functions (ages 9-12)** — engine supports `if`/`if-else`
      (`CodingIfStep`), `call` + a single "Fungsi A" (`CodingCallStep`), and
      `runProgram(..., haltOnGoal)` for "repeat until goal". Two worlds: "Fungsi Ajaib"
      (`concept: 'function'`, constrained build-A + Ulangi N × Panggil A → `CodingFuncRunner`)
      and "Jika… Kalau Tidak…" (`concept: 'conditional'`, pick then/else → `CodingIfRunner`).
      Solutions validated in `tests/codeRunner.test.ts`. Next: free-form builder with
      nested if inside a loop; more levels; `gem-here` conditional puzzles.
- [x] **Step-through execution** ("Jalan Langkah-demi-Langkah") — 👣 Langkah button
      runs the program one command at a time; the executing chip is highlighted in the
      sequence runner. Mode `edit`/`step`/`auto` in `CodingLevelRunner` & `CodingLoopRunner`.
- [ ] **More level content** — keep growing each world (aim ~8-10 levels/world) and
      combine mechanics (loops + gems).
- [x] **Order-the-steps game** ("Urutkan Langkah") — a DIFFERENT game format (not a
      grid reskin): arrange scrambled step cards. `CodingOrderLevel` (kind: 'order') +
      `CodingOrderRunner`. Levels can now have distinct game kinds via `level.kind`.
- [x] **Predict-the-output game** ("Tebak Hasil") — read a program, tap the cell where the
      robot stops. `CodingPredictLevel` (kind: 'predict') + `CodingPredictRunner` +
      tappable `PuzzleGrid` markers. 5 levels.
- [x] **Find-the-bug game** ("Cari Bug" 🐞) — an almost-correct program with ONE wrong
      command; the child taps the bug then picks the right replacement. `CodingBugLevel`
      (kind: 'bug') + `CodingBugRunner` + `data/coding/bug`. Invariant tested: buggy fails,
      fix succeeds.
- [ ] **More distinct game formats** (each its own component, NOT grid reskins):
      pattern-complete, maze first-person. Consider reworking "Berburu Permata".
- [x] **Coding on Kemajuan & certificate** — Kemajuan shows a coding progress card
      (stars, levels done, progress bar); a Coding certificate issues once every level is
      complete (`codingService.allCompleted/completedCount/maxStars`). Next: fold coding
      stars into `badgeService` so coding contributes to badges too.
- [ ] **Phase 3** — unlockable free-play sandbox as a reward; variables.

### P2 — Differentiators & polish

- [x] **Legal & compliance pages** — `/privasi` (Privacy) & `/ketentuan` (Terms) via a shared
      `<LegalDocument>`; honest client-only stance (no data leaves the device; COPPA/GDPR-K +
      UU PDP 27/2022, data-rights & security sections). Linked in footer + sitemap; SEO enriched.
- [x] **HTTP security headers** — CSP + X-Frame-Options/X-Content-Type-Options/Referrer-Policy/
      Permissions-Policy/HSTS via `routeRules` in `nuxt.config.ts`. Update CSP when adding new
      external sources. **Still TODO: set the real `CONTACT_EMAIL`** in the legal pages before launch.

- [ ] **Sempoa / mental arithmetic mode** — animate abacus beads → hide → answer.
      Strong local marketing hook; visualization translates well to screen.
- [ ] **Parent progress report** — extend certificates into a shareable report
      (parents value prestasi/achievement signals).
- [ ] **Dark Mode** — needs a dedicated refactor of SCSS tokens to CSS variables
      (many `rgba($token, a)` usages cannot take CSS vars in Sass). Large; deferred.
- [ ] **Multi-profile** — several children per device (per-profile localStorage
      namespacing + profile switcher).
- [x] **More content (round 1)** — Science: plants, weather, states of matter · English:
      school, home, vegetables · Reading: syllables SA/TA + more words. Keep going:
      more consonant families (na/pa/da/ka…), longer words & short stories, more themes.

---

## Backend migration (future — currently 100% localStorage)

**Yes, this is feasible without rewriting the UI.** The app was built so that all
persistence is already behind the `services/` layer — components never touch
`localStorage` directly. To move to a backend:

1. **Introduce a persistence adapter (repository).** Add `services/persistence/` with
   two implementations behind one interface: `LocalStorageAdapter` (today) and
   `ApiAdapter` (fetch to backend). Services call the adapter, not `storage` directly.
2. **Make the reads async-ready.** Progress/stars/streak/coding reads are sync today.
   Wrap them in composables that already return refs (`useProgress`, etc.), so switching
   to `await api.get()` + hydration only changes the composable/service internals.
3. **Auth + profiles.** A backend enables real accounts → replaces the Export/Import
   backup and unlocks true multi-device sync + multi-profile.
4. **Keep offline-first.** Use the adapter to write-through to localStorage as a cache,
   sync to the API when online (PWA already set up). No data loss offline.
5. **Migration path.** On first login, push existing localStorage data to the backend
   (reuse `backupService.export()` as the payload shape).

Prep tasks to queue:

- [ ] Extract a `PersistenceAdapter` interface; route `progressService`, `streakService`,
      `mistakeService`, `drillService`, `codingService`, `profileService` through it.
- [ ] Define the API contract (endpoints/DTOs) — mirror `backupService` JSON shape.
- [ ] Add env-gated `ApiAdapter` (no-op until a backend URL is set).

## Guardrails (always green)

- **Every material is unique** — `tests/uniqueness.test.ts` fails the build if any two
  lessons/coding levels share an id OR identical content. When adding material, give it
  genuinely new content (e.g. Listen/Spell lessons use DIFFERENT words than the vocab
  lesson they relate to).

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
