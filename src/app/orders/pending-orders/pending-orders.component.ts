import {Component, OnInit} from '@angular/core';
import {DatePipe, Location} from "@angular/common";
import {map, Observable, tap} from "rxjs";
import {Order} from "../../../models/order.model";
import {OrdersService} from "../../../services/orders.service";
import {ActiveSessionService} from "../../../services/active-session.service";
import {CredentialsService} from "../../../services/credentials.service";
import {Credential} from "../../../models/credential.model";
import {newArray} from "@angular/compiler/src/util";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

  placedOrders$!: Observable<Order[]>;
  onTheWayOrders$!: Observable<Order[]>;
  awaitingPickup$!: Observable<Order[]>;
  scheduledOrders$!: Observable<Order[]>;
  placedOrdersSize: number = 0;
  awaitingPickupSize: number = 0;
  onTheWaySize: number = 0;
  scheduledOrdersSize: number = 0;


  constructor(
    private orderService: OrdersService,
    private activeSession: ActiveSessionService,
    private location: Location,
    private credentialService: CredentialsService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.placedOrders$ = this.fetchOrders('PLACED');
    this.placedOrders$.forEach(order => this.placedOrdersSize = order.length);

    this.scheduledOrders$ = this.fetchOrders('SCHEDULED');
    this.scheduledOrders$.forEach(order => this.scheduledOrdersSize = order.length);

    this.awaitingPickup$ = this.fetchOrders('ASSIGNED')
    this.awaitingPickup$.forEach(order => this.awaitingPickupSize = order.length);

    this.onTheWayOrders$ = this.fetchOrders('ON_THE_WAY')
    this.onTheWayOrders$.forEach(order => this.onTheWaySize = order.length);

  }

  fetchOrders(status: string): Observable<Order[]> {
    return this.orderService
      .fetchShopOrders(this.activeSession.credential?.shopId)
      .pipe(map((items) => items.filter((item) => item.status == status)));
  }

  goBack() {
    return this.location.back();
  }


  getOrderCost(order: Order): string {
    let value: number = 0;
    order.products.forEach((t) => (value += t.price));
    return value.toFixed(2);
  }

  getOrderCreatedAt(order: Order) {
    return this.datePipe.transform(order.createdAt, "HH:mm")
  }

  getOrderScheduleDate(order: Order) {
    return this.datePipe.transform(order.estimatedAt, "dd/MM - HH:mm")

  }
}
