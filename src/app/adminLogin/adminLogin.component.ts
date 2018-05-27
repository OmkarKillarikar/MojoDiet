import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/SnackBarService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css']
})
export class AdminLoginComponent {
  userName: string;
  password: string;

  constructor(private router: Router, private snackService: SnackBarService) {
  }

  onSignIn(): void {
    if (this.userName === 'admin' && this.password === 'MojoNetworks') {
      this.snackService.showSnackBar('Welcome Admin Mojo');
      const link = ['/adminDashboard'];
      this.router.navigate(link);
    } else {
      this.snackService.showSnackBar('Invalid credentials');
    }
  }
}
