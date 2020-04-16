import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrls: ['./work-update.component.css']
})
export class WorkUpdateComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  count2: number = 0;
  count3: number = 0;
  show: boolean = false;

  constructor() { }
  ngOnInit(): void {

  }


  projects = [
    {
      id: 1,
      name: "EMS",
      team: {
        member1: { name: "Naveen", role: "RMN" },
        member2: { name: "Raj", role: "Developer" }
      },

      Date: "September 6,2020"
    },
    {
      id: 2,
      name: "ABC",
      team: {
        member1: { name: "Abdul", role: "Developer" },
        member2: { name: "Sarthak", role: "Developer" }
      },

      Date: "September 7,2020"
    },
    {
      id: 3,
      name: "DEF",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 4,
      name: "GHI",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 5,
      name: "JKL",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 6,
      name: "MNO",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 7,
      name: "PQR",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 8,
      name: "STU",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 9,
      name: "VWX",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 10,
      name: "YZA",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 11,
      name: "BCD",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
    {
      id: 12,
      name: "EFG",
      team: {
        member1: { name: "Saumya", role: "Developer" },
        member2: { name: "Rishabh", role: "Developer" }
      },
      Date: "September 8,2020"
    },
  ]


  tasks= [{
    taskid: 100,
    assignee: 'Admin',
    dueDate: '20-10-200',
    status: 'done',
    desc: 'Fill the form'

  }, {
    taskid: 101,
    assignee: 'Admin',
    dueDate: '25-10-2020',
    status: 'not completed',
    desc: 'COmplete the code'

  },
    {
      taskid: 200,
      assignee: 'Admin',
      dueDate: '20-10-200',
      status: 'done',
      desc: 'water the plants'

    }, {
      taskid: 201,
      assignee: 'Admin',
      dueDate: '25-10-2020',
      status: 'not completed',
      desc: 'Wash the car'

    }
  ]


}


