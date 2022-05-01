import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/models/order.model';
import { Shop } from 'src/models/shop.model';
import { ActiveSessionService } from 'src/services/active-session.service';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { OrdersService } from 'src/services/orders.service';

@Component({
  selector: 'app-rate-shop',
  templateUrl: './rate-shop.component.html',
  styleUrls: ['./rate-shop.component.scss']
})
export class RateShopComponent implements OnInit {
  shop: Shop | undefined;
  order: Order | undefined;

  newCommentForm!: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  stars_estabelecimento: number = 5;
  stars_entrega: number = 5;
  stars_produtos: number = 5;
  stars_media: number = 0;

  constructor(
    private activeSessionService: ActiveSessionService,
    private credentialShopService: CredentialShopService,
    private Activatedroute:ActivatedRoute,
    private orderService: OrdersService,
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getOrder();
    const fb = this.fb;
    this.newCommentForm = fb.group({
      comment: ''
    });
    
  }

  can_rateShop(order: Order){
    return !order.rated && order.customerId == this.activeSessionService.credential?.id;
  }

  getOrder(){
    this.Activatedroute.paramMap.subscribe(params => {
      this.orderService.getOrder(Number(params.get('id'))).subscribe((order) => {
        //if(can_rateShop(order)){        
          this.order = order;
          console.log(order.courier?.name)
          this.credentialShopService.getShopById(this.order.shopId).subscribe((shop) => {
            this.shop = shop;
          });
        /*}else{
          console.log("Permissão negada, pedido não pertence ao usuário atual")
        }*/
      });
    });
  }

  countStar(star: number, type_avaliacao: string) {
    switch(type_avaliacao) {
      case 'produtos':
        this.stars_produtos = star;
        break;
      case 'entrega':
        this.stars_entrega = star;
        break;
      case 'estabelecimento':
        this.stars_estabelecimento = star;
        break;
    }

    this.stars_media = (this.stars_estabelecimento + this.stars_entrega + this.stars_produtos) / 3;
  }

  submit_rate(){
    if(this.shop != undefined && this.order != undefined){
      //let shop_rating = (this.shop.rating + this.stars_media) / 2;
      let shop_rating: number;
      this.order.rated = true;
      
      let new_comments: string[] = [];

      if(this.shop.comments == undefined){
        console.log('não existe nenhum comentario')
        shop_rating = this.stars_media;
        new_comments.push(this.comment?.value);
      }else{
        console.log('existe comentario')
        shop_rating = (this.shop.rating + this.stars_media) / (this.shop.comments.length + 1);
        new_comments = this.shop.comments;
        new_comments.push(this.comment?.value);
      }
      this.shop.rating = shop_rating;
      this.shop.comments = new_comments;
  
      this.credentialShopService.updateShop(this.shop).subscribe();
      this.orderService.updateOrder(this.order).subscribe();
      this.router.navigateByUrl('my-orders');
      console.log(this.comment?.value)
    }else{
      console.log("Shop ou Order definido como valor undefined")
    }
  }

  get comment() {
    return this.newCommentForm.get('comment');
  }
}
