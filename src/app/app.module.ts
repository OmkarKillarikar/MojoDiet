import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatFormFieldModule,
  MatSnackBarModule, MatTabsModule, MatListModule, MatGridListModule, MatInputModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLoginComponent} from './adminLogin/adminLogin.component';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminDashboardComponent} from './adminDashboard/adminDashboard.component';
import {DishService} from './services/DishService';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent
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
    MatInputModule
  ],
  providers: [DishService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
