import {Shop} from "./shop.model";
import {Payment} from "./payment.model";

export interface Credential {
  id: number;
  type: "COURIER" | "CUSTOMER" | "SHOP";
  email: string;
  password: string;
  name: string;
  surname: string;
  cpf: string;
  telefone: string;
  endereco: string;
  cep: string;
  complemento: string;
  shopId: number;
  courierId: number;
  paymentCards: Payment[];
}
