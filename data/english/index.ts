import type { EnglishLesson } from '~/types'
import { animals } from './animals'
import { fruits } from './fruits'

// Daftar & URUTAN pelajaran Bahasa Inggris.
//
// ➕ Menambah pelajaran baru:
//   1. Buat file baru di folder ini (mis. `colors.ts`) yang meng-export
//      satu objek EnglishLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
export const englishLessons: EnglishLesson[] = [animals, fruits]
