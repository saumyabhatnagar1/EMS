import { LeavesService } from '../leaves.service';
import { PrincipleService } from '../../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../../common/services/notification.service';


@Component({
  selector: 'status-leaves',
  templateUrl: './status-leaves.component.html',
  styleUrls: ['../leaves.component.css']
})
export class StatusLeavesComponent implements OnInit {
    
  
  public count:number=0;
  public page:number =1;
  leaves = [];
  pageOfItems: Array<any>;

 
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  ngOnInit(): void {
    this.getAllLeaves();
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
  

}