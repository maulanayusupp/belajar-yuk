<script setup lang="ts">
import { range, clamp } from '~/utils/array'

// Target harian: berapa pelajaran diselesaikan hari ini dari target.
const props = defineProps<{ done: number; goal: number }>()

const reached = computed(() => props.done >= props.goal)
const filled = computed(() => clamp(props.done, 0, props.goal))
</script>

<template>
  <div class="daily" :class="{ 'daily--done': reached }">
    <div class="daily__head">
      <span class="daily__title">🎯 Target Hari Ini</span>
      <span class="daily__count">{{ Math.min(done, goal) }}/{{ goal }}</span>
    </div>
    <div class="daily__dots" aria-hidden="true">
      <span
        v-for="i in range(goal)"
        :key="i"
        class="daily__dot"
        :class="{ 'daily__dot--on': i < filled }"
      />
    </div>
    <p class="daily__msg">
      {{
        reached ? 'Hebat! Target hari ini tercapai! 🎉' : 'Selesaikan pelajaran untuk capai target.'
      }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.daily {
  @include glass($glass-bg-strong);
  @include flex(column, flex-start, stretch, spacing('sm'));
  padding: spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &--done {
    box-shadow: 0 0 0 3px rgba($color-success, 0.4);
  }

  &__head {
    @include flex(row, space-between, center);
  }

  &__title {
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__count {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
  }

  &__dots {
    @include flex(row, flex-start, center, spacing('sm'));
  }

  &__dot {
    flex: 1;
    height: 14px;
    border-radius: $radius-pill;
    background: $color-border;
    transition: background $transition-base;

    &--on {
      background: $gradient-primary;
    }
  }

  &__msg {
    margin: 0;
    font-size: font-size('sm');
  }
}
</style>
