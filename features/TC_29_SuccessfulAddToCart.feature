Feature: Decathlon India - Successful Add to Cart

  @TC_29 @smoke @sanity @regression
  Scenario Outline: TC_29 - Successful Add to Cart with size "<size>"

    Given Open a valid in-stock Product Details Page
    When Wait for the size options and Add to cart button
    And Record the current Cart badge count
    And Select the available size "<size>"
    Then Verify the low-stock label "<lowStockLabel>" is displayed for the selected size when present
    When Click Add to cart and wait for the add operation to complete
    Then Verify Add to cart changes to Go to cart
    And Verify the Cart badge increases by one
    And Verify no size-validation message "Please select a size" is displayed

    Examples:
      | size | lowStockLabel |
      | 6.5  | 3 left        |