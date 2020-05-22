import { ViewTasksService } from './view-tasks.service';
import { ViewProjectComponent } from './../view-project/view-project.component';
import { Component, OnInit } from '@angular/core';
import {SelectItem,MessageService} from 'primeng/api';
import { MultiSelectItem } from 'primeng/multiselect/public_api';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceService} from '../../common/services/account-service.service';
import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
  providers:[MessageService]
})
export class ViewTasksComponent implements OnInit {

  constructor(private messageService:MessageService,private viewProjectComponent: ViewProjectComponent,private accountService:AccountServiceService,private viewTaskService:ViewTasksService) { }

  public cols :any;
  public showCreateTask:boolean=false;
  first = 0;
  rows = 10;
  public tasks = []
  employees:SelectItem[];

  public id = this.viewProjectComponent.id
  ngOnInit(): void {
    this.cols = [

     
      { field: "title", header:"Title"},
      { field: "assignTo" ,header:"Assign To"},
      {filed: "project_id", header:"Project Id"},
      { field: "status",header:"Status"},
      { field: "deadline" ,header:"Deadline"},
      { field: "createdOn",header:"Created On"},
      { field: "description",header:"Description"},
      { field: "action",header:"Action"},


    ];
    
    this.getEmployeeData()
    
    this.getTask()
  }


  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.first === (this.tasks.length - this.rows);
}

isFirstPage(): boolean {
    return this.first === 0;
}

showDialog(){
this.showCreateTask = true;
}
closeDialog(){
  this.showCreateTask=false
}

test(){
  console.log(this.viewProjectComponent.id)
  console.log(this.employees)
}

getEmployeeData(){
  this.accountService.getUsers().subscribe(res=>{
    this.formatData(res)
    //this.employees = res;
    
  },err=>{
    console.log(err);
  });

}

formatData(res){
  //console.log(res)
  this.employees = []
  for(let i=0;i<res.length;i++){
    this.employees.push(
      {label:res[i].name,value:res[i].email}
    )
  }
  console.log(this.employees)
}

public TaskForm=new FormGroup({
  title:new FormControl(''),
  description:new FormControl(''),
  deadline:new FormControl(''),
  assignTo:new FormControl(''),

})

addTask(){
  let data = {
    "project_id":this.viewProjectComponent.id,
    "title":this.TaskForm.get('title').value,
    "description":this.TaskForm.get('description').value,
    "deadline":this.TaskForm.get('deadline').value,
    "assignTo":this.TaskForm.get('assignTo').value
  }

  this.viewTaskService.addTask(JSON.stringify(data)).subscribe(
    res=>{
      console.log(res)
      this.messageService.add({severity:'success',summary: 'New Team member added...',life:2000})

  },err=>{
    console.log(err)
  })
}

getTask(){
  let data = {
    "project_id":this.viewProjectComponent.id
  }

  this.viewTaskService.getTask(JSON.stringify(data)).subscribe(
    res=>{
      //console.log(res)
      let res1=Object.entries(res)
        for(let i=0;i<res1.length;i++)
        { 
          this.tasks.push(res1[i][1])
        }
        console.log(this.tasks)
    },err=>{
      console.log(err)
    }
  )
}

}
