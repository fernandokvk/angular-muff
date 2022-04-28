import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order.model';
import { Shop } from 'src/models/shop.model';
import { ActiveSessionService } from 'src/services/active-session.service';
import { CredentialCarrinhoService } from 'src/services/credential-carrinho.service';
import { Location } from '@angular/common';
import { Payment } from 'src/models/payment.model';
import { MatDialog } from '@angular/material/dialog';
import { CartaoSelectedDialogComponent } from '../cartao-selected-dialog/cartao-selected-dialog.component';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  displayedColumns = ['image','name', 'quantity', 'price'];
  deliveryFee = 50;
  endereco = "";
  shop: Shop | undefined;
  temShop: boolean = false;
  shops: Shop[] = [];
  tipo_pagamento: String = "CASH";
  cartao: Payment | undefined;

  carrinho = this.activeSessionService.sessionProducts;

  constructor(
    private activeSessionService: ActiveSessionService,
    private credentialCarrinhoService: CredentialCarrinhoService,
    private location: Location,
    public dialog: MatDialog,
    ) {
    }

  /** Gets the total cost of all transactions. */
  getTotalCost(): number{
    return (this.deliveryFee + this.carrinho.map(t => (t.price * t.quantity)).reduce((acc, value) => acc + value, 0));
  }

  getCardList() : void{
    let dialogRef = this.dialog.open(CartaoSelectedDialogComponent, {
      width: '300px',
      height: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == null){
        this.tipo_pagamento = "CASH";
      }else{
        this.cartao = result;
      }
    })
  }

  ngOnInit(): void {
    if(this.activeSessionService.credential != null) {
      this.endereco = this.activeSessionService.credential.endereco;
    }
    this.shop = this.activeSessionService.sessionShop;
    if(this.shop == null) {
      this.temShop = false;
    }else{
      this.temShop = true;
    }
  }

  onSubmit() {
    /**To do - Colocar como task
     * Entregador
     * Cadastrar pagamento por cartão
     * Definir lat e long
     * Definir lat e long (To do)
    **/
    if(this.carrinho.length > 0 && this.tipo_pagamento !==  ""){
      var dataCompra = new Date();
      var dataEstimado = new Date(dataCompra);
      dataEstimado.setDate(dataCompra.getDate() + 3)
      let emptyArray: any[] = [];
      this.credentialCarrinhoService
      .submit({
        products: this.carrinho,
        customerId: this.activeSessionService.credential?.id,
        customerName: this.activeSessionService.credential?.name,
        shopId: this.shop?.id,
        shopName: this.shop?.name,
        status: "PLACED",
        deliveryFee: this.deliveryFee,
        courierRejectedIds: emptyArray,
        paymentStatus: "NOT_PAID",
        paymentMethod: this.cartao,
        pickupLocation: this.shop?.location,
        deliveryLocation: {address: this.activeSessionService.credential?.endereco, lat: 1, long: 2},
        createdAt: dataCompra,
        updatedAt: dataCompra,
        estimatedAt: dataEstimado,
      } as Order)
      .subscribe();

      this.carrinho = []
    }

  }

  goBack() {
    return this.location.back();
  }

  getStars() {
    if(this.shop != null){
      let rating = "";
      for (let i = 0; i < Math.ceil(this.shop.rating); i++) {
        rating = rating.concat("⭐")
      }
      return rating;
    }else return 0;

  }

}
