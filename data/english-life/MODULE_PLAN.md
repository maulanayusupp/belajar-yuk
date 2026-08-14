# English for Life — Modul Bahasa Inggris (Pemula → Jagoan)

Modul **TERPISAH** (subject id `english-life`, route `/english-life`, tema teal 🌍):
bahasa Inggris praktis yang **dipakai sehari-hari, di tempat kerja, bepergian
(travelling), dan ungkapan yang sering diucapkan**. Fokus pada bahasa yang berguna,
bukan sekadar daftar kata.

Format: setiap materi = 1 folder `data/english-life/<slug>/index.ts` (`EnglishLesson`
dengan `subject: 'english-life'`), didaftarkan di `data/english-life/index.ts`. Runner
memakai ulang komponen English. Semua materi harus **unik** (`tests/uniqueness.test.ts`).

**Tingkat khusus modul ini** (tangga kemahiran, TANPA patokan usia — dari `levelsFor`
di `data/levels.ts`): **Pemula** (beginner) → **Menengah** (intermediate) →
**Mahir** (advanced) → **Jagoan** (expert). Ramp difokuskan naik dari kata dasar →
kalimat & situasi → dunia nyata → fasih (idiom, phrasal verb, frasa kerja).

---

## PEMULA — Kata & frasa paling dasar

1. **Kegiatan Harian** `daily-routine` · vocabulary
2. **Peralatan Makan** `kitchen` · vocabulary
3. **Kamar Mandi** `bathroom` · vocabulary
4. **Bulan dalam Setahun** `months` · vocabulary
5. **Tempat di Kota** `places-town` · vocabulary

## MENENGAH — Mendeskripsikan & kalimat sederhana

6. **Kata Kerja Aksi** `action-verbs` · vocabulary
7. **Kata Sifat** `adjectives` · vocabulary
8. **Letak & Posisi** `positions` · vocabulary
9. **Perasaan Lanjutan** `more-feelings` · vocabulary
10. **Menyimak: Isi Rumah** `listen-home` · listening
11. **Kalimat Sehari-hari** `sentence-daily` · sentence

## MAHIR — Situasi dunia nyata

12. **Di Bandara & Travelling** `travel-airport` · vocabulary
13. **Di Hotel** `hotel` · vocabulary
14. **Di Restoran** `restaurant` · vocabulary
15. **Belanja & Uang** `shopping-money` · vocabulary
16. **Di Kantor & Kerja** `office-work` · vocabulary
17. **Petunjuk Arah** `directions` · vocabulary
18. **Kesehatan & Dokter** `health` · vocabulary

## JAGOAN — Fasih & tingkat lanjut

19. **Frasa Sopan** `phrases-polite` · sentence
20. **Frasa saat Bepergian** `phrases-travel` · sentence
21. **Phrasal Verb** `phrasal-verbs` · vocabulary
    (turn on/off, look for, give up, find out, run out, put on, take off)
22. **Idiom Populer** `idioms` · vocabulary
    (piece of cake, break a leg, under the weather, hit the books, once in a blue moon, call it a day)
23. **Frasa Kantor** `business-phrases` · sentence
24. **Situasi Perjalanan** `travel-situations` · sentence

---

**Total: 24 materi** — tangga kemahiran nyata dari Pemula sampai Jagoan. Tingkat
Jagoan sengaja berisi bahasa tingkat lanjut (idiom, phrasal verb, frasa kerja &
situasi perjalanan) agar benar-benar mahir, bukan sekadar kosakata dasar.
