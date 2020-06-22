import { LeavesService } from '../leaves.service';
import { PrincipleService } from '../../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit ,Renderer2} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../../common/services/notification.service';
import { SelectItem, MessageService } from 'primeng/api';



declare var $: any;
@Component({
  selector: 'manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['../leaves.component.css'],
  providers:[MessageService]

})
export class ManageLeavesComponent implements OnInit  {

  public ifHR:boolean=false;
  public count:number=0;
  public page:number =1;
  public showLeaveType:boolean=false;
  public editDetails:boolean=false;
  public leaveid:any
  leaves = [];
  pageOfItems: Array<any>;
  dtOptions: any;
  
  @ViewChild('datatable') table;
  dataTable: any;
  first = 0;
  rows = 10;
public cols:any;
  
  constructor( private messageservice:MessageService,private renderer : Renderer2,private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  public tableData:any=[];
  ngOnInit(): void {
    this.getAllLeaves();
    
    this.ifHRrole();
    // this.showModalForStatusUpdate();
    this.cols = [

     
      { field: "sno.", header:"#S no."},
      { field: "email" ,header:"Email"},
      {filed: "leave_type", header:"Leave Type"},
      { field: "date",header:"Date"},
      { field: "description" ,header:"Description"},
      { field: "status",header:"Status"},
      { field: "action",header:"Action"},


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
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  // showModalForStatusUpdate(){
  //   $(document).on('click','.modalShow',function(e) {
  //     document.getElementById('modalForStatusUpdate').style.display = 'block';
  //   });
  // }
  // closeModal(){
  //   document.getElementById('modalForStatusUpdate').style.display = 'none';
  // }

 
  
 ifHRrole(){
  if(this.principle.getRole()==="HR")
  this.ifHR=true;
 }

 
 public leavestatus=new FormGroup({
 status:new FormControl(''),
  desc:new FormControl('')
});
saveLeaveStatus(){
  console.log(this.leavestatus.value)
}

  

  getAllLeaves(){
      this.leavesService.getAllLeaves().subscribe(
        res=>{
              console.log(res)
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
          // if(this.leaves[index].status=="1"){
          //   this.leaves[index].status = "Approved";
          // }
          // else if (this.leaves[index].status=="0"){
          //   this.leaves[index].status=="Pending"
          // }
          // else{
          //   this.leaves[index].status = "Rejected";
          // }
      }
      console.log(this.leaves)
  }
  public leave_id;
  
  public emp_id;
  public date;
  setEmpId(id){
    
    this.emp_id=id.getAttribute('emp-id')
    this.date=id.getAttribute('date')
    console.log(this.emp_id,this.date)
  }


  updateStatus(){
    var status : any
    if ($("#leavesStatus").val() === 'Approved'){
      status = 1
    }
    else if($("#leavesStatus").val() === 'Rejected'){
      status = 2
    }
    let data=
      {
        emp_id:this.emp_id,
        date:this.date,
        admin_remark: $('#leavesDesc').val(),
        status: status,

      }
      
      console.log(data)
    let dataJSON=JSON.stringify(data)
  
    this.leavesService.updateLeaves(dataJSON).subscribe(
      res=>{
        this.messageservice.add({severity:'success',summary:'Leave Status Updated'})
        console.log(res)
        this.getAllLeaves()
      },
      err=>{
        this.messageservice.add({severity:'error',summary:'Some Error Occured'})
        console.log(err)
      }
    )
      
  }  
  
}