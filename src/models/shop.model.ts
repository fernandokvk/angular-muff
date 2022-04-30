import {Product} from "./product.model";

export interface Shop {
  id: number,
  name: string;
  cnpj: string;
  location: { address: string; lat?: number; long?: number };
  zipCode: string;
  products: Product[];
  image: string;
  rating: number;
  comments?: string[];
  estimatedDeliveryTime?: number;
  deliveryFee?: number;
}
