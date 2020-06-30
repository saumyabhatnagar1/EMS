import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrincipleService } from '../util/principle.service';



@Injectable({
	providedIn: 'root'
})
export class LoginService {
	public endPoint: string = "http://localhost:8000/api/";

	constructor(private http: HttpClient, private principle: PrincipleService) { }

	login(user_data) {
		const headers = new HttpHeaders({ 'Content-type': 'application/json' });
		const url = this.endPoint + 'token/';
		return this.http.post(url, user_data, { headers: headers });
		//return this.http.post(this.endPoint+'login/',user_data);

	}
	getPrinciple() {
		const headers = new HttpHeaders(
			{
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
			});
		const url = this.endPoint + 'accounts/getAccount/';
		return this.http.get(url, { headers: headers });
	}
}
