import { Injectable } from '@angular/core';
import { Product } from 'src/models/product.model';
import { Shop } from 'src/models/shop.model';
import { Credential} from "../models/credential.model";

@Injectable({
  providedIn: 'root'
})
export class ActiveSessionService {

  credential: Credential | undefined;
  sessionProducts: Product[]=[];
  sessionShop: Shop | undefined;
  succesfulSignup: boolean = false;


  constructor() { }

  setInfo(){

  }
}
