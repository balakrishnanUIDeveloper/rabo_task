import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';
import { HomeService } from './home.service';
import { APPTITLE, RECORDS_EVENT, SUPPORTED_FILE } from './home.constants';
import { HomeComponent } from './home.component';
import { DataProcessorComponent } from './data-processor/data-processor.component';
import { By } from '@angular/platform-browser';
import { fakeFileForTest } from '../core/helper/test.helper';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeServiceStub: HomeService;
  beforeEach(() => {
    const modalServiceStub = () => ({
      modalPopupSubject: { next: () => ({}) }
    });
    let homeServiceStub = () => ({
      recordSubject: {
        subscribe: (f: any) =>
          f({
            status: RECORDS_EVENT.INITIATE_RECORDS,
            records: [
              {
                reference: '156108',
                accountNumber: 'NL69ABNA0433647324',
                description: 'Flowers from Erik de Vries',
                startBalance: '13.92',
                mutation: '-7.25',
                endBalance: '6.67'
              },
              {
                reference: '156108',
                accountNumber: 'NL69ABNA0433647324',
                description: 'Flowers from Erik de Vries',
                startBalance: '13.92',
                mutation: '-7.25',
                endBalance: '6.67'
              }
            ]
          }),
        unsubscribe: () => ({})
      },
      isValidCSVFile: (file: any) => file.name.endsWith(SUPPORTED_FILE.CSV),
      isValidXMLFile: (file: any) => file.name.endsWith(SUPPORTED_FILE.XML),
      checkRecordsDataFromFile: (...a: any) => ({ ...a })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent, DataProcessorComponent],
      providers: [
        { provide: ModalService, useFactory: modalServiceStub },
        { provide: HomeService, useFactory: homeServiceStub }
      ]
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    homeServiceStub = fixture.debugElement.injector.get(HomeService);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`records has default value`, () => {
    expect(component.records).toEqual([]);
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(APPTITLE);
  });

  it(`duplicateReferenceIDs has default value`, () => {
    expect(component.duplicateReferenceIDs).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('check records are populated', () => {
      spyOn(component, 'getDuplicateRecord').and.callThrough();
      component.ngOnInit();
      expect(component.getDuplicateRecord).toHaveBeenCalled();
      expect(component.records.length).toBeGreaterThan(0);
    });
    it('check duplicate data', () => {
      spyOn(component, 'getDuplicateRecord').and.callThrough();
      component.ngOnInit();
      expect(component.getDuplicateRecord).toHaveBeenCalled();
      expect(component.duplicateReferenceIDs.length).toBeGreaterThan(0);
    });
    // it('check if records are reset', () => {
    //   let homeServiceStub = fixture.debugElement.injector.get(HomeService);
    //   // homeServiceStub.recordSubject = { subscribe: (f:any) => f({status: RECORDS_EVENT.RESET}), unsubscribe: () => ({}) },
    //   // spyOn(homeServiceStub, 'recordSubject').and.callThrough();
    //   spyOn(component, 'getDuplicateRecord').and.callThrough();
    //   component.ngOnInit();
    //   // expect(component.fileReset).toHaveBeenCalled();
    //   expect(component.getDuplicateRecord).toHaveBeenCalled();
    // });
  });
  describe('Upload File event', () => {
    let dataProcessor: DataProcessorComponent;
    beforeEach(() => {
      dataProcessor = fixture.debugElement.query(
        By.directive(DataProcessorComponent)
      ).componentInstance;
      component.fileReset();
    });
    it('not throw error when csv file is uploaded', () => {
      let fakeF: any = { srcElement: { files: [fakeFileForTest('csv')] } };
      spyOn(component, 'uploadListener').and.callThrough();
      dataProcessor.uploadFileEvent.emit(fakeF);
      expect(component.uploadListener).toHaveBeenCalled();
    });
    it('not throw error when xml file is uploaded', () => {
      let fakeF: any = { srcElement: { files: [fakeFileForTest('xml')] } };
      spyOn(component, 'uploadListener').and.callThrough();
      dataProcessor.uploadFileEvent.emit(fakeF);
      expect(component.uploadListener).toHaveBeenCalled();
    });
    it('throw error when unsupported format file is uploaded', () => {
      let fakeF: any = { srcElement: { files: [fakeFileForTest('pdf')] } };
      spyOn(component, 'uploadListener').and.callThrough();
      spyOn(component, 'fileReset').and.callThrough();
      dataProcessor.uploadFileEvent.emit(fakeF);
      expect(component.uploadListener).toHaveBeenCalled();
      expect(component.fileReset).toHaveBeenCalled();
    });
  });
});
