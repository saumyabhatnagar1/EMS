import { Component, OnInit } from '@angular/core';
import { PrincipleService } from '../util/principle.service';
import { AuthService } from '../util/auth.service';
import { Router } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';

declare var $: any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn:boolean = true;
  public username : string = "";
  constructor(private principle:PrincipleService,private notificationService:NotificationService,private authService:AuthService,private router:Router) { }
  ngOnInit(): void {
     if( this.principle.getUsername() !=undefined){
        this.isLoggedIn = false;
        this.username = this.principle.getUsername();
      }
      this.getRole()

      $(function() {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function() {
          $('#sidebar, #content').toggleClass('active');
        });
      });
      
   }
   public ifHR:boolean=false;
  public message;
   public role;
  getRole(){
    this.role=this.principle.getRole()
    if(this.principle.getRole()==="ADMIN")
    this.ifHR=true
  }


  logout(){
        this.authService.logout().subscribe(
        res=>{
              this.notificationService.showSuccess("Successfully Logout!")
              window.location.href='/';
              
        },err=>{
             console.log(err);
        });
    }

    public _opened: boolean = true;
 
    public _toggleSidebar() {
      this._opened = !this._opened;
    }

    
}
