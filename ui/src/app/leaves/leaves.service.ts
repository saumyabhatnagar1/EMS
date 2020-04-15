import { GlobalsService } from './../common/services/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipleService } from './../util/principle.service';


@Injectable({
    providedIn:'root'
})

export class LeavesService{
    constructor(private http:HttpClient,private globalservice:GlobalsService){}
    
    public endpoint:string=this.globalservice.baseApiUrl;
    
        add_leaves(body){
            return this.http.post(this.endpoint+'leaves/new',body)
        


    }
}

