import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
  productName!: number;
  productQuantity!: number;
  productImageUrl!: number;
  productPrice!: number;
}

@Component({
  selector: 'app-cart-detail-dialog',
  templateUrl: './cart-detail-dialog.component.html',
  styleUrls: ['./cart-detail-dialog.component.scss']
})
export class CartDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
