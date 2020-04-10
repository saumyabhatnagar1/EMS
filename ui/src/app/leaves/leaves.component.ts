import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  constructor() { }

  public dateForm=new FormGroup({
    dateLeave:new FormControl('',Validators.required)
  })

  get dateLeave(){
    return this.dateForm.get('dateLeave');
  }
  
  onConfirm()
  {
    
    console.log(this.dateForm.get('dateLeave').value)

    
  }



  ngOnInit(): void {
  }

}
