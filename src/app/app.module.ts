import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLoginComponent} from './adminLogin/adminLogin.component';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminDashboardComponent} from './adminDashboard/adminDashboard.component';
import {LocalStorageService} from './services/LocalStorageService';
import {UserLoginComponent} from './userLogin/userLogin.component';
import {SnackBarService} from './services/SnackBarService';
import {DishGridListComponent} from './dishGridList/dishGridList.component';
import {UserDashboardComponent} from './userDashboard/userDashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserLoginComponent,
    DishGridListComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [LocalStorageService, SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
