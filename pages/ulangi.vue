<script setup lang="ts">
import type { ReviewQuestion } from '~/services/lessonService'

// Mode "Ulang Kesalahan": latih ulang soal/kata yang pernah salah.
const { questions, resolve } = useMistakes()

const mounted = ref(false)
const qs = ref<ReviewQuestion[]>([])
const finished = ref(false)

onMounted(() => {
  mounted.value = true
  qs.value = questions() // ambil snapshot untuk sesi ini
})

function onResolve(q: ReviewQuestion) {
  resolve(q.lessonId, q.itemId)
}
function onDone() {
  finished.value = true
}

useHead({ title: 'Ulang Kesalahan' })
</script>

<template>
  <div class="review-page">
    <NuxtLink to="/kemajuan" class="review-page__back">← Kemajuan</NuxtLink>
    <header class="review-page__head">
      <h1 class="review-page__title">🔁 Ulang Kesalahan</h1>
      <p class="review-page__sub">Latih lagi yang pernah keliru sampai dikuasai.</p>
    </header>

    <template v-if="mounted">
      <!-- Selesai / tidak ada yang perlu diulang -->
      <div v-if="finished || qs.length === 0" class="empty">
        <span class="empty__emoji" aria-hidden="true">{{ qs.length === 0 ? '🎉' : '🌟' }}</span>
        <p class="empty__text">
          {{
            qs.length === 0
              ? 'Tidak ada yang perlu diulang. Kamu hebat!'
              : 'Selesai! Terus berlatih ya.'
          }}
        </p>
        <div class="empty__actions">
          <BaseButton variant="ghost" @click="navigateTo('/kemajuan')">📊 Kemajuan</BaseButton>
          <BaseButton variant="primary" @click="navigateTo('/english')">🚀 Belajar Lagi</BaseButton>
        </div>
      </div>

      <!-- Kuis ulang -->
      <BaseCard v-else accent="primary">
        <ReviewQuiz :questions="qs" @resolve="onResolve" @done="onDone" />
      </BaseCard>
    </template>
  </div>
</template>

<style scoped lang="scss">
.review-page {
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

    &:hover {
      background: rgba($color-primary, 0.1);
    }
  }

  &__title {
    margin: 0;
  }
  &__sub {
    margin: 0;
  }
}

.empty {
  @include glass($glass-bg-strong);
  @include flex(column, center, center, spacing('md'));
  padding: spacing('xxl') spacing('xl');
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  text-align: center;

  &__emoji {
    font-size: font-size('display');
  }
  &__text {
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }
  &__actions {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;
  }
}
</style>
