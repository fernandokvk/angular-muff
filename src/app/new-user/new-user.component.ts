import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Credential } from '../../models/credential.model';
import { CredentialsService } from '../../services/credentials.service';
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ActiveSessionService} from "../../services/active-session.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  newUserForm!: FormGroup;
  hide = true;
  credential!: Credential;
  complemento: String = '';

  constructor(
    private fb: FormBuilder,
    private credentialService: CredentialsService,
    private router: Router,
    private activeSessionService: ActiveSessionService
  ) {}

  ngOnInit(): void {
    const fb = this.fb;
    this.newUserForm = fb.group({
      nome: fb.control('', [Validators.required]),
      sobrenome: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.required, Validators.email]),
      endereco: fb.control('', [Validators.required]),
      cep: fb.control('', [Validators.required, Validators.min(8)]),
      cpf: fb.control('', [Validators.required]),
      telefone: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
      confirmedPassword: fb.control('', [Validators.required]),
      checkbox: fb.control('', Validators.requiredTrue),
    });
  }

  onSubmit() {
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.credentialService
        .submit({
          email: this.email?.value,
          name: this.nome?.value,
          surname: this.sobrenome?.value,
          cpf: this.cpf?.value,
          endereco: this.endereco?.value,
          cep: this.cep?.value,
          complemento: this.complemento.toString(),
          password: this.password?.value,
        } as Credential)
        .subscribe(
          (t) => console.log(t.email),
          (error) => console.log(error)
        );
      this.activeSessionService.succesfulSignup = true;
      this.router.navigateByUrl('login');


    }
  }


  canSubmit(): boolean {
    let canSubmit = true;
    Object.keys(this.newUserForm.controls).forEach((key) => {
      if (this.newUserForm.get(key)?.errors != null) {
        canSubmit = false;
      }
    });
    return canSubmit;
  }

  getFormValidationErrors() {
    Object.keys(this.newUserForm.controls).forEach((k) => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.newUserForm.get(k)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'formControl: ' + k + ' , error: ' + keyError + ', value:',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  get nome() {
    return this.newUserForm.get('nome');
  }

  get sobrenome() {
    return this.newUserForm.get('sobrenome');
  }

  get email() {
    return this.newUserForm.get('email');
  }

  get endereco() {
    return this.newUserForm.get('endereco');
  }

  get cep() {
    return this.newUserForm.get('cep');
  }

  get cpf() {
    return this.newUserForm.get('cpf');
  }

  get telefone() {
    return this.newUserForm.get('telefone');
  }

  get password() {
    return this.newUserForm.get('password');
  }

  get confirmedPassword() {
    return this.newUserForm.get('confirmedPassword');
  }

  get checkbox() {
    return this.newUserForm.get('checkbox');
  }
}

