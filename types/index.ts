// =============================================================
//  Data contracts (types) — used across services, components,
//  and data. One place to define the shape of the data.
// =============================================================

export type SubjectId = 'english' | 'math' | 'science' | 'bahasa'

export type Level = 'beginner' | 'intermediate' | 'advanced'

/** Subject (card on the home page). */
export interface Subject {
  id: SubjectId
  /** Indonesian title (instruction for the child). */
  title: string
  /** English title. */
  titleEn: string
  emoji: string
  /** Theme color name: 'english' | 'math' | 'science' (mapped in SCSS). */
  theme: SubjectId
  description: string
}

/** A single word in an English lesson. */
export interface VocabularyItem {
  id: string
  word: string
  translation: string
  emoji: string
  /**
   * Image/illustration URL/path (optional). If set, this image is used
   * instead of the emoji — e.g. '/images/en/apple.png'.
   */
  image?: string
  /** A simple example sentence (optional). */
  example?: string
  /**
   * Pronunciation audio URL/path (optional). If set, this audio is
   * played; if empty, the synthesized voice is used (Google/Web Speech).
   * Example: '/audio/en/apple.mp3' or 'https://cdn.../apple.mp3'.
   */
  audioUrl?: string
}

/** Supported Math methods (easy to extend). */
export type MathMethod =
  | 'number-bond' // Number Bond (addition)
  | 'block-addition' // Addition with blocks (CPA)
  | 'block-subtraction' // Subtraction with blocks (take away/cross out)
  | 'counting' // Counting a number of objects
  | 'ten-frame' // Ten Frame
  | 'number-line' // Number Line (identify a number on the line)
  | 'missing-number' // Find the missing number (e.g. 7 + ▢ = 12)
  | 'compare' // Compare two numbers (>, <, =)

/** A single Math problem. */
export interface MathProblem {
  id: string
  operandA: number
  operandB: number
  operator: '+' | '-' | 'compare'
  answer: number
  /** Object emoji for the 'counting' method (e.g. '🍎'). */
  emoji?: string
}

/** Properties common to all lessons. */
interface LessonBase {
  id: string
  subject: SubjectId
  title: string
  titleEn: string
  level: Level
  emoji: string
  /** Estimated duration (minutes) to display. */
  durationMin: number
  /**
   * Extra data bag (optional) for future parameters without changing
   * the core type — e.g. { theme: 'ocean', unlockLevel: 2 }.
   */
  meta?: Record<string, unknown>
}

/** English lesson activity types. */
export type EnglishActivity = 'vocabulary' | 'phonics' | 'listening' | 'spelling'

export interface EnglishLesson extends LessonBase {
  subject: 'english'
  /** 'vocabulary' = word cards + quiz; 'phonics' = letter sounds. */
  type: EnglishActivity
  items: VocabularyItem[]
}

export interface MathLesson extends LessonBase {
  subject: 'math'
  type: 'singapore-math'
  method: MathMethod
  /** Display name of the method, e.g. "Singapore Math — Number Bond". */
  methodLabel: string
  problems: MathProblem[]
}

/** Science lesson activity types (easy to extend). */
export type ScienceActivity = 'explore' // learn facts → quiz

/** A single Science fact/concept to learn (e.g. Sun, Eye, Fish). */
export interface ScienceFact {
  id: string
  /** English term (e.g. "Sun"). */
  term: string
  /** Indonesian name (e.g. "Matahari"). */
  name: string
  emoji: string
  /** Fact sentence (Indonesian) — displayed & can be read aloud. */
  fact: string
  /** Quiz question (Indonesian) for this fact. */
  clue: string
  /**
   * Group (optional) for smart distractors / grouping —
   * e.g. habitat: 'laut' | 'darat' | 'udara'.
   */
  group?: string
}

export interface ScienceLesson extends LessonBase {
  subject: 'science'
  type: ScienceActivity
  facts: ScienceFact[]
}

/** Indonesian / Reading lesson activity types (Calistung). */
export type BahasaActivity =
  | 'huruf' // recognize letters (sound & shape)
  | 'suku-kata' // read syllables (ba-bi-bu-be-bo)
  | 'kata' // build syllables into words
  | 'kalimat' // read simple sentences

/** A single reading item (letter / syllable / word / sentence). */
export interface ReadingItem {
  id: string
  /** Text that is read (e.g. "A", "ba", "buku", "Ini bola."). */
  text: string
  emoji?: string
  /** Short meaning/hint (optional, for a word). */
  hint?: string
  /**
   * Syllable breakdown for the "build" mode (e.g. ['bu','ku'] for "buku").
   * Required for the 'kata' activity.
   */
  syllables?: string[]
}

export interface BahasaLesson extends LessonBase {
  subject: 'bahasa'
  type: BahasaActivity
  items: ReadingItem[]
}

export type Lesson = EnglishLesson | MathLesson | ScienceLesson | BahasaLesson

/** Learning progress per lesson (stored in localStorage). */
export interface LessonProgress {
  lessonId: string
  completed: boolean
  /** 0–3 stars. */
  stars: number
  updatedAt: number
}

/** Available sound effects. */
export type SoundEffect = 'click' | 'correct' | 'wrong' | 'win' | 'pop'

/** A single changelog entry. */
export interface ChangelogEntry {
  date: string // ISO 'YYYY-MM-DD'
  version: string
  tag: 'Fitur' | 'Perbaikan' | 'Konten' | 'Rilis'
  title: string
  changes: string[]
}
