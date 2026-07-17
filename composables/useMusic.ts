import { musicService } from '~/services/musicService'

// Reactive background music (off by default). If enabled but interaction
// is required (autoplay policy), the music starts on the first touch.
export function useMusic() {
  const enabled = useState<boolean>('music-enabled', () => false)

  onMounted(() => {
    enabled.value = musicService.isEnabled()
    if (enabled.value) {
      // Autoplay is often blocked until an interaction → start on the first touch.
      const go = () => {
        musicService.start()
        window.removeEventListener('pointerdown', go)
      }
      window.addEventListener('pointerdown', go, { once: true })
    }
  })

  function toggle() {
    enabled.value = !enabled.value
    musicService.setEnabled(enabled.value) // triggered by a click = OK to start immediately
  }

  return { enabled, toggle }
}
