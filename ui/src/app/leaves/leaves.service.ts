import { PrincipleService } from './../util/principle.service';
import { GlobalsService } from './../common/services/globals.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class LeavesService{
    constructor(private http:HttpClient,private globalService:GlobalsService,private principle:PrincipleService){}
    
    newLeave(body){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
    	return this.http.post(this.globalService.baseApiUrl+'leaves/new',body,{headers:headers});
    }

    getAllLeaves(){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
    	return this.http.get(this.globalService.baseApiUrl+'leaves/fetchAll',{headers:headers});
    }
    getLeavesByUsername(data){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
        return this.http.get(this.globalService.baseApiUrl+'leaves/findByUsername',{headers:headers});
    }
    updateLeaves(data){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
        return this.http.post(this.globalService.baseApiUrl+'leaves/updateStatus',data,{headers:headers});
    }
    addLeaveType(data){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/add',data)
    }
    findLeaveType(){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
        return this.http.get(this.globalService.baseApiUrl+'leavetype/find',{headers:headers})
    }
    updateLeaveType(data){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
        return this.http.post(this.globalService.baseApiUrl+'leavetype/update',data,{headers:headers});
    }
    deleteLeaveType(data){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/delete',data)
    }

    

    getRemainingLeaves(data){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
        return this.http.get(this.globalService.baseApiUrl+'leaves/findByUsername?emp_id='+data,{headers:headers});
    }
}

