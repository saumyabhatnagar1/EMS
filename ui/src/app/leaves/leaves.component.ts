import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  public command:string;
  public name:string='Naveen Gaddi'
  public count:number=0;
  leaves = [
    {date: '01-April-2020', status : 'Approved By Admin',reason:'Casual Leave'},
    {date: '23-April-2020', status : 'Pending', reason:'Casual leave'},
    {date: '25-April-2020', status : 'Approved By Admin', reason:'Emergency Leave',},
  ];
  constructor(private activeRoute:ActivatedRoute) { }

  public dateForm=new FormGroup({
    dateLeave:new FormControl('',Validators.required)
  })

  get dateLeave(){
    return this.dateForm.get('dateLeave');
  }
  mssg:boolean;
  onConfirm()
  {
    this.mssg=true;
    console.log(this.dateForm.get('dateLeave').value)
  }



  ngOnInit(): void {
      this.activeRoute.paramMap.subscribe(params=>{
          this.command = params.get('command');
          console.log(this.command);
      });
  }

}
