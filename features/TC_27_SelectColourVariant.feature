Feature: Decathlon India - Select colour variant

  @TC_27 @sanity @regression
  Scenario: TC_27 - Select colour variant

    Given Open the Product Details Page
    When Wait for the Colour section to be visible
    Then Verify multiple colour thumbnails are displayed
    When Record the current product URL
    And Record the current main product image
    And Click a different colour thumbnail and wait for the variant update
    Then Verify the main product image changes to the selected colour
    And Record whether the URL changed (separate colour variant)
    And Verify price and size controls remain visible
    And Verify the page does not display an application error
