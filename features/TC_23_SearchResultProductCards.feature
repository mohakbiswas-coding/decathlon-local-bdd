Feature: Decathlon India - Search-result product cards

  @TC_23 @sanity
  Scenario: TC_23 - Search-result product cards

    Given Open a Search results page
    When Wait for the product grid to be visible
    Then Verify the product cards: image, name, price, wishlist, add to cart (+ optional info)
