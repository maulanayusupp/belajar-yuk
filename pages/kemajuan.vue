<script setup lang="ts">
import { lessonService } from '~/services/lessonService'
import { badgeService } from '~/services/badgeService'
import { DAILY_GOAL } from '~/services/progressService'

// Halaman kemajuan: sapaan, streak, target harian, lencana, kartu
// pencapaian (share), rekomendasi, & peta jalur belajar.
const { profile, greetingName } = useProfile()
const { current, best } = useStreak()
const { progress, isCompleted } = useProgress()

const subjects = lessonService.getSubjects()
const allLessons = lessonService.getLessons()
const maxStars = computed(() => allLessons.length * 3)
const nextLesson = computed(() => lessonService.getNextLesson(isCompleted))

// Ringkasan progres (reaktif dari map progres).
const stats = computed(() => {
  const entries = Object.values(progress.value).filter((e) => e.completed)
  const bySubject = (s: string) =>
    entries.filter((e) => lessonService.getLesson(e.lessonId)?.subject === s).length
  return {
    completed: entries.length,
    mathCompleted: bySubject('math'),
    englishCompleted: bySubject('english'),
    perfect: entries.filter((e) => e.stars >= 3).length,
    totalStars: entries.reduce((sum, e) => sum + e.stars, 0),
    streakBest: best.value,
  }
})

const badges = computed(() => badgeService.all(stats.value))
const earnedBadges = computed(() => badges.value.filter((b) => b.earned).length)

// Target harian (jumlah pelajaran hari ini).
const goal = DAILY_GOAL
const doneToday = computed(() => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return Object.values(progress.value).filter((e) => e.updatedAt >= start.getTime()).length
})

useHead({ title: 'Kemajuan Belajar' })
</script>

<template>
  <div class="progress-page">
    <NuxtLink to="/" class="progress-page__back">← Beranda</NuxtLink>

    <!-- Sapaan + streak -->
    <section class="hello">
      <span class="hello__avatar" aria-hidden="true">{{ profile?.avatar ?? '🦉' }}</span>
      <div class="hello__text">
        <h1 class="hello__title">Halo, {{ greetingName }}! 👋</h1>
        <p class="hello__sub">Ini kemajuan belajarmu. Terus semangat!</p>
      </div>
      <div class="hello__streak">
        <span class="hello__flame" aria-hidden="true">🔥</span>
        <span class="hello__streak-num">{{ current }}</span>
        <span class="hello__streak-label">hari beruntun</span>
      </div>
    </section>

    <!-- Target harian -->
    <DailyGoal :done="doneToday" :goal="goal" />

    <!-- Ringkasan -->
    <section class="tiles">
      <div class="tile">
        <span class="tile__value">⭐ {{ stats.totalStars }}</span>
        <span class="tile__label">dari {{ maxStars }} bintang</span>
      </div>
      <div class="tile">
        <span class="tile__value">✅ {{ stats.completed }}</span>
        <span class="tile__label">dari {{ allLessons.length }} pelajaran</span>
      </div>
      <div class="tile">
        <span class="tile__value">🏅 {{ earnedBadges }}</span>
        <span class="tile__label">dari {{ badges.length }} lencana</span>
      </div>
    </section>

    <!-- Rekomendasi -->
    <NuxtLink v-if="nextLesson" :to="`/${nextLesson.subject}/${nextLesson.id}`" class="resume">
      <div class="resume__text">
        <span class="resume__eyebrow">Lanjutkan belajar</span>
        <span class="resume__title">{{ nextLesson.emoji }} {{ nextLesson.title }}</span>
      </div>
      <span class="resume__cta">Main →</span>
    </NuxtLink>

    <!-- Kartu pencapaian (share ke WhatsApp) -->
    <AchievementCard
      :name="greetingName"
      :avatar="profile?.avatar ?? '🦉'"
      :stars="stats.totalStars"
      :lessons="stats.completed"
      :streak="current"
      :badges="badges"
    />

    <!-- Lencana -->
    <section class="badges-section">
      <HomeSectionHeader
        align="left"
        eyebrow="Lencana"
        :title="`Lencana kamu (${earnedBadges}/${badges.length})`"
      />
      <BadgeShelf :badges="badges" />
    </section>

    <!-- Peta jalur belajar -->
    <section class="paths">
      <HomeSectionHeader align="left" eyebrow="Peta Jalur" title="Perjalanan belajarmu" />
      <JourneyPath v-for="s in subjects" :key="s.id" :subject="s.id" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.progress-page {
  @include flex(column, flex-start, stretch, spacing('xl'));
  padding-block: spacing('lg');

  &__back {
    align-self: flex-start;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;

    &:hover {
      background: rgba($color-primary, 0.1);
    }
  }
}

.hello {
  @include glass($glass-bg-strong);
  @include flex(row, flex-start, center, spacing('md'));
  flex-wrap: wrap;
  padding: spacing('lg');
  border-radius: $radius-xl;
  box-shadow: $shadow-md;

  &__avatar {
    @include flex-center;
    width: 72px;
    height: 72px;
    font-size: font-size('xl');
    background: rgba($color-primary, 0.1);
    border-radius: $radius-pill;
  }

  &__text {
    flex: 1;
    min-width: 180px;
  }

  &__title {
    margin: 0;
  }
  &__sub {
    margin: 0;
  }

  &__streak {
    @include flex(column, center, center);
    padding: spacing('sm') spacing('lg');
    background: rgba($color-accent-2, 0.18);
    border-radius: $radius-lg;
  }
  &__flame {
    font-size: font-size('lg');
  }
  &__streak-num {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xl');
    color: #c2410c;
    line-height: 1;
  }
  &__streak-label {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    color: $color-text-muted;
  }
}

.tiles {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing('md');

  @include respond-to('sm') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tile {
  @include glass($glass-bg-strong);
  @include flex(column, center, center, spacing('xs'));
  padding: spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  text-align: center;

  &__value {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xl');
    color: $color-ink;
  }
  &__label {
    font-size: font-size('sm');
    color: $color-text-muted;
  }
}

.resume {
  @include flex(row, space-between, center, spacing('md'));
  padding: spacing('lg') spacing('xl');
  border-radius: $radius-xl;
  background: $gradient-primary;
  box-shadow: $shadow-primary;
  color: $color-white;

  &__eyebrow {
    display: block;
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    opacity: 0.85;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  &__title {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
  }
  &__cta {
    @include glass(rgba(255, 255, 255, 0.22));
    padding: spacing('sm') spacing('lg');
    border-radius: $radius-pill;
    font-weight: $font-weight-bold;
    flex-shrink: 0;
  }
}

.paths,
.badges-section {
  @include flex(column, flex-start, stretch, spacing('lg'));
}
</style>
