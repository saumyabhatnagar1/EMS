import { LeavesService } from '../leaves.service';
import { PrincipleService } from '../../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../../common/services/notification.service';
//import $ from "jquery";
import { Router } from '@angular/router';

declare var $: any;
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

  @ViewChild('dataTable') table;
  dataTable: any;
  //dtOptions: any;
  first = 0;
  rows = 10;
  public cols:any;

 
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService,private router:Router) { }
  public tableData:any=[];

  // dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.getAllLeaves();
    this.cols = [

     
      { field: "sno.", header:"#S no."},
      { field: "leavetype" ,header:"Leave Type"},
      {filed: "date", header:"Date"},
      { field: "description",header:"Description"},
      { field: "postingdate" ,header:"Posting Date"},
      { field: "admin_remark",header:"Admin Remark "},
      { field: "admin_remark_date",header:"Admin Remark Date"},
      { field: "status",header:"Status"},


    ];

    
  }  
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.first === (this.leaves.length - this.rows);
}

isFirstPage(): boolean {
    return this.first === 0;
}

  

  initDataTable(){
  	$("#example").DataTable( {
        data: this.tableData,
        columns: [
            { title: "#S.No"},
            { title: "Leave Type" },
            { title: "Date" },
            { title: "Description" },
            { title: "Posting Date" },
            { title: "Admin Remark" },
            {title : "Admin Remark Date"},
            { title: "Status" },
        ],

        
       
        
    } );
    
    
  }

  

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getAllLeaves(){
      this.leavesService.getLeavesByUsername(JSON.stringify({"emp_id":this.principle.getUsername() })).subscribe(
        res=>{
             this.formatEmpData(res);
               this.initDataTable();
              if(res["status"] == 400){
                this.router.navigate(['']);
                //no leaves found//// 
              }else{
                this.appendLeaves(res);
                console.log(res)
              }
        },err=>{
             console.log(err);
      });;
  }

  formatEmpData(res){
    let res1 = Object.entries(res);
    for(var i = 0 ; i < res1.length;i++){
      //console.log('check')
      var tmp = [];
      var leave_type = res[i].leave_type|| "NA"; 
      var date = res[i].date || "NA";
      var description = res[i].description || "NA"; 
      var posting_date = res[i].posting_date || "NA";
      var admin_remark = res[i].admin_remark|| "NA";
      var admin_remark_date = res[i].admin_remark_date || "NA"
      var status
      var status;
      if(res[i].status==0){
        status='Pending'
      }
      else if(res[i].status==1){
        status='Approved'
      }
      else {
        status='Rejected'
      }
      // //var status = res[i].isActive ? "Active":"Inactive";
      // var action = `<a href=`+res[i].id+`>
      //                   <i class="material-icons" title="Edit">mode_edit</i>
      //               </a>
      //               <a href="#">
      //                   <i class="material-icons" title="Delete">clear</i>
      //               </a>`;
      this.tableData.push([i+1,leave_type,date,description,posting_date,admin_remark,admin_remark_date,status]);

    }

    console.log(this.tableData)
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