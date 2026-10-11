Feature: Product Navigation and Cart

  Scenario: Verify Product Navigation and Cart Addition

    Given user launches Man Matters application

    When user clicks All Products

    Then products page should be displayed

    When user selects Hair category

    And user opens first product

    Then product details page should be displayed

    When user adds product to cart

    Then cart action should complete successfully