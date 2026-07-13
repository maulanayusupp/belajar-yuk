import { musicService } from '~/services/musicService'

// Musik latar reaktif (mati secara default). Bila diaktifkan namun butuh
// interaksi (kebijakan autoplay), musik mulai pada sentuhan pertama.
export function useMusic() {
  const enabled = useState<boolean>('music-enabled', () => false)

  onMounted(() => {
    enabled.value = musicService.isEnabled()
    if (enabled.value) {
      // Autoplay sering diblokir sampai ada interaksi → mulai saat sentuhan pertama.
      const go = () => {
        musicService.start()
        window.removeEventListener('pointerdown', go)
      }
      window.addEventListener('pointerdown', go, { once: true })
    }
  })

  function toggle() {
    enabled.value = !enabled.value
    musicService.setEnabled(enabled.value) // dipicu klik = boleh langsung mulai
  }

  return { enabled, toggle }
}
