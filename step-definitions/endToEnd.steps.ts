import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { SearchPage } from "../pages/searchPage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { page } from "../support/hooks";
import { takeNormalScreenshot } from "../utils/ScreenshotUtil";

import cartData from "../test-data/cart.json";
import productData from "../test-data/product.json";
import searchData from "../test-data/search.json";

let homePage: HomePage;
let searchPage: SearchPage;
let resultsPage: SearchResultsPage;
let productPage: ProductPage;
let cartPage: CartPage;

const searchKeyword = searchData.e2eSearchKeyword;
const expectedProductHref = `${productData.urls.productPath}${productData.product.id}`;
const selectedSize = productData.size.toSelect;

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

When("Enter the KIPRUN product keyword", async function () {
  await searchPage.enterKeyword(searchKeyword);
  await searchPage.verifyInputHasValue(searchKeyword);
});

When("Submit the product search", async function () {
  await searchPage.submitSearch();
});

Then("Wait for results and verify the submitted query", async function () {
  await resultsPage.waitForResults();
  await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam);
  const actualQuery = await resultsPage.getUrlQueryValue(
    searchData.urls.queryParam,
  );
  expect(actualQuery.toLowerCase()).toContain(searchKeyword.toLowerCase());
});

When(
  "Select the matching KIPRUN product card and open its PDP",
  async function () {
    selectedCardName = await resultsPage.openProductByName(
      productData.product.searchName,
      expectedProductHref,
    );
    expect(selectedCardName.toLowerCase()).toContain("kiprun");
  },
);

Then(
  "Verify the selected product identity, image, price, and size options",
  async function () {
    await productPage.waitForProductToLoad();
    await productPage.verifyUrlHasProductPath(productData.urls.productPath);
    await productPage.verifyBrand(productData.product.brand);
    await productPage.verifyNameContains(productData.product.name);
    await productPage.verifyProductId(productData.product.id);
    await productPage.verifyPriceAndImageAreVisible();
    await productPage.verifySizeOptionsAndAddToCartAreVisible();
  },
);

When("Record the Cart badge and select size 6.5", async function () {
  cartCountBeforeAdd = await productPage.getCartCount();
  await productPage.selectSize(selectedSize);
  await productPage.verifyLowStockIfAvailable(productData.size.lowStockLabel);
});

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
  "Verify the Cart contains the selected product and size",
  async function () {
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemBrand(cartData.brand);
    await cartPage.verifyItemName(productData.product.name);
    await cartPage.verifyItemImageIsVisible();
    await cartPage.verifyItemSize(selectedSize);
    await cartPage.verifyItemQuantity(cartData.quantity);
  },
);

Then(
  "Verify order totals and that guest checkout requires login",
  async function () {
    await cartPage.verifySellingPrice(cartData.prices.selling);
    await cartPage.verifyMrp(cartData.prices.mrp);
    await cartPage.verifySummaryDiscount(cartData.prices.discount);
    await cartPage.verifySummaryTotal(cartData.prices.total);
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
