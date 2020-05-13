import { Component,ViewChild, OnInit, AfterViewInit,Renderer2 } from '@angular/core';
import { AccountServiceService} from '../common/services/account-service.service';
import { NotificationService} from '../common/services/notification.service';
import { RegisterService } from '../register/register.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements AfterViewInit,OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: any;
  constructor(private registerService:RegisterService,private renderer: Renderer2,private accountService:AccountServiceService,private notificationService:NotificationService,private router:Router) { }
  public tableData:any=[];
  ngOnInit(): void {
  	
    this.getEmployeeData();
  }
  
  initDataTable(){
  	$('#example').DataTable( {
        "bDestroy":true,
        data: this.tableData,
        columns: [
            { title: "#S.No"},
            { title: "Email" },
            { title: "Name" },
            { title: "Designation" },
            { title: "Role" },
            { title: "Reg. Date" },
            { title: "Status" },
            { title: "Action",
              render:function(data:any,type:any,full:any){
                return `<a style="cursor:pointer" class="" emp-id=`+full[1]+` ><i emp-id=`+full[1]+` class="material-icons" title="Edit">mode_edit</i></a>
                <a style="cursor:pointer"  emp-id=`+full[1]+` ><i  emp-id=`+full[1]+` class="material-icons" title="Edit">delete</i></a>`;
              }
          },
        ]
    } );
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("emp-id")) {
        console.log(event.target.getAttribute("emp-id"));
        this.router.navigate(["/manage-employee/edit/" + event.target.getAttribute("emp-id")]);
      }
    });
  }

  getEmployeeData(){
  	this.accountService.getUsers().subscribe(res=>{
  		this.formatEmpData(res);
      this.initDataTable();
      if(res["status"] == 401){
        this.notificationService.showFailed("Your account is not authorized!");
        this.router.navigate(['']);
      }
  	},err=>{
  		console.log(err);
  	});
  }
  formatEmpData(res){
    this.tableData = [];
    for(var i = 0 ; i < res.length;i++){
      var tmp = [];
      var mail = res[i].email || "NA"; 
      var name = res[i].name || "NA";
      var desg = res[i].designation || "NA"; 
      var role = res[i].role || "NA";
      var regDate = res[i].registeredOn || "NA";
      var status = res[i].isActive ? "<p style='color:green'>Active</p>":"<p style='color:red;'>Inactive</p>";
      var action = '';

      this.tableData.push([i+1,mail,name,desg,role,regDate,status,action]);
    }
  }

  createAccount(){
    let data = JSON.stringify({
      "email":$('#email').val(),
      "password":$('#password').val()
    });
    this.registerService.createAccount(data).subscribe(res=>{
      if(res["status"] == 201){
        this.notificationService.showSuccess("Account created!");
        this.getEmployeeData();
      }else{
        this.notificationService.showFailed("Error in account creation");
      }
      console.log(res);

    },err=>{
      this.notificationService.showFailed("something went wrong");
      console.log(err);
    })
  }
}
