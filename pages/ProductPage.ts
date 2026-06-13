import { Page, Locator, expect } from '@playwright/test';
import {ShoppingCartPage} from "../pages/ShopingCartPage" // Import ShoppingCartPage if needed

export class ProductPage {
    private readonly page: Page;

    // Locators using CSS selectors
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtQuantity = page.locator("input[name='quantity']");
        this.btnAddToCart = page.locator('#button-cart');
        this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
        this.btnItems = page.locator('#cart');
        this.lnkViewCart = page.locator("(//strong[normalize-space()='View Cart'])[1]");
    }

    /**
     * Sets the product quantity
     * @param qty - Quantity to set
     */
    async setQuantity(qty: string): Promise<void> {
        //await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    /**
     * Adds product to cart
     */
    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
      // await this.page.waitForSelector('.alert-success', { timeout: 6000 });
    }

    /**
     * Checks if confirmation message is visible
     * @returns Promise<boolean> - Returns true if message is visible
     */
   async isConfirmationMessageVisible(): Promise<boolean> {
    // ❌ Old code always returns true — locator object is never null
    // ✅ Actually check DOM visibility
    try {
        await this.cnfMsg.waitFor({ state: 'visible', timeout: 5000 });
        return true;
    } catch {
        return false;
    }
   
}

    /**
     * Clicks on Items button to navigate to cart
     */
    async clickItemsToNavigateToCart(): Promise<void> {
        await this.btnItems.click();
    }

    // async clickviewcart():Promise<ShoppingCartPage>{
    // await this.lnkViewCart.waitFor({ state: 'visible', timeout: 10000 });
    //     await this.lnkViewCart.click();
    //     return new ShoppingCartPage(this.page);
    // }

     async clickviewcart(){
        await this.lnkViewCart.click();
      //  return new ShoppingCartPage(this.page);
    }


}