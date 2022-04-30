import {Component, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {Order} from "../../../models/order.model";
import {OrdersService} from "../../../services/orders.service";
import {ActiveSessionService} from "../../../services/active-session.service";
import {DatePipe, Location} from "@angular/common";
import {CredentialsService} from "../../../services/credentials.service";

@Component({
  selector: 'app-pending-orders-courier',
  templateUrl: './pending-orders-courier.component.html',
  styleUrls: ['./pending-orders-courier.component.scss']
})
export class PendingOrdersCourierComponent implements OnInit {

  availableOrders$!: Observable<Order[]>;
  acceptedOrders$!: Observable<Order[]>;
  availableOrdersSize: number = 0;
  activeOrdersSize: number = 0;

  constructor(
    private orderService: OrdersService,
    private activeSession: ActiveSessionService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.availableOrders$ = this.fetchOrders('ASSIGNED');
    this.availableOrders$.forEach(order => this.availableOrdersSize = order.length)
    this.acceptedOrders$ = this.fetchOrders('ON_THE_WAY');
    this.acceptedOrders$.forEach(order => this.activeOrdersSize = order.length)

  }

  fetchOrders(status: string): Observable<Order[]> {
    return this.orderService
      .fetchCourierOrders(this.activeSession.credential?.courierId)
      .pipe(map((items) => items.filter(
        (item) => item.status == status)));

  }

  getAssignedAt(order: Order) {
    return this.datePipe.transform(order.updatedAt, "HH:mm")
  }

  getDistanceToDelivery(order: Order) {
    return this.orderService.calculateDistanceKilometers(this.activeSession.currentLocation.lat,
      this.activeSession.currentLocation.long,
      order.deliveryLocation.lat,
      order.deliveryLocation.long)
  }

  finishOrder(order: Order) {
    order.status = "FINISHED"
    order.updatedAt = new Date();
    order.finishedAt = new Date();
    this.orderService.finishOrder(order);
    location.reload();

  }
}
