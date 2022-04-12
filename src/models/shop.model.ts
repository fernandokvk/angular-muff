import {Product} from "./product.model";

export interface Shop {
  id: number,
  name: string;
  cnpj: string;
  endereco: string;
  cep: string;
  products: Product[];
}
