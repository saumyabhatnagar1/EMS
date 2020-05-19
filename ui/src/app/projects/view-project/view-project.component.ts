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
  public id
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params=>{
      this.id = params.get('id')
    })
    this.getProjectById()
  }

  getProjectById(){
    
    let data = {
      "project_id":this.id.toString()
    }
    this.viewProjectService.getProjectById(JSON.stringify(data)).subscribe(res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
  }

}
