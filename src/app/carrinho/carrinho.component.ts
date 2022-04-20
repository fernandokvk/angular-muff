import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';
import { Shop } from 'src/models/shop.model';
import { ActiveSessionService } from 'src/services/active-session.service';  
import { CredentialCarrinhoService } from 'src/services/credential-carrinho.service';
import { CredentialShopService } from 'src/services/credential-shop.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  taxa_entrega = 50;
  endereco = "";
  displayedColumns = ['image','name', 'quantity', 'price'];
  shop: Shop | undefined;
  temShop: boolean = false;
  shops: Shop[] = [];

  carrinho = this.activeSessionService.sessionProducts;

  constructor(
    private activeSessionService: ActiveSessionService,
    private credentialCarrinhoService: CredentialCarrinhoService,
    
    ) {    
    }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return (this.taxa_entrega + this.carrinho.map(t => (t.price * t.quantity)).reduce((acc, value) => acc + value, 0)); 
  }

  ngOnInit(): void {
    if(this.activeSessionService.credential != null) {
      this.endereco = this.activeSessionService.credential.endereco;
    }
    this.shop = this.activeSessionService.sessionShop; 
    if(this.shop == null) {
      this.temShop = false;
    }else{
      this.temShop = true;
    }
  }

  onSubmit() {
    if(this.carrinho.length > 0){
      var dataCompra = new Date();
      this.credentialCarrinhoService
      .submit({
        products: this.carrinho,
        customerId: this.activeSessionService.credential?.id,
        shopId: this.shop?.id,
        orderDate: dataCompra,
        orderArrival: new Date(new Date(dataCompra).getTime() + 1000) // orderDate + x <segundos/minutos>
      } as Order)
      .subscribe();
  
      this.carrinho = []
    }

  }

}
