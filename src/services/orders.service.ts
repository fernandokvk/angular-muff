import {Injectable} from '@angular/core';
import {Order} from "../models/order.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter, map, Observable} from "rxjs";
import {CredentialCourierService} from "./credential-courier.service";
import {Courier} from "../models/courier.model";
import {CredentialShopService} from "./credential-shop.service";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = 'http://localhost:3000/orders';

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }

  constructor(private httpService: HttpClient,
              private credentialCourierService: CredentialCourierService,
              private shopService: CredentialShopService) {
  }

  fetchOrders(customerId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?customerId=${customerId}`;
    return this.httpService.get<Order[]>(url);
  }

  getAllOrders():Observable<Order[]>{
    return this.httpService.get<Order[]>(this.url);
  }

  updateOrder(order: Order): Observable<Order>{
    const url = `${this.url}/${order.id}`;
    return this.httpService.put<Order>(url, order, this.httpOptions).pipe(
      map(() => order)
    )
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
          order.updatedAt = new Date();
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
            // console.log(order.courierRejectedIds);
            if (distance < minDistance && !order.courierRejectedIds.includes(courier.id)) {
              minDistance = distance;
              closestCourier = courier;
            }
            console.log("courierId: "+courier.id+" | "+distance.toFixed(2)+"km")
          }
        )
        console.log("assigned: "+closestCourier.id)
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

  fetchCourierOrders(courierId: number | undefined): Observable<Order[]> {
    const url = `${this.url}/?courier.id=${courierId}`;
    return this.httpService.get<Order[]>(url)
  }

  courierReject(order: Order, courierId: number) {
    console.log("courierId: " +courierId+" rejected orderId: "+order.id)
    const url = `${this.url}/${order.id}`;
    order.courierRejectedIds.push(courierId);
    order.status = "PLACED";
    delete order.courier;
    this.httpService.put(url, order).subscribe()
  }

  courierAccept(order: Order, courierId: number) {
    const url = `${this.url}/${order.id}`;
    this.credentialCourierService.getCourierById(courierId).subscribe(
      k => {
        order.status = "ON_THE_WAY";
        this.httpService.put(url, order).subscribe();
      }
    )
  }

  finishOrder(order: Order) {
    const url = `${this.url}/${order.id}`;
    this.shopService.orderFinished(order);
    this.httpService.put(url, order).subscribe();

  }
}
