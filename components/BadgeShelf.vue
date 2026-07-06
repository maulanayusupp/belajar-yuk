<script setup lang="ts">
import type { Badge } from '~/services/badgeService'

// Rak lencana: yang diraih tampil cerah, yang belum tampil redup.
defineProps<{ badges: Badge[] }>()
</script>

<template>
  <div class="badges">
    <div
      v-for="b in badges"
      :key="b.id"
      class="badge"
      :class="{ 'badge--earned': b.earned }"
      :title="b.description"
    >
      <span class="badge__icon" aria-hidden="true">{{ b.earned ? b.icon : '🔒' }}</span>
      <span class="badge__label">{{ b.label }}</span>
      <span class="badge__desc">{{ b.description }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.badges {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: spacing('md');

  @include respond-to('sm') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.badge {
  @include flex(column, flex-start, center, spacing('xs'));
  padding: spacing('md');
  text-align: center;
  border-radius: $radius-lg;
  background: rgba($color-text-muted, 0.08);
  opacity: 0.65;
  filter: grayscale(0.8);
  transition: all $transition-base;

  &--earned {
    opacity: 1;
    filter: none;
    background: rgba($color-accent-2, 0.15);
    box-shadow: $shadow-sm;
    animation: bounce-in 0.5s $transition-bounce both;
  }

  &__icon {
    font-size: font-size('xl');
  }

  &__label {
    font-weight: $font-weight-bold;
    font-size: font-size('sm');
    color: $color-ink;
  }

  &__desc {
    font-size: font-size('xs');
    color: $color-text-muted;
  }
}
</style>
