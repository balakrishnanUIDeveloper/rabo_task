import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from '@angular/core';
import { AccountSData } from '../home.component';
import { HomeService } from '../home.service';
@Component({
  selector: 'data-processor',
  templateUrl: './data-processor.component.html',
  styleUrls: ['./data-processor.component.scss']
})
export class DataProcessorComponent implements OnInit {
  @Input() records: AccountSData[] = [];
  @Output() uploadFileEvent = new EventEmitter<string>();
  @ViewChild('csvReader') csvReader: any;
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {}
  uploadListener($event: any): void {
    this.uploadFileEvent.emit($event);
  }
  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.homeService.recordSubject.next('reset');
  }
}
