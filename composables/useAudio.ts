import type { SoundEffect } from '~/types'
import { audioService } from '~/services/audioService'
import { storage } from '~/utils/storage'

const MUTE_KEY = 'belajar-yuk:muted'

// Audio composable with a reactive & global "mute" state.
// All components share the same state instance (useState).
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

  // Speech rate (for the settings UI). Playback always reads the stored value.
  const speechRate = useState<number>('speech-rate', () => audioService.getRate())
  onMounted(() => {
    speechRate.value = audioService.getRate()
  })
  function setSpeechRate(rate: number) {
    speechRate.value = rate
    audioService.setRate(rate) // save the setting
    if (!muted.value) audioService.speak('Hello!') // sample (respect mute)
  }

  /**
   * Speak a word: use the audio file if `audioUrl` is present, otherwise use
   * the synthesized voice (browser default). The recommended pronunciation entry point.
   */
  function pronounce(text: string, audioUrl?: string, lang = 'en-US') {
    if (!muted.value) audioService.pronounce(text, audioUrl, lang)
  }

  return { muted, toggleMute, play, speak, pronounce, speechRate, setSpeechRate }
}
