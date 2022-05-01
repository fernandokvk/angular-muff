import { Injectable } from '@angular/core';
import {filter, map, Observable, Subscription, tap} from "rxjs";
import {Credential} from "../models/credential.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Shop} from "../models/shop.model";
import {ActiveSessionService} from "./active-session.service";
import {Product} from "../models/product.model";
import {CredentialShopService} from "./credential-shop.service";
import {OrdersService} from "./orders.service";
import {Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }
  session: Shop | undefined;
  private url = 'http://localhost:3000/report';

  constructor(private httpClient: HttpClient, private activeSessionService: ActiveSessionService, private credentialShopService: CredentialShopService, private orderService: OrdersService) {
  }

  fetchOrders(): Observable<Order[]> {
    return this.orderService.getAllOrders().pipe(map((items: Order[]) => items.filter((item: Order) => item.shopId == this.activeSessionService.credential?.shopId && item.status == 'FINISHED')));
  }
  getShop():Observable<Shop>{
    this.credentialShopService.getShopById(this.activeSessionService.credential?.shopId!).subscribe((j:Shop)=>{
      this.session = j;

    })
    return this.credentialShopService.getShopById((this.activeSessionService.credential?.shopId!));
  }
}
