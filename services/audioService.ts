import type { SoundEffect } from '~/types'
import { storage } from '~/utils/storage'

// =============================================================
//  Layanan suara — tanpa file audio eksternal:
//   1) Pengucapan kata memakai Web Speech API (SpeechSynthesis).
//   2) Efek suara (klik, benar, salah, menang) dihasilkan langsung
//      lewat Web Audio API (oscillator) sehingga ringan & gratis.
//  Semua aman dipanggil di SSR (otomatis no-op bila bukan browser).
// =============================================================

const isBrowser = typeof window !== 'undefined'

// Kecepatan bicara — bisa diatur orang tua (disimpan di localStorage).
// Default sengaja pelan agar anak mudah menyimak.
// v2: buang nilai lama yang mungkin "nyangkut" (mis. pernah di-set Cepat).
const RATE_KEY = 'belajar-yuk:speechRate:v2'
export const DEFAULT_SPEECH_RATE = 0.55 // "Pelan" — mudah disimak anak
// Pilihan preset untuk UI pengaturan.
export const SPEECH_RATE_OPTIONS = [
  { value: 0.55, label: 'Pelan' },
  { value: 0.7, label: 'Sedang' },
  { value: 0.9, label: 'Cepat' },
]

function getSpeechRate(): number {
  const r = storage.get<number>(RATE_KEY, DEFAULT_SPEECH_RATE)
  return Math.min(Math.max(r, 0.3), 1) // jaga di rentang aman
}

// -------- Efek suara (Web Audio API) ------------------------
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
  // Browser sering men-"suspend" audio sampai ada interaksi user.
  if (audioCtx.state === 'suspended') void audioCtx.resume()
  return audioCtx
}

/** Mainkan satu nada singkat. */
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

// Resep nada untuk tiap efek (deret [frekuensi, mulai, durasi]).
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

// -------- Pengucapan (SpeechSynthesis) ----------------------
// Cache daftar voice. Di Chrome, getVoices() sering KOSONG saat pertama
// dipanggil sehingga voice default "Google" (remote) terpilih & MENGABAIKAN
// `rate`. Kita muat lebih dulu + dengarkan `voiceschanged`.
let cachedVoices: SpeechSynthesisVoice[] = []
function refreshVoices() {
  if (isBrowser && 'speechSynthesis' in window) cachedVoices = window.speechSynthesis.getVoices()
}
if (isBrowser && 'speechSynthesis' in window) {
  refreshVoices()
  window.speechSynthesis.addEventListener('voiceschanged', refreshVoices)
}

// Pilih voice sesuai bahasa. Utamakan voice LOKAL (localService) — voice
// remote sering abaikan `rate`. Untuk bahasa tanpa voice cocok (mis. id-ID
// belum terpasang), JANGAN paksa voice bahasa lain — biarkan `utter.lang`
// yang menentukan (lebih baik daripada teks Indonesia dibaca voice Inggris).
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

// Simpan referensi audio file yang sedang diputar agar bisa dihentikan.
let currentClip: HTMLAudioElement | null = null
// Timer jeda cancel→speak (workaround bug Chrome).
let speakTimer = 0

export const audioService = {
  /** Ucapkan teks Bahasa Inggris (default) atau bahasa lain (suara sintesis). */
  speak(text: string, lang = 'en-US'): void {
    if (!isBrowser || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    synth.cancel() // hentikan ucapan sebelumnya
    if (speakTimer) window.clearTimeout(speakTimer)

    let done = false
    const run = () => {
      if (done) return
      done = true
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = getSpeechRate() // dari pengaturan (default pelan)
      utter.pitch = 1.1
      const voice = pickVoice(lang)
      if (voice) utter.voice = voice // voice lokal agar rate dihormati
      // Jeda kecil: workaround bug Chrome (cancel+speak sinkron abaikan rate).
      speakTimer = window.setTimeout(() => synth.speak(utter), 60)
    }

    // Pastikan daftar voice sudah dimuat dulu (Chrome memuatnya async),
    // supaya voice LOKAL terpilih — bukan voice remote yang abaikan rate.
    refreshVoices()
    if (cachedVoices.length) {
      run()
    } else {
      synth.addEventListener('voiceschanged', run, { once: true })
      window.setTimeout(run, 250) // fallback bila voiceschanged tak fire
    }
  },

  /**
   * Mainkan file audio dari URL/path. Bila gagal (file tak ada/format
   * tak didukung), otomatis fallback ke suara sintesis `fallbackText`.
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
   * Ucapkan sebuah kata: pakai file audio bila `audioUrl` ada, jika tidak
   * pakai suara sintesis (default). Titik masuk tunggal untuk pengucapan.
   */
  pronounce(text: string, audioUrl?: string, lang = 'en-US'): void {
    if (audioUrl) this.playClip(audioUrl, text, lang)
    else this.speak(text, lang)
  },

  /** Kecepatan bicara saat ini (dari pengaturan). */
  getRate(): number {
    return getSpeechRate()
  },

  /** Simpan kecepatan bicara. */
  setRate(rate: number): void {
    storage.set(RATE_KEY, rate)
  },

  stopSpeaking(): void {
    if (speakTimer) window.clearTimeout(speakTimer)
    if (isBrowser && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    currentClip?.pause()
    currentClip = null
  },

  /** Mainkan efek suara pendek. */
  play(effect: SoundEffect): void {
    const ctx = getCtx()
    if (!ctx) return
    for (const [freq, start, dur] of RECIPES[effect]) {
      tone(ctx, freq, start, dur, effect === 'wrong' ? 'sawtooth' : 'sine')
    }
  },
}
