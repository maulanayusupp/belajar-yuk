<script setup lang="ts">
import type { Level } from '~/types'
import { codingService } from '~/services/codingService'
import { levels as levelTiers } from '~/data/levels'

// Coding level map: worlds → levels with stars & progressive unlock.
// A separate module from the subjects (its own progress store).
const worlds = codingService.getWorlds()
const flat = codingService.getLevels()

function tier(id: Level) {
  return levelTiers.find((t) => t.id === id) ?? levelTiers[0]
}

// Resolve NuxtLink so it can be used reliably in a dynamic `<component :is>`
// (passing the string 'NuxtLink' is not resolved consistently).
const LinkComp = resolveComponent('NuxtLink')

// Progress starts empty (same on server & first client render → no hydration
// mismatch). The first level is ALWAYS unlocked, so it renders as a real link
// even before JS. Later levels unlock reactively once stars load on mount.
const stars = ref<Record<string, number>>({})
onMounted(() => {
  stars.value = codingService.getStarMap()
})

function levelStars(id: string): number {
  return stars.value[id] ?? 0
}
function isUnlocked(id: string): boolean {
  const i = flat.findIndex((l) => l.id === id)
  if (i <= 0) return true
  return (stars.value[flat[i - 1].id] ?? 0) > 0
}

useHead({ title: 'Coding — Belajar Yuk!' })
</script>

<template>
  <div class="coding">
    <NuxtLink to="/" class="coding__back">← Beranda</NuxtLink>

    <section class="coding-hero">
      <span class="coding-hero__emoji anim-float" aria-hidden="true">🤖</span>
      <div>
        <p class="coding-hero__eyebrow">Coding</p>
        <h1 class="coding-hero__title">Ayo Belajar Koding!</h1>
        <p class="coding-hero__desc">
          Susun perintah untuk memandu robot ke tujuan. Belajar berpikir seperti programmer —
          selangkah demi selangkah.
        </p>
      </div>
    </section>

    <BaseMascot
      message="Pandu robot ke bintang dengan menyusun perintah yang tepat!"
      message-en="Guide the robot to the star!"
    />

    <section v-for="world in worlds" :key="world.id" class="world">
      <header class="world__head">
        <h2 class="world__title">
          <span aria-hidden="true">{{ world.icon }}</span> {{ world.title }}
          <span class="world__tier"
            >{{ tier(world.level).icon }} {{ tier(world.level).label }}</span
          >
        </h2>
        <p class="world__desc">{{ world.description }}</p>
      </header>

      <div class="world__grid">
        <component
          :is="isUnlocked(level.id) ? LinkComp : 'div'"
          v-for="(level, i) in world.levels"
          :key="level.id"
          :to="isUnlocked(level.id) ? `/coding/${level.id}` : undefined"
          class="level"
          :class="{ 'level--locked': !isUnlocked(level.id) }"
        >
          <span class="level__num">{{ i + 1 }}</span>
          <span class="level__name">{{ level.title }}</span>
          <span v-if="!isUnlocked(level.id)" class="level__lock" aria-hidden="true">🔒</span>
          <BaseStarRating v-else :value="levelStars(level.id)" size="sm" />
        </component>
      </div>
    </section>

    <p class="coding__more">Dunia baru (Perulangan & Kondisional) segera hadir! 🚧</p>
  </div>
</template>

<style scoped lang="scss">
.coding {
  @include flex(column, flex-start, stretch, spacing('xl'));
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

  &__more {
    text-align: center;
    color: $color-text-muted;
    font-weight: $font-weight-semibold;
  }
}

.coding-hero {
  @include flex(row, flex-start, center, spacing('lg'));
  flex-wrap: wrap;
  padding: spacing('xl');
  border-radius: $radius-xl;
  background: $gradient-primary;
  box-shadow: $shadow-primary;
  color: $color-white;

  &__emoji {
    font-size: font-size('giant');
  }

  &__eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: $font-weight-bold;
    font-size: font-size('sm');
    opacity: 0.85;
  }
  &__title {
    color: $color-white;
    margin: spacing('xs') 0;
  }
  &__desc {
    margin: 0;
    max-width: 46ch;
    color: rgba($color-white, 0.92);
  }
}

.world {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }
  &__title {
    @include flex(row, flex-start, center, spacing('sm'));
    flex-wrap: wrap;
    margin: 0;
  }
  &__tier {
    font-family: $font-family-base;
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.12);
    padding: 2px spacing('sm');
    border-radius: $radius-pill;
  }
  &__desc {
    margin: 0;
    font-size: font-size('sm');
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: spacing('md');
  }
}

.level {
  @include glass($glass-bg-strong);
  @include flex(column, center, center, spacing('xs'));
  padding: spacing('lg') spacing('md');
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  text-align: center;
  border-top: 4px solid $color-primary;
  transition: transform $transition-base;

  &:not(.level--locked):hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
  }

  &--locked {
    opacity: 0.55;
    border-top-color: $color-border;
    cursor: not-allowed;
  }

  &__num {
    @include flex-center;
    width: 40px;
    height: 40px;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    color: $color-white;
    background: $color-primary;
    border-radius: $radius-pill;
  }

  &--locked &__num {
    background: $color-text-muted;
  }

  &__name {
    font-weight: $font-weight-bold;
    color: $color-ink;
    font-size: font-size('sm');
  }

  &__lock {
    font-size: font-size('md');
  }
}
</style>
