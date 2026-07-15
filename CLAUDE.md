# CLAUDE.md

Panduan untuk Claude (dan developer) saat bekerja di repo ini. Baca dulu
sebelum menulis kode agar gaya tetap konsisten.

## Tentang Proyek

**Belajar Yuk!** — platform belajar **Bahasa Inggris**, **Matematika**, & **Sains**
untuk anak usia **6+**. Bilingual (instruksi Bahasa Indonesia, materi Bahasa Inggris),
penuh animasi & suara. Tampilan bergaya **premium**.

**Stack:** Nuxt 3 (SSR) · Vue 3 `<script setup>` · TypeScript · SCSS.

## Perintah

```bash
npm run dev       # dev server http://localhost:3000
npm run build     # build produksi (WAJIB lolos sebelum selesai — menangkap error SCSS/TS)
npm run preview   # pratinjau hasil build (uji PWA/offline di sini)
npm run lint      # ESLint (WAJIB bersih)
npm run format    # Prettier (rapikan) · format:check untuk cek
npm run test      # Vitest unit test (WAJIB lolos)
npm run test:e2e  # Playwright E2E (perlu `npx playwright install chromium` sekali)
npm run assets    # regenerasi favicon & OG image dari SVG
```

> **Sebelum menyelesaikan tugas: `npm run lint`, `npm run test`, dan `npm run build`
> harus lolos.** Bila ada dev server yang masih jalan, hentikan dulu (atau `NUXT_IGNORE_LOCK=1`).
>
> Catatan: ESLint memakai `Object.groupBy` (Node 21+); `eslint.config.mjs` sudah
> memuat polyfill agar jalan di Node 20. CI memakai Node 22.

## Arsitektur & Lapisan

Alur data satu arah — jangan dilompati:

```
data/ (konten)  →  services/ (logika)  →  composables/ (reaktif)  →  components/ (UI)
                        ↑ utils/ (helper murni)   ↑ types/ (kontrak data)
```

| Folder             | Isi                                                                                                                                                      | Aturan                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `data/`            | Konten pelajaran (**1 materi = 1 folder** + `index.ts` agregat)                                                                                          | Data murni, tanpa logika. Lihat `data/README.md`        |
| `services/`        | `lessonService`, `progressService`, `audioService`, `profileService`, `streakService`, `badgeService`, `musicService`, `mistakeService`, `backupService` | Logika bisnis. Komponen akses data HANYA lewat sini     |
| `composables/`     | `useAudio`, `useProgress`, `useConfetti`, `useProfile`, `useStreak`, `useShareCard`, `useMusic`, `useMistakes`, `useCertificate`, `useTextSize`          | Pembungkus reaktif Vue untuk services                   |
| `server/`          | Route Nitro: `sitemap.xml` (dari daftar pelajaran)                                                                                                       | SSR/endpoint; boleh impor `~/services`                  |
| `e2e/`             | Playwright (`*.spec.ts`) — smoke + cek anti-overflow                                                                                                     | `npm run test:e2e`; browser via `playwright install`    |
| `utils/`           | `array`, `math`, `storage`                                                                                                                               | Fungsi murni, tanpa efek samping (kecuali `storage`)    |
| `types/`           | Semua `interface`/`type`                                                                                                                                 | Sumber tunggal bentuk data                              |
| `components/`      | UI                                                                                                                                                       | Lihat konvensi di bawah                                 |
| `pages/[subject]/` | Routing dinamis: `/english`, `/math`, `/science`, `/:subject/:id`                                                                                        | Validasi subject; `createError` 404 bila tidak ada      |
| `pages/kemajuan`   | Dashboard: sapaan, streak, target harian, lencana, kartu share, rekomendasi, peta jalur                                                                  | `badgeService.all(stats)`, `useShareCard`, `DAILY_GOAL` |
| `pages/orangtua`   | Area Orang Tua: gerbang (7×8) → suara, profil, reset                                                                                                     | Reset via `resetAll` + `streak.reset`                   |
| `pages/tes`        | Tes penempatan (kuis singkat → rekomendasi mulai)                                                                                                        | Self-contained; skor → lesson rekomendasi               |
| `pages/ulangi`     | Ulang Kesalahan (mistakeService → ReviewQuiz)                                                                                                            | Benar = dihapus (dikuasai). Ala Kumon                   |
| `pages/sertifikat` | Sertifikat per mapel (terbit saat semua lesson tuntas) + cetak/bagikan                                                                                   | `Certificate` + `useCertificate` + print CSS            |
| `error.vue`        | Halaman error/404 global ramah-anak                                                                                                                      | Pakai `clearError({ redirect: '/' })`                   |
| `tests/`           | Unit test Vitest (`*.test.ts`)                                                                                                                           | Tes util & service (murni). Composable butuh env Nuxt   |
| `scripts/`         | `generate-assets.mjs` + SVG sumber (favicon, OG)                                                                                                         | Jalankan via `npm run assets`                           |
| `plugins/`         | `reveal`, `analytics.client`, `pwa-dev-cleanup.client`, `prefs.client` (teks besar)                                                                      | Client-only; hormati env & mode dev                     |

## Konvensi Kode

### Vue / TypeScript

- Selalu `<script setup lang="ts">`.
- Props & emits **wajib bertipe**: `defineProps<{...}>()`, `defineEmits<{...}>()`.
  Pakai `withDefaults` untuk nilai default.
- Impor tipe dari `~/types`; jangan definisikan ulang bentuk data di komponen.
- Komponen & composable diakses lewat **auto-import Nuxt** (tak perlu `import`).
  Services/utils/types **di-import eksplisit** dengan alias `~/`.

### Penamaan komponen (auto-import Nuxt = nama folder + file)

- `components/base/Button.vue` → `<BaseButton>`
- `components/layout/AppHeader.vue` → `<LayoutAppHeader>`
- `components/english/FlashCard.vue` → `<EnglishFlashCard>`
- `components/math/NumberBond.vue` → `<MathNumberBond>`
- `components/home/FeatureCard.vue` → `<HomeFeatureCard>`
- root `components/SubjectCard.vue` → `<SubjectCard>`
- **Jangan** ulangi prefix folder di nama file (hindari `<BaseBaseButton>`).

### Styling (PENTING)

- **Tanpa inline CSS.** Semua gaya di `<style scoped lang="scss">` atau file SCSS.
- **Pakai design token**, jangan nilai hardcoded. Warna/spacing/font/shadow/gradient
  ada di `assets/scss/abstracts/_variables.scss`.
- Token & mixin **auto-inject** ke setiap komponen (via `additionalData` di
  `nuxt.config.ts`) — langsung pakai `$color-primary`, `spacing('md')`,
  `font-size('lg')`, `@include glass`, dll. **tanpa `@use`**.
- Struktur SCSS:
  - `abstracts/` → variabel, fungsi, mixin (TIDAK menghasilkan CSS; di-`@forward` lewat `index.scss`).
  - `base/` → reset, tipografi, animasi, confetti, utilities (CSS global; di-`@use` di `main.scss`).
- **Nilai dinamis** (indeks animasi, posisi acak, persen) dikirim lewat **CSS custom
  property** via `:style="{ '--x': ... }"`, styling tetap di SCSS. Ini satu-satunya
  pengecualian penggunaan atribut `style`.
- Penamaan kelas: **BEM** (`.block__element--modifier`).
- Mixin premium tersedia: `glass`, `gradient-text`, `hover-lift`, `section-spacing`,
  `flex`, `flex-center`, `card`, `tappable`, `respond-to('md')`, `reduced-motion`.

### Aksesibilitas

- Beri `aria-label`/`role` pada kontrol; emoji dekoratif diberi `aria-hidden="true"`.
- Semua animasi harus hormati `prefers-reduced-motion` (sudah ditangani global di
  `_reset.scss` & mixin `reduced-motion`).

### Suara & Animasi

- Suara lewat `useAudio()`:
  - `play('correct'|'wrong'|'click'|'win'|'pop')` — efek suara (Web Audio API).
  - `pronounce(teks, audioUrl?, lang?)` — **titik masuk pengucapan**. Bila `audioUrl`
    diisi, mainkan file itu (dengan fallback ke sintesis bila gagal); bila kosong,
    pakai suara sintesis Google/Web Speech (**default**). Pakai ini untuk kata.
  - `speak(teks, lang)` — paksa suara sintesis (mis. instruksi maskot).
  - Semua hormati status `muted`. Materi bisa menambah `audioUrl` di `VocabularyItem`
    untuk audio eksternal (file/CDN) tanpa ubah kode.
- Animasi reusable sebagai keyframes di `assets/scss/base/_animations.scss`
  (mis. `bounce-in`, `pop`, `float`, `rise-in`, `shimmer`, `marquee`, `sparkle`). Tambah di sini.
- **Scroll-reveal**: directive `v-reveal` (dari `plugins/reveal.ts`, universal) — pakai
  `v-reveal` atau `v-reveal="150"` (jeda ms untuk stagger). Client-only, hormati reduced-motion.
- **Count-up angka**: komponen `HomeStat` (`components/home/Stat.vue`).

## Cara Menambah Konten (tanpa sentuh logika)

Konten terpusat di `data/` dengan pola **1 materi = 1 folder** (berisi `index.ts`,
plus aset opsional pelajaran itu). Detail & contoh: `data/README.md`.

- **Pelajaran Inggris** → buat folder baru di `data/english/<nama>/index.ts`
  (export `EnglishLesson`), lalu daftarkan di `data/english/index.ts`.
- **Pelajaran Matematika** → buat folder baru di `data/math/<nama>/index.ts`
  (export `MathLesson`), lalu daftarkan di `data/math/index.ts`.
- **Pelajaran Sains** → buat folder baru di `data/science/<nama>/index.ts`
  (export `ScienceLesson` berisi `facts: ScienceFact[]`), lalu daftarkan di
  `data/science/index.ts`. Runner: `components/science/ExploreLesson.vue`
  (Kenali fakta → Kuis). Tiap `ScienceFact` = `{ term, name, emoji, fact, clue, group? }`;
  `clue` dipakai sebagai pertanyaan kuis, `group` untuk distraktor/pengelompokan.
- **Metode Matematika baru** (mesin materi dinamis, 3 langkah):
  1. Tambah nilai di `MathMethod` (`types/index.ts`).
  2. Tambah entri metadata (ikon, label, deskripsi, instruksi, `singaporeWay`,
     `usualWay`) di `data/math/methods.ts` → UI (beranda, header, maskot, panel
     penjelasan `MathMethodInfo`) otomatis ikut. `MathMethodInfo` (di halaman lesson
     math) menampilkan perbandingan "Cara Singapore vs Cara Biasa".
  3. Tambah cabang render visual di `components/math/SingaporeLesson.vue`.
     Metode saat ini: `counting` (`problem.emoji`), `ten-frame` (`MathTenFrame`),
     `number-line` (`MathNumberLine`, jawaban = `operandA`), `number-bond`,
     `block-addition`, `block-subtraction` (prop `taken`), `missing-number`
     (jawaban = `operandB`; SingaporeLesson pakai computed `correctValue`), `compare`
     (operator `'compare'`, runner khusus `MathCompareLesson` — bukan SingaporeLesson).
- **Aktivitas Bahasa Inggris baru** (`vocabulary`/`phonics`/`listening`/`spelling`): tambah nilai
  di `EnglishActivity` (`types/`), entri di `data/english/methods.ts`, buat komponen runner
  (mis. `EnglishListeningLesson`, `EnglishSpellingLesson`), lalu cabang di `pages/[subject]/[id].vue` per `lesson.type`.
- **Tingkat (Pemula/Menengah/Mahir)**: set `level` pada tiap pelajaran. Metadata kategori
  di `data/levels.ts`. Halaman pelajaran mengelompokkan via `lessonService.getLessonsGrouped`;
  kartu menampilkan tag metode + badge tingkat via `lessonService.getLessonTag` & `getLevelMeta`.
  Tingkat kosong tampil sebagai teaser "segera hadir" (`getUpcomingLevels`).
  Catatan kejujuran: saat ini beda level hanya rentang angka (≤10 vs ≤20) untuk math;
  semua kosakata masih Pemula (mekanik sama). Diferensiasi kesulitan SEJATI (aktivitas
  berbeda: Listening/Eja untuk EN, soal abstrak/bagian-hilang untuk math) adalah pekerjaan
  lanjutan — jangan tandai Menengah/Mahir hanya karena beda tema.
- **Parameter/nilai baru tanpa ubah tipe inti** → pakai `meta?: Record<string, unknown>`
  di lesson (escape-hatch untuk eksperimen). Bila jadi permanen, angkat ke tipe eksplisit.
- **Mata pelajaran baru** → tambah di `data/subjects.ts` + `SubjectId`/tipe terkait,
  buat folder mata pelajaran (pola sama), lalu ekspor dari `data/index.ts`.
- Semua konten diakses lewat `~/data` (agregat) → `services/lessonService.ts`.
  `id` pelajaran WAJIB unik (dipakai untuk URL & progres). Impor `./<nama>`
  otomatis mengarah ke `<nama>/index.ts`.

## SEO & Aset

- Meta dasar (title, `titleTemplate`, keywords, favicon) di `nuxt.config.ts` (`app.head`).
- **Open Graph & Twitter** diatur di `app.vue` via `useSeoMeta`, memakai URL absolut
  dari `runtimeConfig.public.siteUrl` (`og:url`/canonical mengikuti halaman aktif).
- **Ganti `SITE_URL` di `nuxt.config.ts`** (atau env `NUXT_PUBLIC_SITE_URL`) dengan domain
  produksi — wajib absolut agar preview WhatsApp/Twitter muncul.
- Aset di `public/`: `favicon.svg/.ico`, `apple-touch-icon.png`, `icon-192/512.png`,
  `og-image.png` (1200×630). Sumber SVG di `scripts/`; regenerasi: `npm run assets`.
- **sitemap.xml** dibuat dinamis oleh `server/routes/sitemap.xml.ts`; `robots.txt` menunjuk ke sana.
- **JSON-LD** (EducationalOrganization) di `app.vue`.
- **Analitik** privasi (Plausible) opsional: set env `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` (lihat `plugins/analytics.client.ts`).

## PWA

- Diatur modul `@vite-pwa/nuxt` (`pwa` di `nuxt.config.ts`). Manifest & registrasi
  service worker otomatis. **SW hanya aktif di build produksi** (`devOptions.enabled: false`).
- Uji offline/install lewat `npm run preview` + Chrome DevTools → Application.
- Ikon manifest merujuk `public/icon-192.png` & `icon-512.png` (dari `npm run assets`).

## Testing & Kualitas

- Unit test di `tests/*.test.ts` (Vitest, env `happy-dom`). Alias `~`/`@` diset di
  `vitest.config.ts`. Uji **util & service** (murni) — jangan composable (butuh env Nuxt).
- Tambah materi/metode → tambah/junguat tes terkait bila relevan (mis. invariant di
  `tests/lessonService.test.ts` sudah cek `id` unik & konsistensi jawaban soal).
- **Audit kontras (WCAG AA)**: `tests/contrast.test.ts` + util `utils/color.ts`. Pasangan
  teks/latar inti wajib ≥ 4.5 (normal) / ≥ 3 (besar). Nilai hex HARUS sinkron dengan token SCSS.
- **Integritas data**: `tests/data-integrity.test.ts` (field wajib, id unik, jawaban konsisten).
- **E2E Playwright** di `e2e/*.spec.ts` (`playwright.config.ts`) — smoke + cek anti-overflow.
  `npm run test:e2e` (butuh `npx playwright install chromium` sekali; CI menginstal otomatis).
- ESLint (`eslint.config.mjs`, basis `@nuxt/eslint`) + Prettier (`.prettierrc`).
  Formatting = Prettier; kualitas = ESLint. Jalankan `npm run lint` & `npm run format`.

## Yang TIDAK boleh

- Menaruh nilai warna/ukuran hardcoded di komponen (pakai token).
- Inline `style` untuk styling statis (hanya untuk CSS custom property dinamis).
- Komponen mengimpor file `data/` langsung (lewat `services/`).
- Menyelesaikan tugas tanpa `npm run lint`, `npm run test`, & `npm run build` lolos.
