<script setup lang="ts">
// "Tugas Hari Ini" — a small daily assignment checklist (short
// daily practice). Presentational: the parent derives the done state.
interface DailyTask {
  id: string
  icon: string
  label: string
  desc: string
  done: boolean
  to: string
  cta: string
}

const props = defineProps<{ tasks: DailyTask[] }>()

const doneCount = computed(() => props.tasks.filter((t) => t.done).length)
const allDone = computed(() => doneCount.value === props.tasks.length)
const percent = computed(() =>
  props.tasks.length ? Math.round((doneCount.value / props.tasks.length) * 100) : 0,
)
</script>

<template>
  <section class="today" :class="{ 'today--done': allDone }">
    <header class="today__head">
      <h2 class="today__title">📋 Tugas Hari Ini</h2>
      <span class="today__count">{{ doneCount }}/{{ tasks.length }} selesai</span>
    </header>

    <div class="today__bar" aria-hidden="true">
      <div class="today__bar-fill" :style="{ '--percent': `${percent}%` }" />
    </div>

    <p v-if="allDone" class="today__cheer">Hebat! Semua tugas hari ini selesai. 🎉</p>

    <ul class="today__list">
      <li v-for="task in tasks" :key="task.id" class="task" :class="{ 'task--done': task.done }">
        <span class="task__check" aria-hidden="true">{{ task.done ? '✅' : task.icon }}</span>
        <span class="task__text">
          <span class="task__label">{{ task.label }}</span>
          <span class="task__desc">{{ task.desc }}</span>
        </span>
        <NuxtLink v-if="!task.done" :to="task.to" class="task__cta">{{ task.cta }} →</NuxtLink>
        <span v-else class="task__badge">Selesai</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.today {
  @include glass($glass-bg-strong);
  @include flex(column, flex-start, stretch, spacing('md'));
  padding: spacing('lg');
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  border-left: 6px solid $color-primary;

  &--done {
    border-left-color: $color-success;
  }

  &__head {
    @include flex(row, space-between, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__title {
    margin: 0;
    font-size: font-size('lg');
  }

  &__count {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.12);
    padding: 2px spacing('sm');
    border-radius: $radius-pill;
  }

  &__bar {
    height: 10px;
    background: rgba($color-primary, 0.12);
    border-radius: $radius-pill;
    overflow: hidden;
  }
  &__bar-fill {
    height: 100%;
    width: var(--percent);
    background: $gradient-primary;
    border-radius: $radius-pill;
    transition: width $transition-base;
  }

  &--done &__bar-fill {
    background: linear-gradient(135deg, #26de81, #05c46b);
  }

  &__cheer {
    margin: 0;
    font-weight: $font-weight-bold;
    color: #05987a;
  }

  &__list {
    @include flex(column, flex-start, stretch, spacing('sm'));
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.task {
  @include flex(row, flex-start, center, spacing('md'));
  padding: spacing('sm') spacing('md');
  background: $color-white;
  border: 2px solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &--done {
    background: rgba($color-success, 0.08);
    border-color: rgba($color-success, 0.4);
  }

  &__check {
    font-size: font-size('lg');
    flex-shrink: 0;
  }

  &__text {
    @include flex(column, center, flex-start);
    flex: 1;
    min-width: 0;
  }

  &__label {
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__desc {
    font-size: font-size('sm');
    color: $color-text-muted;
  }

  &__cta {
    flex-shrink: 0;
    font-weight: $font-weight-bold;
    color: $color-white;
    background: $color-primary;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;

    &:hover {
      background: $color-primary-dark;
    }
  }

  &__badge {
    flex-shrink: 0;
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: #05987a;
  }
}
</style>
