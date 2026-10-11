import { Page } from '@playwright/test';
import { CompleteQuizLocators } from '../locators/completequizLocators';

export class CompleteQuiz {

    locator: CompleteQuizLocators;

    constructor(private page: Page) {
        this.locator = new CompleteQuizLocators(page);
    }

    async startQuiz() {

        await this.locator.hairAssessmentLink.click();

        await this.locator.takeHairTestButton.click();
    }

    async answerQuizQuestions() {

        await this.locator.recessionOption.click();

        await this.locator.sameAsAlwaysOption.click();

        await this.locator.ageGroupOption.click();

        await this.locator.hairLossPatternOption.click();

        await this.locator.dandruffOption.click();

        await this.locator.dietOption.click();
    }

    async enterMobileNumber(
        mobileNumber: string
    ) {

        await this.locator.mobileNumberInput.fill(
            mobileNumber
        );

        await this.locator.mobileSubmitButton.click();
    }

    async enterUserDetails(
        firstName: string,
        lastName: string,
        email: string
    ) {

        await this.locator.firstNameInput.fill(
            firstName
        );

        await this.locator.lastNameInput.fill(
            lastName
        );

        await this.locator.emailInput.fill(
            email
        );

        await this.locator.signupButton.click();
    }

    async completeQuizFlow(
        mobileNumber: string,
        firstName: string,
        lastName: string,
        email: string
    ) {

        await this.startQuiz();

        await this.answerQuizQuestions();

        await this.enterMobileNumber(
            mobileNumber
        );

        await this.enterUserDetails(
            firstName,
            lastName,
            email
        );
    }
}