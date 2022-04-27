import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import {DatePipe, registerLocaleData} from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//-----
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {IvyCarouselModule} from "angular-responsive-carousel";
import {ActiveSessionService} from "../services/active-session.service";
import { NewShopComponent } from './new-shop/new-shop.component';
import { NewProductComponent } from './new-product/new-product.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatRadioModule} from '@angular/material/radio';
import { ShopSelectedDialogComponent } from './list-shops/shop-selected-dialog/shop-selected-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ListShopsComponent } from './list-shops/list-shops.component'
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { NewCourierComponent } from './new-courier/new-courier.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ImageUploadComponent } from './image-upload/image-upload.component';



registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    NewShopComponent,
    NewProductComponent,
    CarrinhoComponent,
    ShopSelectedDialogComponent,
    ListShopsComponent,
    MyOrdersComponent,
    OrderTrackingComponent,
    NewCourierComponent,
    ImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    IvyCarouselModule,
    ScrollingModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressBarModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
