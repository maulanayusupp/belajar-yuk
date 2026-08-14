import type { CodingWorld } from '~/types'

// World — "Order the steps". A DIFFERENT game from the grid puzzles: the child
// arranges scrambled step cards into the correct order (everyday algorithms).
// `steps` are listed in the CORRECT order; the runner shuffles them. Every step
// in a level is visually distinct so the order is never ambiguous.
export const orderWorld: CodingWorld = {
  id: 'order',
  title: 'Urutkan Langkah',
  icon: '📋',
  concept: 'sequence',
  level: 'beginner',
  description: 'Susun kartu langkah ke urutan yang benar — belajar berpikir runut.',
  levels: [
    {
      kind: 'order',
      id: 'order-plant',
      title: 'Menanam Bunga',
      goal: 'Menanam Bunga',
      goalEmoji: '🌷',
      hint: 'Apa yang dilakukan paling awal saat menanam?',
      steps: [
        { id: 'dig', icon: '🕳️', label: 'Gali tanah' },
        { id: 'seed', icon: '🌰', label: 'Tanam biji' },
        { id: 'water', icon: '💧', label: 'Siram air' },
        { id: 'bloom', icon: '🌷', label: 'Bunga mekar' },
      ],
    },
    {
      kind: 'order',
      id: 'order-teeth',
      title: 'Gosok Gigi',
      goal: 'Menggosok Gigi',
      goalEmoji: '🪥',
      hint: 'Ambil dulu alatnya sebelum dipakai.',
      steps: [
        { id: 'brush', icon: '🪥', label: 'Ambil sikat' },
        { id: 'paste', icon: '🧴', label: 'Beri pasta gigi' },
        { id: 'scrub', icon: '😁', label: 'Gosok gigi' },
        { id: 'rinse', icon: '💧', label: 'Kumur air' },
      ],
    },
    {
      kind: 'order',
      id: 'order-sandwich',
      title: 'Buat Roti Isi',
      goal: 'Membuat Roti Isi',
      goalEmoji: '🥪',
      hint: 'Mulai dari bahan paling bawah.',
      steps: [
        { id: 'bread', icon: '🍞', label: 'Ambil roti' },
        { id: 'jam', icon: '🍯', label: 'Oles selai' },
        { id: 'cheese', icon: '🧀', label: 'Beri keju' },
        { id: 'eat', icon: '🥪', label: 'Siap dimakan' },
      ],
    },
    {
      kind: 'order',
      id: 'order-morning',
      title: 'Berangkat Sekolah',
      goal: 'Bersiap ke Sekolah',
      goalEmoji: '🎒',
      hint: 'Apa hal pertama yang kamu lakukan saat pagi?',
      steps: [
        { id: 'wake', icon: '⏰', label: 'Bangun tidur' },
        { id: 'bath', icon: '🚿', label: 'Mandi' },
        { id: 'eat', icon: '🍳', label: 'Sarapan' },
        { id: 'bag', icon: '🎒', label: 'Pakai tas' },
      ],
    },
    {
      kind: 'order',
      id: 'order-sweep',
      title: 'Robot Menyapu',
      goal: 'Menyapu Lantai',
      goalEmoji: '🧹',
      hint: 'Robot harus mengambil alatnya lebih dulu.',
      steps: [
        { id: 'take', icon: '🧹', label: 'Ambil sapu' },
        { id: 'sweep', icon: '✨', label: 'Sapu lantai' },
        { id: 'gather', icon: '🗑️', label: 'Kumpulkan sampah' },
        { id: 'throw', icon: '✅', label: 'Buang sampah' },
      ],
    },
    {
      kind: 'order',
      id: 'order-wash-hands',
      title: 'Cuci Tangan',
      goal: 'Mencuci Tangan',
      goalEmoji: '🙌',
      hint: 'Buka dulu kerannya sebelum yang lain.',
      steps: [
        { id: 'tap', icon: '🚰', label: 'Buka keran' },
        { id: 'wet', icon: '💦', label: 'Basahi tangan' },
        { id: 'soap', icon: '🧼', label: 'Beri sabun' },
        { id: 'rub', icon: '🙌', label: 'Gosok tangan' },
        { id: 'dry', icon: '🧻', label: 'Keringkan' },
      ],
    },
    {
      kind: 'order',
      id: 'order-tea',
      title: 'Buat Teh Manis',
      goal: 'Membuat Teh Manis',
      goalEmoji: '🫖',
      hint: 'Air harus panas dulu sebelum dituang.',
      steps: [
        { id: 'boil', icon: '🔥', label: 'Panaskan air' },
        { id: 'pour', icon: '🥛', label: 'Tuang ke gelas' },
        { id: 'dip', icon: '🍵', label: 'Celup teh' },
        { id: 'sugar', icon: '🍬', label: 'Beri gula' },
        { id: 'stir', icon: '🥄', label: 'Aduk rata' },
      ],
    },
  ],
}
