import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { PrincipleService } from './principle.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public endPoint = "http://localhost:8000/api/";

  constructor(private http:HttpClient,private principle:PrincipleService) { }

  logout(){
    this.principle.delete();
    return this.http.delete(this.endPoint+'logout/');
  }
}
