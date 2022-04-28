import {Component, OnInit} from '@angular/core';
import {ActiveSessionService} from '../../services/active-session.service';
import {Router} from '@angular/router';
import {Product} from 'src/models/product.model';
import {TemplateRef} from "@angular/core";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  profileType: any = "CUSTOMER";

  constructor(
    private activeSessionService: ActiveSessionService,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;

    // Object.keys(this.activeSessionService).forEach((t) => {
    //   console.log(t);
    // });

    /*    if (this.activeSession.credential == undefined){
      this.router.navigateByUrl('login');
    }*/
  }

  addProduct(): void {
    this.activeSessionService.sessionProducts?.push({name: "Carne", quantity: 5, price: 12} as Product);

  }

  exit() {
    this.router.navigateByUrl('login');

  }
}
