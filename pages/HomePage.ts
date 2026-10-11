import { Page, expect} from '@playwright/test';
import { HomeLocators } from '../locators/homeLocators';
import { CommonMethods } from '../utils/commonMethods';

export class HomePage {
  private locator: HomeLocators;

  constructor(private page: Page) {
    this.locator = new HomeLocators(page);
  }


async clickTakeHairTest() {

    await this.locator.takeHairTestButton.scrollIntoViewIfNeeded();

    await this.locator.takeHairTestButton.click();
}
}