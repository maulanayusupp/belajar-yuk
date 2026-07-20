import type { CodingWorld } from '~/types'

// World — "Cari Bug" (find the bug). A DIFFERENT game: the child is shown an
// almost-correct program with exactly ONE wrong command, taps the buggy command,
// then picks the right replacement. Debugging & reading code, not building it.
// Invariant (guarded by tests): running `buggy` FAILS and applying `fix` SUCCEEDS.
export const bugWorld: CodingWorld = {
  id: 'bug',
  title: 'Cari Bug',
  icon: '🐞',
  concept: 'sequence',
  level: 'intermediate',
  description: 'Ada satu perintah yang salah. Temukan lalu perbaiki!',
  levels: [
    {
      kind: 'bug',
      id: 'bug-1',
      title: 'Langkah Terakhir',
      grid: ['...G'],
      start: { x: 0, y: 0, facing: 'east' },
      buggy: ['forward', 'forward', 'left'],
      fix: { index: 2, cmd: 'forward' },
      hint: 'Robot berhenti sebelum bintang. Perintah terakhir salah.',
    },
    {
      kind: 'bug',
      id: 'bug-2',
      title: 'Belok yang Keliru',
      grid: ['..G', '...', '...'],
      start: { x: 0, y: 2, facing: 'north' },
      buggy: ['forward', 'forward', 'left', 'forward', 'forward'],
      fix: { index: 2, cmd: 'right' },
      hint: 'Setelah naik, robot belok ke arah yang salah.',
    },
    {
      kind: 'bug',
      id: 'bug-3',
      title: 'Turun ke Bintang',
      grid: ['....', '...G'],
      start: { x: 0, y: 0, facing: 'east' },
      buggy: ['forward', 'forward', 'forward', 'left', 'forward'],
      fix: { index: 3, cmd: 'right' },
      hint: 'Di ujung, robot harus belok turun — bukan ke atas.',
    },
    {
      kind: 'bug',
      id: 'bug-4',
      title: 'Lupa Berbelok',
      grid: ['...', '.#.', '..G'],
      start: { x: 0, y: 0, facing: 'east' },
      buggy: ['forward', 'forward', 'forward', 'forward', 'forward'],
      fix: { index: 2, cmd: 'right' },
      hint: 'Robot terus maju sampai mentok. Ada belokan yang hilang.',
    },
    {
      kind: 'bug',
      id: 'bug-5',
      title: 'Zig-Zag Salah',
      grid: ['...', '...', '..G'],
      start: { x: 0, y: 0, facing: 'east' },
      buggy: ['right', 'forward', 'forward', 'right', 'forward', 'forward'],
      fix: { index: 3, cmd: 'left' },
      hint: 'Di pojok bawah, robot harus menghadap bintang.',
    },
  ],
}
