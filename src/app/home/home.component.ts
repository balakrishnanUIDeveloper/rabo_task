import { Component, VERSION, ViewChild } from '@angular/core';
import * as xml2js from 'xml2js';
type AccountSData = {
  reference: String;
  accountNumber: String;
  description: String;
  startBalance: String;
  mutation: String;
  endBalance: String;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  name = 'Angular ' + VERSION.major;
  public records: AccountSData[] = [];
  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    if (this.isValidCSVFile(files[0])) {
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = csvData?.toString().split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else if (this.isValidXMLFile(files[0])) {
      reader.onload = () => {
        let xmlData = reader.result;
        this.parseXmlToJson(xmlData);
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }
  camelize(text: any) {
    // text = text.replace(/[-_\s.]+(.)?/g);
    return text.substr(0, 1).toLowerCase() + text.substr(1);
  }

  async parseXmlToJson(xml: any) {
    const parser = new xml2js.Parser({
      trim: true,
      explicitArray: false,
      mergeAttrs: true,
      attrNameProcessors: [this.camelize],
      tagNameProcessors: [this.camelize]
    });
    parser.parseString(xml, (err, result) => {
      console.log(result);
      this.records = result?.records?.record;
    });
  }
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

  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
}
