import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipleService } from './../util/principle.service';

@Injectable({
    providedIn:'root'
})

export class LeavesService{
    public endpoint:string='http://localhost:8000/api/';
    constructor(private http:HttpClient){}
        
        get_leaves(body){
            return this.http.post(this.endpoint+'leaves/new',body)
        


    }
}

