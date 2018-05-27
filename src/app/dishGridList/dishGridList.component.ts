import {Component, Input} from '@angular/core';

import {Dish} from '../models/dish';

@Component({
  selector: 'app-dish-grid',
  templateUrl: './dishGridList.component.html',
  styleUrls: ['./dishGridList.component.css']
})
export class DishGridListComponent {
  @Input() dishes: Array<Dish>;
  @Input() allowDelete: boolean;

  constructor() {
    this.allowDelete = false;
    this.dishes = [];
  }
}
