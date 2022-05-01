import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {Order} from "../../../models/order.model";
import {OrdersService} from "../../../services/orders.service";
import {ActiveSessionService} from "../../../services/active-session.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-pending-orders-customer',
  templateUrl: './pending-orders-customer.component.html',
  styleUrls: ['./pending-orders-customer.component.scss']
})
export class PendingOrdersCustomerComponent implements OnInit {
  activeOrders$!: Observable<Order[]>;
  activeOrdersSize: number = 0;
  scheduledOrders$!: Observable<Order[]>;
  scheduledOrdersSize: number = 0;




  constructor(
    private orderService: OrdersService,
    private activeSession: ActiveSessionService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activeOrders$ = this.fetchActiveOrders();
    this.activeOrders$.forEach(order => this.activeOrdersSize = order.length);

    this.scheduledOrders$ = this.fetchScheduledOrders();
    this.scheduledOrders$.forEach(order => this.scheduledOrdersSize = order.length);



  }

  fetchActiveOrders(): Observable<Order[]> {
    return this.orderService
      .fetchOrders(this.activeSession.credential?.id)
      .pipe(map((items) => items.filter((item) => item.status != 'FINISHED' && item.status != 'SCHEDULED')));
  }

  fetchScheduledOrders(): Observable<Order[]> {
    return this.orderService
      .fetchOrders(this.activeSession.credential?.id)
      .pipe(map((items) => items.filter((item) => item.status == 'SCHEDULED')));
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
      case 'SCHEDULED':
        return 'Agendado';
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

  getScheduledDate(order: Order) {
    return this.datePipe.transform(order.estimatedAt, "dd/MM - HH:mm")
  }
}