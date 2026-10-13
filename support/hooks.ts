import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";

import * as dotenv from "dotenv";

dotenv.config();

import {
  chromium,
  devices,
  selectors,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";

import { takeErrorScreenshot } from "../utils/ScreenshotUtil";

setDefaultTimeout(60000);

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

BeforeAll(async () => {
  selectors.setTestIdAttribute("data-test-id");

  browser = await chromium.launch({
    headless: process.env.HEADLESS === "true",
  });
});

// One fresh browser context per scenario, as the hybrid framework has per test file.
Before(async () => {
  context = await browser.newContext({
    ...devices["Desktop Chrome"],
    baseURL: process.env.BASE_URL!,
  });

  page = await context.newPage();
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    await takeErrorScreenshot(page, pickle.name);
  }

  await page.close();
  await context.close();
});

AfterAll(async () => {
  await browser.close();
});
