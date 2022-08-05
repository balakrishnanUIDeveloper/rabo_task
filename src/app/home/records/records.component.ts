import { Component, Input, OnInit } from '@angular/core';
import { AccountSData } from '../home.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  @Input() records: AccountSData[] = [];
  @Input() duplicateReferenceIDs: String[] = [];
  showSuccessRecords: Boolean = true;
  tabs = [
    {
      title: 'Success',
      active: true
    },
    {
      title: 'Failure',
      active: false
    }
  ];
  constructor() {}

  ngOnInit(): void {}
  checkTransactionStatus(record: AccountSData) {
    const endBalance = Number(record.startBalance) + Number(record.mutation);
    return (
      endBalance.toString() === record.endBalance &&
      !this.duplicateReferenceIDs.includes(record.reference)
    );
  }
  selectTab(tab: any) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
    this.showSuccessRecords = tab.title === 'Success';
  }
}
