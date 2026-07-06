import type { SoundEffect } from '~/types'
import { audioService } from '~/services/audioService'
import { storage } from '~/utils/storage'

const MUTE_KEY = 'belajar-yuk:muted'

// Composable suara dengan status "mute" reaktif & global.
// Semua komponen memakai instance state yang sama (useState).
export function useAudio() {
  const muted = useState<boolean>('audio-muted', () => storage.get(MUTE_KEY, false))

  function toggleMute() {
    muted.value = !muted.value
    storage.set(MUTE_KEY, muted.value)
    if (muted.value) audioService.stopSpeaking()
  }

  function play(effect: SoundEffect) {
    if (!muted.value) audioService.play(effect)
  }

  function speak(text: string, lang = 'en-US') {
    if (!muted.value) audioService.speak(text, lang)
  }

  return { muted, toggleMute, play, speak }
}
