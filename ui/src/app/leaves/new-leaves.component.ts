import { LeavesService } from './leaves.service';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';


@Component({
  selector: 'new-leaves',
  templateUrl: './new-leaves.component.html',
  styleUrls: ['./leaves.component.css']
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
      this.getAllLeaves();
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

}