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
import {ConfirmCancelDialogComponent} from "../../orders/confirm-cancel-dialog/confirm-cancel-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmptyShoppingCartDialogComponent} from "../../empty-shopping-cart-dialog/empty-shopping-cart-dialog.component";

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
    private productService: ProductService,
    private dialog: MatDialog
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

  removeFromCart(product: Product) {
    console.log("removeFromCart")
    if (this.activeSession.sessionProducts.includes(product)) {
      console.log("removeFromCart 1")

      let index = this.activeSession.sessionProducts.findIndex(p => p.id == product.id)
      if (this.activeSession.sessionProducts[index].quantity > 1) {
        console.log("removeFromCart 2")

        this.activeSession.sessionProducts[index].quantity -= 1;
      } else {
        console.log("delete")
        this.activeSession.sessionProducts[index].quantity -= 1;
        delete this.activeSession.sessionProducts[index];
      }
    }
    console.log(this.activeSession.sessionProducts)

  }

  addToCart(product: Product) {
    let willPush: boolean = false;
    if (this.activeSession.sessionProducts.length > 0 && this.activeSession.sessionShop?.id != this.currentShop?.id) {
      //Itens no carrinho de outro shop
      willPush = true;
      this.emptyShoppingCart(product);
      this.shopService.getShopById(this.currentShop!.id).subscribe(shop => this.activeSession.sessionShop = shop);
    } else {
      this.shopService.getShopById(this.currentShop!.id).subscribe(shop => this.activeSession.sessionShop = shop);
    }

    if (this.activeSession.sessionProducts.includes(product)) {
      let index = this.activeSession.sessionProducts.findIndex(p => p.id == product.id)
      this.activeSession.sessionProducts[index].quantity += 1;
    } else {
      if (!willPush){
        this.activeSession.sessionProducts.push(product);
        let index = this.activeSession.sessionProducts.findIndex(p => p.id == product.id)
        this.activeSession.sessionProducts[index].quantity = 1;
      }
    }
    console.log(this.activeSession.sessionProducts)
  }

  private emptyShoppingCart(product: Product): void {
    const dialogRef = this.dialog.open(EmptyShoppingCartDialogComponent, {
      width: '350px',
    });
    dialogRef.backdropClick().subscribe(v => {
      dialogRef.close(false);
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.activeSession.sessionProducts = [];
        this.activeSession.sessionProducts.push(product);
        this.activeSession.sessionProducts[0].quantity = 1;
      }
    });
  }

}
