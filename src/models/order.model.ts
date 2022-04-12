import {Product} from "./product.model";
import {Credential} from "./credential.model";
import {Shop} from "./shop.model";

export interface Order {
  id: number;
  products: Product[];
  customerId: number;
  shopId: number;
  orderDate: number;
  orderArrival: number; // orderDate + x <segundos/minutos>
}
