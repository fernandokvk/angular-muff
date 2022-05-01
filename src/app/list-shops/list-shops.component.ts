import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/models/shop.model';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { ActiveSessionService } from 'src/services/active-session.service';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.scss']
})
export class ListShopsComponent implements OnInit {
  shops$!: Observable<Shop[]>;
  shop_selected: string = "";

  constructor(
    private shopsService: CredentialShopService,
    private activeSessionService: ActiveSessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shops$ = this.shopsService.getAllShops()

  }

  getStars(shop: Shop) {
    let rating = "";
    for (let i = 0; i < Math.ceil(shop.rating); i++) {
      rating = rating.concat("⭐")
    }
    return rating;

  }

  goToShop(shop: Shop) {
    this.router.navigateByUrl(`shop/${shop.id}`)
  }
}
