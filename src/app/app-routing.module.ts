import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLoginComponent} from './adminLogin/adminLogin.component';
import {AdminDashboardComponent} from './adminDashboard/adminDashboard.component';
import {UserLoginComponent} from './userLogin/userLogin.component';
import {UserDashboardComponent} from './userDashboard/userDashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'adminDashboard', component: AdminDashboardComponent},
  {path: 'userLogin', component: UserLoginComponent},
  {path: 'userDashboard', component: UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
