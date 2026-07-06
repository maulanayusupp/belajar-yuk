import type { EnglishLesson, Lesson, MathLesson, SubjectId } from '~/types'
import { allLessons, subjects } from '~/data'

// Sumber data pelajaran terpusat. Komponen TIDAK mengakses file
// data langsung — selalu lewat service ini. Nanti mudah diganti
// ke API/CMS tanpa mengubah komponen.

export const lessonService = {
  /** Semua mata pelajaran (untuk halaman utama). */
  getSubjects() {
    return subjects
  },

  getSubject(id: SubjectId) {
    return subjects.find((s) => s.id === id) ?? null
  },

  /** Semua pelajaran, opsional difilter per mata pelajaran. */
  getLessons(subject?: SubjectId): Lesson[] {
    return subject ? allLessons.filter((l) => l.subject === subject) : allLessons
  },

  getLesson(id: string): Lesson | null {
    return allLessons.find((l) => l.id === id) ?? null
  },

  /** Ambil pelajaran Bahasa Inggris dengan tipe yang sudah dipersempit. */
  getEnglishLesson(id: string): EnglishLesson | null {
    const lesson = this.getLesson(id)
    return lesson && lesson.subject === 'english' ? lesson : null
  },

  /** Ambil pelajaran Matematika dengan tipe yang sudah dipersempit. */
  getMathLesson(id: string): MathLesson | null {
    const lesson = this.getLesson(id)
    return lesson && lesson.subject === 'math' ? lesson : null
  },
}
