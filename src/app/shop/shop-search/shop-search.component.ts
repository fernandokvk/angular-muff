import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.scss']
})
export class ShopSearchComponent implements OnInit {
  products$?: Observable<Product[]>
  private searchTerms = new Subject<string>();

  @Input() shopId!: number;

  constructor(
    private productService: ProductService
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
}
