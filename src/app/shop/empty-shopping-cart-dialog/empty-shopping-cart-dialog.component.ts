import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-empty-shopping-cart-dialog',
  templateUrl: './empty-shopping-cart-dialog.component.html',
  styleUrls: ['./empty-shopping-cart-dialog.component.scss']
})
export class EmptyShoppingCartDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmptyShoppingCartDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);

  }

  confirm() {
    this.dialogRef.close(true);

  }
}
