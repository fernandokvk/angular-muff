export interface Product {
  id: number;
  barCode: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  imageUrl: string;
  observation: string; //Usado no order somente
}
