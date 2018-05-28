import {Injectable} from '@angular/core';
import {Dish} from '../models/dish';
import {UserCredentials} from '../models/userCredentials';
import {Diet} from '../models/diet';
import {Constants} from '../utils/constants';

@Injectable()
export class StorageService {

  constructor() {
  }

  addDish(data: Dish): boolean {
    try {
      let dishes: Dish[];
      dishes = JSON.parse(localStorage.getItem(Constants.DISH_KEY));
      if (dishes == null) {
        dishes = Array<Dish>();
      } else {
        for (let i = 0; i < dishes.length; i++) {
          if (dishes[i].name === data.name) {
            return false;
          }
        }
      }
      dishes.push(data);
      localStorage.setItem(Constants.DISH_KEY, JSON.stringify(dishes));
      return true;
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  getDishes(): Dish[] {
    try {
      return JSON.parse(localStorage.getItem(Constants.DISH_KEY));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  deleteDish(data: Dish): void {
    try {
      let dishes: Dish[];
      dishes = JSON.parse(localStorage.getItem(Constants.DISH_KEY));
      if (dishes == null) {
        return;
      }
      for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].name === data.name) {
          dishes.splice(i, 1);
          break;
        }
      }
      localStorage.setItem(Constants.DISH_KEY, JSON.stringify(dishes));
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  saveUserCredentials(data: UserCredentials): boolean {
    try {
      let userCreds: UserCredentials[];
      userCreds = JSON.parse(localStorage.getItem(Constants.USER_CREDENTIALS_KEY));
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
      localStorage.setItem(Constants.USER_CREDENTIALS_KEY, JSON.stringify(userCreds));
      return true;
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  validateUserCredentials(data: UserCredentials): boolean {
    try {
      const userCreds = JSON.parse(localStorage.getItem(Constants.USER_CREDENTIALS_KEY));
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
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  setLoggedInUser(data: UserCredentials) {
    try {
      localStorage.setItem(Constants.LOGGED_IN_USER, JSON.stringify(data));
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  getLoggedInUser(): UserCredentials {
    try {
      return JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER));
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  clearUserLogin(): void {
    try {
      localStorage.removeItem(Constants.LOGGED_IN_USER);
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  saveDietPlan(data: Diet[]) {
    try {
      const dietKey = Constants.DIET_PREFIX + this.getLoggedInUser().userName;
      localStorage.setItem(dietKey, JSON.stringify(data));
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  getDietPlan(): Diet[] {
    try {
      const dietKey = Constants.DIET_PREFIX + this.getLoggedInUser().userName;
      return JSON.parse(localStorage.getItem(dietKey));
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  adminLoggedIn(): void {
    try {
      sessionStorage.setItem(Constants.ADMIN_LOGGED_IN, 'true');
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
    }
  }

  isAdminLoggedIn(): string {
    try {
      return sessionStorage.getItem(Constants.ADMIN_LOGGED_IN);
    } catch (e) {
      console.error(Constants.ERROR_MESSAGE, e);
      return;
    }
  }
}
