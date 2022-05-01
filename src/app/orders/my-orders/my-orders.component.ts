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
  profileType: any = "CUSTOMER";


  constructor(
    private orderService: OrdersService,
    private activeSession: ActiveSessionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.profileType = this.activeSession.credential?.type;

    // @ts-ignore
    // this.activeSession.credential = {id: 15, courierId: 1, type: "COURIER"};
    //this.activeSession.credential = {id: 1, type: "CUSTOMER"};

    // this.activeSession.credential = {id: 15, shopId: 1, type: "SHOP"};
    this.typeSwitch();

  }

  typeSwitch(){
    if (this.activeSession.credential?.type == "CUSTOMER") this.customerType();
    else if (this.activeSession.credential?.type == "SHOP") this.shopType();
    else this.courierType();
  }

  private customerType() {
    this.profileType = "CUSTOMER";
  }

  private shopType(){
    this.profileType = "SHOP";
  }

  private courierType(){
    this.profileType = "COURIER";
  }

  goBack() {
    return this.location.back();
  }

}
