import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalsService} from '../common/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class PrincipleService {
  private key : string = 'ems_';

  constructor(private http:HttpClient, private globals:GlobalsService) { 
   
    this.http.get(this.globals.baseApiUrl+'principle').subscribe(res=>{

      if(res["username"]!=null){
        this.setUser(res);
      }else{
        this.delete();
      }
    },err=>{
      console.log(err);
    })
  }

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
