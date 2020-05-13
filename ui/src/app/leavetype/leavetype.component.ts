import { AccountServiceService } from './../common/services/account-service.service';
import { Component, OnInit,ViewChild,AfterViewInit,Renderer2 } from '@angular/core';
import { LeavesService } from './service.leavetype';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute,Router } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';


declare var $:any;
@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent implements AfterViewInit, OnInit {



  
  public ifHR:boolean=false;
  public count:number=0;
  public page:number =1;
  public showLeaveType:boolean=false;
  public editDetails:boolean=false;
  @ViewChild('datatable') table;
  dataTable: any;

  dtOptions: any;
    

  leaves = [];
  pageOfItems: Array<any>;

  
  constructor(private activeRoute:ActivatedRoute,private accountService:AccountServiceService,private router:Router ,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService,private renderer:Renderer2) { }
  ngOnInit(): void {

  
    this.findLeaveType(); 
    this.ifHRrole() 
    
   
  }  
  public tableData:any=[];
  initDataTable(){
    var table = $('#example2').DataTable( {
        data: this.tableData,
        "bDestroy":true,
        columns: [

            { title: "sno"},
            { title: 'Leave Type' },
            { title: "Action",
              render:function(data:any,type:any,full:any){
                
                //console.log(full[1].toString())
                let value=full[1].toString()
                let leavevalue=(value.substring(value.indexOf('"')+1,value.lastIndexOf('"')))
                return `<a style="cursor:pointer" class="" type=`+leavevalue+` ><i type=`+leavevalue+` class="material-icons" title="Edit">mode_edit</i></a>
                <a style="cursor:pointer"  type=`+leavevalue+` ><i  type=`+leavevalue+` class="material-icons" title="Edit">delete</i></a>`;
                //return  `<a style="cursor:pointer" leavetyp='2'><i class="material-icons">mode_edit</i><a><a leavetyp='${leavevalue}'><i class="material-icons">delete</i></a>`;
              }
          }
        ],
    } ); 
  }

  ngAfterViewInit(): void {
    //console.log(this.table.cell(0,3).nodes().to$().find('input').val())
    this.renderer.listen('document', 'click', (event) => {
      console.log(event.target.getAttribute("type"));
      if (event.target.hasAttribute("type")) {
        this.router.navigate(["leavetype/edit/" + event.target.getAttribute("type")]);
      }
    });
  }

  formatLeaveData(res){
    let res1 = Object.entries(res);
    console.log(res)
    for(var i = 0 ; i < res1.length;i++){
      //console.log('check')
      var tmp = [];
      var value=res[i].value;
      var leavetype=`<input value="${value}" >`
      var action = '';
      this.tableData.push([i+1,leavetype,action]);

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
          this.initDataTable()
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



