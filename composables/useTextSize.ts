import { storage } from '~/utils/storage'

const KEY = 'belajar-yuk:bigText'

// Mode "Teks Besar" (aksesibilitas): memperbesar font dasar → seluruh
// ukuran (berbasis rem) ikut membesar. Disimpan di localStorage.
export function useTextSize() {
  const big = useState<boolean>('big-text', () => false)

  function apply(v: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('text-lg', v)
    }
  }

  onMounted(() => {
    big.value = storage.get(KEY, false)
    apply(big.value)
  })

  function toggle() {
    big.value = !big.value
    storage.set(KEY, big.value)
    apply(big.value)
  }

  return { big, toggle }
}
