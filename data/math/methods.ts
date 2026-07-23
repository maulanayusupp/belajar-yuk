import type { MathMethod } from '~/types'

// =============================================================
//  Registry metadata for Math METHODS (dynamic content engine).
//  A single place for the icon, label, instruction, & EXPLANATION of the
//  difference between the step-by-step method and the usual way.
//
//  ➕ Adding a new method:
//    1. Add a value to `MathMethod` (types/index.ts).
//    2. Add an entry here (icon + label + instruction + smartWay + usualWay).
//    3. Add a visual render branch in components/math/MethodLesson.vue.
//  The UI (home, cards, header, mascot, explanation panel) follows automatically.
// =============================================================

export interface MathMethodMeta {
  /** Emoji icon for the method. */
  icon: string
  /** Short name of the method. */
  label: string
  /** Short description (for the home/methods section). */
  description: string
  /** Mascot instruction (Indonesian). */
  instruction: string
  /** How the step-by-step method teaches it (its strengths). */
  smartWay: string
  /** How the usual/traditional way teaches it (its limitations). */
  usualWay: string
}

export const mathMethodMeta: Record<MathMethod, MathMethodMeta> = {
  counting: {
    icon: '🔢',
    label: 'Menghitung Benda',
    description: 'Anak menghitung benda satu per satu untuk mengenal jumlah.',
    instruction: 'Hitung bendanya satu per satu. Ada berapa?',
    smartWay:
      'Anak menghitung benda nyata sambil menunjuk, sehingga paham bahwa angka mewakili "jumlah" yang bisa dilihat & disentuh.',
    usualWay:
      'Anak menghafal urutan "satu, dua, tiga…" tanpa benda, sering tanpa paham arti angkanya.',
  },
  'number-bond': {
    icon: '🔗',
    label: 'Ikatan Bilangan',
    description: 'Number Bond: melihat bilangan utuh terbentuk dari dua bagian.',
    instruction: 'Gabungkan dua bagian ini. Berapa jumlah seluruhnya?',
    smartWay:
      'Anak melihat satu angka sebagai gabungan dua bagian (5 = 2 dan 3), membangun pemahaman hubungan antar-angka yang fleksibel.',
    usualWay: 'Anak menghafal fakta "2 + 3 = 5" satu per satu tanpa memahami hubungannya.',
  },
  'block-addition': {
    icon: '🧱',
    label: 'Penjumlahan Blok',
    description: 'Pendekatan Concrete–Pictorial–Abstract: hitung blok nyata dulu.',
    instruction: 'Hitung semua bloknya. Ada berapa jumlahnya?',
    smartWay:
      'Bertahap: dari blok nyata (concrete) → gambar (pictorial) → angka (abstract), sehingga konsep tertanam sebelum simbol.',
    usualWay:
      'Langsung ke angka & simbol; anak sering berhitung di jari atau menghafal tanpa gambaran.',
  },
  'block-subtraction': {
    icon: '➖',
    label: 'Pengurangan Blok',
    description: 'Ambil sebagian blok untuk memahami konsep pengurangan.',
    instruction: 'Blok yang dicoret sudah diambil. Berapa sisanya?',
    smartWay:
      'Anak melihat langsung proses "mengambil" dari sekumpulan benda, jadi paham makna pengurangan.',
    usualWay: 'Anak berhitung mundur atau menghafal hasil tanpa membayangkan apa yang terjadi.',
  },
  'ten-frame': {
    icon: '🔟',
    label: 'Sepuluh Kotak',
    description: 'Ten Frame: melihat bilangan dalam kerangka 10 untuk membangun rasa angka.',
    instruction: 'Lihat titik di dalam kotak. Ada berapa jumlahnya?',
    smartWay:
      'Kerangka 10 membantu anak "melihat" angka & pasangannya menuju 10 (mis. 7 butuh 3 lagi), membangun rasa angka.',
    usualWay: 'Anak menghafal angka tanpa gambaran terhadap 10, sehingga sulit berhitung cepat.',
  },
  'number-line': {
    icon: '📏',
    label: 'Garis Bilangan',
    description: 'Mengenali posisi angka pada garis bilangan — dasar penjumlahan lanjut.',
    instruction: 'Lihat penanda di garis. Ada di angka berapa?',
    smartWay:
      'Anak melihat angka punya posisi & jarak, dasar untuk menambah/mengurang dengan "melompat" di garis.',
    usualWay: 'Anak menghafal urutan angka tanpa memahami jarak & hubungan antar-angka.',
  },
  'missing-number': {
    icon: '❓',
    label: 'Cari Bilangan Hilang',
    description: 'Menemukan bagian yang hilang (mis. 7 + ▢ = 12) — berpikir mundur.',
    instruction: 'Berapa bilangan yang hilang agar benar?',
    smartWay:
      'Anak memahami hubungan bagian–keseluruhan sehingga bisa mencari bagian yang hilang, bukan hanya menjumlah maju.',
    usualWay:
      'Anak hanya terlatih menjumlah dari kiri ke kanan, bingung bila yang ditanya di tengah.',
  },
  compare: {
    icon: '⚖️',
    label: 'Membandingkan',
    description: 'Menentukan mana lebih besar, lebih kecil, atau sama (>, <, =).',
    instruction: 'Mana yang benar: lebih besar, lebih kecil, atau sama?',
    smartWay:
      'Anak membandingkan kuantitas nyata (mis. dua kelompok benda) sebelum memakai simbol >, <, =.',
    usualWay: 'Anak menghafal arah simbol tanpa memahami makna "lebih banyak / lebih sedikit".',
  },
  pattern: {
    icon: '🔢',
    label: 'Pola Bilangan',
    description: 'Melanjutkan pola & loncat bilangan (2, 4, 6, …) — melatih berpikir logis.',
    instruction: 'Lihat polanya. Angka berapa selanjutnya?',
    smartWay:
      'Anak menemukan aturan di balik urutan angka (loncat berapa), bukan sekadar menghafal — dasar berpikir aljabar.',
    usualWay: 'Anak hanya menghafal urutan angka tanpa melihat pola/loncatannya.',
  },
  clock: {
    icon: '🕐',
    label: 'Membaca Jam',
    description: 'Membaca jam bulat (pukul berapa?) — matematika untuk kehidupan sehari-hari.',
    instruction: 'Lihat jarum jamnya. Pukul berapa sekarang?',
    smartWay:
      'Anak membaca jam analog sungguhan dan mengaitkannya dengan kegiatan sehari-hari, bukan hanya angka.',
    usualWay: 'Anak hanya membaca jam digital tanpa memahami posisi jarum jam.',
  },
}
