import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {NewShopComponent} from "./new-shop/new-shop.component";
import {MyOrdersComponent} from "./my-orders/my-orders.component";
import {OrderTrackingComponent} from "./order-tracking/order-tracking.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'new-shop', component: NewShopComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'detail/:id', component: OrderTrackingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
