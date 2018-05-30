import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Dish} from '../models/dish';
import {StorageService} from '../services/storageService';

@Component({
  selector: 'app-dish-grid',
  templateUrl: './dishGridList.component.html',
  styleUrls: ['./dishGridList.component.css']
})
export class DishGridListComponent {
  @Input() dishes: Array<Dish>;
  @Input() allowDelete: boolean;
  @Output() invalidateDishesData = new EventEmitter();

  constructor(private storageService: StorageService) {
    this.allowDelete = false;
    this.dishes = [];
  }

  onDishDeleted(dish: Dish): void {
    this.storageService.deleteDish(dish);
    this.invalidateDishesData.emit();
  }
}
