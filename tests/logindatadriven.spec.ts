import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { loginpage } from "../pages/Loginpage";
import { Myaccount } from "../pages/MyAccountpage";
import { TestConfig } from "../test.config"
//import { dataproviding }  from "../utils/dataprovide1"
import path from "path";
import { dataproviding } from "../utils/dataprovide1";



//load json data work with json data
// const jsonpath1="testdata/logindata.json"
//   const jsonTestData =dataproviding.getdatafromjson(jsonpath1)


//   for(let data of jsonTestData ){
// test(`Login Test with JSON Data: ${data.testName} @datadriven`,async({page})=>{
//         const config=new TestConfig()
//      await page.goto(  config.appurl)

//     const home1=new Homepage(page)
//    await home1.myaccount()
//   await home1.login();

//           const login1= new loginpage(page)
//          await login1.fillemai(data.email);
//         await login1.fillpassword(data.password)
//        await login1.clickloginbutton();

//        if(data.expected.toLowerCase() === 'success'){
//                        const account= new Myaccount(page);
//                     const loggedin= await  account.myaccountheading();
//                     expect(loggedin).toBeTruthy()


//        }else {

//             const errorMessage = await login1.errorloginmessage()

//             expect(errorMessage).toBe(
//                 'Warning: No match for E-Mail Address and/or Password.'
//             );
//         }


// })
//   }



////work with csv data
const csvpath1 = path.join(process.cwd(), "testdata", "logindata.csv");
const csvTestData = dataproviding.gettestdatafromcsv(csvpath1);


  for(let data of csvTestData ){
test(`Login Test with csv Data: ${data.testName} @datadriven`,async({page})=>{
        const config=new TestConfig()
     await page.goto(  config.appurl)

    const home1=new Homepage(page)
   await home1.myaccount()
  await home1.login();

          const login1= new loginpage(page)
         await login1.fillemai(data.email);
        await login1.fillpassword(data.password)
       await login1.clickloginbutton();

       if(data.expected.toLowerCase() === 'success'){
                       const account= new Myaccount(page);
                    const loggedin= await  account.myaccountheading();
                    expect(loggedin).toBeTruthy()


       }else {

            const errorMessage = await login1.errorloginmessage()

            expect(errorMessage).toBe(
                'Warning: No match for E-Mail Address and/or Password.'
            );
        }


})
  }