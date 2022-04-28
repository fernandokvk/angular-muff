import {Component, OnInit} from '@angular/core';
import {DatePipe, Location} from "@angular/common";
import {map, Observable, tap} from "rxjs";
import {Order} from "../../models/order.model";
import {OrdersService} from "../../services/orders.service";
import {ActiveSessionService} from "../../services/active-session.service";
import {CredentialsService} from "../../services/credentials.service";
import {Credential} from "../../models/credential.model";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

  placedOrders$!: Observable<Order[]>;
  onTheWayOrders$!: Observable<Order[]>;


  constructor(
    private orderService: OrdersService,
    public activeSession: ActiveSessionService,
    private location: Location,
    private credentialService: CredentialsService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.activeSession.credential = {shopId: 1};
    this.placedOrders$ = this.fetchOrders('PLACED');
    this.onTheWayOrders$ = this.fetchOrders('ON_THE_WAY')


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

  getCourierName(order: Order) {
    if (!order.courierName){
      return "--"
    } else {
      return order.courierName
    }

  }

  getOrderCreatedAt(order: Order) {
    return this.datePipe.transform(order.createdAt, "HH:mm")

  }

  gotoOrderDetail(order: Order) {

  }
}
