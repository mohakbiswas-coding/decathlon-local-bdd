Feature: Decathlon India - Unrelated keyword handling

  @TC_24 @regression
  Scenario Outline: TC_24 - Unrelated keyword handling for "<unrelatedKeyword>"

    Given Launch the Decathlon website
    When Click the Search field
    And Clear any existing Search text
    And Enter the unrelated keyword "<unrelatedKeyword>"
    And Press Enter to submit the keyword
    Then Verify the URL contains the submitted query "<unrelatedKeyword>"
    And Verify the results heading shows "<expectedHeading>"
    And Record the result count and inspect the first product names

    Examples:
      | unrelatedKeyword               | expectedHeading             |
      | mklfmsmclkfjskhlkhjs8989898978 | Sorry, No Results Found...! |