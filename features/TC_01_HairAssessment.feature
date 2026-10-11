Feature: Hair Assessment Questionnaire

  Scenario: Verify Hair Assessment Questionnaire Display

    Given user opens the hair assessment page
    When the hair assessment page loads completely
    Then the hair assessment URL should contain "hair-form"
    And the questionnaire heading should be displayed
    And the questionnaire instruction should be displayed
