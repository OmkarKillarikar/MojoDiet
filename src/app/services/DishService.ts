import {Injectable} from '@angular/core';
import {Dish} from '../models/dish';

@Injectable()
export class DishService {
  DISH_KEY = 'DISHES';

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
}
