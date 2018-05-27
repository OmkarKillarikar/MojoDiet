import {Injectable} from '@angular/core';
import {Dish} from '../models/dish';
import {UserCredentials} from '../models/userCredentials';

@Injectable()
export class LocalStorageService {
  DISH_KEY = 'DISHES';
  USER_CREDENTIALS_KEY = 'USER_CRED';

  constructor() {
  }

  addDish(data: Dish): void {
    try {
      let dishes: Dish[];
      dishes = JSON.parse(localStorage.getItem(this.DISH_KEY));
      if (dishes == null) {
        dishes = Array<Dish>();
      }
      dishes.push(data);
      localStorage.setItem(this.DISH_KEY, JSON.stringify(dishes));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getDishes(): Dish[] {
    try {
      return JSON.parse(localStorage.getItem(this.DISH_KEY));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  saveUserCredentials(data: UserCredentials): boolean {
    try {
      let userCreds: UserCredentials[];
      userCreds = JSON.parse(localStorage.getItem(this.USER_CREDENTIALS_KEY));
      if (userCreds == null) {
        userCreds = Array<UserCredentials>();
      } else {
        for (let i = 0; i < userCreds.length; i++) {
          const userCred = userCreds[i];
          if (userCred.userName === data.userName) {
            return false;
          }
        }
      }
      userCreds.push(data);
      localStorage.setItem(this.USER_CREDENTIALS_KEY, JSON.stringify(userCreds));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  validateUserCredentials(data: UserCredentials): boolean {
    try {
      const userCreds = JSON.parse(localStorage.getItem(this.USER_CREDENTIALS_KEY));
      if (userCreds == null) {
        return false;
      } else {
        for (let i = 0; i < userCreds.length; i++) {
          const userCred = userCreds[i];
          if (userCred.userName === data.userName && userCred.password === data.password) {
            return true;
          }
        }
        return false;
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

}
