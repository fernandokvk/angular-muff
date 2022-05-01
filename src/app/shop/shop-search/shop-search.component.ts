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
  products$?: Observable<Product[]>
  private searchTerms = new Subject<string>();


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
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.searchProducts(this.shopId, term))
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  removeFromCart(product: Product) {
    // console.log("Removing: "+product.id)
    if (this.activeSession.sessionProducts.includes(product)) {
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
      if (!willPush) {
        this.activeSession.sessionProducts.push(product);
        let index = this.activeSession.sessionProducts.findIndex(p => p.id == product.id)
        this.activeSession.sessionProducts[index].quantity = 1;
      }
    }
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
