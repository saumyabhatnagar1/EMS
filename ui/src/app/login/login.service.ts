import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public endPoint :string =  "http://localhost:8000/api/";

  constructor(private http:HttpClient) { }

  login(user_data){
    return this.http.post(this.endPoint+'login/',user_data);
  }
}
