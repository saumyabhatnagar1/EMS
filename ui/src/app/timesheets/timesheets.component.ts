import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
      this.day = this.getDay();
      this.date = this.getDate();
      this.month = this.getMonth();
      this.year = this.getYear();
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



