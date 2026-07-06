import type { EnglishLesson } from '~/types'
import { phonics } from './phonics'
import { phonicsGL } from './phonics-glm'
import { phonicsMR } from './phonics-mnr'
import { phonicsSZ } from './phonics-sz'
import { sightWords } from './sight-words'
import { feelings } from './feelings'
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
import { transport } from './transport'
import { weather } from './weather'
import { clothes } from './clothes'
import { nature } from './nature'

// Daftar & URUTAN pelajaran Bahasa Inggris (pemula → mahir).
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru berisi `index.ts` yang meng-export EnglishLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
// Semua materi saat ini setingkat Pemula (mekaniknya sama: kenali & pilih kata).
// Menengah & Mahir akan hadir lewat aktivitas yang lebih menantang (Listening, Eja, dll).
export const englishLessons: EnglishLesson[] = [
  // Fondasi membaca (phonics A–Z + kata umum)
  phonics,
  phonicsGL,
  phonicsMR,
  phonicsSZ,
  sightWords,
  // Kosakata bertema
  animals,
  fruits,
  colors,
  numbers,
  body,
  shapes,
  transport,
  weather,
  clothes,
  nature,
  family,
  food,
  days,
  verbs,
  feelings,
  greetings,
  opposites,
  jobs,
]
