import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dish} from '../models/dish';
import {DishService} from '../services/DishService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit {
  img: string;
  dish: Dish;
  dishes: Array<Dish>;
  IMG_PLACEHOLDER = '././assets/ic_food_placeholder.png';

  constructor(private router: Router, private element: ElementRef, private dishService: DishService) {
    this.dish = new Dish();
    this.img = this.IMG_PLACEHOLDER;
  }

  ngAfterViewInit(): void {
    this.invalidateDishes();
  }

  onImagePicked(event) {
    const elementImg = this.element.nativeElement.querySelector('#imgDish');

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.dish.image = elementImg.src = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  addDish() {
    if (this.dish.price && this.dish.image && this.dish.name) {
      this.dishService.addDish(this.dish);
      this.dish = new Dish();
      this.img = this.IMG_PLACEHOLDER;
      this.invalidateDishes();
    }
  }

  invalidateDishes() {
    this.dishes = this.dishService.getDishes();
  }
}
