import type { MathLesson } from '~/types'
import { numberBond10 } from './number-bond-10'
import { blockAddition } from './block-addition'

// Daftar & URUTAN pelajaran Matematika.
//
// ➕ Menambah pelajaran baru:
//   1. Buat file baru di folder ini yang meng-export satu objek MathLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
//   Butuh metode baru? Tambah nilai di `MathMethod` (types) & cabang render
//   di components/math/SingaporeLesson.vue.
export const mathLessons: MathLesson[] = [numberBond10, blockAddition]
