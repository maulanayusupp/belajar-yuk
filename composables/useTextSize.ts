import { storage } from '~/utils/storage'

const KEY = 'belajar-yuk:bigText'

// "Large Text" mode (accessibility): enlarges the base font → all
// (rem-based) sizes grow along with it. Stored in localStorage.
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
