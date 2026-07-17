import { range } from '~/utils/array'

// Celebration confetti composable. Creates elements in the DOM and
// animates them with the CSS class `.confetti-piece` (defined in SCSS).
// Per-particle random values (position, color, delay) are passed via
// CSS custom properties — the only clean way to handle dynamic values;
// the actual styling still lives in the SCSS file.
const COLORS = ['#6c5ce7', '#00cec9', '#ff7675', '#ffc312', '#00b894', '#ff9f43']

export function useConfetti() {
  function celebrate(amount = 60) {
    if (typeof document === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const container = document.createElement('div')
    container.className = 'confetti-container'

    range(amount).forEach((i) => {
      const piece = document.createElement('span')
      piece.className = 'confetti-piece'
      piece.style.setProperty('--x', `${Math.random() * 100}vw`)
      piece.style.setProperty('--color', COLORS[i % COLORS.length])
      piece.style.setProperty('--delay', `${Math.random() * 0.5}s`)
      piece.style.setProperty('--duration', `${2 + Math.random() * 1.5}s`)
      piece.style.setProperty('--size', `${8 + Math.random() * 8}px`)
      container.appendChild(piece)
    })

    document.body.appendChild(container)
    window.setTimeout(() => container.remove(), 4000)
  }

  return { celebrate }
}
