import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessorComponent } from './data-processor.component';

describe('DataProcessorComponent', () => {
  let component: DataProcessorComponent;
  let fixture: ComponentFixture<DataProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataProcessorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
