import { storage } from '~/utils/storage'

// Apply display preferences as early as possible (avoid flicker) on load.
export default defineNuxtPlugin(() => {
  if (typeof document === 'undefined') return
  if (storage.get('belajar-yuk:bigText', false)) {
    document.documentElement.classList.add('text-lg')
  }
})
