<script setup lang="ts">
// Sertifikat penghargaan (tampil di layar, bisa dicetak & dibagikan).
const props = defineProps<{
  name: string
  subject: string
  emoji: string
  dateText: string
  stars: number
}>()

const { share } = useCertificate()
const { play } = useAudio()

function print() {
  if (typeof window !== 'undefined') window.print()
}
function onShare() {
  play('pop')
  share({
    name: props.name,
    subject: props.subject,
    emoji: props.emoji,
    dateText: props.dateText,
    stars: props.stars,
  })
}
</script>

<template>
  <div class="cert-wrap">
    <div class="certificate">
      <span class="certificate__brand">🎈 BELAJAR YUK!</span>
      <h2 class="certificate__title">Sertifikat Penghargaan</h2>
      <p class="certificate__lead">Diberikan dengan bangga kepada</p>
      <span class="certificate__emoji" aria-hidden="true">{{ emoji }}</span>
      <p class="certificate__name">{{ name }}</p>
      <p class="certificate__desc">
        atas keberhasilan menuntaskan semua pelajaran <strong>{{ subject }}</strong>
      </p>
      <p class="certificate__date">{{ dateText }}</p>
    </div>

    <div class="certificate__actions no-print">
      <BaseButton variant="ghost" @click="print">🖨️ Cetak</BaseButton>
      <BaseButton variant="success" @click="onShare">📤 Bagikan</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cert-wrap {
  @include flex(column, flex-start, stretch, spacing('md'));
}

.certificate {
  @include flex(column, center, center, spacing('sm'));
  position: relative;
  text-align: center;
  padding: spacing('xl');
  background: #fffdf7;
  border: 6px solid $color-primary;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;

  // Bingkai emas dalam
  &::before {
    content: '';
    position: absolute;
    inset: 10px;
    border: 2px solid $color-accent-2;
    border-radius: $radius-md;
    pointer-events: none;
  }

  &__brand {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    color: $color-primary;
    letter-spacing: 0.05em;
  }

  &__title {
    margin: 0;
    color: $color-ink;
  }

  &__lead {
    margin: 0;
    color: $color-text-muted;
  }

  &__emoji {
    font-size: font-size('giant');
  }

  &__name {
    margin: 0;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xxl');
    @include gradient-text($gradient-primary);
  }

  &__desc {
    margin: 0;
    color: $color-ink;
    max-width: 460px;
  }

  &__date {
    margin-top: spacing('sm');
    font-size: font-size('sm');
    color: $color-text-muted;
  }

  &__actions {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;
  }
}
</style>
