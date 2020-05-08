import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {

    this.fetchAllTimesheets()
    
  }

  public msg ;
  public labelArray = []
  public dataArray = []

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

  fetchAllTimesheets(){
    this.dashboardService.fetchAllTimesheet().subscribe(
      res=>{
            this.msg = res
            //let x = Object.entries(res)
            
           // this.addLabel(x)
           // console.log(x)
           // console.log(x.length)
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
