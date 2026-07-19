import type { CodingWorld } from '~/types'

// World 2 — Loops (Perulangan). Levels are designed so the efficient (3-star)
// solution uses a "repeat" block: long corridors and repeating patterns.
// Every level is verified solvable at optimalBlocks with a loop (see tests).
export const loopsWorld: CodingWorld = {
  id: 'loops',
  title: 'Perulangan',
  icon: '🔁',
  concept: 'loop',
  level: 'intermediate',
  description: 'Pakai blok "Ulangi" agar tak perlu menaruh perintah yang sama berkali-kali.',
  levels: [
    {
      id: 'code-loop-1',
      title: 'Lorong Panjang',
      concept: 'loop',
      grid: ['......G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward'],
      optimalBlocks: 2,
      hint: 'Daripada Maju 6 kali, coba Ulangi Maju sebanyak 6 kali!',
    },
    {
      id: 'code-loop-2',
      title: 'Belok lalu Lari',
      concept: 'loop',
      grid: ['..', '#.', '#.', '#.', '#.', '#G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 4,
      hint: 'Maju & belok dulu, lalu Ulangi Maju untuk menuruni lorong.',
    },
    {
      id: 'code-loop-3',
      title: 'Keliling Taman',
      concept: 'loop',
      grid: ['....', '###.', '###.', '###G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Dua sisi panjang — pakai dua blok Ulangi.',
    },
    {
      id: 'code-loop-4',
      title: 'Naik Tangga',
      concept: 'loop',
      grid: ['..##', '#..#', '##..', '###G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Pola "maju, kanan, maju, kiri" berulang — masukkan ke satu blok Ulangi.',
    },
    {
      id: 'code-loop-5',
      title: 'Menara Berputar',
      concept: 'loop',
      grid: ['..###', '#..##', '##..#', '###..', '####G'],
      start: { x: 0, y: 0, facing: 'east' },
      allowed: ['forward', 'left', 'right'],
      optimalBlocks: 5,
      hint: 'Tangga yang lebih panjang — pola yang sama, cukup ubah jumlah ulangan.',
    },
  ],
}
