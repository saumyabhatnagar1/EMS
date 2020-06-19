import { ProjectDashboardService } from './project-dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  constructor(private projectdashservice:ProjectDashboardService) { }

  ngOnInit(): void {
this.getProjectByNumber()
    
  }
  projectsNumber:any;
  getProjectByNumber(){
    this.projectdashservice.getProjectByNumber().subscribe(
      res=>{
        this.projectsNumber=res
        console.log(res)
        console.log(res['in progress'])
      },
      err=>{
        console.log(err)
      }
    )
  }

}
