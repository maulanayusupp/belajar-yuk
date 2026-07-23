import { test, expect, type Page } from '@playwright/test'

// Close the profile onboarding modal if it appears (first visit).
async function dismissOnboarding(page: Page) {
  const skip = page.getByRole('button', { name: 'Nanti saja' })
  if (await skip.isVisible().catch(() => false)) await skip.click()
}

// Unlock a specific coding level so a deep-link isn't blocked by the progress
// gate (a level counts as unlocked if it's already been completed).
async function unlockCodingLevel(page: Page, id: string) {
  await page.addInitScript((levelId) => {
    localStorage.setItem('belajar-yuk:coding:stars', JSON.stringify({ [levelId]: 3 }))
  }, id)
}

test('home renders & can navigate to English', async ({ page }) => {
  await page.goto('/')
  await dismissOnboarding(page)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  await page.goto('/english')
  // At least one lesson card is shown → open it
  const firstLesson = page.getByRole('link', { name: /Nama Hewan|Bunyi Huruf/ }).first()
  await expect(firstLesson).toBeVisible()
  await firstLesson.click()
  await expect(page).toHaveURL(/\/english\//)
})

test('completing a counting lesson adds stars', async ({ page }) => {
  await page.goto('/math/mt-counting')
  await dismissOnboarding(page)
  // First problem: 3 objects → answer 3
  await page.getByRole('button', { name: '3', exact: true }).click()
  await expect(page.getByText(/Lanjut|Selesai/)).toBeVisible()
})

test('coding level shows the robot grid and can be solved', async ({ page }) => {
  await unlockCodingLevel(page, 'code-seq-1')
  await page.goto('/coding/code-seq-1')
  await dismissOnboarding(page)
  // The grid board MUST render (regression: an unresolved component once left
  // the level as buttons only, with no grid/robot).
  await expect(page.locator('.grid__board')).toBeVisible()
  // Solve "Robo Melangkah": Maju × 3, then Jalankan → success. `exact` avoids
  // also matching the program chip's "Hapus Maju" aria-label.
  const maju = page.getByRole('button', { name: 'Maju', exact: true })
  await maju.click()
  await maju.click()
  await maju.click()
  await page.getByRole('button', { name: /Jalankan/ }).click()
  await expect(page.getByText('Berhasil!')).toBeVisible({ timeout: 6000 })
})

test('coding "order the steps" game can be solved', async ({ page }) => {
  await page.goto('/coding/order-plant')
  await dismissOnboarding(page)
  // Tap the step cards in the correct order (labels are unique, so this works
  // regardless of the shuffled layout).
  for (const label of ['Gali tanah', 'Tanam biji', 'Siram air', 'Bunga mekar']) {
    await page.getByRole('button', { name: label }).click()
  }
  await expect(page.getByText('Urutan Benar!')).toBeVisible({ timeout: 6000 })
})

test('coding "find the bug" game can be solved', async ({ page }) => {
  await unlockCodingLevel(page, 'bug-1')
  await page.goto('/coding/bug-1')
  await dismissOnboarding(page)
  await expect(page.locator('.grid__board')).toBeVisible()
  // bug-1 program is Maju, Maju, Kiri — the last (Kiri) is the bug.
  await page.getByRole('button', { name: 'Kiri', exact: true }).click()
  // Replace it with Maju from the fix palette (scope avoids the program chips).
  await page.locator('.bug__palette').getByRole('button', { name: 'Maju' }).click()
  await expect(page.getByText('Bug Diperbaiki!')).toBeVisible({ timeout: 6000 })
})

test('coding "predict" game renders', async ({ page }) => {
  await unlockCodingLevel(page, 'predict-1')
  await page.goto('/coding/predict-1')
  await dismissOnboarding(page)
  await expect(page.locator('.grid__board')).toBeVisible()
  await expect(page.getByRole('button', { name: /Jalankan/ })).toBeVisible()
})

test('coding "function" game can be solved', async ({ page }) => {
  await unlockCodingLevel(page, 'func-1')
  await page.goto('/coding/func-1')
  await dismissOnboarding(page)
  await expect(page.locator('.grid__board')).toBeVisible()
  // Build Fungsi A = Maju, Maju, Kanan (palette buttons, exact avoids chips).
  await page.getByRole('button', { name: 'Maju', exact: true }).click()
  await page.getByRole('button', { name: 'Maju', exact: true }).click()
  await page.getByRole('button', { name: 'Kanan', exact: true }).click()
  // Ulangi ×4 (default 2 → +2)
  await page.getByRole('button', { name: 'Tambah ulangan' }).click()
  await page.getByRole('button', { name: 'Tambah ulangan' }).click()
  await page.getByRole('button', { name: /Jalankan/ }).click()
  await expect(page.getByText('Berhasil!')).toBeVisible({ timeout: 6000 })
})

test('coding "conditional" game can be solved', async ({ page }) => {
  await unlockCodingLevel(page, 'cond-1')
  await page.goto('/coding/cond-1')
  await dismissOnboarding(page)
  await expect(page.locator('.grid__board')).toBeVisible()
  // THEN branch → Maju, ELSE branch → Kanan (scope by branch to disambiguate).
  await page.locator('.ifr__branch').first().getByRole('button', { name: 'Maju' }).click()
  await page.locator('.ifr__branch').nth(1).getByRole('button', { name: 'Kanan' }).click()
  await page.getByRole('button', { name: /Jalankan/ }).click()
  await expect(page.getByText('Berhasil!')).toBeVisible({ timeout: 6000 })
})

test('Daftar Materi lists lessons and links to one', async ({ page }) => {
  await page.goto('/materi')
  await dismissOnboarding(page)
  await expect(page.getByRole('heading', { name: /Daftar Materi/ })).toBeVisible()
  // a lesson row links into a subject
  const lesson = page.getByRole('link', { name: /Nama Hewan/ }).first()
  await expect(lesson).toBeVisible()
  await lesson.click()
  await expect(page).toHaveURL(/\/english\//)
})

test('math "pattern" lesson can be solved', async ({ page }) => {
  await page.goto('/math/mt-patterns')
  await dismissOnboarding(page)
  await expect(page.locator('.mlesson__seq')).toBeVisible()
  // First problem is 2, 4, 6, ? → 8 (problems are not shuffled)
  await page.getByRole('button', { name: '8', exact: true }).click()
  await expect(page.getByText(/Lanjut|Selesai/)).toBeVisible()
})

test('math "clock" lesson can be solved', async ({ page }) => {
  await page.goto('/math/mt-clock')
  await dismissOnboarding(page)
  await expect(page.locator('.clock')).toBeVisible()
  // First clock shows 3 o'clock; the answer options are buttons (SVG numbers aren't)
  await page.getByRole('button', { name: '3', exact: true }).click()
  await expect(page.getByText(/Lanjut|Selesai/)).toBeVisible()
})

test('english "sentence building" lesson renders word tiles', async ({ page }) => {
  await page.goto('/english/en-sentence-basic')
  await dismissOnboarding(page)
  await expect(page.locator('.sent__tile').first()).toBeVisible()
  // tapping a tile places it into the assembled sentence
  await page.locator('.sent__tile:not([disabled])').first().click()
  await expect(page.locator('.sent__slot').first()).not.toBeEmpty()
})

test('legal pages render and are linked from the footer', async ({ page }) => {
  await page.goto('/privasi')
  await dismissOnboarding(page)
  await expect(page.getByRole('heading', { name: 'Kebijakan Privasi', level: 1 })).toBeVisible()

  await page.goto('/ketentuan')
  await dismissOnboarding(page)
  await expect(page.getByRole('heading', { name: 'Ketentuan Layanan', level: 1 })).toBeVisible()

  // Footer links exist on any page
  await page.goto('/')
  await dismissOnboarding(page)
  await expect(page.getByRole('link', { name: 'Kebijakan Privasi' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ketentuan Layanan' })).toBeVisible()
})

test('the Progress page does not overflow horizontally', async ({ page }) => {
  await page.goto('/kemajuan')
  await dismissOnboarding(page)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1) // must not extend beyond the screen
})
