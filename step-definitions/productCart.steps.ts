import { Given, When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../pages/ProductPage';
import { page } from '../support/hooks';
import { WebHelper } from '../utils/webHelper';
import { ScreenshotUtil } from '../utils/Screenshot';
import { Logger } from '../utils/Logger';

let productPage: ProductPage;

Given(
  'user launches Man Matters application',
  async function () {

    productPage = new ProductPage(page);

    await WebHelper.navigateToUrl(
      page,
      process.env.BASE_URL!
    );
  }
);

When(
  'user clicks All Products',
  async function () {

    await productPage.clickAllProducts();
  }
);

Then(
  'products page should be displayed',
  async function () {

    await productPage.verifyProductsPage();
  }
);

When(
  'user selects Hair category',
  async function () {

    await productPage.clickHairCategory();
  }
);

When(
  'user opens first product',
  async function () {

    await productPage.clickFirstProduct();
  }
);

Then(
  'product details page should be displayed',
  async function () {

    await productPage.verifyProductDetailsPage();

    await ScreenshotUtil.captureScreenshot(
      page,
      'TC02_Product_Details_Page'
    );
  }
);

When(
  'user adds product to cart',
  async function () {

    await productPage.clickAddToCart();

    await ScreenshotUtil.captureScreenshot(
      page,
      'TC02_Add_To_Cart'
    );
  }
);

Then(
  'cart action should complete successfully',
  async function () {

    Logger.info(
      'TC02 completed successfully'
    );
  }
);