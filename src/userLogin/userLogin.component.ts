import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserCredentials} from '../models/userCredentials';
import {StorageService} from '../services/storageService';
import {SnackBarService} from '../services/snackBarService';
import {animate, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css'],
  animations: [
    trigger(
      'enterAnimationSignInCard', [
        transition(':enter', [
          style({transform: 'translateX(200%)', opacity: 0}),
          animate('400ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('400ms', style({transform: 'translateX(200%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'enterAnimationSignUpCard', [
        transition(':enter', [
          style({transform: 'translateX(-200%)', opacity: 0}),
          animate('400ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('400ms', style({transform: 'translateX(-200%)', opacity: 0}))
        ])
      ]
    )
  ],
})

export class UserLoginComponent {
  newCred: UserCredentials;
  loginCred: UserCredentials;
  isLogin = true;
  verifyPassword: string;

  constructor(private router: Router, private snackBarService: SnackBarService, private localStorageService: StorageService) {
    this.newCred = new UserCredentials();
    this.loginCred = new UserCredentials();
  }

  saveUserCredentials(): void {
    if (this.newCred.userName && this.newCred.password) {
      if (this.newCred.password === this.verifyPassword) {
        const isSuccess = this.localStorageService.saveUserCredentials(this.newCred);
        if (isSuccess) {
          this.snackBarService.showSnackBar('Registered successfully');
          this.newCred = new UserCredentials();
          this.verifyPassword = '';
          this.isLogin = !this.isLogin;
        } else {
          this.snackBarService.showSnackBar('Entered user name already exists');
        }
      } else {
        this.snackBarService.showSnackBar('Passwords does not match');
      }
    } else {
      this.snackBarService.showSnackBar('Enter valid data');
    }
  }

  userSignIn(): void {
    if (this.loginCred.userName && this.loginCred.password) {
      const isCredValid = this.localStorageService.validateUserCredentials(this.loginCred);
      if (isCredValid) {
        this.localStorageService.setLoggedInUser(this.loginCred);
        this.router.navigate(['/userDashboard']);
      } else {
        this.snackBarService.showSnackBar('Invalid user name or password');
      }
    } else {
      this.snackBarService.showSnackBar('Enter valid data');
    }
  }
}
