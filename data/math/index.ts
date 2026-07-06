import type { MathLesson } from '~/types'
import { counting } from './counting'
import { countingTo10 } from './counting-to-10'
import { tenFrame } from './ten-frame'
import { numberBond5 } from './number-bond-5'
import { numberBond10 } from './number-bond-10'
import { numberBond20 } from './number-bond-20'
import { additionTo5 } from './addition-to-5'
import { blockAddition } from './block-addition'
import { additionTo20 } from './addition-to-20'
import { subtraction } from './subtraction'
import { subtractionTo20 } from './subtraction-to-20'
import { numberLine10 } from './number-line-10'
import { numberLine20 } from './number-line-20'

// Daftar & URUTAN pelajaran Matematika (mudah → menantang, semua Pemula).
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru berisi `index.ts` yang meng-export MathLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
//   Butuh metode baru? Tambah nilai di `MathMethod` (types), metadata di
//   `math/methods.ts`, & cabang render di components/math/SingaporeLesson.vue.
export const mathLessons: MathLesson[] = [
  counting,
  countingTo10,
  tenFrame,
  numberBond5,
  numberBond10,
  numberBond20,
  additionTo5,
  blockAddition,
  additionTo20,
  subtraction,
  subtractionTo20,
  numberLine10,
  numberLine20,
]
