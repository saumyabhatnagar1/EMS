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
  

  initDataTable(){
  	$('#example').DataTable( {
        data: this.tableData,
        columns: [
            { title: "#S.No"},
            { title: "From" },
            { title: "To" },
            { title: "Description" },
            { title: "Posting Date" },
            { title: "Admin Remak" },
            { title: "Status" },
            { title: "Action" },
        ]
    } );
  }

  

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getAllLeaves(){
      this.leavesService.getAllLeaves().subscribe(
        res=>{
             this.formatEmpData(res);
              this.initDataTable();
              if(res["status"] == 400){
                //no leaves found//// 
              }else{
                this.appendLeaves(res);
              }
        },err=>{
             console.log(err);
      });;
  }

  formatEmpData(res){
    for(var i = 0 ; i < res.length;i++){
      var tmp = [];
      var mail = res[i].name|| "NA"; 
      var name = res[i].name || "NA";
      var desg = res[i].designation || "NA"; 
      var role = res[i].role || "NA";
      var regDate = res[i].registeredOn || "NA";
      var status = res[i].isActive ? "Active":"Inactive";
      var action = `<a href=`+res[i].id+`>
                        <i class="material-icons" title="Edit">mode_edit</i>
                    </a>
                    <a href="#">
                        <i class="material-icons" title="Delete">clear</i>
                    </a>`;
      this.tableData.push([i+1,mail,name,desg,role,regDate,status,action]);
    }
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