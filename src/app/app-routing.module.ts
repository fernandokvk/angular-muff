import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {BaseTemplateComponent} from "./base-template/base-template.component";
import {NewShopComponent} from "./new-shop/new-shop.component";
import { CarrinhoComponent } from './carrinho/carrinho.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'base', component: BaseTemplateComponent},
  {path: 'new-shop', component: NewShopComponent},
  {path: 'carrinho', component: CarrinhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
