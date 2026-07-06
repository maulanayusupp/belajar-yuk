<script setup lang="ts">
import { lessonService } from '~/services/lessonService'

// Halaman menjalankan satu pelajaran. Route: /english/en-animals dst.
// Memilih komponen pelajaran sesuai jenis mata pelajaran.
const route = useRoute()
const lessonId = computed(() => String(route.params.id))
const subjectParam = computed(() => String(route.params.subject))

const lesson = computed(() => lessonService.getLesson(lessonId.value))

// 404 bila pelajaran tidak ada atau tidak cocok dengan mata pelajaran di URL.
if (!lesson.value || lesson.value.subject !== subjectParam.value) {
  throw createError({ statusCode: 404, statusMessage: 'Pelajaran tidak ditemukan' })
}

useHead(() => ({ title: `${lesson.value?.title} — Belajar Yuk!` }))
</script>

<template>
  <div v-if="lesson" class="lesson-page">
    <header class="lesson-page__header">
      <NuxtLink :to="`/${lesson.subject}`" class="lesson-page__back">← Kembali</NuxtLink>
      <h1 class="lesson-page__title">
        <span aria-hidden="true">{{ lesson.emoji }}</span> {{ lesson.title }}
      </h1>
      <p v-if="lesson.subject === 'math'" class="lesson-page__method">{{ lesson.methodLabel }}</p>
    </header>

    <!-- Pilih komponen pelajaran sesuai mata pelajaran -->
    <EnglishVocabularyLesson v-if="lesson.subject === 'english'" :lesson="lesson" />
    <MathSingaporeLesson v-else :lesson="lesson" />
  </div>
</template>

<style scoped lang="scss">
.lesson-page {
  @include flex(column, flex-start, stretch, spacing('xl'));

  &__back {
    display: inline-block;
    font-weight: $font-weight-bold;
    color: $color-primary;
  }

  &__title {
    margin-top: spacing('sm');
  }

  &__method {
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-math;
    background: rgba($color-math, 0.1);
    display: inline-block;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
    margin-top: spacing('xs');
  }
}
</style>
