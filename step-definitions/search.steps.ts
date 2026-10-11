import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SearchPage } from "../pages/searchPage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { ProductPage } from "../pages/productPage";
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
  await searchPage.verifyTrendingSearchesIfAvailable();
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

When("Enter the partial keyword", async function () {
  await searchPage.enterKeyword(searchData.partialKeyword);
});

Then("Verify the keyword remains visible in the input", async function () {
  await searchPage.verifyInputHasValue(searchData.partialKeyword);
});

Then("Verify the clear X control appears in the input", async function () {
  await searchPage.verifyClearButtonIsVisible();
});

Then(
  "Observe the available discovery or suggestion content",
  async function () {
    await searchPage.verifyTrendingSearchesIfAvailable();
  },
);

When("Press Enter to submit the partial keyword", async function () {
  await searchPage.submitSearch();
});

When("Wait for the Search results page to load", async function () {
  await resultsPage.waitForResults();
});

Then("Verify the URL contains a search query parameter", async function () {
  await resultsPage.verifyUrlContainsQuery(searchData.urls.queryParam);
});

Then("Verify product results are displayed", async function () {
  await resultsPage.verifyProductCardIsVisible();
});

Given("Open a Search results page", async function () {
  await resultsPage.openResults(
    searchData.urls.searchResults,
    searchData.searchKeyword,
  );
});

When("Wait for the product grid to be visible", async function () {
  await resultsPage.waitForResults();
});

Then(
  "Verify the product cards: image, name, price, wishlist, add to cart \\(+ optional info\\)",
  async function () {
    // Steps 3 to 11: core checks on the first card.
    // Step 12: repeat the same checks on the next card(s).
    for (let index = 0; index < searchData.cardsToCheck; index++) {
      await resultsPage.verifyCardInfo(index);
    }
  },
);

When("Clear any existing Search text", async function () {
  await searchPage.clearSearchText();
});

When("Enter the unrelated keyword", async function () {
  await searchPage.enterKeyword(searchData.unrelatedKeyword);
});

When("Press Enter to submit the keyword", async function () {
  await searchPage.submitSearch();
});

Then("Verify the URL contains the submitted query", async function () {
  await resultsPage.verifyUrlContainsQuery(searchData.unrelatedKeyword);
});

Then(
  "Verify the results heading represents the submitted keyword",
  async function () {
    await expect(resultsPage.results.heading).toContainText(
      searchData.unrelatedKeywordExpected,
      { ignoreCase: true },
    );
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
