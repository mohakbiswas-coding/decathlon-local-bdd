import { Given, When, Then, Before } from "@cucumber/cucumber";
import { CartPage } from "../pages/cartPage";
import { ProductPage } from "../pages/ProductPage";
import { page } from "../support/hooks";
import { takeNormalScreenshot } from "../utils/ScreenshotUtil";

import productData from "../test-data/product.json";

let productPage: ProductPage;
let cartPage: CartPage;

Before(async function () {
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
});

Given(
  "Add the product to the cart with the chosen size {string}",
  async function (size: string) {
    // Precondition: the product has been added with the chosen size.
    await productPage.openProduct(productData.urls.pdp);
    await productPage.waitForProductToLoad();
    await productPage.selectSize(size);
    await productPage.clickAddToCart();
    await productPage.verifyCartButtonText(productData.labels.goToCart);
  },
);

When("Click Go to cart", async function () {
  await productPage.closeAddToCartConfirmationIfVisible();
  await productPage.goToCart();
});

When("Wait for the Cart Items page to load", async function () {
  await cartPage.waitForCart();
});

Then(
  "Verify one expected cart item of brand {string} is displayed",
  async function (brand: string) {
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemBrand(brand);
  },
);

Then("Verify the product image is displayed", async function () {
  await cartPage.verifyItemImageIsVisible();
});

Then(
  "Verify the product name matches {string}",
  async function (productName: string) {
    await cartPage.verifyItemName(productName);
  },
);

Then(
  "Verify the selected size in Cart matches the chosen size {string}",
  async function (size: string) {
    await cartPage.verifyItemSize(size);
  },
);

Then(
  "Verify quantity is {string} for the newly added item",
  async function (quantity: string) {
    await cartPage.verifyItemQuantity(quantity);
  },
);

Then("Verify the selling price {string}", async function (selling: string) {
  await cartPage.verifySellingPrice(selling);
});

Then("Verify the MRP {string}", async function (mrp: string) {
  await cartPage.verifyMrp(mrp);
});

Then(
  "Verify the order summary shows the discount {string}",
  async function (discount: string) {
    await cartPage.verifySummaryDiscount(discount);
  },
);

Then("Verify the total {string}", async function (total: string) {
  await cartPage.verifySummaryTotal(total);
});

Then("Verify guest users see Login to Proceed", async function () {
  await cartPage.verifyGuestCheckoutAction();
  await takeNormalScreenshot(page, "TC_30 cart summary");
});