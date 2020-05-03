import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GlobalsService } from './globals.service';
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http:HttpClient,private globals:GlobalsService) { }

  getUsers(){
  	return this.http.get(this.globals.baseApiUrl+"accounts/");
  }
}
