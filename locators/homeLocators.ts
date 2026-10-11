// locators/homeLocators.ts

import { Page } from '@playwright/test';

export class HomeLocators {
    constructor(private page: Page) {}

    takeHairTestButton =
        this.page.getByText('Take the hair test');
}