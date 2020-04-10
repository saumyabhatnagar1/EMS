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
