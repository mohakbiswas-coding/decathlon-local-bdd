//utils/commonMethods.ts
import { Locator, expect } from '@playwright/test';

export class CommonMethods {

    /**
     * Click on element
     */
    static async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    /**
     * Fill text in textbox
     */
    static async fillText(
        locator: Locator,
        text: string
    ): Promise<void> {
        await locator.fill(text);
    }

    /**
     * Get text from element
     */
    static async getText(
        locator: Locator
    ): Promise<string> {
        return (await locator.textContent())?.trim() || '';
    }

    /**
     * Hover over element
     */
    static async hover(
        locator: Locator
    ): Promise<void> {
        await locator.hover();
    }

    /**
     * Double click
     */
    static async doubleClick(
        locator: Locator
    ): Promise<void> {
        await locator.dblclick();
    }

    /**
     * Right click
     */
    static async rightClick(
        locator: Locator
    ): Promise<void> {
        await locator.click({ button: 'right' });
    }

    /**
     * Check checkbox
     */
    static async check(
        locator: Locator
    ): Promise<void> {
        await locator.check();
    }

    /**
     * Uncheck checkbox
     */
    static async uncheck(
        locator: Locator
    ): Promise<void> {
        await locator.uncheck();
    }

    /**
     * Select dropdown by visible text/value
     */
    static async selectDropdown(
        locator: Locator,
        value: string
    ): Promise<void> {
        await locator.selectOption(value);
    }

    /**
     * Scroll to element
     */
    static async scrollToElement(
        locator: Locator
    ): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    /**
     * Wait for visible element
     */
    static async waitForElement(
        locator: Locator
    ): Promise<void> {
        await locator.waitFor({
            state: 'visible'
        });
    }

    /**
     * Upload file
     */
    static async uploadFile(
        locator: Locator,
        filePath: string
    ): Promise<void> {
        await locator.setInputFiles(filePath);
    }

    /**
     * Get attribute value
     */
    static async getAttribute(
        locator: Locator,
        attribute: string
    ): Promise<string | null> {
        return await locator.getAttribute(attribute);
    }

    /**
     * Verify element visible
     */
    static async verifyVisible(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeVisible();
    }

    /**
     * Verify element hidden
     */
    static async verifyHidden(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeHidden();
    }

    /**
     * Verify element enabled
     */
    static async verifyEnabled(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    /**
     * Verify element disabled
     */
    static async verifyDisabled(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeDisabled();
    }

    /**
     * Verify text
     */
    static async verifyText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    /**
     * Verify partial text
     */
    static async verifyPartialText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {
        await expect(locator).toContainText(expectedText);
    }

    /**
     * Verify URL
     */
    static async verifyUrlContains(
        locator: Locator,
        text: string
    ): Promise<void> {
        await expect(locator).toContainText(text);
    }

    /**
     * Clear textbox
     */
    static async clearText(
        locator: Locator
    ): Promise<void> {
        await locator.clear();
    }

    /**
     * Press keyboard key
     */
    static async pressKey(
        locator: Locator,
        key: string
    ): Promise<void> {
        await locator.press(key);
    }

    /**
     * Get element count
     */
    static async getCount(
        locator: Locator
    ): Promise<number> {
        return await locator.count();
    }

    /**
     * Check visibility and return boolean
     */
    static async isVisible(
        locator: Locator
    ): Promise<boolean> {
        return await locator.isVisible();
    }

    /**
     * Check enabled state and return boolean
     */
    static async isEnabled(
        locator: Locator
    ): Promise<boolean> {
        return await locator.isEnabled();
    }
}