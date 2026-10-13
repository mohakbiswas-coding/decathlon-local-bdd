import { Locator, Page } from '@playwright/test';

export class SearchResultsLocators {
  readonly heading: Locator;
  readonly productCards: Locator;
  readonly loader: Locator;

  constructor(page: Page) {
    this.heading = page.locator("div[class*='md:text-size']");
    this.productCards = page.locator('div[class*="mb-8 grid"] > div > a');
    this.loader = page.getByTestId('loader');
  }
}
