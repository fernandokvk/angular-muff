import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Courier} from "../../../models/courier.model";
import {Router} from "@angular/router";
import {ActiveSessionService} from "../../../services/active-session.service";
import {CredentialsService} from "../../../services/credentials.service";
import {CredentialCourierService} from "../../../services/credential-courier.service";


@Component({
  selector: 'app-new-courier',
  templateUrl: './new-courier.component.html',
  styleUrls: ['./new-courier.component.scss']
})
export class NewCourierComponent implements OnInit {

  newCourierForm!: FormGroup;
  courier!: Courier;
  showForm: boolean = true;
  selected!: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private credentialCourierService: CredentialCourierService,
    private activeSessionService: ActiveSessionService,
    private credentialService: CredentialsService,
  ) { }

  ngOnInit(): void {

    if (this.activeSessionService.credential?.courierId != null) this.showForm = false;
    if (this.showForm)
    {
      const fb = this.fb;
      this.newCourierForm = fb.group({
        cnh: fb.control('', [Validators.required]),
        vehicleType: fb.control('', [Validators.required]),
        checkbox: fb.control('', Validators.requiredTrue),
      });
    }

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

  get cnh() {
    return this.newCourierForm.get('cnh');
  }

  get tipoVeiculo() {
    return this.newCourierForm.get('vehicleType');
  }

  get checkbox() {
    return this.newCourierForm.get('checkbox');
  }

}
