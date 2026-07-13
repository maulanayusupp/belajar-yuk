import { describe, it, expect } from 'vitest'
import { contrastRatio } from '~/utils/color'

// Nilai HARUS sinkron dengan assets/scss/abstracts/_variables.scss.
const C = {
  white: '#ffffff',
  ink: '#1a1035',
  inkSoft: '#4a4066',
  bg: '#f4f3ff',
  muted: '#6d6681',
  primary: '#6c5ce7',
  primaryDark: '#4834d4',
  mathDark: '#3867d6',
}

const AA_NORMAL = 4.5
const AA_LARGE = 3

describe('audit kontras (WCAG AA)', () => {
  // Teks isi normal — wajib >= 4.5
  const normal: Array<[string, string, string]> = [
    ['ink / putih', C.ink, C.white],
    ['ink / bg', C.ink, C.bg],
    ['ink-soft / putih', C.inkSoft, C.white],
    ['muted / putih', C.muted, C.white],
    ['primary-dark / putih', C.primaryDark, C.white],
    ['math-dark / putih', C.mathDark, C.white],
  ]
  it.each(normal)('%s memenuhi AA teks normal', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_NORMAL)
  })

  // Teks besar / elemen UI — wajib >= 3
  const large: Array<[string, string, string]> = [['putih / primary (tombol)', C.white, C.primary]]
  it.each(large)('%s memenuhi AA teks besar', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_LARGE)
  })
})
