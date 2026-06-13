import {Page,expect,Locator} from "@playwright/test";


export class Homepage{

    private readonly page:Page;

    private readonly linkmyaccount:Locator;
    private readonly linkregister:Locator;
    private readonly linklogin:Locator;
    private readonly searchbox:Locator;
    private readonly searchbutton:Locator;



    constructor(page:Page){
        this.page=page;
        this.linkmyaccount=page.locator('//span[text()="My Account"]');
        this.linkregister=page.locator('//ul[@class="dropdown-menu dropdown-menu-right"] //a[text()="Register"]')
        this.linklogin=page.locator('//ul[@class="dropdown-menu dropdown-menu-right"] //a[text()="Login"]')
        this.searchbox=page.locator('[name="search"]')
        this.searchbutton=page.locator('button[class="btn btn-default btn-lg"]')
    }

    async Homepage(){
       const title:string=await this.page.title()
       if(title){
        return true;
       }
       return false;
    }



    async myaccount(){
        try{
       await this.linkmyaccount.click();
        }catch(error){
            console.log("exception accured while clicking'my account':${error}")
            throw error;
        }
    }


    async register(){
        try{
           await this.linkregister.click();
        }catch(error){
            console.log("exception accured while clicking 'register':${error}")
            throw error;

        }

    }

    async login(){
        try{
            await this.linklogin.click();
        }catch(error){
            console.log("exception accured while clicking the 'login':${error}")
            throw error;
        }
    }


    async search(){
        try{
            await this.searchbox.click();
        }catch(error){
            console.log("exception accured while clicking the 'searchbox':${error}")
            throw error;
        }
    }

    async searchbutton1(){
        try{
            await this.searchbutton.click();
        }catch(error){
            console.log("exception accured while clicking the 'search button':${error}")
            throw error;
        }
    }

    async enterProductName(product:string){
       await this.searchbox.fill(product)
    }





}