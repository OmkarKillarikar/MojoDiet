import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './selectUser.component.html',
  styleUrls: ['./selectUser.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  onCardClick(where: string): void {
    const link = ['/' + where];
    this.router.navigate(link);
  }
}
