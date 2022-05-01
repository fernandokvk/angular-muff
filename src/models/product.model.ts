export interface Product {
  id: number;
  barcode: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  imageUrl: string;
  sold_units: number,
  price_discount?: number,
  observation?: string; //Usado no order somente - Fernando
}
