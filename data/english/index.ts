import type { EnglishLesson } from '~/types'
import { animals } from './animals'
import { fruits } from './fruits'
import { colors } from './colors'
import { numbers } from './numbers'
import { body } from './body'
import { phonics } from './phonics'

// Daftar & URUTAN pelajaran Bahasa Inggris.
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru di sini (mis. `colors/`) berisi `index.ts` yang
//      meng-export satu objek EnglishLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
export const englishLessons: EnglishLesson[] = [phonics, animals, fruits, colors, numbers, body]
