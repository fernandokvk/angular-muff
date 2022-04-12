import {Shop} from "./shop.model";

export interface Credential {
  id: number;
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
}
