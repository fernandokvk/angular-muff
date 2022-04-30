import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Credential} from "../models/credential.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Courier} from "../models/courier.model";
import {ActiveSessionService} from "./active-session.service";

@Injectable({
  providedIn: 'root'
})
export class CredentialCourierService {

  session: Courier | undefined;
  private url = 'http://localhost:3000/courier';

  constructor(private httpClient: HttpClient, private activeSessionService: ActiveSessionService) { }

  searchCredentials(user: string): Observable<Courier[]> {
    user = user.trim();
    const options = user ? {params: new HttpParams().set('email', user)} : {};
    return this.httpClient.get<Courier[]>(this.url, options);
  }

  getAllCouriers(){
    return this.httpClient.get<Courier[]>(this.url);
  }
  getCourierById(id: number): Observable<Courier>{
    const url = `${this.url}/?id=${id}`;
    return this.httpClient.get<Courier>(url);
  }

  submit(courier: Courier): Observable<Courier> {
    return this.httpClient.post<Courier>(this.url, courier);

  }

  updateCourier(courier: Courier): Observable<Courier>{
    const url = `${this.url}/${courier.id}`;
    return  this.httpClient.put<Courier>(url,courier);

  }
}
