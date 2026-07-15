import type { MathMethod } from '~/types'

// =============================================================
//  Registry metadata METODE Matematika (mesin materi dinamis).
//  Satu tempat untuk ikon, label, instruksi, & PENJELASAN beda
//  metode Singapore vs cara biasa.
//
//  ➕ Menambah metode baru:
//    1. Tambah nilai di `MathMethod` (types/index.ts).
//    2. Tambah entri di sini (icon + label + instruction + singaporeWay + usualWay).
//    3. Tambah cabang render visual di components/math/SingaporeLesson.vue.
//  UI (beranda, kartu, header, maskot, panel penjelasan) otomatis ikut.
// =============================================================

export interface MathMethodMeta {
  /** Ikon emoji untuk metode. */
  icon: string
  /** Nama singkat metode. */
  label: string
  /** Deskripsi singkat (untuk beranda/section metode). */
  description: string
  /** Instruksi maskot (Bahasa Indonesia). */
  instruction: string
  /** Cara metode Singapore mengajarkannya (kelebihannya). */
  singaporeWay: string
  /** Cara biasa/tradisional mengajarkannya (keterbatasannya). */
  usualWay: string
}

export const mathMethodMeta: Record<MathMethod, MathMethodMeta> = {
  counting: {
    icon: '🔢',
    label: 'Menghitung Benda',
    description: 'Anak menghitung benda satu per satu untuk mengenal jumlah.',
    instruction: 'Hitung bendanya satu per satu. Ada berapa?',
    singaporeWay:
      'Anak menghitung benda nyata sambil menunjuk, sehingga paham bahwa angka mewakili "jumlah" yang bisa dilihat & disentuh.',
    usualWay:
      'Anak menghafal urutan "satu, dua, tiga…" tanpa benda, sering tanpa paham arti angkanya.',
  },
  'number-bond': {
    icon: '🔗',
    label: 'Ikatan Bilangan',
    description: 'Number Bond: melihat bilangan utuh terbentuk dari dua bagian.',
    instruction: 'Gabungkan dua bagian ini. Berapa jumlah seluruhnya?',
    singaporeWay:
      'Anak melihat satu angka sebagai gabungan dua bagian (5 = 2 dan 3), membangun pemahaman hubungan antar-angka yang fleksibel.',
    usualWay: 'Anak menghafal fakta "2 + 3 = 5" satu per satu tanpa memahami hubungannya.',
  },
  'block-addition': {
    icon: '🧱',
    label: 'Penjumlahan Blok',
    description: 'Pendekatan Concrete–Pictorial–Abstract: hitung blok nyata dulu.',
    instruction: 'Hitung semua bloknya. Ada berapa jumlahnya?',
    singaporeWay:
      'Bertahap: dari blok nyata (concrete) → gambar (pictorial) → angka (abstract), sehingga konsep tertanam sebelum simbol.',
    usualWay:
      'Langsung ke angka & simbol; anak sering berhitung di jari atau menghafal tanpa gambaran.',
  },
  'block-subtraction': {
    icon: '➖',
    label: 'Pengurangan Blok',
    description: 'Ambil sebagian blok untuk memahami konsep pengurangan.',
    instruction: 'Blok yang dicoret sudah diambil. Berapa sisanya?',
    singaporeWay:
      'Anak melihat langsung proses "mengambil" dari sekumpulan benda, jadi paham makna pengurangan.',
    usualWay: 'Anak berhitung mundur atau menghafal hasil tanpa membayangkan apa yang terjadi.',
  },
  'ten-frame': {
    icon: '🔟',
    label: 'Sepuluh Kotak',
    description: 'Ten Frame: melihat bilangan dalam kerangka 10 untuk membangun rasa angka.',
    instruction: 'Lihat titik di dalam kotak. Ada berapa jumlahnya?',
    singaporeWay:
      'Kerangka 10 membantu anak "melihat" angka & pasangannya menuju 10 (mis. 7 butuh 3 lagi), membangun rasa angka.',
    usualWay: 'Anak menghafal angka tanpa gambaran terhadap 10, sehingga sulit berhitung cepat.',
  },
  'number-line': {
    icon: '📏',
    label: 'Garis Bilangan',
    description: 'Mengenali posisi angka pada garis bilangan — dasar penjumlahan lanjut.',
    instruction: 'Lihat penanda di garis. Ada di angka berapa?',
    singaporeWay:
      'Anak melihat angka punya posisi & jarak, dasar untuk menambah/mengurang dengan "melompat" di garis.',
    usualWay: 'Anak menghafal urutan angka tanpa memahami jarak & hubungan antar-angka.',
  },
  'missing-number': {
    icon: '❓',
    label: 'Cari Bilangan Hilang',
    description: 'Menemukan bagian yang hilang (mis. 7 + ▢ = 12) — berpikir mundur.',
    instruction: 'Berapa bilangan yang hilang agar benar?',
    singaporeWay:
      'Anak memahami hubungan bagian–keseluruhan sehingga bisa mencari bagian yang hilang, bukan hanya menjumlah maju.',
    usualWay:
      'Anak hanya terlatih menjumlah dari kiri ke kanan, bingung bila yang ditanya di tengah.',
  },
}
