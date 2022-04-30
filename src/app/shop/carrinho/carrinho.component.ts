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
  profileType: any = "CUSTOMER";

  displayedColumns = ['image','name', 'quantity', 'price'];
  deliveryFee = 50;
  endereco = "";
  shop: Shop | undefined;
  temShop: boolean = false;
  shops: Shop[] = [];
  tipo_pagamento: String = "CASH";
  cartao: Payment | undefined;

  scheduleDay: any;
  scheduleTime: any;

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
    this.profileType = this.activeSessionService.credential?.type;

    if(this.activeSessionService.credential != null) {
      this.endereco = this.activeSessionService.credential.endereco;
    }
    this.shop = this.activeSessionService.sessionShop;
    if(this.shop == null) {
      this.temShop = false;
    }else{
      this.temShop = true;
    }

    this.activeSessionService.sessionProducts = [{
      "id": 1,
      "barcode": 445950719443,
      "name": "Abacate",
      "category": "Hortifruti",
      "quantity": 8,
      "price": 5.83,
      "imageUrl": "/assets/categorias/abacate.png"
    }]
  }

  private scheduleHandler(): Date{
    const scheduleDay = new Date(this.scheduleDay);
    const scheduleTime = new Date(this.scheduleTime);
    scheduleDay.setHours(scheduleTime.getHours());
    scheduleDay.setMinutes(scheduleTime.getMinutes());
    return scheduleDay;
  }

  onSubmit() {

    /**To do - Colocar como task
     * Entregador
     * Cadastrar pagamento por cartão
     * Definir lat e long
     * Definir lat e long (To do)
    **/
    if(this.carrinho.length > 0 && this.tipo_pagamento !==  ""){
      const dataCompra = new Date();
      let dataEstimado = new Date(dataCompra);
      dataEstimado.setDate(dataCompra.getDate() + 3)
      let emptyArray: any[] = [];

      let orderStatus = "PLACED";
      const scheduleDate = this.scheduleHandler();
      if (!(isNaN(scheduleDate.getTime()))){
        //Agendado
        orderStatus = "SCHEDULED";
        dataEstimado = scheduleDate;
      }

      this.credentialCarrinhoService
      .submit({
        products: this.carrinho,
        customerId: this.activeSessionService.credential?.id,
        customerName: this.activeSessionService.credential?.name,
        // shopId: this.shop?.id,
        // shopName: this.shop?.name,
        shopId: 1,
        shopName: "Shop1",
        status: orderStatus,
        deliveryFee: this.deliveryFee,
        courierRejectedIds: emptyArray,
        paymentStatus: "NOT_PAID",
        paymentMethod: this.tipo_pagamento,
        pickupLocation: this.shop?.location,
        deliveryLocation: {address: this.activeSessionService.credential?.endereco, lat: 1, long: 2},
        createdAt: dataCompra,
        updatedAt: dataCompra,
        estimatedAt: dataEstimado,
      } as Order)
      .subscribe(
        t => console.log(t)
      );

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
