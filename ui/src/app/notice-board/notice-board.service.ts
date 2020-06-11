import { Injectable } from '@angular/core';
import { PrincipleService } from './../util/principle.service';
import { GlobalsService } from './../common/services/globals.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

constructor(private principle:PrincipleService,private http:HttpClient,private globalService:GlobalsService) { }

addNotice(body){
  const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
return this.http.post(this.globalService.baseApiUrl+'addNotice/',body,{headers:headers});
}

getAllNotices(){
  const headers=new HttpHeaders({
    'Content-type':'application/json',
    'Authorization':'Bearer '+this.principle.getItem('jwt_token')
})
return this.http.get(this.globalService.baseApiUrl+'getAllNotices/',{headers:headers});
}
}
