import { storage } from '~/utils/storage'

// Musik latar lembut yang dihasilkan langsung (Web Audio, tanpa file audio).
// Arpeggio pentatonik pelan & bervolume sangat rendah — menenangkan, opsional,
// dan MATI secara default agar tidak mengganggu.
const KEY = 'belajar-yuk:music'
const isBrowser = typeof window !== 'undefined'

let ctx: AudioContext | null = null
let master: GainNode | null = null
let timer = 0
let step = 0

// C mayor pentatonik (nada lembut).
const NOTES = [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33]

function ensureCtx(): AudioContext | null {
  if (!isBrowser) return null
  if (!ctx) {
    const Ctx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return null
    ctx = new Ctx()
    master = ctx.createGain()
    master.gain.value = 0.05 // sangat pelan
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function playNote(): void {
  if (!ctx || !master) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = NOTES[step % NOTES.length]
  step++
  const t = ctx.currentTime
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(1, t + 0.4)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
  osc.connect(gain)
  gain.connect(master)
  osc.start(t)
  osc.stop(t + 1.7)
}

export const musicService = {
  isEnabled(): boolean {
    return storage.get<boolean>(KEY, false)
  },

  start(): void {
    if (!ensureCtx() || timer) return
    playNote()
    timer = window.setInterval(playNote, 1400)
  },

  stop(): void {
    if (timer) {
      window.clearInterval(timer)
      timer = 0
    }
  },

  setEnabled(on: boolean): void {
    storage.set(KEY, on)
    if (on) this.start()
    else this.stop()
  },
}
