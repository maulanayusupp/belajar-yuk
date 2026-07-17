// A safe localStorage wrapper: doesn't throw during SSR
// (no window) or when storage is full/blocked.

const isBrowser = typeof window !== 'undefined' && !!window.localStorage

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (!isBrowser) return fallback
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  },

  set<T>(key: string, value: T): void {
    if (!isBrowser) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or blocked — safely ignore */
    }
  },

  remove(key: string): void {
    if (!isBrowser) return
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  },
}
