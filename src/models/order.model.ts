import {Product} from "./product.model";
import {Credential} from "./credential.model";
import {Shop} from "./shop.model";

export interface Order {
  id: number;
  products: Product[];
  customerId: number;
  shopId: number;
  orderDate: Date;
  orderArrival: Date; // orderDate + x <segundos/minutos>
}
