import { AccountServiceService } from './../common/services/account-service.service';
import { Component, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { LeavesService } from './service.leavetype';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../common/services/notification.service';
import { SelectItem, MessageService } from 'primeng/api';




declare var $: any;
@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent implements AfterViewInit, OnInit {
  public ifHR: boolean = false;
  public page: number = 1;
  public showLeaveType: boolean = false;
  public editDetails: boolean = false;
  public showDeleteLeaveType: boolean = false;
  @ViewChild('datatable') table;
  dataTable: any;
  dtOptions: any;
  pageOfItems: Array<any>;
  public cols: any;
  public showCreateLeaveType: boolean = false;
  public showEditLeaveType: boolean = false;
  first = 0;
  rows = 10;
  constructor(private activeRoute: ActivatedRoute, private accountService: AccountServiceService, private router: Router, private notificationService: NotificationService, private leavesService: LeavesService, public principle: PrincipleService, private renderer: Renderer2) { }
  ngOnInit(): void {

    this.cols = [

      { field: "sno", header: "S.No" },
      { field: "leavetype", header: "Leave-Type" },
      { field: "description", header: "Description" },
      { field: "action", header: "Action" },


    ];


    // this.showModalLeavetypeEdit()
    // this.showModalLeavetypeDelete()
    this.findLeaveType();
    this.ifHRrole()
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
    return this.first === (this.leave_types.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  showCreateDialog() {
    this.showCreateLeaveType = true;
  }
  showEditDialog() {
    this.showEditLeaveType = true;
  }
  showDeleteDialog() {
    this.showDeleteLeaveType = true;
  }
  closeDialog() {
    this.showCreateLeaveType = false;
    this.showEditLeaveType = false;
    this.showDeleteLeaveType = false;
  }

  // public tableData: any = [];
  // initDataTable() {
  //   var table = $('#example2').DataTable({
  //     data: this.tableData,
  //     "bDestroy": true,
  //     columns: [

  //       { title: "sno" },
  //       { title: 'Leave Type' },
  //       { title: 'Description' },
  //       {
  //         title: "Action",
  //         render: function (data: any, type: any, full: any) {

  //           var leaveid = full[0] - 1;
  //           return `<a style="cursor:pointer" class="modalShow" ltype=` + leaveid + ` ><i ltype=` + leaveid + ` class="material-icons" title="Edit">mode_edit</i></a>
  //               <a style="cursor:pointer" class="modalDelete" ltype=`+ leaveid + ` ><i  ltype=` + leaveid + ` class="material-icons" title="Edit">delete</i></a>`;
  //         }
  //       }
  //     ],
  //   });
  // }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("ltype")) {
        let sno = event.target.getAttribute("ltype");
        let leaveid = this.leave_types[sno].id;
        this.findLeaveTypebyId(leaveid)
      }
    });
  }

  // formatLeaveData(res) {
  //   let res1 = Object.entries(res);
  //   console.log(res)
  //   this.tableData = []
  //   for (var i = 0; i < res1.length; i++) {
  //     var tmp = []
  //     var leavetype = res[i].value;
  //     var description = res[i].description;
  //     var action = '';
  //     this.tableData.push([i + 1, leavetype, description, action]);

  //   }
  // }

  showModalLeavetypeEdit() {
    $(document).on('click', '.modalShow', function (e) {

      document.getElementById('modalLeavetypeEdit').style.display = 'block';
    });
  }
  closeModal() {
    document.getElementById('modalLeavetypeEdit').style.display = 'none';
    document.getElementById('confirmBox').style.display = 'none';

  }


  showModalLeavetypeDelete() {
    $(document).on('click', '.modalDelete', function (e) {

      document.getElementById('confirmBox').style.display = 'block';
    });
  }





  ifHRrole() {
    if (this.principle.getRole() === "HR")
      this.ifHR = true;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  public leaveType;
  public leave_types = [];
  findLeaveType() {
    this.leavesService.findLeaveType().subscribe(
      res => {
        // this.formatLeaveData(res)
        // this.initDataTable()
        this.appendLeaveType(res)
      }, err => {
        console.log(err);
      });;

  }
  appendLeaveType(res) {
    let leavesTypeData = Object.entries(res);
    this.leave_types = [];
    for (let index = 0; index < leavesTypeData.length; index++) {
      this.leave_types.push(leavesTypeData[index][1]);
    }
    console.log(this.leave_types)
  }

  public leaveData: any;
  public leaveName;
  public leaveDesc;
  public leaveId;
  findLeaveTypebyId(id) {
    let data = {
      'id': id
    }
    console.log("sdd");
    this.leavesService.findLeavetypeById(JSON.stringify(data)).subscribe(
      res => {
        this.leaveData = res;
        this.leaveName = this.leaveData.value;
        this.leaveDesc = this.leaveData.description
        this.leaveId = this.leaveData.id
      },
      err => {
        console.log(err)
      }
    )
  }
  addLeaveType() {
    let data = JSON.stringify({
      "value": $('#leavetype').val(),
      "description": $('#desc').val()
    });
    this.leavesService.addLeaveType(data).subscribe(
      res => {
        this.leaveType = res;
        console.log(res)
        this.findLeaveType()
        this.notificationService.showSuccess("Leave type added!!!")


      },
      err => {
        console.log(err);
        this.notificationService.showFailed("Something went wrong")

      }
    )
    this.findLeaveType()
  }


  updateLeaveType() {

    let data = {
      'id': this.leaveId,
      'value': $('#editleavename').val(),
      'description': $('#editleavedesc').val()

    }
    console.log(data)
    this.leavesService.updateLeaveType(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.notificationService.showSuccess("Leave type saved!!!")

      },
      err => {
        console.log(err)
        this.notificationService.showFailed("Something went wrong")
      }
    )
    this.findLeaveType()
    this.editDetails = false;

  }

  deleteLeaveType() {
    let data = {
      'id': this.leaveData.id
    }
    console.log(this.leaveData.id)
    this.leavesService.deleteLeaveType(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.notificationService.showFailed("Leave type deleted!!!")

      },
      err => {
        console.log(err)
        this.notificationService.showFailed("Something went wrong")

      }
    )
    this.findLeaveType()
  }
}



