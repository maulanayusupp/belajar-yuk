<script setup lang="ts">
import type { Lesson } from '~/types'
import { lessonService } from '~/services/lessonService'

// Single lesson card (premium look) with progress stars,
// method/activity tags, and a level badge.
const props = defineProps<{ lesson: Lesson }>()

const { getStars, isCompleted } = useProgress()

// Method tags (e.g. "Ikatan Bilangan", "Phonics") + level from the service.
const tag = computed(() => lessonService.getLessonTag(props.lesson))
const levelMeta = computed(() => lessonService.getLevelMeta(props.lesson.level))

const stars = computed(() => getStars(props.lesson.id))
const done = computed(() => isCompleted(props.lesson.id))
const mastered = computed(() => stars.value >= 3) // 3★ = mastered (Kumon-style)
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
        <span
          v-if="done"
          class="lesson-card__badge"
          :class="{ 'lesson-card__badge--master': mastered }"
          :aria-label="mastered ? 'Dikuasai' : 'Selesai'"
          >{{ mastered ? '👑' : '✓' }}</span
        >
      </div>

      <!-- Method/activity tags + level -->
      <div class="lesson-card__tags">
        <span class="lesson-card__tag" :class="`lesson-card__tag--${lesson.subject}`">
          <span aria-hidden="true">{{ tag.icon }}</span> {{ tag.label }}
        </span>
        <span class="lesson-card__level" :class="`lesson-card__level--${lesson.level}`">
          {{ levelMeta.icon }} {{ levelMeta.label }}
        </span>
      </div>

      <p class="lesson-card__meta">{{ lesson.titleEn }} · ⏱ {{ lesson.durationMin }} mnt</p>
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

  // Accent line on the left edge
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
  &--science::before {
    background: $gradient-science;
  }
  &--bahasa::before {
    background: $gradient-bahasa;
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
  &--science &__icon {
    background: rgba($color-science, 0.15);
  }
  &--bahasa &__icon {
    background: rgba($color-bahasa, 0.15);
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

    &--master {
      background: linear-gradient(135deg, #ffd75e, #ffb300); // gold = mastered
    }
  }

  &__tags {
    @include flex(row, flex-start, center, spacing('xs'));
    flex-wrap: wrap;
    margin-block: spacing('xs');
  }

  &__tag {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    padding: 2px spacing('sm');
    border-radius: $radius-pill;

    &--math {
      color: $color-math-dark;
      background: rgba($color-math, 0.12);
    }
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

  &__level {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    padding: 2px spacing('sm');
    border-radius: $radius-pill;

    &--beginner {
      color: #05987a;
      background: rgba($color-success, 0.15);
    }
    &--intermediate {
      color: $color-primary-dark;
      background: rgba($color-primary, 0.12);
    }
    &--advanced {
      color: #c2410c;
      background: rgba($color-accent-2, 0.22);
    }
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
