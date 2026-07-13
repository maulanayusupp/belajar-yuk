import { test, expect, type Page } from '@playwright/test'

// Tutup modal onboarding profil bila muncul (kunjungan pertama).
async function dismissOnboarding(page: Page) {
  const skip = page.getByRole('button', { name: 'Nanti saja' })
  if (await skip.isVisible().catch(() => false)) await skip.click()
}

test('beranda tampil & bisa ke Bahasa Inggris', async ({ page }) => {
  await page.goto('/')
  await dismissOnboarding(page)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  await page.goto('/english')
  // Minimal satu kartu pelajaran tampil → buka
  const firstLesson = page.getByRole('link', { name: /Nama Hewan|Bunyi Huruf/ }).first()
  await expect(firstLesson).toBeVisible()
  await firstLesson.click()
  await expect(page).toHaveURL(/\/english\//)
})

test('menyelesaikan soal berhitung menambah bintang', async ({ page }) => {
  await page.goto('/math/mt-counting')
  await dismissOnboarding(page)
  // Soal pertama: 3 benda → jawab 3
  await page.getByRole('button', { name: '3', exact: true }).click()
  await expect(page.getByText(/Lanjut|Selesai/)).toBeVisible()
})

test('halaman Kemajuan tidak overflow horizontal', async ({ page }) => {
  await page.goto('/kemajuan')
  await dismissOnboarding(page)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1) // tak boleh melebar dari layar
})
