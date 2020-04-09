import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ProfileService} from './profile.service';
import {PrincipleService} from '../util/principle.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public message:any;
  // public loginForm = new FormGroup({
  //     email : new FormControl('',Validators.email),
  //     // password: new FormControl('',Validators.required)
  // });

  constructor(private profileService:ProfileService, private principle:PrincipleService,private router:Router) { }
   userData
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

        // this.principle.setUser(res);
        // window.location.href = '/';
        console.log(res)
        this.message =res;
  },
  err =>{
     console.log(err);
  }
  );
}
}
