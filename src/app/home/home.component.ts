import {Component, OnInit} from '@angular/core';
import {ActiveSessionService} from '../../services/active-session.service';
import {Router} from '@angular/router';
import {Product} from 'src/models/product.model';
import {TemplateRef} from "@angular/core";
import { CompareProductDialogComponent } from '../compare-product-dialog/compare-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { Shop } from 'src/models/shop.model';
import { ProductService } from 'src/services/product.service';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import { EmptyShoppingCartDialogComponent } from '../shop/empty-shopping-cart-dialog/empty-shopping-cart-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  profileType: any = "CUSTOMER";
  products_discount: any = [];
  view_home = true;


  constructor(
    private activeSessionService: ActiveSessionService,
    private router: Router,
    public dialog: MatDialog,
    private shopsService: CredentialShopService,
    private productService: ProductService,
  ) {
  }

  setViewHome(hasTerm: boolean) {
    this.view_home = !hasTerm;
  }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;
    this.getDiscountProducts()
    // Object.keys(this.activeSessionService).forEach((t) => {
    //   console.log(t);
    // });

    /*    if (this.activeSession.credential == undefined){
      this.router.navigateByUrl('login');
    }*/
  }

  getDiscountProducts(){
    this.shopsService.getAllShops().subscribe(shops => {
      shops.forEach(shop => {
        if(shop.products != undefined && shop.products.length > 0){
          shop.products.forEach(product => {
            if(product.price_discount != undefined && product.price_discount < product.price){
              this.products_discount.push([
                product,
                shop.id
              ])
            }
          });
        }
      });
    });
  }

  compareProduct(product: Product): void {
    const dialogRef = this.dialog.open(CompareProductDialogComponent, {
      width: '450px',
      data: product
    });
  }

  addCart(shopId: number, product: Product){
    if(this.activeSessionService.sessionShop?.id == shopId || this.activeSessionService.sessionShop == undefined){
      this.shopsService.getShopById(shopId).subscribe((shop) => {
        this.activeSessionService.sessionShop = shop;
      });  
      let index_product_cart = this.activeSessionService.sessionProducts.findIndex(p => p.id == product.id)
      if(index_product_cart < 0){
        product.quantity = 1;
        this.activeSessionService.sessionProducts.push(product);
      }else{
        console.log( this.activeSessionService.sessionProducts[index_product_cart].quantity)
        this.activeSessionService.updateCartProduct(index_product_cart);
      }
    }else{    
      this.emptyShoppingCart(shopId, product)
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
        this.activeSessionService.sessionProducts = [];
        this.activeSessionService.sessionProducts.push(product);
        this.activeSessionService.sessionProducts[0].quantity = 1;

        this.shopsService.getShopById(shopId).subscribe((shop) => {
          this.activeSessionService.sessionShop = shop;
        });
      }
    });
  }

  exit() {
    this.router.navigateByUrl('login');

  }
}
