import { describe, it, expect } from 'vitest'
import { englishLifeLessons } from '~/data/english-life'

// Audit the "English for Life" module: every exercise must be well-formed and
// actually solvable for its activity type (catches authoring mistakes).

describe('English for Life — exercise integrity', () => {
  it('has lessons across all four proficiency tiers', () => {
    const tiers = new Set(englishLifeLessons.map((l) => l.level))
    for (const t of ['beginner', 'intermediate', 'advanced', 'expert']) {
      expect(tiers.has(t as never), `missing tier: ${t}`).toBe(true)
    }
  })

  it('every lesson: unique item ids, non-empty core fields', () => {
    for (const l of englishLifeLessons) {
      expect(l.items.length, `${l.id} empty`).toBeGreaterThan(0)
      const ids = l.items.map((i) => i.id)
      expect(new Set(ids).size, `${l.id}: duplicate item id`).toBe(ids.length)
      for (const it of l.items) {
        expect(it.word.trim(), `${l.id}/${it.id} word`).not.toBe('')
        expect(it.translation.trim(), `${l.id}/${it.id} translation`).not.toBe('')
        expect(it.emoji.trim(), `${l.id}/${it.id} emoji`).not.toBe('')
      }
    }
  })

  it('listening lessons: ≥4 items with DISTINCT emojis (so pictures are pickable)', () => {
    for (const l of englishLifeLessons.filter((l) => l.type === 'listening')) {
      expect(l.items.length, `${l.id}`).toBeGreaterThanOrEqual(4)
      const emojis = l.items.map((i) => i.emoji)
      expect(new Set(emojis).size, `${l.id}: duplicate emoji → ambiguous picture`).toBe(
        emojis.length,
      )
    }
  })

  it('spelling lessons: words are a single token (no spaces) and ≥3 letters', () => {
    for (const l of englishLifeLessons.filter((l) => l.type === 'spelling')) {
      for (const it of l.items) {
        expect(it.word.includes(' '), `${l.id}/${it.id}: word has a space → unspellable`).toBe(
          false,
        )
        expect(it.word.length, `${l.id}/${it.id}: too short`).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('sentence lessons: word is a real multi-word sentence to arrange', () => {
    for (const l of englishLifeLessons.filter((l) => l.type === 'sentence')) {
      for (const it of l.items) {
        expect(
          it.word.trim().split(/\s+/).length,
          `${l.id}/${it.id}: not a sentence`,
        ).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('every item has a non-empty `why` (the theory behind the answer)', () => {
    for (const l of englishLifeLessons) {
      for (const it of l.items) {
        expect(it.why?.trim(), `${l.id}/${it.id}: missing "why" explanation`).toBeTruthy()
        // A real explanation, not a placeholder.
        expect((it.why ?? '').trim().length, `${l.id}/${it.id}: "why" too short`).toBeGreaterThan(
          10,
        )
      }
    }
  })

  it('quiz lessons (fill-blank/dialogue/comprehension): prompt + valid options + answer', () => {
    const quizTypes = ['fill-blank', 'dialogue', 'comprehension']
    for (const l of englishLifeLessons.filter((l) => quizTypes.includes(l.type))) {
      for (const it of l.items) {
        expect(it.prompt?.trim(), `${l.id}/${it.id}: no prompt`).toBeTruthy()
        expect(it.options?.length ?? 0, `${l.id}/${it.id}: <3 options`).toBeGreaterThanOrEqual(3)
        // answer must be one of the options
        expect(it.options, `${l.id}/${it.id}: answer not in options`).toContain(it.answer)
        // options must be unique (no two identical choices)
        expect(new Set(it.options).size, `${l.id}/${it.id}: duplicate option`).toBe(
          it.options!.length,
        )
        // a fill-blank must actually show a gap
        if (l.type === 'fill-blank') {
          expect(it.prompt!.includes('___'), `${l.id}/${it.id}: fill-blank has no gap`).toBe(true)
        }
      }
    }
  })
})
