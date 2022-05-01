import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActiveSessionService} from "../../../services/active-session.service";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Credential} from "../../../models/credential.model";
import {Product} from "../../../models/product.model";
import {Payment} from "../../../models/payment.model";
import {CredentialsService} from "../../../services/credentials.service";
import {Shop} from "../../../models/shop.model";

import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  profileType: any = "CUSTOMER";
  profileEdit: boolean = false;
  paymentEdit: boolean = false;
  newEditForm!: FormGroup;
  hide = true;
  src_cardType: string = "";
  cardType: string = "";
  cardSelected: boolean = false;
  credential!: Credential;
  card!:Payment;


  constructor(
    private location: Location,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
    private fb: FormBuilder,

    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;
    if( this.activeSessionService.credential?.id != null){
      this.getCredential();
      if(this.profileEdit){
        const fb = this.fb;
        this.newEditForm = fb.group({
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
          complemento: fb.control('')
        });
      }
      else if(this.paymentEdit){

        const fb = this.fb;
        this.newEditForm = fb.group({
          cardNumber: fb.control('', [Validators.required]),
          nameOnCard: fb.control('', [Validators.required]),
          expDate: fb.control('', [Validators.required]),
          cvv: fb.control('', [Validators.required]),
          nickname: fb.control('', [Validators.required]),
          type: fb.control('', [Validators.required]),
        });
      }
    }

  }

  cardTypeString(card:Payment):string{
    switch (card.type) {
      case "CREDIT_CARD":{
        return "Crédito";
        break;
      }
      case "DEBIT_CARD":{
        return "Débito";
        break;
      }
    }

  }

  cardImageType(card:Payment):string{
    switch (card.cardType){
      case "MASTERCARD":{
        return "/assets/card_logo/mastercard_logo.png";
        break;
      }
      case "VISA":{
        return "/assets/card_logo/visa_logo.png";
        break;
      }
    }
  }

  canSubmit(): boolean {
    let canSubmit = true;
    Object.keys(this.newEditForm.controls).forEach((key) => {
      if (this.newEditForm.get(key)?.errors != null) {
        canSubmit = false;
      }
    });
    return canSubmit;
  }

  getFormValidationErrors() {
    Object.keys(this.newEditForm.controls).forEach((k) => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.newEditForm.get(k)?.errors;
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

  get_card_logo(): boolean {
    if(this.cardNumber?.value.length > 0){
      switch(this.cardNumber?.value[0]){
        case "5":
          this.src_cardType = "/assets/card_logo/mastercard_logo.png";
          this.cardType = "MASTERCARD";
          return true;
        case "4":
          this.src_cardType = "/assets/card_logo/visa_logo.png";
          this.cardType = "VISA";
          return true;
        default:
          this.src_cardType = "";
          this.cardType = "";
          return false;
      }
    }else{
      this.src_cardType = "";
      this.cardType = "";
      return false;
    }
  }

  enableProfileEdit(){
    this.profileEdit = true;
    this.ngOnInit();
    this.newEditForm.controls['nome'].setValue(this.credential.name);
    this.newEditForm.controls['sobrenome'].setValue(this.credential.surname);
    this.newEditForm.controls['email'].setValue(this.credential.email);
    this.newEditForm.controls['endereco'].setValue(this.credential.endereco);
    this.newEditForm.controls['cep'].setValue(this.credential.cep);
    this.newEditForm.controls['cpf'].setValue(this.credential.cpf);
    this.newEditForm.controls['telefone'].setValue(this.credential.telefone);
    this.newEditForm.controls['complemento'].setValue(this.credential.complemento);
    this.newEditForm.controls['password'].setValue(this.credential.password);
    this.newEditForm.controls['confirmedPassword'].setValue(this.credential.password);
    this.newEditForm.controls['checkbox'].setValue(true);

  }

  enablePaymentEdit(){
    this.paymentEdit = true;
    this.ngOnInit();

  }

  updatePayment() {
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.card.cardNumber = this.cardNumber?.value;
      this.card.nameOnCard = this.nameOnCard?.value;
      this.card.nickname = this.nickname?.value;
      this.card.expDate = this.expDate?.value;
      this.card.cvv = this.cvv?.value;
      this.card.type = this.type?.value;
      for (let i = 0; i < this.credential.paymentCards.length; i++) {
        if (this.card.id == this.credential.paymentCards[i].id) {
          this.credential.paymentCards[i] = this.card;
        }
      }
      this.credentialService.updateCredential(this.credential).subscribe();
      this.paymentEdit = false;
      this.cardSelected= false;
      this.ngOnInit();
      this._snackBar.open('Atualização realizada com sucesso', 'Fechar');
    }
  }



  updateProfile(){
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.credential.name = this.nome?.value;
      this.credential.surname = this.sobrenome?.value;
      this.credential.cep= this.cep?.value;
      this.credential.endereco = this.endereco?.value;
      this.credential.email = this.email?.value;
      this.credential.cpf = this.cpf?.value;
      this.credential.telefone = this.telefone?.value;
      this.credential.password = this.password?.value;
      this.credential.complemento = this.complemento?.value;
      this.credentialService.updateCredential(this.credential).subscribe((x: Credential) => {
        this.profileEdit = false;
        this.ngOnInit();
        this._snackBar.open('Atualização realizada com sucesso', 'Fechar');
      });
    }

  }



  selectCard( card: Payment){
    this.cardSelected = true;
    this.card = card;
    this.ngOnInit();
    this.newEditForm.controls['cardNumber'].setValue(this.card.cardNumber);
    this.newEditForm.controls['nameOnCard'].setValue(this.card.nameOnCard);
    this.newEditForm.controls['expDate'].setValue(this.card.expDate);
    this.newEditForm.controls['cvv'].setValue(this.card.cvv);
    this.newEditForm.controls['nickname'].setValue(this.card.nickname);
    this.newEditForm.controls['type'].setValue(this.card.type);
  }

  getCredential(){
    this.credentialService.searchById(this.activeSessionService.credential?.id!).subscribe((x:Credential)=>
    {
      this.credential = x;
      console.log(x);
    });
  }



  goBack() {
    return this.location.back();

  }
  get nome() {
    return this.newEditForm.get('nome');
  }

  get sobrenome() {
    return this.newEditForm.get('sobrenome');
  }

  get email() {
    return this.newEditForm.get('email');
  }

  get endereco() {
    return this.newEditForm.get('endereco');
  }

  get cep() {
    return this.newEditForm.get('cep');
  }

  get cpf() {
    return this.newEditForm.get('cpf');
  }

  get telefone() {
    return this.newEditForm.get('telefone');
  }

  get password() {
    return this.newEditForm.get('password');
  }

  get confirmedPassword() {
    return this.newEditForm.get('confirmedPassword');
  }

  get checkbox() {
    return this.newEditForm.get('checkbox');
  }

  get cardNumber() {
    return this.newEditForm.get('cardNumber');
  }

  get nameOnCard() {
    return this.newEditForm.get('nameOnCard');
  }

  get cvv() {
    return this.newEditForm.get('cvv');
  }

  get expDate() {
    return this.newEditForm.get('expDate');
  }

  get nickname() {
    return this.newEditForm.get('nickname');
  }

  get type() {
    return this.newEditForm.get('type');

  }

  get complemento() {
    return this.newEditForm.get('complemento');

  }

}
