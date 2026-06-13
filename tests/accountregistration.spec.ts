import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { register } from "../pages/Registerpage"
import { TestConfig } from "../test.config"
import { RandomDataGenerator } from "../utils/Randomdata"



let home: Homepage;
let registerpage: register;
let config: TestConfig;

test.beforeEach("this will run multipul before run test", async ({ page }) => {
    config = new TestConfig();
    await page.goto((config.appurl))
    home = new Homepage(page)
    registerpage = new register(page)
    

})

test.afterEach("aftereach", async ({ page }) => {
    await page.close()
})






test("user registration test", async ({ }) => {

    //  const config=new TestConfig();
    //  await page.goto( (config.appurl))///navigate to application url

    //const home= new Homepage(page)
    await home.myaccount();
    await home.register();
   await home.login();

    //  const registerpage=new register(page)
    await registerpage.fillfirstname(RandomDataGenerator.randomFirstName())
    await registerpage.filllastname(RandomDataGenerator.randomLastName())
    await registerpage.fillemail(RandomDataGenerator.randomEmail())
    await registerpage.filltelephone(RandomDataGenerator.randomPhoneNumber())
    const password = RandomDataGenerator.getrandompassword();
    await registerpage.fillpassword(password)
    await registerpage.fillconfirmpassword(password)
    await registerpage.checkprivacy();
    await registerpage.clickcontinue();
    const text = await registerpage.confirmmessage();
    expect(text).toContain('Your Account Has Been Created!')

})