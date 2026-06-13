# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AddToCart.spec.ts >> Add product to cart test @master @regression
- Location: tests\AddToCart.spec.ts:41:5

# Error details

```
TimeoutError: page.waitForSelector: Timeout 6000ms exceeded.
Call log:
  - waiting for locator('.alert-success') to be visible

```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import {ShoppingCartPage} from "../pages/ShopingCartPage" // Import ShoppingCartPage if needed
  3  | 
  4  | export class ProductPage {
  5  |     private readonly page: Page;
  6  | 
  7  |     // Locators using CSS selectors
  8  |     private readonly txtQuantity: Locator;
  9  |     private readonly btnAddToCart: Locator;
  10 |     private readonly cnfMsg: Locator;
  11 |     private readonly btnItems: Locator;
  12 |     private readonly lnkViewCart: Locator;
  13 | 
  14 |     constructor(page: Page) {
  15 |         this.page = page;
  16 | 
  17 |         // Initialize locators with CSS selectors
  18 |         this.txtQuantity = page.locator("input[name='quantity']");
  19 |         this.btnAddToCart = page.locator('#button-cart');
  20 |         this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
  21 |         this.btnItems = page.locator('#cart');
  22 |         this.lnkViewCart = page.locator("(//strong[normalize-space()='View Cart'])[1]");
  23 |     }
  24 | 
  25 |     /**
  26 |      * Sets the product quantity
  27 |      * @param qty - Quantity to set
  28 |      */
  29 |     async setQuantity(qty: string): Promise<void> {
  30 |         //await this.txtQuantity.fill('');
  31 |         await this.txtQuantity.fill(qty);
  32 |     }
  33 | 
  34 |     /**
  35 |      * Adds product to cart
  36 |      */
  37 |     async addToCart(): Promise<void> {
  38 |         await this.btnAddToCart.click();
> 39 |        await this.page.waitForSelector('.alert-success', { timeout: 6000 });
     |                        ^ TimeoutError: page.waitForSelector: Timeout 6000ms exceeded.
  40 |     }
  41 | 
  42 |     /**
  43 |      * Checks if confirmation message is visible
  44 |      * @returns Promise<boolean> - Returns true if message is visible
  45 |      */
  46 |    async isConfirmationMessageVisible(): Promise<boolean> {
  47 |     // ❌ Old code always returns true — locator object is never null
  48 |     // ✅ Actually check DOM visibility
  49 |     // try {
  50 |     //     await this.cnfMsg.waitFor({ state: 'visible', timeout: 5000 });
  51 |     //     return true;
  52 |     // } catch {
  53 |     //     return false;
  54 |     // }
  55 |     return await this.cnfMsg.isVisible();
  56 | }
  57 | 
  58 |     /**
  59 |      * Clicks on Items button to navigate to cart
  60 |      */
  61 |     async clickItemsToNavigateToCart(): Promise<void> {
  62 |         await this.btnItems.click();
  63 |     }
  64 | 
  65 |     // async clickviewcart():Promise<ShoppingCartPage>{
  66 |     // await this.lnkViewCart.waitFor({ state: 'visible', timeout: 10000 });
  67 |     //     await this.lnkViewCart.click();
  68 |     //     return new ShoppingCartPage(this.page);
  69 |     // }
  70 | 
  71 |      async clickviewcart():Promise<ShoppingCartPage>{
  72 |         await this.lnkViewCart.click();
  73 |         return new ShoppingCartPage(this.page);
  74 |     }
  75 | 
  76 | 
  77 | }
```