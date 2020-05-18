import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import {SelectItem} from 'primeng/api';
import { AccountServiceService} from '../common/services/account-service.service';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


  public users = ['Saumya',"Rishabh",'Sarthak'];
  public cols :any;
  public showCreateAccount:boolean=false;
  first = 0;
  rows = 10;

  employees:SelectItem[];
  constructor(private projectservice: ProjectsService,private accountService:AccountServiceService) { 

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
this.showCreateAccount = true;
}

//   addProject() {
//     let projectJSON = JSON.stringify(this.projectForm.value)
//     // console.log(this.projectForm.get('team')[0].value)
//     console.log(projectJSON)


//     this.projectservice.requestProject(projectJSON).subscribe(
//       res => {

//         console.log(res);
//         //this.notificationService.showSuccess("Project Added!!!");
//       },
//       err => {
//         //this.notificationService.showFailed("Something went wrong!");
//         console.log(err)
//       });
// this.findAllProjects()

//   }

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

}
