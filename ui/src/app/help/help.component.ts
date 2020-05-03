import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  public contacts:Array<any>=[];
  public queryForm =  new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    name: new FormControl('',Validators.required),
    mobileNumber:new FormControl('',[Validators.required,Validators.pattern('^((\\??-?)|0)?[0-9]{10}$')]),
    typeofquery:new FormControl('',Validators.required),
    query:new FormControl('',Validators.required)

  });
  constructor() { }

  ngOnInit(): void {
    this.contacts.push(
        {name:"Naveen Gaddi","email":"naveen.gaddi@yahoo.com","designation":"Network Manager"},
        {name:"Raj","email":"naveen.gaddi@yahoo.com","designation":"Network Manager"},
        {name:"Raj","email":"naveen.gaddi@yahoo.com","designation":"Network Manager"},
        {name:"Raj","email":"naveen.gaddi@yahoo.com","designation":"Network Manager"},
        {name:"Raj","email":"naveen.gaddi@yahoo.com","designation":"Network Manager"}
      );
  }


  get email(){
    return this.queryForm.get('email')
  }

  get name(){
    return this.queryForm.get('name')
  }

 get mobileNumber(){
   return this.queryForm.get('mobileNumber')
 }

 get typeofquery(){
   return this.queryForm.get('typeofquery')
 }

 get query(){
   return this.queryForm.get('query')
 }

 onSubmit(){
   console.log(this.queryForm.value)
 }
}
