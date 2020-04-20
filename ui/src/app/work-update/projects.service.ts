import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GlobalsService } from './../common/services/globals.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService{
    constructor(private http:HttpClient,private globalService:GlobalsService){}

    get_projects(){
        return this.http.get('./assets/projects.json');
    }
    get_tasks(pid){
        return this.http.get('/assets/tasks.json')
    }

    requestProject(body){
    	return this.http.post(this.globalService.baseApiUrl+'project/new',body);
    }

    getAllProjects(){
    	return this.http.post(this.globalService.baseApiUrl+'project/findAll',{});
    }

    createTask(body){
    	return this.http.post(this.globalService.baseApiUrl+'task/new',body);
    }

    getAllTasks(){
    	return this.http.post(this.globalService.baseApiUrl+'task/find',{});
    }
}