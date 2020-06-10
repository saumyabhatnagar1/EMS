import { Injectable } from '@angular/core';
import { GlobalsService } from '../common/services/globals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrincipleService } from '../util/principle.service';


@Injectable({
  providedIn: 'root'
})
export class TimesheetsService {
  constructor(private globals: GlobalsService, private http: HttpClient, private principle: PrincipleService) { }

  addTimeSheet(data) {
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
      });
    return this.http.post(this.globals.baseApiUrl + 'timesheets/add/', data, { headers: headers });
  }

  findTimeSheet(data) {
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
      });
    const url = this.globals.baseApiUrl + 'timesheets/find/';

    return this.http.post(url, data, { headers: headers });
  }

  adminFindTimeSheet(data) {
    return this.http.post(this.globals.baseApiUrl + 'timesheets/admin/find', data);
  }

  adminUpdateTimeSheet(data) {
    return this.http.post(this.globals.baseApiUrl + 'timesheets/admin/update', data);
  }
}
