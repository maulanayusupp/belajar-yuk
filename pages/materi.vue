<script setup lang="ts">
import type { AnyCodingLevel, Level } from '~/types'
import { lessonService } from '~/services/lessonService'
import { codingService } from '~/services/codingService'
import { levels as tiers } from '~/data/levels'

// "Daftar Materi" — a table of contents for everything: subjects grouped by
// tier → lessons, plus the Coding worlds. Gives structure & direction when
// there are many materials. Reads from the services (auto-grows with content).
const subjects = lessonService.getSubjects()
const { getStars, isCompleted } = useProgress()
const nextLesson = computed(() => lessonService.getNextLesson(isCompleted))

const allLessons = lessonService.getLessons()
const codingWorlds = codingService.getWorlds()
const codingLevels = codingService.getLevels()

// Progress read on the client (localStorage) — avoids SSR/hydration mismatch.
const codingStars = ref<Record<string, number>>({})
const ready = ref(false)
onMounted(() => {
  codingStars.value = codingService.getStarMap()
  ready.value = true
})

function tierMeta(id: Level) {
  return tiers.find((t) => t.id === id) ?? tiers[0]
}
function groups(subjectId: string) {
  return lessonService.getLessonsGrouped(subjectId as never)
}

// Totals for the summary.
const totalMaterials = computed(() => allLessons.length + codingLevels.length)
const doneMaterials = computed(() => {
  const lessonsDone = allLessons.filter((l) => isCompleted(l.id)).length
  const codingDone = ready.value
    ? codingLevels.filter((l) => (codingStars.value[l.id] ?? 0) > 0).length
    : 0
  return lessonsDone + codingDone
})

function codingLevelTitle(l: AnyCodingLevel): string {
  return l.title
}

useHead({ title: 'Daftar Materi — Belajar Yuk!' })
</script>

<template>
  <div class="toc">
    <NuxtLink to="/" class="toc__back">← Beranda</NuxtLink>

    <header class="toc__head">
      <h1 class="toc__title">📚 Daftar Materi</h1>
      <p class="toc__subtitle">
        Semua yang bisa dipelajari, tersusun rapi dari mudah ke sulit. Ikuti urutannya!
      </p>
      <p class="toc__count">
        <strong>{{ doneMaterials }}</strong> dari {{ totalMaterials }} materi selesai
      </p>
    </header>

    <!-- Continue where you left off -->
    <NuxtLink v-if="nextLesson" :to="`/${nextLesson.subject}/${nextLesson.id}`" class="toc__resume">
      <span class="toc__resume-eyebrow">Lanjutkan belajar</span>
      <span class="toc__resume-title">{{ nextLesson.emoji }} {{ nextLesson.title }}</span>
      <span class="toc__resume-cta">Main →</span>
    </NuxtLink>

    <!-- Subjects -->
    <section v-for="subject in subjects" :key="subject.id" class="subj">
      <NuxtLink :to="`/${subject.id}`" class="subj__head" :class="`subj__head--${subject.theme}`">
        <span class="subj__emoji" aria-hidden="true">{{ subject.emoji }}</span>
        <span class="subj__name">{{ subject.title }}</span>
        <span class="subj__go" aria-hidden="true">→</span>
      </NuxtLink>

      <div v-for="g in groups(subject.id)" :key="g.meta.id" class="tier">
        <p class="tier__label">{{ g.meta.icon }} {{ g.meta.label }} · {{ g.meta.age }}</p>
        <ul class="rows">
          <li v-for="lesson in g.lessons" :key="lesson.id">
            <NuxtLink :to="`/${subject.id}/${lesson.id}`" class="row">
              <span class="row__emoji" aria-hidden="true">{{ lesson.emoji }}</span>
              <span class="row__title">{{ lesson.title }}</span>
              <span v-if="isCompleted(lesson.id)" class="row__done" aria-label="Selesai">
                <BaseStarRating :value="getStars(lesson.id)" size="sm" />
              </span>
              <span v-else class="row__todo" aria-hidden="true">○</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Coding -->
    <section class="subj">
      <NuxtLink to="/coding" class="subj__head subj__head--coding">
        <span class="subj__emoji" aria-hidden="true">🤖</span>
        <span class="subj__name">Coding</span>
        <span class="subj__go" aria-hidden="true">→</span>
      </NuxtLink>

      <div v-for="world in codingWorlds" :key="world.id" class="tier">
        <p class="tier__label">
          {{ world.icon }} {{ world.title }} · {{ tierMeta(world.level).label }}
        </p>
        <ul class="rows">
          <li v-for="level in world.levels" :key="level.id">
            <NuxtLink :to="`/coding/${level.id}`" class="row">
              <span class="row__emoji" aria-hidden="true">{{ world.icon }}</span>
              <span class="row__title">{{ codingLevelTitle(level) }}</span>
              <span v-if="ready && (codingStars[level.id] ?? 0) > 0" class="row__done">
                <BaseStarRating :value="codingStars[level.id]" size="sm" />
              </span>
              <span v-else class="row__todo" aria-hidden="true">○</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.toc {
  @include flex(column, flex-start, stretch, spacing('lg'));
  padding-block: spacing('lg');
  max-width: 760px;
  margin-inline: auto;

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

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }
  &__title {
    margin: 0;
  }
  &__subtitle {
    margin: 0;
    color: $color-text-muted;
  }
  &__count {
    margin: 0;
    font-weight: $font-weight-semibold;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.1);
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
  }

  &__resume {
    @include flex(row, flex-start, center, spacing('md'));
    flex-wrap: wrap;
    padding: spacing('md') spacing('lg');
    border-radius: $radius-lg;
    background: $gradient-primary;
    box-shadow: $shadow-primary;
    color: $color-white;

    &-eyebrow {
      font-size: font-size('xs');
      font-weight: $font-weight-bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.85;
    }
    &-title {
      flex: 1;
      min-width: 140px;
      font-family: $font-family-display;
      font-weight: $font-weight-bold;
    }
    &-cta {
      @include glass(rgba(255, 255, 255, 0.22));
      padding: spacing('xs') spacing('md');
      border-radius: $radius-pill;
      font-weight: $font-weight-bold;
    }
  }
}

.subj {
  @include flex(column, flex-start, stretch, spacing('sm'));

  &__head {
    @include flex(row, flex-start, center, spacing('sm'));
    padding: spacing('sm') spacing('md');
    border-radius: $radius-lg;
    color: $color-white;
    box-shadow: $shadow-sm;

    &--english {
      background: $gradient-english;
    }
    &--math {
      background: $gradient-math;
    }
    &--science {
      background: $gradient-science;
    }
    &--bahasa {
      background: $gradient-bahasa;
    }
    &--coding {
      background: $gradient-primary;
    }
  }
  &__emoji {
    font-size: font-size('lg');
  }
  &__name {
    flex: 1;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
  }
  &__go {
    font-weight: $font-weight-bold;
  }
}

.tier {
  @include flex(column, flex-start, stretch, spacing('xs'));

  &__label {
    margin: spacing('xs') 0 0;
    font-weight: $font-weight-bold;
    color: $color-ink-soft;
    font-size: font-size('sm');
  }
}

.rows {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex(column, flex-start, stretch, spacing('xs'));
}

.row {
  @include flex(row, flex-start, center, spacing('md'));
  padding: spacing('sm') spacing('md');
  background: $color-white;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  transition: all $transition-base;

  &:hover {
    border-color: rgba($color-primary, 0.4);
    transform: translateX(3px);
  }

  &__emoji {
    font-size: font-size('md');
    flex-shrink: 0;
  }
  &__title {
    flex: 1;
    font-weight: $font-weight-semibold;
    color: $color-ink;
  }
  &__done {
    flex-shrink: 0;
  }
  &__todo {
    flex-shrink: 0;
    color: $color-text-muted;
    font-size: font-size('lg');
  }
}
</style>
