import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/models/product.model';
import { Shop } from 'src/models/shop.model';
import { ActiveSessionService } from 'src/services/active-session.service';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { ProductService } from 'src/services/product.service';
import { CompareProductDialogComponent } from '../compare-product-dialog/compare-product-dialog.component';
import { EmptyShoppingCartDialogComponent } from '../shop/empty-shopping-cart-dialog/empty-shopping-cart-dialog.component';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {
  search_products = new Map();
  searchTerms: string = "";
  @Output() search_bool = new EventEmitter<boolean>();

  constructor(
    private activeSessionService: ActiveSessionService,
    public dialog: MatDialog,
    private shopsService: CredentialShopService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  search(term: string): void {
    this.searchTerms = term;
  }

  getSearchProducts(){
    this.search_products.clear();
    this.shopsService.getAllShops().subscribe((shops) => {
      shops.forEach((shop) => {
        if(shop.products != undefined && shop.products.length > 0){
          shop.products.forEach((product) => {
            if(this.searchTerms !== '' && product.name.toLocaleLowerCase().includes(this.searchTerms.toLocaleLowerCase())){
              if(this.search_products.has(shop)){
                this.search_products.get(shop).push(product);
              }else{
                this.search_products.set(shop,[product])
              }
            }
          })
        }
      })
    })
    this.search_bool.emit(this.searchTerms.length > 0)
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


  getStyle(product: Product): string{
    if(product.price_discount == undefined || product.price_discount > product.price){
      return "price";
    }else{
      return "discount";
    }
  }

  compareProduct(product: Product): void {
    const dialogRef = this.dialog.open(CompareProductDialogComponent, {
      width: '450px',
      data: product
    });
  }



}
