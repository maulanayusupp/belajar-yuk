import { describe, it, expect } from 'vitest'
import { lessonService } from '~/services/lessonService'

describe('lessonService', () => {
  it('mengembalikan mata pelajaran', () => {
    const subjects = lessonService.getSubjects()
    expect(subjects.map((s) => s.id).sort()).toEqual(['english', 'math', 'science'])
  })

  it('filter pelajaran per mata pelajaran', () => {
    const en = lessonService.getLessons('english')
    expect(en.length).toBeGreaterThan(0)
    expect(en.every((l) => l.subject === 'english')).toBe(true)
  })

  it('getLesson mengembalikan null untuk id tidak dikenal', () => {
    expect(lessonService.getLesson('tidak-ada')).toBeNull()
  })

  it('penyempitan tipe english/math bekerja', () => {
    const en = lessonService.getEnglishLesson('en-animals')
    expect(en?.subject).toBe('english')
    // id math dilewatkan ke getEnglishLesson -> null
    expect(lessonService.getEnglishLesson('mt-counting')).toBeNull()
    expect(lessonService.getMathLesson('mt-counting')?.subject).toBe('math')
  })

  it('setiap id pelajaran unik (invariant penting)', () => {
    const ids = lessonService.getLessons().map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('setiap soal matematika: jawaban konsisten dengan operator', () => {
    for (const lesson of lessonService.getLessons('math')) {
      if (lesson.subject !== 'math') continue
      for (const p of lesson.problems) {
        if (p.operator === '+') expect(p.operandA + p.operandB).toBe(p.answer)
        if (p.operator === '-') expect(p.operandA - p.operandB).toBe(p.answer)
      }
    }
  })
})
