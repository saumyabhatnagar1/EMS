import { PrincipleService } from './../util/principle.service';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GlobalsService } from './../common/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http:HttpClient,private globalService:GlobalsService,private principle:PrincipleService) { }


  addProject(body){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.post(this.globalService.baseApiUrl+'project/new',body,{headers:headers});
  }

  getAllProjects(){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.get(this.globalService.baseApiUrl+'project/getAll',{headers:headers});
  }
}
