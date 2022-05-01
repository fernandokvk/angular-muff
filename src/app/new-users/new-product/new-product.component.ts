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
import {Location} from "@angular/common";

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

  masks = new Map([
    ["barcode", "000000 00000"],
    ["price", "separator.2"],
  ]);


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
    private location: Location,
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
      quantity: fb.control('', [Validators.required,  Validators.pattern("^[0-9]*$")]),
      price: fb.control('', [Validators.required]),
      priceDiscount:fb.control(''),
    });
  }

  getMask(field: string){
    return this.masks.get(field);
  }

  onSubmit() {
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.productService
        .submit({
          name: this.nome?.value,
          barcode: Number(this.barcode?.value),
          category: this.categoria?.value,
          quantity: Number(this.quantidade?.value),
          imageUrl: this.changeImage(),
          price: Number(this.preco?.value),
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
      case "Bebidas":{
        return "assets/categorias/bebidas.png";
        break;
      }
      case "Carnes":{
        return "assets/categorias/carnes.png";
        break;
      }
      case "Esportes":{
        return "assets/categorias/esportes.png";
        break;
      }
      case "Ferramentas":{
        return "assets/categorias/ferramentas.png";
        break;
      }
      case "Hortifruti":{
        return "assets/categorias/hortifruti.png";
        break;
      }
      case "Frios":{
        return "assets/categorias/laticinios.png";
        break;
      }
      case "Limpeza":{
        return "assets/categorias/limpeza.png";
        break;
      }case "Higiene":{
        return "assets/categorias/higiene.png";
        break;
      }
      case "Padaria":{
        return "assets/categorias/padaria.png";
        break;
      }
      case "Pet":{
        return "assets/categorias/pet.png";
        break;
      }
      case "Mercearia":{
        return "assets/categorias/mercearia.png";
        break;
      }
      case "Bazar":{
        return "assets/categorias/bazar.png";
        break;
      }
      case "Cngelados":{
        return "assets/categorias/congelados.png";
        break;
      }
      case "Enlatados":{
        return "assets/categorias/enlatados.png";
        break;
      }
      case "Bomboniere":{
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
    this.newProductForm.controls['priceDiscount'].setValue(this.product.price_discount);
  }

  goBack(){
    this.productSelected = false;
    this.ngOnInit();
  }

  updateProduct(){
    this.getFormValidationErrors();
    if(this.canSubmit()){
      this.product.name = this.nome?.value;
      this.product.barcode= Number(this.barcode?.value);
      this.product.category= this.categoria?.value;
      this.product.quantity= Number(this.quantidade?.value);
      this.product.price= Number(this.preco?.value);
      this.product.imageUrl = this.changeImage();
      if(Number(this.precoDesconto?.value) > 0){
        this.product.price_discount = Number(this.precoDesconto?.value);
      }   
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

  gotoShop(){
    this.credentialShopService.disableProductUpdate();
    this.router.navigateByUrl('new-shop');
  }
  gotoCourier(){
    this.credentialShopService.disableProductUpdate();
    this.router.navigateByUrl('courier');
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
  get precoDesconto() {
    return this.newProductForm.get('priceDiscount');
  }


  goBackArrow() {
    return this.location.back();
  }
}
