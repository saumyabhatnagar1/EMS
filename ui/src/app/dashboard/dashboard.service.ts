import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './../common/services/globals.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private globalservice : GlobalsService) { }

  fetchAllTimesheet(){
    return this.http.post(this.globalservice.baseApiUrl+'timesheets/findAll',{})
  }


}
