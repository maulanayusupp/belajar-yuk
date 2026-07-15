import type { ScienceLesson } from '~/types'
import { pancaIndra } from './panca-indra'
import { hewanHabitat } from './hewan-habitat'
import { tataSurya } from './tata-surya'

// Daftar & URUTAN pelajaran Sains (pemula → mahir).
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru berisi `index.ts` yang meng-export ScienceLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
export const scienceLessons: ScienceLesson[] = [
  // Pemula: dunia di sekitar kita
  pancaIndra,
  hewanHabitat,
  // Menengah: konsep lebih abstrak
  tataSurya,
]
