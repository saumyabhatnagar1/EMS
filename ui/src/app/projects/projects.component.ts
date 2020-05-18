import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import {SelectItem} from 'primeng/api';
import { AccountServiceService} from '../common/services/account-service.service';
import { MultiSelectItem } from 'primeng/multiselect/public_api';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {



  public cols :any;
  public showCreateProject:boolean=false;
  first = 0;
  rows = 10;
  employees:SelectItem[];
  users:SelectItem[]
  constructor(private projectservice: ProjectsService,private accountService:AccountServiceService) { 
      this.users=[
        {
          label:'Tata',value:'Tata'
        },
        {label:'JP Morgan',value:'JP Morgan'},
        {label:'Rajdhani Solutions',value:'Rajdhani Solution'}
      ]
  }

  

  ngOnInit(): void {


    this.cols = [
            
      { field: "name", header:"Name"},
      { field: "assignTo" ,header:"Assign To"},
      { field: "status",header:"Status"},
      { field: "deadline" ,header:"Deadline"},
      { field: "customer_id",header:"Customer Id"},
      { field: "complete_percentage",header:"Complete %"},
      { field: "description",header:"Description"},
      { field: "createdOn",header:"Created On"},
      { field: "action",header:"Action"},


    ];
    this.findAllProjects()
    this.getEmployeeData()
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
    return this.first === (this.projects.length - this.rows);
}

isFirstPage(): boolean {
    return this.first === 0;
}

showDialog(){
this.showCreateProject = true;
}
closeDialog(){
  this.showCreateProject=false
}

  addNewProject() {
    let projectJSON = JSON.stringify(this.newProjectForm.value)
    console.log(projectJSON)


    this.projectservice.requestProject(projectJSON).subscribe(
      res => {
        console.log(res);
      
      },
      err => {
        console.log(err)
      });
this.findAllProjects()

  }

  findAllProjects() {
    this.projectservice.getAllProjects().subscribe(
      res => {
        this.appendProjects(res);
        console.log(res);
      },
      err => {
        console.log(err)
      }
    )
  }
  public projects = [];
  appendProjects(res) {
    let projectData = Object.entries(res);

    this.projects = [];
    for (let index = 0; index < projectData.length; index++) {
      this.projects.push(projectData[index][1])
    }

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

  public newProjectForm=new FormGroup({
    name:new FormControl(''),
    assignTo:new FormControl(''),
    deadline:new FormControl(''),
    description:new FormControl(''),
    customer_id:new FormControl('')
  })
  
}
