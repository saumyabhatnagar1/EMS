import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrls: ['./work-update.component.css']
})
export class WorkUpdateComponent implements OnInit {

  projects : any = { 
    project1 : {
    id : 1,
    name : "EMS",
    team : {member1 : {name:"Naveen",role:"RMN"},
            member2 : {name:"Raj",role:"Developer"}
            },
    Date : "September 6,2020"
  }, 
    project2 : {
    id : 2,
    name : "ABC",
    team : {member1 : {name:"Abdul",role:"Developer"},
            member2 : {name:"Sarthak",role:"Developer"}
            },
    Date : "September 7,2020"
  },
    project3 : {
    id : 3,
    name : "DEF",
    team : {member1 : {name:"Saumya",role:"Developer"},
            member2 : {name:"Rishabh",role:"Developer"}
            },
    Date : "September 8,2020"
  }

  }

  constructor() { }

  ngOnInit(): void {
  }

}
