import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credential } from '../models/credential.model';
import { Observable } from 'rxjs';

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

  searchCredentials(user: string): Observable<Credential[]> {
    user = user.trim();

    const options = user ? { params: new HttpParams().set('email', user) } : {};

    return this.httpClient.get<Credential[]>(this.url, options);
  }

  submitNewShop(credential: Credential | undefined, shopId: number): Observable<Credential> {
    const url = `${this.url}/${credential?.id}`;
    credential!.shopId = shopId;
    return this.httpClient.put<Credential>(url, credential);
  }

  submitNewCourier(credential: Credential | undefined, courierId: number): Observable<Credential> {
    const url = `${this.url}/${credential?.id}`;
    credential!.courierId = courierId;
    return this.httpClient.put<Credential>(url, credential);
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
