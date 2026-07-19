import { test, expect, type Page } from '@playwright/test'

// Close the profile onboarding modal if it appears (first visit).
async function dismissOnboarding(page: Page) {
  const skip = page.getByRole('button', { name: 'Nanti saja' })
  if (await skip.isVisible().catch(() => false)) await skip.click()
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

test('the Progress page does not overflow horizontally', async ({ page }) => {
  await page.goto('/kemajuan')
  await dismissOnboarding(page)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1) // must not extend beyond the screen
})
