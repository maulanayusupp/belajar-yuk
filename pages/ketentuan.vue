<script setup lang="ts">
// Terms of Service. Kept short & plain because the app is free, client-only,
// and collects no data. NOTE: update CONTACT_EMAIL before launch.
const CONTACT_EMAIL = 'kontak@belajar-yuk.app'
const UPDATED = '21 Juli 2026'

const DESCRIPTION =
  'Ketentuan Layanan Belajar Yuk!: aplikasi belajar anak yang gratis, edukatif, dan berjalan ' +
  'sepenuhnya di perangkat. Baca hak & tanggung jawab penggunaan.'

useSeoMeta({
  title: 'Ketentuan Layanan',
  description: DESCRIPTION,
  ogTitle: 'Ketentuan Layanan — Belajar Yuk!',
  ogDescription: DESCRIPTION,
})
</script>

<template>
  <LegalDocument
    title="Ketentuan Layanan"
    :updated="UPDATED"
    intro="Dengan menggunakan Belajar Yuk!, Anda menyetujui ketentuan berikut. Ketentuan ini ditulis sesederhana mungkin agar mudah dipahami orang tua."
  >
    <h2>1. Tentang Layanan</h2>
    <p>
      Belajar Yuk! adalah aplikasi edukasi <strong>gratis</strong> untuk anak usia 6 tahun ke atas
      (Bahasa Inggris, Matematika, Sains, Membaca, dan Coding). Layanan disediakan "sebagaimana
      adanya" untuk tujuan pembelajaran.
    </p>

    <h2>2. Ditujukan untuk Anak dengan Pendampingan</h2>
    <p>
      Aplikasi dirancang untuk digunakan anak
      <strong>dengan pendampingan orang tua atau wali</strong>. Orang tua bertanggung jawab
      mengawasi penggunaan perangkat oleh anak.
    </p>

    <h2>3. Konten Edukatif</h2>
    <p>
      Materi disusun berbasis referensi kurikulum dan praktik yang baik, namun bersifat pelengkap —
      <strong>bukan pengganti</strong> pendidikan sekolah formal atau nasihat pendidik profesional.
      Kami berupaya menjaga akurasi konten, tetapi tidak menjamin bebas dari kekeliruan.
    </p>

    <h2>4. Data Tersimpan di Perangkat</h2>
    <p>
      Kemajuan belajar disimpan hanya di perangkat Anda (tidak ada cadangan di server). Menghapus
      data peramban, berpindah perangkat, atau memakai mode penyamaran dapat menghilangkan kemajuan
      tersebut. Lihat <NuxtLink to="/privasi">Kebijakan Privasi</NuxtLink> untuk detail.
    </p>

    <h2>5. Hak Kekayaan Intelektual</h2>
    <p>
      Nama, logo, desain, dan materi di Belajar Yuk! dilindungi hak cipta. Anda dipersilakan
      menggunakannya untuk keperluan belajar pribadi dan non-komersial. Dilarang menyalin, menjual,
      atau mendistribusikan ulang konten tanpa izin.
    </p>

    <h2>6. Penggunaan yang Diperbolehkan</h2>
    <p>Mohon gunakan aplikasi secara wajar. Anda setuju untuk tidak:</p>
    <ul>
      <li>Menyalahgunakan, merusak, atau mencoba meretas aplikasi.</li>
      <li>Menggunakan konten untuk tujuan komersial tanpa izin.</li>
      <li>Menyajikan aplikasi seolah-olah milik pihak lain.</li>
    </ul>

    <h2>7. Layanan Pihak Ketiga</h2>
    <p>
      Aplikasi memakai beberapa layanan pihak ketiga (mis. Google Fonts untuk huruf, dan pembaca
      suara peramban). Penggunaan layanan tersebut tunduk pada kebijakan masing-masing penyedia.
    </p>

    <h2>8. Tanpa Jaminan &amp; Batasan Tanggung Jawab</h2>
    <p>
      Layanan disediakan "sebagaimana adanya" tanpa jaminan apa pun. Sejauh diizinkan hukum, kami
      tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketidakmampuan
      menggunakan aplikasi, termasuk hilangnya kemajuan belajar yang tersimpan di perangkat.
    </p>

    <h2>9. Perubahan Ketentuan</h2>
    <p>
      Kami dapat memperbarui ketentuan ini sewaktu-waktu. Perubahan berlaku sejak dipublikasikan di
      halaman ini dengan tanggal "terakhir diperbarui" yang baru.
    </p>

    <h2>10. Hukum yang Berlaku</h2>
    <p>Ketentuan ini diatur oleh hukum yang berlaku di Republik Indonesia.</p>

    <h2>11. Hubungi Kami</h2>
    <p>
      Pertanyaan tentang ketentuan ini? Hubungi kami di
      <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a
      >.
    </p>
  </LegalDocument>
</template>
