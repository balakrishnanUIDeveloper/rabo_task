import {
  Component,
  VERSION,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';
import { APPTITLE, RECORDS_EVENT } from './home.constants';
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
export class HomeComponent implements OnInit, OnDestroy {
  public records: AccountSData[] = [];
  title = APPTITLE;
  duplicateReferenceIDs: String[] = [];
  recordsEventSubscription: any;
  constructor(
    private homeService: HomeService,
    private modalPopService: ModalService
  ) {}
  ngOnInit(): void {
    this.recordsEventSubscription = this.homeService.recordSubject.subscribe(
      (data: any) => {
        if (data.status === RECORDS_EVENT.RESET) {
          this.fileReset();
        }
        if (data.status === RECORDS_EVENT.INITIATE_RECORDS) {
          this.records = data.records;
          this.getDuplicateRecord(data.records);
        }
      }
    );
  }

  getDuplicateRecord(records: AccountSData[]) {
    this.duplicateReferenceIDs = records
      .map((v) => v.reference)
      .filter((refId, index, allRefIds) => {
        return allRefIds.indexOf(refId) !== index;
      });
  }
  uploadListener($event: any): void {
    let files = $event.srcElement.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);
    if (
      this.homeService.isValidCSVFile(files[0]) ||
      this.homeService.isValidXMLFile(files[0])
    ) {
      let instance = this;
      reader.onload = () => {
        this.homeService.checkRecordsDataFromFile(files[0], reader.result);
      };
      reader.onerror = function () {
        instance.modalPopService.modalPopupSubject.next({
          status: RECORDS_EVENT.UPLOAD_ERROR
        });
      };
    } else {
      this.modalPopService.modalPopupSubject.next({
        status: RECORDS_EVENT.INVALID_FILE_ERROR
      });
      this.fileReset();
    }
  }

  fileReset() {
    this.records = [];
    this.duplicateReferenceIDs = [];
  }
  ngOnDestroy() {
    this.recordsEventSubscription?.unsubscribe();
  }
}
