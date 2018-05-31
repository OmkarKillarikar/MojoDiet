import {Component} from '@angular/core';
import {StorageService} from '../services/storageService';
import {Router} from '@angular/router';
import {Constants} from '../utils/constants';
import {SnackBarService} from '../services/snackBarService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MojoDiet';

  constructor(private router: Router, private storageService: StorageService, private snackService: SnackBarService) {
  }

  showLogoutButton(): boolean {
    return !!(this.storageService.isAdminLoggedIn() || this.storageService.getLoggedInUser());
  }

  logout() {
    this.storageService.clearUserLogin();
    this.storageService.adminLoggedIn(false);
    this.router.navigate(['/dashboard']);
    this.snackService.showSnackBar(Constants.Messages.LOGGED_OUT);
  }
}
