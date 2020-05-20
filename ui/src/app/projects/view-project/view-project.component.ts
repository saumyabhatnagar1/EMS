import { FormGroup, FormBuilder, FormControlDirective,FormControl } from '@angular/forms';
import { AccountServiceService } from './../../common/services/account-service.service';
import { ViewProjectService } from './view-project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {SelectItem,MessageService} from 'primeng/api';



@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  constructor(private accountService:AccountServiceService,private activeRoute:ActivatedRoute,private viewProjectService: ViewProjectService) { }
  public id:any;
  public project = []
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params=>{
      this.id = params.get('id')
    })

    //this.addTeamMember()
    this.getProjectById()
    this.getEmployeeData()
    
  }

  public newTeamMember
  public employees=[]
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

  getProjectById(){
    
    let data = {
      "project_id":this.id
    }
    this.viewProjectService.getProjectById(JSON.stringify(data)).subscribe(res=>{
      
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
   this.getTeamById()
  
    console.log(this.project)
  }
public teams:any
public teams1=[]
  getTeamById(){
    let data={
      'project_id':(this.id)
    } 
    
    this.viewProjectService.getTeamById(JSON.stringify(data)).subscribe(
      res=>{
        console.log(res)
        this.teams=res;
        let res1=Object.entries(res)
        for(let i=0;i<res1.length;i++)
        { 
          this.teams1.push(res1[i][1])
        }
        console.log(this.teams1)
      },
      err=>{
        console.log(err)
      }
    )
  }

  public addMemberForm=new FormGroup({
    newTeamMember:new FormControl('')
  })
  addTeamMember(){

    
  
    let data={
      'project_id':this.id,
      'emp_id':this.addMemberForm.get('newTeamMember').value
    }
    this.viewProjectService.addTeamMember(JSON.stringify(data)).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
    this.getProjectById()
  }
  

}

