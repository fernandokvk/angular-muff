import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../services/credentials.service';
import { Router } from '@angular/router';
import { Credential } from '../../models/credential.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActiveSessionService } from '../active-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: string = '';
  password: string = '';

  hide = true;

  constructor(
    private credentialService: CredentialsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activeSession: ActiveSessionService
  ) {}

  logMeIn() {
    var credentialsObserver: Observable<Credential[]>;

    credentialsObserver = this.credentialService.searchCredentials(this.login);
    credentialsObserver.subscribe(
      (data: Credential[]) => {
        if (data[0].password == this.password) {
          this.activeSession.credential = data.pop();
          this.activeSession.setInfo();
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

  ngOnInit(): void {}
}
