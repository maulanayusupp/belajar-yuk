// Membuat gambar sertifikat (canvas landscape) lalu membagikannya
// (Web Share bila didukung; jika tidak, unduh + buka WhatsApp).

export interface CertificateData {
  name: string
  subject: string // mis. "Bahasa Inggris"
  emoji: string
  dateText: string
  stars: number
}

const W = 1400
const H = 990

function drawCertificate(data: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Latar krem lembut + bingkai
  ctx.fillStyle = '#fffdf7'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = '#6c5ce7'
  ctx.lineWidth = 12
  ctx.strokeRect(40, 40, W - 80, H - 80)
  ctx.strokeStyle = '#feca57'
  ctx.lineWidth = 4
  ctx.strokeRect(64, 64, W - 128, H - 128)

  ctx.textAlign = 'center'

  ctx.fillStyle = '#6c5ce7'
  ctx.font = '800 40px system-ui, sans-serif'
  ctx.fillText('🎈 BELAJAR YUK!', W / 2, 150)

  ctx.fillStyle = '#1a1035'
  ctx.font = '800 72px system-ui, sans-serif'
  ctx.fillText('Sertifikat Penghargaan', W / 2, 260)

  ctx.fillStyle = '#6d6681'
  ctx.font = '600 34px system-ui, sans-serif'
  ctx.fillText('Diberikan dengan bangga kepada', W / 2, 340)

  ctx.font = '120px system-ui, sans-serif'
  ctx.fillText(data.emoji, W / 2, 470)

  ctx.fillStyle = '#4834d4'
  ctx.font = '800 84px system-ui, sans-serif'
  ctx.fillText(data.name, W / 2, 590)

  ctx.fillStyle = '#1a1035'
  ctx.font = '600 38px system-ui, sans-serif'
  ctx.fillText(`atas keberhasilan menuntaskan semua pelajaran ${data.subject}`, W / 2, 670)

  ctx.font = '54px system-ui, sans-serif'
  ctx.fillText('⭐'.repeat(Math.min(5, Math.max(1, Math.round(data.stars / 6)))), W / 2, 760)

  ctx.fillStyle = '#6d6681'
  ctx.font = '600 30px system-ui, sans-serif'
  ctx.fillText(data.dateText, W / 2, 860)
  ctx.fillText('belajar-yuk-kappa.vercel.app', W / 2, 905)

  return canvas
}

export function useCertificate() {
  const site = useRuntimeConfig().public

  async function share(data: CertificateData) {
    if (typeof document === 'undefined') return
    const canvas = drawCertificate(data)
    const text = `${data.name} berhasil menuntaskan semua pelajaran ${data.subject} di Belajar Yuk! 🎓 ${site.siteUrl}`

    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'))
    if (!blob) return
    const file = new File([blob], 'sertifikat.png', { type: 'image/png' })

    const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean }
    if (nav.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Sertifikat Belajar Yuk!', text })
        return
      } catch {
        /* dibatalkan → fallback */
      }
    }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sertifikat.png'
    a.click()
    URL.revokeObjectURL(url)
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return { share }
}
