Feature: Decathlon India - Open PDP from Search

  @TC_25 @smoke @regression
  Scenario Outline: TC_25 - Open PDP from Search for "<searchKeyword>"

    Given Open a Search results page for "<searchKeyword>"
    When Wait for product cards to load
    And Select one stable in-stock product card (the first card)
    And Record the visible product name
    And Click the product name
    And Wait for the Product Details Page to load
    Then Verify the URL contains a product path
    And Verify the PDP displays a brand and a product name
    And Compare the displayed product with the selected Search result
    And Verify the selling price and main product image are visible

    Examples:
      | searchKeyword |
      | Shoes for men |