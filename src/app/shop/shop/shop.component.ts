import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Shop} from "../../../models/shop.model";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  profileType: any = "CUSTOMER";
  currentShop?: Shop;


  constructor(
    private activeSession: ActiveSessionService,
    private location: Location,
    private shopService: CredentialShopService,
    private activatedRoute: ActivatedRoute
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
    });
  }

  goBack() {
    return this.location.back();
  }


}
