import {Page,expect,Locator} from "@playwright/test"

export class Myaccount{

    private readonly page:Page;

    private readonly headingaccount:Locator;
    private readonly logoutbutton:Locator;


    constructor (page:Page){
        this.page=page;
        this.headingaccount=page.locator('//h2[text()="My Account"]')
        this.logoutbutton=page.locator('//a[text()="Logout"]').nth(1);
    }


    async myaccountheading():Promise<boolean>{
        try{
          const visible= await this.headingaccount.isVisible()
          return true;
        }catch(error){
                console.log(`my account is not visble:${error}`)
                return false;
        }
    }

    async logout():Promise<void>{
      await  this.logoutbutton.click()
    }




}
