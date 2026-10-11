import { Page, expect } from '@playwright/test';
import { HairAssessmentLocators } from '../locators/assessmentLocators';
import { CommonMethods } from '../utils/commonMethods';

export class HairAssessment {
  private locator: HairAssessmentLocators;

  constructor(private page: Page) {
    this.locator = new HairAssessmentLocators(page);
  }

  async verifyAssessmentPageLoaded() {
    await expect(this.page).toHaveURL(
      /hair-form\?wacategory=hair&skipHome=true/
    );
  }

  async verifyQuestionnaireDisplayed() {
    await CommonMethods.verifyVisible(
      this.locator.questionnaireHeading
    );

    await CommonMethods.verifyVisible(
      this.locator.questionnaireDescription
    );
  }
}