import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'src/models/payment.model';
import { ActiveSessionService } from 'src/services/active-session.service';
import { CredentialsService } from 'src/services/credentials.service';

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.scss']
})
export class NewCardDialogComponent implements OnInit {
  newCardForm!: FormGroup;
  cardType: string = "";
  src_cardType: string = "";
  masks = new Map([
    ["cardNumber", "0000 0000 0000 0000"],
    ["expDate", "00/00"],
    ["cvv", "000"]
  ]);


  constructor(
    public dialogRef: MatDialogRef<NewCardDialogComponent>,
    private fb: FormBuilder,
    private credentialService: CredentialsService,
    private activeSessionService: ActiveSessionService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    const fb = this.fb;
    this.newCardForm = fb.group({
      cardNumber: fb.control('', [Validators.required]),
      nameOnCard: fb.control('', [Validators.required]),
      expDate: fb.control('', [Validators.required]),
      cvv: fb.control('', [Validators.required]),
      nickname: fb.control('', [Validators.required]),
      type: fb.control('', [Validators.required]),
    });
  }

  getMask(field: string){
    return this.masks.get(field);
  }

  close_dialog(): void{
    this.dialogRef.close();
  }

  canSubmit(): boolean {
    let canSubmit = true;
    Object.keys(this.newCardForm.controls).forEach((key) => {
      if (this.cardType.length == 0 || this.newCardForm.get(key)?.errors != null) {
        canSubmit = false;
      }
    });
    return canSubmit;
  }

  onSubmit(){
    if (this.canSubmit()) {
      this.credentialService.submitNewCard(this.activeSessionService.credential,{
        type: this.type?.value,
        cardType: this.cardType,
        nickname: this.nickname?.value,
        nameOnCard: this.nameOnCard?.value,
        cardNumber: this.cardNumber?.value,
        cvv: this.cvv?.value,
        expDate: this.expDate?.value,
      } as Payment).subscribe(
        (t) => console.log(t.email),
        (error) => console.log(error)
      );
      this.dialogRef.close()
    }
  }

  get_card_logo(): boolean {
    if(this.cardNumber?.value.length > 0){
      switch(this.cardNumber?.value[0]){
        case "5":
          this.src_cardType = "/assets/card_logo/mastercard_logo.png";
          this.cardType = "MASTERCARD";
          return true;
        case "4":
          this.src_cardType = "/assets/card_logo/visa_logo.png";
          this.cardType = "VISA";
          return true;
        default:
          this.src_cardType = "";
          this.cardType = "";
          return false;
      } 
    }else{
      this.src_cardType = "";
      this.cardType = "";
      return false;
    }
  }

  get cardNumber() {
    return this.newCardForm.get('cardNumber');
  }

  get nameOnCard() {
    return this.newCardForm.get('nameOnCard');
  }

  get cvv() {
    return this.newCardForm.get('cvv');
  }

  get expDate() {
    return this.newCardForm.get('expDate');
  }

  get nickname() {
    return this.newCardForm.get('nickname');
  }

  get type() {
    return this.newCardForm.get('type');
  }

}
