import { ViewTasksComponent } from './../view-tasks/view-tasks.component';
import { FormGroup, FormBuilder, FormControlDirective, FormControl } from '@angular/forms';
import { AccountServiceService } from './../../common/services/account-service.service';
import { ViewProjectService } from './view-project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService, SelectItem } from 'primeng/api';




@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewProjectComponent implements OnInit {

  constructor(private confirmationservice: ConfirmationService, private messageservice: MessageService, private accountService: AccountServiceService, private activeRoute: ActivatedRoute, private viewProjectService: ViewProjectService) { }
  public id: any;
  public project = []
  public value: number = 50;
  public project1: any;
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
    })

    //this.addTeamMember()
    this.getProjectById()
    this.getEmployeeData()
    this.getFreeEmployeeData()

  }

  public newTeamMember
  public employees: SelectItem[];
  getEmployeeData() {
    this.accountService.getUsers().subscribe(res => {
      this.formatData(res)
      //this.employees = res;

    }, err => {
      console.log(err);
    });

  }

  formatData(res) {
    //console.log(res)
    this.employees = []

    for (let i = 0; i < res.length; i++) {
      this.employees.push(
        { label: res[i].name, value: res[i].username }
      )
    }
    //console.log(this.employees)
  }

  getProjectById() {

    let data = {
      "project_id": this.id
    }
    this.viewProjectService.getProjectById(JSON.stringify(data)).subscribe(res => {
      console.log(res)
      this.project1 = res
      this.appendProject(res)

    },
      err => {
        console.log(err)
      })
  }

  appendProject(res) {
    let res1 = Object.entries(res)
    //console.log(this.project)
    for (let i = 0; i < res1.length; i++) {
      this.project.push(res1[i][1])
    }
    this.getTeamById()

    //console.log(this.project)
  }

  public teams1 = []
  public teams: any = this.teams1;
  getTeamById() {
    let data = {
      'project_id': (this.id)
    }

    this.viewProjectService.getTeamById(JSON.stringify(data)).subscribe(
      res => {
        //console.log(res)
        this.teams = res;
        console.log(this.teams)
        let res1 = Object.entries(res)
        for (let i = 0; i < res1.length; i++) {
          this.teams1.push(res1[i][1])
        }
        console.log(this.teams1)
      },
      err => {
        console.log(err)
      }
    )
  }

  public addMemberForm = new FormGroup({
    newTeamMember: new FormControl('')
  })




  addTeamMember() {

    let teamMember = this.addMemberForm.get('newTeamMember').value
    //console.log(teamMember)
    let str = teamMember[0]

    for (let i = 1; i < teamMember.length; i++) {
      str = str + ',' + teamMember[i]
    }
    //console.log(str)

    let data = {
      'project_id': this.id,
      'emp_id': str
    }
    //console.log(data)
    this.viewProjectService.addTeamMember(JSON.stringify(data)).subscribe(
      res => {
        //console.log(res)
        this.messageservice.add({ severity: 'success', summary: 'New Team member added...', life: 2000 })
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000)

        this.getTeamById()

      },
      err => {
        console.log(err)
      }
    )
  }


  public freeEmployees: SelectItem[];
  getFreeEmployeeData() {
    this.viewProjectService.getFreeEmployees().subscribe(res => {
      this.formatFreeEmployeesData(res)
      console.log(res)
      //this.employees = res;

    }, err => {
      console.log(err);
    });

  }

  formatFreeEmployeesData(res) {
    //console.log(res)
    this.freeEmployees = []

    for (let i = 0; i < res.length; i++) {
      this.freeEmployees.push(
        { label: res[i].username, value: res[i].username }
      )
    }
    console.log(this.freeEmployees)
    console.log("test")
  }



}

