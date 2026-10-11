Feature: Decathlon India - Invalid delivery PIN code

  @TC_33
  Scenario: TC_33 - Invalid delivery PIN code

    Given Open the Product Details Page
    When Locate the delivery location or PIN-code area
    And Open Select delivery location
    Then Verify the right-side delivery drawer opens
    And Verify the login message is displayed for a guest user
    When Locate the Enter pincode field, clear it and enter the invalid PIN code
    And Click the arrow submit button
    Then Wait for validation and verify the red error message appears
    When Close the delivery drawer using X
