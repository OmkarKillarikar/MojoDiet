import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../selectUser/selectUser.component';
import {AdminLoginComponent} from '../adminLogin/adminLogin.component';
import {AdminDashboardComponent} from '../adminDashboard/adminDashboard.component';
import {UserLoginComponent} from '../userLogin/userLogin.component';
import {UserDashboardComponent} from '../userDashboard/userDashboard.component';
import {Constants} from '../utils/constants';

const routes: Routes = [
  {path: '', redirectTo: '/' + Constants.RoutePath.SELECT_USER, pathMatch: 'full'},
  {path: Constants.RoutePath.SELECT_USER, component: DashboardComponent},
  {path: Constants.RoutePath.ADMIN_LOGIN, component: AdminLoginComponent},
  {path: Constants.RoutePath.ADMIN_DASHBOARD, component: AdminDashboardComponent},
  {path: Constants.RoutePath.USER_LOGIN, component: UserLoginComponent},
  {path: Constants.RoutePath.USER_DASHBOARD, component: UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
