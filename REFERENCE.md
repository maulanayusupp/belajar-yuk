# REFERENCE — Dasar Pedagogi Belajar Yuk!

Catatan **internal** tentang alasan di balik desain materi & mekanik Belajar Yuk!.
Ditulis dengan kata sendiri, fokus pada pendekatan kami — **tanpa tautan eksternal
atau menyebut produk/pihak lain**. Perbarui ringkas saat menambah/mengubah materi.

> Prinsip menyeluruh: **fokus pada _cara_ anak belajar**, bukan sekadar isi. Setiap
> materi harus jelas, bertahap, dan menumbuhkan rasa percaya diri sejak menit pertama.

## Filosofi "Cara Belajar" (lintas mapel)

- **Langkah kecil, naik bertahap.** Materi dipecah jadi potongan kecil yang bisa
  dikuasai satu per satu, dari mudah ke sulit — anak selalu merasa "aku bisa".
- **Kuasai dulu, baru lanjut.** Jawaban salah tidak menghukum; anak mengulang sampai
  paham (lihat `pages/ulangi` — kesalahan dikumpulkan untuk dilatih ulang).
- **Kecepatan + ketepatan.** Latihan berwaktu singkat (`Latihan Kilat`) melatih
  kelancaran berhitung, bukan sekadar benar.
- **Kebiasaan harian.** "Tugas Hari Ini" & streak membangun rutinitas belajar.
- **Ceritakan caramu.** Setelah selesai, anak diminta menjelaskan _bagaimana_ ia
  menyelesaikannya (`BaseReflectPrompt`) — metakognisi menguatkan pemahaman.
- **Belajar mandiri.** Umpan balik benar/salah jelas & langsung, sehingga anak bisa
  maju tanpa perlu ditunggui.

## Bahasa Inggris

- Mulai dari **fondasi bunyi (phonics)** dan **kosakata bertema** dengan gambar +
  suara, sebelum ke kata & kalimat.
- Aktivitas bertingkat: kenal kata → menyimak → mengeja → merangkai. Setiap materi
  memakai kata yang **berbeda** agar tidak ada pengulangan isi.
- **Modul "English for Life"** (beginner → mahir): kosakata & frasa yang benar-benar
  dipakai sehari-hari, di tempat kerja, saat bepergian, dan yang sering diucapkan —
  agar anak belajar bahasa yang berguna, bukan sekadar daftar kata. Rencana lengkap &
  daftar materi: `data/english/MODULE_PLAN.md`.

## Matematika

- Pendekatan **bertahap dari konkret ke abstrak**: benda/blok yang bisa "dilihat" →
  gambar/diagram → lambang bilangan. Anak paham _konsep_, bukan menghafal.
- Teknik yang dipakai (nama umum, deskriptif): _number bond_ (ikatan bilangan),
  _ten frame_ (sepuluh kotak), garis bilangan, blok penjumlahan/pengurangan,
  bilangan hilang, membandingkan bilangan, nilai tempat.
- Panel "Cara Belajar Yuk vs Cara Biasa" (`MethodInfo`) menjelaskan kelebihan tiap
  teknik dengan bahasa sederhana untuk orang tua.

## Sains

- **Kenali fakta → kuis.** Anak mengenal konsep/istilah lewat fakta singkat + emoji,
  lalu diuji dengan pertanyaan ringan. Pengelompokan (`group`) dipakai untuk membuat
  pilihan pengecoh yang masuk akal.

## Membaca (Bahasa Indonesia / Calistung)

- Urutan alami membaca: **huruf → suku kata → kata → kalimat**. Mode "rangkai"
  menyusun suku kata menjadi kata; suara memakai pembaca bahasa Indonesia.

## Coding

- Puzzle grid "pandu robot ke tujuan": anak menyusun perintah, menjalankannya, dan
  melihat hasilnya secara langsung — **self-teaching** (benar/salah jelas tanpa guru).
- Urutan konsep dari mudah ke sulit: **urutan perintah → perulangan → koleksi
  (permata) → membaca/menelusuri kode → mencari bug → kondisional → fungsi**.
- Tiap konsep bisa punya **bentuk permainan sendiri** (bukan sekadar grid yang sama)
  agar tetap menarik: susun kartu langkah, tebak hasil, cari bug, jika/kalau-tidak,
  dan fungsi. Detail teknis: lihat `CLAUDE.md` (bagian `pages/coding/`).

## Tingkatan (Tunas / Penjelajah / Juara)

Setiap materi diberi tingkat usia/kemampuan (`data/levels.ts`). Diferensiasi harus
**jujur**: naikkan tingkat hanya bila kesulitan/mekaniknya memang berbeda, bukan
sekadar berganti tema.

---

Diterapkan di: `data/**`, `utils/codeRunner.ts`, `services/**`, `components/**`.
Rencana pengembangan: `TODO.md`.
