import { LeavesService } from '../leaves.service';
import { PrincipleService } from '../../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../../common/services/notification.service';

declare var $: any;
@Component({
  selector: 'manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['../leaves.component.css']
})
export class ManageLeavesComponent implements OnInit {

  public ifHR:boolean=false;
  public count:number=0;
  public page:number =1;
  public showLeaveType:boolean=false;
  public editDetails:boolean=false;

  leaves = [];
  pageOfItems: Array<any>;
  
  @ViewChild('datatable') table;
  dataTable: any;

  
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  public tableData:any=[];
  ngOnInit(): void {
    this.getAllLeaves();
    this.findLeaveType(); 
    this.ifHRrole();
    this.showModalForStatusUpdate();
  }  

  showModalForStatusUpdate(){
    $(document).on('click','.modalShow',function(e) {
      document.getElementById('modalForStatusUpdate').style.display = 'block';
    });
  }
  closeModal(){
    document.getElementById('modalForStatusUpdate').style.display = 'none';
  }

  updateLeaveStatus(){
    //todo
  }

  initDataTable(){
  	var table = $('#example').DataTable( {
        data: this.tableData,
        columns: [
            { title: "#S.No"},
            { title: 'Email' },
            { title: "Date" },
            { title: "Status" },
            { title: "Action"},
        ],

        "scrollY": "200px",
        "scrollCollapse": true,
    } );
    
    
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
              this.formatEmpData(res);
              this.initDataTable();
              if(res["status"] == 400){
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
    },
    err=>{
      console.log(err);
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
      },
      err=>{
        console.log(err)
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
      },
      err=>{
        console.log(err)
      }
    )
    this.findLeaveType()
  }



  
  
}