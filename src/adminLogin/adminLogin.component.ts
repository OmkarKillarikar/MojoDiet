import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snackBarService';
import {StorageService} from '../services/storageService';


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
    if (this.userName === 'admin' && this.password === 'MojoNetworks') {
      this.storageService.clearUserLogin();
      this.storageService.adminLoggedIn();
      this.snackService.showSnackBar('Welcome Admin Mojo');
      this.router.navigate(['/adminDashboard']);
    } else {
      this.snackService.showSnackBar('Enter valid credentials');
    }
  }
}
