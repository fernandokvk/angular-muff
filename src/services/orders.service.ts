import { Injectable } from '@angular/core';
import {Order} from "../models/order.model";
import {HttpClient} from "@angular/common/http";
import {filter, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = 'http://localhost:3000/orders';

  constructor(private httpService: HttpClient) {}

  fetchOrders(customerId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?customerId=${customerId}`;
    return this.httpService.get<Order[]>(url);
  }

  fetchShopOrders(shopId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?shopId=${shopId}`;
    return this.httpService.get<Order[]>(url);
  }


  getOrder(id: number): Observable<Order> {
    const url = `${this.url}/${id}`;
    return this.httpService.get<Order>(url);
  }
}
