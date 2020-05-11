import { Component, OnInit } from '@angular/core';
import { LeavesService } from './service.leavetype';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent implements OnInit {



  
  public ifHR:boolean=false;
  public count:number=0;
  public page:number =1;
  public showLeaveType:boolean=false;
  public editDetails:boolean=false;

  leaves = [];
  pageOfItems: Array<any>;

  
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  ngOnInit(): void {
    this.getAllLeaves();
    this.findLeaveType(); 
    this.ifHRrole() 
    
  }  

  
 ifHRrole(){
  if(this.principle.getRole()==="HR")
  this.ifHR=true;
 }

 
 public leaveTypeFormChange=new FormGroup({
 leave:new FormControl('')
});

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
      this.getAllLeaves()
  }





  public LeaveTypeForm=new FormGroup({
    leave_type:new FormControl('')
  })

  public leaveType;
 
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
    // this.leaveTypeFormChange.get('leave').setValue(this.leave_types[0].value)
    console.log(this.leave_types)
}

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
      this.notificationService.showSuccess("Leave type added!!!")
      
    },
    err=>{
      console.log(err);
      this.notificationService.showFailed("Something went wrong")

    }
  )
  this.findLeaveType()
}


run(value){
  this.leaveTypeFormChange.get('leave').setValue(value)
}

  updateLeaveType(leavetype){
    console.log(leavetype.id)
    let value=this.leaveTypeFormChange.get('leave').value;
    let data={
      'id':leavetype.id,
      'value':value

    }
    


    this.leavesService.updateLeaveType(JSON.stringify(data)).subscribe(
      res=>{
        console.log(res)
        this.notificationService.showSuccess("Leave type saved!!!")

      },
      err=>{
        console.log(err)
        this.notificationService.showFailed("Something went wrong")
      }
    
    )
    this.findLeaveType()
    this.editDetails=false;

  }
  deleteLeaveType(id){
    let data={
      'id':id
    }
    this.leavesService.deleteLeaveType(JSON.stringify(data)).subscribe(
      res=>{
        console.log(res)
        this.notificationService.showSuccess("Leave type deleted!!!")

      },
      err=>{
        console.log(err)
        this.notificationService.showFailed("Something went wrong")

      }
    )
    this.findLeaveType()
}
}
