<script setup lang="ts">
import { lessonService } from '~/services/lessonService'
import { profileService } from '~/services/profileService'
import { storage } from '~/utils/storage'

// Halaman utama (landing premium).
const subjects = lessonService.getSubjects()

// Profil, progres, & rekomendasi (klien).
const { hasProfile, greetingName, profile } = useProfile()
const { isCompleted } = useProgress()
const nextLesson = computed(() => lessonService.getNextLesson(isCompleted))

// Onboarding profil: tampil sekali untuk pengunjung baru.
const ONBOARD_KEY = 'belajar-yuk:onboarded'
const mounted = ref(false)
const showSetup = ref(false)
onMounted(() => {
  mounted.value = true
  if (!profileService.get() && !storage.get(ONBOARD_KEY, false)) showSetup.value = true
})
function closeSetup() {
  showSetup.value = false
  storage.set(ONBOARD_KEY, true)
}

const features = [
  {
    icon: '🧠',
    title: 'Metode Singapore Math',
    text: 'Number Bond, Ten Frame & blok — anak paham konsep, bukan sekadar menghafal.',
    tint: 'math' as const,
  },
  {
    icon: '🔤',
    title: 'Fondasi Membaca',
    text: 'Phonics & kosakata bergambar membangun kemampuan berbahasa Inggris sejak dini.',
    tint: 'english' as const,
  },
  {
    icon: '📈',
    title: 'Belajar Bertahap',
    text: 'Materi tersusun dari mudah ke sulit agar anak maju selangkah demi selangkah.',
    tint: 'primary' as const,
  },
  {
    icon: '💪',
    title: 'Tumbuh Percaya Diri',
    text: 'Setiap pelajaran selesai menambah bintang & semangat anak untuk terus belajar.',
    tint: 'warm' as const,
  },
]

const trust = ['🎯 Metode Terbukti', '📈 Belajar Bertahap', '🧠 Bangun Fondasi', '👶 Usia 6+']

// Metode belajar (dinamis dari registry) — Matematika + Bahasa Inggris.
const mathMethods = lessonService.getUsedMathMethods()
const englishMethods = lessonService.getUsedEnglishActivities()

// Statistik dinamis — otomatis ikut bertambah saat materi/metode ditambah.
const stats = [
  { value: lessonService.getLessons().length, label: 'Pelajaran seru' },
  { value: mathMethods.length + englishMethods.length, label: 'Metode belajar' },
  { value: subjects.length, label: 'Mata pelajaran' },
  { value: '6+', label: 'Cocok usia' },
]

// Emoji untuk pita berjalan (marquee) — digandakan agar mulus.
const marquee = ['🐶', '🍎', '🔢', '🌈', '✋', '⭐', '🐱', '🍌', '🔤', '🧱', '🦁', '🍓', '🔟', '🎈']

// Cara kerja (3 langkah).
const steps = [
  {
    icon: '👆',
    title: 'Pilih pelajaran',
    text: 'Pilih Bahasa Inggris atau Matematika sesuai tingkat.',
  },
  {
    icon: '🎮',
    title: 'Belajar sambil bermain',
    text: 'Ketuk, dengar, & jawab — dipandu maskot yang ramah.',
  },
  {
    icon: '🏆',
    title: 'Raih bintang & lencana',
    text: 'Kumpulkan bintang, jaga streak, buka lencana baru.',
  },
]

// Keterampilan yang dipelajari (selaras kerangka literasi & numerasi).
const skills = [
  {
    icon: '🔤',
    title: 'Membaca (Phonics)',
    text: 'Bunyi huruf A–Z & kata CVC — fondasi membaca.',
    tint: 'english' as const,
  },
  {
    icon: '📗',
    title: 'Kosakata & Kata Umum',
    text: 'Ratusan kata bergambar + sight words.',
    tint: 'english' as const,
  },
  {
    icon: '🔢',
    title: 'Berhitung 1–20',
    text: 'Mengenal & menghitung angka dengan benda nyata.',
    tint: 'math' as const,
  },
  {
    icon: '➕',
    title: 'Tambah & Kurang',
    text: 'Operasi dasar dengan blok, ten frame, & garis bilangan.',
    tint: 'math' as const,
  },
  {
    icon: '🧠',
    title: 'Singapore Math',
    text: 'Number bond & pendekatan konkret–gambar–abstrak.',
    tint: 'primary' as const,
  },
  {
    icon: '😊',
    title: 'Sosial-Emosional',
    text: 'Mengenal perasaan & sapaan sehari-hari.',
    tint: 'warm' as const,
  },
]

useHead({ title: 'Belajar Yuk! — Belajar jadi Petualangan Seru' })
</script>

<template>
  <div class="home">
    <!-- Sapaan kembali untuk anak yang sudah punya profil -->
    <NuxtLink
      v-if="mounted && hasProfile && nextLesson"
      :to="`/${nextLesson.subject}/${nextLesson.id}`"
      class="welcome anim-rise"
    >
      <span class="welcome__avatar" aria-hidden="true">{{ profile?.avatar }}</span>
      <span class="welcome__text">
        <strong>Halo lagi, {{ greetingName }}! 👋</strong>
        Lanjut ke: {{ nextLesson.emoji }} {{ nextLesson.title }}
      </span>
      <span class="welcome__cta">Lanjutkan →</span>
    </NuxtLink>

    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="hero__content anim-rise">
        <span class="hero__badge">🎯 Fondasi Belajar yang Kuat Sejak Dini</span>
        <h1 class="hero__title">
          Bikin Anak Jago
          <span class="hero__title-grad">Inggris & Matematika</span>
        </h1>
        <p class="hero__subtitle">
          Temani si kecil (usia 6+) menguasai Bahasa Inggris & Matematika langkah demi langkah
          dengan metode Singapore Math yang terbukti — membangun fondasi kuat & percaya diri.
        </p>

        <div class="hero__actions">
          <BaseButton
            class="anim-pulse-ring"
            variant="primary"
            size="lg"
            @click="navigateTo('/english')"
          >
            🚀 Mulai Belajar
          </BaseButton>
          <BaseButton variant="ghost" size="lg" @click="navigateTo('/math')">
            🔢 Coba Matematika
          </BaseButton>
        </div>

        <ul class="hero__trust">
          <li v-for="item in trust" :key="item" class="hero__trust-item">{{ item }}</li>
        </ul>
      </div>

      <!-- Visual dekoratif mengambang -->
      <div class="hero__visual" aria-hidden="true">
        <div class="hero__glow" />
        <span class="hero__sparkle hero__sparkle--1">✨</span>
        <span class="hero__sparkle hero__sparkle--2">✨</span>
        <span class="hero__sparkle hero__sparkle--3">⭐</span>
        <div class="hero__mascot anim-float-slow">🦉</div>

        <div class="float-card float-card--1 anim-float">
          <span class="float-card__emoji">🐶</span>
          <span class="float-card__label">Dog = Anjing</span>
        </div>
        <div class="float-card float-card--2 anim-float-slow">
          <span class="float-card__big">3 + 2 = 5</span>
        </div>
        <div class="float-card float-card--3 anim-float">
          <span class="float-card__stars">⭐⭐⭐</span>
          <span class="float-card__label">Hebat!</span>
        </div>
        <div class="float-card float-card--4 anim-float-slow">
          <span class="float-card__emoji">🍎</span>
          <span class="float-card__label">Apple</span>
        </div>
      </div>
    </section>

    <!-- ============ PITA EMOJI ============ -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="(e, i) in [...marquee, ...marquee]" :key="i" class="marquee__item">{{
          e
        }}</span>
      </div>
    </div>

    <!-- ============ FITUR ============ -->
    <section class="section">
      <HomeSectionHeader
        v-reveal
        eyebrow="Kenapa Belajar Yuk?"
        title="Cara belajar yang disukai anak"
        subtitle="Dirancang agar menyenangkan, mudah dipahami, dan bikin anak semangat setiap hari."
      />
      <div class="feature-grid">
        <HomeFeatureCard
          v-for="(f, i) in features"
          :key="f.title"
          v-reveal="i * 90"
          :icon="f.icon"
          :title="f.title"
          :text="f.text"
          :tint="f.tint"
        />
      </div>
    </section>

    <!-- ============ CARA KERJA ============ -->
    <section class="section">
      <HomeSectionHeader v-reveal eyebrow="Cara Kerja" title="Belajar dalam 3 langkah mudah" />
      <div class="steps">
        <div v-for="(s, i) in steps" :key="s.title" v-reveal="i * 90" class="step">
          <span class="step__num">{{ i + 1 }}</span>
          <span class="step__icon" aria-hidden="true">{{ s.icon }}</span>
          <h3 class="step__title">{{ s.title }}</h3>
          <p class="step__text">{{ s.text }}</p>
        </div>
      </div>
    </section>

    <!-- ============ PILIH PELAJARAN ============ -->
    <section id="subjects" class="section">
      <HomeSectionHeader
        v-reveal
        eyebrow="Pilih Pelajaran"
        title="Mau belajar apa hari ini?"
        subtitle="Pilih salah satu dan mulai petualanganmu."
      />
      <div class="subject-grid">
        <SubjectCard
          v-for="(subject, i) in subjects"
          :key="subject.id"
          v-reveal="i * 120"
          :subject="subject"
        />
      </div>
    </section>

    <!-- ============ YANG DIPELAJARI ============ -->
    <section class="section">
      <HomeSectionHeader
        v-reveal
        eyebrow="Yang Dipelajari"
        title="Keterampilan penting sejak dini"
        subtitle="Mengikuti kerangka literasi & numerasi yang terbukti."
      />
      <div class="feature-grid">
        <HomeFeatureCard
          v-for="(s, i) in skills"
          :key="s.title"
          v-reveal="i * 70"
          :icon="s.icon"
          :title="s.title"
          :text="s.text"
          :tint="s.tint"
        />
      </div>
    </section>

    <!-- ============ METODE (dinamis) ============ -->
    <section class="section">
      <HomeSectionHeader
        v-reveal
        eyebrow="Metode Terbukti"
        title="Belajar dengan metode kelas dunia"
        subtitle="Bukan sekadar hafalan — anak paham konsepnya."
      />
      <div class="method-grid">
        <div v-for="(m, i) in mathMethods" :key="m.method" v-reveal="i * 70" class="method-card">
          <span class="method-card__icon" aria-hidden="true">{{ m.icon }}</span>
          <span class="method-card__tag">Matematika</span>
          <h3 class="method-card__title">{{ m.label }}</h3>
          <p>{{ m.description }}</p>
        </div>
        <div
          v-for="(m, i) in englishMethods"
          :key="m.activity"
          v-reveal="(mathMethods.length + i) * 70"
          class="method-card"
        >
          <span class="method-card__icon method-card__icon--english" aria-hidden="true">
            {{ m.icon }}
          </span>
          <span class="method-card__tag method-card__tag--english">Bahasa Inggris</span>
          <h3 class="method-card__title">{{ m.label }}</h3>
          <p>{{ m.description }}</p>
        </div>
      </div>
    </section>

    <!-- ============ STATISTIK ============ -->
    <section class="section">
      <div v-reveal class="stats">
        <HomeStat v-for="s in stats" :key="s.label" :value="s.value" :label="s.label" />
      </div>
    </section>

    <!-- ============ UNTUK ORANG TUA ============ -->
    <section class="section">
      <div v-reveal class="parents">
        <div class="parents__text">
          <span class="parents__eyebrow">👨‍👩‍👧 Untuk Orang Tua</span>
          <h2 class="parents__title">Pantau kemajuan si kecil</h2>
          <p class="parents__desc">
            Lihat bintang, streak harian, & lencana yang diraih di halaman Kemajuan. Atur suara,
            profil, & reset lewat Area Orang Tua yang terlindungi.
          </p>
          <div class="parents__actions">
            <BaseButton variant="primary" @click="navigateTo('/kemajuan')"
              >📊 Lihat Kemajuan</BaseButton
            >
            <BaseButton variant="ghost" @click="navigateTo('/orangtua')"
              >👨‍👩‍👧 Area Orang Tua</BaseButton
            >
          </div>
        </div>
        <span class="parents__emoji anim-float" aria-hidden="true">📈</span>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="section">
      <div v-reveal class="cta">
        <div class="cta__content">
          <h2 class="cta__title">Bangun fondasi belajar anak, mulai hari ini 🎈</h2>
          <p class="cta__text">Temani anak menguasai pelajaran pertamanya sekarang.</p>
        </div>
        <BaseButton variant="secondary" size="lg" @click="navigateTo('/english')">
          Ayo Mulai Sekarang →
        </BaseButton>
      </div>
    </section>

    <!-- Onboarding profil (sekali untuk pengunjung baru) -->
    <ProfileSetup v-if="mounted && showSetup" @close="closeSetup" />
  </div>
</template>

<style scoped lang="scss">
// Ritme vertikal SERAGAM: satu sumber jarak antar-section di `.home`.
.home {
  display: flex;
  flex-direction: column;
  gap: spacing('xxl');

  @include respond-to('md') {
    gap: spacing('section');
  }
}

// Section = kolom konten; jarak antar-section diatur oleh `.home` (tanpa padding dobel).
.section {
  @include flex(column, flex-start, stretch, spacing('xl'));
}

.welcome {
  @include glass($glass-bg-strong);
  @include flex(row, flex-start, center, spacing('md'));
  flex-wrap: wrap;
  padding: spacing('md') spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  border: 2px solid rgba($color-primary, 0.25);

  &__avatar {
    @include flex-center;
    width: 48px;
    height: 48px;
    font-size: font-size('lg');
    background: rgba($color-primary, 0.1);
    border-radius: $radius-pill;
  }

  &__text {
    flex: 1;
    min-width: 160px;
    color: $color-text-muted;

    strong {
      display: block;
      color: $color-ink;
    }
  }

  &__cta {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
  }
}

// ---------------- HERO ----------------
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('xl');
  align-items: center;
  padding-top: spacing('md');

  @include respond-to('lg') {
    grid-template-columns: 1.05fr 0.95fr;
  }

  &__content {
    @include flex(column, flex-start, flex-start, spacing('lg'));
    text-align: center;
    align-items: center;

    @include respond-to('lg') {
      text-align: left;
      align-items: flex-start;
    }
  }

  &__badge {
    @include glass($glass-bg-strong);
    padding: spacing('xs') spacing('md');
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
  }

  &__title {
    font-size: font-size('xxl');
    line-height: 1.05;

    @include respond-to('md') {
      font-size: font-size('giant');
    }
  }

  &__title-grad {
    display: block;
    @include gradient-text($gradient-aurora);
    background-size: 200% auto;
    animation: gradient-shift 5s ease infinite;
  }

  &__subtitle {
    font-size: font-size('lg');
    color: $color-text-muted;
    max-width: 520px;
  }

  &__actions {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;

    @include respond-to('lg') {
      justify-content: flex-start;
    }
  }

  &__trust {
    @include flex(row, center, center, spacing('sm'));
    flex-wrap: wrap;

    @include respond-to('lg') {
      justify-content: flex-start;
    }
  }

  &__trust-item {
    font-size: font-size('sm');
    font-weight: $font-weight-semibold;
    color: $color-ink-soft;
    background: rgba($color-white, 0.7);
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
  }

  // ---- Visual mengambang ----
  &__visual {
    position: relative;
    min-height: 360px;
    display: none;

    @include respond-to('lg') {
      display: block;
    }
  }

  &__glow {
    position: absolute;
    inset: 10%;
    background: $gradient-aurora;
    filter: blur(70px);
    opacity: 0.35;
    border-radius: 50%;
  }

  &__mascot {
    position: absolute;
    top: 34%;
    left: 38%;
    font-size: 8rem;
    filter: drop-shadow(0 20px 30px rgba(26, 16, 53, 0.25));
  }

  &__sparkle {
    position: absolute;
    font-size: font-size('lg');
    animation: sparkle 2.4s ease-in-out infinite;

    &--1 {
      top: 12%;
      left: 30%;
    }
    &--2 {
      top: 60%;
      right: 22%;
      animation-delay: 0.8s;
    }
    &--3 {
      bottom: 20%;
      left: 24%;
      animation-delay: 1.5s;
    }
  }
}

.float-card {
  @include glass($glass-bg-strong);
  position: absolute;
  @include flex(column, center, center, spacing('xs'));
  padding: spacing('md') spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;

  &__emoji {
    font-size: font-size('xl');
  }
  &__big {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    color: $color-math-dark;
  }
  &__stars {
    font-size: font-size('md');
  }
  &__label {
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &--1 {
    top: 6%;
    left: 2%;
    animation-delay: 0.2s;
  }
  &--2 {
    top: 0;
    right: 6%;
    animation-delay: 1s;
  }
  &--3 {
    bottom: 10%;
    right: 0;
    animation-delay: 0.6s;
  }
  &--4 {
    bottom: 4%;
    left: 6%;
    animation-delay: 1.4s;
  }
}

// ---------------- PITA EMOJI ----------------
.marquee {
  overflow: hidden;
  padding-block: spacing('md');
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);

  &__track {
    display: flex;
    gap: spacing('xl');
    width: max-content;
    animation: marquee 30s linear infinite;
  }

  &__item {
    font-size: font-size('xl');
    opacity: 0.85;
  }
}

// ---------------- GRID ----------------
.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('lg');

  @include respond-to('sm') {
    grid-template-columns: 1fr 1fr;
  }
  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.subject-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('lg');

  @include respond-to('md') {
    grid-template-columns: 1fr 1fr;
  }
}

// ---------------- METODE ----------------
.method-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('lg');

  @include respond-to('sm') {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

.method-card {
  @include card(spacing('lg'));
  @include hover-lift(-6px);
  @include flex(column, flex-start, flex-start, spacing('sm'));
  border: 1px solid $color-border;

  &__icon {
    @include flex-center;
    width: 56px;
    height: 56px;
    font-size: font-size('xl');
    background: rgba($color-math, 0.12);
    border-radius: $radius-md;

    &--english {
      background: rgba($color-english, 0.15);
    }
  }

  &__title {
    margin: 0;
  }

  &__tag {
    padding: spacing('xs') spacing('md');
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-math-dark;
    background: rgba($color-math, 0.12);
    border-radius: $radius-pill;

    &--english {
      color: $color-english-dark;
      background: rgba($color-english, 0.15);
    }
  }
}

// ---------------- CARA KERJA ----------------
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('lg');

  @include respond-to('md') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.step {
  @include glass($glass-bg-strong);
  @include hover-lift(-6px);
  @include flex(column, flex-start, flex-start, spacing('sm'));
  position: relative;
  padding: spacing('xl') spacing('lg') spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &__num {
    @include flex-center;
    position: absolute;
    top: -18px;
    left: spacing('lg');
    width: 40px;
    height: 40px;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    color: $color-white;
    background: $gradient-primary;
    border-radius: $radius-pill;
    box-shadow: $shadow-primary;
  }

  &__icon {
    font-size: font-size('xxl');
  }

  &__title {
    margin: 0;
  }

  &__text {
    margin: 0;
    font-size: font-size('sm');
  }
}

// ---------------- UNTUK ORANG TUA ----------------
.parents {
  @include flex(row, space-between, center, spacing('xl'));
  flex-wrap: wrap;
  padding: spacing('xl');
  border-radius: $radius-xl;
  background: $gradient-mint;
  box-shadow: 0 16px 40px rgba(0, 206, 201, 0.35);
  color: $color-white;

  &__text {
    flex: 1;
    min-width: 260px;
    @include flex(column, flex-start, flex-start, spacing('sm'));
  }

  &__eyebrow {
    font-weight: $font-weight-bold;
    background: rgba($color-white, 0.2);
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
  }

  &__title {
    color: $color-white;
    margin: 0;
  }

  &__desc {
    color: rgba($color-white, 0.95);
    margin: 0;
    max-width: 560px;
  }

  &__actions {
    @include flex(row, flex-start, center, spacing('md'));
    flex-wrap: wrap;
    margin-top: spacing('sm');
  }

  &__emoji {
    font-size: font-size('giant');
  }
}

// ---------------- STATISTIK ----------------
.stats {
  @include glass($glass-bg-strong);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: spacing('lg');
  padding: spacing('xl');
  border-radius: $radius-xl;
  box-shadow: $shadow-md;

  @include respond-to('md') {
    grid-template-columns: repeat(4, 1fr);
  }
}

// ---------------- CTA ----------------
.cta {
  @include flex(column, center, center, spacing('lg'));
  text-align: center;
  padding: spacing('xxl') spacing('xl');
  border-radius: $radius-xl;
  background: $gradient-primary;
  background-size: 180% 180%;
  animation: gradient-shift 8s ease infinite;
  box-shadow: $shadow-primary;

  @include respond-to('md') {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  &__title {
    color: $color-white;
    margin: 0;
  }

  &__text {
    color: rgba($color-white, 0.9);
    margin: 0;
  }
}
</style>
