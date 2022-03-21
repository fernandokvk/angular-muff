import {Component, OnInit} from '@angular/core';
import {CredentialsService} from "../../services/credentials.service";
import {Router} from "@angular/router";
import {Credential} from "../../models/credential.model";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: string = "";
  password: string = "";
  session: Credential | undefined;



  constructor(private credentialService: CredentialsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logMeIn() {
    var teste;
    teste = this.credentialService.searchCredentials(this.login).subscribe(_ => _.password);

    console.log(teste);


  }

  cadastrarNovoUsuario() {

    this.router.navigateByUrl('newUser')
  }
}
