Feature: Decathlon India - Search-result product cards

  @TC_23 @sanity @regression
  Scenario Outline: TC_23 - Search-result product cards for "<searchKeyword>"

    Given Open a Search results page for "<searchKeyword>"
    When Wait for the product grid to be visible
    Then Verify the first <cardsToCheck> product cards: image, name, price, wishlist, add to cart (+ optional info)

    Examples:
      | searchKeyword | cardsToCheck |
      | Shoes for men | 2            |
      | Cycle         | 2            |
      | Gloves        | 2            |