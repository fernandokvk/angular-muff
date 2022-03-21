import {Component, Injectable, OnInit} from '@angular/core';
import {CredentialsService} from "../../services/credentials.service";
import {Router} from "@angular/router";
import {Credential} from "../../models/credential.model";
import {map, Observable, Observer, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: string = "";
  password: string = "";
  hide = true;

  constructor(private credentialService: CredentialsService, private router: Router, private _snackBar: MatSnackBar) {
  }

  logMeIn() {
    var credentialsObserver: Observable<Credential[]>;

    credentialsObserver = this.credentialService.searchCredentials(this.login);
    credentialsObserver.subscribe(
      (data: Credential[]) => {
        if (data.pop()?.password == this.password){
          this.router.navigateByUrl('home');
        } else {
          this._snackBar.open("Informações incorretas", "Fechar");
        }
      }, (error) => console.log(error)
    //  Servidor offline
    )
  }

  cadastrarNovoUsuario() {
    this.router.navigateByUrl('newUser')
  }

  ngOnInit(): void {
  }
}