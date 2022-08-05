import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';
import { HomeService } from './home.service';
import { APPTITLE } from './home.constants';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const modalServiceStub = () => ({
      modalPopupSubject: { next: () => ({}) }
    });
    const homeServiceStub = () => ({
      recordSubject: { subscribe: (f: any) => f({status: ''}), unsubscribe: () => ({}) },
      isValidCSVFile: () => ({}),
      isValidXMLFile: () => ({}),
      checkRecordsDataFromFile: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: ModalService, useFactory: modalServiceStub },
        { provide: HomeService, useFactory: homeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
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
    it('makes expected calls', () => {
      spyOn(component, 'fileReset').and.callThrough();
      spyOn(component, 'getDuplicateRecord').and.callThrough();
      component.ngOnInit();
      expect(component.fileReset).toHaveBeenCalled();
      expect(component.getDuplicateRecord).toHaveBeenCalled();
    });
  });
});
