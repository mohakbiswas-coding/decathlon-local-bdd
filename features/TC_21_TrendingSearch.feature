Feature: Decathlon India - Trending search

  @TC_21 @sanity @regression
  Scenario: TC_21 - Trending search

    Given Launch the Decathlon website
    When Click the Search field
    Then Verify the Search overlay opens
    When Locate the Trending searches section
    And Record one currently displayed trending term
    And Click the recorded trending term
    And Wait for navigation or result loading to finish
    Then Verify a Search results page is displayed
    And Verify the submitted term is in the URL, field, or heading
    And Verify at least one product card is visible
    And Verify a visible card contains an image, product name, and selling price
    And Verify the page remains usable without a blocked loader
