import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/models/product.model';
import { Shop } from 'src/models/shop.model';
import { ActiveSessionService } from 'src/services/active-session.service';
import { CredentialShopService } from 'src/services/credential-shop.service';

@Component({
  selector: 'app-compare-product-dialog',
  templateUrl: './compare-product-dialog.component.html',
  styleUrls: ['./compare-product-dialog.component.scss']
})
export class CompareProductDialogComponent implements OnInit {
  displayedColumns = ['shop', 'price'];
  shops: Shop[] = [];
  shop: Shop | undefined;

  constructor(
    public dialogRef: MatDialogRef<CompareProductDialogComponent>,
    private shopsService: CredentialShopService,
    private activeSessionService: ActiveSessionService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    this.shop = this.activeSessionService.sessionShop;
    console.log(this.shop)
    this.shopsService.getAllShops().subscribe(shops => {
      shops.forEach(shop => {
        if(shop.products != undefined) {
          shop.products.forEach(product => {
            if(product.name === this.data.name){
              this.shops.push(shop)
            }
          })
        }   
      })
    });
  }

  getProductValue(shop: Shop): number{
    var price: number = 0;
    if(shop.products != undefined){
      shop.products.forEach(product => {
        if(product.name === this.data.name){
          price = product.price;
        }
      });
    }
    return price;

  }

  close_dialog(): void {
    this.dialogRef.close();
  }

  getStars(shop: Shop) {
    if(shop != null){
      let rating = "";
      for (let i = 0; i < Math.ceil(shop.rating); i++) {
        rating = rating.concat("⭐")
      }
      return rating;
    }else return 0;

  }

}
