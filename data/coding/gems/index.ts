import type { CodingWorld } from '~/types'

// World — Collect the gems. The robot must step on EVERY gem ('C') and then
// finish on the goal ('G'). Same command set as sequencing, but a new win
// condition (collect-all) makes for fresh puzzles. Grids: '.' path · '#' wall ·
// 'G' goal · 'C' gem. Verified solvable at optimalBlocks (see tests).
export const gemsWorld: CodingWorld = {
  id: 'gems',
  title: 'Berburu Permata',
  icon: '💎',
  concept: 'sequence',
  level: 'beginner',
  description: 'Kumpulkan semua permata 💎 dulu, baru menuju bintang tujuan ⭐.',
  levels: [
    {
      id: 'code-gem-1',
      title: 'Permata di Jalan',
      concept: 'sequence',
      grid: ['.C.G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward'],
      optimalBlocks: 3,
      hint: 'Lewati permata dalam perjalanan menuju bintang.',
    },
    {
      id: 'code-gem-2',
      title: 'Dua Permata',
      concept: 'sequence',
      grid: ['.C.C.G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward'],
      optimalBlocks: 5,
      hint: 'Terus maju — kedua permata ada di jalurmu.',
    },
    {
      id: 'code-gem-3',
      title: 'Belok Ambil',
      concept: 'sequence',
      grid: ['.C.', '##C', '##G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Ambil permata atas, lalu belok turun mengambil yang bawah.',
    },
    {
      id: 'code-gem-4',
      title: 'Jejak Permata',
      concept: 'sequence',
      grid: ['.C.##', '##.##', '##.CG'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 8,
      hint: 'Ikuti jalur berkelok — kedua permata ada di sepanjang jalan.',
    },
    {
      id: 'code-gem-5',
      title: 'Panen Permata',
      concept: 'sequence',
      grid: ['.C.C.CG'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward'],
      optimalBlocks: 6,
      hint: 'Tiga permata sekaligus — cukup terus melaju!',
    },
    {
      id: 'code-gem-6',
      title: 'Master Permata',
      concept: 'sequence',
      grid: ['.#G', 'C#C', '..C'],
      start: { x: 0, y: 0, facing: 'south' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 8,
      hint: 'Naik ambil permata, memutar mengambil dua lainnya, lalu ke bintang.',
    },
  ],
}
