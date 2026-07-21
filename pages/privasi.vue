<script setup lang="ts">
// Privacy Policy. Honest & simple because the app is 100% client-side: no
// accounts, no backend, no personal data leaves the device (localStorage only).
// NOTE: update CONTACT_EMAIL to your real contact address before launch.
const CONTACT_EMAIL = 'kontak@belajar-yuk.app'
const UPDATED = '21 Juli 2026'

const DESCRIPTION =
  'Kebijakan Privasi Belajar Yuk!: aplikasi belajar anak tanpa akun & tanpa server — ' +
  'semua data belajar tersimpan hanya di perangkat. Privasi anak adalah prioritas.'

useSeoMeta({
  title: 'Kebijakan Privasi',
  description: DESCRIPTION,
  ogTitle: 'Kebijakan Privasi — Belajar Yuk!',
  ogDescription: DESCRIPTION,
})
</script>

<template>
  <LegalDocument
    title="Kebijakan Privasi"
    :updated="UPDATED"
    intro="Belajar Yuk! dibuat untuk anak dan keluarga. Melindungi privasi anak adalah prioritas kami — dan kami melakukannya dengan cara paling sederhana: dengan tidak mengumpulkan data pribadi sama sekali."
  >
    <h2>Ringkasan Singkat</h2>
    <p>
      Belajar Yuk! adalah aplikasi yang berjalan <strong>sepenuhnya di perangkat Anda</strong>.
      Tidak ada akun, tidak ada login, dan tidak ada server yang menyimpan data Anda. Semua kemajuan
      belajar hanya tersimpan di peramban (browser) perangkat yang dipakai.
    </p>

    <h2>Data yang TIDAK Kami Kumpulkan</h2>
    <p>Kami tidak pernah meminta, mengumpulkan, atau mengirim data pribadi berikut:</p>
    <ul>
      <li>Nama lengkap, tanggal lahir, alamat, atau nomor telepon.</li>
      <li>Email atau kata sandi (tidak ada sistem akun).</li>
      <li>Lokasi, kontak, foto, kamera, atau mikrofon.</li>
      <li>Data biometrik atau pengenal perangkat untuk iklan.</li>
    </ul>

    <h2>Data yang Disimpan di Perangkat</h2>
    <p>
      Agar pengalaman belajar berkesinambungan, aplikasi menyimpan beberapa hal
      <strong>hanya di perangkat Anda</strong> (melalui penyimpanan lokal peramban /
      <em>localStorage</em>) — tidak pernah dikirim ke mana pun:
    </p>
    <ul>
      <li>Kemajuan belajar: pelajaran selesai, bintang, dan level Coding yang terbuka.</li>
      <li>Nama panggilan &amp; avatar (opsional) untuk menyapa anak. Bebas dikosongkan.</li>
      <li>Preferensi seperti suara aktif/nonaktif dan ukuran teks.</li>
    </ul>
    <p class="legal__note">
      Karena data ini ada di perangkat, membersihkan data peramban atau berpindah perangkat akan
      menghapus kemajuan tersebut. Anda dapat menghapusnya kapan saja melalui
      <strong>Area Orang Tua → Reset</strong>.
    </p>

    <h2>Suara &amp; Pengucapan</h2>
    <p>
      Fitur "dengar" membacakan teks pelajaran menggunakan pembaca suara bawaan peramban (Web Speech
      API) atau layanan text-to-speech. Yang dibacakan hanyalah materi pelajaran (kata, kalimat,
      instruksi) — bukan data pribadi.
    </p>

    <h2>Analitik</h2>
    <p>
      Jika analitik diaktifkan, kami hanya memakai layanan yang ramah privasi (Plausible Analytics)
      yang <strong>tanpa cookie</strong> dan tidak mengumpulkan data pribadi — hanya statistik
      kunjungan agregat (mis. jumlah halaman dibuka). Tidak ada profil pengguna yang dibangun, dan
      tidak ada data yang dijual atau dibagikan.
    </p>

    <h2>Tanpa Iklan &amp; Tanpa Pelacak Pihak Ketiga</h2>
    <p>
      Belajar Yuk! tidak menampilkan iklan dan tidak memuat pelacak iklan pihak ketiga. Satu-satunya
      sumber daya eksternal adalah font (Google Fonts) untuk tampilan huruf yang ramah anak.
    </p>

    <h2>Berbagi Sertifikat</h2>
    <p>
      Saat Anda menekan "Bagikan" pada sertifikat, gambar dibuat langsung di perangkat. Anda sendiri
      yang memilih untuk membagikannya (mis. ke WhatsApp) — aplikasi tidak mengunggah gambar itu ke
      server kami.
    </p>

    <h2>Privasi Anak &amp; Kepatuhan (COPPA / GDPR-K)</h2>
    <p>
      Aplikasi ini ditujukan untuk anak dengan pendampingan orang tua. Karena kami
      <strong>tidak mengumpulkan data pribadi apa pun</strong> dari anak maupun orang dewasa, tidak
      ada data anak yang diproses, disimpan, atau dibagikan di server kami. Pendekatan ini sejalan
      dengan semangat <strong>Children's Online Privacy Protection Act (COPPA)</strong> di AS dan
      aturan perlindungan data anak (GDPR-K) di Uni Eropa. Kami menganjurkan orang tua tetap
      mendampingi anak saat menggunakan perangkat.
    </p>

    <h2>Perubahan Kebijakan</h2>
    <p>
      Bila ada pembaruan, kami akan mengubah tanggal "terakhir diperbarui" di halaman ini. Karena
      tidak ada akun/email, perubahan penting diumumkan melalui aplikasi.
    </p>

    <h2>Hubungi Kami</h2>
    <p>
      Ada pertanyaan tentang privasi? Hubungi kami di
      <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a
      >.
    </p>
  </LegalDocument>
</template>
