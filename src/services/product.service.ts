import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActiveSessionService} from "./active-session.service";
import {Product} from "../models/product.model";
import {Courier} from "../models/courier.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  session: Product | undefined;
  private url = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient, private activeSessionService: ActiveSessionService) { }

  getAllProducts(){
    return this.httpClient.get<Product[]>(this.url);
  }
  getProductById(id: number): Observable<Product[]>{
    const url = `${this.url}/?id=${id}`;
    return this.httpClient.get<Product[]>(url);
  }

  submit(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);

  }
}
