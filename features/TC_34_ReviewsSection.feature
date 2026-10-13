Feature: Decathlon India - Reviews section

  @TC_34 @regression
  Scenario Outline: TC_34 - Reviews section with rating "<overallRating>"

    Given Open the Product Details Page
    When Scroll to the Reviews section
    Then Verify the Reviews heading "<heading>" is visible
    And Verify the overall rating "<overallRating>" is displayed
    And Verify the review count link is displayed
    And Verify the star-rating distribution is visible
    And Verify at least one written review title is displayed
    And Verify review metadata is displayed where available
    And Verify at least <entriesToCheck> review entries can be seen
    And Verify the View all link "<viewAllText>" is visible
    And Verify the first <entriesToCheck> reviews remain readable without overlapping content

    Examples:
      | heading | overallRating | entriesToCheck | viewAllText      |
      | Reviews | 4.7           | 2              | View all reviews |