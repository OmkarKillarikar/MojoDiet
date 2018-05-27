import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Dish} from '../models/dish';
import {LocalStorageService} from '../services/LocalStorageService';
import {SnackBarService} from '../services/SnackBarService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})

export class AdminDashboardComponent implements AfterViewInit {
  img: string;
  dish: Dish;
  dishes: Array<Dish> = [];
  IMG_PLACEHOLDER = '././assets/ic_food_placeholder.png';
  elementImg;
  @ViewChild('fileChooser') fileChooser: any;

  constructor(private router: Router
    , private element: ElementRef
    , private dishService: LocalStorageService
    , private snackService: SnackBarService) {
    this.dish = new Dish();
    this.img = this.IMG_PLACEHOLDER;
    this.invalidateDishes();
  }

  ngAfterViewInit(): void {
  }

  onImagePicked(event) {
    this.elementImg = this.element.nativeElement.querySelector('#imgDish');

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.dish.image = e.target.result;
      this.elementImg.src = this.dish.image;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  addDish() {
    if (this.dish.price && this.dish.image && this.dish.name) {
      this.dishService.addDish(this.dish);
      this.dish = new Dish();
      this.elementImg.src = this.IMG_PLACEHOLDER;
      this.fileChooser.nativeElement.value = '';
      this.invalidateDishes();
      this.snackService.showSnackBar('Dish added!');
    }
  }

  invalidateDishes() {
    this.dishes = this.dishService.getDishes();
  }
}
