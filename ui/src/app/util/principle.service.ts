import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipleService {
  private key : string = 'ems_';

  constructor() { }

  setUser(user_data){
    localStorage.setItem(this.key+'principle',JSON.stringify(user_data));
  }

  getUsername(){
    let user = JSON.parse(localStorage.getItem(this.key+'principle'));
    const username = user && user.username || undefined;
    return username;
  }

  getRole(){
      let user = JSON.parse(localStorage.getItem(this.key+'principle'));
      const role = user && user.role || undefined;
      return role;
    }

  delete(){
    localStorage.removeItem(this.key+'principle');
  }
}
