import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-cancel-dialog',
  templateUrl: './confirm-cancel-dialog.component.html',
  styleUrls: ['./confirm-cancel-dialog.component.scss']
})
export class ConfirmCancelDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmCancelDialogComponent>
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
