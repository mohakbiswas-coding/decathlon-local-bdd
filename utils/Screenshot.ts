//screenshot.ts
import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class ScreenshotUtil {

  private static getTimestamp(): string {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
      .format(new Date())
      .replace(/[/:,\s]/g, '_');
  }

  static async captureScreenshot(
    page: Page,
    screenshotName: string
  ): Promise<string> {

    const screenshotDir = path.join(
      process.cwd(),
      'reports',
      'screenshots'
    );

    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const filePath = path.join(
      screenshotDir,
      `${screenshotName}_${this.getTimestamp()}.png`
    );

    await page.screenshot({
      path: filePath,
      fullPage: false
    });

    return filePath;
  }
}