<script setup lang="ts">
import { lessonService } from '~/services/lessonService'
import { codingService } from '~/services/codingService'

// Per-subject certificate: issued when ALL of its lessons are completed.
const { greetingName } = useProfile()
const { progress, isCompleted, getStars } = useProgress()
const subjects = lessonService.getSubjects()

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
function formatDate(ms: number): string {
  const d = new Date(ms)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

const cards = computed(() =>
  subjects.map((s) => {
    const lessons = lessonService.getLessons(s.id)
    const done = lessons.filter((l) => isCompleted(l.id))
    const earned = lessons.length > 0 && done.length === lessons.length
    const stars = lessons.reduce((sum, l) => sum + getStars(l.id), 0)
    const dates = lessons.map((l) => progress.value[l.id]?.updatedAt ?? 0).filter(Boolean)
    const dateText = dates.length ? formatDate(Math.max(...dates)) : ''
    return { subject: s, total: lessons.length, doneCount: done.length, earned, stars, dateText }
  }),
)

// Coding certificate (its own store, client-only). Read after mount so SSR
// renders the locked state and hydration matches.
const coding = ref({
  earned: false,
  done: 0,
  total: codingService.totalLevels(),
  stars: 0,
  dateText: '',
})
onMounted(() => {
  coding.value = {
    earned: codingService.allCompleted(),
    done: codingService.completedCount(),
    total: codingService.totalLevels(),
    stars: codingService.totalStars(),
    dateText: formatDate(Date.now()),
  }
})

useHead({ title: 'Sertifikat' })
</script>

<template>
  <div class="cert-page">
    <NuxtLink to="/kemajuan" class="cert-page__back no-print">← Kemajuan</NuxtLink>
    <header class="cert-page__head no-print">
      <h1>🎓 Sertifikat</h1>
      <p>
        Tuntaskan semua pelajaran satu mata pelajaran (atau semua level Coding) untuk sertifikat.
      </p>
    </header>

    <div v-for="c in cards" :key="c.subject.id" class="cert-page__item">
      <Certificate
        v-if="c.earned"
        :name="greetingName"
        :subject="c.subject.title"
        :emoji="c.subject.emoji"
        :date-text="c.dateText"
        :stars="c.stars"
      />
      <div v-else class="locked no-print">
        <span class="locked__emoji" aria-hidden="true">🔒</span>
        <div class="locked__text">
          <strong>Sertifikat {{ c.subject.title }}</strong>
          <span
            >{{ c.doneCount }} / {{ c.total }} pelajaran selesai — lanjutkan untuk membukanya!</span
          >
        </div>
        <BaseButton variant="ghost" @click="navigateTo(`/${c.subject.id}`)">Lanjut</BaseButton>
      </div>
    </div>

    <!-- Coding certificate (separate module) -->
    <div class="cert-page__item">
      <Certificate
        v-if="coding.earned"
        :name="greetingName"
        subject="Coding"
        emoji="🤖"
        :date-text="coding.dateText"
        :stars="coding.stars"
      />
      <div v-else class="locked no-print">
        <span class="locked__emoji" aria-hidden="true">🔒</span>
        <div class="locked__text">
          <strong>Sertifikat Coding</strong>
          <span
            >{{ coding.done }} / {{ coding.total }} level selesai — tuntaskan semua untuk
            membukanya!</span
          >
        </div>
        <BaseButton variant="ghost" @click="navigateTo('/coding')">Lanjut</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cert-page {
  @include flex(column, flex-start, stretch, spacing('xl'));
  padding-block: spacing('lg');
  max-width: 720px;
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

  &__head {
    h1,
    p {
      margin: 0;
    }
  }
}

.locked {
  @include glass($glass-bg-strong);
  @include flex(row, flex-start, center, spacing('md'));
  flex-wrap: wrap;
  padding: spacing('lg');
  border: 2px dashed $color-border;
  border-radius: $radius-lg;

  &__emoji {
    font-size: font-size('xl');
  }

  &__text {
    flex: 1;
    min-width: 180px;
    @include flex(column, flex-start, flex-start, spacing('xs'));
    color: $color-text-muted;

    strong {
      color: $color-ink;
    }
  }
}
</style>
