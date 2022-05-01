import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActiveSessionService} from "../../../services/active-session.service";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Credential} from "../../../models/credential.model";
import {Product} from "../../../models/product.model";
import {Payment} from "../../../models/payment.model";
import {CredentialsService} from "../../../services/credentials.service";
import {Shop} from "../../../models/shop.model";
import {createWebpackLoggingCallback} from "@angular-devkit/build-angular/src/webpack/utils/stats";

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
  complemento: String = '';
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

  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;
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
      });
    }
    else if(this.paymentEdit){
      if( (this.credentialService.session) && (this.credentialService.session.paymentCards)){
        this.credential = this.credentialService.session;
        console.log(this.credential);
        console.log(this.credentialService.session);
      }

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
  }

  enablePaymentEdit(){
    this.paymentEdit = true;
    this.ngOnInit();
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

}
