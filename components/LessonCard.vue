<script setup lang="ts">
import type { Lesson } from '~/types'

// Kartu satu pelajaran (tampilan premium) dengan bintang progres.
const props = defineProps<{ lesson: Lesson }>()

const { getStars, isCompleted } = useProgress()

const levelLabel: Record<Lesson['level'], string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Mahir',
}

const stars = computed(() => getStars(props.lesson.id))
const done = computed(() => isCompleted(props.lesson.id))
</script>

<template>
  <NuxtLink
    :to="`/${lesson.subject}/${lesson.id}`"
    class="lesson-card"
    :class="`lesson-card--${lesson.subject}`"
  >
    <span class="lesson-card__icon" aria-hidden="true">{{ lesson.emoji }}</span>

    <div class="lesson-card__info">
      <div class="lesson-card__heading">
        <h3 class="lesson-card__title">{{ lesson.title }}</h3>
        <span v-if="done" class="lesson-card__badge" aria-label="Selesai">✓</span>
      </div>
      <p class="lesson-card__meta">
        {{ lesson.titleEn }} · {{ levelLabel[lesson.level] }} · ⏱ {{ lesson.durationMin }} mnt
      </p>
      <div class="lesson-card__footer">
        <BaseStarRating :value="stars" size="sm" />
        <span class="lesson-card__play">Main →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.lesson-card {
  @include glass($glass-bg-strong);
  @include hover-lift(-6px);
  @include flex(row, flex-start, center, spacing('md'));
  position: relative;
  overflow: hidden;
  padding: spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  // Garis aksen di tepi kiri
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
  }
  &--english::before {
    background: $gradient-english;
  }
  &--math::before {
    background: $gradient-math;
  }

  &:hover {
    box-shadow: $shadow-lg;

    .lesson-card__play {
      transform: translateX(4px);
    }
  }

  &__icon {
    @include flex-center;
    width: 68px;
    height: 68px;
    font-size: font-size('xl');
    border-radius: $radius-md;
    flex-shrink: 0;
    box-shadow: $shadow-sm;
  }
  &--english &__icon {
    background: rgba($color-english, 0.15);
  }
  &--math &__icon {
    background: rgba($color-math, 0.15);
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__heading {
    @include flex(row, space-between, center, spacing('sm'));
  }

  &__title {
    font-size: font-size('lg');
    margin: 0;
  }

  &__badge {
    @include flex-center;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #26de81, #05c46b);
    color: $color-white;
    border-radius: $radius-pill;
    font-weight: $font-weight-bold;
    flex-shrink: 0;
    box-shadow: $shadow-sm;
  }

  &__meta {
    font-size: font-size('sm');
    margin-block: spacing('xs') spacing('sm');
  }

  &__footer {
    @include flex(row, space-between, center, spacing('sm'));
  }

  &__play {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    font-size: font-size('sm');
    transition: transform $transition-base;
  }
}
</style>
