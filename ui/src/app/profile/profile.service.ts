import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public endPoint :string =  "http://localhost:8000/api/";

  constructor(private http:HttpClient) { }
  get_profile(body){
    return this.http.post(this.endPoint+'account/profile',body);
  }
}
