import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserCredentials} from '../models/userCredentials';
import {LocalStorageService} from '../services/LocalStorageService';
import {SnackBarService} from '../services/SnackBarService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent {
  newCred: UserCredentials;
  loginCred: UserCredentials;

  constructor(private router: Router, private snackBarService: SnackBarService, private localStorageService: LocalStorageService) {
    this.newCred = new UserCredentials();
    this.loginCred = new UserCredentials();
  }

  saveUserCredentials(): void {
    if (this.newCred.userName && this.newCred.password) {
      const isSuccess = this.localStorageService.saveUserCredentials(this.newCred);
      if (isSuccess) {
        this.snackBarService.showSnackBar('Registered successfully');
        this.newCred = new UserCredentials();
      } else {
        this.snackBarService.showSnackBar('Entered user name already exists');
      }
    }
  }

  userSignIn(): void {
    if (this.loginCred.userName && this.loginCred.password) {
      const isCredValid = this.localStorageService.validateUserCredentials(this.loginCred);
      if (isCredValid) {
        this.router.navigate(['/userDashboard']);
      } else {
        this.snackBarService.showSnackBar('Invalid user name or password');
      }
    }
  }
}
