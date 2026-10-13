import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { SearchPage } from "../pages/searchPage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { page } from "../support/hooks";
import { takeNormalScreenshot } from "../utils/ScreenshotUtil";

import productData from "../test-data/product.json";
import searchData from "../test-data/search.json";

let homePage: HomePage;
let searchPage: SearchPage;
let resultsPage: SearchResultsPage;
let productPage: ProductPage;
let cartPage: CartPage;

let cartCountBeforeAdd = 0;
let selectedCardName = "";

Before(async function () {
  homePage = new HomePage(page);
  searchPage = new SearchPage(page);
  resultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);

  cartCountBeforeAdd = 0;
  selectedCardName = "";
});

Given("Launch the Decathlon homepage", async function () {
  await homePage.launch();
});

When("Wait for the header and open Search", async function () {
  await homePage.waitForHeader();
  await homePage.openSearch();
});

Then("Verify the Search overlay and input are visible", async function () {
  await searchPage.verifyOverlayIsOpen();
  await searchPage.verifySearchInputIsVisible();
});

When(
  "Enter the product keyword {string}",
  async function (searchKeyword: string) {
    await searchPage.enterKeyword(searchKeyword);
    await searchPage.verifyInputHasValue(searchKeyword);
  },
);

When("Submit the product search", async function () {
  await searchPage.submitSearch();
});

Then(
  "Wait for results and verify the submitted query {string}",
  async function (searchKeyword: string) {
    const queryParam = searchData.urls.queryParam;

    await page.waitForURL((url) => url.searchParams.has(queryParam));
    await resultsPage.waitForResults();
    await resultsPage.verifyUrlContainsQuery(queryParam);

    const actualQuery = await resultsPage.getUrlQueryValue(queryParam);
    expect(actualQuery.toLowerCase()).toContain(searchKeyword.toLowerCase());
  },
);

When(
  "Select the {string} product card {string} with ID {string} and open its PDP",
  async function (brand: string, searchName: string, productId: string) {
    const expectedProductHref = `${productData.urls.productPath}${productId}`;
    selectedCardName = await resultsPage.openProductByName(
      searchName,
      expectedProductHref,
    );
    expect(selectedCardName.toLowerCase()).toContain(brand.toLowerCase());
  },
);

Then(
  "Verify the selected product {string} {string} with ID {string} shows image, price, and size options",
  async function (brand: string, productName: string, productId: string) {
    await productPage.waitForProductToLoad();
    await productPage.verifyUrlHasProductPath(productData.urls.productPath);
    await productPage.verifyBrand(brand);
    await productPage.verifyNameContains(productName);
    await productPage.verifyProductId(productId);
    await productPage.verifyPriceAndImageAreVisible();
    await productPage.verifySizeOptionsAndAddToCartAreVisible();
  },
);

When(
  "Record the Cart badge and select size {string} with low-stock label {string}",
  async function (size: string, lowStockLabel: string) {
    cartCountBeforeAdd = await productPage.getCartCount();
    await productPage.selectSize(size);
    await productPage.verifyLowStockIfAvailable(lowStockLabel);
  },
);

When("Add the selected product to the Cart", async function () {
  await productPage.clickAddToCart();
});

Then(
  "Verify add-to-cart success and the Cart badge increment",
  async function () {
    await productPage.verifyCartButtonText(productData.labels.goToCart);
    await productPage.verifyCartCountIs(cartCountBeforeAdd + 1);
    await productPage.verifySizeErrorIsHidden(
      productData.labels.selectSizeError,
    );
  },
);

When("Open the Cart page", async function () {
  await productPage.closeAddToCartConfirmationIfVisible();
  await productPage.goToCart();
  await cartPage.waitForCart();
});

Then(
  "Verify the Cart contains {string} {string} in size {string} with quantity {string}",
  async function (
    brand: string,
    productName: string,
    size: string,
    quantity: string,
  ) {
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemBrand(brand);
    await cartPage.verifyItemName(productName);
    await cartPage.verifyItemImageIsVisible();
    await cartPage.verifyItemSize(size);
    await cartPage.verifyItemQuantity(quantity);
  },
);

Then(
  "Verify order totals {string} {string} {string} {string} and that guest checkout requires login",
  async function (
    selling: string,
    mrp: string,
    discount: string,
    total: string,
  ) {
    await cartPage.verifySellingPrice(selling);
    await cartPage.verifyMrp(mrp);
    await cartPage.verifySummaryDiscount(discount);
    await cartPage.verifySummaryTotal(total);
    await cartPage.verifyGuestCheckoutAction();
    await takeNormalScreenshot(page, "TC_35 end-to-end cart summary");
  },
);

When(
  "Select Login to Proceed and verify the authentication gate appears",
  async function () {
    await cartPage.clickGuestCheckoutAction();
    await cartPage.verifyLoginGateIsDisplayed();
  },
);