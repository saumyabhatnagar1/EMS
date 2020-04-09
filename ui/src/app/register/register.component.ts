import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public message:any;
  public accountForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      date:new FormControl(''),
      gender:new FormControl(),
      'house no':new FormControl(),
      'street no':new FormControl(),
      addressline:new FormControl(),
      'mobile no':new FormControl('',[Validators.required,Validators.pattern('^((\\+??-?)|0)?[0-9]{10}$')]),
      country:new FormControl()
    });
  constructor(private _registerService:RegisterService) {

  }

  ngOnInit(): void {

  }
  createAccount(){
      const accountJson = JSON.stringify(this.accountForm.value);
      this._registerService.createAccount(accountJson).subscribe(
      res=>{
          if(res["status"] == 201){
            this.message = "Account created!!!"
          }else if(res["status"] == 409){
             this.message = "Email already exists!!!";
          }else{
             this.message = "Something went wrong please try again!!";
          }
      },err=>{
          console.log(err)
      });
      
    }


    get email(){
      return this.accountForm.get('email')
    }
    get password(){
      return this.accountForm.get('password')
    }
    get phnumber(){
      return this.accountForm.get('mobile no')
    }

  onSubmit(){
    console.log(this.accountForm.value)
  }
}
