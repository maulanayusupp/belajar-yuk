<script setup lang="ts">
// Kartu fitur/keunggulan dengan ikon emoji, judul, dan deskripsi.
withDefaults(
  defineProps<{
    icon: string
    title: string
    text: string
    tint?: 'primary' | 'english' | 'math' | 'mint' | 'warm'
  }>(),
  { tint: 'primary' },
)
</script>

<template>
  <div class="feature">
    <span class="feature__icon" :class="`feature__icon--${tint}`" aria-hidden="true">{{
      icon
    }}</span>
    <h3 class="feature__title">{{ title }}</h3>
    <p class="feature__text">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.feature {
  @include glass($glass-bg-strong);
  @include hover-lift(-6px);
  @include flex(column, flex-start, flex-start, spacing('sm'));
  padding: spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  height: 100%;

  &:hover {
    box-shadow: $shadow-lg;
  }

  &:hover &__icon {
    animation: wiggle 0.5s ease;
  }

  &__icon {
    @include flex-center;
    width: 64px;
    height: 64px;
    font-size: font-size('xl');
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    &--primary {
      background: $gradient-primary;
    }
    &--english {
      background: $gradient-english;
    }
    &--math {
      background: $gradient-math;
    }
    &--mint {
      background: $gradient-mint;
    }
    &--warm {
      background: $gradient-warm;
    }
  }

  &__title {
    margin: 0;
    font-size: font-size('lg');
  }

  &__text {
    margin: 0;
    font-size: font-size('sm');
  }
}
</style>
