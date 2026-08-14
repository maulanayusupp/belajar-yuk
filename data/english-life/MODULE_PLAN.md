# English for Life — Modul Bahasa Inggris (Pemula → Jagoan)

Modul **TERPISAH** (subject id `english-life`, route `/english-life`, tema teal 🌍):
bahasa Inggris praktis yang **dipakai sehari-hari, di tempat kerja, bepergian
(travelling), dan ungkapan yang sering diucapkan**. Fokus pada bahasa yang berguna,
bukan sekadar daftar kata.

Format: setiap materi = 1 folder `data/english-life/<slug>/index.ts` (`EnglishLesson`
dengan `subject: 'english-life'`), didaftarkan di `data/english-life/index.ts`. Runner
memakai ulang komponen English. Semua materi harus **unik** (`tests/uniqueness.test.ts`).

**Tingkat = band CEFR** (bukan usia; bukan sekadar jenis soal) — dari `levelsFor` di
`data/levels.ts`: **Pemula = A1** → **Menengah = A2** → **Mahir = B1** →
**Jagoan = B2–C1**. Materi ditempatkan sesuai level ISI-nya menurut CEFR (mis. preposisi
tempat = A1, phrasal verb dasar = B1, idiom = B2–C1). Badge kartu menampilkan band-nya.

**Jenis soal juga naik per tingkat** (bukan patokan tingkat, tapi memperkuatnya):
Pemula banyak `vocabulary`; Menengah menambah `listening`/`sentence`/`fill-blank`/
`dialogue`/`comprehension`; Mahir menambah `spelling`; Jagoan `sentence`+idiom+`dialogue`.
Jenis `fill-blank`/`dialogue`/`comprehension` memakai satu runner `EnglishQuizLesson`
(baca `prompt` → pilih jawaban teks; data di `item.prompt/options/answer`).

---

## PEMULA — A1 (kata & frasa paling dasar)

1. **Kegiatan Harian** `daily-routine` · vocabulary
2. **Peralatan Makan** `kitchen` · vocabulary
3. **Kamar Mandi** `bathroom` · vocabulary
4. **Bulan dalam Setahun** `months` · vocabulary
5. **Tempat di Kota** `places-town` · vocabulary
6. **Letak & Posisi** `positions` · vocabulary — preposisi tempat (A1)

## MENENGAH — A2 (mendeskripsikan, kalimat & percakapan sederhana)

7. **Kata Kerja Sehari-hari** `action-verbs` · listening
8. **Kata Sifat** `adjectives` · listening
9. **Perasaan Lanjutan** `more-feelings` · listening
10. **Menyimak: Isi Rumah** `listen-home` · listening
11. **Kalimat Sehari-hari** `sentence-daily` · sentence
12. **Isian: Kata Depan** `fill-prepositions` · fill-blank
13. **Percakapan Sehari-hari** `dialogue` · dialogue
14. **Baca Paham** `reading-story` · comprehension

## MAHIR — B1 (situasi dunia nyata & phrasal verb)

15. **Di Bandara & Travelling** `travel-airport` · spelling
16. **Di Hotel** `hotel` · spelling
17. **Di Restoran** `restaurant` · spelling
18. **Belanja & Uang** `shopping-money` · listening
19. **Di Kantor & Kerja** `office-work` · spelling
20. **Petunjuk Arah** `directions` · listening
21. **Kesehatan & Dokter** `health` · spelling
22. **Isian: Kata Kerja** `fill-verbs` · fill-blank
23. **Phrasal Verb** `phrasal-verbs` · vocabulary — B1 (turn on/off, look for, give up…)

## JAGOAN — B2–C1 (fasih, idiom & ungkapan lanjut)

24. **Frasa Sopan** `phrases-polite` · sentence
25. **Frasa saat Bepergian** `phrases-travel` · sentence
26. **Frasa Kantor** `business-phrases` · sentence
27. **Situasi Perjalanan** `travel-situations` · sentence
28. **Idiom Populer** `idioms` · vocabulary — B2 (piece of cake, break a leg…)
29. **Idiom Lanjutan** `idioms-advanced` · vocabulary — B2–C1 (cost an arm and a leg…)
30. **Beropini & Setuju** `opinions` · dialogue — B2 (agreeing/disagreeing)

---

**Total: 30 materi**, dipetakan ke band CEFR. Materi ditempatkan menurut level ISI-nya
(sumber: deskriptor CEFR) — preposisi/percakapan dasar = A1/A2, phrasal verb dasar = B1,
idiom = B2–C1 — supaya tingkat Jagoan benar-benar lanjutan, bukan sekadar tema berbeda.
