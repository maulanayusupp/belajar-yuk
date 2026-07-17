<script setup lang="ts">
import { AVATARS, isAvatarUnlocked, type AvatarOption } from '~/services/profileService'

// Child profile creation modal (name + avatar). Certain avatars unlock
// after the child collects stars — so there's something to look forward to.
const emit = defineEmits<{ close: [] }>()
const { profile, save } = useProfile()
const { play } = useAudio()
const { progress } = useProgress()

const totalStars = computed(() =>
  Object.values(progress.value).reduce((sum, e) => sum + (e.stars ?? 0), 0),
)

const name = ref(profile.value?.name ?? '')
const avatar = ref(profile.value?.avatar ?? AVATARS[0].emoji)

const canSave = computed(() => name.value.trim().length > 0)

function pick(a: AvatarOption) {
  if (!isAvatarUnlocked(a, totalStars.value)) return
  avatar.value = a.emoji
}

function submit() {
  if (!canSave.value) return
  play('win')
  save(name.value, avatar.value)
  emit('close')
}
</script>

<template>
  <div class="setup" role="dialog" aria-modal="true" aria-label="Buat profil">
    <div class="setup__card anim-bounce-in">
      <span class="setup__emoji" aria-hidden="true">{{ avatar }}</span>
      <h2 class="setup__title">Halo! Siapa namamu?</h2>
      <p class="setup__sub">Buat profilmu supaya belajar makin seru.</p>

      <input
        v-model="name"
        class="setup__input"
        type="text"
        maxlength="16"
        placeholder="Tulis namamu…"
        @keyup.enter="submit"
      />

      <p class="setup__label">Pilih avatarmu:</p>
      <div class="setup__avatars">
        <button
          v-for="a in AVATARS"
          :key="a.emoji"
          class="setup__avatar"
          :class="{
            'setup__avatar--active': a.emoji === avatar,
            'setup__avatar--locked': !isAvatarUnlocked(a, totalStars),
          }"
          type="button"
          :disabled="!isAvatarUnlocked(a, totalStars)"
          :aria-label="
            isAvatarUnlocked(a, totalStars)
              ? `Avatar ${a.emoji}`
              : `Terkunci, butuh ${a.stars} bintang`
          "
          @click="pick(a)"
        >
          <template v-if="isAvatarUnlocked(a, totalStars)">{{ a.emoji }}</template>
          <span v-else class="setup__lock"
            >🔒<small>⭐{{ a.stars }}</small></span
          >
        </button>
      </div>

      <div class="setup__actions">
        <BaseButton variant="ghost" @click="emit('close')">Nanti saja</BaseButton>
        <BaseButton variant="primary" :disabled="!canSave" @click="submit">Mulai! 🎉</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.setup {
  @include flex-center;
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba($color-ink, 0.45);
  backdrop-filter: blur(4px);
  padding: spacing('md');

  &__card {
    @include card(spacing('xl'));
    @include flex(column, center, center, spacing('sm'));
    text-align: center;
    max-width: 440px;
    width: 100%;
  }

  &__emoji {
    font-size: font-size('display');
  }

  &__title {
    margin: 0;
  }

  &__sub {
    margin: 0;
  }

  &__input {
    width: 100%;
    padding: spacing('md');
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    text-align: center;
    color: $color-ink;
    background: $color-bg;
    border: 3px solid $color-border;
    border-radius: $radius-md;
    margin-top: spacing('sm');

    &:focus-visible {
      outline: none;
      border-color: $color-primary-light;
    }
  }

  &__label {
    margin: spacing('sm') 0 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__avatars {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: spacing('sm');
    width: 100%;
  }

  &__avatar {
    @include tappable;
    @include flex-center;
    aspect-ratio: 1;
    font-size: font-size('lg');
    background: $color-bg;
    border: 3px solid transparent;
    border-radius: $radius-md;

    &--active {
      border-color: $color-primary;
      background: rgba($color-primary, 0.12);
    }

    &--locked {
      cursor: not-allowed;
      opacity: 0.75;
    }
  }

  &__lock {
    @include flex(column, center, center);
    line-height: 1;
    font-size: font-size('md');

    small {
      font-size: 0.6rem;
      font-weight: $font-weight-bold;
      color: $color-text-muted;
    }
  }

  &__actions {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;
    margin-top: spacing('md');
  }
}
</style>
