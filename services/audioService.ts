import type { SoundEffect } from '~/types'

// =============================================================
//  Layanan suara — tanpa file audio eksternal:
//   1) Pengucapan kata memakai Web Speech API (SpeechSynthesis).
//   2) Efek suara (klik, benar, salah, menang) dihasilkan langsung
//      lewat Web Audio API (oscillator) sehingga ringan & gratis.
//  Semua aman dipanggil di SSR (otomatis no-op bila bukan browser).
// =============================================================

const isBrowser = typeof window !== 'undefined'

// -------- Efek suara (Web Audio API) ------------------------
let audioCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (!isBrowser) return null
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  // Browser sering men-"suspend" audio sampai ada interaksi user.
  if (audioCtx.state === 'suspended') void audioCtx.resume()
  return audioCtx
}

/** Mainkan satu nada singkat. */
function tone(ctx: AudioContext, freq: number, start: number, duration: number, type: OscillatorType = 'sine') {
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
function pickEnglishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((v) => /en[-_]US/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    voices[0]
  )
}

export const audioService = {
  /** Ucapkan teks Bahasa Inggris (default) atau bahasa lain. */
  speak(text: string, lang = 'en-US'): void {
    if (!isBrowser || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel() // hentikan ucapan sebelumnya
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = 0.85 // sedikit lebih pelan untuk anak
    utter.pitch = 1.1
    const voice = pickEnglishVoice()
    if (voice) utter.voice = voice
    window.speechSynthesis.speak(utter)
  },

  stopSpeaking(): void {
    if (isBrowser && 'speechSynthesis' in window) window.speechSynthesis.cancel()
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
