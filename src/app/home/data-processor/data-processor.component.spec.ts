import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeService } from '../home.service';
import { PROCESSOR_TITLE } from '../home.constants';
import { DataProcessorComponent } from './data-processor.component';

describe('DataProcessorComponent', () => {
  let component: DataProcessorComponent;
  let fixture: ComponentFixture<DataProcessorComponent>;

  beforeEach(() => {
    const homeServiceStub = () => ({ recordSubject: { next: () => ({}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DataProcessorComponent],
      providers: [{ provide: HomeService, useFactory: homeServiceStub }]
    });
    fixture = TestBed.createComponent(DataProcessorComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`records has default value`, () => {
    expect(component.records).toEqual([]);
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(PROCESSOR_TITLE);
  });
});
