import {Component, TemplateRef,OnInit} from '@angular/core';
import {NotificationService} from '../common/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public leavesMessage : string = "Application Submitted!!"

  public registerSuccessMessage : string = "Account Created!!"
  public registerAlreadyUserMessage : string = "Email already exists!!"
  public registerFailMessage : string = "Something went wrong please try again!!"

  public message:string;
  public className:string;

  constructor(public notificationService: NotificationService) {}


  ngOnInit(): void {

  }
}
