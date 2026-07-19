import type { CodingWorld } from '~/types'

// World — Loops + Gems combined (the hardest tier). Collect every gem ('C')
// using efficient "repeat" blocks, then reach the goal. Grids: '.' path ·
// '#' wall · 'G' goal · 'C' gem. Verified solvable at optimalBlocks (see tests).
export const loopsGemsWorld: CodingWorld = {
  id: 'loops-gems',
  title: 'Perulangan Permata',
  icon: '🌀',
  concept: 'loop',
  level: 'advanced',
  description: 'Gabungkan blok Ulangi & berburu permata — tantangan sejati sang Juara!',
  levels: [
    {
      id: 'code-lg-1',
      title: 'Deret Permata',
      concept: 'loop',
      grid: ['.CCCCG'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward'],
      optimalBlocks: 2,
      hint: 'Satu blok Ulangi Maju bisa mengambil semua permata sekaligus.',
    },
    {
      id: 'code-lg-2',
      title: 'Tangga Permata',
      concept: 'loop',
      grid: ['.C##', '#.C#', '##.C', '###G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Pola "maju, kanan, maju, kiri" mengambil satu permata tiap ulangan.',
    },
    {
      id: 'code-lg-3',
      title: 'Sudut Permata',
      concept: 'loop',
      grid: ['.CCC', '###C', '###C', '###G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Dua sisi panjang berpermata — pakai dua blok Ulangi.',
    },
    {
      id: 'code-lg-4',
      title: 'Zig-Zag Permata',
      concept: 'loop',
      grid: ['.C###', '#.C##', '##.C#', '###.C', '####G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Tangga panjang berpermata — cukup naikkan jumlah ulangan.',
    },
    {
      id: 'code-lg-5',
      title: 'Panen Loop',
      concept: 'loop',
      grid: ['.CCCC', '####C', '####C', '####G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Panen satu baris penuh dengan Ulangi, belok, lalu panen kolomnya.',
    },
  ],
}
