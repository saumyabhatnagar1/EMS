import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from '../../profile/profile.service';
import { PrincipleService } from '../../util/principle.service';
import { NotificationService } from '../../common/services/notification.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers: [MessageService]
})
export class EditEmployeeComponent implements OnInit {
  public id: any;
  public isHR: boolean = false;
  profileForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    designation: new FormControl(''),
    gender: new FormControl(''),
    role: new FormControl(''),
    birthDay: new FormControl(''),
    isActive: new FormControl(''),
    houseNumber: new FormControl(''),
    street: new FormControl(''),
    addressLine: new FormControl(''),
    mobileNumber: new FormControl(''),
    country: new FormControl(''),
  });
  constructor(private notificationService: NotificationService, private messageservice: MessageService, private principle: PrincipleService, private activeRoute: ActivatedRoute, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.get_profile();
    });
    if (this.principle.getRole() === "ADMIN") {
      this.isHR = true;
    } else {
      this.isHR = false;
    }
  }

  get_profile() {
    let data = {
      "username": this.id
    }
    let user_login_json = JSON.stringify(data);
    this.profileService.get_profile(user_login_json).subscribe(
      res => {
        console.log(res);
        this.patchValues(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  patchValues(res) {
    this.profileForm.get('name').setValue(res.name);
    this.profileForm.get('username').setValue(res.username);
    this.profileForm.get('gender').setValue(res.gender)
    this.profileForm.get('role').setValue(res.role);
    this.profileForm.get('designation').setValue(res.designation);
    this.profileForm.get('isActive').setValue(res.isActive);
    this.profileForm.get('birthDay').setValue(res.birthDay);
    this.profileForm.get('houseNumber').setValue(res.houseNumber);
    this.profileForm.get('street').setValue(res.street);
    this.profileForm.get('addressLine').setValue(res.addressLine);
    this.profileForm.get('mobileNumber').setValue(res.mobileNumber);
    this.profileForm.get('country').setValue(res.country);
  }
  saveEmployeeData() {
    if (this.profileForm.get('isActive').value == true || this.profileForm.get('isActive').value == "true") {
      this.profileForm.get('isActive').setValue(true);
    } else {
      this.profileForm.get('isActive').setValue(false);
    }
    let data = JSON.stringify(this.profileForm.value);
    console.log(this.profileForm.value);
    this.profileService.updateProfile(data).subscribe(res => {
      console.log(res);
      this.messageservice.add({ severity: 'success', summary: 'Profile Updated...', life: 2000 })

      /*if(res["status"] == 200){
        this.notificationService.showSuccess("Profile updated!");
      }else{
        this.notificationService.showFailed("Profile updation failed!");
      }*/
    }, err => {
      console.log(err);
      this.notificationService.showFailed("Something went wrong in api");
    });
    //this.router.navigate(['profile']);
  }

}
