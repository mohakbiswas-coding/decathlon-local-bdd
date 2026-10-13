Feature: Decathlon India - End-to-end product purchase flow (guest checkout)

  @TC_35 @smoke @regression
  Scenario: TC_35 - End-to-end product purchase flow (guest checkout)

    Given Launch the Decathlon homepage
    When Wait for the header and open Search
    Then Verify the Search overlay and input are visible
    When Enter the KIPRUN product keyword
    And Submit the product search
    Then Wait for results and verify the submitted query
    When Select the matching KIPRUN product card and open its PDP
    Then Verify the selected product identity, image, price, and size options
    When Record the Cart badge and select size 6.5
    And Add the selected product to the Cart
    Then Verify add-to-cart success and the Cart badge increment
    When Open the Cart page
    Then Verify the Cart contains the selected product and size
    And Verify order totals and that guest checkout requires login
    When Select Login to Proceed and verify the authentication gate appears
