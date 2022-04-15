import {Product} from "./product.model";
import {Credential} from "./credential.model";
import {Shop} from "./shop.model";

export interface Order {
  id: number;
  customerId: number;
  shopId: number;
  courierId: number;
  status: string;
  pickupLocation: {address: string, lat: number, long: number};
  deliveryLocation: {address: string, lat: number, long: number};
  createdAt: string;
  updatedAt: string;
  finishedAt: string;
  products: Product[];
}
