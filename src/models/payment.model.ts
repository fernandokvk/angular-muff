export interface Payment {
  id: number;
  type: "CREDIT_CARD" | "DEBIT_CARD";
  cardType: "MASTERCARD" | "VISA";
  nickname: string;
  nameOnCard: string;
  cardNumber: string;
  cvv: string;
  expDate: any;
}
