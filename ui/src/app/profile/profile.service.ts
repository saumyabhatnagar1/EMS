import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { PrincipleService } from '../util/principle.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public endPoint :string =  "http://localhost:8000/api/";

  constructor(private principle:PrincipleService,private http:HttpClient) { }
  get_profile(body){
  	const headers = new HttpHeaders(
  		{ 'Content-type':'application/json',
  		  'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  		});
    return this.http.post(this.endPoint+'account/profile',body,{headers:headers});
  }

  getUpdate(data){
  	const headers = new HttpHeaders(
  		{ 'Content-type':'application/json',
  		  'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  		});
    return this.http.post(this.endPoint+'account/updateProfile',data);
    
  }

  updateProfile(data){
  	const headers = new HttpHeaders(
  		{ 'Content-type':'application/json',
  		  'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  		});
  	return this.http.post(this.endPoint+'account/updateProfile',data,{headers:headers});
  }

}

