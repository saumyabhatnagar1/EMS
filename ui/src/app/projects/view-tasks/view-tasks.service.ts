import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './../../common/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class ViewTasksService {

  constructor(private http:HttpClient,private globalService:GlobalsService) { }

  addTask(data){
    return this.http.post(this.globalService.baseApiUrl+'tasks/new',data)
    
  }

  getTask(id){
    return this.http.post(this.globalService.baseApiUrl+'tasks/getByProjectID',id)
  }
}
