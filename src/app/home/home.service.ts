import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor() {}
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = csvRecordsArray[i].split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: any = {};
        csvRecord.reference = curruntRecord[0].trim();
        csvRecord.accountNumber = curruntRecord[1].trim();
        csvRecord.description = curruntRecord[2].trim();
        csvRecord.startBalance = curruntRecord[3].trim();
        csvRecord.mutation = curruntRecord[4].trim();
        csvRecord.endBalance = curruntRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }
  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }
  isValidXMLFile(file: any) {
    return file.name.endsWith('.xml');
  }
  camelize(text: any) {
    return text.substr(0, 1).toLowerCase() + text.substr(1);
  }
}
