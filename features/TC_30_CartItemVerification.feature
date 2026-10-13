Feature: Decathlon India - Cart item verification

  @TC_30 @smoke @sanity @regression
  Scenario: TC_30 - Cart item verification

    Given Add the product to the cart with the chosen size
    When Click Go to cart
    And Wait for the Cart Items page to load
    Then Verify one expected cart item is displayed
    And Verify the product image is displayed
    And Verify the product name matches the selected PDP product
    And Verify the selected size in Cart matches the chosen size
    And Verify quantity is 1 for the newly added item
    And Verify the selling price
    And Verify the MRP
    And Verify the order summary shows the discount
    And Verify the total for quantity 1
    And Verify guest users see Login to Proceed
