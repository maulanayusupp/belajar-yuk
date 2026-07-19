<script setup lang="ts">
// "Ceritakan Caramu" — a short reflection step shown after a child finishes a
// material. It asks them to explain HOW they solved it (out loud, to a parent
// or themselves). Explaining one's reasoning builds understanding & confidence
// (metacognition / self-explanation). Spoken, not typed — friendly for ages 6+.
const props = withDefaults(defineProps<{ question?: string; starters?: string[] }>(), {
  question: 'Yuk ceritakan ke Ayah/Bunda: bagaimana caramu tadi menyelesaikannya?',
  starters: () => ['Aku mulai dengan…', 'Lalu aku…', 'Aku berhasil karena…'],
})
const emit = defineEmits<{ done: [] }>()

const { speak, play } = useAudio()
const told = ref(false)

// Read the question aloud (respects mute) so pre-readers understand it.
onMounted(() => {
  window.setTimeout(() => speak(props.question, 'id-ID'), 700)
})

function say(starter: string) {
  play('pop')
  speak(starter, 'id-ID')
}

function done() {
  told.value = true
  play('correct')
  emit('done')
}
</script>

<template>
  <div class="reflect" :class="{ 'reflect--told': told }">
    <span class="reflect__icon" aria-hidden="true">🗣️</span>
    <template v-if="!told">
      <p class="reflect__q">{{ question }}</p>
      <div class="reflect__starters">
        <button
          v-for="s in starters"
          :key="s"
          class="reflect__starter"
          type="button"
          @click="say(s)"
        >
          {{ s }}
        </button>
      </div>
      <BaseButton variant="success" size="sm" @click="done">🎤 Sudah kuceritakan!</BaseButton>
    </template>
    <p v-else class="reflect__cheer">
      Hebat! Menjelaskan caramu bikin kamu makin pintar & percaya diri. ⭐
    </p>
  </div>
</template>

<style scoped lang="scss">
.reflect {
  @include flex(column, center, center, spacing('sm'));
  width: 100%;
  padding: spacing('md');
  text-align: center;
  background: rgba($color-secondary, 0.1);
  border: 2px dashed rgba($color-secondary, 0.5);
  border-radius: $radius-lg;

  &--told {
    border-style: solid;
    border-color: rgba($color-success, 0.5);
    background: rgba($color-success, 0.1);
  }

  &__icon {
    font-size: font-size('xl');
  }

  &__q {
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
    font-size: font-size('sm');
  }

  &__starters {
    @include flex(row, center, center, spacing('xs'));
    flex-wrap: wrap;
  }

  &__starter {
    @include tappable;
    padding: spacing('xs') spacing('md');
    font-weight: $font-weight-semibold;
    font-size: font-size('sm');
    color: $color-secondary-dark;
    background: $color-white;
    border: 2px solid rgba($color-secondary, 0.4);
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
  }

  &__cheer {
    margin: 0;
    font-weight: $font-weight-bold;
    color: #05987a;
    font-size: font-size('sm');
  }
}
</style>
