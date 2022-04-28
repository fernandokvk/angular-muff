import { Injectable } from '@angular/core';
import {Order} from "../models/order.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = 'http://localhost:3000/orders';

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }

  constructor(private httpService: HttpClient) {}

  fetchOrders(customerId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?customerId=${customerId}`;
    return this.httpService.get<Order[]>(url);
  }

  updateOrder(order: Order): Observable<Order>{
    const url = `${this.url}/${order.id}`;
    return this.httpService.put<Order>(url, order, this.httpOptions).pipe(
      map(() => order)
    )
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.url}/${id}`;
    return this.httpService.get<Order>(url);
  }
}
