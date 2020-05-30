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
    	return this.http.post(this.globalService.baseApiUrl+'leaves/fetchAll',{});
    }
    getLeavesByUsername(data){
        const headers=new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+this.principle.getItem('jwt_token')
        })
        return this.http.get(this.globalService.baseApiUrl+'leaves/findByUsername',{headers:headers});
    }
    updateLeaves(data){
        return this.http.post(this.globalService.baseApiUrl+'leaves/updateStatus',data);
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
        return this.http.post(this.globalService.baseApiUrl+'leavetype/update',data);
    }
    deleteLeaveType(data){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/delete',data)
    }
}

