import {Injectable} from '@angular/core';
import {Order} from "../models/order.model";
import {HttpClient} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {CredentialCourierService} from "./credential-courier.service";
import {Courier} from "../models/courier.model";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = 'http://localhost:3000/orders';

  constructor(private httpService: HttpClient,
              private credentialCourierService: CredentialCourierService) {
  }

  fetchOrders(customerId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?customerId=${customerId}`;
    return this.httpService.get<Order[]>(url);
  }

  fetchShopOrders(shopId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?shopId=${shopId}`;
    return this.httpService.get<Order[]>(url);
  }


  getOrder(id: number): Observable<Order> {
    const url = `${this.url}/${id}`;
    return this.httpService.get<Order>(url);
  }

  readyOrder(order: Order, courierId: number) {
    const url = `${this.url}/${order.id}`;
    console.log("Ready order, orderId: " + order.id + " courierId: " + courierId);

    if (courierId == -1) this.closestCourier(order);
    else {
      this.credentialCourierService.getCourierById(courierId).subscribe(
        (t) => {
          order.courier = t;
          order.status = "ASSIGNED";
          this.httpService.put(url, order).subscribe();
        }
      );
    }
  }

  closestCourier(order: Order): void {
    const url = `${this.url}/${order.id}`;
    this.credentialCourierService.getAllCouriers().subscribe(
      allCouriers => {
        let closestCourier!: Courier;
        let minDistance = Number.MAX_VALUE;

        allCouriers.forEach(
          courier => {
            let distance = this.calculateDistanceKilometers(order.pickupLocation.lat, order.pickupLocation.long, courier.location.lat, courier.location.long);
            if (distance < minDistance) {
              minDistance = distance;
              closestCourier = courier;
            }
            console.log("courierId: "+courier.id+" | "+distance.toFixed(2)+"km")
          }
        )
        console.log("closestId: "+closestCourier.id)
        order.courier = closestCourier;
        order.status = "ASSIGNED";
        this.httpService.put(url, order).subscribe();
      }
    )
  }

  calculateDistanceKilometers(latA: number, lonA: number, latB: number, lonB: number): number { //Não acho interessante estar nessa classe, mas não sei onde colocar - Fernando
    latA = this.toRadians(latA);
    latB = this.toRadians(latB);
    lonA = this.toRadians(lonA);
    lonB = this.toRadians(lonB);
    const difLat = Math.abs(latA - latB);
    const difLon = Math.abs(lonA - lonB);
    let dist = Math.pow(Math.sin(difLat/2), 2) + (Math.cos(latA)*Math.cos(latB)*Math.pow(Math.sin(difLon/2), 2)); // Harvesine - Fernando
    dist = Math.asin(Math.sqrt(dist)) * 2 * 6371; //Kilometros
    return dist;
  }

  toRadians(number: number): number{
    return (Math.PI/180)*number
  }

  cancelOrder(order: Order) {
    const url = `${this.url}/${order.id}`;
    order.status = "CANCELLED"
    this.httpService.put<Order>(url, order).subscribe(
      t => console.log("Canceled order:" + t.id)
    )
  }
}
