import { AccountServiceService } from './../common/services/account-service.service';
import { Component, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { LeavesService } from './service.leavetype';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';




declare var $: any;
@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css'],
  providers: [MessageService]

})
export class LeavetypeComponent implements OnInit {
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
  public i
  constructor(private activeRoute: ActivatedRoute, private accountService: AccountServiceService, private router: Router, private leavesService: LeavesService, public principle: PrincipleService, private renderer: Renderer2, private messageservice: MessageService) { }
  ngOnInit(): void {

    this.cols = [

      { field: "leavetype", header: "Leave-Type" },
      { field: "description", header: "Description" },
      { field: "numberOfLeaves", header: "Number" },
      { field: "action", header: "Action" },
    ];



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
  public id;
  showCreateDialog() {
    this.showCreateLeaveType = true;
  }
  showEditDialog(id) {
    this.id = (id.getAttribute('data-id'))
    this.showEditLeaveType = true;
  }
  showDeleteDialog(id) {
    this.id = (id.getAttribute('data-id'))
    this.showDeleteLeaveType = true;
  }
  closeDialog() {
    this.showCreateLeaveType = false;
    this.showEditLeaveType = false;
    this.showDeleteLeaveType = false;
  }
  closeModal() {
    document.getElementById('modalLeavetypeEdit').style.display = 'none';
    document.getElementById('confirmBox').style.display = 'none';

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
        console.log(res)
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
      "number_of_leaves": $('#numberOfLeaves').val(),
      "description": $('#desc').val()
    });
    this.leavesService.addLeaveType(data).subscribe(
      res => {
        this.leaveType = res;
        console.log(res)
        this.findLeaveType()
        this.messageservice.add({ severity: 'success', summary: 'Leave Type successfully added!!' })
      },
      err => {
        console.log(err);
        this.messageservice.add({ severity: 'error', summary: 'Some error occurred!!' })


      }
    )

  }


  updateLeaveType() {

    let data = {
      'id': this.id,
      'value': $('#editleavename').val(),
      "number_of_leaves": $('#numberOfLeaves').val(),
      'description': $('#editleavedesc').val()

    }
    console.log(data)
    this.leavesService.updateLeaveType(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.findLeaveType()
        this.messageservice.add({ severity: 'success', summary: 'Leave Type Updated' })
      },
      err => {
        console.log(err)
        this.messageservice.add({ severity: 'warn', summary: 'Some error Occurred' })
      }
    )

    this.editDetails = false;

  }

  deleteLeaveType() {
    let data = {
      'id': this.id
    }
    console.log(this.id)
    this.leavesService.deleteLeaveType(JSON.stringify(data)).subscribe(
      res => {
        console.log(res)
        this.findLeaveType()
        this.messageservice.add({ severity: 'error', summary: 'Leave Type Deleted' })
      },
      err => {
        console.log(err)
        this.messageservice.add({ severity: 'warn', summary: 'Some Error Occurred' })
      }
    )

  }
}



