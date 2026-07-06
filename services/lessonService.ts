import type {
  EnglishActivity,
  EnglishLesson,
  Lesson,
  Level,
  MathLesson,
  MathMethod,
  SubjectId,
} from '~/types'
import { allLessons, subjects } from '~/data'
import { mathMethodMeta, type MathMethodMeta } from '~/data/math/methods'
import { englishActivityMeta, type EnglishActivityMeta } from '~/data/english/methods'
import { levels, type LevelMeta } from '~/data/levels'

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

  /** Metadata (ikon/label/instruksi) sebuah metode Matematika. */
  getMathMethodMeta(method: MathMethod): MathMethodMeta {
    return mathMethodMeta[method]
  },

  /** Daftar metode Matematika yang benar-benar dipakai oleh pelajaran. */
  getUsedMathMethods(): Array<{ method: MathMethod } & MathMethodMeta> {
    const used = new Set<MathMethod>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'math') used.add(lesson.method)
    }
    return [...used].map((method) => ({ method, ...mathMethodMeta[method] }))
  },

  /** Metadata (ikon/label) sebuah jenis aktivitas Bahasa Inggris. */
  getEnglishActivityMeta(activity: EnglishActivity): EnglishActivityMeta {
    return englishActivityMeta[activity]
  },

  /** Daftar jenis aktivitas Bahasa Inggris yang dipakai pelajaran. */
  getUsedEnglishActivities(): Array<{ activity: EnglishActivity } & EnglishActivityMeta> {
    const used = new Set<EnglishActivity>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'english') used.add(lesson.type)
    }
    return [...used].map((activity) => ({ activity, ...englishActivityMeta[activity] }))
  },

  /** Metadata tingkat (Pemula/Menengah/Mahir). */
  getLevels(): LevelMeta[] {
    return levels
  },

  getLevelMeta(level: Level): LevelMeta {
    return levels.find((l) => l.id === level) ?? levels[0]
  },

  /**
   * Pelajaran satu mata pelajaran dikelompokkan per tingkat (untuk kategori
   * di halaman pelajaran). Hanya tingkat yang berisi pelajaran yang dikembalikan.
   */
  getLessonsGrouped(subject: SubjectId): Array<{ meta: LevelMeta; lessons: Lesson[] }> {
    const lessons = this.getLessons(subject)
    return levels
      .map((meta) => ({ meta, lessons: lessons.filter((l) => l.level === meta.id) }))
      .filter((group) => group.lessons.length > 0)
  },

  /** Label + ikon "tag" metode/aktivitas sebuah pelajaran (untuk kartu). */
  getLessonTag(lesson: Lesson): { icon: string; label: string } {
    if (lesson.subject === 'math') {
      const meta = mathMethodMeta[lesson.method]
      return { icon: meta.icon, label: meta.label }
    }
    const meta = englishActivityMeta[lesson.type]
    return { icon: meta.icon, label: meta.label }
  },
}
