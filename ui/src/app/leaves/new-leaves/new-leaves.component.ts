import { LeavesService } from '../leaves.service';
import { PrincipleService } from '../../util/principle.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../../common/services/notification.service';
import { SelectItem, MessageService } from 'primeng/api';



@Component({
  selector: 'new-leaves',
  templateUrl: './new-leaves.component.html',
  styleUrls: ['../leaves.component.css'],
  providers:[MessageService]

})
export class NewLeavesComponent implements OnInit{
    public remainingLeaves:number=0;
    public sick_remaining;
    public vacation_remaining;
    leaves = [];


    public dateForm=new FormGroup({
        dateLeave:new FormControl('',Validators.required),
        reason:new FormControl('',Validators.required),
        description:new FormControl('',Validators.required)
      })

    constructor(private messageservice:MessageService,private fb: FormBuilder,private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
    
    ngOnInit(): void {
      this.findLeaveType();
      this.getRemainingLeaves();
      
    }
   
    

    get reason(){
        return this.dateForm.get('reason');
      }

    get dateLeave(){
        return this.dateForm.get('dateLeave');
      }
      get description(){
        return this.dateForm.get('description')
      }

  onConfirm()
  {
    let data = {
      "emp_id" : this.principle.getUsername(),
      "date" : this.dateForm.get('dateLeave').value,
      "leave_type" : this.dateForm.get('reason').value,
      "description":this.dateForm.get('description').value
    }
  

    this.leavesService.newLeave(data).subscribe(
      res=>{
        this.messageservice.add({severity:'success',summary:'Leave Request Submitted'});
        this.getRemainingLeaves();
      },
      err=>{
        this.messageservice.add({severity:'error',summary:'Somer Error Occured'})
    });
   
  }
  public leave_types=[];
  findLeaveType(){
    this.leavesService.findLeaveType().subscribe(
      res=>{
           this.appendLeaveType(res)
      },err=>{
           console.log(err);
    });;
    
  }
  appendLeaveType(res){
    let leavesTypeData = Object.entries(res); 
    // this.leave_types = [];     
    for(let index = 0; index<leavesTypeData.length;index++){
        this.leave_types.push(leavesTypeData[index][1]);
    }
    console.log(this.leave_types)
}

getRemainingLeaves(){
    let emp_id=this.principle.getUsername();
  this.leavesService.getRemainingLeaves(emp_id).subscribe((response:any)=>{
    console.log(response)
    if(response && response.length>0){
      this.remainingLeaves=0;
      let keys = Object.keys(response[0]['leavesLeft']);
      // keys.forEach((k)=>{
      //   this.remainingLeaves+=response[0]['leavesLeft'][k];
      // })
      for(let i=0;i<keys.length;i++){
        let a=keys[i]
        this.remainingLeaves+=response[0]['leavesLeft'][a];
      }
   }
  },error=>{
    console.log(error);
  })
}


}