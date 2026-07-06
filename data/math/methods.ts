import type { MathMethod } from '~/types'

// =============================================================
//  Registry metadata METODE Matematika (mesin materi dinamis).
//  Satu tempat untuk ikon, label, & instruksi tiap metode.
//
//  ➕ Menambah metode baru:
//    1. Tambah nilai di `MathMethod` (types/index.ts).
//    2. Tambah entri di sini (icon + label + instruction).
//    3. Tambah cabang render visual di components/math/SingaporeLesson.vue.
//  UI (beranda, kartu, header, maskot) otomatis ikut dari registry ini.
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
}

export const mathMethodMeta: Record<MathMethod, MathMethodMeta> = {
  counting: {
    icon: '🔢',
    label: 'Menghitung Benda',
    description: 'Anak menghitung benda satu per satu untuk mengenal jumlah.',
    instruction: 'Hitung bendanya satu per satu. Ada berapa?',
  },
  'number-bond': {
    icon: '🔗',
    label: 'Ikatan Bilangan',
    description: 'Number Bond: melihat bilangan utuh terbentuk dari dua bagian.',
    instruction: 'Gabungkan dua bagian ini. Berapa jumlah seluruhnya?',
  },
  'block-addition': {
    icon: '🧱',
    label: 'Penjumlahan Blok',
    description: 'Pendekatan Concrete–Pictorial–Abstract: hitung blok nyata dulu.',
    instruction: 'Hitung semua bloknya. Ada berapa jumlahnya?',
  },
  'block-subtraction': {
    icon: '➖',
    label: 'Pengurangan Blok',
    description: 'Ambil sebagian blok untuk memahami konsep pengurangan.',
    instruction: 'Blok yang dicoret sudah diambil. Berapa sisanya?',
  },
  'ten-frame': {
    icon: '🔟',
    label: 'Sepuluh Kotak',
    description: 'Ten Frame: melihat bilangan dalam kerangka 10 untuk membangun rasa angka.',
    instruction: 'Lihat titik di dalam kotak. Ada berapa jumlahnya?',
  },
}
