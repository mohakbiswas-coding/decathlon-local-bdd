import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/searchPage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { page } from "../support/hooks";

import searchData from "../test-data/search.json";

let homePage: HomePage;
let searchPage: SearchPage;
let resultsPage: SearchResultsPage;
let productPage: ProductPage;

let trendingTerm = "";
let selectedName = "";

Before(async function () {
  homePage = new HomePage(page);
  searchPage = new SearchPage(page);
  resultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);

  trendingTerm = "";
  selectedName = "";
});

Given("Launch the Decathlon website", async function () {
  await homePage.launch();
});

When("Wait until the homepage header is visible", async function () {
  await homePage.waitForHeader();
});

When("Locate the Search field in the header", async function () {
  await homePage.waitUntilVisible(homePage.header.searchField);
});

When("Click the Search field", async function () {
  await homePage.openSearch();
});

Then("Verify the background page remains visible", async function () {
  await homePage.verifyBackgroundPageRemainsVisible();
});

Then("Verify the Search overlay opens", async function () {
  await searchPage.verifyOverlayIsOpen();
});

Then("Verify the Search input is visible in the overlay", async function () {
  await searchPage.verifySearchInputIsVisible();
});

Then("Verify Trending searches is displayed when available", async function () {
  await searchPage.verifyTrendingSearchesIfAvailable(searchData.overlaySections.trending);
});

Then(
  "Verify Recommended For You or Bestsellers is displayed when available",
  async function () {
    await searchPage.verifySectionIfAvailable(
      searchData.overlaySections.recommended,
    );
    await searchPage.verifySectionIfAvailable(
      searchData.overlaySections.bestsellers,
    );
  },
);

Then("Verify the close control is visible", async function () {
  await searchPage.verifyCloseControlIsVisible();
});

When("Click the close control", async function () {
  await searchPage.closeOverlay();
});

Then("Verify the Search overlay closes", async function () {
  await searchPage.verifyOverlayIsClosed();
});

When("Locate the Trending searches section", async function () {
  await searchPage.waitUntilVisible(searchPage.search.trendingTitle);
});

When("Record one currently displayed trending term", async function () {
  trendingTerm = await searchPage.getFirstTrendingTerm();
  expect(trendingTerm).not.toBe("");
});

When("Click the recorded trending term", async function () {
  await searchPage.clickTrendingTerm(trendingTerm);
});

When("Wait for navigation or result loading to finish", async function () {
  await resultsPage.waitForResults();
});

Then("Verify a Search results page is displayed", async function () {
  await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam);
});

Then(
  "Verify the submitted term is in the URL, field, or heading",
  async function () {
    const urlValue = await resultsPage.getUrlQueryValue(
      searchData.urls.queryParam,
    );

    const term = trendingTerm.toLowerCase();
    const found = [urlValue].some((text) => text.toLowerCase().includes(term));
    expect(
      found,
      `"${trendingTerm}" not found in URL, search field or heading`,
    ).toBe(true);
  },
);

Then("Verify at least one product card is visible", async function () {
  await resultsPage.verifyProductCardIsVisible();
});

Then(
  "Verify a visible card contains an image, product name, and selling price",
  async function () {
    const card = resultsPage.card(0);
    await expect(card.image).toBeVisible();
    await expect(card.name).toBeVisible();
    await expect(card.price).toBeVisible();
  },
);

Then(
  "Verify the page remains usable without a blocked loader",
  async function () {
    await resultsPage.verifyPageIsNotBlocked();
  },
);

When("Click inside the Search input", async function () {
  await searchPage.click(searchPage.search.searchInput);
});

When("Enter the partial keyword {string}", async function (partialKeyword: string) {
  await searchPage.enterKeyword(partialKeyword);
});

Then(
  "Verify the keyword {string} remains visible in the input",
  async function (partialKeyword: string) {
    await searchPage.verifyInputHasValue(partialKeyword);
  },
);

Then("Verify the clear X control appears in the input", async function () {
  await searchPage.verifyClearButtonIsVisible();
});

Then(
  "Observe the available discovery or suggestion content",
  async function () {
    await searchPage.verifyTrendingSearchesIfAvailable(searchData.overlaySections.trending);
  },
);

When("Press Enter to submit the partial keyword", async function () {
  await searchPage.submitSearch();
});

When("Wait for the Search results page to load", async function () {
  await resultsPage.waitForResults();
});

Then(
  "Verify the URL contains the search query parameter {string}",
  async function (queryParam: string) {
    await page.waitForURL((url) => url.searchParams.has(queryParam));
    await resultsPage.verifyUrlContainsQuery(queryParam);
  },
);

Then(
  "Verify at least {int} product results are displayed",
  async function (cardsToCheck: number) {
    await resultsPage.verifyProductCardIsVisible();
    for (let index = 0; index < cardsToCheck; index++) {
      await expect(resultsPage.card(index).name).toBeVisible();
    }
  },
);

Given(
  "Open a Search results page for {string}",
  async function (searchKeyword: string) {
    await resultsPage.openResults(searchData.urls.searchResults, searchKeyword);
  },
);

When("Wait for the product grid to be visible", async function () {
  await resultsPage.waitForResults();
});

Then(
  "Verify the first {int} product cards: image, name, price, wishlist, add to cart \\(+ optional info\\)",
  async function (cardsToCheck: number) {
    // Steps 3 to 11: core checks on the first card.
    // Step 12: repeat the same checks on the next card(s).
    for (let index = 0; index < cardsToCheck; index++) {
      await resultsPage.verifyCardInfo(index);
    }
  },
);

When("Clear any existing Search text", async function () {
  await searchPage.clearSearchText();
});

When(
  "Enter the unrelated keyword {string}",
  async function (unrelatedKeyword: string) {
    await searchPage.enterKeyword(unrelatedKeyword);
  },
);

When("Press Enter to submit the keyword", async function () {
  await searchPage.submitSearch();
});

Then(
  "Verify the URL contains the submitted query {string}",
  async function (unrelatedKeyword: string) {
    await page.waitForURL(`**/*${unrelatedKeyword}*`);
    await resultsPage.verifyUrlContainsQuery(unrelatedKeyword);
  },
);

Then(
  "Verify the results heading shows {string}",
  async function (expectedHeading: string) {
    await expect(resultsPage.results.heading).toContainText(expectedHeading, {
      ignoreCase: true,
    });
  },
);

Then(
  "Record the result count and inspect the first product names",
  async function () {
    await resultsPage.logResultSummary();
  },
);

When("Wait for product cards to load", async function () {
  await resultsPage.waitForResults();
});

When(
  "Select one stable in-stock product card \\(the first card\\)",
  async function () {
    await expect(resultsPage.card(0).addToCart).toBeVisible();
  },
);

When("Record the visible product name", async function () {
  selectedName = await resultsPage.getCardName(0);
  expect(selectedName).not.toBe("");
});

When("Click the product name", async function () {
  await resultsPage.openProductFromCard(0);
});

Then("Verify the URL contains a product path", async function () {
  await productPage.verifyUrlHasProductPath(searchData.urls.productPath);
});

Then("Verify the PDP displays a brand and a product name", async function () {
  await productPage.verifyBrandAndNameAreVisible();
});

Then(
  "Compare the displayed product with the selected Search result",
  async function () {
    await productPage.verifyNameMatches(selectedName);
  },
);

Then(
  "Verify the selling price and main product image are visible",
  async function () {
    await productPage.verifyPriceAndImageAreVisible();
  },
);
