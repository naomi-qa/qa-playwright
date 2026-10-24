import { Page, Locator } from '@playwright/test';

export class Homepage {
  readonly page: Page;
  readonly matchesLink: Locator;
  readonly partnerTeamsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.matchesLink = page.getByRole('link', { name: 'MATCHES' }).first();
    this.partnerTeamsLink = page.getByRole('link', { name: 'PARTNER TEAMS' }).first();
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://valorantesports.com/', { waitUntil: 'domcontentloaded' });
  }

  async clickMatches(): Promise<void> {
    await this.matchesLink.click();
  }
}