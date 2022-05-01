import {Component, OnInit} from '@angular/core';
import {ActiveSessionService} from '../../services/active-session.service';
import {Router} from '@angular/router';
import {Product} from 'src/models/product.model';
import {TemplateRef} from "@angular/core";
import { CompareProductDialogComponent } from '../compare-product-dialog/compare-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { Shop } from 'src/models/shop.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  profileType: any = "CUSTOMER";
  products: any = [];

  constructor(
    private activeSessionService: ActiveSessionService,
    private router: Router,
    public dialog: MatDialog,
    private shopsService: CredentialShopService,
  ) {
  }


  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;
    this.shopsService.getAllShops().subscribe(shops => {
      shops.forEach(shop => {
        if(shop.products != undefined && shop.products.length > 0){
          shop.products.forEach(product => {
            if(product.price_discount != undefined && product.price_discount < product.price){
              this.products.push([
                product,
                shop.id
              ])
            }
          });
        }
      });
    });
    // Object.keys(this.activeSessionService).forEach((t) => {
    //   console.log(t);
    // });

    /*    if (this.activeSession.credential == undefined){
      this.router.navigateByUrl('login');
    }*/
    console.log(this.products)
  }

  compareProduct(product: Product): void {
    const dialogRef = this.dialog.open(CompareProductDialogComponent, {
      width: '450px',
      data: product
    });
  }

  addCart(shopId: number, product: Product){
    if(this.activeSessionService.sessionProducts.length > 0 && this.activeSessionService.sessionShop?.id != shopId){
      console.log("Esvazie o carrinho")
    }else{
      this.shopsService.getShopById(shopId).subscribe((shop) => {
        this.activeSessionService.sessionShop = shop;
      });
      let index_product_cart = this.activeSessionService.sessionProducts.findIndex(p => p.name == product.name)
      console.log(index_product_cart)
      if(index_product_cart < 0){
        product.quantity = 1;
        this.activeSessionService.sessionProducts.push(product);
      }else{
        this.activeSessionService.sessionProducts[index_product_cart].quantity += 1;
      }


    }

  }

  exit() {
    this.router.navigateByUrl('login');

  }
}
