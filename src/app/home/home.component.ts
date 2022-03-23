import { Component, OnInit } from '@angular/core';
import {ActiveSessionService} from "../active-session.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private activeSession: ActiveSessionService,
              private router: RouterLink) { }

  ngOnInit(): void {

    if (this.activeSession.credential == undefined){

    }

  }

}
