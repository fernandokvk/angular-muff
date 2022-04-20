import { Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-shop-selected-dialog',
  templateUrl: './shop-selected-dialog.component.html',
  styleUrls: ['./shop-selected-dialog.component.scss']
})
export class ShopSelectedDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ShopSelectedDialogComponent>,
  ) {
    dialogRef.disableClose = true;
   }

  close_dialog(): void {
    this.dialogRef.close();
  }

}
