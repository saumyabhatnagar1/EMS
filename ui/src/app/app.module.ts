import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarModule } from 'ng-sidebar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { LeavesComponent } from './leaves/leaves.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpComponent } from './help/help.component';
import { WorkUpdateComponent } from './work-update/work-update.component';
import { ManageLeavesComponent } from './leaves/manage-leaves/manage-leaves.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { StatusLeavesComponent } from './leaves/status-leaves/status-leaves.component';
import { NewLeavesComponent } from './leaves/new-leaves/new-leaves.component';
import { ProfileComponent } from './profile/profile.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    TimesheetsComponent,
    LeavesComponent,
    NotificationsComponent,
    HelpComponent,
    WorkUpdateComponent,
    ProfileComponent,
    NewLeavesComponent,
    StatusLeavesComponent,
    ManageLeavesComponent,
    ManageEmployeeComponent,
    LeavetypeComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarCommonModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarMonthModule,
    NgbModule,
    SidebarModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
