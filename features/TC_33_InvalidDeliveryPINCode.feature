Feature: Decathlon India - Invalid delivery PIN code

  @TC_33 @regression
  Scenario Outline: TC_33 - Invalid delivery PIN code "<invalidPincode>"

    Given Open the Product Details Page
    When Locate the delivery location or PIN-code area
    And Open Select delivery location
    Then Verify the right-side delivery drawer opens
    And Verify the login message is displayed for a guest user
    When Locate the Enter pincode field, clear it and enter the invalid PIN code "<invalidPincode>"
    And Click the arrow submit button
    Then Wait for validation and verify the red error message "<errorMessage>" appears
    When Close the delivery drawer using X

    Examples:
      | invalidPincode | errorMessage                             |
      | 723000         | Unable to find location for this pincode |