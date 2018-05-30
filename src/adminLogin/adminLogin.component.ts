import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snackBarService';
import {StorageService} from '../services/storageService';
import {Constants} from '../utils/constants';

declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css']
})
export class AdminLoginComponent {
  userName: string;
  password: string;

  constructor(private router: Router, private snackService: SnackBarService, private storageService: StorageService) {
  }

  onSignIn(): void {
    const SHA256 = require('crypto-js/sha256');
    const hashedUserName = SHA256(this.userName).toString();
    const hashedPassword = SHA256(this.password).toString();

    if (hashedUserName === Constants.AdminCredentials.USER_NAME && hashedPassword === Constants.AdminCredentials.PASSWORD) {
      this.storageService.clearUserLogin();
      this.storageService.adminLoggedIn(true);
      this.snackService.showSnackBar(Constants.Messages.WELCOME_ADMIN);
      this.router.navigate(['/' + Constants.RoutePath.ADMIN_DASHBOARD]);
    } else {
      this.snackService.showSnackBar(Constants.Messages.ENTER_VALID_CRED);
    }
  }
}
