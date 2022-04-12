import {Product} from "./product.model";
import {Credential} from "./credential.model";
import {Shop} from "./shop.model";

export interface Order {
  id: number;
  products: Product[];
  customer: Credential;
  shop: Shop;
  date: number;
}
