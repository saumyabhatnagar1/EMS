import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import {ProfileComponent} from './profile/profile.component';
import { LeavesComponent } from './leaves/leaves.component';
import { HelpComponent } from './help/help.component';
import { WorkUpdateComponent } from './work-update/work-update.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { EditEmployeeComponent } from './manage-employee/edit-employee/edit-employee.component';


const routes: Routes =
[
  { path :'register', component:RegisterComponent},
  { path :'login', component:LoginComponent},
  {path : '',component:HomeComponent},
  {path : 'timesheets',component:TimesheetsComponent},
  {path : 'profile',component : ProfileComponent},
  {path : 'leaves/:command' , component : LeavesComponent},
  {path : 'help', component : HelpComponent},
  {path: 'workUpdate', component : WorkUpdateComponent},
  {path: 'manage-employee', component : ManageEmployeeComponent},
  {path:'leavetype',component:LeavetypeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'manage-employee/edit/:id',component:EditEmployeeComponent},
  {path:'projects',component:ProjectsComponent},
  {path:'projects/view/:id',component:ViewProjectComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
