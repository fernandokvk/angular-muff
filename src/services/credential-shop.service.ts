import { Injectable } from '@angular/core';
import {map, Observable, Subscription, tap} from "rxjs";
import {Credential} from "../models/credential.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Shop} from "../models/shop.model";
import {ActiveSessionService} from "./active-session.service";
import {Product} from "../models/product.model";
import {Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class CredentialShopService {
  session: Shop | undefined;
  private url = 'http://localhost:3000/shop';
  productEdit: boolean = false;

  constructor(private httpClient: HttpClient, private activeSessionService: ActiveSessionService) {
  }

  searchCredentials(user: string): Observable<Shop[]> {
    user = user.trim();
    const options = user ? {params: new HttpParams().set('email', user)} : {};
    return this.httpClient.get<Shop[]>(this.url, options);
  }

  getAllShops(){
    return this.httpClient.get<Shop[]>(this.url);
  }
  getShopById(id: number): Observable<Shop>{
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Shop>(url);
  }

  submitNewProduct(shop: Shop, product: Product): Observable<Shop>{
    const url = `${this.url}/${this.activeSessionService.credential?.shopId}`;

    shop.products.push(product);
    return this.httpClient.put<Shop>(url,shop);
  }
  submit(shop: Shop): Observable<Shop> {
    return this.httpClient.post<Shop>(this.url, shop);

  }

  updateShop(shop: Shop) : Observable<any>{
    const url = `${this.url}/${shop.id}`;
    return this.httpClient.put<Shop>(url,shop);
  }

  enableProductUpdate(){
    this.productEdit = true;
  }

  disableProductUpdate(){
    this.productEdit = false;
  }

  orderFinished(order: Order) {                                       //testar
    order.products.forEach(product => {
      product.sold_units += product.quantity;
      const url = `${this.url}/${product.id}`;
      this.httpClient.put<Product>(url, product);
    })

  }
}
