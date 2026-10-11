Feature: Decathlon India - Product details drawer

  @TC_31
  Scenario: TC_31 - Product details drawer

    Given Open the Product Details Page
    When Scroll to the information section
    Then Verify Product details is visible
    When Click Product details
    Then Verify a right-side drawer opens
    And Verify the drawer heading is Product details
    And Verify the product ID is displayed in the drawer
    And Verify the drawer close X is visible
    When Click the close X
    Then Verify the drawer closes and the page becomes active
