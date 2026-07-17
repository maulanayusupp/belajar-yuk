import { describe, it, expect, beforeEach } from 'vitest'
import type { DrillMode } from '~/types'
import { drillService, makeQuestion, drillModes } from '~/services/drillService'

const MODES: DrillMode[] = ['add-10', 'add-20', 'sub-10', 'bond-10', 'mixed']

describe('drillService.makeQuestion', () => {
  it('produces valid questions for every mode', () => {
    for (const mode of MODES) {
      // sample many to cover the randomness
      for (let i = 0; i < 50; i++) {
        const q = makeQuestion(mode)
        expect(q.options.length, mode).toBe(4)
        // the correct answer must be one of the options
        expect(q.options, `${mode}: ${q.prompt}`).toContain(q.answer)
        // options unique & never negative
        expect(new Set(q.options).size, mode).toBe(q.options.length)
        expect(Math.min(...q.options), mode).toBeGreaterThanOrEqual(0)
        // answer never negative
        expect(q.answer, `${mode}: ${q.prompt}`).toBeGreaterThanOrEqual(0)
        expect(q.prompt.trim(), mode).not.toBe('')
      }
    }
  })

  it('bond-10 answers always sum to 10 with the shown number', () => {
    for (let i = 0; i < 50; i++) {
      const q = makeQuestion('bond-10')
      const shown = Number(q.prompt.split(' ')[0])
      expect(shown + q.answer).toBe(10)
    }
  })
})

describe('drillService personal best', () => {
  beforeEach(() => {
    for (const m of drillModes) localStorage.removeItem(`belajar-yuk:drillBest:${m.id}`)
  })

  it('records the first score as a best', () => {
    const res = drillService.saveScore('add-10', 12, 90, 1000)
    expect(res.isBest).toBe(true)
    expect(drillService.getBest('add-10')?.score).toBe(12)
  })

  it('keeps the highest score only', () => {
    drillService.saveScore('add-10', 12, 90, 1000)
    const lower = drillService.saveScore('add-10', 8, 100, 2000)
    expect(lower.isBest).toBe(false)
    expect(drillService.getBest('add-10')?.score).toBe(12)

    const higher = drillService.saveScore('add-10', 15, 80, 3000)
    expect(higher.isBest).toBe(true)
    expect(drillService.getBest('add-10')?.score).toBe(15)
  })

  it('returns null when no best exists', () => {
    expect(drillService.getBest('sub-10')).toBeNull()
  })
})
