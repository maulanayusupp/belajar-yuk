<script setup lang="ts">
import type { SubjectId } from '~/types'
import { lessonService } from '~/services/lessonService'

// Halaman daftar pelajaran untuk satu mata pelajaran (/english, /math).
const route = useRoute()
const subjectId = computed(() => route.params.subject as SubjectId)

definePageMeta({
  validate(route) {
    return ['english', 'math'].includes(String(route.params.subject))
  },
})

const subject = computed(() => lessonService.getSubject(subjectId.value))
const lessons = computed(() => lessonService.getLessons(subjectId.value))
// Kelompokkan per tingkat (Pemula/Menengah/Mahir) untuk kategori.
const groups = computed(() => lessonService.getLessonsGrouped(subjectId.value))

if (!subject.value) {
  throw createError({ statusCode: 404, statusMessage: 'Mata pelajaran tidak ditemukan' })
}

useHead(() => ({ title: `${subject.value?.title} — Belajar Yuk!` }))
</script>

<template>
  <div v-if="subject" class="subject-page">
    <NuxtLink to="/" class="subject-page__back">← Beranda</NuxtLink>

    <!-- Banner hero bertema pelajaran -->
    <section class="banner" :class="`banner--${subject.theme}`">
      <div class="banner__pattern" aria-hidden="true" />
      <span class="banner__emoji anim-float" aria-hidden="true">{{ subject.emoji }}</span>
      <div class="banner__text">
        <p class="banner__eyebrow">{{ subject.titleEn }}</p>
        <h1 class="banner__title">{{ subject.title }}</h1>
        <p class="banner__desc">{{ subject.description }}</p>
        <span class="banner__count">{{ lessons.length }} pelajaran tersedia</span>
      </div>
    </section>

    <BaseMascot
      message="Pilih satu pelajaran untuk mulai. Setiap selesai, kamu dapat bintang!"
      message-en="Pick a lesson to start!"
    />

    <!-- Pelajaran dikelompokkan per tingkat -->
    <section
      v-for="group in groups"
      :key="group.meta.id"
      class="level-group"
      :class="`level-group--${group.meta.id}`"
    >
      <header class="level-group__head">
        <h2 class="level-group__title">
          <span aria-hidden="true">{{ group.meta.icon }}</span> {{ group.meta.label }}
          <span class="level-group__count">{{ group.lessons.length }}</span>
        </h2>
        <p class="level-group__desc">{{ group.meta.description }}</p>
      </header>
      <div class="subject-page__list">
        <LessonCard v-for="lesson in group.lessons" :key="lesson.id" :lesson="lesson" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.subject-page {
  @include flex(column, flex-start, stretch, spacing('xl'));
  padding-block: spacing('lg');

  &__back {
    align-self: flex-start;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
    transition: background $transition-base;

    &:hover {
      background: rgba($color-primary, 0.1);
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing('md');

    @include respond-to('md') {
      grid-template-columns: 1fr 1fr;
    }
  }
}

.level-group {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }

  &__title {
    @include flex(row, flex-start, center, spacing('sm'));
    margin: 0;
  }

  &__count {
    font-family: $font-family-base;
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-text-muted;
    background: $color-white;
    padding: 2px spacing('sm');
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
  }

  &__desc {
    margin: 0;
    font-size: font-size('sm');
  }
}

.banner {
  position: relative;
  overflow: hidden;
  @include flex(column, center, center, spacing('md'));
  text-align: center;
  padding: spacing('xxl') spacing('xl');
  border-radius: $radius-xl;
  color: $color-white;

  @include respond-to('md') {
    flex-direction: row;
    text-align: left;
    gap: spacing('xl');
  }

  &--english {
    background: $gradient-english;
    box-shadow: $shadow-glow-english;
  }
  &--math {
    background: $gradient-math;
    box-shadow: $shadow-glow-math;
  }

  &__pattern {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 90% 10%, rgba($color-white, 0.22) 0, transparent 30%),
      radial-gradient(circle at 10% 100%, rgba($color-white, 0.15) 0, transparent 35%);
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
    color: rgba($color-white, 0.85);
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: font-size('sm');
    margin: 0;
  }

  &__title {
    color: $color-white;
    margin: spacing('xs') 0;
  }

  &__desc {
    color: rgba($color-white, 0.92);
    margin: 0 0 spacing('md');
  }

  &__count {
    @include glass(rgba(255, 255, 255, 0.2));
    display: inline-block;
    padding: spacing('xs') spacing('md');
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    border-radius: $radius-pill;
  }
}
</style>
