import { describe, it, expect } from 'vitest'
import { contrastRatio } from '~/utils/color'

// Values MUST stay in sync with assets/scss/abstracts/_variables.scss.
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

describe('contrast audit (WCAG AA)', () => {
  // Normal body text — must be >= 4.5
  const normal: Array<[string, string, string]> = [
    ['ink / white', C.ink, C.white],
    ['ink / bg', C.ink, C.bg],
    ['ink-soft / white', C.inkSoft, C.white],
    ['muted / white', C.muted, C.white],
    ['primary-dark / white', C.primaryDark, C.white],
    ['math-dark / white', C.mathDark, C.white],
  ]
  it.each(normal)('%s meets AA normal text', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_NORMAL)
  })

  // Large text / UI elements — must be >= 3
  const large: Array<[string, string, string]> = [['white / primary (button)', C.white, C.primary]]
  it.each(large)('%s meets AA large text', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_LARGE)
  })
})
