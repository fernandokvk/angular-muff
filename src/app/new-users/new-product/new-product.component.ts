import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Credential} from "../../../models/credential.model";
import {CredentialsService} from "../../../services/credentials.service";
import {Router} from "@angular/router";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Product} from "../../../models/product.model";
import {CredentialCourierService} from "../../../services/credential-courier.service";
import {ProductService} from "../../../services/product.service";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {Shop} from "../../../models/shop.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductForm!: FormGroup;
  hide = true;
  credential!: Credential;
  shop!: Shop;
  complemento: String = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
    private productService: ProductService,
    private credentialShopService: CredentialShopService,
  ) {}

  ngOnInit(): void {
    const fb = this.fb;
    this.newProductForm = fb.group({
      name: fb.control('', [Validators.required]),
      barcode: fb.control('', [Validators.required]),
      category: fb.control('', [Validators.required]),
      quantity: fb.control('', [Validators.required]),
      price: fb.control('', [Validators.required]),

    });
  }

  onSubmit() {
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.productService
        .submit({
          name: this.nome?.value,
          barcode: this.barcode?.value,
          category: this.categoria?.value,
          quantity: this.quantidade?.value,
          price: this.preco?.value,
        } as Product)
        .subscribe(
          (t) => {
            console.log(t.barcode + " added as product")

            this.credentialShopService.getShopById(this.activeSessionService.credential?.shopId!).subscribe((y:Shop[])=>{
              this.shop = y[0];
              this.credentialShopService.submitNewProduct(this.shop, t).subscribe(
                (u) => console.log(t.id + " added as productId for " + u.id),
                (error) => console.log(error)
              )
            })


          },
          (error) => console.log(error));
        this.router.navigateByUrl('home');


    }
  }


  canSubmit(): boolean {
    let canSubmit = true;
    Object.keys(this.newProductForm.controls).forEach((key) => {
      if (this.newProductForm.get(key)?.errors != null) {
        canSubmit = false;
      }
    });
    return canSubmit;
  }

  getFormValidationErrors() {
    Object.keys(this.newProductForm.controls).forEach((k) => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.newProductForm.get(k)?.errors;
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
    return this.newProductForm.get('name');
  }

  get barcode() {
    return this.newProductForm.get('barcode');
  }

  get categoria() {
    return this.newProductForm.get('category');
  }

  get quantidade() {
    return this.newProductForm.get('quantity');
  }

  get preco() {
    return this.newProductForm.get('price');
  }


}
