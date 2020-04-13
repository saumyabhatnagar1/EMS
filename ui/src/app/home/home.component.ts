import { Component, OnInit } from '@angular/core';
import {PrincipleService} from '../util/principle.service';
import { AuthService } from '../util/auth.service';
import { NotificationService} from '../common/services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private principle:PrincipleService, private notificationService:NotificationService) { }

  ngOnInit(): void {

  }

}
