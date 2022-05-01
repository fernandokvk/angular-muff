import { Component, OnInit } from '@angular/core';
import {ActiveSessionService} from "../../../services/active-session.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileType: any = "CUSTOMER";

  constructor(
    private activeSession: ActiveSessionService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSession.credential?.type;


    // @ts-ignore
    // this.activeSession.credential = {id: 15, courierId: 1, type: "COURIER"};
    // this.activeSession.credential = {id: 1, type: "CUSTOMER"};
    // this.activeSession.credential = {id: 15, shopId: 1, type: "SHOP"};
  }

  goBack() {
    return this.location.back();
  }
}
