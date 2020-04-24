import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LeavesComponent } from './leaves/leaves.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpComponent } from './help/help.component';
import { WorkUpdateComponent } from './work-update/work-update.component';
import { CommonModule } from '@angular/common';



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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarCommonModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarMonthModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
