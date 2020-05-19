import { ViewProjectService } from './view-project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,private viewProjectService: ViewProjectService) { }
  public id:any;
  public project = []
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params=>{
      this.id = params.get('id')
    })
    this.getProjectById()
  }


  getProjectById(){
    
    let data = {
      "project_id":this.id
    }
    this.viewProjectService.getProjectById(JSON.stringify(data)).subscribe(res=>{
      console.log(res)
      this.appendProject(res)
    },
    err=>{
      console.log(err)
    })
  }

  appendProject(res){
    let res1 = Object.entries(res)
    //console.log(this.project)
    for(let i=0;i<res1.length;i++){
      this.project.push(res1[i][1])
    }
    console.log(this.project)
  }

}
