<script setup lang="ts">
import type { MathMethod } from '~/types'
import { lessonService } from '~/services/lessonService'

// Panel penjelasan: apa bedanya metode Singapore dengan cara biasa.
// Memakai <details> agar bisa dibuka/tutup tanpa JavaScript.
const props = defineProps<{ method: MathMethod }>()
const meta = computed(() => lessonService.getMathMethodMeta(props.method))
</script>

<template>
  <details class="method-info">
    <summary class="method-info__summary">
      <span aria-hidden="true">💡</span>
      Apa bedanya <strong>{{ meta.label }}</strong> (Singapore) dengan cara biasa?
      <span class="method-info__chevron" aria-hidden="true">▾</span>
    </summary>

    <div class="method-info__body">
      <div class="method-info__col method-info__col--singapore">
        <span class="method-info__tag">🇸🇬 Cara Singapore</span>
        <p>{{ meta.singaporeWay }}</p>
      </div>
      <div class="method-info__col method-info__col--usual">
        <span class="method-info__tag method-info__tag--usual">✏️ Cara Biasa</span>
        <p>{{ meta.usualWay }}</p>
      </div>
    </div>
  </details>
</template>

<style scoped lang="scss">
.method-info {
  @include glass($glass-bg-strong);
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  overflow: hidden;

  &__summary {
    @include flex(row, flex-start, center, spacing('sm'));
    cursor: pointer;
    padding: spacing('md') spacing('lg');
    font-weight: $font-weight-semibold;
    color: $color-ink;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  &__chevron {
    margin-left: auto;
    color: $color-primary;
    transition: transform $transition-base;
  }

  &[open] &__chevron {
    transform: rotate(180deg);
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing('md');
    padding: 0 spacing('lg') spacing('lg');

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__col {
    @include flex(column, flex-start, flex-start, spacing('sm'));
    padding: spacing('md');
    border-radius: $radius-md;

    &--singapore {
      background: rgba($color-math, 0.1);
    }
    &--usual {
      background: rgba($color-text-muted, 0.1);
    }

    p {
      margin: 0;
      font-size: font-size('sm');
    }
  }

  &__tag {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    color: $color-math-dark;
    background: rgba($color-math, 0.15);
    padding: 2px spacing('sm');
    border-radius: $radius-pill;

    &--usual {
      color: $color-text-muted;
      background: rgba($color-text-muted, 0.15);
    }
  }
}
</style>
