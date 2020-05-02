import { LeavesService } from './leaves.service';
import { PrincipleService } from './../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { NotificationService} from '../common/services/notification.service';


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  public command:string;
 
  
  constructor(private activeRoute:ActivatedRoute,private notificationService:NotificationService,private leavesService:LeavesService,public principle:PrincipleService) { }
  ngOnInit(): void {
      this.activeRoute.paramMap.subscribe(params=>{
          this.command = params.get('command');
          //this.getAllLeaves();
          //this.findLeaveType();
      });    
  }  

}
