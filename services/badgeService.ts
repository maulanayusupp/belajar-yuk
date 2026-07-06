// Lencana pencapaian. Dinilai dari ringkasan progres (BadgeStats).
export interface BadgeStats {
  completed: number
  mathCompleted: number
  englishCompleted: number
  perfect: number // pelajaran dengan 3 bintang
  totalStars: number
  streakBest: number
}

export interface Badge {
  id: string
  icon: string
  label: string
  description: string
  earned: boolean
}

interface BadgeDef extends Omit<Badge, 'earned'> {
  test: (s: BadgeStats) => boolean
}

// Urutan = urutan tampil.
const DEFS: BadgeDef[] = [
  {
    id: 'first',
    icon: '🐣',
    label: 'Langkah Pertama',
    description: 'Selesai 1 pelajaran',
    test: (s) => s.completed >= 1,
  },
  {
    id: 'perfect',
    icon: '💯',
    label: 'Nilai Sempurna',
    description: 'Dapat 3 bintang',
    test: (s) => s.perfect >= 1,
  },
  {
    id: 'five',
    icon: '📚',
    label: 'Rajin Belajar',
    description: 'Selesai 5 pelajaran',
    test: (s) => s.completed >= 5,
  },
  {
    id: 'math5',
    icon: '🔢',
    label: 'Jago Berhitung',
    description: '5 pelajaran Matematika',
    test: (s) => s.mathCompleted >= 5,
  },
  {
    id: 'eng5',
    icon: '🗣️',
    label: 'Cinta Bahasa',
    description: '5 pelajaran Inggris',
    test: (s) => s.englishCompleted >= 5,
  },
  {
    id: 'streak3',
    icon: '🔥',
    label: '3 Hari Beruntun',
    description: 'Belajar 3 hari berturut',
    test: (s) => s.streakBest >= 3,
  },
  {
    id: 'ten',
    icon: '🌟',
    label: 'Bintang Kelas',
    description: 'Selesai 10 pelajaran',
    test: (s) => s.completed >= 10,
  },
  {
    id: 'stars25',
    icon: '⭐',
    label: 'Kolektor Bintang',
    description: 'Kumpulkan 25 bintang',
    test: (s) => s.totalStars >= 25,
  },
  {
    id: 'streak7',
    icon: '🏆',
    label: 'Seminggu Penuh',
    description: 'Belajar 7 hari beruntun',
    test: (s) => s.streakBest >= 7,
  },
]

export const badgeService = {
  all(stats: BadgeStats): Badge[] {
    return DEFS.map(({ test, ...rest }) => ({ ...rest, earned: test(stats) }))
  },
  earnedCount(stats: BadgeStats): number {
    return DEFS.filter((d) => d.test(stats)).length
  },
  total(): number {
    return DEFS.length
  },
}
