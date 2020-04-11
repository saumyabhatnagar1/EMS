import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
