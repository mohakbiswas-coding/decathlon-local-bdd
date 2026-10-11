Feature: Decathlon India - Product specifications drawer

  @TC_32
  Scenario: TC_32 - Product specifications drawer

    Given Open the Product Details Page
    When Scroll to Product specifications
    And Click Product specifications
    Then Verify the right-side drawer heading is Product specifications
    When Close the drawer using X
