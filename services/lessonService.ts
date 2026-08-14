import type {
  BahasaActivity,
  BahasaLesson,
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
import { bahasaActivityMeta, type BahasaActivityMeta } from '~/data/bahasa/methods'
import { levels, type LevelMeta } from '~/data/levels'
import { generateNumberOptions } from '~/utils/math'
import { shuffle } from '~/utils/array'

/** Question for the "Review Mistakes" mode — a normalized MCQ. */
export interface ReviewQuestion {
  lessonId: string
  itemId: string
  emoji: string // left empty for arithmetic questions
  repeat: number // how many times the emoji is shown (e.g. counting)
  prompt: string
  speak?: string // word to speak when answered correctly
  lang?: string // language for `speak` (default 'en-US'); 'id-ID' for Reading
  correct: string
  options: string[]
}

// Centralized lesson data source. Components do NOT access the data
// files directly — always go through this service. Easy to swap later
// to an API/CMS without changing components.

export const lessonService = {
  /** All subjects (for the home page). */
  getSubjects() {
    return subjects
  },

  getSubject(id: SubjectId) {
    return subjects.find((s) => s.id === id) ?? null
  },

  /** All lessons, optionally filtered by subject. */
  getLessons(subject?: SubjectId): Lesson[] {
    return subject ? allLessons.filter((l) => l.subject === subject) : allLessons
  },

  getLesson(id: string): Lesson | null {
    return allLessons.find((l) => l.id === id) ?? null
  },

  /**
   * Recommends the next lesson: the first one not yet completed
   * (optionally filtered by subject). `isCompleted` comes from useProgress.
   */
  getNextLesson(isCompleted: (id: string) => boolean, subject?: SubjectId): Lesson | null {
    const list = this.getLessons(subject)
    return list.find((l) => !isCompleted(l.id)) ?? list[0] ?? null
  },

  /** Get an English lesson with the type narrowed (core subject or the Life module). */
  getEnglishLesson(id: string): EnglishLesson | null {
    const lesson = this.getLesson(id)
    return lesson && (lesson.subject === 'english' || lesson.subject === 'english-life')
      ? lesson
      : null
  },

  /** Get a Math lesson with the type narrowed. */
  getMathLesson(id: string): MathLesson | null {
    const lesson = this.getLesson(id)
    return lesson && lesson.subject === 'math' ? lesson : null
  },

  /** Get a Science lesson with the type narrowed. */
  getScienceLesson(id: string): ScienceLesson | null {
    const lesson = this.getLesson(id)
    return lesson && lesson.subject === 'science' ? lesson : null
  },

  /** Get a Reading (Indonesian) lesson with the type narrowed. */
  getBahasaLesson(id: string): BahasaLesson | null {
    const lesson = this.getLesson(id)
    return lesson && lesson.subject === 'bahasa' ? lesson : null
  },

  /** Metadata (icon/label/instructions) for a Math method. */
  getMathMethodMeta(method: MathMethod): MathMethodMeta {
    return mathMethodMeta[method]
  },

  /** List of Math methods actually used by the lessons. */
  getUsedMathMethods(): Array<{ method: MathMethod } & MathMethodMeta> {
    const used = new Set<MathMethod>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'math') used.add(lesson.method)
    }
    return [...used].map((method) => ({ method, ...mathMethodMeta[method] }))
  },

  /** Metadata (icon/label) for an English activity type. */
  getEnglishActivityMeta(activity: EnglishActivity): EnglishActivityMeta {
    return englishActivityMeta[activity]
  },

  /** List of English activity types used by the lessons. */
  getUsedEnglishActivities(): Array<{ activity: EnglishActivity } & EnglishActivityMeta> {
    const used = new Set<EnglishActivity>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'english') used.add(lesson.type)
    }
    return [...used].map((activity) => ({ activity, ...englishActivityMeta[activity] }))
  },

  /** Metadata (icon/label) for a Science activity type. */
  getScienceActivityMeta(activity: ScienceActivity): ScienceActivityMeta {
    return scienceActivityMeta[activity]
  },

  /** List of Science activity types used by the lessons. */
  getUsedScienceActivities(): Array<{ activity: ScienceActivity } & ScienceActivityMeta> {
    const used = new Set<ScienceActivity>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'science') used.add(lesson.type)
    }
    return [...used].map((activity) => ({ activity, ...scienceActivityMeta[activity] }))
  },

  /** Metadata (icon/label) for a Reading activity type. */
  getBahasaActivityMeta(activity: BahasaActivity): BahasaActivityMeta {
    return bahasaActivityMeta[activity]
  },

  /** List of Reading activity types used by the lessons. */
  getUsedBahasaActivities(): Array<{ activity: BahasaActivity } & BahasaActivityMeta> {
    const used = new Set<BahasaActivity>()
    for (const lesson of allLessons) {
      if (lesson.subject === 'bahasa') used.add(lesson.type)
    }
    return [...used].map((activity) => ({ activity, ...bahasaActivityMeta[activity] }))
  },

  /** Level metadata (Beginner/Intermediate/Advanced). */
  getLevels(): LevelMeta[] {
    return levels
  },

  getLevelMeta(level: Level): LevelMeta {
    return levels.find((l) => l.id === level) ?? levels[0]
  },

  /**
   * Lessons of one subject grouped by level (for the categories on the
   * lesson page). Only levels that contain lessons are returned.
   */
  getLessonsGrouped(subject: SubjectId): Array<{ meta: LevelMeta; lessons: Lesson[] }> {
    const lessons = this.getLessons(subject)
    return levels
      .map((meta) => ({ meta, lessons: lessons.filter((l) => l.level === meta.id) }))
      .filter((group) => group.lessons.length > 0)
  },

  /** Levels that don't have lessons yet (for the "coming soon" teaser). */
  getUpcomingLevels(subject: SubjectId): LevelMeta[] {
    const filled = new Set(this.getLessonsGrouped(subject).map((g) => g.meta.id))
    return levels.filter((l) => !filled.has(l.id))
  },

  /**
   * Turn a list of mistakes (from mistakeService) into MCQ questions to review.
   * Questions that can't be rendered standalone (e.g. number line) are skipped.
   */
  getReviewQuestions(mistakes: Array<{ lessonId: string; itemId: string }>): ReviewQuestion[] {
    const out: ReviewQuestion[] = []
    for (const { lessonId, itemId } of mistakes) {
      const lesson = this.getLesson(lessonId)
      if (!lesson) continue

      if (lesson.subject === 'english' || lesson.subject === 'english-life') {
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
      } else if (lesson.subject === 'bahasa') {
        // Only review items that have an image as a cue (word/sentence);
        // letters/syllables need audio first → skipped (like the number line).
        const item = lesson.items.find((i) => i.id === itemId)
        if (!item || !item.emoji) continue
        const distractors = shuffle(lesson.items.filter((i) => i.id !== item.id && i.emoji))
          .slice(0, 3)
          .map((i) => i.text)
        if (distractors.length < 1) continue
        out.push({
          lessonId,
          itemId,
          emoji: item.emoji,
          repeat: 0,
          prompt: 'Pilih bacaan yang tepat',
          speak: item.text,
          lang: 'id-ID',
          correct: item.text,
          options: shuffle([item.text, ...distractors]),
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
        // number-line/ten-frame methods without an emoji: skipped (need a visual).
      }
    }
    return out
  },

  /** A lesson's method/activity "tag" label + icon (for cards). */
  getLessonTag(lesson: Lesson): { icon: string; label: string } {
    if (lesson.subject === 'math') {
      const meta = mathMethodMeta[lesson.method]
      return { icon: meta.icon, label: meta.label }
    }
    if (lesson.subject === 'science') {
      const meta = scienceActivityMeta[lesson.type]
      return { icon: meta.icon, label: meta.label }
    }
    if (lesson.subject === 'bahasa') {
      const meta = bahasaActivityMeta[lesson.type]
      return { icon: meta.icon, label: meta.label }
    }
    const meta = englishActivityMeta[lesson.type]
    return { icon: meta.icon, label: meta.label }
  },
}
