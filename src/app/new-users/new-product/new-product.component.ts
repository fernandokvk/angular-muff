import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Credential} from "../../../models/credential.model";
import {CredentialsService} from "../../../services/credentials.service";
import {Router} from "@angular/router";
import {ActiveSessionService} from "../../../services/active-session.service";
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
import {CredentialShopService} from "../../../services/credential-shop.service";
import {Shop} from "../../../models/shop.model";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  product!: Product;
  profileType: any = "CUSTOMER";
  edit: boolean = true;
  productSelected: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
    private productService: ProductService,
    private credentialShopService: CredentialShopService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.edit = this.credentialShopService.productEdit;
    this.profileType = this.activeSessionService.credential?.type;

    if (this.activeSessionService.credential?.shopId != null){this.getShop();
    }
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
          imageUrl: this.changeImage(),
          price: this.preco?.value,
          sold_units: 0,
        } as Product)
        .subscribe(
          (t) => {
            console.log(t.barcode + " added as product")

            this.credentialShopService.getShopById(this.activeSessionService.credential?.shopId!).subscribe((y:Shop)=>{
              this.shop = y;
              this.credentialShopService.submitNewProduct(this.shop, t).subscribe(
                (u) => console.log(t.id + " added as productId for " + u.id),
                (error) => console.log(error)
              )
            })


          },
          (error) => console.log(error));
      this.router.navigateByUrl('new-shop');
      this._snackBar.open('Produto cadastrado com sucesso', 'Fechar');


    }
  }

  changeImage(): string{
    switch (this.categoria?.value){
      case "bebidas":{
        return "assets/categorias/bebidas.png";
        break;
      }
      case "carnes":{
        return "assets/categorias/carnes.png";
        break;
      }
      case "esportes":{
        return "assets/categorias/esportes.png";
        break;
      }
      case "ferramentas":{
        return "assets/categorias/ferramentas.png";
        break;
      }
      case "hortifruti":{
        return "assets/categorias/hortifruti.png";
        break;
      }
      case "frios-laticínios":{
        return "assets/categorias/laticinios.png";
        break;
      }
      case "limpeza":{
        return "assets/categorias/limpeza.png";
        break;
      }case "higiene":{
        return "assets/categorias/higiene.png";
        break;
      }
      case "padaria":{
        return "assets/categorias/padaria.png";
        break;
      }
      case "pet":{
        return "assets/categorias/pet.png";
        break;
      }
      case "mercearia":{
        return "assets/categorias/mercearia.png";
        break;
      }
      case "bazar":{
        return "assets/categorias/bazar.png";
        break;
      }
      case "congelados":{
        return "assets/categorias/congelados.png";
        break;
      }
      case "enlatados":{
        return "assets/categorias/enlatados.png";
        break;
      }
      case "bomboniere":{
        return "assets/categorias/bomboniere.png";
        break;
      }
      case "Biscoitos":{
        return "assets/categorias/biscoitos.png";
        break;
      }
      default:{
        return "assets/products/product-icon.png";
        break;
      }
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
  getShop(){
    this.credentialShopService.getShopById(this.activeSessionService.credential?.shopId!).subscribe((y:Shop)=> {
      this.shop = y;
    })
  }

  getSelectedClass(product: Product): string {
    const isValid = this.product == product;
    if(isValid) {
      return "selected"
    }else{
      return "not-selected"
    }
  }

  selectProduct( product: Product){
    this.productSelected = true;
    this.product = product;
    this.ngOnInit();
    this.newProductForm.controls['name'].setValue(this.product.name);
    this.newProductForm.controls['barcode'].setValue(this.product.barcode);
    this.newProductForm.controls['category'].setValue(this.product.category);
    this.newProductForm.controls['quantity'].setValue(this.product.quantity);
    this.newProductForm.controls['price'].setValue(this.product.price);
  }

  goBack(){
    this.productSelected = false;
    this.ngOnInit();
  }

  updateProduct(){
    this.getFormValidationErrors();
    if(this.canSubmit()){
      this.product.name = this.nome?.value;
      this.product.barcode= this.barcode?.value;
      this.product.category= this.categoria?.value;
      this.product.quantity= this.quantidade?.value;
      this.product.price= this.preco?.value;
      this.product.imageUrl = this.changeImage();
      this.productService.updateProduct(this.product).subscribe((y:Product)=>{
        for (let i = 0; i < this.shop.products.length; i++) {
          if(this.product.id == this.shop.products[i].id){
            this.shop.products[i]=this.product;
          }
        }
        this.credentialShopService.updateShop(this.shop).subscribe();
        this.credentialShopService.disableProductUpdate();
        this.productSelected = false;

      })
      this.router.navigateByUrl('new-shop');
      this._snackBar.open('Atualização realizada com sucesso', 'Fechar');
    }

  }

  goHome(){
    this.credentialShopService.disableProductUpdate();
    this.router.navigateByUrl('home');
  }

  goToOrders(){
    this.credentialShopService.disableProductUpdate();
    this.router.navigateByUrl('my-orders');
  }
  gotoProfile(){
    this.credentialShopService.disableProductUpdate();
    this.router.navigateByUrl('profile');
  }
  gotoCart(){
    this.credentialShopService.disableProductUpdate();
    this.router.navigateByUrl('carrinho');
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
