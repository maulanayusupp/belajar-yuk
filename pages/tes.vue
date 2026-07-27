<script setup lang="ts">
import type { Lesson } from '~/types'
import { range } from '~/utils/array'
import { lessonService } from '~/services/lessonService'

// Short placement test (EF-style): measure ability → recommend where to start.
interface PQuestion {
  emoji: string
  repeat: number
  prompt: string
  options: string[]
  correct: string
}

const questions: PQuestion[] = [
  {
    emoji: '🍎',
    repeat: 1,
    prompt: 'Kata "Apple" diawali huruf apa?',
    options: ['A', 'P', 'E', 'S'],
    correct: 'A',
  },
  {
    emoji: '🐱',
    prompt: 'Apa Bahasa Inggris dari "Kucing"?',
    repeat: 1,
    options: ['Dog', 'Cat', 'Fish', 'Cow'],
    correct: 'Cat',
  },
  { emoji: '🍎', repeat: 4, prompt: 'Ada berapa?', options: ['3', '4', '5', '6'], correct: '4' },
  { emoji: '', repeat: 0, prompt: '2 + 3 = ?', options: ['4', '5', '6', '7'], correct: '5' },
  {
    emoji: '🌙',
    repeat: 1,
    prompt: 'Apa Bahasa Inggris dari "Bulan"?',
    options: ['Sun', 'Star', 'Moon', 'Sky'],
    correct: 'Moon',
  },
  { emoji: '', repeat: 0, prompt: '5 − 2 = ?', options: ['2', '3', '4', '5'], correct: '3' },
]

const { play } = useAudio()
const index = ref(0)
const selected = ref<string | null>(null)
const score = ref(0)
const done = ref(false)

const current = computed(() => questions[index.value])
const answered = computed(() => selected.value !== null)
const isLast = computed(() => index.value === questions.length - 1)

function choose(v: string) {
  if (answered.value) return
  selected.value = v
  if (v === current.value.correct) {
    score.value++
    play('correct')
  } else {
    play('wrong')
  }
}
function next() {
  if (isLast.value) {
    done.value = true
    return
  }
  index.value++
  selected.value = null
}
function restart() {
  index.value = 0
  selected.value = null
  score.value = 0
  done.value = false
}

// Recommendation based on the score.
const result = computed(() => {
  const s = score.value
  if (s <= 2) {
    return {
      title: 'Ayo mulai dari dasar! 🌱',
      text: 'Kita mulai dari mengenal huruf & berhitung benda.',
      lessons: ['en-phonics', 'mt-counting'],
    }
  }
  if (s <= 4) {
    return {
      title: 'Bagus! Lanjut memperkuat 🚀',
      text: 'Kamu sudah paham dasar. Perbanyak kosakata & penjumlahan.',
      lessons: ['en-animals', 'mt-number-bond-10'],
    }
  }
  return {
    title: 'Hebat! Kamu sudah siap 🏆',
    text: 'Coba materi yang lebih menantang. Kategori Penjelajah & Juara segera hadir!',
    lessons: ['en-cvc-words', 'mt-addition-to-10'],
  }
})
const recommended = computed<Lesson[]>(() =>
  result.value.lessons
    .map((id) => lessonService.getLesson(id))
    .filter((l): l is Lesson => l !== null),
)

useHead({ title: 'Tes Penempatan' })
</script>

<template>
  <div class="tes">
    <NuxtLink to="/" class="tes__back">← Beranda</NuxtLink>
    <header class="tes__head">
      <h1 class="tes__title"><span aria-hidden="true">🎯</span> Tes Penempatan</h1>
      <p class="tes__subtitle">Jawab soal singkat untuk tahu dari mana sebaiknya kamu mulai.</p>
    </header>

    <template v-if="!done">
      <BaseMascot
        message="Jawab beberapa soal ya, biar kita tahu kamu mulai dari mana."
        message-en="Let's find your level!"
      />
      <BaseProgressBar :current="index + 1" :total="questions.length" accent="primary" />

      <BaseCard accent="primary">
        <div class="tes__stage">
          <div v-if="current.repeat > 1" class="tes__objects">
            <span v-for="i in range(current.repeat)" :key="i" aria-hidden="true">{{
              current.emoji
            }}</span>
          </div>
          <span v-else-if="current.emoji" class="tes__emoji" aria-hidden="true">{{
            current.emoji
          }}</span>
          <p class="tes__prompt">{{ current.prompt }}</p>
        </div>
      </BaseCard>

      <div class="tes__options">
        <button
          v-for="opt in current.options"
          :key="opt"
          class="tes__option"
          :class="{
            'tes__option--correct': answered && opt === current.correct,
            'tes__option--wrong': answered && opt === selected && opt !== current.correct,
          }"
          type="button"
          :disabled="answered"
          @click="choose(opt)"
        >
          {{ opt }}
        </button>
      </div>

      <BaseButton v-if="answered" variant="primary" size="lg" @click="next">
        {{ isLast ? 'Lihat Hasil 🎉' : 'Lanjut →' }}
      </BaseButton>
    </template>

    <!-- Result -->
    <div v-else class="hasil">
      <h1 class="hasil__title">{{ result.title }}</h1>
      <p class="hasil__score">Skor kamu: {{ score }} / {{ questions.length }}</p>
      <p class="hasil__text">{{ result.text }}</p>
      <p class="hasil__label">Mulai dari sini:</p>
      <div class="hasil__lessons">
        <NuxtLink
          v-for="l in recommended"
          :key="l.id"
          :to="`/${l.subject}/${l.id}`"
          class="hasil__lesson"
        >
          <span aria-hidden="true">{{ l.emoji }}</span> {{ l.title }}
        </NuxtLink>
      </div>
      <BaseButton variant="ghost" @click="restart">🔁 Ulangi Tes</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tes {
  @include flex(column, flex-start, stretch, spacing('lg'));
  padding-block: spacing('lg');
  max-width: 640px;
  margin-inline: auto;

  &__back {
    align-self: flex-start;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
  }

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
    margin-bottom: spacing('sm');
  }

  &__title {
    margin: 0;
  }

  &__subtitle {
    margin: 0;
    color: $color-text-muted;
  }

  &__stage {
    @include flex(column, center, center, spacing('sm'));
    text-align: center;
  }

  &__objects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: spacing('sm');
    font-size: font-size('xl');
  }

  &__emoji {
    font-size: font-size('display');
  }

  &__prompt {
    margin: 0;
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing('md');
    max-width: 420px;
    width: 100%;
    margin-inline: auto;
  }

  &__option {
    @include tappable;
    padding: spacing('md');
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-ink;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    &--correct {
      background: rgba($color-success, 0.15);
      border-color: $color-success;
      color: #05987a;
    }
    &--wrong {
      background: rgba($color-error, 0.12);
      border-color: $color-error;
      color: $color-error;
    }
  }
}

.hasil {
  @include glass($glass-bg-strong);
  @include flex(column, center, center, spacing('md'));
  padding: spacing('xl');
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  text-align: center;

  &__title {
    margin: 0;
  }
  &__score {
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
  }
  &__text {
    margin: 0;
  }
  &__label {
    margin: spacing('sm') 0 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__lessons {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;
  }

  &__lesson {
    @include tappable;
    padding: spacing('sm') spacing('lg');
    font-weight: $font-weight-bold;
    color: $color-white;
    background: $gradient-primary;
    border-radius: $radius-pill;
    box-shadow: $shadow-primary;
  }
}
</style>
