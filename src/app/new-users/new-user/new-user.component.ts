import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Credential } from '../../../models/credential.model';
import { CredentialsService } from '../../../services/credentials.service';
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ActiveSessionService} from "../../../services/active-session.service";

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

  masks = new Map([
    ["cep", "00000-000"],
    ["cpf", "000.000.000-00"],
    ["telefone", "(00) 00000-0000"]
  ]);

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

  getMask(field: string){
    return this.masks.get(field);
  }

  onSubmit() {
    let emptyArray: any[] = [];
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.credentialService
        .submit({
          name: this.nome?.value,
          surname: this.sobrenome?.value,
          email: this.email?.value,
          endereco: this.endereco?.value,
          cep: this.cep?.value,
          cpf: this.cpf?.value,
          telefone: this.telefone?.value,
          password: this.password?.value,
          type: "CUSTOMER",
          complemento: this.complemento,
          paymentCards: emptyArray,
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

