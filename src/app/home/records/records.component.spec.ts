import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountSData } from '../home.component';
import { RecordsComponent } from './records.component';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecordsComponent]
    });
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`records has default value`, () => {
    expect(component.records).toEqual([]);
  });

  it(`duplicateReferenceIDs has default value`, () => {
    expect(component.duplicateReferenceIDs).toEqual([]);
  });

  it(`showSuccessRecords has default value`, () => {
    expect(component.showSuccessRecords).toEqual(true);
  });

  it(`tabs has default value`, () => {
    expect(component.tabs).toEqual([]);
  });
});
