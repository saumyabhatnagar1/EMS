import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './../../common/services/globals.service';
import { PrincipleService } from 'src/app/util/principle.service';

@Injectable({
  providedIn: 'root'
})
export class ViewTasksService {

  constructor(private http:HttpClient,private principle :PrincipleService,private globalService:GlobalsService) { }

  addTask(data){

    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.post(this.globalService.baseApiUrl+'tasks/new',data,{headers:headers})
    
  }

  getTask(id){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.post(this.globalService.baseApiUrl+'tasks/getByProjectID',id,{headers:headers})
  }
  updateStatus(data){

    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.post(this.globalService.baseApiUrl+'tasks/update',data,{headers:headers})
  }

  addComment(data){
      const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
  return this.http.post(this.globalService.baseApiUrl+'task/addComment',data,{headers:headers})

  }

  getAllComments(data){
       const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
  return this.http.post(this.globalService.baseApiUrl+'task/getAllComments',data,{headers:headers})

  }

  

}
