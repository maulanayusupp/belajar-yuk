// Pembungkus localStorage yang aman: tidak error saat SSR
// (tidak ada window) atau saat storage penuh/diblokir.

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
      /* storage penuh atau diblokir — abaikan dengan aman */
    }
  },

  remove(key: string): void {
    if (!isBrowser) return
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* abaikan */
    }
  },
}
