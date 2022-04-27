import { Injectable } from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Credential} from "../models/credential.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Shop} from "../models/shop.model";
import {ActiveSessionService} from "./active-session.service";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CredentialShopService {

  session: Shop | undefined;
  private url = 'http://localhost:3000/shop';

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
  getShopById(id: number): Observable<Shop[]>{
    const url = `${this.url}/?id=${id}`;
    return this.httpClient.get<Shop[]>(url);
  }

  submitNewProduct(shop: Shop, product: Product): Observable<Shop>{
    const url = `${this.url}/${this.activeSessionService.credential?.shopId}`;

    shop.products.push(product);
    return this.httpClient.put<Shop>(url,shop);
  }
  submit(shop: Shop): Observable<Shop> {
    return this.httpClient.post<Shop>(this.url, shop);

  }

}
