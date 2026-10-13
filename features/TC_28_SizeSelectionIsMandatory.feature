Feature: Decathlon India - Size selection is mandatory

  @TC_28 @sanity @regression
  Scenario Outline: TC_28 - Size selection is mandatory with message "<sizeError>"

    Given Open a valid size-based Product Details Page
    When Wait for the Select size section to be visible
    And Record the current Cart badge count
    And Click Add to cart without selecting a size
    Then Verify the red message "Please select a size" appears
    And Verify size options remain available
    And Verify no size is automatically selected
    And Verify the Cart badge does not increase
    And Verify the shopper remains on the Product Details Page