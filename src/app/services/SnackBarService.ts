import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 3000});
  }
}
