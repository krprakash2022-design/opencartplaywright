import{test,expect} from "@playwright/test"
import { Homepage } from "../pages/Homepage"
import {TestConfig} from "../test.config"
import {loginpage} from "../pages/Loginpage"
import {Myaccount} from "../pages/MyAccountpage"
import {LogoutPage} from "../pages/Logout";


let config:TestConfig;
let homepage:Homepage;
let login:loginpage;
let myaccountpage:Myaccount;
let logout:LogoutPage;

test.beforeEach(async({page})=>{
        config=new TestConfig();
          await  page.goto(config.appurl)

         homepage= new Homepage(page)
       login = new loginpage(page);
       myaccountpage=new Myaccount(page);
       logout=new LogoutPage(page)

})

test.afterEach(async({page})=>{
       await page.close()
})


test("logout the page @master @regression",async()=>{
           await homepage.myaccount()
          await homepage.login()


          await  login.fillemai(config.email)
          await login.fillpassword(config.password)
          await login.clickloginbutton()

      expect(await myaccountpage.myaccountheading()).toBeTruthy()

    await myaccountpage.logout()

       expect(await logout.isContinueButtonVisible()).toBe(true);

      homepage=await logout.clickContinue()
      expect(await homepage.Homepage()).toBe(true);


})




