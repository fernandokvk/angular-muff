import {Product} from "./product.model";
import {Credential} from "./credential.model";
import {Shop} from "./shop.model";
import {Payment} from "./payment.model";

export interface Order {
  id: number;
  customerId: number;
  shopId: number;
  shopName: string;
  courierId: number;
  courierName: string;
  status: string;
  paymentStatus:  "NOT_PAID" | "PAID" | "PAY_ON_DELIVERY" ;
  paymentMethod: "CASH" | Payment;
  pickupLocation: { address: string; lat: number; long: number };
  deliveryLocation: { address: string; lat: number; long: number };
  createdAt: Date;
  updatedAt: Date;
  estimatedAt: Date;
  finishedAt: Date | null;
  products: Product[];
}
