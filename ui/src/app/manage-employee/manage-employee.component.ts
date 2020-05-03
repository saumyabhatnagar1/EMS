import { Component,ViewChild, OnInit } from '@angular/core';
import { AccountServiceService} from '../common/services/account-service.service';
import { NotificationService} from '../common/services/notification.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: any;
  constructor(private accountService:AccountServiceService,private notificationService:NotificationService,private router:Router) { }
  public tableData:any=[];
  ngOnInit(): void {
  	
    this.getEmployeeData();
  }
  
  initDataTable(){
  	$('#example').DataTable( {
        data: this.tableData,
        columns: [
            { title: "#S.No"},
            { title: "Email" },
            { title: "Name" },
            { title: "Designation" },
            { title: "Role" },
            { title: "Reg. Date" },
            { title: "Status" },
            { title: "Action" },
        ]
    } );
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
    for(var i = 0 ; i < res.length;i++){
      var tmp = [];
      var mail = res[i].email || "NA"; 
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
}
