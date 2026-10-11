import { Page, expect } from '@playwright/test';
import { ProductLocators } from '../locators/productLocators';

export class ProductPage {

    locator: ProductLocators;

    constructor(private page: Page) {
        this.locator = new ProductLocators(page);
    }

    async clickAllProducts() {
        await this.locator.allProductsLink.click();
    }

    async verifyProductsPage() {
        await expect(this.page).toHaveURL(
            /shop\/all/
        );
    }

    async clickHairCategory() {
        await this.locator.hairCategory.click();
    }

    async clickFirstProduct() {
        await this.locator.firstProduct.click();
    }

async verifyProductDetailsPage() {

    await this.page.waitForLoadState('networkidle');

    await expect(
        this.page.locator('h1')
    ).toBeVisible();

    await expect(
        this.page.locator('img').first()
    ).toBeVisible();
}

    async clickAddToCart() {
        await this.locator.addToCartButton.click();
    }
}