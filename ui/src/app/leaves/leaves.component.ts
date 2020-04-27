import { LeavesService } from './leaves.service';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  public command:string;
  public count:number=0;
  public page:number =1;
  public showLeaveType:boolean=false;
  public remainingLeaves:number=21;
  leaves = [];
  pageOfItems: Array<any>;

  public dateForm=new FormGroup({
    dateLeave:new FormControl('',Validators.required),
    reason:new FormControl('',Validators.required)
  })
  
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  ngOnInit(): void {
      this.activeRoute.paramMap.subscribe(params=>{
          this.command = params.get('command');
          this.getAllLeaves();
          this.findLeaveType();
      });    
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

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getAllLeaves(){
      this.leavesService.getAllLeaves().subscribe(
        res=>{
              if(res["status"] == 400){
                //no leaves found////
              }else{
                this.appendLeaves(res);
              }
        },err=>{
             console.log(err);
      });;
  }

  appendLeaves(res){
      let leavesData = Object.entries(res); 
      this.leaves = [];     
      for(let index = 0; index<leavesData.length;index++){
          this.leaves.push(leavesData[index][1]);
          if(!this.leaves[index].approved){
            this.leaves[index].status = "Pending";
          }else{
            this.leaves[index].status = "Approved";
          }
      }
      console.log(this.leaves)
  }
  public leave_id;
  public mssg;
  updateStatus(email,date){
    
    let data=
      {
        'email':email,
        'date':date
      }
    let dataJSON=JSON.stringify(data)
    this.leavesService.updateLeaves(dataJSON).subscribe(
      res=>{
        this.mssg=res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )

  }

  public LeaveTypeForm=new FormGroup({
    leave_type:new FormControl('')
  })

  public leaveType;
  addLeaveType(){
    
    let data=
    {
      'value':this.LeaveTypeForm.get('leave_type').value
    }
    
    let leaveTypeJSON=JSON.stringify(data);
    console.log(leaveTypeJSON)

    this.leavesService.addLeaveType(data).subscribe(
      res=>{
        this.leaveType=res;
        console.log(res)
      },
      err=>{
        console.log(err);
      }
    )
    this.findLeaveType()
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
    this.leave_types = [];     
    for(let index = 0; index<leavesTypeData.length;index++){
        this.leave_types.push(leavesTypeData[index][1]);
    }
    console.log(this.leave_types)
}
  updateLeaveType(leavetype){
    console.log(leavetype.id)
    let data={
      'id':leavetype.id,
      'value':leavetype.value
    }

    this.leavesService.updateLeaveType(JSON.stringify(data)).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    
    )
    this.findLeaveType()

  }
  deleteLeaveType(id){
    let data={
      'id':id
    }
    this.leavesService.deleteLeaveType(JSON.stringify(data)).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
    this.findLeaveType()
  }

}
