import { Injectable } from '@angular/core';
import { Credential} from "../models/credential.model";

@Injectable({
  providedIn: 'root'
})
export class ActiveSessionService {

  credential: Credential | undefined;
  succesfulSignup: boolean = false;


  constructor() { }

  setInfo(){

  }
}
