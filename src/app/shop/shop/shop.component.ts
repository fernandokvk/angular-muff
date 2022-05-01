import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Shop} from "../../../models/shop.model";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../../services/orders.service";
import {Product} from "../../../models/product.model";
import {Observable, of} from "rxjs";
import {ProductService} from "../../../services/product.service";
import {ConfirmCancelDialogComponent} from "../../orders/confirm-cancel-dialog/confirm-cancel-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmptyShoppingCartDialogComponent} from "../empty-shopping-cart-dialog/empty-shopping-cart-dialog.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  profileType: any = "CUSTOMER";
  currentShop?: Shop;
  products$!: Observable<Product[]>;
  bestSellingProducts!: Product[];
  onSaleProducts?: Product[] = [];
  categoryProductsMap = new Map<string, Product[]>(); // (Categoria, Produto[]);


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

      if (shop.products.filter(product => product.price_discount).length > 0) {
        this.onSaleProducts = (shop.products.filter(product => product.price_discount))     //Arrumar
      }

      this.bestSellingProducts = shop.products.sort((a, b) => {
        if (a.sold_units > b.sold_units) return 1;
        if (a.sold_units < b.sold_units) return -1;
        return 0;
      }).slice(0, 9)

      shop.products.forEach(product => {

          if (this.categoryProductsMap.has(product.category)) {
            this.categoryProductsMap.get(product.category)!.push(product)
          } else {
            this.categoryProductsMap.set(product.category, [product]);
          }
        }
      )
      console.log(this.categoryProductsMap)

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
    // console.log("Removing: "+product.id)
    if (this.activeSession.sessionProducts.findIndex(p => p.name === product.name) >= 0) {
      let index = this.activeSession.sessionProducts.findIndex(p => p.id == product.id)
      // console.log("Cart has: "+product.name)

      if (this.activeSession.sessionProducts[index].quantity > 1) {
        // console.log("Quantity of "+product.name+" is > 1: "+ this.activeSession.sessionProducts[index].quantity)

        this.activeSession.sessionProducts[index].quantity--;
      } else {
        this.activeSession.sessionProducts = this.activeSession.sessionProducts.filter(p => p != product);
      }
    }
    // console.log(this.activeSession.sessionProducts)
  }

  addToCart(product: Product) {
    this.currentShop!.id
    if(this.activeSession.sessionShop?.id == this.currentShop!.id || this.activeSession.sessionShop == undefined){
      this.shopService.getShopById(this.currentShop!.id).subscribe((shop) => {
        this.activeSession.sessionShop = shop;
      });
      let index_product_cart = this.activeSession.sessionProducts.findIndex(p => p.id == product.id)
      if(index_product_cart < 0){
        product.quantity = 1;
        this.activeSession.sessionProducts.push(product);
      }else{
        console.log( this.activeSession.sessionProducts[index_product_cart].quantity)
        this.activeSession.updateCartProduct(index_product_cart);
      }
    }else{
      this.emptyShoppingCart(this.currentShop!.id, product);
      
    }
  }

  private emptyShoppingCart(shopId: number, product: Product): void {
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

        this.shopService.getShopById(shopId).subscribe((shop) => {
          this.activeSession.sessionShop = shop;
        });
      }
    });
  }

}
