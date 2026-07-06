# CLAUDE.md

Panduan untuk Claude (dan developer) saat bekerja di repo ini. Baca dulu
sebelum menulis kode agar gaya tetap konsisten.

## Tentang Proyek

**Belajar Yuk!** — platform belajar **Bahasa Inggris** & **Matematika** untuk
anak usia **6+**. Bilingual (instruksi Bahasa Indonesia, materi Bahasa Inggris),
penuh animasi & suara. Tampilan bergaya **premium**.

**Stack:** Nuxt 3 (SSR) · Vue 3 `<script setup>` · TypeScript · SCSS.

## Perintah

```bash
npm run dev       # dev server http://localhost:3000
npm run build     # build produksi (WAJIB lolos sebelum selesai — menangkap error SCSS/TS)
npm run preview   # pratinjau hasil build
```

> Verifikasi perubahan dengan menjalankan `npm run build`. Bila ada dev server
> yang masih jalan, hentikan dulu (atau `NUXT_IGNORE_LOCK=1`).

## Arsitektur & Lapisan

Alur data satu arah — jangan dilompati:

```
data/ (konten)  →  services/ (logika)  →  composables/ (reaktif)  →  components/ (UI)
                        ↑ utils/ (helper murni)   ↑ types/ (kontrak data)
```

| Folder | Isi | Aturan |
|---|---|---|
| `data/` | Konten pelajaran (**1 materi = 1 folder** + `index.ts` agregat) | Data murni, tanpa logika. Lihat `data/README.md` |
| `services/` | `lessonService`, `progressService`, `audioService` | Logika bisnis. Komponen akses data HANYA lewat sini |
| `composables/` | `useAudio`, `useProgress`, `useConfetti` | Pembungkus reaktif Vue untuk services |
| `utils/` | `array`, `math`, `storage` | Fungsi murni, tanpa efek samping (kecuali `storage`) |
| `types/` | Semua `interface`/`type` | Sumber tunggal bentuk data |
| `components/` | UI | Lihat konvensi di bawah |
| `pages/[subject]/` | Routing dinamis: `/english`, `/math`, `/:subject/:id` | Validasi subject; `createError` 404 bila tidak ada |

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
- Suara lewat `useAudio()` → `play('correct'|'wrong'|'click'|'win'|'pop')` &
  `speak(teks, lang)`. Tanpa file audio (Web Speech + Web Audio API). Hormati status `muted`.
- Animasi reusable sebagai keyframes di `assets/scss/base/_animations.scss`
  (mis. `bounce-in`, `pop`, `float`, `rise-in`, `shimmer`). Tambah di sini bila perlu.

## Cara Menambah Konten (tanpa sentuh logika)

Konten terpusat di `data/` dengan pola **1 materi = 1 folder** (berisi `index.ts`,
plus aset opsional pelajaran itu). Detail & contoh: `data/README.md`.

- **Pelajaran Inggris** → buat folder baru di `data/english/<nama>/index.ts`
  (export `EnglishLesson`), lalu daftarkan di `data/english/index.ts`.
- **Pelajaran Matematika** → buat folder baru di `data/math/<nama>/index.ts`
  (export `MathLesson`), lalu daftarkan di `data/math/index.ts`.
- **Metode Matematika baru** → tambah nilai `MathMethod` di `types/`, tambah cabang
  render di `components/math/SingaporeLesson.vue`, buat komponen visual bila perlu.
- **Mata pelajaran baru** → tambah di `data/subjects.ts` + `SubjectId`/tipe terkait,
  buat folder mata pelajaran (pola sama), lalu ekspor dari `data/index.ts`.
- Semua konten diakses lewat `~/data` (agregat) → `services/lessonService.ts`.
  `id` pelajaran WAJIB unik (dipakai untuk URL & progres). Impor `./<nama>`
  otomatis mengarah ke `<nama>/index.ts`.

## SEO & Aset

- Meta/OG global diatur di `nuxt.config.ts` (`app.head`). Judul default memakai
  `titleTemplate`. Tiap halaman set judul via `useHead`/`useSeoMeta`.
- **Ganti `SITE_URL` di `nuxt.config.ts` dengan domain produksi** — dipakai untuk
  URL absolut `og:image` (wajib absolut agar preview WhatsApp/Twitter muncul).
- Aset di `public/`: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`,
  `og-image.png` (1200×630, preview share). Regenerasi: `node scripts/generate-assets.mjs`.

## Yang TIDAK boleh
- Menaruh nilai warna/ukuran hardcoded di komponen (pakai token).
- Inline `style` untuk styling statis (hanya untuk CSS custom property dinamis).
- Komponen mengimpor file `data/` langsung (lewat `services/`).
- Menyelesaikan tugas tanpa `npm run build` lolos.
