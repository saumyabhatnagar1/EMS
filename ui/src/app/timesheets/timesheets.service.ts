import { Injectable } from '@angular/core';
import { GlobalsService } from '../common/services/globals.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimesheetsService {
  constructor(private globals:GlobalsService, private http:HttpClient) { }

  addTimeSheet(data){
    return this.http.post(this.globals.baseApiUrl+'timesheets/add',data);
  }

  findTimeSheet(data){
      return this.http.post(this.globals.baseApiUrl+'timesheets/find',data);
  }

  adminFindTimeSheet(data){
        return this.http.post(this.globals.baseApiUrl+'timesheets/admin/find',data);
  }

  adminUpdateTimeSheet(data){
      return this.http.post(this.globals.baseApiUrl+'timesheets/admin/update',data);
  }
}
