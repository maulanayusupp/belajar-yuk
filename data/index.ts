import type { Lesson } from '~/types'
import { subjects } from './subjects'
import { englishLessons } from './english'
import { mathLessons } from './math'
import { scienceLessons } from './science'

// =============================================================
//  Titik masuk tunggal untuk SEMUA konten.
//  Komponen & service cukup import dari '~/data'.
//
//  Struktur folder:
//    data/
//      subjects.ts          -> daftar mata pelajaran
//      english/             -> 1 file per pelajaran + index.ts (urutan)
//      math/                -> 1 file per pelajaran + index.ts (urutan)
//      index.ts             -> file ini (agregat)
// =============================================================

export { subjects, englishLessons, mathLessons, scienceLessons }

// Gabungan semua pelajaran dari seluruh mata pelajaran.
export const allLessons: Lesson[] = [...englishLessons, ...mathLessons, ...scienceLessons]
