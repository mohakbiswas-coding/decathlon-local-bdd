import { Page } from '@playwright/test';

export class HairAssessmentLocators {
  constructor(private page: Page) {}

  questionnaireHeading =
    this.page.getByText(
      'Which one is closest to you?',
      { exact: true }
    );

  questionnaireDescription =
    this.page.getByText(
      'A guess is fine. We confirm with your photo later.',
      { exact: true }
    );

  hairStageOptions =
    this.page.locator('input[type="radio"]');
}