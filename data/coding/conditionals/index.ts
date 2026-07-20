import type { CodingWorld } from '~/types'

// World — "Jika… Kalau Tidak…" (Phase 2 conditionals). A constrained if-else
// game: the program is fixed as "repeat until goal: IF <cond> do X else do Y".
// The child picks the command for each branch. Teaches decision-making — the
// same tiny program follows a whole path by reacting to the wall ahead.
// Solutions validated in tests/codeRunner.test.ts.
export const conditionalsWorld: CodingWorld = {
  id: 'conditionals',
  title: 'Jika… Kalau Tidak…',
  icon: '🔀',
  concept: 'conditional',
  level: 'advanced',
  description: 'Pilih apa yang robot lakukan JIKA ada jalan, dan KALAU TIDAK ada.',
  levels: [
    {
      id: 'cond-1',
      title: 'Belok di Ujung',
      concept: 'conditional',
      grid: ['....', '###G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      conditions: ['path-ahead'],
      optimalBlocks: 4,
      hint: 'Jika ada jalan di depan → Maju. Kalau tidak → belok ke arah bintang.',
    },
    {
      id: 'cond-2',
      title: 'Naik ke Atas',
      concept: 'conditional',
      grid: ['###G', '....'],
      start: { x: 0, y: 1, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      conditions: ['path-ahead'],
      optimalBlocks: 4,
      hint: 'Di ujung, robot harus belok ke atas — pikirkan kiri atau kanan.',
    },
    {
      id: 'cond-3',
      title: 'Jalan Berputar',
      concept: 'conditional',
      grid: ['...', '##.', 'G..'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      conditions: ['path-ahead'],
      optimalBlocks: 4,
      hint: 'Setiap kali mentok, robot belok ke arah yang sama.',
    },
  ],
}
