import {Product} from "./product.model";

export interface Shop {
  id: number,
  name: string;
  cnpj: string;
  address: string;
  zipCode: string;
  products: Product[];
  image: string;
  rating: number;
}
