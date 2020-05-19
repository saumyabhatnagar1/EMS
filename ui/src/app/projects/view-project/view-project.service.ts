import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './../../common/services/globals.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ViewProjectService {

  constructor(private http:HttpClient,private globalService: GlobalsService) { }

  getProjectById(id){
    return this.http.post(this.globalService.baseApiUrl+'project/findByID',id)
  }

}
