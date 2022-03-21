import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Credential} from "../models/credential.model";
import {catchError, Observable, of, tap} from "rxjs";
import {C} from "@angular/cdk/keycodes";


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private url = 'http://localhost:3000/credentials';
  session: Credential | undefined;

  constructor(private httpClient: HttpClient) {

  }

  private handleError<Credential>(operation = 'operation', result?: any[]) {
    return (error: any): Observable<Credential> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as unknown as Credential);
    };
  }

  searchCredentials(user: string): Observable<Credential[]> {

/*    return this.httpClient.get<Credential>(this.url, options).pipe(

      tap(_ => console.log("oab")),
      catchError(this.handleError<Credential>('search', []))

    );*/
    user = user.trim();

    const options = user ? { params: new HttpParams().set('login', user) } : {};

    return this.httpClient.get<Credential[]>(this.url, options)

  }





}
