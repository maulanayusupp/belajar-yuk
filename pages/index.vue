<script setup lang="ts">
import { lessonService } from '~/services/lessonService'

// Halaman utama (landing premium).
const subjects = lessonService.getSubjects()

const features = [
  {
    icon: '🎬',
    title: 'Animasi & Suara',
    text: 'Setiap pelajaran hidup dengan animasi lembut dan suara agar anak betah belajar.',
    tint: 'primary' as const,
  },
  {
    icon: '🧠',
    title: 'Metode Singapore Math',
    text: 'Berhitung pakai Number Bond & blok — cara belajar matematika kelas dunia.',
    tint: 'math' as const,
  },
  {
    icon: '🗣️',
    title: 'Belajar Bilingual',
    text: 'Petunjuk Bahasa Indonesia, materi Bahasa Inggris dengan pengucapan asli.',
    tint: 'english' as const,
  },
  {
    icon: '⭐',
    title: 'Kumpulkan Bintang',
    text: 'Selesaikan pelajaran, raih bintang, dan lihat kemajuan belajar setiap hari.',
    tint: 'warm' as const,
  },
]

const trust = ['🆓 Gratis', '🚫 Tanpa Iklan', '👶 Usia 6+', '📱 Bisa di HP']

useHead({ title: 'Belajar Yuk! — Belajar jadi Petualangan Seru' })
</script>

<template>
  <div class="home">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="hero__content anim-rise">
        <span class="hero__badge">✨ Platform Belajar Anak Nomor Satu</span>
        <h1 class="hero__title">
          Belajar jadi
          <span class="hero__title-grad">Petualangan Seru</span>
        </h1>
        <p class="hero__subtitle">
          Bahasa Inggris & Matematika untuk anak usia 6 tahun ke atas —
          penuh animasi, suara, dan permainan yang bikin ketagihan belajar.
        </p>

        <div class="hero__actions">
          <BaseButton variant="primary" size="lg" @click="navigateTo('/english')">
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

    <!-- ============ FITUR ============ -->
    <section class="section">
      <HomeSectionHeader
        eyebrow="Kenapa Belajar Yuk?"
        title="Cara belajar yang disukai anak"
        subtitle="Dirancang agar menyenangkan, mudah dipahami, dan bikin anak semangat setiap hari."
      />
      <div class="feature-grid">
        <HomeFeatureCard
          v-for="f in features"
          :key="f.title"
          :icon="f.icon"
          :title="f.title"
          :text="f.text"
          :tint="f.tint"
        />
      </div>
    </section>

    <!-- ============ PILIH PELAJARAN ============ -->
    <section class="section" id="subjects">
      <HomeSectionHeader
        eyebrow="Pilih Pelajaran"
        title="Mau belajar apa hari ini?"
        subtitle="Pilih salah satu dan mulai petualanganmu."
      />
      <div class="subject-grid">
        <SubjectCard v-for="subject in subjects" :key="subject.id" :subject="subject" />
      </div>
    </section>

    <!-- ============ METODE ============ -->
    <section class="section">
      <HomeSectionHeader
        eyebrow="Metode Terbukti"
        title="Belajar dengan metode kelas dunia"
        subtitle="Bukan sekadar hafalan — anak paham konsepnya."
      />
      <div class="method-grid">
        <div class="method-card">
          <span class="method-card__tag">Matematika</span>
          <h3>Singapore Math</h3>
          <p>
            Number Bond & pendekatan Concrete–Pictorial–Abstract membuat anak
            benar-benar memahami angka, bukan cuma menghafal.
          </p>
        </div>
        <div class="method-card">
          <span class="method-card__tag method-card__tag--english">Bahasa Inggris</span>
          <h3>Dengar & Ucapkan</h3>
          <p>
            Kosakata bergambar dengan pengucapan asli. Ketuk kartu, dengar
            bunyinya, lalu uji lewat kuis interaktif.
          </p>
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="section">
      <div class="cta anim-rise">
        <div class="cta__content">
          <h2 class="cta__title">Siap memulai petualangan belajar? 🎈</h2>
          <p class="cta__text">Gratis, tanpa iklan, dan langsung bisa dimainkan.</p>
        </div>
        <BaseButton variant="secondary" size="lg" @click="navigateTo('/english')">
          Ayo Mulai Sekarang →
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  @include flex(column, flex-start, stretch, 0);
}

.section {
  @include section-spacing;
  @include flex(column, flex-start, stretch, spacing('xl'));
}

// ---------------- HERO ----------------
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('xl');
  align-items: center;
  padding-block: spacing('xl') spacing('xxl');

  @include respond-to('lg') {
    grid-template-columns: 1.05fr 0.95fr;
    padding-block: spacing('xxl');
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
    inset: 10% 10% 10% 10%;
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

  @include respond-to('md') {
    grid-template-columns: 1fr 1fr;
  }
}

.method-card {
  @include card(spacing('xl'));
  @include hover-lift(-6px);
  @include flex(column, flex-start, flex-start, spacing('sm'));
  border: 1px solid $color-border;

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
