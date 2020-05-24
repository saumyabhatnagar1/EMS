import { Component,ViewChild, OnInit, AfterViewInit,Renderer2 } from '@angular/core';
import { AccountServiceService} from '../common/services/account-service.service';
import { RegisterService } from '../register/register.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class ManageEmployeeComponent implements OnInit {

  public employees:any;
  public cols :any;
  public showCreateAccount:boolean=false;
  first = 0;
  rows = 10;
  constructor(private confirmationService: ConfirmationService,private messageService: MessageService,private registerService:RegisterService,private accountService:AccountServiceService,private router:Router) { }
  ngOnInit(): void {
    this.cols = [
            
            { field: "username", header:"Username"},
            { field: "name" ,header:"Full Name"},
            { field: "designation",header:"Designation"},
            { field: "role" ,header:"Role"},
            { field: "createdOn",header:"Reg. Date"},
            { field: "isActive",header:"Status"},
            { field: "action",header:"Action"}
    ];
    this.getEmployeeData();

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
        return this.first === (this.employees.length - this.rows);
    }

    isFirstPage(): boolean {
        return this.first === 0;
    }
  
  showDialog(){
    this.showCreateAccount = true;
  }

  editEmployee(id){
    this.router.navigate(["/manage-employee/edit/"+id]);
  }

  deactivateEmployee(id){
      this.confirmationService.confirm({
            message: 'Are you sure that you want to deactivate account?',
            accept: () => {
                //Actual logic to perform a confirmation
                
                this.messageService.add({severity:'success',summary:'Account Deactivated'})
            }
        });
  }

  getEmployeeData(){
  	this.accountService.getUsers().subscribe(res=>{
      this.employees = res;
  	},err=>{
  		console.log(err);
        this.messageService.add({severity:'warn', summary:'Unauthorized Access!', detail:'Your account not authorized contact admin...'});
  	});
  }
  
  createAccount(){
    let data = JSON.stringify({
      "username":$('#email').val(),
      "password":$('#password').val()
    });
    this.accountService.createAccount(data).subscribe(res=>{
      //if(res["status"] == 201){
        this.messageService.add({severity:'success', summary:'Account created!', detail:'One employee record added into database...',life:5000});
        this.getEmployeeData();
      //}else{
        //this.messageService.add({severity:'warn', summary:'Account already exist', detail:'if problem persist contact admin...',life:5000});
     // }

    },err=>{
        this.messageService.add({severity:'error', summary:'Error occured!', detail:'something went wrong contact admin now...',life:5000});
      console.log(err);
    })
  }
}
