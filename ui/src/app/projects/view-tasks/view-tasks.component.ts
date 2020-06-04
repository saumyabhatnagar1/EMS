import { ViewTasksService } from './view-tasks.service';
import { ViewProjectComponent } from './../view-project/view-project.component';
import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { MultiSelectItem } from 'primeng/multiselect/public_api';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceService } from '../../common/services/account-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';





@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
  providers: [MessageService]
})
export class ViewTasksComponent implements OnInit {

  constructor(private messageService: MessageService, private viewProjectComponent: ViewProjectComponent, private accountService: AccountServiceService, private viewTaskService: ViewTasksService) { }

  public cols: any;
  public showCreateTask: boolean = false;
  public showUpdateTask: boolean = false;
  first = 0;
  rows = 10;
  public tasks = []
  employees: SelectItem[];
  public status: SelectItem[] = [
    { label: 'In Backlog', value: 0 },
    { label: 'In BA', value: 1 },
    { label: 'In Dev', value: 2 },
    { label: 'In QA', value: 3 },
    { label: 'In Staging', value: 4 },

  ];


  public id = this.viewProjectComponent.id
  ngOnInit(): void {
    this.getUser()
    // this.getAllComments()
    // this.addComment()
    this.cols = [


      { field: "title", header: "Title" },
      { field: "assignTo", header: "Assign To" },
      { filed: "project_id", header: "Project Id" },
      { field: "status", header: "Status" },
      { field: "deadline", header: "Deadline" },
      { field: "createdOn", header: "Created On" },
      { field: "description", header: "Description" },
      { field: "action", header: "Action" },


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

  showDialog() {
    this.showCreateTask = true;
  }
  public test_id: any
  public tasksbyid: any
  showUpdateDialog(id) {
    this.test_id = id
    // console.log(this.test_id)
    this.showUpdateTask = true
    var taskid = (id.getAttribute('data-message-id'))
    this.tasksbyid = this.tasks.filter((task) => {
      return task.id == taskid
    })
    console.log(this.tasksbyid[0].id)
    this.getAllComments()

  }

  closeDialog() {
    this.showCreateTask = false
    this.showUpdateTask = false
  }

  test() {
    console.log(this.viewProjectComponent.id)
    console.log(this.employees)
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
    for (let i = 0; i < res.length; i++) {
      this.employees.push(
        { label: res[i].name, value: res[i].username }
      )
    }
    console.log(this.employees)
  }

  public TaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    deadline: new FormControl(''),
    assignTo: new FormControl(''),

  })

  addTask() {
    let data = {
      "project_id": this.viewProjectComponent.id,
      "title": this.TaskForm.get('title').value,
      "description": this.TaskForm.get('description').value,
      "deadline": this.TaskForm.get('deadline').value,
      "assignTo": this.TaskForm.get('assignTo').value
    }
    console.log(data)
    this.viewTaskService.addTask(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'New Team member added...', life: 2000 })
        this.getTask()
      }, err => {
        console.log(err)
      })

  }

  getTask() {
    let data = {
      "project_id": this.viewProjectComponent.id
    }

    this.viewTaskService.getTask(JSON.stringify(data)).subscribe(
      res => {
        //console.log(res)
        let res1 = Object.entries(res)
        this.tasks = []
        for (let i = 0; i < res1.length; i++) {
          this.tasks.push(res1[i][1])
        }
        console.log(this.tasks)

      }, err => {
        console.log(err)
      }
    )
  }

  public statusForm = new FormGroup({
    'status': new FormControl(''),

  })

  updateTask() {
    let data = {
      'id': this.tasksbyid[0].id,
      'status': this.statusForm.get('status').value
    }

    this.viewTaskService.updateStatus(JSON.stringify(data)).subscribe(
      res => {
        console.log(this.tasksbyid.id)
        console.log(res)
        this.getTask()
      },
      err => {
        console.log(err)
      }
    )
    // console.log(this.tasksbyid.id)

  }

  public currentUser: any

  getUser() {
    this.accountService.getUser().subscribe(
      res => {
        this.currentUser = res
      },
      err => {
        console.log(err)
      }
    )
  }


  public commentForm = new FormGroup({
    'comment': new FormControl(''),

  })

  addComment() {
    let data = {
      'task_id': this.tasksbyid[0].id,
      'username': this.currentUser.username,
      'comment': this.commentForm.get('comment').value
    }
    this.viewTaskService.addComment(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'Comment Added!!!', life: 2000 })

      },
      err => {
        console.log(err)
      }
    )

    // console.log(data)
  }
  public comments: any
  getAllComments() {
    let data = {
      'task_id': this.tasksbyid[0].id
    }
    this.viewTaskService.getAllComments(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.comments = res

      },
      err => {
        console.log(err)
      }
    )

  }

}

