import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'src/models/payment.model';
import { ActiveSessionService } from 'src/services/active-session.service';

@Component({
  selector: 'app-cartao-selected-dialog',
  templateUrl: './cartao-selected-dialog.component.html',
  styleUrls: ['./cartao-selected-dialog.component.scss']
})
export class CartaoSelectedDialogComponent implements OnInit {
  cartoes: Payment[] | undefined;
  cartao_selecionado: Payment | undefined;

  constructor(
    public dialogRef: MatDialogRef<CartaoSelectedDialogComponent>,
    private activeSessionService: ActiveSessionService
  ) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    this.cartoes = this.activeSessionService.credential?.paymentCards;
  }

  confirmar_dialog(): void {
    this.dialogRef.close(this.cartao_selecionado);
  }

  cancelar_dialog(): void{
    this.dialogRef.close();
  }

  getSelectedClass(cartao: Payment): string {
    const isValid = this.cartao_selecionado == cartao;
    if(isValid) {
      return "selected"
    }else{
      return "not-selected"
    }
  }

  actionCardSelected(cartao: Payment): void {
    this.cartao_selecionado = cartao;
  }

  getLastNumbers(cardNumber: string): string{
    var result = "**** **** **** " + cardNumber.slice(-4);
    return result;
  }

  addCartao(){
    console.log('adicionar um cartão')
  }

}
