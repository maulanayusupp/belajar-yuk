<script setup lang="ts">
import { lessonService } from '~/services/lessonService'
import { profileService } from '~/services/profileService'
import { levels as categories } from '~/data/levels'
import { storage } from '~/utils/storage'

// Home page (premium landing).
const subjects = lessonService.getSubjects()

// Profile, progress, & recommendation (client-side).
const { hasProfile, greetingName, profile } = useProfile()
const { isCompleted } = useProgress()
const nextLesson = computed(() => lessonService.getNextLesson(isCompleted))

// Profile onboarding: shown once for new visitors.
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
    icon: '📚',
    title: '4 Mata Pelajaran + Coding',
    text: 'Bahasa Inggris, Matematika, Sains, Membaca, & Coding — satu tempat untuk semua.',
    tint: 'primary' as const,
  },
  {
    icon: '🧠',
    title: 'Metode Terbukti',
    text: 'Singapore Math, phonics, & puzzle logika — anak paham konsep, bukan menghafal.',
    tint: 'math' as const,
  },
  {
    icon: '🎚️',
    title: 'Sesuai Usia',
    text: 'Kategori Junior, Medium, & Senior menyesuaikan tingkat dengan usia anak.',
    tint: 'english' as const,
  },
  {
    icon: '💪',
    title: 'Tumbuh Percaya Diri',
    text: 'Bintang, lencana, & rentetan harian membuat anak semangat belajar tiap hari.',
    tint: 'warm' as const,
  },
]

const trust = ['🎯 Metode Terbukti', '🎚️ Sesuai Usia', '🤖 Ada Coding', '👶 Usia 6+']

// Learning methods (dynamic from the registry) — Math + English + Science.
const mathMethods = lessonService.getUsedMathMethods()
const englishMethods = lessonService.getUsedEnglishActivities()
const scienceMethods = lessonService.getUsedScienceActivities()
const bahasaMethods = lessonService.getUsedBahasaActivities()

// Dynamic stats — automatically grow as lessons/methods are added.
const stats = [
  { value: lessonService.getLessons().length, label: 'Pelajaran seru' },
  {
    value:
      mathMethods.length + englishMethods.length + scienceMethods.length + bahasaMethods.length,
    label: 'Metode belajar',
  },
  { value: subjects.length, label: 'Mata pelajaran' },
  { value: '6+', label: 'Cocok usia' },
]

// Emoji for the running ribbon (marquee) — duplicated for a seamless loop.
const marquee = ['🐶', '🍎', '🔢', '🌈', '✋', '⭐', '🐱', '🍌', '🔤', '🧱', '🦁', '🍓', '🔟', '🎈']

// How it works (3 steps).
const steps = [
  {
    icon: '👆',
    title: 'Pilih pelajaran',
    text: 'Pilih dari 4 mata pelajaran atau Coding, sesuai kategori usia.',
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

// Skills learned across all subjects + coding.
const skills = [
  {
    icon: '🔤',
    title: 'Bahasa Inggris',
    text: 'Phonics A–Z, kosakata bergambar, menyimak, & mengeja kata.',
    tint: 'english' as const,
  },
  {
    icon: '📖',
    title: 'Membaca (Calistung)',
    text: 'Huruf, suku kata, merangkai kata, hingga membaca kalimat.',
    tint: 'warm' as const,
  },
  {
    icon: '🔢',
    title: 'Matematika',
    text: 'Berhitung, tambah–kurang, & Singapore Math (number bond, ten frame).',
    tint: 'math' as const,
  },
  {
    icon: '🔬',
    title: 'Sains',
    text: 'Panca indra, hewan & habitat, hingga tata surya lewat fakta seru.',
    tint: 'mint' as const,
  },
  {
    icon: '🤖',
    title: 'Coding & Logika',
    text: 'Susun perintah untuk memandu robot — berpikir seperti programmer.',
    tint: 'primary' as const,
  },
  {
    icon: '⚡',
    title: 'Kecepatan & Ketepatan',
    text: 'Latihan Kilat berwaktu melatih berhitung cepat & akurat.',
    tint: 'primary' as const,
  },
]

useHead({ title: 'Belajar Yuk! — Belajar jadi Petualangan Seru' })
</script>

<template>
  <div class="home">
    <!-- Welcome-back for a child who already has a profile -->
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
        <span class="hero__badge">🎯 Satu Aplikasi, Semua Kebutuhan Belajar Anak</span>
        <h1 class="hero__title">
          Bikin Anak Jago
          <span class="hero__title-grad">Inggris, Matematika, Sains &amp; Koding</span>
        </h1>
        <p class="hero__subtitle">
          Temani si kecil (usia 6+) belajar Bahasa Inggris, Matematika, Sains, Membaca, hingga
          Coding — langkah demi langkah, sesuai kategori usia, dengan metode yang terbukti.
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
          <BaseButton variant="ghost" size="lg" @click="navigateTo('/coding')">
            🤖 Coba Coding
          </BaseButton>
        </div>

        <NuxtLink to="/tes" class="hero__placement">
          🧭 Bingung mulai dari mana? <strong>Ikuti Tes Penempatan →</strong>
        </NuxtLink>

        <ul class="hero__trust">
          <li v-for="item in trust" :key="item" class="hero__trust-item">{{ item }}</li>
        </ul>
      </div>

      <!-- Floating decorative visual -->
      <div class="hero__visual" aria-hidden="true">
        <div class="hero__glow" />
        <div class="hero__ring" />
        <span class="hero__sparkle hero__sparkle--1">✨</span>
        <span class="hero__sparkle hero__sparkle--2">✨</span>
        <span class="hero__sparkle hero__sparkle--3">⭐</span>
        <span class="hero__sparkle hero__sparkle--4">🌟</span>
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

    <!-- ============ EMOJI RIBBON ============ -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="(e, i) in [...marquee, ...marquee]" :key="i" class="marquee__item">{{
          e
        }}</span>
      </div>
    </div>

    <!-- ============ FEATURES ============ -->
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

    <!-- ============ HOW IT WORKS ============ -->
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

    <!-- ============ CHOOSE A SUBJECT ============ -->
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

    <!-- ============ CATEGORIES (age tiers) ============ -->
    <section class="section">
      <HomeSectionHeader
        v-reveal
        eyebrow="Sesuai Usia"
        title="Materi untuk setiap tingkat"
        subtitle="Pilih kategori yang pas — anak belajar di level yang tepat, tidak terlalu mudah atau sulit."
      />
      <div class="cat-grid">
        <div
          v-for="(cat, i) in categories"
          :key="cat.id"
          v-reveal="i * 90"
          class="cat-card"
          :class="`cat-card--${cat.id}`"
        >
          <span class="cat-card__icon" aria-hidden="true">{{ cat.icon }}</span>
          <span class="cat-card__label">{{ cat.label }}</span>
          <span class="cat-card__age">{{ cat.age }}</span>
          <p class="cat-card__desc">{{ cat.description }}</p>
        </div>
      </div>
    </section>

    <!-- ============ CODING (separate module) ============ -->
    <section class="section">
      <NuxtLink v-reveal to="/coding" class="coding-band">
        <div class="coding-band__pattern" aria-hidden="true" />
        <span class="coding-band__emoji anim-float" aria-hidden="true">🤖</span>
        <div class="coding-band__text">
          <span class="coding-band__eyebrow">Baru · Coding</span>
          <h2 class="coding-band__title">Belajar Koding sambil bermain</h2>
          <p class="coding-band__desc">
            Susun perintah untuk memandu robot ke tujuan — melatih logika & cara berpikir
            programmer, langkah demi langkah.
          </p>
          <span class="coding-band__cta">Mulai Coding →</span>
        </div>
      </NuxtLink>
    </section>

    <!-- ============ WHAT YOU LEARN ============ -->
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

    <!-- ============ METHODS (dynamic) ============ -->
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
        <div
          v-for="(m, i) in scienceMethods"
          :key="m.activity"
          v-reveal="(mathMethods.length + englishMethods.length + i) * 70"
          class="method-card"
        >
          <span class="method-card__icon method-card__icon--science" aria-hidden="true">
            {{ m.icon }}
          </span>
          <span class="method-card__tag method-card__tag--science">Sains</span>
          <h3 class="method-card__title">{{ m.label }}</h3>
          <p>{{ m.description }}</p>
        </div>
        <div
          v-for="(m, i) in bahasaMethods"
          :key="m.activity"
          v-reveal="(mathMethods.length + englishMethods.length + scienceMethods.length + i) * 70"
          class="method-card"
        >
          <span class="method-card__icon method-card__icon--bahasa" aria-hidden="true">
            {{ m.icon }}
          </span>
          <span class="method-card__tag method-card__tag--bahasa">Membaca</span>
          <h3 class="method-card__title">{{ m.label }}</h3>
          <p>{{ m.description }}</p>
        </div>
      </div>
    </section>

    <!-- ============ STATS ============ -->
    <section class="section">
      <div v-reveal class="stats">
        <HomeStat v-for="s in stats" :key="s.label" :value="s.value" :label="s.label" />
      </div>
    </section>

    <!-- ============ FOR PARENTS ============ -->
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

    <!-- Profile onboarding (once for new visitors) -->
    <ProfileSetup v-if="mounted && showSetup" @close="closeSetup" />
  </div>
</template>

<style scoped lang="scss">
// UNIFORM vertical rhythm: a single source of spacing between sections in `.home`.
.home {
  display: flex;
  flex-direction: column;
  gap: spacing('xxl');

  @include respond-to('md') {
    gap: spacing('section');
  }
}

// Section = content column; spacing between sections is handled by `.home` (no double padding).
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

  &__placement {
    @include flex(row, center, center, spacing('xs'));
    padding: spacing('xs') spacing('md');
    font-size: font-size('sm');
    color: $color-primary-dark;
    background: rgba($color-primary, 0.1);
    border: 1px dashed rgba($color-primary, 0.4);
    border-radius: $radius-pill;
    transition: all $transition-base;

    &:hover {
      background: rgba($color-primary, 0.16);
      transform: translateY(-2px);
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

  // ---- Floating visual ----
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
    &--4 {
      top: 22%;
      right: 30%;
      animation-delay: 2s;
    }
  }

  // Dashed ring that slowly rotates behind the mascot.
  &__ring {
    position: absolute;
    top: 30%;
    left: 34%;
    width: 190px;
    height: 190px;
    border: 4px dashed rgba($color-primary, 0.3);
    border-radius: 50%;
    animation: spin 22s linear infinite;
  }
}

.float-card {
  @include glass($glass-bg-strong);
  position: absolute;
  @include flex(column, center, center, spacing('xs'));
  padding: spacing('md') spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  transition:
    transform $transition-base,
    box-shadow $transition-base;

  // Tilt & scale up slightly on hover (pause the floating animation).
  &:hover {
    animation-play-state: paused;
    transform: scale(1.06) rotate(-2deg);
    box-shadow: $shadow-xl;
  }

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

// ---------------- EMOJI RIBBON ----------------
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

// ---------------- CATEGORIES ----------------
.cat-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('md');

  @include respond-to('sm') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cat-card {
  @include glass($glass-bg-strong);
  @include hover-lift(-6px);
  @include flex(column, flex-start, flex-start, spacing('xs'));
  padding: spacing('xl') spacing('lg');
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  border-top: 6px solid $color-primary;

  &--beginner {
    border-top-color: $color-success;
  }
  &--intermediate {
    border-top-color: $color-primary;
  }
  &--advanced {
    border-top-color: $color-accent-2;
  }

  &__icon {
    font-size: font-size('xxl');
  }

  &__label {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    color: $color-ink;
  }

  &__age {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.12);
    padding: 2px spacing('sm');
    border-radius: $radius-pill;
    font-size: font-size('sm');
  }

  &__desc {
    margin: spacing('xs') 0 0;
    color: $color-ink-soft;
    font-size: font-size('sm');
  }
}

// ---------------- CODING BAND ----------------
.coding-band {
  @include hover-lift(-6px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: spacing('lg');
  text-align: center;
  padding: spacing('xl');
  border-radius: $radius-xl;
  background: $gradient-primary;
  box-shadow: $shadow-primary;
  color: $color-white;

  @include respond-to('md') {
    flex-direction: row;
    text-align: left;
  }

  &__pattern {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 88% 12%, rgba($color-white, 0.22) 0, transparent 30%),
      radial-gradient(circle at 10% 95%, rgba($color-white, 0.15) 0, transparent 35%);
  }

  &__emoji {
    position: relative;
    font-size: font-size('giant');
    filter: drop-shadow(0 12px 24px rgba(26, 16, 53, 0.3));
  }

  &__text {
    position: relative;
  }

  &__eyebrow {
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: font-size('sm');
    color: rgba($color-white, 0.85);
  }

  &__title {
    color: $color-white;
    margin: spacing('xs') 0;
  }

  &__desc {
    margin: 0 0 spacing('md');
    color: rgba($color-white, 0.92);
    max-width: 52ch;
  }

  &__cta {
    @include glass(rgba(255, 255, 255, 0.22));
    display: inline-block;
    padding: spacing('sm') spacing('lg');
    border-radius: $radius-pill;
    font-weight: $font-weight-bold;
  }
}

// ---------------- METHODS ----------------
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

  &:hover &__icon {
    animation: wiggle 0.5s ease;
  }

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

    &--science {
      background: rgba($color-science, 0.15);
    }

    &--bahasa {
      background: rgba($color-bahasa, 0.15);
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

    &--science {
      color: $color-science-dark;
      background: rgba($color-science, 0.15);
    }

    &--bahasa {
      color: $color-bahasa-dark;
      background: rgba($color-bahasa, 0.15);
    }
  }
}

// ---------------- HOW IT WORKS ----------------
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

  &:hover &__icon {
    animation: wiggle 0.5s ease;
  }

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

// ---------------- FOR PARENTS ----------------
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

// ---------------- STATS ----------------
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
