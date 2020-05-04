import { LeavesService } from '../leaves.service';
import { PrincipleService } from '../../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../../common/services/notification.service';


@Component({
  selector: 'new-leaves',
  templateUrl: './new-leaves.component.html',
  styleUrls: ['../leaves.component.css']
})
export class NewLeavesComponent implements OnInit {
    public remainingLeaves:number=21;
    leaves = [];


    public dateForm=new FormGroup({
        dateLeave:new FormControl('',Validators.required),
        reason:new FormControl('',Validators.required)
      })

    constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
    
    ngOnInit(): void {
      this.findLeaveType()
    }

    

    get reason(){
        return this.dateForm.get('reason');
      }

    get dateLeave(){
        return this.dateForm.get('dateLeave');
      }

  onConfirm()
  {
    let data = {
      "email" : this.principle.getUsername(),
      "date" : this.dateForm.get('dateLeave').value,
      "reason" : this.dateForm.get('reason').value
    }
    this.leavesService.requestLeave(data).subscribe(
      res=>{
        this.notificationService.showSuccess("Leave Application Submitted!!!");
      },
      err=>{
        this.notificationService.showFailed("Something went wrong!");
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


}