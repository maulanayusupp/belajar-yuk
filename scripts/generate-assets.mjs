// Menghasilkan aset raster dari sumber SVG:
//   - public/favicon.ico           (fallback crawler/browser lama)
//   - public/apple-touch-icon.png  (180x180, ikon iOS)
//   - public/icon-192.png / icon-512.png (PWA / Android)
//   - public/og-image.png          (1200x630, preview share WA/Twitter/FB)
//
// Jalankan: node scripts/generate-assets.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import pngToIco from 'png-to-ico'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const pub = resolve(root, 'public')

/** Rasterisasi string SVG ke buffer PNG dengan lebar tertentu. */
function svgToPng(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  })
  return resvg.render().asPng()
}

const faviconSvg = readFileSync(resolve(pub, 'favicon.svg'), 'utf8')
const ogSvg = readFileSync(resolve(here, 'og-image.svg'), 'utf8')

// --- Ikon dari favicon.svg ---
const icons = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]
for (const [name, size] of icons) {
  writeFileSync(resolve(pub, name), svgToPng(faviconSvg, size))
  console.log(`✓ public/${name} (${size}px)`)
}

// --- favicon.ico (gabungan 16/32/48) ---
const icoBuf = await pngToIco([svgToPng(faviconSvg, 16), svgToPng(faviconSvg, 32), svgToPng(faviconSvg, 48)])
writeFileSync(resolve(pub, 'favicon.ico'), icoBuf)
console.log('✓ public/favicon.ico (16/32/48)')

// --- OG image ---
writeFileSync(resolve(pub, 'og-image.png'), svgToPng(ogSvg, 1200))
console.log('✓ public/og-image.png (1200x630)')

console.log('Selesai membuat aset.')
