import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../services/credentials.service';
import {Router} from '@angular/router';
import { Credential } from '../../models/credential.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActiveSessionService } from '../../services/active-session.service';
import {Location} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { CredentialShopService } from 'src/services/credential-shop.service';
import { Shop } from 'src/models/shop.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  hide = true;

  constructor(
    private credentialService: CredentialsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activeSession: ActiveSessionService,
    public dialog: MatDialog,
    private credentialShopService: CredentialShopService,
  ) {}

  logMeIn() {
    var credentialsObserver: Observable<Credential[]>;
    credentialsObserver = this.credentialService.searchCredentials(this.email);
    credentialsObserver.subscribe(
      (data: Credential[]) => {
        if ((data[0] != undefined) && (data[0].password == this.password)) {
          this.activeSession.credential = data.pop();
          this.router.navigateByUrl('home');
        } else {
          this._snackBar.open('Informações incorretas', 'Fechar');
        }
      },
      (error) => console.log(error)
      //  Servidor offline
    );
  }

  cadastrarNovoUsuario() {
    this.router.navigateByUrl('newUser');
  }

  ngOnInit(): void {

    if (this.activeSession.succesfulSignup){
      this._snackBar.open("Cadastro realizado com sucesso", "Fechar");
    }

  }
}
