import { When, Then, Before } from "@cucumber/cucumber";
import { DrawerPage } from "../pages/drawerPage";
import { page } from "../support/hooks";
import { takeNormalScreenshot } from "../utils/ScreenshotUtil";

import productData from "../test-data/product.json";

let drawerPage: DrawerPage;

Before(async function () {
  drawerPage = new DrawerPage(page);
});

When("Scroll to the information section", async function () {
  await page.mouse.wheel(0, 1000);
});

Then("Verify Product details is visible", async function () {
  await drawerPage.verifyTriggerIsVisible();
});

When("Click Product details", async function () {
  await drawerPage.openDrawer();
});

Then("Verify a right-side drawer opens", async function () {
  await drawerPage.verifyDrawerIsOpen();
});

Then("Verify the drawer heading is Product details", async function () {
  await drawerPage.verifyDrawerHeading();
});

Then(
  "Verify the product ID {string} is displayed in the drawer",
  async function (productIdLabel: string) {
    await drawerPage.verifyTextInDrawer(productIdLabel);
  },
);

Then("Verify the drawer close X is visible", async function () {
  await drawerPage.verifyCloseButtonIsVisible();
});

When("Click the close X", async function () {
  await drawerPage.closeDrawer();
});

Then("Verify the drawer closes and the page becomes active", async function () {
  await drawerPage.verifyDrawerIsClosed();
});

When("Scroll to Product specifications", async function () {
  await page.mouse.wheel(0, 1500);
});

When("Click Product specifications", async function () {
  await drawerPage.openProdSpecDrawer();
});

Then(
  "Verify the right-side drawer heading is Product specifications",
  async function () {
    await drawerPage.verifyProdSpecIsOpen();
    await drawerPage.verifyProdSpecHeading();
  },
);

When("Close the drawer using X", async function () {
  await drawerPage.closeDrawer();
  await drawerPage.verifyDrawerIsClosed();
});

When("Locate the delivery location or PIN-code area", async function () {
  await page.mouse.wheel(0, 1000);
  await drawerPage.verifyDeliveryIsVisible();
});

When("Open Select delivery location", async function () {
  await drawerPage.openPincodeDrawer();
});

Then("Verify the right-side delivery drawer opens", async function () {
  await drawerPage.verifyPincodeDrawerIsOpen();
});

Then(
  "Verify the login message is displayed for a guest user",
  async function () {
    await drawerPage.verifyGuestLoginMessage();
  },
);

When(
  "Locate the Enter pincode field, clear it and enter the invalid PIN code {string}",
  async function (invalidPincode: string) {
    await drawerPage.enterPincode(invalidPincode);
  },
);

When("Click the arrow submit button", async function () {
  await drawerPage.submitPincode();
});

Then(
  "Wait for validation and verify the red error message {string} appears",
  async function (errorMessage: string) {
    await drawerPage.verifyPincodeError(errorMessage);
    await takeNormalScreenshot(page, `TC_33 invalid pincode error ${errorMessage}`);
  },
);

When("Close the delivery drawer using X", async function () {
  await drawerPage.closePinCodeDrawer();
  await drawerPage.verifyDrawerIsClosed();
});
