import { When, Then, Before } from "@cucumber/cucumber";
import { ReviewsPage } from "../pages/reviewsPage";
import { page } from "../support/hooks";

import productData from "../test-data/product.json";

let reviewsPage: ReviewsPage;

const reviewData = productData.reviews;

Before(async function () {
  reviewsPage = new ReviewsPage(page);
});

When("Scroll to the Reviews section", async function () {
  await reviewsPage.scrollToReviews();
});

Then("Verify the Reviews heading is visible", async function () {
  await reviewsPage.verifyHeadingIsVisible(reviewData.heading);
});

Then("Verify the overall rating is displayed", async function () {
  await reviewsPage.verifyOverallRating(reviewData.overallRating);
});

Then("Verify the review count link is displayed", async function () {
  await reviewsPage.verifyReviewCountLinkIsVisible();
});

Then("Verify the star-rating distribution is visible", async function () {
  await reviewsPage.verifyRatingDistributionIsVisible();
});

Then(
  "Verify at least one written review title is displayed",
  async function () {
    await reviewsPage.verifyReviewTitleIsDisplayed();
  },
);

Then("Verify review metadata is displayed where available", async function () {
  await reviewsPage.verifyReviewMetaIfAvailable();
});

Then("Verify multiple review entries can be seen", async function () {
  await reviewsPage.verifyMultipleReviews(reviewData.entriesToCheck);
});

Then("Verify View all reviews is visible", async function () {
  await reviewsPage.verifyViewAllIsVisible(reviewData.viewAllText);
});

Then(
  "Verify the section remains readable without overlapping content",
  async function () {
    await reviewsPage.verifyReviewsDoNotOverlap(reviewData.entriesToCheck);
  },
);
