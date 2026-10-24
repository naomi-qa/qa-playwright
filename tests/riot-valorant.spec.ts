import { test, expect } from '@playwright/test';

test.describe('Riot Games - Valorant Esports Portal Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://valorantesports.com/', { waitUntil: 'domcontentloaded' });
  });

  test('Verify page title and main navigation elements', async ({ page }) => {
    await expect(page).toHaveTitle(/VALORANT Esports/i);

    const matchesLink = page.getByRole('link', { name: 'MATCHES' }).first();
    const partnerTeamsLink = page.getByRole('link', { name: 'PARTNER TEAMS' }).first();

    await expect(matchesLink).toBeVisible();
    await expect(partnerTeamsLink).toBeVisible();
  });

  test('Navigate to Matches page and verify content loads', async ({ page }) => {
    const matchesLink = page.getByRole('link', { name: 'MATCHES' }).first();
    await matchesLink.click();

    await expect(page).toHaveURL(/.*matches/);

    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

});