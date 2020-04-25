import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import {PrincipleService} from '../util/principle.service';
import { Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  public message:any
  public updateInfo:any
  public edit: boolean = true


  public updateForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    date:new FormControl('',Validators.required),
    gender:new FormControl('',Validators.required),
    houseNumber:new FormControl('',Validators.required),
    street:new FormControl('',Validators.required),
    addressLine:new FormControl('',Validators.required),
    mobileNumber:new FormControl('',[Validators.required,Validators.pattern('^((\\??-?)|0)?[0-9]{10}$')]),
    country:new FormControl('',Validators.required),
    City:new FormControl('',Validators.required),

  });


  public bankDetails = {
    designation : "Web Developer",
    bankAccountNumber : "09720180111",
    bankIfscCode : "KCCB0NRM097",
    bankMicrNumber: "380126029"
  }


  constructor(private profileService:ProfileService, private principle:PrincipleService,private router:Router) { }
  ngOnInit(): void {
       this.get_profile();
  }



get_profile(){
  let data = {
    "email" : this.principle.getUsername()
  }
  let user_login_json = JSON.stringify(data);
  this.profileService.get_profile(user_login_json).subscribe(
  res=>{
        console.log(res)
        this.message =res;
  },
  err =>{
     console.log(err);
  }
  );
}

getUpdate(){
  const updateJson = JSON.stringify(this.updateForm.value);


//   let updateData = [{
//     "email" : this.principle.getUsername()
//   },
//   {

//   }
// ]

  this.profileService.getUpdate(updateJson).subscribe(
  res=>{
        console.log(res)
        this.updateInfo =res;
  },
  err =>{
     console.log(err);
  }
  );
}

onSubmit(){
  console.log(this.updateForm.value)

}

editDetails(){
  this.edit = !this.edit
}

get email(){
  return this.updateForm.get('email')
}
get date(){
  return this.updateForm.get('date')
}

get gender(){
  return this.updateForm.get('gender')
}

get houseNumber(){
  return this.updateForm.get('houseNumber')
}

get street(){
  return this.updateForm.get('street')
}

get country(){
  return this.updateForm.get('country')
}

get mobileNumber(){
  return this.updateForm.get('mobileNumber')
}

get City(){
  return this.updateForm.get('City')
}
}
