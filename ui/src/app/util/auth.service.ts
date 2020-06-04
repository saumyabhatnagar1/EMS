import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrincipleService } from './principle.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public endPoint = "http://localhost:8000/api/";

  constructor(private http: HttpClient, private principle: PrincipleService) { }

  logout() {
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
      });
    this.principle.delete();
    return this.http.delete(this.endPoint + 'logout/', { headers: headers });
  }

  getPrinciple() {
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
      });
    const url = this.endPoint + 'principle/';
    return this.http.get(url, { headers: headers });
  }
}
