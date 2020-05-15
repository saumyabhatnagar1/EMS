import { Component } from '@angular/core';
import { PrincipleService } from './util/principle.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'EMS';
  constructor(private principle:PrincipleService){
  }
}
