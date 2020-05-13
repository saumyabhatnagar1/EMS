import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {ProfileService} from '../../profile/profile.service';
import {PrincipleService} from '../../util/principle.service';
import { NotificationService} from '../../common/services/notification.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  public id:any;
  public isHR:boolean=false;
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    role:new FormControl(''),
    isActive:new FormControl(''),
  });
  constructor(private notificationService:NotificationService,private principle:PrincipleService,private activeRoute:ActivatedRoute,private profileService:ProfileService) { }

  ngOnInit(): void {
  	this.activeRoute.paramMap.subscribe(params=>{
        this.id = params.get('id');
        this.get_profile();
    });
    if (this.principle.getRole() === "HR"){
    	this.isHR = true;
    }else{
    	this.isHR = false;
    }
  }

    get_profile(){
	  let data = {
	    "email" : this.id
	  }
	  let user_login_json = JSON.stringify(data);
	  this.profileService.get_profile(user_login_json).subscribe(
	  	res=>{
	        console.log(res);
	        this.patchValues(res);
	  	},
	 	err =>{
	     console.log(err);
	  	}
	 );
   }
   patchValues(res){
   	this.profileForm.get('name').setValue(res.name);
   	this.profileForm.get('email').setValue(res.email);
   	this.profileForm.get('gender').setValue(res.gender)
   	this.profileForm.get('role').setValue(res.role);
   	this.profileForm.get('isActive').setValue(res.isActive)
   }
   saveEmployeeData(){
   	if(this.profileForm.get('isActive').value == "true"){
   		this.profileForm.get('isActive').setValue(true);
   	}else{
   		this.profileForm.get('isActive').setValue(false);
   	}
   	let data = JSON.stringify(this.profileForm.value);
   	console.log(this.profileForm.value);
   	this.profileService.getUpdate(data).subscribe(res=>{
   		if(res["status"] == 200){
   			this.notificationService.showSuccess("Profile updated!");
   		}else{
   			this.notificationService.showFailed("Profile updation failed!");
   		}
   	},err=>{
   		console.log(err);
   		this.notificationService.showFailed("Something went wrong in api");
   	});
   }
}
