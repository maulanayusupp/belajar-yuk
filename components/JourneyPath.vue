<script setup lang="ts">
import type { SubjectId } from '~/types'
import { lessonService } from '~/services/lessonService'

// Peta jalur belajar satu mata pelajaran: rangkaian pelajaran dengan
// status selesai ✓ / sedang di sini ⭐ / berikutnya.
const props = defineProps<{ subject: SubjectId }>()

const { isCompleted, getStars } = useProgress()

const subjectMeta = computed(() => lessonService.getSubject(props.subject))
const lessons = computed(() => lessonService.getLessons(props.subject))
const nextId = computed(() => lessonService.getNextLesson(isCompleted, props.subject)?.id)

function status(id: string): 'done' | 'current' | 'todo' {
  if (isCompleted(id)) return 'done'
  return id === nextId.value ? 'current' : 'todo'
}
</script>

<template>
  <div v-if="subjectMeta" class="journey">
    <div class="journey__head">
      <span class="journey__icon" :class="`journey__icon--${subject}`" aria-hidden="true">
        {{ subjectMeta.emoji }}
      </span>
      <h3 class="journey__title">{{ subjectMeta.title }}</h3>
    </div>

    <div class="journey__track">
      <NuxtLink
        v-for="lesson in lessons"
        :key="lesson.id"
        :to="`/${lesson.subject}/${lesson.id}`"
        class="journey__node"
        :class="`journey__node--${status(lesson.id)}`"
        :title="lesson.title"
      >
        <span class="journey__badge" aria-hidden="true">
          <template v-if="status(lesson.id) === 'done'">✓</template>
          <template v-else>{{ lesson.emoji }}</template>
        </span>
        <span class="journey__name">{{ lesson.title }}</span>
        <BaseStarRating v-if="isCompleted(lesson.id)" :value="getStars(lesson.id)" size="sm" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.journey {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__head {
    @include flex(row, flex-start, center, spacing('sm'));
  }

  &__icon {
    @include flex-center;
    width: 44px;
    height: 44px;
    font-size: font-size('lg');
    border-radius: $radius-md;

    &--english {
      background: rgba($color-english, 0.15);
    }
    &--math {
      background: rgba($color-math, 0.15);
    }
  }

  &__title {
    margin: 0;
  }

  // Jalur bisa di-scroll horizontal bila panjang.
  &__track {
    display: flex;
    gap: spacing('md');
    overflow-x: auto;
    padding-bottom: spacing('sm');
    scroll-snap-type: x proximity;
  }

  &__node {
    @include flex(column, flex-start, center, spacing('xs'));
    flex: 0 0 auto;
    width: 108px;
    padding: spacing('md') spacing('sm');
    text-align: center;
    border-radius: $radius-lg;
    scroll-snap-align: start;
    transition: transform $transition-base;
    position: relative;

    // Garis penghubung antar-node
    &::after {
      content: '';
      position: absolute;
      top: 42px;
      right: -#{spacing('md')};
      width: spacing('md');
      height: 4px;
      background: $color-border;
    }
    &:last-child::after {
      display: none;
    }

    &:hover {
      transform: translateY(-4px);
    }

    &--done {
      background: rgba($color-success, 0.1);
    }
    &--current {
      background: rgba($color-primary, 0.1);
      box-shadow: 0 0 0 3px rgba($color-primary, 0.4);
    }
    &--todo {
      opacity: 0.7;
    }
  }

  &__badge {
    @include flex-center;
    width: 56px;
    height: 56px;
    font-size: font-size('lg');
    background: $color-white;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
  }
  &__node--done &__badge {
    background: linear-gradient(135deg, #26de81, #05c46b);
    color: $color-white;
    font-weight: $font-weight-bold;
  }
  &__node--current &__badge {
    animation: pulse-glow 1.6s ease-in-out infinite;
  }

  &__name {
    font-size: font-size('xs');
    font-weight: $font-weight-semibold;
    color: $color-ink;
    line-height: 1.2;
  }
}
</style>
