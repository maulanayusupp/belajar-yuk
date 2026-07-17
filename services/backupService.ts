// Data backup (no server): export all of the app's localStorage data
// to a JSON file, then import it on another device. A manual, private "sync".
const PREFIX = 'belajar-yuk:'
const isBrowser = typeof window !== 'undefined'

export const backupService = {
  /** Collect all app data into a JSON string. */
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

  /** Download the backup as a .json file. */
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

  /** Restore data from exported JSON text. */
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
