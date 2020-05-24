import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginService} from './login.service';
import {PrincipleService} from '../util/principle.service';
import { Router} from '@angular/router';
import { NotificationService } from '../common/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message:any;
  public loginForm = new FormGroup({
      email : new FormControl('',Validators.email),
      password: new FormControl('',Validators.required)
  });
  constructor(private _loginService:LoginService, private principle:PrincipleService,private router:Router,private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.principle.getUsername() != undefined){
        this.router.navigate(['']);
    }
  }

  login(){
      let user_login_json = {
        "username":this.loginForm.get('email').value,
        "password":this.loginForm.get('password').value
      }
      this._loginService.login(JSON.stringify(user_login_json)).subscribe(
      res=>{
          if(res['token']){
            this.principle.setItem('jwt_token',res['token']);
            this._loginService.getPrinciple().subscribe(res=>{
                if(res["username"]){
                  this.principle.setUser(res);
                  this.router.navigate(['']);
                }
            },err=>{
                console.log(err);
            });
            
          }
      },
      err =>{
         console.log(err);
      }
      );
  }
}
