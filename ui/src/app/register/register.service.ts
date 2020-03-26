import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public endPoint :string =  "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  getMessage(){
     return this.http.get(this.endPoint);
  }

  createAccount(user_data){
      return this.http.post(this.endPoint +'createUser/',user_data);
  }
}
