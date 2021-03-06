import { PrincipleService } from './../util/principle.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './../common/services/globals.service';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private globalservice : GlobalsService,private principle:PrincipleService) { }

  fetchAllTimesheet(data){
     const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.post(this.globalservice.baseApiUrl+'timesheets/find/',data,{headers:headers})
  }
  getEmpcountByGender(){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
    return this.http.get(this.globalservice.baseApiUrl+'account/countEmployeeByGender',{headers:headers})
  }

  getNoticesByType(data){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
  return this.http.post(this.globalservice.baseApiUrl+'getNoticesByType/',data,{headers:headers});
  }

  getAllNotices(){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
  return this.http.get(this.globalservice.baseApiUrl+'getAllNotices/',{headers:headers});
  }
  getWorkingHourByMonth(data){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
  return this.http.post(this.globalservice.baseApiUrl+'timesheets/getByMonth',data,{headers:headers}) 
  }
  getLeavesByStatus(data){
    const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')   
  })
  return this.http.post(this.globalservice.baseApiUrl+'leaves/filterByStatus',data,{headers:headers})
  }
  getLeavesByUsername(data){
    const headers=new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Bearer '+this.principle.getItem('jwt_token')
    })
    return this.http.get(this.globalservice.baseApiUrl+'leaves/findByUsername',{headers:headers});
}
getRemainingLeaves(data){
  const headers=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.principle.getItem('jwt_token')
  })
  return this.http.get(this.globalservice.baseApiUrl+'leaves/findByUsername?emp_id='+data,{headers:headers});
}



}
