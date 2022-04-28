export interface Product {
  id: number;
  barcode: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  imageUrl: string;
  observation: string; //Usado no order somente
}
