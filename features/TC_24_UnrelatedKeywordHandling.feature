Feature: Decathlon India - Unrelated keyword handling

  @TC_24 @regression
  Scenario: TC_24 - Unrelated keyword handling

    Given Launch the Decathlon website
    When Click the Search field
    And Clear any existing Search text
    And Enter the unrelated keyword
    And Press Enter to submit the keyword
    Then Verify the URL contains the submitted query
    And Verify the results heading represents the submitted keyword
    And Record the result count and inspect the first product names
