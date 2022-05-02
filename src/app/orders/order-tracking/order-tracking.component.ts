import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../../services/orders.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../../models/order.model';
import {DatePipe, Location} from '@angular/common';
import {Shop} from "../../../models/shop.model";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {Observable} from "rxjs";
import {ActiveSessionService} from "../../../services/active-session.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SelectCourierDialogComponent} from "../select-courier-dialog/select-courier-dialog.component";
import {ConfirmCancelDialogComponent} from "../confirm-cancel-dialog/confirm-cancel-dialog.component";
import {Payment} from "../../../models/payment.model";

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
})
export class OrderTrackingComponent implements OnInit {
  order?: Order;
  shop?: Shop;
  type: "SHOP" | "CUSTOMER" | "COURIER" | undefined;
  cancelDisabled: boolean = false;
  assignCourierDisabled: boolean = false;
  rejectDisabled: boolean = false;
  acceptDisabled: boolean = false;

  constructor(
    private orderService: OrdersService,
    private shopService: CredentialShopService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private datePipe: DatePipe,
    private activeSession: ActiveSessionService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getOrder();

    this.type = this.activeSession.credential?.type

    // console.log(this.order)
    // console.log("loginType: "+this.type)
  }

  readyOrder(order: Order) {
    const dialogRef = this.dialog.open(SelectCourierDialogComponent, {
      width: '300px',
      data: {orderId: order.id},
    });

    dialogRef.backdropClick().subscribe(v=>{
      dialogRef.close(-2);
    });
    dialogRef.afterClosed().subscribe(courierId => {
      if (courierId != -2 ){ // Assign value
        this.orderService.readyOrder(order, courierId);
        this.cancelDisabled = true;
        this.assignCourierDisabled = true;
      }
    });
  }

  cancelOrder(order: Order) {
    const dialogRef = this.dialog.open(ConfirmCancelDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.orderService.cancelOrder(order);
        this.cancelDisabled = true;
        this.assignCourierDisabled = true;

      }
    });
  }

  getShop(): Observable<Shop> {
    const shopId = this.order!.shopId;
    return this.shopService.getShopById(shopId);
  }

  getOrder(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.orderService.getOrder(id).subscribe((order) => {
      this.order = order;
      this.getShop().subscribe(
        (shop) => {
          this.shop = shop;
        }
      );

      if (order.status == "ASSIGNED" || order.status == "ON_THE_WAY") this.assignCourierDisabled = true;
    });
  }

  goBack() {
    this.location.back();
  }

  getEstimatedDelivery(order: Order) {
    let estimatedDelivery = new Date(order.estimatedAt);

    return this.datePipe.transform(estimatedDelivery, 'HH:mm');
  }

  getOrderStatus(order: Order) {
    switch (order.status) {
      case 'PLACED':
        return 'Aguardando';
      case 'PREPARING':
        return 'Preparando';
      case 'ON_THE_WAY':
        return 'Saiu para entrega';
      case 'FINISHED':
        return 'Concluído';
      case 'CANCELLED':
        return 'Cancelado';
      case 'ASSIGNED':
        return "Aguardando entregador";
      case 'SCHEDULED':
        return "Agendado";
    }
    return 'undefined';
  }

  getPaymentMethod(order: Order) {
    switch (order.paymentMethod) {
      case 'CASH':
        return 'Dinheiro';
      default:
        return ("Cartão de "+ OrderTrackingComponent.switchCardType(order.paymentMethod));
    }
  }

  private static switchCardType(paymentMethod: Payment) {
    let string = "";

    if (paymentMethod.type == "CREDIT_CARD") string = "Crédito";
    else string = "Débito";

    if (paymentMethod.cardType == "MASTERCARD") string = string.concat(" - Mastercard");
    else string = string.concat(" - Visa")

    return string;
  }



  getOrderCost(order: Order) {
    let value: number = 0;
    order.products.forEach((t) => (value += t.price));
    return value.toFixed(2);
  }

  getStars(shop: Shop) {
    let rating = "";
    for (let i = 0; i < Math.ceil(shop.rating); i++) {
      rating = rating.concat("⭐")
    }
    return rating;

  }

  goToShopPage(shop: Shop) {
    console.log("Implementar")

  }

  getProgressValue(order: Order) {
    if (order.status != 'FINISHED') {
      const totalEstimate: number =
        new Date(order.estimatedAt).getTime() -
        new Date(order.createdAt).getTime();
      const current: number = Date.now() - new Date(order.createdAt).getTime();

      return Math.round((current / totalEstimate) * 100);
    } else {
      return 100;
    }
  }

  courierAccept(order: Order) {
    this.orderService.courierAccept(order, this.activeSession.credential!.courierId)
    // this.assignCourierDisabled = true;
    // this.rejectDisabled = true;
  }

  courierReject(order: Order) {
    this.orderService.courierReject(order, this.activeSession.credential!.courierId)
    // this.assignCourierDisabled = true;
    // this.rejectDisabled = true;
  }



}
