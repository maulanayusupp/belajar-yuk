<script setup lang="ts">
import type { ChangelogEntry } from '~/types'
import entries from '~/changelog/entries.json'

// Catatan perubahan — diurutkan dari tanggal terbaru.
// Data ada di changelog/entries.json (tinggal tambah entri baru di atas).
const items = computed<ChangelogEntry[]>(() =>
  [...(entries as ChangelogEntry[])].sort((a, b) => b.date.localeCompare(a.date)),
)

// Format tanggal deterministik (aman SSR, tanpa Intl/Date).
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
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

useHead({ title: 'Changelog' })
</script>

<template>
  <div class="changelog">
    <NuxtLink to="/" class="changelog__back">← Beranda</NuxtLink>

    <header class="changelog__head">
      <h1 class="changelog__title">📝 Catatan Perubahan</h1>
      <p class="changelog__sub">Apa saja yang baru di Belajar Yuk!</p>
    </header>

    <ol class="timeline">
      <li v-for="entry in items" :key="entry.version" class="entry">
        <div class="entry__marker" aria-hidden="true" />
        <div class="entry__card">
          <div class="entry__meta">
            <span class="entry__tag" :class="`entry__tag--${entry.tag.toLowerCase()}`">
              {{ entry.tag }}
            </span>
            <span class="entry__version">v{{ entry.version }}</span>
            <time class="entry__date" :datetime="entry.date">{{ formatDate(entry.date) }}</time>
          </div>
          <h2 class="entry__title">{{ entry.title }}</h2>
          <ul class="entry__changes">
            <li v-for="(c, i) in entry.changes" :key="i">{{ c }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.changelog {
  @include flex(column, flex-start, stretch, spacing('lg'));
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

  &__title {
    margin: 0;
  }

  &__sub {
    margin: 0;
  }
}

.timeline {
  @include flex(column, flex-start, stretch, spacing('lg'));
  position: relative;
  padding-left: spacing('lg');

  // Garis vertikal timeline
  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: $color-border;
    border-radius: $radius-pill;
  }
}

.entry {
  position: relative;

  &__marker {
    position: absolute;
    left: calc(-1 * #{spacing('lg')} + 0px);
    top: 10px;
    width: 13px;
    height: 13px;
    border-radius: $radius-pill;
    background: $gradient-primary;
    box-shadow: 0 0 0 4px rgba($color-primary, 0.15);
  }

  &__card {
    @include glass($glass-bg-strong);
    @include flex(column, flex-start, flex-start, spacing('sm'));
    padding: spacing('lg');
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
  }

  &__meta {
    @include flex(row, flex-start, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__tag {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    padding: 2px spacing('sm');
    border-radius: $radius-pill;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.12);

    &--fitur {
      color: $color-math-dark;
      background: rgba($color-math, 0.14);
    }
    &--perbaikan {
      color: #05987a;
      background: rgba($color-success, 0.16);
    }
    &--konten {
      color: $color-english-dark;
      background: rgba($color-english, 0.16);
    }
    &--rilis {
      color: #c2410c;
      background: rgba($color-accent-2, 0.22);
    }
  }

  &__version {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__date {
    font-size: font-size('sm');
    color: $color-text-muted;
  }

  &__title {
    margin: 0;
    font-size: font-size('lg');
  }

  &__changes {
    @include flex(column, flex-start, flex-start, spacing('xs'));
    padding-left: spacing('lg');
    list-style: disc;

    li {
      font-size: font-size('sm');
      color: $color-text-muted;
    }
  }
}
</style>
