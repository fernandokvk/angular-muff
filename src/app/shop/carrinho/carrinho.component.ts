import {Component, OnInit} from '@angular/core';
import {Order} from 'src/models/order.model';
import {Shop} from 'src/models/shop.model';
import {ActiveSessionService} from 'src/services/active-session.service';
import {CredentialCarrinhoService} from 'src/services/credential-carrinho.service';
import {Location} from '@angular/common';
import {Payment} from 'src/models/payment.model';
import {MatDialog} from '@angular/material/dialog';
import {CartaoSelectedDialogComponent} from '../cartao-selected-dialog/cartao-selected-dialog.component';
import {Product} from "../../../models/product.model";
import {Observable, of} from "rxjs";
import {EmptyShoppingCartDialogComponent} from "../empty-shopping-cart-dialog/empty-shopping-cart-dialog.component";
import {CartDetailDialogComponent} from "../cart-detail-dialog/cart-detail-dialog.component";

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  profileType: any = "CUSTOMER";

  displayedColumns = ['image', 'name', 'quantity', 'price'];
  deliveryFee = 50;
  endereco = "";
  shop: Shop | undefined;
  temShop: boolean = false;
  shops: Shop[] = [];
  tipo_pagamento: "CASH" | Payment = "CASH";
  cartao: Payment | undefined;

  scheduleDay: any;
  scheduleTime: any;
  finishOrderDisabled: boolean = false;



  carrinho$!: Observable<Product[]>;

  constructor(
    private activeSessionService: ActiveSessionService,
    private credentialCarrinhoService: CredentialCarrinhoService,
    private location: Location,
    public dialog: MatDialog,
  ) {
  }

  /** Gets the total cost of all transactions. */
  getTotalCost(): number {
    let totalCost = 0;
    if (this.shop?.deliveryFee) totalCost += this.shop.deliveryFee;
    this.carrinho$.subscribe(t => t.forEach(product => {
      if(product.price_discount == undefined){
        totalCost += (product.price * product.quantity)
      }else{
        totalCost += (product.price_discount * product.quantity)
      }

    }))
    return totalCost;
  }

  getCardList(): void {
    let dialogRef = this.dialog.open(CartaoSelectedDialogComponent, {
      width: '300px',
      height: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        if(this.cartao == undefined) {
          this.tipo_pagamento = "CASH";
        }
      } else {
        this.cartao = result;
      }
    })
  }

  ngOnInit(): void {

    this.profileType = this.activeSessionService.credential?.type;
    this.fetchCarrinho();

    if (this.activeSessionService.credential != null) {
      this.endereco = this.activeSessionService.credential.endereco;
    }
    this.shop = this.activeSessionService.sessionShop;
    if (this.shop == null) {
      this.temShop = false;
    } else {
      this.temShop = true;
    }
  }

  private fetchCarrinho() {
    this.carrinho$ = of(this.activeSessionService.sessionProducts)
  }

  private scheduleHandler(): Date {
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
    if (this.activeSessionService.sessionProducts.length > 0){
      const dataCompra = new Date();
      // @ts-ignore
      let dataEstimado = new Date(dataCompra.getTime() + this.shop?.estimatedDeliveryTime*60000);

      let emptyArray: any[] = [];

      let orderStatus = "PLACED";
      const scheduleDate = this.scheduleHandler();
      if (!(isNaN(scheduleDate.getTime()))) {
        //Agendado
        orderStatus = "SCHEDULED";
        dataEstimado = scheduleDate;
      }

      let orderPaid = "NOT_PAID";
      if (this.tipo_pagamento != "CASH") orderPaid = "PAID"; //Se não for dinheiro, é no cartão e está pago

      let payment: any = "CASH";
      if (this.cartao) payment = this.cartao;

      this.credentialCarrinhoService
      .submit({
        products: this.activeSessionService.sessionProducts,
        customerId: this.activeSessionService.credential?.id,
        customerName: this.activeSessionService.credential?.name,
        shopId: this.shop?.id,
        shopName: this.shop?.name,
        status: orderStatus,
        deliveryFee: this.shop?.deliveryFee,
        courierRejectedIds: emptyArray,
        paymentStatus: orderPaid,
        paymentMethod: payment,
        pickupLocation: this.shop?.location,
        deliveryLocation: {address: this.activeSessionService.credential?.endereco, lat: 1, long: 2},
        createdAt: dataCompra,
        updatedAt: dataCompra,
        estimatedAt: dataEstimado
      } as Order).subscribe(
        t => {
          console.log(t)
          this.activeSessionService.sessionProducts = [];
          this.finishOrderDisabled = true;
        }

      )
    }
  }

  goBack() {
    return this.location.back();
  }

  getStars() {
    if (this.shop != null) {
      let rating = "";
      for (let i = 0; i < Math.ceil(this.shop.rating); i++) {
        rating = rating.concat("⭐")
      }
      return rating;
    } else return 0;

  }

  removeFromCart(product: Product) {
    this.activeSessionService.removeProduct(product).subscribe();
    this.carrinho$ = of(this.activeSessionService.sessionProducts);
    // console.log(this.activeSessionService.sessionProducts)
  }

  productDetail(product: Product) {
    const dialogRef = this.dialog.open(CartDetailDialogComponent, {
      width: '350px',
      data:
        {
          productName: product.name,
          productQuantity: product.quantity,
          productObservation: product.observation
        },
    });
    dialogRef.backdropClick().subscribe(v => {
      dialogRef.close()
    });
    dialogRef.afterClosed().subscribe(data => {
        product.quantity = data.productQuantity;
        product.observation = data.productObservation;
        if (product.quantity == 0){
          this.removeFromCart(product);
        }
      }
    );
  }
}
