<script setup lang="ts">
import type { EnglishLesson } from '~/types'
import { shuffle, range, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Sentence building: arrange scrambled WORD tiles into the correct sentence.
// Reuses the vocabulary item shape — `word` holds the full sentence, `translation`
// the Indonesian meaning, `emoji` a picture cue. Teaches word order / grammar.
const props = defineProps<{ lesson: EnglishLesson }>()

const { saveResult } = useProgress()
const { play, pronounce } = useAudio()

const questions = computed(() => shuffle(props.lesson.items))
const index = ref(0)
const correct = ref(0)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const current = computed(() => questions.value[index.value])
const sentence = computed(() => current.value.word)
const words = computed(() => sentence.value.split(' '))
const isLast = computed(() => index.value === questions.value.length - 1)

interface Tile {
  id: number
  word: string
  used: boolean
}
const tiles = ref<Tile[]>([])
const built = ref<number[]>([]) // order of selected tile ids
const status = ref<'building' | 'correct' | 'wrong'>('building')

const builtWords = computed(() =>
  built.value.map((id) => tiles.value.find((t) => t.id === id)?.word ?? ''),
)

function setup() {
  // Shuffle until the order isn't already correct (so there's a real task).
  let order = shuffle(words.value)
  if (words.value.length > 1) {
    let guard = 0
    while (order.join(' ') === sentence.value && guard < 10) {
      order = shuffle(words.value)
      guard++
    }
  }
  tiles.value = order.map((w, i) => ({ id: i, word: w, used: false }))
  built.value = []
  status.value = 'building'
  pronounce(sentence.value, current.value.audioUrl)
}
onMounted(setup)
watch(index, setup)

function tap(tile: Tile) {
  if (status.value === 'correct' || tile.used) return
  tile.used = true
  built.value.push(tile.id)
  if (built.value.length === words.value.length) check()
}

function check() {
  if (builtWords.value.join(' ') === sentence.value) {
    status.value = 'correct'
    correct.value++
    play('correct')
    pronounce(sentence.value, current.value.audioUrl)
    mistakeService.remove(props.lesson.id, current.value.id)
  } else {
    status.value = 'wrong'
    play('wrong')
    mistakeService.add(props.lesson.id, current.value.id)
  }
}

function clearBuilt() {
  tiles.value.forEach((t) => (t.used = false))
  built.value = []
  status.value = 'building'
}

function starsFromScore(c: number, total: number): number {
  const ratio = total > 0 ? c / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return clamp(c, 0, 1)
}

function next() {
  if (isLast.value) {
    stars.value = starsFromScore(correct.value, questions.value.length)
    scoreText.value = `Kamu benar ${correct.value} dari ${questions.value.length} kalimat`
    saveResult(props.lesson.id, stars.value)
    done.value = true
    return
  }
  index.value++
}
function restart() {
  index.value = 0
  correct.value = 0
  done.value = false
  setup()
}
function goHome() {
  navigateTo('/' + props.lesson.subject)
}
</script>

<template>
  <div class="sent">
    <template v-if="!done">
      <BaseMascot message="Susun kata jadi kalimat yang benar." message-en="Build the sentence!" />
      <BaseProgressBar :current="index + 1" :total="questions.length" accent="english" />

      <div class="sent__stage">
        <span class="sent__emoji" aria-hidden="true">{{ current.emoji }}</span>
        <span class="sent__hint">{{ current.translation }}</span>

        <!-- Assembled sentence slots -->
        <div class="sent__slots" :class="`sent__slots--${status}`">
          <span v-for="i in range(words.length)" :key="i" class="sent__slot">
            {{ builtWords[i] ?? '' }}
          </span>
        </div>
      </div>

      <!-- Scrambled word tiles -->
      <div class="sent__tiles">
        <button
          v-for="tile in tiles"
          :key="tile.id"
          class="sent__tile"
          type="button"
          :disabled="tile.used || status === 'correct'"
          @click="tap(tile)"
        >
          {{ tile.word }}
        </button>
      </div>

      <div class="sent__actions">
        <BaseButton v-if="status !== 'correct'" variant="ghost" @click="clearBuilt">
          ⟲ Hapus
        </BaseButton>
        <BaseButton v-if="status === 'correct'" variant="english" size="lg" @click="next">
          {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
        </BaseButton>
      </div>
      <p v-if="status === 'correct'" class="sent__said">✅ {{ sentence }}</p>
      <p v-else-if="status === 'wrong'" class="sent__retry">
        Belum tepat — ketuk "Hapus" & coba lagi 😊
      </p>
      <EnglishWhyNote v-if="status === 'correct'" :text="current.why" />
    </template>

    <CelebrationOverlay
      v-else
      :stars="stars"
      :score-text="scoreText"
      @replay="restart"
      @home="goHome"
    />
  </div>
</template>

<style scoped lang="scss">
.sent {
  @include flex(column, flex-start, stretch, spacing('lg'));

  &__stage {
    @include flex(column, center, center, spacing('sm'));
  }

  &__emoji {
    font-size: font-size('display');
  }

  &__hint {
    font-size: font-size('md');
    color: $color-text-muted;
    font-weight: $font-weight-semibold;
    text-align: center;
  }

  &__slots {
    @include flex(row, center, center, spacing('xs'));
    flex-wrap: wrap;
    margin-top: spacing('sm');
    min-height: 56px;
    padding: spacing('sm');
    border-radius: $radius-lg;
    background: rgba($color-english, 0.06);
    border: 2px dashed rgba($color-english, 0.35);

    &--correct {
      border-color: $color-success;
      background: rgba($color-success, 0.12);
    }
    &--wrong {
      border-color: $color-error;
      background: rgba($color-error, 0.08);
      animation: shake 0.4s ease;
    }
  }

  &__slot {
    @include flex-center;
    min-width: 44px;
    height: 44px;
    padding-inline: spacing('sm');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('md');
    color: $color-english-dark;
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    &:empty {
      background: transparent;
      border-style: dashed;
      box-shadow: none;
      min-width: 32px;
    }
  }

  &__tiles {
    @include flex(row, center, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__tile {
    @include tappable;
    @include flex-center;
    height: 48px;
    padding-inline: spacing('md');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('md');
    color: $color-white;
    background: $gradient-english;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    &:disabled {
      opacity: 0.3;
      cursor: default;
      transform: none;
    }
  }

  &__actions {
    @include flex(row, center, center, spacing('md'));
  }

  &__said {
    text-align: center;
    color: #05987a;
    font-weight: $font-weight-bold;
    margin: 0;
  }

  &__retry {
    text-align: center;
    color: $color-error;
    font-weight: $font-weight-bold;
    margin: 0;
  }
}
</style>
