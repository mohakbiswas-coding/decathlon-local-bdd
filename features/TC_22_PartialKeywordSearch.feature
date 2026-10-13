Feature: Decathlon India - Partial keyword search

  @TC_22 @smoke @sanity @regression
  Scenario Outline: TC_22 - Partial keyword search for "<partialKeyword>"

    Given Launch the Decathlon website
    When Click the Search field
    Then Verify the Search overlay opens
    When Click inside the Search input
    And Enter the partial keyword "<partialKeyword>"
    Then Verify the keyword "<partialKeyword>" remains visible in the input
    And Verify the clear X control appears in the input
    And Observe the available discovery or suggestion content
    When Press Enter to submit the partial keyword
    And Wait for the Search results page to load
    Then Verify the URL contains the search query parameter "<queryParam>"
    And Verify at least <cardsToCheck> product results are displayed

    Examples:
      | partialKeyword | queryParam | cardsToCheck |
      | Cy             | query=Cy   | 2            |
      | Run            | query=Run  | 2            |
      | Bac            | query=Bac  | 2            |