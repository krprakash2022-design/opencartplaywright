import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { loginpage } from "../pages/Loginpage";
import { Myaccount } from "../pages/MyAccountpage";
import { TestConfig } from "../test.config"



let config: TestConfig;
 let home: Homepage;
let login:loginpage;
let account:Myaccount;
test.beforeEach( async ({ page}) => {
   config = new TestConfig();
       await page.goto((config.appurl))
       home = new Homepage(page)
        login=new loginpage(page)
       account= new Myaccount(page)

})

test.afterEach(async({page})=>{
       await page.close()
})


test("login test @master @sanity @regression",async()=>{

   await home.myaccount()
  await home.login();

  await login.fillemai(config.email)
  await login.fillpassword(config.password);
  await login.clickloginbutton();


 const myaccounttext =await account.myaccountheading();
        expect(myaccounttext).toBeTruthy()

})
