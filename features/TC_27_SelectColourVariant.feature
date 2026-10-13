Feature: Decathlon India - Select colour variant

  @TC_27 @sanity @regression
  Scenario Outline: TC_27 - Select colour variant using thumbnail <thumbnailToSelect>

    Given Open the Product Details Page
    When Wait for the Colour section to be visible
    Then Verify at least <minimumThumbnails> colour thumbnails are displayed
    When Record the current product URL
    And Record the current main product image
    And Click colour thumbnail <thumbnailToSelect> and wait for the variant update
    Then Verify the main product image changes to the selected colour
    And Record whether the URL changed (separate colour variant)
    And Verify price and size controls remain visible
    And Verify the page does not display an application error

    Examples:
      | minimumThumbnails | thumbnailToSelect |
      | 1                 | 1                 |