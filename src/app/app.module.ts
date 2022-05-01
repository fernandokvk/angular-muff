import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {HomeComponent} from './home/home.component';
import {DatePipe, registerLocaleData} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//-----
import localePt from '@angular/common/locales/pt';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewUserComponent} from './new-users/new-user/new-user.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {IvyCarouselModule} from "angular-responsive-carousel";
import {ActiveSessionService} from "../services/active-session.service";
import {NewShopComponent} from './profiles/new-shop/new-shop.component';
import {NewProductComponent} from './new-users/new-product/new-product.component';
import {CarrinhoComponent} from './shop/carrinho/carrinho.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {ListShopsComponent} from './list-shops/list-shops.component'
import {MyOrdersComponent} from './orders/my-orders/my-orders.component';
import {OrderTrackingComponent} from './orders/order-tracking/order-tracking.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NewCourierComponent} from './profiles/new-courier/new-courier.component';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {RateShopComponent} from './shop/rate-shop/rate-shop.component';
import {CartaoSelectedDialogComponent} from './shop/cartao-selected-dialog/cartao-selected-dialog.component';
import {NewCardDialogComponent} from './new-users/new-card-dialog/new-card-dialog.component';
import {PendingOrdersComponent} from './orders/pending-orders/pending-orders.component';
import {SelectCourierDialogComponent} from './orders/select-courier-dialog/select-courier-dialog.component';
import {ConfirmCancelDialogComponent} from './orders/confirm-cancel-dialog/confirm-cancel-dialog.component';
import {PendingOrdersCourierComponent} from './orders/pending-orders-courier/pending-orders-courier.component';
import {ProfileComponent} from './profiles/profile/profile.component';
import {CustomerProfileComponent} from './profiles/customer-profile/customer-profile.component';
import {CompareProductDialogComponent} from './compare-product-dialog/compare-product-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatBadgeModule} from "@angular/material/badge";
import {PendingOrdersCustomerComponent} from './orders/pending-orders-customer/pending-orders-customer.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTimepickerModule} from "mat-timepicker";
import { SearchHomeComponent } from './search-home/search-home.component';
import {ShopComponent} from './shop/shop/shop.component';
import {ReportComponent} from './profiles/report/report.component';
import {ShopSearchComponent} from './shop/shop-search/shop-search.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {EmptyShoppingCartDialogComponent} from './shop/empty-shopping-cart-dialog/empty-shopping-cart-dialog.component';
import { CartDetailDialogComponent } from './shop/cart-detail-dialog/cart-detail-dialog.component';
import { NgxMaskModule } from 'ngx-mask';

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
    ListShopsComponent,
    MyOrdersComponent,
    OrderTrackingComponent,
    NewCourierComponent,
    ImageUploadComponent,
    CartaoSelectedDialogComponent,
    NewCardDialogComponent,
    RateShopComponent,
    PendingOrdersComponent,
    SelectCourierDialogComponent,
    ConfirmCancelDialogComponent,
    PendingOrdersCourierComponent,
    ProfileComponent,
    CustomerProfileComponent,
    CompareProductDialogComponent,
    PendingOrdersCustomerComponent,
    ShopComponent,
    ReportComponent,
    ShopSearchComponent,
    SearchHomeComponent,
    EmptyShoppingCartDialogComponent,
    CartDetailDialogComponent,
    

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
    MatTooltipModule,
    MatTabsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
