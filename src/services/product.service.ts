import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
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
  private shopUrl = 'http://localhost:3000/shop';

  constructor(private httpClient: HttpClient, private activeSessionService: ActiveSessionService) { }

  getAllProducts(){
    return this.httpClient.get<Product[]>(this.url);
  }
  getProductById(id: number): Observable<Product>{
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  submit(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);

  }

  updateProduct(product: Product) {
    const url = `${this.url}/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }


  searchProducts(shopId: number, term: string): Observable<Product[]> {
    if (!term.trim()){
      return of([]);
    }
    return this.httpClient.get<Product[]>(`${this.shopUrl}/${shopId}/products?name_like=${term}`);
  }

}
