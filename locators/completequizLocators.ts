import { Page, Locator } from '@playwright/test';

export class CompleteQuizLocators {

    readonly hairAssessmentLink: Locator;
    readonly takeHairTestButton: Locator;
    readonly recessionOption: Locator;
    readonly sameAsAlwaysOption: Locator;
    readonly ageGroupOption: Locator;
    readonly hairLossPatternOption: Locator;
    readonly dandruffOption: Locator;
    readonly dietOption: Locator;
    readonly mobileNumberInput: Locator;
    readonly mobileSubmitButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    constructor(private page: Page) {

        this.hairAssessmentLink =
            this.page.getByRole('link', {
                name: 'Hair Assessment'
            });

        this.takeHairTestButton =
            this.page
                .getByTestId('widget-banner-hero-image-desktop')
                .getByRole('link')
                .first();

        this.recessionOption =
            this.page.getByRole('img', {
                name: 'Slight recession at temples'
            });

        this.sameAsAlwaysOption =
            this.page.getByRole('img', {
                name: 'Same as always, no change'
            });

        this.ageGroupOption =
            this.page.locator('div')
                .filter({ hasText: /^18-25$/ })
                .first();

        this.hairLossPatternOption =
            this.page.locator('div')
                .filter({ hasText: /^Both sides$/ })
                .first();

        this.dandruffOption =
            this.page.locator('div')
                .filter({ hasText: /^I have flaky or sticky dandruff$/ })
                .first();

        this.dietOption =
            this.page.locator('div')
                .filter({ hasText: /^My diet is balanced and consistent$/ })
                .first();

        this.mobileNumberInput =
            this.page.getByTestId('login-phone-input');

        this.mobileSubmitButton =
            this.page.getByTestId('login-phone-submit');

        this.firstNameInput =
            this.page.getByTestId('signup-first-name-input');

        this.lastNameInput =
            this.page.getByTestId('signup-last-name-input');

        this.emailInput =
            this.page.getByTestId('signup-email-input');

        this.signupButton =
            this.page.getByTestId('signup-submit');
    }
}