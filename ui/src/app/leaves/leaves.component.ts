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
    let data=[
      {
        email,
        date
      }

    ]
    this.leavesService.updateLeaves(data).subscribe(
      res=>{
        this.mssg=res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )

  }

}