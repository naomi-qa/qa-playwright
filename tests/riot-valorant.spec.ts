import { test, expect } from '@playwright/test';

test.describe('Riot Games - Valorant Esports Portal Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://valorantesports.com/');
  });

  test('Verify page title and main navigation elements', async ({ page }) => {
    await expect(page).toHaveTitle(/VALORANT Esports/i);

    const newsLink = page.locator('a', { hasText: 'NEWS' }).first();
    const scheduleLink = page.locator('a', { hasText: 'SCHEDULE' }).first();

    await expect(newsLink).toBeVisible();
    await expect(scheduleLink).toBeVisible();
  });

  test('Navigate to Schedule page and verify content loads', async ({ page }) => {
    const scheduleLink = page.locator('a', { hasText: 'SCHEDULE' }).first();
    await scheduleLink.click();

    await expect(page).toHaveURL(/.*schedule/);

    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

});