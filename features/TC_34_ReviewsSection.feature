Feature: Decathlon India - Reviews section

  @TC_34 @regression
  Scenario: TC_34 - Reviews section

    Given Open the Product Details Page
    When Scroll to the Reviews section
    Then Verify the Reviews heading is visible
    And Verify the overall rating is displayed
    And Verify the review count link is displayed
    And Verify the star-rating distribution is visible
    And Verify at least one written review title is displayed
    And Verify review metadata is displayed where available
    And Verify multiple review entries can be seen
    And Verify View all reviews is visible
    And Verify the section remains readable without overlapping content
