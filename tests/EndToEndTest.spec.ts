/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 *
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect, Page } from '@playwright/test';
import { register } from "../pages/Registerpage"
import { Homepage } from '../pages/Homepage'
import { RandomDataGenerator } from '../utils/Randomdata'
import { TestConfig } from "../test.config"
import { LogoutPage } from '../pages/Logout'
import { loginpage } from '../pages/Loginpage'
import { Myaccount } from '../pages/MyAccountpage'
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShopingCartPage'
// import { CheckoutPage } from '../pages/CheckoutPage';

// This is the main test block that runs the entire flow
test('execute end-to-end test flow @end-to-end', async ({ page }) => {
    const config = new TestConfig();

    // Navigate to the application's home page
    await page.goto(config.appurl);

    // Step 1: Register a new account and capture the generated email
    let registeredEmail: string = await performRegistration(page);
    console.log("✅ Registration is completed!");

    // Step 2: Logout after successful registration
    await performLogout(page);
    console.log("✅ Logout is completed!");

    // Step 3: Login with the registered email
    await performLogin(page, registeredEmail);
    console.log("✅ Login is completed!");

    // Step 4: Search for a product and add it to the cart
    await addProductToCart(page);
    console.log("✅ Product added to cart!");

    // Step 5: Verify the contents of the shopping cart
    await verifyShoppingCart(page);
    console.log("✅ Shopping cart verification completed!");

    // Step 6: Perform checkout (skipped for demo site)
    // await performCheckout(page);
});


// Function to register a new user account
async function performRegistration(page: Page): Promise<string> {
    const homePage = new Homepage(page);
    await homePage.myaccount()       // Click "My Account" link
    await homePage.register()       // Click "Register" option

    const registrationPage = new register(page);

    // Fill in random user details
    await registrationPage.fillfirstname(RandomDataGenerator.randomFirstName());
    await registrationPage.filllastname(RandomDataGenerator.randomLastName())

    let email: string = RandomDataGenerator.randomEmail()
    await registrationPage.fillemail(email)
    await registrationPage.filltelephone(RandomDataGenerator.randomPhoneNumber())

    await registrationPage.fillpassword("Ravi6303@")
    await registrationPage.fillconfirmpassword("Ravi6303@")

    await registrationPage.checkprivacy()  // Accept the privacy policy
    await registrationPage.clickcontinue()     // Submit the registration form

    // Validate that the registration was successful
    const confirmationMsg = await registrationPage.confirmmessage()
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email; // Return the email for later use in login
}


// Function to log out the current user
async function performLogout(page: Page) {
    const myAccountPage = new Myaccount(page);
     await myAccountPage.logout()

    // Ensure the "Continue" button is visible
        const logout1= new LogoutPage(page)
       expect(await logout1.isContinueButtonVisible()).toBe(true);

    // Click "Continue" and verify redirection to HomePage
         const home:Homepage= await logout1.clickContinue();
            expect(await home.Homepage()).toBe(true)
}


// Function to log in using the registered email
async function performLogin(page: Page, email: string) {
    const config = new TestConfig();
    await page.goto(config.appurl);  // Reload home page

    const homePage = new Homepage(page);
    await homePage.myaccount();
    await homePage.login();

    const loginPage = new loginpage(page);
    await loginPage.fillemai("krprakash2022@gmail.com")  // Use the registered credentials
   await loginPage.fillpassword("Ravi6303@")

    // Verify login by checking My Account page
    const myAccountPage = new Myaccount(page);
    expect(await myAccountPage.myaccountheading()).toBeTruthy();
}


// Function to search for a product and add it to cart
async function addProductToCart(page: Page) {
    const homePage = new Homepage(page);

    const config = new TestConfig();
    const productName: string = config.productName;
    const productQuantity: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.searchbutton1()  // Click on search button

    const searchResultsPage = new SearchResultsPage(page);

    // Validate search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Validate that the desired product exists in the results
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    // Select product and set quantity
    await searchResultsPage.selectProduct(productName);

          const productPage =new ProductPage(page);
         await productPage.setQuantity(config.productQuantity)
        
        await productPage.addToCart();
    //await productPage?.setQuantity(productQuantity);
   // await productPage?.addToCart();  // Add product to shopping cart

    await page.waitForTimeout(3000); // Wait to simulate user delay

    // Confirm product was added
   // expect(await productPage?.isConfirmationMessageVisible()).toBe(true);
  expect(await productPage.isConfirmationMessageVisible()).toBe(true);
     console.log("✅ Product added to cart!");
 await productPage.clickItemsToNavigateToCart();
await productPage.clickviewcart()
}


// Function to verify the shopping cart details
async function verifyShoppingCart(page: Page) {
    const productPage = new ProductPage(page);

    // Navigate to shopping cart from product page
    await productPage.clickItemsToNavigateToCart();
    const shoppingCartPage :ShoppingCartPage= await productPage.clickviewcart()

    console.log("🛒 Navigated to shopping cart!");

    // const shoppingCartPage =new ShoppingCartPage(page)
    const config = new TestConfig();

    // Validate that total price is correct (based on config)
    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}