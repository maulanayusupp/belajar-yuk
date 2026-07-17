// Generates raster assets from SVG sources:
//   - public/favicon.ico           (fallback for crawlers/old browsers)
//   - public/apple-touch-icon.png  (180x180, iOS icon)
//   - public/icon-192.png / icon-512.png (PWA / Android)
//   - public/og-image.png          (1200x630, share preview for WA/Twitter/FB)
//
// Run: node scripts/generate-assets.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import pngToIco from 'png-to-ico'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const pub = resolve(root, 'public')

/** Rasterize an SVG string to a PNG buffer at a given width. */
function svgToPng(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  })
  return resvg.render().asPng()
}

const faviconSvg = readFileSync(resolve(pub, 'favicon.svg'), 'utf8')
const ogSvg = readFileSync(resolve(here, 'og-image.svg'), 'utf8')

// --- Icons from favicon.svg ---
const icons = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]
for (const [name, size] of icons) {
  writeFileSync(resolve(pub, name), svgToPng(faviconSvg, size))
  console.log(`✓ public/${name} (${size}px)`)
}

// --- favicon.ico (combined 16/32/48) ---
const icoBuf = await pngToIco([
  svgToPng(faviconSvg, 16),
  svgToPng(faviconSvg, 32),
  svgToPng(faviconSvg, 48),
])
writeFileSync(resolve(pub, 'favicon.ico'), icoBuf)
console.log('✓ public/favicon.ico (16/32/48)')

// --- OG image ---
writeFileSync(resolve(pub, 'og-image.png'), svgToPng(ogSvg, 1200))
console.log('✓ public/og-image.png (1200x630)')

console.log('Done generating assets.')
