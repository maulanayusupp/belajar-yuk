// Cadangan data (tanpa server): ekspor semua data localStorage aplikasi
// ke file JSON, lalu impor di perangkat lain. "Sinkron" manual & privat.
const PREFIX = 'belajar-yuk:'
const isBrowser = typeof window !== 'undefined'

export const backupService = {
  /** Kumpulkan semua data aplikasi menjadi string JSON. */
  export(): string {
    const data: Record<string, string> = {}
    if (isBrowser) {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith(PREFIX)) {
          const v = localStorage.getItem(key)
          if (v !== null) data[key] = v
        }
      }
    }
    return JSON.stringify({ app: 'belajar-yuk', version: 1, data }, null, 2)
  },

  /** Unduh cadangan sebagai file .json. */
  download(): void {
    if (!isBrowser) return
    const blob = new Blob([this.export()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'belajar-yuk-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  },

  /** Pulihkan data dari teks JSON hasil ekspor. */
  import(text: string): { ok: boolean; count: number; error?: string } {
    if (!isBrowser) return { ok: false, count: 0, error: 'Tidak di browser' }
    try {
      const parsed = JSON.parse(text)
      if (parsed?.app !== 'belajar-yuk' || typeof parsed.data !== 'object' || !parsed.data) {
        return { ok: false, count: 0, error: 'File cadangan tidak dikenali.' }
      }
      let count = 0
      for (const [key, value] of Object.entries(parsed.data as Record<string, unknown>)) {
        if (key.startsWith(PREFIX) && typeof value === 'string') {
          localStorage.setItem(key, value)
          count++
        }
      }
      return { ok: true, count }
    } catch {
      return { ok: false, count: 0, error: 'File rusak atau bukan JSON.' }
    }
  },
}
