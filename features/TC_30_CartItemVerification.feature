Feature: Decathlon India - Cart item verification

  @TC_30 @smoke @sanity @regression
  Scenario Outline: TC_30 - Cart item verification for "<productName>" size "<size>"

    Given Add the product to the cart with the chosen size "<size>"
    When Click Go to cart
    And Wait for the Cart Items page to load
    Then Verify one expected cart item of brand "<brand>" is displayed
    And Verify the product image is displayed
    And Verify the product name matches "<productName>"
    And Verify the selected size in Cart matches the chosen size "<size>"
    And Verify quantity is "<quantity>" for the newly added item
    And Verify the selling price "<selling>"
    And Verify the MRP "<mrp>"
    And Verify the order summary shows the discount "<discount>"
    And Verify the total "<total>"
    And Verify guest users see Login to Proceed

    Examples:
      | size | brand  | productName                    | quantity | selling | mrp  | discount | total |
      | 6.5  | KIPRUN | Kiprun Kipcore black and white | 1        | 4999    | 6499 | 1500     | 4999  |