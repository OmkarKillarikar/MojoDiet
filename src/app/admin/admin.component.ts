import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSignIn(): void {
    if (this.userName === 'admin' && this.password === 'MojoNetworks') {
      this.snackBar.open('succ', null, {duration: 2000});
    } else {
      this.snackBar.open('Invalid credentials', null, {duration: 2000});
    }
  }
}
