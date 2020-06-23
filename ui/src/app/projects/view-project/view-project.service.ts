import { PrincipleService } from './../../util/principle.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './../../common/services/globals.service';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ViewProjectService {

  constructor(private http: HttpClient, private globalService: GlobalsService, private principle: PrincipleService) { }

  getProjectById(id) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
    })
    return this.http.post(this.globalService.baseApiUrl + 'project/getByID', id, { headers: headers })
  }
  getTeamById(id) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
    })
    return this.http.post(this.globalService.baseApiUrl + 'project/getTeam', id, { headers: headers })
  }
  addTeamMember(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
    })
    return this.http.post(this.globalService.baseApiUrl + 'project/addTeamMember', data, { headers: headers })
  }
  getFreeEmployees() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.principle.getItem('jwt_token')
    })
    return this.http.get(this.globalService.baseApiUrl + 'project/getFreeEmployee', { headers: headers })
  }

  updateProjectStatus(body){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.post(this.globalService.baseApiUrl+'project/updateProjectStatus',body,{headers:headers});
  }
}
