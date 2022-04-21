import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/models/shop.model';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { ActiveSessionService } from 'src/services/active-session.service';

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.scss']
})
export class ListShopsComponent implements OnInit {
  shops: Shop[] = [];
  
  constructor(
    private shopsService: CredentialShopService,
    private activeSessionService: ActiveSessionService,
  ) { }

  ngOnInit(): void {
    this.shopsService.getAllShops().subscribe(shops => this.shops = shops);
  }

  actionShopService(shop: Shop): void {
    this.activeSessionService.sessionShop = shop;
  }

  getStars(shop: Shop) {
    let rating = "";
    for (let i = 0; i < Math.ceil(shop.rating); i++) {
      rating = rating.concat("⭐")
    }
    return rating;

  }

}
