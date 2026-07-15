import { storage } from '~/utils/storage'

// Terapkan preferensi tampilan sedini mungkin (hindari kedip) saat load.
export default defineNuxtPlugin(() => {
  if (typeof document === 'undefined') return
  if (storage.get('belajar-yuk:bigText', false)) {
    document.documentElement.classList.add('text-lg')
  }
})
