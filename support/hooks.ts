import {
  Before,
  After
} from '@cucumber/cucumber';

import {
  setDefaultTimeout
} from '@cucumber/cucumber';

import * as dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(60000);

import {
  chromium,
  Browser,
  BrowserContext,
  Page
} from '@playwright/test';

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

Before(async () => {

  browser = await chromium.launch({
    headless: false
  });

  context = await browser.newContext();

  page = await context.newPage();
});

After(async () => {

  await page.close();
  await context.close();
  await browser.close();
});