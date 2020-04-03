import { Component, OnInit } from '@angular/core';
import {TimesheetsService} from './timesheets.service';
import {PrincipleService} from '../util/principle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {
  public today:Date = new Date();
  public day:any;
  public date:any;
  public month:any;
  public year:any;
  public message :any;
  public in_time:any;
  public out_time:any;
  public id:any;
  public isSubmitted:boolean = false;
  public timings = new FormGroup({
    in_hours : new FormControl('',Validators.required),
    in_minutes : new FormControl('',Validators.required),
    out_hours : new FormControl('',Validators.required),
    out_minutes : new FormControl('',Validators.required),

  });
  constructor(private principle:PrincipleService, private timesheetsService:TimesheetsService) { }

  ngOnInit(): void {
      this.day = this.getDay();
      this.date = this.getDate();
      this.month = this.getMonth();
      this.year = this.getYear();
      this.fetchSheet();
  }
  fetchSheet(){
      let data = {"username":this.principle.getUsername(), "date": this.date, "month": this.month, "year": this.year}
      this.timesheetsService.findTimeSheet(JSON.stringify(data)).subscribe(
        res =>{
          console.log(res)
          this.message = res["message"];
          this.id = res["data"]["id"];
          this.timings.patchValue({"in_hours": res["data"]["timings"]["in_time"]["hours"]});
          this.timings.patchValue({"in_minutes": res["data"]["timings"]["in_time"]["minutes"]});
          this.timings.patchValue({"out_hours": res["data"]["timings"]["out_time"]["hours"]});
          this.timings.patchValue({"out_minutes": res["data"]["timings"]["out_time"]["minutes"]});
          this.isSubmitted = true;
        },err =>{
          console.log(err)
        }
      );
  }

  saveTimeSheet(){
    let data = {
               "username":this.principle.getUsername(),
               "day":this.day,
               "date":this.date,
               "month":this.month,
               "year":this.year,
               "timings":{
                        "in_time":{"hours":this.timings.get('in_hours').value,"minutes":this.timings.get('in_minutes').value},
                        "out_time":{"hours":this.timings.get('out_hours').value,"minutes":this.timings.get('out_minutes').value}
                      },
               "createdOn":this.today
             };
    //console.log(data);
    this.timesheetsService.addTimeSheet(data).subscribe(
    res=>{
       console.log(res);
    },err=>{
        console.log(err)
    });
    this.fetchSheet();
  }

  getDay(){
    let day = this.today.getDay();
    switch(day){
      case 0:
        return "Sunday";
      case 1:
         return "Monday";
      case 2:
          return "Tuesday";
      case 3:
          return "Wednesday";
      case 4:
          return "Thursday";
      case 5:
          return "Friday";
      case 6:
          return "Saturday";
    }
  }

  getDate(){
    return this.today.getDate();
  }

  getMonth(){
    switch(this.today.getMonth()){
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
  }

  getYear(){
    return this.today.getFullYear();
  }

}



