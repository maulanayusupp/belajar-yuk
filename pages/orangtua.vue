<script setup lang="ts">
import { SPEECH_RATE_OPTIONS } from '~/services/audioService'

// Area Orang Tua: dilindungi "gerbang" sederhana (soal untuk dewasa)
// agar anak tak sengaja masuk. Berisi pengaturan suara, profil, & reset.
const GATE_ANSWER = 56 // 7 × 8

const unlocked = ref(false)
const gateInput = ref('')
const gateError = ref(false)

function tryUnlock() {
  if (Number(gateInput.value) === GATE_ANSWER) {
    unlocked.value = true
    gateError.value = false
  } else {
    gateError.value = true
  }
}

const { muted, toggleMute, speechRate, setSpeechRate } = useAudio()
const { enabled: musicOn, toggle: toggleMusic } = useMusic()
const { profile } = useProfile()
const { resetAll } = useProgress()
const { reset: resetStreak } = useStreak()

const editing = ref(false)
const confirmReset = ref(false)

function doReset() {
  resetAll()
  resetStreak()
  confirmReset.value = false
}

useHead({ title: 'Area Orang Tua' })
</script>

<template>
  <div class="parent">
    <NuxtLink to="/" class="parent__back">← Beranda</NuxtLink>
    <h1 class="parent__heading">👨‍👩‍👧 Area Orang Tua</h1>

    <!-- Gerbang -->
    <section v-if="!unlocked" class="gate">
      <p class="gate__q">Untuk masuk, jawab dulu: <strong>7 × 8 = ?</strong></p>
      <input
        v-model="gateInput"
        class="gate__input"
        type="number"
        inputmode="numeric"
        placeholder="Jawaban…"
        @keyup.enter="tryUnlock"
      />
      <BaseButton variant="primary" @click="tryUnlock">Masuk</BaseButton>
      <p v-if="gateError" class="gate__error">Jawaban belum tepat, coba lagi.</p>
    </section>

    <!-- Panel pengaturan -->
    <template v-else>
      <section class="panel">
        <h2 class="panel__title">🔊 Suara</h2>
        <div class="panel__row">
          <span>Suara &amp; musik</span>
          <BaseButton variant="ghost" @click="toggleMute">
            {{ muted ? '🔇 Nyalakan' : '🔊 Matikan' }}
          </BaseButton>
        </div>
        <div class="panel__row">
          <span>Musik latar</span>
          <BaseButton variant="ghost" @click="toggleMusic">
            {{ musicOn ? '🎵 Matikan' : '🎵 Nyalakan' }}
          </BaseButton>
        </div>
        <div class="panel__row">
          <span>Kecepatan bicara</span>
          <div class="speed">
            <button
              v-for="opt in SPEECH_RATE_OPTIONS"
              :key="opt.value"
              class="speed__btn"
              :class="{ 'speed__btn--active': speechRate === opt.value }"
              type="button"
              @click="setSpeechRate(opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </section>

      <section class="panel">
        <h2 class="panel__title">🧒 Profil Anak</h2>
        <div class="panel__row">
          <span v-if="profile">{{ profile.avatar }} {{ profile.name }}</span>
          <span v-else>Belum ada profil</span>
          <BaseButton variant="ghost" @click="editing = true">Ubah</BaseButton>
        </div>
      </section>

      <section class="panel panel--danger">
        <h2 class="panel__title">♻️ Atur Ulang</h2>
        <p class="panel__desc">
          Menghapus semua bintang, progres, & rentetan hari. Tidak bisa dibatalkan.
        </p>
        <div v-if="!confirmReset" class="panel__row">
          <BaseButton variant="ghost" @click="confirmReset = true">Reset Progres</BaseButton>
        </div>
        <div v-else class="panel__row">
          <BaseButton variant="ghost" @click="confirmReset = false">Batal</BaseButton>
          <BaseButton variant="primary" @click="doReset">Ya, hapus semua</BaseButton>
        </div>
      </section>
    </template>

    <ProfileSetup v-if="editing" @close="editing = false" />
  </div>
</template>

<style scoped lang="scss">
.parent {
  @include flex(column, flex-start, stretch, spacing('lg'));
  padding-block: spacing('lg');
  max-width: 620px;
  margin-inline: auto;

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

  &__heading {
    margin: 0;
  }
}

.gate {
  @include glass($glass-bg-strong);
  @include flex(column, flex-start, flex-start, spacing('md'));
  padding: spacing('xl');
  border-radius: $radius-lg;
  box-shadow: $shadow-md;

  &__q {
    margin: 0;
    font-size: font-size('lg');
    color: $color-ink;
  }

  &__input {
    width: 160px;
    padding: spacing('sm') spacing('md');
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    border: 3px solid $color-border;
    border-radius: $radius-md;

    &:focus-visible {
      outline: none;
      border-color: $color-primary-light;
    }
  }

  &__error {
    margin: 0;
    color: $color-error;
    font-weight: $font-weight-bold;
  }
}

.panel {
  @include glass($glass-bg-strong);
  @include flex(column, flex-start, stretch, spacing('sm'));
  padding: spacing('lg');
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &--danger {
    border: 2px solid rgba($color-error, 0.4);
  }

  &__title {
    margin: 0;
    font-size: font-size('lg');
  }

  &__desc {
    margin: 0;
    font-size: font-size('sm');
  }

  &__row {
    @include flex(row, space-between, center, spacing('md'));
    flex-wrap: wrap;
  }
}

.speed {
  @include flex(row, flex-end, center, spacing('xs'));
  flex-wrap: wrap;

  &__btn {
    @include tappable;
    padding: spacing('xs') spacing('md');
    font-weight: $font-weight-bold;
    color: $color-ink-soft;
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;

    &--active {
      color: $color-white;
      background: $color-primary;
      border-color: $color-primary;
    }
  }
}
</style>
