import type { BahasaLesson } from '~/types'
import { hurufVokal } from './huruf-vokal'
import { sukuKataMa } from './suku-kata-ma'
import { sukuKataBa } from './suku-kata-ba'
import { merangkaiKata } from './merangkai-kata'
import { kalimatSederhana } from './kalimat-sederhana'

// Daftar & URUTAN pelajaran Membaca (Calistung): huruf → suku kata → kata → kalimat.
//
// ➕ Menambah pelajaran baru:
//   1. Buat FOLDER baru berisi `index.ts` yang meng-export BahasaLesson.
//   2. Import di sini, lalu masukkan ke array (posisi = urutan tampil).
export const bahasaLessons: BahasaLesson[] = [
  // Pemula: huruf & suku kata
  hurufVokal,
  sukuKataMa,
  sukuKataBa,
  // Menengah: merangkai kata
  merangkaiKata,
  // Mahir: membaca kalimat
  kalimatSederhana,
]
