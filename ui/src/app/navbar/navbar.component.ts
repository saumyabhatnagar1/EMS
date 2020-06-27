import { ProfileService } from './../profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { PrincipleService } from '../util/principle.service';
import { AuthService } from '../util/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../common/services/notification.service';
import {OverlayPanelModule} from 'primeng/overlaypanel';
declare var $: any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean = true;
  public username: string = "";
  constructor(private principle: PrincipleService, private notificationService: NotificationService, private authService: AuthService, private router: Router,private profile :ProfileService) { }
  ngOnInit(): void {
    if (this.principle.getUsername() != undefined) {
      this.isLoggedIn = false;
      this.username = this.principle.getUsername();
    }
    this.getRole()
    this.get_profile()
    $(function () {
      // Sidebar toggle behavior
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
      });
    });

  }
  public ifHR: boolean = false;
  public message;
  public role;
  getRole() {
    this.role = this.principle.getRole()
    if (this.principle.getRole() === "ADMIN")
      this.ifHR = true
  }
profiledata:any;

  get_profile(){
    let data={
      username:this.principle.getUsername()
    }
    this.profile.get_profile(JSON.stringify(data)).subscribe(
      res=>{
        this.profiledata=res;
      },
      err=>{
        console.log(err)
      }
    )
  }


  logout() {
    // this.authService.logout().subscribe(
    //   res => {
    //     this.notificationService.showSuccess("Successfully Logout!")
    //     window.location.href = '/';

    //   }, err => {
    //     console.log(err);
    //   });
    this.isLoggedIn = true;
    console.log("test")
  }

  public _opened: boolean = true;

  public _toggleSidebar() {
    this._opened = !this._opened;
    
  }


}
