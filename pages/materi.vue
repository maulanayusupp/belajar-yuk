<script setup lang="ts">
import type { Level } from '~/types'
import { lessonService } from '~/services/lessonService'
import { codingService } from '~/services/codingService'
import { levels as tiers } from '~/data/levels'

// "Daftar Materi" — searchable, collapsible table of contents for everything:
// subjects grouped by tier → lessons, plus Coding worlds. Reads from services
// so it auto-grows with content.
const subjects = lessonService.getSubjects()
const { getStars, isCompleted } = useProgress()
const nextLesson = computed(() => lessonService.getNextLesson(isCompleted))

const allLessons = lessonService.getLessons()
const codingWorlds = codingService.getWorlds()
const codingLevels = codingService.getLevels()

const LinkComp = resolveComponent('NuxtLink')

const codingStars = ref<Record<string, number>>({})
const ready = ref(false)
onMounted(() => {
  codingStars.value = codingService.getStarMap()
  ready.value = true
})

// A coding level is unlocked if it's first, the previous is completed, or it is
// already completed. Computed from the reactive stars snapshot (client), so the
// list matches the coding map and never links a locked level.
function codingUnlocked(id: string): boolean {
  const i = codingLevels.findIndex((l) => l.id === id)
  if (i <= 0) return true
  return (codingStars.value[codingLevels[i - 1].id] ?? 0) > 0 || (codingStars.value[id] ?? 0) > 0
}

// ---- Search + collapse ----
const query = ref('')
const q = computed(() => query.value.trim().toLowerCase())
const searching = computed(() => q.value.length > 0)
const collapsed = ref<Set<string>>(new Set())

function matches(title: string) {
  return !q.value || title.toLowerCase().includes(q.value)
}
function isOpen(id: string) {
  return searching.value || !collapsed.value.has(id)
}
function toggle(id: string) {
  if (searching.value) return
  const next = new Set(collapsed.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  collapsed.value = next
}
function tierMeta(id: Level) {
  return tiers.find((t) => t.id === id) ?? tiers[0]
}

// ---- Filtered sections ----
const subjectSections = computed(() =>
  subjects
    .map((subject) => {
      const groups = lessonService
        .getLessonsGrouped(subject.id)
        .map((g) => ({ meta: g.meta, lessons: g.lessons.filter((l) => matches(l.title)) }))
        .filter((g) => g.lessons.length > 0)
      const count = groups.reduce((n, g) => n + g.lessons.length, 0)
      return { subject, groups, count, id: `subj-${subject.id}` }
    })
    .filter((s) => !searching.value || s.count > 0),
)

const codingSection = computed(() => {
  const worlds = codingWorlds
    .map((w) => ({ world: w, levels: w.levels.filter((l) => matches(l.title)) }))
    .filter((w) => w.levels.length > 0)
  return { worlds, count: worlds.reduce((n, w) => n + w.levels.length, 0) }
})

const resultCount = computed(
  () => subjectSections.value.reduce((n, s) => n + s.count, 0) + codingSection.value.count,
)

// ---- Totals ----
const totalMaterials = computed(() => allLessons.length + codingLevels.length)
const doneMaterials = computed(() => {
  const lessonsDone = allLessons.filter((l) => isCompleted(l.id)).length
  const codingDone = ready.value
    ? codingLevels.filter((l) => (codingStars.value[l.id] ?? 0) > 0).length
    : 0
  return lessonsDone + codingDone
})

useHead({ title: 'Daftar Materi — Belajar Yuk!' })
</script>

<template>
  <div class="toc">
    <NuxtLink to="/" class="toc__back">← Beranda</NuxtLink>

    <header class="toc__head">
      <h1 class="toc__title">📚 Daftar Materi</h1>
      <p class="toc__subtitle">Semua yang bisa dipelajari, tersusun dari mudah ke sulit.</p>
    </header>

    <!-- Search -->
    <div class="search">
      <span class="search__icon" aria-hidden="true">🔍</span>
      <input
        v-model="query"
        class="search__input"
        type="search"
        placeholder="Cari materi… (mis. hewan, angka, robot)"
        aria-label="Cari materi"
      />
      <button
        v-if="searching"
        class="search__clear"
        type="button"
        aria-label="Hapus"
        @click="query = ''"
      >
        ✕
      </button>
    </div>

    <p v-if="searching" class="toc__count">{{ resultCount }} materi cocok dengan “{{ query }}”</p>
    <p v-else class="toc__count">
      <strong>{{ doneMaterials }}</strong> dari {{ totalMaterials }} materi selesai
    </p>

    <!-- Continue (only when not searching) -->
    <NuxtLink
      v-if="!searching && nextLesson"
      :to="`/${nextLesson.subject}/${nextLesson.id}`"
      class="toc__resume"
    >
      <span class="toc__resume-eyebrow">Lanjutkan belajar</span>
      <span class="toc__resume-title">{{ nextLesson.emoji }} {{ nextLesson.title }}</span>
      <span class="toc__resume-cta">Main →</span>
    </NuxtLink>

    <p v-if="searching && resultCount === 0" class="toc__empty">
      Tidak ada materi yang cocok. Coba kata lain ya. 😊
    </p>

    <!-- Subjects -->
    <section v-for="s in subjectSections" :key="s.id" class="acc">
      <button
        class="acc__head"
        :class="`acc__head--${s.subject.theme}`"
        type="button"
        :aria-expanded="isOpen(s.id)"
        @click="toggle(s.id)"
      >
        <span class="acc__emoji" aria-hidden="true">{{ s.subject.emoji }}</span>
        <span class="acc__name">{{ s.subject.title }}</span>
        <span class="acc__count">{{ s.count }}</span>
        <span
          class="acc__chevron"
          :class="{ 'acc__chevron--open': isOpen(s.id) }"
          aria-hidden="true"
          >▾</span
        >
      </button>

      <div v-show="isOpen(s.id)" class="acc__body">
        <div v-for="g in s.groups" :key="g.meta.id" class="tier">
          <p class="tier__label">{{ g.meta.icon }} {{ g.meta.label }} · {{ g.meta.age }}</p>
          <ul class="rows">
            <li v-for="lesson in g.lessons" :key="lesson.id">
              <NuxtLink :to="`/${s.subject.id}/${lesson.id}`" class="row">
                <span class="row__emoji" aria-hidden="true">{{ lesson.emoji }}</span>
                <span class="row__title">{{ lesson.title }}</span>
                <BaseStarRating
                  v-if="isCompleted(lesson.id)"
                  :value="getStars(lesson.id)"
                  size="sm"
                />
                <span v-else class="row__todo" aria-hidden="true">○</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Coding -->
    <section v-if="codingSection.count > 0" class="acc">
      <button
        class="acc__head acc__head--coding"
        type="button"
        :aria-expanded="isOpen('coding')"
        @click="toggle('coding')"
      >
        <span class="acc__emoji" aria-hidden="true">🤖</span>
        <span class="acc__name">Coding</span>
        <span class="acc__count">{{ codingSection.count }}</span>
        <span
          class="acc__chevron"
          :class="{ 'acc__chevron--open': isOpen('coding') }"
          aria-hidden="true"
          >▾</span
        >
      </button>

      <div v-show="isOpen('coding')" class="acc__body">
        <div v-for="w in codingSection.worlds" :key="w.world.id" class="tier">
          <p class="tier__label">
            {{ w.world.icon }} {{ w.world.title }} · {{ tierMeta(w.world.level).label }}
          </p>
          <ul class="rows">
            <li v-for="level in w.levels" :key="level.id">
              <component
                :is="codingUnlocked(level.id) ? LinkComp : 'div'"
                :to="codingUnlocked(level.id) ? `/coding/${level.id}` : undefined"
                class="row"
                :class="{ 'row--locked': !codingUnlocked(level.id) }"
              >
                <span class="row__emoji" aria-hidden="true">{{ w.world.icon }}</span>
                <span class="row__title">{{ level.title }}</span>
                <BaseStarRating
                  v-if="(codingStars[level.id] ?? 0) > 0"
                  :value="codingStars[level.id]"
                  size="sm"
                />
                <span v-else-if="!codingUnlocked(level.id)" class="row__lock" aria-hidden="true"
                  >🔒</span
                >
                <span v-else class="row__todo" aria-hidden="true">○</span>
              </component>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.toc {
  @include flex(column, flex-start, stretch, spacing('md'));
  padding-block: spacing('lg');
  max-width: 760px;
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
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }
  &__title {
    margin: 0;
  }
  &__subtitle {
    margin: 0;
    color: $color-text-muted;
  }
  &__count {
    margin: 0;
    font-weight: $font-weight-semibold;
    color: $color-primary-dark;
    font-size: font-size('sm');
  }
  &__empty {
    text-align: center;
    color: $color-text-muted;
    padding: spacing('lg');
  }

  &__resume {
    @include flex(row, flex-start, center, spacing('md'));
    flex-wrap: wrap;
    padding: spacing('md') spacing('lg');
    border-radius: $radius-lg;
    background: $gradient-primary;
    box-shadow: $shadow-primary;
    color: $color-white;

    &-eyebrow {
      font-size: font-size('xs');
      font-weight: $font-weight-bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.85;
    }
    &-title {
      flex: 1;
      min-width: 140px;
      font-family: $font-family-display;
      font-weight: $font-weight-bold;
    }
    &-cta {
      @include glass(rgba(255, 255, 255, 0.22));
      padding: spacing('xs') spacing('md');
      border-radius: $radius-pill;
      font-weight: $font-weight-bold;
    }
  }
}

// ---- Search ----
.search {
  position: relative;
  @include flex(row, flex-start, center, spacing('sm'));

  &__icon {
    position: absolute;
    left: spacing('md');
    pointer-events: none;
  }

  &__input {
    width: 100%;
    padding: spacing('sm') spacing('xl') spacing('sm') calc(#{spacing('md')} + 24px);
    font-size: font-size('md');
    font-family: $font-family-base;
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;

    &:focus-visible {
      outline: none;
      border-color: $color-primary-light;
    }
  }

  &__clear {
    @include flex-center;
    @include tappable;
    position: absolute;
    right: spacing('sm');
    width: 30px;
    height: 30px;
    border-radius: $radius-pill;
    color: $color-ink-soft;
    background: rgba($color-primary, 0.1);
  }
}

// ---- Accordion ----
.acc {
  @include flex(column, flex-start, stretch, spacing('sm'));

  &__head {
    @include tappable;
    @include flex(row, flex-start, center, spacing('sm'));
    // Stick just below the global app header while scrolling a section.
    position: sticky;
    top: 60px;
    z-index: 5;
    padding: spacing('sm') spacing('md');
    border-radius: $radius-lg;
    color: $color-white;
    box-shadow: $shadow-sm;
    text-align: left;

    &--english {
      background: $gradient-english;
    }
    &--math {
      background: $gradient-math;
    }
    &--science {
      background: $gradient-science;
    }
    &--bahasa {
      background: $gradient-bahasa;
    }
    &--coding {
      background: $gradient-primary;
    }
  }
  &__emoji {
    font-size: font-size('lg');
  }
  &__name {
    flex: 1;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
  }
  &__count {
    font-weight: $font-weight-bold;
    font-size: font-size('sm');
    background: rgba(255, 255, 255, 0.25);
    padding: 2px spacing('sm');
    border-radius: $radius-pill;
  }
  &__chevron {
    font-size: font-size('md');
    transition: transform $transition-base;
    &--open {
      transform: rotate(180deg);
    }
  }

  &__body {
    @include flex(column, flex-start, stretch, spacing('sm'));
    padding-top: spacing('xs');
  }
}

.tier {
  @include flex(column, flex-start, stretch, spacing('xs'));

  &__label {
    margin: spacing('xs') 0 0;
    font-weight: $font-weight-bold;
    color: $color-ink-soft;
    font-size: font-size('sm');
  }
}

.rows {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex(column, flex-start, stretch, spacing('xs'));
}

.row {
  @include flex(row, flex-start, center, spacing('md'));
  padding: spacing('sm') spacing('md');
  background: $color-white;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  transition: all $transition-base;

  &:hover {
    border-color: rgba($color-primary, 0.4);
    transform: translateX(3px);
  }

  &--locked {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      border-color: $color-border;
      transform: none;
    }
  }

  &__emoji {
    font-size: font-size('md');
    flex-shrink: 0;
  }
  &__title {
    flex: 1;
    font-weight: $font-weight-semibold;
    color: $color-ink;
  }
  &__todo {
    flex-shrink: 0;
    color: $color-text-muted;
    font-size: font-size('lg');
  }
  &__lock {
    flex-shrink: 0;
    font-size: font-size('md');
  }
}
</style>
