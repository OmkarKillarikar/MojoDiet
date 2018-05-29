import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snackBarService';
import {StorageService} from '../services/storageService';
import {Constants} from '../utils/constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css']
})
export class AdminLoginComponent {
  private userName: string;
  private password: string;

  constructor(private router: Router, private snackService: SnackBarService, private storageService: StorageService) {
  }

  onSignIn(): void {
    if (this.userName === Constants.AdminCredentials.USER_NAME && this.password === Constants.AdminCredentials.PASSWORD) {
      this.storageService.clearUserLogin();
      this.storageService.adminLoggedIn(true);
      this.snackService.showSnackBar(Constants.Messages.WELCOME_ADMIN);
      this.router.navigate(['/' + Constants.RoutePath.ADMIN_DASHBOARD]);
    } else {
      this.snackService.showSnackBar(Constants.Messages.ENTER_VALID_CRED);
    }
  }
}
