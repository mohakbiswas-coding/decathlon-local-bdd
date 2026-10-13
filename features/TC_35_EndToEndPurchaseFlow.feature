Feature: Decathlon India - End-to-end product purchase flow (guest checkout)

  @TC_35 @smoke @regression
  Scenario Outline: TC_35 - End-to-end product purchase flow (guest checkout) for "<searchKeyword>"

    Given Launch the Decathlon homepage
    When Wait for the header and open Search
    Then Verify the Search overlay and input are visible
    When Enter the product keyword "<searchKeyword>"
    And Submit the product search
    Then Wait for results and verify the submitted query "<searchKeyword>"
    When Select the "<brand>" product card "<searchName>" with ID "<productId>" and open its PDP
    Then Verify the selected product "<brand>" "<productName>" with ID "<productId>" shows image, price, and size options
    When Record the Cart badge and select size "<size>" with low-stock label "<lowStockLabel>"
    And Add the selected product to the Cart
    Then Verify add-to-cart success and the Cart badge increment
    When Open the Cart page
    Then Verify the Cart contains "<brand>" "<productName>" in size "<size>" with quantity "<quantity>"
    And Verify order totals "<selling>" "<mrp>" "<discount>" "<total>" and that guest checkout requires login
    When Select Login to Proceed and verify the authentication gate appears

    Examples:
      | searchKeyword  | brand  | searchName     | productId | productName                    | size | lowStockLabel | quantity | selling | mrp  | discount | total |
      | Kiprun Kipcore | KIPRUN | Kiprun Kipcore | 8873071   | Kiprun Kipcore black and white | 6.5  | 3 left        | 1        | 4999    | 6499 | 1500     | 4999  |