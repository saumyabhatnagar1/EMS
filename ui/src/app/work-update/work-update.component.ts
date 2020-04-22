import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from './projects.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrls: ['./work-update.component.css']
})
export class WorkUpdateComponent implements OnInit {
  page: number = 1;
  page1: number =1;
  count: number = 0;
  count2: number = 0;
  count3: number = 0;
  show: boolean = false;
  pid: number = 0;
  pid_team: number = 0;



  constructor(private projectservice: ProjectService) { }
  ngOnInit(): void {

    this.findAllProjects()

  }


  public taskJson: any;




  public projectForm = new FormGroup({
    name: new FormControl(''),
    team: new FormArray([
      new FormGroup({
        email: new FormControl(''),
        role: new FormControl('')
      })
    ])
  })


  team = this.projectForm.get('team') as FormArray

  addTeam(t2) {

    (this.projectForm.get('team') as FormArray).push(new FormControl(t2.value))
    //console.log(this.projectForm.get('team'))
    console.log(this.team)
  }

  addProject() {
    let projectJSON = JSON.stringify(this.projectForm.value)
    // console.log(this.projectForm.get('team')[0].value)
    console.log(projectJSON)


    this.projectservice.requestProject(projectJSON).subscribe(
      res => {

        console.log(res);
        //this.notificationService.showSuccess("Leave Application Submitted!!!");
      },
      err => {
        //this.notificationService.showFailed("Something went wrong!");
        console.log(err)
      });
this.findAllProjects()

  }








  public projectsApi: any;
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



  public taskForm = new FormGroup({
    project_id: new FormControl(''),
    description: new FormControl(''),
    assignee: new FormControl('')
  })

  onTaskSubmit() {
    let taskJSON = JSON.stringify(this.taskForm.value)
    // console.log(this.projectForm.get('team')[0].value)
    console.log(taskJSON)


    this.projectservice.createTask(taskJSON).subscribe(
      res => {

        console.log(res);

        //this.notificationService.showSuccess("Leave Application Submitted!!!");
      },
      err => {
        //this.notificationService.showFailed("Something went wrong!");
        console.log(err)
      });

  }

  public tasks=[]
  appendTasks(res){
    let taskData = Object.entries(res);

    this.tasks=[]
    for (let index = 0; index < taskData.length; index++) {
      this.tasks.push(taskData[index][1])

    }
    console.log(this.tasks)
  }

  public project_id2


  getTask(project_id) {
    this.projectservice.getAllTask(project_id.toString()).subscribe(
      res => {
        this.appendTasks(res)
        console.log(res);
      },
      err => {
        console.log(err)
      }
    )
    this.project_id2=project_id
  }

public task_id:number=0;



}


