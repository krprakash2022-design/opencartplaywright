import { parse } from "csv-parse/sync";
import fs from "fs";

export class dataproviding {
//   static getdatafromjson(filepath: string): any {
////  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
//     return data;
//   }

 static gettestdatafromcsv(filepath: string): any[] {
    const data = parse(fs.readFileSync(filepath, "utf-8"), {
      columns: true,
      skip_empty_lines: true,
    });
    return data;
}
}