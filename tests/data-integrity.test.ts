import { describe, it, expect } from 'vitest'
import { lessonService } from '~/services/lessonService'

const LEVELS = ['beginner', 'intermediate', 'advanced']

describe('integritas data pelajaran', () => {
  const lessons = lessonService.getLessons()

  it('ada pelajaran & id unik', () => {
    expect(lessons.length).toBeGreaterThan(0)
    const ids = lessons.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('setiap pelajaran punya field wajib yang valid', () => {
    for (const l of lessons) {
      expect(l.title.trim(), l.id).not.toBe('')
      expect(l.titleEn.trim(), l.id).not.toBe('')
      expect(l.emoji.trim(), l.id).not.toBe('')
      expect(LEVELS, l.id).toContain(l.level)
      expect(l.durationMin, l.id).toBeGreaterThan(0)
    }
  })

  it('pelajaran Inggris: setiap item lengkap', () => {
    for (const l of lessons) {
      if (l.subject !== 'english') continue
      expect(l.items.length, l.id).toBeGreaterThan(0)
      for (const it of l.items) {
        expect(it.word.trim(), `${l.id}/${it.id}`).not.toBe('')
        expect(it.translation.trim(), `${l.id}/${it.id}`).not.toBe('')
        expect(it.emoji.trim(), `${l.id}/${it.id}`).not.toBe('')
      }
      // id item unik dalam satu pelajaran
      const ids = l.items.map((i) => i.id)
      expect(new Set(ids).size, l.id).toBe(ids.length)
    }
  })

  it('pelajaran Matematika: soal konsisten & metode dikenal', () => {
    const methods = new Set([
      'counting',
      'ten-frame',
      'number-line',
      'number-bond',
      'block-addition',
      'block-subtraction',
      'missing-number',
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
})
