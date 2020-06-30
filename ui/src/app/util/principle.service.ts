import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from '../common/services/globals.service';


@Injectable({
  providedIn: 'root'
})
export class PrincipleService {
  private key: string = 'ems_';

  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.getPrinciple();
  }

  setItem(name, value) {
    localStorage.setItem(this.key + name, value);
  }

  getItem(name) {
    return localStorage.getItem(this.key + name);
  }

  setUser(user_data) {
    localStorage.setItem(this.key + 'principle', JSON.stringify(user_data));
  }

  getUsername() {
    let user = JSON.parse(localStorage.getItem(this.key + 'principle'));
    const username = user && user.username || undefined;
    return username;
  }

  getRole() {
    let user = JSON.parse(localStorage.getItem(this.key + 'principle'));
    const role = user && user.role || undefined;
    return role;
  }

  delete() {
    localStorage.removeItem(this.key + 'principle');
  }

  getPrinciple() {
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.getItem('jwt_token')
      });
    const url = this.globals.baseApiUrl + 'principle/';
    this.http.get(url, { headers: headers }).subscribe(res => {

      if (res["username"]) {
        this.setUser(res);
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }


}
