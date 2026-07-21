<script setup lang="ts">
import type { Badge } from '~/services/badgeService'

// Achievement card that can be shared to WhatsApp (image generated via canvas).
const props = defineProps<{
  name: string
  avatar: string
  stars: number
  lessons: number
  streak: number
  badges: Badge[]
}>()

const { share } = useShareCard()
const { play } = useAudio()
const sharing = ref(false)

const earnedIcons = computed(() => props.badges.filter((b) => b.earned).map((b) => b.icon))

async function onShare() {
  sharing.value = true
  play('pop')
  try {
    await share({
      name: props.name,
      avatar: props.avatar,
      stars: props.stars,
      lessons: props.lessons,
      streak: props.streak,
      badges: earnedIcons.value,
    })
  } finally {
    sharing.value = false
  }
}
</script>

<template>
  <div class="ach">
    <div class="ach__preview">
      <span class="ach__avatar" aria-hidden="true">{{ avatar || '🦉' }}</span>
      <div class="ach__body">
        <p class="ach__name">Hebat, {{ name }}! 🎉</p>
        <div class="ach__stats">
          <span>⭐ {{ stars }}</span>
          <span>✅ {{ lessons }}</span>
          <span>🔥 {{ streak }}</span>
        </div>
        <div v-if="earnedIcons.length" class="ach__badges" aria-hidden="true">
          {{ earnedIcons.slice(0, 8).join(' ') }}
        </div>
      </div>
    </div>

    <BaseButton variant="success" size="lg" :disabled="sharing" @click="onShare">
      📤 Bagikan Pencapaian
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.ach {
  @include flex(column, flex-start, stretch, spacing('md'));
  padding: spacing('lg');
  border-radius: $radius-xl;
  background: $gradient-primary;
  background-size: 180% 180%;
  animation: gradient-shift 8s ease infinite;
  box-shadow: $shadow-primary;
  color: $color-white;

  &__preview {
    @include flex(row, flex-start, center, spacing('md'));
  }

  &__avatar {
    @include flex-center;
    width: 72px;
    height: 72px;
    font-size: font-size('xl');
    background: rgba($color-white, 0.2);
    border-radius: $radius-pill;
    flex-shrink: 0;
  }

  &__name {
    margin: 0 0 spacing('xs');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    color: $color-white; // override the global `p { color: muted }` rule
  }

  &__stats {
    @include flex(row, flex-start, center, spacing('md'));
    font-weight: $font-weight-bold;
    flex-wrap: wrap;
  }

  &__badges {
    margin-top: spacing('xs');
    font-size: font-size('lg');
  }
}
</style>
