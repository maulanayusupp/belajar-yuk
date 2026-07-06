import type { MathLesson } from '~/types'
import { counting } from './counting'
import { tenFrame } from './ten-frame'
import { numberBond10 } from './number-bond-10'
import { blockAddition } from './block-addition'
import { subtraction } from './subtraction'
import { numberBond20 } from './number-bond-20'
import { numberLine10 } from './number-line-10'
import { additionTo20 } from './addition-to-20'
import { subtractionTo20 } from './subtraction-to-20'
import { numberLine20 } from './number-line-20'

// Daftar & URUTAN pelajaran Matematika (dari mudah ke sulit).
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru di sini berisi `index.ts` yang meng-export
//      satu objek MathLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
//   Butuh metode baru? Tambah nilai di `MathMethod` (types), metadata di
//   `math/methods.ts`, & cabang render di components/math/SingaporeLesson.vue.
export const mathLessons: MathLesson[] = [
  // Pemula
  counting,
  tenFrame,
  numberBond10,
  blockAddition,
  subtraction,
  // Menengah
  numberBond20,
  numberLine10,
  // Mahir
  additionTo20,
  subtractionTo20,
  numberLine20,
]
