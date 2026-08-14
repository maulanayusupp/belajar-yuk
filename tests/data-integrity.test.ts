import { describe, it, expect } from 'vitest'
import { lessonService } from '~/services/lessonService'

const LEVELS = ['beginner', 'intermediate', 'advanced', 'expert']

describe('lesson data integrity', () => {
  const lessons = lessonService.getLessons()

  it('there are lessons & ids are unique', () => {
    expect(lessons.length).toBeGreaterThan(0)
    const ids = lessons.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every lesson has valid required fields', () => {
    for (const l of lessons) {
      expect(l.title.trim(), l.id).not.toBe('')
      expect(l.titleEn.trim(), l.id).not.toBe('')
      expect(l.emoji.trim(), l.id).not.toBe('')
      expect(LEVELS, l.id).toContain(l.level)
      expect(l.durationMin, l.id).toBeGreaterThan(0)
    }
  })

  it('English lessons: every item is complete', () => {
    for (const l of lessons) {
      if (l.subject !== 'english') continue
      expect(l.items.length, l.id).toBeGreaterThan(0)
      for (const it of l.items) {
        expect(it.word.trim(), `${l.id}/${it.id}`).not.toBe('')
        expect(it.translation.trim(), `${l.id}/${it.id}`).not.toBe('')
        expect(it.emoji.trim(), `${l.id}/${it.id}`).not.toBe('')
      }
      // item ids are unique within a single lesson
      const ids = l.items.map((i) => i.id)
      expect(new Set(ids).size, l.id).toBe(ids.length)
    }
  })

  it('Math lessons: problems consistent & method recognized', () => {
    const methods = new Set([
      'counting',
      'ten-frame',
      'number-line',
      'number-bond',
      'block-addition',
      'block-subtraction',
      'missing-number',
      'compare',
      'pattern',
      'clock',
    ])
    for (const l of lessons) {
      if (l.subject !== 'math') continue
      expect(l.problems.length, l.id).toBeGreaterThan(0)
      expect(methods.has(l.method), `${l.id}: ${l.method}`).toBe(true)
      for (const p of l.problems) {
        if (p.operator === '+') expect(p.operandA + p.operandB, p.id).toBe(p.answer)
        if (p.operator === '-') expect(p.operandA - p.operandB, p.id).toBe(p.answer)
      }
    }
  })

  it('Science lessons: every fact complete & ids unique', () => {
    for (const l of lessons) {
      if (l.subject !== 'science') continue
      // needs at least 4 facts so the quiz has enough options (1 correct + 3 distractors)
      expect(l.facts.length, l.id).toBeGreaterThanOrEqual(4)
      for (const f of l.facts) {
        expect(f.term.trim(), `${l.id}/${f.id}`).not.toBe('')
        expect(f.name.trim(), `${l.id}/${f.id}`).not.toBe('')
        expect(f.emoji.trim(), `${l.id}/${f.id}`).not.toBe('')
        expect(f.fact.trim(), `${l.id}/${f.id}`).not.toBe('')
        expect(f.clue.trim(), `${l.id}/${f.id}`).not.toBe('')
      }
      const ids = l.facts.map((f) => f.id)
      expect(new Set(ids).size, l.id).toBe(ids.length)
    }
  })

  it('Reading lessons: items complete, ids unique, & syllables consistent', () => {
    for (const l of lessons) {
      if (l.subject !== 'bahasa') continue
      // needs at least 4 items so the quiz has enough options
      expect(l.items.length, l.id).toBeGreaterThanOrEqual(4)
      for (const it of l.items) {
        expect(it.text.trim(), `${l.id}/${it.id}`).not.toBe('')
        // the 'kata' activity must have syllable segments that make up the text
        if (l.type === 'kata') {
          expect(it.syllables?.length, `${l.id}/${it.id}`).toBeGreaterThanOrEqual(2)
          expect(it.syllables?.join(''), `${l.id}/${it.id}`).toBe(it.text)
        }
      }
      const ids = l.items.map((i) => i.id)
      expect(new Set(ids).size, l.id).toBe(ids.length)
    }
  })
})
