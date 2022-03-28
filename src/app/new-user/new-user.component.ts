import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  hide = true;
  nome = new FormControl('', [Validators.required]);
  sobrenome = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  endereco = new FormControl('', [Validators.required]);
  cep = new FormControl('', [Validators.required, Validators.min(8)]);
  cpf = new FormControl('', [Validators.required]);
  telefone = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmedPassword = new FormControl('', [Validators.required]);
  checkbox = new FormControl('', Validators.requiredTrue);

  novoUsuario: object = {};
  usuarioForm!: FormGroup;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  /** A hero's name can't match the given regular expression */
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordMatch = false;
      if (this.password.value == this.confirmedPassword.value)
        passwordMatch = true;
      return !passwordMatch ? { passwordValidator: true } : null;
    };
  }

  cadastrar() {
    if (!(this.password.value === this.confirmedPassword.value)) {
      this._snackBar.open('As senhas nao são iguais', 'Fechar');
    } else if (
      !(
        this.nome.errors != null &&
        this.password.errors != null &&
        this.email.errors != null &&
        this.cpf.errors != null &&
        this.confirmedPassword.errors != null &&
        this.checkbox.errors != null &&
        this.sobrenome.errors != null &&
        this.cep.errors != null &&
        this.endereco.errors != null &&
        this.telefone.errors != null
      )
    ) {
      this.novoUsuario = {
        email: this.email.value,
        login: this.nome.value,
        password: this.password.value,
        name: this.nome.value,
        surname: this.sobrenome.value,
      };

      this.http
        .post('http://localhost:3000/credentials', this.novoUsuario)
        .subscribe(
          (val) => {
            console.log('Valor de retorno', val);
          },
          (response) => {
            console.log('Erro no Cadastro', response);
          },
          () => {
            console.log('Usuário cadastrado com sucesso');
          }
        );
    }
  }
}

