import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Shop} from "../../../models/shop.model";
import { Order } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';
import { ActiveSessionService } from '../../../services/active-session.service';
import {CredentialShopService} from "../../../services/credential-shop.service";
import {Location} from "@angular/common";
import {ReportService} from "../../../services/report.service";
import {map, Observable} from "rxjs";

export interface Produto{
  nome: string;
  quantidade: number;
  valor: number;
}

class Produto2 {
  nome!: string;
  quantidade!: number;
  valor!: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  shop!: Shop;
  profileType: any = "CUSTOMER";
  orders!: Order[];
  tabela: Produto2[] = [{nome:"",quantidade:0,valor:0}];
  displayedColumns: string[] = ['nome', 'quantidade', 'valor'];


  constructor(
    private router: Router,
    private credentialShopService: CredentialShopService,
    private activeSessionService: ActiveSessionService,
    private reportService: ReportService,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;

    // @ts-ignore
    // this.activeSessionService.credential = {id: 15, shopId: 1, type: "SHOP"};


    if(this.activeSessionService.credential?.shopId != null){
      this.fetchOrders();
      this.getShop();
      this.reportService.getShop().subscribe((x:Shop)=> {
        this.constructTable();
      });


    }



  }

  getStars(shop: Shop) {
    let rating = "";
    for (let i = 0; i < Math.ceil(shop.rating); i++) {
      rating = rating.concat("⭐")
    }
    return rating;

  }
  getShop(){
    this.credentialShopService.getShopById(this.activeSessionService.credential?.shopId!).subscribe((y:Shop)=> {
      this.shop = y;
    })
  }

  fetchOrders(){
      this.reportService.fetchOrders().subscribe((x:Order[])=> {
        this.orders = x;
        console.log(this.orders);
      });


  }

  constructTable(){
    for (let i = 0; i < this.reportService.session?.products.length!; i++) {
      let x:Produto2 = new Produto2;
      x.nome = this.reportService.session?.products[i].name!;
      x.quantidade = 0;
      x.valor=0;
      for (let j = 0; j < this.orders.length; j++) {
        for (let k = 0; k < this.orders[j].products.length; k++) {
          if(this.reportService.session!.products[i].id == this.orders[j].products[k].id){
            x.quantidade += this.orders[j].products[k].quantity;
            x.valor += this.orders[j].products[k].price * this.orders[j].products[k].quantity;
          }
        }

      }
      this.tabela[i] = x;
    }
    console.log(this.tabela);
  }

  goBack() {
    return this.location.back();

  }
}
