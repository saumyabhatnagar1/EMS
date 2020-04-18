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

 


 


}


