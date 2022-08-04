import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from '@angular/core';
import { AccountSData } from '../home.component';
import { PROCESSOR_TITLE, RECORDS_EVENT } from '../home.constants';
import { HomeService } from '../home.service';
@Component({
  selector: 'data-processor',
  templateUrl: './data-processor.component.html'
})
export class DataProcessorComponent {
  @Input() records: AccountSData[] = [];
  @Output() uploadFileEvent = new EventEmitter<string>();
  @ViewChild('csvReader') csvReader: any;

  constructor(private homeService: HomeService) {}
  title = PROCESSOR_TITLE;
  uploadListener($event: any): void {
    this.uploadFileEvent.emit($event);
  }
  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.homeService.recordSubject.next(RECORDS_EVENT.RESET);
  }
}