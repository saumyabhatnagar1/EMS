import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService{
    constructor(private http:HttpClient){}

    get_projects(){
        return this.http.get('./assets/projects.json');
    }
    get_tasks(pid){
        return this.http.get('/assets/tasks.json')
    }
}