import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GlobalsService } from './globals.service';
import {PrincipleService} from '../../util/principle.service';
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http:HttpClient,private principle:PrincipleService,private globals:GlobalsService) { }

  getUsers(){
  	const headers = new HttpHeaders(
  			{'Content-type':'application/json',
  			 'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  			});
  	const url = this.globals.baseApiUrl+'accounts/getAllAccounts/';

  	return this.http.get(url,{headers:headers});
  }

  createAccount(user_data){
  	const headers = new HttpHeaders(
  			{'Content-type':'application/json',
  			 'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  			});
  	const url = this.globals.baseApiUrl+'accounts/createAccount/';

    return this.http.post(url,user_data,{headers:headers});
  }
}
