import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from '@angular/core';
import { AccountSData } from '../home.component';
import { PROCESSOR_TITLE, RECORDS_EVENT, RESET_BTN } from '../home.constants';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-data-processor',
  templateUrl: './data-processor.component.html'
})
export class DataProcessorComponent {
  @Input() records: AccountSData[] = [];
  @Output() uploadFileEvent = new EventEmitter<string>();
  @ViewChild('csvReader') csvReader: any;
  resetBtnLabel = RESET_BTN;
  title = PROCESSOR_TITLE;
  constructor(private homeService: HomeService) {}
  uploadListener($event: any): void {
    this.uploadFileEvent.emit($event);
  }
  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.homeService.recordSubject.next({ status: RECORDS_EVENT.RESET });
  }
}
