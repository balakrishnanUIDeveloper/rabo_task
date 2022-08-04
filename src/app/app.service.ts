import { Injectable } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { environment } from 'src/environments/environment';
@Injectable()
export class AppService {
  endpointPath: any = {
    users: environment.ENDPOINT_BASE + '/users'
  };
  constructor(private apiService: ApiService) {}
  sendSignupData(requestObj: any) {
    return this.apiService.postData(this.endpointPath.users, requestObj);
  }
}
