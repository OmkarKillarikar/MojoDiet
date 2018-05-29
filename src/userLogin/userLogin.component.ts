import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserCredentials} from '../models/userCredentials';
import {StorageService} from '../services/storageService';
import {SnackBarService} from '../services/snackBarService';
import {animate, style, transition, trigger} from '@angular/animations';
import {Constants} from '../utils/constants';


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
          this.snackBarService.showSnackBar(Constants.Messages.REGISTERED_SUCCESSFULLY);
          this.newCred = new UserCredentials();
          this.verifyPassword = '';
          this.isLogin = !this.isLogin;
        } else {
          this.snackBarService.showSnackBar(Constants.Messages.CRED_ALREADY_EXISTS);
        }
      } else {
        this.snackBarService.showSnackBar(Constants.Messages.PASSWORD_NO_MATCH);
      }
    } else {
      this.snackBarService.showSnackBar(Constants.Messages.ENTER_VALID_CRED);
    }
  }

  userSignIn(): void {
    if (this.loginCred.userName && this.loginCred.password) {
      const isCredValid = this.localStorageService.validateUserCredentials(this.loginCred);
      if (isCredValid) {
        this.localStorageService.setLoggedInUser(this.loginCred);
        this.localStorageService.adminLoggedIn(false);
        this.router.navigate(['/' + Constants.RoutePath.USER_DASHBOARD]);
        this.snackBarService.showSnackBar(Constants.Messages.WELCOME_USER);
      } else {
        this.snackBarService.showSnackBar(Constants.Messages.ENTER_VALID_CRED);
      }
    } else {
      this.snackBarService.showSnackBar(Constants.Messages.ENTER_VALID_CRED);
    }
  }
}
