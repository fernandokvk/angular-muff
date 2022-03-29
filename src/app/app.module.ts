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
import { registerLocaleData } from '@angular/common';
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
import { BaseTemplateComponent } from './base-template/base-template.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {IvyCarouselModule} from "angular-responsive-carousel";
import {ActiveSessionService} from "../services/active-session.service";



registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    BaseTemplateComponent,
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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
