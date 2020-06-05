import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import {ChartModule} from 'primeng/chart'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataMonthly :any;
  dataYearly:any;
  toggleButton:boolean = false
  constructor(private dashboardService:DashboardService) {


     this.dataMonthly = {
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
   



   this.dataYearly = {
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
}

  ngOnInit(): void {

    this.fetchAllTimesheets()
    
  }

  public msg ;
  public labelArray = []
  public dataArray = []

    togglePolar : boolean = false

    togglePolarMonthly(){
      this.togglePolar = false
      this.toggleButton=false
    }

    togglePolarYearly(){
      this.togglePolar = true
      this.toggleButton=true

    }

  addLabel(msg){
    
    for(let i = 0; i<msg.length;i++){
      let date = `${msg[i].date}-${msg[i].month}-${msg[i].year}`
      this.labelArray.push(date)

    let workingMinutes = +this.msg[i].timings.out_time.hours * 60 + this.msg[i].timings.out_time.minutes - (+this.msg[i].timings.in_time.hours * 60 + this.msg[i].timings.in_time.minutes)
    let workingHours = workingMinutes/60 
    let working = Math.floor(workingMinutes/60) + Math.floor(workingMinutes%60)*0.01
    this.dataArray.push(working)


    }

    

    console.log(this.dataArray) 
    

  }
 


  lineChartData: ChartDataSets[] = [
    { data: this.dataArray, label: 'No. of hours ' },
  ];

  lineChartLabels: Label[] = this.labelArray; 




  lineChartOptions = {
    responsive: true,
    scales : {
      yAxes : [
        {
          gridLines : {
            display : false
          },
          ticks : {
            beginAtZero : true
          }
        }
      ]
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





  fetchAllTimesheets(){
    this.dashboardService.fetchAllTimesheet().subscribe(
      res=>{
            this.msg = res
           this.appendTimesheets(res)
            
      },
      err =>{
         console.log(err);
      }
      );

  
}

public timesheets;

appendTimesheets(res){
  let timesheetsData = Object.entries(res); 
  this.timesheets = [];     
  for(let index = 0; index<timesheetsData.length;index++){
      this.timesheets.push(timesheetsData[index][1]);
      }
  console.log(this.timesheets)
  this.addLabel(this.timesheets)
}




}
