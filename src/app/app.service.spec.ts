import { TestBed } from '@angular/core/testing';
import { ApiService } from './core/services/api.service';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    const apiServiceStub = () => ({
      postData: (users: any, requestObj: any) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        AppService,
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
