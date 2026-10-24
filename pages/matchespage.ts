import { Page, Locator } from '@playwright/test';

export class Matchespage {
  readonly page: Page;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator('main');
  }

  async verifyOnMatchesPage(): Promise<string> {
    return this.page.url();
  }
}