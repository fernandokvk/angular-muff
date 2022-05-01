import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
  productName!: string;
  productQuantity!: number;
  productObservation!: string;
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
  ) {
  }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data))
  }


  confirm() {
    this.dialogRef.close(this.data);

  }

  removeOne() {
    if (this.data.productQuantity >= 1){
      this.data.productQuantity--;
    }
  }

}
