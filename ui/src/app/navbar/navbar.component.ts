
import { Component, OnInit } from '@angular/core';
import { PrincipleService } from '../util/principle.service';
import { AuthService } from '../util/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn:boolean = true;
  public username : string = "";
  constructor(private principle:PrincipleService ,private authService:AuthService,private router:Router) { }
  ngOnInit(): void {
     if( this.principle.getUsername() !=undefined){
        this.isLoggedIn = false;
        this.username = this.principle.getUsername();
      }
      this.getRole()
   }
   public ifHR:boolean=false;
  public message;
   public role;
  getRole(){
    if(this.principle.getRole()==="HR")
    this.ifHR=true
  }


  logout(){
        this.authService.logout().subscribe(
        res=>{
              window.location.href='/';
        },err=>{
             console.log(err);
        });
    }

    
}
