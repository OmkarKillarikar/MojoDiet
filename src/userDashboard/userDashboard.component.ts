import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Dish} from '../models/dish';
import {StorageService} from '../services/storageService';
import {SnackBarService} from '../services/snackBarService';
import {Diet} from '../models/diet';
import {Constants} from '../utils/constants';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userDashboard.component.html',
  styleUrls: ['./userDashboard.component.css']
})
export class UserDashboardComponent {
  img: string;
  dishes: Array<Dish>;
  dishesToSelect: Array<Dish>;
  diets: Array<Diet>;
  IMG_PLACEHOLDER = '././assets/ic_food_placeholder.png';
  next: Date;
  totalCost: number;

  constructor(private router: Router
    , private element: ElementRef
    , private storageService: StorageService
    , private snackService: SnackBarService) {
    if (!storageService.getLoggedInUser()) {
      // no user logged in, redirect to select user screen
      router.navigate(['/']);
    }
    this.totalCost = 0;
    this.getDishes();
    this.img = this.IMG_PLACEHOLDER;
    this.diets = this.storageService.getDietPlan();
    if (this.diets == null) {
      this.diets = [];
    } else {
      this.invalidateDishList();
    }
    this.initWeek();
  }

  private initWeek(): void {
    if (this.diets == null || this.diets.length === 0) {
      const today = new Date();
      if (today.getDay() === 1) {
        for (let i = 0; i < 7; i++) {
          this.diets[i] = new Diet();
          this.diets[i].date = new Date();
          this.diets[i].date.setDate(today.getDate() + i);
        }
      } else {
        let difference = (6 - today.getDay()) + 2;
        if (difference === 8) {
          difference = 1;
        }
        this.diets[0] = new Diet();
        this.diets[0].date = new Date();
        this.diets[0].date.setDate(this.diets[0].date.getDate() + difference);
        for (let i = 1; i < 7; i++) {
          this.diets[i] = new Diet();
          this.diets[i].date = new Date();
          this.diets[i].date.setDate(today.getDate() + (difference + i));
        }
      }
    } else {
      this.invalidateTotalCost();
    }
  }

  private getDishes(): void {
    this.dishes = this.storageService.getDishes();
    this.dishesToSelect = JSON.parse(JSON.stringify(this.dishes));
  }

  onDishSelected(dish: Dish): void {
    console.log(dish);
    for (let i = 0; i < this.dishesToSelect.length; i++) {
      if (this.dishesToSelect[i].name === dish.name) {
        this.dishesToSelect.splice(i, 1);
      }
    }
    this.invalidateTotalCost();
  }

  onDishDeleted(dietPosition: number, dish: Dish): void {
    this.diets[dietPosition].dish = null;
    this.dishesToSelect.push(dish);
    this.invalidateTotalCost();
  }

  private invalidateTotalCost(): void {
    let cost = 0;
    if (this.diets != null) {
      for (let i = 0; i < this.diets.length; i++) {
        if (this.diets[i].dish != null) {
          cost = cost + parseInt(this.diets[i].dish.price, 10);
        }
      }
    }
    this.totalCost = cost;
  }

  saveDiet(): void {
    this.storageService.saveDietPlan(this.diets);
    this.snackService.showSnackBar(Constants.Messages.DIET_SAVED);
  }

  invalidateDishList() {
    if (this.diets != null && this.dishesToSelect != null) {
      for (let i = 0; i < this.diets.length; i++) {
        for (let j = 0; j < this.dishesToSelect.length; j++) {
          if (this.diets[i].dish && this.diets[i].dish.name === this.dishesToSelect[j].name) {
            this.dishesToSelect.splice(j, 1);
            j--;
            break;
          }
        }
      }
    }
  }

}
