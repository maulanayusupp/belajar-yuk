import { describe, it, expect } from 'vitest'
import { lessonService } from '~/services/lessonService'

describe('lessonService', () => {
  it('returns the subjects', () => {
    const subjects = lessonService.getSubjects()
    expect(subjects.map((s) => s.id).sort()).toEqual([
      'bahasa',
      'english',
      'english-life',
      'math',
      'science',
    ])
  })

  it('filters lessons by subject', () => {
    const en = lessonService.getLessons('english')
    expect(en.length).toBeGreaterThan(0)
    expect(en.every((l) => l.subject === 'english')).toBe(true)
  })

  it('getLesson returns null for an unknown id', () => {
    expect(lessonService.getLesson('tidak-ada')).toBeNull()
  })

  it('english/math type narrowing works', () => {
    const en = lessonService.getEnglishLesson('en-animals')
    expect(en?.subject).toBe('english')
    // a math id passed to getEnglishLesson -> null
    expect(lessonService.getEnglishLesson('mt-counting')).toBeNull()
    expect(lessonService.getMathLesson('mt-counting')?.subject).toBe('math')
  })

  it('every lesson id is unique (important invariant)', () => {
    const ids = lessonService.getLessons().map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every math problem: answer is consistent with the operator', () => {
    for (const lesson of lessonService.getLessons('math')) {
      if (lesson.subject !== 'math') continue
      for (const p of lesson.problems) {
        if (p.operator === '+') expect(p.operandA + p.operandB).toBe(p.answer)
        if (p.operator === '-') expect(p.operandA - p.operandB).toBe(p.answer)
      }
    }
  })
})
