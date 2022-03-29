import { Component, OnInit } from '@angular/core';
import { ActiveSessionService } from '../../services/active-session.service';
import { Router } from '@angular/router';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import {TemplateRef} from "@angular/core";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html' ,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countries: any;
  constructor(
    private activeSession: ActiveSessionService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    Object.keys(this.activeSession).forEach((t) => {
      console.log(t);
    });



    /*    if (this.activeSession.credential == undefined){
      this.router.navigateByUrl('login');
    }*/
  }
}
