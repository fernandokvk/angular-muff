import { Injectable } from '@angular/core';
import { Credential} from "../models/credential.model";

@Injectable({
  providedIn: 'root'
})
export class ActiveSessionService {

  credential: Credential | undefined;

  constructor() { }

  setInfo(){

    console.log(this.credential?.name);


  }
}
