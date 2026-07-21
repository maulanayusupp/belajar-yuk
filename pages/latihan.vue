<script setup lang="ts">
import type { DrillMode } from '~/types'
import { drillService } from '~/services/drillService'

// "Latihan Kilat" — timed fluency drills (timed speed practice).
// Pick a mode, then run one drill. Personal bests are shown per mode.
const modes = drillService.modes()
const selected = ref<DrillMode | null>(null)

// Read personal bests reactively (refreshed when returning from a drill).
const bestTick = ref(0)
function bestOf(mode: DrillMode) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  bestTick.value // reactive dependency
  return drillService.getBest(mode)
}

function back() {
  selected.value = null
  bestTick.value++ // refresh bests after a session
}

useHead({ title: 'Latihan Kilat — Belajar Yuk!' })
</script>

<template>
  <div class="latihan">
    <NuxtLink to="/" class="latihan__back">← Beranda</NuxtLink>

    <template v-if="!selected">
      <header class="latihan__head">
        <h1 class="latihan__title">⚡ Latihan Kilat</h1>
        <p class="latihan__subtitle">
          Latih kecepatan berhitung! Jawab sebanyak-banyaknya dalam 60 detik dan pecahkan rekormu.
        </p>
      </header>

      <BaseMascot
        message="Semakin sering berlatih, semakin cepat kamu berhitung!"
        message-en="Practice makes perfect!"
      />

      <div class="latihan__grid">
        <button
          v-for="mode in modes"
          :key="mode.id"
          class="latihan__card"
          type="button"
          @click="selected = mode.id"
        >
          <span class="latihan__card-icon" aria-hidden="true">{{ mode.icon }}</span>
          <span class="latihan__card-label">{{ mode.label }}</span>
          <span class="latihan__card-desc">{{ mode.description }}</span>
          <span v-if="bestOf(mode.id)" class="latihan__card-best">
            🏆 Rekor: {{ bestOf(mode.id)?.score }}
          </span>
          <span v-else class="latihan__card-best latihan__card-best--empty">Belum ada rekor</span>
        </button>
      </div>
    </template>

    <DrillSpeedDrill v-else :key="selected" :mode="selected" @back="back" />
  </div>
</template>

<style scoped lang="scss">
.latihan {
  @include flex(column, flex-start, stretch, spacing('lg'));
  padding-block: spacing('lg');

  &__back {
    align-self: flex-start;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;

    &:hover {
      background: rgba($color-primary, 0.1);
    }
  }

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }

  &__title {
    margin: 0;
  }

  &__subtitle {
    margin: 0;
    color: $color-ink-soft;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing('md');

    @include respond-to('sm') {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }

  &__card {
    @include tappable;
    @include glass($glass-bg-strong);
    @include flex(column, flex-start, flex-start, spacing('xs'));
    padding: spacing('lg');
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
    text-align: left;
    border-left: 6px solid $color-primary;

    &:hover {
      box-shadow: $shadow-md;
    }
  }

  &__card-icon {
    font-size: font-size('xl');
  }

  &__card-label {
    font-family: $font-family-display;
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__card-desc {
    font-size: font-size('sm');
    color: $color-ink-soft;
  }

  &__card-best {
    margin-top: spacing('xs');
    font-weight: $font-weight-bold;
    color: $color-primary-dark;

    &--empty {
      color: $color-text-muted;
      font-weight: $font-weight-semibold;
    }
  }
}
</style>
