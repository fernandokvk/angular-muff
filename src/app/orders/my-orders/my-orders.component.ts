import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';
import { ActiveSessionService } from '../../../services/active-session.service';
import { Location } from '@angular/common';
import {map, Observable, Subject, timer} from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders$!: Observable<Order[]>;
  type: any;

  constructor(
    private orderService: OrdersService,
    private activeSession: ActiveSessionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    this.activeSession.credential = {id: 15, courierId: 1, type: "COURIER"};
    // this.activeSession.credential = {id: 1, type: "CUSTOMER"};
    // this.activeSession.credential = {id: 15, shopId: 1, type: "SHOP"};
    this.typeSwitch();

  }

  typeSwitch(){
    if (this.activeSession.credential?.type == "CUSTOMER") this.customerType();
    else if (this.activeSession.credential?.type == "SHOP") this.shopType();
    else this.courierType();
  }

  private customerType() {
    this.type = "CUSTOMER";
    this.orders$ = this.fetchOrders();
  }

  private shopType(){
    this.type = "SHOP";
  }

  private courierType(){
    this.type = "COURIER";
  }


  fetchOrders(): Observable<Order[]> {
    return this.orderService
      .fetchOrders(this.activeSession.credential?.id)
      .pipe(map((items) => items.filter((item) => item.status != 'FINISHED')));
  }


  goBack() {
    return this.location.back();
  }

  getOrderStatus(order: Order): string {
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

  getOrderCost(order: Order): string {
    let value: number = 0;
    order.products.forEach((t) => (value += t.price));
    return value.toFixed(2);
  }

  getProgressValue(order: Order): number {
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

  getEstimatedMinutes(order: Order): any {
    const difference: number =
      (new Date(order.estimatedAt).getTime() - Date.now()) / (1000 * 60);

    if (difference < 0) {
      return -1;
    } else {
      return difference.toFixed(0);
    }
  }

}
