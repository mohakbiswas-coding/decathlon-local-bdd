import { Given, When, Then } from '@cucumber/cucumber';
import { CompleteQuiz } from '../pages/completeQuiz';
import { page } from '../support/hooks';
import { WebHelper } from '../utils/webHelper';
import { Logger } from '../utils/Logger';
import { ScreenshotUtil } from '../utils/Screenshot';

import userData from '../test-Data/userRegistrationData.json';

let completeQuiz: CompleteQuiz;

Given(
  'user launches quiz application',
  async function () {

    completeQuiz = new CompleteQuiz(page);

    await WebHelper.navigateToUrl(
      page,
      process.env.BASE_URL!
    );
  }
);

When(
  'user starts the quiz',
  async function () {

    await completeQuiz.startQuiz();
  }
);

When(
  'user answers all quiz questions',
  async function () {

    await completeQuiz.answerQuizQuestions();
  }
);

When(
  'user enters mobile number',
  async function () {

    await completeQuiz.enterMobileNumber(
      userData.mobileNumber
    );
  }
);

When(
  'user enters registration details',
  async function () {

    await completeQuiz.enterUserDetails(
      userData.firstName,
      userData.lastName,
      userData.email
    );
  }
);

Then(
  'quiz flow should complete successfully',
  async function () {

    await ScreenshotUtil.captureScreenshot(
      page,
      'TC03_CompleteQuiz'
    );

    Logger.info(
      'TC03 completed successfully'
    );
  }
);