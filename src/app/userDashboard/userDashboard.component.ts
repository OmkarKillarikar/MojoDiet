import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Dish} from '../models/dish';
import {LocalStorageService} from '../services/LocalStorageService';
import {SnackBarService} from '../services/SnackBarService';
import {Diet} from '../models/Diet';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userDashboard.component.html',
  styleUrls: ['./userDashboard.component.css']
})
export class UserDashboardComponent implements AfterViewInit {
  img: string;
  dishes: Array<Dish>;
  dishesToSelect: Array<Dish>;
  diets: Array<Diet>;
  IMG_PLACEHOLDER = '././assets/ic_food_placeholder.png';
  next: Date;
  totalCost: number;

  constructor(private router: Router
    , private element: ElementRef
    , private dishService: LocalStorageService
    , private snackService: SnackBarService) {
    this.img = this.IMG_PLACEHOLDER;
    this.diets = [];
    this.initWeek();
    this.totalCost = 0;
  }

  private initWeek(): void {
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
        this.diets[i].date.setDate(this.diets[i - 1].date.getDate() + 1);
      }
    }
  }

  ngAfterViewInit(): void {
    this.invalidateDishes();
  }

  private invalidateDishes(): void {
    this.dishes = this.dishService.getDishes();
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
          cost = cost + this.diets[i].dish.price;
        }
      }
    }
    this.totalCost = cost;
  }
}
