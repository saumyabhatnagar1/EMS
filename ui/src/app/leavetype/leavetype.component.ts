import { Component, OnInit,ViewChild } from '@angular/core';
import { LeavesService } from './service.leavetype';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';

declare var $:any;
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
  @ViewChild('datatable') table;
  dataTable: any;
    

  leaves = [];
  pageOfItems: Array<any>;

  
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  ngOnInit(): void {

    this.findLeaveType(); 
    this.ifHRrole() 

   
  }  
  public tableData:any=[];
  initDataTable(){
    var table = $('#example').DataTable( {
        data: this.tableData,
        columns: [
            { title: "#S.No"},
            { title: 'Leave Type' },
            { title: "Action"},
        ],

        "scrollY": "200px",
        "scrollCollapse": true,
    } ); 
  }
  formatLeaveData(res){
    let res1 = Object.entries(res);
    for(var i = 0 ; i < res1.length;i++){
      //console.log('check')
      var tmp = [];
      var leavetype=`<input`
      var email= res[i].email|| "NA"; 
      var date = res[i].date || "NA";
      var status =res[i].status || "NA";
      //var status = res[i].isActive ? "Active":"Inactive";
      var action = `<button type="button" class="btn btn-primary modalShow">
  Update
</button>`;
      this.tableData.push([i+1,email,date,status,action,]);

    }

    console.log(this.tableData)
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
  public leave_id;
  public mssg;
  public LeaveTypeForm=new FormGroup({
    leave_type:new FormControl('')
  })
  public leaveType;
  public leave_types=[];
  findLeaveType(){
    this.leavesService.findLeaveType().subscribe(
      res=>{
          this.formatLeaveData(res)
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



