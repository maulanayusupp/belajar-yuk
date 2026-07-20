import type { CodingWorld } from '~/types'

// World — "Predict the output". A DIFFERENT game: the child reads a fixed
// program and predicts where the robot stops (code tracing). Open grids so
// there are enough candidate cells; the runner computes the real answer.
export const predictWorld: CodingWorld = {
  id: 'predict',
  title: 'Tebak Hasil',
  icon: '🔮',
  concept: 'sequence',
  level: 'intermediate',
  description: 'Baca programnya, lalu tebak di kotak mana robot akan berhenti.',
  levels: [
    {
      kind: 'predict',
      id: 'predict-1',
      title: 'Ke Mana Robo?',
      grid: ['.....'],
      start: { x: 0, y: 0, facing: 'east' },
      program: ['forward', 'forward', 'forward'],
      hint: 'Hitung berapa kali Maju dari titik awal.',
    },
    {
      kind: 'predict',
      id: 'predict-2',
      title: 'Belok Sekali',
      grid: ['...', '...', '...'],
      start: { x: 0, y: 0, facing: 'east' },
      program: ['forward', 'forward', 'right', 'forward'],
      hint: 'Setelah belok kanan, robot menghadap ke bawah.',
    },
    {
      kind: 'predict',
      id: 'predict-3',
      title: 'Naik lalu Kanan',
      grid: ['...', '...', '...'],
      start: { x: 0, y: 2, facing: 'north' },
      program: ['forward', 'forward', 'right', 'forward', 'forward'],
      hint: 'Robot mulai dari bawah menghadap ke atas.',
    },
    {
      kind: 'predict',
      id: 'predict-4',
      title: 'Sudut Jauh',
      grid: ['....', '....', '....'],
      start: { x: 0, y: 0, facing: 'east' },
      program: ['forward', 'forward', 'forward', 'right', 'forward', 'forward'],
      hint: 'Maju sampai ujung, baru belok turun.',
    },
    {
      kind: 'predict',
      id: 'predict-5',
      title: 'Putar Balik',
      grid: ['....', '....'],
      start: { x: 0, y: 0, facing: 'east' },
      program: ['forward', 'forward', 'right', 'forward', 'right', 'forward'],
      hint: 'Ada dua kali belok kanan — perhatikan arahnya!',
    },
  ],
}
