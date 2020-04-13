import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationService} from '../common/services/notification.service';

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
      date:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      houseNumber:new FormControl('',Validators.required),
      street:new FormControl('',Validators.required),
      addressLine:new FormControl('',Validators.required),
      mobileNumber:new FormControl('',[Validators.required,Validators.pattern('^((\\??-?)|0)?[0-9]{10}$')]),
      country:new FormControl('',Validators.required)
    });
  constructor(private _registerService:RegisterService, private notificationService:NotificationService) {
        
  }

  ngOnInit(): void {


  }

  createAccount(){
      const accountJson = JSON.stringify(this.accountForm.value);
      this._registerService.createAccount(accountJson).subscribe(
      res=>{
          if(res["status"] == 201){
              this.notificationService.showSuccess("Account registered successfully");
          }else if(res["status"] == 409){
              this.notificationService.showWarning("Account already exists!");
          }else{
             this.notificationService.showFailed("Account registration failed!")
          }
      },err=>{
          console.log(err);
          this.notificationService.showFailed("Account registration failed!")
      });

    }


    get email(){
      return this.accountForm.get('email')
    }
    get password(){
      return this.accountForm.get('password')
    }
    get mobileNumber(){
      return this.accountForm.get('mobileNumber')
    }
    get name(){
      return this.accountForm.get('name')
    }
    get date(){
      return this.accountForm.get('date')
    }
    get gender(){
      return this.accountForm.get('gender')
    }
    get houseNumber(){
      return this.accountForm.get('houseNumber')
    }
    get street(){
      return this.accountForm.get('street')
    }
    get addressLine(){
      return this.accountForm.get('addressLine')
    }
    get country(){
      return this.accountForm.get('country')
    }

  onSubmit(){
    console.log(this.accountForm.value)
  }
}
