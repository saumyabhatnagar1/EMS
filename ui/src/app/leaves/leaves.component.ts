import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  public command:string;
  public name:string='Naveen Gaddi'
  public count:number=0;
  public page:number =1;
  public remainingLeaves:number=21;
  leaves = [];
  pageOfItems: Array<any>;
  constructor(private activeRoute:ActivatedRoute) { }

  public dateForm=new FormGroup({
    dateLeave:new FormControl('',Validators.required),
    reason:new FormControl('',Validators.required)
  })

  get reason(){
    return this.dateForm.get('reason');
  }
  get dateLeave(){
    return this.dateForm.get('dateLeave');
  }
  mssg:boolean;
  onConfirm()
  {
    
    console.log(this.dateForm.get('dateLeave').value )
    console.log(this.dateForm.get('reason').value)
  }

  //taking messages from notification component
 notifications = new NotificationsComponent();

 leavesMessage = this.notifications.leavesMessage


  ngOnInit(): void {
      this.activeRoute.paramMap.subscribe(params=>{
          this.command = params.get('command');
          console.log(this.command);
      })
      this.leaves = [
        {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
        {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave'},
        {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
        {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},
        {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
        {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},

        {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
        {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave'},
        {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
        {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},
        {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
        {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},
        {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},
        ];

  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

}
