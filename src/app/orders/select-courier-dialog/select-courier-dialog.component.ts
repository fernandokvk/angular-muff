import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
  orderId: any;
  courierId!: number;
}

@Component({
  selector: 'app-select-courier-dialog',
  templateUrl: './select-courier-dialog.component.html',
  styleUrls: ['./select-courier-dialog.component.scss']
})
export class SelectCourierDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectCourierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    if (this.data.courierId == undefined) this.data.courierId = -1;
    this.dialogRef.close(this.data.courierId);
  }


  close() {
    this.data.courierId = -2;
    this.dialogRef.close(this.data.courierId);
  }
}
