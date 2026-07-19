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

/** Timed fluency drill mode (Kumon-style speed + accuracy practice). */
export type DrillMode = 'add-10' | 'add-20' | 'sub-10' | 'bond-10' | 'mixed'

/** A single drill question. */
export interface DrillQuestion {
  id: string
  prompt: string // e.g. "3 + 4"
  answer: number
  options: number[]
}

/** Result of one drill session. */
export interface DrillResult {
  score: number // correct answers
  attempts: number // total answered
  accuracy: number // 0..100
}

/** Personal best per drill mode (stored in localStorage). */
export interface DrillBest {
  score: number
  accuracy: number
  updatedAt: number
}

// ---- Coding (separate module: grid command-puzzles, Lightbot-style) --------

/** Concept a coding level teaches. */
export type CodingConcept = 'sequence' | 'loop' | 'conditional'

/** A primitive command block the child can place in the program. */
export type CodingCommand = 'forward' | 'left' | 'right'

/**
 * A step in a coding program. Either a primitive command, or a `repeat` block
 * (loop) whose body holds primitive commands. Loops teach repetition/efficiency.
 * Body is primitives only (no nested loops) — enough for the loops world.
 */
export type CodingStep =
  | { type: 'cmd'; cmd: CodingCommand }
  | { type: 'repeat'; times: number; body: Array<{ type: 'cmd'; cmd: CodingCommand }> }

/** Direction the robot faces. */
export type Facing = 'north' | 'east' | 'south' | 'west'

/**
 * A grid puzzle level (program-the-robot). The grid is an array of equal-length
 * strings where each char is a cell: '.' path · '#' wall · 'G' goal · 'C' gem.
 */
export interface CodingLevel {
  /** Game kind — grid puzzle (default). */
  kind?: 'grid'
  id: string
  title: string
  concept: CodingConcept
  grid: string[]
  start: { x: number; y: number; facing: Facing }
  /** Commands available for this level (gates the palette → teaches one idea). */
  allowed: CodingCommand[]
  /** Block count for a 3-star solution. */
  optimalBlocks: number
  hint?: string
}

/** One step card in an "order the steps" level. */
export interface OrderStep {
  id: string
  icon: string
  label: string
}

/**
 * An "order the steps" level — a DIFFERENT game: no grid/robot. The child
 * arranges scrambled step cards into the correct order (everyday algorithms).
 */
export interface CodingOrderLevel {
  kind: 'order'
  id: string
  title: string
  /** What is being sequenced, e.g. "Menanam Bunga". */
  goal: string
  goalEmoji: string
  /** Steps in the CORRECT order (the runner shuffles them for the child). */
  steps: OrderStep[]
  hint?: string
}

/** Any coding level (different game kinds share a map & progress). */
export type AnyCodingLevel = CodingLevel | CodingOrderLevel

/** A world groups levels (shown as a section on the map). */
export interface CodingWorld {
  id: string
  title: string
  icon: string
  concept: CodingConcept
  /** Age/skill category (Tunas/Penjelajah/Juara) — reuses the lesson Level tiers. */
  level: Level
  description: string
  levels: AnyCodingLevel[]
}

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
