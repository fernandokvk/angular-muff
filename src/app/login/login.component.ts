import {Component, Injectable, OnInit} from '@angular/core';
import {CredentialsService} from "../../services/credentials.service";
import {Router} from "@angular/router";
import {Credential} from "../../models/credential.model";
import {map, Observable, Observer, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: string = "";
  password: string = "";
  session: Credential[] | undefined;



  constructor(private credentialService: CredentialsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logMeIn() {
    var credentialsObserver: Observable<Credential[]>;

    credentialsObserver = this.credentialService.searchCredentials(this.login);
    credentialsObserver.subscribe(
      (data: Credential[]) => {
        if (data.pop()?.password == this.password){
          this.router.navigateByUrl('home');
        } else {
          this.incorrectPassword();
        }
      }, (error) => console.log(error)
    //  Servidor offline
    )
  }

  incorrectPassword(){
    console.log("incorrect password");
  //  mostrar card
  }
  cadastrarNovoUsuario() {

    this.router.navigateByUrl('newUser')
  }
}
