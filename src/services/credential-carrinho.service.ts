import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/models/order.model';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Shop} from "../models/shop.model";
import {ActiveSessionService} from "./active-session.service";

@Injectable({
  providedIn: 'root'
})
export class CredentialCarrinhoService {
  session: Order | undefined;
  private url = 'http://localhost:3000/orders';

  constructor(private httpClient: HttpClient, private activeSessionService: ActiveSessionService) { }

  submit(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.url, order);

  }
}
