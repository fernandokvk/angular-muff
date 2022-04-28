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
  currentLocation: {lat: number, long: number} = {lat: -23.413060764874313 , long: -51.93812922195265};


  constructor() { }

}
