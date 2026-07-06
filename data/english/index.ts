import type { EnglishLesson } from '~/types'
import { phonics } from './phonics'
import { animals } from './animals'
import { fruits } from './fruits'
import { colors } from './colors'
import { numbers } from './numbers'
import { body } from './body'
import { shapes } from './shapes'
import { family } from './family'
import { food } from './food'
import { days } from './days'
import { verbs } from './verbs'
import { greetings } from './greetings'
import { opposites } from './opposites'
import { jobs } from './jobs'

// Daftar & URUTAN pelajaran Bahasa Inggris (pemula → mahir).
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru berisi `index.ts` yang meng-export EnglishLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
export const englishLessons: EnglishLesson[] = [
  // Pemula
  phonics,
  animals,
  fruits,
  colors,
  numbers,
  body,
  shapes,
  // Menengah
  family,
  food,
  days,
  verbs,
  // Mahir
  greetings,
  opposites,
  jobs,
]
