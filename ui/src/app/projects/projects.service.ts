import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GlobalsService } from './../common/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http:HttpClient,private globalService:GlobalsService) { }


  requestProject(body){
    return this.http.post(this.globalService.baseApiUrl+'project/new',body);
  }

  getAllProjects(){
    return this.http.post(this.globalService.baseApiUrl+'project/findAll',{});
  }
}
