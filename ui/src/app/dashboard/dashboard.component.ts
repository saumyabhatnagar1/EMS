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

  constructor() { }

  ngOnInit(): void {
  }

  lineChartData: ChartDataSets[] = [
    { data: [6, 8, 9, 10, 9, 10], label: 'No. of hours ' },
  ];

  lineChartLabels: Label[] = ['22-April,2020', '23-April,2020', '24-April,2020', '25-April,2020', '26-April,2020', '27-April,2020'];

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
  
}


