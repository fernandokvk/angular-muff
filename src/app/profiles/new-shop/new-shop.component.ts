import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Shop} from "../../../models/shop.model";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {CredentialsService} from "../../../services/credentials.service";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-new-shop',
  templateUrl: './new-shop.component.html',
  styleUrls: ['./new-shop.component.scss']
})
export class NewShopComponent implements OnInit {
  newShopForm!: FormGroup;
  shop!: Shop;
  showForm: boolean = true;
  profileType: any = "CUSTOMER";
  edit: boolean = false;
  masks = new Map([
    ["cep", "00000-000"],
    ["cnpj", "00.000.000/0000-00"],
  ]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private credentialShopService: CredentialShopService,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
    private location: Location,
  private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;


    if ((this.activeSessionService.credential?.shopId != null) && !this.edit)
    {
      this.showForm = false;
      this.getShop();
    } else if((this.activeSessionService.credential?.shopId != null) && this.edit){
      this.showForm = true;
      this.getShop();
    }
    if(this.showForm)
    {
      const fb = this.fb;
      this.newShopForm = fb.group({
        nome: fb.control('', [Validators.required]),
        endereco: fb.control('', [Validators.required]),
        cep: fb.control('', [Validators.required, Validators.min(8)]),
        cnpj: fb.control('', [Validators.required]),
        checkbox: fb.control('', Validators.requiredTrue),
        deliveryFee: fb.control('', Validators.required),
        deliveryTime: fb.control('', Validators.required)
      });
    }

  }
  getMask(field: string){
    return this.masks.get(field);
  }

  onSubmit() {
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.credentialShopService
        .submit({
          name: this.nome?.value,
          zipCode: this.cep?.value,
          cnpj: this.cnpj?.value,
          products: [],
          location:{address: this.endereco?.value},
          image: "assets/shops/shop-1.png",
          rating: 0,
          deliveryFee: Number(this.taxaEntrega?.value),
          estimatedDeliveryTime: Number(this.tempoEntrega?.value)
        } as unknown as Shop)
        .subscribe(
          (t) => {
            console.log(t.name + " added as shop")
            this.credentialService.submitNewShop(this.activeSessionService.credential, t.id).subscribe(
              (u) => console.log(t.id + " added as shopId for " + u.id),
              (error) => console.log(error)
            )
          },
          (error) => console.log(error)
        );
      this.router.navigateByUrl('home');
      this._snackBar.open('Shop cadastrado com sucesso', 'Fechar');

    }
  }


  canSubmit(): boolean {
    let canSubmit = true;
    Object.keys(this.newShopForm.controls).forEach((key) => {
      if (this.newShopForm.get(key)?.errors != null) {
        canSubmit = false;
      }
    });
    return canSubmit;
  }

  getFormValidationErrors() {
    Object.keys(this.newShopForm.controls).forEach((k) => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.newShopForm.get(k)?.errors;
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

  getShop(){
    this.credentialShopService.getShopById(this.activeSessionService.credential?.shopId!).subscribe((y:Shop)=> {
      this.shop = y;
    })
  }

  getStars(shop: Shop) {
    let rating = "";
    for (let i = 0; i < Math.ceil(shop.rating); i++) {
      rating = rating.concat("⭐")
    }
    return rating;

  }

  onEdit(){
    this.edit=true;
    this.ngOnInit();
    this.newShopForm.controls['nome'].setValue(this.shop.name);
    this.newShopForm.controls['endereco'].setValue(this.shop.location.address);
    this.newShopForm.controls['cep'].setValue(this.shop.zipCode);
    this.newShopForm.controls['cnpj'].setValue(this.shop.cnpj);
    this.newShopForm.controls['checkbox'].setValue(true);
    this.newShopForm.controls['deliveryFee'].setValue(this.shop.deliveryFee);
    this.newShopForm.controls['deliveryTime'].setValue(this.shop.estimatedDeliveryTime);
  }

  updateShop(){
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.shop.name = this.nome?.value;
      this.shop.location.address = this.endereco?.value;
      this.shop.zipCode = this.cep?.value;
      this.shop.cnpj = this.cnpj?.value;
      this.shop.deliveryFee = this.taxaEntrega?.value;
      this.shop.estimatedDeliveryTime = this.tempoEntrega?.value;
      this.credentialShopService.updateShop(this.shop).subscribe((x: Shop) => {
        this.edit = false;
        this.ngOnInit();
        this._snackBar.open('Atualização realizada com sucesso', 'Fechar');
      });
    }
  }

  updateProduct(){
    this.credentialShopService.enableProductUpdate();
    this.router.navigateByUrl('produtos');
  }


  get nome() {
    return this.newShopForm.get('nome');
  }

  get endereco() {
    return this.newShopForm.get('endereco');
  }

  get cep() {
    return this.newShopForm.get('cep');
  }

  get cnpj() {
    return this.newShopForm.get('cnpj');
  }


  get checkbox() {
    return this.newShopForm.get('checkbox');
  }

  get taxaEntrega() {
    return this.newShopForm.get('deliveryFee');
  }
  get tempoEntrega() {
    return this.newShopForm.get('deliveryTime');
  }


  goBack() {
    return this.location.back();

  }
}
