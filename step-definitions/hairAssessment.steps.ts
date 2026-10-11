import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/hooks';
import { WebHelper } from '../utils/webHelper';

Given(
  'user opens the hair assessment page',
  async function () {

    await WebHelper.navigateToUrl(
      page,
      'https://manmatters.com/hair-form?wacategory=hair&skipHome=true'
    );
  }
);

When(
  'the hair assessment page loads completely',
  async function () {

    await WebHelper.waitForPageLoad(page);
  }
);

Then(
  'the hair assessment URL should contain {string}',
  async function (urlPart: string) {

    await expect(page).toHaveURL(
      new RegExp(urlPart)
    );
  }
);

Then(
  'the questionnaire heading should be displayed',
  async function () {

    await expect(
      page.getByText(
        'Which one is closest to you?'
      )
    ).toBeVisible();
  }
);

Then(
  'the questionnaire instruction should be displayed',
  async function () {

    await expect(
      page.getByText(
        'A guess is fine. We confirm with your photo later.'
      )
    ).toBeVisible();
  }
);