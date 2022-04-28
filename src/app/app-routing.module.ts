import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {NewUserComponent} from "./new-users/new-user/new-user.component";
import {NewShopComponent} from "./profiles/new-shop/new-shop.component";
import { CarrinhoComponent } from './shop/carrinho/carrinho.component';
import {MyOrdersComponent} from "./orders/my-orders/my-orders.component";
import {OrderTrackingComponent} from "./orders/order-tracking/order-tracking.component";
import {NewCourierComponent} from "./profiles/new-courier/new-courier.component";
import {NewProductComponent} from "./new-users/new-product/new-product.component";
import {PendingOrdersComponent} from "./orders/pending-orders/pending-orders.component";
import {ProfileComponent} from "./profiles/profile/profile.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'new-shop', component: NewShopComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'detail/:id', component: OrderTrackingComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'courier', component: NewCourierComponent},
  {path: 'produtos', component: NewProductComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
