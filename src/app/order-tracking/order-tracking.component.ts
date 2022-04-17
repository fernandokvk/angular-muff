import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order.model';
import { DatePipe, Location } from '@angular/common';
import {Shop} from "../../models/shop.model";
import {CredentialShopService} from "../../services/credential-shop.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
})
export class OrderTrackingComponent implements OnInit {
  order?: Order;
  shop?: Shop;

  constructor(
    private orderService: OrdersService,
    private shopService: CredentialShopService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getShop(): Observable<Shop[]>{
    const shopId = this.order!.shopId;
    return this.shopService.getShopById(shopId);
  }

  getOrder(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.orderService.getOrder(id).subscribe((order) => {
      this.order = order;
      this.getShop().subscribe(
        (shop: Shop[]) => {
          this.shop = shop[0];
          console.log(this.shop);
        }
      );
      console.log(this.order);
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
    }
    return 'undefined';
  }

  getPaymentMethod(order: Order) {
    switch (order.paymentMethod) {
      case 'CASH':
        return 'Dinheiro';
      default:
        return (
          order.paymentMethod.nickname +
          ' ' +
          order.paymentMethod.cardNumber.substring(14, 19)
        );
    }
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
}
