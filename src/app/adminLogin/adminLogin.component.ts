import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css']
})
export class AdminLoginComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSignIn(): void {
    if (this.userName === 'admin' && this.password === 'MojoNetworks') {
      this.snackBar.open('Welcome Admin Mojo', null, {duration: 2000});
      const link = ['/adminDashboard'];
      this.router.navigate(link);
    } else {
      this.snackBar.open('Invalid credentials', null, {duration: 2000});
    }
  }
}
