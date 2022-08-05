import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountSData } from './home.component';
import { RECORDS_EVENT, SUPPORTED_FILE } from './home.constants';
import * as xml2js from 'xml2js';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor() {}
  recordSubject = new Subject();

  getDataRecordsArrayFromCSVFile(csvData: any) {
    let csvRecordsArray = csvData?.toString().split(/\r\n|\n/);
    let headerLength = this.getHeaderArray(csvRecordsArray).length;
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
    this.populateRecords(csvArr);
  }

  getDataRecordsArrayFromXMLFile(xmlData: any) {
    const parser = new xml2js.Parser({
      trim: true,
      explicitArray: false,
      mergeAttrs: true,
      attrNameProcessors: [this.camelize],
      tagNameProcessors: [this.camelize]
    });
    parser.parseString(xmlData, (err, result) => {
      this.populateRecords(result?.records?.record);
    });
  }

  checkRecordsDataFromFile(format: String, fileData: any) {
    if (this.isValidCSVFile(format)) {
      this.getDataRecordsArrayFromCSVFile(fileData);
    }
    if (this.isValidXMLFile(format)) {
      this.getDataRecordsArrayFromXMLFile(fileData);
    }
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  populateRecords(records: AccountSData[]) {
    this.recordSubject.next({
      status: RECORDS_EVENT.INITIATE_RECORDS,
      records: records
    });
  }
  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(SUPPORTED_FILE.CSV);
  }
  isValidXMLFile(file: any) {
    return file.name.endsWith(SUPPORTED_FILE.XML);
  }
  camelize(text: any) {
    return text.substr(0, 1).toLowerCase() + text.substr(1);
  }
}
