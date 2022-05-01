import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Courier} from "../../../models/courier.model";
import {Router} from "@angular/router";
import {ActiveSessionService} from "../../../services/active-session.service";
import {CredentialsService} from "../../../services/credentials.service";
import {CredentialCourierService} from "../../../services/credential-courier.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-new-courier',
  templateUrl: './new-courier.component.html',
  styleUrls: ['./new-courier.component.scss']
})
export class NewCourierComponent implements OnInit {
  profileType: any = "CUSTOMER";

  newCourierForm!: FormGroup;
  courier!: Courier;
  showForm: boolean = true;
  selected!: string;
  edit: boolean = false;
  masks = new Map([
    ["cnh", "000000000000"],
  ]);


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private credentialCourierService: CredentialCourierService,
    private activeSessionService: ActiveSessionService,
    private location: Location,
    private credentialService: CredentialsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.profileType = this.activeSessionService.credential?.type;


    if (this.activeSessionService.credential?.courierId != null && !this.edit){
      this.showForm = false;
      this.getCourier();
    }else if((this.activeSessionService.credential?.courierId != null) && this.edit){
      this.showForm = true;
      this.getCourier();
    }
    if (this.showForm)
    {
      const fb = this.fb;
      this.newCourierForm = fb.group({
        cnh: fb.control('', [Validators.required]),
        vehicleType: fb.control('', [Validators.required]),
        checkbox: fb.control('', Validators.requiredTrue),
      });

      this.newCourierForm.get("vehicleType")!.valueChanges.subscribe(data => {this.changeValidators()})
    }
  }

  getMask(field: string){
    return this.masks.get(field);
  }

  changeValidators(){
    console.log(this.newCourierForm.get("vehicleType")?.value)

    if (this.newCourierForm.get("vehicleType")?.value == "bicycle"){
      this.newCourierForm.controls["cnh"].clearValidators();

    } else{
      this.newCourierForm.controls["cnh"].setValidators([Validators.required]);
    }
    this.newCourierForm.get("cnh")?.updateValueAndValidity();

  }

  onSubmit() {
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.credentialCourierService
        .submit({
          cnh: this.cnh?.value,
          name: this.activeSessionService.credential?.name,
          vehicleType: this.tipoVeiculo?.value,
          location: {lat: -23.413060764874313 , long: -51.93812922195265}, // Ponto de spawn dos couriers, Willie Davids - Fernando
        } as Courier)
        .subscribe(
          (t) => {
            console.log(t.cnh + " added as courier")
            this.credentialService.submitNewCourier(this.activeSessionService.credential, t.id).subscribe(
              (u) => console.log(t.id + " added as courierId for " + u.id),
              (error) => console.log(error)
            )
          },
          (error) => console.log(error)
        );
      this.router.navigateByUrl('home');
      this._snackBar.open('Cadastro realizado com sucesso', 'Fechar');
    }
  }

  canSubmit(): boolean {
    let canSubmit = true;
    Object.keys(this.newCourierForm.controls).forEach((key) => {
      if (this.newCourierForm.get(key)?.errors != null) {
        canSubmit = false;
      }
    });
    return canSubmit;
  }

  getFormValidationErrors() {
    Object.keys(this.newCourierForm.controls).forEach((k) => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.newCourierForm.get(k)?.errors;
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

  getCourier(){
    this.credentialCourierService.getCourierById(this.activeSessionService.credential?.courierId!).subscribe((y:Courier)=>{
      this.courier = y;
    })
  }

  onEdit(){
    this.edit=true;
    this.ngOnInit();
    this.newCourierForm.controls['cnh'].setValue(this.courier.cnh);
    this.newCourierForm.controls['vehicleType'].setValue(this.courier.vehicleType);
    this.newCourierForm.controls['checkbox'].setValue(true);
    this.credentialCourierService.getCourierById(this.activeSessionService.credential?.courierId!).subscribe((y:Courier)=>{
      this.courier = y;})
  }

  updateCourier(){
    this.getFormValidationErrors();
    if (this.canSubmit()) {
      this.courier.cnh = this.cnh?.value;
      this.courier.vehicleType = this.tipoVeiculo?.value;
      this.credentialCourierService.updateCourier(this.courier).subscribe((x: Courier) => {
        this.edit = false;
        this.ngOnInit();
        this._snackBar.open('Atualização realizada com sucesso', 'Fechar');
      });
    }
  }

  get cnh() {
    return this.newCourierForm.get('cnh');
  }

  get tipoVeiculo() {
    return this.newCourierForm.get('vehicleType');
  }

  get checkbox() {
    return this.newCourierForm.get('checkbox');
  }

  goBack() {
    return this.location.back();
  }
}
