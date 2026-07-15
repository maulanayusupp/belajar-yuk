import type { MathLesson } from '~/types'
import { counting } from './counting'
import { countingTo10 } from './counting-to-10'
import { countingTo20 } from './counting-to-20'
import { tenFrame } from './ten-frame'
import { teenNumbers } from './teen-numbers'
import { numberBond5 } from './number-bond-5'
import { numberBond10 } from './number-bond-10'
import { numberBond20 } from './number-bond-20'
import { additionTo5 } from './addition-to-5'
import { additionTo10 } from './addition-to-10'
import { blockAddition } from './block-addition'
import { additionTo20 } from './addition-to-20'
import { subtractionTo5 } from './subtraction-to-5'
import { subtraction } from './subtraction'
import { subtractionTo20 } from './subtraction-to-20'
import { numberLine10 } from './number-line-10'
import { numberLine20 } from './number-line-20'
import { missingNumber } from './missing-number'

// Daftar & URUTAN pelajaran Matematika (mudah → menantang, semua Pemula).
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru berisi `index.ts` yang meng-export MathLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
//   Butuh metode baru? Tambah nilai di `MathMethod` (types), metadata di
//   `math/methods.ts`, & cabang render di components/math/SingaporeLesson.vue.
export const mathLessons: MathLesson[] = [
  // Berhitung
  counting,
  countingTo10,
  countingTo20,
  tenFrame,
  teenNumbers,
  // Ikatan bilangan
  numberBond5,
  numberBond10,
  numberBond20,
  // Penjumlahan
  additionTo5,
  additionTo10,
  blockAddition,
  additionTo20,
  // Pengurangan
  subtractionTo5,
  subtraction,
  subtractionTo20,
  // Garis bilangan
  numberLine10,
  numberLine20,
  // Menengah: cari bilangan hilang
  missingNumber,
]
