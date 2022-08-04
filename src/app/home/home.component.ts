import { Component, VERSION, ViewChild, OnInit } from '@angular/core';
import * as xml2js from 'xml2js';
import { HomeService } from './home.service';

export type AccountSData = {
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
export class HomeComponent implements OnInit {
  public records: AccountSData[] = [];

  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.homeService.recordSubject.subscribe((data) => {
      if (data === 'reset') {
        this.fileReset();
      }
    });
  }

  uploadListener($event: any): void {
    let files = $event.srcElement.files;
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    if (this.homeService.isValidCSVFile(files[0])) {
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = csvData?.toString().split(/\r\n|\n/);
        let headersRow = this.homeService.getHeaderArray(csvRecordsArray);
        this.records = this.homeService.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else if (this.homeService.isValidXMLFile(files[0])) {
      reader.onload = () => {
        let xmlData = reader.result;
        this.getDataRecordsArrayFromXMLFile(xmlData);
      };
    } else {
      alert('Please import valid .csv or .xml file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromXMLFile(xml: any) {
    const parser = new xml2js.Parser({
      trim: true,
      explicitArray: false,
      mergeAttrs: true,
      attrNameProcessors: [this.homeService.camelize],
      tagNameProcessors: [this.homeService.camelize]
    });
    parser.parseString(xml, (err, result) => {
      this.records = result?.records?.record;
    });
  }

  fileReset() {
    this.records = [];
  }
}
