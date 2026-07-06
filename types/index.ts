// =============================================================
//  Kontrak data (types) — dipakai di seluruh services, komponen,
//  dan data. Satu tempat untuk mendefinisikan bentuk data.
// =============================================================

export type SubjectId = 'english' | 'math'

export type Level = 'beginner' | 'intermediate' | 'advanced'

/** Mata pelajaran (kartu di halaman utama). */
export interface Subject {
  id: SubjectId
  /** Judul Bahasa Indonesia (instruksi untuk anak). */
  title: string
  /** Judul Bahasa Inggris. */
  titleEn: string
  emoji: string
  /** Nama warna tema: 'english' | 'math' (dipetakan di SCSS). */
  theme: SubjectId
  description: string
}

/** Satu kata pada pelajaran Bahasa Inggris. */
export interface VocabularyItem {
  id: string
  word: string
  translation: string
  emoji: string
  /** Contoh kalimat sederhana (opsional). */
  example?: string
  /**
   * URL/path audio pengucapan (opsional). Bila diisi, audio ini yang
   * dimainkan; bila kosong, dipakai suara sintesis (Google/Web Speech).
   * Contoh: '/audio/en/apple.mp3' atau 'https://cdn.../apple.mp3'.
   */
  audioUrl?: string
}

/** Metode Matematika yang didukung (mudah ditambah). */
export type MathMethod =
  | 'number-bond' // Ikatan Bilangan (penjumlahan)
  | 'block-addition' // Penjumlahan dengan blok (CPA)
  | 'block-subtraction' // Pengurangan dengan blok (ambil/coret)
  | 'counting' // Menghitung banyak benda

/** Satu soal Matematika. */
export interface MathProblem {
  id: string
  operandA: number
  operandB: number
  operator: '+' | '-'
  answer: number
  /** Emoji benda untuk metode 'counting' (mis. '🍎'). */
  emoji?: string
}

/** Properti umum semua pelajaran. */
interface LessonBase {
  id: string
  subject: SubjectId
  title: string
  titleEn: string
  level: Level
  emoji: string
  /** Perkiraan durasi (menit) untuk ditampilkan. */
  durationMin: number
  /**
   * Kantong data tambahan (opsional) untuk parameter masa depan tanpa
   * mengubah tipe inti — mis. { theme: 'ocean', unlockLevel: 2 }.
   */
  meta?: Record<string, unknown>
}

export interface EnglishLesson extends LessonBase {
  subject: 'english'
  type: 'vocabulary'
  items: VocabularyItem[]
}

export interface MathLesson extends LessonBase {
  subject: 'math'
  type: 'singapore-math'
  method: MathMethod
  /** Nama metode untuk ditampilkan, mis. "Singapore Math — Number Bond". */
  methodLabel: string
  problems: MathProblem[]
}

export type Lesson = EnglishLesson | MathLesson

/** Progres belajar per pelajaran (disimpan di localStorage). */
export interface LessonProgress {
  lessonId: string
  completed: boolean
  /** 0–3 bintang. */
  stars: number
  updatedAt: number
}

/** Efek suara yang tersedia. */
export type SoundEffect = 'click' | 'correct' | 'wrong' | 'win' | 'pop'
