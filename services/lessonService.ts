import type {
  EnglishActivity,
  EnglishLesson,
  Lesson,
  Level,
  MathLesson,
  MathMethod,
  ScienceActivity,
  ScienceLesson,
  SubjectId,
} from '~/types'
import { allLessons, subjects } from '~/data'
import { mathMethodMeta, type MathMethodMeta } from '~/data/math/methods'
import { englishActivityMeta, type EnglishActivityMeta } from '~/data/english/methods'
import { scienceActivityMeta, type ScienceActivityMeta } from '~/data/science/methods'
import { levels, type LevelMeta } from '~/data/levels'
import { generateNumberOptions } from '~/utils/math'
import { shuffle } from '~/utils/array'

/** Soal untuk mode "Ulang Kesalahan" — MCQ ternormalisasi. */
export interface ReviewQuestion {
  lessonId: string
  itemId: string
  emoji: string // dikosongkan untuk soal aritmetika
  repeat: number // berapa kali emoji ditampilkan (mis. counting)
  prompt: string
  speak?: string // kata Inggris untuk diucapkan saat dijawab
  correct: string
  options: string[]
}

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

  /**
   * Rekomendasi pelajaran berikutnya: yang pertama belum selesai
   * (opsional difilter per mata pelajaran). `isCompleted` dari useProgress.
   */
  getNextLesson(isCompleted: (id: string) => boolean, subject?: SubjectId): Lesson | null {
    const list = this.getLessons(subject)
    return list.find((l) => !isCompleted(l.id)) ?? list[0] ?? null
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

  /** Ambil pelajaran Sains dengan tipe yang sudah dipersempit. */
  getScienceLesson(id: string): ScienceLesson | null {
    const lesson = this.getLesson(id)
    return lesson && lesson.subject === 'science' ? lesson : null
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

  /** Metadata (ikon/label) sebuah jenis aktivitas Sains. */
  getScienceActivityMeta(activity: ScienceActivity): ScienceActivityMeta {
    return scienceActivityMeta[activity]
  },

  /** Daftar jenis aktivitas Sains yang dipakai pelajaran. */
  getUsedScienceActivities(): Array<{ activity: ScienceActivity } & ScienceActivityMeta> {
    const used = new Set<ScienceActivity>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'science') used.add(lesson.type)
    }
    return [...used].map((activity) => ({ activity, ...scienceActivityMeta[activity] }))
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

  /** Tingkat yang belum memiliki pelajaran (untuk teaser "segera hadir"). */
  getUpcomingLevels(subject: SubjectId): LevelMeta[] {
    const filled = new Set(this.getLessonsGrouped(subject).map((g) => g.meta.id))
    return levels.filter((l) => !filled.has(l.id))
  },

  /**
   * Ubah daftar kesalahan (dari mistakeService) menjadi soal MCQ untuk diulang.
   * Soal yang tak bisa dirender mandiri (mis. garis bilangan) dilewati.
   */
  getReviewQuestions(mistakes: Array<{ lessonId: string; itemId: string }>): ReviewQuestion[] {
    const out: ReviewQuestion[] = []
    for (const { lessonId, itemId } of mistakes) {
      const lesson = this.getLesson(lessonId)
      if (!lesson) continue

      if (lesson.subject === 'english') {
        const item = lesson.items.find((i) => i.id === itemId)
        if (!item) continue
        const distractors = shuffle(lesson.items.filter((i) => i.id !== item.id))
          .slice(0, 3)
          .map((i) => i.word)
        out.push({
          lessonId,
          itemId,
          emoji: item.emoji,
          repeat: 1,
          prompt:
            lesson.type === 'phonics'
              ? 'Diawali huruf apa?'
              : `Apa Bahasa Inggris dari "${item.translation}"?`,
          speak: item.word,
          correct: item.word,
          options: shuffle([item.word, ...distractors]),
        })
      } else if (lesson.subject === 'science') {
        const fact = lesson.facts.find((f) => f.id === itemId)
        if (!fact) continue
        const distractors = shuffle(lesson.facts.filter((f) => f.id !== fact.id))
          .slice(0, 3)
          .map((f) => f.term)
        out.push({
          lessonId,
          itemId,
          emoji: '',
          repeat: 0,
          prompt: fact.clue,
          speak: fact.term,
          correct: fact.term,
          options: shuffle([fact.term, ...distractors]),
        })
      } else {
        const p = lesson.problems.find((i) => i.id === itemId)
        if (!p) continue
        if (lesson.method === 'compare') {
          const sym = p.operandA > p.operandB ? '>' : p.operandA < p.operandB ? '<' : '='
          out.push({
            lessonId,
            itemId,
            emoji: '',
            repeat: 0,
            prompt: `${p.operandA} ⬜ ${p.operandB}`,
            correct: sym,
            options: ['<', '=', '>'],
          })
          continue
        }
        const options = generateNumberOptions(p.answer).map(String)
        if (lesson.method === 'counting' && p.emoji) {
          out.push({
            lessonId,
            itemId,
            emoji: p.emoji,
            repeat: p.operandA,
            prompt: 'Ada berapa?',
            correct: String(p.answer),
            options,
          })
        } else if (p.operandB > 0 || p.operator === '-') {
          out.push({
            lessonId,
            itemId,
            emoji: '',
            repeat: 0,
            prompt: `${p.operandA} ${p.operator} ${p.operandB} = ?`,
            correct: String(p.answer),
            options,
          })
        }
        // metode number-line/ten-frame tanpa emoji: dilewati (butuh visual).
      }
    }
    return out
  },

  /** Label + ikon "tag" metode/aktivitas sebuah pelajaran (untuk kartu). */
  getLessonTag(lesson: Lesson): { icon: string; label: string } {
    if (lesson.subject === 'math') {
      const meta = mathMethodMeta[lesson.method]
      return { icon: meta.icon, label: meta.label }
    }
    if (lesson.subject === 'science') {
      const meta = scienceActivityMeta[lesson.type]
      return { icon: meta.icon, label: meta.label }
    }
    const meta = englishActivityMeta[lesson.type]
    return { icon: meta.icon, label: meta.label }
  },
}
