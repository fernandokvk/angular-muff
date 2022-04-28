import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Shop} from "../../../models/shop.model";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {CredentialsService} from "../../../services/credentials.service";
import {Location} from "@angular/common";


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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private credentialShopService: CredentialShopService,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;


    if (this.activeSessionService.credential?.shopId != null) this.showForm = false;
    if (this.showForm)
    {
      const fb = this.fb;
      this.newShopForm = fb.group({
        nome: fb.control('', [Validators.required]),
        endereco: fb.control('', [Validators.required]),
        cep: fb.control('', [Validators.required, Validators.min(8)]),
        cnpj: fb.control('', [Validators.required]),
        checkbox: fb.control('', Validators.requiredTrue),
      });
    }

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
          address: this.endereco?.value,
          image: "assets/shops/shop-1.png"
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
      // this.router.navigateByUrl('login');

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


  goBack() {
    return this.location.back();

  }
}
