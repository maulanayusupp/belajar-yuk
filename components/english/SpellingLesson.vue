<script setup lang="ts">
import type { EnglishLesson } from '~/types'
import { shuffle, range, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Spelling: arrange scrambled letters into the correct word (production, not choice).
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
const word = computed(() => current.value.word)
const isLast = computed(() => index.value === questions.value.length - 1)

interface Tile {
  id: number
  char: string
  used: boolean
}
const tiles = ref<Tile[]>([])
const built = ref<number[]>([]) // order of selected tile ids
const status = ref<'typing' | 'correct' | 'wrong'>('typing')

const builtChars = computed(() =>
  built.value.map((id) => tiles.value.find((t) => t.id === id)?.char ?? ''),
)

function setup() {
  const chars = shuffle(word.value.split(''))
  tiles.value = chars.map((c, i) => ({ id: i, char: c, used: false }))
  built.value = []
  status.value = 'typing'
  pronounce(word.value, current.value.audioUrl)
}
onMounted(setup)
watch(index, setup)

function tap(tile: Tile) {
  if (status.value === 'correct' || tile.used) return
  tile.used = true
  built.value.push(tile.id)
  if (built.value.length === word.value.length) check()
}

function check() {
  if (builtChars.value.join('') === word.value) {
    status.value = 'correct'
    correct.value++
    play('correct')
    pronounce(word.value, current.value.audioUrl)
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
  status.value = 'typing'
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
    scoreText.value = `Kamu benar ${correct.value} dari ${questions.value.length} kata`
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
  <div class="spell">
    <template v-if="!done">
      <BaseMascot message="Susun huruf jadi kata yang benar." message-en="Spell the word!" />
      <BaseProgressBar :current="index + 1" :total="questions.length" accent="english" />

      <div class="spell__stage">
        <span class="spell__emoji" aria-hidden="true">{{ current.emoji }}</span>
        <span class="spell__hint">{{ current.translation }}</span>

        <!-- Assembled letter slots -->
        <div class="spell__slots" :class="`spell__slots--${status}`">
          <span v-for="i in range(word.length)" :key="i" class="spell__slot">
            {{ builtChars[i] ?? '' }}
          </span>
        </div>
      </div>

      <!-- Scrambled letters -->
      <div class="spell__tiles">
        <button
          v-for="tile in tiles"
          :key="tile.id"
          class="spell__tile"
          type="button"
          :disabled="tile.used || status === 'correct'"
          @click="tap(tile)"
        >
          {{ tile.char }}
        </button>
      </div>

      <div class="spell__actions">
        <BaseButton v-if="status !== 'correct'" variant="ghost" @click="clearBuilt">
          ⟲ Hapus
        </BaseButton>
        <BaseButton v-if="status === 'correct'" variant="english" size="lg" @click="next">
          {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
        </BaseButton>
      </div>
      <p v-if="status === 'wrong'" class="spell__retry">
        Belum tepat — ketuk "Hapus" & coba lagi 😊
      </p>
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
.spell {
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
  }

  &__slots {
    @include flex(row, center, center, spacing('sm'));
    margin-top: spacing('sm');

    &--correct .spell__slot {
      border-color: $color-success;
      background: rgba($color-success, 0.15);
      color: #05987a;
    }
    &--wrong .spell__slot {
      border-color: $color-error;
      background: rgba($color-error, 0.1);
      animation: shake 0.4s ease;
    }
  }

  &__slot {
    @include flex-center;
    width: 52px;
    height: 60px;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xl');
    text-transform: uppercase;
    color: $color-english-dark;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
  }

  &__tiles {
    @include flex(row, center, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__tile {
    @include tappable;
    @include flex-center;
    width: 52px;
    height: 52px;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    text-transform: uppercase;
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

  &__retry {
    text-align: center;
    color: $color-error;
    font-weight: $font-weight-bold;
    margin: 0;
  }
}
</style>
