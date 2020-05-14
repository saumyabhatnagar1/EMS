import { GlobalsService } from './../common/services/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class LeavesService{
    constructor(private http:HttpClient,private globalService:GlobalsService){}
    
    requestLeave(body){
    	return this.http.post(this.globalService.baseApiUrl+'leaves/new',body);
    }

    getAllLeaves(){
    	return this.http.post(this.globalService.baseApiUrl+'leaves/fetchAll',{});
    }
    updateLeaves(data){
        return this.http.post(this.globalService.baseApiUrl+'leaves/updateStatus',data);
    }
    addLeaveType(data){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/add',data)
    }
    findLeaveType(){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/find',{})
    }
    updateLeaveType(data){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/update',data);
    }
    deleteLeaveType(data){
        return this.http.post(this.globalService.baseApiUrl+'leavetype/delete',data)
    }
    findLeavetypeById(data)
    {
        return this.http.post(this.globalService.baseApiUrl+'leavetype/findById',data)
    }
}

