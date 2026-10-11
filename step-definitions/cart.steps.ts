import { Given, When, Then, Before } from "@cucumber/cucumber";
import { CartPage } from "../pages/cartPage";
import { ProductPage } from "../pages/productPage";
import { page } from "../support/hooks";
import { takeNormalScreenshot } from "../utils/ScreenshotUtil";

import cartData from "../test-data/cart.json";
import productData from "../test-data/product.json";

let productPage: ProductPage;
let cartPage: CartPage;

const size = productData.size.toSelect;

Before(async function () {
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
});

Given("Add the product to the cart with the chosen size", async function () {
  // Precondition: the product has been added with the chosen size.
  await productPage.openProduct(productData.urls.pdp);
  await productPage.waitForProductToLoad();
  await productPage.selectSize(size);
  await productPage.clickAddToCart();
  await productPage.verifyCartButtonText(productData.labels.goToCart);
});

When("Click Go to cart", async function () {
  await productPage.closeAddToCartConfirmationIfVisible();
  await productPage.goToCart();
});

When("Wait for the Cart Items page to load", async function () {
  await cartPage.waitForCart();
});

Then("Verify one expected cart item is displayed", async function () {
  await cartPage.verifyItemCount(1);
  await cartPage.verifyItemBrand(cartData.brand);
});

Then("Verify the product image is displayed", async function () {
  await cartPage.verifyItemImageIsVisible();
});

Then(
  "Verify the product name matches the selected PDP product",
  async function () {
    await cartPage.verifyItemName(productData.product.name);
  },
);

Then(
  "Verify the selected size in Cart matches the chosen size",
  async function () {
    await cartPage.verifyItemSize(size);
  },
);

Then("Verify quantity is 1 for the newly added item", async function () {
  await cartPage.verifyItemQuantity(cartData.quantity);
});

Then("Verify the selling price", async function () {
  await cartPage.verifySellingPrice(cartData.prices.selling);
});

Then("Verify the MRP", async function () {
  await cartPage.verifyMrp(cartData.prices.mrp);
});

Then("Verify the order summary shows the discount", async function () {
  await cartPage.verifySummaryDiscount(cartData.prices.discount);
});

Then("Verify the total for quantity 1", async function () {
  await cartPage.verifySummaryTotal(cartData.prices.total);
});

Then("Verify guest users see Login to Proceed", async function () {
  await cartPage.verifyGuestCheckoutAction();
  await takeNormalScreenshot(page, "TC_30 cart summary");
});
