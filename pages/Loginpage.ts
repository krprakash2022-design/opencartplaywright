import {Page,Locator,expect} from "@playwright/test"

export class loginpage{

    private readonly page:Page;

    private readonly emailbox:Locator;
    private readonly passwordbox:Locator;
    private readonly loginbutton:Locator;
    private readonly loginerroemessage:Locator;



    constructor(page:Page){
        this.page=page;

        this.emailbox=page.locator('#input-email')
        this.passwordbox=page.locator('#input-password')
        this.loginbutton=page.locator('input[value="Login"]')
        this.loginerroemessage=page.locator('[class="alert alert-danger alert-dismissible"] ')

    }

    async fillemai(email:string):Promise<void>{
           await this.emailbox.fill(email)
    }

    async fillpassword(password:string):Promise<void>{
        await this.passwordbox.fill(password)
    }
    
    async clickloginbutton():Promise<void>{
       await this.loginbutton.click();
    }

    async errorloginmessage():Promise<string>{
        return await this.loginerroemessage.innerText()
    }


}
