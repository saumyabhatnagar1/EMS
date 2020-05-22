import { ViewTasksComponent } from './../view-tasks/view-tasks.component';
import { FormGroup, FormBuilder, FormControlDirective,FormControl } from '@angular/forms';
import { AccountServiceService } from './../../common/services/account-service.service';
import { ViewProjectService } from './view-project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';



@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ViewProjectComponent implements OnInit {

  constructor(private confirmationservice : ConfirmationService,private messageservice: MessageService,private accountService:AccountServiceService,private activeRoute:ActivatedRoute,private viewProjectService: ViewProjectService) { }
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
        this.messageservice.add({severity:'success',summary: 'New Team member added...',life:2000})
        setTimeout(()=>{
          window.location.reload()
        },2000) 
        
           
      },
      err=>{
        console.log(err)
      }
    )

    
   
    
   //
    
    

  }
  onclick(){
    console.log('test')
    this.messageservice.add({severity:'success',summary: 'test'})
  }
  

}

