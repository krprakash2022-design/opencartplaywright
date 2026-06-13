import { Page, expect, Locator } from "@playwright/test";

export class register {

    private readonly page: Page;
    private readonly firstname: Locator;
    private readonly lastname: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmpasword: Locator;
    private readonly radiobutton: Locator;
    private readonly privacepolicy: Locator
    private readonly continue:Locator;
    private readonly confirmmess: Locator


    constructor(page:Page){
            this.page=page;
            this.firstname=page.locator("#input-firstname");
            this.lastname=page.locator('#input-lastname');
            this.email=page.locator('[name="email"]');
            this.telephone=page.locator('[id="input-telephone"]');
            this.password=page.locator('[id="input-telephone"]');
            this.password=page.locator('input[id="input-password"]');
            this.confirmpasword=page.locator('#input-confirm');
            this.radiobutton=page.locator('//label[text()="No"]');
            this.privacepolicy=page.locator('input[type="checkbox"]');
            this.continue=page.locator('input[value="Continue"]')
            this.confirmmess=page.locator("//h1[text()='Your Account Has Been Created!']")

    }


    async fillfirstname(name:string):Promise<void>{
       await this.firstname.fill(name);
    }


    async filllastname(lastname:string):Promise<void>{
       await this.lastname.fill(lastname)
    }


    async fillemail(email:string):Promise<void>{
      await  this.email.fill(email)
    }


    async filltelephone(telephone:string):Promise<void>{
       await this.telephone.fill(telephone)
    }

    async fillpassword(password:string):Promise<void>{
        await this.password.fill(password);
    }

    async fillconfirmpassword(confirmpwd:string):Promise<void>{
       await this.confirmpasword.fill(confirmpwd)
    }

    async checkradiobutton():Promise<void>{
       await this.radiobutton.check()
    }

    async checkprivacy():Promise<void>{
       await this.privacepolicy.check()
    }
    async clickcontinue():Promise<void>{
        await this.continue.click();
    }



    async confirmmessage():Promise<string>{
            return await this.confirmmess.innerText();
    }




}