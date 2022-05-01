import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
import {ActiveSessionService} from "../../../services/active-session.service";
import {EmptyShoppingCartDialogComponent} from "../empty-shopping-cart-dialog/empty-shopping-cart-dialog.component";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {Shop} from "../../../models/shop.model";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.scss']
})
export class ShopSearchComponent implements OnInit {
  search_products: Product[] = [];
  private searchTerms = "";


  @Input() shopId!: number;
  @Input() currentShop!: Shop;
  @Input() dialog!: MatDialog;

  constructor(
    private productService: ProductService,
    private activeSession: ActiveSessionService,
    private shopService: CredentialShopService,
  ) {
  }

  ngOnInit(): void {
  }

  search(term: string): void {
    this.searchTerms = term;
  }

  getSearchProducts(){
    this.search_products = [];
    if(this.currentShop.products.length > 0){
      this.currentShop.products.forEach((product) => {
        if(this.searchTerms !== '' && product.name.toLocaleLowerCase().includes(this.searchTerms.toLocaleLowerCase())){
          this.search_products.push(product);
        }
      })
    }
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
