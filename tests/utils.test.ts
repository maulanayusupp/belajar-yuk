import { describe, it, expect } from 'vitest'
import { range, clamp, shuffle, sample } from '~/utils/array'
import { generateNumberOptions } from '~/utils/math'

describe('utils/array', () => {
  it('range menghasilkan deret 0..n-1', () => {
    expect(range(3)).toEqual([0, 1, 2])
    expect(range(0)).toEqual([])
    expect(range(-5)).toEqual([])
  })

  it('clamp membatasi nilai pada rentang', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-3, 0, 10)).toBe(0)
    expect(clamp(99, 0, 10)).toBe(10)
  })

  it('shuffle mempertahankan panjang & seluruh elemen', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input)
    expect(out).toHaveLength(input.length)
    expect([...out].sort()).toEqual([...input].sort())
    expect(input).toEqual([1, 2, 3, 4, 5]) // input asli tidak berubah
  })

  it('sample mengembalikan elemen yang ada di array', () => {
    const arr = ['a', 'b', 'c']
    expect(arr).toContain(sample(arr))
  })
})

describe('utils/math', () => {
  it('generateNumberOptions memuat jawaban benar & jumlah tepat', () => {
    const opts = generateNumberOptions(5, 4)
    expect(opts).toHaveLength(4)
    expect(opts).toContain(5)
  })

  it('opsi unik dan tidak pernah negatif', () => {
    const opts = generateNumberOptions(1, 4)
    expect(new Set(opts).size).toBe(opts.length)
    expect(opts.every((n) => n >= 0)).toBe(true)
  })
})
