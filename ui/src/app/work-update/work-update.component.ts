import { FormControl,FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from './projects.service';
import { Component, OnInit } from '@angular/core';
import projects from '../../assets/projects.json';
import tasks from '../../assets/tasks.json';

@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrls: ['./work-update.component.css']
})
export class WorkUpdateComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  count2: number = 0;
  count3: number = 0;
  show: boolean = false;
  pid:number=0;
  pid_team:number=0;
  


  constructor(private projectservice:ProjectService) { }
  ngOnInit(): void {
    this.get_projects()
    this.findAllProjects()
    
  }
public projectJson:any;
  get_projects(){
    this.projectservice.get_projects().subscribe(
      res=>{
        this.projectJson=res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }

public taskJson:any;
  get_tasks(pid){

    let project_id=this.projectJson[pid].project_id
    let resultarray:Array<string|string>=[];
      this.projectservice.get_tasks(pid).subscribe(
        res=>{
          this.taskJson=res;
          Object.keys(res).map(function(key){
            let task=res[key];
            if(task.project_id==project_id)
            resultarray.push(task);
          });
          console.log(resultarray)
        },
        err=>{
          console.log(err)
        }
      )
  }


  public projectForm = new FormGroup({
    name:new FormControl(''),
    team:new FormArray([
      new FormGroup({
        email:new FormControl(''),
        role:new FormControl('')
     })
    ])
    })

    
    team = this.projectForm.get('team') as FormArray

    addTeam(t2){
      
      (this.projectForm.get('team') as FormArray).push(new FormControl(t2.value))
      //console.log(this.projectForm.get('team'))
      console.log(this.team)
    }

  onConfirm()
  {
    let projectJSON = JSON.stringify(this.projectForm.value)
   // console.log(this.projectForm.get('team')[0].value)
    console.log(projectJSON)

    
    this.projectservice.requestProject(projectJSON).subscribe(
      res=>{
      
        console.log(res);
        //this.notificationService.showSuccess("Leave Application Submitted!!!");
      },
      err=>{
        //this.notificationService.showFailed("Something went wrong!");
        console.log(err)
    });
    
    
  }



 




public projectsApi:any;
  findAllProjects(){
    this.projectservice.getAllProjects().subscribe(
      res=>{
        this.appendProjects(res);
        console.log(res);
      },
      err=>{
        console.log(err)
      }
    )
  }
  public projects=[];
  appendProjects(res){
    let projectData=Object.entries(res);
    console.log(projectData)
    this.projects=[];
    for(let index=0;index<projectData.length;index++)
    {
      this.projects.push(projectData[index][1])
    }
    console.log(projects)
  }

 


 


}


