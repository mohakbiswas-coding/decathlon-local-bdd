import { Page, Locator } from '@playwright/test';

export class ProductLocators {

    readonly allProductsLink: Locator;
    readonly hairCategory: Locator;
    readonly firstProduct: Locator;
    readonly addToCartButton: Locator;

    constructor(private page: Page) {

        this.allProductsLink =
            this.page.getByRole('link', { name: 'All Products' });

        this.hairCategory =
            this.page.getByTestId('shop-category--shop-hair');

        this.firstProduct =
            this.page.getByTestId(
                'athena-product-card/dp/1x-minoxifin-1x-nourish-hair-gummies/2025093'
            );

this.addToCartButton =
    this.page.locator("//div[text()='Add to Cart']").nth(1);
    }
}