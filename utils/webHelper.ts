//utils/webHelper.ts
import { Page, BrowserContext } from '@playwright/test';

export class WebHelper {

    static async navigateToUrl(
        page: Page,
        url: string
    ): Promise<void> {
        await page.goto(url, {
            waitUntil: 'networkidle'
        });
    }

    static async getPageTitle(
        page: Page
    ): Promise<string> {
        return await page.title();
    }

    static async getCurrentUrl(
        page: Page
    ): Promise<string> {
        return page.url();
    }

    static async refreshPage(
        page: Page
    ): Promise<void> {
        await page.reload({
            waitUntil: 'networkidle'
        });
    }

    static async goBack(
        page: Page
    ): Promise<void> {
        await page.goBack();
    }

    static async goForward(
        page: Page
    ): Promise<void> {
        await page.goForward();
    }

    static async waitForPageLoad(
        page: Page
    ): Promise<void> {
        await page.waitForLoadState('networkidle');
    }

    static async openNewTab(
        context: BrowserContext
    ): Promise<Page> {
        const newPage = await context.newPage();
        return newPage;
    }

    static async closeCurrentTab(
        page: Page
    ): Promise<void> {
        await page.close();
    }
}