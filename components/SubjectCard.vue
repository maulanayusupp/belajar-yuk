<script setup lang="ts">
// Large learning-area card (premium look). Works for subjects AND the Coding
// module — the parent passes a normalized card so it's not tied to `Subject`.
export interface AreaCard {
  to: string
  /** Theme name for the gradient: english | math | science | bahasa | coding. */
  theme: string
  emoji: string
  eyebrow: string
  title: string
  desc: string
  count: number
  /** Unit for the count, e.g. "pelajaran" or "level". */
  countLabel: string
}

defineProps<{ card: AreaCard }>()
</script>

<template>
  <NuxtLink :to="card.to" class="subject-card" :class="`subject-card--${card.theme}`">
    <div class="subject-card__pattern" aria-hidden="true" />
    <div class="subject-card__top">
      <span class="subject-card__emoji anim-float" aria-hidden="true">{{ card.emoji }}</span>
      <span class="subject-card__count">{{ card.count }} {{ card.countLabel }}</span>
    </div>

    <div class="subject-card__body">
      <p class="subject-card__eyebrow">{{ card.eyebrow }}</p>
      <h3 class="subject-card__title">{{ card.title }}</h3>
      <p class="subject-card__desc">{{ card.desc }}</p>
    </div>

    <span class="subject-card__cta">
      Mulai belajar
      <span class="subject-card__arrow" aria-hidden="true">→</span>
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.subject-card {
  @include hover-lift(-10px);
  position: relative;
  overflow: hidden;
  @include flex(column, space-between, flex-start, spacing('lg'));
  padding: spacing('xl');
  min-height: 300px;
  border-radius: $radius-xl;
  color: $color-white;
  isolation: isolate;

  &--english {
    background: $gradient-english;
    box-shadow: $shadow-glow-english;
  }
  &--math {
    background: $gradient-math;
    box-shadow: $shadow-glow-math;
  }
  &--science {
    background: $gradient-science;
    box-shadow: $shadow-glow-science;
  }
  &--bahasa {
    background: $gradient-bahasa;
    box-shadow: $shadow-glow-bahasa;
  }
  &--coding {
    background: $gradient-coding;
    box-shadow: $shadow-glow-coding;
  }

  &:hover {
    box-shadow: $shadow-xl;

    .subject-card__arrow {
      transform: translateX(6px);
    }
  }

  // Decorative circle pattern in the background
  &__pattern {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 85% 15%, rgba($color-white, 0.25) 0, transparent 30%),
      radial-gradient(circle at 15% 90%, rgba($color-white, 0.15) 0, transparent 35%);
  }

  &__top {
    @include flex(row, space-between, flex-start);
    width: 100%;
  }

  &__emoji {
    font-size: font-size('giant');
    filter: drop-shadow(0 10px 20px rgba(26, 16, 53, 0.25));
  }

  &__count {
    @include glass(rgba(255, 255, 255, 0.2));
    padding: spacing('xs') spacing('md');
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    border-radius: $radius-pill;
  }

  &__eyebrow {
    color: rgba($color-white, 0.85);
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: font-size('xs');
    margin: 0;
  }

  &__title {
    color: $color-white;
    font-size: font-size('xl');
    margin: spacing('xs') 0;
  }

  &__desc {
    color: rgba($color-white, 0.92);
    font-size: font-size('sm');
    margin: 0;
  }

  &__cta {
    @include flex(row, center, center, spacing('sm'));
    @include glass(rgba(255, 255, 255, 0.22));
    padding: spacing('sm') spacing('lg');
    border-radius: $radius-pill;
    font-weight: $font-weight-bold;
    box-shadow: $shadow-sm;
  }

  &__arrow {
    transition: transform $transition-base;
  }
}
</style>
