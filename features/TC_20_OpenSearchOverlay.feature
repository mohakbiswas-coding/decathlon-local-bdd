Feature: Decathlon India - Open search overlay

  @TC_20 @sanity
  Scenario: TC_20 - Open search overlay

    Given Launch the Decathlon website
    When Wait until the homepage header is visible
    And Locate the Search field in the header
    And Click the Search field
    Then Verify the background page remains visible
    And Verify the Search overlay opens
    And Verify the Search input is visible in the overlay
    And Verify Trending searches is displayed when available
    And Verify Recommended For You or Bestsellers is displayed when available
    And Verify the close control is visible
    When Click the close control
    Then Verify the Search overlay closes
