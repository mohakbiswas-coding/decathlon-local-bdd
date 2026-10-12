Feature: Decathlon India - Partial keyword search

  @TC_22 @smoke
  Scenario: TC_22 - Partial keyword search

    Given Launch the Decathlon website
    When Click the Search field
    Then Verify the Search overlay opens
    When Click inside the Search input
    And Enter the partial keyword
    Then Verify the keyword remains visible in the input
    And Verify the clear X control appears in the input
    And Observe the available discovery or suggestion content
    When Press Enter to submit the partial keyword
    And Wait for the Search results page to load
    Then Verify the URL contains a search query parameter
    And Verify product results are displayed
