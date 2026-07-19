<script setup lang="ts">
import { codingService } from '~/services/codingService'

// Play one coding level. Route: /coding/code-seq-1, etc.
const route = useRoute()
const levelId = computed(() => String(route.params.id))
const level = computed(() => codingService.getLevel(levelId.value))
const nextId = computed(() => codingService.getNextLevel(levelId.value)?.id ?? null)

if (!level.value) {
  throw createError({ statusCode: 404, statusMessage: 'Level tidak ditemukan' })
}

useHead(() => ({ title: `${level.value?.title} — Coding` }))
</script>

<template>
  <div v-if="level" class="level-page">
    <header class="level-page__head">
      <NuxtLink to="/coding" class="level-page__back">← Peta</NuxtLink>
      <h1 class="level-page__title"><span aria-hidden="true">🤖</span> {{ level.title }}</h1>
    </header>

    <CodingLevelRunner :key="level.id" :level="level" :next-id="nextId" />
  </div>
</template>

<style scoped lang="scss">
.level-page {
  @include flex(column, flex-start, stretch, spacing('lg'));
  padding-block: spacing('lg');

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }

  &__back {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
  }

  &__title {
    margin: 0;
  }
}
</style>
