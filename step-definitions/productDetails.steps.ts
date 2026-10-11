import { Given, When, Then, Before } from "@cucumber/cucumber";
import { ProductPage } from "../pages/ProductPage";
import { page } from "../support/hooks";
import { takeNormalScreenshot } from "../utils/ScreenshotUtil";

import productData from "../test-data/product.json";

let productPage: ProductPage;

let urlBefore = "";
let imageBefore = "";
let cartCountBefore = 0;

Before(async function () {
  productPage = new ProductPage(page);

  urlBefore = "";
  imageBefore = "";
  cartCountBefore = 0;
});

Given("Open the Product Details Page", async function () {
  await productPage.openProduct(productData.urls.pdp);
  await productPage.waitForProductToLoad();
});

When("Wait for the Product Details Page to load", async function () {
  await productPage.waitForProductToLoad();
});

Given("Open the valid product URL for the product ID", async function () {
  await productPage.openProduct(productData.urls.pdp);
});

Then("Verify breadcrumbs are visible", async function () {
  await productPage.verifyBreadcrumbs(productData.product.breadcrumbs);
});

Then("Verify the brand is displayed", async function () {
  await productPage.verifyBrand(productData.product.brand);
});

Then("Verify the product name is displayed", async function () {
  await productPage.verifyNameContains(productData.product.name);
});

Then("Verify the product ID is displayed", async function () {
  await productPage.verifyProductId(productData.product.id);
});

Then("Verify the main product image is visible", async function () {
  await productPage.waitUntilVisible(productPage.product.mainImage);
});

Then("Verify the selling price is displayed", async function () {
  await productPage.waitUntilVisible(productPage.product.price);
});

Then("Verify MRP is displayed", async function () {
  await productPage.verifyMrpIsVisible();
});

Then("Verify the rating value and review link are visible", async function () {
  await productPage.verifyRatingAndReviewLinkAreVisible();
});

Then("Verify colour options are displayed", async function () {
  await productPage.verifyColourOptionsAreVisible();
});

Then("Verify size options and Add to cart are displayed", async function () {
  await productPage.verifySizeOptionsAndAddToCartAreVisible();
});

When("Wait for the Colour section to be visible", async function () {
  await productPage.waitUntilVisible(
    productPage.product.colourThumbnails.first(),
  );
});

Then("Verify multiple colour thumbnails are displayed", async function () {
  await productPage.verifyColourOptionsAreVisible(
    productData.colour.minimumThumbnails,
  );
});

When("Record the current product URL", async function () {
  urlBefore = page.url();
});

When("Record the current main product image", async function () {
  imageBefore = await productPage.getMainImageSource();
});

When(
  "Click a different colour thumbnail and wait for the variant update",
  async function () {
    await productPage.selectColour(productData.colour.thumbnailToSelect);
  },
);

Then(
  "Verify the main product image changes to the selected colour",
  async function () {
    await productPage.verifyMainImageChanged(imageBefore);
  },
);

Then(
  "Record whether the URL changed \\(separate colour variant\\)",
  async function () {
    productPage.logVariantChange(urlBefore);
  },
);

Then("Verify price and size controls remain visible", async function () {
  await productPage.verifyPriceAndSizeControlsAreVisible();
});

Then(
  "Verify the page does not display an application error",
  async function () {
    await productPage.verifyNoApplicationError();
    await productPage.verifyNoPageNotFound();
  },
);

Given("Open a valid size-based Product Details Page", async function () {
  await productPage.openProduct(productData.urls.pdp);
});

When("Wait for the Select size section to be visible", async function () {
  await productPage.waitUntilVisible(productPage.product.sizeOptions.first());
});

When("Record the current Cart badge count", async function () {
  cartCountBefore = await productPage.getCartCount();
});

When("Click Add to cart without selecting a size", async function () {
  await productPage.clickAddToCart();
});

Then(
  'Verify the red message "Please select a size" appears',
  async function () {
    await productPage.verifySizeErrorIsVisible(
      productData.labels.selectSizeError,
    );
    await takeNormalScreenshot(page, "TC_28 size error message");
  },
);

Then("Verify size options remain available", async function () {
  await productPage.verifySizeOptionsRemainAvailable();
});

Then("Verify no size is automatically selected", async function () {
  await productPage.verifyNoSizeIsSelected();
});

Then("Verify the Cart badge does not increase", async function () {
  await productPage.verifyCartCountIs(cartCountBefore);
});

Then(
  "Verify the shopper remains on the Product Details Page",
  async function () {
    await productPage.verifyStillOnProductPage(productData.urls.productPath);
  },
);

Given("Open a valid in-stock Product Details Page", async function () {
  await productPage.openProduct(productData.urls.pdp);
});

When("Wait for the size options and Add to cart button", async function () {
  await productPage.verifySizeOptionsAndAddToCartAreVisible();
});

When("Select the available size", async function () {
  await productPage.selectSize(productData.size.toSelect);
});

Then(
  "Verify the low-stock label is displayed for the selected size when present",
  async function () {
    await productPage.verifyLowStockIfAvailable(productData.size.lowStockLabel);
  },
);

When(
  "Click Add to cart and wait for the add operation to complete",
  async function () {
    await productPage.clickAddToCart();
  },
);

Then("Verify Add to cart changes to Go to cart", async function () {
  await productPage.verifyCartButtonText(productData.labels.goToCart);
});

Then("Verify the Cart badge increases by one", async function () {
  await productPage.verifyCartCountIs(cartCountBefore + 1);
});

Then("Verify no size-validation message is displayed", async function () {
  await productPage.verifySizeErrorIsHidden(productData.labels.selectSizeError);
});
