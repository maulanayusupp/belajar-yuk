import { describe, it, expect, beforeEach } from 'vitest'
import { progressService } from '~/services/progressService'

// happy-dom menyediakan localStorage. Bersihkan tiap tes.
beforeEach(() => {
  localStorage.clear()
  progressService.reset()
})

describe('progressService', () => {
  it('menyimpan hasil & menandai selesai', () => {
    const entry = progressService.save('en-animals', 2)
    expect(entry.completed).toBe(true)
    expect(entry.stars).toBe(2)
    expect(progressService.isCompleted('en-animals')).toBe(true)
  })

  it('bintang bersifat monoton (tidak turun)', () => {
    progressService.save('en-fruits', 3)
    const after = progressService.save('en-fruits', 1)
    expect(after.stars).toBe(3) // tetap 3, tidak turun ke 1
  })

  it('membatasi bintang pada rentang 0..3', () => {
    expect(progressService.save('x', 99).stars).toBe(3)
    expect(progressService.save('y', -5).stars).toBe(0)
  })

  it('reset menghapus semua progres', () => {
    progressService.save('en-animals', 3)
    progressService.reset()
    expect(progressService.getAll()).toEqual({})
    expect(progressService.isCompleted('en-animals')).toBe(false)
  })
})
