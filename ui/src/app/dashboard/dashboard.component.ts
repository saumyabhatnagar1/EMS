import { AccountServiceService } from './../common/services/account-service.service';
import { PrincipleService } from 'src/app/util/principle.service';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ChartModule } from 'primeng/chart'
import { NoticeBoardService} from '../notice-board/notice-board.service'
import { ProfileService } from '../profile/profile.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  toggleButton: boolean = false;
  genderdata = [];






  constructor(private profileService : ProfileService,private noticeService : NoticeBoardService,private dashboardService: DashboardService,private principle:PrincipleService,private account:AccountServiceService) {


   

  }
  public empid:any;


  ngOnInit(): void {

    
    this.getEmpByGender()
    this.fetchAllTimesheets()
    this.getNotices()
    this.getNoticesByType('broadcast')
    this.getNoticesByType('event')
    this.get_profile()


  }
  public msg;
  public labelArray = []
  public dataArray = []

  togglePolar: boolean = false;

  dataMonthly = {
    datasets: [{
      data: [
        11,
        16,
        7,
        3,
      ],
      backgroundColor: [
        "#FF6384",
        "#a6f2f5",
        "#8ca8e6",
        "#ffd28f",
      ],
      label: 'My dataset'
    }],
    labels: [
      "Leaves Left",
      "Leaves Applied",
      "Rejected",
      "Approved",
    ]
  }




  dataYearly = {
    datasets: [{
      data: [
        100,
        1,
        70,
        30,
      ],
      backgroundColor: [
        "#FF6384",
        "#a6f2f5",
        "#8ca8e6",
        "#ffd28f",
      ],
      label: 'My dataset'
    }],
    labels: [
      "Leaves Left",
      "Leaves Applied",
      "Rejected",
      "Approved",
    ]
  }

  togglePolarMonthly() {
    this.togglePolar = false
    this.toggleButton = false
  }

  togglePolarYearly() {
    this.togglePolar = true
    this.toggleButton = true

  }

  addLabel(msg) {
    let in_time_hour=+msg[3].split(':')[0]
    let in_time_min=+msg[3].split(':')[1]
    let out_time_min=+msg[4].split(':')[1]
    let out_time_hour=+msg[4].split(':')[0]

    // let working_time=`${out_time_hour-in_time_hour}:${Math.abs(out_time_min-in_time_min)}`
    let working_time=out_time_hour-in_time_hour+Math.abs(out_time_min-in_time_min)

    console.log(working_time)
    this.dataArray.push(working_time)
    this.labelArray.push(msg[1])
    // for (let i = 0; i < msg.length; i++) {
    //   let date = `${msg[i].date}-${msg[i].month}-${msg[i].year}`
    //   this.labelArray.push(date)

    //   let workingMinutes = +this.msg.hours * 60 + this.msg[i].timings.out_time.minutes - (+this.msg[i].timings.in_time.hours * 60 + this.msg[i].timings.in_time.minutes)
    //   let workingHours = workingMinutes / 60
    //   let working = Math.floor(workingMinutes / 60) + Math.floor(workingMinutes % 60) * 0.01
     
    //   this.dataArray.push(working)


    // }



    console.log(this.dataArray)


  }



  lineChartData: ChartDataSets[] = [
    { data: this.dataArray, label: 'No. of hours ' },
  ];

  lineChartLabels: Label[] = this.labelArray;




  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            beginAtZero: false
          }
        }
      ],
      
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#41acbf',
      backgroundColor: '',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';



  doughnutChartLabels: Label[] = ['On Time', 'Late', 'Absent'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';





  fetchAllTimesheets() {
    let data={
      emp_id:this.principle.getUsername(),
      date:'2020-06-16'
    }
    this.dashboardService.fetchAllTimesheet(JSON.stringify(data)).subscribe(
      res => {
        this.msg = res
        console.log(res)
        this.appendTimesheets(res)

      },
      err => {
        console.log(err);
      }
    );


  }

  public timesheets;

  appendTimesheets(res) {
    let timesheetsData = Object.entries(res);
    this.timesheets = [];
    for (let index = 0; index < timesheetsData.length; index++) {
      this.timesheets.push(timesheetsData[index][1]);
    }
    console.log(this.timesheets)
    this.addLabel(this.timesheets)
  }


  getEmpByGender() {
    
    this.dashboardService.getEmpcountByGender().subscribe(
      res => {
        
        let res1 = Object.entries(res)
        for (let i = 0; i < res1.length; i++) {
          this.genderdata.push(res1[i][1])
        }
        console.log(this.genderdata)
      },
      err => {
        console.log(err)
      }
    )
  }

  EmpByGender = {
    datasets: [{
      data: this.genderdata,
      backgroundColor: [
        "#FF6384",
        "#a6f2f5",
        "#8ca8e6",
      ],
      label: 'My dataset'
    }],
    labels: [
      "Male",
      "Female",
      "Others",
    ]

  }
public noticesByType:any=[];
broadcastNotices:any[];
eventNotices:any[];
public notices:any=[]
public types:any=[]
getNoticesByType(type){
  let data = {
    type : type
  }
 
  this.dashboardService.getNoticesByType(data).subscribe( 
     res => {
        console.log(res)
        this.noticesByType=res;
        type=='broadcast'?this.broadcastNotices=this.noticesByType:this.eventNotices=this.noticesByType;
     },
     err => {
       console.log(err)
     }
  )
  
}


getNotices(){
  this.noticeService.getAllNotices().subscribe(
    res => {
      console.log(res)
      this.notices=res
      console.log(this.notices)
    },
    err => {
      console.log(err)
    }
  )
}


public profile:any
get_profile(){
  let data = {
    "username" : this.principle.getUsername()
  }
  let user_login_json = JSON.stringify(data);
  this.profileService.get_profile(user_login_json).subscribe(
  res=>{
        console.log(res)
        this.profile=res
      
  },
  err =>{
     console.log(err);
  }
  );
}


}
