Feature: Decathlon India - Core product information

  @TC_26 @sanity @regression
  Scenario Outline: TC_26 - Core product information for "<productName>"

    Given Open the valid product URL for the product ID
    When Wait for the Product Details Page to load
    Then Verify breadcrumbs "<breadcrumbs>" are visible
    And Verify the brand "<brand>" is displayed
    And Verify the product name "<productName>" is displayed
    And Verify the product ID "<productId>" is displayed
    And Verify the main product image is visible
    And Verify the selling price is displayed
    And Verify MRP is displayed
    And Verify the rating value and review link are visible
    And Verify colour options are displayed
    And Verify size options and Add to cart are displayed

    Examples:
      | breadcrumbs                                 | brand  | productName                    | productId |
      | Sports Footwear > Shoes > Running Shoes     | KIPRUN | Kiprun Kipcore black and white | 8873071   |