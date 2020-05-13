import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {ProfileService} from '../../profile/profile.service';
import {PrincipleService} from '../../util/principle.service';
import { NotificationService} from '../../common/services/notification.service';
@Component({
  selector: 'app-edit-leavetype',
  templateUrl: './edit-leavetype.component.html',
  styleUrls: ['./edit-leavetype.component.css']
})
export class EditLeavetypeComponent implements OnInit {
public type;
constructor(private notificationService:NotificationService,private principle:PrincipleService,private activeRoute:ActivatedRoute,private profileService:ProfileService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params=>{
      this.type=params.get('type')
      
    })


  }

}
