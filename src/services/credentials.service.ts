import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credential } from '../models/credential.model';
import { Observable } from 'rxjs';
import { Payment } from 'src/models/payment.model';
import {Shop} from "../models/shop.model";

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  session: Credential | undefined;
  private url = 'http://localhost:3000/credentials';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}


  searchById(id: number): Observable<Credential>{
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Credential>(url);
  }

  searchCredentials(user: string): Observable<Credential[]> {
    user = user.trim();
    const options = user ? { params: new HttpParams().set('email', user) } : {};
    return this.httpClient.get<Credential[]>(this.url, options);
  }

  submitNewShop(credential: Credential | undefined, shopId: number): Observable<Credential> {
    const url = `${this.url}/${credential?.id}`;
    credential!.shopId = shopId;
    credential!.type = "SHOP";
    return this.httpClient.put<Credential>(url, credential);
  }


  submitNewCourier(credential: Credential | undefined, courierId: number): Observable<Credential> {
    const url = `${this.url}/${credential?.id}`;
    credential!.courierId = courierId;
    credential!.type = "COURIER"
    return this.httpClient.put<Credential>(url, credential);
  }

  submitNewCard(credential: Credential | undefined, card: Payment): Observable<Credential> {
    const url = `${this.url}/${credential?.id}`;
    credential!.paymentCards.push(card);
    return this.httpClient.put<Credential>(url, credential);
  }

  updateCredential(credential:Credential):Observable<Credential>{
    const url = `${this.url}/${credential.id}`;
    return this.httpClient.put<Credential>(url,credential);

  }

  /*  updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
        tap((_) => this.log(`updated hero id= ${hero.id}`)),
        catchError(this.handleError<any>('update hero'))
      );
    }*/

  submit(credential: Credential): Observable<Credential> {
    return this.httpClient.post<Credential>(this.url, credential);
  }
}
