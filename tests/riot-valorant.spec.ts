import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { Matchespage } from '../pages/matchespage';

test.describe('Riot Games - Valorant Esports Portal Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new Homepage(page);
    await homePage.navigate();
  });

  test('Verify page title and main navigation elements', async ({ page }) => {
    const homePage = new Homepage(page);

    await expect(page).toHaveTitle(/VALORANT Esports/i);
    await expect(homePage.matchesLink).toBeVisible();
    await expect(homePage.partnerTeamsLink).toBeVisible();
  });

  test('Navigate to Matches page and verify route and content', async ({ page }) => {
    const homePage = new Homepage(page);
    const matchesPage = new Matchespage(page);

    await homePage.clickMatches();

    await expect(page).toHaveURL(/.*matches/);
    await expect(matchesPage.mainContent).toBeVisible();
  });

  test('Visual Regression - Compare Home Page Layout Baseline', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('home-page-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05
    });
  });

});