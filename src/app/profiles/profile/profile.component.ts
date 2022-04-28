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
  }

  goBack() {
    return this.location.back();
  }
}
