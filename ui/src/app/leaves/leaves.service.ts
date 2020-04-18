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
    	return this.http.post(this.globalService.baseApiUrl+'leaves/findAll',{});
    }
}

