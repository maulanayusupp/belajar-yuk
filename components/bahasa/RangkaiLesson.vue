<script setup lang="ts">
import type { BahasaLesson, ReadingItem } from '~/types'
import { shuffle, range, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Merangkai: susun suku kata acak menjadi kata yang benar (bu + ku = buku).
const props = defineProps<{ lesson: BahasaLesson }>()

const { saveResult } = useProgress()
const { play, speak } = useAudio()

// Hanya item yang punya pecahan suku kata yang bisa dirangkai.
const questions = computed(() =>
  shuffle(props.lesson.items.filter((i) => (i.syllables?.length ?? 0) >= 2)),
)
const index = ref(0)
const correct = ref(0)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const current = computed<ReadingItem>(() => questions.value[index.value])
const syllables = computed(() => current.value.syllables ?? [])
const isLast = computed(() => index.value === questions.value.length - 1)

interface Tile {
  id: number
  syl: string
  used: boolean
}
const tiles = ref<Tile[]>([])
const built = ref<number[]>([]) // urutan id tile yang dipilih
const status = ref<'typing' | 'correct' | 'wrong'>('typing')

const builtSyllables = computed(() =>
  built.value.map((id) => tiles.value.find((t) => t.id === id)?.syl ?? ''),
)

function setup() {
  tiles.value = shuffle(syllables.value).map((s, i) => ({ id: i, syl: s, used: false }))
  built.value = []
  status.value = 'typing'
  speak(current.value.text, 'id-ID')
}
onMounted(setup)
watch(index, setup)

function tap(tile: Tile) {
  if (status.value === 'correct' || tile.used) return
  tile.used = true
  built.value.push(tile.id)
  play('pop')
  speak(tile.syl, 'id-ID')
  if (built.value.length === syllables.value.length) check()
}

function check() {
  if (builtSyllables.value.join('') === current.value.text) {
    status.value = 'correct'
    correct.value++
    play('correct')
    speak(current.value.text, 'id-ID')
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
  navigateTo('/bahasa')
}
</script>

<template>
  <div class="rangkai">
    <template v-if="!done">
      <BaseMascot message="Susun suku kata menjadi kata yang benar." message-en="Build the word!" />
      <BaseProgressBar :current="index + 1" :total="questions.length" accent="bahasa" />

      <div class="rangkai__stage">
        <span class="rangkai__emoji" aria-hidden="true">{{ current.emoji }}</span>
        <span v-if="current.hint" class="rangkai__hint">{{ current.hint }}</span>

        <!-- Kotak suku kata tersusun -->
        <div class="rangkai__slots" :class="`rangkai__slots--${status}`">
          <span v-for="i in range(syllables.length)" :key="i" class="rangkai__slot">
            {{ builtSyllables[i] ?? '' }}
          </span>
        </div>
      </div>

      <!-- Suku kata acak -->
      <div class="rangkai__tiles">
        <button
          v-for="tile in tiles"
          :key="tile.id"
          class="rangkai__tile"
          type="button"
          :disabled="tile.used || status === 'correct'"
          @click="tap(tile)"
        >
          {{ tile.syl }}
        </button>
      </div>

      <div class="rangkai__actions">
        <BaseButton v-if="status !== 'correct'" variant="ghost" @click="clearBuilt">
          ⟲ Hapus
        </BaseButton>
        <BaseButton v-if="status === 'correct'" variant="primary" size="lg" @click="next">
          {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
        </BaseButton>
      </div>
      <p v-if="status === 'wrong'" class="rangkai__retry">
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
.rangkai {
  @include flex(column, flex-start, stretch, spacing('lg'));

  &__stage {
    @include flex(column, center, center, spacing('sm'));
  }

  &__emoji {
    font-size: font-size('giant');
  }

  &__hint {
    font-size: font-size('md');
    color: $color-text-muted;
    font-weight: $font-weight-semibold;
  }

  &__slots {
    @include flex(row, center, center, spacing('sm'));
    margin-top: spacing('sm');

    &--correct .rangkai__slot {
      border-color: $color-success;
      background: rgba($color-success, 0.15);
      color: #05987a;
    }
    &--wrong .rangkai__slot {
      border-color: $color-error;
      background: rgba($color-error, 0.1);
      animation: shake 0.4s ease;
    }
  }

  &__slot {
    @include flex-center;
    min-width: 64px;
    height: 60px;
    padding-inline: spacing('sm');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xl');
    color: $color-bahasa-dark;
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
    min-width: 64px;
    height: 56px;
    padding-inline: spacing('md');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    color: $color-white;
    background: $gradient-bahasa;
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
