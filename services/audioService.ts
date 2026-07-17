import type { SoundEffect } from '~/types'
import { storage } from '~/utils/storage'

// =============================================================
//  Audio service — no external audio files:
//   1) Word pronunciation uses the Web Speech API (SpeechSynthesis).
//   2) Sound effects (click, correct, wrong, win) are generated directly
//      via the Web Audio API (oscillator), so they're lightweight & free.
//  All safe to call during SSR (automatic no-op when not in a browser).
// =============================================================

const isBrowser = typeof window !== 'undefined'

// Speech rate — configurable by parents (stored in localStorage).
// The default is deliberately slow so children can follow along easily.
// v2: discard any old value that may be "stuck" (e.g. previously set to Fast).
const RATE_KEY = 'belajar-yuk:speechRate:v2'
export const DEFAULT_SPEECH_RATE = 0.55 // "Slow" — easy for children to follow
// Preset options for the settings UI.
export const SPEECH_RATE_OPTIONS = [
  { value: 0.55, label: 'Pelan' },
  { value: 0.7, label: 'Sedang' },
  { value: 0.9, label: 'Cepat' },
]

function getSpeechRate(): number {
  const r = storage.get<number>(RATE_KEY, DEFAULT_SPEECH_RATE)
  return Math.min(Math.max(r, 0.3), 1) // keep within a safe range
}

// -------- Sound effects (Web Audio API) ---------------------
let audioCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (!isBrowser) return null
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  // Browsers often "suspend" audio until there's a user interaction.
  if (audioCtx.state === 'suspended') void audioCtx.resume()
  return audioCtx
}

/** Play a single short tone. */
function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = 'sine',
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  osc.connect(gain)
  gain.connect(ctx.destination)

  const t0 = ctx.currentTime + start
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

// Tone recipe for each effect (sequence of [frequency, start, duration]).
const RECIPES: Record<SoundEffect, Array<[number, number, number]>> = {
  click: [[440, 0, 0.08]],
  pop: [[660, 0, 0.1]],
  correct: [
    [523, 0, 0.12],
    [659, 0.1, 0.12],
    [784, 0.2, 0.18],
  ],
  wrong: [
    [311, 0, 0.16],
    [233, 0.14, 0.22],
  ],
  win: [
    [523, 0, 0.14],
    [659, 0.14, 0.14],
    [784, 0.28, 0.14],
    [1046, 0.42, 0.3],
  ],
}

// -------- Pronunciation (SpeechSynthesis) -------------------
// Cache the voice list. In Chrome, getVoices() is often EMPTY on the first
// call, so the default "Google" (remote) voice gets picked and IGNORES
// `rate`. We preload it + listen for `voiceschanged`.
let cachedVoices: SpeechSynthesisVoice[] = []
function refreshVoices() {
  if (isBrowser && 'speechSynthesis' in window) cachedVoices = window.speechSynthesis.getVoices()
}
if (isBrowser && 'speechSynthesis' in window) {
  refreshVoices()
  window.speechSynthesis.addEventListener('voiceschanged', refreshVoices)
}

// Pick a voice matching the language. Prefer LOCAL voices (localService) —
// remote voices often ignore `rate`. For a language with no matching voice
// (e.g. id-ID not installed), do NOT force another language's voice — let
// `utter.lang` decide (better than Indonesian text read by an English voice).
function pickVoice(lang = 'en-US'): SpeechSynthesisVoice | undefined {
  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices()
  const base = lang.slice(0, 2).toLowerCase() // 'en' | 'id'
  const norm = (l: string) => l.replace('_', '-').toLowerCase()
  const matching = voices.filter((v) => norm(v.lang).startsWith(base))
  return (
    matching.find((v) => v.localService && norm(v.lang) === norm(lang)) ||
    matching.find((v) => v.localService) ||
    matching.find((v) => norm(v.lang) === norm(lang)) ||
    matching[0] ||
    (base === 'en' ? voices[0] : undefined)
  )
}

// Keep a reference to the audio file currently playing so it can be stopped.
let currentClip: HTMLAudioElement | null = null
// Delay timer between cancel→speak (workaround for a Chrome bug).
let speakTimer = 0

export const audioService = {
  /** Speak English text (default) or another language (synthesized voice). */
  speak(text: string, lang = 'en-US'): void {
    if (!isBrowser || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    synth.cancel() // stop any previous speech
    if (speakTimer) window.clearTimeout(speakTimer)

    let done = false
    const run = () => {
      if (done) return
      done = true
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = getSpeechRate() // from settings (default slow)
      utter.pitch = 1.1
      const voice = pickVoice(lang)
      if (voice) utter.voice = voice // local voice so rate is respected
      // Small delay: workaround for a Chrome bug (sync cancel+speak ignores rate).
      speakTimer = window.setTimeout(() => synth.speak(utter), 60)
    }

    // Make sure the voice list is loaded first (Chrome loads it async),
    // so a LOCAL voice is picked — not a remote voice that ignores rate.
    refreshVoices()
    if (cachedVoices.length) {
      run()
    } else {
      synth.addEventListener('voiceschanged', run, { once: true })
      window.setTimeout(run, 250) // fallback if voiceschanged never fires
    }
  },

  /**
   * Play an audio file from a URL/path. If it fails (file missing/format
   * unsupported), automatically falls back to synthesizing `fallbackText`.
   */
  playClip(url: string, fallbackText?: string, lang = 'en-US'): void {
    if (!isBrowser) return
    this.stopSpeaking()
    try {
      currentClip?.pause()
      const audio = new Audio(url)
      currentClip = audio
      audio.play().catch(() => {
        if (fallbackText) this.speak(fallbackText, lang)
      })
    } catch {
      if (fallbackText) this.speak(fallbackText, lang)
    }
  },

  /**
   * Speak a word: use the audio file if `audioUrl` is present, otherwise
   * use the synthesized voice (default). Single entry point for pronunciation.
   */
  pronounce(text: string, audioUrl?: string, lang = 'en-US'): void {
    if (audioUrl) this.playClip(audioUrl, text, lang)
    else this.speak(text, lang)
  },

  /** Current speech rate (from settings). */
  getRate(): number {
    return getSpeechRate()
  },

  /** Save the speech rate. */
  setRate(rate: number): void {
    storage.set(RATE_KEY, rate)
  },

  stopSpeaking(): void {
    if (speakTimer) window.clearTimeout(speakTimer)
    if (isBrowser && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    currentClip?.pause()
    currentClip = null
  },

  /** Play a short sound effect. */
  play(effect: SoundEffect): void {
    const ctx = getCtx()
    if (!ctx) return
    for (const [freq, start, dur] of RECIPES[effect]) {
      tone(ctx, freq, start, dur, effect === 'wrong' ? 'sawtooth' : 'sine')
    }
  },
}
