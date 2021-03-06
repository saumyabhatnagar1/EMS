import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { ProjectsService } from './projects.service';
import { SelectItem, MessageService } from 'primeng/api';
import { AccountServiceService } from '../common/services/account-service.service';
import { MultiSelectItem } from 'primeng/multiselect/public_api';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../common/services/notification.service';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [MessageService],
})
export class ProjectsComponent implements OnInit {



  public cols: any;
  public showCreateProject: boolean = false;
  first = 0;
  rows = 10;
  employees: SelectItem[];
  users: SelectItem[]
  constructor(private notificationService: NotificationService, private messageService: MessageService, private projectservice: ProjectsService, private accountService: AccountServiceService, private router: Router) {
    this.users = [
      {
        label: 'Tata', value: 'Tata'
      },
      { label: 'JP Morgan', value: 'JP Morgan' },
      { label: 'Rajdhani Solutions', value: 'Rajdhani Solution' }
    ]
  }



  ngOnInit(): void {


    this.cols = [

      { field: "name", header: "Name" },
      { field: "assignTo", header: "Assign To" },
      { field: "status", header: "Status" },
      { field: "deadline", header: "Deadline" },
      { field: "customer_id", header: "Customer Id" },
      //{ field: "complete_percentage",header:"Complete %"},
      { field: "description", header: "Description" },
      { field: "createdOn", header: "Created On" },
      { field: "action", header: "Action" },


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

  showDialog() {
    this.showCreateProject = true;
  }
  closeDialog() {
    this.showCreateProject = false
  }

  viewProject(id) {
    this.router.navigate(["/projects/view/" + id]);

  }

  addNewProject() {
    let projectJSON = JSON.stringify(this.projectForm.value)
    console.log(projectJSON)

    this.projectservice.addProject(projectJSON).subscribe(
      res => {

        this.messageService.add({ severity: 'success', summary: 'Created!', detail: 'New Project Added.', life: 5000 });

        this.findAllProjects();
      },
      err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'something went wrong in api', life: 5000 });
      });

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

  getEmployeeData() {
    this.accountService.getUsers().subscribe(res => {
      this.formatData(res)
      console.log(res)
      //this.employees = res;

    }, err => {
      console.log(err);
    });

  }

  formatData(res) {
    //console.log(res)
    this.employees = []
    var res1 = Object.entries(res)
    for (let i = 0; i < res1.length; i++) {
      this.employees.push(
        { label: res[i].name, value: res[i].username }
      )
    }
    console.log(this.employees)
  }

  public projectForm = new FormGroup({
    name: new FormControl(''),
    assignTo: new FormControl(''),
    deadline: new FormControl(''),
    description: new FormControl(''),
    customer_id: new FormControl('')
  })

}
