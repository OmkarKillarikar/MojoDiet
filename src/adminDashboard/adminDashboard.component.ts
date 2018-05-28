import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Dish} from '../models/dish';
import {StorageService} from '../services/storageService';
import {SnackBarService} from '../services/snackBarService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css'],
})

export class AdminDashboardComponent implements AfterViewInit {
  private img: string;
  private dish: Dish;
  private dishes: Array<Dish> = [];
  private IMG_PLACEHOLDER = '././assets/ic_food_placeholder.png';
  private elementImg;
  @ViewChild('fileChooser') fileChooser: any;

  constructor(private router: Router
    , private element: ElementRef
    , private storageService: StorageService
    , private snackService: SnackBarService) {
    if (!storageService.isAdminLoggedIn()) {
      router.navigate(['/']);
    }
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
      const isAdded = this.storageService.addDish(this.dish);
      if (isAdded) {
        this.dish = new Dish();
        this.elementImg.src = this.IMG_PLACEHOLDER;
        this.fileChooser.nativeElement.value = '';
        this.invalidateDishes();
        this.snackService.showSnackBar('Dish added!');
      } else {
        this.snackService.showSnackBar(this.dish.name + ' already exists');
      }
    } else {
      this.snackService.showSnackBar('Please make sure all data is entered');
    }
  }

  invalidateDishes() {
    this.dishes = this.storageService.getDishes();
  }
}
