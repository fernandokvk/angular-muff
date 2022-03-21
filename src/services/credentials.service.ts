import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Credential} from '../models/credential.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  session: Credential | undefined;
  private url = 'http://localhost:3000/credentials';

  constructor(private httpClient: HttpClient) {
  }

  searchCredentials(user: string): Observable<Credential[]> {
    user = user.trim();

    const options = user ? {params: new HttpParams().set('login', user)} : {};

    return this.httpClient.get<Credential[]>(this.url, options);
  }
}
