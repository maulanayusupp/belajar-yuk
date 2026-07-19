import { describe, it, expect } from 'vitest'
import { lessonService } from '~/services/lessonService'
import { codingService } from '~/services/codingService'

// Guards against duplicate materials — no two lessons/levels may be "the same"
// (identical ids OR identical content). Keeps every material genuinely unique.

function duplicates(arr: string[]): string[] {
  return [...new Set(arr.filter((v, i) => arr.indexOf(v) !== i))]
}

describe('material uniqueness', () => {
  const lessons = lessonService.getLessons()

  it('lesson ids are globally unique', () => {
    expect(duplicates(lessons.map((l) => l.id))).toEqual([])
  })

  it('no two lessons share identical content', () => {
    const signature = (l: (typeof lessons)[number]): string => {
      if (l.subject === 'math') {
        return (
          'math|' +
          l.problems
            .map((p) => `${p.operandA}${p.operator}${p.operandB}`)
            .sort()
            .join(',')
        )
      }
      if (l.subject === 'science') {
        return (
          'sci|' +
          l.facts
            .map((f) => f.term)
            .sort()
            .join(',')
        )
      }
      // english & bahasa both expose `items` (word / text)
      const words = l.items.map((i) => ('word' in i ? i.word : i.text))
      return `${l.subject}|` + words.sort().join(',')
    }

    const seen = new Map<string, string>()
    for (const l of lessons) {
      const sig = signature(l)
      const prev = seen.get(sig)
      expect(prev, `"${l.id}" has the SAME content as "${prev}"`).toBeUndefined()
      seen.set(sig, l.id)
    }
  })

  it('coding levels are unique (ids + no duplicate grids / step-sequences)', () => {
    const levels = codingService.getLevels()
    expect(duplicates(levels.map((l) => l.id))).toEqual([])

    const gridSeen = new Map<string, string>()
    const orderSeen = new Map<string, string>()
    for (const l of levels) {
      if (l.kind === 'order') {
        const sig = l.steps.map((s) => s.id).join(',')
        expect(
          orderSeen.get(sig),
          `order "${l.id}" duplicates "${orderSeen.get(sig)}"`,
        ).toBeUndefined()
        orderSeen.set(sig, l.id)
      } else {
        const sig = JSON.stringify({ grid: l.grid, start: l.start })
        expect(
          gridSeen.get(sig),
          `grid "${l.id}" duplicates "${gridSeen.get(sig)}"`,
        ).toBeUndefined()
        gridSeen.set(sig, l.id)
      }
    }
  })
})
