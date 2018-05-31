import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Dish} from '../models/dish';
import {StorageService} from '../services/storageService';
import {SnackBarService} from '../services/snackBarService';
import {Constants} from '../utils/constants';
import {Ng2PicaService} from 'ng2-pica';

@Component({
  selector: 'app-dashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css'],
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
    , private storageService: StorageService
    , private snackService: SnackBarService
    , private ng2PicaService: Ng2PicaService) {
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

    this.ng2PicaService.resize(event.target.files, 60, 60).subscribe((result) => {
      // this.dish.image = e.target.result;
      this.elementImg.src = URL.createObjectURL(result);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dish.image = e.target.result;
      };

      reader.readAsDataURL(result);
    }, error => {
      console.error(error);
    });
  }

  addDish() {
    if (this.dish.price && this.dish.image && this.dish.name) {
      const isAdded = this.storageService.addDish(this.dish);
      if (isAdded) {
        this.dish = new Dish();
        this.elementImg.src = this.IMG_PLACEHOLDER;
        this.fileChooser.nativeElement.value = '';
        this.invalidateDishes();
        this.snackService.showSnackBar(Constants.Messages.DISH_ADDED);
      } else {
        this.snackService.showSnackBar(this.dish.name + ' already exists');
      }
    } else {
      this.snackService.showSnackBar(Constants.Messages.DISH_DATA_ERROR);
    }
  }

  invalidateDishes() {
    this.dishes = this.storageService.getDishes();
  }
}
