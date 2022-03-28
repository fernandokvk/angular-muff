import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  hide = true;
  nome: string = '';
  sobrenome: string = '';
  password: string = '';
  confirmedPassword: string = '';
  email: string = '';
  endereco: string = '';
  cep: string = '';
  cpf: string = '';
  telefone: string = '';
  isChecked: boolean = false;

  novoUsuario: object = {};
  usuarioForm: FormGroup = new FormGroup({
    nome: new FormControl(this.nome, [Validators.required]),
    asobrenome: new FormControl(this.sobrenome, [Validators.required]),
    email: new FormControl(this.email, [Validators.required, Validators.email,]),
    endereco: new FormControl(this.endereco, [Validators.required]),
    cep: new FormControl(this.cep, [Validators.required, Validators.min(8)]),
    cpf: new FormControl(this.cpf, [Validators.required]),
    telefone: new FormControl(this.telefone, [Validators.required]),
    senha: new FormControl(this.password, [Validators.required]),
    checkbox: new FormControl('', Validators.requiredTrue),
  });

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  cadastrar() {
    if (!(this.password === this.confirmedPassword)) {
      this._snackBar.open('As senhas nao são iguais', 'Fechar');
    }
    if (
      this.isChecked &&
      this.usuarioForm.errors == null &&
      this.password === this.confirmedPassword
    ) {
      this.novoUsuario = {
        email: this.email,
        login: this.nome,
        password: this.password,
        name: this.nome,
        surname: this.sobrenome,
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
