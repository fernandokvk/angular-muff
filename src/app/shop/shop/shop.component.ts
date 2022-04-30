import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Shop} from "../../../models/shop.model";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../../services/orders.service";
import {Product} from "../../../models/product.model";
import {Observable} from "rxjs";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  profileType: any = "CUSTOMER";
  currentShop?: Shop;
  products$!: Observable<Product[]>;


  constructor(
    private activeSession: ActiveSessionService,
    private location: Location,
    private shopService: CredentialShopService,
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.profileType = this.activeSession.credential?.type;
    this.fetchShop();

  }

  private fetchShop(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.shopService.getShopById(id).subscribe(shop => {
      this.currentShop = shop;
      this.products$ = this.productService.getAllProducts()
    });
  }

  goBack() {
    return this.location.back();
  }


  getStars() {
    if (this.currentShop != null) {
      let rating = "";
      for (let i = 0; i < Math.ceil(this.currentShop.rating); i++) {
        rating = rating.concat("⭐")
      }
      return rating;
    } else return 0;

  }

}
