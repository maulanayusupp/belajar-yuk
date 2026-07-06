// Membuat gambar "Kartu Pencapaian" (canvas) lalu membagikannya.
// Pakai Web Share API (bisa langsung ke WhatsApp di HP); bila tak
// didukung, gambar diunduh + membuka WhatsApp Web dengan teks.

export interface ShareData {
  name: string
  avatar: string
  stars: number
  lessons: number
  streak: number
  badges: string[] // ikon lencana yang diraih
}

const SIZE = 1080

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
}

function drawCard(data: ShareData): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  // Latar gradient
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE)
  bg.addColorStop(0, '#7F5BFF')
  bg.addColorStop(0.55, '#6C5CE7')
  bg.addColorStop(1, '#00CEC9')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Lingkaran dekoratif
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.beginPath()
  ctx.arc(920, 140, 200, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(120, 960, 220, 0, Math.PI * 2)
  ctx.fill()

  ctx.textAlign = 'center'

  // Merek
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = '800 40px system-ui, sans-serif'
  ctx.fillText('🎈 BELAJAR YUK!', SIZE / 2, 110)

  // Avatar
  ctx.font = '200px system-ui, sans-serif'
  ctx.fillText(data.avatar || '🦉', SIZE / 2, 340)

  // Nama
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '800 76px system-ui, sans-serif'
  ctx.fillText(`Hebat, ${data.name}!`, SIZE / 2, 450)

  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = '600 38px system-ui, sans-serif'
  ctx.fillText('Pencapaian belajarku', SIZE / 2, 510)

  // Tiga statistik dalam pill
  const stats = [
    { icon: '⭐', value: String(data.stars), label: 'Bintang' },
    { icon: '✅', value: String(data.lessons), label: 'Pelajaran' },
    { icon: '🔥', value: String(data.streak), label: 'Hari' },
  ]
  const pillW = 300
  const pillH = 200
  const gap = 30
  const totalW = pillW * 3 + gap * 2
  let x = (SIZE - totalW) / 2
  const y = 560
  for (const s of stats) {
    ctx.fillStyle = 'rgba(255,255,255,0.16)'
    roundRect(ctx, x, y, pillW, pillH, 32)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '70px system-ui, sans-serif'
    ctx.fillText(s.icon, x + pillW / 2, y + 90)
    ctx.font = '800 64px system-ui, sans-serif'
    ctx.fillText(s.value, x + pillW / 2, y + 155)
    ctx.font = '600 30px system-ui, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.fillText(s.label, x + pillW / 2, y + 190)
    x += pillW + gap
  }

  // Lencana
  if (data.badges.length) {
    ctx.font = '76px system-ui, sans-serif'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(data.badges.slice(0, 7).join('  '), SIZE / 2, 900)
  }

  // Footer
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = '600 34px system-ui, sans-serif'
  ctx.fillText('belajar-yuk-kappa.vercel.app', SIZE / 2, 1010)

  return canvas
}

export function useShareCard() {
  const site = useRuntimeConfig().public

  async function share(data: ShareData) {
    if (typeof document === 'undefined') return
    const canvas = drawCard(data)
    const text = `${data.name} sudah menyelesaikan ${data.lessons} pelajaran & meraih ${data.stars} bintang di Belajar Yuk! 🎉 Ayo belajar juga: ${site.siteUrl}`

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return
    const file = new File([blob], 'pencapaian.png', { type: 'image/png' })

    // Web Share API dengan file (ideal di HP → langsung ke WhatsApp)
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean }
    if (nav.canShare?.({ files: [file] } as unknown as ShareData)) {
      try {
        await navigator.share({ files: [file], title: 'Belajar Yuk!', text })
        return
      } catch {
        /* dibatalkan pengguna — lanjut ke fallback */
      }
    }

    // Fallback: unduh gambar + buka WhatsApp dengan teks
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pencapaian.png'
    a.click()
    URL.revokeObjectURL(url)
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return { share }
}
