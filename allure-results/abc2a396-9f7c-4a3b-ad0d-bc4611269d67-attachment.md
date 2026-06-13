# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AddToCart.spec.ts >> Add product to cart test @master @regression
- Location: tests\AddToCart.spec.ts:41:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Add Product to Cart
  3  |  * * Tags: @master @regression
  4  |  * * Steps:
  5  |  * 1. Navigate to application URL
  6  |  * 2. Enter an existing product name in the search box
  7  |  * 3. Click the search button
  8  |  * 4. Verify the product appears in the search results
  9  |  * 5. Select the product
  10 |  * 6. Set quantity
  11 |  * 7. Add the product to the cart
  12 |  * 8. Verify the success message
  13 |  */
  14 | 
  15 | import { test, expect } from '@playwright/test';
  16 | import { TestConfig } from "../test.config"
  17 | import {  Homepage} from '../pages/Homepage'
  18 | import { SearchResultsPage } from '../pages/SearchResultsPage';
  19 | import { ProductPage } from '../pages/ProductPage';
  20 | 
  21 | // Shared instances
  22 | let config: TestConfig;
  23 | let homePage: Homepage;
  24 | let searchResultsPage: SearchResultsPage;
  25 | let productPage: ProductPage;
  26 | 
  27 | test.beforeEach(async ({ page }) => {
  28 |     config = new TestConfig(); // Load test configuration
  29 |     await page.goto(config.appurl); // Step 1: Open application URL
  30 | 
  31 |     // Initialize page objects
  32 |     homePage = new Homepage(page);
  33 |     searchResultsPage = new SearchResultsPage(page);
  34 |     productPage = new ProductPage(page);
  35 | });
  36 | 
  37 | test.afterEach(async ({ page }) => {
  38 |     await page.close(); // Optional cleanup
  39 | });
  40 | 
  41 | test('Add product to cart test @master @regression', async ({ page }) => {
  42 |     // Step 2: Enter product name in search box
  43 |     await homePage.enterProductName(config.productName);
  44 | 
  45 |     // Step 3: Click the search button
  46 |     await homePage.searchbutton1()
  47 | 
  48 |     // Step 4: Verify search results page is displayed
  49 |     expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
  50 | 
  51 |     // Step 5: Verify that the product exists in the results
  52 |     const productName = config.productName;
  53 |     expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();
  54 | 
  55 |     // Step 6-7-8: Select product -> Set quantity -> Add to cart -> Verify confirmation
  56 |     if (await searchResultsPage.isProductExist(productName)) {
  57 |         // //productPage = await searchResultsPage.selectProduct(productName);
  58 |         await searchResultsPage.selectProduct(productName);
  59 |         await productPage.setQuantity(config.productQuantity); // Set quantity
  60 |         await productPage.addToCart();                         // Add to cart
  61 |     }
  62 | 
  63 |     // Step 8: Assert success message is visible
> 64 |     expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
     |                                                              ^ Error: expect(received).toBeTruthy()
  65 |            await productPage.clickviewcart();
  66 | 
  67 | });
```