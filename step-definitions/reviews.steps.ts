import { When, Then, Before } from "@cucumber/cucumber";
import { ReviewsPage } from "../pages/reviewsPage";
import { page } from "../support/hooks";

let reviewsPage: ReviewsPage;

Before(async function () {
  reviewsPage = new ReviewsPage(page);
});

When("Scroll to the Reviews section", async function () {
  await reviewsPage.scrollToReviews();
});

Then(
  "Verify the Reviews heading {string} is visible",
  async function (heading: string) {
    await reviewsPage.verifyHeadingIsVisible(heading);
  },
);

Then(
  "Verify the overall rating {string} is displayed",
  async function (overallRating: string) {
    await reviewsPage.verifyOverallRating(overallRating);
  },
);

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

Then(
  "Verify at least {int} review entries can be seen",
  async function (entriesToCheck: number) {
    await reviewsPage.verifyMultipleReviews(entriesToCheck);
  },
);

Then(
  "Verify the View all link {string} is visible",
  async function (viewAllText: string) {
    await reviewsPage.verifyViewAllIsVisible(viewAllText);
  },
);

Then(
  "Verify the first {int} reviews remain readable without overlapping content",
  async function (entriesToCheck: number) {
    await reviewsPage.verifyReviewsDoNotOverlap(entriesToCheck);
  },
);